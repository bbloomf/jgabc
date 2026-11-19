// Coordinates on 2100px source renders; all verse continuations included.
module.exports = {
 settings: [
  {number:97,local:185,name:'Oratio mea',pages:[164,165],cue:'Ascéndat.',note:'Mode 8: one verse, entirely on p. 165, ending with Ascendat. Page 164 contains only the opening. The verse inherits C3. All original opening music is preserved.'},
  {number:98,local:105,name:'Confessio et pulchritudo',pages:[166,167],cue:'Sánctitas.',note:'Mode 4: two verses, each returning to Sanctitas. Verse 2 continues beneath the Assumpta page heading through its full sung ending and return. The existing opening is preserved.'},
  {number:99,local:3317,name:'Assumpta est',pages:[167,168],cue:'Allelúia.',note:'Mode 8: one long verse, Paradisi porta, ending under the Protege Domine heading on p. 168 with the complete notated Alleluia. High ledger notes, natural signs and internal melisma bars are retained. The existing opening is preserved.'},
  {number:102,local:3315,name:'Viri Galilaei',pages:[172,173],cue:'Sic véniet.',note:'Mode 1: one verse, Cumque intuerentur. Its four continuation systems on p. 173 end before the Domine Deus meus heading. The printed Sic veniet return is retained. The appendix rubric says Olim in Ascensione Domini. The existing opening is preserved.'}
 ],
 excerpts: {
  97:[{page:165,rect:[1145,940,1375,1130],label:'Verse opening · inherited C3; preceding opening omitted'},{page:165,rect:[245,1119,1375,1925],label:'Complete verse and Ascendat return'}],
  98:[{page:166,rect:[1110,860,1375,1075],label:'Verse 1 opening · inherited C4; preceding opening omitted'},{page:166,rect:[245,1065,1375,1940],label:'Verse 1 ending, Sanctitas return, and verse 2 opening'},{page:167,rect:[245,140,1375,565],label:'Complete verse 2 ending and Sanctitas return; following Assumpta omitted'}],
  99:[{page:167,rect:[465,1505,1375,1705],label:'Verse opening · inherited C4; preceding Alleluia omitted'},{page:167,rect:[245,1710,1375,1940],label:'Verse through per Mariam'},{page:168,rect:[245,145,1375,750],label:'Complete continuation beneath Protege heading and notated Alleluia; following chant omitted'}],
  102:[{page:172,rect:[985,1730,1375,1940],label:'Verse opening · inherited C4; preceding Alleluia omitted'},{page:173,rect:[245,140,1375,1005],label:'Complete verse ending and Sic veniet return; following Domine Deus omitted'}]
 }
};
