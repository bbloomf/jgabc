const { test, expect, afterEach } = require('bun:test');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { ReviewStore, removeRhythm, body, hash } = require('../tools/offertory-review-store');
const { convert, span } = require('../offertory-review/gabc-map');
const root = path.resolve(__dirname,'..');
const temps=[];
afterEach(()=>{for(const temp of temps.splice(0))fs.rmSync(temp,{recursive:true,force:true});});
function fixture() {
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'offertory-review-test-'));temps.push(temp);
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/offertory-verses/manual.json'),'utf8'));
  const entry=manifest.chants[0];manifest.chants=[entry];manifest.drafts=[];
  const write=(name,text)=>{const file=path.join(temp,name);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);};
  write('data/offertory-verses/manual.json',JSON.stringify(manifest));
  for(const name of ['data/offertory-verses/manual/'+entry.id+'.gabc','gabc/'+entry.localIds[0]+'.gabc','gabc/offertory-verses/'+entry.id+'.gabc','offertory-verses-data.js'])write(name,fs.readFileSync(path.join(root,name),'utf8'));
  return {temp,entry,store:new ReviewStore(temp),write};
}
test('click offsets survive header, versicle and italic conversion',()=>{
  const source='name: Hæc;\n%%\n(c3) <sp>V/</sp>. 1. Hæc(dewfe/fvEDe) <i>vel</i> Dó(hvGF)mi(g)ne.(f) (::)';
  const result=convert(source), at=result.text.indexOf('hvGF');
  expect(result.indices[at]).toBe(source.indexOf('hvGF'));
  const selected=span(source,result.indices[at]);
  expect(source.slice(...selected)).toBe('hv');
  for(let i=0;i<result.text.length;i++)if(/[a-m]/i.test(result.text[i])&&result.indices[i]===source.indexOf('dewfe'))expect(result.text[i]).toBe('d');
});
test('removes rhythmic modifiers without losing pitches, accidentals or neume shapes',()=>{
  expect(removeRhythm("(c4) A(ixfg!hv_G'F.2/gwh_[oh:1]gf~) (::)")).toBe('(c4) A(ixfg!hvGF/gwhgf~) (::)');
});
test('reuses an already-local Vatican counterpart when available',()=>{
  const {store,entry,write}=fixture();
  write('propersdata.js',`var chantID={offertorium:{test:{Solesmes:{id:941},Vatican:{id:1676}}}};`);
  const local=fs.readFileSync(path.join(store.root,'gabc/941.gabc'),'utf8');
  write('gabc/1676.gabc',removeRhythm(local));
  expect(store.get(entry.id).openingLocalId).toBe(1676);
  expect(store.get(entry.id).openingProvenance).toContain('Local Vatican');
});
test('saving verses updates the app copy and resets exact-file review while preserving antiphons',()=>{
  const {store,entry,temp}=fixture(), old=store.get(entry.id);
  store.review(entry.id,{sourceHash:old.sourceHash,openingHash:old.openingHash,checked:{verses:true,opening:true},notes:'checked'});
  expect(store.get(entry.id).ready).toBe(true);
  const originalAnt=fs.readFileSync(path.join(temp,'gabc/941.gabc'),'utf8');
  const modified=old.source.replace('Hæc(dewfe','Hæc(ewwfe');
  const saved=store.save(entry.id,'verses',modified,old.sourceHash);
  expect(saved.checked.verses).toBe(false);
  expect(saved.effectiveReview).toBe('pending');
  expect(fs.readFileSync(path.join(temp,'gabc/offertory-verses',entry.id+'.gabc'),'utf8')).toBe(require('../gabc-latin-normalization').normalizeGabcLatin(modified));
  expect(fs.readFileSync(path.join(temp,'gabc/941.gabc'),'utf8')).toBe(originalAnt);
  expect(fs.readFileSync(path.join(temp,'data/offertory-verses/publication/history',entry.id+'.jsonl'),'utf8')).toContain(old.sourceHash);
  expect(()=>store.save(entry.id,'verses',old.source,old.sourceHash)).toThrow('changed outside');
});
test('publication opening edits never change either runtime antiphon or verse source',()=>{
  const {store,entry,temp}=fixture(), old=store.get(entry.id);
  const modified=old.opening.replace('%%\n','%%\n\n');
  store.save(entry.id,'opening',modified,old.openingHash);
  expect(store.get(entry.id).opening).toBe(modified);
  expect(fs.readFileSync(store.sourceFile(entry.id),'utf8')).toBe(old.source);
  expect(hash(fs.readFileSync(path.join(temp,'gabc/941.gabc'),'utf8'))).not.toBe(hash(modified));
});
test('rejects incomplete or rhythmic scores and exports full printed verses without synthetic cues',()=>{
  const {store,entry,temp}=fixture(), old=store.get(entry.id);
  expect(()=>store.save(entry.id,'verses',old.source.replace('Hæc(dewfe','Hæc(dewfe_'),old.sourceHash)).toThrow('rhythmic');
  expect(()=>store.save(entry.id,'verses',old.source.replace('Hæc(dewfe','Hæc((dewfe'),old.sourceHash)).toThrow('parentheses');
  expect(()=>store.save('../outside','verses',old.source,old.sourceHash)).toThrow('Unknown');
  expect(body(old.submission)).toContain(body(old.source));
  expect(old.submission).not.toContain('<b>');
  expect(old.submission).not.toMatch(/\(::[a-m]\+\)/);
  const packet=store.exportFiles();
  expect(fs.existsSync(path.join(packet.directory,entry.id+'.gabc'))).toBe(true);
  expect(JSON.parse(fs.readFileSync(path.join(temp,'data/offertory-verses/publication/manifest.json'),'utf8'))[0].ready).toBe(false);
});

