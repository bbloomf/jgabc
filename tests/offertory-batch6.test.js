const {baseline,reviewedStatus}=require('./helpers/offertory-baseline');
const {normalizeGabcLatin}=require('../gabc-latin-normalization');
const { describe, test, expect } = require('bun:test');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const manual = require('../data/offertory-verses/manual.json');
const data = require('../offertory-verses-data');
const { readManual, verseReviewStatus } = require('../download-offertory-verses');
const { splitVerses, takeVerses, prepareFull, psalmVerseText } = require('../offertory-verses');
const review = require('./fixtures/offertory/historical-reviews/batch-6-review.json');
const audit = require('./fixtures/offertory/historical-reviews/batch-6-render-audit.json');
const body = n => readManual({ id: 'manual-' + String(n).padStart(3, '0') }).source.split('%%')[1];

describe('batch 6 complete source verses', () => {
  test('five verses retain 22 systems, historical measurements and current proofread fingerprints', () => {
    expect(review.chants.map(c => c.bookNumber)).toEqual([97, 98, 99, 102]);
    expect(review.chants.reduce((n, c) => n + c.sourceSystems.length, 0)).toBe(22);
    expect(review.chants.reduce((n, c) => n + c.bars.length, 0)).toBe(42);
    expect(review.chants.flatMap(c => c.bars).filter(b => b.cuePanelClosingBar).length).toBe(4);
    for (const c of review.chants) {
      const e = manual.chants.find(e => e.bookNumber === c.bookNumber), { source, parsed } = readManual(e);
      const a = audit.chants.find(a => a.number === c.bookNumber);
      const hash = crypto.createHash('sha256').update(source).digest('hex');
      expect(hash).toBe(baseline[e.id].sourceSha256); expect(a.sourceSha256).toBe(c.manualFileSha256);
      expect(reviewedStatus(e, parsed)).toBe('verified');
      expect(verseReviewStatus(e, { ...parsed, gabc: parsed.gabc + ' (f)' })).toBe('pending');
      expect(splitVerses(body(c.bookNumber)).length).toBe(c.verseCount);
      expect([...parsed.gabc.matchAll(/\(([^)]*)\)/g)].flatMap(m => m[1].match(/::|[,;:]/g) || [])).toEqual(baseline[e.id].bars);
      expect(a.expectedBars).toEqual(a.renderedBars);
      expect(a.expectedVirgas).toBe(a.renderedVirgas); expect(a.expectedQuilismas).toBe(a.renderedQuilismas);
      for (const b of c.bars) expect(b.inkHeightPx).toBeGreaterThanOrEqual(b.type === 'quarter' ? 25 : b.type === 'half' ? 52 : 84);
      const app=fs.readFileSync(path.join(root,'gabc/offertory-verses',e.id+'.gabc'),'utf8');
      expect(app.slice(app.lastIndexOf('%%')+2).trim()).toBe(normalizeGabcLatin(body(c.bookNumber)).trim());
      for (const id of e.localIds) expect(data.fullById[id]).toBe(e.id);
    }
  });
  test('Oratio and Confessio preserve syllables, accidentals and sung endings before the return', () => {
    expect(readManual({ id: 'manual-097' }).parsed.clef).toBe('c3');
    expect(body(97)).toContain('dí(fhf/hhhvGFEf,)vi(gxevd!ewfe/fgf:)');
    expect(body(97)).toContain('dis(h)cés(hhhf)si.(f) (::)');
    const verses = splitVerses(body(98));
    expect(verses.map(v => psalmVerseText(v.gabc))).toEqual([
      'Cantáte Dómino cánticum novum: cantáte Dómino omnis terra.',
      'Cantáte Dómino: benedícite nomen eius: bene nuntiáte de die in diem salutáre eius.'
    ]);
    expect(body(98)).toContain('no(hj/ki/jvHG)men(gfh)');
    expect(body(98)).toContain('ne(ixgh!ivHG) nun(ef)ti(iyg!hig)');
    expect(body(98)).toContain('e(hghf/hg/gd~)ius.(dgFE/fgFD) (::)');
  });
  test('Assumpta retains high ledger notes, internal bars and the fully notated return', () => {
    expect(psalmVerseText(splitVerses(body(99))[0].gabc)).toBe('Paradísi porta per Evam cunctis clausa est et per Maríam Vírginem íterum patefácta est.');
    expect(body(99)).toContain('Vír(k!lwmk)gi(klKI/jvHGh');
    expect(body(99)).toContain('te(jj//jjjh;ij/klk/lk/lj/ji)');
    expect(body(99)).toContain('fá(j/jh/jij,h/jij/kvJH/iwjij/kjk)');
    const a = fs.readFileSync(path.join(root, 'gabc/3317.gabc'), 'utf8');
    expect(prepareFull(a, body(99), 'Allelúia.').gabc).toContain('* Al(h!iwji~)le(jkJH/gi,hjIHg!jj/hig)lú(ghg)ia.(g) (::)');
  });
  test('Viri preserves its very low liquescent and every integrated return resolves in the reused opening', () => {
    expect(body(102)).toContain('in(da~) vés(cd)ti(d)bus(d)');
    expect(body(102)).toContain('xé(f/fd/f/fd/dd/gf/fd/ec)runt.(cd) (::)');
    expect(psalmVerseText(splitVerses(body(102))[0].gabc)).toEndWith('qui et dixérunt.');
    for (const n of [97, 98, 99, 102]) {
      const e = manual.chants.find(e => e.bookNumber === n);
      const a = fs.readFileSync(path.join(root, 'gabc', e.localIds[0] + '.gabc'), 'utf8');
      for (let count = 1; count <= e.verseCount; count++) {
        const result = prepareFull(a, takeVerses(body(n), count), e.cue);
        expect(result.antiphon).toContain('<b>');
        if (n !== 99) expect(result.gabc).toContain('*~' + e.cue);
      }
    }
  });
});
