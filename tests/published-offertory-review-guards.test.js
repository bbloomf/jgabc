const { test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const { applicationReview } = require('./helpers/offertory-application-source');
const comparison = require('./fixtures/offertory/published/comparison.json');
const { normalizeGabcLatin } = require('../gabc-latin-normalization');

for (const id of ['manual-041', 'manual-078']) test(id + ': application retains the simpler proofread notation', () => {
  const record = comparison.checks.find(c => c.id === id);
  const source = fs.readFileSync(path.join(__dirname, 'fixtures/offertory/published', record.verseOnlyFile), 'utf8');
  const app = fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses', id + '.gabc'), 'utf8');
  expect(applicationReview(id, source, app)).toBe('verified');
  expect(applicationReview(id, source, normalizeGabcLatin(source))).toBe('verified');
  // Pitch, rhythm, grouping and layout edits must not diverge from the source.
  expect(() => applicationReview(id, source, app + ' A(f)')).toThrow('differs from its proofread source');
  expect(() => applicationReview(id, source, app.replace(/\(([a-m])/i, '($1.'))).toThrow('differs from its proofread source');
  expect(() => applicationReview(id, source, app + ' (z)')).toThrow('differs from its proofread source');
});

test('application changes cannot inherit the published source review', () => {
  const record = comparison.checks.find(c => c.id === 'manual-039');
  const source = fs.readFileSync(path.join(__dirname, 'fixtures/offertory/published', record.verseOnlyFile), 'utf8');
  expect(() => applicationReview(record.id, source, normalizeGabcLatin(source) + ' (f)')).toThrow('differs from its proofread source');
});


test('unnecessary cuts and fusion cannot reappear in the application copies', () => {
  for(const [id,from,to] of [['manual-041','hiwj','h!iwj'],['manual-078','ew!fef','ew@fef']]) {
    const record=comparison.checks.find(c=>c.id===id);
    const source=fs.readFileSync(path.join(__dirname,'fixtures/offertory/published',record.verseOnlyFile),'utf8');
    const canonical=normalizeGabcLatin(source);
    expect(canonical).toContain(from);
    expect(()=>applicationReview(id,source,canonical.replace(from,to))).toThrow('differs from its proofread source');
  }
});
