const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const exsurge = require('../exsurge.min.js');
const { cases, context } = require('../tests/helpers/offertory-feature-cases');
const { unlinkedCases } = require('../tests/helpers/offertory-unlinked-cases');
const naturalSteps = [0, 2, 4, 5, 7, 9, 11];
const diatonicSteps = {0:0, 1:0, 2:1, 3:2, 4:2, 5:3, 6:3, 7:4, 8:4, 9:5, 10:6, 11:6};
const names = ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
const pitchName = p => names[((p % 12) + 12) % 12] + Math.floor(p / 12);
const pitchDiatonic = p => Math.floor(p / 12) * 7 + diatonicSteps[((p % 12) + 12) % 12];
// Independent diatonic reference: C-clef C is C2, F-clef F is F1.
// This does not call Exsurge's clef or pitch-conversion helpers.
function expectedDiatonic(letter, clef) {
  return (clef[0] === 'c' ? 14 : 10) + letter.toLowerCase().charCodeAt(0) - 99 - (2 * Number(clef.at(-1)) - 1);
}
function naturalSemitone(d) {
  const octave = Math.floor(d / 7), step = ((d % 7) + 7) % 7;
  return octave * 12 + naturalSteps[step];
}
function auditCase(c, season) {
  const source = c.formatted || c.gabc;
  const ctxt = new exsurge.ChantContext();
  const mappings = exsurge.Gabc.createMappingsFromSource(ctxt, source);
  const notes = mappings.flatMap(m => m.notations.flatMap(n => n.notes || []));
  const writtenBefore = notes.map(n=>[n.pitch.toInt(),n.staffPosition,n.sourceIndex,n.sourceGabc]);
  const score = new exsurge.ChantScore(ctxt,mappings,false);
  context.updateOffertoryPlaybackSections(score,source,true);
  const playbackPitches = context.getPlaybackPitches(score);
  const clefs = [];
  for (const group of source.matchAll(/\(([^)]*)\)/g)) {
    const tokens = group[1].replace(/\[[^\]]*\]/g, s => ' '.repeat(s.length));
    for (const m of tokens.matchAll(/[cf]b?[1-5]/g)) clefs.push({clef:m[0], index:group.index + 1 + m.index});
  }
  const errors = [], transitions = [], custosAccidentalDifferences = [];
  // Exercise real custos layout as well as pitch arithmetic: an unchanged
  // drawing can still predict a different octave from the shared playback map.
  score.performLayout(ctxt);
  let custosClef = score.startingClef, previousSung, automaticCustodes = 0, lineEndCustodes = 0;
  const activeClefs = [], previousNotes = [];
  for(let i=0;i<score.notations.length;i++) {
    const notation=score.notations[i];
    if(notation.isClef) custosClef=notation;
    activeClefs.push(custosClef);
    previousNotes.push(previousSung);
    if(notation instanceof exsurge.Custos && notation.auto) {
      const next=score.notations.slice(i+1).find(n=>n.notes && n.notes.length)?.notes[0];
      if(next) {
        const offset=previousSung ? playbackPitches.get(previousSung)-previousSung.pitch.toInt() : 0;
        const predicted=custosClef.staffPositionToPitch(notation.staffPosition).toInt()+offset;
        automaticCustodes++;
        if(predicted!==playbackPitches.get(next))errors.push({error:'Automatic custos disagrees with next sung pitch',index:notation.sourceIndex,predicted,next:playbackPitches.get(next)});
      }
    }
    if(notation.notes && notation.notes.length)previousSung=notation.notes.at(-1);
  }

  for(const width of [360,1100]) {
    score.layoutChantLines(ctxt,width);
    const svg=score.createSvg(ctxt);
    if(!svg.includes('<svg') || /NaN|Infinity/.test(svg))errors.push({error:'Invalid rendered SVG',width});
    for(const line of score.lines) if(line.custos && line.custos.auto) {
      const end=line.notationsStartIndex+line.numNotationsOnLine;
      const next=score.notations.slice(end).find(n=>n.notes && n.notes.length)?.notes[0];
      if(!next)continue;
      const before=previousNotes[end],clef=activeClefs[end-1] || line.startingClef;
      const offset=before ? playbackPitches.get(before)-before.pitch.toInt() : 0;
      const predicted=clef.staffPositionToPitch(line.custos.staffPosition).toInt()+offset;
      lineEndCustodes++;
      // The glyph encodes a diatonic position, not an accidental. A flat
      // beginning the next line can make B natural under the preceding clef
      // and B flat on the next line share the same correct custos position.
      const predictedDiatonic=(clef.clefStep===0 ? 14 : 10)+line.custos.staffPosition-clef.staffPosition+offset/12*7;
      if(predictedDiatonic!==pitchDiatonic(playbackPitches.get(next)))errors.push({error:'Line-end custos disagrees with next sung octave/degree',width,index:end,predictedDiatonic,nextDiatonic:pitchDiatonic(playbackPitches.get(next))});
      else if(predicted!==playbackPitches.get(next))custosAccidentalDifferences.push({width,index:end,precedingClefPitch:predicted,nextSungPitch:playbackPitches.get(next)});
    }
  }

  if(JSON.stringify(writtenBefore)!==JSON.stringify(notes.map(n=>[n.pitch.toInt(),n.staffPosition,n.sourceIndex,n.sourceGabc])))errors.push({error:'Playback changed notation'});
  for(const notation of score.notations) if(notation.notes) for(let i=1;i<notation.notes.length;i++){
    const a=notation.notes[i-1],b=notation.notes[i];
    if(playbackPitches.get(b)-playbackPitches.get(a)!==b.pitch.toInt()-a.pitch.toInt())errors.push({error:'Playback changed an interval within a neume',index:b.sourceIndex});
  }
  for(const note of notes)if((playbackPitches.get(note)-note.pitch.toInt())%12!==0)errors.push({error:'Playback changed pitch class',index:note.sourceIndex});
  let previousOffset;
  for(const note of notes){const offset=playbackPitches.get(note)-note.pitch.toInt();if(previousOffset!==undefined && offset!==previousOffset && !score.playbackSections.has(note))errors.push({error:'Playback changed an interval within a section',index:note.sourceIndex});previousOffset=offset;}
  let active, clefIndex = 0, previousLetter;
  const references = new Map();
  for (const note of notes) {
    while (clefIndex < clefs.length && clefs[clefIndex].index < note.sourceIndex) active = clefs[clefIndex++].clef;
    const written = note.sourceGabc.match(/^@?([a-m])/i);
    const letter = written ? written[1] : (/^v/.test(note.sourceGabc) ? previousLetter : null);
    previousLetter = letter;
    references.set(note, {letter, clef:active});
    if (!active || !/^[a-m]$/i.test(letter)) {errors.push({index:note.sourceIndex,error:'Unrecognized note position',letter,active});continue;}
    if(note.staffPosition !== letter.toLowerCase().charCodeAt(0)-99)errors.push({index:note.sourceIndex,error:'Written staff position mismatch',letter,staffPosition:note.staffPosition});
    const expected = expectedDiatonic(letter, active);
    const actual = note.pitch.octave * 7 + diatonicSteps[note.pitch.step];
    if (actual !== expected) errors.push({index:note.sourceIndex,letter,clef:active,expectedDiatonic:expected,actualDiatonic:actual,pitch:note.pitch.toInt()});
  }
  for (let i = 1; i < clefs.length; i++) {
    const previous = clefs[i-1], current = clefs[i];
    if (previous.clef[0] === current.clef[0]) continue;
    const before = notes.filter(n => n.sourceIndex < current.index).at(-1);
    const after = notes.find(n => n.sourceIndex > current.index);
    if (!before || !after) continue;
    const expectedInterval = naturalSemitone(expectedDiatonic(references.get(after).letter,current.clef)) - naturalSemitone(expectedDiatonic(references.get(before).letter,previous.clef));
    transitions.push({from:previous.clef,to:current.clef,index:current.index,before:before.pitch.toInt(),after:after.pitch.toInt(),beforeName:pitchName(before.pitch.toInt()),afterName:pitchName(after.pitch.toInt()),semitones:playbackPitches.get(after)-playbackPitches.get(before),writtenSemitones:after.pitch.toInt()-before.pitch.toInt(),playbackBefore:playbackPitches.get(before),playbackAfter:playbackPitches.get(after),playbackBeforeName:pitchName(playbackPitches.get(before)),playbackAfterName:pitchName(playbackPitches.get(after)),naturalSemitones:expectedInterval});
  }
  const sectionJoins = [];
  for(let i=1;i<notes.length;i++) if(score.playbackSections.has(notes[i])) {
    const before=notes[i-1],after=notes[i];
    sectionJoins.push({index:after.sourceIndex,from:references.get(before).clef,to:references.get(after).clef,writtenSemitones:after.pitch.toInt()-before.pitch.toInt(),semitones:playbackPitches.get(after)-playbackPitches.get(before)});
  }
  const pitches = notes.map(n => playbackPitches.get(n));
  const writtenPitches = notes.map(n=>n.pitch.toInt());
  const low = Math.min(...pitches), high = Math.max(...pitches), transpose = 55 - Math.floor((low + high)/2);
  return {id:c.id,sourceId:c.sourceId,name:c.name,style:c.style,count:c.count,season,notes:notes.length,automaticCustodes,lineEndCustodes,custosAccidentalDifferences,renderedWidths:[360,1100],
    writtenLow:Math.min(...writtenPitches),writtenHigh:Math.max(...writtenPitches),
    low,high,lowName:pitchName(low),highName:pitchName(high),span:high-low,
    playbackLow:low+transpose,playbackHigh:high+transpose,playbackLowName:pitchName(low+transpose),playbackHighName:pitchName(high+transpose),transitions,sectionJoins,errors};
}
function auditMatrix() {
  const errors = [];let pairs=0, equivalentNotes=0, staffPositions=0, playbackOctaveJoins=0;
  const clefs = ['c','cb','f','fb'].flatMap(type => [1,2,3,4,5].map(line => type+line));
  for (const clef of clefs) for (const letter of 'abcdefghijklm') {
    const pitch=exsurge.Gabc.createClef(clef[0],Number(clef.at(-1)),clef.includes('b')).staffPositionToPitch(letter.charCodeAt(0)-99);
    staffPositions++;
    if(pitch.octave*7+diatonicSteps[pitch.step] !== expectedDiatonic(letter,clef))errors.push({clef,letter,actual:pitch.toInt()});
  }
  for (const from of clefs) for (const to of clefs) {
    if (from[0] === to[0]) continue;
    pairs++;
    for (const letter of 'abcdefghijklm') {
      const d = expectedDiatonic(letter,from);
      const target = [...'abcdefghijklm'].find(l => expectedDiatonic(l,to) === d);
      if (!target) continue;
      // Clef flats affect B's pitch class, never the expected octave.
      const source = `(${from}) A(${letter}) (z0::${to}) B(${target})`;
      const notes = exsurge.Gabc.createMappingsFromSource(new exsurge.ChantContext(),source).flatMap(m=>m.notations.flatMap(n=>n.notes||[]));
      equivalentNotes++;
      for (const note of notes) if (note.pitch.octave*7+diatonicSteps[note.pitch.step] !== d) errors.push({from,to,letter,target,actual:note.pitch.toInt(),expectedDiatonic:d});
      // Also force both directions of octave displacement at every
      // representable pair, then exercise the production playback mapper.
      for(const shift of [-7,7]) {
        const shifted=String.fromCharCode(target.charCodeAt(0)+shift);
        if(!/^[a-m]$/.test(shifted))continue;
        const sample=`(${from}) A(${letter}) (z0::${to}) V/. B(${shifted})`;
        const ctxt=new exsurge.ChantContext();
        const score=new exsurge.ChantScore(ctxt,exsurge.Gabc.createMappingsFromSource(ctxt,sample),false);
        context.updateOffertoryPlaybackSections(score,sample,true);
        const original=score.notations.flatMap(n=>n.notes||[]).map(n=>n.pitch.toInt());
        const played=Array.from(context.getPlaybackPitches(score).values());
        playbackOctaveJoins++;
        // Flat/non-flat reference changes may alter B by one semitone.
        if(Math.abs(played[1]-played[0])>1)errors.push({from,to,letter,shifted,original,played});
      }
    }
  }
  return {pairs,equivalentNotes,staffPositions,playbackOctaveJoins,errors};
}
function runAudit() {
  const rows = [], previousSeason = context.selTempus;
  try {
    for (const season of ['', 'Pasch']) {
      context.selTempus = season;
      for (const c of cases()) if (c.count) rows.push(auditCase(c,season || 'non-Paschal'));
    }
    for (const c of unlinkedCases()) rows.push(auditCase(c,'standalone'));
  } finally {context.selTempus=previousSeason;}
  const matrix = auditMatrix();
  const nonMinimalJoins = rows.flatMap(c=>c.sectionJoins.filter(t=>t.from[0]!==t.to[0] &&
    (Math.abs(t.semitones)>Math.abs(t.semitones-12) || Math.abs(t.semitones)>Math.abs(t.semitones+12)))
    .map(t=>({id:c.id,name:c.name,style:c.style,count:c.count,season:c.season,...t})));

  const octaveJumps = rows.flatMap(c => c.transitions.filter(t => Math.abs(t.semitones) >= 12).map(t => ({id:c.id,name:c.name,style:c.style,count:c.count,season:c.season,...t})));
  const largeJoinLeaps = rows.flatMap(c => c.transitions.filter(t => Math.abs(t.semitones) > 7 && Math.abs(t.semitones) < 12).map(t => ({id:c.id,name:c.name,style:c.style,count:c.count,season:c.season,...t})));
  const sectionOctaveJumps = rows.flatMap(c=>c.sectionJoins.filter(t=>Math.abs(t.semitones)>=12).map(t=>({id:c.id,name:c.name,style:c.style,count:c.count,season:c.season,...t})));
  return {checkedAt:new Date().toISOString(),playbackSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../util.js'))).digest('hex'),rendererSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../exsurge.min.js'))).digest('hex'),matrix,octaveJumps,largeJoinLeaps,sectionOctaveJumps,nonMinimalJoins,cases:rows};
}
if (require.main === module) {
  const result = runAudit();
  const output = process.argv[2] || '/tmp/offertory-pitch-audit.json';
  fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
  const transitions = result.cases.flatMap(c=>c.transitions);
  console.log(JSON.stringify({output,cases:result.cases.length,notes:result.cases.reduce((n,c)=>n+c.notes,0),transitions:transitions.length,automaticCustodes:result.cases.reduce((n,c)=>n+c.automaticCustodes,0),lineEndCustodes:result.cases.reduce((n,c)=>n+c.lineEndCustodes,0),custosAccidentalDifferences:result.cases.reduce((n,c)=>n+c.custosAccidentalDifferences.length,0),failedCases:result.cases.filter(c=>c.errors.length).length,octaveJumps:result.octaveJumps.length,largeJoinLeaps:result.largeJoinLeaps.length,sectionOctaveJumps:result.sectionOctaveJumps.length,nonMinimalJoins:result.nonMinimalJoins.length,matrix:result.matrix},null,2));
  if(result.cases.some(c=>c.errors.length) || result.matrix.errors.length || result.octaveJumps.length || result.sectionOctaveJumps.length || result.nonMinimalJoins.length) process.exitCode=1;
}
module.exports={runAudit,expectedDiatonic,pitchName};
