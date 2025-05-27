var sundayKeys = [
    {title:"Proprium Temporum...",en:"Proper of the Time..."},
    {key:"Adv1",title:"I Adventus",en:"1st Sunday in Advent"},
    {key:"Adv2",title:"II Adventus",en:"2nd Sunday in Advent"},
    {key:"Adv3",title:"III Adventus",en:"3rd Sunday in Advent"},
    {key:"Adv3w",title:"Feria Quarta IV Temporum in Adventu",en:"Ember Wednesday in Advent"},
    {key:"Adv3f",title:"Feria Sexta IV Temporum in Adventu",en:"Ember Friday in Advent"},
    {key:"Adv3s",title:"Sabbato IV Temporum in Adventu",en:"Ember Saturday in Advent"},
    {key:"Adv3ss",title:"Sabbato IV Temporum (forma brevior)",en:"Ember Saturday (shorter form)"},
    {key:"Adv4",title:"IV Adventus",en:"4th Sunday in Advent"},
    {key:"Dec24",title:"pridie Nativitas",en:"Christmas Eve"},
    {key:"Dec25_1",title:"Nativitas Domini, Missa ad media noctem",en:"The Nativity of our Lord (Christmas), Mass at Midnight"},
    {key:"Dec25_2",title:"Nativitas Domini, Missa ad matutinam",en:"Christmas, Mass at dawn"},
    {key:"Dec25_3",title:"Nativitas Domini, Missa interdiu",en:"Christmas, Mass during the day"},
    {key:"Nat1",title:"Dominica in Oct Nativitatis",en:"Sunday within the octave of Christmas"},
    {key:"Jan1",title:"Octava Nativitatis (Circumcisione Domini)",en:"Octave day of Christmas (Jan 1.)"},
    {key:"Nat2",title:"Sanctissimi Nominis Jesu",en:"Sunday preceding the Epiphany (Holy Name of Jesus)"},
    {key:"Jan5a",title:"In Vigilia Epiphaniæ",en:"Vigil of Epiphany"},
    {key:"Epi",title:"Epiphania",en:"Epiphany"},
    {key:"Epi1",title:"I post Epiphaniam (Sanctæ Familiæ)",en:"1st Sunday after Epiphany (Holy Family)"},
    {key:"Epi1s",title:"  Feria post I post Epiphaniam",en:"  Feria after 1st Sunday after Epiphany"},
    {key:"Epi2",title:"II post Epiphaniam",en:"2nd Sunday after Epiphany"},
    {key:"Epi3",title:"III post Epiphaniam",en:"3rd Sunday after Epiphany"},
    {key:"Epi4",title:"IV post Epiphaniam",en:"4th Sunday after Epiphany"},
    {key:"Epi5",title:"V post Epiphaniam",en:"5th Sunday after Epiphany"},
    {key:"Epi6",title:"VI post Epiphaniam",en:"6th Sunday after Epiphany"},
    {key:"7a",title:"Septuagesima",en:"Septuagesima"},
    {key:"6a",title:"Sexagesima",en:"Sexagesima"},
    {key:"5a",title:"Quinquagesima",en:"Quinquagesima"},
    {key:"5aw",title:"Feria IV Cinerum",en:"Ash Wednesday"},
    {key:"5ah",title:"  Feria V post Cinerum",en:"  Thursday after Ash Wednesday"},
    {key:"5af",title:"  Feria VI post Cinerum",en:"  Friday after Ash Wednesday"},
    {key:"5as",title:"  Sabbato post Cinerum",en:"  Saturday after Ash Wednesday"},
    {key:"Quad1",title:"Dominica I in Quadragesima",en:"1st Sunday in Lent"},
    {key:"Quad1m",title:"  Feria II post Dominicam I Quadragesimæ",en:"  Monday in the 1st week of Lent"},
    {key:"Quad1t",title:"  Feria III post Dominicam I Quadragesimæ",en:"  Tuesday in the 1st week of Lent"},
    {key:"Quad1w",title:"  Feria Quarta IV Temporum in Quadragesima",en:"  Ember Wednesday in Lent"},
    {key:"Quad1h",title:"  Feria V post Dominicam I Quadragesimæ",en:"  Thursday in the 1st week of Lent"},
    {key:"Quad1f",title:"  Feria Sexta IV Temporum in Quadragesima",en:"  Ember Friday in Lent"},
    {key:"Quad1s",title:"  Sabbato IV Temporum in Quadragesima",en:"  Ember Saturday in Lent"},
    {key:"Quad1ss",title:"  Sabbato IV Temporum (forma brevior)",en:"  Ember Saturday (shorter form)"},
    {key:"Quad2",title:"Dominica II in Quadragesima",en:"2nd Sunday in Lent"},
    {key:"Quad2m",title:"  Feria II post Dominicam II Quadragesimæ",en:"  Monday in the 2nd week of Lent"},
    {key:"Quad2t",title:"  Feria III post Dominicam II Quadragesimæ",en:"  Tuesday in the 2nd week of Lent"},
    {key:"Quad2w",title:"  Feria IV post Dominicam II Quadragesimæ",en:"  Wednesday in the 2nd week of Lent"},
    {key:"Quad2h",title:"  Feria V post Dominicam II Quadragesimæ",en:"  Thursday in the 2nd week of Lent"},
    {key:"Quad2f",title:"  Feria VI post Dominicam II Quadragesimæ",en:"  Friday in the 2nd week of Lent"},
    {key:"Quad2s",title:"  Sabbato post Dominicam II Quadragesimæ",en:"  Saturday in the 2nd week of Lent"},
    {key:"Quad3",title:"Dominica III in Quadragesima",en:"3rd Sunday in Lent"},
    {key:"Quad3m",title:"  Feria II post Dominicam III Quadragesime",en:"  Monday in the 3rd week of Lent"},
    {key:"Quad3t",title:"  Feria III post Dominicam III Quadragesimæ",en:"  Tuesday in the 3rd week of Lent"},
    {key:"Quad3w",title:"  Feria IV post Dominicam III Quadragesimæ",en:"  Wednesday in the 3rd week of Lent"},
    {key:"Quad3h",title:"  Feria V post Dominicam III Quadragesimæ",en:"  Thursday in the 3rd week of Lent"},
    {key:"Quad3f",title:"  Feria VI post Dominicam III Quadragesimæ",en:"  Friday in the 3rd week of Lent"},
    {key:"Quad3s",title:"  Sabbato post Dominicam III Quadragesimæ",en:"  Saturday in the 3rd week of Lent"},
    {key:"Quad4",title:"Dominica IV in Quadragesima",en:"4th Sunday in Lent"},
    {key:"Quad4m",title:"  Feria II post Dominicam IV Quadragesime",en:"  Monday in the 4th week of Lent"},
    {key:"Quad4t",title:"  Feria III post Dominicam IV Quadragesimæ",en:"  Tuesday in the 4th week of Lent"},
    {key:"Quad4w",title:"  Feria IV post Dominicam IV Quadragesimæ",en:"  Wednesday in the 4th week of Lent"},
    {key:"Quad4h",title:"  Feria V post Dominicam IV Quadragesimæ",en:"  Thursday in the 4th week of Lent"},
    {key:"Quad4f",title:"  Feria VI post Dominicam IV Quadragesimæ",en:"  Friday in the 4th week of Lent"},
    {key:"Quad4s",title:"  Sabbato post Dominicam IV Quadragesimæ",en:"  Saturday in the 4th week of Lent"},
    {key:"Quad5",title:"Dominica I Passionis",en:"Passion Sunday"},
    {key:"Quad5m",title:"  Feria II post Dominicam I Passionis",en:"  Monday in Passion Week"},
    {key:"Quad5t",title:"  Feria III post Dominicam I Passionis",en:"  Tuesday in Passion Week"},
    {key:"Quad5w",title:"  Feria IV post Dominicam I Passionis",en:"  Wednesday in Passion Week"},
    {key:"Quad5h",title:"  Feria V post Dominicam I Passionis",en:"  Thursday in Passion Week"},
    {key:"Quad5f",title:"  Feria VI post Dominicam I Passionis",en:"  Friday in Passion Week"},
    {key:"Quad5f_sd",title:"  Feria VI: Septem Dolorum beatæ Mariæ Virginis",en:"  Friday: The Seven Sorrows of the Blessed Virgin Mary"},
    {key:"Quad5s",title:"  Sabbato post Dominicam I Passionis",en:"  Saturday in Passion Week"},
    {key:"Quad6",title:"Dominica in Palmis",en:"Palm Sunday"},
    {key:"Quad6_v",title:"Dominica in Palmis (ante 1955)",en:"Palm Sunday (pre 1955)"},
    {key:"Quad6m",title:"  Feria II Hebdomadæ Sanctæ",en:"  Monday in Holy Week"},
    {key:"Quad6t",title:"  Feria III Hebdomadæ Sanctæ",en:"  Tuesday in Holy Week"},
    {key:"Quad6t_v",title:"  Feria III Hebdomadæ Sanctæ (ante 1955)",en:"  Tuesday in Holy Week (pre 1955)"},
    {key:"Quad6w",title:"  Feria IV Hebdomadæ Sanctæ",en:"  Wednesday in Holy Week"},
    {key:"Quad6w_v",title:"  Feria IV Hebdomadæ Sanctæ (ante 1955)",en:"  Wednesday in Holy Week (pre 1955)"},
    {key:"Quad6h",title:"Feria V in Cena Domini",en:"Maundy Thursday"},
    {key:"Quad6h_v",title:"Feria V in Cena Domini (ante 1955)",en:"Maundy Thursday (pre 1955)"},
    {key:"Quad6h-lotio",title:"  Antiphonæ ad Lotionem Pedum",en:"  Antiphons at the Washing of the Feet"},
    {key:"Quad6f",title:"Feria VI in Passione et Morte Domini",en:"Good Friday"},
    {key:"Quad6f_v",title:"Feria VI in Parasceve (ante 1955)",en:"Good Friday (pre 1955)"},
    {key:"Quad6s",title:"Vigilia Paschalis",en:"Easter Vigil"},
    {key:"Quad6s_v",title:"Vigilia Paschalis (ante 1955)",en:"Easter Vigil (pre 1955)"},
    {key:"Pasc0",title:"Dominica Resurrectionis",en:"Easter Sunday"},
    {key:"Pasc0m",title:"Feria II in Oct Paschæ",en:"Easter Monday"},
    {key:"Pasc0t",title:"Feria III in Oct Paschæ",en:"Easter Tuesday"},
    {key:"Pasc0w",title:"Feria IV in Oct Paschæ",en:"Easter Wednesday"},
    {key:"Pasc0h",title:"Feria V in Oct Paschæ",en:"Easter Thursday"},
    {key:"Pasc0f",title:"Feria VI in Oct Paschæ",en:"Easter Friday"},
    {key:"Pasc0s",title:"Sabbato in Oct Paschæ",en:"Easter Saturday"},
    {key:"Pasc1",title:"Dominica in Albis (in Oct Paschæ)",en:"Low Sunday (The Octave of Easter)"},
    {key:"Pasc2",title:"II post Pascha",en:"2nd Sunday after Easter"},
    {key:"Pasc2w",title:"S. Joseph Sponsi B. Mariæ V.",en:"Solemnity of St Joseph"},
    {key:"Pasc3",title:"III post Pascha",en:"3rd Sunday after Easter"},
    {key:"Pasc4",title:"IV post Pascha",en:"4th Sunday after Easter"},
    {key:"Pasc5",title:"V post Pascha",en:"5th Sunday after Easter"},
    {key:"Asc",title:"Ascensio",en:"Ascension Thursday"},
    {key:"Pasc6",title:"in Oct Ascensione Domini",en:"Sunday within the octave of the Ascension"},
    {key:"Pasc6s",title:"Sabbato in Vigilia Pentecostes",en:"Pentecost Vigil (Whitsun Eve)"},
    {key:"Pasc6s_v",title:"Sabbato in Vigilia Pentecostes (ante 1955)",en:"Pentecost Vigil (Whitsun Eve) (pre 1955)"},
    {key:"Pent0",title:"Dominica Pentecostes",en:"Pentecost (Whitsunday)"},
    {key:"Pent0m",title:"Feria II in Oct Pentecostes",en:"Pentecost Monday"},
    {key:"Pent0t",title:"Feria III in Oct Pentecostes",en:"Pentecost Tuesday"},
    {key:"Pent0w",title:"Feria Quarta IV Temp. Pentecostes",en:"Ember Wednesday of Pentecost"},
    {key:"Pent0h",title:"Feria V in Oct Pentecostes",en:"Pentecost Thursday"},
    {key:"Pent0f",title:"Feria Sexta IV Temp. Pentecostes",en:"Ember Friday of Pentecost"},
    {key:"Pent0s",title:"Sabbato IV Temp. Pentecostes",en:"Ember Saturday of Pentecost"},    
    {key:"Pent0ss",title:"Sabbato IV Temporum (forma brevior)",en:"Ember Saturday (shorter form)"},    
    {key:"Pent1",title:"Sanctissimæ Trinitatis",en:"Trinity Sunday"},
    {key:"Pent1w",title:"  Feria post 1 post Pentecosten",en:"  Feria after 1st Sunday after Pentecost"},
    {key:"CorpusChristi",title:"Corpus Christi",en:"Corpus Christi"},
    {key:"Pent2",title:"Dominica in Octavam Sme Corporis Christi",en:"Sunday within the octave of Corpus Christi (2nd after Pentecost)"},
    {key:"SCJ",title:"Sacratissimum Cor Jesu",en:"Most Sacred Heart of Jesus"},
    {key:"Pent3",title:"Dominica in Octavam Sme Cordis Jesu",en:"Sunday within the octave of Sacred Heart (3rd after Pentecost)"},
    {key:"Pent4",title:"4 post Pentecosten",en:"4th Sunday after Pentecost"},
    {key:"Pent5",title:"5 post Pentecosten",en:"5th Sunday after Pentecost"},
    {key:"Pent6",title:"6 post Pentecosten",en:"6th Sunday after Pentecost"},
    {key:"Pent7",title:"7 post Pentecosten",en:"7th Sunday after Pentecost"},
    {key:"Pent8",title:"8 post Pentecosten",en:"8th Sunday after Pentecost"},
    {key:"Pent9",title:"9 post Pentecosten",en:"9th Sunday after Pentecost"},
    {key:"Pent10",title:"10 post Pentecosten",en:"10th Sunday after Pentecost"},
    {key:"Pent11",title:"11 post Pentecosten",en:"11th Sunday after Pentecost"},
    {key:"Pent12",title:"12 post Pentecosten",en:"12th Sunday after Pentecost"},
    {key:"Pent13",title:"13 post Pentecosten",en:"13th Sunday after Pentecost"},
    {key:"Pent14",title:"14 post Pentecosten",en:"14th Sunday after Pentecost"},
    {key:"Pent15",title:"15 post Pentecosten",en:"15th Sunday after Pentecost"},
    {key:"Pent16",title:"16 post Pentecosten",en:"16th Sunday after Pentecost"},
    {key:"Pent17",title:"17 post Pentecosten",en:"17th Sunday after Pentecost"},
    {key:"EmbWedSept",title:"Feria Quarta IV Temporum Septembris",en:"Ember Wednesday in September"},
    {key:"EmbFriSept",title:"Feria Sexta IV Temporum Septembris",en:"Ember Friday in September"},
    {key:"EmbSatSept",title:"Sabbato IV Temporum Septembris",en:"Ember Saturday in September"},
    {key:"EmbSatSeptS",title:"Sabbato IV Temporum (forma brevior)",en:"Ember Saturday (shorter form)"},
    {key:"Pent18",title:"18 post Pentecosten",en:"18th Sunday after Pentecost"},
    {key:"Pent19",title:"19 post Pentecosten",en:"19th Sunday after Pentecost"},
    {key:"Pent20",title:"20 post Pentecosten",en:"20th Sunday after Pentecost"},
    {key:"Pent21",title:"21 post Pentecosten",en:"21st Sunday after Pentecost"},
    {key:"Pent22",title:"22 post Pentecosten",en:"22nd Sunday after Pentecost"},
    {key:"ChristusRex",title:"Domini Nostri Jesu Christi Regis",en:"Feast of Our Lord Jesus Christ, King"},
    {key:"Pent23",title:"23 post Pentecosten",en:"23rd Sunday after Pentecost"}
];
var canticumMap = {"Benedictus":{"ref":"Luc 1: 68-79","map":[0,1,2,3,4,5,6,7,8,9,10,11]},"Magnificat":{"ref":"Luc 1: 46-55","map":[0,1,2,3,4,5,6,7,8,9]},"Nunc dimittis":{"ref":"Luc 2: 29-32","map":[0,1,2,3]},"Canticum Annae":{"ref":"1 Reg 2: 1-10","map":[0,2,3,5,6,8,9,10,13,14]},"Canticum David":{"ref":"1 Par 29: 10-13","map":[0,1,4,6]},"Canticum Ecclesiastici":{"ref":"Eccli 36: 1-16","map":[0,1,3,4,5,6,6,7,7,8,9,10,11,13,14,15]},"Canticum Ezechiae":{"ref":"Is 38: 10-20","map":[0,1,3,5,6,8,10,10,12,13,14]},"Canticum Habacuc":{"ref":"Ha 3: 2-19","map":[0,3,5,6,7,10,11,13,14,16,17,18,20,22,23,26,29,30]},"Canticum Isaiae":{"ref":"Is 45: 15-25","map":[0,1,2,3,5,7,9,11,12,14,15]},"Canticum Isaiae (alterum)":{"ref":"Is 53: 1-5","map":[0,1,3,5,7]},"Canticum Jeremiae":{"ref":"Jer 31: 10-14","map":[0,2,3,6,8]},"Canticum Judith":{"ref":"Judith 16: 15-21","map":[0,1,2,4,5,6,7]},"Canticum Moysis":{"ref":"Exod 15: 1-19","map":[0,1,3,3,4,5,5,6,8,10,11,12,12,14,15,16,18,19,20]},"Canticum Moysis (Deut)":{"ref":"Deut 32: 1-18","map":[0,1,2,3,4,5,7,9,11,12,14,16,17,19,21,23,24,26]},"Canticum Tobiae":{"ref":"Tob 13: 1-10","map":[0,1,2,3,5,6,7,8,9,10]}};
var psalmsArray = new Array(150).join(',').split(',').map(function(i,j) {
    var psalm = j+1;
    var val = ("00" + psalm).slice(-3);
    return {
        key: val,
        en: "" + psalm,
        title: "" + psalm
    };
});
var canticleArray = Object.keys(canticumMap).map(function(key) {
    return {
        key: key,
        en: key,
        title: key
    }
});
var psalmCanticleArray = [{
    children: psalmsArray,
    en: "Psalms",
    title: "Psalmi"
}, {
    children: canticleArray,
    en: "Canticles",
    title: "Cantica"
}];
var ultimaeDominicaePostPentecosten = [
    {key:"PentEpi3",title:"3. quæ superfuit post Epiphaniam",en:"3rd Sunday after Epiphany"},
    {key:"PentEpi4",title:"4. quæ superfuit post Epiphaniam",en:"4th Sunday after Epiphany"},
    {key:"PentEpi5",title:"5. quæ superfuit post Epiphaniam",en:"5th Sunday after Epiphany"},
    {key:"PentEpi6",title:"6. quæ superfuit post Epiphaniam",en:"6th Sunday after Epiphany"},
    {key:"Pent24",title:"Ultima post Pentecosten",en:"Last Sunday after Pentecost"}
];
var otherKeys = [
    {title:"Votivæ et Aliæ Missæ...",en:"Votive/Other Masses..."},
    {title:"Selige quidque proprium secundum inceptum",key:"custom",en:"Select each proper by incipit"},
    {key:"nuptialis",title:"Missa nuptialis",en:"Wedding Mass"},
    {key:"defunctorum",title:"Missa pro Defunctis",en:"Mass for the Dead"},
    {key:"dedicatio",title:"Missa Dedicationis Ecclesiæ",en:"Mass of the dedication of a church"},
    {key:"litaniis",title:"Ad Litaniis Maj. et Min.",en:"At Major and Minor Litanies"},
    {group:true, title:"Missa votiva de Feria II",en:"Votive Mass on Mondays"},
    {key:"votiveST",title:"Missa votiva de Sanctissima Trinitate",en:"Votive Mass of the Most Holy Trinity"},
    {group:true, title:"Missa votiva de Feria III",en:"Votive Mass on Tuesdays"},
    {key:"votiveA",title:"Missa votiva de Angelis",en:"Votive Mass of the Holy Angels"},
    {group:true, title:"Missæ votivæ de Feria IV",en:"Votive Masses on Wednesdays"},
    {key:"votiveJ",title:"Missa votiva de Sancto Joseph",en:"Votive Mass of Saint Joseph"},
    {key:"votivePP",title:"Missa votiva de SS. Apostolis Petro et Paulo",en:"Votive Mass of Saints Peter and Paul"},
    {key:"votiveOA",title:"Missa votiva de omnibus SS. Apostolis",en:"Votive Mass of the Apostles"},
    {group:true, title:"Missæ votivæ de Feria V",en:"Votive Masses on Thursdays"},
    {key:"votiveSS",title:"Missa votiva de Spiritu Sancto",en:"Votive Mass of the Holy Ghost"},
    {key:"votiveSES",title:"Missa votiva de Sanctissimo Sacramento",en:"Votive Mass of the Most Holy Sacrament"},
    {key:"votiveJCSES",title:"Missa votiva de Jesu Christo Summo et Æterno Sacerdote",en:"Votive Mass of Christ the Eternal High Priest"},
    {group:true, title:"Missæ votivæ de Feria VI",en:"Votive Masses on Fridays"},
    {key:"votiveSC",title:"Missa votiva de Sancta Cruce",en:"Votive Mass of the Holy Cross"},
    {key:"votivePJC",title:"Missa votiva de Passione D.N. Jesu Christo",en:"Votive Mass of the Passion of Our Lord Jesus Christ"},
    {key:"votiveSCJ",title:"Missa votiva de Sacratissimo Corde Jesu",en:"Votive Mass of the Most Sacred Heart of Jesus"},
    {group:true, title:"Missæ de Sancta Maria in Sabbato",en:"Masses of Our Lady on Saturday"},
    {key:"SMadvent",title:"Ab Adventu usque ad Nativitatem",en:"in Advent"},
    {key:"SMchristmas",title:"A Nativitate usque ad Purificationem",en:"From Christmas to Candlemas"},
    {key:"SMlent",title:"A Purificatione usque ad Pascha",en:"From Candlemas to Easter"},
    {key:"SMeaster",title:"A Pascha usque ad Pentecosten",en:"From Easter to Pentecost"},
    {key:"SMpentecost",title:"A Pentecoste usque ad Adventum",en:"From Pentecost to Advent"},
    {key:"Aug22",title:"Immaculati Cordis B.M.V.",en:"Of the Immaculate Heart of BVM"},
    {group:true, title:"Missæ votivæ aliæ",en:"Other Votive Masses"},
    {key:"votiveESP", title:"Pro eligendo Summo Pontifice",en:"For electing a pope"},
    {key:"votiveFP", title:"Pro Fidei Propagatione",en:"For the propagation of the faith"},
    {key:"votiveED", title:"Pro Ecclesiæ defensione",en:"For defense of the Church"},
    {key:"votiveUE", title:"Pro unitate Ecclesiæ",en:"For unity of the Church"},
    {key:"votiveTB", title:"Tempore belli",en:"In time of war"},
    {key:"votiveP", title:"Pro pace",en:"To beg for Peace"},
    {key:"votiveVM", title:"Pro vitanda mortalitate",en:"In time of Pestilence"},
    {key:"votiveRP", title:"Pro remissione peccatorum",en:"For the remission of sins"},
    {key:"votivePIA", title:"Pro peregrinantibus (et iter agentibus)",en:"For pilgrims and travelers"},
    {key:"votiveMPI", title:"Pro Infirmis",en:"For the Sick"},
    {key:"votiveGBM", title:"Ad postulandam gratiam bene moriendi",en:"To ask for the grace of a happy death"},
    {key:"votiveQN", title:"Pro quacumque necessitate",en:"For any necessity"},
    {key:"votiveECJ",title:"De Eucharistico Corde Jesu",en:"Of the Eucharistic Heart of Jesus"},
];
var saintKeys = [
    {title:"Proprium Sanctorum...",en:"Proper of the Saints..."},
    /* START_saintKeys */
    {key:"Jan5",title:"Jan 5: St Telesphorus",en:"Jan 5: St Telesphorus"},
    {key:"Jan11",title:"Jan 11: St Hyginus",en:"Jan 11: St Hyginus"},
    {key:"Jan13",title:"Jan 13: Baptism of Our Lord Jesus Christ",en:"Jan 13: Baptism of Our Lord Jesus Christ"},
    {key:"Jan14",title:"Jan 14: St Hilary",en:"Jan 14: St Hilary"},
    {key:"Jan15",title:"Jan 15: St Paul the First Hermit",en:"Jan 15: St Paul the First Hermit"},
    {key:"Jan16",title:"Jan 16: St Marcellus I",en:"Jan 16: St Marcellus I"},
    {key:"Jan17",title:"Jan 17: St Anthony",en:"Jan 17: St Anthony"},
    {key:"Jan18",title:"Jan 18: Chair of St Peter in Rome",en:"Jan 18: Chair of St Peter in Rome"},
{key:"Jan19",title:"Jan 19: Ss Marius and Companions",en:"Jan 19: Ss Marius and Companions"},
    {key:"Jan20",title:"Jan 20: St Fabian and St Sebastian",en:"Jan 20: St Fabian and St Sebastian"},
    {key:"Jan21",title:"Jan 21: St Agnes",en:"Jan 21: St Agnes"},
    {key:"Jan22",title:"Jan 22: Ss Vincent and Anastasius",en:"Jan 22: Ss Vincent and Anastasius"},
    {key:"Jan23",title:"Jan 23: St Raymond of Penafort",en:"Jan 23: St Raymond of Penafort"},
    {key:"Jan24",title:"Jan 24: St Timothy",en:"Jan 24: St Timothy"},
    {key:"Jan25",title:"Jan 25: Conversion of St Paul",en:"Jan 25: Conversion of St Paul"},
    {key:"Jan26",title:"Jan 26: St Polycarp",en:"Jan 26: St Polycarp"},
    {key:"Jan27",title:"Jan 27: St John Chrysostom",en:"Jan 27: St John Chrysostom"},
    {key:"Jan28",title:"Jan 28: St Peter Nolasco",en:"Jan 28: St Peter Nolasco"},
    {key:"Jan29",title:"Jan 29: St Francis de Sales",en:"Jan 29: St Francis de Sales"},
    {key:"Jan30",title:"Jan 30: St Martina",en:"Jan 30: St Martina"},
    {key:"Jan31",title:"Jan 31: St John Bosco",en:"Jan 31: St John Bosco"},
    {key:"Feb1",title:"Feb 1: St Ignatius",en:"Feb 1: St Ignatius"},
    {key:"Feb2",title:"Feb 2: Purification of BVM",en:"Feb 2: Purification of BVM"},
    {key:"Feb3",title:"Feb 3: St Blase",en:"Feb 3: St Blase"},
    {key:"Feb4",title:"Feb 4: St Andrew Corsini",en:"Feb 4: St Andrew Corsini"},
    {key:"Feb5",title:"Feb 5: St Agatha",en:"Feb 5: St Agatha"},
    {key:"Feb6",title:"Feb 6: St Titus",en:"Feb 6: St Titus"},
    {key:"Feb7",title:"Feb 7: St Romuald",en:"Feb 7: St Romuald"},
    {key:"Feb8",title:"Feb 8: St John of Matha",en:"Feb 8: St John of Matha"},
    {key:"Feb9",title:"Feb 9: St Cyril of Alexandria",en:"Feb 9: St Cyril of Alexandria"},
    {key:"Feb10",title:"Feb 10: St Scholastica",en:"Feb 10: St Scholastica"},
    {key:"Feb11",title:"Feb 11: Apparition of BVM at Lourdes",en:"Feb 11: Apparition of BVM at Lourdes"},
    {key:"Feb12",title:"Feb 12: Seven Founders of the Servite Order",en:"Feb 12: Seven Founders of the Servite Order"},
    {key:"Feb14",title:"Feb 14: St Valentine",en:"Feb 14: St Valentine"},
    {key:"Feb15",title:"Feb 15: Ss Faustinus and Jovita",en:"Feb 15: Ss Faustinus and Jovita"},
    {key:"Feb18",title:"Feb 18: St Simeon",en:"Feb 18: St Simeon"},
{key:"Feb18a",title:"Feb 18: St Marie Bernadette Soubirous",en:"Feb 18: St Marie Bernadette Soubirous"},
    {key:"Feb22",title:"Feb 22: Chair of St Peter at Antioch",en:"Feb 22: Chair of St Peter at Antioch"},
    {key:"Feb23",title:"Feb 23: St Peter Damian",en:"Feb 23: St Peter Damian"},
{key:"Feb23or24",title:"Feb 23 vel 24: In vigilia S Matthiæ",en:"Feb 23 or 24: Vigil of St Matthias"},
    {key:"Feb24or25",title:"Feb 24 or 25: St Matthias",en:"Feb 24 or 25: St Matthias"},
    {key:"Feb27or28",title:"Feb 27 or 28: St Gabriel of Our Lady of Sorrows",en:"Feb 27 or 28: St Gabriel of Our Lady of Sorrows"},
    {key:"Mar4",title:"Mar 4: St Casimir of Lithuania",en:"Mar 4: St Casimir of Lithuania"},
    {key:"Mar6",title:"Mar 6: Ss Perpetua and Felicity and Companions",en:"Mar 6: Ss Perpetua and Felicity and Companions"},
    {key:"Mar7",title:"Mar 7: St Thomas Aquinas",en:"Mar 7: St Thomas Aquinas"},
    {key:"Mar8",title:"Mar 8: St John of God",en:"Mar 8: St John of God"},
    {key:"Mar9",title:"Mar 9: St Frances of Rome",en:"Mar 9: St Frances of Rome"},
    {key:"Mar10",title:"Mar 10: Forty Martyrs of Sebaste",en:"Mar 10: Forty Martyrs of Sebaste"},
    {key:"Mar12",title:"Mar 12: St Gregory the Great",en:"Mar 12: St Gregory the Great"},
    {key:"Mar17",title:"Mar 17: St Patrick",en:"Mar 17: St Patrick"},
    {key:"Mar18",title:"Mar 18: St Cyril of Jerusalem",en:"Mar 18: St Cyril of Jerusalem"},
    {key:"Mar19",title:"Mar 19: St Joseph",en:"Mar 19: St Joseph",class:1,transferIfSunday:true},
    {key:"Mar21",title:"Mar 21: St Benedict",en:"Mar 21: St Benedict"},
    {key:"Mar24",title:"Mar 24: St Gabriel the Archangel",en:"Mar 24: St Gabriel the Archangel"},
    {key:"Mar25",title:"Mar 25: Annunciation of Our Lady",en:"Mar 25: Annunciation of Our Lady",class:1,transferIfSunday:true},
    {key:"Mar27",title:"Mar 27: St John Damascene",en:"Mar 27: St John Damascene"},
    {key:"Mar28",title:"Mar 28: St John Capistran",en:"Mar 28: St John Capistran"},
    {key:"Apr2",title:"Apr 2: St Francis of Paula",en:"Apr 2: St Francis of Paula"},
    {key:"Apr4",title:"Apr 4: St Isidore",en:"Apr 4: St Isidore"},
    {key:"Apr5",title:"Apr 5: St Vincent Ferrer",en:"Apr 5: St Vincent Ferrer"},
    {key:"Apr11",title:"Apr 11: St Leo I",en:"Apr 11: St Leo I"},
    {key:"Apr13",title:"Apr 13: St Hermenegild",en:"Apr 13: St Hermenegild"},
    {key:"Apr14",title:"Apr 14: St Justin",en:"Apr 14: St Justin"},
    {key:"Apr17",title:"Apr 17: St Anicetus",en:"Apr 17: St Anicetus"},
    {key:"Apr21",title:"Apr 21: St Anselm",en:"Apr 21: St Anselm"},
    {key:"Apr22",title:"Apr 22: Ss Soter and Caius",en:"Apr 22: Ss Soter and Caius"},
    {key:"Apr23",title:"Apr 23: St George",en:"Apr 23: St George"},
    {key:"Apr24",title:"Apr 24: St Fidelis of Sigmaringen",en:"Apr 24: St Fidelis of Sigmaringen"},
    {key:"Apr25",title:"Apr 25: St Mark",en:"Apr 25: St Mark"},
    {key:"Apr26",title:"Apr 26: Ss Cletus and Marcellinus",en:"Apr 26: Ss Cletus and Marcellinus"},
    {key:"Apr27",title:"Apr 27: St Peter Canisius",en:"Apr 27: St Peter Canisius"},
    {key:"Apr28",title:"Apr 28: St Paul of the Cross",en:"Apr 28: St Paul of the Cross"},
    {key:"Apr29",title:"Apr 29: St Peter of Verona",en:"Apr 29: St Peter of Verona"},
    {key:"Apr30",title:"Apr 30: St Catherine of Sienna",en:"Apr 30: St Catherine of Sienna"},
    {key:"May1",title:"May 1: St Joseph the Worker",en:"May 1: St Joseph the Worker",class:1},
    {key:"May2",title:"May 2: St Athanasius",en:"May 2: St Athanasius"},
    {key:"May3",title:"May 3: In Inventione S Crucis",en:"May 3: Finding of the Holy Cross"},
    {key:"May4",title:"May 4: St Monica",en:"May 4: St Monica"},
    {key:"May5",title:"May 5: St Pius V",en:"May 5: St Pius V"},
    {key:"May6",title:"May 6: S Joannis: Ap et Ev ante Portam Latinam",en:"May 6: St John before the Latin Gate"},
    {key:"May7",title:"May 7: St Stanislaus",en:"May 7: St Stanislaus"},
    {key:"May8",title:"May 8: In Apparitione S Michaelis Archangeli",en:"May 8: Apparition of St. Michael the Archangel"},
    {key:"May9",title:"May 9: St Gregory Nazianzen",en:"May 9: St Gregory Nazianzen"},
    {key:"May10",title:"May 10: St Antoninus",en:"May 10: St Antoninus"},
    {key:"May11",title:"May 11: Ss Philip and James",en:"May 11: Ss Philip and James"},
    {key:"May12",title:"May 12: Ss Nereus, Achilleus, Domitilla, and Pancras",en:"May 12: Ss Nereus, Achilleus, Domitilla, and Pancras"},
    {key:"May13",title:"May 13: St Robert Bellarmine",en:"May 13: St Robert Bellarmine"},
{key:"May14",title:"May 14: St Boniface",en:"May 14: St Boniface"},
    {key:"May15",title:"May 15: St John Baptist de la Salle",en:"May 15: St John Baptist de la Salle"},
    {key:"May16",title:"May 16: St Ubaldus",en:"May 16: St Ubaldus"},
    {key:"May17",title:"May 17: St Paschal Baylon",en:"May 17: St Paschal Baylon"},
    {key:"May18",title:"May 18: St Venantius",en:"May 18: St Venantius"},
    {key:"May19",title:"May 19: St Peter Celestine",en:"May 19: St Peter Celestine"},
    {key:"May20",title:"May 20: St Bernardine of Siena",en:"May 20: St Bernardine of Siena"},
    {key:"May24",title:"May 24: Our Lady Help of Christians",en:"May 24: Our Lady Help of Christians"},
    {key:"May25",title:"May 25: St Gregory VII",en:"May 25: St Gregory VII"},
    {key:"May26",title:"May 26: St Philip Neri",en:"May 26: St Philip Neri"},
    {key:"May27",title:"May 27: St Bede the Venerable",en:"May 27: St Bede the Venerable"},
    {key:"May28",title:"May 28: St Augustine of Canterbury",en:"May 28: St Augustine of Canterbury"},
    {key:"May29",title:"May 29: St Mary Magdalen of Pazzi",en:"May 29: St Mary Magdalen of Pazzi"},
    {key:"May30",title:"May 30: St Felix",en:"May 30: St Felix"},
    {key:"May31",title:"May 31: Queenship of BVM",en:"May 31: Queenship of BVM"},
    {key:"Jun1",title:"Jun 1: St Angela Merici",en:"Jun 1: St Angela Merici"},
{key:"Jun2",title:"Jun 2: Sts Marcellinus, Peter, and Erasmus",en:"Jun 2: Sts Marcellinus, Peter, and Erasmus"},
    {key:"Jun4",title:"Jun 4: St Francis Caracciolo",en:"Jun 4: St Francis Caracciolo"},
    {key:"Jun5",title:"Jun 5: St Boniface",en:"Jun 5: St Boniface"},
    {key:"Jun6",title:"Jun 6: St Norbert",en:"Jun 6: St Norbert"},
{key:"Jun9",title:"Jun 9: Ss Primus and Felician",en:"Jun 9: Ss Primus and Felician"},
    {key:"Jun10",title:"Jun 10: St Margaret",en:"Jun 10: St Margaret"},
    {key:"Jun11",title:"Jun 11: St Barnabas",en:"Jun 11: St Barnabas"},
    {key:"Jun12",title:"Jun 12: St John of San Facundo",en:"Jun 12: St John of San Facundo"},
    {key:"Jun13",title:"Jun 13: St Anthony of Padua",en:"Jun 13: St Anthony of Padua"},
    {key:"Jun14",title:"Jun 14: St Basil the Great",en:"Jun 14: St Basil the Great"},
{key:"Jun15",title:"Jun 15: Sts Vitus, Modestus, and Crescentia",en:"Jun 15: Sts Vitus, Modestus, and Crescentia"},
    {key:"Jun17",title:"Jun 17: St Gregory Barbadici",en:"Jun 17: St Gregory Barbadici"},
    {key:"Jun18",title:"Jun 18: St Ephrem",en:"Jun 18: St Ephrem"},
    {key:"Jun19",title:"Jun 19: St Juliana Falconieri",en:"Jun 19: St Juliana Falconieri"},
    {key:"Jun19a",title:"Jun 19: Ss Gervasii et Protasii",en:"Jun 19: Sts Gervase and Protase"},
    {key:"Jun20",title:"Jun 20: St Silverius",en:"Jun 20: St Silverius"},
    {key:"Jun21",title:"Jun 21: St Aloysius Gonzaga",en:"Jun 21: St Aloysius Gonzaga"},
    {key:"Jun22",title:"Jun 22: St Paulinus",en:"Jun 22: St Paulinus"},
    {key:"Jun23",title:"Jun 23: In Vigilia Nativitatis S Joannis Baptistæ",en:"Jun 23: Vigil of the Birth of St John the Baptist"},
    {key:"Jun24",title:"Jun 24: Birth of St John the Baptist",en:"Jun 24: Birth of St John the Baptist"},
    {key:"Jun25",title:"Jun 25: St William",en:"Jun 25: St William"},
    {key:"Jun26",title:"Jun 26: Ss John and Paul",en:"Jun 26: Ss John and Paul"},
    {key:"Jun28",title:"Jun 28: Vigil of Ss Peter and Paul",en:"Jun 28: Vigil of SS Peter and Paul"},
    {key:"Jun29",title:"Jun 29: Ss Peter and Paul",en:"Jun 29: Ss Peter and Paul"},
    {key:"Jun30",title:"Jun 30: Commemoration of St Paul",en:"Jun 30: Commemoration of St Paul"},
    {key:"Jul1",title:"Jul 1: The Most Precious Blood of Our Lord",en:"Jul 1: The Most Precious Blood of Our Lord"},
    {key:"Jul2",title:"Jul 2: The Visitation of BVM",en:"Jul 2: The Visitation of BVM"},
    {key:"Jul3",title:"Jul 3: St Irenaeus",en:"Jul 3: St Irenaeus"},
    {key:"Jul3a",title:"Jul 3: S Leonis II",en:"Jul 3: St Leo II"},
{key:"Jul4",title:"Jul 4: Within the octave of the Apostles Peter and Paul",en:"Jul 4: Within the octave of the Apostles Peter and Paul"},
    {key:"Jul5",title:"Jul 5: St Anthony Mary Zaccaria",en:"Jul 5: St Anthony Mary Zaccaria"},
    {key:"Jul6",title:"Jul 6: In Octava Ss Petri et Pauli App",en:"Jul 6: Octave of Ss Peter and Paul"},
    {key:"Jul7",title:"Jul 7: Ss Cyril and Methodius",en:"Jul 7: Ss Cyril and Methodius"},
    {key:"Jul8",title:"Jul 8: St Elizabeth",en:"Jul 8: St Elizabeth"},
    {key:"Jul10",title:"Jul 10: The Seven Holy Brothers",en:"Jul 10: The Seven Holy Brothers"},
    {key:"Jul11",title:"Jul 11: St Pius I",en:"Jul 11: St Pius I"},
    {key:"Jul11a",title:"Jul 11: St Oliver Plunkett",en:"Jul 11: St Oliver Plunkett"},
    {key:"Jul12",title:"Jul 12: St John Gualbert",en:"Jul 12: St John Gualbert"},
    {key:"Jul13",title:"Jul 13: S Anacleti Papæ et Mart",en:"Jul 13: St Anacletus"},
    {key:"Jul14",title:"Jul 14: St Bonaventure",en:"Jul 14: St Bonaventure"},
    {key:"Jul15",title:"Jul 15: St Henry",en:"Jul 15: St Henry"},
    {key:"Jul16",title:"Jul 16: Our Lady of Mount Carmel",en:"Jul 16: Our Lady of Mount Carmel"},
    {key:"Jul17",title:"Jul 17: St Alexius",en:"Jul 17: St Alexius"},
    {key:"Jul18",title:"Jul 18: St Camillus de Lellis",en:"Jul 18: St Camillus de Lellis"},
    {key:"Jul19",title:"Jul 19: St Vincent de Paul",en:"Jul 19: St Vincent de Paul"},
    {key:"Jul20",title:"Jul 20: St Jerome Emilian",en:"Jul 20: St Jerome Emilian"},
    {key:"Jul21",title:"Jul 21: St Lawrence of Brindisi",en:"Jul 21: St Lawrence of Brindisi"},
    {key:"Jul21a",title:"Jul 21: S Praxedis Virginis",en:"Jul 21: St Praxedes"},
    {key:"Jul22",title:"Jul 22: St Mary Magdalen",en:"Jul 22: St Mary Magdalen"},
    {key:"Jul23",title:"Jul 23: St Apollinaris",en:"Jul 23: St Apollinaris"},
    {key:"Jul24",title:"Jul 24: In Vigilia S Jacobi Apostoli",en:"Jul 24: Vigil of St. James"},
    {key:"Jul25",title:"Jul 25: St James the Greater",en:"Jul 25: St James the Greater"},
    {key:"Jul26",title:"Jul 26: St Anne",en:"Jul 26: St Anne"},
    {key:"Jul27",title:"Jul 27: St Pantaleon",en:"Jul 27: St Pantaleon"},
    {key:"Jul28",title:"Jul 28: Ss Nazarius and Celsus",en:"Jul 28: Ss Nazarius and Celsus"},
    {key:"Jul29",title:"Jul 29: St Martha",en:"Jul 29: St Martha"},
{key:"Jul30",title:"Jul 30: Ss Abdon and Sennen",en:"Jul 30: Ss Abdon and Sennen"},
    {key:"Jul31",title:"Jul 31: St Ignatius of Loyola",en:"Jul 31: St Ignatius of Loyola"},
    {key:"Aug1",title:"Aug 1: Holy Machabees",en:"Aug 1: Holy Machabees"},
    {key:"Aug1a",title:"Aug 1: S Petri Ap ad Vincula",en:"Aug 1: St Peter at the Chains"},
    {key:"Aug2",title:"Aug 2: St Alphonsus Mary de Ligouri",en:"Aug 2: St Alphonsus Mary de Ligouri"},
    {key:"Aug3",title:"Aug 3: In Inventione S Stephani Protomartyris",en:"Aug 3: The Finding of St Stephen’s Relics"},
    {key:"Aug4",title:"Aug 4: St Dominic",en:"Aug 4: St Dominic"},
    {key:"Aug5",title:"Aug 5: Dedication of the Basilica of St Mary Major",en:"Aug 5: Dedication of the Basilica of St Mary Major"},
    {key:"Aug6",title:"Aug 6: Transfiguration of Our Lord",en:"Aug 6: Transfiguration of Our Lord"},
    {key:"Aug7",title:"Aug 7: St Cajetan",en:"Aug 7: St Cajetan"},
    {key:"Aug8",title:"Aug 8: St John Mary Vianney",en:"Aug 8: St John Mary Vianney"},
    {key:"Aug8a",title:"Aug 8: Ss Cyriaci, Largi, et Smaragdi Martyrum",en:"Aug 8: Ss Cyriacus, Largus, and Smaragdus"},
    {key:"Aug9",title:"Aug 9: Vigil of St Lawrence",en:"Aug 9: Vigil of St Lawrence"},
    {key:"Aug10",title:"Aug 10: St Lawrence",en:"Aug 10: St Lawrence"},
    {key:"Aug11",title:"Aug 11: St Tiburtius and St Susanna",en:"Aug 11: St Tiburtius and St Susanna"},
    {key:"Aug12",title:"Aug 12: St Clare",en:"Aug 12: St Clare"},
    {key:"Aug13",title:"Aug 13: Ss Hippolytus and Cassian",en:"Aug 13: Ss Hippolytus and Cassian"},
    {key:"Aug14",title:"Aug 14: Vigil of Assumption of BVM",en:"Aug 14: Vigil of Assumption of BVM"},
    {key:"Aug15",title:"Aug 15: Assumption of BVM",en:"Aug 15: Assumption of BVM"},
    {key:"Aug16",title:"Aug 16: St Joachim",en:"Aug 16: St Joachim"},
    {key:"Aug17",title:"Aug 17: St Hyacinth",en:"Aug 17: St Hyacinth"},
    {key:"Aug18",title:"Aug 18: St Agapitus",en:"Aug 18: St Agapitus"},
    {key:"Aug19",title:"Aug 19: St John Eudes",en:"Aug 19: St John Eudes"},
    {key:"Aug20",title:"Aug 20: St Bernard",en:"Aug 20: St Bernard"},
    {key:"Aug21",title:"Aug 21: St Jane Frances de Chantal",en:"Aug 21: St Jane Frances de Chantal"},
    {key:"Aug22",title:"Aug 22: Feast of the Immaculate Heart of BVM",en:"Aug 22: Feast of the Immaculate Heart of BVM"},
    {key:"Aug23",title:"Aug 23: St Philip Benizi",en:"Aug 23: St Philip Benizi"},
    {key:"Aug24",title:"Aug 24: St Bartholomew",en:"Aug 24: St Bartholomew"},
    {key:"Aug25",title:"Aug 25: St Louis",en:"Aug 25: St Louis"},
{key:"Aug26",title:"Aug 26: St Zephyrinus",en:"Aug 26: St Zephyrinus"},
    {key:"Aug27",title:"Aug 27: St Joseph Calasanctius",en:"Aug 27: St Joseph Calasanctius"},
    {key:"Aug28",title:"Aug 28: St Augustine",en:"Aug 28: St Augustine"},
    {key:"Aug29",title:"Aug 29: Beheading of St John the Baptist",en:"Aug 29: Beheading of St John the Baptist"},
    {key:"Aug30",title:"Aug 30: St Rose of Lima",en:"Aug 30: St Rose of Lima"},
    {key:"Aug31",title:"Aug 31: St Raymund Nonnatus",en:"Aug 31: St Raymund Nonnatus"},
{key:"Sep1",title:"Sep 1: St Giles",en:"Sep 1: St Giles"},
    {key:"Sep2",title:"Sep 2: St Stephen",en:"Sep 2: St Stephen"},
    {key:"Sep3",title:"Sep 3: St Pius X",en:"Sep 3: St Pius X"},
    {key:"Sep5",title:"Sep 5: St Lawrence Justinian",en:"Sep 5: St Lawrence Justinian"},
    {key:"Sep8",title:"Sep 8: Nativity of BVM",en:"Sep 8: Nativity of BVM"},
    {key:"Sep9",title:"Sep 9: St Gorgonius",en:"Sep 9: St Gorgonius"},
{key:"Sep9a",title:"Sep 9: St Peter Claver",en:"Sep 9: St Peter Claver"},
    {key:"Sep10",title:"Sep 10: St Nicholas of Tolentino",en:"Sep 10: St Nicholas of Tolentino"},
    {key:"Sep11",title:"Sep 11: Ss Protus and Hyacinth",en:"Sep 11: Ss Protus and Hyacinth"},
    {key:"Sep12",title:"Sep 12: Most Holy Name of Mary",en:"Sep 12: Most Holy Name of Mary"},
    {key:"Sep14",title:"Sep 14: The Exaltation of the Holy Cross",en:"Sep 14: The Exaltation of the Holy Cross"},
    {key:"Sep15",title:"Sep 15: Seven Sorrows of BVM",en:"Sep 15: Seven Sorrows of BVM"},
    {key:"Sep16",title:"Sep 16: St Cornelius",en:"Sep 16: St Cornelius"},
    {key:"Sep17",title:"Sep 17: The Stigmata of St Francis",en:"Sep 17: The Stigmata of St Francis"},
    {key:"Sep18",title:"Sep 18: St Joseph of Cupertino",en:"Sep 18: St Joseph of Cupertino"},
    {key:"Sep19",title:"Sep 19: St Januarius",en:"Sep 19: St Januarius"},
    {key:"Sep19laSalette",title:"Sep 19: Our Lady of La Salette, Reconciler of Sinners",en:"Sep 19: Our Lady of La Salette, Reconciler of Sinners"},
    {key:"Sep20",title:"Sep 20: St Eustace and Companions",en:"Sep 20: St Eustace and Companions"},
    {key:"Sep21",title:"Sep 21: St Matthew",en:"Sep 21: St Matthew"},
    {key:"Sep22",title:"Sep 22: St Thomas of Villanova",en:"Sep 22: St Thomas of Villanova"},
    {key:"Sep23",title:"Sep 23: St Linus",en:"Sep 23: St Linus"},
    {key:"Sep24",title:"Sep 24: Our Lady of Ransom",en:"Sep 24: Our Lady of Ransom"},
    {key:"Sep26",title:"Sep 26: Ss Cyprian and Justina",en:"Sep 26: Ss Cyprian and Justina"},
{key:"Sep26a",title:"Sep 26: Ss Isaac Jogues, John de Brebeuf, and Companions",en:"Sep 26: Ss Isaac Jogues, John de Brebeuf, and Companions"},
    {key:"Sep27",title:"Sep 27: Ss Cosmas and Damian",en:"Sep 27: Ss Cosmas and Damian"},
    {key:"Sep28",title:"Sep 28: St Wenceslaus",en:"Sep 28: St Wenceslaus"},
    {key:"Sep29",title:"Sep 29: St Michael the Archangel",en:"Sep 29: St Michael the Archangel"},
    {key:"Sep30",title:"Sep 30: St Jerome",en:"Sep 30: St Jerome"},
{key:"Oct1",title:"Oct 1: St Remigius",en:"Oct 1: St Remigius"},
    {key:"Oct2",title:"Oct 2: The Holy Guardian Angels",en:"Oct 2: The Holy Guardian Angels"},
    {key:"Oct3",title:"Oct 3: St Thérèse of the Child Jesus",en:"Oct 3: St Thérèse of the Child Jesus"},
    {key:"Oct4",title:"Oct 4: St Francis of Assisi",en:"Oct 4: St Francis of Assisi"},
    {key:"Oct5",title:"Oct 5: St Placid and Companions",en:"Oct 5: St Placid and Companions"},
    {key:"Oct6",title:"Oct 6: St Bruno",en:"Oct 6: St Bruno"},
    {key:"Oct7",title:"Oct 7: The Most Holy Rosary of BVM",en:"Oct 7: The Most Holy Rosary of BVM"},
    {key:"Oct8",title:"Oct 8: St Bridget",en:"Oct 8: St Bridget"},
    {key:"Oct9",title:"Oct 9: St John Leonardi",en:"Oct 9: St John Leonardi"},
    {key:"Oct10",title:"Oct 10: St Francis Borgia",en:"Oct 10: St Francis Borgia"},
    {key:"Oct11",title:"Oct 11: The Motherhood of BVM",en:"Oct 11: The Motherhood of BVM"},
    {key:"Oct13",title:"Oct 13: St Edward",en:"Oct 13: St Edward"},
    {key:"Oct14",title:"Oct 14: St Callistus",en:"Oct 14: St Callistus"},
    {key:"Oct15",title:"Oct 15: St Teresa of Avila",en:"Oct 15: St Teresa of Avila"},
    {key:"Oct16",title:"Oct 16: St Hedwig",en:"Oct 16: St Hedwig"},
    {key:"Oct17",title:"Oct 17: St Margaret Mary Alacoque",en:"Oct 17: St Margaret Mary Alacoque"},
    {key:"Oct18",title:"Oct 18: St Luke",en:"Oct 18: St Luke"},
    {key:"Oct19",title:"Oct 19: St Peter of Alcantara",en:"Oct 19: St Peter of Alcantara"},
    {key:"Oct20",title:"Oct 20: St John Cantius",en:"Oct 20: St John Cantius"},
{key:"Oct21",title:"Oct 21: St Hilarion",en:"Oct 21: St Hilarion"},
    {key:"Oct23",title:"Oct 23: St Anthony Mary Claret",en:"Oct 23: St Anthony Mary Claret"},
    {key:"Oct24",title:"Oct 24: St Raphael",en:"Oct 24: St Raphael"},
{key:"Oct25",title:"Oct 25: Ss Chrysanthus and Daria",en:"Oct 25: Ss Chrysanthus and Daria"},
{key:"Oct25a",title:"Oct 25: St Isidore the Farmer",en:"Oct 25: St Isidore the Farmer"},
{key:"Oct26",title:"Oct 26: St Evaristus",en:"Oct 26: St Evaristus"},
    {key:"Oct27",title:"Oct 27: Vigil of Ss Simon and Jude",en:"Oct 27: Vigil of Ss Simon and Jude"},
    {key:"Oct28",title:"Oct 28: Ss Simon and Jude",en:"Oct 28: Ss Simon and Jude"},
    {key:"Oct31",title:"Oct 31: Vigil of All Saints",en:"Oct 31: Vigil of All Saints"},
    {key:"Nov1",title:"Nov 1: The Feast of All Saints",en:"Nov 1: The Feast of All Saints"},
    {key:"Nov2",title:"Nov 2: All Souls' Day",en:"Nov 2: All Souls' Day",class:1,transferIfSunday:true},
    {key:"Nov4",title:"Nov 4: St Charles Borromeo",en:"Nov 4: St Charles Borromeo"},
    {key:"Nov5",title:"Nov 5: The Feast of the Holy Relics",en:"Nov 5: The Feast of the Holy Relics"},
    {key:"Nov8",title:"Nov 8: Four Holy Crowned Martyrs",en:"Nov 8: Four Holy Crowned Martyrs"},
    {key:"Nov9",title:"Nov 9: The Dedication of the Lateran Basilica",en:"Nov 9: The Dedication of the Lateran Basilica"},
    {key:"Nov10",title:"Nov 10: St Andrew Avellino",en:"Nov 10: St Andrew Avellino"},
    {key:"Nov11",title:"Nov 11: St Martin of Tours",en:"Nov 11: St Martin of Tours"},
    {key:"Nov12",title:"Nov 12: St Martin I",en:"Nov 12: St Martin I"},
    {key:"Nov13",title:"Nov 13: St Didacus",en:"Nov 13: St Didacus"},
    {key:"Nov13a",title:"Nov 13: St Frances Xavier Cabrini",en:"Nov 13: St Frances Xavier Cabrini"},
    {key:"Nov14",title:"Nov 14: St Josaphat",en:"Nov 14: St Josaphat"},
    {key:"Nov15",title:"Nov 15: St Albert the Great",en:"Nov 15: St Albert the Great"},
    {key:"Nov16",title:"Nov 16: St Gertrude",en:"Nov 16: St Gertrude"},
    {key:"Nov17",title:"Nov 17: St Gregory the Wonderworker",en:"Nov 17: St Gregory the Wonderworker"},
    {key:"Nov18",title:"Nov 18: The Dedication of the Basilicas of Ss Peter and Paul",en:"Nov 18: The Dedication of the Basilicas of Ss Peter and Paul"},
    {key:"Nov19",title:"Nov 19: St Elizabeth of Hungary",en:"Nov 19: St Elizabeth of Hungary"},
    {key:"Nov20",title:"Nov 20: St Felix of Valois",en:"Nov 20: St Felix of Valois"},
    {key:"Nov21",title:"Nov 21: The Presentation of BVM",en:"Nov 21: The Presentation of BVM"},
    {key:"Nov22",title:"Nov 22: St Cecilia",en:"Nov 22: St Cecilia"},
    {key:"Nov23",title:"Nov 23: St Clement I",en:"Nov 23: St Clement I"},
    {key:"Nov24",title:"Nov 24: St John of the Cross",en:"Nov 24: St John of the Cross"},
    {key:"Nov25",title:"Nov 25: St Catherine of Alexandria",en:"Nov 25: St Catherine of Alexandria"},
    {key:"Nov26",title:"Nov 26: St Sylvester",en:"Nov 26: St Sylvester"},
    {key:"Nov27",title:"Nov 27: Our Lady of the Miraculous Medal",en:"Nov 27: Our Lady of the Miraculous Medal"},
    {key:"Nov29",title:"Nov 29: St Saturninus",en:"Nov 29: St Saturninus"},
    {key:"Nov29a",title:"Nov 29: In vigilia S. Andreæ Apostoli",en:"Nov 29: Vigil of St Andrew"},
    {key:"Nov30",title:"Nov 30: St Andrew",en:"Nov 30: St Andrew"},
    {key:"Dec2",title:"Dec 2: St Bibiana",en:"Dec 2: St Bibiana"},
    {key:"Dec3",title:"Dec 3: St Francis Xavier",en:"Dec 3: St Francis Xavier"},
    {key:"Dec4",title:"Dec 4: St Peter Chrysologus",en:"Dec 4: St Peter Chrysologus"},
    {key:"Dec5",title:"Dec 5: St Sabbas",en:"Dec 5: St Sabbas"},
    {key:"Dec6",title:"Dec 6: St Nicholas",en:"Dec 6: St Nicholas"},
    {key:"Dec7",title:"Dec 7: St Ambrose",en:"Dec 7: St Ambrose"},
    {key:"Dec8",title:"Dec 8: The Immaculate Conception of BVM",en:"Dec 8: The Immaculate Conception of BVM"},
    {key:"Dec10",title:"Dec 10: St Melchiades",en:"Dec 10: St Melchiades"},
    {key:"Dec11",title:"Dec 11: St Damasus",en:"Dec 11: St Damasus"},
    {key:"Dec12",title:"Dec 12: Our Lady of Guadalupe",en:"Dec 12: Our Lady of Guadalupe"},
    {key:"Dec13",title:"Dec 13: St Lucy",en:"Dec 13: St Lucy"},
    {key:"Dec16",title:"Dec 16: St Eusebius",en:"Dec 16: St Eusebius"},
    {key:"Dec20",title:"Dec 20: In Vigilia S Thomæ Apostoli",en:"Dec 20: Vigil of St Thomas"},
    {key:"Dec21",title:"Dec 21: St Thomas",en:"Dec 21: St Thomas"},
    {key:"Dec26",title:"Dec 26: St Stephen",en:"Dec 26: St Stephen"},
    {key:"Dec27",title:"Dec 27: St John",en:"Dec 27: St John"},
    {key:"Dec28",title:"Dec 28: The Holy Innocents",en:"Dec 28: The Holy Innocents"},
    {key:"Dec29",title:"Dec 29: St Thomas Becket",en:"Dec 29: St Thomas Becket"}
    /* END_GEN */
];
var gabcPsalm21 = "initial-style: 0;\n\
commentary: Psalm 21;\n\
%%\n\
(f3)1. De(h)us,(h) De(h)us(h) me(h)us,(h) ré(h)spi(h)ce(h) in(h) me:(f.) †(,) qua(h)re(h) me(h) de(h)<i>re</i>(g)<i>li</i>(f)<b>quís</b>(h)ti?(h.) *(:) lon(h)ge(h) a(h) sa(h)lú(h)te(h) me(h)a(h) ver(h)ba(h) de(h)lic(h)tó(h)rum(h) me(h)<b>ó</b>(h)rum.(f.) (::)";
var versesPsalm21 = '<div class="verses">\
<p><span class="versenum">2.&nbsp;</span>Deus meus, clamábo per diem, et <i>non</i> <i>ex</i><b>áu</b>dies:&nbsp;* et nocte, et non ad insipiéntiam <b>mi</b>hi.</p>\
<p><span class="versenum">3.&nbsp;</span>Tu autem in <i>sanc</i><i>to</i> <b>há</b>bitas:&nbsp;* laus <b>Is</b>raël.</p>\
<p><span class="versenum">4.&nbsp;</span>In te speravérunt <i>pa</i><i>tres</i> <b>nos</b>tri:&nbsp;* speravérunt, et liberásti <b>e</b>os.</p>\
<p><span class="versenum">5.&nbsp;</span>Ad te clamavérunt, et <i>sal</i><i>vi</i> <b>fac</b>ti sunt:&nbsp;* in te speravérunt, et non sunt con<b>fú</b>si.</p>\
<p><span class="versenum">6.&nbsp;</span>Ego autem sum vermis, <i>et</i> <i>non</i> <b>ho</b>mo:&nbsp;* oppróbrium hóminum, et abjéctio <b>ple</b>bis.</p>\
<p><span class="versenum">7.&nbsp;</span>Omnes vidéntes me <i>de</i><i>ri</i><b>sé</b>runt me:&nbsp;* locúti sunt lábiis, et movérunt <b>ca</b>put.</p>\
<p><span class="versenum">8.&nbsp;</span>Sperávit in Dómino, erí<i>pi</i><i>at</i> <b>e</b>um:&nbsp;* salvum fáciat eum, quóniam vult <b>e</b>um.</p>\
<p><span class="versenum">9.&nbsp;</span>Quóniam tu es, qui extraxísti <i>me</i> <i>de</i> <b>ven</b>tre:&nbsp;* spes mea ab ubéribus matris <b>me</b>æ.</p>\
<p><span class="versenum">10.&nbsp;</span>In te projéctus sum ex útero:&nbsp;† de ventre matris meæ Deus <i>me</i><i>us</i> <b>es</b> tu,&nbsp;* ne discésseris <b>a</b> me:</p>\
<p><span class="versenum">11.&nbsp;</span>Quóniam tribulátio <i>pró</i><i>xi</i><b>ma</b> est:&nbsp;* quóniam non est qui <b>ád</b>juvet.</p>\
<p><span class="versenum">12.&nbsp;</span>Circumdedérunt me ví<i>tu</i><i>li</i> <b>mul</b>ti:&nbsp;* tauri pingues obse<b>dé</b>runt me.</p>\
<p><span class="versenum">13.&nbsp;</span>Aperuérunt super <i>me</i> <i>os</i> <b>su</b>um:&nbsp;* sicut leo rápiens et <b>rú</b>giens.</p>\
<p><span class="versenum">14.&nbsp;</span>Sicut a<i>qua</i> <i>ef</i><b>fú</b>sus sum:&nbsp;* et dispérsa sunt ómnia ossa <b>me</b>a.</p>\
<p><span class="versenum">15.&nbsp;</span>Factum est cor meum tamquam ce<i>ra</i> <i>li</i><b>qué</b>scens:&nbsp;* in médio ventris <b>me</b>i.</p>\
<p><span class="versenum">16.&nbsp;</span>Aruit tamquam testa virtus mea,&nbsp;† et lingua mea adhǽsit fáu<i>ci</i><i>bus</i> <b>me</b>is:&nbsp;* et in púlverem mortis dedu<b>xís</b>ti me.</p>\
<p><span class="versenum">17.&nbsp;</span>Quóniam circumdedérunt me <i>ca</i><i>nes</i> <b>mul</b>ti:&nbsp;* concílium malignántium ob<b>sé</b>dit me.</p>\
<p><span class="versenum">18.&nbsp;</span>Fodérunt manus meas et <i>pe</i><i>des</i> <b>me</b>os:&nbsp;* dinumeravérunt ómnia ossa <b>me</b>a.</p>\
<p><span class="versenum">19.&nbsp;</span>Ipsi vero consideravérunt et inspexérunt me:&nbsp;† divisérunt sibi vesti<i>mén</i><i>ta</i> <b>me</b>a,&nbsp;* et super vestem meam misérunt <b>sor</b>tem.</p>\
<p><span class="versenum">20.&nbsp;</span>Tu autem, Dómine, ne elongáveris auxílium <i>tu</i><i>um</i> <b>a</b> me:&nbsp;* ad defensiónem meam <b>cón</b>spice.</p>\
<p><span class="versenum">21.&nbsp;</span>Erue a frámea, Deus, á<i>ni</i><i>mam</i> <b>me</b>am:&nbsp;* et de manu canis únicam <b>me</b>am.</p>\
<p><span class="versenum">22.&nbsp;</span>Salva me ex o<i>re</i> <i>le</i><b>ó</b>nis:&nbsp;* et a córnibus unicórnium humilitátem <b>me</b>am.</p>\
<p><span class="versenum">23.&nbsp;</span>Narrábo nomen tuum frá<i>tri</i><i>bus</i> <b>me</b>is:&nbsp;* in médio Ecclésiæ lau<b>dá</b>bo te.</p>\
<p><span class="versenum">24.&nbsp;</span>Qui timétis Dóminum, lau<i>dá</i><i>te</i> <b>e</b>um:&nbsp;* univérsum semen Jacob, glorificáte <b>e</b>um.</p>\
<p><span class="versenum">25.&nbsp;</span>Tímeat eum omne <i>se</i><i>men</i> <b>Is</b>raël:&nbsp;* quóniam non sprevit, neque despéxit deprecatiónem <b>páu</b>peris:</p>\
<p><span class="versenum">26.&nbsp;</span>Nec avértit fáciem <i>su</i><i>am</i> <b>a</b> me:&nbsp;* et cum clamárem ad eum, exau<b>dí</b>vit me.</p>\
<p><span class="versenum">27.&nbsp;</span>Apud te laus mea in ecclé<i>si</i><i>a</i> <b>ma</b>gna:&nbsp;* vota mea reddam in conspéctu timéntium <b>e</b>um.</p>\
<p><span class="versenum">28.&nbsp;</span>Edent páuperes, et saturabúntur:&nbsp;† et laudábunt Dóminum qui re<i>quí</i><i>runt</i> <b>e</b>um:&nbsp;* vivent corda eórum in sǽculum <b>sǽ</b>culi.</p>\
<p><span class="versenum">29.&nbsp;</span>Reminiscéntur et convertén<i>tur</i> <i>ad</i> <b>Dó</b>minum&nbsp;* univérsi fines <b>ter</b>ræ:</p>\
<p><span class="versenum">30.&nbsp;</span>Et adorábunt in con<i>spéc</i><i>tu</i> <b>e</b>jus&nbsp;* univérsæ famíliæ <b>Gén</b>tium.</p>\
<p><span class="versenum">31.&nbsp;</span>Quóniam Dómi<i>ni</i> <i>est</i> <b>re</b>gnum:&nbsp;* et ipse dominábitur <b>Gén</b>tium.</p>\
<p><span class="versenum">32.&nbsp;</span>Manducavérunt et adoravérunt omnes <i>pin</i><i>gues</i> <b>ter</b>ræ:&nbsp;* in conspéctu ejus cadent omnes qui descéndunt in <b>ter</b>ram.</p>\
<p><span class="versenum">33.&nbsp;</span>Et ánima mea <i>il</i><i>li</i> <b>vi</b>vet:&nbsp;* et semen meum sérviet <b>ip</b>si.</p>\
<p><span class="versenum">34.&nbsp;</span>Annuntiábitur Dómino generátio ventúra:&nbsp;† et annuntiábunt cæli justítiam ejus pópulo <i>qui</i> <i>na</i><b>scé</b>tur,&nbsp;* quem fecit <b>Dó</b>minus.</p>\
</div>';
var gabcHagios = "initial-style: 1;\n\
annotation: \\Vbar;\n\
%%\n\
(c4)H{A}<alt>The first choir:</alt>(g)gi(fe)os(fgf/fe) o(c) The(d)ós.(fg!hv/hg.)\n\
<sp>R/</sp>.(::) Sanc<alt>The second choir:</alt>(g)tus(fgf/fe) De(cd)us.(fg!hv/hg.) (::)\n\
<sp>V/</sp>. Há(g)gi(fe)os(fgf/fe) Is(c)chy(d)rós.(fg!hv/hg.) (::)\n\
<sp>R/</sp>. Sanc(g)tus(fgf/fe) For(cd)tis.(fg!hv/hg.) (::)\n\
<sp>V/</sp>. Há(gh)gi(g)os(ixhg/hiHG'g) A(f)thá(g)na(h)tos,(hiwjvIHiih.) (;) e(g)lé(hj/jvIH')i(g)son(hg/h_g) hy(fd)más.(fghv/hg.) (::)\n\
<sp>R/</sp>. Sanc(gh)tus(ixhg/hiHG'g) Im(f)mor(g)tá(h)lis,(hiwjvIHiih.) (;) mi(g)se(hj/jvIH')ré(g)re(hg/h_g) no(fd)bis.(fghv/hg.) (::)\n";
var gabcReproachesV1 = "initial-style: 0;\n\
%%\n\
(c4)<sp>V/</sp>. {E}(c)go(de) prop(e)ter(e) te(e) fla(e)gel(e)lá(e)vi(e) Æ(e)gýp(d)tum(e.) (,)\n\
cum(e) pri(e)mo(f)gé(g)ni(f)tis(f) su(evDC)is:(c.) (;)\n\
et(c) tu(d_e) me(e) fla(e)gel(e)lá(e)tum(ed) tra(f)di(d)dís(ef)ti.(edeDC.) (::) ^P{}ópule^() (c+)\n";
var gabcReproachesOtherVerses = "initial-style: 0;\n\
%%\n\
(c4)^2.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) te(e) e(e)dú(e)xi(e) de(e) Æ(e)gýp(d)to,(e.) (,) \
de(c)mér(de)so(e) Pha(e)ra(e)ó(e)ne(e) in(f) ma(g)re(f) Ru(evDC)brum:(c.) (;) \
et(c) tu(d_e) me(e) tra(e)di(e)dís(e)ti(e.) (,) prin(e)cí(e)pi(e)bus(ed) sa(f)cer(d)dó(ef)tum.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^3.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) an(e)te(e) te(e) a(f)pé(g)ru(f)i(f) ma(evDC)re:(c.) (;) \
et(c) tu(d_e) a(e)pe(e)ru(e)ís(e)ti(e) lán(e)ce(e)a(ed) la(f)tus(d) me(ef)um.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^4.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) an(e)te(e) te(e) præ(d)í(e)vi(e.) (,) in(e) co(f)lúm(g)na(f) nu(evDC)bis:(c.) (;) \
et(c) tu(d_e) me(e) du(e)xís(e)ti(e.) (,) ad(e) præ(e)tó(e)ri(ed)um(f) Pi(d)lá(ef)ti.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^5.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) te(e) pa(e)vi(e) man(e)na(f) per(g) de(f)sér(evDC)tum:(c.) (;) \
et(c) tu(d_e) me(e) ce(e)ci(e)dís(e)ti(e.) (,) á(e)la(e)pis(ed) et(f) fla(d)gél(ef)lis.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^6.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) te(e) po(e)tá(e)vi(e.) (,) a(e)qua(e) sa(f)lú(g)tis(f) de(f) pe(evDC)tra:(c.) (;) \
et(c) tu(d_e) me(e) po(e)tás(e)ti(e.) (,) fel(e)le(ed) et(f) a(d)cé(ef)to.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^7.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) prop(e)ter(e) te(e.) (,) Cha(e)na(e)næ(e)ó(e)rum(f) re(g)ges(f) per(f)cús(evDC)si:(c.) (;) \
et(c) tu(d_e) per(e)cus(e)sís(e)ti(e.) (,) a(e)rún(e)di(e)ne(ed) ca(f)put(d) me(ef)um.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^8.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) de(e)di(e) ti(e)bi(f) scep(g)trum(f) re(f)gá(evDC)le:(c.) (;) \
et(c) tu(d_e) de(e)dís(e)ti(e) cá(e)pi(e)ti(e) me(e)o(e.) (,) spí(e)ne(ed)am(f) co(d)ró(ef)nam.(edeDC.) (::) ^P{}ópule^() (c+Z) \
 \
^9.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) te(e) ex(e)al(e)tá(e)vi(f) ma(g)gna(f) vir(f)tú(evDC)te:(c.) (;) \
et(c) tu(d_e) me(e) sus(e)pen(e)dís(e)ti(e.) (,) in(e) pa(ed)tí(f)bu(e)lo(d) cru(ef)cis.(edeDC.) (::) ^P{}ópule^() (c+Z)\n";
var gabcEasterAlleluia = "initial-style: 1;\n\
office-part:Antiphona;\n\
mode:6;\n\
%%\n\
(c4)AL(f)le(g')lú(h)ia,(f.) *(,) al(gh)le(g')lú(f)ia,(d_c) (,) al(f)le(gh)lú(gf~)ia.(f.) (::)";
var rubricBeforeUnveilingCross = "At the end of the Prayers, the Priest, turned towards the people, unveils the Cross. He intones the Antiphon <Ecce lignum Crucis.> The assistant clergy joins with him in continuing the chant as far as the <r/.&nbsp;Venite adorémus.> The choir sings <Veníte adorémus.> whilst all kneel except the Celebrant. The same chant is sung three times, each time in a higher tone of voice.";
var rubricAdorationOfTheCross = "The adoration of the Cross then takes place, during which all or some of the following Reproaches are sung, according to the number who are to venerate the Cross.";
var rubricTwoCantorsInTheMiddle = "Two cantors sing the following in the middle of the Choir:";
var rubricTwoCantorsOfTheSecondChoir = "Two cantors of the second choir sing:";
var rubricTwoChoirsRespondHagios = "The two choirs respond in turn <Hagios o Theós, Sanctus Deus.> etc. It is always the first choir that sings <Hagios.>";
var rubricThenTwoCantorsOfTheFirstChoir = "Then two cantors of the first choir sing:";
var rubricTwoChoirsRespondHagiosAgain = "The two choirs again respond in turn <Hagios o Theós. Sanctus Deus.> etc.";
var rubricFollowingReproachesSungInTurn = "The following Reproaches are sung in turn by the cantors. After each Reproach, the two choirs together respond <Pópule meus.> as above, as far as the <v/.&nbsp;Quia.>";
var rubricBothChoirsRepeatPopule = "Both choirs repeat: <Pópule meus>:";
var rubricBothChoirsThenSingAntiphon = "Both choirs then sing the following antiphon:";
var rubricTheAntiphonCrucemIsRepeated = "The antiphon <Crucem tuam.> is repeated";
var rubricCruxFidelis = "<Crux fidélis.> is then sung and the hymn <Pange, lingua, gloriósi.>  After the first stanza of the hymn, <v/.&nbsp;Crux fidélis.> is repeated as far as <Dulce lignum;> after the second stanza, <Dulce lignum.> is repeated. This alternate repetition takes place after each stanza of the hymn."
var replaceQuiaVerse = [/(\(::\))\s+<sp>V\/<\/sp>\.?\s+Qu[ií]\([^)]+\)a\([^)]+\)\s.*/,'$1'];
var replaceAltEtc = [/\\hspace{[^}]*}/g,'',/(?:\(Z\)\s*)?<alt>(.*?\\emph.*?)<\/alt>/gi,'^_$1_^() (Z)\n',/\\emph{([^(}]+)\}/g,'_$1_'];
var replaceOfficePartToTract = [/((?:$|\n)office-part:)\s*[^;]+;/,'$1Tractus;'];
var replaceRemoveAsterisks = [/(\*(\|\*)*|<i>ij\.<\/i>)\(/g,'('];
var replaceRemoveHtmlAsterisks = [/\*\s+/g,''];
var replaceRemoveAbImminentibus = [/<p>Ab imminénti<i>bus<\/i> <i>per<\/i><b>í<\/b>culis,[^\n]*<\/p>/i,''];
var extraChants = {
  "litaniis": [
    {
        title: "At the Procession",
        rubric: "Before the procession, the choir sings, standing:",
        id: 30
    }, {
        rubric: "Then, two cantors, kneeling before the altar, begin the litany.  Each invocation is doubled, unless the procession cannot take place.",
        id: 'litanies/saints1-1',
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints1-2rogations.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    }, {
        id: 'litanies/saints1-3',
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints1-4.html',
        htmlReplace: replaceRemoveHtmlAsterisks.concat(replaceRemoveAbImminentibus)
    }, {
        id: "litanies/saints1-5",
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints1-6.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    },
    {
        id: "litanies/saints1-7",
        gabcReplace: replaceRemoveAsterisks
    }, {
        gabc: "initial-style: 0;\n%%\n(c3)Pa(h)ter(h) nos(h)ter.(f.) (::) <i>secreto.</i>() \
V/. Et(h) ne(h) nos(h) in(h)dú(h)cas(h) in(h) ten(h)ta(h)ti(h)ó(h)nem.(f.) (::) \
R/. Sed(h) lí(h)be(h)ra(h) nos(h) a(h) ma(h)lo.(f.) (::)"
    }, {
        gabc: "initial-style: 1;\
commentary: Psalm 69;\
%%\
(c3)De(h)us,(h) in(h) ad(h)ju(h)tó(h)ri(h)um(h) me(h)<i>um</i>(g) <i>in</i>(f)<b>tén</b>(h)de:(h.) *(:) Dó(h)mi(h)ne(h) ad(h) ad(h)ju(h)ván(h)dum(h) me(h) fes(h)<b>tí</b>(h)na.(f.) (::)\
<i>Flex:</i>()  vi(h)ví(h)fi(h)cet(h) e(h)um, †(f. h h h  ::)",
        html: "<div class='verses' style='display: inline-block'>\
<p><span class='versenum'>2.&nbsp;</span>Confundántur et re<i>ve</i><i>re</i><b>án</b>tur,&nbsp;* qui quærunt ánimam <b>me</b>am.</p>\
<p><span class='versenum'>3.&nbsp;</span>Avertántur retrórsum, et <i>e</i><i>ru</i><b>bés</b>cant,&nbsp;* qui volunt mihi <b>ma</b>la.</p>\
<p><span class='versenum'>4.&nbsp;</span>Avertántur statim e<i>ru</i><i>be</i><b>scén</b>tes,&nbsp;* qui dicunt mihi: Euge, <b>eu</b>ge.</p>\
<p><span class='versenum'>5.&nbsp;</span>Exsúltent et læténtur in te om<i>nes</i> <i>qui</i> <b>quæ</b>runt te,&nbsp;* et dicant semper: Magnificétur Dóminus: qui díligunt salutáre <b>tu</b>um.</p>\
<p><span class='versenum'>6.&nbsp;</span>Ego vero egé<i>nus</i>, <i>et</i> <b>pau</b>per sum:&nbsp;* Deus, ádju<b>va</b> me.</p>\
<p><span class='versenum'>7.&nbsp;</span>Adjútor meus, et liberátor <i>me</i><i>us</i> <b>es</b> tu:&nbsp;* Dómine, ne mo<b>ré</b>ris.</p>\
<p><span class='versenum'>8.&nbsp;</span>Glória Pa<i>tri</i>, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirítui <b>Sanc</b>to.</p>\
<p><span class='versenum'>9.&nbsp;</span>Sicut erat in princípio, et <i>nunc</i>, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæculórum. <b>A</b>men.</p>\
<p></p>\
<p><span class='versiculum'>v</span> Salvos fac servos <b>tu</b>os.</p>\
<p><span class='versiculum'>r</span> Deus meus sperántes <b>in</b> te.</p>\
<p><span class='versiculum'>v</span> Esto nobis Dómine turris forti<b>tú</b>dinis.</p>\
<p><span class='versiculum'>r</span> A fácie ini<b>mí</b>ci.</p>\
<p><span class='versiculum'>v</span> Nihil profíciat inimícus in <b>no</b>bis.</p>\
<p><span class='versiculum'>r</span> Et fílius iniquitátis non appónat nocére <b>no</b>bis.</p>\
<p><span class='versiculum'>v</span> Domine non secúndum peccáta nostra fácias <b>no</b>bis.</p>\
<p><span class='versiculum'>r</span> Neque secúndum iniquitátes nostras retríbuas <b>no</b>bis.</p>\
<p><span class='versiculum'>v</span> Orémus pro Pontífice nostro <span class='rubric' style='padding-left: 0'>N.</span></p>\
<p><span class='versiculum'>r</span> Dóminus consérvet eum, et vivíficet eum,&nbsp;† et beátum fáciat e<i>um</i> <i>in</i> <b>ter</b>ra,&nbsp;* et non tradat eum in ánimam inimicórum <b>e</b>jus.</p>\
<p><span class='versiculum'>v</span> Orémus pro benefactóribus <b>nos</b>tris.</p>\
<p><span class='versiculum'>r</span> Retribúere dignáre Domine,&nbsp;† ómnibus nobis bona faciéntibus propter <i>nomen</i> <b>tu</b>um,&nbsp;* vitam ætérnam. <b>A</b>men.</p>\
<p><span class='versiculum'>v</span> Orémus pro fidélibus de<b>fún</b>ctis.</p>\
<p><span class='versiculum'>r</span> Réquiem ætérnam dona <i>eis</i> <b>Dó</b>mine,&nbsp;* et lux perpétua lúceat <b>e</b>is.</p>\
<p><span class='versiculum'>v</span> Requiéscant in <b>pa</b>ce. <span class='versiculum'>r</span>&nbsp;<b>A</b>men.</p>\
<p><span class='versiculum'>v</span> Pro frátribus nostris ab<b>sén</b>tibus.</p>\
<p><span class='versiculum'>r</span> Salvos fac <i>servos</i> <b>tu</b>os,&nbsp;* Deus meus, sperántes <b>in</b> te.</p>\
<p><span class='versiculum'>v</span> Mitte eis Dómine auxílium de <b>san</b>cto.</p>\
<p><span class='versiculum'>r</span> Et de Sion tuére <b>e</b>os.</p>\
<p><span class='versiculum'>v</span> Dómine exáudi oratiónem <b>me</b>am.</p>\
<p><span class='versiculum'>r</span> Et clamor meus ad te <b>vé</b>niat.</p>\
<p><span class='versiculum'>v</span> Dóminus vo<b>bís</b>cum. <span class='versiculum'>v</span>&nbsp;Et cum spíritu <b>tu</b>o.</p>\
</div>"
    }
  ],
  "defunctorum": {
    ite: [{
        id: 823
    }, {
        title: "Absolution after Mass",
        rubric: "After Mass, if there is to be Absolution, the Celebrant goes to the catafalque, and the cantor intones:",
        id: 376,
        rubricAfter: "Repeat <Libera me Domine.> as far as the <v/.&nbsp;Tremens.>"
    }, {
        rubric: "When the Responsory is ended, the Cantor and the first Choir sing:",
        gabc: "initial-style: 0;\n%%\n(c4)Ký(f)ri(f)e(f') e(f)lé(gh)i(g)son.(gf..) (::)"
    }, {
        rubric: "The second choir responds:",
        gabc: "initial-style: 0;\n%%\n(c4)Chris(f)te(f') e(f)lé(gh)i(g)son.(gf..) (::)"
    }, {
        rubric: "Both choirs together:",
        gabc: "initial-style: 0;\n%%\n(c4)Ký(h)ri(g)e(f.) e(hjg)lé(h')i(g)son.(fe..) (::)"
    }, {
        rubric: "The priest intones:",
        gabc: "initial-style: 0;\n%%\n(c4)Pa(f)ter(f) nos(f)ter.(d.) <i>...</i>(::) \
V/. Et(f) ne(f) nos(f) in(f)dú(f)cas(f) in(f) ten(f)ta(f)ti(f)ó(f)nem.(d.) (::) \
R/. Sed(f) lí(f)be(f)ra(f) nos(f) a(f) ma(f)lo.(d.) (::) \
V/. A(f) por(f)ta(f) ín(f)fe(d)ri.(d.) (::) \
R/. E(f)ru(f)e(f) Dó(f)mi(f)ne (f) á|[á(f)ni|ni(f)mam|mas (f) e|e{ó}(f)jus|rum] (d.) (::) \
V/. Re|[Re(f)qui|qui(f)és|és(f)cat|cant] (f) in(f) pa(f)ce(d.) (::) \
R/. A(f)men.(f.) (::) \
V/. Dó(f)mi(f)ne(f) ex(f)áu(f)di(f) o(f)ra(f)ti(f)ó(f)nem(f) me(f)am.(d.) (::) \
R/. Et(f) cla(f)mor(f) me(f)us(f) ad(f) te(f) vé(f)ni(d)at.(d.) (::)"
    }, {
        gabc: "initial-style: 0;\n%%\n(c4)V/. Ré(f)qui(f)em(f) æ(f)tér(f)nam(f) do(f)na (f) e|[e(f)i|is] (f) Dó(f)mi(d)ne.(d.) (::) \
R/. Et(f) lux(f) pe(f)pé(f)tu(f)a(f) lú(f)ce(f)at (f) e|[e(f)i.|is.] (d.) (::) \
<alt>The Cantors:</alt>V/. Re|[Re(g)qui|qui(h)és|és(h)cat|cant] (g') in(h) pa(hg)ce.(g.) (::) \
R/. A(g)men.(gh..) (::) \
<alt>The Celebrant:</alt>V/. A|[A(e)ni|ni(e)ma|mæ (e) e|e(e)jus|{ó}rum] (e) et(e) á(e)ni(e)mæ(e) óm(e)ni(e)um(e) fi(e)dé(e)li(e)um(e) de(e)func(e)tó(e)rum,(e) per(e) mi(e)se(e)ri(e)cór(e)di(e)am(e) De(e)i(e) re(e)qui(e)és(e)cant(e) in(e) pa(e)ce.(e.) (::) \
R/. A(e.)men.(e.) (::)"
    }]
  },
  "Feb2": [
    {
      rubric: "After the prayers, the Priest puts incense into the thurible. Whilst he distributes the candles, the choir sings:",
      id: 2897,
      gabcReplace: [/\s*\(::\)[^#]*/,' (::)'], // remove everything after the first (::)
      sticky: 0
    }, {
      id: 2897,
      gabcReplace: [/(\n%%\r?\n\s*\([cf][1-4]\)\s*)[^#]*?\(::\)/,'\ninitial-style: 0;$1'], // remove the first verse [up to the first (::)]
      sticky: 1
    }, {
      rubric: "When the distribution of candles is ended, the Choir sings:",
      id: 30,
      rubricAfter: "Repeat: <Exsúrge Dómine.>"
    }, {
      rubric: "The procession then takes place. When the Celebrant has put incense into the thurible, the Deacon turns toward the people and says:",
      gabc: "initial-style: 0;\n%%\n(c3) <sp>V/</sp> Pro(h)ce(h)dá(h)mus(h) in(h) pa(h)ce.(f.) (::)\n<sp>R/</sp> In(h) nó(h)mi(h)ne(h) Chris(h)ti.(h) A(h)men.(f.) (::)"
    }, {
      rubric: "During the procession, the following antiphons are sung:",
      id: 1311
    }, {
      id: 46
    }, {
      rubric: "On re-entering the church, the following Responsory is sung:",
      id: 513
    }
  ],
  "5aw": [
    {
      rubric: "The ashes, made from olive branches or other branches blessed the previous year, are placed in a vessel on the altar."
    }, {
      rubric: "The Choir first sings the following Antiphon:",
      id: 1081
    }, {
      rubric: "During the imposition of the ashes, the Choir sings:",
      id: 313
    }, {
      id: 1208
    }, {
      id: 743
    }
  ],
  "Quad6_v": [
    {
      rubric: "After Terce and the Asperges given in the usual manner, the Priest blesses the palms or branches of olive or of other trees, which have been placed before the altar or at the Epistle side. The choir first sings the following Antiphon:",
      id: 817,
      rubricAfter: "The Lesson is in the tone of the Epistle."
    }, {
      lectio: "Exodus 15: 27; 16: 1-7"
    }, {
      rubric: "In place of the Gradual, the Choir sings one of the following responsories",
      id: {
        "Collegérunt pontífices": 8107,
        "In monte Olivéti": 8108
      }
    }, {
      lectio: "Matthæus 21: 1-9"
    }, {
      rubric: "The Versicles and Responses before the Preface are sung in the ferial tone:",
      id: 7675
    }, {
      rubric: "The <Sanctus.> is here sung by the Choir as on Ferias in Lent:",
      id: 298
    }, {
      rubric: "After the Blessing, the Celebrant distributes the Palms, whilst the Choir sings the following Antiphons:",
      id: 1215
    }, {
      id: 1155,
      rubricAfter: "These Antiphons are repeated as often as is necessary until the end of the distribution of the Palms"
    }, {
      title: "The Procession with Blessed Palms",
      rubric: "The Procession then takes place. When the Celebrant has put incense into the thurible, the Deacon turns towards the people and sings:",
      gabc: "initial-style: 0;\n%%\n(c3) <sp>V/</sp> Pro(h)ce(h)dá(h)mus(h) in(h) pa(h)ce.(f.) (::)\n<sp>R/</sp> In(h) nó(h)mi(h)ne(h) Chris(h)ti.(h) A(f)men.(h.) (::) <i>or:</i> A(h)men.(f.) (::)"
    }, {
      rubric: "During the Procession, the following Antiphons are sung or as many of them as are required.",
      id: 8110,
      psalmtone: true
    }, {
      id: 8109,
      psalmtone: true
    }, {
      id: 8177,
      psalmtone: true
    }, {
      id: 247,
      psalmtone: true
    }, {
      id: {
        "Roman Tone": 173,
        "Monastic Tone": 8283
      }
    }, {
      id: {
        "Roman Tone": 770,
        "Monastic Tone": 8284
      }
    }, {
      rubric: "On the return of the Procession, two or four Cantors enter the church, and, closing the door, stand with their faces towards the procession, singing the following:",
      id: 259,
      rubricAfter: "The Choir outside the Church repeats <Glória, laus.> etc. Then the Cantors inside sing all or some of the following stanzas as they think best, after each of which the Choir outside repeats the first stanza <Glória, Laus.>",
      sticky: 0
    }, {
      id: "259-2"
    }, {
      rubric: "The Choir outside: <Glória, laus.> The Cantors inside:",
      id: "259-3"
    }, {
      rubric: "The Choir outside: <Glória, laus.> The Cantors inside:",
      id: "259-4"
    }, {
      rubric: "The Choir outside: <Glória, laus.> The Cantors inside:",
      id: "259-5"
    }, {
      rubric: "The Choir outside: <Glória, laus.> The Cantors inside:",
      id: "259-6",
      sticky: 1
    }, {
      rubric: "The Sub-deacon knocks at the door with the foot of the Cross; the door is opened at once and the Procession enters the church singing the following Responsory:",
      id: 606
    }
  ],
  "Quad6": [
    {
      rubric: "After Terce, the Asperges omitted, the Priest blesses the palms or branches of olive or of other trees, which have been placed before the altar or at the Epistle side. The choir first sings the following Antiphon:",
      id: 817
    }, {
      rubric: "After the Blessing, the Celebrant distributes the Palms, whilst the Choir sings the following Antiphons:",
      id: 1215,
      sticky: 0
    }, {
      gabc: "initial-style: 0;\ncommentary: Psalm 23, 1-2, 7-10;\n%%\n(c4)1. Dó(f)mi(gh)ni(h) est(h) ter(h)ra,(h) et(h) ple(h)ni(h)<b>tú</b>(ixi hr)do(h) <b>e</b>(g hr)jus:(h.) *(:) or(h)bis(h) ter(h)rá(h)rum,(h) et(h) u(h)ni(h)vér(h)si(h) qui(h) há(h)bi(h)<i>tant</i>(g) <i>in</i>(f) <b>e</b>(gh gr)o.(gf..) (::)\
<i>Flex:</i> pr{í}n(h)ci(h)pes,(h) ves(h)tras, †(g. h h h) (::) 2. Qui(h)a(h) ip(h)se...(h)",
      html: '<div class="verses" style="display:inline-block">\
<p><span class="versenum">2.&nbsp;</span>Quia ipse super mária fun<b>dá</b>vit <b>e</b>um:&nbsp;* et super flúmina præpa<i>rá</i><i>vit</i> <b>e</b>um. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">7.&nbsp;</span>Attóllite portas, príncipes, vestras,&nbsp;† et elevámini, portæ <b>æ</b>ter<b>ná</b>les:&nbsp;* et introí<i>bit</i> <i>Rex</i> <b>gló</b>riæ.</p>\
<p><span class="versenum">8.&nbsp;</span>Quis est iste Rex glóriæ?&nbsp;† Dóminus <b>for</b>tis et <b>pot</b>ens:&nbsp;* Dóminus pot<i>ens</i> <i>in</i> <b>prǽ</b>lio. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">9.&nbsp;</span>Attóllite portas, príncipes, vestras,&nbsp;† et elevámini, portæ <b>æ</b>ter<b>ná</b>les:&nbsp;* et introí<i>bit</i> <i>Rex</i> <b>gló</b>riæ.</p>\
<p><span class="versenum">10.&nbsp;</span>Quis est <b>is</b>te Rex <b>gló</b>riæ?&nbsp;* Dóminus virtútum ipse <i>est</i> <i>Rex</i> <b>gló</b>riæ. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">11.&nbsp;</span>Glória <b>Pa</b>tri, et <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">12.&nbsp;</span>Sicut erat in princípio, et <b>nunc</b>, et <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
</div>',
      sticky: 1
    }, {
      id: 1155,
      sticky: 0
    }, {
      gabc: "initial-style: 0;\ncommentary: Psalm 46;\n%%\n(c4)1. Om(f)nes(gh) Gen(h)tes,(h) <b>pláu</b>(ixi)di(hr)te(h) <b>má</b>(g)ni(hr)bus:(h.) *(:) ju(h)bi(h)lá(h)te(h) De(h)o(h) in(h) vo(h)ce(h) ex(h)sul(h)<i>ta</i>(g)<i>ti</i>(f)<b>ó</b>(gh gr)nis.(gf..) (::) 2. Quón(h)i(h)am...(h)",
      html: '<div class="verses" style="display:inline-block">\
<p><span class="versenum">2.&nbsp;</span>Quóniam Dóminus ex<b>cél</b>sus, ter<b>rí</b>bilis:&nbsp;* Rex magnus super <i>om</i><i>nem</i> <b>ter</b>ram. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">3.&nbsp;</span>Subjécit <b>pó</b>pulos <b>no</b>bis:&nbsp;* et Gentes sub pé<i>di</i><i>bus</i> <b>nos</b>tris.</p>\
<p><span class="versenum">4.&nbsp;</span>Elégit nobis heredi<b>tá</b>tem <b>su</b>am:&nbsp;* spéciem Jacob, <i>quam</i> <i>di</i><b>lé</b>xit. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">5.&nbsp;</span>Ascéndit <b>De</b>us in <b>jú</b>bilo:&nbsp;* et Dóminus in <i>vo</i><i>ce</i> <b>tu</b>bæ.</p>\
<p><span class="versenum">6.&nbsp;</span>Psállite Deo <b>nos</b>tro, <b>psál</b>lite:&nbsp;* psállite Regi <i>nos</i><i>tro</i>, <b>psál</b>lite. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">7.&nbsp;</span>Quóniam Rex omnis <b>ter</b>ræ <b>De</b>us:&nbsp;* psállite <i>sa</i><i>pi</i><b>én</b>ter.</p>\
<p><span class="versenum">8.&nbsp;</span>Regnábit Deus <b>su</b>per <b>Gen</b>tes:&nbsp;* Deus sedet super sedem <i>sanc</i><i>tam</i> <b>su</b>am. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">9.&nbsp;</span>Príncipes populórum congregáti sunt cum <b>De</b>o <b>A</b>braham:&nbsp;* quóniam dii fortes terræ veheménter <i>e</i><i>le</i><b>vá</b>ti sunt. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
<p><span class="versenum">10.&nbsp;</span>Glória <b>Pa</b>tri, et <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">11.&nbsp;</span>Sicut erat in princípio, et <b>nunc</b>, et <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>\
</div>',
      sticky: 1
    }, {
      lectio: "Matthæus 21: 1-9"
    }, {
      title: "The Procession with Blessed Palms",
      rubric: "After the Gospel, the celebrant, with the ministers (or servers), returns to the foot of the altar, makes reverence, and blesses incense. Then the deacon (or celebrant) turns to the people and says:",
      gabc: "initial-style: 0;\n%%\n(c3) <sp>V/</sp> Pro(h)ce(h)dá(h)mus(h) in(h) pa(h)ce.(f.) (::)\n<sp>R/</sp> In(h) nó(h)mi(h)ne(h) Chris(h)ti.(h) A(h)men.(f.) (::)"
    }, {
      rubric: "As the procession begins, all or some of the following antiphons may be sung:",
      id: 247,
      psalmtone: true
    }, {
      id: {
        "Roman Tone": 173,
        "Monastic Tone": 8283
      }
    }, {
      id: {
        "Roman Tone": 770,
        "Monastic Tone": 8284
      }
    }, {
      id: 901,
      psalmtone: true
    }, {
      rubric: "In the course of the procession the following hymn is sung. If possible, the whole congregation should sing each time the refrain <Glória laus.> as shown below.",
      id: 259,
      sticky: 0
    }, {
      rubric: "All: <Glória, laus.> The choir:",
      id: "259-2"
    }, {
      rubric: "All: <Glória, laus.> The choir:",
      id: "259-3"
    }, {
      rubric: "All: <Glória, laus.> The choir:",
      id: "259-4"
    }, {
      rubric: "All: <Glória, laus.> The choir:",
      id: "259-5"
    }, {
      rubric: "All: <Glória, laus.> The choir:",
      id: "259-6",
      sticky: 1
    }, {
      rubric: "All: <Glória, laus.> Then one of the following antiphons is sung:",
      id: {
        "VIII G*": 532,
        "VIII G": 1092
      },
      sticky: 0
    }, {
      gabc: "initial-style: 0;\ncommentary: Psalm 147;\n%%\n(c4)1. Lau(g)da,(h) Je(j)rú(j)sa(j)lem,(j) <b>Dó</b>(k)mi(jr)num:(j.) *(:) lau(j)da(j) De(j)um(j) <i>tu</i>(i)<i>um</i>,(j) <b>Si</b>(h gr)on.(g.) (::) 2. Quón(j)i(j)am...(j)",
      html: '<div class="verses">\
<p><span class="versenum">2.&nbsp;</span>Quóniam confortávit seras portárum tu<b>á</b>rum:&nbsp;* benedíxit fíliis <i>tu</i><i>is</i> <b>in</b> te.</p>\
<p><span class="versenum">3.&nbsp;</span>Qui pósuit fines tuos <b>pa</b>cem:&nbsp;* et ádipe fruménti <i>sá</i><i>ti</i><b>at</b> te.</p>\
<p><span class="versenum">4.&nbsp;</span>Qui emíttit elóquium suum <b>ter</b>ræ:&nbsp;* velóciter currit <i>ser</i><i>mo</i> <b>e</b>jus.</p>\
<p><span class="versenum">5.&nbsp;</span>Qui dat nivem sicut <b>la</b>nam:&nbsp;* nébulam sicut cí<i>ne</i><i>rem</i> <b>spar</b>git.</p>\
<p><span class="versenum">6.&nbsp;</span>Mittit crystállum suam sicut buc<b>cél</b>las:&nbsp;* ante fáciem frígoris ejus quis <i>sus</i><i>ti</i><b>né</b>bit?</p>\
<p><span class="versenum">7.&nbsp;</span>Emíttet verbum suum, et liquefáciet <b>e</b>a:&nbsp;* flabit spíritus ejus, et <i>flu</i><i>ent</i> <b>a</b>quæ.</p>\
<p><span class="versenum">8.&nbsp;</span>Qui annúntiat verbum suum <b>Ja</b>cob:&nbsp;* justítias, et judícia <i>su</i><i>a</i> <b>Is</b>raël.</p>\
<p><span class="versenum">9.&nbsp;</span>Non fecit táliter omni nati<b>ó</b>ni:&nbsp;* et judícia sua non manifes<i>tá</i><i>vit</i> <b>e</b>is.</p>\
<p><span class="versenum">10.&nbsp;</span>Glória Patri, et <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">11.&nbsp;</span>Sicut erat in princípio, et nunc, et <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.</p>\
</div>',
      sticky: 1
    }, {
      rubric: "The antiphon <Omnes colláudant.> is repeated, as above.",
      id: 1312
    }, {
      id: 1051
    }, {
      rubric: "The faithful may also sing the hymn <Christus vincit.> or any other chant in honor of Christ the King."
    }, {
      rubric: "When the procession enters the church, that is, as the celebrant goes through the door, this last responsory is begun:",
      id: 606
    }
  ],
  "Quad6h-lotio": {
    "asperges": [
        // options: [279, 649, 291, 736, 504, 1242, 1252, 1013]
        { title: 'I', id: 279, rubricAfter: ["The antiphon <Mandátum novum.> is repeated.", "The following antiphons are each repeated after the Psalm or Versicle. Only the first verse of the Psalm is said in each case."] },
        { title: 'II', id: 649 },
        { title: 'III', id: 291 },
        { title: 'IV', id: 736 },
        { title: 'V', id: 504 },
        { title: 'VI', id: 1242 },
        { title: 'VII', id: 1252 },
        { rubric: "The following antiphon is not included in the liturgical books after the 1955 Holy Week reform.", id: 8268 },
        { title: 'VIII', id: 1013, rubric: "The following antiphon and its verses are never omitted. It is begun towards the end of the washing of the feet; some of the preceding antiphons may be omitted." }
    ]
  },
  "Quad6h": {
    "ite": [
        {
            title: "THE SOLEMN TRANSLATION AND RESERVATION OF THE BLESSED SACRAMENT",
            rubric: "During the procession the hymn <Pange, lingua, gloriósi Córporis mystérium.> is sung until the verse <Tantum ergo.> exclusive; if necessary, the hymn is repeated from the second verse. If the procession is very long, other hymns, psalms or canticles may be sung.",
            id: 1310
        }, {
            title: "THE STRIPPING OF THE ALTARS",
            rubric: "The celebrant and the sacred ministers [and the servers] go to the high altar, bow, rise, and begin the stripping of the altars as follows.",
            rubricAfter: "The celebrant says the following antiphon in a clear voice:"
        }, {
            html: "<span class='rubric'>Psalm 21, 19.</span> <span class='verses'>Divisérunt sibi vestiménta mea: et super vestem meam misérunt sortem.</verses>"
        }, {
            rubric: "Adding the intonation of the same psalm:",
            gabc: gabcPsalm21,
            rubricAfter: "The choir continue the recitation of this psalm from <longe a salúte mea.> until the stripping of the altars is completed.",
            html: versesPsalm21,
        }, {
            rubricAfter: "After stripping the altars they return to the high altar, and when the celebrant has repeated the antiphon <Divisérunt> they return to the sacristy."
        }
    ]
  },
  "Quad6h_v": {
    "ite": [
        {
            rubric: "After Mass, the Celebrant carries the sacred Host to the altar of repose, where It will remain until the Mass of the Pre-sanctified the next day. During the Procession, the hymn <Pange lingua.> is sung.",
            id: 1310
        }
    ]
  },
  "Quad6f": {
      "graduale": [
        { lectio: "Osee 6: 1-6"},
        {
            id: 3177,
            psalmtone: true,
        },
        { lectio: "Exodus 12: 1-11" },
        {
            id: 22,
            psalmtone: true
        },
        { lectio: "Joannes 18: 1-40; 19: 1-42" },
        {
            rubric: rubricBeforeUnveilingCross,
            id: 2087,
            rubricAfter: rubricAdorationOfTheCross
        }, {
            rubric: rubricTwoCantorsInTheMiddle,
            id: 157,
        }, {
            sticky: 0,
            gabc: gabcHagios
        }, {
            rubric: rubricTwoCantorsOfTheSecondChoir,
            id: 7808,
            rubricAfter: rubricTwoChoirsRespondHagios
        }, {
        }, {
            rubric: rubricThenTwoCantorsOfTheFirstChoir,
            id: 7809,
            rubricAfter: rubricTwoChoirsRespondHagiosAgain,
            sticky: 1
        }, {
            rubric: rubricFollowingReproachesSungInTurn
        }, {
            rubric: rubricTwoCantorsOfTheSecondChoir,
            gabc: gabcReproachesV1
        }, {
            rubric: rubricBothChoirsRepeatPopule,
            id: 157,
            gabcReplace: replaceQuiaVerse,
            sticky: 0
        }, {
            sticky: 1,
            gabc: gabcReproachesOtherVerses
        }, {
            rubric: rubricBothChoirsThenSingAntiphon,
            id: 428,
            rubricAfter: rubricTheAntiphonCrucemIsRepeated
        }, {
            rubric: rubricCruxFidelis,
            sticky: 0,
            id: 1128
        }, {
            id: 2209,
            gabcReplace: replaceAltEtc,
            sticky: 1
        }, {
            rubric: "After the adoration of the Cross, the priest and clergy go to the altar of repose, and the Blessed Sacrament is borne back to the high altar.  During the procession, the following antiphons are sung:",
            psalmtone: true,
            id: 1238
        }, {
            psalmtone: true,
            id: 940
        }, {
            psalmtone: true,
            id: 1335,
            rubricAfter: "While Holy Communion is being distributed, Psalm 21, <Deus, Deus meus.> may be sung, or else one or other of the responsories from Matins of Good Friday."
        }, {
            gabc: gabcPsalm21,
            html: versesPsalm21
        }
      ]
  },
  "Quad6f_v": {
      "graduale": [
        { lectio: "Osee 6: 1-6"},
        {
            id: 3177,
            psalmtone: true,
            gabcReplace: replaceOfficePartToTract
        },
        { lectio: "Exodus 12: 1-11" },
        {
            id: 22,
            psalmtone: true,
            gabcReplace: replaceOfficePartToTract
        },
        { lectio: "Joannes 18: 1-40; 19: 1-42" },
        {
            rubric: rubricBeforeUnveilingCross,
            id: 2087,
            gabcReplace: [/All:/,'Choir:'],
            rubricAfter: rubricAdorationOfTheCross
        }, {
            rubric: rubricTwoCantorsInTheMiddle,
            id: 157,
            gabcReplace: [/office-part:\s*Antiphona;/,'annotation:\\Vbar 1.;']
        }, {
            sticky: 0,
            gabc: gabcHagios
        }, {
            rubric: rubricTwoCantorsOfTheSecondChoir,
            id: 7808,
            rubricAfter: rubricTwoChoirsRespondHagios
        }, {
        }, {
            rubric: rubricThenTwoCantorsOfTheFirstChoir,
            id: 7809,
            rubricAfter: rubricTwoChoirsRespondHagiosAgain,
            sticky: 1
        }, {
            rubric: rubricFollowingReproachesSungInTurn
        }, {
            rubric: rubricTwoCantorsOfTheSecondChoir,
            gabc: gabcReproachesV1
        }, {
            rubric: rubricBothChoirsRepeatPopule,
            id: 157,
            gabcReplace: replaceQuiaVerse,
            sticky: 0
        }, {
            sticky: 1,
            gabc: gabcReproachesOtherVerses
        }, {
            rubric: rubricBothChoirsThenSingAntiphon,
            id: 428,
            rubricAfter: rubricTheAntiphonCrucemIsRepeated
        }, {
            rubric: rubricCruxFidelis,
            sticky: 0,
            id: 1128
        }, {
            id: 2209,
            gabcReplace: replaceAltEtc,
            sticky: 1
        }, {
            rubric: "After the adoration of the Cross, the priest and clergy go in procession to the altar of repose. The Blessed Sacrament is incensed and then borne back to the high altar. During the procession, the hymn <Vexílla Regis.> is sung:",
            id: 2120
        }
      ]
  },
    "Quad6s": {
  "asperges": [
    {
        title: "The Procession of the Paschal Candle",
        rubric: "When the deacon [or priest] has entered the church, he stands and sings alone:",
        gabc: "initial-style: 0;\n%%\n(f3)<sp>V/</sp> Lu(h)men(h) Chris(h.)ti.(f.) (::)"
    },
    {
        rubric: "All others, except the subdeacon [or cross bearer] and thurifer kneel toward the paschal candle and answer:",
        gabc: "initial-style: 0;\n%%\n(f3)<sp>R/</sp> De(h)o(h) grá(h')ti(f)as.(f.) (::)",
        rubricAfter: ["All rise, and the celebrant lights his own candle from the paschal candle.  The deacon [or priest] goes to the middle of the church, and sings in the same way, but in a higher key: <Lumen Christi.> All kneel and answer as before: <Deo grátias.>",
"The candles of the clergy [or servers] are then lit from the paschal candle.",
"The third time, he goes in front of the high altar, in the middle of the choir, and again sings in a still higher key: <Lumen Christi.> All kneel a third time, and answer as before: <Deo grátias.>",
"The candles of the faithful and the lamps of the church are then lit from the paschal candle."]
    },
    {
        title: "The Paschal Praise",
        rubric: "Within the <Exsultet,> the following responses are sung to the ferial tone of the Preface:",
        id: 7675,
    },
    {
        rubric: "The conclusion is sung:",
        gabc: "initial-style: 0;\n%%\n(c3)per(f) óm(g)ni(g)a(g) sǽ(h)cu(g)la(fe) sæ(ef)cu(g)ló(fg)rum.(f.) (::) \
<sp>R/</sp> A(e)men.(ef..) (::)"
    }, {
      lectio: "Genesis 1: 1-31; 2: 1-2"
    }, {
      lectio: "Exodus 14: 24-31; 15: 1"
    },
    {
        id: 2060,
        psalmtone: 'tractus'
    }, {
      lectio: "Isaias 4: 2-6"
    },
    {
        id: 2075,
        psalmtone: 'tractus'
    }, {
      lectio: "Deuteronomium 31: 22-30"
    },
    {
        id: 2086,
        psalmtone: 'tractus'
    },
    {
        title: "The First Part of the Litany",
        rubric: "When the Collect after the fourth Lesson is finished, all kneel. The Litany of the Saints is sung without doubling the invocations, until <Propítius esto.> exclusive.",
        id: 'litanies/saints-1',
        url: 'litanies/saints-2.html'
    }, {
        rubric: "After the invocation <Omnes Sancti et Sanctæ Dei,> all rise.  If cantors sang the Litany, they return to their places."
    }, {
        title: "The Blessing of Water for Baptism",
        rubric: "Within the blessing, the following responses are sung to the ferial tone of the Preface:",
        id: 7675,

    }, {
        rubric: "When the Blessing (and Baptism) is finished, the baptismal water is carried to the font, in procession, while the following is sung:",
        id: 943,
        psalmtone: 'tractus' // todo...allow psalmtoning of this chant
    }, {
        title: "The Second Part of the Litany",
        rubric: " ",
        id: 'litanies/saints-3',
        url: 'litanies/saints-4.html'
    }, {
        id: "litanies/saints-5",
        url: 'litanies/saints-6.html'
    },
    {
        id: "litanies/saints-7"
    }
],
"alleluia": [
    {
        rubric: "After the Epistle, the Celebrant intones:",
        id: 507,
        rubricAfter: "He sings this <Allelúia> three times, each time at a higher pitch.  The choir repeats it after him each time, in the same key."
    }, {
        rubric: "The choir then sings:",
        psalmtone: true,
        id: "507-2",
        rubricAfter: "<Allelúia> is not repeated."
    }, {
        id: 1247,
        psalmtone: "tractus"
    }
],
"before-ite": [
    {
        title: "Lauds of Easter Sunday",
        rubric: "After the last ablution, Lauds is sung in Choir, in the following manner.",
        gabc: gabcEasterAlleluia,
        sticky: 0
    }, {
        gabc: "initial-style: 0;\n\
commentary: Psalm 150;\n\
%%\n\
(c4)1. Lau(f)dá(gh)te(h) Dó(h)mi(h)num(h) in(h) sanc(h)<i>tis</i>(g) <b>e</b>(h fr)jus:(f.) *(:) lau(h)dá(h)te(h) e(h)um(h) in(h) fir(h)ma(h)mén(h)to(h) vir(h)<i>tú</i>(f)<i>tis</i>(gh) <b>e</b>(g fr)jus.(f.) (::)\n\
<i>Flex:</i> be(h)ne(h)so(h)nán(h)ti(g)bus: †(g. h h h  ::)",
        html: '<div class="verses">\
<p><span class="versenum">2.&nbsp;</span>Laudáte eum in virtúti<i>bus</i> <b>e</b>jus:&nbsp;* laudáte eum secúndum multitúdinem magnitú<i>di</i><i>nis</i> <b>e</b>jus.</p>\
<p><span class="versenum">3.&nbsp;</span>Laudáte eum in so<i>no</i> <b>tu</b>bæ:&nbsp;* laudáte eum in psaltéri<i>o</i>, <i>et</i> <b>cí</b>thara.</p>\
<p><span class="versenum">4.&nbsp;</span>Laudáte eum in týmpano, <i>et</i> <b>cho</b>ro:&nbsp;* laudáte eum in chor<i>dis</i>, <i>et</i> <b>ór</b>gano.</p>\
<p><span class="versenum">5.&nbsp;</span>Laudáte eum in cýmbalis benesonántibus:&nbsp;† laudáte eum in cýmbalis jubila<i>ti</i><b>ó</b>nis:&nbsp;* omnis spíritus <i>lau</i><i>det</i> <b>Dó</b>minum.</p>\
<p><span class="versenum">6.&nbsp;</span>Glória Patri, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">7.&nbsp;</span>Sicut erat in princípio, et nunc, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.</p>\
</div>',
        sticky: 1
    },
    {
        rubric: "The antiphon <Allelúia, allelúia, allelúia.> is repeated.",
        rubricAfter: "There is no Little Chapter, hymn or v/.: the celebrant intones the Benedictus antiphon at once."
    }, {
        id: 1358,
        sticky: 0
    }, {
        rubric: " ",
        gabc: "initial-style: 0;\n\
commentary: Luc 1: 68-79;\n\
%%\n\
(c4)1. Be(g)ne(hg)díc(gj)tus(j) Dó(j)mi(j)<i>nus</i>,(ji) <i>De</i>(jk)<i>us</i>(k) <b>Is</b>(jk)ra(jr)ël:(j.) *(:) qui(j)a(j) vi(j)si(j)tá(j)vit,(j) et(j) fe(j)cit(j) red(j)emp(j)ti(j)ó(j)nem(j) <i>ple</i>(i)<i>bis</i>(j) <b>su</b>(h gr)æ:(g.) (::)",
        html: '<div class="verses">\
<p><span class="versenum">2.&nbsp;</span>Et eréxit cornu <i>sa</i><i>lú</i><i>tis</i> <b>no</b>bis:&nbsp;* in domo David, pú<i>e</i><i>ri</i> <b>su</b>i.</p>\
<p><span class="versenum">3.&nbsp;</span>Sicut locútus est <i>per</i> <i>os</i> <i>sanc</i><b>tó</b>rum,&nbsp;* qui a sǽculo sunt, prophe<i>tá</i><i>rum</i> <b>e</b>jus:</p>\
<p><span class="versenum">4.&nbsp;</span>Salútem ex in<i>i</i><i>mí</i><i>cis</i> <b>nos</b>tris,&nbsp;* et de manu ómnium, <i>qui</i> <i>o</i><b>dé</b>runt nos.</p>\
<p><span class="versenum">5.&nbsp;</span>Ad faciéndam misericórdiam cum <i>pá</i><i>tri</i><i>bus</i> <b>nos</b>tris:&nbsp;* et memorári testaménti <i>su</i><i>i</i> <b>sanc</b>ti.</p>\
<p><span class="versenum">6.&nbsp;</span>Jusjurándum, quod jurávit ad Abra<i>ham</i> <i>pa</i><i>trem</i> <b>nos</b>trum,&nbsp;* datú<i>rum</i> <i>se</i> <b>no</b>bis:</p>\
<p><span class="versenum">7.&nbsp;</span>Ut sine timóre, de manu inimicórum nostró<i>rum</i> <i>li</i><i>be</i><b>rá</b>ti,&nbsp;* servi<i>á</i><i>mus</i> <b>il</b>li.</p>\
<p><span class="versenum">8.&nbsp;</span>In sanctitáte, et justíti<i>a</i> <i>co</i><i>ram</i> <b>ip</b>so,&nbsp;* ómnibus di<i>é</i><i>bus</i> <b>nos</b>tris.</p>\
<p><span class="versenum">9.&nbsp;</span>Et tu, puer, Prophéta Altís<i>si</i><i>mi</i> <i>vo</i><b>cá</b>beris:&nbsp;* præíbis enim ante fáciem Dómini, paráre <i>vi</i><i>as</i> <b>e</b>jus:</p>\
<p><span class="versenum">10.&nbsp;</span>Ad dandam sciéntiam salú<i>tis</i> <i>ple</i><i>bi</i> <b>e</b>jus:&nbsp;* in remissiónem peccató<i>rum</i> <i>e</i><b>ó</b>rum:</p>\
<p><span class="versenum">11.&nbsp;</span>Per víscera misericórdi<i>æ</i> <i>De</i><i>i</i> <b>nos</b>tri:&nbsp;* in quibus visitávit nos, óri<i>ens</i> <i>ex</i> <b>al</b>to:</p>\
<p><span class="versenum">12.&nbsp;</span>Illumináre his, qui in ténebris, et in um<i>bra</i> <i>mor</i><i>tis</i> <b>se</b>dent:&nbsp;* ad dirigéndos pedes nostros in <i>vi</i><i>am</i> <b>pa</b>cis.</p>\
<p><span class="versenum">13.&nbsp;</span>Glória <i>Pa</i><i>tri</i>, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">14.&nbsp;</span>Sicut erat in princípio, <i>et</i> <i>nunc</i>, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.</p>\
</div>',
    }, {
        rubric: "The antiphon <Et valde mane.> is repeated.",
        sticky: 1
    }
],
"ite": [
    {
        id: 2988
    }
]
},
    "Quad6s_v": {
  "asperges": [
    {
        title: "The Procession of the Paschal Candle",
        rubric: "When the deacon [or priest] has entered the church, he lights one of the three candles, genuflects, and sings alone:",
        gabc: "initial-style: 0;\n%%\n(f3)<sp>V/</sp> Lu(h)men(h) Chris(h.)ti.(f.) (::)"
    },
    {
        rubric: "All others, except the subdeacon [or cross bearer] kneel and answer:",
        gabc: "initial-style: 0;\n%%\n(f3)<sp>R/</sp> De(h)o(h) grá(h')ti(f)as.(f.) (::)",
        rubricAfter: ["Proceeding to the middle of the church, he lights the second candle, again genuflects as above, and sings in a higher key: <Lumen Christi.> All kneel and answer as before: <Deo grátias.>",
"The third time, he goes in front of the high altar, where he lights the third candle, again genuflecting as before, and singing in a still higher key: <Lumen Christi.> All kneel a third time, and answer as before: <Deo grátias.>"]
    },
    {
        title: "The Paschal Praise",
        rubric: "Within the <Exsultet,> the following responses are sung to the ferial tone of the Preface:",
        id: 7675,
    },
    {
        rubric: "The conclusion is sung:",
        gabc: "initial-style: 0;\n%%\n(c3)per(f) óm(g)ni(g)a(g) sǽ(h)cu(g)la(fe) sæ(ef)cu(g)ló(fg)rum.(f.) (::) \
<sp>R/</sp> A(e)men.(ef..) (::)"
    }, {
      lectio: "Genesis 1: 1-31; 2: 1-2"
    }, {
      lectio: "Genesis 5: 31; 6: 1-22; 7: 1-24; 8: 1-21"
    }, {
      lectio: "Genesis 22: 1-19"
    }, {
      lectio: "Exodus 14: 24-31; 15: 1"
    },
    {
        id: 2060,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    }, {
      lectio: "Isaias 54: 17; 55, 1-11"
    }, {
      lectio: "Baruch 3: 9-38"
    }, {
      lectio: "Ezechiel 37: 1-14"
    }, {
      lectio: "Isaias 4: 1-6"
    },
    {
        id: 2075,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    }, {
      lectio: "Exodus 12: 1-11"
    }, {
      lectio: "Jonas 3: 1-10"
    }, {
      lectio: "Deuteronomium 31: 22-30"
    },
    {
        id: 2086,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    }, {
      lectio: "Daniel 3: 1-24"
    }, {
        rubric: "If the Church has a baptismal font, the Celebrant goes with his ministers and the clergy to bless the font at the end of the Prophecies; during the procession, the following Tract is sung:",
        id: 943,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    },
    {
        rubric: "Within the Blessing of the Baptismal Water, the following responses are sung to the ferial tone of the Preface:",
        id: 7675,
    },
    {
        title: "The Litany of the Saints",
        rubric: [
    "While the Celebrant and his ministers return to the altar, two Cantors sing the Litany, each invocation being repeated by the Choir.",
    "In churches where there is no baptismal font, after the Prayer which follows the last Prophecy, all kneel, and two Cantors sing the Litany, each invocation being repeated by the Choir."
        ],
        id: 'litanies/saints-1',
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints-2.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    }, {
        id: 'litanies/saints-3',
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints-4.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    }, {
        id: "litanies/saints-5",
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints-6.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    },
    {
        id: "litanies/saints-7",
        gabcReplace: replaceRemoveAsterisks
    }
],
"alleluia": [
    {
        rubric: "After the Epistle, the Celebrant intones:",
        id: 507,
        rubricAfter: "He sings this <Allelúia> three times, each time at a higher pitch.  The choir repeats it after him each time, in the same key."
    }, {
        rubric: "The choir then sings:",
        psalmtone: true,
        id: "507-2",
        rubricAfter: "<Allelúia> is not repeated."
    }, {
        id: 1247,
        psalmtone: "tractus"
    }
],
"before-ite": [
    {
        title: "First Vespers of Easter Sunday",
        rubric: "After the last ablution, Vespers is sung in Choir, in the following manner.",
        gabc: gabcEasterAlleluia,
        sticky: 0
    }, {
        gabc: "initial-style: 0;\n\
commentary: Psalm 116;\n\
%%\n\
(c4)1. Lau(f)dá(gh)te(h) Dó(h)mi(h)num,(h) om(h)<i>nes</i>(g) <b>Gen</b>(h fr)tes:(f.) *(:) lau(h)dá(h)te(h) e(h)um,(h) <i>om</i>(f)<i>nes</i>(gh) <b>pó</b>(g)pu(fr)li:(f.) (::)",
        html: '<div class="verses">\
<p><span class="versenum">2.&nbsp;</span>Quóniam confirmáta est super nos misericórdi<i>a</i> <b>e</b>jus:&nbsp;* et véritas Dómini manet <i>in</i> <i>æ</i><b>tér</b>num.</p>\
<p><span class="versenum">3.&nbsp;</span>Glória Patri, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">4.&nbsp;</span>Sicut erat in princípio, et nunc, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.</p>\
</div>',
        sticky: 1
    },
    {
        rubric: "The antiphon <Allelúia, allelúia, allelúia.> is repeated.",
        rubricAfter: "The celebrant then at once intones the antiphon of the Magnificat, which is continued by the Choir:"
    }, {
        id: 12662,
        sticky: 0
    }, {
        rubric: " ",
        gabc: "initial-style: 0;\n\
commentary: Luc 1: 46-55;\n\
%%\n\
(c4)1. Ma(g)gní(hg)fi(gj jr)cat(j.) *(:) á(j)ni(j)ma(j) <i>me</i>(i)<i>a</i>(j) <b>Dó</b>(h)mi(gr)num.(g.) (::) \
2. Et(g) ex(hg)sul(gj)tá(j)vit(j) <i>spí</i>(ji)<i>ri</i>(jk)<i>tus</i>(k) <b>me</b>(jk jr)us(j.) *(:) in(j) De(j)o(j) sa(j)lu(j)<i>tá</i>(i)<i>ri</i>(j) <b>me</b>(h gr)o.(g.) (::)",
        html: '<div class="verses">\
<p><span class="versenum">3.&nbsp;</span>Quia respéxit humilitátem <i>an</i><i>cíl</i><i>læ</i> <b>su</b>æ:&nbsp;* ecce enim ex hoc beátam me dicent omnes gene<i>ra</i><i>ti</i><b>ó</b>nes.</p>\
<p><span class="versenum">4.&nbsp;</span>Quia fecit mihi <i>ma</i><i>gna</i> <i>qui</i> <b>pot</b>ens est:&nbsp;* et sanctum <i>no</i><i>men</i> <b>e</b>jus.</p>\
<p><span class="versenum">5.&nbsp;</span>Et misericórdia ejus a progéni<i>e</i> <i>in</i> <i>pro</i><b>gé</b>nies&nbsp;* timén<i>ti</i><i>bus</i> <b>e</b>um.</p>\
<p><span class="versenum">6.&nbsp;</span>Fecit poténtiam in <i>brá</i><i>chi</i><i>o</i> <b>su</b>o:&nbsp;* dispérsit supérbos mente <i>cor</i><i>dis</i> <b>su</b>i.</p>\
<p><span class="versenum">7.&nbsp;</span>Depósuit pot<i>én</i><i>tes</i> <i>de</i> <b>se</b>de,&nbsp;* et exal<i>tá</i><i>vit</i> <b>hú</b>miles.</p>\
<p><span class="versenum">8.&nbsp;</span>Esuriéntes <i>im</i><i>plé</i><i>vit</i> <b>bo</b>nis:&nbsp;* et dívites dimí<i>sit</i> <i>in</i><b>á</b>nes.</p>\
<p><span class="versenum">9.&nbsp;</span>Suscépit Israël <i>pú</i><i>e</i><i>rum</i> <b>su</b>um,&nbsp;* recordátus misericór<i>di</i><i>æ</i> <b>su</b>æ.</p>\
<p><span class="versenum">10.&nbsp;</span>Sicut locútus est <i>ad</i> <i>pa</i><i>tres</i> <b>nos</b>tros,&nbsp;* Abraham et sémini e<i>jus</i> <i>in</i> <b>sǽ</b>cula.</p>\
<p><span class="versenum">11.&nbsp;</span>Glória <i>Pa</i><i>tri</i>, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>Sanc</b>to.</p>\
<p><span class="versenum">12.&nbsp;</span>Sicut erat in princípio, <i>et</i> <i>nunc</i>, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.</p>\
</div>',
        sticky: 1
    }, {
        rubric: "The antiphon <Vespere autem.> is repeated."
    }
],
"ite": [
    {
        id: 2988
    }
]
},
  "Pasc6s_v": {
    "asperges": [
    {
      lectio: "Genesis 22: 1-19"
    }, {
      lectio: "Exodus 14: 24-31; 15: 1"
    },
    {
        id: 2060,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    }, {
      lectio: "Deuteronomium 31: 22-30"
    },
    {
        id: 2086,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    }, {
      lectio: "Isaias 4: 1-6"
    },
    {
        id: 2075,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    }, {
      lectio: "Baruch 3: 9-38"
    }, {
      lectio: "Ezechiel 37: 1-14"
    }, {
        rubric: "If the Church has a baptismal font, the Celebrant goes with his ministers and the clergy to bless the font at the end of the Prophecies; during the procession, the following Tract is sung:",
        id: 943,
        gabcReplace: replaceOfficePartToTract,
        psalmtone: 'tractus'
    },
    {
        rubric: "Within the Blessing of the Baptismal Water, the following responses are sung to the ferial tone of the Preface:",
        id: 7675,
    },
    {
        title: "The Litany of the Saints",
        rubric: [
    "While the Celebrant and his ministers return to the altar, two Cantors sing the Litany, each invocation being repeated by the Choir.",
    "In churches where there is no baptismal font, after the Prayer which follows the last Prophecy, all kneel, and two Cantors sing the Litany, each invocation being repeated by the Choir."
        ],
        id: 'litanies/saints-1',
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints-2.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    }, {
        id: 'litanies/saints-3',
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints-4.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    }, {
        id: "litanies/saints-5",
        gabcReplace: replaceRemoveAsterisks,
        url: 'litanies/saints-6.html',
        htmlReplace: replaceRemoveHtmlAsterisks
    },
    {
        id: "litanies/saints-7",
        gabcReplace: replaceRemoveAsterisks
    }
]
}
}
var tempusKeys = [{title:"Selige tempus anni...",en:"Select a season..."},{key:"",title:"Inter Annum",en:"During the Year"},{key:"Quad",title:"Septuagesima usque ad Finem Quadragesimæ",en:"Septuagesima through Lent"},{key:"Pasch",title:"Tempus Paschale",en:"Paschal Time"}];
//{key:"",title:"",en:""}
var gabcReplaceRemoveAlleluiaSacerdotesDomini = [/e\([^)]+\)[ij]us,(?:\([^)]+\)\s*)+al\([^)]+\)le\([^)]+\)l[uú]\([^)]+\)[ij]a\.\(/i, 'e(fgf)jus.(ff/'];
var gabcRemoveLastAlleluia = [/\([:;,]\)\s*al\([^)]+\)le\([^)]+\)l[uú]\([^)]+\)[ij]a\.\([^)]+\)(?=\s+\(::\)\s*$)/i, ''];
var gabcRemoveLastIntroitAlleluia = [/(\([:;,]\)\s*al\([^)]+\)le\([^)]+\)l[uú]\([^)]+\)[ij]a[.,]\([^)]+\)\s*)+(?=\s+\(::\)\s*)/i, ''];
var rubricECJ = {"before#divIntroitus": "In voitve Masses outside of Paschal time, <Allelúia.> is omitted from the Introit."};
var proprium = {
    "SMadvent": {
        "inID": 161,
        "grID": 756,
        "alID": 1209,
        "ofID": 843,
        "coID": 1144,
        "gbid": "mass_i_bvm_saturday",
        "inVerses": "Ps 24: 5-6",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 18: 2-7"
    },
    "SMchristmas": {
        "inID": 124,
        "grID": 1308,
        "alID": 127,
        "ofID": 280,
        "coID": 160,
        "gbid": "mass_ii_bvm_saturday",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "SMchristmasQuad": {
        "inID": 124,
        "grID": 1308,
        "trID": 18,
        "ofID": 280,
        "coID": 160,
        "gbid": "mass_ii_bvm_saturday",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "SMlent": {
        "inID": 1140,
        "grID": 392,
        "alID": 281,
        "ofID": 280,
        "coID": 160,
        "gbid": "mass_iii_bvm_saturday",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "SMlentQuad": {
        "inID": 1140,
        "grID": 392,
        "trID": 18,
        "ofID": 280,
        "coID": 160,
        "gbid": "mass_iii_bvm_saturday",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "SMeaster": {
        "inID": 1140,
        "grID": 281,
        "alID": 1209,
        "ofID": 567,
        "coID": 160,
        "gbid": "mass_iv_bvm_saturday",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "SMpentecost": {
        "inID": 1140,
        "grID": 392,
        "alID": 127,
        "ofID": 843,
        "coID": 160,
        "gbid": "mass_bvm",
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "ChristusRex": {
        "inID": 128,
        "grID": 583,
        "alID": 746,
        "ofID": 390,
        "coID": 1229,
        "gbid": "christ_king",
        "inVerses": "Ps 71: 2, 11",
        "coVerses": "Ps 28: 1-9"
    },
    "votiveSCJQuad": {
        "inID": 1320,
        "grID": 1035,
        "trID": 1244,
        "ofID": 628,
        "coID": 1356,
        "gbid": "votive_mass_sacred_heart",
        "inVerses": "Ps 32: 2-3",
        "coVerses": "Ps 88: 2-3, 6, 15-16, 18, 25, 29, 34-35"
    },
    "votiveSCJPasch": {
        "inID": 1320,
        "grID": 907,
        "alID": 1237,
        "ofID": 319,
        "coID": 154,
        "gbid": "votive_mass_sacred_heart_pt",
        "inVerses": "Ps 32: 2-3"
    },
    "votiveSCJ": {
        "ref": "SCJ",
        "gbid": "votive_mass_sacred_heart",
        "inVerses": "Ps 32: 2-3",
        "coVerses": "Ps 88: 2-3, 6, 15-16, 18, 25, 29, 34-35"
    },
    "SCJ": {
        "inID": 1320,
        "grID": 1035,
        "alID": 907,
        "ofID": 628,
        "coID": 1356,
        "gbid": "sh",
        "inVerses": "Ps 32: 2-3",
        "coVerses": "Ps 88: 2-3, 6, 15-16, 18, 25, 29, 34-35"
    },
    "ECJ": {
        "inID": 676,
        "grID": 492,
        "alID": 10,
        "ofID": 683,
        "coID": 730,
        "rubrics": rubricECJ
    },
    "litaniis": {
        "inID": 451,
        "grID": 395,
        "alID": 189,
        "ofID": 584,
        "coID": 422,
        "gbid": "rogations_out_pt",
        "coVerses": "Ps 30: 2-6, 7-9"
    },
    "litaniisPasch": {
        "inID": 939,
        "grID": 189,
        "alID": 1342,
        "ofID": 584,
        "coID": 364,
        "gbid": "rogations",
        "coVerses": "Ps 30: 2-6, 7-9"
    },
    "litaniisQuad": {
        "inID": 451,
        "grID": 395,
        "trID": 276,
        "ofID": 584,
        "coID": 422,
        "gbid": "rogations_out_pt",
        "coVerses": "Ps 30: 2-6, 7-9"
    },
    "votiveECJ": {
        "ref": "ECJ"
    },
    "votiveECJQuad": {
        "inID": 676,
        "grID": 492,
        "tractus": 343,
        "ofID": 683,
        "coID": 730,
        "introitusReplace": gabcRemoveLastIntroitAlleluia
    },
    "votiveECJPasch": {
        "inID": 676,
        "grID": 10,
        "alID": 29,
        "ofID": 683,
        "coID": 730
    },
    "votiveST": {
        "inID": 349,
        "grID": 965,
        "alID": 1289,
        "ofID": 1303,
        "coID": 391
    },
    "votiveSTQuad": {
        "inID": 349,
        "grID": 965,
        "trID": 763,
        "ofID": 1303,
        "coID": 391
    },
    "votiveSTPasch": {
        "inID": 349,
        "grID": 1289,
        "alID": 744,
        "ofID": 1303,
        "coID": 391
    },
    "votiveA": {
        "inID": 985,
        "grID": 348,
        "alID": 550,
        "ofID": 302,
        "coID": 599,
        "gbid": "votive_mass_holy_angels",
        "inVerses": "Ps 102: 21-22",
        "ofVerses": "Ps 137: 1, 2"
    },
    "votiveAQuad": {
        "inID": 985,
        "grID": 348,
        "trID": 949,
        "ofID": 302,
        "coID": 599,
        "gbid": "votive_mass_holy_angels",
        "inVerses": "Ps 102: 21-22",
        "ofVerses": "Ps 137: 1, 2"
    },
    "votiveAPasch": {
        "inID": 985,
        "grID": 550,
        "alID": 377,
        "ofID": 302,
        "coID": 599,
        "gbid": "votive_mass_holy_angels",
        "inVerses": "Ps 102: 21-22",
        "ofVerses": "Ps 137: 1, 2"
    },
    "votiveSS": {
        "inID": 636,
        "grID": 1044,
        "alID": 181,
        "ofID": 361,
        "coID": 1041,
        "gbid": "votive_mass_holy_ghost",
        "ofVerses": "Ps 67: 5",
        "coVerses": "Ps 67: 2-4, 12, 27, 29"
    },
    "votiveSSQuad": {
        "inID": 636,
        "grID": 1044,
        "trID": 925,
        "ofID": 83,
        "coID": 972,
        "gbid": "votive_mass_holy_ghost",
        "ofVerses": "Ps 67: 5",
        "coVerses": "Ps 67: 2-4, 12, 27, 29"
    },
    "votiveSSPasch": {
        "inID": 861,
        "ofID": 361,
        "coID": 1041,
        "grID": 99,
        "alID": 181,
        "gbid": "votive_mass_holy_ghost_pt",
        "inVerses": "Ps 67: 29, 33",
        "ofVerses": "Ps 67: 5",
        "coVerses": "Ps 67: 2-4, 12, 27, 29"
    },
    "votiveSES": {
        "inID": 62,
        "grID": 1230,
        "alID": 774,
        "ofID": 645,
        "coID": 10950,
        "offertoriumReplace": gabcReplaceRemoveAlleluiaSacerdotesDomini,
        "gbid": "votive_mass_blessed_sacrament",
        "inVerses": "Ps 80: 3, 11",
        "ofVerses": "Ps 67: 27",
        "coVerses": "Ps 22"
    },
    "votiveSESQuad": {
        "inID": 62,
        "grID": 1230,
        "trID": 644,
        "ofID": 645,
        "coID": 10950,
        "offertoriumReplace": gabcReplaceRemoveAlleluiaSacerdotesDomini,
        "gbid": "votive_mass_blessed_sacrament",
        "inVerses": "Ps 80: 3, 11",
        "ofVerses": "Ps 67: 27",
        "coVerses": "Ps 22"
    },
    "votiveSESPasch": {
        "inID": 715,
        "grID": 912,
        "alID": 774,
        "ofID": 645,
        "coID": 577,
        "gbid": "votive_mass_blessed_sacrament_pt",
        "inVerses": "Ps 80: 3, 11",
        "ofVerses": "Ps 67: 27",
        "coVerses": "Ps 22"
    },
    "votiveJCSES": {
        "inID": 684,
        "grID": 1016,
        "alID": 1096,
        "ofID": 1364,
        "coID": 726,
        "gbid": "votive_mass_christ_eternal_priest",
        "coVerses": "Ps 115"
    },
    "votiveJCSESQuad": {
        "inID": 684,
        "grID": 1016,
        "trID": 1370,
        "ofID": 1364,
        "coID": 726,
        "gbid": "votive_mass_christ_eternal_priest",
        "coVerses": "Ps 115"
    },
    "votiveJCSESPasch": {
        "inID": 684,
        "grID": 1096,
        "alID": 611,
        "ofID": 1364,
        "coID": 726,
        "gbid": "votive_mass_christ_eternal_priest",
        "coVerses": "Ps 115"
    },
    "votiveSC": {
        "inID": 359,
        "grID": 873,
        "alID": 859,
        "ofID": 195,
        "coID": 346,
        "gbid": "votive_mass_holy_cross",
        "inVerses": "Ps 66: 2, 3",
        "coVerses": "Ps 17: 2-3, 4, 18, 38-39, 41, 48-50"
    },
    "votiveSCQuad": {
        "inID": 359,
        "grID": 873,
        "trID": 114,
        "ofID": 195,
        "coID": 346,
        "offertoriumReplace": gabcRemoveLastAlleluia,
        "gbid": "votive_mass_holy_cross",
        "inVerses": "Ps 66: 2, 3",
        "coVerses": "Ps 17: 2-3, 4, 18, 38-39, 41, 48-50"
    },
    "votiveSCPasch": {
        "inID": 359,
        "grID": 627,
        "alID": 859,
        "ofID": 195,
        "coID": 346,
        "gbid": "votive_mass_holy_cross",
        "inVerses": "Ps 66: 2, 3",
        "coVerses": "Ps 17: 2-3, 4, 18, 38-39, 41, 48-50"
    },
    "votivePJC": {
        "inID": 523,
        "grID": 780,
        "alID": 199,
        "ofID": 426,
        "coID": 84,
        "gbid": "votive_mass_passion_oljc"
    },
    "votivePJCQuad": {
        "inID": 523,
        "grID": 780,
        "trID": 978,
        "ofID": 426,
        "coID": 84,
        "gbid": "votive_mass_passion_oljc"
    },
    "votivePJCPasch": {
        "inID": 523,
        "grID": 199,
        "alID": 1376,
        "ofID": 426,
        "coID": 84,
        "gbid": "votive_mass_passion_oljc"
    },
    "votiveJ": {
        "inID": 385,
        "grID": 600,
        "alID": 213,
        "ofID": 845,
        "coID": 534,
        "gbid": "votive_mass_st_joseph"
    },
    "votiveJQuad": {
        "inID": 385,
        "grID": 600,
        "trID": 7670,
        "ofID": 845,
        "coID": 534,
        "gbid": "votive_mass_st_joseph"
    },
    "votiveJPasch": {
        "inID": 385,
        "grID": 1324,
        "alID": 213,
        "ofID": 845,
        "coID": 534,
        "gbid": "votive_mass_st_joseph"
    },
    "votivePP": {
        "inID": 475,
        "grID": 307,
        "alID": 130,
        "ofID": 570,
        "coID": 1028,
        "gbid": "votive_mass_ss_peter_paul"
    },
    "votivePPQuad": {
        "inID": 475,
        "grID": 307,
        "trID": 305,
        "ofID": 570,
        "coID": 1028,
        "gbid": "votive_mass_ss_peter_paul"
    },
    "votivePPPasch": {
        "inID": 340,
        "grID": 762,
        "alID": 1249,
        "ofID": 1382,
        "coID": 617,
        "gbid": "mass_one_martyr",
        "inVerses": "Ps 63: 4, 11",
        "coVerses": "Ps 63: 2-7"
    },
    "votiveOA": {
        "ref": "votivePP",
        "gbid": "votive_mass_ss_peter_paul"
    },
    "votiveOAQuad": {
        "ref": "votivePPQuad",
        "gbid": "votive_mass_ss_peter_paul"
    },
    "votiveOAPasch": {
        "inID": 340,
        "grID": 762,
        "alID": 1030,
        "ofID": "1319+al",
        "coID": 212,
        "gbid": "votive_mass_holy_apostles_pt",
        "inVerses": "Ps 63: 4, 11",
        "ofVerses": "Ps 44: 2"
    },
    "nuptialis": {
        "inID": 551,
        "grID": 311,
        "alID": 191,
        "ofID": 967,
        "coID": 490,
        "gbid": "nuptial_mass",
        "ofVerses": "Ps 30: 17, 18"
    },
    "nuptialisQuad": {
        "inID": 551,
        "grID": 311,
        "trID": 144,
        "ofID": 967,
        "coID": 490,
        "gbid": "nuptial_mass",
        "ofVerses": "Ps 30: 17, 18"
    },
    "nuptialisPasch": {
        "inID": 551,
        "grID": 191,
        "alID": 505,
        "ofID": 967,
        "coID": 490,
        "gbid": "nuptial_mass",
        "ofVerses": "Ps 30: 17, 18"
    },
    "defunctorum": {
        "inID": 766,
        "grID": 1261,
        "trID": 338,
        "seqID": 1198,
        "ofID": 1199,
        "coID": 241,
        "ite": false,
        "extraChants": true,
        "gbid": "requiem",
        "coVerses": "Ps 129; Ps 120"
    },
    "dedicatio": {
        "inID": 923,
        "grID": 651,
        "alID": 242,
        "ofID": 200,
        "coID": 43,
        "gbid": "mass_dedication_church",
        "inVerses": "Ps 83: 4, 5",
        "coVerses": "Ps 83: 2-5, 9-11"
    },
    "dedicatioQuad": {
        "inID": 923,
        "grID": 651,
        "trID": 1377,
        "ofID": 200,
        "coID": 43,
        "gbid": "mass_dedication_church",
        "inVerses": "Ps 83: 4, 5",
        "coVerses": "Ps 83: 2-5, 9-11"
    },
    "dedicatioPasch": {
        "inID": 923,
        "grID": 242,
        "alID": 1343,
        "ofID": 200,
        "coID": 43,
        "gbid": "mass_dedication_church",
        "inVerses": "Ps 83: 4, 5",
        "coVerses": "Ps 83: 2-5, 9-11"
    },
    "votiveMPI": {
        "inID": 904,
        "grID": 562,
        "alID": 595,
        "ofID": 842,
        "coID": 640
    },
    "votiveMPIQuad": {
        "inID": 904,
        "grID": 562,
        "trID": 729,
        "ofID": 842,
        "coID": 640
    },
    "votiveMPIPasch": {
        "inID": 904,
        "grID": 595,
        "alID": 1285,
        "ofID": 842,
        "coID": 640
    },
    "votiveGBM": {
      "inID": 1072,
      "grID": 1121,
      "alID": 239,
      "ofID": 967,
      "coID": 1318
    },
    "votiveGBMQuad": {
      "inID": 1072,
      "grID": 1121,
      "trID": 276,
      "ofID": 967,
      "coID": 1318
    },
    "votiveGBMPasch": {
      "inID": 1072,
      "grID": 1380,
      "alID": 745,
      "ofID": 967,
      "coID": 1318
    },
    "votiveQN": {
      "inID": 389,
      "grID": 395,
      "alID": 189,
      "ofID": 616,
      "coID": 696
    },
    "votiveQNQuad": {
      "inID": 389,
      "grID": 395,
      "trID": 276,
      "ofID": 616,
      "coID": 696
    },
    "votiveQNPasch": {
      "inID": 389,
      "grID": 189,
      "alID": 1342,
      "ofID": 616,
      "coID": 696
    },
    "votiveESP": {
      "inID": 1286,
      "grID": 546,
      "alID": 679,
      "ofID": 690,
      "coID": 145
    },
    "votiveESPQuad": {
      "inID": 1286,
      "grID": 546,
      "trID": 597,
      "ofID": 690,
      "coID": 145
    },
    "votiveESPPasch": {
      "inID": 1286,
      "grID": 679,
      "alID": 1220,
      "ofID": 690,
      "coID": 145
    },
    "votiveFP": {
      "inID": 2,
      "grID": 632,
      "alID": 253,
      "ofID": 1277,
      "coID": 322
    },
    "votiveFPQuad": {
      "inID": 2,
      "grID": 632,
      "trID": 516,
      "ofID": 1277,
      "coID": 322
    },
    "votiveFPPasch": {
      "inID": 2,
      "grID": 253,
      "alID": 1164,
      "ofID": 1277,
      "coID": 322
    },
    "votiveED": {
      "inID": 529,
      "grID": 1265,
      "alID": 855,
      "ofID": 1080,
      "coID": 1290
    },
    "votiveEDQuad": {
      "inID": 529,
      "grID": 1265,
      "trID": 380,
      "ofID": 1080,
      "coID": 1290
    },
    "votiveEDPasch": {
      "inID": 529,
      "grID": 855,
      "alID": 539,
      "ofID": 1080,
      "coID": 1290
    },
    "votiveUE": {
      "inID": 575,
      "grID": 180,
      "alID": 641,
      "ofID": 1272,
      "coID": 147
    },
    "votiveUEQuad": {
      "inID": 575,
      "grID": 180,
      "trID": 421,
      "ofID": 1272,
      "coID": 147
    },
    "votiveUEPasch": {
      "inID": 575,
      "grID": 641,
      "alID": 700,
      "ofID": 1272,
      "coID": 147
    },
    "votiveTB": {
      "inID": 1294,
      "grID": 850,
      "alID": 879,
      "ofID": 1080,
      "coID": 339
    },
    "votiveTBQuad": {
      "inID": 1294,
      "grID": 850,
      "trID": 425,
      "ofID": 1080,
      "coID": 339
    },
    "votiveTBPasch": {
      "inID": 1294,
      "grID": 879,
      "alID": 192,
      "ofID": 1080,
      "coID": 339
    },
    "votiveP": {
      "inID": 172,
      "grID": 180,
      "alID": 641,
      "ofID": 899,
      "coID": 942
    },
    "votivePQuad": {
      "inID": 172,
      "grID": 180,
      "trID": 421,
      "ofID": 899,
      "coID": 942
    },
    "votivePPasch": {
      "inID": 172,
      "grID": 641,
      "alID": 700,
      "ofID": 899,
      "coID": 942 // should this be 91 in paschal time?  There seems to be a disagreement between the liber usualis and the graduale
    },
    "votiveVM": {
      "inID": 535,
      "grID": 932,
      "alID": 134,
      "ofID": 723,
      "coID": 902
    },
    "votiveVMQuad": {
      "inID": 535,
      "grID": 932,
      "trID": 425,
      "ofID": 723,
      "coID": 902
    },
    "votiveVMPasch": {
      "inID": 535,
      "grID": 134,
      "alID": 158,
      "ofID": 723,
      "coID": 902
    },
    "votiveRP": {
      "inID": 533,
      "grID": 332,
      "alID": 1264,
      "ofID": 461,
      "coID": 422
    },
    "votiveRPQuad": {
      "inID": 533,
      "grID": 332,
      "trID": 926,
      "ofID": 461,
      "coID": 422
    },
    "votiveRPPasch": {
      "inID": 533,
      "grID": 1264,
      "alID": 453,
      "ofID": 461,
      "coID": 364
    },
    "votivePIA": {
      "inID": 1314,
      "grID": 1121,
      "alID": 352,
      "ofID": 265,
      "coID": 479
    },
    "votivePIAQuad": {
      "inID": 1314,
      "grID": 1121,
      "trID": 927,
      "ofID": 265,
      "coID": 479
    },
    "votivePIAPasch": {
      "inID": 1314,
      "grID": 352,
      "alID": 292,
      "ofID": 265,
      "coID": 479
    },
    "Sep19laSalette": {
      "inID": 19927,
      "grID": 19928,
      "alID": 19929,
      "ofID": 787,
      "coID": 1053,
    },
    "Dec24": {
        "inID": 150,
        "grID": 202,
        "alID": 167,
        "ofID": 171,
        "coID": 367,
        "gbid": "christmas0",
        "inVerses": "Ps 23: 2-3",
        "coVerses": "Ps 23: 1-8"
    },
    "Dec25_1": {
        "inID": 1175,
        "grID": 518,
        "alID": 890,
        "ofID": 811,
        "coID": 117,
        "gbid": "christmas1",
        "inVerses": "Ps 2: 2, 8",
        "coVerses": "Ps 109"
    },
    "Dec25_2": {
        "inID": 917,
        "grID": 217,
        "alID": 714,
        "ofID": 979,
        "coID": 1125,
        "gbid": "christmas2",
        "coVerses": "Ps 33"
    },
    "Dec25_3": {
        "inID": 72,
        "grID": 1163,
        "alID": 324,
        "ofID": 1274,
        "coID": 1139,
        "gbid": "christmas3",
        "inVerses": "Ps 97: 2-3",
        "coVerses": "Ps 97: 1-3, 4-8"
    },
    "Jan1": {
        "inID": 72,
        "grID": 1163,
        "alID": 863,
        "ofID": 1274,
        "coID": 1139,
        "gbid": "christmas_octave",
        "inVerses": "Ps 97: 2-3",
        "coVerses": "Ps 97: 1-3, 4-8"
    },
    "Epi": {
        "inID": 403,
        "grID": 205,
        "alID": 524,
        "ofID": 1147,
        "coID": 918,
        "gbid": "epiphany",
        "inVerses": "Ps 71: 10-11",
        "coVerses": "Ps 71: 2-3, 7-8, 10-12, 17-18"
    },
    "Asc": {
        "inID": 1355,
        "grID": 17,
        "alID": 57,
        "ofID": 211,
        "coID": 263,
        "gbid": "ascension",
        "inVerses": "Ps 46: 6-7",
        "ofVerses": "Ps 46: 2",
        "coVerses": "Ps 67: 2, 5, 19-21, 25, 27, 29-30, 33"
    },
    "CorpusChristi": {
        "inID": 715,
        "grID": 1230,
        "alID": 774,
        "seqID": 308,
        "ofID": 645,
        "coID": 577,
        "gbid": "cc",
        "inVerses": "Ps 80: 3, 11",
        "ofVerses": "Ps 67: 27",
        "coVerses": "Ps 22"
    },
    "Adv1": {
        "inID": 132,
        "ofID": 962,
        "coID": 1036,
        "alID": 1115,
        "grID": 1169,
        "gbid": "advent1",
        "inVerses": "Ps 24: 5-6",
        "ofVerses": "Ps 24: 5",
        "coVerses": "Ps 84: 2-5, 7-8, 10-12, 14"
    },
    "Adv2": {
        "inID": 356,
        "ofID": 631,
        "coID": 966,
        "alID": 292,
        "grID": 1268,
        "gbid": "advent2",
        "inVerses": "Ps 79: 2-3",
        "coVerses": "Ps 147: 1-4, 6-9"
    },
    "Adv3": {
        "inID": 1225,
        "ofID": 113,
        "coID": 218,
        "alID": 855,
        "grID": 1007,
        "gbid": "advent3",
        "inVerses": "Ps 84: 3-5, 7-8, 10-12, 14",
        "coVerses": "Is 35: 1, 2-3, 5-7"
    },
    "Adv3w": {
        "inID": 79,
        "grID": [
            756,
            284
        ],
        "ofID": 290,
        "coID": 1144,
        "gbid": "advent3wed",
        "inVerses": "Ps 18: 3-7",
        "coVerses": "Ps 18: 2-7"
    },
    "Adv3f": {
        "inID": 86,
        "grID": 1055,
        "ofID": 631,
        "coID": 439,
        "gbid": "advent3fri",
        "inVerses": "Ps 118: 4, 166",
        "coVerses": "Ps 49: 1-5"
    },
    "Adv3s": {
        "inID": 169,
        "grID": [
            698,
            203,
            38,
            506,
            2166
        ],
        "trID": 1157,
        "ofID": 929,
        "coID": 88,
        "gbid": "advent3sat",
        "inVerses": "Ps 79: 2-3",
        "coVerses": "Ps 18: 2-6"
    },
    "Adv3ss": {
        "inID": 169,
        "grID": 698,
        "trID": 1157,
        "ofID": 929,
        "coID": 88,
        "gbid": "advent3sat",
        "inVerses": "Ps 79: 2-3",
        "coVerses": "Ps 18: 2-6"
    },
    "Adv4": {
        "inID": 79,
        "ofID": 843,
        "coID": 1144,
        "alID": 224,
        "grID": 284,
        "gbid": "advent4",
        "inVerses": "Ps 18: 3-7",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 18: 2-7"
    },
    "Epi1": {
        "inID": 336,
        "ofID": 93,
        "coID": 626,
        "grID": 260,
        "alID": 816,
        "gbid": "holy_family",
        "inVerses": "Ps 83: 3, 5",
        "coVerses": "Ps 97: 1-3, 4-8; Ps 83: 2-3, 9-13"
    },
    "Epi1s": {
        "inID": 20,
        "ofID": 718,
        "grID": 553,
        "alID": 802,
        "coID": 705,
        "gbid": "epiphany1",
        "coVerses": "Ps 26: 1, 4-5, 8, 10"
    },
    "Epi2": {
        "inID": 13,
        "ofID": 937,
        "coID": 230,
        "alID": 538,
        "grID": 932,
        "gbid": "epiphany2",
        "inVerses": "Ps 65: 3, 5",
        "ofVerses": "Ps 65: 13, 14",
        "coVerses": "Ps 65: 1-3, 5-6, 8-9"
    },
    "Epi3": {
        "inID": 1123,
        "ofID": 47,
        "coID": 1148,
        "alID": 1001,
        "grID": 1173,
        "gbid": "epiphany3",
        "inVerses": "Ps 96: 6-7",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 96: 1, 4-6, 7-10, 12"
    },
    "Epi4": {
        "inID": 1123,
        "ofID": 47,
        "coID": 1148,
        "alID": 1001,
        "grID": 1173,
        "gbid": "epiphany3",
        "inVerses": "Ps 96: 6-7",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 96: 1, 4-6, 7-10, 12"
    },
    "Epi5": {
        "inID": 1123,
        "ofID": 47,
        "coID": 1148,
        "alID": 1001,
        "grID": 1173,
        "gbid": "epiphany3",
        "inVerses": "Ps 96: 6-7",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 96: 1, 4-6, 7-10, 12"
    },
    "Epi6": {
        "inID": 1123,
        "ofID": 47,
        "coID": 1148,
        "alID": 1001,
        "grID": 1173,
        "gbid": "epiphany3",
        "inVerses": "Ps 96: 6-7",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 96: 1, 4-6, 7-10, 12"
    },
    "Nat1": {
        "inID": 564,
        "ofID": 979,
        "coID": 1282,
        "grID": 1308,
        "alID": 714,
        "gbid": "sunday_within_octave_christmas",
        "inVerses": "Ps 92: 1-2",
        "coVerses": "Ps 92"
    },
    "Nat2": {
        "inID": 1033,
        "ofID": 980,
        "coID": 8,
        "alID": 1,
        "grID": 670,
        "gbid": "most_holy_name_jesus",
        "inVerses": "Ps 8: 2",
        "coVerses": "Ps 85: 1, 11-13, 15-16"
    },
    "Pasc0": {
        "inID": 1043,
        "grID": 1075,
        "alID": 761,
        "seqID": 1086,
        "ofID": 725,
        "coID": 952,
        "ite": 2988,
        "gbid": "easter_sunday",
        "inVerses": "Ps 138: 3, 14",
        "ofVerses": "Ps 75: 2",
        "coVerses": "Ps 117: 1-2, 5, 8, 10-11, 13-17, 21-26"
    },
    "Pasc0m": {
        "inID": 1315,
        "grID": 1150,
        "alID": 377,
        "seqID": 1086,
        "ofID": 789,
        "coID": 121,
        "gbid": "easter_monday",
        "inVerses": "Ps 104: 2-3",
        "ofVerses": "Matth 28: 7",
        "coVerses": "Ps 117: 1-2, 5, 8, 10-11, 13-17, 21-26"
    },
    "Pasc0t": {
        "inID": 1135,
        "grID": 1188,
        "alID": 438,
        "seqID": 1086,
        "ofID": 869,
        "coID": 243,
        "gbid": "easter_tuesday",
        "inVerses": "Ps 104: 3, 4",
        "coVerses": "Ps 104: 1-5, 43-45"
    },
    "Pasc0w": {
        "inID": 997,
        "grID": 416,
        "alID": 1217,
        "seqID": 1086,
        "ofID": 1361,
        "coID": 593,
        "gbid": "easter_wednesday",
        "inVerses": "Ps 95: 2-3",
        "coVerses": "Ps 95: 1-4, 7-9"
    },
    "Pasc0h": {
        "inID": 1332,
        "grID": 975,
        "alID": 215,
        "seqID": 1086,
        "ofID": 1129,
        "coID": 1219,
        "gbid": "easter_thursday",
        "inVerses": "Ps 97: 2-7",
        "coVerses": "Ps 104: 1-5, 43-45"
    },
    "Pasc0f": {
        "inID": 758,
        "grID": 1305,
        "alID": 627,
        "seqID": 1086,
        "ofID": 151,
        "coID": 1260,
        "gbid": "easter_friday",
        "inVerses": "Ps 77: 2-3",
        "coVerses": "Ps 77: 1, 3, 4, 23-25, 27-28"
    },
    "Pasc0s": {
        "inID": 974,
        "grID": 568,
        "alID": 661,
        "seqID": 1086,
        "ofID": 941,
        "coID": 1293,
        "gbid": "easter_saturday",
        "inVerses": "Ps 104: 2-5, 43-45",
        "coVerses": "Ps 104: 1-5, 43-45"
    },
    "Pasc1": {
        "inID": 25,
        "ofID": 789,
        "coID": 953,
        "grID": 1042,
        "alID": 275,
        "gbid": "easter1",
        "inVerses": "Ps 80: 3, 11",
        "ofVerses": "Matth 28: 7",
        "coVerses": "Ps 117: 1-2, 5, 8, 10-11, 13-17, 21-26"
    },
    "Pasc2": {
        "inID": 135,
        "ofID": 924,
        "coID": 95,
        "grID": 912,
        "alID": 1220,
        "gbid": "easter2",
        "inVerses": "Ps 32: 2-3",
        "ofVerses": "Ps 62: 2, 3",
        "coVerses": "Ps 22"
    },
    "Pasc2w": {
        "inID": 385,
        "grID": 1324,
        "alID": 213,
        "ofID": 845,
        "coID": 534,
        "gbid": "st_joseph_solemnity"
    },
    "Pasc3": {
        "inID": 536,
        "ofID": 668,
        "coID": 813,
        "grID": 1341,
        "alID": 446,
        "gbid": "easter3",
        "inVerses": "Ps 65: 8-9",
        "ofVerses": "Ps 145: 7",
        "coVerses": "Ps 65: 1-2, 4-6, 8-9, 16, 20"
    },
    "Pasc4": {
        "inID": 42,
        "ofID": 937,
        "coID": 39,
        "grID": 159,
        "alID": 1348,
        "gbid": "easter4",
        "inVerses": "Ps 97: 2, 4",
        "ofVerses": "Ps 65: 13, 14",
        "coVerses": "Ps 97: 1, 2-7"
    },
    "Pasc5": {
        "inID": 585,
        "ofID": 860,
        "coID": 579,
        "grID": 633,
        "alID": 1040,
        "gbid": "easter5",
        "inVerses": "Ps 65: 4-5",
        "ofVerses": "Ps 65: 1, 2",
        "coVerses": "Ps 95: 1, 3-4, 8-10, 13"
    },
    "Pasc6": {
        "inID": 990,
        "ofID": 211,
        "coID": 1091,
        "grID": 405,
        "alID": 107,
        "gbid": "ascension1",
        "inVerses": "Ps 26: 1, 4-5, 8, 10",
        "ofVerses": "Ps 46: 2",
        "coVerses": "Ps 121: 1-2, 5-9"
    },
    "Pasc6s": {
        "inID": 418,
        "grID": "507a",
        "trID": 1247,
        "ofID": 1176,
        "coID": 255,
        "rubrics": {
            "after#divGraduale": "<Allelúia.> is not repeated, but the Tract <Laudáte.> follows immediately."
        },
        "gbid": "pentecost_vigil",
        "inVerses": "Ps 33",
        "coVerses": "Ps 103: 1, 30-31, 33-34"
    },
    "Pasc6s_v": {
        "extraChants": true,
        "ref": "Pasc6s",
        "gloria": true,
        "credo": false,
        "ite": false,
    },
    "Pent0": {
        "inID": 861,
        "ofID": 361,
        "coID": 1041,
        "grID": 99,
        "alID": 181,
        "seqID": 68,
        "gbid": "pentecost",
        "inVerses": "Ps 67: 29, 33",
        "ofVerses": "Ps 67: 5",
        "coVerses": "Ps 67: 2-4, 12, 27, 29"
    },
    "Pent0m": {
        "inID": 715,
        "grID": 101,
        "alID": 181,
        "seqID": 68,
        "ofID": 869,
        "coID": 1151,
        "gbid": "pentecost_mon",
        "inVerses": "Ps 80: 3, 11",
        "coVerses": "Ps 50: 3, 9-10, 12-15, 17, 20"
    },
    "Pent0t": {
        "inID": 1278,
        "grID": 1197,
        "alID": 181,
        "seqID": 68,
        "ofID": 1361,
        "coID": 333,
        "gbid": "pentecost_tue",
        "inVerses": "Ps 77: 2-3",
        "coVerses": "Ps 77: 1-3, 4-5, 7, 23-25, 29, 71-72"
    },
    "Pent0w": {
        "inID": 822,
        "grID": 635,
        "alID": 181,
        "seqID": 68,
        "ofID": 1218,
        "coID": 91,
        "gloria": "before#divLectioAnteTractu",
        "rubrics": {
            "after#divGraduale": "<Allelúia.> is not repeated. The <Glória in excélsis.> is said here."
        },
        "gbid": "pentecost_wed",
        "inVerses": "Ps 67: 4, 10",
        "ofVerses": "Ps 118: 57, 58",
        "coVerses": "Ps 121"
    },
    "Pent0h": {
        "inID": 861,
        "ofID": 361,
        "coID": 1041,
        "grID": 99,
        "alID": 181,
        "seqID": 68,
        "gbid": "pentecost",
        "inVerses": "Ps 67: 29, 33",
        "ofVerses": "Ps 67: 5",
        "coVerses": "Ps 67: 2-4, 12, 27, 29"
    },
    "Pent0f": {
        "inID": 557,
        "grID": 119,
        "alID": 181,
        "seqID": 68,
        "ofID": 668,
        "coID": 981,
        "gbid": "pentecost_fri",
        "inVerses": "Ps 70: 2-3",
        "coVerses": "Ps 121"
    },
    "Pent0s": {
        "inID": 1228,
        "grID": [
            1236,
            1138,
            657,
            181,
            1289
        ],
        "trID": 1247,
        "seqID": 68,
        "ofID": 987,
        "coID": 190,
        "sequentiaReplace": gabcRemoveLastAlleluia,
        "gloria": "before#divLectioAnteTractu",
        "rubrics": {
            "before#divGraduale": "After each Lesson, the Cantor intones <Allelúia.>  The Choir continues the Chant, without repeating the intonation.  <Allelúia.> is not repeated at the end of the Verse."
        },
        "gbid": "pentecost_sat",
        "coVerses": "Ps 77: 1-3, 4-5, 7, 23-25, 29, 71-72"
    },
    "Pent0ss": {
        "inID": 1228,
        "grID": 1236,
        "alID": 181,
        "seqID": 68,
        "ofID": 987,
        "coID": 190,
        "gloria": "before#divLectioAnteTractu",
        "gbid": "pentecost_sat",
        "coVerses": "Ps 77: 1-3, 4-5, 7, 23-25, 29, 71-72"
    },
    "Pent1": {
        "inID": 349,
        "ofID": 1303,
        "coID": 391,
        "alID": 1289,
        "grID": 965,
        "gbid": "p1",
        "inVerses": "Ps 8: 2, 3",
        "ofVerses": "Tob 12: 6",
        "coVerses": "Tobias 13: 1, 3, 5-6, 8-10"
    },
    "Pent1w": {
        "inID": 146,
        "ofID": 293,
        "coID": 639,
        "alID": 103,
        "grID": 399,
        "gbid": "1st_sunday_after_pentecost",
        "coVerses": "Ps 9: 4, 11-13, 15"
    },
    "Pent2": {
        "inID": 1111,
        "ofID": 848,
        "coID": 794,
        "alID": 801,
        "grID": 697,
        "gbid": "p2",
        "inVerses": "Ps 17: 3-4",
        "ofVerses": "Ps 6: 2",
        "coVerses": "Ps 12: 1-6"
    },
    "Pent3": {
        "inID": 1235,
        "ofID": 1328,
        "coID": 1058,
        "alID": 1264,
        "grID": 423,
        "gbid": "p3",
        "inVerses": "Ps 24: 4, 17",
        "ofVerses": "Ps 9: 5, 6, 9",
        "coVerses": "Ps 31: 1-5, 7-8, 10-11"
    },
    "Pent4": {
        "inID": 874,
        "ofID": 708,
        "coID": 512,
        "alID": 727,
        "grID": 332,
        "gbid": "p4",
        "inVerses": "Ps 26: 9, 14",
        "ofVerses": "Ps 12: 2, 3",
        "coVerses": "Ps 17: 4, 7, 28-30, 32-33, 36"
    },
    "Pent5": {
        "inID": 396,
        "ofID": 143,
        "coID": 574,
        "alID": 797,
        "grID": 1226,
        "gbid": "p5",
        "inVerses": "Ps 26: 1, 3",
        "ofVerses": "Ps 15: 1, 2, 5",
        "coVerses": "Ps 26: 1, 2-3, 9-10, 13-14"
    },
    "Pent6": {
        "inID": 522,
        "ofID": 265,
        "coID": 1079,
        "alID": 239,
        "grID": 1046,
        "gbid": "p6",
        "inVerses": "Ps 27: 7",
        "ofVerses": "Ps 16: 1",
        "coVerses": "Ps 26: 1-5"
    },
    "Pent7": {
        "inID": 1136,
        "ofID": 675,
        "coID": 339,
        "alID": 77,
        "grID": 1022,
        "gbid": "p7",
        "inVerses": "Ps 46: 4, 7-8",
        "ofVerses": "Dan 3: 41, 42",
        "coVerses": "Ps 30: 2, 3, 6, 7-9, 20-21, 24-25"
    },
    "Pent8": {
        "inID": 1254,
        "ofID": 1080,
        "coID": 1203,
        "alID": 709,
        "grID": 886,
        "gbid": "p8",
        "inVerses": "Ps 47: 3, 12",
        "ofVerses": "Ps 17: 7",
        "coVerses": "Ps 33, 1-7, 9-22"
    },
    "Pent9": {
        "inID": 1357,
        "ofID": 591,
        "coID": 798,
        "alID": 879,
        "grID": 1205,
        "gbid": "p9",
        "inVerses": "Ps 53: 4, 8",
        "ofVerses": "Ps 18: 9, 10",
        "coVerses": "Ps 118: 1-2, 11, 49-50, 72, 103, 105, 162"
    },
    "Pent10": {
        "inID": 299,
        "ofID": 962,
        "coID": 1221,
        "alID": 1052,
        "grID": 1088,
        "gbid": "p10",
        "inVerses": "Ps 54: 5, 6",
        "ofVerses": "Ps 24: 5",
        "coVerses": "Ps 50: 3, 10, 12-15, 17, 19-20"
    },
    "Pent11": {
        "inID": 1026,
        "ofID": 648,
        "coID": 1145,
        "alID": 580,
        "grID": 865,
        "gbid": "p11",
        "inVerses": "Ps 67: 8, 10",
        "ofVerses": "Ps 29: 4",
        "coVerses": "Ps 127"
    },
    "Pent12": {
        "inID": 501,
        "ofID": 325,
        "coID": 1245,
        "alID": 1082,
        "grID": 1182,
        "gbid": "p12",
        "inVerses": "Ps 69: 6",
        "ofVerses": "Exodi 33",
        "coVerses": "Ps 103: 1-2, 23-24, 30-31, 33-35"
    },
    "Pent13": {
        "inID": 691,
        "ofID": 967,
        "coID": 388,
        "alID": 820,
        "grID": 1232,
        "gbid": "p13",
        "inVerses": "Ps 73: 2, 18",
        "ofVerses": "Ps 30: 17, 18",
        "coVerses": "Ps 77: 1-4, 23-25, 27, 29"
    },
    "Pent14": {
        "inID": 1071,
        "ofID": 747,
        "coID": 868,
        "alID": 1246,
        "grID": 547,
        "gbid": "p14",
        "inVerses": "Ps 83: 3, 5",
        "ofVerses": "Ps 33: 1",
        "coVerses": "Ps 36: 1, 3, 16, 18-19, 23, 27-28, 29, 34"
    },
    "Pent15": {
        "inID": 1165,
        "ofID": 182,
        "coID": 782,
        "alID": 1352,
        "grID": 1338,
        "gbid": "p15",
        "inVerses": "Ps 85: 5, 6",
        "ofVerses": "Ps 39: 3",
        "coVerses": "Ps 110: 1-10"
    },
    "Pent16": {
        "inID": 335,
        "ofID": 993,
        "coID": 1318,
        "alID": 1077,
        "grID": 1173,
        "gbid": "p16",
        "inVerses": "Ps 85: 2, 4",
        "ofVerses": "Ps 39: 1",
        "coVerses": "Ps 70: 1-2, 3, 5-6, 9, 12, 14, 23"
    },
    "Pent17": {
        "inID": 1284,
        "ofID": 652,
        "coID": 1134,
        "alID": 595,
        "grID": 1044,
        "gbid": "p17",
        "inVerses": "Ps 110: 2-10",
        "ofVerses": "Dan 9: 20",
        "coVerses": "Ps 75: 2-4, 9-11"
    },
    "EmbWedSept": {
        "inID": 1323,
        "grID": [
            472,
            1044
        ],
        "ofID": 810,
        "coID": 496,
        "gloria": false,
        "gbid": "wed_ews",
        "inVerses": "Ps 80: 11, 17",
        "ofVerses": "Ps 118: 57, 58",
        "coVerses": "Ps 80: 2-3, 5, 11, 17"
    },
    "EmbFriSept": {
        "inID": 864,
        "grID": 1046,
        "ofID": 1359,
        "coID": 828,
        "gloria": false,
        "gbid": "fri_ews",
        "inVerses": "Ps 104: 2-5, 43-45",
        "coVerses": "Ps 118: 1-2, 39, 45, 77, 99-100, 143"
    },
    "EmbSatSept": {
        "inID": 450,
        "grID": [
            332,
            1226,
            1046,
            44,
            2166
        ],
        "trID": 1247,
        "ofID": 542,
        "coID": 1149,
        "gloria": false,
        "gbid": "sat_ews",
        "inVerses": "Ps 94: 2, 7",
        "coVerses": "Ps 80: 2-3, 5, 11, 17"
    },
    "EmbSatSeptS": {
        "inID": 450,
        "grID": 332,
        "trID": 1247,
        "ofID": 542,
        "coID": 1149,
        "gloria": false,
        "gbid": "sat_ews",
        "inVerses": "Ps 94: 2, 7",
        "coVerses": "Ps 80: 2-3, 5, 11, 17"
    },
    "Pent18": {
        "inID": 172,
        "ofID": 838,
        "coID": 404,
        "alID": 1097,
        "grID": 1011,
        "gbid": "p18",
        "inVerses": "Ps 121: 6-7",
        "coVerses": "Ps 95, 1-8, 9-12"
    },
    "Pent19": {
        "inID": 389,
        "ofID": 616,
        "coID": 479,
        "alID": 1192,
        "grID": 44,
        "gbid": "p19",
        "inVerses": "Ps 77: 2-3",
        "ofVerses": "Ps 137: 3",
        "coVerses": "Ps 118: 1-3, 8-9, 26, 59-60, 134, 168"
    },
    "Pent20": {
        "inID": 1056,
        "ofID": 812,
        "coID": 696,
        "alID": 745,
        "grID": 1230,
        "gbid": "p20",
        "inVerses": "Ps 118: 2, 22",
        "ofVerses": "Ps 136: 2-4",
        "coVerses": "Ps 118: 1-2, 25, 28, 41, 74, 76, 81-82, 114"
    },
    "Pent21": {
        "inID": 1047,
        "ofID": 1363,
        "coID": 1290,
        "alID": 1380,
        "grID": 1108,
        "gbid": "p21",
        "inVerses": "Ps 118: 4, 166",
        "coVerses": "Ps 118: 1, 41, 85, 87, 113, 123, 157, 161, 166, 174"
    },
    "Pent22": {
        "inID": 1271,
        "ofID": 67,
        "coID": 464,
        "alID": 933,
        "grID": 614,
        "gbid": "p22",
        "inVerses": "Ps 129: 2, 4-5",
        "coVerses": "Ps 16: 1-3, 5, 7-9, 15"
    },
    "Pent23": {
        "inID": 735,
        "ofID": 986,
        "coID": 592,
        "alID": 331,
        "grID": 395,
        "gbid": "p23",
        "inVerses": "Ps 84: 3, 13",
        "ofVerses": "Ps 129: 1-3",
        "coVerses": "Ps 129; Ps 60"
    },
    "Pent24": {
        "ref": "Pent23",
        "gbid": "p23",
        "inVerses": "Ps 84: 3, 13",
        "ofVerses": "Ps 129: 1-3",
        "coVerses": "Ps 129; Ps 60"
    },
    "PentEpi3": {
        "ref": "Pent23",
        "gbid": "p23",
        "inVerses": "Ps 84: 3, 13",
        "ofVerses": "Ps 129: 1-3",
        "coVerses": "Ps 129; Ps 60"
    },
    "PentEpi4": {
        "ref": "Pent23",
        "gbid": "p23",
        "inVerses": "Ps 84: 3, 13",
        "ofVerses": "Ps 129: 1-3",
        "coVerses": "Ps 129; Ps 60"
    },
    "PentEpi5": {
        "ref": "Pent23",
        "gbid": "p23",
        "inVerses": "Ps 84: 3, 13",
        "ofVerses": "Ps 129: 1-3",
        "coVerses": "Ps 129; Ps 60"
    },
    "PentEpi6": {
        "ref": "Pent23",
        "gbid": "p23",
        "inVerses": "Ps 84: 3, 13",
        "ofVerses": "Ps 129: 1-3",
        "coVerses": "Ps 129; Ps 60"
    },
    "7a": {
        "inID": 1168,
        "ofID": 1194,
        "coID": 640,
        "trID": 926,
        "grID": 222,
        "gbid": "septuagesima",
        "inVerses": "Ps 17: 4, 7",
        "ofVerses": "Ps 91: 6",
        "coVerses": "Ps 30: 2-6, 7-9"
    },
    "6a": {
        "inID": 529,
        "ofID": 265,
        "coID": 554,
        "trID": 1178,
        "grID": 1265,
        "gbid": "sexagesima",
        "inVerses": "Ps 43: 2-3",
        "ofVerses": "Ps 16: 1",
        "coVerses": "Ps 42: 1-3, 4-6"
    },
    "5a": {
        "inID": 1381,
        "ofID": 1317,
        "coID": 677,
        "trID": 1299,
        "grID": 850,
        "gbid": "quinquagesima",
        "inVerses": "Ps 30: 3, 6",
        "ofVerses": "Ps 118: 1, 2",
        "coVerses": "Ps 77: 1, 3, 4, 23-25, 27-28"
    },
    "5aw": {
        "inID": 533,
        "grID": 754,
        "trID": 425,
        "ofID": 648,
        "coID": 582,
        "gbid": "lent0",
        "inVerses": "Ps 56: 3-4",
        "ofVerses": "Ps 29: 4",
        "coVerses": "Ps 1"
    },
    "5ah": {
        "inID": 299,
        "grID": 423,
        "ofID": 962,
        "coID": 1221,
        "gbid": "lent0thu",
        "inVerses": "Ps 54: 5, 6",
        "ofVerses": "Ps 24: 5",
        "coVerses": "Ps 50: 3, 10, 12-15, 17, 19-20"
    },
    "5af": {
        "inID": 45,
        "grID": 229,
        "trID": 425,
        "ofID": 109,
        "coID": 897,
        "gbid": "lent0fri",
        "inVerses": "Ps 29: 4-5",
        "coVerses": "Ps 2: 1-5, 10, 13"
    },
    "5as": {
        "inID": 45,
        "grID": 229,
        "ofID": 109,
        "coID": 897,
        "gbid": "lent0fri",
        "inVerses": "Ps 29: 4-5",
        "coVerses": "Ps 2: 1-5, 10, 13"
    },
    "Quad1": {
        "inID": 327,
        "ofID": 294,
        "coID": 1100,
        "trID": 889,
        "grID": 834,
        "gbid": "lent1",
        "inVerses": "Ps 90: 2, 11",
        "ofVerses": "Ps 90: 2, 5",
        "coVerses": "Ps 90: 1-3, 11-15"
    },
    "Quad1m": {
        "inID": 1330,
        "grID": 1226,
        "trID": 425,
        "ofID": 1060,
        "coID": 623,
        "gbid": "lent1mon",
        "inVerses": "Ps 122: 3-4",
        "coVerses": "Ps 144: 1, 5, 10-13, 15-16"
    },
    "Quad1t": {
        "inID": 549,
        "grID": 44,
        "ofID": 967,
        "coID": 384,
        "gbid": "lent1tue",
        "inVerses": "Ps 89: 3, 13",
        "ofVerses": "Ps 30: 17, 18",
        "coVerses": "Ps 4: 4-8"
    },
    "Quad1w": {
        "inID": 1294,
        "grID": 596,
        "trID": 276,
        "ofID": 810,
        "coID": 373,
        "gbid": "lent1wed",
        "inVerses": "Ps 24: 4, 5",
        "coVerses": "Ps 5: 5-8, 12-13"
    },
    "Quad1h": {
        "inID": 956,
        "grID": 1088,
        "ofID": 747,
        "coID": 782,
        "gbid": "lent1thu",
        "inVerses": "Ps 95: 2-3",
        "ofVerses": "Ps 33: 1",
        "coVerses": "Ps 110: 1-10"
    },
    "Quad1f": {
        "inID": 100,
        "grID": 1117,
        "trID": 425,
        "ofID": 1359,
        "coID": 484,
        "gbid": "lent1fri",
        "inVerses": "Ps 24: 4, 5",
        "coVerses": "Ps 6: 2-7"
    },
    "Quad1s": {
        "inID": 238,
        "grID": [
            332,
            1226,
            1046,
            44,
            2166
        ],
        "trID": 1247,
        "ofID": 542,
        "coID": 131,
        "gbid": "lent1sat",
        "inVerses": "Ps 87: 14-15",
        "coVerses": "Ps 7: 3, 7-8, 9, 11, 18"
    },
    "Quad1ss": {
        "inID": 238,
        "grID": 332,
        "trID": 1247,
        "ofID": 542,
        "coID": 131,
        "gbid": "lent1sat",
        "inVerses": "Ps 87: 14-15",
        "coVerses": "Ps 7: 3, 7-8, 9, 11, 18"
    },
    "Quad2": {
        "inID": 1294,
        "ofID": 810,
        "coID": 373,
        "trID": 455,
        "grID": 596,
        "gbid": "lent2",
        "inVerses": "Ps 24: 4, 5",
        "coVerses": "Ps 5: 5-8, 12-13"
    },
    "Quad2m": {
        "inID": 1314,
        "grID": 851,
        "trID": 425,
        "ofID": 143,
        "coID": 998,
        "gbid": "lent2mon",
        "inVerses": "Ps 25: 9, 11",
        "ofVerses": "Ps 15: 1, 2, 5",
        "coVerses": "Ps 8: 2-8"
    },
    "Quad2t": {
        "inID": 751,
        "grID": 423,
        "ofID": 922,
        "coID": 639,
        "gbid": "lent2tue",
        "inVerses": "Ps 26: 1, 9",
        "ofVerses": "Ps 50: 4, 5",
        "coVerses": "Ps 9: 4, 11-13, 15"
    },
    "Quad2w": {
        "inID": 323,
        "grID": 296,
        "trID": 425,
        "ofID": 962,
        "coID": 268,
        "gbid": "lent2wed",
        "inVerses": "Ps 37: 16, 20",
        "ofVerses": "Ps 24: 5",
        "coVerses": "Ps 10: 2-7"
    },
    "Quad2h": {
        "inID": 501,
        "grID": 332,
        "ofID": 325,
        "coID": 798,
        "gbid": "lent2thu",
        "inVerses": "Ps 69: 6",
        "ofVerses": "Exodi 33",
        "coVerses": "Ps 118: 1-2, 11, 49-50, 72, 103, 105, 162"
    },
    "Quad2f": {
        "inID": 830,
        "grID": 697,
        "trID": 425,
        "ofID": 993,
        "coID": 1159,
        "gbid": "lent2fri",
        "inVerses": "Ps 16: 2, 5",
        "ofVerses": "Ps 39: 1",
        "coVerses": "Ps 11: 2-7"
    },
    "Quad2s": {
        "inID": 1216,
        "grID": 1338,
        "ofID": 708,
        "coID": 1066,
        "gbid": "lent2sat",
        "inVerses": "Ps 18: 2-7",
        "ofVerses": "Ps 12: 2, 3",
        "coVerses": "Ps 31: 1-3, 5, 8, 10-11"
    },
    "Quad3": {
        "inID": 916,
        "ofID": 591,
        "coID": 1090,
        "trID": 1329,
        "grID": 1298,
        "gbid": "lent3",
        "inVerses": "Ps 24: 2-3, 17-21",
        "ofVerses": "Ps 18: 9, 10",
        "coVerses": "Ps 83: 2-3, 9-13"
    },
    "Quad3m": {
        "inID": 839,
        "grID": 118,
        "trID": 425,
        "ofID": 842,
        "coID": 931,
        "gbid": "lent3mon",
        "inVerses": "Ps 55: 9, 13",
        "coVerses": "Ps 13: 1-3, 6"
    },
    "Quad3t": {
        "inID": 558,
        "grID": 1210,
        "ofID": 47,
        "coID": 1340,
        "gbid": "lent3tue",
        "inVerses": "Ps 16: 1, 15",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 14: 3-5"
    },
    "Quad3w": {
        "inID": 1049,
        "grID": 562,
        "trID": 425,
        "ofID": 1369,
        "coID": 531,
        "gbid": "lent3wed",
        "inVerses": "Ps 30: 2-6, 7-9",
        "coVerses": "Ps 15: 1-2, 5-10"
    },
    "Quad3h": {
        "inID": 389,
        "grID": 1230,
        "ofID": 616,
        "coID": 479,
        "gbid": "lent3thu",
        "inVerses": "Ps 77: 2-3",
        "ofVerses": "Ps 137: 3",
        "coVerses": "Ps 118: 1-3, 8-9, 26, 59-60, 134, 168"
    },
    "Quad3f": {
        "inID": 733,
        "grID": 865,
        "trID": 425,
        "ofID": 293,
        "coID": 894,
        "gbid": "lent3fri",
        "inVerses": "Ps 85: 2, 6",
        "coVerses": "Is 12: 1-6"
    },
    "Quad3s": {
        "inID": 1248,
        "grID": 1121,
        "ofID": 1099,
        "coID": 1010,
        "gbid": "lent3sat",
        "inVerses": "Ps 5: 5-8, 12-13",
        "coVerses": "Ps 31: 1-3, 5, 8, 10-11"
    },
    "Quad4": {
        "inID": 653,
        "ofID": 899,
        "coID": 1353,
        "trID": 1377,
        "grID": 1011,
        "gbid": "lent4",
        "inVerses": "Ps 121: 2, 7",
        "ofVerses": "Ps 134: 2, 5",
        "coVerses": "Ps 121: 1-2, 5-9"
    },
    "Quad4m": {
        "inID": 458,
        "grID": 886,
        "trID": 425,
        "ofID": 718,
        "coID": 1316,
        "gbid": "lent4mon",
        "inVerses": "Ps 53: 7-8",
        "coVerses": "Ps 18: 2-5, 8, 15"
    },
    "Quad4t": {
        "inID": 904,
        "grID": 152,
        "ofID": 182,
        "coID": 1296,
        "gbid": "lent4tue",
        "inVerses": "Ps 54: 17-18",
        "ofVerses": "Ps 39: 3",
        "coVerses": "Ps 19: 2-5, 7-8"
    },
    "Quad4w": {
        "inID": 418,
        "grID": [
            1022,
            1044
        ],
        "trID": 425,
        "ofID": 860,
        "coID": 989,
        "gbid": "lent4wed",
        "inVerses": "Ps 33",
        "ofVerses": "Ps 65: 1, 2",
        "coVerses": "Ps 33: 1, 3-6, 8"
    },
    "Quad4h": {
        "inID": 864,
        "grID": 1232,
        "ofID": 731,
        "coID": 1318,
        "gbid": "lent4thu",
        "inVerses": "Ps 104: 1-5, 43-45",
        "coVerses": "Ps 70: 1-2, 3, 5-6, 9, 12, 14, 23"
    },
    "Quad4f": {
        "inID": 572,
        "grID": 547,
        "trID": 425,
        "ofID": 1080,
        "coID": 704,
        "gbid": "lent4fri",
        "inVerses": "Ps 18: 2-7",
        "ofVerses": "Ps 17: 7",
        "coVerses": "Ps 21: 2-3, 22-25"
    },
    "Quad4s": {
        "inID": 776,
        "grID": 818,
        "ofID": 223,
        "coID": 278,
        "gbid": "lent4sat",
        "inVerses": "Ps 77: 2, 3",
        "coVerses": "Ps 22: 3"
    },
    "Quad5": {
        "inID": 78,
        "ofID": 318,
        "coID": 726,
        "trID": 742,
        "grID": 760,
        "gloriaPatri": false,
        "gbid": "lent5",
        "inVerses": "Ps 42: 4-5",
        "ofVerses": "Ps 118: 1-2",
        "coVerses": "Ps 115"
    },
    "Quad5m": {
        "inID": 138,
        "grID": 621,
        "trID": 425,
        "ofID": 848,
        "coID": 81,
        "gloriaPatri": false,
        "gbid": "lent5mon",
        "inVerses": "Ps 55: 9, 13",
        "ofVerses": "Ps 6: 2",
        "coVerses": "Ps 23: 1-7"
    },
    "Quad5t": {
        "inID": 60,
        "grID": 665,
        "ofID": 1328,
        "coID": 433,
        "gloriaPatri": false,
        "gbid": "lent5tue",
        "inVerses": "Ps 26: 1, 2-3, 9-10, 13-14",
        "ofVerses": "Ps 9: 5, 6, 9",
        "coVerses": "Ps 24: 1-3, 17-21"
    },
    "Quad5w": {
        "inID": 1054,
        "grID": 277,
        "trID": 425,
        "ofID": 245,
        "coID": 141,
        "gloriaPatri": false,
        "gbid": "lent5wed",
        "inVerses": "Ps 17: 4, 7",
        "coVerses": "Ps 25: 1-3, 8-9, 11"
    },
    "Quad5h": {
        "inID": 1056,
        "grID": 282,
        "ofID": 812,
        "coID": 696,
        "gloriaPatri": false,
        "gbid": "lent5thu",
        "inVerses": "Ps 118: 2, 22",
        "ofVerses": "Ps 136: 2-4",
        "coVerses": "Ps 118: 1-2, 25, 28, 41, 74, 76, 81-82, 114"
    },
    "Quad5f": {
        "inID": 267,
        "grID": 819,
        "trID": 425,
        "ofID": 408,
        "coID": 1158,
        "gloriaPatri": false,
        "gbid": "lent5fri",
        "inVerses": "Ps 30: 3, 11",
        "coVerses": "Ps 26: 1, 2-3, 9-10, 13-14"
    },
    "Quad5f_sd": {
      "ref": "Sep15",
      "trID": 1156
    },
    "Quad5s": {
        "inID": 267,
        "grID": 819,
        "ofID": 408,
        "coID": 1158,
        "gloriaPatri": false,
        "gbid": "lent5fri",
        "inVerses": "Ps 30: 3, 11",
        "coVerses": "Ps 26: 1, 2-3, 9-10, 13-14"
    },
    "Quad6": {
        "inID": 1171,
        "ofID": 486,
        "coID": 650,
        "trID": 372,
        "grID": 49,
        "gloriaPatri": false,
        "gbid": "lent6",
        "inVerses": "Ps 21: 2-3, 5, 7, 13, 17-18, 22-24, 28, 31",
        "ofVerses": "Ps 68, 2",
        "coVerses": "Ps 21: 2-3, 5, 7, 13, 17-18, 22-24, 28, 31; Ps 115"
    },
    "Quad6_v": {
        "inID": 1171,
        "ofID": 486,
        "coID": 650,
        "trID": 372,
        "grID": 49,
        "gloriaPatri": false,
        "gbid": "lent6",
        "inVerses": "Ps 21: 2-3, 5, 7, 13, 17-18, 22-24, 28, 31",
        "ofVerses": "Ps 68, 2",
        "coVerses": "Ps 21: 2-3, 5, 7, 13, 17-18, 22-24, 28, 31; Ps 115"
    },
    "Quad6m": {
        "inID": 226,
        "grID": 783,
        "trID": 425,
        "ofID": 411,
        "coID": 196,
        "gloriaPatri": false,
        "gbid": "monday_holy_week",
        "inVerses": "Ps 34: 4",
        "coVerses": "Ps 34: 1-5"
    },
    "Quad6t": {
        "inID": 374,
        "grID": 903,
        "ofID": 1322,
        "coID": 397,
        "gloriaPatri": false,
        "gbid": "tuesday_holy_week",
        "inVerses": "Ps 66: 2, 3",
        "coVerses": "Ps 68: 2-3, 16, 24, 31, 35"
    },
    "Quad6t_v": { ref: "Quad6t" },
    "Quad6w": {
        "inID": 236,
        "grID": 1239,
        "trID": 824,
        "ofID": 867,
        "coID": 588,
        "gloriaPatri": false,
        "gbid": "wednesday_holy_week",
        "inVerses": "Ps 101: 3",
        "coVerses": "Ps 101: 2-3, 5, 18"
    },
    "Quad6w_v": { ref: "Quad6w" },
    "Quad6h-lotio": { extraChants: true, kyrie: false, gloria: false, credo: false, agnus: false, sanctus: false, ite: false, asperges: false, preface: false },
    "Quad6h": {
        "extraChants": true,
        "inID": 374,
        "grID": 873,
        "ofID": 47,
        "coID": 140,
        "credo": false,
        "gloria": true,
        "gloriaPatri": false,
        "ite": "benedicamus",
        "agnusReplace": [/d[oó](\([^)]+\))na(\([^)]+\))\s+n[oó](\([^)]+\))bis(\([^)]+\))\s+p[aá](\([^)]+\))cem\.?(\([^)]+\))/gi, 'mi$1se$2ré$3re$4 no$5bis.$6'],
        "gbid": "maundy_thursday",
        "inVerses": "Ps 66: 3, 4",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 22; Ps 71; Ps 103; Ps 150"
    },
    "Quad6h_v": {
        "extraChants": true,
        "inID": 374,
        "grID": 873,
        "ofID": 47,
        "coID": 140,
        "gloria": true,
        "gloriaPatri": false,
        "gbid": "maundy_thursday",
        "inVerses": "Ps 66: 2, 3",
        "ofVerses": "Ps 117: 5, 7",
        "coVerses": "Ps 22; Ps 71; Ps 103; Ps 150"
    },
    "Quad6f": {
        "extraChants": true,
        "ordinary": false
    },
    "Quad6f_v": {
        "extraChants": true,
        "ordinary": false
    },
    "Quad6s": {
        "extraChants": true,
        "gloria": true,
        "credo": false,
        "agnus": false,
        "ite": false,
        "asperges": false
    },
    "Quad6s_v": {
        "extraChants": true,
        "gloria": true,
        "credo": false,
        "agnus": false,
        "ite": false,
        "asperges": false
    },
    "Apr11": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_leo_i",
        "ref": "mass_holy_pope"
    },
    "Apr11Quad": {
        "trID": 1085,
        "coID": 509,
        "grID": 1119,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_leo_i",
        "ref": "mass_holy_pope"
    },
    "Apr11Pasch": {
        "coID": 509,
        "grID": 228,
        "alID": 548,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_leo_i",
        "ref": "mass_holy_pope"
    },
    "Apr13": {
        "coID": 89,
        "grID": 153,
        "alID": 1249,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_hermenegild",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Apr13Quad": {
        "coID": 89,
        "grID": 153,
        "trID": 176,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_hermenegild",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Apr13Pasch": {
        "coID": 617,
        "grID": 762,
        "alID": 1249,
        "inID": 340,
        "ofID": 1382,
        "gbid": "st_hermenegild",
        "ref": "mass_one_martyr"
    },
    "Apr14": {
        "coID": 400,
        "grID": 1345,
        "alID": 289,
        "inID": 831,
        "ofID": 285,
        "gbid": "st_justin",
        "inVerses": "Ps 118: 1-2, 39, 45, 77, 99-100, 143",
        "coVerses": "Sap 3: 1-3, 5, 8-9"
    },
    "Apr14Quad": {
        "coID": 400,
        "grID": 1345,
        "trID": 969,
        "inID": 831,
        "ofID": 285,
        "gbid": "st_justin",
        "inVerses": "Ps 118: 1-2, 39, 45, 77, 99-100, 143",
        "coVerses": "Sap 3: 1-3, 5, 8-9"
    },
    "Apr14Pasch": {
        "coID": 400,
        "grID": 334,
        "alID": 289,
        "inID": 831,
        "ofID": 285,
        "gbid": "st_justin",
        "inVerses": "Ps 118: 1-2, 39, 45, 77, 99-100, 143",
        "coVerses": "Sap 3: 1-3, 5, 8-9"
    },
    "Apr17": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_anicetus",
        "ref": "mass_holy_pope"
    },
    "Apr17Quad": {
        "trID": 1085,
        "coID": 509,
        "grID": 1119,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_anicetus",
        "ref": "mass_holy_pope"
    },
    "Apr17Pasch": {
        "coID": 509,
        "grID": 228,
        "alID": 548,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_anicetus",
        "ref": "mass_holy_pope"
    },
    "Apr2": {
        "coID": 1337,
        "grID": 511,
        "alID": 765,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_francis_of_paula",
        "ref": "mass_ii_confessor_not_bishop"
    },
    "Apr2Quad": {
        "trID": 7670,
        "coID": 1337,
        "grID": 511,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_francis_of_paula",
        "ref": "mass_ii_confessor_not_bishop"
    },
    "Apr2Pasch": {
        "coID": 1337,
        "grID": 765,
        "alID": 1207,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_francis_of_paula",
        "ref": "mass_ii_confessor_not_bishop"
    },
    "Apr21": {
        "coID": 1008,
        "grID": 511,
        "alID": 14,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_anselm",
        "ref": "mass_doctors"
    },
    "Apr21Pasch": {
        "coID": 1008,
        "grID": 14,
        "alID": 1207,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_anselm",
        "ref": "mass_doctors"
    },
    "Apr22": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "ss_soter_caius",
        "ref": "mass_holy_pope"
    },
    "Apr22Pasch": {
        "coID": 509,
        "grID": 228,
        "alID": 548,
        "inID": 674,
        "ofID": 358,
        "gbid": "ss_soter_caius",
        "ref": "mass_holy_pope"
    },
    "Apr23": {
        "coID": 89,
        "grID": 153,
        "alID": 1249,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_george",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Apr23Quad": {
        "coID": 89,
        "grID": 153,
        "trID": 176,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_george",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Apr23Pasch": {
        "coID": 617,
        "grID": 762,
        "alID": 1249,
        "inID": 340,
        "ofID": 1382,
        "gbid": "st_george",
        "ref": "mass_one_martyr"
    },
    "Apr28": {
        "coID": 732,
        "grID": 476,
        "alID": 1073,
        "inID": 775,
        "ofID": 773,
        "gbid": "st_paul_cross"
    },
    "Apr30": {
        "coID": 1301,
        "grID": 208,
        "alID": 406,
        "inID": 629,
        "ofID": 1333,
        "gbid": "st_catherine_of_sienna",
        "ref": "mass_i_virgin_not_martyr"
    },
    "Apr4": {
        "coID": 1008,
        "grID": 511,
        "alID": 14,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_isidore",
        "ref": "mass_doctors"
    },
    "Apr4Quad": {
        "trID": 7670,
        "coID": 1008,
        "grID": 511,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_isidore",
        "ref": "mass_doctors"
    },
    "Apr4Pasch": {
        "coID": 1008,
        "grID": 14,
        "alID": 1207,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_isidore",
        "ref": "mass_doctors"
    },
    "Apr5": {
        "coID": 1154,
        "grID": 34,
        "alID": 724,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_vincent_ferrer",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Apr5Quad": {
        "trID": 7670,
        "coID": 1154,
        "grID": 34,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_vincent_ferrer",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Apr5Pasch": {
        "coID": 1154,
        "grID": 724,
        "alID": 14,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_vincent_ferrer",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Aug1": {
        "coID": 699,
        "grID": 614,
        "alID": 32,
        "inID": 788,
        "ofID": 33,
        "gbid": "holy_machabees",
        "coVerses": "Ps 118: 1, 78, 84, 86, 95, 150, 153, 157, 161, 173"
    },
    Aug1a: {
        inID: 478,
        grID: 307,
        coID: 509,
        alID: 16,
        ofID: 1319
    },
    "Aug9": {
        "inID": 544,
        "grID": 1212,
        "ofID": 185,
        "coID": 89,
        "gbid": "st_lawrence_vigil",
        "inVerses": "Ps 111: 2-3",
        "coVerses": "Ps 111: 1-7, 9-10"
    },
    "Aug10": {
        "coID": 685,
        "grID": 1027,
        "alID": 1122,
        "inID": 956,
        "ofID": 105,
        "gbid": "st_lawrence",
        "inVerses": "Ps 95: 2-3",
        "coVerses": "Ps 16: 1-4, 9-12, 15"
    },
    "Aug11": {
        "coID": 1002,
        "grID": 1009,
        "alID": 590,
        "inID": 737,
        "ofID": 835,
        "gbid": "ss_tiburtius_suzanna",
        "ref": "mass_iii_two_or_more_martyr"
    },
    "Aug14": {
        "inID": 124,
        "grID": 392,
        "ofID": 567,
        "coID": 160,
        "gbid": "assumption_bvm_vigil",
        "inVerses": "Ps 44: 5, 8"
    },
    "Aug15": {
        "coID": 286,
        "grID": 1000,
        "alID": 960,
        "inID": 23,
        "ofID": 1083,
        "gbid": "assumption_bvm",
        "inVerses": "Ps 97: 2-3"
    },
    "Aug16": {
        "coID": 1008,
        "grID": 1212,
        "alID": 821,
        "inID": 544,
        "ofID": 407,
        "gbid": "st_joachim",
        "inVerses": "Ps 111: 2-3",
        "coVerses": "Ps 111: 1-9"
    },
    "Aug2": {
        "coID": 1196,
        "grID": 73,
        "alID": 1094,
        "inID": 214,
        "ofID": 1116,
        "gbid": "st_alphonsus_mary_liguori",
        "coVerses": "Ps 91: 2-3, 5-6, 13-14"
    },
    "Aug22": {
        "coID": 982,
        "grID": 778,
        "alID": 881,
        "inID": 1110,
        "ofID": 1045,
        "gbid": "immaculate_heart_bvm",
        "coVerses": "Luc 1: 46-55"
    },
    "Aug22Quad": {
        "coID": 982,
        "grID": 778,
        "trID": 793,
        "inID": 1110,
        "ofID": 1045,
        "gbid": "immaculate_heart_bvm",
        "coVerses": "Luc 1: 46-55"
    },
    "Aug22Pasch": {
        "coID": 982,
        "grID": 881,
        "alID": 460,
        "inID": 1110,
        "ofID": 1045,
        "gbid": "immaculate_heart_bvm",
        "coVerses": "Luc 1: 46-55"
    },
    "Aug24": {
        "coID": 97,
        "grID": 307,
        "alID": 442,
        "inID": 475,
        "ofID": 499,
        "gbid": "st_bartholomew",
        "inVerses": "Ps 138: 2-6",
        "coVerses": "Ps 138: 1-6, 17-18, 23-24"
    },
    "Aug27": {
        "coID": 643,
        "grID": 511,
        "alID": 724,
        "inID": 695,
        "ofID": 1331,
        "gbid": "st_joseph_calasanctius",
        "inVerses": "Ps 33",
        "coVerses": "Ps 33"
    },
    "Aug28": {
        "coID": 1008,
        "grID": 511,
        "alID": 1350,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_augustine",
        "ref": "mass_doctors"
    },
    "Aug29": {
        "coID": 586,
        "grID": 34,
        "alID": 1207,
        "inID": 410,
        "ofID": 667,
        "gbid": "beheading_st_john_baptist",
        "inVerses": "Ps 91: 3, 13",
        "coVerses": "Ps 20: 2-3, 5-8, 14"
    },
    Aug3: {
        inID: 1321,
        grID: 906,
        alID: 561,
        ofID: 462,
        coID: 920
    },
    "Aug4": {
        "coID": 1008,
        "grID": 34,
        "alID": 1207,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_dominic",
        "inVerses": "Ps 36: 3, 26",
        "coVerses": "Ps 111: 1-9"
    },
    "Aug6": {
        "coID": 885,
        "grID": 1308,
        "alID": 1124,
        "inID": 326,
        "ofID": 125,
        "gbid": "transfiguration",
        "inVerses": "Ps 83: 3-4",
        "coVerses": "Ps 44: 2-8, 18"
    },
    "Dec12": {
        "coID": 1133,
        "grID": 468,
        "alID": 232,
        "inID": 1140,
        "ofID": 7,
        "gbid": "our_lady_of_guadalupe",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 147"
    },
    "Dec13": {
        "coID": 1292,
        "grID": 394,
        "alID": 1076,
        "inID": 629,
        "ofID": 1107,
        "gbid": "st_lucy"
    },
    "Dec16": {
        "coID": 586,
        "grID": 1206,
        "alID": 1118,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_eusebius_bm",
        "ref": "mass_ii_martyr_bishop"
    },
    "Dec2": {
        "coID": 844,
        "grID": 1373,
        "alID": 500,
        "inID": 938,
        "ofID": 177,
        "gbid": "st_bibiana",
        "ref": "mass_ii_virgin_martyr"
    },
    Dec20: {
        inID: 163,
        grID: 34,
        ofID: 407,
        coID: 365,
        "gbid": "mass_vigil_apostle"
    },
    "Dec21": {
        "coID": 589,
        "grID": 148,
        "alID": 216,
        "inID": 475,
        "ofID": 570,
        "gbid": "st_thomas",
        "inVerses": "Ps 138: 2-6",
        "coVerses": "Ps 125"
    },
    "Dec26": {
        "coID": 920,
        "grID": 906,
        "alID": 561,
        "inID": 1321,
        "ofID": 462,
        "gbid": "st_stephen",
        "inVerses": "Ps 110: 2-10",
        "coVerses": "Ps 118: 1, 78, 84, 86, 95, 150, 153, 157, 161, 173"
    },
    "Dec27": {
        "coID": 781,
        "grID": 702,
        "alID": 914,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_john",
        "inVerses": "Ps 91: 13-14",
        "ofVerses": "Ps 91: 2",
        "coVerses": "Ps 88: 2, 4-5, 6, 8, 20-22, 25"
    },
    "Dec28": {
        "coID": 136,
        "grID": 432,
        "alID": 661,
        "inID": 350,
        "ofID": 1031,
        "gbid": "holy_innocents",
        "inVerses": "Ps 8: 2, 8",
        "coVerses": "Ps 78: 1-6"
    },
    "Dec29": {
        "coID": 556,
        "grID": 235,
        "alID": 1220,
        "inID": 74,
        "ofID": 487,
        "gbid": "st_thomas_becket",
        "inVerses": "Ps 32: 2-4, 12-15, 18",
        "coVerses": "Ps 22"
    },
    "Dec3": {
        "coID": 1154,
        "grID": 34,
        "alID": 724,
        "inID": 115,
        "ofID": 630,
        "gbid": "st_francis_xavier"
    },
    "Dec4": {
        "coID": 383,
        "grID": 235,
        "alID": 477,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_peter_chrysologus",
        "inVerses": "Ps 91: 13-14",
        "ofVerses": "Ps 91: 2",
        "coVerses": "Ps 118: 1-2, 14, 24, 30, 48, 99-100, 129-130"
    },
    "Dec6": {
        "coID": 317,
        "grID": 827,
        "alID": 946,
        "inID": 456,
        "ofID": 630,
        "gbid": "st_nicholas"
    },
    "Dec7": {
        "coID": 317,
        "grID": 235,
        "alID": 1187,
        "inID": 233,
        "ofID": 630,
        "gbid": "st_ambrose",
        "inVerses": "Ps 91: 13-14"
    },
    "Dec8": {
        "coID": 1004,
        "grID": 713,
        "alID": 1057,
        "inID": 622,
        "ofID": 210,
        "gbid": "immaculate_conception_bvm",
        "inVerses": "Ps 29: 4, 5",
        "coVerses": "Luc 1: 46-55"
    },
    "Feb1": {
        "coID": 368,
        "grID": 235,
        "alID": 1162,
        "inID": 178,
        "ofID": 407,
        "gbid": "st_ignatius",
        "inVerses": "Ps 131: 9, 16",
        "coVerses": "Ps 149: 1-6"
    },
    "Feb1Quad": {
        "trID": 176,
        "coID": 368,
        "grID": 235,
        "inID": 178,
        "ofID": 407,
        "gbid": "st_ignatius",
        "inVerses": "Ps 131: 9, 16",
        "coVerses": "Ps 149: 1-6"
    },
    "Feb10": {
        "coID": 1301,
        "grID": 174,
        "alID": 208,
        "inID": 629,
        "ofID": 1333,
        "gbid": "st_scholastica",
        "ref": "mass_i_virgin_not_martyr"
    },
    "Feb10Quad": {
        "trID": 738,
        "coID": 1301,
        "grID": 174,
        "inID": 629,
        "ofID": 1333,
        "gbid": "st_scholastica",
        "ref": "mass_i_virgin_not_martyr"
    },
    "Feb11": {
        "coID": 80,
        "grID": 27,
        "alID": 1258,
        "inID": 5,
        "ofID": 234,
        "gbid": "apparition_lourdes",
        "inVerses": "Ps 44: 5",
        "coVerses": "Ps 64: 2-9, 10-14"
    },
    "Feb11Quad": {
        "trID": 485,
        "coID": 80,
        "grID": 27,
        "inID": 5,
        "ofID": 234,
        "gbid": "apparition_lourdes",
        "inVerses": "Ps 44: 5",
        "coVerses": "Ps 64: 2-9, 10-14"
    },
    "Feb12": {
        "coID": 470,
        "grID": 1084,
        "alID": 706,
        "inID": 312,
        "ofID": 1275,
        "gbid": "ss_seven_holy_founders_servites",
        "coVerses": "Ps 88: 2, 4, 6, 20-22, 25, 29"
    },
    "Feb12Quad": {
        "trID": 305,
        "coID": 470,
        "grID": 1084,
        "inID": 312,
        "ofID": 1275,
        "gbid": "ss_seven_holy_founders_servites",
        "coVerses": "Ps 88: 2, 4, 6, 20-22, 25, 29"
    },
    "Feb14": {
        "coID": 89,
        "grID": 153,
        "alID": 1249,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_valentine",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Feb14Quad": {
        "trID": 176,
        "coID": 89,
        "grID": 153,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_valentine",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Feb15": {
        "coID": 1002,
        "grID": 1009,
        "alID": 590,
        "inID": 737,
        "ofID": 835,
        "gbid": "ss_faustinus_jovita",
        "ref": "mass_iii_two_or_more_martyr"
    },
    "Feb15Quad": {
        "trID": 305,
        "coID": 1002,
        "grID": 1009,
        "inID": 737,
        "ofID": 835,
        "gbid": "ss_faustinus_jovita",
        "ref": "mass_iii_two_or_more_martyr"
    },
    "Feb2": {
        "coID": 803,
        "grID": 50,
        "alID": 429,
        "inID": 1254,
        "ofID": 177,
        "gbid": "purification_bvm",
        "inVerses": "Ps 47: 3, 12",
        "ofVerses": "Ps 44: 5",
        "coVerses": "Luc 2: 29-32"
    },
    "Feb2Quad": {
        "trID": 1346,
        "coID": 803,
        "grID": 50,
        "inID": 1254,
        "ofID": 177,
        "gbid": "purification_bvm",
        "inVerses": "Ps 47: 3, 12",
        "ofVerses": "Ps 44: 5",
        "coVerses": "Luc 2: 29-32"
    },
    "Feb24or25": {
        "trID": 176,
        "coID": 1028,
        "grID": 148,
        "inID": 475,
        "ofID": 1319,
        "gbid": "st_matthias",
        "inVerses": "Ps 138: 2-6",
        "ofVerses": "Ps 44: 2",
        "coVerses": "Ps 125"
    },
    "Feb27or28": {
        "coID": 164,
        "grID": 1291,
        "alID": 791,
        "inID": 1025,
        "ofID": 1193,
        "gbid": "st_gabriel_our_lady_of_sorrows",
        "inVerses": "Ps 72: 25, 28",
        "coVerses": "Ps 20: 2-7"
    },
    "Feb27or28Quad": {
        "trID": 728,
        "coID": 164,
        "grID": 1291,
        "inID": 1025,
        "ofID": 1193,
        "gbid": "st_gabriel_our_lady_of_sorrows",
        "inVerses": "Ps 72: 25, 28",
        "coVerses": "Ps 20: 2-7"
    },
    "Feb3": {
        "coID": 586,
        "grID": 1206,
        "alID": 1118,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_blaise",
        "ref": "mass_ii_martyr_bishop"
    },
    "Feb3Quad": {
        "trID": 7670,
        "coID": 586,
        "grID": 1206,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_blaise",
        "ref": "mass_ii_martyr_bishop"
    },
    "Feb4": {
        "coID": 1008,
        "grID": 235,
        "alID": 477,
        "inID": 456,
        "ofID": 779,
        "gbid": "st_andrew_corsini",
        "ref": "mass_i_confessor_bishop"
    },
    "Feb4Quad": {
        "trID": 7670,
        "coID": 1008,
        "grID": 235,
        "inID": 456,
        "ofID": 779,
        "gbid": "st_andrew_corsini",
        "ref": "mass_i_confessor_bishop"
    },
    "Feb5": {
        "coID": 454,
        "grID": 1373,
        "alID": 642,
        "inID": 1183,
        "ofID": 768,
        "gbid": "st_agatha",
        "inVerses": "Ps 44: 5",
        "coVerses": "Ps 108: 2-3, 5, 21, 25-26, 30-31"
    },
    "Feb5Quad": {
        "trID": 305,
        "coID": 454,
        "grID": 1373,
        "inID": 1183,
        "ofID": 768,
        "gbid": "st_agatha",
        "inVerses": "Ps 44: 5",
        "coVerses": "Ps 108: 2-3, 5, 21, 25-26, 30-31"
    },
    "Feb7": {
        "coID": 1008,
        "grID": 600,
        "alID": 946,
        "inID": 1374,
        "ofID": 722,
        "gbid": "st_romuald",
        "ref": "mass_abbots"
    },
    "Feb7Quad": {
        "trID": 7670,
        "coID": 1008,
        "grID": 600,
        "inID": 1374,
        "ofID": 722,
        "gbid": "st_romuald",
        "ref": "mass_abbots"
    },
    "Jan11": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_hyginus",
        "ref": "mass_holy_pope"
    },
    "Jan13": {
        "coID": 918,
        "grID": 205,
        "alID": 524,
        "inID": 403,
        "ofID": 1147,
        "gbid": "epiphany_baptism",
        "ref": "epiphany"
    },
    "Jan14": {
        "coID": 1008,
        "grID": 511,
        "alID": 14,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_hilary",
        "ref": "mass_doctors"
    },
    "Jan15": {
        "coID": 617,
        "grID": 34,
        "alID": 1207,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_paul_hermit",
        "inVerses": "Ps 91: 3, 5",
        "coVerses": "Ps 63: 2-7"
    },
    "Jan17": {
        "coID": 1008,
        "grID": 600,
        "alID": 946,
        "inID": 1374,
        "ofID": 722,
        "gbid": "st_anthony",
        "ref": "mass_abbots"
    },
    "Jan18": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 456,
        "ofID": 1234,
        "gbid": "st_peter_chair_rome"
    },
    "Jan18Quad": {
        "trID": 1029,
        "coID": 509,
        "grID": 1119,
        "inID": 456,
        "ofID": 1234,
        "gbid": "st_peter_chair_rome"
    },
    "Jan20": {
        "coID": 902,
        "grID": 888,
        "alID": 106,
        "inID": 261,
        "ofID": 786,
        "gbid": "st_fabian_st_sebastian",
        "inVerses": "Ps 78: 2-3",
        "coVerses": "Ps 78: 1-4, 10-11"
    },
    "Jan20Quad": {
        "trID": 305,
        "coID": 902,
        "grID": 888,
        "inID": 261,
        "ofID": 786,
        "gbid": "st_fabian_st_sebastian",
        "inVerses": "Ps 78: 2-3",
        "coVerses": "Ps 78: 1-4, 10-11"
    },
    "Jan21": {
        "coID": 1301,
        "grID": 947,
        "alID": 301,
        "inID": 938,
        "ofID": 1107,
        "gbid": "st_agnes",
        "inVerses": "Ps 118: 2, 39, 45, 77, 99-100, 143"
    },
    "Jan21Quad": {
        "trID": 256,
        "coID": 1301,
        "grID": 947,
        "inID": 938,
        "ofID": 1107,
        "gbid": "st_agnes",
        "inVerses": "Ps 118: 2, 39, 45, 77, 99-100, 143"
    },
    "Jan22": {
        "coID": 658,
        "grID": 888,
        "alID": 1250,
        "inID": 261,
        "ofID": 919,
        "gbid": "ss_vincent_anastasius",
        "ref": "mass_i_two_or_more_martyr"
    },
    "Jan22Quad": {
        "trID": 305,
        "coID": 658,
        "grID": 888,
        "inID": 261,
        "ofID": 919,
        "gbid": "ss_vincent_anastasius",
        "ref": "mass_i_two_or_more_martyr"
    },
    "Jan23": {
        "coID": 1154,
        "grID": 34,
        "alID": 724,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_raymond_of_pennafort",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Jan23Quad": {
        "trID": 7670,
        "coID": 1154,
        "grID": 34,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_raymond_of_pennafort",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Jan24": {
        "coID": 317,
        "grID": 827,
        "alID": 477,
        "inID": 456,
        "ofID": 630,
        "gbid": "st_timothy",
        "ref": "mass_i_martyr_bishop"
    },
    "Jan24Quad": {
        "trID": 176,
        "coID": 317,
        "grID": 827,
        "inID": 456,
        "ofID": 630,
        "gbid": "st_timothy",
        "ref": "mass_i_martyr_bishop"
    },
    "Jan25": {
        "coID": 1337,
        "grID": 1347,
        "alID": 466,
        "inID": 1179,
        "ofID": 499,
        "gbid": "conversion_st_paul",
        "inVerses": "Ps 138: 3, 6",
        "coVerses": "Ps 138: 1-6, 17"
    },
    "Jan25Quad": {
        "trID": 884,
        "coID": 1337,
        "grID": 1347,
        "inID": 1179,
        "ofID": 499,
        "gbid": "conversion_st_paul",
        "inVerses": "Ps 138: 3, 6",
        "coVerses": "Ps 138: 1-6, 17"
    },
    "Jan26": {
        "coID": 586,
        "grID": 1206,
        "alID": 1118,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_polycarp",
        "ref": "mass_ii_martyr_bishop"
    },
    "Jan26Quad": {
        "trID": 7670,
        "coID": 586,
        "grID": 1206,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_polycarp",
        "ref": "mass_ii_martyr_bishop"
    },
    "Jan27": {
        "coID": 1008,
        "grID": 235,
        "alID": 724,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_john_chrysostom",
        "inVerses": "Ps 91: 13-14",
        "ref": "mass_doctors",
        "ofVerses": "Ps 91: 2"
    },
    "Jan27Quad": {
        "trID": 7670,
        "coID": 1008,
        "grID": 235,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_john_chrysostom",
        "inVerses": "Ps 91: 13-14",
        "ref": "mass_doctors",
        "ofVerses": "Ps 91: 2"
    },
    "Jan28": {
        "coID": 1337,
        "grID": 511,
        "alID": 765,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_peter_nolasco",
        "ref": "mass_ii_confessor_not_bishop"
    },
    "Jan28Quad": {
        "trID": 7670,
        "coID": 1337,
        "grID": 511,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_peter_nolasco",
        "ref": "mass_ii_confessor_not_bishop"
    },
    "Jan29": {
        "coID": 1008,
        "grID": 511,
        "alID": 14,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_francis_de_sales",
        "ref": "mass_doctors"
    },
    "Jan29Quad": {
        "trID": 7670,
        "coID": 1008,
        "grID": 511,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_francis_de_sales",
        "ref": "mass_doctors"
    },
    "Jan30": {
        "coID": 1032,
        "grID": 394,
        "alID": 208,
        "inID": 510,
        "ofID": 1107,
        "gbid": "st_martina",
        "ref": "mass_i_virgin_martyr"
    },
    "Jan30Quad": {
        "trID": 256,
        "coID": 1032,
        "grID": 394,
        "inID": 510,
        "ofID": 1107,
        "gbid": "st_martina",
        "ref": "mass_i_virgin_martyr"
    },
    "Jan31": {
        "coID": 186,
        "grID": 21,
        "alID": 225,
        "inID": 1018,
        "ofID": 805,
        "gbid": "st_john_bosco",
        "inVerses": "Ps 112: 2-3",
        "coVerses": "Ps 19: 2-5, 7-8"
    },
    "Jan31Quad": {
        "trID": 837,
        "coID": 186,
        "grID": 21,
        "inID": 1018,
        "ofID": 805,
        "gbid": "st_john_bosco",
        "inVerses": "Ps 112: 2-3",
        "coVerses": "Ps 19: 2-5, 7-8"
    },
    "Jan5": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_telesphorus",
        "ref": "mass_holy_pope"
    },
    "Jan5a": {
        inID: 564,
        grID: 1308,
        ofID: 979,
        coID: 1282,
        alID: 714
    },
    "Jul1": {
        "coID": 1019,
        "grID": 1263,
        "alID": 1038,
        "inID": 123,
        "ofID": 320,
        "gbid": "precious_blood",
        "inVerses": "Ps 88: 6, 8",
        "coVerses": "Ps 115"
    },
    Jul3a: {
        coID: 509,
        grID: 1119,
        alID: 228,
        inID: 674,
        ofID: 358,
        gbid: "st_pius_i",
        ref: "mass_holy_pope"
    },
    "Jul10": {
        "coID": 957,
        "grID": 432,
        "alID": 32,
        "inID": 87,
        "ofID": 1031,
        "gbid": "ss_seven_brothers",
        "coVerses": "Ps 33"
    },
    "Jul11": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_pius_i",
        "ref": "mass_holy_pope"
    },
    "Jul11a": {
        "coID": 317,
        "grID": 827,
        "alID": 477,
        "inID": 456,
        "ofID": 630,
        "inVerses": "Ps 131: 9, 16",
        "fromGregorianBooks": [
            "st_timothy",
            "mass_i_martyr_bishop"
        ]
    },
    "Jul14": {
        "coID": 1008,
        "grID": 511,
        "alID": 1187,
        "inID": 233,
        "ofID": 630,
        "gbid": "st_bonaventure",
        "inVerses": "Ps 91: 13-14",
        "coVerses": "Ps 118: 1-2, 14, 24, 30, 48, 99-100, 129-130"
    },
    "Jul16": {
        "coID": 1053,
        "grID": 392,
        "alID": 634,
        "inID": 246,
        "ofID": 787,
        "gbid": "our_blessed_lady_mount_carmel",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "Jul18": {
        "coID": 1126,
        "grID": 511,
        "alID": 765,
        "inID": 785,
        "ofID": 667,
        "gbid": "st_camillus_of_lellis",
        "coVerses": "Ps 33"
    },
    "Jul19": {
        "coID": 1337,
        "grID": 511,
        "alID": 765,
        "inID": 108,
        "ofID": 667,
        "gbid": "st_vincent_de_paul",
        "ref": "mass_ii_confessor_not_bishop"
    },
    "Jul2": {
        "coID": 160,
        "grID": 392,
        "alID": 481,
        "inID": 1140,
        "ofID": 567,
        "gbid": "visitation_bvm",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Luc 1: 46-55"
    },
    "Jul20": {
        "coID": 1014,
        "grID": 75,
        "alID": 569,
        "inID": 1297,
        "ofID": 1362,
        "gbid": "st_jerome_aemilian",
        "coVerses": "Ps 33"
    },
    "Jul22": {
        "coID": 844,
        "grID": 394,
        "alID": 1076,
        "inID": 938,
        "ofID": 1333,
        "gbid": "st_mary_magdalen",
        "inVerses": "Ps 118: 2, 39, 45, 77, 99-100, 143",
        "coVerses": "Ps 118: 1, 78, 81, 113, 115, 120, 163, 166"
    },
    "Jul23": {
        "coID": 383,
        "grID": 827,
        "alID": 1187,
        "inID": 227,
        "ofID": 630,
        "gbid": "st_apollinaris",
        "inVerses": "Dan 3: 58-61",
        "coVerses": "Ps 131: 1, 9-13, 16-18"
    },
    Jul24: {
        inID: 163,
        grID: 34,
        ofID: 407,
        coID: 365
    },
    "Jul25": {
        "coID": 1028,
        "grID": 307,
        "alID": 1030,
        "inID": 475,
        "ofID": 570,
        "gbid": "st_james",
        "inVerses": "Ps 138: 2-6",
        "coVerses": "Ps 115"
    },
    "Jul26": {
        "coID": 900,
        "grID": 394,
        "alID": 1076,
        "inID": 950,
        "ofID": 1333,
        "gbid": "st_ann",
        "inVerses": "Ps 44: 5",
        "coVerses": "Ps 44: 2, 5, 8, 10-13, 15"
    },
    "Jul27": {
        "coID": 685,
        "grID": 764,
        "alID": 1201,
        "inID": 251,
        "ofID": 487,
        "gbid": "st_pantaleon",
        "ref": "mass_ii_martyr_not_bishop"
    },
    "Jul28": {
        "coID": 658,
        "grID": 888,
        "alID": 1250,
        "inID": 261,
        "ofID": 919,
        "gbid": "ss_nazarius_celsus_victor_innocent",
        "ref": "mass_i_two_or_more_martyr"
    },
    "Jul3": {
        "coID": 703,
        "grID": 672,
        "alID": 1015,
        "inID": 1093,
        "ofID": 1300,
        "gbid": "st_irenaeus",
        "coVerses": "Ps 25: 1-3, 8-9, 11"
    },
    "Jul31": {
        "coID": 514,
        "grID": 34,
        "alID": 724,
        "inID": 1295,
        "ofID": 630,
        "gbid": "st_ignatius_of_loyola",
        "coVerses": "Ps 20: 2-7"
    },
    "Jul5": {
        "coID": 201,
        "grID": 155,
        "alID": 96,
        "inID": 1349,
        "ofID": 662,
        "gbid": "st_am_zaccaria",
        "coVerses": "Ps 33: 1, 3-6, 8"
    },
    Jul6: {
        inID: 11,
        grID: 98,
        coID: 209,
        alID: 440,
        ofID: 33
    },
    "Jul7": {
        "coID": 1002,
        "grID": 415,
        "alID": 1187,
        "inID": 48,
        "ofID": 919,
        "gbid": "ss_cyril_methodius",
        "inVerses": "Ps 131: 16-17",
        "coVerses": "Ps 125"
    },
    "Jun1": {
        "coID": 1301,
        "grID": 174,
        "alID": 208,
        "inID": 629,
        "ofID": 1333,
        "gbid": "st_angela_merici",
        "ref": "mass_i_virgin_not_martyr"
    },
    "Jun10": {
        "coID": 799,
        "grID": 947,
        "alID": 406,
        "inID": 619,
        "ofID": 177,
        "gbid": "st_margaret_queen_of_scotland",
        "ref": "mass_holy_woman_not_martyr"
    },
    "Jun11": {
        "coID": 1028,
        "grID": 351,
        "alID": 1030,
        "inID": 475,
        "ofID": 1319,
        "gbid": "st_barnabas",
        "inVerses": "Ps 138: 1-6, 17-18, 23-24",
        "ofVerses": "Ps 44: 2",
        "coVerses": "Ps 125"
    },
    "Jun12": {
        "coID": 1154,
        "grID": 34,
        "alID": 724,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_john_of_san_facundo",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Jun14": {
        "coID": 1008,
        "grID": 511,
        "alID": 1350,
        "inID": 233,
        "ofID": 630,
        "gbid": "st_basil_the_great",
        "inVerses": "Ps 91: 13-14",
        "coVerses": "Ps 118: 1-2, 14, 24, 30, 48, 99-100, 129-130"
    },
    "Jun19a": {
        "inID": 271,
        "grID": 888,
        "alID": 32,
        "ofID": 786,
        "coID": 184,
        "gbid": "ss_gervase_protase",
        "inVerses": "Ps 84: 3, 7",
        "coVerses": "Ps 78: 1, 3-6, 13"
    },
    "Jun21": {
        "coID": 711,
        "grID": 1334,
        "alID": 1170,
        "inID": 857,
        "ofID": 1306,
        "gbid": "st_aloysius",
        "inVerses": "Ps 148: 1, 3",
        "coVerses": "Ps 77: 1-3, 4-5, 7, 23-25, 29, 71-72"
    },
    "Jun22": {
        "coID": 1008,
        "grID": 235,
        "alID": 477,
        "inID": 48,
        "ofID": 779,
        "gbid": "st_paulinus",
        "inVerses": "Ps 131: 16-17",
        "coVerses": "Ps 131: 1, 9-13, 16-18"
    },
    "Jun23": {
        "inID": 1141,
        "grID": 424,
        "ofID": 407,
        "coID": 365,
        "gbid": "st_john_baptist_vigil",
        "coVerses": "Ps 20: 2-5, 7-9, 14"
    },
    "Jun24": {
        "coID": 133,
        "grID": 647,
        "alID": 847,
        "inID": 659,
        "ofID": 777,
        "gbid": "st_john_baptist",
        "inVerses": "Ps 91: 3, 5",
        "ofVerses": "Ps 91: 2",
        "coVerses": "Luc 1: 68-79"
    },
    "Jun26": {
        "coID": 658,
        "grID": 614,
        "alID": 32,
        "inID": 248,
        "ofID": 1375,
        "gbid": "ss_john_paul",
        "coVerses": "Sap 3: 1-3, 5, 8-9"
    },
    "Jun28": {
      "inID": 1366,
      "grID": 351,
      "ofID": 499,
      "coID": 846,
      "gbid": "ss_peter_paul_vigil"
     },
    "Jun29": {
        "coID": 509,
        "grID": 307,
        "alID": 228,
        "inID": 478,
        "ofID": 1319,
        "gbid": "ss_peter_paul",
        "inVerses": "Ps 138: 17-18",
        "ofVerses": "Ps 44: 2",
        "coVerses": "Ps 138: 1-6, 13-14, 17-18, 23"
    },
    "Jun30": {
        "coID": 1337,
        "grID": 1347,
        "alID": 120,
        "inID": 1179,
        "ofID": 499,
        "gbid": "st_paul",
        "coVerses": "Ps 138: 1-6, 17"
    },
    "Jun4": {
        "coID": 6,
        "grID": 398,
        "alID": 594,
        "inID": 1313,
        "ofID": 777,
        "gbid": "st_francis_caracciolo",
        "ofVerses": "Ps 91: 2",
        "coVerses": "Ps 30: 2-4, 6, 7-8"
    },
    "Jun5": {
        "coID": 1190,
        "grID": 1181,
        "alID": 198,
        "inID": 1224,
        "ofID": 143,
        "gbid": "st_boniface_bm",
        "ofVerses": "Ps 15: 1, 2, 5"
    },
    "Mar10": {
        "trID": 305,
        "coID": 957,
        "grID": 614,
        "inID": 788,
        "ofID": 786,
        "gbid": "forty_martyrs",
        "coVerses": "Ps 33: 1, 11, 17"
    },
    "Mar12": {
        "trID": 1085,
        "coID": 509,
        "grID": 1119,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_gregory_the_great",
        "ref": "mass_holy_pope"
    },
    "Mar17": {
        "trID": 7670,
        "coID": 1008,
        "grID": 235,
        "inID": 456,
        "ofID": 779,
        "gbid": "st_patrick",
        "ref": "mass_i_confessor_bishop"
    },
    "Mar19": {
        "coID": 139,
        "grID": 600,
        "alID": 14,
        "inID": 108,
        "ofID": 630,
        "gbid": "st_joseph",
        "inVerses": "Ps 91: 3, 5",
        "coVerses": "Ps 111: 1-9"
    },
    "Mar19Quad": {
        "trID": 7670,
        "coID": 139,
        "grID": 600,
        "inID": 108,
        "ofID": 630,
        "gbid": "st_joseph",
        "inVerses": "Ps 91: 3, 5",
        "coVerses": "Ps 111: 1-9"
    },
    "Mar19Pasch": {
        "coID": 139,
        "grID": 14,
        "alID": 1207,
        "inID": 108,
        "ofID": 630,
        "gbid": "st_joseph",
        "inVerses": "Ps 91: 3, 5",
        "coVerses": "Ps 111: 1-9"
    },
    "Mar21": {
        "trID": 7670,
        "coID": 1008,
        "grID": 600,
        "inID": 1374,
        "ofID": 722,
        "gbid": "st_benedict",
        "ref": "mass_abbots"
    },
    "Mar24": {
        "trID": 266,
        "coID": 1127,
        "grID": 609,
        "inID": 985,
        "ofID": 302,
        "gbid": "st_gabriel",
        "inVerses": "Ps 102: 21-22",
        "ofVerses": "Ps 137: 1, 2",
        "coVerses": "Dan 3: 57, 60-65, 83-87",
        "coVersesGloriaPatri": false
    },
    "Mar25": {
        "coID": 1144,
        "grID": 947,
        "alID": 1209,
        "inID": 124,
        "ofID": 843,
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16; Ps 18: 2-7"
    },
    "Mar25Quad": {
        "trID": 738,
        "coID": 1144,
        "grID": 947,
        "inID": 124,
        "ofID": 843,
        "gbid": "annunciation_bvm",
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16; Ps 18: 2-7"
    },
    "Mar25Pasch": {
        "coID": 1144,
        "grID": 1209,
        "alID": 281,
        "inID": 124,
        "ofID": 843,
        "gbid": "annunciation_bvm",
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16; Ps 18: 2-7"
    },
    "Mar27": {
        "trID": 35,
        "coID": 601,
        "grID": 306,
        "inID": 656,
        "ofID": 166,
        "gbid": "st_john_damascene",
        "inVerses": "Ps 72: 25, 28",
        "coVerses": "Ps 36: 1, 3, 16, 18-19, 23, 27-28, 29, 34"
    },
    "Mar28": {
        "trID": 250,
        "coID": 877,
        "grID": 370,
        "inID": 52,
        "ofID": 244,
        "gbid": "st_john_capistran",
        "coVerses": "Ps 77: 1, 3, 4, 23-25, 27-28"
    },
    "Mar6": {
        "trID": 256,
        "coID": 1292,
        "grID": 394,
        "inID": 938,
        "ofID": 177,
        "gbid": "ss_perpetua_felicity",
        "ref": "mass_holy_woman_martyr"
    },
    "Mar7": {
        "trID": 7670,
        "coID": 1008,
        "grID": 511,
        "inID": 233,
        "ofID": 777,
        "gbid": "st_thomas_aquinas",
        "ref": "mass_doctors"
    },
    "Mar8": {
        "trID": 7670,
        "coID": 1154,
        "grID": 34,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_john_of_god",
        "ref": "mass_i_confessor_not_bishop"
    },
    "Mar9": {
        "trID": 256,
        "coID": 799,
        "grID": 947,
        "inID": 619,
        "ofID": 177,
        "gbid": "st_frances_of_rome",
        "ref": "mass_holy_woman_not_martyr"
    },
    "May1": {
        "coID": 28,
        "grID": 1344,
        "alID": 213,
        "inID": 646,
        "ofID": 26,
        "gbid": "st_joseph_workman",
        "inVerses": "Ps 126: 2",
        "coVerses": "Ps 103: 1-2, 23-24, 30-31, 33-35"
    },
    "May1Quad": {
        "coID": 28,
        "grID": 1344,
        "trID": 444,
        "inID": 646,
        "ofID": 26,
        "gbid": "st_joseph_workman",
        "inVerses": "Ps 126: 2",
        "coVerses": "Ps 103: 1-2, 23-24, 30-31, 33-35"
    },
    "May1Pasch": {
        "coID": 28,
        "grID": 1324,
        "alID": 213,
        "inID": 646,
        "ofID": 26,
        "gbid": "st_joseph_workman",
        "inVerses": "Ps 126: 2",
        "coVerses": "Ps 103: 1-2, 23-24, 30-31, 33-35"
    },
    "May10": {
        "coID": 1008,
        "grID": 235,
        "alID": 477,
        "inID": 456,
        "ofID": 779,
        "gbid": "st_antoninus",
        "ref": "mass_i_confessor_bishop"
    },
    "May11": {
        "coID": 921,
        "grID": 307,
        "alID": 1101,
        "inID": 469,
        "ofID": 1382,
        "gbid": "ss_philip_james",
        "inVerses": "Ps 32: 2-4, 12-15, 18",
        "coVerses": "Ps 32: 1-3, 6, 12-13, 18"
    },
    "May11Quad": {
        "coID": 921,
        "grID": 307,
        "trID": 305,
        "inID": 469,
        "ofID": 1382,
        "gbid": "ss_philip_james",
        "inVerses": "Ps 32: 2-4, 12-15, 18",
        "coVerses": "Ps 32: 1-3, 6, 12-13, 18"
    },
    "May11Pasch": {
        "coID": 921,
        "grID": 762,
        "alID": 1101,
        "inID": 469,
        "ofID": 1382,
        "gbid": "ss_philip_james",
        "inVerses": "Ps 32: 2-4, 12-15, 18",
        "coVerses": "Ps 32: 1-3, 6, 12-13, 18"
    },
    "May12": {
        "coID": 772,
        "grID": 32,
        "alID": 590,
        "inID": 1222,
        "ofID": 1382,
        "gbid": "ss_nereus_achilleus_domitia_pancras",
        "coVerses": "Ps 32: 2-4, 12-15, 18"
    },
    "May13": {
        "coID": 559,
        "grID": 235,
        "alID": 1189,
        "inID": 233,
        "ofID": 102,
        "gbid": "st_robert_bellarmine",
        "inVerses": "Ps 91: 13-14",
        "coVerses": "Ps 91: 2-3, 5-6, 13-14"
    },
    "May13Quad": {
        "coID": 559,
        "grID": 235,
        "trID": 1063,
        "inID": 233,
        "ofID": 102,
        "gbid": "st_robert_bellarmine",
        "inVerses": "Ps 91: 13-14",
        "coVerses": "Ps 91: 2-3, 5-6, 13-14"
    },
    "May13Pasch": {
        "coID": 559,
        "grID": 1189,
        "alID": 231,
        "inID": 233,
        "ofID": 102,
        "gbid": "st_robert_bellarmine",
        "inVerses": "Ps 91: 13-14",
        "coVerses": "Ps 91: 2-3, 5-6, 13-14"
    },
    "May15": {
        "coID": 1154,
        "grID": 34,
        "alID": 724,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_john_baptist_de_la_salle",
        "ref": "mass_i_confessor_not_bishop"
    },
    "May15Pasch": {
        "coID": 1154,
        "grID": 724,
        "alID": 14,
        "inID": 1374,
        "ofID": 630,
        "gbid": "st_john_baptist_de_la_salle",
        "ref": "mass_i_confessor_not_bishop"
    },
    "May16": {
        "coID": 1008,
        "grID": 235,
        "alID": 477,
        "inID": 456,
        "ofID": 779,
        "gbid": "st_ubuald",
        "ref": "mass_i_confessor_bishop"
    },
    "May16Pasch": {
        "coID": 1008,
        "grID": 477,
        "alID": 1118,
        "inID": 456,
        "ofID": 779,
        "gbid": "st_ubuald",
        "ref": "mass_i_confessor_bishop"
    },
    "May2": {
        "coID": 1002,
        "grID": 477,
        "alID": 724,
        "inID": 233,
        "ofID": 779,
        "gbid": "st_athanasius",
        "inVerses": "Ps 91: 13-14",
        "coVerses": "Ps 125"
    },
    "May24": {
        "coID": 160,
        "grID": 392,
        "alID": 127,
        "inID": 1140,
        "ofID": 843,
        "gbid": "mass_bvm",
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "May24Pasch": {
        "coID": 160,
        "grID": 281,
        "alID": 1209,
        "inID": 1140,
        "ofID": 843,
        "gbid": "mass_bvm",
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "May26": {
        "coID": 1367,
        "grID": 1022,
        "alID": 194,
        "inID": 530,
        "ofID": 1253,
        "gbid": "st_philip_neri",
        "coVerses": "Ps 83: 2-3, 9-13"
    },
    "May26Pasch": {
        "coID": 1367,
        "grID": 194,
        "alID": 237,
        "inID": 530,
        "ofID": 1253,
        "gbid": "st_philip_neri",
        "coVerses": "Ps 83: 2-3, 9-13"
    },
    "May28": {
        "coID": 1154,
        "grID": 415,
        "alID": 1187,
        "inID": 48,
        "ofID": 630,
        "gbid": "st_augustine_of_canterbury",
        "ref": "mass_ii_confessor_bishop"
    },
    "May28Pasch": {
        "coID": 1154,
        "grID": 1187,
        "alID": 14,
        "inID": 48,
        "ofID": 630,
        "gbid": "st_augustine_of_canterbury",
        "ref": "mass_ii_confessor_bishop"
    },
    "May29": {
        "coID": 1301,
        "grID": 174,
        "alID": 208,
        "inID": 629,
        "ofID": 1333,
        "gbid": "st_mary_magdalene_pazzi",
        "ref": "mass_i_virgin_not_martyr"
    },
    "May29Pasch": {
        "coID": 1301,
        "grID": 208,
        "alID": 406,
        "inID": 629,
        "ofID": 1333,
        "gbid": "st_mary_magdalene_pazzi",
        "ref": "mass_i_virgin_not_martyr"
    },
    "May31": {
        "coID": 1053,
        "grID": 1368,
        "alID": 717,
        "inID": 61,
        "ofID": 719,
        "gbid": "bvm_queen",
        "inVerses": "Ps 44: 11-12",
        "coVerses": "Ps 44"
    },
    "May31Pasch": {
        "coID": 1053,
        "grID": 734,
        "alID": 354,
        "inID": 61,
        "ofID": 719,
        "gbid": "bvm_queen",
        "inVerses": "Ps 44: 11-12",
        "coVerses": "Ps 44"
    },
    May3Pasch: {
        inID: 359,
        grID: 627,
        ofID: 448,
        coID: 346,
        alID: 859
    },
    May3: {
        inID: 359,
        grID: 873,
        alID: 859,
        ofID: 448,
        coID: 346,
    },
    "May4": {
        "coID": 799,
        "grID": 406,
        "alID": 913,
        "inID": 619,
        "ofID": 177,
        "gbid": "st_monica",
        "ref": "mass_holy_woman_not_martyr"
    },
    "May5": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_pius_v",
        "ref": "mass_holy_pope"
    },
    "May5Pasch": {
        "coID": 509,
        "grID": 228,
        "alID": 548,
        "inID": 674,
        "ofID": 358,
        "gbid": "st_pius_v",
        "ref": "mass_holy_pope"
    },
    May6: {
        inID: 340,
        grID: 946,
        ofID: 1382,
        coID: 617,
        alID: 1207
    },
    "Oct31": {
        "inID": 1213,
        "grID": 963,
        "ofID": 33,
        "coID": 209,
        "gbid": "all_saints_vigil"
    },
    "Nov1": {
        "coID": 345,
        "grID": 371,
        "alID": 1237,
        "inID": 752,
        "ofID": 835,
        "gbid": "all_saints",
        "coVerses": "Ps 125"
    },
    "Nov11": {
        "coID": 1154,
        "grID": 235,
        "alID": 988,
        "inID": 456,
        "ofID": 630,
        "gbid": "st_martin",
        "inVerses": "Ps 131: 9, 16",
        "coVerses": "Ps 19: 2-8"
    },
    "Nov14": {
        "coID": 556,
        "grID": 827,
        "alID": 1118,
        "inID": 417,
        "ofID": 401,
        "gbid": "st_josaphat",
        "inVerses": "Ps 32: 2-4, 12-15, 18",
        "coVerses": "Ps 22"
    },
    "Nov2": {
        "ref": "requiem",
        "gbid": "all_souls"
    },
    "Nov5": {
        "inID": 248,
        "inRef": "Ps 33: 20-21, 2",
        "grID": 963,
        "grRef": "Ps 149: 5, 1",
        "alID": 896,
        "alRef": "Ps 67: 4",
        "ofID": 919,
        "ofRef": "Ps 67: 36",
        "coID": 1109,
        "coRef": "Ps 32: 1",
        "gbid": "holy_relics"
    },
    "Nov21": {
        "coID": 160,
        "grID": 392,
        "alID": 127,
        "inID": 1140,
        "ofID": 843,
        "gbid": "presentation_bvm",
        "ref": "mass_bvm"
    },
    "Nov22": {
        "coID": 1032,
        "grID": 840,
        "alID": 301,
        "inID": 510,
        "ofID": 1107,
        "gbid": "st_cecilia",
        "inVerses": "Ps 118: 2-3, 8-9, 26, 59-60, 134, 168",
        "coVerses": "Ps 118: 1, 41, 85, 87, 113, 123, 157, 161, 166, 174"
    },
    "Nov23": {
        "coID": 509,
        "grID": 1119,
        "alID": 228,
        "inID": 409,
        "ofID": 358,
        "gbid": "st_clement",
        "coVerses": "Ps 39: 2-4, 6, 10-11, 14, 17, 18"
    },
    "Nov25": {
        "coID": 1032,
        "grID": 394,
        "alID": 208,
        "inID": 510,
        "ofID": 1107,
        "gbid": "st_catherine",
        "ref": "mass_i_virgin_martyr"
    },
    "Nov26": {
        "coID": 1008,
        "grID": 600,
        "alID": 946,
        "inID": 1374,
        "ofID": 722,
        "gbid": "st_sylvester",
        "ref": "mass_abbots"
    },
    "Nov27": {
        "coID": 1087,
        "grID": 1174,
        "alID": 254,
        "inID": 493,
        "ofID": 687,
        "gbid": "our_lady_miraculous_medal"
    },
    "Nov29a": {
        "inID": 693,
        "grID": 148,
        "ofID": 407,
        "coID": 1021,
        "gbid": "st_andrew_vigil"
    },
    "Nov30": {
        "coID": 552,
        "grID": 307,
        "alID": 984,
        "inID": 475,
        "ofID": 499,
        "gbid": "st_andrew",
        "inVerses": "Ps 138: 2-6",
        "coVerses": "Ps 118: 1, 20, 40, 48, 65, 103, 167, 174"
    },
    "Nov8": {
        "coID": 658,
        "grID": 888,
        "alID": 1250,
        "inID": 261,
        "ofID": 919,
        "gbid": "four_crowned_martyrs",
        "ref": "mass_i_two_or_more_martyr"
    },
    "Nov9": {
        "coID": 43,
        "grID": 651,
        "alID": 242,
        "inID": 923,
        "ofID": 200,
        "gbid": "dedication_arch_basilica_our_saviour",
        "ref": "mass_dedication_church"
    },
    "Oct11": {
        "coID": 160,
        "grID": 471,
        "alID": 1114,
        "inID": 1372,
        "ofID": 910,
        "gbid": "maternity_bvm",
        "inVerses": "Ps 97: 1-2",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "Oct17": {
        "coID": 459,
        "grID": 790,
        "alID": 1307,
        "inID": 1195,
        "ofID": 618,
        "gbid": "ste_marguerite_marie_alacoque",
        "coVerses": "Ps 118: 1, 78, 81, 113, 115, 120, 163, 166"
    },
    "Oct18": {
        "coID": 1028,
        "grID": 351,
        "alID": 1030,
        "inID": 475,
        "ofID": 499,
        "gbid": "st_luke",
        "inVerses": "Ps 138: 2-6",
        "coVerses": "Ps 125; Ps 138"
    },
    "Oct2": {
        "coID": 1127,
        "grID": 834,
        "alID": 784,
        "inID": 985,
        "ofID": 1270,
        "gbid": "guardian_angels",
        "inVerses": "Ps 102: 21-22",
        "coVerses": "Dan 3: 57, 60-65, 83-87",
        "coVersesGloriaPatri": false
    },
    "Oct20": {
        "coID": 1003,
        "grID": 971,
        "alID": 792,
        "inID": 970,
        "ofID": 515,
        "gbid": "st_john_cantius",
        "coVerses": "Ps 33"
    },
    "Oct23": {
        "coID": 1154,
        "grID": 415,
        "alID": 1187,
        "inID": 48,
        "ofID": 630,
        "gbid": "st_anthony_mary_claret",
        "ref": "mass_ii_confessor_bishop"
    },
    "Oct24": {
        "coID": 1127,
        "grID": 581,
        "alID": 814,
        "inID": 985,
        "ofID": 302,
        "gbid": "st_raphael",
        "inVerses": "Ps 102: 21-22",
        "ofVerses": "Ps 137: 1, 2",
        "coVerses": "Dan 3: 57, 60-65, 83-87",
        "coVersesGloriaPatri": false
    },
    "Oct27": {
        "inID": 261,
        "inVerses": "Ps 78: 2-3",
        "grID": 206,
        "ofID": 33,
        "coID": 184,
        "gbid": "ss_simon_jude_vigil"
    },
    "Oct28": {
        "coID": 1028,
        "grID": 307,
        "alID": 130,
        "inID": 475,
        "ofID": 570,
        "gbid": "ss_simon_jude",
        "inVerses": "Ps 138: 2-6",
        "coVerses": "Ps 125; Ps 138"
    },
    "Oct3": {
        "coID": 162,
        "grID": 1034,
        "alID": 1257,
        "inID": 59,
        "ofID": 362,
        "gbid": "ste_therese_ej",
        "inVerses": "Ps 112: 2-3",
        "coVerses": "Deut 32: 1-4"
    },
    "Oct7": {
        "coID": 104,
        "grID": 807,
        "alID": 420,
        "inID": 246,
        "ofID": 494,
        "gbid": "most_holy_rosary",
        "inVerses": "Ps 44: 5",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "Oct9": {
        "coID": 991,
        "grID": 1186,
        "alID": 664,
        "inID": 41,
        "ofID": 1098,
        "gbid": "st_john_leonardi",
        "coVerses": "Ps 20: 2-7"
    },
    "Sep12": {
        "coID": 160,
        "grID": 392,
        "alID": 127,
        "inID": 124,
        "ofID": 843,
        "gbid": "most_holy_name_mary",
        "inVerses": "Ps 44: 5, 8",
        "ofVerses": "Luc 1: 34, 35",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "Sep14": {
        "coID": 346,
        "grID": 873,
        "alID": 859,
        "inID": 359,
        "ofID": 195,
        "gbid": "exaltation_holy_cross",
        "inVerses": "Ps 66: 2, 3",
        "coVerses": "Ps 17: 2-3, 4, 18, 38-39, 41, 48-50"
    },
    "Sep15": {
        "coID": 1180,
        "grID": 1383,
        "alID": 853,
        "inID": 149,
        "ofID": 787,
        "seqID": 681,
        "gbid": "seven_dolours_bvm",
        "coVerses": "Is 53: 1, 2-5"
    },
    "Sep17": {
        "coID": 1008,
        "grID": 511,
        "alID": 1200,
        "inID": 849,
        "ofID": 630,
        "gbid": "st_francis_stigmata",
        "coVerses": "Ps 111: 1-9"
    },
    "Sep18": {
        "coID": 976,
        "grID": 600,
        "alID": 473,
        "inID": 258,
        "ofID": 607,
        "gbid": "st_joseph_of_cupertino"
    },
    "Sep21": {
        "coID": 365,
        "grID": 153,
        "alID": 442,
        "inID": 1374,
        "ofID": 487,
        "gbid": "st_matthew",
        "inVerses": "Ps 36: 3, 26",
        "coVerses": "Ps 20: 2-5, 7-9, 14"
    },
    "Sep27": {
        "coID": 184,
        "grID": 1009,
        "alID": 32,
        "inID": 11,
        "ofID": 1375,
        "gbid": "ss_cosmas_and_damian",
        "inVerses": "Ps 32: 2-4, 12-15, 18",
        "coVerses": "Ps 78: 1, 3-6, 13"
    },
    "Sep28": {
        "coID": 89,
        "grID": 153,
        "alID": 1249,
        "inID": 316,
        "ofID": 407,
        "gbid": "st_wenceslaus",
        "ref": "mass_i_martyr_not_bishop"
    },
    "Sep29": {
        "coID": 1127,
        "grID": 609,
        "alID": 1103,
        "inID": 985,
        "ofID": 302,
        "gbid": "st_michael",
        "inVerses": "Ps 102: 21-22",
        "ofVerses": "Ps 137: 1, 2",
        "coVerses": "Dan 3: 57, 60-65, 83-87",
        "coVersesGloriaPatri": false
    },
    "Sep3": {
        "coID": 90,
        "grID": 977,
        "alID": 467,
        "inID": 452,
        "ofID": 805,
        "gbid": "st_pius_x",
        "inVerses": "Ps 88: 23, 25",
        "coVerses": "Ps 77: 1-3, 23-25, 29, 70-72"
    },
    "Sep3Quad": {
        "trID": 1281,
        "coID": 90,
        "grID": 977,
        "inID": 452,
        "ofID": 805,
        "gbid": "st_pius_x",
        "inVerses": "Ps 88: 23, 25",
        "coVerses": "Ps 77: 1-3, 23-25, 29, 70-72"
    },
    "Sep3Pasch": {
        "coID": 90,
        "grID": 467,
        "alID": 315,
        "inID": 452,
        "ofID": 805,
        "gbid": "st_pius_x",
        "inVerses": "Ps 88: 23, 25",
        "coVerses": "Ps 77: 1-3, 23-25, 29, 70-72"
    },
    "Jan16": {
        "ref": "mass_holy_pope",
        "gbid": "st_marcellus_i"
    },
    "Feb6": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_titus"
    },
    "Feb8": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_john_of_matha"
    },
    "Feb9": {
        "ref": "mass_doctors",
        "gbid": "st_cyril_alexandria"
    },
    "Feb18": {
        "ref": "mass_i_martyr_bishop",
        "gbid": "st_simeon"
    },
    "Feb22": {
        "ref": "Jan18",
        "gbid": "st_peter_chair_rome"
    },
    "Feb23": {
        "ref": "mass_doctors",
        "gbid": "st_peter_damian"
    },
    "Mar4": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_casimir"
    },
    "Mar18": {
        "ref": "mass_doctors",
        "gbid": "st_cyril_jerusalem"
    },
    "Apr24": {
        "ref": "mass_one_martyr",
        "gbid": "st_fidelis_of_sigmaringen"
    },
    "Apr25": {
        "ref": "mass_one_martyr",
        "gbid": "st_mark"
    },
    "Apr26": {
        "ref": "mass_holy_pope",
        "gbid": "ss_cletus_marcellinus"
    },
    "Apr27": {
        "ref": "mass_doctors",
        "gbid": "st_peter_canisius"
    },
    "Apr29": {
        "ref": "mass_one_martyr",
        "gbid": "st_peter_of_verona"
    },
    "May7": {
        "coID": 586,
        "grID": 1206,
        "alID": 1118,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_stanislaus",
        "ref": "mass_ii_martyr_bishop"
    },
    "May7Quad": {
        "trID": 7670,
        "coID": 586,
        "grID": 1206,
        "inID": 227,
        "ofID": 779,
        "gbid": "st_stanislaus",
        "ref": "mass_ii_martyr_bishop"
    },
    "May7Pasch": {
        "coID": 617,
        "grID": 762,
        "alID": 1249,
        "inID": 340,
        "ofID": 1382,
        "gbid": "st_stanislaus",
        "ref": "mass_one_martyr"
    },
    May8: {
        inID: 985,
        grID: 1103,
        ofID: 302,
        coID: 1127,
        alID: 1017
    },      
    "May9": {
        "ref": "mass_doctors",
        "gbid": "st_gregory_nazianzen"
    },
    "May17": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_paschal_baylon"
    },
    "May18": {
        "ref": "mass_i_martyr_not_bishop",
        "gbid": "st_venantius"
    },
    "May19": {
        "ref": "mass_holy_pope",
        "gbid": "st_peter_celestine"
    },
    "May20": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_bernardine_of_sienna"
    },
    "May27": {
        "ref": "mass_doctors",
        "gbid": "st_bede_venerable"
    },
    "May30": {
        "ref": "mass_holy_pope",
        "gbid": "st_felix_i"
    },
    "Jun6": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_norbert"
    },
    "Jun13": {
        "ref": "mass_doctors",
        "gbid": "st_anthony_padua"
    },
    "Jun17": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_gregory_barbarigo"
    },
    "Jun18": {
        "ref": "mass_doctors",
        "gbid": "st_ephraem_syrian"
    },
    "Jun19": {
        "ref": "mass_i_virgin_not_martyr",
        "gbid": "st_juliana_falconeri"
    },
    "Jun20": {
        "ref": "mass_holy_pope",
        "gbid": "st_silverius"
    },
    "Jun25": {
        "ref": "mass_abbots",
        "gbid": "st_william"
    },
    "Jul8": {
        "ref": "mass_holy_woman_not_martyr",
        "gbid": "st_elizabeth"
    },
    "Jul12": {
        "ref": "mass_abbots",
        "gbid": "st_john_gualbert"
    },
    Jul13: {
        "ref": "mass_holy_pope"
    },
    "Jul15": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_henry",
        "coVerses": "Ps 71: 2, 4, 10-13"
    },
    "Jul17": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_alexius"
    },
    "Jul21": {
        "ref": "mass_doctors",
        "gbid": "st_lawrence_brindisi"
    },
    Jul21a: {
        inID: 510,
        grID: 394,
        coID: 944,
        alID: 406,
        ofID: 177
    },
    "Jul29": {
        "ref": "mass_i_virgin_not_martyr",
        "gbid": "st_martha"
    },
    "Aug5": {
        "ref": "mass_bvm",
        "gbid": "lady_of_snow"
    },
    "Aug7": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_cajetan"
    },
    "Aug8": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_jean_marie_vianney"
    },
    Aug8a: {
        "inID": 808,
        "grID": 371,
        "alID": 560,
        "ofID": 786,
        "coID": 608,
        "coVerses": "Ps 33: 1, 15, 17",
        gbid: "ss_cyriacus_largus_smaragdus"
    },
    "Aug12": {
        "ref": "mass_i_virgin_not_martyr",
        "gbid": "st_clare"
    },
    "Aug13": {
        "ref": "mass_iii_two_or_more_martyr",
        "gbid": "ss_hippolytus_cassian"
    },
    "Aug17": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_hyacinth"
    },
    "Aug18": {
        "ref": "mass_ii_martyr_not_bishop",
        "gbid": "st_agapitus"
    },
    "Aug19": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_john_eudes"
    },
    "Aug20": {
        "ref": "mass_doctors",
        "gbid": "st_bernard"
    },
    "Aug21": {
        "ref": "mass_holy_woman_not_martyr",
        "gbid": "st_jane_francis_de_chantal"
    },
    "Aug23": {
        "ref": "mass_ii_confessor_not_bishop",
        "gbid": "st_philip_benizi"
    },
    "Aug25": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_louis",
        "coVerses": "Ps 71: 2, 4, 10-13"
    },
    "Aug30": {
        "ref": "mass_i_virgin_not_martyr",
        "gbid": "st_rose_of_lima"
    },
    "Aug31": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_nonnat"
    },
    "Sep2": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_stephen_of_hungary",
        "coVerses": "Ps 71: 2, 4, 10-13"
    },
    "Sep5": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_lawrence_justinian"
    },
    "Sep8": {
        "ref": "Jul2",
        "gbid": "nativity_bvm",
        "inVerses": "Ps 44: 5, 8",
        "coVerses": "Ps 44: 2, 5, 8, 10-16"
    },
    "Sep9": {
        "ref": "mass_ii_martyr_not_bishop",
        "gbid": "st_gorgonius"
    },
    "Sep10": {
        "ref": "mass_ii_confessor_not_bishop",
        "gbid": "st_nicholas_of_tolentino"
    },
    "Sep11": {
        "ref": "mass_iii_two_or_more_martyr",
        "gbid": "ss_protus_hyacinth"
    },
    "Sep16": {
        "ref": "Jul28",
        "gbid": "ss_cornelius_cyprian"
    },
    "Sep19": {
        "ref": "mass_iii_two_or_more_martyr",
        "gbid": "st_januarius_and_companions"
    },
    "Sep22": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_thomas_of_villanova"
    },
    "Sep23": {
        "ref": "mass_holy_pope",
        "gbid": "st_linus"
    },
    "Sep24": {
        "ref": "mass_bvm",
        "gbid": "our_lady_of_ransom"
    },
    "Sep26": {
        "ref": "mass_iii_two_or_more_martyr",
        "gbid": "ss_cyprian_and_justina"
    },
    "Sep30": {
        "ref": "mass_doctors",
        "gbid": "st_jerome"
    },
    "Oct4": {
        "ref": "st_francis_stigmata",
        "gbid": "st_francis_assisi",
        "coVerses": "Ps 111: 1-9"
    },
    "Oct5": {
        "ref": "mass_iii_two_or_more_martyr",
        "gbid": "st_placid_and_companions"
    },
    "Oct6": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_bruno"
    },
    "Oct8": {
        "ref": "mass_holy_woman_not_martyr",
        "gbid": "st_bridget"
    },
    "Oct10": {
        "ref": "mass_abbots",
        "gbid": "st_francis_borgia"
    },
    "Oct13": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_edward",
        "coVerses": "Ps 71: 2, 4, 10-13"
    },
    "Oct14": {
        "ref": "mass_holy_pope",
        "gbid": "st_callistus_i"
    },
    "Oct15": {
        "ref": "mass_i_virgin_not_martyr",
        "gbid": "st_teresa_avila"
    },
    "Oct16": {
        "ref": "mass_holy_woman_not_martyr",
        "gbid": "st_hedwig"
    },
    "Oct19": {
        "ref": "mass_ii_confessor_not_bishop",
        "gbid": "st_peter_of_alcantara"
    },
    "Nov4": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_charles_borromeo"
    },
    "Nov10": {
        "ref": "mass_i_confessor_not_bishop",
        "gbid": "st_andrew_avellino"
    },
    "Nov12": {
        "ref": "mass_holy_pope",
        "gbid": "st_martin_i"
    },
    "Nov13": {
        "ref": "mass_ii_confessor_not_bishop",
        "gbid": "st_didacus"
    },
    "Nov15": {
        "ref": "mass_doctors",
        "gbid": "st_albert_the_great"
    },
    "Nov16": {
        "ref": "mass_i_virgin_not_martyr",
        "gbid": "st_gertrude"
    },
    "Nov17": {
        "ref": "mass_i_confessor_bishop",
        "gbid": "st_gregory_wonder_worker"
    },
    "Nov18": {
        "ref": "mass_dedication_church",
        "gbid": "dedication_basilica_ss_peter_paul"
    },
    "Nov19": {
        "ref": "mass_holy_woman_not_martyr",
        "gbid": "st_elizabeth_of_hungary"
    },
    "Nov20": {
        "ref": "mass_ii_confessor_not_bishop",
        "gbid": "st_felix_of_valois"
    },
    "Nov24": {
        "ref": "mass_doctors",
        "gbid": "st_john_cross"
    },
    "Nov29": {
        "ref": "mass_ii_martyr_not_bishop",
        "gbid": "st_saturninus"
    },
    "Dec5": {
        "inID": 1374,
        "grID": 600,
        "alID": 946,
        "ofID": 722,
        "coID": 1008,
        "gbid": "st_sabbas",
        "ref": "mass_abbots"
    },
    "Dec10": {
        "ref": "mass_holy_pope",
        "gbid": "st_melchiades"
    },
    "Dec11": {
        "ref": "mass_holy_pope",
        "gbid": "st_damasus"
    },
    "mass_holy_pope": {
        "title": "Mass of a Holy Pope",
        "href": "http://www.introibo.fr/Commun-des-Souverains-Pontifes",
        "in": "Si diligis me",
        "inID": 674,
        "inRef": "Ioann 21: 15, 16, 17; Ps 29: 2",
        "inVerses": "Ps 29: 4, 5",
        "gr": "Exaltent eum",
        "grID": 1119,
        "grRef": "Ps 106: 32, 31",
        "al": "Tu es Petrus",
        "alID": 228,
        "alRef": "Matth 16: 18",
        "trSept": "Annuntiavi",
        "trSeptID": 1085,
        "trSeptRef": "Ps 39: 10-11",
        "trSeptRubric": "After Septuagesima the previous Alleluia is omitted and this Tract is sung.",
        "alPasch": "Constitues eos",
        "alPaschID": 548,
        "alPaschRef": "Ps 44: 17, 18",
        "alPaschRubric": "In Paschal Time the previous Alleluia is sung, then this one.",
        "of": "Ecce (dedi)",
        "ofID": 358,
        "ofRef": "Jerem 1: 9-10",
        "co": "Tu es Petrus",
        "coID": 509,
        "coRef": "Matth 16: 18",
        "coVerses": "Ps 39: 2-4, 6, 10-11, 14, 17, 18",
        "gbid": "mass_holy_pope",
        "isUsed": true
    },
    "mass_i_martyr_not_bishop": {
        "title": "Mass I of a Martyr not a Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Martyr-hors-du-Temps,323",
        "in": "In virtute tua",
        "inID": 316,
        "inRef": "Ps 20: 2-3, 4",
        "inVerses": "Ps 20: 6-7",
        "gr": "Beatus vir (qui timet)",
        "grID": 153,
        "grRef": "Ps 111: 1-2",
        "al": "Posuisti Domine",
        "alID": 1249,
        "alRef": "Ps 20: 4",
        "trSept": "Desiderium",
        "trSeptID": 176,
        "trSeptRef": "Ps 20: 3-4",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "of": "Gloria et honore",
        "ofID": 407,
        "ofRef": "Ps 8: 6-7",
        "co": "Qui vult venire",
        "coID": 89,
        "coRef": "Matth 16: 24",
        "coVerses": "Ps 33: 1, 6-7, 15-22",
        "gbid": "mass_i_martyr_not_bishop",
        "isUsed": true
    },
    "mass_one_martyr": {
        "title": "Mass of one Martyr (in Paschal Time)",
        "href": "http://www.introibo.fr/Commun-d-un-Martyr-au-Temps-Pascal",
        "in": "Protexisti me",
        "inID": 340,
        "inRef": "Ps 63: 3, 2",
        "inVerses": "Ps 63: 4, 11",
        "al": [
            "Confitebuntur",
            "Posuisti Domine"
        ],
        "alID": [
            762,
            1249
        ],
        "alRef": [
            "Ps 88: 6",
            "Ps 20: 4"
        ],
        "of": "Confitebuntur",
        "ofID": 1382,
        "ofRef": "Ps 88: 6",
        "co": "Laetabitur justus",
        "coID": 617,
        "coRef": "Ps 63: 11",
        "coVerses": "Ps 63: 2-7",
        "gbid": "mass_one_martyr",
        "isUsed": true
    },
    "mass_ii_confessor_not_bishop": {
        "title": "Mass II of a Confessor not a Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Confesseur-non-Pontife,333",
        "in": "Justus ut palma",
        "inID": 108,
        "inRef": "Ps 91: 13-14, 2",
        "inVerses": "Ps 91: 3, 5",
        "gr": "Os justi",
        "grID": 511,
        "grRef": "Ps 36: 30-31",
        "al": "Beatus vir qui timet",
        "alID": 765,
        "alRef": "Ps 111: 1",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "alPasch": "Justus germinabit",
        "alPaschID": 1207,
        "alPaschRef": "Osee 14: 6",
        "alPaschRubric": "In Paschal time the Gradual Os justi--> is omitted. Instead one sings the first Alleluia Beatus vir then this second Alleluia.",
        "of": "In virtute tua",
        "ofID": 667,
        "ofRef": "Ps 20: 2-3",
        "co": "Amen dico vobis... quod vos",
        "coID": 1337,
        "coRef": "Matth 19: 28, 29",
        "coVerses": "Ps 20: 2-7",
        "gbid": "mass_ii_confessor_not_bishop",
        "isUsed": true
    },
    "mass_doctors": {
        "title": "Mass of Doctors",
        "href": "http://www.introibo.fr/Commun-des-Docteurs",
        "in": "In medio",
        "inID": 233,
        "inRef": "Eccli 15: 5; Ps 91: 2",
        "inVerses": "Ps 91: 13-14",
        "gr": "Os justi",
        "grID": 511,
        "grRef": "Ps 36: 30-31",
        "al": "Amavit eum",
        "alID": 14,
        "alRef": "Eccli 45: 9",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "alPasch": "Justus germinabit",
        "alPaschID": 1207,
        "alPaschRef": "Osee 14: 6",
        "alPaschRubric": "In Paschal time the Gradual Os justi--> is omitted. Instead one sings the first Alleluia Amavit eum Dominus then this second Alleluia.",
        "of": "Justus (ut palma)",
        "ofID": 777,
        "ofRef": "Ps 91: 13",
        "ofVerses": "Ps 91: 2",
        "co": "Fidelis servus",
        "coID": 1008,
        "coRef": "Luc 12: 42",
        "coVerses": "Ps 118: 1-2, 14, 24, 30, 48, 99-100, 129-130",
        "gbid": "mass_doctors",
        "isUsed": true
    },
    "mass_i_virgin_not_martyr": {
        "title": "Mass I of a Virgin not a Martyr",
        "href": "http://www.introibo.fr/Commun-des-Vierges-III-pour-une",
        "in": "Dilexisti",
        "inID": 629,
        "inRef": "Ps 44: 8, 2",
        "gr": "Specie tua",
        "grID": 174,
        "grRef": "Ps 44: 5",
        "al": "Adducentur regi virgines",
        "alID": 208,
        "alRef": "Ps 44: 15, 16",
        "trSept": "Audi filia",
        "trSeptID": 738,
        "trSeptRef": "Ps 44: 11, 12, 13, 10, 15, 16",
        "trSeptRubric": "Replaces the Alleluia after Septuagesima.",
        "alPasch": "Specie tua",
        "alPaschID": 406,
        "alPaschRef": "Ps 44: 5",
        "alPaschRubric": "Paschal Time: Alleluia Adducentur regi virgines above, then this Alleluia.",
        "of": "Filiae regum",
        "ofID": 1333,
        "ofRef": "Ps 44: 10",
        "co": "Quinque prudentes",
        "coID": 1301,
        "coRef": "Matth 25: 4, 6",
        "gbid": "mass_i_virgin_not_martyr",
        "isUsed": true
    },
    "mass_i_confessor_not_bishop": {
        "title": "Mass I of a Confessor not a Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Confesseur-non-Pontife",
        "in": "Os justi",
        "inID": 1374,
        "inRef": "Ps 36: 30-31, 1",
        "inVerses": "Ps 36: 3, 26",
        "gr": "Justus ut palma",
        "grID": 34,
        "grRef": "Ps 91: 13, 14, 3",
        "al": "Beatus vir qui suffert",
        "alID": 724,
        "alRef": "Iac 1: 12",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "alPasch": "Amavit eum",
        "alPaschID": 14,
        "alPaschRef": "Eccli 45: 9",
        "alPaschRubric": "In Paschal time the Gradual Justus (ut palma)--> is omitted. Instead one sings the first Alleluia Beatus vir then this second Alleluia.",
        "of": "Veritas mea",
        "ofID": 630,
        "ofRef": "Ps 88: 25",
        "co": "Beatus servus",
        "coID": 1154,
        "coRef": "Matth 24: 46-47",
        "coVerses": "Psalm 120",
        "gbid": "mass_i_confessor_not_bishop",
        "isUsed": true
    },
    "mass_iii_two_or_more_martyr": {
        "title": "Mass III of two or more Martyrs",
        "href": "http://www.introibo.fr/Commun-de-plusieurs-Martyrs-hors,327",
        "in": "Salus autem",
        "inID": 737,
        "inRef": "Ps 36: 39, 1",
        "inVerses": "Ps 36: 29, 40",
        "gr": "Clamaverunt",
        "grID": 1009,
        "grRef": "Ps 33: 18-19",
        "al": "Te Martyrum",
        "alID": 590,
        "trSept": "Qui seminant",
        "trSeptID": 305,
        "trSeptRef": "Ps 125: 5-6",
        "trSeptRubric": "After Septuagesima the previous Alleluia is omitted and this Tract is sung.",
        "of": "Justorum (animae)",
        "ofID": 835,
        "ofRef": "Sap 3: 1, 2, 3",
        "co": "Quod dico vobis",
        "coID": 1002,
        "coRef": "Matth 10: 27",
        "coVerses": "Ps 125",
        "gbid": "mass_iii_two_or_more_martyr",
        "isUsed": true
    },
    "mass_ii_martyr_bishop": {
        "title": "Mass II of a Martyr-Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Martyr-hors-du-Temps,322",
        "in": "Sacerdotes Dei",
        "inID": 227,
        "inRef": "Dan 3: 84, 87, 57",
        "inVerses": "Dan 3: 58-61",
        "gr": "Gloria et honore",
        "grID": 1206,
        "grRef": "Ps 8: 6-7",
        "al": "Hic est sacerdos",
        "alID": 1118,
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "of": "Inveni David",
        "ofID": 779,
        "ofRef": "Ps 88: 21-22",
        "co": "Posuisti Domine",
        "coID": 586,
        "coRef": "Ps 20: 4",
        "coVerses": "Ps 20: 2-3, 5-8, 14",
        "gbid": "mass_ii_martyr_bishop",
        "isUsed": true
    },
    "mass_ii_virgin_martyr": {
        "title": "Mass II of a Virgin Martyr",
        "href": "http://www.introibo.fr/Commun-des-Vierges-II-pour-une",
        "in": "Me exspectaverunt",
        "inID": 938,
        "inRef": "Ps 118: 95-96, 1",
        "inVerses": "Ps 118: 2, 39, 45, 77, 99-100, 143",
        "gr": "Adjuvabit (eam Deus)",
        "grID": 1373,
        "grRef": "Ps 45: 6, 5",
        "al": "Haec est virgo",
        "alID": 500,
        "of": "Diffusa est",
        "ofID": 177,
        "ofRef": "Ps 44: 3",
        "ofVerses": "Ps 44: 5",
        "co": "Feci judicium",
        "coID": 844,
        "coRef": "Ps 118: 121, 122, 128",
        "coVerses": "Ps 118: 1, 78, 81, 113, 115, 120, 163, 166",
        "gbid": "mass_ii_virgin_martyr",
        "isUsed": true
    },
    "mass_i_confessor_bishop": {
        "title": "Mass I of a Confessor Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Confesseur-Pontife-I",
        "in": "Statuit",
        "inID": 456,
        "inRef": "Eccli 45: 30; Ps 131: 1",
        "inVerses": "Ps 131: 9, 16",
        "gr": "Ecce sacerdos",
        "grID": 235,
        "grRef": "Eccli 44: 16, 20",
        "al": "Tu es sacerdos",
        "alID": 477,
        "alRef": "Ps 109: 4",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "alPasch": "Hic est sacerdos",
        "alPaschID": 1118,
        "alPaschRubric": "In Paschal time the Gradual Ecce (sacerdos magnus)--> is omitted. Instead one sings the first Alleluia Tu es sacerdos then this second Alleluia.",
        "of": "Inveni David",
        "ofID": 779,
        "ofRef": "Ps 88: 21-22",
        "co": "Fidelis servus",
        "coID": 1008,
        "coRef": "Luc 12: 42",
        "coVerses": "Ps 131: 1, 9-13, 16-18",
        "gbid": "mass_i_confessor_bishop",
        "isUsed": true
    },
    "mass_abbots": {
        "title": "Mass of Abbots",
        "href": "http://www.introibo.fr/Commun-des-Abbes",
        "in": "Os justi",
        "inID": 1374,
        "inRef": "Ps 36: 30-31, 1",
        "inVerses": "Ps 36: 3, 26",
        "gr": "Domine (praevenisti)",
        "grID": 600,
        "grRef": "Ps 20: 4-5",
        "al": "Justus ut palma",
        "alID": 946,
        "alRef": "Ps 91: 13",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "alPasch": "Justus germinabit",
        "alPaschID": 1207,
        "alPaschRef": "Osee 14: 6",
        "alPaschRubric": "In Paschal time the Gradual Domine (praevenisti)--> is omitted. Instead one sings the first Alleluia Justus ut palma then this second Alleluia.",
        "of": "Desiderium",
        "ofID": 722,
        "ofRef": "Ps 20: 3, 4",
        "co": "Fidelis servus",
        "coID": 1008,
        "coRef": "Luc 12: 42",
        "coVerses": "Ps 111: 1-9",
        "gbid": "mass_abbots",
        "isUsed": true
    },
    "epiphany": {
        "title": "6 Jan - The Epiphany of Our Lord",
        "date": "Jan6",
        "href": "http://www.introibo.fr/Epiphanie-du-Seigneur-6-janvier",
        "in": "Ecce (advenit)",
        "inID": 403,
        "inRef": "Malach 3: 1; 1 Par 29: 12; Ps 71: 1",
        "inVerses": "Ps 71: 10-11",
        "gr": "Omnes (de Saba)",
        "grID": 205,
        "grRef": "Is 60: 6, 1",
        "al": "Vidimus stellam",
        "alID": 524,
        "alRef": "Matth 2: 2",
        "of": "Reges Tharsis",
        "ofID": 1147,
        "ofRef": "Ps 71: 10-11",
        "co": "Vidimus (stellam)",
        "coID": 918,
        "coRef": "Matth 2: 2",
        "coVerses": "Ps 71: 2-3, 7-8, 10-12, 17-18",
        "gbid": "epiphany",
        "isUsed": true
    },
    "mass_i_two_or_more_martyr": {
        "title": "Mass I of two or more Martyrs",
        "href": "http://www.introibo.fr/Commun-de-plusieurs-Martyrs-hors",
        "in": "Intret in conspectu",
        "inID": 261,
        "inRef": "Ps 78: 11, 12, 10, 1",
        "inVerses": "Ps 78: 2-3",
        "gr": "Gloriosus Deus",
        "grID": 888,
        "grRef": "Exodi 15: 11, 6",
        "al": "Corpora sanctorum",
        "alID": 1250,
        "alRef": "Eccli 44: 14",
        "trSept": "Qui seminant",
        "trSeptID": 305,
        "trSeptRef": "Ps 125: 5-6",
        "trSeptRubric": "After Septuagesima the previous Alleluia is omitted and this Tract is sung.",
        "of": "Mirabilis Deus",
        "ofID": 919,
        "ofRef": "Ps 67: 36",
        "co": "Et si coram",
        "coID": 658,
        "coRef": "Sap 3: 4, 5, 6",
        "coVerses": "Sap 3: 1-3, 5, 8-9",
        "gbid": "mass_i_two_or_more_martyr",
        "isUsed": true
    },
    "mass_i_martyr_bishop": {
        "title": "Mass I of a Martyr-Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Martyr-hors-du-Temps",
        "in": "Statuit",
        "inID": 456,
        "inRef": "Eccli 45: 30; Ps 131: 1",
        "inVerses": "Ps 131: 9, 16",
        "gr": "Inveni David",
        "grID": 827,
        "grRef": "Ps 88: 21-23",
        "al": "Tu es sacerdos",
        "alID": 477,
        "alRef": "Ps 109: 4",
        "trSept": "Desiderium",
        "trSeptID": 176,
        "trSeptRef": "Ps 20: 3-4",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "of": "Veritas mea",
        "ofID": 630,
        "ofRef": "Ps 88: 25",
        "co": "Semel juravi",
        "coID": 317,
        "coRef": "Ps 88: 36, 37-38",
        "gbid": "mass_i_martyr_bishop",
        "isUsed": true
    },
    "mass_i_virgin_martyr": {
        "title": "Mass I of a Virgin Martyr",
        "href": "http://www.introibo.fr/Commun-des-Vierges-I-pour-une",
        "in": "Loquebar... Ps. Beati immaculati",
        "inID": 510,
        "inRef": "Ps 118: 46-47, 1",
        "inVerses": "Ps 118: 2-3, 8-9, 26, 59-60, 134, 168",
        "gr": "Dilexisti",
        "grID": 394,
        "grRef": "Ps 44: 8",
        "al": "Adducentur regi virgines",
        "alID": 208,
        "alRef": "Ps 44: 15, 16",
        "trSept": "Veni sponsa",
        "trSeptID": 256,
        "trSeptRef": "Ps 44: 8, 5",
        "trSeptRubric": "After Septuagesima this Tract replaces the previous Alleluia.",
        "alPasch": "Specie tua",
        "alPaschID": 406,
        "alPaschRef": "Ps 44: 5",
        "of": "Afferentur... proximae",
        "ofID": 1107,
        "ofRef": "Ps 44: 15, 16",
        "co": "Confundantur superbi",
        "coID": 1032,
        "coRef": "Ps 118: 78, 80",
        "coVerses": "Ps 118: 1, 41, 85, 87, 113, 123, 157, 161, 166, 174",
        "gbid": "mass_i_virgin_martyr",
        "isUsed": true
    },
    "mass_ii_martyr_not_bishop": {
        "title": "Mass II of a Martyr not a Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Martyr-hors-du-Temps,324",
        "in": "Laetabitur (justus)",
        "inID": 251,
        "inRef": "Ps 63: 11, 2",
        "inVerses": "Ps 63: 3, 10",
        "gr": "Justus (cum ceciderit)",
        "grID": 764,
        "grRef": "Ps 36: 24, 26",
        "al": "Qui sequitur me",
        "alID": 1201,
        "alRef": "Ioann 8: 12",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "of": "Posuisti",
        "ofID": 487,
        "ofRef": "Ps 20: 4-5",
        "co": "Qui mihi ministrat",
        "coID": 685,
        "coRef": "Joann 12: 26",
        "gbid": "mass_ii_martyr_not_bishop",
        "isUsed": true
    },
    "mass_holy_woman_not_martyr": {
        "title": "Mass of a Holy Woman not a Martyr",
        "href": "http://www.introibo.fr/Commun-des-Saintes-Femmes-II-pour",
        "in": "Cognovi",
        "inID": 619,
        "inRef": "Ps 118: 75, 120, 1",
        "inVerses": "Ps 118: 2, 22",
        "gr": "Diffusa est",
        "grID": 947,
        "grRef": "Ps 44: 3, 5",
        "al": "Specie tua",
        "alID": 406,
        "alRef": "Ps 44: 5",
        "trSept": "Veni sponsa",
        "trSeptID": 256,
        "trSeptRef": "Ps 44: 8, 5",
        "trSeptRubric": "Important note: for a Holy Woman not a Martyr the ending words of the first verse are omitted: pro cujus amore sanguinem tuum fudisti = « for the love of whom thou didst shed thy blood ». Obviously.",
        "alPasch": "Propter veritatem",
        "alPaschID": 913,
        "alPaschRubric": "In Paschal time the previous Alleluia is sung then this one.",
        "of": "Diffusa est",
        "ofID": 177,
        "ofRef": "Ps 44: 3",
        "co": "Dilexisti",
        "coID": 799,
        "coRef": "Ps 44: 8",
        "coVerses": "Ps 44: 2, 5, 10-12",
        "gbid": "mass_holy_woman_not_martyr",
        "isUsed": true
    },
    "mass_holy_woman_martyr": {
        "title": "Mass of a Holy Woman Martyr",
        "href": "http://www.introibo.fr/Commun-des-Saintes-Femmes-I-pour",
        "in": "Me exspectaverunt",
        "inID": 938,
        "inRef": "Ps 118: 95-96, 1",
        "inVerses": "Ps 118: 2, 39, 45, 77, 99-100, 143",
        "gr": "Dilexisti",
        "grID": 394,
        "grRef": "Ps 44: 8",
        "al": "Specie tua",
        "alID": 406,
        "alRef": "Ps 44: 5",
        "trSept": "Veni sponsa",
        "trSeptID": 256,
        "trSeptRef": "Ps 44: 8, 5",
        "trSeptRubric": "After Septuagesima this Tract replaces the previous Alleluia.",
        "alPasch": "Propter veritatem",
        "alPaschID": 913,
        "alPaschRubric": "In Paschal time the previous Alleluia is sung then this one.",
        "of": "Diffusa est",
        "ofID": 177,
        "ofRef": "Ps 44: 3",
        "co": "Principes",
        "coID": 1292,
        "coRef": "Ps 118: 161-162",
        "gbid": "mass_holy_woman_martyr",
        "isUsed": true
    },
    "mass_ii_confessor_bishop": {
        "title": "Mass II of a Confessor Bishop",
        "href": "http://www.introibo.fr/Commun-d-un-Confesseur-Pontife-II",
        "in": "Sacerdotes tui",
        "inID": 48,
        "inRef": "Ps 131: 9-10, 1",
        "inVerses": "Ps 131: 16-17",
        "gr": "Sacerdotes (ejus)",
        "grID": 415,
        "grRef": "Ps 131: 16-17",
        "al": "Juravit Dominus",
        "alID": 1187,
        "alRef": "Ps 109: 4",
        "trSept": "Beatus vir",
        "trSeptID": 7670,
        "trSeptRef": "Ps 111: 1-3",
        "trSeptRubric": "Sung after Septuagesima instead of the previous Alleluia.",
        "alPasch": "Amavit eum",
        "alPaschID": 14,
        "alPaschRef": "Eccli 45: 9",
        "alPaschRubric": "In Paschal time the Gradual is omitted. Instead one sings the first All. Juravit Dominus then this second Alleluia.",
        "of": "Veritas mea",
        "ofID": 630,
        "ofRef": "Ps 88: 25",
        "co": "Beatus servus",
        "coID": 1154,
        "coRef": "Matth 24: 46-47",
        "coVerses": "Psalm 19: 2-8",
        "gbid": "mass_ii_confessor_bishop",
        "isUsed": true
    },
    "requiem": {
        "title": "Requiem mass",
        "href": "http://www.introibo.fr/Le-jour-de-l-enterrement",
        "in": "Requiem",
        "inID": 766,
        "inRef": "4 Esdr 2: 34, 35; Ps 64: 2-3",
        "gr": "Requiem",
        "grID": 1261,
        "grRef": "4 Esdr 2: 34, 35; Ps 111: 7",
        "tr": "Absolve (Domine)",
        "trID": 338,
        "seq": "Dies irae",
        "seqID": 1198,
        "of": "Domine Jesu Christe",
        "ofID": 1199,
        "co": "Lux aeterna",
        "coID": 241,
        "coRef": "4 Esdrae 2: 35, 34",
        "coVerses": "Ps 129; Ps 120",
        "gbid": "requiem",
        "isUsed": true
    },
    "mass_bvm": {
        "title": "Mass of the Blessed Virgin Mary",
        "href": "http://www.introibo.fr/Commun-des-fetes-de-la-Bse-Vierge",
        "in": "Salve sancta Parens",
        "inID": 1140,
        "inRef": "Ps 44: 2",
        "inVerses": "Ps 44: 5, 8",
        "gr": "Benedicta et venerabilis",
        "grID": 392,
        "al": "Post partum Virgo",
        "alID": 127,
        "alExtra": "Ave Maria",
        "alExtraID": 1209,
        "alExtraRef": "Luc 1: 28",
        "alExtraRubric": "In Advent the previous Alleluia is replaced by this one.",
        "trSept": "Gaude Maria",
        "trSeptID": 18,
        "trSeptRubric": "After Septuagesima this Tract replaces the Alleluia.",
        "alPasch": "Virga Jesse",
        "alPaschID": 281,
        "alPaschRef": "Num 17: 8",
        "alPaschRubric": "During Paschal Time the Gradual is omitted, this Alleluia is sung then All. Ave Maria.",
        "of": "Ave Maria... et benedictus",
        "ofID": 843,
        "ofRef": "Luc 1: 28, 42",
        "ofVerses": "Luc 1: 34, 35",
        "co": "Beata viscera",
        "coID": 160,
        "coVerses": "Ps 44: 2, 5, 8, 10-16",
        "gbid": "mass_bvm",
        "isUsed": true
    },
    "mass_dedication_church": {
        "title": "Mass of the Dedication of a Church",
        "href": "http://www.introibo.fr/Commun-de-la-Dedicace-d-une-eglise",
        "in": "Terribilis est",
        "inID": 923,
        "inRef": "Gen 28: 17; Ps 83: 2-3",
        "inVerses": "Ps 83: 4, 5",
        "gr": "Locus iste",
        "grID": 651,
        "al": "Adorabo",
        "alID": 242,
        "alRef": "Ps 137: 2",
        "trSept": "Qui confidunt",
        "trSeptID": 1377,
        "trSeptRef": "Ps 124: 1-2",
        "trSeptRubric": "After Septuagesima this Tract replaces the previous Alleluia.",
        "alPasch": "Bene fundata est",
        "alPaschID": 1343,
        "alPaschRubric": "In Paschal time the previous Alleluia is sung then this one.",
        "of": "Domine Deus(Dedication)",
        "ofID": 200,
        "ofRef": "1 Paral 29: 17, 18",
        "co": "Domus mea",
        "coID": 43,
        "coRef": "Matth 21: 13",
        "coVerses": "Ps 83: 2-5, 9-11",
        "gbid": "mass_dedication_church",
        "isUsed": true
    },
    "st_francis_stigmata": {
        "title": "17 Sep - Imprinting of the Holy Stigmata on St Francis, Confessor.",
        "date": "Sep17",
        "href": "http://www.introibo.fr/17-09-Impression-des-Sts-Stigmates",
        "in": "Mihi autem absit. Ps. Voce mea",
        "inID": 849,
        "inRef": "Gal 6: 14; Ps 141: 2",
        "gr": "Os justi",
        "grID": 511,
        "grRef": "Ps 36: 30-31",
        "al": "Franciscus pauper",
        "alID": 1200,
        "of": "Veritas mea",
        "ofID": 630,
        "ofRef": "Ps 88: 25",
        "co": "Fidelis servus",
        "coID": 1008,
        "coRef": "Luc 12: 42",
        "coVerses": "Ps 111: 1-9",
        "gbid": "st_francis_stigmata",
        "isUsed": true
    },
    Jan19: {
        inID:1339,
        grID:98,
        alID:755,
        ofID:1031,
        coID:699
      },
    Jan19Quad: {
        inID:1339,
        grID:98,
        trID:305,
        ofID:1031,
        coID:699
      },
      Feb18a: {
        inID:124,
        grID:174,
        trID:738,
        ofID:8253,
        coID:104
      },
      May14: {
        ref: "mass_one_martyr"
      },
      May25: {
        ref: "mass_holy_pope"
      },
      Jun2: {
        inID:788,
        grID:1009,
        alID:1030,
        ofID:786,
        coID:209
      },
      Jun2Pasch: {
        coID:772,
        alID:207,
        ofID:870,
        grID:1030,
        inID:1231
      },
      Jun9: {
        inID:11,
        grID:156,
        ofID:919,
        coID:470,
        alID:32
      },
      Jun9Pasch: {
        coID:772,
        alID:590,
        ofID:870,
        grID:32,
        inID:1231
      },
      Jun15: {
        inID:248,
        grID:963,
        coID:209,
        alID:106,
        ofID:919
      },
      Jun15Pasch: {
        coID:772,
        alID:207,
        ofID:870,
        grID:800,
        inID:1231
      },
      Jul4: {
        inID:475,
        grID:307,
        alID:8252,
        ofID:570,
        coID:1028
      },
      Jul30: {
        inID:261,
        grID:888,
        ofID:919,
        coID:184,
        alID:836
      },
      Aug26: {
        ref: "mass_holy_pope"
      },
      Sep1: {
        inID:1374,
        grID:34,
        coID:1154,
        alID:724,
        ofID:630
      },
      Sep9a: {
        inID:573,
        grID:498,
        coID:491,
        alID:1185,
        ofID:1269
      },
      Sep20: {
        inID:11,
        grID:432,
        coID:699,
        alID:896,
        ofID:33
      },
      Sep26a: {
        inID:669,
        grID:432,
        coID:126,
        alID:525,
        ofID:1113
      },
      Oct1: {
        ref: "mass_i_confessor_bishop"
      },
      Oct21: {
        ref: "mass_abbots"
      },
      Oct25: {
        ref: "mass_i_two_or_more_martyr"
      },
      Oct25a: {
        ref: "mass_ii_confessor_not_bishop"
      },
      Oct26: {
        ref: "mass_holy_pope"
      },
      Nov13a: {
        inID:656,
        grID:10607,
        alID:170,
        ofID:102,
        coID:10604
      },
      Feb23or24: {
        inID: 163,
        grID: 34,
        ofID: 407,
        coID: 365,
        "gbid": "mass_vigil_apostle"
      }
};
var chantID = {
introitus:{"gaudeamus... mariae... assumptione":{id:3312},accipite:{incipit:"Accipite",id:1278},adeamus:{psalm:{eructavit:{incipit:"Adeamus. Ps. Eructavit",id:1110},levavi:{incipit:"Adeamus. Ps. Levavi",id:603}}},adjutor:{incipit:"Adjutor",id:385},"adorate deum":{Solesmes:{incipit:"Adorate Deum",id:1123}},"ad te levavi":{Vatican:{incipit:"Ad te levavi",parenthetic:"Vatican",id:1700},Solesmes:{incipit:"Ad te levavi",id:132}},"angelus domini":{incipit:"Angelus Domini",id:69},aperite:{incipit:"Aperite",id:692},"aqua sapientiae":{Solesmes:{incipit:"Aqua sapientiae",id:1135},Vatican:{incipit:"Aqua sapientiae",parenthetic:"Vatican",id:1732}},"audivit dominus":{Solesmes:{incipit:"Audivit Dominus",id:45},Vatican:{incipit:"Audivit Dominus",parenthetic:"Vatican",id:1396}},"benedicite dominum":{incipit:"Benedicite Dominum",id:985},"benedicta sit":{Vatican:{incipit:"Benedicta sit",parenthetic:"Vatican",id:1496},Solesmes:{incipit:"Benedicta sit",id:349}},"cantate domino":{Vatican:{incipit:"Cantate Domino",parenthetic:"Vatican",id:1393},Solesmes:{incipit:"Cantate Domino",id:42}},"cantemus domino":{incipit:"Cantemus Domino",id:465},"caritas dei cum alleluia":{incipit:"Caritas Dei cum Alleluia",id:1228},"caritas dei sine alleluia":{incipit:"Caritas Dei sine Alleluia",id:530},"christo confixus sum":{incipit:"Christo confixus sum",id:775},"cibavit cum alleluia":{incipit:"Cibavit cum Alleluia",id:715},"cibavit sine alleluia":{incipit:"Cibavit sine Alleluia",id:62},"circumdederunt me":{Solesmes:{incipit:"Circumdederunt me",id:1168},Vatican:{incipit:"Circumdederunt me",parenthetic:"Vatican",id:1746}},"clamaverunt justi":{incipit:"Clamaverunt justi",id:788},"cogitationes cordis":{incipit:"Cogitationes Cordis",id:1320},cognovi:{incipit:"Cognovi",id:619},confessio:{incipit:"Confessio",id:956},"confiteantur tibi":{incipit:"Confiteantur tibi",id:381},"congregate illi":{incipit:"Congregate illi",id:826},consummatus:{incipit:"Consummatus",id:610},"cor meum":{incipit:"Cor meum",id:1256},custodivit:{incipit:"Custodivit",id:363},"da nobis, deus":{incipit:"Da nobis, Deus",id:526},"da pacem":{incipit:"Da pacem",id:172},"dedit illi":{incipit:"Dedit illi",id:1018},"dedit mihi dominus":{incipit:"Dedit mihi Dominus",id:1120},"de necessitatibus":{Vatican:{incipit:"De necessitatibus",parenthetic:"Vatican",id:1414},Solesmes:{incipit:"De necessitatibus",id:100}},"deus dum egredereris":{Vatican:{incipit:"Deus dum egredereris",parenthetic:"Vatican",id:1631},Solesmes:{incipit:"Deus dum egredereris",id:822}},"deus in adjutorium":{Solesmes:{incipit:"Deus in adjutorium",id:501},Vatican:{incipit:"Deus in adjutorium",parenthetic:"Vatican",id:1532}},"deus in loco sancto":{Solesmes:{incipit:"Deus in loco sancto",id:1026},Vatican:{incipit:"Deus in loco sancto",parenthetic:"Vatican",id:1698}},"deus in nomine tuo":{Vatican:{incipit:"Deus in nomine tuo",parenthetic:"Vatican",id:1526},Solesmes:{incipit:"Deus in nomine tuo",id:458}},"deus israel":{incipit:"Deus Israel",id:551},"deus meus":{incipit:"Deus meus",id:615},"deus misereatur":{incipit:"Deus misereatur",id:2},"de ventre matris":{incipit:"De ventre matris",id:659},"dicit dominus : ego":{incipit:"Dicit Dominus : Ego",id:735},"dicit dominus : sermones":{incipit:"Dicit Dominus : Sermones",id:409},"dicit dominus petro":{incipit:"Dicit Dominus Petro",id:1366},"dignus est agnus":{incipit:"Dignus est Agnus",id:128},"dilectio dei":{incipit:"Dilectio Dei",id:258},dilexisti:{incipit:"Dilexisti",id:629},dispersit:{incipit:"Dispersit",id:544},"domine deus":{incipit:"Domine Deus",id:1172},"domine in tua misericordia":{Solesmes:{incipit:"Domine in tua misericordia",id:146},Vatican:{incipit:"Domine in tua misericordia",parenthetic:"Vatican",id:1431}},"domine ne longe":{Solesmes:{incipit:"Domine ne longe",id:1171},Vatican:{incipit:"Domine ne longe",parenthetic:"Vatican",id:1748}},"domine refugium":{Solesmes:{incipit:"Domine refugium",id:549},Vatican:{incipit:"Domine refugium",parenthetic:"Vatican",id:1546}},"dominus dixit":{Solesmes:{incipit:"Dominus dixit",id:1175},Vatican:{incipit:"Dominus dixit",parenthetic:"Vatican",id:1750}},"dominus fortitudo":{Vatican:{incipit:"Dominus fortitudo",parenthetic:"Vatican",id:1538},Solesmes:{incipit:"Dominus fortitudo",id:522}},"dominus illuminatio":{Solesmes:{incipit:"Dominus illuminatio",id:874},Vatican:{incipit:"Dominus illuminatio",parenthetic:"Vatican",id:1650}},"dominus implebit":{incipit:"Dominus implebit",id:1259},"dominus secus mare":{incipit:"Dominus secus mare",id:693},"dum clamarem":{Vatican:{incipit:"Dum clamarem",parenthetic:"Vatican",id:1484},Solesmes:{incipit:"Dum clamarem",id:299}},"dum medium silentium":{Vatican:{incipit:"Dum medium silentium",parenthetic:"Vatican",id:1554},Solesmes:{incipit:"Dum medium silentium",id:564}},"dum sanctificatus":{Vatican:{incipit:"Dum sanctificatus",parenthetic:"Vatican",id:1517},Solesmes:{incipit:"Dum sanctificatus",id:418}},"ecce advenit":{Solesmes:{incipit:"Ecce advenit",id:403},Vatican:{incipit:"Ecce advenit",parenthetic:"Vatican",id:1512}},"ecce deus":{Vatican:{incipit:"Ecce Deus",parenthetic:"Vatican",id:1814},Solesmes:{incipit:"Ecce Deus",id:1357}},"ecce elongavi":{incipit:"Ecce elongavi",id:24},"ecce oculi":{incipit:"Ecce oculi",id:1222},"ecce virgo":{incipit:"Ecce Virgo",id:1372},"eduxit dominus":{Solesmes:{incipit:"Eduxit Dominus",id:974},Vatican:{incipit:"Eduxit Dominus",parenthetic:"Vatican",id:1683}},"eduxit eos":{Solesmes:{incipit:"Eduxit eos",id:758},Vatican:{incipit:"Eduxit eos",parenthetic:"Vatican",id:1610}},"effusum est":{incipit:"Effusum est",id:1297},"ego autem cum justitia":{Solesmes:{incipit:"Ego autem cum justitia",id:830},Vatican:{incipit:"Ego autem cum justitia",parenthetic:"Vatican",id:1634}},"ego autem in... gaudebo":{incipit:"Ego autem in... gaudebo",id:52},"ego autem in... speravi":{Solesmes:{incipit:"Ego autem in... speravi",id:1049},Vatican:{incipit:"Ego autem in... speravi",parenthetic:"Vatican",id:1705}},"ego autem sicut":{incipit:"Ego autem sicut",id:163},"ego clamavi":{Vatican:{incipit:"Ego clamavi",parenthetic:"Vatican",id:1551},Solesmes:{incipit:"Ego clamavi",id:558}},"egredimini...":{incipit:"Egredimini...",id:1283},"erit quasi signum":{incipit:"Erit quasi signum",id:493},"esto mihi":{Solesmes:{incipit:"Esto mihi",id:1381},Vatican:{incipit:"Esto mihi",parenthetic:"Vatican",id:1819}},"etenim sederunt":{Vatican:{incipit:"Etenim sederunt",parenthetic:"Vatican",id:1802},Solesmes:{incipit:"Etenim sederunt",id:1321}},"exaudi deus":{Solesmes:{incipit:"Exaudi Deus",id:904},Vatican:{incipit:"Exaudi Deus",parenthetic:"Vatican",id:1659}},"exaudi domine... adjutor":{Solesmes:{incipit:"Exaudi Domine... adjutor",id:396},Vatican:{incipit:"Exaudi Domine... adjutor",parenthetic:"Vatican",id:1509}},"exaudi domine... tibi":{incipit:"Exaudi Domine... tibi",id:990},exaudivit:{Solesmes:{incipit:"Exaudivit",id:451},Vatican:{incipit:"Exaudivit",parenthetic:"Vatican",id:1675}},"exaudivit... alleluia":{incipit:"Exaudivit... alleluia",id:939},exclamaverunt:{incipit:"Exclamaverunt",id:469},"ex ore infantium":{Vatican:{incipit:"Ex ore infantium",parenthetic:"Vatican",id:1497},Solesmes:{incipit:"Ex ore infantium",id:350}},"exspecta dominum":{Solesmes:{incipit:"Exspecta Dominum",id:60},Vatican:{incipit:"Exspecta Dominum",parenthetic:"Vatican",id:1400}},"exsultabo in jerusalem":{incipit:"Exsultabo in Jerusalem",id:1224},"exsultate deo":{incipit:"Exsultate Deo",id:1323},"exsultet gaudio":{incipit:"Exsultet gaudio",id:336},exsurge:{Vatican:{incipit:"Exsurge",parenthetic:"Vatican",id:1540},Solesmes:{incipit:"Exsurge",id:529}},"extuli electum":{incipit:"Extuli electum",id:452},"facies unctionis":{incipit:"Facies unctionis",id:1131},"fac mecum domine":{Solesmes:{incipit:"Fac mecum Domine",id:733},Vatican:{incipit:"Fac mecum Domine",parenthetic:"Vatican",id:1603}},"factum est":{incipit:"Factum est",id:1313},"factus est dominus":{Solesmes:{incipit:"Factus est Dominus",id:1111},Vatican:{incipit:"Factus est Dominus",parenthetic:"Vatican",id:1724}},foderunt:{incipit:"Foderunt",id:948},"gaudeamus... agathae":{incipit:"Gaudeamus... Agathae",id:1183},"gaudeamus... annae":{incipit:"Gaudeamus... Annae",id:950},"gaudeamus... josaphat":{incipit:"Gaudeamus... Josaphat",id:417},"gaudeamus... mariae... boni consilii":{incipit:"Gaudeamus... Mariae... Boni Consilii",id:624},"gaudeamus... mariae... reginae":{incipit:"Gaudeamus... Mariae... Reginae",id:61},"gaudeamus... mariae... solemnitate":{incipit:"Gaudeamus... Mariae... solemnitate",id:246},"gaudeamus... rosae virginis":{incipit:"Gaudeamus... Rosae Virginis",id:347},"gaudeamus... sanctorum omnium":{incipit:"Gaudeamus... Sanctorum omnium",id:752},"gaudeamus... thomae":{Vatican:{incipit:"Gaudeamus... Thomae",parenthetic:"Vatican",id:1404},Solesmes:{incipit:"Gaudeamus... Thomae",id:74}},"gaudens gaudebo":{incipit:"Gaudens gaudebo",id:655},"gaudens gaudebo... quasi":{incipit:"Gaudens gaudebo... quasi",id:622},gaudete:{Solesmes:{incipit:"Gaudete",id:1225},Vatican:{incipit:"Gaudete",parenthetic:"Vatican",id:1767}},"hi sunt qui venerunt":{incipit:"Hi sunt qui venerunt",id:669},"hodie scietis":{Solesmes:{incipit:"Hodie scietis",id:150},Vatican:{incipit:"Hodie scietis",parenthetic:"Vatican",id:1432}},humiliavit:{incipit:"Humiliavit",id:523},"illumina oculos":{incipit:"Illumina oculos",id:1072},illuxerunt:{incipit:"Illuxerunt",id:326},"inclina domine":{incipit:"Inclina Domine",id:1165},"in deo laudabo":{Solesmes:{incipit:"In Deo laudabo",id:839},Vatican:{incipit:"In Deo laudabo",parenthetic:"Vatican",id:1635}},"in excelso throno":{Vatican:{incipit:"In excelso throno",parenthetic:"Vatican",id:1387},Solesmes:{incipit:"In excelso throno",id:20}},"in medio":{incipit:"In medio",id:233},"in nomine domini":{Vatican:{incipit:"In nomine Domini",parenthetic:"Vatican",id:1458},Solesmes:{incipit:"In nomine Domini",id:236}},"in nomine jesu":{psalm:{domine:{incipit:"In nomine Jesu... Ps. Domine",id:1033},gloriabuntur:{incipit:"In nomine Jesu... Ps. Gloriabuntur",id:1295}}},"in sermonibus":{incipit:"In sermonibus",id:41},"intret in conspectu":{incipit:"Intret in conspectu",id:261},"intret oratio":{Vatican:{incipit:"Intret oratio",parenthetic:"Vatican",id:1459},Solesmes:{incipit:"Intret oratio",id:238}},"introduxit vos":{Vatican:{incipit:"Introduxit vos",parenthetic:"Vatican",id:1799},Solesmes:{incipit:"Introduxit vos",id:1315}},"in virtute tua":{incipit:"In virtute tua",id:316},"invocabit me":{Vatican:{incipit:"Invocabit me",parenthetic:"Vatican",id:1491},Solesmes:{incipit:"Invocabit me",id:327}},"in voluntate":{incipit:"In voluntate",id:1047},"jubilate deo":{Solesmes:{incipit:"Jubilate Deo",id:536},Vatican:{incipit:"Jubilate Deo",parenthetic:"Vatican",id:1543}},"judica domine":{Vatican:{incipit:"Judica Domine",parenthetic:"Vatican",id:1455},Solesmes:{incipit:"Judica Domine",id:226}},"judica me":{Solesmes:{incipit:"Judica me",id:78},Vatican:{incipit:"Judica me",parenthetic:"Vatican",id:1406}},"judicant sancti":{incipit:"Judicant sancti",id:1213},"juravit dominus":{incipit:"Juravit Dominus",id:684},"justi decantaverunt":{incipit:"Justi decantaverunt",id:312},"justi epulentur":{incipit:"Justi epulentur",id:1339},"justus es domine":{incipit:"Justus es Domine",id:1284},"justus ut palma":{incipit:"Justus ut palma",id:108},"laetabitur justus":{incipit:"Laetabitur justus",id:251},"laetare jerusalem":{Solesmes:{incipit:"Laetare Jerusalem",id:653},Vatican:{incipit:"Laetare Jerusalem",parenthetic:"Vatican",id:1581}},"laetetur cor":{Solesmes:{incipit:"Laetetur cor",id:864},Vatican:{incipit:"Laetetur cor",parenthetic:"Vatican",id:1646}},"laudate pueri":{incipit:"Laudate pueri",id:87},"lex domini":{Solesmes:{incipit:"Lex Domini",id:1216},Vatican:{incipit:"Lex Domini",parenthetic:"Vatican",id:1761}},"lex veritatis":{incipit:"Lex veritatis",id:1093},"liberator meus":{Vatican:{incipit:"Liberator meus",parenthetic:"Vatican",id:1707},Solesmes:{incipit:"Liberator meus",id:1054}},loquebar:{psalm:{"beati immaculati":{incipit:"Loquebar... Ps. Beati immaculati",id:510},"bonum est":{incipit:"Loquebar... Ps. Bonum est",id:410},laudate:{incipit:"Loquebar... Ps. Laudate",id:115}}},"loquetur dominus":{incipit:"Loquetur Dominus",id:271},"lux fulgebit":{Solesmes:{incipit:"Lux fulgebit",id:917},Vatican:{incipit:"Lux fulgebit",parenthetic:"Vatican",id:1665}},majorem:{incipit:"Majorem",id:785},meditatio:{Solesmes:{incipit:"Meditatio",id:572},Vatican:{incipit:"Meditatio",parenthetic:"Vatican",id:1556}},"me exspectaverunt":{incipit:"Me exspectaverunt",id:938},"memento nostri":{incipit:"Memento nostri",id:165},"mihi absit":{incipit:"Mihi absit",id:1037},"mihi autem absit":{psalm:{memento:{incipit:"Mihi autem absit. Ps. Memento",id:178},"virga tua":{incipit:"Mihi autem absit. Ps. Virga tua",id:1064},voce:{incipit:"Mihi autem absit. Ps. Voce",id:849}}},"mihi autem nimis":{incipit:"Mihi autem nimis",id:475},"minuisti eum":{incipit:"Minuisti eum",id:857},miseratio:{incipit:"Miseratio",id:970},"miserere... ad te":{incipit:"Miserere... ad te",id:335},"miserere... conculcavit":{Vatican:{incipit:"Miserere... conculcavit",parenthetic:"Vatican",id:1427},Solesmes:{incipit:"Miserere... conculcavit",id:138}},"miserere... tribulor":{Solesmes:{incipit:"Miserere... tribulor",id:267},Vatican:{incipit:"Miserere... tribulor",parenthetic:"Vatican",id:1468}},"misereris omnium":{Vatican:{incipit:"Misereris omnium",parenthetic:"Vatican",id:1542},Solesmes:{incipit:"Misereris omnium",id:533}},"misericordia domini":{Vatican:{incipit:"Misericordia Domini",parenthetic:"Vatican",id:1425},Solesmes:{incipit:"Misericordia Domini",id:135}},"multae tribulationes":{incipit:"Multae tribulationes",id:248},narraverunt:{incipit:"Narraverunt",id:831},"ne derelinquas me":{Vatican:{incipit:"Ne derelinquas me",parenthetic:"Vatican",id:1488},Solesmes:{incipit:"Ne derelinquas me",id:323}},"ne timeas":{incipit:"Ne timeas",id:1141},"nos autem":{incipit:"Nos autem",id:359},"nos autem (sine Gloria Patri)":{Vatican:{incipit:"Nos autem",parenthetic:"Vatican",id:1502},Solesmes:{incipit:"Nos autem",id:374}},"nunc scio vere":{incipit:"Nunc scio vere",id:478},"oculi mei":{Vatican:{incipit:"Oculi mei",parenthetic:"Vatican",id:1664},Solesmes:{incipit:"Oculi mei",id:916}},"oculus dei":{incipit:"Oculus Dei",id:1025},"omnes gentes":{Vatican:{incipit:"Omnes gentes",parenthetic:"Vatican",id:1733},Solesmes:{incipit:"Omnes gentes",id:1136}},"omnia quae fecisti":{incipit:"Omnia quae fecisti",id:1056},"omnis terra":{Solesmes:{incipit:"Omnis terra",id:13},Vatican:{incipit:"Omnis terra",parenthetic:"Vatican",id:1385}},"os justi":{incipit:"Os justi",id:1374},"pauperes sion":{incipit:"Pauperes Sion",id:94},"populus sion":{Vatican:{incipit:"Populus Sion",parenthetic:"Vatican",id:1498},Solesmes:{incipit:"Populus Sion",id:356}},"prope es tu":{Solesmes:{incipit:"Prope es tu",id:86},Vatican:{incipit:"Prope es tu",parenthetic:"Vatican",id:1409}},"protector noster":{Solesmes:{incipit:"Protector noster",id:1071},Vatican:{incipit:"Protector noster",parenthetic:"Vatican",id:1712}},"protexisti me":{incipit:"Protexisti me",id:340},"puer natus est":{Solesmes:{incipit:"Puer natus est",id:72},Vatican:{incipit:"Puer natus est",parenthetic:"Vatican",id:1403}},"quasi modo":{Solesmes:{incipit:"Quasi modo",id:25},Vatican:{incipit:"Quasi modo",parenthetic:"Vatican",id:1389}},recordare:{incipit:"Recordare",id:535},"redemisti nos":{incipit:"Redemisti nos",id:123},"redime me":{Vatican:{incipit:"Redime me",parenthetic:"Vatican",id:1798},Solesmes:{incipit:"Redime me",id:1314}},"reliqui domum":{incipit:"Reliqui domum",id:895},reminiscere:{Solesmes:{incipit:"Reminiscere",id:1294},Vatican:{incipit:"Reminiscere",parenthetic:"Vatican",id:1791}},"repleatur os":{Vatican:{incipit:"Repleatur os",parenthetic:"Vatican",id:1550},Solesmes:{incipit:"Repleatur os",id:557}},requiem:{incipit:"Requiem",id:766},"respice domine":{Solesmes:{incipit:"Respice Domine",id:691},Vatican:{incipit:"Respice Domine",parenthetic:"Vatican",id:1588}},"respice in me":{Vatican:{incipit:"Respice in me",parenthetic:"Vatican",id:1772},Solesmes:{incipit:"Respice in me",id:1235}},resurrexi:{Vatican:{incipit:"Resurrexi",parenthetic:"Vatican",id:1703},Solesmes:{incipit:"Resurrexi",id:1043}},rorate:{psalm:{benedixisti:{incipit:"Rorate... Ps. Benedixisti",id:161},"caeli enarrant":{incipit:"Rorate... Ps. Caeli enarrant",id:79},"coeli enarrant":{incipit:"Rorate... Ps. Coeli enarrant",parenthetic:"Vatican",id:1407}}},"sacerdotes dei":{incipit:"Sacerdotes Dei",id:227},"sacerdotes eius":{incipit:"Sacerdotes eius",id:3266},"sacerdotes sion":{incipit:"Sacerdotes Sion",id:605},"sacerdotes tui":{incipit:"Sacerdotes tui",id:48},"salus autem":{incipit:"Salus autem",id:737},"salus populi":{incipit:"Salus populi",id:389},"salve sancta parens":{incipit:"Salve sancta Parens",id:1140},"salvos nos fac":{incipit:"Salvos nos fac",id:575},"sancti tui":{incipit:"Sancti tui",id:1231},"sapientiam sanctorum":{incipit:"Sapientiam sanctorum",id:11},"sapientia reddidit":{incipit:"Sapientia reddidit",id:646},"satiavit dominus":{incipit:"Satiavit Dominus",id:573},"sciens jesus":{incipit:"Sciens Jesus",id:676},"scio cui credidi":{incipit:"Scio cui credidi",id:1179},"sermo meus":{incipit:"Sermo meus",id:1349},"sicut oculi":{Vatican:{incipit:"Sicut oculi",parenthetic:"Vatican",id:1807},Solesmes:{incipit:"Sicut oculi",id:1330}},"si diligis me":{incipit:"Si diligis me",id:674},"signum magnum":{incipit:"Signum magnum",id:23},"si iniquitates":{incipit:"Si iniquitates",id:1271},"sinite parvulos":{incipit:"Sinite parvulos",id:936},sitientes:{Solesmes:{incipit:"Sitientes",id:776},Vatican:{incipit:"Sitientes",parenthetic:"Vatican",id:1615}},"spiritus domini cum alleluia":{incipit:"Spiritus Domini cum Alleluia",id:861},"spiritus domini sine alleluia":{incipit:"Spiritus Domini sine Alleluia",id:636},"spiritus domini super me":{incipit:"Spiritus Domini super me",id:214},"spiritus... super me... praedicare":{incipit:"Spiritus... super me... praedicare",id:806},stabant:{incipit:"Stabant",id:149},statuit:{incipit:"Statuit",id:456},"sub umbra":{incipit:"Sub umbra",id:1195},suscepimus:{Solesmes:{incipit:"Suscepimus",id:1254},Vatican:{incipit:"Suscepimus",parenthetic:"Vatican",id:1781}},suscitabo:{incipit:"Suscitabo",id:1286},"tenuisti manum":{incipit:"Tenuisti manum",id:656},"terribilis est":{incipit:"Terribilis est",id:923},"tibi dixit":{Vatican:{incipit:"Tibi dixit",parenthetic:"Vatican",id:1607},Solesmes:{incipit:"Tibi dixit",id:751}},"timete dominum":{incipit:"Timete Dominum",id:808},"veni de libano":{incipit:"Veni de Libano",id:59},"veni et ostende":{Vatican:{incipit:"Veni et ostende",parenthetic:"Vatican",id:1439},Solesmes:{incipit:"Veni et ostende",id:169}},"venite adoremus":{incipit:"Venite adoremus",id:450},"venite benedicti":{Vatican:{incipit:"Venite benedicti",parenthetic:"Vatican",id:1690},Solesmes:{incipit:"Venite benedicti",id:997}},"venite filii":{incipit:"Venite filii",id:695},"verba mea":{Solesmes:{incipit:"Verba mea",id:1248},Vatican:{incipit:"Verba mea",parenthetic:"Vatican",id:1779}},"victricem manum":{Vatican:{incipit:"Victricem manum",parenthetic:"Vatican",id:1808},Solesmes:{incipit:"Victricem manum",id:1332}},"vidi civitatem":{incipit:"Vidi civitatem",id:5},"virgines laudent":{incipit:"Virgines laudent",id:197},"viri galilaei":{Solesmes:{incipit:"Viri Galilaei",id:1355},Vatican:{incipit:"Viri Galilaei",parenthetic:"Vatican",id:1813}},"vocem jucunditatis":{Vatican:{incipit:"Vocem jucunditatis",parenthetic:"Vatican",id:1563},Solesmes:{incipit:"Vocem jucunditatis",id:585}},"vultum tuum":{incipit:"Vultum tuum",id:124}},
alleluia:{rogavi:{id:8252},accedite:{incipit:"Accedite",id:1365},adducentur:{incipit:"Adducentur",id:208},adorabo:{incipit:"Adorabo",id:242},"amavit eum":{incipit:"Amavit eum",id:14},"angelus... apparuit":{incipit:"Angelus... apparuit",id:51},"angelus domini descendit":{incipit:"Angelus Domini descendit",id:377},"anima nostra":{incipit:"Anima nostra",id:1302},"ascendit deus":{Solesmes:{incipit:"Ascendit Deus",id:17},Vatican:{incipit:"Ascendit Deus",parenthetic:"Vatican",id:1386}},"assumpta est":{incipit:"Assumpta est",id:960},"a summo caelo":{incipit:"A summo caelo",id:254},"auditui meo":{incipit:"Auditui meo",id:453},"ave maria":{incipit:"Ave Maria",id:1209},"ave rex noster":{incipit:"Ave Rex noster",id:199},"beata es":{incipit:"Beata es",id:734},"beatam me dicent":{incipit:"Beatam me dicent",id:460},"beati qui habitant":{incipit:"Beati qui habitant",id:1050},"beatus homo":{incipit:"Beatus homo",id:116},"beatus quem elegisti":{incipit:"Beatus quem elegisti",id:1170},"beatus qui lingua":{incipit:"Beatus qui lingua",id:625},"beatus vir qui suffert":{incipit:"Beatus vir qui suffert",id:724},"beatus vir qui timet":{incipit:"Beatus vir qui timet",id:765},"beatus vir sanctus martinus":{incipit:"Beatus vir sanctus Martinus",id:988},"benedicamus patrem":{incipit:"Benedicamus Patrem",id:744},"benedic anima mea":{incipit:"Benedic anima mea",id:480},"benedicat vobis":{incipit:"Benedicat vobis",id:505},"benedicite domino":{incipit:"Benedicite Domino",id:784},"benedictio dei":{incipit:"Benedictio Dei",id:295},"benedictus dominus":{incipit:"Benedictus Dominus",id:1048},"benedictus es":{Vatican:{incipit:"Benedictus es",parenthetic:"Vatican",id:1789},Solesmes:{incipit:"Benedictus es",id:1289}},"benedictus qui venit":{incipit:"Benedictus qui venit",id:866},"bene fundata est":{incipit:"Bene fundata est",id:1343},"candor est":{incipit:"Candor est",id:1124},"cantate domino":{incipit:"Cantate Domino",id:1077},"caro mea":{Solesmes:{incipit:"Caro mea",id:774},Vatican:{incipit:"Caro mea",parenthetic:"Vatican",id:1614}},"casta generatio":{incipit:"Casta generatio",id:283},"christo confixus":{incipit:"Christo confixus",id:1162},"christus passus est":{incipit:"Christus passus est",id:1233},"christus resurgens":{Vatican:{incipit:"Christus resurgens",parenthetic:"Vatican",id:1811},Solesmes:{incipit:"Christus resurgens",id:1348}},cognoverunt:{Vatican:{incipit:"Cognoverunt",parenthetic:"Vatican",id:1662},Solesmes:{incipit:"Cognoverunt",id:912}},"concaluit cor":{incipit:"Concaluit cor",id:237},"concussum est":{incipit:"Concussum est",id:1017},condemnat:{incipit:"Condemnat",id:9},confiteantur:{incipit:"Confiteantur",id:220},confitebuntur:{incipit:"Confitebuntur",id:762},"confitemini domino et invocate":{incipit:"Confitemini... et invocate",id:1192},"confitemini domino quoniam":{incipit:"Confitemini... quoniam",id:507},"constitues eos":{incipit:"Constitues eos",id:548},"corona aurea":{incipit:"Corona aurea",id:413},"corona tribulationis":{incipit:"Corona tribulationis",id:1102},"corpora sanctorum":{incipit:"Corpora sanctorum",id:1250},"crastina die":{Vatican:{incipit:"Crastina die",parenthetic:"Vatican",id:1438},Solesmes:{incipit:"Crastina die",id:167}},"custodi innocentiam":{incipit:"Custodi innocentiam",id:262},declinabo:{incipit:"Declinabo",id:198},"dedisti mihi":{incipit:"Dedisti mihi",id:310},"de excelso":{incipit:"De excelso",id:194},"defecit caro":{incipit:"Defecit caro",id:594},"de profundis":{incipit:"De profundis",id:331},"de quacumque":{incipit:"De quacumque",id:1324},"deus autem":{incipit:"Deus autem",id:880},"deus, docuisti":{incipit:"Deus, docuisti",id:741},"deus judex justus":{Vatican:{incipit:"Deus judex justus",parenthetic:"Vatican",id:1783},Solesmes:{incipit:"Deus judex justus",id:1264}},"deus qui sedes":{Vatican:{incipit:"Deus qui sedes",parenthetic:"Vatican",id:1601},Solesmes:{incipit:"Deus qui sedes",id:727}},"deus virtutum":{incipit:"Deus virtutum",id:539},"dextera dei":{Vatican:{incipit:"Dextera Dei",parenthetic:"Vatican",id:1436},Solesmes:{incipit:"Dextera Dei",id:159}},"dicite in gentibus":{Vatican:{incipit:"Dicite in gentibus",parenthetic:"Vatican",id:1571},Solesmes:{incipit:"Dicite in gentibus",id:627}},"dies sanctificatus":{Solesmes:{incipit:"Dies sanctificatus",id:324},Vatican:{incipit:"Dies sanctificatus",parenthetic:"Vatican",id:1489}},"diffusa est":{incipit:"Diffusa est",id:1076},"dignus es domine":{incipit:"Dignus es Domine",id:983},"dilexit andream":{incipit:"Dilexit Andream",id:984},dispersit:{incipit:"Dispersit",id:569},"domine deus meus in te":{Solesmes:{incipit:"Domine Deus meus in te",id:801},Vatican:{incipit:"Domine Deus meus in te",parenthetic:"Vatican",id:1622}},"domine deus salutis":{Solesmes:{incipit:"Domine Deus salutis",id:1082},Vatican:{incipit:"Domine Deus salutis",parenthetic:"Vatican",id:1717}},"domine diligo":{incipit:"Domine diligo",id:315},"domine exaudi":{incipit:"Domine exaudi",id:595},"domine in virtute":{Vatican:{incipit:"Domine in virtute",parenthetic:"Vatican",id:1620},Solesmes:{incipit:"Domine in virtute",id:797}},"domine refugium":{Solesmes:{incipit:"Domine refugium",id:820},Vatican:{incipit:"Domine refugium",parenthetic:"Vatican",id:1630}},"dominus dabit":{incipit:"Dominus dabit",id:1146},"dominus dixit":{Vatican:{incipit:"Dominus dixit",parenthetic:"Vatican",id:1654},Solesmes:{incipit:"Dominus dixit",id:890}},"dominus in sina":{Vatican:{incipit:"Dominus in Sina",parenthetic:"Vatican",id:1399},Solesmes:{incipit:"Dominus in Sina",id:57}},"dominus regnavit decorem":{Solesmes:{incipit:"Dominus regnavit, decorem",id:714},Vatican:{incipit:"Dominus regnavit, decorem",parenthetic:"Vatican",id:1596}},"dominus regnavit exsultet":{Vatican:{incipit:"Dominus regnavit, exsultet",parenthetic:"Vatican",id:1692},Solesmes:{incipit:"Dominus regnavit, exsultet",id:1001}},"dominus salvavit":{incipit:"Dominus salvavit",id:287},"dulce lignum":{incipit:"Dulce lignum",id:859},"dum complerentur":{Solesmes:{incipit:"Dum complerentur",id:657},Vatican:{incipit:"Dum complerentur",parenthetic:"Vatican",id:1582}},"ecce concipiet":{incipit:"Ecce concipiet",id:482},"ecce quam bonum":{incipit:"Ecce quam bonum",id:1078},"ego autem cantabo":{incipit:"Ego autem cantabo",id:192},"ego dilecto":{incipit:"Ego dilecto",id:1307},"ego dominus dabo eis":{incipit:"Ego Dominus dabo eis",id:1325},"ego dominus inebriabo":{incipit:"Ego Dominus inebriabo",id:183},"ego sum pastor":{Vatican:{incipit:"Ego sum pastor",parenthetic:"Vatican",id:1765},Solesmes:{incipit:"Ego sum pastor",id:1220}},"ego vos elegi":{incipit:"Ego vos elegi",id:1030},"emitte spiritum":{Vatican:{incipit:"Emitte Spiritum",parenthetic:"Vatican",id:1413},Solesmes:{incipit:"Emitte Spiritum",id:99}},"eripe me":{Solesmes:{incipit:"Eripe me",id:879},Vatican:{incipit:"Eripe me",parenthetic:"Vatican",id:1651}},"erit autem sanguis":{incipit:"Erit autem sanguis",id:875},evangelizare:{incipit:"Evangelizare",id:297},"exaltabo te":{incipit:"Exaltabo te",id:954},"exaudi orationem":{incipit:"Exaudi orationem",id:329},"excita domine":{Solesmes:{incipit:"Excita Domine",id:855},Vatican:{incipit:"Excita Domine",parenthetic:"Vatican",id:1642}},"exite de medio":{incipit:"Exite de medio",id:1191},"exivi a patre":{Solesmes:{incipit:"Exivi a Patre",id:1040},Vatican:{incipit:"Exivi a Patre",parenthetic:"Vatican",id:1701}},exsultabo:{incipit:"Exsultabo",id:1342},"exsultate deo":{Solesmes:{incipit:"Exsultate Deo",id:580},Vatican:{incipit:"Exsultate Deo",parenthetic:"Vatican",id:1560}},"exsurge domine":{incipit:"Exsurge Domine",id:1185},"fac nos innocuam":{incipit:"Fac nos innocuam",id:213},"fecisti viriliter":{incipit:"Fecisti viriliter",id:999},"felix es sacra":{incipit:"Felix es sacra",id:481},"filii tui":{incipit:"Filii tui",id:445},flores:{incipit:"Flores",id:964},"flores... tempus":{incipit:"Flores... tempus",id:232},franciscus:{incipit:"Franciscus",id:1200},"fulgebunt justi":{incipit:"Fulgebunt justi",id:560},"gaudete justi":{incipit:"Gaudete justi",id:216},"gloriosus deus":{incipit:"Gloriosus Deus",id:274},"gressus meos":{incipit:"Gressus meos",id:352},"gustate et videte":{incipit:"Gustate et videte",id:1304},"habet in vestimento":{incipit:"Habet in vestimento",id:270},"haec dies quam fecit":{Vatican:{incipit:"Haec dies quam fecit",parenthetic:"Vatican",id:1555},Solesmes:{incipit:"Haec dies quam fecit",id:568}},"haec est generatio":{incipit:"Haec est generatio",id:852},"haec est vera":{incipit:"Haec est vera",id:32},"haec est virgo":{incipit:"Haec est virgo",id:500},"haec est vita aeterna":{incipit:"Haec est vita aeterna",id:540},"hic est discipulus":{Solesmes:{incipit:"Hic est discipulus",id:914},Vatican:{incipit:"Hic est discipulus",parenthetic:"Vatican",id:1663}},"hic est sacerdos":{incipit:"Hic est sacerdos",id:1118},"in conspectu... adorabo":{incipit:"In conspectu... adorabo",id:814},"in conspectu... domine deus":{incipit:"In conspectu... Domine Deus",id:550},"in deo salutare":{incipit:"In Deo salutare",id:663},"in deo speravit":{incipit:"In Deo speravit",id:1285},"in die resurrectionis":{Solesmes:{incipit:"In die resurrectionis",id:1042},Vatican:{incipit:"In die resurrectionis",parenthetic:"Vatican",id:1702}},inebriabuntur:{incipit:"Inebriabuntur",id:221},"in exitu israel":{incipit:"In exitu Israel",id:1380},"initio cognovi":{incipit:"Initio cognovi",id:434},"initium sapientiae":{incipit:"Initium sapientiae",id:330},"in multitudine":{incipit:"In multitudine",id:1015},"in te domine":{Solesmes:{incipit:"In te Domine",id:239},Vatican:{incipit:"In te Domine",parenthetic:"Vatican",id:1460}},"inveni david":{incipit:"Inveni David",id:1350},"ipse est directus":{incipit:"Ipse est directus",id:1094},"jacta cogitatum":{incipit:"Jacta cogitatum",id:829},"jesus autem":{incipit:"Jesus autem",id:1096},"jubilate deo":{Solesmes:{incipit:"Jubilate Deo",id:802},Vatican:{incipit:"Jubilate Deo",parenthetic:"Vatican",id:1623}},"jubilate deo... introite":{incipit:"Jubilate Deo... introite",id:253},"juravi et statui":{incipit:"Juravi et statui",id:4},"juravit dominus":{incipit:"Juravit Dominus",id:1187},"justi confitebuntur":{incipit:"Justi confitebuntur",id:893},"justi... delectentur":{incipit:"Justi... delectentur",id:896},"justi... parasti":{incipit:"Justi... Parasti",id:29},"justorum animae":{incipit:"Justorum animae",id:836},"justus germinabit":{incipit:"Justus germinabit",id:1207},"justus non conturbabitur":{incipit:"Justus non conturbabitur",id:1309},"justus ut palma":{incipit:"Justus ut palma",id:946},laetamini:{incipit:"Laetamini",id:528},"laetatus sum":{Vatican:{incipit:"Laetatus sum",parenthetic:"Vatican",id:1480},Solesmes:{incipit:"Laetatus sum",id:292}},"lauda anima mea":{id:3318},"lauda jerusalem":{incipit:"Lauda Jerusalem",id:641},"laudate deum":{Vatican:{incipit:"Laudate Deum",parenthetic:"Vatican",id:1544},Solesmes:{incipit:"Laudate Deum",id:538}},"laudate dominum":{incipit:"Laudate Dominum",id:750},"laudate pueri":{Vatican:{incipit:"Laudate pueri",parenthetic:"Vatican",id:1583},Solesmes:{incipit:"Laudate pueri",id:661}},"laudem domini":{incipit:"Laudem Domini",id:1},"leva in circuitu":{incipit:"Leva in circuitu",id:252},"levita laurentius":{incipit:"Levita Laurentius",id:1122},"lingua pravorum":{incipit:"Lingua pravorum",id:65},loquebantur:{Vatican:{incipit:"Loquebantur",parenthetic:"Vatican",id:1415},Solesmes:{incipit:"Loquebantur",id:101}},loquebar:{incipit:"Loquebar",id:642},magnificat:{incipit:"Magnificat",id:881},"magnus dominus":{Vatican:{incipit:"Magnus Dominus",parenthetic:"Vatican",id:1595},Solesmes:{incipit:"Magnus Dominus",id:709}},"magnus sanctus paulus":{incipit:"Magnus sanctus Paulus",id:466},"manum suam":{incipit:"Manum suam",id:792},"minuisti eum":{incipit:"Minuisti eum",id:791},"mirabilis dominus":{incipit:"Mirabilis Dominus",id:755},"missus est angelus":{incipit:"Missus est Angelus",id:740},"mittat vobis":{incipit:"Mittat vobis",id:191},"multifarie olim":{Solesmes:{incipit:"Multifarie olim",id:863},Vatican:{incipit:"Multifarie olim",parenthetic:"Vatican",id:1645}},"nimis honorati":{incipit:"Nimis honorati",id:130},"non derelinquet":{incipit:"Non derelinquet",id:1379},"non dilexerunt":{incipit:"Non dilexerunt",id:1360},"non vos relinquam":{Solesmes:{incipit:"Non vos relinquam",id:107},Vatican:{incipit:"Non vos relinquam",parenthetic:"Vatican",id:1417}},"nunc cum eo":{incipit:"Nunc cum eo",id:354},"nunc ergo":{incipit:"Nunc ergo",id:489},"oculus dei":{incipit:"Oculus Dei",id:473},"o joachim":{incipit:"O Joachim",id:821},"omnes gentes":{Solesmes:{incipit:"Omnes gentes",id:77},Vatican:{incipit:"Omnes gentes",parenthetic:"Vatican",id:1405}},"omnibus omnia":{incipit:"Omnibus omnia",id:170},"oportebat pati christum":{Vatican:{incipit:"Oportebat pati Christum",parenthetic:"Vatican",id:1524},Solesmes:{incipit:"Oportebat pati Christum",id:446}},"o quam bonus":{Vatican:{incipit:"O quam bonus",parenthetic:"Vatican",id:1422},Solesmes:{incipit:"O quam bonus",id:119}},"o quam pulchra":{incipit:"O quam pulchra",id:179},"o quam pulchra... immortalis":{incipit:"O quam pulchra... immortalis",id:1012},"ostende mihi":{incipit:"Ostende mihi",id:1258},"ostende nobis":{Vatican:{incipit:"Ostende nobis",parenthetic:"Vatican",id:1725},Solesmes:{incipit:"Ostende nobis",id:1115}},"o vos omnes":{incipit:"O vos omnes",id:1326},"paras mihi mensam":{incipit:"Paras mihi mensam",id:467},"paratum cor meum":{incipit:"Paratum cor meum",id:745},"pascha nostrum":{Vatican:{incipit:"Pascha nostrum",parenthetic:"Vatican",id:1612},Solesmes:{incipit:"Pascha nostrum",id:761}},pauper:{incipit:"Pauper",id:225},"per te dei genitrix":{incipit:"Per te Dei Genitrix",id:634},"post dies octo":{Solesmes:{incipit:"Post dies octo",id:275},Vatican:{incipit:"Post dies octo",parenthetic:"Vatican",id:1471}},"post partum":{incipit:"Post partum",id:127},"posuisti domine":{incipit:"Posuisti Domine",id:1249},"posui vos":{incipit:"Posui vos",id:495},"potens in terra":{incipit:"Potens in terra",id:503},"potestas ejus":{incipit:"Potestas ejus",id:746},pretiosa:{incipit:"Pretiosa",id:207},"pro omnibus":{incipit:"Pro omnibus",id:476},"prope timentes":{incipit:"Prope timentes",id:934},"propitius esto":{incipit:"Propitius esto",id:189},"propter veritatem":{incipit:"Propter veritatem",id:913},"quae est ista":{incipit:"Quae est ista",id:527},"quam magna":{incipit:"Quam magna",id:70},"quam pulchri":{incipit:"Quam pulchri",id:1378},"quasi arcus":{incipit:"Quasi arcus",id:815},"quasi palma":{incipit:"Quasi palma",id:945},"quasi rosa":{incipit:"Quasi rosa",id:1257},"qui ad justitiam":{incipit:"Qui ad justitiam",id:231},"quia factus es":{incipit:"Quia factus es",id:304},"quid bonum":{incipit:"Quid bonum",id:10},"qui docti fuerint":{incipit:"Qui docti fuerint",id:1189},"qui facit angelos":{incipit:"Qui facit Angelos",id:1202},"qui me invenerit":{incipit:"Qui me invenerit",id:40},"quinque prudentes":{incipit:"Quinque prudentes",id:301},"qui posuit fines":{incipit:"Qui posuit fines",id:700},"qui sequitur me":{incipit:"Qui sequitur me",id:1201},"quis sicut dominus":{incipit:"Quis sicut Dominus",id:430},"qui timent dominum":{incipit:"Qui timent Dominum",id:933},"qui timent te":{incipit:"Qui timent te",id:992},"quoniam deus":{incipit:"Quoniam Deus",id:1352},redemptionem:{Solesmes:{incipit:"Redemptionem",id:1341},Vatican:{incipit:"Redemptionem",parenthetic:"Vatican",id:1810}},"regnavit dominus":{Solesmes:{incipit:"Regnavit Dominus",id:405},Vatican:{incipit:"Regnavit Dominus",parenthetic:"Vatican",id:1513}},"repleti fructu":{incipit:"Repleti fructu",id:96},"repletus sum":{incipit:"Repletus sum",id:1142},"sacerdos sit sanctus":{incipit:"Sacerdos sit sanctus",id:679},"sacerdotes tui":{incipit:"Sacerdotes tui",id:930},"salvabo populum":{incipit:"Salvabo populum",id:158},"salve mater":{incipit:"Salve Mater",id:82},"salve regina":{incipit:"Salve Regina",id:717},"salvum me fac":{incipit:"Salvum me fac",id:134},"sancte michael":{incipit:"Sancte Michael",id:1103},"sancte paule":{incipit:"Sancte Paule",id:120},"sancti tui... benedicent":{incipit:"Sancti tui... benedicent",id:106},"sancti tui... florebunt":{incipit:"Sancti tui... florebunt",id:800},"sapientia hujus":{incipit:"Sapientia hujus",id:334},sapientiam:{incipit:"Sapientiam",id:706},"scitote quoniam":{incipit:"Scitote quoniam",id:1164},"senex puerum":{incipit:"Senex puerum",id:429},"sicut abundant":{incipit:"Sicut abundant",id:525},"sicut cinnamomum":{incipit:"Sicut cinnamomum",id:701},"sicut oliva":{incipit:"Sicut oliva",id:892},"si filii":{incipit:"Si filii",id:1073},"si quis manducaverit":{incipit:"Si quis manducaverit",id:1223},"si testimonium":{incipit:"Si testimonium",id:1038},solemnitas:{incipit:"Solemnitas",id:420},"solve, jubente deo":{incipit:"Solve, jubente Deo",id:16},"specie tua":{incipit:"Specie tua",id:406},"sperent in te":{incipit:"Sperent in te",id:841},"spiritus domini":{incipit:"Spiritus Domini",id:611},"spiritus ejus":{Vatican:{incipit:"Spiritus ejus",parenthetic:"Vatican",id:1734},Solesmes:{incipit:"Spiritus ejus",id:1138}},"spiritus est":{Vatican:{incipit:"Spiritus est",parenthetic:"Vatican",id:1773},Solesmes:{incipit:"Spiritus est",id:1236}},"spiritus sanctus":{Vatican:{incipit:"Spiritus Sanctus",parenthetic:"Vatican",id:1755},Solesmes:{incipit:"Spiritus Sanctus",id:1197}},"stabat sancta maria":{incipit:"Stabat sancta Maria",id:853},"surrexit christus et illuxit":{Vatican:{incipit:"Surrexit Christus et illuxit",parenthetic:"Vatican",id:1573},Solesmes:{incipit:"Surrexit Christus et illuxit",id:633}},"surrexit christus qui":{Solesmes:{incipit:"Surrexit Christus qui",id:215},Vatican:{incipit:"Surrexit Christus qui",parenthetic:"Vatican",id:1449}},"surrexit dominus de sepulcro":{Solesmes:{incipit:"Surrexit Dominus de sepulcro",id:438},Vatican:{incipit:"Surrexit Dominus de sepulcro",parenthetic:"Vatican",id:1522}},"surrexit dominus vere":{Solesmes:{incipit:"Surrexit Dominus vere",id:1217},Vatican:{incipit:"Surrexit Dominus vere",parenthetic:"Vatican",id:1762}},"surrexit quasi ignis":{incipit:"Surrexit quasi ignis",id:1276},suscitans:{incipit:"Suscitans",id:1104},"tamquam filiis":{incipit:"Tamquam filiis",id:382},"tamquam prodigium":{incipit:"Tamquam prodigium",id:664},"tanto tempore":{incipit:"Tanto tempore",id:1101},"te decet hymnus":{Solesmes:{incipit:"Te decet hymnus",id:1052},Vatican:{incipit:"Te decet hymnus",parenthetic:"Vatican",id:1706}},"te gloriosus":{incipit:"Te gloriosus",id:442},"te martyrum":{incipit:"Te Martyrum",id:590},"tibi gloria":{incipit:"Tibi gloria",id:1376},"timebunt gentes":{incipit:"Timebunt gentes",id:1097},"tollite jugum":{incipit:"Tollite jugum",id:907},"tota pulchra es":{incipit:"Tota pulchra es",id:1057},"tu es petrus":{incipit:"Tu es Petrus",id:228},"tu es sacerdos":{incipit:"Tu es Sacerdos",id:477},"tu gloria jerusalem":{incipit:"Tu gloria Jerusalem",id:1023},"tu puer":{incipit:"Tu puer",id:847},venerunt:{incipit:"Venerunt",id:1020},"veni domine":{Solesmes:{incipit:"Veni Domine",id:224},Vatican:{incipit:"Veni Domine",parenthetic:"Vatican",id:1454}},"veni sancte spiritus":{Vatican:{incipit:"Veni Sancte Spiritus",parenthetic:"Vatican",id:1442},Solesmes:{incipit:"Veni Sancte Spiritus",id:181}},"venite ad me":{incipit:"Venite ad me",id:1237},"venite, comedite":{incipit:"Venite, comedite",id:882},"venite exsultemus":{incipit:"Venite exsultemus",id:1246},"verba mea":{Solesmes:{incipit:"Verba mea",id:103},Vatican:{incipit:"Verba mea",parenthetic:"Vatican",id:1416}},"verbo domini":{Vatican:{incipit:"Verbo Domini",parenthetic:"Vatican",id:1574},Solesmes:{incipit:"Verbo Domini",id:635}},"vere tu es":{incipit:"Vere tu es",id:816},verumtamen:{incipit:"Verumtamen",id:289},"vicerunt draconem":{incipit:"Vicerunt draconem",id:911},videbitis:{incipit:"Videbitis",id:314},"video caelos":{incipit:"Video caelos",id:561},"vidimus stellam":{Vatican:{incipit:"Vidimus stellam",parenthetic:"Vatican",id:2085},Solesmes:{incipit:"Vidimus stellam",id:524}},"virga jesse":{incipit:"Virga Jesse",id:281},"virgo dei genitrix":{incipit:"Virgo Dei Genitrix",id:1114},"vita nostra":{incipit:"Vita nostra",id:122},"vivo jam non ego":{incipit:"Vivo jam non ego",id:488},"vos estis":{incipit:"Vos estis",id:440},"vota mea":{incipit:"Vota mea",id:563},"vox turturis":{incipit:"Vox turturis",id:1266}},
alleluiaById:{},
communio:{"venite ad me":{id:10604},"optimam partem":{id:3316},"ego sum vitis":{id:3314},"ab occultis meis":{Vatican:{incipit:"Ab occultis meis",parenthetic:"Vatican",id:1800},Solesmes:{incipit:"Ab occultis meis",id:1316}},acceptabis:{Solesmes:{incipit:"Acceptabis",id:1221},Vatican:{incipit:"Acceptabis",parenthetic:"Vatican",id:1766}},"adversum me":{Vatican:{incipit:"Adversum me",parenthetic:"Vatican",id:1510},Solesmes:{incipit:"Adversum me",id:397}},"amen dico vobis quidquid":{incipit:"Amen dico vobis quidquid",id:592},"amen dico vobis quod uni":{Solesmes:{incipit:"Amen dico vobis quod uni",id:623},Vatican:{incipit:"Amen dico vobis quod uni",parenthetic:"Vatican",id:1570}},"amen dico vobis quod vos":{incipit:"Amen dico vobis quod vos",id:1337},"angeli archangeli":{incipit:"Angeli Archangeli",id:599},ascendam:{incipit:"Ascendam",id:796},"aufer a me":{incipit:"Aufer a me",id:828},"beatam me dicent":{incipit:"Beatam me dicent",id:286},"beata viscera":{incipit:"Beata viscera",id:160},"beati mundo corde":{incipit:"Beati mundo corde",id:345},"beati pauperes":{incipit:"Beati pauperes",id:521},"beati servi":{incipit:"Beati servi",id:1130},"beatus qui audit":{incipit:"Beatus qui audit",id:909},"beatus servus":{incipit:"Beatus servus",id:1154},"benedicimus deum":{Vatican:{incipit:"Benedicimus Deum",parenthetic:"Vatican",id:1508},Solesmes:{incipit:"Benedicimus Deum",id:391}},"benedicite omnes angeli":{incipit:"Benedicite omnes Angeli",id:1127},benedicta:{incipit:"Benedicta",id:188},"brachia peccatorum":{incipit:"Brachia peccatorum",id:601},"cantabo domino":{Solesmes:{incipit:"Cantabo Domino",id:794},Vatican:{incipit:"Cantabo Domino",parenthetic:"Vatican",id:1619}},"cantate domino":{Vatican:{incipit:"Cantate Domino",parenthetic:"Vatican",id:1559},Solesmes:{incipit:"Cantate Domino",id:579}},"caro mea":{incipit:"Caro mea",id:90},"christo confixus":{incipit:"Christo confixus",id:598},"christus resurgens":{Solesmes:{incipit:"Christus resurgens",id:593},Vatican:{incipit:"Christus resurgens",parenthetic:"Vatican",id:1566}},"christus semel":{incipit:"Christus semel",id:1019},"cibavit illum":{incipit:"Cibavit illum",id:576},circuibo:{Solesmes:{incipit:"Circuibo",id:1079},Vatican:{incipit:"Circuibo",parenthetic:"Vatican",id:1714}},"circumduxit eam":{incipit:"Circumduxit eam",id:162},"comedite pinguia":{incipit:"Comedite pinguia",id:496},communicantes:{incipit:"Communicantes",id:732},confiteantur:{incipit:"Confiteantur",id:973},"confiteantur... quia":{incipit:"Confiteantur... quia",id:887},confundantur:{incipit:"Confundantur",id:1032},"contra spem":{incipit:"Contra spem",id:186},"cor meum":{incipit:"Cor meum",id:1367},"cum invocarem te":{Solesmes:{incipit:"Cum invocarem te",id:384},Vatican:{incipit:"Cum invocarem te",parenthetic:"Vatican",id:1506}},"data est mihi":{Solesmes:{incipit:"Data est mihi",id:1260},Vatican:{incipit:"Data est mihi",parenthetic:"Vatican",id:1782}},"date et dabitur":{incipit:"Date et dabitur",id:1003},decantaverunt:{incipit:"Decantaverunt",id:877},"de fructu":{Vatican:{incipit:"De fructu",parenthetic:"Vatican",id:1777},Solesmes:{incipit:"De fructu",id:1245}},"descendit jesus":{incipit:"Descendit Jesus",id:626},"dicit andreas":{incipit:"Dicit Andreas",id:1021},"dicit dominus":{Vatican:{incipit:"Dicit Dominus",parenthetic:"Vatican",id:1457},Solesmes:{incipit:"Dicit Dominus",id:230}},"dicite pusillanimes":{Vatican:{incipit:"Dicite : Pusillanimes",parenthetic:"Vatican",id:1451},Solesmes:{incipit:"Dicite : Pusillanimes",id:218}},"dico autem vobis":{incipit:"Dico autem vobis",id:699},"dico vobis":{Solesmes:{incipit:"Dico vobis",id:1058},Vatican:{incipit:"Dico vobis",parenthetic:"Vatican",id:1709}},diffusa:{incipit:"Diffusa",id:900},dilexisti:{incipit:"Dilexisti",id:799},"dixit jesus":{incipit:"Dixit Jesus",id:982},"domine deus meus":{Vatican:{incipit:"Domine Deus meus",parenthetic:"Vatican",id:1424},Solesmes:{incipit:"Domine Deus meus",id:131}},"domine dominus noster":{Vatican:{incipit:"Domine Dominus noster",parenthetic:"Vatican",id:1691},Solesmes:{incipit:"Domine Dominus noster",id:998}},"domine memorabor":{incipit:"Domine memorabor",id:1318},"domine quinque talenta":{incipit:"Domine quinque talenta",id:383},"domine quis habitabit":{Solesmes:{incipit:"Domine quis habitabit",id:1340},Vatican:{incipit:"Domine quis habitabit",parenthetic:"Vatican",id:1809}},"dominus dabit":{Solesmes:{incipit:"Dominus dabit",id:1036},Vatican:{incipit:"Dominus dabit",parenthetic:"Vatican",id:1470}},"dominus firmamentum":{Solesmes:{incipit:"Dominus firmamentum",id:512},Vatican:{incipit:"Dominus firmamentum",parenthetic:"Vatican",id:1536}},"dominus jesus":{Solesmes:{incipit:"Dominus Jesus",id:140},Vatican:{incipit:"Dominus Jesus",parenthetic:"Vatican",id:1428}},"dominus regit me":{Vatican:{incipit:"Dominus regit me",parenthetic:"Vatican",id:1474},Solesmes:{incipit:"Dominus regit me",id:278}},"dominus virtutum":{Solesmes:{incipit:"Dominus virtutum",id:81},Vatican:{incipit:"Dominus virtutum",parenthetic:"Vatican",id:1408}},"domus mea":{incipit:"Domus mea",id:43},"dum venerit paraclitus":{Vatican:{incipit:"Dum venerit Paraclitus",parenthetic:"Vatican",id:1392},Solesmes:{incipit:"Dum venerit Paraclitus",id:39}},"ecce dominus veniet":{Solesmes:{incipit:"Ecce Dominus veniet",id:439},Vatican:{incipit:"Ecce Dominus veniet",parenthetic:"Vatican",id:1523}},"ecce ego":{incipit:"Ecce ego",id:730},"ecce sic benedicetur":{incipit:"Ecce sic benedicetur",id:490},"ecce sto":{incipit:"Ecce sto",id:164},"ecce virgo":{Solesmes:{incipit:"Ecce virgo",id:1144},Vatican:{incipit:"Ecce virgo",parenthetic:"Vatican",id:1736}},"ego clamavi":{incipit:"Ego clamavi",id:464},"ego dilecto":{incipit:"Ego dilecto",id:459},"ego dilecto. inveni":{incipit:"Ego dilecto. Inveni",id:1161},"ego pascam":{incipit:"Ego pascam",id:491},"ego sum pastor cum alleluia":{incipit:"Ego sum pastor cum Alleluia",id:95},"ego sum pastor (sine alleluia)":{incipit:"Ego sum pastor (sine Alleluia)",id:556},"ego sum pauper":{incipit:"Ego sum pauper",id:976},"ego vos elegi":{incipit:"Ego vos elegi",id:470},"erubescant et conturbentur":{Solesmes:{incipit:"Erubescant et conturbentur",id:484},Vatican:{incipit:"Erubescant et conturbentur",parenthetic:"Vatican",id:1530}},"erubescant et revereantur":{Vatican:{incipit:"Erubescant et revereantur",parenthetic:"Vatican",id:1444},Solesmes:{incipit:"Erubescant et revereantur",id:196}},"et erat ibi":{incipit:"Et erat ibi",id:1371},"et si coram":{incipit:"Et si coram",id:658},"exiit sermo":{Solesmes:{incipit:"Exiit sermo",id:781},Vatican:{incipit:"Exiit sermo",parenthetic:"Vatican",id:1616}},"exsulta filia":{Vatican:{incipit:"Exsulta filia",parenthetic:"Vatican",id:1729},Solesmes:{incipit:"Exsulta filia",id:1125}},"exsultavit ut gigas":{Solesmes:{incipit:"Exsultavit ut gigas",id:88},Vatican:{incipit:"Exsultavit ut gigas",parenthetic:"Vatican",id:1410}},"factus est repente":{incipit:"Factus est cum Alleluia",id:1041},"factus est sine alleluia":{incipit:"Factus est sine Alleluia",id:972},"feci judicium":{incipit:"Feci judicium",id:844},"felices sensus":{incipit:"Felices sensus",id:1180},"fidelis servus":{incipit:"Fidelis servus",id:1008},"fili quid fecisti":{Solesmes:{incipit:"Fili quid fecisti",id:705},Vatican:{incipit:"Fili quid fecisti",parenthetic:"Vatican",id:1593}},"florete... et collaudate":{incipit:"Florete... et collaudate",id:995},"florete... et date":{incipit:"Florete... et date",id:104},foderunt:{incipit:"Foderunt",id:84},frumentum:{incipit:"Frumentum",id:368},"gaudete cum alleluia":{incipit:"Gaudete cum alleluia",id:772},"gaudete sine alleluia":{incipit:"Gaudete sine Alleluia",id:1109},gloriosa:{incipit:"Gloriosa",id:1004},gustate:{Solesmes:{incipit:"Gustate",id:1203},Vatican:{incipit:"Gustate",parenthetic:"Vatican",id:1756}},"hoc corpus":{Vatican:{incipit:"Hoc corpus",parenthetic:"Vatican",id:1600},Solesmes:{incipit:"Hoc corpus",id:726}},"homo peregre":{incipit:"Homo peregre",id:1132},"honora dominum":{Vatican:{incipit:"Honora Dominum",parenthetic:"Vatican",id:1737},Solesmes:{incipit:"Honora Dominum",id:1145}},"ignem veni":{incipit:"Ignem veni",id:514},"illumina faciem":{Vatican:{incipit:"Illumina faciem",parenthetic:"Vatican",id:1576},Solesmes:{incipit:"Illumina faciem",id:640}},imitatores:{incipit:"Imitatores",id:201},"inclina aurem tuam":{Vatican:{incipit:"Inclina aurem tuam",parenthetic:"Vatican",id:1494},Solesmes:{incipit:"Inclina aurem tuam",id:339}},"infirmus fui":{incipit:"Infirmus fui",id:1126},"innova signa":{incipit:"Innova signa",id:1087},"in omnem terram":{incipit:"In omnem terram",id:212},"in salutari":{incipit:"In salutari",id:1290},"in splendoribus":{Vatican:{incipit:"In splendoribus",parenthetic:"Vatican",id:1420},Solesmes:{incipit:"In splendoribus",id:117}},"intellige clamorem":{Solesmes:{incipit:"Intellige clamorem",id:373},Vatican:{incipit:"Intellige clamorem",parenthetic:"Vatican",id:1504}},introibo:{Vatican:{incipit:"Introibo",parenthetic:"Vatican",id:1548},Solesmes:{incipit:"Introibo",id:554}},"jacob autem":{incipit:"Jacob autem",id:534},"jerusalem quae":{Vatican:{incipit:"Jerusalem quae",parenthetic:"Vatican",id:1812},Solesmes:{incipit:"Jerusalem quae",id:1353}},"jerusalem surge":{Solesmes:{incipit:"Jerusalem surge",id:966},Vatican:{incipit:"Jerusalem surge",parenthetic:"Vatican",id:1681}},"joseph autem":{incipit:"Joseph autem",id:111},"joseph fili david":{incipit:"Joseph fili David",id:139},"justorum animae":{incipit:"Justorum animae",id:209},"justus dominus":{Solesmes:{incipit:"Justus Dominus",id:268},Vatican:{incipit:"Justus Dominus",parenthetic:"Vatican",id:1469}},laetabimur:{Solesmes:{incipit:"Laetabimur",id:1296},Vatican:{incipit:"Laetabimur",parenthetic:"Vatican",id:1792}},"laetabitur justus":{incipit:"Laetabitur justus",id:617},laetare:{incipit:"Laetare",id:854},"laudate dominum":{incipit:"Laudate Dominum",id:322},lavabo:{Vatican:{incipit:"Lavabo",parenthetic:"Vatican",id:1429},Solesmes:{incipit:"Lavabo",id:141}},"lutum fecit":{Vatican:{incipit:"Lutum fecit",parenthetic:"Vatican",id:1688},Solesmes:{incipit:"Lutum fecit",id:989}},"lux aeterna":{incipit:"Lux aeterna",id:241},"magna est":{incipit:"Magna est",id:365},magnificabitur:{incipit:"Magnificabitur",id:126},manducaverunt:{Vatican:{incipit:"Manducaverunt",parenthetic:"Vatican",id:1587},Solesmes:{incipit:"Manducaverunt",id:677}},"manete in me":{incipit:"Manete in me",id:112},"memento verbi tui":{incipit:"Memento verbi tui",id:696},"mense septimo":{incipit:"Mense septimo",id:1149},"mirabantur omnes":{Solesmes:{incipit:"Mirabantur omnes",id:1148},Vatican:{incipit:"Mirabantur omnes",parenthetic:"Vatican",id:1739}},"mitte manum tuam":{incipit:"Mitte manum cum Alleluia",id:953},"mitte manum sine alleluia":{incipit:"Mitte manum sine Alleluia",id:589},modicum:{Vatican:{incipit:"Modicum",parenthetic:"Vatican",id:1626},Solesmes:{incipit:"Modicum",id:813}},"multitudo... ad eum":{incipit:"Multitudo... ad eum",id:902},"multitudo... ad jesum":{incipit:"Multitudo... ad Jesum",id:833},"narrabo omnia":{Solesmes:{incipit:"Narrabo omnia",id:639},Vatican:{incipit:"Narrabo omnia",parenthetic:"Vatican",id:1575}},"nemo te condemnavit":{Vatican:{incipit:"Nemo te condemnavit",parenthetic:"Vatican",id:1694},Solesmes:{incipit:"Nemo te condemnavit",id:1010}},"ne tradideris me":{Solesmes:{incipit:"Ne tradideris me",id:1158},Vatican:{incipit:"Ne tradideris me",parenthetic:"Vatican",id:1743}},"non fecit":{incipit:"Non fecit",id:1133},"non vos relinquam":{Solesmes:{incipit:"Non vos relinquam",id:981},Vatican:{incipit:"Non vos relinquam",parenthetic:"Vatican",id:1686}},"notas mihi fecisti":{Solesmes:{incipit:"Notas mihi fecisti",id:531},Vatican:{incipit:"Notas mihi fecisti",parenthetic:"Vatican",id:1541}},"omnes gentes":{incipit:"Omnes gentes",id:8},"omnes qui":{Vatican:{incipit:"Omnes qui",parenthetic:"Vatican",id:1790},Solesmes:{incipit:"Omnes qui",id:1293}},"oportet te fili":{Solesmes:{incipit:"Oportet te fili",id:1066},Vatican:{incipit:"Oportet te fili",parenthetic:"Vatican",id:1711}},"oves meae":{incipit:"Oves meae",id:508},"pacem meam":{Solesmes:{incipit:"Pacem meam",id:91},Vatican:{incipit:"Pacem meam",parenthetic:"Vatican",id:1411}},"pacem relinquo":{incipit:"Pacem relinquo",id:942},"panem caeli":{incipit:"Panem caeli",id:711},"panem de caelo":{Solesmes:{incipit:"Panem de caelo",id:388},Vatican:{incipit:"Panem de caelo",parenthetic:"Vatican",id:1507}},"panis quem ego":{incipit:"Panis quem ego",id:782},"pascha nostrum":{Solesmes:{incipit:"Pascha nostrum",id:952},Vatican:{incipit:"Pascha nostrum",parenthetic:"Vatican",id:1677}},"passer invenit":{Solesmes:{incipit:"Passer invenit",id:1090},Vatican:{incipit:"Passer invenit",parenthetic:"Vatican",id:1720}},"pater cum essem":{Solesmes:{incipit:"Pater cum essem",id:1091},Vatican:{incipit:"Pater cum essem",parenthetic:"Vatican",id:1721}},"pater si non potest":{Vatican:{incipit:"Pater si non potest",parenthetic:"Vatican",id:1580},Solesmes:{incipit:"Pater si non potest",id:650}},"per signum crucis":{incipit:"Per signum crucis",id:346},"petite cum alleluia":{incipit:"Petite cum Alleluia",id:364},"petite sine alleluia":{incipit:"Petite sine Alleluia",id:422},"populus acquisitionis":{Solesmes:{incipit:"Populus acquisitionis",id:1219},Vatican:{incipit:"Populus acquisitionis",parenthetic:"Vatican",id:1764}},posuerunt:{incipit:"Posuerunt",id:184},"posuisti domine":{incipit:"Posuisti Domine",id:586},"potum meum":{Solesmes:{incipit:"Potum meum",id:588},Vatican:{incipit:"Potum meum",parenthetic:"Vatican",id:1564}},"praedicabant apostoli":{incipit:"Praedicabant Apostoli",id:257},"praevenisti eam":{incipit:"Praevenisti eam",id:66},"primum quaerite":{incipit:"Primum quaerite",id:868},principes:{incipit:"Principes",id:1292},"prudentes virgines":{incipit:"Prudentes Virgines",id:360},"psallite domino":{Solesmes:{incipit:"Psallite Domino",id:263},Vatican:{incipit:"Psallite Domino",parenthetic:"Vatican",id:1466}},"quae mihi fuerunt":{incipit:"Quae mihi fuerunt",id:991},"quam magna":{incipit:"Quam magna",id:6},"quam pulchri":{incipit:"Quam pulchri",id:193},"qui biberit":{Vatican:{incipit:"Qui biberit",parenthetic:"Vatican",id:1655},Solesmes:{incipit:"Qui biberit",id:894}},"quicumque fecerit":{incipit:"Quicumque fecerit",id:957},"qui fecerit":{incipit:"Qui fecerit",id:15},"qui manducat":{Vatican:{incipit:"Qui manducat",parenthetic:"Vatican",id:1621},Solesmes:{incipit:"Qui manducat",id:798}},"qui me dignatus est":{incipit:"Qui me dignatus est",id:454},"qui meditabitur":{Vatican:{incipit:"Qui meditabitur",parenthetic:"Vatican",id:2807},Solesmes:{incipit:"Qui meditabitur",id:582}},"qui mihi ministrat":{incipit:"Qui mihi ministrat",id:685},"quinque prudentes":{incipit:"Quinque prudentes",id:1301},"quis dabit":{Vatican:{incipit:"Quis dabit",parenthetic:"Vatican",id:1672},Solesmes:{incipit:"Quis dabit",id:931}},"qui vicerit":{incipit:"Qui vicerit",id:1190},"qui vult venire":{incipit:"Qui vult venire",id:89},"quod dico vobis":{incipit:"Quod dico vobis",id:1002},quotiescumque:{Vatican:{incipit:"Quotiescumque",parenthetic:"Vatican",id:1558},Solesmes:{incipit:"Quotiescumque",id:577}},"redime me":{Vatican:{incipit:"Redime me",parenthetic:"Vatican",id:1521},Solesmes:{incipit:"Redime me",id:433}},"regina mundi":{incipit:"Regina mundi",id:1053},"religio munda":{incipit:"Religio munda",id:1014},"reposita est":{incipit:"Reposita est",id:400},responsum:{incipit:"Responsum",id:803},revelabitur:{Solesmes:{incipit:"Revelabitur",id:367},Vatican:{incipit:"Revelabitur",parenthetic:"Vatican",id:1501}},"sacerdos magnus":{incipit:"Sacerdos magnus",id:1196},"scapulis suis":{Solesmes:{incipit:"Scapulis suis",id:1100},Vatican:{incipit:"Scapulis suis",parenthetic:"Vatican",id:1723}},"sedebit dominus":{incipit:"Sedebit Dominus",id:1229},"semel juravi":{incipit:"Semel juravi",id:317},"servite domino":{Vatican:{incipit:"Servite Domino",parenthetic:"Vatican",id:1656},Solesmes:{incipit:"Servite Domino",id:897}},"si ambulavero":{incipit:"Si ambulavero",id:1211},"si consurrexistis":{Vatican:{incipit:"Si consurrexistis",parenthetic:"Vatican",id:1462},Solesmes:{incipit:"Si consurrexistis",id:243}},"signa eos":{incipit:"Signa eos",id:608},"simile est... homini":{incipit:"Simile est... homini",id:673},"simile est... homini... autem":{incipit:"Simile est... homini... autem",id:944},"simile est... thesauro":{incipit:"Simile est... thesauro",id:1070},"simon joannis":{incipit:"Simon Joannis",id:846},"sinite parvulos":{incipit:"Sinite parvulos",id:643},"si quis sitit":{incipit:"Si quis sitit",id:154},"spiritus qui":{Vatican:{incipit:"Spiritus qui",parenthetic:"Vatican",id:1493},Solesmes:{incipit:"Spiritus qui",id:333}},"spiritus sanctus":{Vatican:{incipit:"Spiritus Sanctus",parenthetic:"Vatican",id:1741},Solesmes:{incipit:"Spiritus Sanctus",id:1151}},"spiritus ubi":{Vatican:{incipit:"Spiritus ubi",parenthetic:"Vatican",id:1443},Solesmes:{incipit:"Spiritus ubi",id:190}},"surrexit dominus":{Solesmes:{incipit:"Surrexit Dominus",id:121},Vatican:{incipit:"Surrexit Dominus",parenthetic:"Vatican",id:1423}},"tanto tempore":{incipit:"Tanto tempore",id:921},"tolle puerum":{Solesmes:{incipit:"Tolle puerum",id:1282},Vatican:{incipit:"Tolle puerum",parenthetic:"Vatican",id:1788}},"tollite hostias":{incipit:"Tollite hostias",id:404},"tu domine servabis":{Solesmes:{incipit:"Tu Domine servabis",id:1159},Vatican:{incipit:"Tu Domine servabis",parenthetic:"Vatican",id:1744}},"tu es petrus":{incipit:"Tu es Petrus",id:509},"tu es petrus... alleluia":{incipit:"Tu es Petrus... alleluia",id:509},"tu mandasti":{incipit:"Tu mandasti",id:479},"tu puer":{incipit:"Tu puer",id:133},"ultimo festivitatis":{Solesmes:{incipit:"Ultimo festivitatis",id:255},Vatican:{incipit:"Ultimo festivitatis",parenthetic:"Vatican",id:1465}},"unam petii":{Vatican:{incipit:"Unam petii",parenthetic:"Vatican",id:1557},Solesmes:{incipit:"Unam petii",id:574}},"unde huic sapientia haec":{incipit:"Unde huic sapientia haec",id:28},"unus militum":{incipit:"Unus militum",id:1356},"unus panis":{incipit:"Unus panis",id:147},"valde mirabilis":{incipit:"Valde mirabilis",id:204},"veni, domine":{incipit:"Veni, Domine",id:757},"venite post me":{incipit:"Venite post me",id:552},"venit sponsus":{incipit:"Venit Sponsus",id:1177},"veritas mea":{incipit:"Veritas mea",id:712},"veste sancta":{incipit:"Veste sancta",id:145},videbunt:{incipit:"Videbunt",id:1059},"videns dominus":{Vatican:{incipit:"Videns Dominus",parenthetic:"Vatican",id:1592},Solesmes:{incipit:"Videns Dominus",id:704}},"video caelos":{incipit:"Video caelos",id:920},"viderunt omnes":{Solesmes:{incipit:"Viderunt omnes",id:1139},Vatican:{incipit:"Viderunt omnes",parenthetic:"Vatican",id:1735}},videte:{incipit:"Videte",id:703},"vidimus stellam":{incipit:"Vidimus stellam",id:3047,Solesmes:{incipit:"Vidimus stellam",id:918},Vatican:{incipit:"Vidimus stellam",parenthetic:"Vatican",id:1666}},vigilate:{incipit:"Vigilate",id:341},visionem:{incipit:"Visionem",id:885},"visitasti terram":{incipit:"Visitasti terram",id:80},"volavit ad me":{incipit:"Volavit ad me",id:891},"vos estis lux":{incipit:"Vos estis lux",id:559},"vos qui secuti":{incipit:"Vos qui secuti",id:1028},"vos qui secuti... dicit":{incipit:"Vos qui secuti... dicit",id:97},vovete:{incipit:"Vovete",id:1134},"vox in rama":{Solesmes:{incipit:"Vox in Rama",id:136},Vatican:{incipit:"Vox in Rama",parenthetic:"Vatican",id:1426}}},
graduale:{"deus ℣ qui perfecit":{id:10607},"benedictus es (hymn)":{id:2166},"vultum tuum":{id:58},"ab occultis meis":{Solesmes:{incipit:"Ab occultis meis",id:1210},Vatican:{incipit:"Ab occultis meis",parenthetic:"Vatican",id:1759}},accedite:{incipit:"Accedite",id:688},"ad dominum":{Solesmes:{incipit:"Ad Dominum",id:697},Vatican:{incipit:"Ad Dominum",parenthetic:"Vatican",id:1590}},"adjutor in opportunitatibus":{Solesmes:{incipit:"Adjutor in opportunitatibus",id:222},Vatican:{incipit:"Adjutor in opportunitatibus",parenthetic:"Vatican",id:1452}},"adjutor meus":{Solesmes:{incipit:"Adjutor meus",id:851},Vatican:{incipit:"Adjutor meus",parenthetic:"Vatican",id:1641}},"adjuvabit eam":{incipit:"Adjuvabit eam",id:1373},"angelis domini":{incipit:"Angelis Domini",id:581},"angelis suis":{Solesmes:{incipit:"Angelis suis",id:834},Vatican:{incipit:"Angelis suis",parenthetic:"Vatican",id:2991}},"anima... sicut passer":{incipit:"Anima... sicut passer",id:432},"anima... sustinet":{incipit:"Anima... sustinet",id:1287},"annuntiavi justitiam":{incipit:"Annuntiavi justitiam",id:977},"aquae multae":{incipit:"Aquae multae",id:790},"a summo caelo":{incipit:"A summo caelo",id:698},"audi filia... et concupiscet":{incipit:"Audi filia... et concupiscet",id:1000},"audi filia...quia concupivit":{incipit:"Audi filia...quia concupivit",id:840},"beata gens":{incipit:"Beata gens",id:1044},"beatus quicumque":{incipit:"Beatus quicumque",id:1344},"beatus vir cujus":{incipit:"Beatus vir cujus",id:1327},"beatus vir qui timet":{incipit:"Beatus vir qui timet",id:153},"benedicam dominum":{Solesmes:{incipit:"Benedicam Dominum",id:1182},Vatican:{incipit:"Benedicam Dominum",parenthetic:"Vatican",id:1752}},"benedicite dominum":{incipit:"Benedicite Dominum",id:609},"benedicta es tu":{incipit:"Benedicta es tu",id:713},"benedicta et venerabilis":{incipit:"Benedicta et venerabilis",id:392},"benedictus dominus":{Vatican:{incipit:"Benedictus Dominus",parenthetic:"Vatican",id:1547},Solesmes:{incipit:"Benedictus Dominus",id:553}},"benedictus es":{Vatican:{incipit:"Benedictus es",parenthetic:"Vatican",id:1680},Solesmes:{incipit:"Benedictus es",id:965}},"benedictus qui venit":{Vatican:{incipit:"Benedictus qui venit",parenthetic:"Vatican",id:1450},Solesmes:{incipit:"Benedictus qui venit",id:217}},"bonum est confidere":{incipit:"Bonum est confidere",id:547},"bonum est confiteri":{incipit:"Bonum est confiteri",id:1338},"christus factus est":{Solesmes:{incipit:"Christus factus est",id:873},Vatican:{incipit:"Christus factus est",parenthetic:"Vatican",id:1649}},clamaverunt:{incipit:"Clamaverunt",id:1009},communicantes:{incipit:"Communicantes",id:1181},"concupivit rex":{incipit:"Concupivit rex",id:686},"confiteantur domino":{incipit:"Confiteantur Domino",id:971},"confiteantur tibi":{incipit:"Confiteantur tibi",id:632},"confitebuntur caeli":{incipit:"Confitebuntur caeli",id:156},"confiteor tibi":{incipit:"Confiteor tibi",id:1034},"constitues eos":{incipit:"Constitues eos",id:307},consummatus:{incipit:"Consummatus",id:12},"convertere domine":{Solesmes:{incipit:"Convertere Domine",id:1046},Vatican:{incipit:"Convertere Domine",parenthetic:"Vatican",id:1704}},"corona aurea":{incipit:"Corona aurea",id:771},"custodi me":{Solesmes:{incipit:"Custodi me",id:1088},Vatican:{incipit:"Custodi me",parenthetic:"Vatican",id:1719}},"da nobis, deus":{incipit:"Da nobis, Deus",id:414},deriventur:{incipit:"Deriventur",id:75},"desiderium cordis":{incipit:"Desiderium cordis",id:54},"deus exaudi":{Vatican:{incipit:"Deus exaudi",parenthetic:"Vatican",id:1569},Solesmes:{incipit:"Deus exaudi",id:621}},"deus qui praecinxit me":{incipit:"Deus qui praecinxit me",id:306},"deus vitam meam":{Solesmes:{incipit:"Deus vitam meam",id:118},Vatican:{incipit:"Deus vitam meam",parenthetic:"Vatican",id:1421}},"diffusa est":{incipit:"Diffusa est",id:947},dilexisti:{incipit:"Dilexisti",id:394},"diligite dominum":{incipit:"Diligite Dominum",id:375},"dirigatur oratio mea":{Solesmes:{incipit:"Dirigatur oratio mea",id:44},Vatican:{incipit:"Dirigatur oratio mea",parenthetic:"Vatican",id:1394}},"discerne causam":{Vatican:{incipit:"Discerne causam",parenthetic:"Vatican",id:1584},Solesmes:{incipit:"Discerne causam",id:665}},dispersit:{incipit:"Dispersit",id:1212},dolorosa:{incipit:"Dolorosa",id:1383},dominabitur:{incipit:"Dominabitur",id:583},"domine deus virtutum":{Vatican:{incipit:"Domine Deus virtutum",parenthetic:"Vatican",id:1391},Solesmes:{incipit:"Domine Deus virtutum",id:38}},"domine dominus noster":{Vatican:{incipit:"Domine Dominus noster",parenthetic:"Vatican",id:1757},Solesmes:{incipit:"Domine Dominus noster",id:1205}},"domine praevenisti":{incipit:"Domine praevenisti",id:600},"domine refugium":{incipit:"Domine refugium",id:1108},"domine spes mea":{incipit:"Domine spes mea",id:1334},"dominus mihi":{incipit:"Dominus mihi",id:443},"dulcis et rectus":{incipit:"Dulcis et rectus",id:1035},"ecce quam bonum":{incipit:"Ecce quam bonum",id:614},"ecce sacerdos":{incipit:"Ecce sacerdos",id:235},"ego autem":{Vatican:{incipit:"Ego autem",parenthetic:"Vatican",id:1658},Solesmes:{incipit:"Ego autem",id:903}},"ego dixi":{Solesmes:{incipit:"Ego dixi",id:399},Vatican:{incipit:"Ego dixi",parenthetic:"Vatican",id:1511}},"ego sapientia":{incipit:"Ego sapientia",id:1024},"egredietur virga":{incipit:"Egredietur virga",id:471},"electi mei":{incipit:"Electi mei",id:1084},"eripe me domine":{Vatican:{incipit:"Eripe me Domine",parenthetic:"Vatican",id:1611},Solesmes:{incipit:"Eripe me Domine",id:760}},eructavit:{incipit:"Eructavit",id:654},"esto mihi":{Vatican:{incipit:"Esto mihi",parenthetic:"Vatican",id:1652},Solesmes:{incipit:"Esto mihi",id:886}},evangelizare:{incipit:"Evangelizare",id:1273},"exaltabo te":{Vatican:{incipit:"Exaltabo te",parenthetic:"Vatican",id:1473},Solesmes:{incipit:"Exaltabo te",id:277}},"exaltent eum":{incipit:"Exaltent eum",id:1119},"excita domine":{Solesmes:{incipit:"Excita Domine",id:506},Vatican:{incipit:"Excita Domine",parenthetic:"Vatican",id:1534}},"exiit sermo":{Vatican:{incipit:"Exiit sermo",parenthetic:"Vatican",id:1591},Solesmes:{incipit:"Exiit sermo",id:702}},"ex sion species":{Solesmes:{incipit:"Ex Sion species",id:1268},Vatican:{incipit:"Ex Sion species",parenthetic:"Vatican",id:1785}},exsultabit:{incipit:"Exsultabit",id:778},exsultabunt:{incipit:"Exsultabunt",id:963},"exsulta et lauda":{incipit:"Exsulta et lauda",id:492},"exsurge domine et intende":{Solesmes:{incipit:"Exsurge... et intende",id:783},Vatican:{incipit:"Exsurge... et intende",parenthetic:"Vatican",id:1617}},"exsurge domine fer opem":{Vatican:{incipit:"Exsurge... fer opem",parenthetic:"Vatican",id:1434},Solesmes:{incipit:"Exsurge... fer opem",id:152}},"exsurge domine non praevaleat":{Vatican:{incipit:"Exsurge... non praevaleat",parenthetic:"Vatican",id:1793},Solesmes:{incipit:"Exsurge... non praevaleat",id:1298}},"fiat pax":{incipit:"Fiat pax",id:996},"flores apparuerunt":{incipit:"Flores apparuerunt",id:27},"fuit homo":{incipit:"Fuit homo",id:424},"gloria et honore":{incipit:"Gloria et honore",id:1206},"gloriosus deus":{incipit:"Gloriosus Deus",id:888},"haec dies. ℣. benedictus":{Vatican:{incipit:"Haec dies. ℣. Benedictus",parenthetic:"Vatican",id:1796},Solesmes:{incipit:"Haec dies. ℣. Benedictus",id:1305}},"haec dies. ℣. confitemini":{Solesmes:{incipit:"Haec dies. ℣. Confitemini",id:1075},Vatican:{incipit:"Haec dies. ℣. Confitemini",parenthetic:"Vatican",id:1713}},"haec dies. ℣. dextera":{Vatican:{incipit:"Haec dies. ℣. Dextera",parenthetic:"Vatican",id:1516},Solesmes:{incipit:"Haec dies. ℣. Dextera",id:416}},"haec dies. ℣. dicant nunc":{Vatican:{incipit:"Haec dies. ℣. Dicant nunc",parenthetic:"Vatican",id:1753},Solesmes:{incipit:"Haec dies. ℣. Dicant nunc",id:1188}},"haec dies. ℣. dicat nunc":{Vatican:{incipit:"Haec dies. ℣. Dicat nunc",parenthetic:"Vatican",id:1740},Solesmes:{incipit:"Haec dies. ℣. Dicat nunc",id:1150}},"haec dies. ℣. lapidem":{Solesmes:{incipit:"Haec dies. ℣. Lapidem",id:975},Vatican:{incipit:"Haec dies. ℣. Lapidem",parenthetic:"Vatican",id:1684}},"hic est qui venit":{incipit:"Hic est qui venit",id:1263},"hodie scietis":{Vatican:{incipit:"Hodie scietis",parenthetic:"Vatican",id:1445},Solesmes:{incipit:"Hodie scietis",id:202}},improperium:{incipit:"Improperium",id:780},"in deo confisum":{incipit:"In Deo confisum",id:1251},"in deo speravit":{Vatican:{incipit:"In Deo speravit",parenthetic:"Vatican",id:1647},Solesmes:{incipit:"In Deo speravit",id:865}},"inflammatum est":{incipit:"Inflammatum est",id:1186},"in me gratia":{incipit:"In me gratia",id:1214},"in omnem terram":{incipit:"In omnem terram",id:351},"in sole posuit":{Vatican:{incipit:"In sole posuit",parenthetic:"Vatican",id:1446},Solesmes:{incipit:"In sole posuit",id:203}},"inveni david":{incipit:"Inveni David",id:827},"ipse habet":{incipit:"Ipse habet",id:1368},"jacta cogitatum":{Solesmes:{incipit:"Jacta cogitatum",id:423},Vatican:{incipit:"Jacta cogitatum",parenthetic:"Vatican",id:1518}},"justorum anime":{incipit:"Justorum anime",id:98},"justus cum ceciderit":{incipit:"Justus cum ceciderit",id:764},"justus ut palma":{incipit:"Justus ut palma",id:34},"laetatus sum":{Vatican:{incipit:"Laetatus sum",parenthetic:"Vatican",id:1695},Solesmes:{incipit:"Laetatus sum",id:1011}},"laudate dominum":{incipit:"Laudate Dominum",id:348},"liberabit pauperem":{incipit:"Liberabit pauperem",id:498},"liberasti nos":{incipit:"Liberasti nos",id:395},"locus iste":{incipit:"Locus iste",id:651},mementote:{incipit:"Mementote",id:1174},"memor fui":{incipit:"Memor fui",id:73},"mihi autem":{incipit:"Mihi autem",id:571},"miserere mei deus":{Solesmes:{incipit:"Miserere mei Deus",id:754},Vatican:{incipit:"Miserere mei Deus",parenthetic:"Vatican",id:1608}},"miserere mihi":{Vatican:{incipit:"Miserere mihi",parenthetic:"Vatican",id:1553},Solesmes:{incipit:"Miserere mihi",id:562}},"misit dominus":{Solesmes:{incipit:"Misit Dominus",id:932},Vatican:{incipit:"Misit Dominus",parenthetic:"Vatican",id:1673}},"ne avertas":{Solesmes:{incipit:"Ne avertas",id:1239},Vatican:{incipit:"Ne avertas",parenthetic:"Vatican",id:1774}},"nimis honorati":{incipit:"Nimis honorati",id:148},"nova bella":{incipit:"Nova bella",id:357},"oculi omnium":{Solesmes:{incipit:"Oculi omnium",id:1230},Vatican:{incipit:"Oculi omnium",parenthetic:"Vatican",id:1770}},"omnes de saba":{Vatican:{incipit:"Omnes de Saba",parenthetic:"Vatican",id:1447},Solesmes:{incipit:"Omnes de Saba",id:205}},"omnes gentes":{incipit:"Omnes gentes",id:613},"os justi":{incipit:"Os justi",id:511},"ostende nobis":{Solesmes:{incipit:"Ostende nobis",id:1055},Vatican:{incipit:"Ostende nobis",parenthetic:"Vatican",id:1708}},"pacifice loquebantur":{Solesmes:{incipit:"Pacifice loquebantur",id:819},Vatican:{incipit:"Pacifice loquebantur",parenthetic:"Vatican",id:1629}},"pontifex sacerdos":{incipit:"Pontifex sacerdos",id:546},priusquam:{incipit:"Priusquam",id:647},"probasti domine":{incipit:"Probasti Domine",id:1027},"prope est dominus":{Solesmes:{incipit:"Prope est Dominus",id:284},Vatican:{incipit:"Prope est Dominus",parenthetic:"Vatican",id:1477}},"propitius esto":{Vatican:{incipit:"Propitius esto",parenthetic:"Vatican",id:1492},Solesmes:{incipit:"Propitius esto",id:332}},"propter fratres meos":{incipit:"Propter fratres meos",id:672},"propter veritatem":{incipit:"Propter veritatem",id:807},"protector noster":{Vatican:{incipit:"Protector noster",parenthetic:"Vatican",id:1768},Solesmes:{incipit:"Protector noster",id:1226}},"quae est ista":{incipit:"Quae est ista",id:468},"quam magna":{incipit:"Quam magna",id:1291},quemadmodum:{incipit:"Quemadmodum",id:398},"qui ambulat":{incipit:"Qui ambulat",id:637},"qui operatus est":{incipit:"Qui operatus est",id:1347},"qui sedes domine":{Solesmes:{incipit:"Qui sedes Domine",id:1007},Vatican:{incipit:"Qui sedes Domine",parenthetic:"Vatican",id:1693}},"quis sicut dominus":{incipit:"Quis sicut Dominus",id:472},"qui timetis":{incipit:"Qui timetis",id:370},"repleta est":{incipit:"Repleta est",id:519},requiem:{incipit:"Requiem",id:1261},"respice domine":{Solesmes:{incipit:"Respice Domine",id:1232},Vatican:{incipit:"Respice Domine",parenthetic:"Vatican",id:1771}},"rogate dominum":{incipit:"Rogate Dominum",id:898},"rogate quae ad pacem":{incipit:"Rogate quae ad pacem",id:180},"sacerdotes ejus":{incipit:"Sacerdotes ejus",id:415},"sacrificent domino":{incipit:"Sacrificent Domino",id:402},"salvasti enim nos":{incipit:"Salvasti enim nos",id:915},"salvos fac nos":{incipit:"Salvos fac nos",id:670},"salvum fac populum":{Solesmes:{incipit:"Salvum fac populum",id:296},Vatican:{incipit:"Salvum fac populum",parenthetic:"Vatican",id:1483}},"salvum fac servum":{Solesmes:{incipit:"Salvum fac servum",id:1117},Vatican:{incipit:"Salvum fac servum",parenthetic:"Vatican",id:1726}},"sapientia hujus mundi":{incipit:"Sapientia hujus mundi",id:1345},"sciant gentes":{Solesmes:{incipit:"Sciant gentes",id:1265},Vatican:{incipit:"Sciant gentes",parenthetic:"Vatican",id:1784}},"sederunt principes":{Solesmes:{incipit:"Sederunt principes",id:906},Vatican:{incipit:"Sederunt principes",parenthetic:"Vatican",id:1660}},"si ambulem":{Solesmes:{incipit:"Si ambulem",id:1121},Vatican:{incipit:"Si ambulem",parenthetic:"Vatican",id:1727}},"sicut lilium":{incipit:"Sicut lilium",id:748},"specie tua":{incipit:"Specie tua",id:174},"speciosus. ℣. eructavit":{Vatican:{incipit:"Speciosus. ℣. Eructavit",parenthetic:"Vatican",id:1797},Solesmes:{incipit:"Speciosus. ℣. Eructavit",id:1308}},"speciosus. ℣. filiae regum":{incipit:"Speciosus. ℣. Filiae regum",id:1354},spera:{incipit:"Spera",id:21},"spiritus domini":{incipit:"Spiritus Domini",id:1016},"suscepimus deus":{incipit:"Suscepimus Deus",id:50},"tecum principium":{Solesmes:{incipit:"Tecum principium",id:518},Vatican:{incipit:"Tecum principium",parenthetic:"Vatican",id:1537}},"tenuisti manum":{Solesmes:{incipit:"Tenuisti manum",id:49},Vatican:{incipit:"Tenuisti manum",parenthetic:"Vatican",id:1398}},"testis mihi":{incipit:"Testis mihi",id:155},"tibi domine":{Solesmes:{incipit:"Tibi Domine",id:818},Vatican:{incipit:"Tibi Domine",parenthetic:"Vatican",id:1628}},"timebunt gentes":{Solesmes:{incipit:"Timebunt gentes",id:1173},Vatican:{incipit:"Timebunt gentes",parenthetic:"Vatican",id:1749}},"timete dominum":{incipit:"Timete Dominum",id:371},"tollite hostias":{Solesmes:{incipit:"Tollite hostias",id:282},Vatican:{incipit:"Tollite hostias",parenthetic:"Vatican",id:1476}},"tollite portas":{Solesmes:{incipit:"Tollite portas",id:756},Vatican:{incipit:"Tollite portas",parenthetic:"Vatican",id:1609}},"tota formosa":{incipit:"Tota formosa",id:1166},"tribulationes cordis":{Vatican:{incipit:"Tribulationes cordis",parenthetic:"Vatican",id:1567},Solesmes:{incipit:"Tribulationes cordis",id:596}},"tu es deus":{Vatican:{incipit:"Tu es Deus",parenthetic:"Vatican",id:1640},Solesmes:{incipit:"Tu es Deus",id:850}},"unam petii. ℣. beati":{incipit:"Unam petii. ℣. Beati",id:260},"unam petii. ℣. ut videam... et protegar":{incipit:"Unam petii. ℣. Ut videam... et protegar",id:229},"unam petii. ℣. ut videam... et visitem":{incipit:"Unam petii. ℣. Ut videam... et visitem",id:565},universi:{Solesmes:{incipit:"Universi",id:1169},Vatican:{incipit:"Universi",parenthetic:"Vatican",id:1747}},"uxor tua":{incipit:"Uxor tua",id:311},"venite filii":{Vatican:{incipit:"Venite filii",parenthetic:"Vatican",id:1697},Solesmes:{incipit:"Venite filii",id:1022}},"viderunt omnes":{Vatican:{incipit:"Viderunt omnes",parenthetic:"Vatican",id:1745},Solesmes:{incipit:"Viderunt omnes",id:1163}},"vindica domine":{incipit:"Vindica Domine",id:206}},
offertorium:{"assumpta est maria":{id:3317},"viri galilaei":{id:3315},"ubi caritas est vera":{id:3313},"accedite ad dominum":{incipit:"Accedite ad Dominum",id:366},"adducam eos":{incipit:"Adducam eos",id:1275},"ad te domine":{Solesmes:{incipit:"Ad te Domine",id:962},Vatican:{incipit:"Ad te Domine",parenthetic:"Vatican",id:1679}},"afferentur... post eam":{incipit:"Afferentur... post eam",id:768},"afferentur... proximae":{incipit:"Afferentur... proximae",id:1107},"afferte domino":{incipit:"Afferte Domino",id:1277},ambulate:{incipit:"Ambulate",id:773},"angelus domini":{Solesmes:{incipit:"Angelus Domini",id:789},Vatican:{incipit:"Angelus Domini",parenthetic:"Vatican",id:1618}},"anima nostra":{Solesmes:{incipit:"Anima nostra",id:1031},Vatican:{incipit:"Anima nostra",parenthetic:"Vatican",id:1699}},"ascendit deus":{Vatican:{incipit:"Ascendit Deus",parenthetic:"Vatican",id:1448},Solesmes:{incipit:"Ascendit Deus",id:211}},"audi israel":{incipit:"Audi Israel",id:872},"ave gratia plena":{incipit:"Ave gratia plena",id:234},"ave maria":{incipit:"Ave Maria",id:210},"ave maria... et benedictus":{Solesmes:{incipit:"Ave Maria... et benedictus",id:843},Vatican:{incipit:"Ave Maria... et benedictus",parenthetic:"Vatican",id:1637}},"beata es virgo":{incipit:"Beata es Virgo",id:567},"beati qui custodiunt":{incipit:"Beati qui custodiunt",id:3},"benedicam dominum":{Solesmes:{incipit:"Benedicam Dominum",id:143},Vatican:{incipit:"Benedicam Dominum",parenthetic:"Vatican",id:1430}},"benedic anima mea":{incipit:"Benedic anima mea",id:1359},"benedicite dominum":{incipit:"Benedicite Dominum",id:1270},"benedicite gentes":{Vatican:{incipit:"Benedicite gentes",parenthetic:"Vatican",id:1643},Solesmes:{incipit:"Benedicite gentes",id:860}},"benedictio perituri":{incipit:"Benedictio perituri",id:449},"benedictus es domine doce me justificationes tuas et non tradas":{Vatican:{incipit:"Benedictus es... et non tradas",parenthetic:"Vatican",id:1514},Solesmes:{incipit:"Benedictus es... et non tradas",id:408}},"benedictus es domine doce me justificationes tuas in labiis":{Solesmes:{incipit:"Benedictus es... in labiis",id:1317},Vatican:{incipit:"Benedictus es... in labiis",parenthetic:"Vatican",id:1801}},"benedictus qui venit":{Vatican:{incipit:"Benedictus qui venit",parenthetic:"Vatican",id:1676},Solesmes:{incipit:"Benedictus qui venit",id:941}},"benedictus sit":{Vatican:{incipit:"Benedictus sit",parenthetic:"Vatican",id:1795},Solesmes:{incipit:"Benedictus sit",id:1303}},benedixerunt:{incipit:"Benedixerunt",id:1255},"benedixisti domine":{Solesmes:{incipit:"Benedixisti Domine",id:113},Vatican:{incipit:"Benedixisti Domine",parenthetic:"Vatican",id:1419}},"bonitas domini":{incipit:"Bonitas Domini",id:26},"bonum est confiteri":{Solesmes:{incipit:"Bonum est confiteri",id:1194},Vatican:{incipit:"Bonum est confiteri",parenthetic:"Vatican",id:1754}},"calix benedictionis":{incipit:"Calix benedictionis",id:320},"christi factus sum":{incipit:"Christi factus sum",id:1098},"christus unam":{incipit:"Christus unam",id:1364},cognoscetur:{incipit:"Cognoscetur",id:269},confessio:{incipit:"Confessio",id:105},"confirma hoc deus":{incipit:"Confirma hoc cum Alleluia",id:361},"confirma hoc sine Alleluia":{incipit:"Confirma hoc sine Alleluia",id:83},"confitebor domino":{Vatican:{incipit:"Confitebor Domino",parenthetic:"Vatican",id:1562},Solesmes:{incipit:"Confitebor Domino",id:584}},"confitebor tibi domine deus":{incipit:"Confitebor tibi... Deus",id:980},"confitebor tibi domine in toto":{Solesmes:{incipit:"Confitebor tibi... in toto",id:318},Vatican:{incipit:"Confitebor tibi... in toto",parenthetic:"Vatican",id:1487}},confitebuntur:{incipit:"Confitebuntur",id:1382},confortamini:{Solesmes:{incipit:"Confortamini",id:290},Vatican:{incipit:"Confortamini",parenthetic:"Vatican",id:1478}},"constitues eos":{incipit:"Constitues eos",id:1319},"cum esset desponsata":{incipit:"Cum esset desponsata",id:910},"custodi me":{Vatican:{incipit:"Custodi me",parenthetic:"Vatican",id:1803},Solesmes:{incipit:"Custodi me",id:1322}},"de profundis":{incipit:"De profundis",id:986},"desiderium animae":{incipit:"Desiderium animae",id:722},"desiderium pauperum":{incipit:"Desiderium pauperum",id:1331},"det vobis":{incipit:"Det vobis",id:1272},"deus deus meus":{Vatican:{incipit:"Deus Deus meus",parenthetic:"Vatican",id:1669},Solesmes:{incipit:"Deus Deus meus",id:924}},"deus enim":{Vatican:{incipit:"Deus enim",parenthetic:"Vatican",id:1685},Solesmes:{incipit:"Deus enim",id:979}},"deus tu convertens":{Vatican:{incipit:"Deus tu convertens",parenthetic:"Vatican",id:1572},Solesmes:{incipit:"Deus tu convertens",id:631}},"dextera domini":{Solesmes:{incipit:"Dextera Domini",id:47},Vatican:{incipit:"Dextera Domini",parenthetic:"Vatican",id:1397}},"dextera domini... alleluia":{incipit:"Dextera Domini... alleluia",id:448},"diffusa est":{incipit:"Diffusa est",id:177},"diligis justitiam":{incipit:"Diligis justitiam",id:520},"dixit jesus":{incipit:"Dixit Jesus",id:687},doctrinam:{incipit:"Doctrinam",id:1300},"domine ad adjuvandum":{Solesmes:{incipit:"Domine ad adjuvandum",id:731},Vatican:{incipit:"Domine ad adjuvandum",parenthetic:"Vatican",id:1602}},"domine convertere":{Solesmes:{incipit:"Domine convertere",id:848},Vatican:{incipit:"Domine convertere",parenthetic:"Vatican",id:1639}},"domine deus... qui repertus":{incipit:"Domine Deus... qui repertus",id:200},"domine deus salutis":{Solesmes:{incipit:"Domine Deus salutis",id:542},Vatican:{incipit:"Domine Deus salutis",parenthetic:"Vatican",id:1545}},"domine deus salutis... alleluia":{Vatican:{incipit:"Domine Deus salutis... alleluia",parenthetic:"Vatican",id:1687},Solesmes:{incipit:"Domine Deus salutis... alleluia",id:987}},"domine exaudi... et clamor":{incipit:"Domine exaudi... et clamor",id:461},"domine exaudi... ne avertas":{Vatican:{incipit:"Domine exaudi... ne avertas",parenthetic:"Vatican",id:1527},Solesmes:{incipit:"Domine exaudi... ne avertas",id:867}},"domine fac mecum":{Vatican:{incipit:"Domine fac mecum",parenthetic:"Vatican",id:1817},Solesmes:{incipit:"Domine fac mecum",id:1369}},"domine fortitudo":{incipit:"Domine fortitudo",id:1351},"domine in auxilium":{incipit:"Domine in auxilium",id:993},"domine in lumine":{incipit:"Domine in lumine",id:767},"domine jesu christe":{incipit:"Domine Jesu Christe",id:1199},"domine vivifica":{Solesmes:{incipit:"Domine vivifica",id:109},Vatican:{incipit:"Domine vivifica",parenthetic:"Vatican",id:1418}},"ecce dedi":{incipit:"Ecce dedi",id:358},"ego autem":{incipit:"Ego autem",id:607},"elegerunt apostoli":{Solesmes:{incipit:"Elegerunt Apostoli",id:462},Vatican:{incipit:"Elegerunt Apostoli",parenthetic:"Vatican",id:1528}},elegi:{incipit:"Elegi",id:7},"emitte spiritum":{Vatican:{incipit:"Emitte Spiritum",parenthetic:"Vatican",id:1751},Solesmes:{incipit:"Emitte Spiritum",id:1176}},"eo quod liberassem":{incipit:"Eo quod liberassem",id:1269},"eripe me... deus":{Solesmes:{incipit:"Eripe me... Deus",id:245},Vatican:{incipit:"Eripe me... Deus",parenthetic:"Vatican",id:1463}},"eripe me... domine":{Solesmes:{incipit:"Eripe me... Domine",id:411},Vatican:{incipit:"Eripe me... Domine",parenthetic:"Vatican",id:1515}},"erit vobis":{Vatican:{incipit:"Erit vobis",parenthetic:"Vatican",id:1433},Solesmes:{incipit:"Erit vobis",id:151}},"exaltabo te":{Solesmes:{incipit:"Exaltabo te",id:648},Vatican:{incipit:"Exaltabo te",parenthetic:"Vatican",id:1578}},"exaudi deus":{Vatican:{incipit:"Exaudi Deus",parenthetic:"Vatican",id:1636},Solesmes:{incipit:"Exaudi Deus",id:842}},exspectans:{incipit:"Exspectans",id:182},"exsultabunt sancti":{incipit:"Exsultabunt sancti",id:33},"exsulta satis":{Solesmes:{incipit:"Exsulta satis",id:929},Vatican:{incipit:"Exsulta satis",parenthetic:"Vatican",id:1671}},exsultavit:{incipit:"Exsultavit",id:1045},"factus est":{Vatican:{incipit:"Factus est",parenthetic:"Vatican",id:1453},Solesmes:{incipit:"Factus est",id:223}},"felix namque es":{incipit:"Felix namque es",id:280},"filiae regum":{incipit:"Filiae regum",id:1333},gaudeo:{incipit:"Gaudeo",id:436},gloriabuntur:{incipit:"Gloriabuntur",id:1375},"gloria et divitiae":{incipit:"Gloria et divitiae",id:125},"gloria et honore":{incipit:"Gloria et honore",id:407},"gressus meos":{Solesmes:{incipit:"Gressus meos",id:1099},Vatican:{incipit:"Gressus meos",parenthetic:"Vatican",id:1722}},holocaustum:{incipit:"Holocaustum",id:319},"honora dominum":{incipit:"Honora Dominum",id:1116},illumina:{Solesmes:{incipit:"Illumina",id:708},Vatican:{incipit:"Illumina",parenthetic:"Vatican",id:1594}},"immittet angelus":{incipit:"Immittet Angelus",id:747},"improperium... et dederunt":{incipit:"Improperium... et dederunt",id:486},"improperium exspectavit":{incipit:"Improperium exspectavit",id:628},"inclinet dominus":{incipit:"Inclinet Dominus",id:994},"in conspectu angelorum":{incipit:"In conspectu Angelorum",id:662},"in die solemnitatis":{Solesmes:{incipit:"In die solemnitatis",id:1129},Vatican:{incipit:"In die solemnitatis",parenthetic:"Vatican",id:1731}},"ingressus aaron":{incipit:"Ingressus Aaron",id:129},"inimicitias ponam":{incipit:"Inimicitias ponam",id:1083},"in me gratia":{incipit:"In me gratia",id:494},"in omnem terram":{incipit:"In omnem terram",id:570},insurrexerunt:{incipit:"Insurrexerunt",id:426},"intende voci":{Solesmes:{incipit:"Intende voci",id:293},Vatican:{incipit:"Intende voci",parenthetic:"Vatican",id:1481}},"in te speravi":{Solesmes:{incipit:"In te speravi",id:967},Vatican:{incipit:"In te speravi",parenthetic:"Vatican",id:1682}},"intonuit de caelo":{incipit:"Intonuit de caelo",id:869},"introibo ad altare":{incipit:"Introibo ad altare",id:720},"introibo in domum":{incipit:"Introibo in domum",id:876},"inveni david":{incipit:"Inveni David",id:779},"in virtute tua":{incipit:"In virtute tua",id:667},invocavit:{incipit:"Invocavit",id:244},"jubilate deo omnis":{Solesmes:{incipit:"Jubilate Deo omnis",id:718},Vatican:{incipit:"Jubilate Deo omnis",parenthetic:"Vatican",id:1598}},"jubilate deo universa":{Vatican:{incipit:"Jubilate Deo universa",parenthetic:"Vatican",id:1674},Solesmes:{incipit:"Jubilate Deo universa",id:937}},"justi epulentur":{incipit:"Justi epulentur",id:369},"justitiae domini":{Solesmes:{incipit:"Justitiae Domini",id:591},Vatican:{incipit:"Justitiae Domini",parenthetic:"Vatican",id:1565}},"justitia indutus":{incipit:"Justitia indutus",id:515},"justorum animae":{incipit:"Justorum animae",id:835},"justus ut palma":{incipit:"Justus ut palma",id:777},laetamini:{incipit:"Laetamini",id:786},"laetamini cum alleluia":{incipit:"Laetamini cum Alleluia",id:870},"laetentur caeli":{Solesmes:{incipit:"Laetentur caeli",id:811},Vatican:{incipit:"Laetentur caeli",parenthetic:"Vatican",id:1625}},"lauda anima":{Vatican:{incipit:"Lauda anima",parenthetic:"Vatican",id:1585},Solesmes:{incipit:"Lauda anima",id:668}},"lauda jerusalem":{incipit:"Lauda Jerusalem",id:845},laudamini:{incipit:"Laudamini",id:604},"laudate dominum":{Vatican:{incipit:"Laudate Dominum",parenthetic:"Vatican",id:1657},Solesmes:{incipit:"Laudate Dominum",id:899}},"levabo oculos":{Solesmes:{incipit:"Levabo oculos",id:1060},Vatican:{incipit:"Levabo oculos",parenthetic:"Vatican",id:1710}},"lignum habet":{incipit:"Lignum habet",id:166},magnificat:{incipit:"Magnificat",id:362},"majorem caritatem":{incipit:"Majorem caritatem",id:401},"meditabor cum alleluia":{incipit:"Meditabor cum Alleluia",id:1218},"meditabor sine alleluia":{incipit:"Meditabor sine Alleluia",id:810},"mihi autem adhaerere":{incipit:"Mihi autem adhaerere",id:102},"mihi autem nimis":{incipit:"Mihi autem nimis",id:499},"mirabilis deus":{incipit:"Mirabilis Deus",id:919},"miserere mihi":{Solesmes:{incipit:"Miserere mihi",id:922},Vatican:{incipit:"Miserere mihi",parenthetic:"Vatican",id:1668}},"non duplices":{incipit:"Non duplices",id:187},"non enim judicavi":{incipit:"Non enim judicavi",id:285},"non habemus hic":{incipit:"Non habemus hic",id:680},"non participentur":{incipit:"Non participentur",id:690},"obaudite me":{incipit:"Obaudite me",id:419},"o domine... ego servus":{incipit:"O Domine... ego servus",id:951},"o domine... et filius":{incipit:"O Domine... et filius",id:1193},"oratio mea":{incipit:"Oratio mea",id:185},"oravi deum":{incipit:"Oravi Deum",id:652},"perfice gressus":{Vatican:{incipit:"Perfice gressus",parenthetic:"Vatican",id:1467},Solesmes:{incipit:"Perfice gressus",id:265}},"populum humilem":{Solesmes:{incipit:"Populum humilem",id:1080},Vatican:{incipit:"Populum humilem",parenthetic:"Vatican",id:1715}},"portas caeli":{incipit:"Portas caeli",id:1361},"post partum":{incipit:"Post partum",id:427},"postula a me":{incipit:"Postula a me",id:390},posuisti:{incipit:"Posuisti",id:487},"precatus est":{Vatican:{incipit:"Precatus est",parenthetic:"Vatican",id:1490},Solesmes:{incipit:"Precatus est",id:325}},"protege domine":{incipit:"Protege Domine",id:195},"quaerite dominum":{incipit:"Quaerite Dominum",id:1069},"quam magna":{incipit:"Quam magna",id:683},"quando orabas":{incipit:"Quando orabas",id:1362},"quid bonum":{incipit:"Quid bonum",id:618},"quis ascendet":{incipit:"Quis ascendet",id:1306},"recordare mei":{incipit:"Recordare mei",id:67},"recordare virgo":{incipit:"Recordare Virgo",id:787},"regali ex progenie":{incipit:"Regali ex progenie",id:719},"reges tharsis":{Solesmes:{incipit:"Reges Tharsis",id:1147},Vatican:{incipit:"Reges Tharsis",parenthetic:"Vatican",id:1738}},"sacerdotes domini":{Vatican:{incipit:"Sacerdotes Domini",parenthetic:"Vatican",id:1577},Solesmes:{incipit:"Sacerdotes Domini",id:645}},"salus populi":{incipit:"Salus populi",id:379},"salvum me fac":{incipit:"Salvum me fac",id:328},sanctificavit:{incipit:"Sanctificavit",id:838},"scapulis suis":{Solesmes:{incipit:"Scapulis suis",id:294},Vatican:{incipit:"Scapulis suis",parenthetic:"Vatican",id:1482}},"si ambulavero":{incipit:"Si ambulavero",id:616},"sicut in holocausto":{Vatican:{incipit:"Sicut in holocausto",parenthetic:"Vatican",id:1586},Solesmes:{incipit:"Sicut in holocausto",id:675}},"sperent in te":{Vatican:{incipit:"Sperent in te",parenthetic:"Vatican",id:1805},Solesmes:{incipit:"Sperent in te",id:1328}},"stetit angelus":{incipit:"Stetit Angelus",id:302},"stetit pontifex":{incipit:"Stetit pontifex",id:723},"super flumina":{incipit:"Super flumina",id:812},"tamquam aurum":{incipit:"Tamquam aurum",id:1113},"terra tremuit":{Solesmes:{incipit:"Terra tremuit",id:725},Vatican:{incipit:"Terra tremuit",parenthetic:"Vatican",id:1599}},"timeat eum":{incipit:"Timeat eum",id:809},"tollite portas":{Solesmes:{incipit:"Tollite portas",id:171},Vatican:{incipit:"Tollite portas",parenthetic:"Vatican",id:1440}},"tuam coronam":{incipit:"Tuam coronam",id:1095},"tu es petrus":{incipit:"Tu es Petrus",id:1234},"tui sunt caeli":{Vatican:{incipit:"Tui sunt caeli",parenthetic:"Vatican",id:1786},Solesmes:{incipit:"Tui sunt caeli",id:1274}},"tulerunt jesum":{incipit:"Tulerunt Jesum",id:93},"venite filii":{incipit:"Venite filii",id:805},"veritas mea":{incipit:"Veritas mea",id:630},"viam mandatorum":{incipit:"Viam mandatorum",id:1253},videbam:{incipit:"Videbam",id:1074},"vir erat":{incipit:"Vir erat",id:1363}},
sequentia:{"dies irae":{incipit:"Dies irae",id:1198},"lauda sion":{Solesmes:{incipit:"Lauda Sion",id:308},Vatican:{incipit:"Lauda Sion",parenthetic:"Vatican",id:1485}},"stabat mater":{incipit:"Stabat Mater",id:681},"veni sancte spiritus":{Vatican:{incipit:"Veni Sancte Spiritus",parenthetic:"Vatican",id:1402},Solesmes:{incipit:"Veni Sancte Spiritus",id:68}},"victimae paschali":{Solesmes:{incipit:"Victimae paschali",id:1086},Vatican:{incipit:"Victimae paschali",parenthetic:"Vatican",id:1718}}},
tractus:{"ab ortu solis":{incipit:"Ab ortu solis",id:644},absolve:{incipit:"Absolve",id:338},"adjuva nos":{incipit:"Adjuva nos",id:380},"adoramus te":{incipit:"Adoramus te",id:114},"ad te levavi":{Solesmes:{incipit:"Ad te levavi",id:1329},Vatican:{incipit:"Ad te levavi",parenthetic:"Vatican",id:1806}},"angelis suis":{incipit:"Angelis suis",id:927},"angelus domini":{incipit:"Angelus Domini",id:660},annuntiate:{incipit:"Annuntiate",id:516},annuntiavi:{incipit:"Annuntiavi",id:1085},"apud dominum":{incipit:"Apud Dominum",id:110},"attende coelum":{incipit:"Attende coelum",parenthetic:"Vatican",id:1638},"audi filia":{incipit:"Audi filia",id:738},"ave maria":{incipit:"Ave Maria",id:266},"beatus vir cujus":{incipit:"Beatus vir cujus",id:728},"beatus vir qui timet...cupit nimis":{incipit:"Beatus vir qui timet...cupit nimis",id:7670},"beatus vir qui timet...delectatur":{incipit:"Beatus vir qui timet...delectatur",id:444},"benedicte dominum":{incipit:"Benedicte Dominum",id:949},"bonum est confiteri":{incipit:"Bonum est confiteri",id:1063},"cantemus domino":{incipit:"Cantemus Domino",parenthetic:"Vatican",id:1661},"christo igitur":{incipit:"Christo igitur",id:1005},commovisti:{Vatican:{incipit:"Commovisti",parenthetic:"Vatican",id:2377},Solesmes:{incipit:"Commovisti",id:1178}},confitemini:{Solesmes:{incipit:"Confitemini",id:455},Vatican:{incipit:"Confitemini",parenthetic:"Vatican",id:1525}},"contristatus sum":{incipit:"Contristatus sum",id:175},"cor meum":{incipit:"Cor meum",id:63},"de necessitatibus":{Vatican:{incipit:"De necessitatibus",parenthetic:"Vatican",id:1472},Solesmes:{incipit:"De necessitatibus",id:276}},"de profundis":{Solesmes:{incipit:"De profundis",id:926},Vatican:{incipit:"De profundis",parenthetic:"Vatican",id:1670}},desiderium:{incipit:"Desiderium",id:176},"deus deus meus":{Solesmes:{incipit:"Deus Deus meus",id:372},Vatican:{incipit:"Deus Deus meus",parenthetic:"Vatican",id:1503}},"deus docuisti":{incipit:"Deus docuisti",id:682},"domine audivi":{incipit:"Domine audivi",parenthetic:"Vatican",id:1437},"domine deus":{incipit:"Domine Deus",id:1167},"domine exaudi":{Solesmes:{incipit:"Domine exaudi",id:824},Vatican:{incipit:"Domine exaudi",parenthetic:"Vatican",id:1633}},"domine non secundum":{Vatican:{incipit:"Domine non secundum",parenthetic:"Vatican",id:1519},Solesmes:{incipit:"Domine non secundum",id:425}},"ecce sic benedicetur":{incipit:"Ecce sic benedicetur",id:144},effuderunt:{Vatican:{incipit:"Effuderunt",parenthetic:"Vatican",id:1461},Solesmes:{incipit:"Effuderunt",id:240}},"ego autem cum":{incipit:"Ego autem cum",id:437},"ego diligentes":{incipit:"Ego diligentes",id:858},"ego pascam":{incipit:"Ego pascam",id:769},"ego sum":{incipit:"Ego sum",id:56},"emitte spiritum":{incipit:"Emitte Spiritum",id:925},"eripe me":{incipit:"Eripe me",parenthetic:"Vatican",id:1561},"exaudi me":{incipit:"Exaudi me",id:1105},exsurge:{incipit:"Exsurge",id:1370},"factus es":{incipit:"Factus es",id:837},"filii hominum":{incipit:"Filii hominum",id:343},"fortitudo mea":{incipit:"Fortitudo mea",id:250},"fundamenta ejus":{incipit:"Fundamenta ejus",id:689},"gaude maria":{incipit:"Gaude Maria",id:18},"gratificavit nos":{incipit:"Gratificavit nos",id:502},"gustate... ℣. beatus":{incipit:"Gustate... ℣. Beatus",id:219},"gustate... ℣. timete":{incipit:"Gustate... ℣. Timete",id:968},hostiam:{incipit:"Hostiam",id:1153},"induit eum":{incipit:"Induit eum",id:76},"ipse invocabit me":{incipit:"Ipse invocabit me",id:483},"jam hiems":{incipit:"Jam hiems",id:739},"jubilate domino":{Vatican:{incipit:"Jubilate Domino",parenthetic:"Vatican",id:1794},Solesmes:{incipit:"Jubilate Domino",id:1299}},"laudate... omnes angeli":{incipit:"Laudate... omnes Angeli",id:671},"laudate... omnes gentes":{Solesmes:{incipit:"Laudate... omnes gentes",id:1247},Vatican:{incipit:"Laudate... omnes gentes",parenthetic:"Vatican",id:1778}},magnificentiam:{incipit:"Magnificentiam",id:92},"manum suam":{incipit:"Manum suam",id:249},"meum est consilium":{incipit:"Meum est consilium",id:412},"miserere mei":{incipit:"Miserere mei",id:729},"misericors et miserator":{incipit:"Misericors et miserator",id:1244},"misit me":{incipit:"Misit me",id:883},nolite:{incipit:"Nolite",id:1112},"non judicavi":{incipit:"Non judicavi",id:969},"notus in judaea":{incipit:"Notus in Judaea",id:421},"nunc dimittis":{incipit:"Nunc dimittis",id:1346},"nunc ergo":{incipit:"Nunc ergo",id:793},"omnis gloria":{incipit:"Omnis gloria",id:19},persequar:{incipit:"Persequar",id:35},"probasti nos":{incipit:"Probasti nos",id:55},"qui confidunt":{Solesmes:{incipit:"Qui confidunt",id:1377},Vatican:{incipit:"Qui confidunt",parenthetic:"Vatican",id:1818}},"qui gloriatur":{incipit:"Qui gloriatur",id:928},"qui habitat":{Solesmes:{incipit:"Qui habitat",id:889},Vatican:{incipit:"Qui habitat",parenthetic:"Vatican",id:1653}},"qui regis israel":{Solesmes:{incipit:"Qui regis Israel",id:1157},Vatican:{incipit:"Qui regis Israel",parenthetic:"Vatican",id:1742}},"qui seminant":{incipit:"Qui seminant",id:305},"sacerdotes ejus":{incipit:"Sacerdotes ejus",id:1281},"saepe expugnaverunt":{Solesmes:{incipit:"Saepe expugnaverunt",id:742},Vatican:{incipit:"Saepe expugnaverunt",parenthetic:"Vatican",id:1605}},"sicut cervus":{incipit:"Sicut cervus",parenthetic:"Vatican",id:1395},"si quis putat":{incipit:"Si quis putat",id:710},"stabat sancta maria":{incipit:"Stabat sancta Maria",id:1156},"surge domine":{incipit:"Surge Domine",id:597},suscepimus:{incipit:"Suscepimus",id:1240},"te deum patrem":{incipit:"Te Deum Patrem",id:763},"tu es petrus":{incipit:"Tu es Petrus",id:1029},"tu es vas":{incipit:"Tu es vas",id:884},"tu gloria jerusalem":{incipit:"Tu gloria Jerusalem",id:485},"veni sponsa":{incipit:"Veni sponsa",id:256},"vere languores":{incipit:"Vere languores",id:978},"vinea facta est":{incipit:"Vinea facta est",parenthetic:"Vatican",id:1388}}
};
for(key in chantID.alleluia) {
    var obj = chantID.alleluia[key];
    if(obj.id) {
        chantID.alleluiaById[obj.id] = key;
    } else {
        for(k in obj) {
            chantID.alleluiaById[obj[k].id] = key;
        }
    }
    chantID.graduale['alleluia ℣. ' + key] = chantID.alleluia[key];
}
var module;
if(module && module.exports) module.exports.proprium = proprium;
