// Coordinates on 2100px source renders, including every verse continuation.
module.exports = {
 settings: [
  {number:83,local:33,name:'Exsultabunt sancti',pages:[143,144],cue:'Exsultábunt.',note:'One long printed verse, including Lætetur Israel and the continuation under Justorum animæ. No return label is printed at its end. Only the integrated selection adds an editorial return to the beginning, Exsultábunt. The existing opening is preserved. Rice has no corresponding setting.'},
  {number:86,local:779,name:'Inveni David',pages:[147,148],cue:'Manus.',note:'Two printed verses, both returning to Manus. All continuation systems under Veritas mea are included. The existing C3 opening and its optional seasonal Allelúia remain unchanged. Rice has no corresponding setting.'},
  {number:89,local:667,name:'In virtute tua',pages:[152,153],cue:'Desidérium.',note:'Two printed verses. The first ends with a notated Desidérium cue; the second returns to Desidérium after the C2-to-C4 change. All endings under the Desiderium animæ heading are included. The existing opening and its optional seasonal Allelúia remain unchanged. Rice has no corresponding setting.'},
  {number:90,local:722,name:'Desiderium animae',pages:[154],cue:'Et voluntáte.',note:'Three printed verses, all on p. 154. Verse 1 returns to Et voluntáte; verse 2 to Posuísti. Verse 3 changes to C3 and ends with a double bar without a printed cue. Only the integrated three-verse selection supplies an editorial Et voluntáte return. The opening begins on p. 153; p. 155 starts Afferentur and contains no continuation. The existing opening and its optional seasonal Allelúia remain unchanged. Rice has no corresponding setting.'}
 ],
 excerpts: {
  83:[{page:143,rect:[785,1360,1375,1558],mask:[785,1360,840,1470],label:'Verse opening · inherited C4; preceding opening omitted'},{page:143,rect:[245,1550,1375,1940],label:'Cantáte repetition through laus'},{page:144,rect:[245,125,1375,875],label:'Laus ejus through in Rege suo · final double; following Justorum omitted'}],
  86:[{page:147,rect:[245,1550,1375,1935],label:'Verse 1 opening · inherited C3'},{page:148,rect:[245,120,1375,1425],label:'Verse 1 ending and all of verse 2 · both Manus returns; following Veritas omitted'}],
  89:[{page:152,rect:[245,1080,1375,1935],label:'Verse 1, notated Desidérium cue, and verse 2 opening · C2 to C4'},{page:153,rect:[245,150,1375,1185],label:'Verse 2 through final Desidérium cue; following Desiderium opening omitted'}],
  90:[{page:154,rect:[890,360,1375,555],mask:[890,360,950,510],label:'Verse 1 opening · inherited C4; preceding opening omitted'},{page:154,rect:[245,558,1375,1980],label:'Verse 1 ending and verses 2–3 · C4 to C3; complete final melisma'}]
 }
};
