const { test, expect } = require('bun:test');
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const exsurge = require('../exsurge.min.js');
const { context: utilities } = require('./helpers/offertory-feature-context');
function score(source) {
  const ctxt = new exsurge.ChantContext();
  const chant=new exsurge.ChantScore(ctxt,exsurge.Gabc.createMappingsFromSource(ctxt,source),false);
  utilities.updateOffertoryPlaybackSections(chant,source,true);
  return chant;
}
const notesOf = score => score.notations.flatMap(n=>n.notes||[]);
const pitchesOf = score => Array.from(utilities.getPlaybackPitches(score).values());
const snapshot = score => score.notations.map(n=>({source:n.sourceGabc,position:n.staffPosition,notes:(n.notes||[]).map(note=>({source:note.sourceGabc,position:note.staffPosition,pitch:note.pitch.toInt()}))}));

test('playback aligns octave-equivalent C/F section joins in either direction', () => {
  expect(pitchesOf(score('(c4) A(h) (z0::f3) V/. B(c)'))).toEqual([21,21]);
  expect(pitchesOf(score('(f3) A(c) (z0::c4) V/. B(h)'))).toEqual([9,9]);
  expect(pitchesOf(score('(c3) A(d) (z0::f3) V/. B(a)'))).toEqual([17,17]);
  expect(pitchesOf(score('(f3) A(a) (z0::c3) V/. B(d)'))).toEqual([5,5]);
});

test('a shifted section keeps its intervals and restores its register on the reverse join', () => {
  const chant=score('(c4) A(h) (z0::f3) V/. B(cec) (z0::c4) V/. C(hj)');
  expect(pitchesOf(chant)).toEqual([21,21,24,21,21,24]);
  const reverse=score('(f3) A(c) (z0::c4) V/. B(hjh) (z0::f3) V/. C(ce)');
  expect(pitchesOf(reverse)).toEqual([9,9,12,9,9,12]);
});

test('playback preserves melodic octave leaps, accidentals and clefs within a section', () => {
  for(const source of [
    '(f3) A(fm) (c4) V/. B(dk)', // real written octaves, no section boundary
    '(f3) A(f) (z0::c3) V/. B(f)', // rising fifth at a section boundary
    '(c4) A(h) (::) V/. B(a)', // same-clef written octave, no register inference
    '(cb4) A(ixiiyi) (z0::fb3) V/. B(gxggy g)'
  ]) {
    const chant=score(source),before=snapshot(chant),played=pitchesOf(chant);
    expect(snapshot(chant)).toEqual(before);
    const notes=notesOf(chant);
    // Within any neume, every interval is retained exactly.
    for(const neume of chant.notations.filter(n=>n.notes)) for(let i=1;i<neume.notes.length;i++) {
      const a=notes.indexOf(neume.notes[i-1]),b=notes.indexOf(neume.notes[i]);
      expect(played[b]-played[a]).toBe(neume.notes[i].pitch.toInt()-neume.notes[i-1].pitch.toInt());
    }
  }
  expect(pitchesOf(score('(f3) A(fm) (c4) V/. B(dk)'))).toEqual([14,26,14,26]);
  expect(pitchesOf(score('(f3) A(f) (z0::c3) V/. B(f)'))).toEqual([14,9]);
});

function player() {
  const events=[],scheduled=new Map(),html=new Map();let id=0;const ready=[];
  const element={length:0,append(){return this},removeClass(){return this},addClass(){return this},find(selector){return {html(value){html.set(selector,value);return this},text(value){html.set(selector,value);return this}}},html(){return this},text(){return this},click(){return this},on(){return this},each(){return this},add(){return this}};
  const $=arg=>{if(typeof arg==='function'){ready.push(arg);return;}return element;};
  const transport={state:'stopped',bpm:{value:165},clear(n){scheduled.delete(n)},start(){this.state='started'},stop(){this.state='stopped'},scheduleOnce(fn){scheduled.set(++id,fn);return id}};
  const Tone={Transport:transport,Synth:class {toMaster(){return this} triggerAttackRelease(pitch){events.push(pitch)}},Time:class {toSeconds(){return 0.1}}};
  const ctxt=vm.createContext({console,exsurge,Tone,$,document:{body:{}},localStorage:{},tones:{getNoteName:(pitch,transpose)=>pitch.toInt()+transpose,noteName:Array(12).fill('Do')}});
  ctxt.window=ctxt;ctxt.__testTone=Tone;
  vm.runInContext('var Tone = __testTone;\n' + fs.readFileSync(path.join(__dirname,'../util.js'),'utf8'),ctxt);
  ready.forEach(callback=>callback($));
  return {ctxt,events,html,element,drain(){let safety=10000;while(scheduled.size&&safety--){const [key,fn]=scheduled.entries().next().value;scheduled.delete(key);fn(0)}expect(safety).toBeGreaterThan(0)}};
}

test('the synthesizer uses corrected pitches for full playback and playback from a later note', () => {
  const p=player(),chant=score('(c4) A(h) (z0::f3) V/. B(cec) (z0::c4) V/. C(hj)');
  const before=snapshot(chant);
  p.ctxt.playScore(chant,60);p.drain();
  expect(p.events).toEqual([60,60,63,60,60,63]);
  expect(snapshot(chant)).toEqual(before);
  p.events.length=0;
  p.ctxt.playScore(chant,60,notesOf(chant)[2]);p.drain();
  expect(p.events).toEqual([63,60,60,63]);
});

