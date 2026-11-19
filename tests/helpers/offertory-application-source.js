const assert = require('node:assert/strict');
const { normalizeGabcLatin } = require('../../gabc-latin-normalization');
const body = source => source.slice(source.lastIndexOf('%%') + 2).replace(/\r\n?/g, '\n').trim();

function applicationReview(id, source, application) {
  const canonical = body(normalizeGabcLatin(source)), actual = body(application);
  assert.equal(actual, canonical, id + ': application differs from its proofread source');
  return 'verified';
}
module.exports = { body, applicationReview };
