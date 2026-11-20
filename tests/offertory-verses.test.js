const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const { parse, lyrics, normalize, cueIndex, markResponse } = require('../offertory-verses.js');
const manifest = require('../data/offertory-verses/sources.json');
const manual = require('../data/offertory-verses/manual.json');
const data = require('../offertory-verses-data.js');

describe('offertory verse extraction', () => {
  test('takes the clef at the end of the antiphon, including a clef change at the double bar', () => {
    const parsed = parse('name: Example;\n%%\n(f3) A(f) (::c4) <sp>V/</sp>. 1. Ver(h)se.(g) (::)');
    expect(parsed.clef).toBe('c4');
    expect(parsed.gabc).toBe('<sp>V/</sp>. 1. Ver(h)se.(g) (::)');
  });
  test('handles an embedded header and a V without its slash', () => {
    const parsed = parse('name: First;\n%%\nname: Second;\n%%\n(c3) A(f) (::) <sp>V</sp>. Ver(g)se.(f) (::)');
    expect(parsed.clef).toBe('c3');
    expect(parsed.gabc).toStartWith('<sp>V/</sp>');
  });
  test('rejects empty or incomplete downloads', () => {
    for (const gabc of ['', '%%\n(c4) A(f) (::)', '%%\nA(f) <sp>V/</sp> V(h) (::)', '%%\n(c4) A(f) <sp>V/</sp> V(h)']) {
      expect(() => parse(gabc)).toThrow();
    }
  });
  test('every stored score starts with its clef and first verse, rather than an antiphon', () => {
    expect(Object.keys(data.full).length).toBe(manifest.chants.length + manual.chants.length);
    for (const entry of [...manifest.chants, ...manual.chants]) {
      const source = fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses', entry.id + '.gabc'), 'utf8');
      const body = source.split('%%')[1].trim();
      expect(source.split('%%').length).toBe(2);
      expect(body).toMatch(/^\([cf]b?[1-4]\) <sp>V\/<\/sp>/);
      expect(body).toMatch(/\([^)]*::[^)]*\)/);
      for (const id of entry.localIds) expect(data.fullById[id]).toBe(entry.id);
    }
  });
});

describe('respond cues', () => {
  test('ignores headers, accents, ligatures, neume spelling and syllable breaks', () => {
    const gabc = 'name: Et in saeculum;\n%%\n(c4) A(g) (::) et(h) in(h) sǽ(h)cu(g)lum.(g) (::)';
    const marked = markResponse(gabc, 'Et in sæculum.');
    expect(marked).toStartWith('name: Et in saeculum;');
    expect(marked).toContain('* <b>et</b>(h) <b>in</b>(h)');
    expect(normalize(lyrics(marked.split('%%')[1]))).toBe('aetinsaeculum');
  });
  test('supports the second occurrence and a shortened cue with an ellipsis', () => {
    const gabc = '(c4) Et(h) o(h)pus.(g) (:) Et(h) o(h)pus.(g) (::)';
    expect(markResponse(gabc, 'Et opus.', 2)).toContain('(:) * <b>Et</b>(h)');
    expect(cueIndex('(f3) Vir(f) e(h)rat.(g) (::)', 'Vir erat…tentáret.')).toBe(5);
  });
  test('leaves an absent cue unchanged', () => {
    expect(markResponse('(c4) A(f) (::)', 'Missing')).toBe('(c4) A(f) (::)');
  });
});


