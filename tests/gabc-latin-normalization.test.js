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

const {resyllabifyLatin,cleanGregobaseGabc,moveStarsBeforeBars,accentFirstWord}=require('../gabc-latin-normalization');
const {accentLatinWord}=require('../gabc-latin-accents');
test('supplies the accent left off a word of three or more syllables, but not on a capital',()=>{
  expect(normalizeGabcLatin('(f3) Il(f)lu(hih)mi(h)na(f) fa(f)ci(f)em(ef) tu(e)am(h) Do(f)mi(f)ne,(e) (::)'))
    .toBe('(f3) Il(f)lú(hih)mi(h)na(f) fá(f)ci(f)em(ef) tu(e)am(h) Dó(f)mi(f)ne,(e) (::)');
  expect(normalizeGabcLatin('(c4) An(f)ge(g)lis(h) Is(f)ra(g)el(h) sæ(f)cu(g)li.(h) (::)'))
    .toBe('(c4) An(f)ge(g)lis(h) Is(f)ra(g)el(h) sǽ(f)cu(g)li.(h) (::)');
  expect(['Domine','elegi','Moysen','murmurátiónem','Dóminus','Deus','DOMINE'].map(accentLatinWord))
    .toEqual(['Dómine','elégi','Móysen','murmuratiónem','Dóminus','Deus','DOMINE']);
});
test('joins punctuation to its word so the whole word is divided',()=>{
  expect(normalizeGabcLatin('(c4) á(f)ni(g)ma(h) no(ef)stra :(f) (:) e(f)ius :(g) (::)'))
    .toBe('(c4) á(f)ni(g)ma(h) nos(ef)tra:(f) (:)\ne(f)jus:(g) (::)');
});
test('gives a verse score the notation and layout of the Graduale, and leaves the star of a return where it is',()=>{
  const source='(c3) Cla(hf)mor(h) me(gxhi)(;)(fh!jv)us(h) (::) ()~* Quóniam quis.() (::) \n<sp>V/</sp>. 2. Spé(d!ewf/[-2]ixhg)ci(j)e(gh) ca([oll:1{1]il)bis(kljk[oll:}]/iji) (::) (Z-) \n()* Et in sǽculum.() (::)\n';
  const result=normalizeGabcLatin(source);
  expect(result).toBe('(c3) Cla(hf)mor(h) me(gxhi;fh!jv)us(h) (::)\n()* Quóniam quis.() (::)\n<sp>V/</sp>. 2. Spé(d!ewf!ixhg)ci(j)e(gh) ca(il)bis(kljk/iji) (::)\n(Z-)\n()* Et in sǽculum.() (::)\n');
  expect(normalizeGabcLatin(result)).toBe(result);
  // the Graduale downloader alone moves a star before the bar it follows, which would take these from their words
  expect(moveStarsBeforeBars(result)).toContain('(::)\n*()\nQuóniam quis.()');
});
test('the Graduale downloader supplies a missing accent too, also in a first word that was in capitals',()=>{
  expect(resyllabifyLatin('(c4) nam(k) fi(k)li(j)us(i) tu(h)us(g.) Is(f)ra(g)el(h) (::)',{accentWord:accentLatinWord}).content)
    .toBe('(c4) nam(k) fí(k)li(j)us(i) tu(h)us(g.) Is(f)ra(g)el(h) (::)');
  expect(accentFirstWord('(c4) SA(e)pi(e[ll:1]d)en(g)ti(hj)a(j) *() réd(j)di(h)dit(g)',accentLatinWord))
    .toBe('(c4) SA(e)pi(e[ll:1]d)én(g)ti(hj)a(j) *() réd(j)di(h)dit(g)');
  expect(accentFirstWord('(c4) DO(f)mi(g)ne,(h) De(f)us(g)',accentLatinWord)).toBe('(c4) DO(f)mi(g)ne,(h) De(f)us(g)');
});
test('lists what it cannot settle for review, instead of stopping as the Graduale downloader does',()=>{
  const issues=[],source='(c4) xa(f)xe(g)xo(h) mur(f)mu(g)rá(h)ti(h)ó(g)nes(f) (::)';
  expect(normalizeGabcLatin(source,issues)).toBe(source);
  expect(issues).toEqual([{word:'xaxexo',syllables:['xa','xe','xo'],problem:'no accent'},
    {word:'murmurátiónes',syllables:['mur','mu','rá','ti','ó','nes'],problem:'more than one accent'}]);
  // the downloader of the Graduale stops at two accents; its own check for a missing one ignores case, so any vowel satisfies it
  expect(resyllabifyLatin('(c4) xa(f)xe(g)xo(h) (::)',{file:'test'}).content).toBe('(c4) xa(f)xe(g)xo(h) (::)');
  expect(()=>resyllabifyLatin('(c4) mur(f)mu(g)rá(h)ti(h)ó(g)nes(f) (::)',{id:1})).toThrow();
});
