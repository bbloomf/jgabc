const { test, expect } = require('bun:test');
const exsurge = require('../exsurge.min');
const { cases } = require('./helpers/offertory-feature-cases');
const { unlinkedCases } = require('./helpers/offertory-unlinked-cases');

const { tools } = require('./helpers/offertory-feature-cases');

// One pass over every offertory with every choice of verses, as the app hands it to exsurge. Each score is parsed,
// looked at and let go; only what the tests below ask about is kept.
let found;
function survey() {
  if (found) return found;
  found = { scores: 0, unplayable: [], changes: 0, leaps: [], returns: 0, otherClef: 0, misplaced: [] };
  for (const c of [...cases(), ...unlinkedCases()]) {
    const source = c.formatted || c.gabc, label = `${c.id} ${c.style} ${c.count}`;
    const ctxt = new exsurge.ChantContext(), score = new exsurge.ChantScore(ctxt, exsurge.Gabc.createMappingsFromSource(ctxt, source), false);
    const sung = score.getPlaybackPitches(), notes = score.notations.flatMap(n => n.notes || []);
    found.scores++;
    if (!notes.length || notes.some(note => !Number.isFinite(sung.get(note)) || (sung.get(note) - note.pitch.toInt()) % 12)) found.unplayable.push(label);
    // how far from where it is written exsurge sings each kind of clef, at each explicit custos, and where each
    // note is sung without its flat or sharp, which a custos doesn't show
    const offsets = new Map(), custodes = [], natural = new Map();
    let clef = score.startingClef, kind = clef.constructor, last;
    for (const notation of score.notations) {
      if (notation.isClef) clef = notation;
      else if (notation.auto === false) custodes.push({ at: notation.sourceIndex, sung: clef.staffPositionToPitch(notation.staffPosition).toInt() + offsets.get(clef.constructor) });
      if (!notation.notes || !notation.notes.length) continue;
      if (clef.constructor !== kind && last) {
        found.changes++;
        if (Math.abs(sung.get(notation.notes[0]) - sung.get(last)) >= 12) found.leaps.push(label);
      }
      kind = clef.constructor;
      last = notation.notes[notation.notes.length - 1];
      for (const note of notation.notes) {
        offsets.set(kind, sung.get(note) - note.pitch.toInt());
        natural.set(note, clef.staffPositionToPitch(note.staffPosition).toInt() + offsets.get(kind));
      }
    }
    for (const m of source.matchAll(/\(::([a-m])\+\)\^?\s*<nlba>\*~([\s\S]*?)<\/nlba>\^?\(\)/g)) {
      // (earlier returns are blanked, not removed, to keep the indices of the source)
      const earlier = source.slice(0, m.index).replace(/<nlba>\*~[\s\S]*?<\/nlba>\^?\(\)/g, cue => ' '.repeat(cue.length));
      const occurrence = (c.simple && tools.normalize(c.simple.cue) === tools.normalize(m[2]) && c.simple.occurrence) ||
        (c.full && c.full.cueOccurrences && c.full.cueOccurrences[tools.normalize(m[2])]);
      const info = tools.cueInfo(earlier, m[2], occurrence);
      const target = info && notes.find(n => n.sourceIndex >= info.start && n.sourceIndex < info.pitchEnd);
      const custos = custodes.find(k => k.at >= m.index && k.at < m.index + m[0].length);
      found.returns++;
      if (!target || !custos || custos.sung !== natural.get(target)) found.misplaced.push(`${label}: ${m[2]}`);
      else if (info.clef[0] !== tools.lastClef(earlier)[0]) found.otherClef++;
    }
  }
  return found;
}

// Which octave a verse is sung in under another kind of clef is exsurge's to decide. This checks what the app hands it:
// every offertory with every choice of verses can be played, and none of them jumps an octave where the clef changes.
test('every offertory with verses can be played, with no octave leap at a change between a C and an F clef', () => {
  const { scores, unplayable, changes, leaps } = survey();
  expect(scores).toBeGreaterThan(0);
  expect(unplayable).toEqual([]);
  expect(changes).toBeGreaterThan(0);
  expect(leaps).toEqual([]);
});

// The app writes the custos of a return itself, in the octave exsurge sings the clef in by then.
test('the custos of every return is where exsurge sings the first note of the return', () => {
  const { returns, otherClef, misplaced } = survey();
  expect(returns).toBeGreaterThan(0);
  expect(otherClef).toBeGreaterThan(0); // returns from an F clef to a C clef or back
  expect(misplaced).toEqual([]);
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