describe('return custodes', () => {
  const { responseCue, prepareFull } = require('../offertory-verses');
  test('uses the return pitch in the verse clef, rather than the verse final', () => {
    const antiphon = 'name: Etenim;\n%%\n(f3) A(c) (:) ét(fe)e(fgf)nim(fc) (::)';
    const result = prepareFull(antiphon, '(c4) <sp>V/</sp>. Di(h)ri(g)ge.(h) (::) *() Etenim.() (::)', 'Etenim');
    expect(result.antiphon).toContain('* <b>ét</b>(fe)<b>e</b>(fgf)<b>nim</b>(fc)');
    // The verse's h is where the offertory's last c would be under c4, so the offertory's f is at k.
    expect(result.gabc).toContain('(::k+) <nlba>*~Etenim.</nlba>() (Z)');
    expect(result.gabc).not.toContain('(::h+)');
  });
  // (which octave that is, is exsurge's rule; these are the three ways it can come out)
  test('writes the return in the octave the verse clef is sung in after a change between C and F clefs', () => {
    // As written (Dextera Domini): the verse's c under f3 is the h it follows under c4.
    expect(responseCue('(c4) Non(h) mó(j)ri(h)ar.(h) (::)', 'Non móriar.', 'f3', 1, '(f3) <sp>V/</sp>. In(c) tri(e)bu(f) (::)')).toContain('(::c+)');
    // An octave from where it is written (Ad te Domine): the verse's d under c4 would be below a custos under f3,
    // so it is sung an octave higher, where the offertory's f is.
    expect(responseCue('(f3) Ad(f) te(e) le(f)vá(h)vi.(f) (::)', 'Ad te', 'c4', 1, '(c4) <sp>V/</sp>. Dí(d)ri(f)ge(d) (::)')).toContain('(::d+)');
    // Where an explicit custos before the change shows it: c+ under c4 puts the verse's e an octave down.
    expect(responseCue('(c4) A(d)men.(d) (c+) (::)', 'Amen.', 'f3', 1, '(f3) Ver(e)sus.(f) (::)')).toContain('(::f+)');
  });
  test('each kind of clef keeps its octave through later changes, and one kind of clef needs none', () => {
    const score = '(f3) Ad(f) te(e) le(f)vá(h)vi.(f) (::) (c4) Dí(d)ri(f)ge(d) (::) (f2) Et(f) (::) (c3) in(h) (::)';
    expect(responseCue(score, 'Ad te', 'c3', 1)).toContain('(::b+)'); // d under c4, two steps lower under c3
    expect(responseCue('(f3) Et(f)e(f)nim.(f) (::)', 'Etenim.', 'f3')).toContain('(::f+)');
    expect(responseCue('(c4) Et(f)e(f)nim.(f) (::)', 'Etenim.', 'c2', 1, '(c2) Ver(d)sus.(d) (::)')).toContain('(::b+)');
    expect(responseCue('(fb3) Et(f)e(f)nim.(f) (::)', 'Etenim.', 'cb4', 1, '(cb4) Ver(d)sus.(d) (::)')).toContain('(::d+)');
  });
  test('keeps the custos for the next verse where the bar after a return changes the clef', () => {
    const antiphon = '(c3) Tól(f)li(f)te.(f) (:) Et(h) in(h)tro(i)í(h)bit.(f) (::)';
    // as Tollite portas has it on GregoBase, and with the note written out
    for (const [bar, custos] of [['(z0::f3)', 'z0'], ['(d+::f3)', 'd+']]) {
      const result = prepareFull(antiphon, `(c3) <sp>V/</sp>. 1. Dó(h)mi(h)ni.(e) (::) ()* Et introíbit.() ${bar} <sp>V/</sp>. 2. Ip(b)se.(c) (::) ()* Et introíbit.() (::)`);
      expect(result.gabc).toContain(`(::h+) <nlba>*~Et introíbit.</nlba>() (Z${custos}f3) <sp>V/</sp>. 2.`);
      expect(result.gabc).toEndWith('(::e+) <nlba>*~Et introíbit.</nlba>() (Z)'); // h under c3, as b is e
    }
  });
  test('takes the first note of the return, not a flat before it', () => {
    expect(responseCue('(c4) DO(ixfh!iv)mi(h)ne.(h) (::)', 'Dómine.', 'c4')).toContain('(::f+)');
  });
  test('restores the verse clef if the custos needs a different staff', () => {
    expect(responseCue('(c1) Et(m)e(m)nim.(m) (::)', 'Etenim.', 'c4')).toContain('(c1) (::m+)');
    expect(responseCue('(c1) Et(m)e(m)nim.(m) (::)', 'Etenim.', 'c4')).toEndWith('(c4)');
  });
  test('a return to the very beginning leaves the large initial out of the bold', () => {
    const start = '(c4) DE(d) pro(f)fún(g)dis(f) *(,) cla(g)má(h)vi(g) (::)';
    expect(markResponse(start, 'De profundis')).toBe('(c4) D<b>E</b>(d) <b>pro</b>(f)<b>fún</b>(g)<b>dis</b>(f) *(,) cla(g)má(h)vi(g) (::)');
    expect(markResponse('(c4) A(d) te(f) le(g)vá(f)vi(g) (::)', 'A te')).toBe('(c4) A(d) <b>te</b>(f) le(g)vá(f)vi(g) (::)');
    // with no large initial the first letter is bold like the rest
    expect(markResponse('initial-style: 0;\n%%\n' + start, 'De profundis')).toContain('(c4) <b>DE</b>(d) <b>pro</b>');
    expect(markResponse(start, 'clamavi')).toContain('<b>cla</b>(g)<b>má</b>(h)<b>vi</b>(g)');
  });
  test('does not duplicate the asterisk or bold tags when a cue is used after two verses', () => {
    const once = markResponse('(c4) Et(h)e(g)nim.(f) (::)', 'Etenim.');
    expect(markResponse(once, 'Etenim.')).toBe(once);
  });
});


