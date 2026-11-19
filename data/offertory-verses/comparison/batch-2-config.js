// Measured rectangles on the 2100px source render. No preceding chant music.
module.exports = {
  settings: [
    {number:50, local:848, name:'Domine convertere', pages:[84,85], cue:'Salvum me fac.', note:'Two printed verses. The book goes directly from verse 1 into verse 2; the one-verse selection adds an editorial Salvum me fac return. Rice, printed p. 16 (PDF p. 20), uses the same first-verse text and a Salvum cue. The clef changes from C4 to C3 within verse 2.'},
    {number:67, local:542, seasonalLocal:987, name:'Domine Deus salutis', pages:[112,113,114], cue:'Intret.', note:'Three printed verses. Verse 1 returns to In conspéctu; verse 2 leads directly into verse 3, whose ending returns to Intret. A selection ending after verse 2 adds an editorial Intret return. Local 542 agrees with the source opening. Seasonal 987 has a different final Dómine figure and an added Allelúia; its music is preserved. Rice has no corresponding simple setting.'},
    {number:77, local:407, name:'Gloria et honore', pages:[134,135], cue:'Et constituísti.', note:'Two printed verses, both returning to Et constituísti. The opening begins on p. 133 and ends on p. 134; the verse excerpts start below that ending. Flats and naturals within the Dómine and Quid melismas are retained. Rice has no corresponding simple setting.'}
  ],
  excerpts: {
    50:[{page:84,rect:[500,1535,1375,1720],mask:[500,1535,615,1645],label:'Verse 1 opening · inherited C4 clef; preceding opening omitted'}, {page:84,rect:[245,1715,1375,1935],label:'Verse 1 continued'}, {page:85,rect:[245,125,1375,1085],label:'Verse 1 ending and all of verse 2 · ends at Salvum me fac'}],
    67:[{page:112,rect:[335,1540,1375,1715],mask:[335,1540,390,1668],label:'Verse 1 opening · C3 clef; preceding opening omitted'}, {page:112,rect:[245,1715,1375,1930],label:'Verse 1 continued'}, {page:113,rect:[245,125,1375,1935],label:'Verse 1 ending, verse 2, and verse 3 opening'}, {page:114,rect:[245,125,1375,505],label:'Verse 3 ending · Intret cue; following Sanctificavit omitted'}],
    77:[{page:134,rect:[245,320,1375,1940],label:'Verses 1 and 2 · preceding opening ending omitted'}, {page:135,rect:[245,130,1375,550],label:'Verse 2 ending · Et constituísti cue; following Gloriabuntur omitted'}]
  }
};
