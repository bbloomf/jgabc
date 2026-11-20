const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const { firstAntiphon, antiphonSummary, sameAntiphon } = require('../download-offertory-verses');
const antiphons = require('../data/offertory-verses/antiphons.json');
const data = require('../offertory-verses-data.js');

// The Offertoriale prints each offertory before its verses, but the app sings the verses after the offertory it
// already has. data/offertory-verses/antiphons.json is what the importer saw of the printed one.
test('each offertory is the one its verses were written for: the same words, first note and last note', () => {
  const different = [];
  for (const [id, sourceId] of Object.entries(data.fullById)) {
    const local = antiphonSummary(firstAntiphon(fs.readFileSync(path.join(__dirname, '../gabc', id + '.gabc'), 'utf8')));
    expect(antiphons[sourceId], 'no offertory recorded for ' + sourceId).toBeTruthy();
    if (!sameAntiphon(antiphons[sourceId], local)) different.push({ id, sourceId, offertoriale: antiphons[sourceId], local });
  }
  expect(different).toEqual([]);
});

test('the comparison follows the clef, stops at the double bar and allows for the seasonal Alleluia', () => {
  const summary = antiphonSummary('(c4) Jus(d)tus(f) (c3) ut(d) pal(c.) (::) <sp>V/</sp> Bo(h)num(g) (::)');
  expect(summary).toEqual({ text: 'Justus ut pal', firstPitch: -6, lastPitch: -5 });
  expect(sameAntiphon(summary, antiphonSummary('(f3) Iús(f)tus(h) ut(h/i) pal(g) (::)'))).toBe(true);
  expect(sameAntiphon(summary, antiphonSummary('(c4) Jus(d)tus(f) ut(f) pal(e) al(e)le(f)lú(g)ia.(e) (::)'))).toBe(true);
  expect(sameAntiphon(summary, antiphonSummary('(c4) Jus(d)tus(f) ut(f) pal(f) (::)'))).toBe(false);
  expect(sameAntiphon(summary, antiphonSummary('(c4) Jus(e)tus(f) ut(f) pal(e) (::)'))).toBe(false);
  expect(sameAntiphon(summary, antiphonSummary('(c4) Jus(d)tus(f) ut(f) ce(e) (::)'))).toBe(false);
});
