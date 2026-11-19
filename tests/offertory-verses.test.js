const {applicationReview}=require('./helpers/offertory-application-source');
const {baseline,reviewedStatus}=require('./helpers/offertory-baseline');
const {normalizeGabcLatin}=require('../gabc-latin-normalization');
const notationBody=source=>source.slice(source.lastIndexOf('%%')+2).replace(/\r\n?/g,'\n').trim();
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

describe('manual source isolation', () => {
  const { readManual, bodyHash, verseReviewStatus } = require('../download-offertory-verses');
  test('completed batches publish their authoritative verse-only sources', () => {
    expect(manual.chants.map(entry => entry.bookNumber)).toEqual([39, 41, 44, 48, 50, 67, 77, 78, 79, 81, 82, 83, 86, 89, 90, 91, 94, 95, 96, 97, 98, 99, 102]);
    expect(manual.drafts).toEqual([]);
    for (const entry of manual.chants) {
      const { source, parsed } = readManual(entry);
      expect(source).not.toContain('UNVERIFIED WORKING DRAFT');
      expect(require('../offertory-verses').splitVerses('(' + parsed.clef + ') ' + parsed.gabc).length).toBe(entry.verseCount);
      const appSource=fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses', entry.id + '.gabc'), 'utf8');
      const appReview=applicationReview(entry.id,source,appSource);
      expect(appReview).toBe('verified');
      expect(data.full[entry.id].review).toBe(reviewedStatus(entry,parsed));
      expect(data.full[entry.id].verseCount).toBe(entry.verseCount);
      // The application body must match the normalized proofread source exactly.
      for (const id of entry.localIds) expect(data.fullById[id]).toBe(entry.id);
    }
  });
  test('manual review uses the same exact-body integrity check as downloads', () => {
    const { parsed } = readManual(manual.chants[0]);
    const entry = { review: 'verified', verseReview: { sha256: bodyHash(parsed.clef + '\n' + parsed.gabc) } };
    expect(reviewedStatus(entry, parsed)).toBe('verified');
    expect(verseReviewStatus(entry, { ...parsed, gabc: parsed.gabc + ' (h)' })).toBe('pending');
    expect(() => readManual({ id: '../sources' })).toThrow('Invalid manual key');
  });
  test('Hæc dies retains its note forms without a cut before the quilisma', () => {
    const { parsed } = readManual({ id: 'manual-039' });
    expect(parsed.gabc).toContain('Hæc(dewfe/fvEDe) di(ef!gwhf/gvFEf)es,(fe)');
    expect(parsed.gabc).not.toContain('efwghf');
  });
  test('close quilisma joins keep separate glyph groups without added space', () => {
    const { parsed } = readManual({ id: 'manual-039' });
    expect(parsed.gabc).toContain('runt(hi!jwkvJI)');
    expect(parsed.gabc).toContain('cán(jl/i!jwk/li;kkki/kkkvIH/i!jwkk)');
    expect(parsed.gabc).toContain('mi(egwhfg)');
    expect(parsed.gabc).not.toContain('ef/gwhf');
    expect(parsed.gabc).not.toContain('hi/jwkvJI');
  });
  test('Fecit starts with a separate e followed by the fhg torculus', () => {
    const { parsed } = readManual({ id: 'manual-039' });
    expect(parsed.gabc).toContain('fe(e!fhg)cit(');
    expect(parsed.gabc).not.toContain('fe(ef!hg)');
  });
  test('Exsultemus and laetemur retain half bars, full cadence, and the small cut before climacus', () => {
    const { parsed } = readManual({ id: 'manual-039' });
    expect(parsed.gabc).toContain('fe;gxf/hh/hf/hh/ivHF/fdewfefe/gf/gvED;ef/hf/fdewfef)mus(fe) (:)');
    expect(parsed.gabc).toContain('fe;gxf/hh/hf/hh/ivHF/fdewfefe/gf/gvED;hf/fdewfef)mur(fe) (;)');
    expect(parsed.gabc).toContain('e(f/hhe/hvFE/ed,ehFE/fvED/e)a.(de)');
  });
  test('Lapidem keeps the lower inclinata after the k virga', () => {
    const { parsed } = readManual({ id: 'manual-039' });
    expect(parsed.gabc).toContain('pi(i/k/kvIH/iji)dem,');
    expect(parsed.gabc).not.toContain('pi(i/k/kvJI/iji)');
  });
  test('Qui custodit ends with the porrectus starting on ti', () => {
    const { parsed } = readManual({ id: 'manual-041' });
    expect(parsed.gabc).toContain('dit(egFE/hhg/hg/j/jh/igh)');
  });
  test('compact rising groups keep the separately printed lower note heads', () => {
    const lauda = readManual({ id: 'manual-041' }).parsed.gabc;
    const confitebor = readManual({ id: 'manual-044' }).parsed.gabc;
    const benedictus = readManual({ id: 'manual-048' }).parsed.gabc;
    expect(lauda).toContain('tó(fgh)');
    expect(confitebor).toContain('con(dfd/fgh)');
    expect(confitebor).toContain('ser(dc/d/f/fgh/jh/hg;fh/jh/hfg)');
    expect(confitebor).toContain('tu(d/fffghFE/fvED)');
    expect(benedictus).toContain('lau(d!fwg!hv)');
    expect(benedictus).toContain('ji/i/ih/i/ki/jh/hg');
  });
  test('shortening Benedictus qui venit adds its documented return without changing the source', () => {
    const { takeVerses, prepareFull } = require('../offertory-verses');
    const entry = manual.chants[0];
    const { source } = readManual(entry);
    const body = source.split('%%')[1];
    const first = takeVerses(body, 1);
    expect(first).not.toContain('Benedíximus.');
    expect(takeVerses(body, 2, entry.selectionCues)).toBe(body.trim());
    const selected = takeVerses(body, 1, entry.selectionCues);
    const antiphon = fs.readFileSync(path.join(__dirname, '../gabc/941.gabc'), 'utf8');
    expect(prepareFull(antiphon, selected, entry.cue).gabc).toContain('(::d+) <nlba>*~Benedíximus.</nlba>()');
    expect(takeVerses(body, 0, entry.selectionCues)).toBe('');
  });
  test('manual returns use the reused antiphon pitches, including alternative cues', () => {
    const { prepareFull } = require('../offertory-verses');
    for (const [number, local, pitch, cues] of [
      ['039', 941, 'd', ['Benedíximus.', 'Et illúxit.']],
      ['041', 668, 'c', ['Allelúia.', 'Psallam.']],
      ['044', 584, 'f', ['Ut salvam.']],
      ['048', 1303, 'd', ['Quia fecit.']]
    ]) {
      const { source } = readManual({ id: 'manual-' + number });
      const antiphon = fs.readFileSync(path.join(__dirname, '../gabc', local + '.gabc'), 'utf8');
      const result = prepareFull(antiphon, source.split('%%')[1]);
      for (const cue of cues) expect(result.gabc).toContain('(::' + pitch + '+) <nlba>*~' + cue + '</nlba>()');
      expect(result.antiphon).toContain('<b>');
      if (number === '039') expect((result.gabc.match(/\(Z\)/g) || []).length).toBe(1);
      if (number === '041') expect((result.gabc.match(/\(Z\)/g) || []).length).toBe(2);
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
    expect(result.gabc).toContain('(::d+) <nlba>*~Etenim.</nlba>() (Z)');
    expect(result.gabc).not.toContain('(::h+)');
  });
  test('preserves the octave in both directions between F and C clefs', () => {
    expect(responseCue('(f3) Et(f)e(f)nim.(f) (::)', 'Etenim.', 'c4')).toContain('(::d+)');
    expect(responseCue('(c4) Et(d)e(d)nim.(d) (::)', 'Etenim.', 'f3')).toContain('(::f+)');
    expect(responseCue('(fb3) Et(f)e(f)nim.(f) (::)', 'Etenim.', 'cb4')).toContain('(::d+)');
    expect(responseCue('(f3) Et(f)e(f)nim.(f) (::)', 'Etenim.', 'f3')).toContain('(::f+)');
  });
  test('the actual Ad te Domine full-verse cue returns to the lower D', () => {
    const antiphon = fs.readFileSync(path.join(__dirname, '../gabc/962.gabc'), 'utf8');
    const verses = fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses/11393.gabc'), 'utf8').split('%%')[1];
    const result = prepareFull(antiphon, verses, 'Etenim');
    expect(result.gabc).toContain('(::d+) <nlba>*~Etenim.</nlba>()');
    expect(result.gabc).not.toContain('(::k+)');
  });
  test('restores the verse clef if the custos needs a different staff', () => {
    expect(responseCue('(c1) Et(m)e(m)nim.(m) (::)', 'Etenim.', 'c4')).toContain('(c1) (::m+)');
    expect(responseCue('(c1) Et(m)e(m)nim.(m) (::)', 'Etenim.', 'c4')).toEndWith('(c4)');
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


describe('PDF review provenance', () => {
  const { bodyHash, verseReviewStatus, antiphonReviewStatus } = require('../download-offertory-verses');
  test('a changed verse download needs a new review', () => {
    const entry = manifest.chants.find(entry => entry.id === 11393);
    const stored = fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses/11393.gabc'), 'utf8');
    const parsed = parse(stored);
    const reviewed={...entry,review:'verified',verseReview:{sha256:bodyHash(parsed.clef+'\n'+parsed.gabc)}};
    expect(verseReviewStatus(reviewed, parsed)).toBe('verified');
    expect(verseReviewStatus(reviewed, { ...parsed, gabc: parsed.gabc+' (h)' })).toBe('pending');
  });
  test('normalizes line endings when identifying a reviewed score', () => {
    expect(bodyHash(' (c4) A(f)\r\n')).toBe(bodyHash('(c4) A(f)\n'));
  });
  test('a changed antiphon cannot retain a resolved discrepancy', () => {
    const source = '(c4) A(f) (::)', local = '(c4) A(g) (::)';
    const entry = { antiphonReviews: { 1: { status: 'resolved', sourceSha256: bodyHash(source), localSha256: bodyHash(local) } } };
    expect(antiphonReviewStatus(entry, 1, source, local).status).toBe('resolved');
    expect(antiphonReviewStatus(entry, 1, source, local + ' (Z)').status).toBe('needs-review');
    expect(antiphonReviewStatus(entry, 1, source + ' (Z)', local).status).toBe('needs-review');
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

describe('batch 2 source boundaries and integration', () => {
  const { readManual, bodyHash, verseReviewStatus } = require('../download-offertory-verses');
  const { splitVerses, takeVerses, prepareFull, psalmVerseText } = require('../offertory-verses');
  const review = require('./fixtures/offertory/historical-reviews/batch-2-review.json');
  const crypto = require('crypto');
  test('Sacerdotes stays simple-only after later imported-source reviews', () => {
    expect(data.fullById[645]).toBeUndefined();
    expect(data.simple[data.simpleById[645]].name).toBe('Sacerdotes Domini');
  });
  test('current proofreading retains all systems and bars; historical source measurements stay intact', () => {
    for (const r of review.chants) {
      const id = 'manual-' + String(r.bookNumber).padStart(3, '0');
      const { source, parsed } = readManual({ id });
      expect(crypto.createHash('sha256').update(source).digest('hex')).toBe(baseline[id].sourceSha256);
      expect(r.sourceSystems.every(s => /^[a-f0-9]{64}$/.test(s.stripSha256))).toBe(true);
      const bars = [...parsed.gabc.matchAll(/\(([^)]*)\)/g)].flatMap(m => m[1].match(/::|[,;:]/g) || []);
      expect(bars).toEqual(baseline[id].bars);
      for (const bar of r.bars) {
        expect(bar.inkHeightPx).toBeGreaterThanOrEqual(bar.type === 'quarter' ? 25 : bar.type === 'half' ? 52 : 84);
      }
      expect(reviewedStatus(manual.chants.find(e => e.id === id), parsed)).toBe('verified');
      expect(verseReviewStatus(manual.chants.find(e => e.id === id), { ...parsed, gabc: parsed.gabc + ' (f)' })).toBe('pending');
    }
  });
  test('Domine convertere adds a return only for the shortened selection and converts the final C3 return', () => {
    const e = manual.chants.find(e => e.bookNumber === 50);
    const body = readManual(e).source.split('%%')[1];
    const a = fs.readFileSync(path.join(__dirname, '../gabc/848.gabc'), 'utf8');
    expect(takeVerses(body, 1)).not.toContain('Salvum');
    expect(prepareFull(a, takeVerses(body, 1, e.selectionCues), e.cue).gabc).toContain('(::f+)');
    expect(prepareFull(a, body, e.cue).gabc).toContain('(::d+)');
    expect(body).toContain('ne,(kj) (z0;c3)');
    expect(body).toContain('mi(fhGF)ne,');
    expect(body).not.toContain('mi(fhvGF)');
    expect(body).toContain('tu(fgf)a(fg)');
    expect(body).toContain('ne(fhg)que');
    expect(body).toContain('me(ehf/fd)a.(d)');
  });
  test('all three Domine Deus verses and both openings retain the two distinct return points', () => {
    const e = manual.chants.find(e => e.bookNumber === 67);
    const body = readManual(e).source.split('%%')[1];
    const verses = splitVerses(body);
    expect(verses.length).toBe(3);
    expect(body).toContain('clí(hi/ih)na(h)');
    expect(body).toContain('tu(fiHG)am(g)');
    expect(body).toContain('Dó(hiHF)mi(f!gwhe)');
    expect(body).toContain('Dó(ehFE)mi(fe/ede)');
    expect(body).toContain('gxgf/gvED/ef');
    expect(psalmVerseText(verses[1].gabc)).toContain('juventúte mea.');
    expect(psalmVerseText(verses[2].gabc)).toContain('Factus sum sicut homo');
    expect(verses[1].gabc).not.toContain('Intret');
    expect(psalmVerseText(verses[1].gabc)).toContain('mea prævéniet te');
    expect(psalmVerseText(verses[2].gabc)).toContain('sine adjutório, inter mórtuos liber');
    expect(data.full[e.id].psalmVerses.map(v => v.cue)).toEqual(['In conspéctu.', 'Intret.', 'Intret.']);
    for (const local of [542, 987]) {
      const a = fs.readFileSync(path.join(__dirname, '../gabc', local + '.gabc'), 'utf8');
      const full = prepareFull(a, body, e.cue);
      expect(full.gabc.match(/\(::e\+\)/g).length).toBe(2);
      expect(full.antiphon).toContain('<b>in</b>');
      expect(full.antiphon).toContain('<b>in</b>(gh)<b>tret</b>');
      expect(prepareFull(a, takeVerses(body, 2, e.selectionCues), e.cue).gabc).toContain('*~Intret.');
    }
  });
  test('Gloria sings the final syllable of ejus and preserves its low c ending', () => {
    const { parsed } = readManual({ id: 'manual-077' });
    expect(parsed.gabc).toContain('jus?(h) (:)');
    expect(parsed.gabc).toContain('f/fd/ec)um?(f)');
    const a = fs.readFileSync(path.join(__dirname, '../gabc/407.gabc'), 'utf8');
    expect(prepareFull(a, '(c4) ' + parsed.gabc).gabc.match(/\(::h\+\)/g).length).toBe(2);
  });
});

test('Mihi autem marks the second nimis when the first verse sings the respond in full', () => {
  const { prepareFull, takeVerses } = require('../offertory-verses');
  const antiphon = fs.readFileSync(path.join(__dirname, '../gabc/499.gabc'), 'utf8');
  const verses = fs.readFileSync(path.join(__dirname, '../gabc/offertory-verses/13363.gabc'), 'utf8').split('%%')[1];
  for (const count of [1, 2, 3]) {
    const selected = takeVerses(verses, count);
    const result = prepareFull(antiphon, selected, null);
    expect(result.antiphon).toContain('(:)\n* <b>ni</b>(df)<b>mis</b>(fff//fv.fff)');
    expect(result.antiphon).toContain('tem(h/jjj) ni(g/jjhjvGF)mis');
    expect(result.gabc).toContain('Ni(ff/h)mis(h) con(h/jjjhh)for');
  }
});

describe('batch 3 source boundaries and returns', () => {
  const { readManual, verseReviewStatus } = require('../download-offertory-verses');
  const { splitVerses, takeVerses, prepareFull, psalmVerseText } = require('../offertory-verses');
  const review = require('./fixtures/offertory/historical-reviews/batch-3-review.json');
  const crypto = require('crypto');
  test('current proofread verses retain all systems; earlier measurements remain historical', () => {
    expect(review.chants.map(r => r.bookNumber)).toEqual([78, 79, 81, 82]);
    for (const r of review.chants) {
      const entry = manual.chants.find(e => e.bookNumber === r.bookNumber);
      const { source, parsed } = readManual(entry);
      expect(crypto.createHash('sha256').update(source).digest('hex')).toBe(baseline[entry.id].sourceSha256);
      expect(splitVerses('(' + parsed.clef + ') ' + parsed.gabc).length).toBe(2);
      expect(r.sourceSystems.length).toBe(r.checkedSourceSystems.reduce((n, p) => n + p.systems.length, 0));
      expect([...parsed.gabc.matchAll(/\(([^)]*)\)/g)].flatMap(m => m[1].match(/::|[,;:]/g) || [])).toEqual(baseline[entry.id].bars);
      expect(parsed.gabc).not.toMatch(/\([a-m][^()]*::/i);
      expect(reviewedStatus(entry, parsed)).toBe('verified');
      expect(verseReviewStatus(entry, { ...parsed, gabc: parsed.gabc + ' (f)' })).toBe('pending');
      for (const b of r.bars) expect(b.inkHeightPx).toBeGreaterThanOrEqual(b.type === 'quarter' ? 25 : b.type === 'half' ? 52 : 84);
    }
  });
  test('final rendering retains connected pes shapes and current proofread bodies and historical render records', () => {
    const audit = require('./fixtures/offertory/historical-reviews/batch-3-render-audit.json');
    expect(audit.connectedShapes.length).toBe(16);
    for (const shape of audit.connectedShapes) {
      expect(shape.pes).toBe(1);
      expect(shape.climacus).toBe(0);
    }
    for (const r of audit.chants) {
      const { source } = readManual({ id: 'manual-' + String(r.number).padStart(3, '0') });
      expect(crypto.createHash('sha256').update(source).digest('hex')).toBe(baseline['manual-'+String(r.number).padStart(3,'0')].sourceSha256);
      expect(r.sourceSha256).toBe(review.chants.find(c=>c.bookNumber===r.number).manualFileSha256);
      expect(r.renderedBars).toEqual(r.expectedBars);
      expect(r.renderedVirgas).toBe(r.expectedVirgas);
      expect(r.renderedQuilismas).toBe(r.expectedQuilismas);
    }
  });
  test('Gloriabuntur uses the second Domine in full and psalm-tone returns', () => {
    const e = manual.chants.find(e => e.bookNumber === 78);
    const body = readManual(e).source.split('%%')[1];
    const a = fs.readFileSync(path.join(__dirname, '../gabc/1375.gabc'), 'utf8');
    for (const count of [1, 2]) {
      const result = prepareFull(a, takeVerses(body, count, e.selectionCues), e.cue, e.cueOccurrences);
      expect(result.antiphon).toContain('Dó(ixh/jjh/i_j)');
      expect(result.antiphon).toContain('<b>Dó</b>(hjh)');
      expect(result.gabc).toContain('(::f+) <nlba>*~Dómine.</nlba>()');
      expect(result.gabc).toContain(count === 1 ? 'me.(de)' : 'am.(de)');
    }
    expect(body).toContain('Dó(d)mi(de!fvED/e)ne,(ed:)');
    expect(data.full[e.id].psalmVerses.map(v => v.occurrence)).toEqual([2, 2]);
    expect(splitVerses(body)[0].gabc).not.toContain('Dómine.()');
    expect(psalmVerseText(splitVerses(body)[0].gabc)).toBe('Verba mea áuribus pércipe, Dómine: intéllege clamórem meum et exáudi me.');
  });
  test('Posuisti retains both first-verse alternatives and the entire continuation', () => {
    const e = manual.chants.find(e => e.bookNumber === 79);
    const body = readManual(e).source.split('%%')[1];
    const a = fs.readFileSync(path.join(__dirname, '../gabc/487.gabc'), 'utf8');
    const result = prepareFull(a, body, e.cue);
    expect(result.gabc).toContain('*~Allelúia.');
    expect(result.gabc).toContain('*~Vitam.');
    expect(result.gabc).toContain('um.(gfh)');
    expect(body).toContain('lvKI/jvHG');
    expect(body).toContain('klKI/jkJI/jhj');
    expect(body).toContain('e(hji/jkIH/gj/jh/ig)');
    expect(psalmVerseText(splitVerses(body)[1].gabc)).toEndWith('glóriam et magnum decórem impónes super eum.');
  });
  test('Laetamini preserves both openings, its direct transition and skipped cadence pitches', () => {
    const e = manual.chants.find(e => e.bookNumber === 81);
    const body = readManual(e).source.split('%%')[1];
    expect(splitVerses(body)[0].gabc).not.toContain('gloriámini');
    expect(body).toContain('dfDC/d');
    expect(body).toContain('gjHF/fd');
    expect(body).toContain('gw!hgh/giHG');
    expect(psalmVerseText(splitVerses(body)[1].gabc)).toContain('multárum ad eum non approximábunt.');
    for (const id of [786, 870]) {
      const a = fs.readFileSync(path.join(__dirname, '../gabc', id + '.gabc'), 'utf8');
      expect(prepareFull(a, takeVerses(body, 1, e.selectionCues), e.cue).gabc).toContain('(::d+)');
      expect(prepareFull(a, body, e.cue).gabc).toContain('bunt.(dfDC/d)');
    }
  });
  test('Mirabilis keeps its unlabelled printed ending and adds a return only in selection', () => {
    const e = manual.chants.find(e => e.bookNumber === 82);
    const body = readManual(e).source.split('%%')[1];
    expect(splitVerses(body)[1].gabc).not.toContain('Benedíctus');
    const selected = takeVerses(body, 2, e.selectionCues);
    const a = fs.readFileSync(path.join(__dirname, '../gabc/919.gabc'), 'utf8');
    const result = prepareFull(a, selected, e.cue);
    expect(result.gabc.match(/\(::f\+\)/g).length).toBe(2);
    expect(result.gabc).toContain('a.(efED/fhg/hhf/de)');
    expect(psalmVerseText(splitVerses(body)[1].gabc)).toEndWith('delecténtur in lætítia.');
  });
});

describe('batch 4 source continuations and selections', () => {
  const { readManual, verseReviewStatus } = require('../download-offertory-verses');
  const { splitVerses, takeVerses, prepareFull, psalmVerseText } = require('../offertory-verses');
  const crypto = require('crypto');
  test('current proofread batch 4 retains every system and bar; historical review records stay intact', () => {
    const review = require('./fixtures/offertory/historical-reviews/batch-4-review.json');
    const audit = require('./fixtures/offertory/historical-reviews/batch-4-render-audit.json');
    expect(review.chants.map(r => r.bookNumber)).toEqual([83, 86, 89, 90]);
    expect(review.chants.reduce((n, r) => n + r.sourceSystems.length, 0)).toBe(33);
    expect(review.chants.reduce((n, r) => n + r.bars.length, 0)).toBe(75);
    for (const r of review.chants) {
      const entry = manual.chants.find(e => e.bookNumber === r.bookNumber);
      const { source, parsed } = readManual(entry);
      const render = audit.chants.find(a => a.number === r.bookNumber);
      const hash = crypto.createHash('sha256').update(source).digest('hex');
      expect(hash).toBe(baseline[entry.id].sourceSha256);
      expect(render.sourceSha256).toBe(r.manualFileSha256);
      expect(reviewedStatus(entry, parsed)).toBe('verified');
      expect(verseReviewStatus(entry, { ...parsed, gabc: parsed.gabc + ' (f)' })).toBe('pending');
      expect([...parsed.gabc.matchAll(/\(([^)]*)\)/g)].flatMap(m => m[1].match(/::|[,;:]/g) || [])).toEqual(baseline[entry.id].bars);
      expect(render.expectedBars).toEqual(render.renderedBars);
      expect(render.expectedVirgas).toBe(render.renderedVirgas);
      expect(render.expectedQuilismas).toBe(render.renderedQuilismas);
      expect(r.sourceSystems.length).toBe(r.checkedSourceSystems.reduce((n, p) => n + p.systems.length, 0));
      for (const b of r.bars) expect(b.inkHeightPx).toBeGreaterThanOrEqual(b.type === 'quarter' ? 25 : b.type === 'half' ? 52 : 84);
    }
  });
  test('Exsultabunt retains its one long verse and adds its return only in the integrated selection', () => {
    const e = manual.chants.find(e => e.bookNumber === 83);
    const { source } = readManual(e), body = source.split('%%')[1];
    expect(splitVerses(body).length).toBe(1);
    expect(body).not.toContain('Exsultábunt.()');
    expect(psalmVerseText(splitVerses(body)[0].gabc)).toEndWith('et fílii Sion exsúltent in Rege suo.');
    const a = fs.readFileSync(path.join(__dirname, '../gabc/33.gabc'), 'utf8');
    const result = prepareFull(a, takeVerses(body, 1, e.selectionCues), e.cue);
    expect(result.gabc).toContain('o.(d)');
    expect(result.gabc).toContain('*~Exsultábunt.');
  });
  test('Inveni preserves the measured quarter bars and both printed Manus returns', () => {
    const { source } = readManual({ id: 'manual-086' });
    expect((source.match(/\*(?:\(\))?\s+Manus\.\(\)/g) || []).length).toBe(2);
    const verses = splitVerses(source.split('%%')[1]);
    expect(psalmVerseText(verses[0].gabc)).toContain('in circúitu tuo');
    expect(psalmVerseText(verses[1].gabc)).toEndWith('et thronum ejus sicut dies cæli.');
    const review = require('./fixtures/offertory/historical-reviews/batch-4-review.json').chants.find(r => r.bookNumber === 86);
    expect(review.bars.filter(b => b.type === 'quarter').length).toBe(3);
  });
  test('shortened In virtute keeps the sung cue but omits the next verse clef', () => {
    const { source } = readManual({ id: 'manual-089' });
    const body = source.split('%%')[1], verses = splitVerses(body);
    expect(verses.map(v => v.clef)).toEqual(['c2', 'c4']);
    expect(body).toContain('De(c)si(d)dé(ffg)ri(f)um(fb+) (::)\n(c4)');
    expect(takeVerses(body, 1)).toEndWith('De(c)si(d)dé(ffg)ri(f)um(fb+) (::)');
    expect(psalmVerseText(verses[1].gabc)).toEndWith('glóriam et magnum decórem impónes super eum.');
  });
  test('Desiderium retains distinct returns and its full C3 ending without an empty shortened staff', () => {
    const e = manual.chants.find(e => e.bookNumber === 90);
    const { source } = readManual(e), body = source.split('%%')[1], verses = splitVerses(body);
    expect(verses.map(v => v.clef)).toEqual(['c4', 'c4', 'c3']);
    expect(body).toContain('Posuísti.() (h+::c3)');
    expect(verses[2].gabc).not.toContain('Et voluntáte.');
    expect(takeVerses(body, 2)).toEndWith('Posuísti.() (h+::)');
    const a = fs.readFileSync(path.join(__dirname, '../gabc/722.gabc'), 'utf8');
    const two = prepareFull(a, takeVerses(body, 2), e.cue);
    expect(two.gabc).toEndWith('<nlba>*~Posuísti.</nlba>() (Z)');
    const all = prepareFull(a, takeVerses(body, 3, e.selectionCues), e.cue);
    expect(all.gabc).toContain('e!fef/hhhvFD/e)');
    expect(all.gabc).toEndWith('<nlba>*~Et voluntáte.</nlba>() (Z)');
    expect(data.full[e.id].psalmVerses.map(v => v.cue)).toEqual(['Et voluntáte.', 'Posuísti.', 'Et voluntáte.']);
  });
});

describe('batch 5 source continuations and alternative', () => {
  const { readManual, verseReviewStatus } = require('../download-offertory-verses');
  const { splitVerses, takeVerses, selectVerseItems, prepareFull, psalmVerseText } = require('../offertory-verses');
  const crypto = require('crypto');
  test('batch 5 retains 47 systems, historical bar measurements and current proofread hashes', () => {
    const review = require('./fixtures/offertory/historical-reviews/batch-5-review.json');
    const audit = require('./fixtures/offertory/historical-reviews/batch-5-render-audit.json');
    expect(review.chants.map(c => c.bookNumber)).toEqual([91, 94, 95, 96]);
    expect(review.chants.reduce((n, c) => n + c.sourceSystems.length, 0)).toBe(47);
    expect(review.chants.reduce((n, c) => n + c.bars.length, 0)).toBe(114);
    for (const c of review.chants) {
      const e = manual.chants.find(e => e.bookNumber === c.bookNumber), { source, parsed } = readManual(e);
      const a = audit.chants.find(a => a.number === c.bookNumber), hash = crypto.createHash('sha256').update(source).digest('hex');
      expect(hash).toBe(baseline[e.id].sourceSha256);
      expect(a.sourceSha256).toBe(c.manualFileSha256);
      expect(reviewedStatus(e, parsed)).toBe('verified');
      expect(verseReviewStatus(e, { ...parsed, gabc: parsed.gabc + ' (f)' })).toBe('pending');
      expect([...parsed.gabc.matchAll(/\(([^)]*)\)/g)].flatMap(m => m[1].match(/::|[,;:]/g) || [])).toEqual(baseline[e.id].bars);
      expect(a.expectedBars).toEqual(a.renderedBars);
      expect(a.expectedVirgas).toBe(a.renderedVirgas);
      expect(a.expectedQuilismas).toBe(a.renderedQuilismas);
      for (const b of c.bars) expect(b.inkHeightPx).toBeGreaterThanOrEqual(b.type === 'quarter' ? 25 : b.type === 'half' ? 52 : 84);
    }
    expect(review.chants[0].checkedSourceSystems[0]).toEqual({ page: 155, systems: [4, 5, 6, 7, 8, 9] });
  });
  test('the two Afferentur settings keep different modes, source bodies and complete endings', () => {
    const a = readManual({ id: 'manual-091' }).source, b = readManual({ id: 'manual-096' }).source;
    expect(a).toContain('mode: 4;'); expect(b).toContain('mode: 1;');
    expect(data.fullById[1107]).toBe('manual-091'); expect(data.fullById[768]).toBe('manual-096');
    expect(a).toContain('num.(egFE) (::) * Adducéntur.() (::)');
    expect(b).toContain('bxfffvDCB');
    expect(b).toContain('cd/fffd/fvED/fdf) (::) * Afferéntur.() (::)');
    expect(psalmVerseText(splitVerses(a.split('%%')[1])[1].gabc)).toEndWith('te Deus in ætérnum.');
    expect(psalmVerseText(splitVerses(b.split('%%')[1])[1].gabc)).toContain('in lætítia');
  });
  test('Domine Deus preserves both full verses and Rice remains its shorter adaptation', () => {
    const body = readManual({ id: 'manual-094' }).source.split('%%')[1], verses = splitVerses(body);
    const fullText = psalmVerseText(verses[0].gabc);
    expect(fullText.match(/fecit/gi).length).toBe(2);
    expect(fullText).toEndWith('Dóminus, Deus Israel.');
    expect(psalmVerseText(verses[1].gabc)).toEndWith('et collaudavérunt Dóminum dicéntes.');
    expect(data.simple[data.simpleById[200]].text.match(/fecit/gi).length).toBe(1);
    expect(data.simple[data.simpleById[200]].cue).toBe('Deus Israel.');
  });
  test('Elegerunt selects verse3 alone in place of verses1-2 without changing its source', () => {
    const e = manual.chants.find(e => e.bookNumber === 95), body = readManual(e).source.split('%%')[1];
    expect(splitVerses(body).length).toBe(3);
    const pair = takeVerses(body, 2, e.selectionCues, e.verseSelections), alternate = takeVerses(body, 3, e.selectionCues, e.verseSelections);
    expect(splitVerses(pair).length).toBe(2);
    expect(splitVerses(alternate).length).toBe(1);
    expect(alternate).toContain('Sur(c)re(d)xé(f)');
    expect(alternate).not.toContain('Pó(cd)');
    expect(selectVerseItems(data.full[e.id].psalmVerses, 3, e.verseSelections).map(v => v.text)).toEqual([data.full[e.id].psalmVerses[2].text]);
    const opening = fs.readFileSync(path.join(__dirname, '../gabc/462.gabc'), 'utf8');
    for (const selected of [pair, alternate]) expect(prepareFull(opening, selected, e.cue).gabc).toContain('*~Dómine.');
    expect(body).not.toContain('hjvIH');
    expect(body).toContain('fá(hjIH/jk/kvJH/hg)');
    expect(body).toContain('e(gi/jh/ivHG)');
  });
});
