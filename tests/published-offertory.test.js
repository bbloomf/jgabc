const {applicationReview}=require('./helpers/offertory-application-source');
const {test,expect}=require('bun:test');
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const manual=require('../data/offertory-verses/manual.json');
const report=require('./fixtures/offertory/published/comparison.json');
const data=require('../offertory-verses-data');
const {normalizeGabcLatin}=require('../gabc-latin-normalization');
const {splitVerses,psalmVerseText}=require('../offertory-verses');
const {bodyHash,readManual}=require('../download-offertory-verses');
const body=s=>s.slice(s.lastIndexOf('%%')+2).replace(/\r\n?/g,'\n').trim();
for(const entry of manual.chants)test('published verse integration: '+entry.name,()=>{
  const check=report.checks.find(c=>c.id===entry.id),info=data.full[entry.id];
  expect(check.matchesLocalVerses).toBe(true);
  const downloaded=fs.readFileSync(path.join(root,'tests/fixtures/offertory/published',check.verseOnlyFile),'utf8');
  const local=readManual(entry).parsed;
  expect(bodyHash(local.clef+'\n'+local.gabc)).toBe(check.downloadedVerseSha256);
  const app=fs.readFileSync(path.join(root,'gabc/offertory-verses',entry.id+'.gabc'),'utf8');
  const review=applicationReview(entry.id,downloaded,app);
  expect(info.gregobaseId).toBe(check.gregobaseId);expect(info.provenance).toBe('gregobase');expect(info.review).toBe(review);
  const parts=splitVerses(body(app));expect(parts).toHaveLength(entry.verseCount);
  expect(info.psalmVerses.map(v=>v.text)).toEqual(parts.map(v=>psalmVerseText(v.gabc)));
  for(const id of entry.localIds)expect(data.fullById[id]).toBe(entry.id);
  expect(check.browserChecks.map(c=>c.style)).toEqual(['full','toned-verses','psalm-tone']);
  for(const browser of check.browserChecks){expect(browser.svgs).toBe(1);expect(browser.notes).toBeGreaterThan(0);expect(browser.versicles).toBe(entry.id==='manual-095'?1:entry.verseCount);}
});
