// Rebuild the local, self-contained batch-1 source/transcription comparison.
// Requires Poppler's pdftoppm and Python 3 with Pillow. No network access.
const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const crypto = require('crypto');
const tools = require('./offertory-verses.js');
const { readManual, verseReviewStatus } = require('./download-offertory-verses.js');
const root = __dirname;
const batchArgument = process.argv.find(arg => arg.startsWith('--batch='));
const batch = batchArgument ? Number(batchArgument.slice(8)) : 1;
if (![1, 2, 3, 4, 5, 6].includes(batch)) throw new Error('Supported batches: 1, 2, 3, 4, 5, 6');
const batchConfig = batch > 1 ? require('./data/offertory-verses/comparison/batch-' + batch + '-config.js') : null;
const pdf = path.join(root, 'Offertoriale cum versiculis.pdf');
const out = path.join(root, 'data/offertory-verses/comparison');
const manifest = require('./data/offertory-verses/manual.json');
const barReviewPath=path.join(root,batch > 1 ? 'tests/fixtures/offertory/historical-reviews' : 'data/offertory-verses',batch > 1 ? 'batch-' + batch + '-review.json' : 'bar-review.json');
const barReview=fs.existsSync(barReviewPath)?JSON.parse(fs.readFileSync(barReviewPath,'utf8')):null;
const pitchReviewPath=path.join(root,batch > 1 ? 'tests/fixtures/offertory/historical-reviews' : 'data/offertory-verses',batch > 1 ? 'batch-' + batch + '-review.json' : 'pitch-review.json');
const pitchReview=fs.existsSync(pitchReviewPath)?JSON.parse(fs.readFileSync(pitchReviewPath,'utf8')):null;
const settings = batchConfig ? batchConfig.settings : [
  { number:39, local:941, name:'Benedictus qui venit', pages:[64,65], cue:'Benedíximus.',
    note:'The book proceeds directly from verse 1 to verse 2 without printing a return after verse 1. The one-verse combined view adds an editorial Benedíximus return so the shorter selection can close. Both verses together preserve the book’s sequence and its final Benedíximus or Et illúxit alternatives. There is no corresponding Rice simple setting.' },
  { number:41, local:668, name:'Lauda anima', pages:[67,68,69], cue:'Allelúia.',
    note:'The full setting returns to Allelúia after verse 1 and offers Allelúia or Psallam after verse 2. Rice’s first-verse adaptation uses the Psallam return instead; that intentional choice remains in the psalm-toned setting. This comparison’s full-verse views follow the 1935 notation.' },
  { number:44, local:584, name:'Confitebor Domino', pages:[74,75], cue:'Ut salvam.',
    note:'Both verses return to Ut salvam. Check the clef changes in verse 2 and the repeated long ending cadence. There is no corresponding Rice simple setting.' },
  { number:48, local:1303, name:'Benedictus sit', pages:[81,82], cue:'Quia fecit.',
    note:'Both verses return to Quia fecit. The reused local opening includes an optional Tempore Paschali Allelúia after its first double bar; the printed 1935 opening does not include that addition. The existing opening is preserved. Rice’s first-verse text and Quia fecit cue are retained in the psalm-toned setting.' }
];
// Rectangles are measured on the 2100px reference render, then scaled to the
// actual 2400px PDF render. Each shared first staff is cropped from the verse
// opening; continuation pages stop before the following chant.
const excerpts = batchConfig ? batchConfig.excerpts : {
  39: [
    {page:64,rect:[880,1725,1380,1920],mask:[880,1725,965,1860],label:'Verse 1 opening · C3 clef; preceding antiphon music omitted'},
    {page:65,rect:[245,145,1375,1910],label:'Continuation · verses 1 and 2'}
  ],
  41: [
    {page:67,rect:[1030,1505,1375,1720],label:'Verse 1 opening · inherited C4 clef'},
    {page:67,rect:[245,1725,1375,1915],label:'Verse 1 continued'},
    {page:68,rect:[245,145,1375,1920],label:'Continuation · verses 1 and 2'},
    {page:69,rect:[245,150,1375,540],label:'Verse 2 ending and repeat cues'}
  ],
  44: [
    {page:74,rect:[905,1710,1375,1920],label:'Verse 1 opening · inherited C4 clef'},
    {page:75,rect:[245,133,1375,1655],label:'Continuation · verses 1 and 2'}
  ],
  48: [
    {page:81,rect:[535,1500,1375,1720],label:'Verse 1 opening · inherited C4 clef'},
    {page:81,rect:[245,1725,1375,1915],label:'Verse 1 continued'},
    {page:82,rect:[245,145,1375,1930],label:'Continuation · verses 1 and 2'}
  ]
};
const cropDir = path.join(out,'source-excerpts');
fs.mkdirSync(cropDir,{recursive:true});
const rectangles = [];
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const dataUrl = (file, type) => 'data:' + type + ';base64,' + fs.readFileSync(file).toString('base64');
const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const json = o => JSON.stringify(o).replace(/</g,'\\u003c');
fs.mkdirSync(out, { recursive:true });
const temp = fs.mkdtempSync(path.join(os.tmpdir(),'offertory-comparison-'));
const pdfHash = sha(fs.readFileSync(pdf));
const pages = {};
for (const p of [...new Set(settings.flatMap(c=>c.pages))]) {
  const prefix = path.join(temp, 'p'+p);
  const result = cp.spawnSync('pdftoppm',['-f',String(p),'-l',String(p),'-singlefile','-scale-to','2400','-png',pdf,prefix],{encoding:'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || 'Could not render PDF page '+p);
  pages[p] = prefix+'.png';
}
const entries = settings.map(c => {
  const key = 'manual-'+String(c.number).padStart(3,'0');
  const sourcePath = path.join(root,'data/offertory-verses/manual',key+'.gabc');
  const source = fs.readFileSync(sourcePath,'utf8');
  const antiphon = fs.readFileSync(path.join(root,'gabc',c.local+'.gabc'),'utf8');
  const body = source.slice(source.lastIndexOf('%%')+2).trim();
  const record = [...manifest.chants,...(manifest.drafts||[])].find(c=>c.id===key) || {};
  const parts = tools.splitVerses(body);
  const selectedAll = tools.takeVerses(body, c.defaultCount || parts.length, record.selectionCues, record.verseSelections);
  const prepared = tools.prepareFull(antiphon,selectedAll,record.cue||c.cue,record.cueOccurrences,body);
  const first = tools.prepareFull(antiphon,tools.takeVerses(body,1,record.selectionCues,record.verseSelections),record.cue||c.cue,record.cueOccurrences,body);
  const two = tools.prepareFull(antiphon,tools.takeVerses(body,2,record.selectionCues,record.verseSelections),record.cue||c.cue,record.cueOccurrences,body);
  const integrated = x => x.antiphon + '\n' + x.gabc;
  return {...c,key,source,body,antiphon,sourceHash:sha(source),status:verseReviewStatus(record,readManual({id:key}).parsed),
    ...(c.alternativeCount ? {alternative:integrated(tools.prepareFull(antiphon,tools.takeVerses(body,c.alternativeCount,record.selectionCues,record.verseSelections),record.cue||c.cue,record.cueOccurrences,body))} : {}),
    integrated:integrated(prepared),one:integrated(first),two:integrated(two),verseCount:parts.length,
    ...(c.seasonalLocal ? {seasonal:integrated(tools.prepareFull(fs.readFileSync(path.join(root,'gabc',c.seasonalLocal+'.gabc'),'utf8'),selectedAll,record.cue||c.cue,record.cueOccurrences,body))} : {}),
    verses:parts.map((p,i)=>({number:i+1,body:'('+p.clef+') '+p.gabc})),
    pdfImages:excerpts[c.number].map((excerpt,index)=>{
      const rect = excerpt.rect.map(v=>Math.round(v*2400/2100));
      const mask = excerpt.mask ? excerpt.mask.map(v=>Math.round(v*2400/2100)) : null;
      const file = path.join(cropDir,`${key}-p${excerpt.page}-${index+1}.png`);
      const crop = cp.spawnSync('python3',['-c',
        'from PIL import Image,ImageDraw; import sys,json; im=Image.open(sys.argv[1]); rect=json.loads(sys.argv[3]); mask=json.loads(sys.argv[4]); part=im.crop(rect); mask and ImageDraw.Draw(part).rectangle((mask[0]-rect[0],mask[1]-rect[1],mask[2]-rect[0],mask[3]-rect[1]),fill="white"); canvas=Image.new("RGB",(1292,part.height),"white"); canvas.paste(part,(0,0)); canvas.save(sys.argv[2])',
        pages[excerpt.page],file,JSON.stringify(rect),JSON.stringify(mask)],{encoding:'utf8'});
      if(crop.status!==0) throw new Error(crop.stderr||'Could not crop source excerpt');
      rectangles.push({chant:c.number,page:excerpt.page,label:excerpt.label,rect2400:rect,...(mask?{omittedPriorMusicRect2400:mask}:{}),canvasWidth:1292});
      return {...excerpt,rect2400:rect,url:dataUrl(file,'image/png')};
    })};
});
for(const file of Object.values(pages)) fs.unlinkSync(file);
fs.rmdirSync(temp);
fs.writeFileSync(path.join(out,batch === 1 ? 'crop-rectangles.json' : 'batch-' + batch + '-crop-rectangles.json'),JSON.stringify(rectangles,null,2)+'\n');
const font = (name,file,weight=400,style='normal') => `@font-face{font-family:'${name}';src:url('${dataUrl(path.join(root,file),'font/ttf')}') format('truetype');font-weight:${weight};font-style:${style};font-display:block}`;
const cssFonts = font('Crimson Text','fonts/CrimsonText-Regular.ttf') + font('Crimson Text','fonts/CrimsonText-Bold.ttf',700) + font('Crimson Text','fonts/CrimsonText-Italic.ttf',400,'italic') + font('Versiculum','versiculum.ttf');
const bundle = fs.readFileSync(path.join(root,'exsurge.min.js'),'utf8').replace(/<\/script/gi,'<\\/script');
const sections = entries.map(c=>`<section id="chant-${c.number}" class="chant"><header><span class="eyebrow">Chant ${c.number} · Mode ${(/mode:\s*(\d)/.exec(c.source)||[])[1]} · ${c.verseCount} verses</span><h2>${escape(c.name)}</h2><p>Printed pages ${c.pages.join(', ')} · Existing opening ${c.local} · <span class="status">${escape(c.status)}</span></p><p class="comparison-note">${escape(c.note)}</p>${barReview?.chants.find(r=>r.bookNumber===c.number)?.manualFileSha256===c.sourceHash ? `<p>Bar lengths and horizontal cuts reviewed against the scans. ${barReview.chants.find(r=>r.bookNumber===c.number)?.bars.filter(b=>!b.syntheticCueSeparator && !b.cuePanelClosingBar).length || 0} printed musical bars recorded.</p>` : ''}${pitchReview?.chants.find(r=>r.bookNumber===c.number)?.manualFileSha256===c.sourceHash ? `<p>Pitch positions reviewed across all ${c.verseCount} verses and every continuation. ${batch >= 4 ? 'Pitch and connected-neume source readings are recorded in batch-' + batch + '-review.json.' : batch === 2 ? 'Renewed pitch and note-shape corrections are recorded in batch-2-user-corrections.json.' : c.number===39 ? 'Lápidem: the inclinata in pi are corrected to i–h after the k virga.' : 'No further pitch changes identified in this pass.'}</p>` : ''}</header><div class="toolbar"><label>Notation view <select data-view="${c.number}"><option value="body">Printed verses only</option><option value="integrated">Opening + ${c.defaultCount ? 'first ' + c.defaultCount : c.verseCount === 2 ? 'both' : 'all ' + c.verseCount} verses</option>${c.verseCount > 2 && !c.defaultCount ? '<option value="two">Opening + two verses</option>' : ''}${c.alternativeCount ? '<option value="alternative">Opening + alternative verse 3</option>' : ''}<option value="one">Opening + one verse</option>${c.seasonalLocal ? '<option value="seasonal">Seasonal opening + all verses</option>' : ''}<option value="antiphon">Existing opening only</option></select></label><span class="source-count">All ${c.pages.length} source pages shown below</span><button type="button" data-gabc="${c.number}">Show GABC</button></div><div class="comparison"><div class="source"><h3>1935 source · all verse excerpts</h3><div class="scan">${c.pdfImages.map((p,i)=>`<figure><figcaption>p. ${p.page} · ${escape(p.label)} <button type="button" data-zoom="${c.number}-${i}">Enlarge</button></figcaption><img src="${p.url}" alt="Offertoriale p. ${p.page}, ${escape(p.label)}" data-scan="${c.number}-${i}"></figure>`).join('')}</div></div><div class="transcription"><h3 class="view-label">New transcription · verses only</h3><div class="score" id="score-${c.number}"></div><p class="render-state" id="state-${c.number}">Preparing notation…</p></div></div><details class="verse-panel"><summary>Individual verse renders</summary>${c.verses.map(v=>`<h3>Verse ${v.number}</h3><div class="score verse" id="verse-${c.number}-${v.number}"></div>`).join('')}</details><details class="gabc-panel"><summary>Exact source GABC and fingerprints</summary><p>Manual file SHA-256: <code>${c.sourceHash}</code>. The opening is loaded from <code>gabc/${c.local}.gabc</code> and is not stored in the manual verse file.</p><pre>${escape(c.source)}</pre></details></section>`).join('\n');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offertory verses · Batch ${batch} comparison</title><style>${cssFonts}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:#252520;background:#f2f0e8;font:16px/1.5 system-ui,sans-serif}a{color:#713b24}main{max-width:1800px;margin:auto;padding:32px}.intro{max-width:920px;margin-bottom:28px}h1{font:46px/1.08 'Crimson Text',serif;margin:8px 0 18px}h2{font:34px/1.1 'Crimson Text',serif;margin:8px 0}h3{font-size:14px;text-transform:uppercase;letter-spacing:.06em;margin:0 0 15px;color:#6b675a}.eyebrow{font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:#77543c}.intro p{color:#625e51}nav{display:flex;gap:10px;flex-wrap:wrap;padding:16px 0;position:sticky;top:0;background:#f2f0e8f5;z-index:3}nav a{border:1px solid #cec8b9;padding:8px 12px;border-radius:3px;text-decoration:none;font-size:14px}.chant{background:#fff;border:1px solid #d9d4c7;margin:30px 0 50px;scroll-margin-top:80px;box-shadow:0 3px 14px #3b352208}.chant>header{padding:24px 28px 10px}.chant>header p{font-size:14px;color:#6b675a}.toolbar{display:flex;gap:18px;align-items:center;flex-wrap:wrap;padding:15px 28px;border-block:1px solid #e6e1d8;background:#faf9f5}.toolbar label{font-size:13px}select,button{font:inherit;margin-left:5px;padding:7px 8px;border:1px solid #c9c2b1;background:#fff;border-radius:3px;color:#403d34;cursor:pointer}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:start}.source,.transcription{min-width:0;padding:22px}.source{border-right:1px solid #e6e1d8}.scan{background:#fff}.scan figure{margin:0 0 20px}.scan figcaption{font-size:12px;color:#6b675a;padding:6px 0;border-top:1px solid #e6e1d8}.scan figcaption button{padding:3px 6px;font-size:11px}.scan img{width:100%;display:block;cursor:zoom-in}.score{overflow-x:auto;min-height:85px;color:#080808}.score svg{display:block;max-width:100%;height:auto}.score .lyric{font-family:'Crimson Text',serif}.score .specialChar{font-family:'Versiculum'}.render-state{font-size:12px;color:#6b675a}.gabc-panel,.verse-panel{padding:15px 25px;border-top:1px solid #e6e1d8}summary{cursor:pointer;font-size:14px;font-weight:600}pre{font:12px/1.6 ui-monospace,monospace;white-space:pre-wrap;word-break:break-word;background:#f6f4ed;padding:16px;max-height:500px;overflow:auto}code{overflow-wrap:anywhere}.verse-panel .score{margin:15px 0 30px}.verse-panel h3{margin-top:22px}dialog{border:0;padding:20px;max-width:95vw;width:1600px;max-height:95vh;overflow:auto}dialog::backdrop{background:#000b}dialog img{width:100%;height:auto}.close{position:sticky;top:0;float:right;font-size:16px}.error{color:#a62917!important}.status{font-weight:600}footer{color:#6b675a;font-size:12px}@media(max-width:950px){main{padding:16px}.comparison{grid-template-columns:1fr}.source{border-right:0;border-bottom:1px solid #ddd}h1{font-size:36px}.toolbar{gap:9px;padding:12px}.source,.transcription{padding:15px}}@media print{nav,.toolbar{display:none}.scan{max-height:none}.chant{break-before:page}.comparison{grid-template-columns:1fr 1fr}.intro{break-after:page}}</style></head><body><main><div class="intro"><span class="eyebrow">Offertoriale · 1935</span><h1>${entries.length === 4 ? 'Four' : 'Three'} offertories,<br>source beside transcription.</h1><p>Compare the newly entered full verses with the scanned book. The source excerpts begin at the first verse and show every continuation page together. Enlarge any excerpt to inspect notes, or switch to the complete setting to check the reused opening and return cues. All notation and images are embedded; this comparison works offline.</p><p>“Printed verses only” preserves the source's written cues. The combined views apply the application's bold return words and return-pitch custos. Selecting one verse removes its numeral; selecting multiple verses retains their verse numbers. Rhythmic markings in the reused opening belong to the existing local edition.</p></div>${batch === 2 ? '<p><strong>Inventory correction:</strong> #49 on p. 83 is Intende voci. Sacerdotes Domini is absent from the 1935 alphabetical index (pp. 181–182); its Rice simple setting remains available separately. No full verses for it are invented here.</p>' : ''}<nav>${entries.map(c=>`<a href="#chant-${c.number}">${c.number} · ${escape(c.name)}</a>`).join('')}</nav><p id="overall" aria-live="polite">Loading chant renderer…</p>${sections}<footer>Rebuild: <code>node build-offertory-comparison.js${batch > 1 ? ' --batch=' + batch : ''}</code><br>Source PDF SHA-256: ${pdfHash}<br>Generated from the current authoritative manual files and reused local openings. Verification findings are recorded in <code>data/offertory-verses/review-notes.md</code>.</footer></main><dialog id="zoom"><button class="close" type="button">Close</button><img alt="Enlarged source page"></dialog><script>${bundle}</script><script>
const entries=${json(entries)};
// Keep these rules the same as exsurgeGabc() in propers.js, which they are copied from.
function convert(gabc){return (gabc.includes('%%')?gabc.slice(gabc.lastIndexOf('%%')+2):gabc).replace(/<sp>([VRA])\\/<\\/sp>\\.?/g,'$1/.').replace(/<\\/?i>/g,'_').replace(/(\\)\\s+)([^()]*V\\/\\.\\s*\\d+\\.?)(?=[ (])/g,'$1^$2^').replace(/(\\)\\s+(?:\\([^)]*\\))*)(\\s*[^(^|]+)(?=\\(\\))/g,'$1^$2^').replace(/\\s(<nlba>)?\\^?\\*\\^?(?!~[^<(]*<\\/nlba>|\\^?\\s*<b>)(?=\\s*[^(])/g,' $1*()').replace(/(\\))\\s*\\(\\)/g,')');}
function context(){const c=new exsurge.ChantContext(exsurge.TextMeasuringStrategy.Canvas);c.lineBreaking='optimal';c.condenseLineAmount=1;c.setGlyphScaling(1/16);c.setFont("'Crimson Text', serif",21.333);c.spaceBetweenSystems=1.5;c.minLyricWordSpacing*=0.7;c.accidentalSpaceMultiplier=1.5;c.specialCharProperties['font-family']='Versiculum';c.specialCharProperties['font-variant']='normal';const original=c.specialCharText;c.specialCharText=function(ch){return original(ch).toLowerCase()};c.setRubricColor('#a72b20');return c;}
let errors=[];
function draw(gabc,id,drop=false){const box=document.getElementById(id);try{const c=context();const width=Math.max(360,box.clientWidth-8);c.width=width;const mappings=exsurge.Gabc.createMappingsFromSource(c,convert(gabc));const score=new exsurge.ChantScore(c,mappings,drop);score.performLayout(c);score.layoutChantLines(c,width);const svg=score.createSvgNode(c);box.replaceChildren(svg);const bounds=svg.getBBox();const x=Math.min(0,bounds.x)-8,y=Math.min(0,bounds.y)-8,right=Math.max(width,bounds.x+bounds.width)+40,bottom=bounds.y+bounds.height+40;svg.setAttribute('viewBox',[x,y,right-x,bottom-y].join(' '));svg.setAttribute('width',right-x);svg.setAttribute('height',bottom-y);box.dataset.rendered='true';return true;}catch(e){box.textContent='Rendering failed: '+e.message;box.classList.add('error');errors.push(id+': '+e.message);return false}}
function drawEntry(e,view='body'){let value=e[view];if(view==='one'||view==='alternative')value=value.replace(/(<sp>V\\/<\\/sp>)\\.?\\s*\\d+\\.?\\s*/,'$1 ');const okay=draw(value,'score-'+e.number,view!=='body');document.getElementById('state-'+e.number).textContent=okay?'Notation rendered with the same Exsurge library as Chant Tools.':'Rendering needs attention.';document.querySelector('#chant-'+e.number+' .view-label').textContent=({body:'New transcription · verses only',integrated:'Reused opening + '+(e.defaultCount?'first '+e.defaultCount:'all '+e.verseCount)+' verses',alternative:'Reused opening + alternative verse 3',two:'Reused opening + first two verses',seasonal:'Seasonal opening '+e.seasonalLocal+' + all verses',one:'Reused opening + first verse',antiphon:'Existing opening · '+e.local})[view];}
function render(){errors=[];for(const e of entries){drawEntry(e,document.querySelector('[data-view="'+e.number+'"]').value);for(const v of e.verses)draw(v.body,'verse-'+e.number+'-'+v.number)}document.getElementById('overall').textContent=errors.length?'Some notation failed to render: '+errors.join('; '):'All ${entries.length} settings rendered. Use the controls below to compare the source and notation.';document.getElementById('overall').classList.toggle('error',!!errors.length);}
for(const e of entries){document.querySelector('[data-view="'+e.number+'"]').addEventListener('change',ev=>drawEntry(e,ev.target.value));e.pdfImages.forEach((p,i)=>{const zoom=()=>{const d=document.getElementById('zoom');d.querySelector('img').src=p.url;d.querySelector('img').alt='Offertoriale p. '+p.page+', '+p.label;d.showModal()};document.querySelector('[data-zoom="'+e.number+'-'+i+'"]').addEventListener('click',zoom);document.querySelector('[data-scan="'+e.number+'-'+i+'"]').addEventListener('click',zoom)});document.querySelector('[data-gabc="'+e.number+'"]').addEventListener('click',()=>{const d=document.querySelector('#chant-'+e.number+' .gabc-panel');d.open=!d.open;d.scrollIntoView({block:'nearest'})});}
document.querySelector('#zoom .close').addEventListener('click',()=>document.getElementById('zoom').close());document.querySelectorAll('.verse-panel').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){const e=entries.find(e=>'chant-'+e.number===d.parentElement.id);e.verses.forEach(v=>draw(v.body,'verse-'+e.number+'-'+v.number));}}));document.fonts.ready.then(render);let timer;window.addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(render,200)});
</script></body></html>`;
fs.writeFileSync(path.join(out,'batch-'+batch+'.html'),html);
console.log('Saved '+path.join(out,'batch-'+batch+'.html')+' ('+(Buffer.byteLength(html)/1024/1024).toFixed(1)+' MiB).');
