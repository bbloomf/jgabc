const { test, expect } = require('bun:test');
const { runAudit } = require('../tools/audit-offertory-pitches');
const audit = runAudit();

test('all offered verse counts in both seasons use the reference pitch octave under every clef', () => {
  expect(audit.cases).toHaveLength(1448);
  expect(new Set(audit.cases.filter(c=>c.sourceId).map(c=>String(c.sourceId))).size).toBe(104);
  expect(audit.cases.reduce((n,c)=>n+c.notes,0)).toBeGreaterThan(370000);
  expect(audit.cases.flatMap(c=>c.errors)).toEqual([]);
  expect(audit.cases.reduce((n,c)=>n+c.automaticCustodes,0)).toBeGreaterThan(20);
  expect(audit.cases.reduce((n,c)=>n+c.lineEndCustodes,0)).toBeGreaterThan(12000);
  for(const row of audit.cases) for(const difference of row.custosAccidentalDifferences) {
    expect(Math.abs(difference.precedingClefPitch-difference.nextSungPitch)).toBe(1);
  }
  expect(audit.cases.flatMap(c=>c.transitions).length).toBeGreaterThan(20);
});

test('every natural and flat C/F clef pair on lines 1–5 preserves the reference octave', () => {
  expect(audit.matrix.pairs).toBe(200);
  expect(audit.matrix.staffPositions).toBe(260);
  expect(audit.matrix.playbackOctaveJoins).toBe(1520);
  expect(audit.matrix.equivalentNotes).toBe(1672);
  expect(audit.matrix.errors).toEqual([]);
});

test('the actual Ad te Domine full-verse join is D to D in both seasons', () => {
  const rows=audit.cases.filter(c=>c.id==='962'&&c.style==='full');
  expect(rows).toHaveLength(4);
  for(const row of rows) {
    expect(row.transitions[0].semitones).toBe(0);
    expect(row.transitions[0].beforeName).toBe('D1');
    expect(row.transitions[0].afterName).toBe('D1');
  }
});

test('playback has no octave jumps at the Dextera Domini and Tollite portas C/F joins', () => {
  const formerlyDropped=audit.cases.flatMap(c=>c.transitions).filter(t=>t.writtenSemitones===-12);
  expect(formerlyDropped).toHaveLength(10);
  for(const join of formerlyDropped) {expect(join.semitones).toBe(0);expect(join.playbackBeforeName).toBe(join.playbackAfterName);}
  expect(audit.octaveJumps).toEqual([]);
  expect(audit.largeJoinLeaps).toEqual([]);
  expect(audit.sectionOctaveJumps).toEqual([]);
  expect(audit.cases.reduce((n,c)=>n+c.sectionJoins.length,0)).toBe(2372);
});


test('Dextera Domini first full verse is a unison in every offered selection and season', () => {
  const rows=audit.cases.filter(c=>['47','448'].includes(c.id)&&c.style==='full');
  expect(rows).toHaveLength(8);
  for(const row of rows) {
    expect(row.sectionJoins[0].semitones).toBe(0);
    expect(row.transitions[0].playbackBeforeName).toBe(row.transitions[0].playbackAfterName);
  }
});

test('every assembled C/F verse join uses its nearest possible octave', () => {
  for(const row of audit.cases) for(const join of row.sectionJoins.filter(j=>j.from[0]!==j.to[0])) {
    expect(Math.abs(join.semitones)).toBeLessThanOrEqual(Math.abs(join.semitones-12));
    expect(Math.abs(join.semitones)).toBeLessThanOrEqual(Math.abs(join.semitones+12));
  }
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
      const starts=context.getOffertoryPlaybackSections(score,c.formatted),notes=score.notations.flatMap(n=>n.notes||[]);
      const first=notes.findIndex(n=>starts.has(n));
      samples.set(c.id+':'+c.style,notes.slice(first).map(n=>n.pitch.toInt()));
    }
  }
  for(const id of ['47','448']) {
    const transposed=samples.get(id+':toned-verses'),ordinary=samples.get(id+':psalm-tone');
    expect(transposed).toEqual(ordinary.map(p=>p+7));
    expect(transposed[0]).toBe(19); // G, a step below the respond's final A.
    expect(transposed.at(-1)).toBe(21); // A, do substituted for fa.
  }
  expect(JSON.stringify(context.g_tones)).toBe(tonesBefore);
});
