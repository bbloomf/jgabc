// Exact, source-hash-guarded corrections for reviewed imported verse bodies.
// Pure transform: does not fetch, write scores, or modify publication records.
const crypto = require('crypto');
const { parse } = require('../offertory-verses');
const ledger = require('../data/offertory-verses/corrections.json');

function verseHash(source) {
  const parsed = parse(source);
  return crypto.createHash('sha256').update((parsed.clef + '\n' + parsed.gabc)
    .replace(/\r\n?/g, '\n').trim()).digest('hex');
}

function applyReviewedSourceCorrections(source, sourceId) {
  const correction = ledger.corrections.find(record => String(record.sourceId) === String(sourceId));
  if (!correction) return source;
  const current = verseHash(source);
  // An upstream fix must not get the same notes added a second time.
  if (current === correction.correctedVerseSha256 || (correction.acceptedCorrectedVerseSha256 || []).includes(current)) return source;
  if (current !== correction.sourceVerseSha256) {
    throw new Error(`Reviewed correction for ${sourceId} needs source review: verse body hash changed`);
  }
  let corrected = source;
  for (const { from, to } of correction.replacements) {
    if (corrected.split(from).length !== 2) throw new Error(`Ambiguous reviewed correction for ${sourceId}`);
    const verseStart = corrected.lastIndexOf('%%') + 2;
    if (corrected.indexOf(from) < verseStart) throw new Error(`Reviewed correction for ${sourceId} targets a header`);
    corrected = corrected.replace(from, to);
  }
  if (verseHash(corrected) !== correction.correctedVerseSha256) {
    throw new Error(`Reviewed correction for ${sourceId} produced an unexpected verse body`);
  }
  return corrected;
}

module.exports = { applyReviewedSourceCorrections, verseHash };