test('the pitch toolbar displays the same corrected note and range as playback', () => {
  const p=player(),chant=score('(c4) A(h) (z0::f3) V/. B(cec) (z0::c4) V/. C(hj)');
  p.ctxt.addPitchButtonsToToolbar(p.element,null,chant);
  // Corrected source range A1–C2 is centered at G4, yielding F-sharp4–A4.
  expect(p.html.get('.lowest-pitch')).toContain('<sub>4</sub>');
  expect(p.html.get('.highest-pitch')).toContain('<sub>4</sub>');
  expect(chant.defaultStartPitch.toInt()).toBe(54);
  p.ctxt.addPitchButtonsToToolbar(p.element,{note:notesOf(chant)[2]},chant);
  expect(p.html.get('.this-pitch')).toContain('<sub>4</sub>');
});

test('an established clef register never overrides an already acceptable directed join', () => {
  const chant=score('(c4) A(j) (z0::f3) V/. B(fg) (z0::c4) V/. C(h)');
  expect(pitchesOf(chant)).toEqual([24,26,28,33]);
});

test('unmarked chants, same-clef joins and within-section changes retain their written register', () => {
  const unmarked=score('(c4) A(h) (z0::f3) B(c)');
  expect(pitchesOf(unmarked)).toEqual([21,9]);
  const marked=score('(c4) A(h) (z0::f3) V/. B(c)');
  utilities.updateOffertoryPlaybackSections(marked, '', false);
  expect(pitchesOf(marked)).toEqual([21,9]);
  expect(pitchesOf(score('(c4) A(h) (::c4) V/. B(a)'))).toEqual([21,9]);
  expect(pitchesOf(score('(c4) A(h) (;) (f3) V/. B(c)'))).toEqual([21,9]);
  expect(pitchesOf(score('(c4) A(h) (::) V/. B(h) (f3) V/. C(c)'))).toEqual([21,21,9]);
});

test('playback refreshes the automatic starting pitch after edits and retains an explicit user choice', () => {
  const chant=score('(c4) A(hj)');
  let data=utilities.getPlaybackPitchData(chant);
  chant.defaultStartPitch=new exsurge.Pitch(utilities.calculateDefaultStartPitch(data.startPitch,data.lowPitch,data.highPitch).toInt());
  const originalDefault=chant.defaultStartPitch;
  const edited=score('(c4) A(ah)');
  chant.notations=edited.notations;chant.startingClef=edited.startingClef;
  data=utilities.getPlaybackPitchData(chant);
  expect(chant.defaultStartPitch).toBeUndefined();
  expect(utilities.calculateDefaultStartPitch(data.startPitch,data.lowPitch,data.highPitch).toInt()).not.toBe(originalDefault.toInt());
  chant.defaultStartPitch=new exsurge.Pitch(60);chant.playbackStartPitchIsManual=true;
  chant.notations=score('(c4) A(ak)').notations;
  utilities.getPlaybackPitchData(chant);
  expect(chant.defaultStartPitch.toInt()).toBe(60);
});


test('marked C/F joins choose the smallest possible leap in either direction', () => {
  for(const source of ['(f3) A(f) (z0::c3) V/. B(f)', '(c3) A(f) (z0::f3) V/. B(f)']) {
    const chant=score(source),played=pitchesOf(chant),interval=played[1]-played[0];
    expect(Math.abs(interval)).toBe(5);
    expect(Math.abs(interval)).toBeLessThanOrEqual(Math.abs(interval-12));
    expect(Math.abs(interval)).toBeLessThanOrEqual(Math.abs(interval+12));
  }
});

test('actual Dextera Domini full verse enters in unison in synthesized playback', () => {
  const {cases}=require('./helpers/offertory-feature-cases');
  let checked=0;
  for(const c of cases()) if(['47','448'].includes(c.id) && c.style==='full' && c.count) {
    const chant=score(c.formatted),notes=notesOf(chant),first=[...chant.playbackSections][0],index=notes.indexOf(first);
    const before=snapshot(chant),played=pitchesOf(chant);
    expect(index).toBeGreaterThan(0);
    expect(played[index]).toBe(played[index-1]);
    const p=player();
    p.ctxt.playScore(chant,60,notes[index-1]);p.drain();
    expect(p.events[0]).toBe(p.events[1]);
    expect(snapshot(chant)).toEqual(before);
    checked++;
  }
  expect(checked).toBe(4);
});


test('tritone ties retain their written direction in both octave registers', () => {
  for(const [interval,source] of [
    [-30,'(c1) A(j) (z0::f3) V/. B(a)'],
    [-18,'(c1) A(j) (z0::f1) V/. B(d)'],
    [-6,'(c1) A(j) (z0::f1) V/. B(k)'],
    [6,'(c1) A(c) (z0::f1) V/. B(k)'],
    [18,'(c4) A(b) (z0::f1) V/. B(k)'],
    [30,'(f3) A(a) (z0::c1) V/. B(j)']
  ]) {
    const chant=score(source),notes=notesOf(chant),played=pitchesOf(chant);
    expect(notes[1].pitch.toInt()-notes[0].pitch.toInt()).toBe(interval);
    expect(played[1]-played[0]).toBe(Math.sign(interval)*6);
  }
});
