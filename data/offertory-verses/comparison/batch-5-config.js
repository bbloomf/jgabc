// Coordinates on the 2100px source renders. Every printed continuation is included.
module.exports = {
 settings: [
  {number:91,local:1107,name:'Afferentur · proximae',pages:[155,156],cue:'Adducéntur.',note:'Mode 4: two printed verses. The book proceeds directly into Diffusa est; only a shortened one-verse selection adds an editorial Adducentur return. The full ending and printed Adducentur cue on p. 156 are included. The existing opening and optional seasonal Alleluia are preserved.'},
  {number:94,local:200,name:'Domine Deus in simplicitate',pages:[159,160,161],cue:'Deus Israel.',note:'Two printed verses, including the full second-verse ending under the Elegerunt heading. Only a shortened first-verse selection adds an editorial Deus Israel return. Rice p. 31 abbreviates verse 1 by omitting its repeated first sentence and the final Deus Israel; his adaptation remains separate.'},
  {number:95,local:462,name:'Elegerunt Apostoli',pages:[161,162,163],cue:'Dómine.',defaultCount:2,alternativeCount:3,note:'The book prints verses 1 and 2, followed by a rubric offering verse 3 in place of both. The authoritative file preserves all three; combined views offer the first two or the single alternative. Verse 1 prints Domine. Verses 2 and 3 end without a written return label; their integrated views add an editorial Domine. All continuation systems under Afferentur S. Agathae are included.'},
  {number:96,local:768,name:'Afferentur · S. Agathae, post eam',pages:[163,164],cue:'Afferéntur.',note:'Mode 1: two printed verses, distinct from no. 91. Both complete endings continue beneath the Oratio mea heading. The printed return after verse 2 is Afferentur; a shortened first-verse selection adds that return editorially. The original opening is preserved.'}
 ],
 excerpts: {
  91:[{page:155,rect:[1205,780,1375,995],label:'Verse 1 opening · inherited C4; prior opening omitted'},{page:155,rect:[245,965,1375,1940],label:'Verse 1 continued through scribentis page turn'},{page:156,rect:[245,135,1375,1290],label:'Verse 1 ending and complete verse 2 · final Adducentur; following Diffusa omitted'}],
  94:[{page:159,rect:[245,1710,1375,1950],label:'Verse 1 opening · inherited C4'},{page:160,rect:[245,135,1375,1950],label:'Verse 1 ending and verse 2 through Dominum'},{page:161,rect:[245,145,1375,580],label:'Complete verse 2 ending and Deus Israel; following Elegerunt omitted'}],
  95:[{page:161,rect:[1165,1700,1375,1940],label:'Verse 1 opening · inherited C4; preceding Alleluia omitted'},{page:162,rect:[245,135,1375,1950],label:'Verses 1–2 and rubric introducing the single alternative verse 3'},{page:163,rect:[245,125,1375,1170],label:'Alternative verse 3 through final Alleluia; following Afferentur omitted'}],
  96:[{page:163,rect:[740,1690,1375,1940],label:'Verse 1 opening · inherited C4; prior opening omitted'},{page:164,rect:[245,125,1375,1590],label:'All verse 1 and 2 continuations through final Afferentur return; following Oratio omitted'}]
 }
};