test('keeps an existing mediant asterisk when bolding the return word', () => {
  const result = markResponse('(c4) Me(g)i(g) *(:) ét(h)e(g)nim(f) (::)', 'Etenim.');
  expect(result.match(/\*/g).length).toBe(1);
  expect(result).toContain('*(:) <b>ét</b>');
});


test('can return to an alternative respond first introduced within a verse', () => {
  const { prepareFull } = require('../offertory-verses');
  const result = prepareFull('(c4) A(f) (::)', '(c3) <sp>V/</sp> Ver(f)se(g) (:) Au(h)fer(g) a(f) ple(e)be.(e) (::) <sp>V/</sp> Next(g) (::) *() Aufer a plebe.() (::)');
  expect(result.gabc).toContain('* <b>Au</b>(h)<b>fer</b>(g)');
  expect(result.gabc).toContain('(::h+) <nlba>*~Aufer a plebe.</nlba>()');
});


describe('verse selection', () => {
  const { splitVerses, takeVerses, psalmVerseText } = require('../offertory-verses');
  const verses = '(c4) <sp>V/</sp>. 1. Pri(h)mus(g) (::c3) <sp>V/</sp>. 2. Se(f)cun(g)dus.(f) (::)';
  test('counts the source verse markers and retains the clef for each verse', () => {
    expect(splitVerses(verses).map(verse => verse.clef)).toEqual(['c4', 'c3']);
    expect(takeVerses(verses, 0)).toBe('');
    expect(takeVerses(verses, 1)).toBe('(c4) <sp>V/</sp>. 1. Pri(h)mus(g) (::)');
    expect(takeVerses(verses, 2)).toBe(verses);
  });
  test('extracts verse words without their label or ending repeat cue', () => {
    expect(psalmVerseText('<sp>V/</sp>. 2. Pri(h)mus(g) (:) se(f)cun(g)dus.(f) (::) *() Antiphon.() (::)')).toBe('Primus * secundus.');
  });
});

test('omits an unavailable Alleluia alternative from the sine Alleluia setting', () => {
  const { prepareFull } = require('../offertory-verses');
  const antiphon = '(c4) A(f) (:) Ti(g)bi(h) óf(h)fe(g)rent(g) (::)';
  const result = prepareFull(antiphon, '(c4) <sp>V/</sp> Ver(g)se.(g) (::) *() Tibi ófferent. <i>vel</i> * Allelúia.() (::)');
  expect(result.gabc).toContain('(::g+) <nlba>*~Tibi ófferent.</nlba>()');
  expect(result.gabc).not.toContain('Allelúia');
  expect(result.antiphon).toContain('* <b>Ti</b>(g)<b>bi</b>(h)');
});

test('a respond sung in full after a verse marks that phrase in the offertory, not an earlier use of its first word', () => {
  const { prepareFull } = require('../offertory-verses');
  const antiphon = '(c4) Mi(f)hi(g) ni(h)mis(g) ho(f)no(g)rá(h)ti(g) sunt:(f) (:) ni(d)mis(f) con(g)for(h)tá(g)tus(f) est.(f) (::)';
  const result = prepareFull(antiphon, '(c4) <sp>V/</sp> Ver(g)sus.(f) (::) * Ni(f)mis(h) con(h)for(g)tá(g)tus(f) est.(f) (::)', null);
  expect(result.antiphon).toContain('(:) * <b>ni</b>(d)<b>mis</b>(f)');
  expect(result.antiphon).toContain('hi(g) ni(h)mis(g)');
});
