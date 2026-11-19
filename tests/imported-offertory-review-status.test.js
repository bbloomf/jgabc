const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const manifest = require('../data/offertory-verses/sources.json');
const data = require('../offertory-verses-data');
const baseline = require('./fixtures/offertory/imported-review-baseline.json').chants;
const { bodyHash } = require('../download-offertory-verses');

// Review transfers only when both the reviewed raw source and the normalized
// application body agree with the independently retained evidence.
function expectedReview(entry, applicationSource) {
  const record = baseline[entry.id];
  const body = applicationSource.slice(applicationSource.lastIndexOf('%%') + 2);
  return entry.review === 'verified' && entry.verseReview?.sha256 === record.sourceVerseSha256 &&
    bodyHash(body) === record.normalizedApplicationBodySha256 ? 'verified' : 'pending';
}

test('every imported review status follows exact source evidence and the application body', () => {
  expect(Object.keys(baseline).sort()).toEqual(manifest.chants.map(e => String(e.id)).sort());
  for (const entry of manifest.chants) {
    const source = fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses', entry.id + '.gabc'), 'utf8');
    expect(data.full[entry.id].review, String(entry.id)).toBe(expectedReview(entry, source));
    // A pitch edit cannot inherit a verified status from a count or manifest flag.
    expect(expectedReview(entry, source + ' (f)')).toBe('pending');
    expect(expectedReview({ ...entry, verseReview: { sha256: 'unreviewed' } }, source)).toBe('pending');
  }
});
