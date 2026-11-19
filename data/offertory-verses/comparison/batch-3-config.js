// Coordinates on source pages rendered 2100px high; all verse continuations included.
module.exports = {
  settings: [
    {number:78,local:1375,name:'Gloriabuntur',pages:[135,136],cue:'Dómine.',note:'Two printed verses. Verse 1 goes directly into verse 2; a one-verse selection adds an editorial Dómine return. The verse changes to C3. The existing opening is preserved. Rice has no corresponding simple setting.'},
    {number:79,local:487,name:'Posuisti',pages:[137,138],cue:'Allelúia.',note:'Two printed verses. Verse 1 offers Allelúia or Vitam; verse 2 returns to Allelúia. The opening starts on p. 136; excerpts begin at the first verse on p. 137 and include its ending under the next title on p. 138. Rice has no corresponding simple setting.'},
    {number:81,local:786,seasonalLocal:870,name:'Laetamini',pages:[140,141],cue:'Et gloriámini.',note:'Two printed verses with a direct transition between them; only a shortened selection adds the Et gloriámini return. Source and seasonal 870 include Allelúia, omitted in primary 786. Shared opening pitches, including Et, agree. Both openings remain unchanged. Rice has no corresponding simple setting.'},
    {number:82,local:919,name:'Mirabilis Deus',pages:[142,143],cue:'Benedíctus.',note:'Two printed verses. Verse 1 prints Benedíctus; verse 2 ends without a printed return, preserving its final double bar. Integration supplies the documented default Benedíctus return. The opening begins on p. 141; the verses end on p. 143 under Exsultabunt sancti. Rice has no corresponding simple setting.'}
  ],
  excerpts: {
    78:[{page:135,rect:[725,1495,1375,1710],label:'Verse 1 opening · new C3 clef; preceding opening omitted'},{page:135,rect:[245,1705,1375,1935],label:'Verse 1 continued'},{page:136,rect:[245,145,1375,1635],label:'Verse 1 ending and all of verse 2 · Dómine return; following Posuisti omitted'}],
    79:[{page:137,rect:[1120,750,1375,925],mask:[1120,750,1160,875],label:'Verse 1 opening · inherited C4 clef; preceding opening omitted'},{page:137,rect:[245,905,1375,1935],label:'Verse 1 and verse 2 opening'},{page:138,rect:[245,140,1375,815],label:'Verse 2 continued through Allelúia cue; following Confitebuntur omitted'}],
    81:[{page:140,rect:[245,1700,1375,1935],label:'Verse 1 opening · inherited C4 clef'},{page:141,rect:[245,150,1375,1610],label:'Verse 1 ending and all of verse 2 · Et gloriámini cue; following Mirabilis Deus omitted'}],
    82:[{page:142,rect:[245,920,1375,1935],label:'Verses 1 and 2 · preceding opening ending omitted'},{page:143,rect:[245,150,1375,710],label:'Verse 2 ending · final double bar; following Exsultabunt omitted'}]
  }
};
