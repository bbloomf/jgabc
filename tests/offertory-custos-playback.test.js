const { test, expect } = require('bun:test');
const exsurge = require('../exsurge.min.js');
const { context: utilities } = require('./helpers/offertory-feature-context');
const { cases } = require('./helpers/offertory-feature-cases');

function parse(source) {
  const ctxt = new exsurge.ChantContext();
  const score = new exsurge.ChantScore(ctxt, exsurge.Gabc.createMappingsFromSource(ctxt, source), false);
  return { ctxt, score };
}

function layout(ctxt, score, width) {
  score.performLayout(ctxt);
  score.layoutChantLines(ctxt, width);
  const svg = score.createSvg(ctxt);
  expect(svg).toContain('<svg');
  expect(svg).not.toMatch(/NaN|Infinity/);
}

// A custos is read under the preceding section's clef/register. Compare its
// sounding pitch with the next note, rather than checking staff position alone.
function checkCustodes(score) {
  const played = utilities.getPlaybackPitches(score);
  const notes = score.notations.flatMap(n => n.notes || []);
  const clefs = [], previous = [];
  let clef = score.startingClef, lastNote;
  for (const notation of score.notations) {
    if (notation.isClef) clef = notation;
    clefs.push(clef);
    previous.push(lastNote);
    if (notation.notes?.length) lastNote = notation.notes.at(-1);
  }
  let automatic = 0, lineEnds = 0;
  function check(custos, index, activeClef) {
    const before = previous[index];
    const after = score.notations.slice(index + (score.notations[index] === custos ? 1 : 0))
      .flatMap(n => n.notes || [])[0];
    if (!after) return;
    const offset = before ? played.get(before) - before.pitch.toInt() : 0;
    expect(activeClef.staffPositionToPitch(custos.staffPosition).toInt() + offset).toBe(played.get(after));
  }
  score.notations.forEach((notation, index) => {
    if (notation instanceof exsurge.Custos && notation.auto) {
      check(notation, index, clefs[index]);
      automatic++;
    }
  });
  for (const line of score.lines) if (line.custos?.auto) {
    const end = line.notationsStartIndex + line.numNotationsOnLine;
    // The current clef is the one immediately before the next line, including
    // a line that ends at a clef change; source z0 is checked separately above.
    check(line.custos, end, clefs[end - 1] || line.startingClef);
    lineEnds++;
  }
  return { automatic, lineEnds, notes: notes.length };
}

test('Dextera automatic custos and first full verse both predict a unison', () => {
  let checked = 0;
  for (const c of cases()) if (['47', '448'].includes(c.id) && c.style === 'full' && c.count) {
    const { ctxt, score } = parse(c.formatted);
    for (const width of [360, 1100]) {
      layout(ctxt, score, width);
      expect(checkCustodes(score).automatic).toBeGreaterThan(0);
      const custos = score.notations.find(n => n instanceof exsurge.Custos && n.auto);
      expect(custos.staffPosition).toBe(5); // A on the preceding C4 staff.
    }
    checked++;
  }
  expect(checked).toBe(4);
});

test('automatic custodes follow the shared register in both directions and after line breaks', () => {
  for (const source of [
    '(c4) A(h) (z0::f3) V/. B(cec) (z) C(ef) (z0::c4) V/. D(hj)',
    '(f3) A(c) (z0::c4) V/. B(hjh) (z) C(ji) (z0::f3) V/. D(ce)',
    '(f3) A(f) (z0::c4) V/. B(dh) (z) C(gh)'
  ]) {
    const { ctxt, score } = parse(source);
    for (const width of [180, 600]) {
      layout(ctxt, score, width);
      const checked = checkCustodes(score);
      expect(checked.automatic).toBeGreaterThan(0);
      expect(checked.lineEnds).toBeGreaterThan(0);
    }
  }
});

test('custodes and playback follow an edit of the same score', () => {
  const sources = [
    '(c4) A(h) (z0::f3) V/. B(c)',
    '(f3) A(c) (z0::c4) V/. B(h)',
    '(c4) A(h) (z0::f3) V/. B(c)'
  ];
  const { ctxt, score } = parse(sources[0]);
  for (const source of sources) {
    exsurge.Gabc.updateMappingsFromSource(ctxt, score.mappings, source);
    score.updateNotations(ctxt);
    layout(ctxt, score, 600);
    expect(checkCustodes(score).automatic).toBe(1);
  }
});

test('the shared register leaves written notes and explicit custodes intact', () => {
  for (const source of [
    '(c4) A(h) (h+z0::f3) V/. B(c)',
    '(f3) A(c) (c+z0::c4) V/. B(h)'
  ]) {
    const { ctxt, score } = parse(source);
    const notes = score.notations.flatMap(n => n.notes || []);
    const before = notes.map(n => [n.sourceGabc, n.staffPosition, n.pitch.toInt()]);
    const explicit = score.notations.filter(n => n instanceof exsurge.Custos && !n.auto);
    expect(explicit).toHaveLength(1);
    const position = explicit[0].staffPosition;
    for (const width of [180, 600]) {
      layout(ctxt, score, width);
      utilities.getPlaybackPitches(score);
      expect(explicit[0].staffPosition).toBe(position);
      expect(notes.map(n => [n.sourceGabc, n.staffPosition, n.pitch.toInt()])).toEqual(before);
    }
  }
});