test('review Z boundaries keep click offsets, including within a continued melisma',()=>{
  const source='name: Verse;\n%%\n(c4) Té(hiHE/hg/dewfe/fe)mus(f) (::)';
  const cut=source.indexOf('dewfe');
  const converted=convert(source,[cut]);
  expect(converted.text).toContain('hg/Zdewfe');
  const z=converted.text.indexOf('Z');
  expect(converted.indices[z]).toBe(null);
  const at=converted.text.indexOf('dewfe');
  expect(converted.indices[at]).toBe(cut);
  expect(source.slice(...span(source,converted.indices[at]))).toBe('d');
});
test('system boundaries follow replacements, insertions, and deletions without storing Z in the source',()=>{
  const { remap }=require('../offertory-review/gabc-map');
  const original='(c4) A(fgh) bé(ijk) ne.(h) (::)';
  const cut=original.indexOf('ijk');
  const edits=original.replace('fgh','fghhg').replace('ijk','ihjk');
  expect(remap(original,edits,[cut])[0]).toBe(edits.indexOf('ihjk'));
  const deleted=original.replace('A(fgh) ','');
  expect(remap(original,deleted,[cut])[0]).toBe(deleted.indexOf('ijk'));
  expect(remap(original,original,[cut])).toEqual([cut]);
});
test('all twenty-three source alignments contain complete, ordered systems and exact snapshots',()=>{
  const alignment=require('../data/offertory-verses/system-alignment.json');
  expect(Object.keys(alignment.entries)).toHaveLength(23);
  expect(Object.values(alignment.entries).reduce((n,e)=>n+e.systems.length,0)).toBe(210);
  expect(hash(fs.readFileSync(path.join(root,'Offertoriale cum versiculis.pdf')))).toBe(alignment.sourcePdfSha256);
  for(const entry of Object.values(alignment.entries)) {
    expect(hash(entry.source)).toBe(entry.sourceSha256);
    let previous=entry.source.lastIndexOf('%%')+2;
    for(const system of entry.systems){expect(system.end).toBeGreaterThan(previous);expect(system.crop[2]).toBeGreaterThan(system.crop[0]);expect(system.crop[3]).toBeGreaterThan(system.crop[1]);previous=system.end;}
    const cuts=entry.systems.slice(0,-1).map(s=>s.end),converted=convert(entry.source,cuts);
    expect((converted.text.match(/Z/g)||[]).length).toBe(cuts.length);
    const restored=converted.text.split('').filter((c,i)=>converted.indices[i]!==null).join('');
    expect(restored).toBe(convert(entry.source).text);
  }
});
test('batches five and six retain every source system as proofreading changes the syllables',()=>{
  const alignment=require('../data/offertory-verses/system-alignment.json');
  const browser=require('../offertory-review/gabc-map').systems;
  const manifest=require('../data/offertory-verses/manual.json');
  expect(Object.keys(alignment.entries).sort()).toEqual(manifest.chants.map(e=>e.id).sort());
  let added=0;
  for(const batch of [5,6])for(const chant of require('./fixtures/offertory/historical-reviews/batch-'+batch+'-review.json').chants){
    const id='manual-'+String(chant.bookNumber).padStart(3,'0'),entry=alignment.entries[id];
    const current=fs.readFileSync(path.join(root,'data/offertory-verses/manual',id+'.gabc'),'utf8');
    const cuts=require('../offertory-review/gabc-map').remap(entry.source,current,entry.systems.slice(0,-1).map(s=>s.end));
    expect(cuts).toHaveLength(entry.systems.length-1);
    expect(cuts.every((at,i)=>at>current.lastIndexOf('%%')&&at<current.length&&(!i||at>cuts[i-1]))).toBe(true);
    expect(entry.systems.map(s=>[s.page,s.system])).toEqual(chant.sourceSystems.map(s=>[s.page,s.system]));
    expect(browser.entries[id]).toEqual(entry);
    expect(entry.systems.at(-1).end).toBe(entry.source.length);
    added+=entry.systems.length;
  }
  expect(added).toBe(69);
});
test('verse-only proofreading never certifies the publication opening',()=>{
  const {store,entry}=fixture(),original=store.get(entry.id);
  const checked=store.review(entry.id,{sourceHash:original.sourceHash,openingHash:original.openingHash,checked:{verses:true,opening:false},notes:'Verse systems checked.'});
  expect(checked.checked.verses).toBe(true);
  expect(checked.checked.opening).toBe(false);
  expect(checked.ready).toBe(false);
  expect(checked.source).toBe(original.source);
  expect(checked.opening).toBe(original.opening);
});
test('allows unnotated reference text and empty text-only neumes after the final double bar',()=>{
  const {store,entry}=fixture(),original=store.get(entry.id);
  const beforeReference=original.source.lastIndexOf('*');
  const bar=original.source.lastIndexOf('(::)',beforeReference);
  const music=original.source.slice(0,bar+4);
  for(const reference of [' * Ante.',' *() Ante.()',' <i>vel</i>() *() Et illúxit.()',' * Ante( ) <i>vel</i> Et illúxit()']) {
    expect(()=>store.validate(entry,'verses',music+reference)).not.toThrow();
  }
  const corrected=original.source.replace(/\(::\)\s*$/,'');
  const saved=store.save(entry.id,'verses',corrected,original.sourceHash);
  expect(saved.source).toBe(corrected);
  expect(fs.readFileSync(path.join(store.root,'gabc/offertory-verses',entry.id+'.gabc'),'utf8')).toBe(require('../gabc-latin-normalization').normalizeGabcLatin(corrected));
  expect(()=>store.validate(entry,'verses',music+' *() Ante.() A(g)')).toThrow('end the music with a double bar');
  expect(()=>store.validate(entry,'verses',music.slice(0,-4)+' A(g)')).toThrow('end the music with a double bar');
});
test('submission fields use the complete chant start, page order and full extent',()=>{
  const { submissionFields }=require('../offertory-review/gabc-map');
  const values=entry=>Object.fromEntries(submissionFields(entry).map(f=>[f.key,f.value]));
  const {store,entry}=fixture(),first=values(store.get(entry.id));
  expect(first.incipit).toBe('Benedictus qui venit');expect(first.mode).toBe('8');expect(first.page).toBe('64');expect(first.sequence).toBe('2');expect(first.extent).toBe('2');
  const real=new ReviewStore();
  const gloria=values(real.get('manual-077'));expect(gloria.page).toBe('133');expect(gloria.extent).toBe('3');
  expect(values(real.get('manual-089')).sequence).toBe('1');
});
test('records a GregoBase ID durably and recovers IDs in older saved links',()=>{
  const { gregobaseId }=require('../offertory-review/gabc-map');
  expect(gregobaseId('23456')).toBe(23456);expect(gregobaseId('https://gregobase.selapa.net/chant.php?id=23456')).toBe(23456);
  for(const invalid of ['0','-1','abc','123.5','https://other.example/chant.php?id=23456'])expect(()=>gregobaseId(invalid)).toThrow();
  const {store,entry}=fixture(),old=store.get(entry.id);
  const saved=store.review(entry.id,{sourceHash:old.sourceHash,openingHash:old.openingHash,checked:old.checked,notes:'Keep this note.',publishedUrl:'https://gregobase.selapa.net/chant.php?id=23456'});
  expect(saved.gregobaseId).toBe(23456);
  const reopened=new ReviewStore(store.root).get(entry.id);expect(reopened.gregobaseId).toBe(23456);expect(reopened.notes).toBe('Keep this note.');expect(reopened.source).toBe(old.source);
  const file=path.join(store.base,'publication/review-state.json'),state=JSON.parse(fs.readFileSync(file,'utf8'));delete state[entry.id].gregobaseId;fs.writeFileSync(file,JSON.stringify(state));
  expect(store.get(entry.id).gregobaseId).toBe(23456);
});
test('saved publication IDs drive verse-only downloads while retaining local originals',async()=>{
  const {loadManualSource,verseReviewStatus}=require('../download-offertory-verses');
  const {store,entry,temp,write}=fixture(),old=store.get(entry.id);
  const localAntiphon=fs.readFileSync(path.join(temp,'gabc',entry.localIds[0]+'.gabc'),'utf8');
  let calls=0;
  const fetch=async url=>{calls++;expect(url).toEndWith('&id=23456');return old.submission;};
  expect((await loadManualSource(entry,{sourceRoot:temp,fetch})).provenance).toBe('manual');expect(calls).toBe(0);
  store.review(entry.id,{sourceHash:old.sourceHash,openingHash:old.openingHash,checked:old.checked,publishedUrl:'https://gregobase.selapa.net/chant.php?id=23456'});
  const loaded=await loadManualSource(entry,{sourceRoot:temp,fetch});
  expect(calls).toBe(1);expect(loaded.gregobaseId).toBe(23456);expect(loaded.provenance).toBe('gregobase');
  expect(body(loaded.source)).toBe(body(old.source));expect(loaded.source).toContain('source: https://gregobase.selapa.net/download.php?format=gabc&elem=1&id=23456;');
  expect(loaded.source).not.toContain(body(old.opening));
  expect(fs.readFileSync(store.sourceFile(entry.id),'utf8')).toBe(old.source);
  expect(fs.readFileSync(path.join(temp,'gabc',entry.localIds[0]+'.gabc'),'utf8')).toBe(localAntiphon);
  const cacheDir=path.join(temp,'cache');write('cache/23456.gabc',old.submission);
  await loadManualSource(entry,{sourceRoot:temp,cacheDir,fetch});expect(calls).toBe(1);
  const verified={...entry,review:'verified',verseReview:{sha256:require('../download-offertory-verses').bodyHash(loaded.parsed.clef+'\n'+loaded.parsed.gabc)}};
  expect(verseReviewStatus(verified,loaded.parsed)).toBe('verified');
  const changed=await loadManualSource(entry,{sourceRoot:temp,fetch:async()=>old.submission.replace('Hæc(dewfe','Hæc(ewwfe')});
  expect(verseReviewStatus(verified,changed.parsed)).toBe('pending');
  await expect(loadManualSource(entry,{sourceRoot:temp,fetch:async()=>old.submission.replace('mode: 8;','mode: 7;')})).rejects.toThrow('Wrong downloaded mode');
  await expect(loadManualSource(entry,{sourceRoot:temp,fetch:async()=>''})).rejects.toThrow();
  store.review(entry.id,{sourceHash:old.sourceHash,openingHash:old.openingHash,checked:old.checked,publishedUrl:''});
  expect((await loadManualSource(entry,{sourceRoot:temp,fetch})).source).toBe(old.source);expect(calls).toBe(1);
});
test('Original Transcriber uses only the requested credit',()=>{
  const {submissionFields}=require('../offertory-review/gabc-map');
  const {store,entry}=fixture(),data=store.get(entry.id);
  const field=submissionFields(data).find(f=>f.label==='Original Transcriber');
  expect(field.value).toBe('Benjamin Bloomfield (w/ ChatGPT)');expect(field.editable).toBe(true);
  expect(submissionFields(data).filter(f=>/transcriber/i.test(f.label))).toHaveLength(1);
  expect(data.submission).toContain('transcriber: Benjamin Bloomfield (w/ ChatGPT);');
  expect(data.submission).not.toContain('Andrew Hinkley');
  expect(store.exportFiles().chants[0].transcriber).toBe('Benjamin Bloomfield (w/ ChatGPT)');
});
test('application spelling is normalized while proofreading and publication retain source spelling',()=>{
  const {store,entry,temp}=fixture(),old=store.get(entry.id);
  const source=old.source.trimEnd()+' * Aetérnum.()\n';
  const saved=store.save(entry.id,'verses',source,old.sourceHash);
  expect(saved.source).toBe(source);
  expect(saved.submission).toContain('Aetérnum.()');
  expect(fs.readFileSync(path.join(temp,'gabc/offertory-verses',entry.id+'.gabc'),'utf8')).toContain('Ætérnum.()');
});
test('downloaded verses retain user proofreading only while both exact source files match',async()=>{
  const {loadManualSource}=require('../download-offertory-verses');
  const {store,entry,temp}=fixture(),old=store.get(entry.id);
  store.review(entry.id,{sourceHash:old.sourceHash,openingHash:old.openingHash,checked:{verses:true},publishedUrl:'https://gregobase.selapa.net/chant.php?id=23456'});
  expect((await loadManualSource(entry,{sourceRoot:temp,fetch:async()=>old.submission})).proofread).toBe(true);
  expect((await loadManualSource(entry,{sourceRoot:temp,fetch:async()=>old.submission.replace('Hæc(dewfe','Hæc(ewwfe')})).proofread).toBe(false);
  fs.appendFileSync(store.sourceFile(entry.id),'\n');
  expect((await loadManualSource(entry,{sourceRoot:temp,fetch:async()=>old.submission})).proofread).toBe(false);
});
