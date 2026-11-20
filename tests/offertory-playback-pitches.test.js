const { test, expect } = require('bun:test');
const exsurge = require('../exsurge.min');
const { cases } = require('./helpers/offertory-feature-cases');
const { unlinkedCases } = require('./helpers/offertory-unlinked-cases');

const { tools } = require('./helpers/offertory-feature-cases');

// every offertory with every choice of verses, as the app hands it to exsurge
let parsed;
function scores() {
  return parsed || (parsed = [...cases(), ...unlinkedCases()].map(c => {
    const source = c.formatted || c.gabc;
    const ctxt = new exsurge.ChantContext(), score = new exsurge.ChantScore(ctxt, exsurge.Gabc.createMappingsFromSource(ctxt, source), false);
    return { c, source, score, label: `${c.id} ${c.style} ${c.count}`, sung: score.getPlaybackPitches() };
  }));
}

// Which octave a verse is sung in under another kind of clef is exsurge's to decide. This checks what the app hands it:
// every offertory with every choice of verses can be played, and none of them jumps an octave where the clef changes.
test('every offertory with verses can be played, with no octave leap at a change between a C and an F clef', () => {
  let changes = 0;
  for (const { score, sung, label } of scores()) {
    const notes = score.notations.flatMap(n => n.notes || []);
    expect(notes.length, label).toBeGreaterThan(0);
    for (const note of notes) {
      expect(Number.isFinite(sung.get(note)), label).toBe(true);
      expect((sung.get(note) - note.pitch.toInt()) % 12 === 0, label).toBe(true);
    }
    let clef = score.startingClef, kind = clef.constructor, last;
    for (const notation of score.notations) {
      if (notation.isClef) clef = notation;
      else if (notation.notes && notation.notes.length) {
        if (clef.constructor !== kind && last) {
          expect(Math.abs(sung.get(notation.notes[0]) - sung.get(last)), label).toBeLessThan(12);
          changes++;
        }
        kind = clef.constructor;
        last = notation.notes[notation.notes.length - 1];
      }
    }
  }
  expect(scores().length).toBeGreaterThan(0);
  expect(changes).toBeGreaterThan(0);
});

// The app writes the custos of a return itself, and has to write it in the octave exsurge sings the clef in by then.
test('the custos of every return is where exsurge sings the first note of the return', () => {
  let returns = 0, otherClef = 0, changed = 0;
  for (const { c, source, score, sung, label } of scores()) {
    // how far from where it is written exsurge sings each kind of clef, by the end and at each explicit custos
    // (and where each note is sung without its flat or sharp, which a custos doesn't show)
    const offsets = new Map(), custodes = [], natural = new Map();
    let clef = score.startingClef;
    for (const notation of score.notations) {
      if (notation.isClef) clef = notation;
      else if (notation.auto === false) custodes.push({ at: notation.sourceIndex, sung: clef.staffPositionToPitch(notation.staffPosition).toInt() + offsets.get(clef.constructor) });
      for (const note of notation.notes || []) {
        offsets.set(clef.constructor, sung.get(note) - note.pitch.toInt());
        natural.set(note, clef.staffPositionToPitch(note.staffPosition).toInt() + offsets.get(clef.constructor));
      }
    }
    // the app's own reckoning of those octaves (offertory-verses.js) agrees with exsurge's
    const octaves = tools.clefOctaves(source);
    expect({ c: octaves.c, f: octaves.f }, label).toEqual({ c: offsets.has(exsurge.DoClef) ? offsets.get(exsurge.DoClef) / 12 : undefined, f: offsets.has(exsurge.FaClef) ? offsets.get(exsurge.FaClef) / 12 : undefined });
    if (octaves.c || octaves.f) changed++;
    const notes = score.notations.flatMap(n => n.notes || []);
    for (const m of source.matchAll(/\(::([a-m])\+\)\^?\s*<nlba>\*~([\s\S]*?)<\/nlba>\^?\(\)/g)) {
      // (earlier returns are blanked, not removed, to keep the indices of the source)
      const earlier = source.slice(0, m.index).replace(/<nlba>\*~[\s\S]*?<\/nlba>\^?\(\)/g, cue => ' '.repeat(cue.length));
      const occurrence = (c.simple && tools.normalize(c.simple.cue) === tools.normalize(m[2]) && c.simple.occurrence) ||
        (c.full && c.full.cueOccurrences && c.full.cueOccurrences[tools.normalize(m[2])]);
      const info = tools.cueInfo(earlier, m[2], occurrence), where = `${label}: ${m[2]}`;
      expect(info, where).toBeTruthy();
      const target = notes.find(n => n.sourceIndex >= info.start && n.sourceIndex < info.pitchEnd);
      const custos = custodes.find(k => k.at >= m.index && k.at < m.index + m[0].length);
      expect(target, where).toBeTruthy();
      expect(custos, where).toBeTruthy();
      expect(custos.sung, where).toBe(natural.get(target));
      if (info.clef[0] !== tools.lastClef(earlier)[0]) otherClef++;
      returns++;
    }
  }
  expect(returns).toBeGreaterThan(0);
  expect(otherClef).toBeGreaterThan(0); // returns from an F clef to a C clef or back
  expect(changed).toBeGreaterThan(0); // scores where a clef is sung an octave from where it is written
});

test('Dextera psalm-toned verses use do for fa on the unchanged respond clef', () => {
  const {cases,context}=require('./helpers/offertory-feature-cases');
  const exsurge=require('../exsurge.min');
  const tonesBefore=JSON.stringify(context.g_tones), samples=new Map();
  for(const c of cases()) if(['47','448'].includes(c.id)&&c.count) {
    if(c.style==='toned-verses') {
      expect(c.gabc.match(/[cf]b?[1-4](?=\))/g)).toEqual(['c4']);
      expect(c.gabc).toStartWith(c.original.slice(0,c.original.indexOf('%%')));
    }
    if(c.count===1&&c.style!=='full') {
      const ctxt=new exsurge.ChantContext(),score=new exsurge.ChantScore(ctxt,exsurge.Gabc.createMappingsFromSource(ctxt,c.formatted),false);
      const notes=score.notations.flatMap(n=>n.notes||[]);
      const first=notes.findIndex(n=>n.sourceIndex>c.formatted.indexOf('V/.'));
      samples.set(c.id+':'+c.style,notes.slice(first).map(n=>n.pitch.toInt()));
    }
  }
  for(const id of ['47','448']) {
    const transposed=samples.get(id+':toned-verses'),ordinary=samples.get(id+':psalm-tone');
    expect(transposed).toEqual(ordinary.map(p=>p-5)); // the same melody a fourth lower, with do where fa was
    expect(transposed[0]).toBe(19); // G, a step below the respond's final A.
    expect(transposed.at(-1)).toBe(21); // A, do substituted for fa.
  }
  expect(JSON.stringify(context.g_tones)).toBe(tonesBefore);
});
