const {test,expect}=require('bun:test');
const {normalizeLatinLyrics,normalizeGabcLatin}=require('../gabc-latin-normalization');
test('shares application ligature spelling, including accents and Gregorio special characters',()=>{
  const source="ae oe aé oé AE Ae OE Oe Aé AÉ <sp>ae</sp> <sp>oe</sp> <sp>'ae</sp> <sp>'æ</sp> <sp>'oe</sp> <sp>'œ</sp>";
  expect(normalizeLatinLyrics(source)).toBe('æ œ ǽ œ́ Æ Æ Œ Œ Ǽ Ǽ æ œ ǽ ǽ œ́ œ́');
});
test('leaves pitches, separate syllables, diaereses and markup unchanged',()=>{
  const source='(c4) cae(ae/AE)li(oe) <i>ae</i> a(f)e(g) aë(h) <span title="ae">oe</span> (::)';
  expect(normalizeLatinLyrics(source)).toBe('(c4) cæ(ae/AE)li(oe) <i>æ</i> a(f)e(g) aë(h) <span title="ae">œ</span> (::)');
});
test('normalizes only the body of a complete score and is idempotent',()=>{
  const source='name: Caeli;\ntranscriber: Aeneas;\n%%\n(c4) Cae(ae)li(f) coe(g)lum.(h) (::)';
  const normalized=normalizeGabcLatin(source);
  expect(normalized).toBe('name: Caeli;\ntranscriber: Aeneas;\n%%\n(c4) Cæ(ae)li(f) cœ(g)lum.(h) (::)');
  expect(normalizeGabcLatin(normalized)).toBe(normalized);
});
test('uses the regular downloader Latin patterns without moving notation groups',()=>{
  expect(normalizeGabcLatin('(c4) o(f)mnis(g) pa(h)trem(i) (::)')).toBe('(c4) om(f)nis(g) pa(h)trem(i) (::)');
  expect(normalizeGabcLatin('(c4) Iu(f)stus(g) e(h)ius(i) fí(j)li(k)o(l) (::)')).toBe('(c4) Jus(f)tus(g) e(h)jus(i) fí(j)li(k)o(l) (::)');
  expect(normalizeGabcLatin('(c4) al(f)le(g)lú(h)ia(i) é(f)ia(g) (::)')).toBe('(c4) al(f)le(g)lú(h)ia(i) é(f)ia(g) (::)');
});
test('flags missing syllable groups instead of inventing or redistributing music',()=>{
  const issues=[],source='(c4) sylla(f)ba(g) (::)';
  expect(normalizeGabcLatin(source,issues)).toBe(source);
  expect(issues).toEqual([{word:'syllaba',syllables:['sylla','ba'],expected:['syl','la','ba']}]);
});
test('keeps all note groups intact through resyllabification, accents and consonantal j',()=>{
  const source='(c3) o(ae)mnis(g;h) e(ij/ji)ius(hg) Dó(f)mi(g)nus(h) (::)';
  const result=normalizeGabcLatin(source);
  expect(result.match(/\([^)]*\)/g)).toEqual(source.match(/\([^)]*\)/g));
  expect(normalizeGabcLatin(result)).toBe(result);
});
