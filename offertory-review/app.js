'use strict';
const $ = id => document.getElementById(id);
const submissionOverrides=new Map();
const chantLabel=entry=>(entry.gregobaseId||entry.publishedUrl?'✅ ':'')+entry.bookNumber+' · '+entry.name;
let catalog,current,expectedHash,savedSource,renderedSource,mapped,score,selected,renderTimer,generation=0,currentCuts=[],reviewCode='';
const draftKey=()=> 'offertory-review:'+current.id+':verses';
const dirty=()=> $('editor').value!==savedSource;
function message(id,text,error=false){$(id).textContent=text;$(id).classList.toggle('error',error);}
async function api(url,data){const response=await fetch(url,data?{method:'POST',headers:{'Content-Type':'application/json','X-Review-Token':catalog.token},body:JSON.stringify(data)}:{});const result=await response.json();if(!response.ok)throw new Error(result.error||'Request failed');return result;}
function remember(){
  if(!current)return;$('save').disabled=!dirty();
  if(dirty()){localStorage.setItem(draftKey(),JSON.stringify({source:$('editor').value,baseHash:expectedHash}));message('save-state','Unsaved correction · browser draft kept. Ctrl/Cmd+S saves to the repo.');}
  else{localStorage.removeItem(draftKey());message('save-state','Saved verse file loaded.');}
  updateSubmissionState();
}
function record(){
  $('checked-verses').checked=current.checked.verses;$('notes').value=current.notes;
  message('review-status',current.checked.verses?'These saved verses are marked checked.':'');
  renderSubmission();
}
function loadDocument(){
  savedSource=current.source;expectedHash=current.sourceHash;$('editor').value=savedSource;
  let draft;try{draft=JSON.parse(localStorage.getItem(draftKey())||'null');}catch{}
  $('restore-draft').hidden=!draft;$('discard-draft').hidden=!draft;$('save').disabled=true;
  message('selection-hint','Click a note in a rendered system.');
  message('save-state',draft?'Saved verses loaded. A previous browser draft is available.':'Saved verse file loaded.');
  draw();updateSubmissionState();
}
async function loadChant(id){
  const ticket=++generation,entry=await api('/api/chant?id='+encodeURIComponent(id));if(ticket!==generation)return;
  current=entry;history.replaceState(null,'','#'+id);
  const alignment=GabcReviewMap.systems.entries[id];
  $('chant-info').textContent='No. '+entry.bookNumber+' · '+entry.verseCount+' verses'+(alignment?' · '+alignment.systems.length+' matched systems':'');
  $('page').replaceChildren(new Option('All verse pages','all'),...[...new Set(alignment?.systems.map(s=>s.page)||entry.pages)].map(p=>new Option('p. '+p,p)));
  $('systems').replaceChildren();
  if(alignment)alignment.systems.forEach((s,i)=>buildPair(s,i));
  record();loadDocument();
}
function buildPair(system,index){
  const article=document.createElement('article');article.className='system-pair';article.dataset.system=index;article.dataset.page=system.page;
  const header=document.createElement('header'),title=document.createElement('strong');title.textContent='Pair '+(index+1)+' · page '+system.page;const label=document.createElement('span');label.textContent='Printed system '+system.system;
  const full=document.createElement('button');full.type='button';full.textContent='Full page';full.addEventListener('click',()=>{const dialog=$('image-dialog');dialog.querySelector('img').src='/api/pages/'+system.page+'.png';dialog.showModal();});header.append(title,label,full);
  const printed=document.createElement('div');printed.className='system-source';const sourceLabel=document.createElement('div');sourceLabel.className='row-label';sourceLabel.textContent='Printed source';
  const crop=document.createElement('div');crop.className='source-crop';const [x,y,right,bottom]=system.crop,w=right-x,h=bottom-y;
  crop.style.aspectRatio=w+'/'+h;crop.style.width=(Math.min(1,w/1170)*100)+'%';
  const image=document.createElement('img');image.src='/api/pages/'+system.page+'.png';image.alt=current.name+', page '+system.page+', printed system '+system.system;image.loading=index<2?'eager':'lazy';
  image.style.width=(GabcReviewMap.systems.referencePage.width/w*100)+'%';image.style.left=(-x/w*100)+'%';image.style.top=(-y/h*100)+'%';crop.append(image);
  if(system.mask){const [a,b,c,d]=system.mask;const mask=document.createElement('div');mask.className='source-mask';mask.style.cssText=`left:${(a-x)/w*100}%;top:${(b-y)/h*100}%;width:${(c-a)/w*100}%;height:${(d-b)/h*100}%`;crop.append(mask);}
  printed.append(sourceLabel,crop);
  const rendered=document.createElement('div');rendered.className='system-render';const renderLabel=document.createElement('div');renderLabel.className='row-label';renderLabel.textContent='GABC transcription · click a note to edit';const box=document.createElement('div');box.className='system-score';box.dataset.system=index;rendered.append(renderLabel,box);
  article.append(header,printed,rendered);$('systems').append(article);
}
function context(){const c=new exsurge.ChantContext(exsurge.TextMeasuringStrategy.Canvas);c.lineBreaking='optimal';c.setGlyphScaling(1/7);c.setFont("'Crimson Text',serif",33);c.spaceBetweenSystems=1.5;c.specialCharProperties['font-family']='Versiculum';c.specialCharProperties['font-variant']='normal';const original=c.specialCharText;c.specialCharText=function(ch){return original(ch).toLowerCase();};c.setRubricColor('#a02c24');return c;}
function withBreaks(source,cuts){let result='',last=0;for(const at of cuts){const inside=source.lastIndexOf('(',at-1)>source.lastIndexOf(')',at-1);result+=source.slice(last,at)+(inside?'Z':'(Z)')+'\n';last=at;}return result+source.slice(last);}
function draw(){
  if(!current)return;
  try{
    const alignment=GabcReviewMap.systems.entries[current.id];if(!alignment)throw new Error('The printed-system alignment for this transcription has not been prepared yet.');
    const source=$('editor').value;let depth=0;for(const ch of source.slice(source.lastIndexOf('%%')+2).replace(/<[^>]*>/g,'')){if(ch==='(')depth++;if(ch===')')depth--;if(depth<0||depth>1)throw new Error('Check the notation parentheses.');}if(depth)throw new Error('Close the notation parenthesis to update the preview.');
    currentCuts=GabcReviewMap.remap(alignment.source,source,alignment.systems.slice(0,-1).map(s=>s.end));
    if(currentCuts.some((at,i)=>!Number.isInteger(at)||at<=source.lastIndexOf('%%')||(i&&at<=currentCuts[i-1])))throw new Error('This edit removed a system boundary; reload the saved file before continuing.');
    const nextMapped=GabcReviewMap.convert(source,currentCuts),c=context();c.width=1000;
    const mappings=exsurge.Gabc.createMappingsFromSource(c,nextMapped.text);score=new exsurge.ChantScore(c,mappings,false);score.performLayout(c);
    let width=1000;
    do{score.layoutChantLines(c,width);if(score.lines.length<=alignment.systems.length)break;width+=50;}while(width<=5000);
    if(score.lines.length!==alignment.systems.length)throw new Error('The renderer produced '+score.lines.length+' lines for '+alignment.systems.length+' source systems. The pairing needs attention.');
    const template=document.createElement('template');template.innerHTML=score.createSvgForEachLine(c);
    const svgs=Array.from(template.content.children);
    if(svgs.length!==alignment.systems.length)throw new Error('Missing system SVG.');
    document.querySelectorAll('.system-score').forEach((box,i)=>{
      const system=alignment.systems[i];
      // Scan strips retain the left margin before the clef. Shared opening
      // systems may also retain the masked end of the preceding antiphon.
      const inset=Math.max(30,system.mask?system.mask[2]-system.crop[0]:30)/1170*100;
      box.style.paddingLeft=inset+'%';
      box.replaceChildren(svgs[i]);
    });
    mapped=nextMapped;renderedSource=source;reviewCode=withBreaks(source,currentCuts);$('review-gabc').textContent=reviewCode;
    message('render-message',alignment.systems.length+' printed systems paired with '+svgs.length+' SVG systems. All printed line breaks are fixed; corrections still edit the original verse GABC.');
  }catch(error){message('render-message',error.message+' The last valid preview is retained.',true);}
}
$('systems').addEventListener('click',event=>{
  const element=event.target.closest('use[source-index],text[source-index]');if(!element||!mapped)return;
  if($('editor').value!==renderedSource)return message('selection-hint','Finish the edit and wait for the preview before selecting another note.');
  const at=element.source?.sourceIndex??Number(element.getAttribute('source-index')),index=mapped.indices[at];if(index===undefined||index===null)return;
  if(selected)selected.classList.remove('selected-note');selected=element;selected.classList.add('selected-note');
  document.querySelectorAll('.system-pair.active').forEach(e=>e.classList.remove('active'));const pair=element.closest('.system-pair');pair.classList.add('active');
  const [start,end]=GabcReviewMap.span($('editor').value,index);$('editor').focus({preventScroll:true});$('editor').setSelectionRange(start,end);
  const line=$('editor').value.slice(0,start).split('\n').length-1;$('editor').scrollTop=Math.max(0,line*parseFloat(getComputedStyle($('editor')).lineHeight)-$('editor').clientHeight/2);
  message('selection-hint','Pair '+(Number(pair.dataset.system)+1)+' · selected “'+$('editor').value.slice(start,end)+'” · GABC line '+(line+1));
});
$('editor').addEventListener('input',()=>{remember();clearTimeout(renderTimer);renderTimer=setTimeout(draw,220);});
$('editor').addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='s'){event.preventDefault();if(dirty())$('save').click();}});
$('save').addEventListener('click',async()=>{ $('save').disabled=true;try{current=await api('/api/save',{id:current.id,kind:'verses',source:$('editor').value,expectedHash});localStorage.removeItem(draftKey());record();loadDocument();message('save-state','Correction saved to the verse source and app copy. Review line breaks were not written into the chant.');}catch(error){message('save-state',error.message,true);$('save').disabled=false;} });
$('restore-draft').addEventListener('click',()=>{const draft=JSON.parse(localStorage.getItem(draftKey())||'null');if(!draft)return;$('editor').value=draft.source;expectedHash=draft.baseHash;$('restore-draft').hidden=true;remember();draw();if(expectedHash!==current.sourceHash)message('save-state','This draft predates a saved-file change. Copy your edits before reloading; conflict protection prevents overwriting newer work.',true);});
$('discard-draft').addEventListener('click',()=>{localStorage.removeItem(draftKey());$('restore-draft').hidden=true;$('discard-draft').hidden=true;if(!dirty())message('save-state','Browser draft discarded; the saved verses are loaded.');});
$('reload').addEventListener('click',async()=>{if(dirty()&&$('reload').dataset.confirm!=='yes'){$('reload').dataset.confirm='yes';$('reload').textContent='Discard draft and reload?';message('save-state','Click again to discard this browser draft, or copy it first.');return;}$('reload').dataset.confirm='';$('reload').textContent='Reload saved file';localStorage.removeItem(draftKey());current=await api('/api/chant?id='+encodeURIComponent(current.id));record();loadDocument();});
$('chant').addEventListener('change',()=>loadChant($('chant').value).catch(error=>message('save-state',error.message,true)));
$('page').addEventListener('change',()=>{document.querySelectorAll('.system-pair').forEach(e=>e.hidden=$('page').value!=='all'&&e.dataset.page!==$('page').value);});
$('close-image').addEventListener('click',()=>$('image-dialog').close());
$('save-review').addEventListener('click',async()=>{if(dirty())return message('review-status','Save your correction before marking the verses checked.',true);try{current=await api('/api/review',{id:current.id,sourceHash:current.sourceHash,openingHash:current.openingHash,checked:{verses:$('checked-verses').checked,opening:current.checked.opening},notes:$('notes').value,publishedUrl:current.publishedUrl});record();message('review-status','Verse review saved.');}catch(error){message('review-status',error.message,true);}});
function updateSubmissionState(){
  if(!current)return;
  const changed=dirty();
  $('copy-submission').disabled=changed;$('copy-submission-details').disabled=changed;
  message('submission-state',changed?'Save your current verse correction to refresh the complete GABC before copying.':'Complete saved GABC: opening and all verses. The review-only Z line breaks are excluded.');
}
async function copySubmissionText(text,button,label,control){
  try{
    await navigator.clipboard.writeText(text);
    message('submission-copy-status','Copied '+label+'.');
    const caption=button.textContent;button.textContent='Copied';setTimeout(()=>button.textContent=caption,1400);
  }catch(error){
    if(control){control.focus();control.select();}
    message('submission-copy-status',control?'Clipboard access is unavailable. The text is selected; press Ctrl/Cmd+C.':'Clipboard access is unavailable. Copy the individual fields below.',true);
  }
}
function renderSubmission(){
  const option=Array.from($('chant').options).find(option=>option.value===current.id);
  if(option)option.textContent=chantLabel(current);
  const fields=GabcReviewMap.submissionFields(current),overrides=submissionOverrides.get(current.id)||{};
  $('gregobase-prefilled-link').href='https://gregobase.selapa.net/chant_edit.php?source=32&page='+encodeURIComponent(current.page);
  $('submission-fields').replaceChildren(...fields.map(field=>{
    const box=document.createElement('div');box.className='submission-field';box.dataset.field=field.key;
    const label=document.createElement('label');label.textContent=field.label;label.htmlFor='submission-'+field.key;
    const row=document.createElement('div');row.className='submission-field-value';
    const input=document.createElement('input');input.id='submission-'+field.key;input.value=overrides[field.key]??field.value;input.readOnly=!field.editable;
    if(field.editable){if(field.key==='sequence'){input.type='number';input.min='1';input.step='1';}input.addEventListener('input',()=>{const values=submissionOverrides.get(current.id)||{};values[field.key]=input.value;submissionOverrides.set(current.id,values);if(field.key==='transcriber')$('submission-gabc').value=current.submission.replace(/^transcriber:.*$/m,'transcriber: '+input.value.replace(/;/g,',')+';');});}
    const button=document.createElement('button');button.type='button';button.textContent='Copy';button.setAttribute('aria-label','Copy '+field.label);
    button.addEventListener('click',()=>{if(field.editable&&!input.reportValidity())return;copySubmissionText(input.value,button,field.label,input);});
    row.append(input,button);box.append(label,row);
    if(field.help){const help=document.createElement('small');help.textContent=field.help;box.append(help);}
    return box;
  }));
  $('submission-gabc').value=current.submission.replace(/^transcriber:.*$/m,'transcriber: '+String(overrides.transcriber??fields.find(f=>f.key==='transcriber').value).replace(/;/g,',')+';');
  const recorded=GabcReviewMap.gregobaseId(current.gregobaseId||current.publishedUrl||'');
  if($('gregobase-id').dataset.chant!==current.id){$('gregobase-id').value=recorded||'';$('gregobase-id').dataset.chant=current.id;message('gregobase-id-status',recorded?'Saved GregoBase ID: '+recorded+'.':'No GregoBase ID recorded yet.');}
  $('gregobase-saved-link').hidden=!recorded;
  if(recorded)$('gregobase-saved-link').href='https://gregobase.selapa.net/chant.php?id='+recorded;
  updateSubmissionState();
}
$('copy-submission').addEventListener('click',()=>copySubmissionText($('submission-gabc').value,$('copy-submission'),'complete GABC',$('submission-gabc')));
$('copy-submission-details').addEventListener('click',()=>{
  const fields=Array.from(document.querySelectorAll('.submission-field')).map(box=>box.querySelector('label').textContent+': '+box.querySelector('input').value);
  copySubmissionText(fields.join('\n')+'\n\nComplete GABC:\n'+$('submission-gabc').value,$('copy-submission-details'),'all submission details');
});
$('save-gregobase-id').addEventListener('click',async()=>{
  try{
    const id=GabcReviewMap.gregobaseId($('gregobase-id').value),publishedUrl=id?'https://gregobase.selapa.net/chant.php?id='+id:'';
    $('save-gregobase-id').disabled=true;
    current=await api('/api/review',{id:current.id,sourceHash:current.sourceHash,openingHash:current.openingHash,checked:current.checked,notes:current.notes,publishedUrl});
    $('gregobase-id').value=id||'';renderSubmission();
    message('gregobase-id-status',id?'Saved GregoBase ID '+id+' for '+current.name+'. Future verse downloads will use this ID.':'GregoBase ID cleared for this chant.');
  }catch(error){message('gregobase-id-status',error.message,true);}
  finally{$('save-gregobase-id').disabled=false;}
});
$('download-review').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([reviewCode],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=current.id+'-review-Z.gabc';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
(async()=>{catalog=await api('/api/catalog');catalog.entries=catalog.entries.filter(e=>GabcReviewMap.systems.entries[e.id]);$('chant').replaceChildren(...catalog.entries.map(e=>new Option(chantLabel(e),e.id)));$('catalog-status').textContent=catalog.entries.length+' matched verse transcriptions';const id=catalog.entries.some(e=>e.id===location.hash.slice(1))?location.hash.slice(1):catalog.entries[0].id;$('chant').value=id;await Promise.all([document.fonts.load("22px 'Crimson Text'"),document.fonts.load("bold 22px 'Crimson Text'"),document.fonts.load("italic 22px 'Crimson Text'"),document.fonts.load('22px Versiculum')]);await document.fonts.ready;await loadChant(id);})().catch(error=>message('render-message',error.message,true));
