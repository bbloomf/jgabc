const { test, expect } = require('bun:test');
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const exsurge = require('../exsurge.min.js');
const { context: utilities } = require('./helpers/offertory-feature-context');
function score(source) {
  const ctxt = new exsurge.ChantContext();
  return new exsurge.ChantScore(ctxt,exsurge.Gabc.createMappingsFromSource(ctxt,source),false);
}
const notesOf = score => score.notations.flatMap(n=>n.notes||[]);
const pitchesOf = score => Array.from(utilities.getPlaybackPitches(score).values());
const snapshot = score => score.notations.map(n=>({source:n.sourceGabc,position:n.staffPosition,notes:(n.notes||[]).map(note=>({source:note.sourceGabc,position:note.staffPosition,pitch:note.pitch.toInt()}))}));

// Which octave a note is sung in after a change between a C and an F clef is exsurge's to decide, and its own tests
// cover that. These check that the app plays and displays those pitches rather than the written ones.
const twoClefs='(f3) A(ce) (::c4) B(dfd) (::f3) C(ce)';
test('the example is one where the sung pitches are not the written ones', () => {
  const chant=score(twoClefs);
  expect(notesOf(chant).map(note=>note.pitch.toInt())).toEqual([21,24,14,17,14,21,24]);
  expect(pitchesOf(chant)).toEqual([21,24,26,29,26,21,24]);
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

test('the synthesizer plays the sung pitches, for the whole score and from a later note', () => {
  const p=player(),chant=score(twoClefs);
  const before=snapshot(chant);
  p.ctxt.playScore(chant,60);p.drain();
  expect(p.events).toEqual([60,63,65,68,65,60,63]);
  expect(snapshot(chant)).toEqual(before);
  p.events.length=0;
  p.ctxt.playScore(chant,60,notesOf(chant)[2]);p.drain();
  expect(p.events).toEqual([65,68,65,60,63]);
});

test('the pitch toolbar takes its range and its starting pitch from the sung pitches', () => {
  const p=player(),chant=score(twoClefs),data=utilities.getPlaybackPitchData(chant);
  expect([data.startPitch,data.lowPitch,data.highPitch]).toEqual([21,21,29]);
  p.ctxt.addPitchButtonsToToolbar(p.element,null,chant);
  // the range 21–29 is centred on G4 (55), which puts the first note at 51; the written range 14–24 would give 57
  expect(chant.defaultStartPitch.toInt()).toBe(51);
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


test('Ad te Domine, the one offertory whose verse is written an octave from where it is sung, is played in unison at the join', () => {
  const {cases}=require('./helpers/offertory-feature-cases');
  let checked=0;
  for(const c of cases()) if(c.id==='962' && c.style==='full' && c.count) {
    const chant=score(c.formatted),notes=notesOf(chant),index=notes.findIndex(note=>note.sourceIndex>c.formatted.indexOf('V/.'));
    expect(index).toBeGreaterThan(0);
    expect(notes[index].pitch.toInt()-notes[index-1].pitch.toInt()).toBe(-12);
    const p=player();
    p.ctxt.playScore(chant,60,notes[index-1]);p.drain();
    expect(p.events[1]).toBe(p.events[0]);
    checked++;
  }
  expect(checked).toBeGreaterThan(0);
});
