const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const { applyReviewedSourceCorrections, verseHash } = require('../tools/offertory-source-corrections');
const ledger = require('../data/offertory-verses/corrections.json');
const raw = fs.readFileSync(path.join(__dirname, './fixtures/offertory/imported-sources/18146-original.gabc'), 'utf8');

describe('reviewed imported-source correction guards', () => {
  test('accepts the verified upstream animam fix with its retained extra space', () => {
    const source = fs.readFileSync(path.join(__dirname, './fixtures/offertory/imported-sources/18150-upstream.gabc'), 'utf8');
    expect(source).toContain('mam(ivhiHG)  me(');
    expect(applyReviewedSourceCorrections(source, 18150)).toBe(source);
    expect(() => applyReviewedSourceCorrections(source.replace('Con(e)', 'Con(f)'), 18150)).toThrow('needs source review');
  });
  test('removes only the unprinted animam bar without changing notes', () => {
    const source = fs.readFileSync(path.join(__dirname, './fixtures/offertory/imported-sources/18150-original.gabc'), 'utf8');
    const correction = ledger.corrections.find(record => record.sourceId === 18150);
    const corrected = applyReviewedSourceCorrections(source, 18150);
    expect(corrected).toBe(source.replace(correction.replacements[0].from, correction.replacements[0].to));
    expect(corrected.replace(/\s+/g, '').replace('mam(ivhiHG)me(', 'mam(ivhiHG)(:)me(')).toBe(source.replace(/\s+/g, ''));
    expect(verseHash(corrected)).toBe(correction.correctedVerseSha256);
    expect(applyReviewedSourceCorrections(corrected, 18150)).toBe(corrected);
  });
  test('restores only the missing mei clivis in the reviewed source', () => {
    const corrected = applyReviewedSourceCorrections(raw, 18146);
    expect(corrected).toBe(raw.replace('me(hv//g!hwihi)i :()', 'me(hv//g!hwihi)i :(ih)'));
    expect(verseHash(corrected)).toBe(ledger.corrections[0].correctedVerseSha256);
    expect(corrected).toContain('tu(hv//g!hwihi)a(ih)');
  });
  test('accepts an upstream fix without duplicating its notes', () => {
    const corrected = applyReviewedSourceCorrections(raw, 18146);
    expect(applyReviewedSourceCorrections(corrected, 18146)).toBe(corrected);
  });
  test('rejects a changed verse rather than applying a stale review', () => {
    expect(() => applyReviewedSourceCorrections(raw.replace('Be(h)á', 'Be(g)á'), 18146)).toThrow('needs source review');
  });
  test('allows metadata changes but leaves unrelated settings untouched', () => {
    const changedHeader = raw.replace('transcriber:Andrew Hinkley;', 'transcriber:Updated credit;');
    expect(applyReviewedSourceCorrections(changedHeader, 18146)).toContain('transcriber:Updated credit;');
    expect(verseHash(applyReviewedSourceCorrections(changedHeader, 18146))).toBe(ledger.corrections[0].correctedVerseSha256);
    expect(applyReviewedSourceCorrections(raw, 14204)).toBe(raw);
  });
});
