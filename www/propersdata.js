var sundayKeys = [
    {title:"Proprium Temporum...",en:"Proper of the Time..."},
    {key:"Adv1",title:"I Adventus",en:"1st Sunday in Advent"},
    {key:"Adv2",title:"II Adventus",en:"2nd Sunday in Advent"},
    {key:"Adv3",title:"III Adventus",en:"3rd Sunday in Advent"},
    {key:"Adv3Wed",title:"Feria Quarta IV Temporum in Adventu",en:"Ember Wednesday in Advent"},
    {key:"Adv3Fri",title:"Feria Sexta IV Temporum in Adventu",en:"Ember Friday in Advent"},
    {key:"Adv3Sat",title:"Sabbato IV Temporum in Adventu",en:"Ember Saturday in Advent"},
    {key:"Adv4",title:"IV Adventus",en:"4th Sunday in Advent"},
    {key:"Dec24",title:"pridie Nativitas",en:"Christmas Eve"},
    {key:"Dec25_1",title:"Nativitas Domini, Missa ad media noctem",en:"The Nativity of our Lord (Christmas), Mass at Midnight"},
    {key:"Dec25_2",title:"Nativitas Domini, Missa ad matutinam",en:"Christmas, Mass at dawn"},
    {key:"Dec25_3",title:"Nativitas Domini, Missa interdiu",en:"Christmas, Mass during the day"},
    {key:"Nat1",title:"*Circumcisione Domini",en:"Sunday within the octave of Christmas"},
    {key:"Jan1",title:"Octava Nativitatis",en:"Octave day of Christmas (Jan 1.)"},
    {key:"Nat2",title:"*Octava St Stephani",en:"Sunday preceding the Epiphany (Holy Name of Jesus)"},
    {key:"Epi",title:"Epiphania",en:"Epiphany"},
    {key:"Epi1",title:"I post Epiphaniam",en:"1st Sunday after Epiphany (Holy Family)"},
    {key:"Epi2",title:"II post Epiphaniam",en:"2nd Sunday after Epiphany"},
    {key:"Epi3",title:"III (IV, V, et VI quoque) post Epiphaniam",en:"3rd (also 4th, 5th, and 6th) Sunday after Epiphany"},
    {key:"Septua",title:"Septuagesima",en:"Septuagesima"},
    {key:"Sexa",title:"Sexagesima",en:"Sexagesima"},
    {key:"Quinqua",title:"Quinquegesima",en:"Quinquagesima"},
    {key:"AshWed",title:"Feria IV Cinerum",en:"Ash Wednesday"},
    {key:"Quad1",title:"I in Quadragesima",en:"1st Sunday in Lent"},
    {key:"Quad1Sat",title:"Sabbato IV Temporum in Quadragesima",en:"Ember Saturday in Lent"},
    {key:"Quad2",title:"II in Quadragesima",en:"2nd Sunday in Lent"},
    {key:"Quad3",title:"III in Quadragesima",en:"3rd Sunday in Lent"},
    {key:"Quad3m",title:"Feria II post Dominica III Quadragesime",en:"Monday in the 3rd week of Lent"},
    {key:"Quad4",title:"IV in Quadragesima",en:"4th Sunday in Lent"},
    {key:"Quad4m",title:"Feria II post Dominica IV Quadragesime",en:"Monday in the 4th week of Lent"},
    {key:"Quad5",title:"Passionis",en:"Passion Sunday"},
    {key:"Quad5m",title:"Feria II in Passionis",en:"Monday in Passion Week"},
    {key:"Quad6",title:"*Dominica in Palmis",en:"Palm Sunday"},
    {key:"Quad6m",title:"Feria II Hebdomadæ Sanctæ",en:"Monday in Holy Week"},
    {key:"Quad6t",title:"Feria III Hebdomadæ Sanctæ",en:"Tuesday in Holy Week"},
    {key:"Quad6w",title:"Feria IV Hebdomadæ Sanctæ",en:"Wednesday in Holy Week"},
    {key:"Quad6h",title:"Feria V in Cena Domini",en:"Maundy Thursday"},
    {key:"Quad6f",title:"Feria VI in Passione et Morte Domini",en:"Good Friday"},
    {key:"Quad6s",title:"Vigilia Paschalis",en:"Easter Vigil"},
    {key:"Pasc0",title:"*Dominica Resurrectionis",en:"Easter Sunday"},
    {key:"Pasc0m",title:"Feria II Infra Oct Paschæ",en:"Easter Monday"},
    {key:"Pasc0t",title:"Feria III Infra Oct Paschæ",en:"Easter Tuesday"},
    {key:"Pasc0w",title:"Feria IV Infra Oct Paschæ",en:"Easter Wednesday"},
    {key:"Pasc0h",title:"Feria V Infra Oct Paschæ",en:"Easter Thursday"},
    {key:"Pasc0f",title:"Feria VI Infra Oct Paschæ",en:"Easter Friday"},
    {key:"Pasc0s",title:"Sabbato Infra Oct Paschæ",en:"Easter Saturday"},
    {key:"Pasc1",title:"I post Oct Pasche",en:"Low Sunday (The Octave of Easter)"},
    {key:"Pasc2",title:"II post Oct Pasche",en:"2nd Sunday after Easter"},
    {key:"Pasc3",title:"III post Oct Pasche",en:"3rd Sunday after Easter"},
    {key:"Pasc4",title:"IV post Oct Pasche",en:"4th Sunday after Easter"},
    {key:"Pasc5",title:"V post Oct Pasche",en:"5th Sunday after Easter"},
    {key:"Asc",title:"Ascensio",en:"Ascension Thursday"},
    {key:"Pasc6",title:"in Octavam Ascensione Domini",en:"Sunday within the octave of the Ascension"},
    {key:"Pent0",title:"*Dominica Pentecostes",en:"Pentecost (Whitsunday)"},
    {key:"Pent0m",title:"Feria II Infra Oct Pentecostes",en:"Pentecost Monday"},
    {key:"Pent0t",title:"Feria III Infra Oct Pentecostes",en:"Pentecost Tuesday"},
    {key:"Pent0w",title:"Feria IV Infra Oct Pentecostes",en:"Pentecost Wednesday"},
    {key:"Pent0h",title:"Feria V Infra Oct Pentecostes",en:"Pentecost Thursday"},
    {key:"Pent0f",title:"Feria VI Infra Oct Pentecostes",en:"Pentecost Friday"},
    {key:"Pent0s",title:"Sabbato Infra Oct Pentecostes",en:"Pentecost Saturday"},    
    {key:"Pent1",title:"Sanctissimæ Trinitatis",en:"Trinity Sunday"},
    {key:"CorpusChristi",title:"Corpus Christi",en:"Corpus Christi"},
    {key:"Pent2",title:"infra Octavam Sme Corporis Christi",en:"Sunday within the octave of Corpus Christi (2nd after Pentecost)"},
    {key:"SCJ",title:"Sacratissimum Cor Jesu",en:"Most Sacred Heart of Jesus"},
    {key:"Pent3",title:"infra Octavam Sme Cordis Jesu",en:"3rd Sunday after Pentecost"},
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
    {key:"EmbSatSept",title:"Sabbato IV Temporum Septembre",en:"Ember Saturday in September"},
    {key:"Pent18",title:"18 post Pentecosten",en:"18th Sunday after Pentecost"},
    {key:"Pent19",title:"19 post Pentecosten",en:"19th Sunday after Pentecost"},
    {key:"Pent20",title:"20 post Pentecosten",en:"20th Sunday after Pentecost"},
    {key:"Pent21",title:"21 post Pentecosten",en:"21st Sunday after Pentecost"},
    {key:"Pent22",title:"22 post Pentecosten",en:"22nd Sunday after Pentecost"},
    {key:"Pent23",title:"23 (usque ad postrema) post Pentecosten",en:"23rd (through last) Sunday after Pentecost"},
    {key:"ChristusRex",title:"Domini Nostri Jesu Christi Regis",en:"Feast of Our Lord Jesus Christ, King"}
];
var otherKeys = [
    {title:"Selige alia propria...",en:"Select other propers..."},
    {title:"Missa quælibet",key:"custom",en:"Custom"},
    {key:"nuptialis",title:"Missa nuptialis",en:"Wedding Mass"},
    {key:"defunctorum",title:"Missa pro Defunctis",en:"Mass for the Dead"},
    {key:"dedicatio",title:"Missa Dedicationis Ecclesiæ",en:"Mass of the dedication of a church"},
    {key:"SCJ",title:"Missa votiva de Sacratissimo Corde Jesu",en:"Votive Mass of the Most Sacred Heart of Jesus"}
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
    {key:"Feb22",title:"Feb 22: Chair of St Peter",en:"Feb 22: Chair of St Peter"},
    {key:"Feb23",title:"Feb 23: St Peter Damian",en:"Feb 23: St Peter Damian"},
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
    {key:"Mar19",title:"Mar 19: St Joseph",en:"Mar 19: St Joseph"},
    {key:"Mar21",title:"Mar 21: St Benedict",en:"Mar 21: St Benedict"},
    {key:"Mar24",title:"Mar 24: St Gabriel the Archangel",en:"Mar 24: St Gabriel the Archangel"},
    {key:"Mar25",title:"Mar 25: Annunciation of Our Lady",en:"Mar 25: Annunciation of Our Lady"},
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
    {key:"May1",title:"May 1: St Joseph the Worker",en:"May 1: St Joseph the Worker"},
    {key:"May2",title:"May 2: St Athanasius",en:"May 2: St Athanasius"},
    {key:"May4",title:"May 4: St Monica",en:"May 4: St Monica"},
    {key:"May5",title:"May 5: St Pius V",en:"May 5: St Pius V"},
    {key:"May7",title:"May 7: St Stanislaus",en:"May 7: St Stanislaus"},
    {key:"May9",title:"May 9: St Gregory Nazianzen",en:"May 9: St Gregory Nazianzen"},
    {key:"May10",title:"May 10: St Antoninus",en:"May 10: St Antoninus"},
    {key:"May11",title:"May 11: Ss Philip and James",en:"May 11: Ss Philip and James"},
    {key:"May12",title:"May 12: Ss Nereus, Achilleus, Domitilla, and Pancras",en:"May 12: Ss Nereus, Achilleus, Domitilla, and Pancras"},
    {key:"May13",title:"May 13: St Robert Bellarmine",en:"May 13: St Robert Bellarmine"},
    {key:"May15",title:"May 15: St John Baptist de la Salle",en:"May 15: St John Baptist de la Salle"},
    {key:"May16",title:"May 16: St Ubaldus",en:"May 16: St Ubaldus"},
    {key:"May17",title:"May 17: St Paschal Baylon",en:"May 17: St Paschal Baylon"},
    {key:"May18",title:"May 18: St Venantius",en:"May 18: St Venantius"},
    {key:"May19",title:"May 19: St Peter Celestine",en:"May 19: St Peter Celestine"},
    {key:"May20",title:"May 20: St Bernardine of Siena",en:"May 20: St Bernardine of Siena"},
    {key:"May24",title:"May 24: Our Lady Help of Christians",en:"May 24: Our Lady Help of Christians"},
    {key:"May26",title:"May 26: St Philip Neri",en:"May 26: St Philip Neri"},
    {key:"May27",title:"May 27: St Bede the Venerable",en:"May 27: St Bede the Venerable"},
    {key:"May28",title:"May 28: St Augustine of Canterbury",en:"May 28: St Augustine of Canterbury"},
    {key:"May29",title:"May 29: St Mary Magdalen of Pazzi",en:"May 29: St Mary Magdalen of Pazzi"},
    {key:"May30",title:"May 30: St Felix",en:"May 30: St Felix"},
    {key:"May31",title:"May 31: Queenship of BVM",en:"May 31: Queenship of BVM"},
    {key:"Jun1",title:"Jun 1: St Angela Merici",en:"Jun 1: St Angela Merici"},
    {key:"Jun4",title:"Jun 4: St Francis Caracciolo",en:"Jun 4: St Francis Caracciolo"},
    {key:"Jun5",title:"Jun 5: St Boniface",en:"Jun 5: St Boniface"},
    {key:"Jun6",title:"Jun 6: St Norbert",en:"Jun 6: St Norbert"},
    {key:"Jun10",title:"Jun 10: St Margaret",en:"Jun 10: St Margaret"},
    {key:"Jun11",title:"Jun 11: St Barnabas",en:"Jun 11: St Barnabas"},
    {key:"Jun12",title:"Jun 12: St John of San Facundo",en:"Jun 12: St John of San Facundo"},
    {key:"Jun13",title:"Jun 13: St Anthony of Padua",en:"Jun 13: St Anthony of Padua"},
    {key:"Jun14",title:"Jun 14: St Basil the Great",en:"Jun 14: St Basil the Great"},
    {key:"Jun17",title:"Jun 17: St Gregory Barbadici",en:"Jun 17: St Gregory Barbadici"},
    {key:"Jun18",title:"Jun 18: St Ephrem",en:"Jun 18: St Ephrem"},
    {key:"Jun1",title:"Jun 19: St Juliana Falconieri",en:"Jun 19: St Juliana Falconieri"},
    {key:"Jun20",title:"Jun 20: St Silverius",en:"Jun 20: St Silverius"},
    {key:"Jun21",title:"Jun 21: St Aloysius Gonzaga",en:"Jun 21: St Aloysius Gonzaga"},
    {key:"Jun22",title:"Jun 22: St Paulinus",en:"Jun 22: St Paulinus"},
    {key:"Jun24",title:"Jun 24: Birth of St John the Baptist",en:"Jun 24: Birth of St John the Baptist"},
    {key:"Jun25",title:"Jun 25: St William",en:"Jun 25: St William"},
    {key:"Jun26",title:"Jun 26: Ss John and Paul",en:"Jun 26: Ss John and Paul"},
    {key:"Jun29",title:"Jun 29: Ss Peter and Paul",en:"Jun 29: Ss Peter and Paul"},
    {key:"Jun30",title:"Jun 30: Commemoration of St Paul",en:"Jun 30: Commemoration of St Paul"},
    {key:"Jul1",title:"Jul 1: The Most Precious Blood of Our Lord",en:"Jul 1: The Most Precious Blood of Our Lord"},
    {key:"Jul2",title:"Jul 2: The Visitation of BVM",en:"Jul 2: The Visitation of BVM"},
    {key:"Jul3",title:"Jul 3: St Irenaeus",en:"Jul 3: St Irenaeus"},
    {key:"Jul5",title:"Jul 5: St Anthony Mary Zaccaria",en:"Jul 5: St Anthony Mary Zaccaria"},
    {key:"Jul7",title:"Jul 7: Ss Cyril and Methodius",en:"Jul 7: Ss Cyril and Methodius"},
    {key:"Jul8",title:"Jul 8: St Elizabeth",en:"Jul 8: St Elizabeth"},
    {key:"Jul10",title:"Jul 10: The Seven Holy Brothers",en:"Jul 10: The Seven Holy Brothers"},
    {key:"Jul11",title:"Jul 11: St Oliver Plunkett",en:"Jul 11: St Oliver Plunkett"},
    {key:"Jul12",title:"Jul 12: St John Gualbert",en:"Jul 12: St John Gualbert"},
    {key:"Jul14",title:"Jul 14: St Bonaventure",en:"Jul 14: St Bonaventure"},
    {key:"Jul15",title:"Jul 15: St Henry",en:"Jul 15: St Henry"},
    {key:"Jul16",title:"Jul 16: Our Lady of Mount Carmel",en:"Jul 16: Our Lady of Mount Carmel"},
    {key:"Jul17",title:"Jul 17: St Alexius",en:"Jul 17: St Alexius"},
    {key:"Jul18",title:"Jul 18: St Camillus de Lellis",en:"Jul 18: St Camillus de Lellis"},
    {key:"Jul19",title:"Jul 19: St Vincent de Paul",en:"Jul 19: St Vincent de Paul"},
    {key:"Jul20",title:"Jul 20: St Jerome Emilian",en:"Jul 20: St Jerome Emilian"},
    {key:"Jul21",title:"Jul 21: St Lawrence of Brindisi",en:"Jul 21: St Lawrence of Brindisi"},
    {key:"Jul22",title:"Jul 22: St Mary Magdalen",en:"Jul 22: St Mary Magdalen"},
    {key:"Jul23",title:"Jul 23: St Apollinaris",en:"Jul 23: St Apollinaris"},
    {key:"Jul25",title:"Jul 25: St James the Greater",en:"Jul 25: St James the Greater"},
    {key:"Jul26",title:"Jul 26: St Anne",en:"Jul 26: St Anne"},
    {key:"Jul27",title:"Jul 27: St Pantaleon",en:"Jul 27: St Pantaleon"},
    {key:"Jul28",title:"Jul 28: Ss Nazarius and Celsus",en:"Jul 28: Ss Nazarius and Celsus"},
    {key:"Jul29",title:"Jul 29: St Martha",en:"Jul 29: St Martha"},
    {key:"Jul31",title:"Jul 31: St Ignatius of Loyola",en:"Jul 31: St Ignatius of Loyola"},
    {key:"Aug1",title:"Aug 1: Holy Machabees",en:"Aug 1: Holy Machabees"},
    {key:"Aug2",title:"Aug 2: St Alphonsus Mary de Ligouri",en:"Aug 2: St Alphonsus Mary de Ligouri"},
    {key:"Aug4",title:"Aug 4: St Dominic",en:"Aug 4: St Dominic"},
    {key:"Aug5",title:"Aug 5: Dedication of the Basilica of St Mary Major",en:"Aug 5: Dedication of the Basilica of St Mary Major"},
    {key:"Aug6",title:"Aug 6: Transfiguration of Our Lord",en:"Aug 6: Transfiguration of Our Lord"},
    {key:"Aug7",title:"Aug 7: St Cajetan",en:"Aug 7: St Cajetan"},
    {key:"Aug8",title:"Aug 8: St John Mary Vianney",en:"Aug 8: St John Mary Vianney"},
    {key:"Aug10",title:"Aug 10: St Lawrence",en:"Aug 10: St Lawrence"},
    {key:"Aug11",title:"Aug 11: St Tiburtius and St Susanna",en:"Aug 11: St Tiburtius and St Susanna"},
    {key:"Aug12",title:"Aug 12: St Clare",en:"Aug 12: St Clare"},
    {key:"Aug13",title:"Aug 13: Ss Hippolytus and Cassian",en:"Aug 13: Ss Hippolytus and Cassian"},
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
    {key:"Aug27",title:"Aug 27: St Joseph Calasanctius",en:"Aug 27: St Joseph Calasanctius"},
    {key:"Aug28",title:"Aug 28: St Augustine",en:"Aug 28: St Augustine"},
    {key:"Aug29",title:"Aug 29: Beheading of St John the Baptist",en:"Aug 29: Beheading of St John the Baptist"},
    {key:"Aug30",title:"Aug 30: St Rose of Lima",en:"Aug 30: St Rose of Lima"},
    {key:"Aug31",title:"Aug 31: St Raymund Nonnatus",en:"Aug 31: St Raymund Nonnatus"},
    {key:"Sep2",title:"Sep 2: St Stephen",en:"Sep 2: St Stephen"},
    {key:"Sep3",title:"Sep 3: St Pius X",en:"Sep 3: St Pius X"},
    {key:"Sep5",title:"Sep 5: St Lawrence Justinian",en:"Sep 5: St Lawrence Justinian"},
    {key:"Sep8",title:"Sep 8: Nativity of BVM",en:"Sep 8: Nativity of BVM"},
    {key:"Sep9",title:"Sep 9: St Gorgonius",en:"Sep 9: St Gorgonius"},
    {key:"Sep10",title:"Sep 10: St Nicholas of Tolentino",en:"Sep 10: St Nicholas of Tolentino"},
    {key:"Sep11",title:"Sep 11: Ss Protus and Hyacinth",en:"Sep 11: Ss Protus and Hyacinth"},
    {key:"Sep12",title:"Sep 12: Most Holy Name of Mary",en:"Sep 12: Most Holy Name of Mary"},
    {key:"Sep14",title:"Sep 14: The Exaltation of the Holy Cross",en:"Sep 14: The Exaltation of the Holy Cross"},
    {key:"Sep15",title:"Sep 15: Seven Sorrows of BVM",en:"Sep 15: Seven Sorrows of BVM"},
    {key:"Sep16",title:"Sep 16: St Cornelius",en:"Sep 16: St Cornelius"},
    {key:"Sep17",title:"Sep 17: The Stigmata of St Francis",en:"Sep 17: The Stigmata of St Francis"},
    {key:"Sep18",title:"Sep 18: St Joseph of Cupertino",en:"Sep 18: St Joseph of Cupertino"},
    {key:"Sep19",title:"Sep 19: St Januarius",en:"Sep 19: St Januarius"},
    {key:"Sep21",title:"Sep 21: St Matthew",en:"Sep 21: St Matthew"},
    {key:"Sep22",title:"Sep 22: St Thomas of Villanova",en:"Sep 22: St Thomas of Villanova"},
    {key:"Sep23",title:"Sep 23: St Linus",en:"Sep 23: St Linus"},
    {key:"Sep24",title:"Sep 24: Our Lady of Ransom",en:"Sep 24: Our Lady of Ransom"},
    {key:"Sep26",title:"Sep 26: Ss Cyprian and Justina",en:"Sep 26: Ss Cyprian and Justina"},
    {key:"Sep27",title:"Sep 27: Ss Cosmas and Damian",en:"Sep 27: Ss Cosmas and Damian"},
    {key:"Sep28",title:"Sep 28: St Wenceslaus",en:"Sep 28: St Wenceslaus"},
    {key:"Sep29",title:"Sep 29: St Michael the Archangel",en:"Sep 29: St Michael the Archangel"},
    {key:"Sep30",title:"Sep 30: St Jerome",en:"Sep 30: St Jerome"},
    {key:"Oct2",title:"Oct 2: The Holy Guardian Angels",en:"Oct 2: The Holy Guardian Angels"},
    {key:"Oct3",title:"Oct 3: St Theresa of the Child Jesus",en:"Oct 3: St Theresa of the Child Jesus"},
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
    {key:"Oct23",title:"Oct 23: St Anthony Mary Claret",en:"Oct 23: St Anthony Mary Claret"},
    {key:"Oct24",title:"Oct 24: St Raphael",en:"Oct 24: St Raphael"},
    {key:"Oct28",title:"Oct 28: Ss Simon and Jude",en:"Oct 28: Ss Simon and Jude"},
    {key:"Nov1",title:"Nov 1: The Feast of All Saints",en:"Nov 1: The Feast of All Saints"},
    {key:"Nov2",title:"Nov 2: All Souls' Day",en:"Nov 2: All Souls' Day"},
    {key:"Nov4",title:"Nov 4: St Charles Borromeo",en:"Nov 4: St Charles Borromeo"},
    {key:"Nov8",title:"Nov 8: Four Holy Crowned Martyrs",en:"Nov 8: Four Holy Crowned Martyrs"},
    {key:"Nov9",title:"Nov 9: The Dedication of the Lateran Basilica",en:"Nov 9: The Dedication of the Lateran Basilica"},
    {key:"Nov10",title:"Nov 10: St Andrew Avellino",en:"Nov 10: St Andrew Avellino"},
    {key:"Nov11",title:"Nov 11: St Martin of Tours",en:"Nov 11: St Martin of Tours"},
    {key:"Nov12",title:"Nov 12: St Martin I",en:"Nov 12: St Martin I"},
    {key:"Nov13",title:"Nov 13: St Didacus",en:"Nov 13: St Didacus"},
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
    {key:"Dec21",title:"Dec 21: St Thomas",en:"Dec 21: St Thomas"},
    {key:"Dec26",title:"Dec 26: St Stephen",en:"Dec 26: St Stephen"},
    {key:"Dec27",title:"Dec 27: St John",en:"Dec 27: St John"},
    {key:"Dec28",title:"Dec 28: The Holy Innocents",en:"Dec 28: The Holy Innocents"},
    {key:"Dec29",title:"Dec 29: St Thomas Becket",en:"Dec 29: St Thomas Becket"}
    /* END_GEN */
];
var extraChants = {
  "Feb2": [
    {
      rubric: "After the prayers, the Priest puts incense into the thurible. Whilst he distributes the candles, the choir sings:",
      id: 2897
      // todo, split these up, so that the antiphon can be sticky
    }, {
      rubric: "When the distribution of candles is ended, the Choir sings:",
      id: 30,
      gabcReplace: [/\(::\)([^()]+\(\))+$/,'(::)'], // remove the et repetitur at the end
      rubricAfter: "Repeat: <Exsúrge Dómine.>"
    }, {
      rubric: "The procession then takes place. When the Celebrant has put incense into the thurible, the Deacon turns toward the people and says:",
      gabc: "\n%%\n(c3) <sp>V/</sp> Pro(h)ce(h)dá(h)mus(h) in(h) pa(h)ce.(f.) (::)\n<sp>R/</sp> In(h) nó(h)mi(h)ne Chris(h)ti.(h) A(h)men.(f.) (::)"
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
  "AshWed": [
    {
      rubric: "The ashes, made from olive branches or other branches blessed the previous year, are placed in a vessel on the altar."
    }, {
      rubric: "The Choir first sings the following Antiphon:",
      id: 1081
    }, {
      rubric: "During the imposition of the ashes, the Chior sings:",
      id: 313
    }, {
      id: 1208
    }, {
      id: 743
    }
  ],
  "Quad6": [
    {
      rubric: "After Terce and the Asperges given in the usual manner, the Priest blesses the palms or branches of olive or of other trees, which have been placed before the altar or at the Epistle side. The choir first sings the following Antiphon:",
      id: 817
    }, {
      rubric: "After the Blessing, the Celebrant distributes the Palms, whilst the Choir sings the following Antiphons:",
      id: 1215,
      sticky: 0
    }, {
      rubric: "<Psalm 23, 1–2 and 7–10>",
      gabc: "\n%%\n(c4)Dó(f)mi(gh)ni(h) est(h) ter(h)ra,(h) et(h) ple(h)ni(h)<b>tú</b>(ixi hr)do(h) <b>e</b>(g hr)jus:(h.) *(:) or(h)bis(h) ter(h)rá(h)rum,(h) et(h) u(h)ni(h)vér(h)si(h) qui(h) há(h)bi(h)<i>tant</i>(g) <i>in</i>(f) <b>e</b>(gh gr)o.(gf..) (::)\
<i>Flex:</i> pr{í}n(h)ci(h)pes,(h) ve(h)stras, †(g. h h h) 2.(::) Qui(h)a(h) ip(h)se...(h)",
      html: `<div class="verses" style="display:inline-block">
<p><span class="versenum">2.&nbsp;</span>Quia ipse super mária fun<b>dá</b>vit <b>e</b>um:&nbsp;* et super flúmina præpa<i>rá</i><i>vit</i> <b>e</b>um. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">7.&nbsp;</span>Attóllite portas, príncipes, vestras,&nbsp;† et elevámini, portæ <b>æ</b>ter<b>ná</b>les:&nbsp;* et introí<i>bit</i> <i>Rex</i> <b>gló</b>riæ.</p>
<p><span class="versenum">8.&nbsp;</span>Quis est <b>i</b>ste Rex <b>gló</b>riæ?&nbsp;* Dóminus fortis et potens: Dóminus po<i>tens</i> <i>in</i> <b>prǽ</b>lio. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">9.&nbsp;</span>Attóllite portas, príncipes, vestras,&nbsp;† et elevámini, portæ <b>æ</b>ter<b>ná</b>les:&nbsp;* et introí<i>bit</i> <i>Rex</i> <b>gló</b>riæ.</p>
<p><span class="versenum">10.&nbsp;</span>Quis est <b>i</b>ste Rex <b>gló</b>riæ?&nbsp;* Dóminus virtútum ipse <i>est</i> <i>Rex</i> <b>gló</b>riæ. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">11.&nbsp;</span>Glória <b>Pa</b>tri, et <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>San</b>cto.</p>
<p><span class="versenum">12.&nbsp;</span>Sicut erat in princípio, et <b>nunc</b>, et <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
</div>`,
      sticky: 1
    }, {
      id: 1155,
      sticky: 0
    }, {
      rubric: "<Psalm 46>",
      gabc: "\n%%\n(c4)Om(f)nes(gh) Gen(h)tes,(h) <b>pláu</b>(ixi)di(hr)te(h) <b>má</b>(g)ni(hr)bus:(h.) *(:) ju(h)bi(h)lá(h)te(h) De(h)o(h) in(h) vo(h)ce(h) ex(h)sul(h)<i>ta</i>(g)<i>ti</i>(f)<b>ó</b>(gh gr)nis.(gf..) 2.(::) Quó(h)ni(h)am...(h)",
      html: `<div class="verses" style="display:inline-block">
<p><span class="versenum">2.&nbsp;</span>Quóniam Dóminus ex<b>cél</b>sus, ter<b>rí</b>bilis:&nbsp;* Rex magnus super <i>om</i><i>nem</i> <b>ter</b>ram. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">3.&nbsp;</span>Subjécit <b>pó</b>pulos <b>no</b>bis:&nbsp;* et Gentes sub pé<i>di</i><i>bus</i> <b>no</b>stris.</p>
<p><span class="versenum">4.&nbsp;</span>Elégit nobis heredi<b>tá</b>tem <b>su</b>am:&nbsp;* spéciem Jacob, <i>quam</i> <i>di</i><b>lé</b>xit. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">5.&nbsp;</span>Ascéndit <b>De</b>us in <b>jú</b>bilo:&nbsp;* et Dóminus in <i>vo</i><i>ce</i> <b>tu</b>bæ.</p>
<p><span class="versenum">6.&nbsp;</span>Psállite Deo <b>no</b>stro, <b>psál</b>lite:&nbsp;* psállite Regi <i>no</i><i>stro</i>, <b>psál</b>lite. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">7.&nbsp;</span>Quóniam Rex omnis <b>ter</b>ræ <b>De</b>us:&nbsp;* psállite <i>sa</i><i>pi</i><b>én</b>ter.</p>
<p><span class="versenum">8.&nbsp;</span>Regnábit Deus <b>su</b>per <b>Gen</b>tes:&nbsp;* Deus sedet super sedem <i>san</i><i>ctam</i> <b>su</b>am. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">9.&nbsp;</span>Príncipes populórum congregáti sunt cum <b>De</b>o <b>A</b>braham:&nbsp;* quóniam dii fortes terræ veheménter <i>e</i><i>le</i><b>vá</b>ti sunt. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
<p><span class="versenum">10.&nbsp;</span>Glória <b>Pa</b>tri, et <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>San</b>cto.</p>
<p><span class="versenum">11.&nbsp;</span>Sicut erat in princípio, et <b>nunc</b>, et <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men. <span class="rubric pull-right">The antiphon <span class="quote">Púeri</span> is repeated as above.</span></p>
</div>`,
      sticky: 1
    }, {
      title: "The Procession with Blessed Palms",
      rubric: "After the Gospel, the celebrant, with the ministers (or servers), returns to the foot of the altar, makes reverence, and blesses incense. Then the deacon (or celebrant) turns to the people and says:",
      gabc: "\n%%\n(c3) <sp>V/</sp> Pro(h)ce(h)dá(h)mus(h) in(h) pa(h)ce.(f.) (::)\n<sp>R/</sp> In(h) nó(h)mi(h)ne Chris(h)ti.(h) A(h)men.(f.) (::)"
    }, {
      rubric: "As the procession begins, all or some of the following antiphons may be sung:",
      id: 247
    }, {
      id: 173
    }, {
      id: 770
    }, {
      id: 901
    }, {
      rubric: "In the course of the procession the following hymn is sung. If possible, the whole congregation should sing each time the refrain <Glória laus> as shown below.",
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
      rubric: "All: <Glória, laus.> Then the following antiphon is sung:",
      id: {
        "VIII G*": 532,
        "VIII G": 1092
      },
      sticky: 0
    }, {
      rubric: "<Psalm 147>",
      gabc: "\n%%\n(c4)Lau(g)da,(h) Je(j)rú(j)sa(j)lem,(j) <b>Dó</b>(k)mi(jr)num:(j.) *(:) lau(j)da(j) De(j)um(j) <i>tu</i>(i)<i>um</i>,(j) <b>Si</b>(h gr)on.(g.) 2.(::) Quó(j)ni(j)am...(j)",
      html: `<div class="verses">
<p><span class="versenum">2.&nbsp;</span>Quóniam confortávit seras portárum tu<b>á</b>rum:&nbsp;* benedíxit fíliis <i>tu</i><i>is</i> <b>in</b> te.</p>
<p><span class="versenum">3.&nbsp;</span>Qui pósuit fines tuos <b>pa</b>cem:&nbsp;* et ádipe fruménti <i>sá</i><i>ti</i><b>at</b> te.</p>
<p><span class="versenum">4.&nbsp;</span>Qui emíttit elóquium suum <b>ter</b>ræ:&nbsp;* velóciter currit <i>ser</i><i>mo</i> <b>e</b>jus.</p>
<p><span class="versenum">5.&nbsp;</span>Qui dat nivem sicut <b>la</b>nam:&nbsp;* nébulam sicut cí<i>ne</i><i>rem</i> <b>spar</b>git.</p>
<p><span class="versenum">6.&nbsp;</span>Mittit crystállum suam sicut buc<b>cél</b>las:&nbsp;* ante fáciem frígoris ejus quis <i>sus</i><i>ti</i><b>né</b>bit?</p>
<p><span class="versenum">7.&nbsp;</span>Emíttet verbum suum, et liquefáciet <b>e</b>a:&nbsp;* flabit spíritus ejus, et <i>flu</i><i>ent</i> <b>a</b>quæ.</p>
<p><span class="versenum">8.&nbsp;</span>Qui annúntiat verbum suum <b>Ja</b>cob:&nbsp;* justítias, et judícia <i>su</i><i>a</i> <b>Is</b>raël.</p>
<p><span class="versenum">9.&nbsp;</span>Non fecit táliter omni nati<b>ó</b>ni:&nbsp;* et judícia sua non manife<i>stá</i><i>vit</i> <b>e</b>is.</p>
<p><span class="versenum">10.&nbsp;</span>Glória Patri, et <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>San</b>cto.</p>
<p><span class="versenum">11.&nbsp;</span>Sicut erat in princípio, et nunc, et <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.</p>
</div>`,
      sticky: 1
    }, {
      rubric: "The antiphon <Omnes colláudant> is repeated, as above.",
      id: 1312
    }, {
      id: 1051
    }, {
      rubric: "The faithful may also sing the hymn <Christus vincit> or any other chant in honor of Christ the King."
    }, {
      rubric: "When the procession enters the church, that is, as the celebrant goes through the door, this last responsory is begun:",
      id: 606
    }
  ],
  "Quad6f": [
    {
        rubric: "At the end of the Prayers, the Priest, turned towards the people, unveils the Cross. He intones the Antiphon <Ecce lignum Crucis.> The assistant clergy joins with him in continuing the chant as far as the <r/. Venite adorémus.> The choir sings <Veníte adorémus.> whilst all kneel except the Celebrant. The same chant is sung three times, each time in a higher tone of voice.",
        id: 2087,
        rubricAfter: "The adoration of the Cross then takes place, during which all or some of the following Reproaches are sung, according to the number who are to venerate the Cross."
    }, {
        rubric: "Two cantors sing the following in the middle of the Choir:",
        id: 157,
    }, {
        sticky: 0,
        chantScaleIf: ["(max-width: 450px)", 0.8],
        gabc: `initial-style: 1;
annotation: <sp>V/</sp>.;
%%
(c4)H{A}<alt>The first choir:</alt>(g)gi(fe)os(fgf/fe) o(c) The(d)ós.(fg!hv/hg.)
<sp>R/</sp>.(::) Sanc<alt>The second choir:</alt>(g)tus(fgf/fe) De(cd)us.(fg!hv/hg.) (::)
<sp>V/</sp>. Ha(g)gi(fe)os(fgf/fe) Is(c)chy(d)rós.(fg!hv/hg.) (::)
<sp>R/</sp>. Sanc(g)tus(fgf/fe) For(cd)tis.(fg!hv/hg.) (::)
<sp>V/</sp>. Ha(gh)gi(g)os(ixhg/hiHG'g) A(f)thá(g)na(h)tos,(hiwjvIHiih.) (;) e(g)lé(hj/jvIH')i(g)son(hg/h_g) hy(fd)más.(fghv/hg.) (::)
<sp>R/</sp>. Sanc(gh)tus(ixhg/hiHG'g) Im(f)mor(g)tá(h)lis,(hiwjvIHiih.) (;) mi(g)se(hj/jvIH')ré(g)re(hg/h_g) no(fd)bis.(fghv/hg.) (::)
`
    }, {
        rubric: "Two cantors of the second choir sing:",
        id: 7808,
        rubricAfter: "The two choirs respond in turn <Hagios o Theós, Sanctus Deus.> etc. It is always the first choir that sings <Hagios.>"
    }, {
    }, {
        rubric: "Then two cantors of the first choir sing:",
        id: 7809,
        rubricAfter: "The two choirs again respond in turn <Hagios o Theós. Sanctus Deus.> etc.",
        sticky: 1
    }, {
        rubric: "The following Reproaches are sung in turn by the cantors. After each Reproach, the two choirs together respond <Pópule meus.> as above, as far as the <v/. Quia.>"
    }, {
        rubric: "Two cantors of the second choir sing:",
        gabc: `initial-style: 0;
%%
(c4)<sp>V/</sp>. E(c)go(de) prop(e)ter(e) te(e) fla(e)gel(e)lá(e)vi(e) Æ(e)gýp(d)tum(e.) (,)
cum(e) pri(e)mo(f)gé(g)ni(f)tis(f) su(evDC)is:(c.) (;)
et(c) tu(d_e) me(e) fla(e)gel(e)lá(e)tum(ed) tra(f)di(d)dís(ef)ti.(edeDC.) (::c+) P{}ópule
`
    }, {
        rubric: "Both choirs repeat: <Pópule meus.> as far as the <v/. Quia.>",
        id: 157,
        sticky: 0,
        chantScaleIf: ["(max-width: 450px)", 0.8]
    }, {
        sticky: 1,
        gabc: `initial-style: 0;
%%
(c4)^2.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) te(e) e(e)dú(e)xi(e) de(e) Æ(e)gýp(d)to,(e.) (,)
de(c)mér(de)so(e) Pha(e)ra(e)ó(e)ne(e) in(f) ma(g)re(f) Ru(evDC)brum:(c.) (;)
et(c) tu(d_e) me(e) tra(e)di(e)dís(e)ti(e.) (,) prin(e)cí(e)pi(e)bus(ed) sa(f)cer(d)dó(ef)tum.(edeDC.) (::c+) P{}ópule() (z)

(c4)^3.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) an(e)te(e) te(e) a(f)pé(g)ru(f)i(f) ma(evDC)re:(c.) (;)
et(c) tu(d_e) a(e)pe(e)ru(e)ís(e)ti(e) lán(e)ce(e)a(ed) la(f)tus(d) me(ef)um.(edeDC.) (::c+) P{}ópule() (z)

(c4)^4.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) an(e)te(e) te(e) præ(d)í(e)vi(e.) (,) in(e) co(f)lúm(g)na(f) nu(evDC)bis:(c.) (;)
et(c) tu(d_e) me(e) du(e)xís(e)ti(e.) (,) ad(e) præ(e)tó(e)ri(ed)um(f) Pi(d)lá(ef)ti.(edeDC.) (::c+) P{}ópule() (z)

(c4)^5.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) te(e) pa(e)vi(e) man(e)na(f) per(g) de(f)sér(evDC)tum:(c.) (;)
et(c) tu(d_e) me(e) ce(e)ci(e)dís(e)ti(e.) (,) á(e)la(e)pis(ed) et(f) fla(d)gél(ef)lis.(edeDC.) (::c+) P{}ópule() (z)

(c4)^6.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) te(e) po(e)tá(e)vi(e.) (,) a(e)qua(e) sa(f)lú(g)tis(f) de(f) pe(evDC)tra:(c.) (;)
et(c) tu(d_e) me(e) po(e)tás(e)ti(e.) (,) fel(e)le(ed) et(f) a(d)cé(ef)to.(edeDC.) (::c+) P{}ópule() (z)

(c4)^7.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) prop(e)ter(e) te(e.) (,) Cha(e)na(e)næ(e)ó(e)rum(f) re(g)ges(f) per(f)cús(evDC)si:(c.) (;)
et(c) tu(d_e) per(e)cus(e)sís(e)ti(e.) (,) a(e)rún(e)di(e)ne(ed) ca(f)put(d) me(ef)um.(edeDC.) (::c+) P{}ópule() (z)

(c4)^8.^ E<alt>Two cantors of the first choir sing:</alt>(c)go(de) de(e)di(e) ti(e)bi(f) scep(g)trum(f) re(f)gá(evDC)le:(c.) (;)
et(c) tu(d_e) de(e)dís(e)ti(e) cá(e)pi(e)ti(e) me(e)o(e.) (,) spí(e)ne(ed)am(f) co(d)ró(ef)nam.(edeDC.) (::c+) P{}ópule() (z)

(c4)^9.^ E<alt>Two cantors of the second choir sing:</alt>(c)go(de) te(e) ex(e)al(e)tá(e)vi(f) ma(g)gna(f) vir(f)tú(evDC)te:(c.) (;)
et(c) tu(d_e) me(e) sus(e)pen(e)dís(e)ti(e.) (,) in(e) pa(ed)tí(f)bu(e)lo(d) cru(ef)cis.(edeDC.) (::c+) P{}ópule
`
    }, {
        rubric: "Both choirs then sing the following antiphon:",
        id: 428,
        rubricAfter: "The antiphon <Crucem tuam.> is repeated"
    }, {
        rubric: "<Crux fidélis.> is then sung and the hymn <Pange, lingua, gloriósi.>  After the first stanza of the hymn, <v/. Crux fidélis.> is repeated as far as <Dulce lignum;> after the second stanza, <Dulce lignum.> is repeated. This alternate repetition takes place after each stanza of the hymn.",
        sticky: 0,
        chantScaleIf: ["(max-width: 450px)", 0.8],
        id: 1128
    }, {
        id: 2209,
        gabcReplace: [/\\hspace{-2em}/g,'',/\\emph{|}/g,'_'],
        sticky: 1
    }, /*{
        rubric: "After the adoration of the Cross, the priest and clergy go in procession to the altar of repose. The Blessed Sacrament is incensed and then borne back to the high altar. During the procession, the hymn <Vexílla Regis.> is sung:",
        id: 2120
    }*/ {
        rubric: "After the adoration of the Cross, the priest and clergy go to the altar of repose, and the Blessed Sacrament is borne back to the high altar.  During the procession, the following antiphons are sung:",
        id: 1238
    }, {
        id: 940
    }, {
        id: 1335,
        rubricAfter: "While Holy Communion is being distributed, Psalm 21, <Deus, Deus meus.> may be sung, or else one or other of the responsories from Matins of Good Friday."
    }, {
        rubric: "<Psalm 21>",
        gabc: `initial-style: 0;
%%
(f3)De(h)us,(h) De(h)us(h) me(h)us,(h) ré(h)spi(h)ce(h) in(h) me:(f.) †(,) qua(h)re(h) me(h) de(h)<i>re</i>(g)<i>li</i>(f)<b>quí</b>(h)sti?(h.) *(:) lon(h)ge(h) a(h) sa(h)lú(h)te(h) me(h)a(h) ver(h)ba(h) de(h)li(h)ctó(h)rum(h) me(h)<b>ó</b>(h)rum.(f.) (::)`,
        html:`<div class="verses">
<p><span class="versenum">2.&nbsp;</span>Deus meus, clamábo per diem, et <i>non</i> <i>e</i><b>xáu</b>dies:&nbsp;* et nocte, et non ad insipiéntiam <b>mi</b>hi.<br></p>
<p><span class="versenum">3.&nbsp;</span>Tu autem in <i>san</i><i>cto</i> <b>há</b>bitas:&nbsp;* laus <b>Is</b>raël.<br></p>
<p><span class="versenum">4.&nbsp;</span>In te speravérunt <i>pa</i><i>tres</i> <b>no</b>stri:&nbsp;* speravérunt, et liberásti <b>e</b>os.<br></p>
<p><span class="versenum">5.&nbsp;</span>Ad te clamavérunt, et <i>sal</i><i>vi</i> <b>fa</b>cti sunt:&nbsp;* in te speravérunt, et non sunt con<b>fú</b>si.<br></p>
<p><span class="versenum">6.&nbsp;</span>Ego autem sum vermis, <i>et</i> <i>non</i> <b>ho</b>mo:&nbsp;* oppróbrium hóminum, et abjéctio <b>ple</b>bis.<br></p>
<p><span class="versenum">7.&nbsp;</span>Omnes vidéntes me <i>de</i><i>ri</i><b>sé</b>runt me:&nbsp;* locúti sunt lábiis, et movérunt <b>ca</b>put.<br></p>
<p><span class="versenum">8.&nbsp;</span>Sperávit in Dómino, erí<i>pi</i><i>at</i> <b>e</b>um:&nbsp;* salvum fáciat eum, quóniam vult <b>e</b>um.<br></p>
<p><span class="versenum">9.&nbsp;</span>Quóniam tu es, qui extraxísti <i>me</i> <i>de</i> <b>ven</b>tre:&nbsp;* spes mea ab ubéribus matris <b>me</b>æ.<br></p>
<p><span class="versenum">10.&nbsp;</span>In te projéctus sum ex útero:&nbsp;† de ventre matris meæ Deus <i>me</i><i>us</i> <b>es</b> tu,&nbsp;* ne discésseris <b>a</b> me:<br></p>
<p><span class="versenum">11.&nbsp;</span>Quóniam tribulátio <i>pró</i><i>xi</i><b>ma</b> est:&nbsp;* quóniam non est qui <b>ád</b>juvet.<br></p>
<p><span class="versenum">12.&nbsp;</span>Circumdedérunt me ví<i>tu</i><i>li</i> <b>mul</b>ti:&nbsp;* tauri pingues obse<b>dé</b>runt me.<br></p>
<p><span class="versenum">13.&nbsp;</span>Aperuérunt super <i>me</i> <i>os</i> <b>su</b>um:&nbsp;* sicut leo rápiens et <b>rú</b>giens.<br></p>
<p><span class="versenum">14.&nbsp;</span>Sicut a<i>qua</i> <i>ef</i><b>fú</b>sus sum:&nbsp;* et dispérsa sunt ómnia ossa <b>me</b>a.<br></p>
<p><span class="versenum">15.&nbsp;</span>Factum est cor meum tamquam ce<i>ra</i> <i>li</i><b>qué</b>scens:&nbsp;* in médio ventris <b>me</b>i.<br></p>
<p><span class="versenum">16.&nbsp;</span>Aruit tamquam testa virtus mea,&nbsp;† et lingua mea adhǽsit fáu<i>ci</i><i>bus</i> <b>me</b>is:&nbsp;* et in púlverem mortis dedu<b>xí</b>sti me.<br></p>
<p><span class="versenum">17.&nbsp;</span>Quóniam circumdedérunt me <i>ca</i><i>nes</i> <b>mul</b>ti:&nbsp;* concílium malignántium ob<b>sé</b>dit me.<br></p>
<p><span class="versenum">18.&nbsp;</span>Fodérunt manus meas et <i>pe</i><i>des</i> <b>me</b>os:&nbsp;* dinumeravérunt ómnia ossa <b>me</b>a.<br></p>
<p><span class="versenum">19.&nbsp;</span>Ipsi vero consíderavérunt et inspexérunt me:&nbsp;† divisérunt sibi vesti<i>mén</i><i>ta</i> <b>me</b>a,&nbsp;* et super vestem meam misérunt <b>sor</b>tem.<br></p>
<p><span class="versenum">20.&nbsp;</span>Tu autem, Dómine, ne elongáveris auxílium <i>tu</i><i>um</i> <b>a</b> me:&nbsp;* ad defensiónem meam <b>cón</b>spice.<br></p>
<p><span class="versenum">21.&nbsp;</span>Erue a frámea, Deus, á<i>ni</i><i>mam</i> <b>me</b>am:&nbsp;* et de manu canis únicam <b>me</b>am.<br></p>
<p><span class="versenum">22.&nbsp;</span>Salva me ex o<i>re</i> <i>le</i><b>ó</b>nis:&nbsp;* et a córnibus unicórnium humilitátem <b>me</b>am.<br></p>
<p><span class="versenum">23.&nbsp;</span>Narrábo nomen tuum frá<i>tri</i><i>bus</i> <b>me</b>is:&nbsp;* in médio Ecclésiæ lau<b>dá</b>bo te.<br></p>
<p><span class="versenum">24.&nbsp;</span>Qui timétis Dóminum, lau<i>dá</i><i>te</i> <b>e</b>um:&nbsp;* univérsum semen Jacob, glorificáte <b>e</b>um.<br></p>
<p><span class="versenum">25.&nbsp;</span>Tímeat eum omne <i>se</i><i>men</i> <b>Is</b>raël:&nbsp;* quóniam non sprevit, neque despéxit deprecatiónem <b>páu</b>peris:<br></p>
<p><span class="versenum">26.&nbsp;</span>Nec avértit fáciem <i>su</i><i>am</i> <b>a</b> me:&nbsp;* et cum clamárem ad eum, exau<b>dí</b>vit me.<br></p>
<p><span class="versenum">27.&nbsp;</span>Apud te laus mea in ecclé<i>si</i><i>a</i> <b>ma</b>gna:&nbsp;* vota mea reddam in conspéctu timéntium <b>e</b>um.<br></p>
<p><span class="versenum">28.&nbsp;</span>Edent páuperes, et saturabúntur:&nbsp;† et laudábunt Dóminum qui re<i>quí</i><i>runt</i> <b>e</b>um:&nbsp;* vivent corda eórum in sǽculum <b>sǽ</b>culi.<br></p>
<p><span class="versenum">29.&nbsp;</span>Reminiscéntur et convertén<i>tur</i> <i>ad</i> <b>Dó</b>minum&nbsp;* univérsi fines <b>ter</b>ræ:<br></p>
<p><span class="versenum">30.&nbsp;</span>Et adorábunt in con<i>spé</i><i>ctu</i> <b>e</b>jus&nbsp;* univérsæ famíliæ <b>Gén</b>tium.<br></p>
<p><span class="versenum">31.&nbsp;</span>Quóniam Dómi<i>ni</i> <i>est</i> <b>re</b>gnum:&nbsp;* et ipse dominábitur <b>Gén</b>tium.<br></p>
<p><span class="versenum">32.&nbsp;</span>Manducavérunt et adoravérunt omnes <i>pin</i><i>gues</i> <b>ter</b>ræ:&nbsp;* in conspéctu ejus cadent omnes qui descéndunt in <b>ter</b>ram.<br></p>
<p><span class="versenum">33.&nbsp;</span>Et ánima mea <i>il</i><i>li</i> <b>vi</b>vet:&nbsp;* et semen meum sérviet <b>i</b>psi.<br></p>
<p><span class="versenum">34.&nbsp;</span>Annuntiábitur Dómino generátio ventúra:&nbsp;† et annuntiábunt cæli justítiam ejus pópulo <i>qui</i> <i>na</i><b>scé</b>tur,&nbsp;* quem fecit <b>Dó</b>minus.<br></p>
</div>`
    }
  ],
    "Quad6s": {
      "asperges": [
        {
            id: 2060,
            psalmtone: 'tractus'
        },
        {
            id: 2075,
            psalmtone: 'tractus'
        },
        {
            id: 2086,
            psalmtone: 'tractus'
        },
        {
            title: "The First Part of the Litany",
            rubric: "When the Collect after the fourth Lesson is finished, all kneel. The Litany of the Saints is sung without doubling the invocations, until <Propítius esto> exclusive.",
            gabc: `(c3)Ky(h)ri(f)e,(f) e(f)lé(f)i(e)son.(f.) <i>ij.</i>(::)
Chris(h)te,(f) e(f)lé(f)i(e)son.(f.) <i>ij.</i>(::)
Ký(h)ri(f)e,(f) e(f)lé(f)i(e)son.(f.) <i>ij.</i>(::)
Chris(h)te,(gh) au(f)di(g) nos.(h.) <i>ij.</i>(::)
Chris(h)te,(g) ex(h)au(f)di(g) nos.(h.) <i>ij.</i>(::z)
Pa|Fi||S{a}ncta (h)ter|li ||(h) de|Red{é}mp|Spí-ri-t{u}s |Trín(h) cæ|tor |Sanc|i-t{a}s, (h)lis,|m{u}ndi, |te, |{u}nus (h) <b>De</b>|<b>De</b>|<b>De</b>|<b>De</b>(i)us,|us, |us, |us, (g.) (,) mi|mi|mi|mi(g)se|se|se|se(g)<i>ré</i>|<i>ré</i>|<i>ré</i>|<i>ré</i>(f)<i>re</i>|<i>re</i> |<i>re</i> |<i>re</i> (g) no|no|no|no(h)bis.|bis. |bis. |bis. (h.) (::)
    `,
            html: `<div class="verses" style="display:inline-block">
<p>Sancta Ma<b>rí</b>a,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancta Dei <b>Gé</b>netrix,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancta Virgo <b>vír</b>ginum,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte <b>Mí</b>chaël,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte <b>Gá</b>briel,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte <b>Rá</b>phaël,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sancti Angeli et ar<b>chán</b>geli,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Omnes sancti beatórum Spirítuum <b>ór</b>dines,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Sancte Joánnes Bap<b>tí</b>sta,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte <b>Jo</b>seph,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sancti Patriárchæ et Pro<b>phé</b>tæ,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Sancte <b>Pe</b>tre,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte <b>Pau</b>le,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte An<b>dré</b>a,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Jo<b>án</b>nes,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sancti Apóstoli et Evange<b>lí</b>stæ,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Omnes sancti Discípuli <b>Dó</b>mini,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Sancte <b>Sté</b>phane,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Lau<b>rén</b>ti,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Vin<b>cén</b>ti,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sancti <b>Már</b>tyres,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Sancte Sil<b>ve</b>ster,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Gre<b>gó</b>ri,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Augu<b>stí</b>ne,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sancti Pontífices et Confes<b>só</b>res,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Omnes sancti Do<b>ctó</b>res,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Sancte An<b>tó</b>ni,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Bene<b>dí</b>cte,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Do<b>mí</b>nice,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancte Fran<b>cí</b>sce,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sancti Sacerdótes et Le<b>ví</b>tæ,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Omnes sancti Mónachi et Ere<b>mí</b>tæ,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Sancta María Magda<b>lé</b>na,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancta <b>A</b>gnes,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancta Cæ<b>cí</b>lia,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancta <b>A</b>gatha,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Sancta Ana<b>stá</b>sia,&nbsp;<span style='float:right'>o<i>ra</i>.</span></p>
<p>Omnes sanctæ Vírgines et <b>Ví</b>duæ,&nbsp;<span style='float:right'>ora<i>te</i>.</span></p>
<p>Omnes Sancti et Sanctæ <b>De</b>i,&nbsp;<span style='float:right'>intercédi<i>te</i> <i>pro</i> <b>no</b>bis.</span></p>
</div>`
        }, {
            title: "The Blessing of Water for Baptism",
            rubric: "After the invocation <Omnes Sancti et Sanctæ Dei,> all rise.  If cantors sang the Litany, they return to their places."
        }, {
            rubric: "When the Blessing (and Baptism) is finished, the baptismal water is carried to the font, in procession, while the following is sung:",
            id: 943,
            psalmtone: 'tractus' // todo...allow psalmtoning of this chant
        }, {
            title: "The Second Part of the Litany",
            rubric: " ",
            gabc: "(c3)Pro|Pro|Ab (h)pí|pí|(h)<i>ti</i>|<i>ti</i>|<i>om</i>(g)<i>us</i>|<i>us</i> |<i>ni</i> (f) <b>es</b>|<b>es</b>|<b>ma</b>(h ir)to,|to, |lo, (i.) (,) par|ex|lí(g)ce|áu|be(h) no|di |ra (f)bis,|nos, |nos, (e) Dó|Dó|Dó(f)mi|mi|mi(e)ne.|ne. |ne. (d.) (::)",
            html: `<div class="verses" style="display:inline-block">
<p>Ab o<i>mni</i> <i>pec</i><b>cá</b>to,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>A mor<i>te</i> <i>per</i><b>pé</b>tua,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per mystérium sanctæ incarnati<i>ó</i><i>nis</i> <b>tu</b>æ,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per ad<i>vén</i><i>tum</i> <b>tu</b>um,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per nativi<i>tá</i><i>tem</i> <b>tu</b>am,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per baptísmum et sanctum jejú<i>ni</i><i>um</i> <b>tu</b>um,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per crucem et passi<i>ó</i><i>nem</i> <b>tu</b>am,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per mortem et sepul<i>tú</i><i>ram</i> <b>tu</b>am,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per sanctam resurrecti<i>ó</i><i>nem</i> <b>tu</b>am,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per admirábilem ascensi<i>ó</i><i>nem</i> <b>tu</b>am,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>Per adventum Spíritus San<i>cti</i> <i>Pa</i><b>rá</b>cliti,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
<p>In di<i>e</i> <i>ju</i><b>dí</b>cii,&nbsp;<span style="float:right">líbera nos, Dómine.</span></p>
</div>`
        }, {
            gabc: `initial-style: 0;
%%
(c3)Pec(h)<i>ca</i>(g)<b>tó</b>(i//jr)res,(j.) (,) te(h) ro(g)gá(f)mus,(e) au(f)di(g) nos.(h.) (::)
    `,
            html: `<div class="verses" style="display:inline-block">
<p>Ut no<i>bis</i> <b>par</b>cas,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut Ecclésiam tuam sanctam&nbsp;’ régere et conserváre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut domnum apostólicum et omnes ecclesiásticos órdines&nbsp;’ in sancta religióne conserváre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut inimícos sanctæ Ecclésiæ&nbsp;’ humiliáre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut régibus et princípibus christiánis&nbsp;’ pacem et veram concórdiam donáre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut nosmetípsos in tuo sancto servítio&nbsp;’ confortáre et conserváre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut ómnibus benefactóribus nostris&nbsp;’ sempitérna bona <i>re</i><b>trí</b>buas,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut fructus terræ&nbsp;’ dare et conserváre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut ómnibus fidélibus defúnctis&nbsp;’ réquiem ætérnam donáre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
<p>Ut nos exaudíre <i>di</i><b>gné</b>ris,&nbsp;<span style="float:right">te rogámus, audi nos.</span></p>
</div>`
        },
        {
            gabc: `initial-style: 0;
%%
(c3)A(h)gnus(h) De(hi)i,(i.) (,) qui(i) tol(i)lis(i) pec(h)cá(i)ta(gxg) mun(h)di,(i.) (,) par(h)ce(i) no(j)bis,(h) Dó(i)mi(h)ne.(h.) (::)
A(h)gnus(h) De(hi)i,(i.) (,) qui(i) tol(i)lis(i) pec(h)cá(i)ta(gxg) mun(h)di,(i.) (,) ex(h)áu(i)di(j) nos,(h) Dó(i)mi(h)ne.(h.) (::)
A(h)gnus(h) De(hi)i,(i.) (,) qui(i) tol(i)lis(i) pec(h)cá(i)ta(gxg) mun(h)di,(i.) (,) mi(h)se(i)ré(j)re(h)
no(i)bis.(h.) (::)
Chris(i)te,(hi) au(gxg)di(h) nos.(i.) (::)
Chris(i)te,(h) ex(i)au(gxg)di(h) nos.(i.) (::)
`
        }
    ],
    "alleluia": [
        {
            rubric: "After the Epistle, the Celebrant intones:",
            id: 507,
            rubricAfter: "He sings this <Allelúia> three times, each time at a higher pitch.  The choir repeats it after him each time, in the same key."
        }, {
            rubric: "The choir then sings:",
            id: "507-2",
            rubricAfter: "<Allelúia> is not repeated."
        }, {
            id: 1247,
            psalmtone: "tractus"
        }
    ],
    "agnus": [
        {
            title: "Lauds of Easter Sunday",
            rubric: " ",
            gabc: `initial-style: 1;
office-part:Antiphona;
mode:6;
%%
(c4)Al(f)le(g')lú(h)ia,(f.) (,) al(gh)le(g')lú(f)ia,(d_c) (,) al(f)le(gh)lú(gf~)ia.(f.) (::)`,
            sticky: 0
        }, {
            rubric: "<Psalm 150>",
            gabc: `initial-style: 0;
%%
(c4)Lau(f)dá(gh)te(h) Dó(h)mi(h)num(h) in(h) san(h)<i>ctis</i>(g) <b>e</b>(h fr)jus:(f.) *(:) lau(h)dá(h)te(h) e(h)um(h) in(h) fir(h)ma(h)mén(h)to(h) vir(h)<i>tú</i>(f)<i>tis</i>(gh) <b>e</b>(g fr)jus.(f.) (::)
<i>Flex:</i> b{e}(h)ne(h)so(h)nán(h)ti(g)bus: †(g. h h h  ::)`,
            html: `<div class="verses">
<p><span class="versenum">2.&nbsp;</span>Laudáte eum in virtúti<i>bus</i> <b>e</b>jus:&nbsp;* laudáte eum secúndum multitúdinem magnitú<i>di</i><i>nis</i> <b>e</b>jus.<br></p>
<p><span class="versenum">3.&nbsp;</span>Laudáte eum in so<i>no</i> <b>tu</b>bæ:&nbsp;* laudáte eum in psaltéri<i>o</i>, <i>et</i> <b>cí</b>thara.<br></p>
<p><span class="versenum">4.&nbsp;</span>Laudáte eum in týmpano, <i>et</i> <b>cho</b>ro:&nbsp;* laudáte eum in chor<i>dis</i>, <i>et</i> <b>ór</b>gano.<br></p>
<p><span class="versenum">5.&nbsp;</span>Laudáte eum in cýmbalis benesonántibus:&nbsp;† laudáte eum in cýmbalis jubila<i>ti</i><b>ó</b>nis:&nbsp;* omnis spíritus <i>lau</i><i>det</i> <b>Dó</b>minum.<br></p>
<p><span class="versenum">6.&nbsp;</span>Glória Patri, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>San</b>cto.<br></p>
<p><span class="versenum">7.&nbsp;</span>Sicut erat in princípio, et nunc, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.<br></p>
</div>`,
            sticky: 1
        },
        {
            rubric: "The antiphon <Allelúia, allelúia, allelúia> is repeated.",
            rubricAfter: "There is no Little Chapter, hymn or v/.: the celebrant intones the Benedictus antiphon at once."
        }, {
            id: 1358,
            sticky: 0
        }, {
            rubric: " ",
            gabc: `initial-style: 0;
%%
(c4)Be(g)ne(hg)dí(gj)ctus(j) Dó(j)mi(j)<i>nus</i>,(ji) <i>De</i>(jk)<i>us</i>(k) <b>Is</b>(jk)ra(jr)ël:(j.) *(:) qui(j)a(j) vi(j)si(j)tá(j)vit,(j) et(j) fe(j)cit(j) re(j)dem(j)pti(j)ó(j)nem(j) <i>ple</i>(i)<i>bis</i>(j) <b>su</b>(h gr)æ:(g.) (::)`,
            html: `<div class="verses">
<p><span class="versenum">2.&nbsp;</span>Et eréxit cornu <i>sa</i><i>lú</i><i>tis</i> <b>no</b>bis:&nbsp;* in domo David, pú<i>e</i><i>ri</i> <b>su</b>i.<br></p>
<p><span class="versenum">3.&nbsp;</span>Sicut locútus est <i>per</i> <i>os</i> <i>san</i><b>ctó</b>rum,&nbsp;* qui a sǽculo sunt, prophe<i>tá</i><i>rum</i> <b>e</b>jus:<br></p>
<p><span class="versenum">4.&nbsp;</span>Salútem ex i<i>ni</i><i>mí</i><i>cis</i> <b>no</b>stris,&nbsp;* et de manu ómnium, <i>qui</i> <i>o</i><b>dé</b>runt nos.<br></p>
<p><span class="versenum">5.&nbsp;</span>Ad faciéndam misericórdiam cum <i>pá</i><i>tri</i><i>bus</i> <b>no</b>stris:&nbsp;* et memorári testaménti <i>su</i><i>i</i> <b>san</b>cti.<br></p>
<p><span class="versenum">6.&nbsp;</span>Jusjurándum, quod jurávit ad Abra<i>ham</i> <i>pa</i><i>trem</i> <b>no</b>strum,&nbsp;* datú<i>rum</i> <i>se</i> <b>no</b>bis:<br></p>
<p><span class="versenum">7.&nbsp;</span>Ut sine timóre, de manu inimicórum nostró<i>rum</i> <i>li</i><i>be</i><b>rá</b>ti,&nbsp;* servi<i>á</i><i>mus</i> <b>il</b>li.<br></p>
<p><span class="versenum">8.&nbsp;</span>In sanctitáte, et justíti<i>a</i> <i>co</i><i>ram</i> <b>i</b>pso,&nbsp;* ómnibus di<i>é</i><i>bus</i> <b>no</b>stris.<br></p>
<p><span class="versenum">9.&nbsp;</span>Et tu, puer, Prophéta Altís<i>si</i><i>mi</i> <i>vo</i><b>cá</b>beris:&nbsp;* præíbis enim ante fáciem Dómini, paráre <i>vi</i><i>as</i> <b>e</b>jus:<br></p>
<p><span class="versenum">10.&nbsp;</span>Ad dandam sciéntiam salú<i>tis</i> <i>ple</i><i>bi</i> <b>e</b>jus:&nbsp;* in remissiónem peccató<i>rum</i> <i>e</i><b>ó</b>rum:<br></p>
<p><span class="versenum">11.&nbsp;</span>Per víscera misericórdi<i>æ</i> <i>De</i><i>i</i> <b>no</b>stri:&nbsp;* in quibus visitávit nos, óri<i>ens</i> <i>ex</i> <b>al</b>to:<br></p>
<p><span class="versenum">12.&nbsp;</span>Illumináre his, qui in ténebris, et in um<i>bra</i> <i>mor</i><i>tis</i> <b>se</b>dent:&nbsp;* ad dirigéndos pedes nostros in <i>vi</i><i>am</i> <b>pa</b>cis.<br></p>
<p><span class="versenum">13.&nbsp;</span>Glória <i>Pa</i><i>tri</i>, <i>et</i> <b>Fí</b>lio,&nbsp;* et Spirí<i>tu</i><i>i</i> <b>San</b>cto.<br></p>
<p><span class="versenum">14.&nbsp;</span>Sicut erat in princípio, <i>et</i> <i>nunc</i>, <i>et</i> <b>sem</b>per,&nbsp;* et in sǽcula sæcu<i>ló</i><i>rum</i>. <b>A</b>men.<br></p>
</div>`,
        }, {
            rubric: "The antiphon <Et valde mane> is repeated.",
            sticky: 1
        }
    ],
    "ite": [
        {
            id: 2988
        }
    ]
  }
}
var tempusKeys = [{title:"Selige tempus anni...",en:"Select a season..."},{key:"",title:"Inter Annum",en:"During the Year"},{key:"Quad",title:"Septuagesima usque ad Finem Quadragesimæ",en:"Septuagesima through Lent"},{key:"Pasch",title:"Tempus Paschale",en:"Paschal Time"}];
//{key:"",title:"",en:""}
/*TODO: sequences. All Souls, seven sorrows. anything else? */
var proprium = {
  ChristusRex: {introitusID:128,gradualeID:583,alleluiaID:746,offertoriumID:390,communioID:1229},
  SCJQuad: {introitusID:1320,gradualeID:1035,tractusID:1244,offertoriumID:628,communioID:1356},
  SCJPasch: {introitusID:1320,gradualeID:907,offertoriumID:319,communioID:154,alleluiaID:1237},
  SCJ: {communioID:1356,offertoriumID:628,introitusID:1320,gradualeID:1035,alleluiaID:907},
  nuptialis: {introitusID:551,gradualeID:311,alleluiaID:191,offertoriumID:967,communioID:490},
  nuptialisQuad: {introitusID:551,gradualeID:311,tractusID:144,offertoriumID:967,communioID:490},
  nuptialisPasch: {introitusID:551,gradualeID:191,alleluiaID:505,offertoriumID:967,communioID:490},
  defunctorum: {introitusID:766,gradualeID:1261,tractusID:338,sequentiaID:1198,offertoriumID:1199,communioID:241},
  dedicatio: {introitusID:923,gradualeID:651,alleluiaID:242,offertoriumID:200,communioID:43},
  dedicatioQuad: {introitusID:923,gradualeID:651,tractusID:1377,offertoriumID:200,communioID:43},
  dedicatioPasch: {introitusID:923,gradualeID:242,alleluiaID:1343,offertoriumID:200,communioID:43},
  Dec24: {introitusID:150,gradualeID:202,alleluiaID:167,offertoriumID:171,communioID:367},
  Dec25_1: {introitusID:1175,gradualeID:518,alleluiaID:890,offertoriumID:811,communioID:117},
  Dec25_2: {introitusID:917,gradualeID:217,alleluiaID:714,offertoriumID:979,communioID:1125},
  Dec25_3: {introitusID:72,gradualeID:1163,alleluiaID:324,offertoriumID:1274,communioID:1139},
  Jan1: {introitusID:72,gradualeID:1163,alleluiaID:863,offertoriumID:1274,communioID:1139},
  Epi: {introitusID:403,gradualeID:205,alleluiaID:524,offertoriumID:1147,communioID:918},
  Asc: {introitusID:1355,gradualeID:17,alleluiaID:57,offertoriumID:211,communioID:263},
  CorpusChristi: {introitusID:715,gradualeID:1230,alleluiaID:774,sequentiaID:308,offertoriumID:645,communioID:577},
  Adv1: {introitusID:132,offertoriumID:962,communioID:1036,alleluiaID:1115,gradualeID:1169},
  Adv2: {introitusID:356,offertoriumID:631,communioID:966,alleluiaID:292,gradualeID:1268},
  Adv3: {introitusID:1225,offertoriumID:113,communioID:218,alleluiaID:855,gradualeID:1007},
  Adv3Wed: {introitusID:79, gradualeID: [756,284], offertoriumID:290, communioID:284},
  Adv3Fri: {introitusID:86, gradualeID: 1055, offertoriumID:631, communioID:439},
  Adv3Sat: {introitusID:169, gradualeID: [698,203,38,506,2166], tractusID:1157, offertoriumID:929, communioID:88},
  Adv4: {introitusID:79,offertoriumID:210,communioID:1144,alleluiaID:224,gradualeID:284},
  Epi1: {introitusID:336,offertoriumID:93,communioID:626,gradualeID:260,alleluiaID:816},
  Epi2: {introitusID:13,offertoriumID:937,communioID:230,alleluiaID:538,gradualeID:932},
  Epi3: {introitusID:1123,offertoriumID:47,communioID:1148,alleluiaID:1001,gradualeID:1173},
  Epi4: {introitusID:1123,offertoriumID:47,communioID:1148,alleluiaID:1001,gradualeID:1173},
  Epi5: {introitusID:1123,offertoriumID:47,communioID:1148,alleluiaID:1001,gradualeID:1173},
  Epi6: {introitusID:1123,offertoriumID:47,communioID:1148,alleluiaID:1001,gradualeID:1173},
  Nat1: {introitusID:564,offertoriumID:979,communioID:1282,gradualeID:1308,alleluiaID:714},
  Nat2: {introitusID:1033,offertoriumID:980,communioID:8,alleluiaID:1,gradualeID:670},
  Pasc0: {introitusID:1043,gradualeID:1075,alleluiaID:761,sequentiaID:1086,offertoriumID:725,communioID:952},
  Pasc0m:{introitusID:1315, gradualeID:1150, alleluiaID:377, sequentiaID:1086, offertoriumID:789, communioID:121},
  Pasc0t:{introitusID:1135,gradualeID:1188,alleluiaID:438,sequentiaID:1086,offertoriumID:869,communioID:243},
  Pasc0w:{introitusID:997,gradualeID:416,alleluiaID:1217,sequentiaID:1086,offertoriumID:1361,communioID:593},
  Pasc0h:{introitusID:1332,gradualeID:975,alleluiaID:215,sequentiaID:1086,offertoriumID:1129,communioID:1219},
  Pasc0f:{introitusID:758,gradualeID:1305,alleluiaID:627,sequentiaID:1086,offertoriumID:151,communioID:1260},
  Pasc0s:{introitusID:974,gradualeID:568,alleluiaID:661,sequentiaID:1086,offertoriumID:941,communioID:1293},
  Pasc1: {introitusID:25,offertoriumID:789,communioID:953,gradualeID:1042,alleluiaID:275},
  Pasc2: {introitusID:135,offertoriumID:924,communioID:95,gradualeID:912,alleluiaID:1220},
  Pasc3: {introitusID:536,offertoriumID:668,communioID:813,gradualeID:1341,alleluiaID:446},
  Pasc4: {introitusID:42,offertoriumID:937,communioID:39,gradualeID:159,alleluiaID:1348},
  Pasc5: {introitusID:585,offertoriumID:860,communioID:579,gradualeID:633,alleluiaID:1040},
  Pasc6: {introitusID:990,offertoriumID:211,communioID:1091,gradualeID:405,alleluiaID:107},
  Pent0: {introitusID:861,offertoriumID:361,communioID:1041,gradualeID:99,alleluiaID:181,sequentiaID:68},
  Pent0m: {introitusID:715,gradualeID:101,alleluiaID:181,sequentiaID:68,offertoriumID:869,communioID:1151},
  Pent0t:{introitusID:1278,gradualeID:1197,alleluiaID:181,sequentiaID:68,offertoriumID:1361,communioID:333},
  Pent0w:{introitusID:822,gradualeID:635,alleluiaID:181,sequentiaID:68,offertoriumID:1218,communioID:91},
  Pent0h: {introitusID:861,offertoriumID:361,communioID:1041,gradualeID:99,alleluiaID:181,sequentiaID:68}, //AS on Pentecost
  Pent0f: {introitusID:557,gradualeID:119,alleluiaID:181,sequentiaID:68,offertoriumID:668,communioID:981},
  Pent0s:{introitusID:1228,gradualeID:[1236,1138,657,181,1289],tractusID:1247,sequentiaID:68,offertoriumID:987,communioID:190},
  Pent1: {introitusID:349,offertoriumID:1303,communioID:391,alleluiaID:1289,gradualeID:965},
  Pent2: {introitusID:1111,offertoriumID:848,communioID:794,alleluiaID:801,gradualeID:697},
  Pent3: {introitusID:1235,offertoriumID:1328,communioID:1058,alleluiaID:1264,gradualeID:423},
  Pent4: {introitusID:874,offertoriumID:708,communioID:512,alleluiaID:727,gradualeID:332},
  Pent5: {introitusID:396,offertoriumID:143,communioID:574,alleluiaID:797,gradualeID:1226},
  Pent6: {introitusID:522,offertoriumID:265,communioID:1079,alleluiaID:239,gradualeID:1046},
  Pent7: {introitusID:1136,offertoriumID:675,communioID:339,alleluiaID:77,gradualeID:1022},
  Pent8: {introitusID:1254,offertoriumID:1080,communioID:1203,alleluiaID:709,gradualeID:886},
  Pent9: {introitusID:1357,offertoriumID:591,communioID:798,alleluiaID:879,gradualeID:1205},
  Pent10: {introitusID:299,offertoriumID:962,communioID:1221,alleluiaID:1052,gradualeID:1088},
  Pent11: {introitusID:1026,offertoriumID:648,communioID:1145,alleluiaID:580,gradualeID:865},
  Pent12: {introitusID:501,offertoriumID:325,communioID:1245,alleluiaID:1082,gradualeID:1182},
  Pent13: {introitusID:691,offertoriumID:967,communioID:388,alleluiaID:820,gradualeID:1232},
  Pent14: {introitusID:1071,offertoriumID:747,communioID:868,alleluiaID:1246,gradualeID:547},
  Pent15: {introitusID:1165,offertoriumID:182,communioID:782,alleluiaID:1352,gradualeID:1338},
  Pent16: {introitusID:335,offertoriumID:993,communioID:1318,alleluiaID:1077,gradualeID:1173},
  Pent17: {introitusID:1284,offertoriumID:652,communioID:1134,alleluiaID:595,gradualeID:1044},
  EmbSatSept: {introitusID:450,gradualeID:[332,1226,1046,44,2166],tractusID:1247,offertoriumID:542,communioID:1149},
  Pent18: {introitusID:172,offertoriumID:838,communioID:404,alleluiaID:1097,gradualeID:1011},
  Pent19: {introitusID:389,offertoriumID:616,communioID:479,alleluiaID:1192,gradualeID:44},
  Pent20: {introitusID:1056,offertoriumID:812,communioID:696,alleluiaID:745,gradualeID:1230},
  Pent21: {introitusID:1047,offertoriumID:1363,communioID:1290,alleluiaID:1380,gradualeID:1108},
  Pent22: {introitusID:1271,offertoriumID:67,communioID:464,alleluiaID:933,gradualeID:614},
  Pent23: {introitusID:735,offertoriumID:986,communioID:592,alleluiaID:331,gradualeID:395},
  Pent24: {introitusID:735,offertoriumID:986,communioID:592,alleluiaID:331,gradualeID:395},
  PentEpi3: {introitusID:735},
  PentEpi4: {introitusID:735},
  PentEpi5: {introitusID:735},
  PentEpi6: {introitusID:735},
  AshWed: {introitusID:533, gradualeID:754, tractusID:425, offertoriumID:648, communioID:582},
  Quad1: {introitusID:327,offertoriumID:294,communioID:1100,tractusID:889,gradualeID:834},
  Quad1Sat: {introitusID:238,gradualeID:[332,1226,1046,44,2166],tractusID:1247,offertoriumID:542,communioID:131},
  Quad2: {introitusID:1294,offertoriumID:810,communioID:373,tractusID:455,gradualeID:596},
  Quad3: {introitusID:916,offertoriumID:591,communioID:1090,tractusID:1329,gradualeID:1298},
  Quad4: {introitusID:653,offertoriumID:899,communioID:1353,tractusID:1377,gradualeID:1011},
  Quad5: {introitusID:78,offertoriumID:318,communioID:726,tractusID:742,gradualeID:760},
  Quad6: {introitusID:1171,offertoriumID:486,communioID:650,tractusID:372,gradualeID:49},
  Septua: {introitusID:1168,offertoriumID:1194,communioID:640,tractusID:926,gradualeID:222},
  Sexa: {introitusID:529,offertoriumID:265,communioID:554,tractusID:1178,gradualeID:1265},
  Quinqua: {introitusID:1381,offertoriumID:1317,communioID:677,tractusID:1299,gradualeID:850},
  Quad3m: {introitusID:839,gradualeID:118,tractusID:425,offertoriumID:842,communioID:931},
  Quad4m: {introitusID:458,gradualeID:886,tractusID:425,offertoriumID:718,communioID:1210},
  Quad5m: {introitusID:138,gradualeID:621,tractusID:425,offertoriumID:848,communioID:81},
  Quad6m: {introitusID:226,gradualeID:783,tractusID:425,offertoriumID:411,communioID:196},
  Quad6t: {introitusID:374, gradualeID:903, offertoriumID:1322, communioID:397},
  Quad6w: {introitusID:236, gradualeID:1239, tractusID:824, offertoriumID:461, communioID:588},
  Quad6h: {introitusID:374, gradualeID:873, offertoriumID:47, communioID:140},
  Quad6f: {extraChants: 'graduale', gradualeID:[3177,22], ordinary: false},
  Quad6s: {extraChants: true, credo: false, agnus: false},
  Apr11: {communioID:666,gradualeID:1119,alleluiaID:228,introitusID:674,offertoriumID:358},
  Apr11Quad: {tractusID:1085,communioID:666,gradualeID:1119,introitusID:674,offertoriumID:358},
  Apr11Pasch: {communioID:666,gradualeID:228,alleluiaID:548,introitusID:674,offertoriumID:358},
  Apr13: {communioID:617,gradualeID:827,alleluiaID:762,introitusID:340,offertoriumID:1382},
  Apr13Quad: {tractusID:176,communioID:617,gradualeID:827,introitusID:340,offertoriumID:1382},
  Apr13Pasch: {communioID:617,gradualeID:762,alleluiaID:1249,introitusID:340,offertoriumID:1382},
  Apr14: {communioID:400,gradualeID:334,alleluiaID:289,introitusID:831,offertoriumID:285},
  Apr17: {communioID:666,gradualeID:1119,alleluiaID:228,introitusID:674,offertoriumID:358},
  Apr17Quad: {tractusID:516,communioID:666,gradualeID:1119,introitusID:674,offertoriumID:358},
  Apr17Pasch: {communioID:666,gradualeID:228,alleluiaID:548,introitusID:674,offertoriumID:358},
  Apr2: {communioID:1337,gradualeID:511,alleluiaID:765,introitusID:108,offertoriumID:667},
  Apr2Quad: {tractusID:444,communioID:1337,gradualeID:511,introitusID:108,offertoriumID:667},
  Apr2Pasch: {communioID:1337,gradualeID:765,alleluiaID:1207,introitusID:108,offertoriumID:667},
  Apr21: {communioID:1008,gradualeID:511,alleluiaID:14,introitusID:233,offertoriumID:777},
  Apr21Pasch: {communioID:1008,gradualeID:14,alleluiaID:1207,introitusID:233,offertoriumID:777},
  Apr22: {communioID:666,gradualeID:1119,alleluiaID:228,introitusID:674,offertoriumID:358},
  Apr22Pasch: {communioID:666,gradualeID:228,alleluiaID:548,introitusID:674,offertoriumID:358},
  Apr23: {communioID:617,gradualeID:762,alleluiaID:1249,introitusID:340,offertoriumID:1382},
  Apr28: {communioID:732,gradualeID:476,alleluiaID:1073,introitusID:775,offertoriumID:773},
  Apr30: {communioID:1301,gradualeID:208,alleluiaID:406,introitusID:629,offertoriumID:1333},
  Apr4: {communioID:1008,gradualeID:511,alleluiaID:14,introitusID:233,offertoriumID:777},
  Apr4Quad: {tractusID:444,communioID:1008,gradualeID:511,introitusID:233,offertoriumID:777},
  Apr4Pasch: {communioID:1008,gradualeID:14,alleluiaID:1207,introitusID:233,offertoriumID:777},
  Apr5: {communioID:1154,gradualeID:34,alleluiaID:765,introitusID:1374,offertoriumID:630},
  Apr5Quad: {tractusID:444,communioID:1154,gradualeID:34,introitusID:1374,offertoriumID:630},
  Apr5Pasch: {communioID:1154,gradualeID:765,alleluiaID:14,introitusID:1374,offertoriumID:630},
  Aug1: {communioID:699,gradualeID:614,alleluiaID:32,introitusID:788,offertoriumID:33},
  Aug10: {communioID:685,gradualeID:1027,alleluiaID:1122,introitusID:956,offertoriumID:105},
  Aug11: {communioID:1002,gradualeID:1009,alleluiaID:590,introitusID:737,offertoriumID:835},
  Aug15: {communioID:286,gradualeID:1000,alleluiaID:960,introitusID:23,offertoriumID:1083},
  Aug16: {communioID:1008,gradualeID:1212,alleluiaID:821,introitusID:544,offertoriumID:407},
  Aug2: {communioID:1196,gradualeID:73,alleluiaID:1094,introitusID:214,offertoriumID:1116},
  Aug22: {communioID:982,gradualeID:778,alleluiaID:881,introitusID:1110,offertoriumID:1045},
  Aug24: {communioID:97,gradualeID:307,alleluiaID:442,introitusID:475,offertoriumID:499},
  Aug27: {communioID:643,gradualeID:511,alleluiaID:724,introitusID:695,offertoriumID:1331},
  Aug28: {communioID:1008,gradualeID:511,alleluiaID:1350,introitusID:233,offertoriumID:777},
  Aug29: {communioID:586,gradualeID:34,alleluiaID:1207,introitusID:410,offertoriumID:667},
  Aug4: {communioID:1008,gradualeID:34,alleluiaID:1207,introitusID:1374,offertoriumID:630},
  Aug6: {communioID:885,gradualeID:null,alleluiaID:1124,introitusID:326,offertoriumID:125},
  Dec12: {communioID:1133,gradualeID:468,alleluiaID:232,introitusID:1140,offertoriumID:7},
  Dec13: {communioID:1292,gradualeID:394,alleluiaID:1076,introitusID:629,offertoriumID:768},
  Dec16: {communioID:586,gradualeID:1206,alleluiaID:1118,introitusID:227,offertoriumID:779},
  Dec2: {communioID:844,gradualeID:1373,alleluiaID:500,introitusID:938,offertoriumID:177},
  Dec21: {communioID:589,gradualeID:148,alleluiaID:216,introitusID:475,offertoriumID:570},
  Dec26: {communioID:920,gradualeID:906,alleluiaID:561,introitusID:1321,offertoriumID:462},
  Dec27: {communioID:781,gradualeID:702,alleluiaID:914,introitusID:233,offertoriumID:777},
  Dec28: {communioID:136,gradualeID:432,alleluiaID:661,introitusID:350,offertoriumID:1031},
  Dec29: {communioID:556,gradualeID:235,alleluiaID:1220,introitusID:74,offertoriumID:487},
  Dec3: {communioID:1154,gradualeID:34,alleluiaID:724,introitusID:115,offertoriumID:630},
  Dec4: {communioID:383,gradualeID:235,alleluiaID:477,introitusID:233,offertoriumID:777},
  Dec6: {communioID:317,gradualeID:827,alleluiaID:946,introitusID:456,offertoriumID:630},
  Dec7: {communioID:317,gradualeID:235,alleluiaID:1187,introitusID:233,offertoriumID:630},
  Dec8: {communioID:1004,gradualeID:713,alleluiaID:1057,introitusID:622,offertoriumID:210},
  Feb1: {communioID:368,gradualeID:235,alleluiaID:1162,introitusID:178,offertoriumID:407},
  Feb1Quad: {tractusID:176,communioID:368,gradualeID:235,introitusID:178,offertoriumID:407},
  Feb10: {communioID:1301,gradualeID:174,alleluiaID:208,introitusID:629,offertoriumID:1333},
  Feb10Quad: {tractusID:738,communioID:1301,gradualeID:174,introitusID:629,offertoriumID:1333},
  Feb11: {communioID:80,gradualeID:27,alleluiaID:1258,introitusID:5,offertoriumID:234},
  Feb11Quad: {tractusID:485,communioID:80,gradualeID:27,introitusID:5,offertoriumID:234},
  Feb12: {communioID:470,gradualeID:1084,alleluiaID:706,introitusID:312,offertoriumID:1275},
  Feb12Quad: {tractusID:305,communioID:470,gradualeID:1084,introitusID:312,offertoriumID:1275},
  Feb14: {communioID:89,gradualeID:153,alleluiaID:1249,introitusID:316,offertoriumID:407},
  Feb14Quad: {tractusID:176,communioID:89,gradualeID:153,introitusID:316,offertoriumID:407},
  Feb15: {communioID:1002,gradualeID:1009,alleluiaID:590,introitusID:737,offertoriumID:835},
  Feb15Quad: {tractusID:305,communioID:1002,gradualeID:1009,introitusID:737,offertoriumID:835},
  Feb2: {communioID:803,gradualeID:50,alleluiaID:429,introitusID:1254,offertoriumID:177},
  Feb2Quad: {tractusID:1346,communioID:803,gradualeID:50,introitusID:1254,offertoriumID:177},
  Feb24or25: {tractusID:176,communioID:1028,gradualeID:148,introitusID:475,offertoriumID:1319},
  Feb27or28: {communioID:164,gradualeID:1291,alleluiaID:791,introitusID:1025,offertoriumID:1193},
  Feb27or28Quad: {tractusID:728,communioID:164,gradualeID:1291,introitusID:1025,offertoriumID:1193},
  Feb3: {communioID:586,gradualeID:1206,alleluiaID:1118,introitusID:227,offertoriumID:779},
  Feb3Quad: {tractusID:444,communioID:586,gradualeID:1206,introitusID:227,offertoriumID:779},
  Feb4: {communioID:null,gradualeID:235,alleluiaID:477,introitusID:456,offertoriumID:779},
  Feb4Quad: {tractusID:444,communioID:null,gradualeID:235,introitusID:456,offertoriumID:779},
  Feb5: {communioID:454,gradualeID:1373,alleluiaID:642,introitusID:1183,offertoriumID:1107},
  Feb5Quad: {tractusID:305,communioID:454,gradualeID:1373,introitusID:1183,offertoriumID:1107},
  Feb7: {communioID:1008,gradualeID:600,alleluiaID:946,introitusID:1374,offertoriumID:722},
  Feb7Quad: {tractusID:444,communioID:1008,gradualeID:600,introitusID:1374,offertoriumID:722},
  Jan11: {communioID:666,gradualeID:1119,alleluiaID:228,introitusID:674,offertoriumID:358},
  Jan13: {communioID:918,gradualeID:205,alleluiaID:524,introitusID:403,offertoriumID:1147},
  Jan14: {communioID:1008,gradualeID:511,alleluiaID:14,introitusID:233,offertoriumID:777},
  Jan15: {communioID:617,gradualeID:34,alleluiaID:1207,introitusID:108,offertoriumID:667},
  Jan17: {communioID:1008,gradualeID:600,alleluiaID:946,introitusID:1374,offertoriumID:722},
  Jan18: {communioID:666,gradualeID:1119,alleluiaID:228,introitusID:456,offertoriumID:1234},
  Jan18Quad: {tractusID:1029,communioID:666,gradualeID:1119,introitusID:456,offertoriumID:1234},
  Jan20: {communioID:1267,gradualeID:888,alleluiaID:106,introitusID:261,offertoriumID:786},
  Jan20Quad: {tractusID:305,communioID:1267,gradualeID:888,introitusID:261,offertoriumID:786},
  Jan21: {communioID:1301,gradualeID:947,alleluiaID:301,introitusID:938,offertoriumID:1107},
  Jan21Quad: {tractusID:256,communioID:1301,gradualeID:947,introitusID:938,offertoriumID:1107},
  Jan22: {communioID:658,gradualeID:888,alleluiaID:1250,introitusID:261,offertoriumID:919},
  Jan22Quad: {tractusID:305,communioID:658,gradualeID:888,introitusID:261,offertoriumID:919},
  Jan23: {communioID:1154,gradualeID:34,alleluiaID:724,introitusID:1374,offertoriumID:630},
  Jan23Quad: {tractusID:444,communioID:1154,gradualeID:34,introitusID:1374,offertoriumID:630},
  Jan24: {communioID:317,gradualeID:827,alleluiaID:477,introitusID:456,offertoriumID:630},
  Jan24Quad: {tractusID:176,communioID:317,gradualeID:827,introitusID:456,offertoriumID:630},
  Jan25: {communioID:1337,gradualeID:1347,alleluiaID:466,introitusID:1179,offertoriumID:499},
  Jan25Quad: {tractusID:884,communioID:1337,gradualeID:1347,introitusID:1179,offertoriumID:499},
  Jan26: {communioID:586,gradualeID:235,alleluiaID:1118,introitusID:227,offertoriumID:779},
  Jan26Quad: {tractusID:444,communioID:586,gradualeID:235,introitusID:227,offertoriumID:779},
  Jan27: {communioID:1008,gradualeID:235,alleluiaID:724,introitusID:233,offertoriumID:777},
  Jan27Quad: {tractusID:444,communioID:1008,gradualeID:235,introitusID:233,offertoriumID:777},
  Jan28: {communioID:1337,gradualeID:511,alleluiaID:765,introitusID:108,offertoriumID:667},
  Jan28Quad: {tractusID:444,communioID:1337,gradualeID:511,introitusID:108,offertoriumID:667},
  Jan29: {communioID:1008,gradualeID:511,alleluiaID:14,introitusID:233,offertoriumID:777},
  Jan29Quad: {tractusID:444,communioID:1008,gradualeID:511,introitusID:233,offertoriumID:777},
  Jan30: {communioID:1032,gradualeID:394,alleluiaID:208,introitusID:510,offertoriumID:1107},
  Jan30Quad: {tractusID:256,communioID:1032,gradualeID:394,introitusID:510,offertoriumID:1107},
  Jan31: {communioID:186,gradualeID:21,alleluiaID:225,introitusID:1018,offertoriumID:805},
  Jan31Quad: {tractusID:837,communioID:186,gradualeID:21,introitusID:1018,offertoriumID:805},
  Jan5: {communioID:1139,gradualeID:1163,alleluiaID:863,introitusID:72,offertoriumID:1274},
  Jul1: {communioID:1019,gradualeID:1263,alleluiaID:1038,introitusID:123,offertoriumID:320},
  Jul10: {communioID:957,gradualeID:432,alleluiaID:32,introitusID:87,offertoriumID:1031},
  Jul11: {communioID:317,gradualeID:827,alleluiaID:477,introitusID:456,offertoriumID:630},
  Jul14: {communioID:1008,gradualeID:511,alleluiaID:1187,introitusID:233,offertoriumID:630},
  Jul16: {communioID:1053,gradualeID:392,alleluiaID:634,introitusID:3312,offertoriumID:787},
  Jul18: {communioID:1126,gradualeID:511,alleluiaID:765,introitusID:785,offertoriumID:667},
  Jul19: {communioID:1337,gradualeID:511,alleluiaID:765,introitusID:108,offertoriumID:667},
  Jul2: {communioID:160,gradualeID:392,alleluiaID:481,introitusID:1140,offertoriumID:567},
  Jul20: {communioID:1014,gradualeID:75,alleluiaID:569,introitusID:1297,offertoriumID:1362},
  Jul22: {communioID:844,gradualeID:394,alleluiaID:1076,introitusID:938,offertoriumID:1333},
  Jul23: {communioID:383,gradualeID:827,alleluiaID:1187,introitusID:227,offertoriumID:630},
  Jul25: {communioID:1028,gradualeID:307,alleluiaID:1030,introitusID:475,offertoriumID:570},
  Jul26: {communioID:900,gradualeID:394,alleluiaID:1076,introitusID:950,offertoriumID:1333},
  Jul27: {communioID:685,gradualeID:764,alleluiaID:1201,introitusID:251,offertoriumID:487},
  Jul28: {communioID:658,gradualeID:888,alleluiaID:1250,introitusID:261,offertoriumID:919},
  Jul3: {communioID:703,gradualeID:672,alleluiaID:1015,introitusID:1093,offertoriumID:1300},
  Jul31: {communioID:514,gradualeID:34,alleluiaID:724,introitusID:1295,offertoriumID:630},
  Jul5: {communioID:201,gradualeID:155,alleluiaID:96,introitusID:1349,offertoriumID:662},
  Jul7: {communioID:1002,gradualeID:415,alleluiaID:1187,introitusID:48,offertoriumID:919},
  Jun1: {communioID:1301,gradualeID:174,alleluiaID:208,introitusID:629,offertoriumID:1333},
  Jun10: {communioID:799,gradualeID:947,alleluiaID:406,introitusID:619,offertoriumID:177},
  Jun11: {communioID:1028,gradualeID:351,alleluiaID:1030,introitusID:475,offertoriumID:1319},
  Jun12: {communioID:1154,gradualeID:34,alleluiaID:724,introitusID:1374,offertoriumID:630},
  Jun14: {communioID:1008,gradualeID:511,alleluiaID:1350,introitusID:233,offertoriumID:630},
  Jun21: {communioID:711,gradualeID:1334,alleluiaID:1170,introitusID:857,offertoriumID:1306},
  Jun22: {communioID:1008,gradualeID:235,alleluiaID:477,introitusID:48,offertoriumID:779},
  Jun24: {communioID:133,gradualeID:647,alleluiaID:847,introitusID:659,offertoriumID:777},
  Jun26: {communioID:658,gradualeID:614,alleluiaID:32,introitusID:248,offertoriumID:1375},
  Jun29: {communioID:666,gradualeID:307,alleluiaID:228,introitusID:478,offertoriumID:1319},
  Jun30: {communioID:1337,gradualeID:1347,alleluiaID:120,introitusID:1179,offertoriumID:499},
  Jun4: {communioID:6,gradualeID:398,alleluiaID:594,introitusID:1313,offertoriumID:777},
  Jun5: {communioID:1190,gradualeID:1181,alleluiaID:198,introitusID:1224,offertoriumID:143},
  Mar10: {tractusID:305,communioID:957,gradualeID:614,introitusID:788,offertoriumID:786},
  Mar12: {tractusID:1085,communioID:666,gradualeID:1119,introitusID:674,offertoriumID:358},
  Mar17: {tractusID:444,communioID:1008,gradualeID:235,introitusID:456,offertoriumID:779},
  Mar19: {communioID:139,gradualeID:600,alleluiaID:14,introitusID:108,offertoriumID:630},
  Mar19Quad: {tractusID:444,communioID:139,gradualeID:600,introitusID:108,offertoriumID:630},
  Mar19Pasch: {communioID:139,gradualeID:14,alleluiaID:1207,introitusID:108,offertoriumID:630},
  Mar21: {tractusID:444,communioID:1008,gradualeID:600,introitusID:1374,offertoriumID:722},
  Mar24: {tractusID:266,communioID:1127,gradualeID:609,introitusID:985,offertoriumID:302},
  Mar25: {communioID:1144,gradualeID:947,alleluiaID:1209,introitusID:124,offertoriumID:843},
  Mar25Quad: {tractusID:738,communioID:1144,gradualeID:947,introitusID:124,offertoriumID:843},
  Mar25Pasch: {communioID:1144,gradualeID:1209,alleluiaID:281,introitusID:124,offertoriumID:843},
  Mar27: {tractusID:35,communioID:601,gradualeID:306,introitusID:656,offertoriumID:166},
  Mar28: {tractusID:250,communioID:877,gradualeID:370,introitusID:52,offertoriumID:244},
  Mar6: {tractusID:256,communioID:1292,gradualeID:394,introitusID:938,offertoriumID:177},
  Mar7: {tractusID:444,communioID:1008,gradualeID:511,introitusID:233,offertoriumID:777},
  Mar8: {tractusID:444,communioID:1154,gradualeID:34,introitusID:1374,offertoriumID:630},
  Mar9: {tractusID:256,communioID:799,gradualeID:947,introitusID:619,offertoriumID:177},
  May1: {communioID:28,gradualeID:1344,alleluiaID:1324,introitusID:646,offertoriumID:26},
  May1Pasch: {communioID:28,gradualeID:1324,alleluiaID:213,introitusID:646,offertoriumID:26},
  May10: {communioID:1008,gradualeID:235,alleluiaID:477,introitusID:456,offertoriumID:779},
  May11: {communioID:921,gradualeID:762,alleluiaID:1101,introitusID:469,offertoriumID:1382},
  May12: {communioID:772,gradualeID:32,alleluiaID:590,introitusID:1222,offertoriumID:1382},
  May13: {communioID:559,gradualeID:1189,alleluiaID:231,introitusID:233,offertoriumID:102},
  May15: {communioID:1154,gradualeID:34,alleluiaID:724,introitusID:1374,offertoriumID:630},
  May15Pasch: {communioID:1154,gradualeID:724,alleluiaID:14,introitusID:1374,offertoriumID:630},
  May16: {communioID:1008,gradualeID:235,alleluiaID:477,introitusID:456,offertoriumID:779},
  May16Pasch: {communioID:1008,gradualeID:477,alleluiaID:1118,introitusID:456,offertoriumID:779},
  May2: {communioID:1002,gradualeID:477,alleluiaID:724,introitusID:233,offertoriumID:779},
  May24: {communioID:160,gradualeID:392,alleluiaID:127,introitusID:1140,offertoriumID:843},
  May26: {communioID:1367,gradualeID:1022,alleluiaID:194,introitusID:530,offertoriumID:1253},
  May26Pasch: {communioID:1367,gradualeID:194,alleluiaID:237,introitusID:530,offertoriumID:1253},
  May28: {communioID:1154,gradualeID:415,alleluiaID:1187,introitusID:48,offertoriumID:630},
  May28Pasch: {communioID:1154,gradualeID:1187,alleluiaID:14,introitusID:48,offertoriumID:630},
  May29: {communioID:1301,gradualeID:174,alleluiaID:208,introitusID:629,offertoriumID:1333},
  May29Pasch: {communioID:1301,gradualeID:208,alleluiaID:406,introitusID:629,offertoriumID:1333},
  May31: {communioID:1053,gradualeID:1368,alleluiaID:717,introitusID:246,offertoriumID:719},
  May31Pasch: {communioID:1053,gradualeID:717,alleluiaID:354,introitusID:246,offertoriumID:719},
  May4: {communioID:799,gradualeID:406,alleluiaID:913,introitusID:619,offertoriumID:177},
  May5: {communioID:509,gradualeID:1119,alleluiaID:228,introitusID:674,offertoriumID:358},
  May5Pasch: {communioID:509,gradualeID:228,alleluiaID:548,introitusID:674,offertoriumID:358},
  Nov1: {communioID:345,gradualeID:371,alleluiaID:1237,introitusID:752,offertoriumID:835},
  Nov11: {communioID:1154,gradualeID:235,alleluiaID:988,introitusID:456,offertoriumID:630},
  Nov14: {communioID:556,gradualeID:827,alleluiaID:1118,introitusID:417,offertoriumID:401},
  Nov2: {tractusID:338,communioID:241,gradualeID:1261,introitusID:766,offertoriumID:1199},
  Nov21: {communioID:160,gradualeID:392,alleluiaID:127,introitusID:1140,offertoriumID:210},
  Nov22: {communioID:1032,gradualeID:840,alleluiaID:301,introitusID:510,offertoriumID:1107},
  Nov23: {communioID:666,gradualeID:1119,alleluiaID:228,introitusID:409,offertoriumID:358},
  Nov25: {communioID:1032,gradualeID:394,alleluiaID:208,introitusID:510,offertoriumID:1107},
  Nov26: {communioID:1008,gradualeID:600,alleluiaID:946,introitusID:1374,offertoriumID:722},
  Nov27: {communioID:1087,gradualeID:1174,alleluiaID:254,introitusID:493,offertoriumID:151},
  Nov30: {communioID:552,gradualeID:307,alleluiaID:984,introitusID:475,offertoriumID:499},
  Nov8: {communioID:1267,gradualeID:888,alleluiaID:106,introitusID:261,offertoriumID:786},
  Nov9: {communioID:43,gradualeID:651,alleluiaID:242,introitusID:923,offertoriumID:200},
  Oct11: {communioID:160,gradualeID:471,alleluiaID:1114,introitusID:1372,offertoriumID:910},
  Oct17: {communioID:459,gradualeID:790,alleluiaID:1307,introitusID:1195,offertoriumID:618},
  Oct18: {communioID:1028,gradualeID:351,alleluiaID:1030,introitusID:475,offertoriumID:499},
  Oct2: {communioID:1127,gradualeID:834,alleluiaID:784,introitusID:985,offertoriumID:1270},
  Oct20: {communioID:1003,gradualeID:971,alleluiaID:792,introitusID:970,offertoriumID:515},
  Oct23: {communioID:1154,gradualeID:415,alleluiaID:1187,introitusID:48,offertoriumID:630},
  Oct24: {communioID:1127,gradualeID:581,alleluiaID:814,introitusID:985,offertoriumID:302},
  Oct28: {communioID:1028,gradualeID:307,alleluiaID:442,introitusID:475,offertoriumID:570},
  Oct3: {communioID:162,gradualeID:1034,alleluiaID:1257,introitusID:59,offertoriumID:362},
  Oct7: {communioID:104,gradualeID:807,alleluiaID:420,introitusID:246,offertoriumID:494},
  Oct9: {communioID:991,gradualeID:1186,alleluiaID:664,introitusID:41,offertoriumID:1098},
  Sep12: {communioID:160,gradualeID:392,alleluiaID:127,introitusID:124,offertoriumID:843},
  Sep14: {communioID:346,gradualeID:873,alleluiaID:859,introitusID:374,offertoriumID:195},
  Sep15: {communioID:1180,gradualeID:1383,alleluiaID:853,introitusID:149,offertoriumID:787},
  Sep17: {communioID:1008,gradualeID:511,alleluiaID:1200,introitusID:849,offertoriumID:630},
  Sep18: {communioID:976,gradualeID:600,alleluiaID:473,introitusID:258,offertoriumID:607},
  Sep21: {communioID:365,gradualeID:153,alleluiaID:442,introitusID:1374,offertoriumID:487},
  Sep27: {communioID:184,gradualeID:1009,alleluiaID:32,introitusID:11,offertoriumID:1375},
  Sep28: {communioID:89,gradualeID:153,alleluiaID:1249,introitusID:316,offertoriumID:407},
  Sep29: {communioID:1127,gradualeID:609,alleluiaID:1103,introitusID:985,offertoriumID:302},
  Sep3: {communioID:90,gradualeID:977,alleluiaID:467,introitusID:452,offertoriumID:805},
  Sep3Quad: {tractusID:1281,communioID:90,gradualeID:977,introitusID:452,offertoriumID:805},
  Sep3Pasch: {communioID:90,gradualeID:467,alleluiaID:315,introitusID:452,offertoriumID:805},
  Jan16: {ref:"Jan11"},
  Feb6: {ref:"Feb4"},
  Feb8: {ref:"Jan23"},
  Feb9: {ref:"Jan29"},
  Feb18: {ref:"Jan24"},
  Feb22: {ref:"Jan18"},
  Feb23: {ref:"Jan29"},
  Mar4: {ref:"Jan23"},
  Mar18: {ref:"Mar7"},
  Apr24: {ref:"Apr23"},
  Apr25: {ref:"Apr23"},
  Apr26: {ref:"Apr11"},
  Apr27: {ref:"Apr21"},
  Apr29: {ref:"Apr23"},
  May7: {ref:"Apr23"},
  May9: {ref:"Apr21"},
  May17: {ref:"May15"},
  May18: {ref:"Apr23"},
  May19: {ref:"May5"},
  May20: {ref:"May15"},
  May27: {ref:"Apr21"},
  May30: {ref:"Jan11"},
  Jun6: {ref:"May10"},
  Jun13: {ref:"Jan14"},
  Jun17: {ref:"May10"},
  Jun18: {ref:"Jan14"},
  Jun20: {ref:"Jan11"},
  Jun25: {ref:"Jan17"},
  Jul8: {ref:"Jun10"},
  Jul12: {ref:"Jan17"},
  Jul15: {ref:"Jun12"},
  Jul17: {ref:"Jun12"},
  Jul21: {ref:"Jan14"},
  Jul29: {ref:"Jun1"},
  Aug5: {ref:"May24"},
  Aug7: {ref:"Jun12"},
  Aug8: {ref:"Jun12"},
  Aug12: {ref:"Jun1"},
  Aug13: {ref:"Aug11"},
  Aug17: {ref:"Jun12"},
  Aug18: {ref:"Jul27"},
  Aug19: {ref:"Jun12"},
  Aug20: {ref:"Jan14"},
  Aug21: {ref:"Jun10"},
  Aug23: {ref:"Jul19"},
  Aug25: {ref:"Jun12"},
  Aug30: {ref:"Jun1"},
  Aug31: {ref:"Jun12"},
  Sep2: {ref:"Jun12"},
  Sep5: {ref:"May10"},
  Sep8: {ref:"Jul2"},
  Sep9: {ref:"Jul27"},
  Sep10: {ref:"Jul19"},
  Sep11: {ref:"Aug11"},
  Sep16: {ref:"Jul28"},
  Sep19: {ref:"Aug11"},
  Sep22: {ref:"May10"},
  Sep23: {ref:"Jan11"},
  Sep24: {ref:"May24"},
  Sep26: {ref:"Aug11"},
  Sep30: {ref:"Jan14"},
  Oct4: {ref:"Sep17"},
  Oct5: {ref:"Aug11"},
  Oct6: {ref:"Jun12"},
  Oct8: {ref:"Jun10"},
  Oct10: {ref:"Jan17"},
  Oct13: {ref:"Jun12"},
  Oct14: {ref:"Jan11"},
  Oct15: {ref:"Jun1"},
  Oct16: {ref:"Jun10"},
  Oct19: {ref:"Jul19"},
  Nov4: {ref:"May10"},
  Nov10: {ref:"Jun12"},
  Nov12: {ref:"Jan11"},
  Nov13: {ref:"Jul19"},
  Nov15: {ref:"Jan14"},
  Nov16: {ref:"Jun1"},
  Nov17: {ref:"May10"},
  Nov18: {ref:"Nov9"},
  Nov19: {ref:"Jun10"},
  Nov20: {ref:"Jul19"},
  Nov24: {ref:"Jan14"},
  Nov29: {ref:"Jul27"},
  Dec5: {ref:"Jun12"},
  Dec10: {ref:"Jan11"},
  Dec11: {ref:"Jan11"}
};
var chantID = {
introitus:{"gaudeamus... mariae... assumptione":{id:3312},accipite:{Vatican:{incipit:"Accipite",parenthetic:"Vatican",id:1787},Solesmes:{incipit:"Accipite",parenthetic:"Solesmes",id:1278}},adeamus:{psalm:{eructavit:{incipit:"Adeamus. Ps. Eructavit",parenthetic:"Solesmes",id:1110},levavi:{incipit:"Adeamus. Ps. Levavi",parenthetic:"Solesmes",id:603}}},adjutor:{incipit:"Adjutor",parenthetic:"Solesmes",id:385},"adorate deum":{Solesmes:{incipit:"Adorate Deum",parenthetic:"Solesmes",id:1123},Vatican:{incipit:"Adorate Deum",parenthetic:"Vatican",id:1728}},"ad te levavi":{Vatican:{incipit:"Ad te levavi",parenthetic:"Vatican",id:1700},Solesmes:{incipit:"Ad te levavi",parenthetic:"Solesmes",id:132}},"angelus domini":{incipit:"Angelus Domini",parenthetic:"Solesmes",id:69},aperite:{incipit:"Aperite",parenthetic:"Solesmes",id:692},"aqua sapientiae":{Solesmes:{incipit:"Aqua sapientiae",parenthetic:"Solesmes",id:1135},Vatican:{incipit:"Aqua sapientiae",parenthetic:"Vatican",id:1732}},"audivit dominus":{Solesmes:{incipit:"Audivit Dominus",parenthetic:"Solesmes",id:45},Vatican:{incipit:"Audivit Dominus",parenthetic:"Vatican",id:1396}},"benedicite dominum":{incipit:"Benedicite Dominum",parenthetic:"Solesmes",id:985},"benedicta sit":{Vatican:{incipit:"Benedicta sit",parenthetic:"Vatican",id:1496},Solesmes:{incipit:"Benedicta sit",parenthetic:"Solesmes",id:349}},"cantate domino":{Vatican:{incipit:"Cantate Domino",parenthetic:"Vatican",id:1393},Solesmes:{incipit:"Cantate Domino",parenthetic:"Solesmes",id:42}},"cantemus domino":{incipit:"Cantemus Domino",parenthetic:"Solesmes",id:465},"caritas dei cum alleluia":{incipit:"Caritas Dei cum Alleluia",parenthetic:"Solesmes",id:1228},"caritas dei... nostris, alleluia":{incipit:"Caritas Dei... nostris, alleluia",parenthetic:"Vatican",id:1769},"caritas dei sine alleluia":{incipit:"Caritas Dei sine Alleluia",parenthetic:"Solesmes",id:530},"christo confixus sum":{incipit:"Christo confixus sum",parenthetic:"Solesmes",id:775},"cibavit cum alleluia":{incipit:"Cibavit cum Alleluia",parenthetic:"Solesmes",id:715},"cibavit eos... alleluia":{incipit:"Cibavit eos... alleluia",parenthetic:"Vatican",id:1597},"cibavit sine alleluia":{incipit:"Cibavit sine Alleluia",parenthetic:"Solesmes",id:62},"circumdederunt me":{Solesmes:{incipit:"Circumdederunt me",parenthetic:"Solesmes",id:1168},Vatican:{incipit:"Circumdederunt me",parenthetic:"Vatican",id:1746}},"clamaverunt justi":{incipit:"Clamaverunt justi",parenthetic:"Solesmes",id:788},"cogitationes cordis":{incipit:"Cogitationes Cordis",parenthetic:"Solesmes",id:1320},cognovi:{incipit:"Cognovi",parenthetic:"Solesmes",id:619},confessio:{incipit:"Confessio",parenthetic:"Solesmes",id:956},"confiteantur tibi":{incipit:"Confiteantur tibi",parenthetic:"Solesmes",id:381},"congregate illi":{incipit:"Congregate illi",parenthetic:"Solesmes",id:826},consummatus:{incipit:"Consummatus",parenthetic:"Solesmes",id:610},"cor meum":{incipit:"Cor meum",parenthetic:"Solesmes",id:1256},custodivit:{incipit:"Custodivit",parenthetic:"Solesmes",id:363},"da nobis, deus":{incipit:"Da nobis, Deus",parenthetic:"Solesmes",id:526},"da pacem":{incipit:"Da pacem",parenthetic:"Solesmes",id:172},"dedit illi":{incipit:"Dedit illi",parenthetic:"Solesmes",id:1018},"dedit mihi dominus":{incipit:"Dedit mihi Dominus",parenthetic:"Solesmes",id:1120},"de necessitatibus":{Vatican:{incipit:"De necessitatibus",parenthetic:"Vatican",id:1414},Solesmes:{incipit:"De necessitatibus",parenthetic:"Solesmes",id:100}},"deus dum egredereris":{Vatican:{incipit:"Deus dum egredereris",parenthetic:"Vatican",id:1631},Solesmes:{incipit:"Deus dum egredereris",parenthetic:"Solesmes",id:822}},"deus in adjutorium":{Solesmes:{incipit:"Deus in adjutorium",parenthetic:"Solesmes",id:501},Vatican:{incipit:"Deus in adjutorium",parenthetic:"Vatican",id:1532}},"deus in loco sancto":{Solesmes:{incipit:"Deus in loco sancto",parenthetic:"Solesmes",id:1026},Vatican:{incipit:"Deus in loco sancto",parenthetic:"Vatican",id:1698}},"deus in nomine tuo":{Vatican:{incipit:"Deus in nomine tuo",parenthetic:"Vatican",id:1526},Solesmes:{incipit:"Deus in nomine tuo",parenthetic:"Solesmes",id:458}},"deus israel":{incipit:"Deus Israel",parenthetic:"Solesmes",id:551},"deus meus":{incipit:"Deus meus",parenthetic:"Solesmes",id:615},"deus misereatur":{incipit:"Deus misereatur",parenthetic:"Solesmes",id:2},"de ventre matris":{incipit:"De ventre matris",parenthetic:"Solesmes",id:659},"dicit dominus : ego":{incipit:"Dicit Dominus : Ego",parenthetic:"Solesmes",id:735},"dicit dominus : sermones":{incipit:"Dicit Dominus : Sermones",parenthetic:"Solesmes",id:409},"dicit dominus petro":{incipit:"Dicit Dominus Petro",parenthetic:"Solesmes",id:1366},"dignus est agnus":{incipit:"Dignus est Agnus",parenthetic:"Solesmes",id:128},"dilectio dei":{incipit:"Dilectio Dei",parenthetic:"Solesmes",id:258},dilexisti:{incipit:"Dilexisti",parenthetic:"Solesmes",id:629},dispersit:{incipit:"Dispersit",parenthetic:"Solesmes",id:544},"domine deus":{incipit:"Domine Deus",parenthetic:"Solesmes",id:1172},"domine in tua misericordia":{Solesmes:{incipit:"Domine in tua misericordia",parenthetic:"Solesmes",id:146},Vatican:{incipit:"Domine in tua misericordia",parenthetic:"Vatican",id:1431}},"domine ne longe":{Solesmes:{incipit:"Domine ne longe",parenthetic:"Solesmes",id:1171},Vatican:{incipit:"Domine ne longe",parenthetic:"Vatican",id:1748}},"domine refugium":{Solesmes:{incipit:"Domine refugium",parenthetic:"Solesmes",id:549},Vatican:{incipit:"Domine refugium",parenthetic:"Vatican",id:1546}},"dominus dixit":{Solesmes:{incipit:"Dominus dixit",parenthetic:"Solesmes",id:1175},Vatican:{incipit:"Dominus dixit",parenthetic:"Vatican",id:1750}},"dominus fortitudo":{Vatican:{incipit:"Dominus fortitudo",parenthetic:"Vatican",id:1538},Solesmes:{incipit:"Dominus fortitudo",parenthetic:"Solesmes",id:522}},"dominus illuminatio":{Solesmes:{incipit:"Dominus illuminatio",parenthetic:"Solesmes",id:874},Vatican:{incipit:"Dominus illuminatio",parenthetic:"Vatican",id:1650}},"dominus implebit":{incipit:"Dominus implebit",parenthetic:"Solesmes",id:1259},"dominus secus mare":{incipit:"Dominus secus mare",parenthetic:"Solesmes",id:693},"dum clamarem":{Vatican:{incipit:"Dum clamarem",parenthetic:"Vatican",id:1484},Solesmes:{incipit:"Dum clamarem",parenthetic:"Solesmes",id:299}},"dum medium silentium":{Vatican:{incipit:"Dum medium silentium",parenthetic:"Vatican",id:1554},Solesmes:{incipit:"Dum medium silentium",parenthetic:"Solesmes",id:564}},"dum sanctificatus":{Vatican:{incipit:"Dum sanctificatus",parenthetic:"Vatican",id:1517},Solesmes:{incipit:"Dum sanctificatus",parenthetic:"Solesmes",id:418}},"ecce advenit":{Solesmes:{incipit:"Ecce advenit",parenthetic:"Solesmes",id:403},Vatican:{incipit:"Ecce advenit",parenthetic:"Vatican",id:1512}},"ecce deus":{Vatican:{incipit:"Ecce Deus",parenthetic:"Vatican",id:1814},Solesmes:{incipit:"Ecce Deus",parenthetic:"Solesmes",id:1357}},"ecce elongavi":{incipit:"Ecce elongavi",parenthetic:"Solesmes",id:24},"ecce oculi":{incipit:"Ecce oculi",parenthetic:"Solesmes",id:1222},"ecce virgo":{incipit:"Ecce Virgo",parenthetic:"Solesmes",id:1372},"eduxit dominus":{Solesmes:{incipit:"Eduxit Dominus",parenthetic:"Solesmes",id:974},Vatican:{incipit:"Eduxit Dominus",parenthetic:"Vatican",id:1683}},"eduxit eos":{Solesmes:{incipit:"Eduxit eos",parenthetic:"Solesmes",id:758},Vatican:{incipit:"Eduxit eos",parenthetic:"Vatican",id:1610}},"effusum est":{incipit:"Effusum est",parenthetic:"Solesmes",id:1297},"ego autem cum justitia":{Solesmes:{incipit:"Ego autem cum justitia",parenthetic:"Solesmes",id:830},Vatican:{incipit:"Ego autem cum justitia",parenthetic:"Vatican",id:1634}},"ego autem in... gaudebo":{incipit:"Ego autem in... gaudebo",parenthetic:"Solesmes",id:52},"ego autem in... speravi":{Solesmes:{incipit:"Ego autem in... speravi",parenthetic:"Solesmes",id:1049},Vatican:{incipit:"Ego autem in... speravi",parenthetic:"Vatican",id:1705}},"ego autem sicut":{incipit:"Ego autem sicut",parenthetic:"Solesmes",id:163},"ego clamavi":{Vatican:{incipit:"Ego clamavi",parenthetic:"Vatican",id:1551},Solesmes:{incipit:"Ego clamavi",parenthetic:"Solesmes",id:558}},"egredimini...":{incipit:"Egredimini...",parenthetic:"Solesmes",id:1283},"erit quasi signum":{incipit:"Erit quasi signum",parenthetic:"Solesmes",id:493},"esto mihi":{Solesmes:{incipit:"Esto mihi",parenthetic:"Solesmes",id:1381},Vatican:{incipit:"Esto mihi",parenthetic:"Vatican",id:1819}},"etenim sederunt":{Vatican:{incipit:"Etenim sederunt",parenthetic:"Vatican",id:1802},Solesmes:{incipit:"Etenim sederunt",parenthetic:"Solesmes",id:1321}},"exaudi deus":{Solesmes:{incipit:"Exaudi Deus",parenthetic:"Solesmes",id:904},Vatican:{incipit:"Exaudi Deus",parenthetic:"Vatican",id:1659}},"exaudi domine... adjutor":{Solesmes:{incipit:"Exaudi Domine... adjutor",parenthetic:"Solesmes",id:396},Vatican:{incipit:"Exaudi Domine... adjutor",parenthetic:"Vatican",id:1509}},"exaudi domine... alleluia":{incipit:"Exaudi Domine... alleluia",parenthetic:"Vatican",id:1689},"exaudi domine... tibi":{incipit:"Exaudi Domine... tibi",parenthetic:"Solesmes",id:990},exaudivit:{Solesmes:{incipit:"Exaudivit",parenthetic:"Solesmes",id:451},Vatican:{incipit:"Exaudivit",parenthetic:"Vatican",id:1675}},"exaudivit... alleluia":{incipit:"Exaudivit... alleluia",parenthetic:"Solesmes",id:939},exclamaverunt:{incipit:"Exclamaverunt",parenthetic:"Solesmes",id:469},"ex ore infantium":{Vatican:{incipit:"Ex ore infantium",parenthetic:"Vatican",id:1497},Solesmes:{incipit:"Ex ore infantium",parenthetic:"Solesmes",id:350}},"exspecta dominum":{Solesmes:{incipit:"Exspecta Dominum",parenthetic:"Solesmes",id:60},Vatican:{incipit:"Exspecta Dominum",parenthetic:"Vatican",id:1400}},"exsultabo in jerusalem":{incipit:"Exsultabo in Jerusalem",parenthetic:"Solesmes",id:1224},"exsultate deo":{incipit:"Exsultate Deo",parenthetic:"Solesmes",id:1323},"exsultet gaudio":{incipit:"Exsultet gaudio",parenthetic:"Solesmes",id:336},exsurge:{Vatican:{incipit:"Exsurge",parenthetic:"Vatican",id:1540},Solesmes:{incipit:"Exsurge",parenthetic:"Solesmes",id:529}},"extuli electum":{incipit:"Extuli electum",parenthetic:"Solesmes",id:452},"facies unctionis":{incipit:"Facies unctionis",parenthetic:"Solesmes",id:1131},"fac mecum domine":{Solesmes:{incipit:"Fac mecum Domine",parenthetic:"Solesmes",id:733},Vatican:{incipit:"Fac mecum Domine",parenthetic:"Vatican",id:1603}},"factum est":{incipit:"Factum est",parenthetic:"Solesmes",id:1313},"factus est dominus":{Solesmes:{incipit:"Factus est Dominus",parenthetic:"Solesmes",id:1111},Vatican:{incipit:"Factus est Dominus",parenthetic:"Vatican",id:1724}},foderunt:{incipit:"Foderunt",parenthetic:"Solesmes",id:948},"gaudeamus... agathae":{incipit:"Gaudeamus... Agathae",parenthetic:"Solesmes",id:1183},"gaudeamus... annae":{incipit:"Gaudeamus... Annae",parenthetic:"Solesmes",id:950},"gaudeamus... josaphat":{incipit:"Gaudeamus... Josaphat",parenthetic:"Solesmes",id:417},"gaudeamus... mariae... boni consilii":{incipit:"Gaudeamus... Mariae... Boni Consilii",parenthetic:"Solesmes",id:624},"gaudeamus... mariae... reginae":{incipit:"Gaudeamus... Mariae... Reginae",parenthetic:"Solesmes",id:61},"gaudeamus... mariae... solemnitate":{incipit:"Gaudeamus... Mariae... solemnitate",parenthetic:"Solesmes",id:246},"gaudeamus... rosae virginis":{incipit:"Gaudeamus... Rosae Virginis",parenthetic:"Solesmes",id:347},"gaudeamus... sanctorum omnium":{incipit:"Gaudeamus... Sanctorum omnium",parenthetic:"Solesmes",id:752},"gaudeamus... thomae":{Vatican:{incipit:"Gaudeamus... Thomae",parenthetic:"Vatican",id:1404},Solesmes:{incipit:"Gaudeamus... Thomae",parenthetic:"Solesmes",id:74}},"gaudens gaudebo":{incipit:"Gaudens gaudebo",parenthetic:"Solesmes",id:655},"gaudens gaudebo... quasi":{incipit:"Gaudens gaudebo... quasi",parenthetic:"Solesmes",id:622},gaudete:{Solesmes:{incipit:"Gaudete",parenthetic:"Solesmes",id:1225},Vatican:{incipit:"Gaudete",parenthetic:"Vatican",id:1767}},"hi sunt qui venerunt":{incipit:"Hi sunt qui venerunt",parenthetic:"Solesmes",id:669},"hodie scietis":{Solesmes:{incipit:"Hodie scietis",parenthetic:"Solesmes",id:150},Vatican:{incipit:"Hodie scietis",parenthetic:"Vatican",id:1432}},humiliavit:{incipit:"Humiliavit",parenthetic:"Solesmes",id:523},"illumina oculos":{incipit:"Illumina oculos",parenthetic:"Solesmes",id:1072},illuxerunt:{incipit:"Illuxerunt",parenthetic:"Solesmes",id:326},"inclina domine":{incipit:"Inclina Domine",parenthetic:"Solesmes",id:1165},"in deo laudabo":{Solesmes:{incipit:"In Deo laudabo",parenthetic:"Solesmes",id:839},Vatican:{incipit:"In Deo laudabo",parenthetic:"Vatican",id:1635}},"in excelso throno":{Vatican:{incipit:"In excelso throno",parenthetic:"Vatican",id:1387},Solesmes:{incipit:"In excelso throno",parenthetic:"Solesmes",id:20}},"in medio":{incipit:"In medio",parenthetic:"Solesmes",id:233},"in nomine domini":{Vatican:{incipit:"In nomine Domini",parenthetic:"Vatican",id:1458},Solesmes:{incipit:"In nomine Domini",parenthetic:"Solesmes",id:236}},"in nomine jesu":{psalm:{domine:{incipit:"In nomine Jesu... Ps. Domine",parenthetic:"Solesmes",id:1033},gloriabuntur:{incipit:"In nomine Jesu... Ps. Gloriabuntur",parenthetic:"Solesmes",id:1295}}},"in sermonibus":{incipit:"In sermonibus",parenthetic:"Solesmes",id:41},"intret in conspectu":{incipit:"Intret in conspectu",parenthetic:"Solesmes",id:261},"intret oratio":{Vatican:{incipit:"Intret oratio",parenthetic:"Vatican",id:1459},Solesmes:{incipit:"Intret oratio",parenthetic:"Solesmes",id:238}},"introduxit vos":{Vatican:{incipit:"Introduxit vos",parenthetic:"Vatican",id:1799},Solesmes:{incipit:"Introduxit vos",parenthetic:"Solesmes",id:1315}},"in virtute tua":{incipit:"In virtute tua",parenthetic:"Solesmes",id:316},"invocabit me":{Vatican:{incipit:"Invocabit me",parenthetic:"Vatican",id:1491},Solesmes:{incipit:"Invocabit me",parenthetic:"Solesmes",id:327}},"in voluntate":{incipit:"In voluntate",parenthetic:"Solesmes",id:1047},"jubilate deo":{Solesmes:{incipit:"Jubilate Deo",parenthetic:"Solesmes",id:536},Vatican:{incipit:"Jubilate Deo",parenthetic:"Vatican",id:1543}},"judica domine":{Vatican:{incipit:"Judica Domine",parenthetic:"Vatican",id:1455},Solesmes:{incipit:"Judica Domine",parenthetic:"Solesmes",id:226}},"judica me":{Solesmes:{incipit:"Judica me",parenthetic:"Solesmes",id:78},Vatican:{incipit:"Judica me",parenthetic:"Vatican",id:1406}},"judicant sancti":{incipit:"Judicant sancti",parenthetic:"Solesmes",id:1213},"juravit dominus":{incipit:"Juravit Dominus",parenthetic:"Solesmes",id:684},"justi decantaverunt":{incipit:"Justi decantaverunt",parenthetic:"Solesmes",id:312},"justi epulentur":{incipit:"Justi epulentur",parenthetic:"Solesmes",id:1339},"justus es domine":{incipit:"Justus es Domine",parenthetic:"Solesmes",id:1284},"justus ut palma":{incipit:"Justus ut palma",parenthetic:"Solesmes",id:108},"laetabitur justus":{incipit:"Laetabitur justus",parenthetic:"Solesmes",id:251},"laetare jerusalem":{Solesmes:{incipit:"Laetare Jerusalem",parenthetic:"Solesmes",id:653},Vatican:{incipit:"Laetare Jerusalem",parenthetic:"Vatican",id:1581}},"laetetur cor":{Solesmes:{incipit:"Laetetur cor",parenthetic:"Solesmes",id:864},Vatican:{incipit:"Laetetur cor",parenthetic:"Vatican",id:1646}},"laudate pueri":{incipit:"Laudate pueri",parenthetic:"Solesmes",id:87},"lex domini":{Solesmes:{incipit:"Lex Domini",parenthetic:"Solesmes",id:1216},Vatican:{incipit:"Lex Domini",parenthetic:"Vatican",id:1761}},"lex veritatis":{incipit:"Lex veritatis",parenthetic:"Solesmes",id:1093},"liberator meus":{Vatican:{incipit:"Liberator meus",parenthetic:"Vatican",id:1707},Solesmes:{incipit:"Liberator meus",parenthetic:"Solesmes",id:1054}},loquebar:{psalm:{"beati immaculati":{incipit:"Loquebar... Ps. Beati immaculati",parenthetic:"Solesmes",id:510},"bonum est":{incipit:"Loquebar... Ps. Bonum est",parenthetic:"Solesmes",id:410},laudate:{incipit:"Loquebar... Ps. Laudate",parenthetic:"Solesmes",id:115}}},"loquetur dominus":{incipit:"Loquetur Dominus",parenthetic:"Solesmes",id:271},"lux fulgebit":{Solesmes:{incipit:"Lux fulgebit",parenthetic:"Solesmes",id:917},Vatican:{incipit:"Lux fulgebit",parenthetic:"Vatican",id:1665}},majorem:{incipit:"Majorem",parenthetic:"Solesmes",id:785},meditatio:{Solesmes:{incipit:"Meditatio",parenthetic:"Solesmes",id:572},Vatican:{incipit:"Meditatio",parenthetic:"Vatican",id:1556}},"me exspectaverunt":{incipit:"Me exspectaverunt",parenthetic:"Solesmes",id:938},"memento nostri":{incipit:"Memento nostri",parenthetic:"Solesmes 1974",id:165},"mihi absit":{incipit:"Mihi absit",parenthetic:"Solesmes",id:1037},"mihi autem absit":{psalm:{memento:{incipit:"Mihi autem absit. Ps. Memento",parenthetic:"Solesmes",id:178},"virga tua":{incipit:"Mihi autem absit. Ps. Virga tua",parenthetic:"Solesmes",id:1064},voce:{incipit:"Mihi autem absit. Ps. Voce",parenthetic:"Solesmes",id:849}}},"mihi autem nimis":{incipit:"Mihi autem nimis",parenthetic:"Solesmes",id:475},"minuisti eum":{incipit:"Minuisti eum",parenthetic:"Solesmes",id:857},miseratio:{incipit:"Miseratio",parenthetic:"Solesmes",id:970},"miserere... ad te":{incipit:"Miserere... ad te",parenthetic:"Solesmes",id:335},"miserere... conculcavit":{Vatican:{incipit:"Miserere... conculcavit",parenthetic:"Vatican",id:1427},Solesmes:{incipit:"Miserere... conculcavit",parenthetic:"Solesmes",id:138}},"miserere... tribulor":{Solesmes:{incipit:"Miserere... tribulor",parenthetic:"Solesmes",id:267},Vatican:{incipit:"Miserere... tribulor",parenthetic:"Vatican",id:1468}},"misereris omnium":{Vatican:{incipit:"Misereris omnium",parenthetic:"Vatican",id:1542},Solesmes:{incipit:"Misereris omnium",parenthetic:"Solesmes",id:533}},"misericordia domini":{Vatican:{incipit:"Misericordia Domini",parenthetic:"Vatican",id:1425},Solesmes:{incipit:"Misericordia Domini",parenthetic:"Solesmes",id:135}},"multae tribulationes":{incipit:"Multae tribulationes",parenthetic:"Solesmes",id:248},narraverunt:{incipit:"Narraverunt",parenthetic:"Solesmes",id:831},"ne derelinquas me":{Vatican:{incipit:"Ne derelinquas me",parenthetic:"Vatican",id:1488},Solesmes:{incipit:"Ne derelinquas me",parenthetic:"Solesmes",id:323}},"ne timeas":{incipit:"Ne timeas",parenthetic:"Solesmes",id:1141},"nos autem":{Vatican:{incipit:"Nos autem",parenthetic:"Vatican",id:1502},Solesmes:{incipit:"Nos autem",parenthetic:"Solesmes",id:374}},"nos autem... alleluia":{incipit:"Nos autem... alleluia",parenthetic:"Solesmes",id:359},"nunc scio vere":{incipit:"Nunc scio vere",parenthetic:"Solesmes",id:478},"oculi mei":{Vatican:{incipit:"Oculi mei",parenthetic:"Vatican",id:1664},Solesmes:{incipit:"Oculi mei",parenthetic:"Solesmes",id:916}},"oculus dei":{incipit:"Oculus Dei",parenthetic:"Solesmes",id:1025},"omnes gentes":{Vatican:{incipit:"Omnes gentes",parenthetic:"Vatican",id:1733},Solesmes:{incipit:"Omnes gentes",parenthetic:"Solesmes",id:1136}},"omnia quae fecisti":{incipit:"Omnia quae fecisti",parenthetic:"Solesmes",id:1056},"omnis terra":{Solesmes:{incipit:"Omnis terra",parenthetic:"Solesmes",id:13},Vatican:{incipit:"Omnis terra",parenthetic:"Vatican",id:1385}},"os justi":{incipit:"Os justi",parenthetic:"Solesmes",id:1374},"pauperes sion":{incipit:"Pauperes Sion",parenthetic:"Solesmes",id:94},"populus sion":{Vatican:{incipit:"Populus Sion",parenthetic:"Vatican",id:1498},Solesmes:{incipit:"Populus Sion",parenthetic:"Solesmes",id:356}},"prope es tu":{Solesmes:{incipit:"Prope es tu",parenthetic:"Solesmes",id:86},Vatican:{incipit:"Prope es tu",parenthetic:"Vatican",id:1409}},"protector noster":{Solesmes:{incipit:"Protector noster",parenthetic:"Solesmes",id:1071},Vatican:{incipit:"Protector noster",parenthetic:"Vatican",id:1712}},"protexisti me":{incipit:"Protexisti me",parenthetic:"Solesmes",id:340},"puer natus est":{Solesmes:{incipit:"Puer natus est",parenthetic:"Solesmes",id:72},Vatican:{incipit:"Puer natus est",parenthetic:"Vatican",id:1403}},"quasi modo":{Solesmes:{incipit:"Quasi modo",parenthetic:"Solesmes",id:25},Vatican:{incipit:"Quasi modo",parenthetic:"Vatican",id:1389}},recordare:{incipit:"Recordare",parenthetic:"Solesmes",id:535},"redemisti nos":{incipit:"Redemisti nos",parenthetic:"Solesmes",id:123},"redime me":{Vatican:{incipit:"Redime me",parenthetic:"Vatican",id:1798},Solesmes:{incipit:"Redime me",parenthetic:"Solesmes",id:1314}},"reliqui domum":{incipit:"Reliqui domum",parenthetic:"Solesmes",id:895},reminiscere:{Solesmes:{incipit:"Reminiscere",parenthetic:"Solesmes",id:1294},Vatican:{incipit:"Reminiscere",parenthetic:"Vatican",id:1791}},"repleatur os":{Vatican:{incipit:"Repleatur os",parenthetic:"Vatican",id:1550},Solesmes:{incipit:"Repleatur os",parenthetic:"Solesmes",id:557}},requiem:{incipit:"Requiem",parenthetic:"Solesmes",id:766},"respice domine":{Solesmes:{incipit:"Respice Domine",parenthetic:"Solesmes",id:691},Vatican:{incipit:"Respice Domine",parenthetic:"Vatican",id:1588}},"respice in me":{Vatican:{incipit:"Respice in me",parenthetic:"Vatican",id:1772},Solesmes:{incipit:"Respice in me",parenthetic:"Solesmes",id:1235}},resurrexi:{Vatican:{incipit:"Resurrexi",parenthetic:"Vatican",id:1703},Solesmes:{incipit:"Resurrexi",parenthetic:"Solesmes",id:1043}},rorate:{psalm:{benedixisti:{incipit:"Rorate... Ps. Benedixisti",parenthetic:"Solesmes",id:161},"caeli enarrant":{incipit:"Rorate... Ps. Caeli enarrant",parenthetic:"Solesmes",id:79},"coeli enarrant":{incipit:"Rorate... Ps. Coeli enarrant",parenthetic:"Vatican",id:1407}}},"sacerdotes dei":{incipit:"Sacerdotes Dei",parenthetic:"Solesmes",id:227},"sacerdotes eius":{incipit:"Sacerdotes eius",parenthetic:null,id:3266},"sacerdotes sion":{incipit:"Sacerdotes Sion",parenthetic:"Solesmes",id:605},"sacerdotes tui":{incipit:"Sacerdotes tui",parenthetic:"Solesmes",id:48},"salus autem":{incipit:"Salus autem",parenthetic:"Solesmes",id:737},"salus populi":{incipit:"Salus populi",parenthetic:"Solesmes",id:389},"salve sancta parens":{incipit:"Salve sancta Parens",parenthetic:"Solesmes",id:1140},"salvos nos fac":{incipit:"Salvos nos fac",parenthetic:"Solesmes",id:575},"sancti tui":{incipit:"Sancti tui",parenthetic:"Solesmes",id:1231},"sapientiam sanctorum":{incipit:"Sapientiam sanctorum",parenthetic:"Solesmes",id:11},"sapientia reddidit":{incipit:"Sapientia reddidit",parenthetic:"Solesmes",id:646},"satiavit dominus":{incipit:"Satiavit Dominus",parenthetic:"Solesmes",id:573},"sciens jesus":{incipit:"Sciens Jesus",parenthetic:"Solesmes",id:676},"scio cui credidi":{incipit:"Scio cui credidi",parenthetic:"Solesmes",id:1179},"sermo meus":{incipit:"Sermo meus",parenthetic:"Solesmes",id:1349},"sicut oculi":{Vatican:{incipit:"Sicut oculi",parenthetic:"Vatican",id:1807},Solesmes:{incipit:"Sicut oculi",parenthetic:"Solesmes",id:1330}},"si diligis me":{incipit:"Si diligis me",parenthetic:"Solesmes",id:674},"signum magnum":{incipit:"Signum magnum",parenthetic:"Solesmes",id:23},"si iniquitates":{incipit:"Si iniquitates",parenthetic:"Solesmes",id:1271},"sinite parvulos":{incipit:"Sinite parvulos",parenthetic:"Solesmes",id:936},sitientes:{Solesmes:{incipit:"Sitientes",parenthetic:"Solesmes",id:776},Vatican:{incipit:"Sitientes",parenthetic:"Vatican",id:1615}},"spiritus domini cum alleluia":{incipit:"Spiritus Domini cum Alleluia",parenthetic:"Solesmes",id:861},"spiritus domini sine alleluia":{incipit:"Spiritus Domini sine Alleluia",parenthetic:"Solesmes",id:636},"spiritus domini super me":{incipit:"Spiritus Domini super me",parenthetic:"Solesmes",id:214},"spiritus... replevit... alleluia":{incipit:"Spiritus... replevit... alleluia",parenthetic:"Vatican",id:1644},"spiritus... super me... praedicare":{incipit:"Spiritus... super me... praedicare",parenthetic:"Solesmes",id:806},stabant:{incipit:"Stabant",parenthetic:"Solesmes",id:149},statuit:{incipit:"Statuit",parenthetic:"Solesmes",id:456},"sub umbra":{incipit:"Sub umbra",parenthetic:"Solesmes",id:1195},suscepimus:{Solesmes:{incipit:"Suscepimus",parenthetic:"Solesmes",id:1254},Vatican:{incipit:"Suscepimus",parenthetic:"Vatican",id:1781}},suscitabo:{incipit:"Suscitabo",parenthetic:"Solesmes",id:1286},"tenuisti manum":{incipit:"Tenuisti manum",parenthetic:"Solesmes",id:656},"terribilis est":{incipit:"Terribilis est",parenthetic:"Solesmes",id:923},"tibi dixit":{Vatican:{incipit:"Tibi dixit",parenthetic:"Vatican",id:1607},Solesmes:{incipit:"Tibi dixit",parenthetic:"Solesmes",id:751}},"timete dominum":{incipit:"Timete Dominum",parenthetic:"Solesmes",id:808},"veni de libano":{incipit:"Veni de Libano",parenthetic:"Solesmes",id:59},"veni et ostende":{Vatican:{incipit:"Veni et ostende",parenthetic:"Vatican",id:1439},Solesmes:{incipit:"Veni et ostende",parenthetic:"Solesmes",id:169}},"venite adoremus":{incipit:"Venite adoremus",parenthetic:"Solesmes",id:450},"venite benedicti":{Vatican:{incipit:"Venite benedicti",parenthetic:"Vatican",id:1690},Solesmes:{incipit:"Venite benedicti",parenthetic:"Solesmes",id:997}},"venite filii":{incipit:"Venite filii",parenthetic:"Solesmes",id:695},"verba mea":{Solesmes:{incipit:"Verba mea",parenthetic:"Solesmes",id:1248},Vatican:{incipit:"Verba mea",parenthetic:"Vatican",id:1779}},"victricem manum":{Vatican:{incipit:"Victricem manum",parenthetic:"Vatican",id:1808},Solesmes:{incipit:"Victricem manum",parenthetic:"Solesmes",id:1332}},"vidi civitatem":{incipit:"Vidi civitatem",parenthetic:"Solesmes",id:5},"virgines laudent":{incipit:"Virgines laudent",parenthetic:"Solesmes",id:197},"viri galilaei":{Solesmes:{incipit:"Viri Galilaei",parenthetic:"Solesmes",id:1355},Vatican:{incipit:"Viri Galilaei",parenthetic:"Vatican",id:1813}},"vocem jucunditatis":{Vatican:{incipit:"Vocem jucunditatis",parenthetic:"Vatican",id:1563},Solesmes:{incipit:"Vocem jucunditatis",parenthetic:"Solesmes",id:585}},"vultum tuum":{incipit:"Vultum tuum",parenthetic:"Solesmes",id:124}},
alleluia:{"lauda anima mea":{id:3318},accedite:{incipit:"Accedite",parenthetic:"Solesmes",id:1365},adducentur:{incipit:"Adducentur",parenthetic:"Solesmes",id:208},adorabo:{incipit:"Adorabo",parenthetic:"Solesmes",id:242},"amavit eum":{incipit:"Amavit eum",parenthetic:"Solesmes",id:14},"angelus... apparuit":{incipit:"Angelus... apparuit",parenthetic:"Solesmes",id:51},"angelus... descendit":{incipit:"Angelus... descendit",parenthetic:"Vatican",id:1505},"angelus domini descendit":{incipit:"Angelus Domini descendit",parenthetic:"Solesmes",id:377},"anima nostra":{incipit:"Anima nostra",parenthetic:"Solesmes",id:1302},"ascendit deus":{Solesmes:{incipit:"Ascendit Deus",parenthetic:"Solesmes",id:17},Vatican:{incipit:"Ascendit Deus",parenthetic:"Vatican",id:1386}},"assumpta est":{incipit:"Assumpta est",parenthetic:"Solesmes",id:960},"a summo caelo":{incipit:"A summo caelo",parenthetic:"Solesmes",id:254},"auditui meo":{incipit:"Auditui meo",parenthetic:"Solesmes",id:453},"ave maria":{incipit:"Ave Maria",parenthetic:"Solesmes",id:1209},"ave rex noster":{incipit:"Ave Rex noster",parenthetic:"Solesmes",id:199},"beata es":{incipit:"Beata es",parenthetic:"Solesmes",id:734},"beatam me dicent":{incipit:"Beatam me dicent",parenthetic:"Solesmes",id:460},"beati qui habitant":{incipit:"Beati qui habitant",parenthetic:"Solesmes",id:1050},"beatus homo":{incipit:"Beatus homo",parenthetic:"Solesmes",id:116},"beatus quem elegisti":{incipit:"Beatus quem elegisti",parenthetic:"Solesmes",id:1170},"beatus qui lingua":{incipit:"Beatus qui lingua",parenthetic:"Solesmes",id:625},"beatus vir qui suffert":{incipit:"Beatus vir qui suffert",parenthetic:"Solesmes",id:724},"beatus vir qui timet":{incipit:"Beatus vir qui timet",parenthetic:"Solesmes",id:765},"beatus vir sanctus martinus":{incipit:"Beatus vir sanctus Martinus",parenthetic:"Solesmes",id:988},"benedicamus patrem":{incipit:"Benedicamus Patrem",parenthetic:"Solesmes",id:744},"benedic anima mea":{incipit:"Benedic anima mea",parenthetic:"Solesmes",id:480},"benedicat vobis":{incipit:"Benedicat vobis",parenthetic:"Solesmes",id:505},"benedicite domino":{incipit:"Benedicite Domino",parenthetic:"Solesmes",id:784},"benedictio dei":{incipit:"Benedictio Dei",parenthetic:"Solesmes",id:295},"benedictus dominus":{incipit:"Benedictus Dominus",parenthetic:"Solesmes",id:1048},"benedictus es":{Vatican:{incipit:"Benedictus es",parenthetic:"Vatican",id:1789},Solesmes:{incipit:"Benedictus es",parenthetic:"Solesmes",id:1289}},"benedictus qui venit":{incipit:"Benedictus qui venit",parenthetic:"Solesmes 1974",id:866},"bene fundata est":{incipit:"Bene fundata est",parenthetic:"Solesmes",id:1343},"candor est":{incipit:"Candor est",parenthetic:"Solesmes",id:1124},"cantate domino":{incipit:"Cantate Domino",parenthetic:"Solesmes",id:1077},"caro mea":{Solesmes:{incipit:"Caro mea",parenthetic:"Solesmes",id:774},Vatican:{incipit:"Caro mea",parenthetic:"Vatican",id:1614}},"casta generatio":{incipit:"Casta generatio",parenthetic:"Solesmes",id:283},"christo confixus":{incipit:"Christo confixus",parenthetic:"Solesmes",id:1162},"christus passus est":{incipit:"Christus passus est",parenthetic:"Solesmes",id:1233},"christus resurgens":{Vatican:{incipit:"Christus resurgens",parenthetic:"Vatican",id:1811},Solesmes:{incipit:"Christus resurgens",parenthetic:"Solesmes",id:1348}},cognoverunt:{Vatican:{incipit:"Cognoverunt",parenthetic:"Vatican",id:1662},Solesmes:{incipit:"Cognoverunt",parenthetic:"Solesmes",id:912}},"concaluit cor":{incipit:"Concaluit cor",parenthetic:"Solesmes",id:237},"concussum est":{incipit:"Concussum est",parenthetic:"Solesmes",id:1017},condemnat:{incipit:"Condemnat",parenthetic:"Solesmes",id:9},confiteantur:{incipit:"Confiteantur",parenthetic:"Solesmes",id:220},confitebuntur:{incipit:"Confitebuntur",parenthetic:"Solesmes",id:762},"confitemini domino et invocate":{incipit:"Confitemini... et invocate",parenthetic:"Solesmes",id:1192},"confitemini domino quoniam":{incipit:"Confitemini... quoniam",parenthetic:"Solesmes",id:507},"confitemini... quoniam (in lit.)":{incipit:"Confitemini... quoniam (In Lit.)",parenthetic:"Vatican",id:1535},"constitues eos":{incipit:"Constitues eos",parenthetic:"Solesmes",id:548},"corona aurea":{incipit:"Corona aurea",parenthetic:"Solesmes",id:413},"corona tribulationis":{incipit:"Corona tribulationis",parenthetic:"Solesmes",id:1102},"corpora sanctorum":{incipit:"Corpora sanctorum",parenthetic:"Solesmes",id:1250},"crastina die":{Vatican:{incipit:"Crastina die",parenthetic:"Vatican",id:1438},Solesmes:{incipit:"Crastina die",parenthetic:"Solesmes",id:167}},"custodi innocentiam":{incipit:"Custodi innocentiam",parenthetic:"Solesmes",id:262},declinabo:{incipit:"Declinabo",parenthetic:"Solesmes",id:198},"dedisti mihi":{incipit:"Dedisti mihi",parenthetic:"Solesmes",id:310},"de excelso":{incipit:"De excelso",parenthetic:"Solesmes",id:194},"defecit caro":{incipit:"Defecit caro",parenthetic:"Solesmes",id:594},"de profundis":{incipit:"De profundis",parenthetic:"Solesmes",id:331},"de quacumque":{incipit:"De quacumque",parenthetic:"Solesmes",id:1324},"deus autem":{incipit:"Deus autem",parenthetic:"Solesmes",id:880},"deus, docuisti":{incipit:"Deus, docuisti",parenthetic:"Solesmes",id:741},"deus judex justus":{Vatican:{incipit:"Deus judex justus",parenthetic:"Vatican",id:1783},Solesmes:{incipit:"Deus judex justus",parenthetic:"Solesmes",id:1264}},"deus qui sedes":{Vatican:{incipit:"Deus qui sedes",parenthetic:"Vatican",id:1601},Solesmes:{incipit:"Deus qui sedes",parenthetic:"Solesmes",id:727}},"deus virtutum":{incipit:"Deus virtutum",parenthetic:"Solesmes",id:539},"dextera dei":{Vatican:{incipit:"Dextera Dei",parenthetic:"Vatican",id:1436},Solesmes:{incipit:"Dextera Dei",parenthetic:"Solesmes",id:159}},"dicite in gentibus":{Vatican:{incipit:"Dicite in gentibus",parenthetic:"Vatican",id:1571},Solesmes:{incipit:"Dicite in gentibus",parenthetic:"Solesmes",id:627}},"dies sanctificatus":{Solesmes:{incipit:"Dies sanctificatus",parenthetic:"Solesmes",id:324},Vatican:{incipit:"Dies sanctificatus",parenthetic:"Vatican",id:1489}},"diffusa est":{incipit:"Diffusa est",parenthetic:"Solesmes",id:1076},"dignus es domine":{incipit:"Dignus es Domine",parenthetic:"Solesmes",id:983},"dilexit andream":{incipit:"Dilexit Andream",parenthetic:"Solesmes",id:984},dispersit:{incipit:"Dispersit",parenthetic:"Solesmes",id:569},"domine deus meus in te":{Solesmes:{incipit:"Domine Deus meus in te",parenthetic:"Solesmes",id:801},Vatican:{incipit:"Domine Deus meus in te",parenthetic:"Vatican",id:1622}},"domine deus salutis":{Solesmes:{incipit:"Domine Deus salutis",parenthetic:"Solesmes",id:1082},Vatican:{incipit:"Domine Deus salutis",parenthetic:"Vatican",id:1717}},"domine diligo":{incipit:"Domine diligo",parenthetic:"Solesmes",id:315},"domine exaudi":{incipit:"Domine exaudi",parenthetic:"Solesmes",id:595},"domine in virtute":{Vatican:{incipit:"Domine in virtute",parenthetic:"Vatican",id:1620},Solesmes:{incipit:"Domine in virtute",parenthetic:"Solesmes",id:797}},"domine refugium":{Solesmes:{incipit:"Domine refugium",parenthetic:"Solesmes",id:820},Vatican:{incipit:"Domine refugium",parenthetic:"Vatican",id:1630}},"dominus dabit":{incipit:"Dominus dabit",parenthetic:"Solesmes",id:1146},"dominus dixit":{Vatican:{incipit:"Dominus dixit",parenthetic:"Vatican",id:1654},Solesmes:{incipit:"Dominus dixit",parenthetic:"Solesmes",id:890}},"dominus in sina":{Vatican:{incipit:"Dominus in Sina",parenthetic:"Vatican",id:1399},Solesmes:{incipit:"Dominus in Sina",parenthetic:"Solesmes",id:57}},"dominus regnavit decorem":{Solesmes:{incipit:"Dominus regnavit, decorem",parenthetic:"Solesmes",id:714},Vatican:{incipit:"Dominus regnavit, decorem",parenthetic:"Vatican",id:1596}},"dominus regnavit exsultet":{Vatican:{incipit:"Dominus regnavit, exsultet",parenthetic:"Vatican",id:1692},Solesmes:{incipit:"Dominus regnavit, exsultet",parenthetic:"Solesmes",id:1001}},"dominus salvavit":{incipit:"Dominus salvavit",parenthetic:"Solesmes",id:287},"dulce lignum":{incipit:"Dulce lignum",parenthetic:"Solesmes",id:859},"dum complerentur":{Solesmes:{incipit:"Dum complerentur",parenthetic:"Solesmes",id:657},Vatican:{incipit:"Dum complerentur",parenthetic:"Vatican",id:1582}},"ecce concipiet":{incipit:"Ecce concipiet",parenthetic:"Solesmes",id:482},"ecce quam bonum":{incipit:"Ecce quam bonum",parenthetic:"Solesmes",id:1078},"ego autem cantabo":{incipit:"Ego autem cantabo",parenthetic:"Solesmes",id:192},"ego dilecto":{incipit:"Ego dilecto",parenthetic:"Solesmes",id:1307},"ego dominus dabo eis":{incipit:"Ego Dominus dabo eis",parenthetic:"Solesmes",id:1325},"ego dominus inebriabo":{incipit:"Ego Dominus inebriabo",parenthetic:"Solesmes",id:183},"ego sum pastor":{Vatican:{incipit:"Ego sum pastor",parenthetic:"Vatican",id:1765},Solesmes:{incipit:"Ego sum pastor",parenthetic:"Solesmes",id:1220}},"ego vos elegi":{incipit:"Ego vos elegi",parenthetic:"Solesmes",id:1030},"emitte spiritum":{Vatican:{incipit:"Emitte Spiritum",parenthetic:"Vatican",id:1413},Solesmes:{incipit:"Emitte Spiritum",parenthetic:"Solesmes",id:99}},"eripe me":{Solesmes:{incipit:"Eripe me",parenthetic:"Solesmes",id:879},Vatican:{incipit:"Eripe me",parenthetic:"Vatican",id:1651}},"erit autem sanguis":{incipit:"Erit autem sanguis",parenthetic:"Solesmes",id:875},evangelizare:{incipit:"Evangelizare",parenthetic:"Solesmes",id:297},"exaltabo te":{incipit:"Exaltabo te",parenthetic:"Solesmes",id:954},"exaudi orationem":{incipit:"Exaudi orationem",parenthetic:"Solesmes",id:329},"excita domine":{Solesmes:{incipit:"Excita Domine",parenthetic:"Solesmes",id:855},Vatican:{incipit:"Excita Domine",parenthetic:"Vatican",id:1642}},"exite de medio":{incipit:"Exite de medio",parenthetic:"Solesmes",id:1191},"exivi a patre":{Solesmes:{incipit:"Exivi a Patre",parenthetic:"Solesmes",id:1040},Vatican:{incipit:"Exivi a Patre",parenthetic:"Vatican",id:1701}},exsultabo:{incipit:"Exsultabo",parenthetic:"Solesmes",id:1342},"exsultate deo":{Solesmes:{incipit:"Exsultate Deo",parenthetic:"Solesmes",id:580},Vatican:{incipit:"Exsultate Deo",parenthetic:"Vatican",id:1560}},"exsurge domine":{incipit:"Exsurge Domine",parenthetic:"Solesmes",id:1185},"fac nos innocuam":{incipit:"Fac nos innocuam",parenthetic:"Solesmes",id:213},"fecisti viriliter":{incipit:"Fecisti viriliter",parenthetic:"Solesmes",id:999},"felix es sacra":{incipit:"Felix es sacra",parenthetic:"Solesmes",id:481},"filii tui":{incipit:"Filii tui",parenthetic:"Solesmes",id:445},flores:{incipit:"Flores",parenthetic:"Solesmes",id:964},"flores... tempus":{incipit:"Flores... tempus",parenthetic:"Solesmes",id:232},franciscus:{incipit:"Franciscus",parenthetic:"Solesmes",id:1200},"fulgebunt justi":{incipit:"Fulgebunt justi",parenthetic:"Solesmes",id:560},"gaudete justi":{incipit:"Gaudete justi",parenthetic:"Solesmes",id:216},"gloriosus deus":{incipit:"Gloriosus Deus",parenthetic:"Solesmes",id:274},"gressus meos":{incipit:"Gressus meos",parenthetic:"Solesmes",id:352},"gustate et videte":{incipit:"Gustate et videte",parenthetic:"Solesmes",id:1304},"habet in vestimento":{incipit:"Habet in vestimento",parenthetic:"Solesmes",id:270},"haec dies quam fecit":{Vatican:{incipit:"Haec dies quam fecit",parenthetic:"Vatican",id:1555},Solesmes:{incipit:"Haec dies quam fecit",parenthetic:"Solesmes",id:568}},"haec est generatio":{incipit:"Haec est generatio",parenthetic:"Solesmes",id:852},"haec est vera":{incipit:"Haec est vera",parenthetic:"Solesmes",id:32},"haec est virgo":{incipit:"Haec est virgo",parenthetic:"Solesmes",id:500},"haec est vita aeterna":{incipit:"Haec est vita aeterna",parenthetic:"Solesmes",id:540},"hic est discipulus":{Solesmes:{incipit:"Hic est discipulus",parenthetic:"Solesmes",id:914},Vatican:{incipit:"Hic est discipulus",parenthetic:"Vatican",id:1663}},"hic est sacerdos":{incipit:"Hic est sacerdos",parenthetic:"Solesmes",id:1118},"in conspectu... adorabo":{incipit:"In conspectu... adorabo",parenthetic:"Solesmes",id:814},"in conspectu... domine deus":{incipit:"In conspectu... Domine Deus",parenthetic:"Solesmes",id:550},"in deo salutare":{incipit:"In Deo salutare",parenthetic:"Solesmes",id:663},"in deo speravit":{incipit:"In Deo speravit",parenthetic:"Solesmes",id:1285},"in die resurrectionis":{Solesmes:{incipit:"In die resurrectionis",parenthetic:"Solesmes",id:1042},Vatican:{incipit:"In die resurrectionis",parenthetic:"Vatican",id:1702}},inebriabuntur:{incipit:"Inebriabuntur",parenthetic:"Solesmes",id:221},"in exitu israel":{incipit:"In exitu Israel",parenthetic:"Solesmes",id:1380},"initio cognovi":{incipit:"Initio cognovi",parenthetic:"Solesmes",id:434},"initium sapientiae":{incipit:"Initium sapientiae",parenthetic:"Solesmes",id:330},"in multitudine":{incipit:"In multitudine",parenthetic:"Solesmes",id:1015},"in te domine":{Solesmes:{incipit:"In te Domine",parenthetic:"Solesmes",id:239},Vatican:{incipit:"In te Domine",parenthetic:"Vatican",id:1460}},"inveni david":{incipit:"Inveni David",parenthetic:"Solesmes",id:1350},"ipse est directus":{incipit:"Ipse est directus",parenthetic:"Solesmes",id:1094},"jacta cogitatum":{incipit:"Jacta cogitatum",parenthetic:"Solesmes",id:829},"jesus autem":{incipit:"Jesus autem",parenthetic:"Solesmes",id:1096},"jubilate deo":{Solesmes:{incipit:"Jubilate Deo",parenthetic:"Solesmes",id:802},Vatican:{incipit:"Jubilate Deo",parenthetic:"Vatican",id:1623}},"jubilate deo... introite":{incipit:"Jubilate Deo... introite",parenthetic:"Solesmes",id:253},"juravi et statui":{incipit:"Juravi et statui",parenthetic:"Solesmes",id:4},"juravit dominus":{incipit:"Juravit Dominus",parenthetic:"Solesmes",id:1187},"justi confitebuntur":{incipit:"Justi confitebuntur",parenthetic:"Solesmes",id:893},"justi... delectentur":{incipit:"Justi... delectentur",parenthetic:"Solesmes",id:896},"justi... parasti":{incipit:"Justi... Parasti",parenthetic:"Solesmes",id:29},"justorum animae":{incipit:"Justorum animae",parenthetic:"Solesmes",id:836},"justus germinabit":{incipit:"Justus germinabit",parenthetic:"Solesmes",id:1207},"justus non conturbabitur":{incipit:"Justus non conturbabitur",parenthetic:"Solesmes",id:1309},"justus ut palma":{incipit:"Justus ut palma",parenthetic:"Solesmes",id:946},laetamini:{incipit:"Laetamini",parenthetic:"Solesmes",id:528},"laetatus sum":{Vatican:{incipit:"Laetatus sum",parenthetic:"Vatican",id:1480},Solesmes:{incipit:"Laetatus sum",parenthetic:"Solesmes",id:292}},"lauda jerusalem":{incipit:"Lauda Jerusalem",parenthetic:"Solesmes",id:641},"laudate deum":{Vatican:{incipit:"Laudate Deum",parenthetic:"Vatican",id:1544},Solesmes:{incipit:"Laudate Deum",parenthetic:"Solesmes",id:538}},"laudate dominum":{incipit:"Laudate Dominum",parenthetic:"Solesmes",id:750},"laudate pueri":{Vatican:{incipit:"Laudate pueri",parenthetic:"Vatican",id:1583},Solesmes:{incipit:"Laudate pueri",parenthetic:"Solesmes",id:661}},"laudem domini":{incipit:"Laudem Domini",parenthetic:"Solesmes",id:1},"leva in circuitu":{incipit:"Leva in circuitu",parenthetic:"Solesmes",id:252},"levita laurentius":{incipit:"Levita Laurentius",parenthetic:"Solesmes",id:1122},"lingua pravorum":{incipit:"Lingua pravorum",parenthetic:"Solesmes",id:65},loquebantur:{Vatican:{incipit:"Loquebantur",parenthetic:"Vatican",id:1415},Solesmes:{incipit:"Loquebantur",parenthetic:"Solesmes",id:101}},loquebar:{incipit:"Loquebar",parenthetic:"Solesmes",id:642},magnificat:{incipit:"Magnificat",parenthetic:"Solesmes",id:881},"magnus dominus":{Vatican:{incipit:"Magnus Dominus",parenthetic:"Vatican",id:1595},Solesmes:{incipit:"Magnus Dominus",parenthetic:"Solesmes",id:709}},"magnus sanctus paulus":{incipit:"Magnus sanctus Paulus",parenthetic:"Solesmes",id:466},"manum suam":{incipit:"Manum suam",parenthetic:"Solesmes",id:792},"minuisti eum":{incipit:"Minuisti eum",parenthetic:"Solesmes",id:791},"mirabilis dominus":{incipit:"Mirabilis Dominus",parenthetic:"Solesmes",id:755},"missus est angelus":{incipit:"Missus est Angelus",parenthetic:"Solesmes",id:740},"mittat vobis":{incipit:"Mittat vobis",parenthetic:"Solesmes",id:191},"multifarie olim":{Solesmes:{incipit:"Multifarie olim",parenthetic:"Solesmes",id:863},Vatican:{incipit:"Multifarie olim",parenthetic:"Vatican",id:1645}},"nimis honorati":{incipit:"Nimis honorati",parenthetic:"Solesmes",id:130},"non derelinquet":{incipit:"Non derelinquet",parenthetic:"Solesmes",id:1379},"non dilexerunt":{incipit:"Non dilexerunt",parenthetic:"Solesmes",id:1360},"non vos relinquam":{Solesmes:{incipit:"Non vos relinquam",parenthetic:"Solesmes",id:107},Vatican:{incipit:"Non vos relinquam",parenthetic:"Vatican",id:1417}},"nunc cum eo":{incipit:"Nunc cum eo",parenthetic:"Solesmes",id:354},"nunc ergo":{incipit:"Nunc ergo",parenthetic:"Solesmes",id:489},"oculus dei":{incipit:"Oculus Dei",parenthetic:"Solesmes",id:473},"o joachim":{incipit:"O Joachim",parenthetic:"Solesmes",id:821},"omnes gentes":{Solesmes:{incipit:"Omnes gentes",parenthetic:"Solesmes",id:77},Vatican:{incipit:"Omnes gentes",parenthetic:"Vatican",id:1405}},"omnibus omnia":{incipit:"Omnibus omnia",parenthetic:"Solesmes",id:170},"oportebat pati christum":{Vatican:{incipit:"Oportebat pati Christum",parenthetic:"Vatican",id:1524},Solesmes:{incipit:"Oportebat pati Christum",parenthetic:"Solesmes",id:446}},"o quam bonus":{Vatican:{incipit:"O quam bonus",parenthetic:"Vatican",id:1422},Solesmes:{incipit:"O quam bonus",parenthetic:"Solesmes",id:119}},"o quam pulchra":{incipit:"O quam pulchra",parenthetic:"Solesmes",id:179},"o quam pulchra... immortalis":{incipit:"O quam pulchra... immortalis",parenthetic:"Solesmes",id:1012},"ostende mihi":{incipit:"Ostende mihi",parenthetic:"Solesmes",id:1258},"ostende nobis":{Vatican:{incipit:"Ostende nobis",parenthetic:"Vatican",id:1725},Solesmes:{incipit:"Ostende nobis",parenthetic:"Solesmes",id:1115}},"o vos omnes":{incipit:"O vos omnes",parenthetic:"Solesmes",id:1326},"paras mihi mensam":{incipit:"Paras mihi mensam",parenthetic:"Solesmes",id:467},"paratum cor meum":{incipit:"Paratum cor meum",parenthetic:"Solesmes",id:745},"pascha nostrum":{Vatican:{incipit:"Pascha nostrum",parenthetic:"Vatican",id:1612},Solesmes:{incipit:"Pascha nostrum",parenthetic:"Solesmes",id:761}},pauper:{incipit:"Pauper",parenthetic:"Solesmes",id:225},"per te dei genitrix":{incipit:"Per te Dei Genitrix",parenthetic:"Solesmes",id:634},"post dies octo":{Solesmes:{incipit:"Post dies octo",parenthetic:"Solesmes",id:275},Vatican:{incipit:"Post dies octo",parenthetic:"Vatican",id:1471}},"post partum":{incipit:"Post partum",parenthetic:"Solesmes",id:127},"posuisti domine":{incipit:"Posuisti Domine",parenthetic:"Solesmes",id:1249},"posui vos":{incipit:"Posui vos",parenthetic:"Solesmes",id:495},"potens in terra":{incipit:"Potens in terra",parenthetic:"Solesmes",id:503},"potestas ejus":{incipit:"Potestas ejus",parenthetic:"Solesmes",id:746},pretiosa:{incipit:"Pretiosa",parenthetic:"Solesmes",id:207},"pro omnibus":{incipit:"Pro omnibus",parenthetic:"Solesmes",id:476},"prope timentes":{incipit:"Prope timentes",parenthetic:"Solesmes",id:934},"propitius esto":{incipit:"Propitius esto",parenthetic:"Solesmes",id:189},"propter veritatem":{incipit:"Propter veritatem",parenthetic:"Solesmes",id:913},"quae est ista":{incipit:"Quae est ista",parenthetic:"Solesmes",id:527},"quam magna":{incipit:"Quam magna",parenthetic:"Solesmes",id:70},"quam pulchri":{incipit:"Quam pulchri",parenthetic:"Solesmes",id:1378},"quasi arcus":{incipit:"Quasi arcus",parenthetic:"Solesmes",id:815},"quasi palma":{incipit:"Quasi palma",parenthetic:"Solesmes",id:945},"quasi rosa":{incipit:"Quasi rosa",parenthetic:"Solesmes",id:1257},"qui ad justitiam":{incipit:"Qui ad justitiam",parenthetic:"Solesmes",id:231},"quia factus es":{incipit:"Quia factus es",parenthetic:"Solesmes",id:304},"quid bonum":{incipit:"Quid bonum",parenthetic:"Solesmes",id:10},"qui docti fuerint":{incipit:"Qui docti fuerint",parenthetic:"Solesmes",id:1189},"qui facit angelos":{incipit:"Qui facit Angelos",parenthetic:"Solesmes",id:1202},"qui me invenerit":{incipit:"Qui me invenerit",parenthetic:"Solesmes",id:40},"quinque prudentes":{incipit:"Quinque prudentes",parenthetic:"Solesmes",id:301},"qui posuit fines":{incipit:"Qui posuit fines",parenthetic:"Solesmes",id:700},"qui sequitur me":{incipit:"Qui sequitur me",parenthetic:"Solesmes",id:1201},"quis sicut dominus":{incipit:"Quis sicut Dominus",parenthetic:"Solesmes",id:430},"qui timent dominum":{incipit:"Qui timent Dominum",parenthetic:"Solesmes",id:933},"qui timent te":{incipit:"Qui timent te",parenthetic:"Solesmes",id:992},"quoniam deus":{incipit:"Quoniam Deus",parenthetic:"Solesmes",id:1352},redemptionem:{Solesmes:{incipit:"Redemptionem",parenthetic:"Solesmes",id:1341},Vatican:{incipit:"Redemptionem",parenthetic:"Vatican",id:1810}},"regnavit dominus":{Solesmes:{incipit:"Regnavit Dominus",parenthetic:"Solesmes",id:405},Vatican:{incipit:"Regnavit Dominus",parenthetic:"Vatican",id:1513}},"repleti fructu":{incipit:"Repleti fructu",parenthetic:"Solesmes",id:96},"repletus sum":{incipit:"Repletus sum",parenthetic:"Solesmes",id:1142},"sacerdos sit sanctus":{incipit:"Sacerdos sit sanctus",parenthetic:"Solesmes",id:679},"sacerdotes tui":{incipit:"Sacerdotes tui",parenthetic:"Solesmes",id:930},"salvabo populum":{incipit:"Salvabo populum",parenthetic:"Solesmes",id:158},"salve mater":{incipit:"Salve Mater",parenthetic:"Solesmes",id:82},"salve regina":{incipit:"Salve Regina",parenthetic:"Solesmes",id:717},"salvum me fac":{incipit:"Salvum me fac",parenthetic:"Solesmes",id:134},"sancte michael":{incipit:"Sancte Michael",parenthetic:"Solesmes",id:1103},"sancte paule":{incipit:"Sancte Paule",parenthetic:"Solesmes",id:120},"sancti tui... benedicent":{incipit:"Sancti tui... benedicent",parenthetic:"Solesmes",id:106},"sancti tui... florebunt":{incipit:"Sancti tui... florebunt",parenthetic:"Solesmes",id:800},"sapientia hujus":{incipit:"Sapientia hujus",parenthetic:"Solesmes",id:334},sapientiam:{incipit:"Sapientiam",parenthetic:"Solesmes",id:706},"scitote quoniam":{incipit:"Scitote quoniam",parenthetic:"Solesmes",id:1164},"senex puerum":{incipit:"Senex puerum",parenthetic:"Solesmes",id:429},"sicut abundant":{incipit:"Sicut abundant",parenthetic:"Solesmes",id:525},"sicut cinnamomum":{incipit:"Sicut cinnamomum",parenthetic:"Solesmes",id:701},"sicut oliva":{incipit:"Sicut oliva",parenthetic:"Solesmes",id:892},"si filii":{incipit:"Si filii",parenthetic:"Solesmes",id:1073},"si quis manducaverit":{incipit:"Si quis manducaverit",parenthetic:"Solesmes",id:1223},"si testimonium":{incipit:"Si testimonium",parenthetic:"Solesmes",id:1038},solemnitas:{incipit:"Solemnitas",parenthetic:"Solesmes",id:420},"solve, jubente deo":{incipit:"Solve, jubente Deo",parenthetic:"Solesmes",id:16},"specie tua":{incipit:"Specie tua",parenthetic:"Solesmes",id:406},"sperent in te":{incipit:"Sperent in te",parenthetic:"Solesmes",id:841},"spiritus domini":{incipit:"Spiritus Domini",parenthetic:"Solesmes",id:611},"spiritus ejus":{Vatican:{incipit:"Spiritus ejus",parenthetic:"Vatican",id:1734},Solesmes:{incipit:"Spiritus ejus",parenthetic:"Solesmes",id:1138}},"spiritus est":{Vatican:{incipit:"Spiritus est",parenthetic:"Vatican",id:1773},Solesmes:{incipit:"Spiritus est",parenthetic:"Solesmes",id:1236}},"spiritus sanctus":{Vatican:{incipit:"Spiritus Sanctus",parenthetic:"Vatican",id:1755},Solesmes:{incipit:"Spiritus Sanctus",parenthetic:"Solesmes",id:1197}},"stabat sancta maria":{incipit:"Stabat sancta Maria",parenthetic:"Solesmes",id:853},"surrexit christus et illuxit":{Vatican:{incipit:"Surrexit Christus et illuxit",parenthetic:"Vatican",id:1573},Solesmes:{incipit:"Surrexit Christus et illuxit",parenthetic:"Solesmes",id:633}},"surrexit christus qui":{Solesmes:{incipit:"Surrexit Christus qui",parenthetic:"Solesmes",id:215},Vatican:{incipit:"Surrexit Christus qui",parenthetic:"Vatican",id:1449}},"surrexit dominus de sepulcro":{Solesmes:{incipit:"Surrexit Dominus de sepulcro",parenthetic:"Solesmes",id:438},Vatican:{incipit:"Surrexit Dominus de sepulcro",parenthetic:"Vatican",id:1522}},"surrexit dominus vere":{Solesmes:{incipit:"Surrexit Dominus vere",parenthetic:"Solesmes",id:1217},Vatican:{incipit:"Surrexit Dominus vere",parenthetic:"Vatican",id:1762}},"surrexit quasi ignis":{incipit:"Surrexit quasi ignis",parenthetic:"Solesmes",id:1276},suscitans:{incipit:"Suscitans",parenthetic:"Solesmes",id:1104},"tamquam filiis":{incipit:"Tamquam filiis",parenthetic:"Solesmes",id:382},"tamquam prodigium":{incipit:"Tamquam prodigium",parenthetic:"Solesmes",id:664},"tanto tempore":{incipit:"Tanto tempore",parenthetic:"Solesmes",id:1101},"te decet hymnus":{Solesmes:{incipit:"Te decet hymnus",parenthetic:"Solesmes",id:1052},Vatican:{incipit:"Te decet hymnus",parenthetic:"Vatican",id:1706}},"te gloriosus":{incipit:"Te gloriosus",parenthetic:"Solesmes",id:442},"te martyrum":{incipit:"Te Martyrum",parenthetic:"Solesmes",id:590},"tibi gloria":{incipit:"Tibi gloria",parenthetic:"Solesmes",id:1376},"timebunt gentes":{incipit:"Timebunt gentes",parenthetic:"Solesmes",id:1097},"tollite jugum":{incipit:"Tollite jugum",parenthetic:"Solesmes",id:907},"tota pulchra es":{incipit:"Tota pulchra es",parenthetic:"Solesmes",id:1057},"tu es petrus":{incipit:"Tu es Petrus",parenthetic:"Solesmes",id:228},"tu es sacerdos":{incipit:"Tu es Sacerdos",parenthetic:"Solesmes",id:477},"tu gloria jerusalem":{incipit:"Tu gloria Jerusalem",parenthetic:"Solesmes",id:1023},"tu puer":{incipit:"Tu puer",parenthetic:"Solesmes",id:847},venerunt:{incipit:"Venerunt",parenthetic:"Solesmes",id:1020},"veni domine":{Solesmes:{incipit:"Veni Domine",parenthetic:"Solesmes",id:224},Vatican:{incipit:"Veni Domine",parenthetic:"Vatican",id:1454}},"veni sancte spiritus":{Vatican:{incipit:"Veni Sancte Spiritus",parenthetic:"Vatican",id:1442},Solesmes:{incipit:"Veni Sancte Spiritus",parenthetic:"Solesmes",id:181}},"venite ad me":{incipit:"Venite ad me",parenthetic:"Solesmes",id:1237},"venite, comedite":{incipit:"Venite, comedite",parenthetic:"Solesmes",id:882},"venite exsultemus":{incipit:"Venite exsultemus",parenthetic:"Solesmes",id:1246},"verba mea":{Solesmes:{incipit:"Verba mea",parenthetic:"Solesmes",id:103},Vatican:{incipit:"Verba mea",parenthetic:"Vatican",id:1416}},"verbo domini":{Vatican:{incipit:"Verbo Domini",parenthetic:"Vatican",id:1574},Solesmes:{incipit:"Verbo Domini",parenthetic:"Solesmes",id:635}},"vere tu es":{incipit:"Vere tu es",parenthetic:"Solesmes",id:816},verumtamen:{incipit:"Verumtamen",parenthetic:"Solesmes",id:289},"vicerunt draconem":{incipit:"Vicerunt draconem",parenthetic:"Solesmes",id:911},videbitis:{incipit:"Videbitis",parenthetic:"Solesmes",id:314},"video caelos":{incipit:"Video caelos",parenthetic:"Solesmes",id:561},"video coelos":{incipit:"Video coelos",parenthetic:"Vatican",id:1552},"vidimus stellam":{Vatican:{incipit:"Vidimus stellam",parenthetic:"Vatican",id:2085},Solesmes:{incipit:"Vidimus stellam",parenthetic:"Solesmes",id:524}},"virga jesse":{incipit:"Virga Jesse",parenthetic:"Solesmes",id:281},"virgo dei genitrix":{incipit:"Virgo Dei Genitrix",parenthetic:"Solesmes",id:1114},"vita nostra":{incipit:"Vita nostra",parenthetic:"Solesmes",id:122},"vivo jam non ego":{incipit:"Vivo jam non ego",parenthetic:"Solesmes",id:488},"vos estis":{incipit:"Vos estis",parenthetic:"Solesmes",id:440},"vota mea":{incipit:"Vota mea",parenthetic:"Solesmes",id:563},"vox turturis":{incipit:"Vox turturis",parenthetic:"Solesmes",id:1266}},
communio:{"optimam partem":{id:3316},"ego sum vitis":{id:3314},"ab occultis meis":{Vatican:{incipit:"Ab occultis meis",parenthetic:"Vatican",id:1800},Solesmes:{incipit:"Ab occultis meis",parenthetic:"Solesmes",id:1316}},acceptabis:{Solesmes:{incipit:"Acceptabis",parenthetic:"Solesmes",id:1221},Vatican:{incipit:"Acceptabis",parenthetic:"Vatican",id:1766}},"adversum me":{Vatican:{incipit:"Adversum me",parenthetic:"Vatican",id:1510},Solesmes:{incipit:"Adversum me",parenthetic:"Solesmes",id:397}},"amen dico vobis quidquid":{incipit:"Amen dico vobis quidquid",parenthetic:"Solesmes",id:592},"amen dico vobis quod uni":{Solesmes:{incipit:"Amen dico vobis quod uni",parenthetic:"Solesmes",id:623},Vatican:{incipit:"Amen dico vobis quod uni",parenthetic:"Vatican",id:1570}},"amen dico vobis quod vos":{incipit:"Amen dico vobis quod vos",parenthetic:"Solesmes",id:1337},"angeli archangeli":{incipit:"Angeli Archangeli",parenthetic:"Solesmes",id:599},ascendam:{incipit:"Ascendam",parenthetic:"Solesmes",id:796},"aufer a me":{incipit:"Aufer a me",parenthetic:"Solesmes",id:828},"beatam me dicent":{incipit:"Beatam me dicent",parenthetic:"Solesmes",id:286},"beata viscera":{incipit:"Beata viscera",parenthetic:"Solesmes",id:160},"beati mundo corde":{incipit:"Beati mundo corde",parenthetic:"Solesmes",id:345},"beati pauperes":{incipit:"Beati pauperes",parenthetic:"Solesmes",id:521},"beati servi":{incipit:"Beati servi",parenthetic:"Solesmes",id:1130},"beatus qui audit":{incipit:"Beatus qui audit",parenthetic:"Solesmes",id:909},"beatus servus":{incipit:"Beatus servus",parenthetic:"Solesmes",id:1154},"benedicimus deum":{Vatican:{incipit:"Benedicimus Deum",parenthetic:"Vatican",id:1508},Solesmes:{incipit:"Benedicimus Deum",parenthetic:"Solesmes",id:391}},"benedicite omnes angeli":{incipit:"Benedicite omnes Angeli",parenthetic:"Solesmes",id:1127},benedicta:{incipit:"Benedicta",parenthetic:"Solesmes",id:188},"brachia peccatorum":{incipit:"Brachia peccatorum",parenthetic:"Solesmes",id:601},"cantabo domino":{Solesmes:{incipit:"Cantabo Domino",parenthetic:"Solesmes",id:794},Vatican:{incipit:"Cantabo Domino",parenthetic:"Vatican",id:1619}},"cantate domino":{Vatican:{incipit:"Cantate Domino",parenthetic:"Vatican",id:1559},Solesmes:{incipit:"Cantate Domino",parenthetic:"Solesmes",id:579}},"caro mea":{incipit:"Caro mea",parenthetic:"Solesmes",id:90},"christo confixus":{incipit:"Christo confixus",parenthetic:"Solesmes",id:598},"christus resurgens":{Solesmes:{incipit:"Christus resurgens",parenthetic:"Solesmes",id:593},Vatican:{incipit:"Christus resurgens",parenthetic:"Vatican",id:1566}},"christus semel":{incipit:"Christus semel",parenthetic:"Solesmes",id:1019},"cibavit illum":{incipit:"Cibavit illum",parenthetic:"Solesmes",id:576},circuibo:{Solesmes:{incipit:"Circuibo",parenthetic:"Solesmes",id:1079},Vatican:{incipit:"Circuibo",parenthetic:"Vatican",id:1714}},"circumduxit eam":{incipit:"Circumduxit eam",parenthetic:"Solesmes",id:162},"comedite pinguia":{incipit:"Comedite pinguia",parenthetic:"Solesmes",id:496},communicantes:{incipit:"Communicantes",parenthetic:"Solesmes",id:732},confiteantur:{incipit:"Confiteantur",parenthetic:"Solesmes",id:973},"confiteantur... quia":{incipit:"Confiteantur... quia",parenthetic:"Solesmes",id:887},confundantur:{incipit:"Confundantur",parenthetic:"Solesmes",id:1032},"contra spem":{incipit:"Contra spem",parenthetic:"Solesmes",id:186},"cor meum":{incipit:"Cor meum",parenthetic:"Solesmes",id:1367},"cum invocarem te":{Solesmes:{incipit:"Cum invocarem te",parenthetic:"Solesmes",id:384},Vatican:{incipit:"Cum invocarem te",parenthetic:"Vatican",id:1506}},"data est mihi":{Solesmes:{incipit:"Data est mihi",parenthetic:"Solesmes",id:1260},Vatican:{incipit:"Data est mihi",parenthetic:"Vatican",id:1782}},"date et dabitur":{incipit:"Date et dabitur",parenthetic:"Solesmes",id:1003},decantaverunt:{incipit:"Decantaverunt",parenthetic:"Solesmes",id:877},"de fructu":{Vatican:{incipit:"De fructu",parenthetic:"Vatican",id:1777},Solesmes:{incipit:"De fructu",parenthetic:"Solesmes",id:1245}},"descendit jesus":{incipit:"Descendit Jesus",parenthetic:"Solesmes",id:626},"dicit andreas":{incipit:"Dicit Andreas",parenthetic:"Solesmes",id:1021},"dicit dominus":{Vatican:{incipit:"Dicit Dominus",parenthetic:"Vatican",id:1457},Solesmes:{incipit:"Dicit Dominus",parenthetic:"Solesmes",id:230}},"dicite pusillanimes":{Vatican:{incipit:"Dicite : Pusillanimes",parenthetic:"Vatican",id:1451},Solesmes:{incipit:"Dicite : Pusillanimes",parenthetic:"Solesmes",id:218}},"dico autem vobis":{incipit:"Dico autem vobis",parenthetic:"Solesmes",id:699},"dico vobis":{Solesmes:{incipit:"Dico vobis",parenthetic:"Solesmes",id:1058},Vatican:{incipit:"Dico vobis",parenthetic:"Vatican",id:1709}},diffusa:{incipit:"Diffusa",parenthetic:"Solesmes",id:900},dilexisti:{incipit:"Dilexisti",parenthetic:"Solesmes",id:799},"dixit jesus":{incipit:"Dixit Jesus",parenthetic:"Solesmes",id:982},"domine deus meus":{Vatican:{incipit:"Domine Deus meus",parenthetic:"Vatican",id:1424},Solesmes:{incipit:"Domine Deus meus",parenthetic:"Solesmes",id:131}},"domine dominus noster":{Vatican:{incipit:"Domine Dominus noster",parenthetic:"Vatican",id:1691},Solesmes:{incipit:"Domine Dominus noster",parenthetic:"Solesmes",id:998}},"domine memorabor":{incipit:"Domine memorabor",parenthetic:"Solesmes",id:1318},"domine quinque talenta":{incipit:"Domine quinque talenta",parenthetic:"Solesmes",id:383},"domine quis habitabit":{Solesmes:{incipit:"Domine quis habitabit",parenthetic:"Solesmes",id:1340},Vatican:{incipit:"Domine quis habitabit",parenthetic:"Vatican",id:1809}},"dominus dabit":{Solesmes:{incipit:"Dominus dabit",parenthetic:"Solesmes",id:1036},Vatican:{incipit:"Dominus dabit",parenthetic:"Vatican",id:1470}},"dominus firmamentum":{Solesmes:{incipit:"Dominus firmamentum",parenthetic:"Solesmes",id:512},Vatican:{incipit:"Dominus firmamentum",parenthetic:"Vatican",id:1536}},"dominus jesus":{Solesmes:{incipit:"Dominus Jesus",parenthetic:"Solesmes",id:140},Vatican:{incipit:"Dominus Jesus",parenthetic:"Vatican",id:1428}},"dominus regit me":{Vatican:{incipit:"Dominus regit me",parenthetic:"Vatican",id:1474},Solesmes:{incipit:"Dominus regit me",parenthetic:"Solesmes",id:278}},"dominus virtutum":{Solesmes:{incipit:"Dominus virtutum",parenthetic:"Solesmes",id:81},Vatican:{incipit:"Dominus virtutum",parenthetic:"Vatican",id:1408}},"domus mea":{incipit:"Domus mea",parenthetic:"Solesmes",id:43},"dum venerit paraclitus":{Vatican:{incipit:"Dum venerit Paraclitus",parenthetic:"Vatican",id:1392},Solesmes:{incipit:"Dum venerit Paraclitus",parenthetic:"Solesmes",id:39}},"ecce dominus veniet":{Solesmes:{incipit:"Ecce Dominus veniet",parenthetic:"Solesmes",id:439},Vatican:{incipit:"Ecce Dominus veniet",parenthetic:"Vatican",id:1523}},"ecce ego":{incipit:"Ecce ego",parenthetic:"Solesmes",id:730},"ecce sic benedicetur":{incipit:"Ecce sic benedicetur",parenthetic:"Solesmes",id:490},"ecce sto":{incipit:"Ecce sto",parenthetic:"Solesmes",id:164},"ecce virgo":{Solesmes:{incipit:"Ecce virgo",parenthetic:"Solesmes",id:1144},Vatican:{incipit:"Ecce virgo",parenthetic:"Vatican",id:1736}},"ego clamavi":{incipit:"Ego clamavi",parenthetic:"Solesmes",id:464},"ego dilecto":{incipit:"Ego dilecto",parenthetic:"Solesmes",id:459},"ego dilecto. inveni":{incipit:"Ego dilecto. Inveni",parenthetic:"Solesmes",id:1161},"ego pascam":{incipit:"Ego pascam",parenthetic:"Solesmes",id:491},"ego sum pastor":{incipit:"Ego sum pastor",parenthetic:"Vatican",id:1549},"ego sum pastor... alleluia":{incipit:"Ego sum pastor... alleluia",parenthetic:"Vatican",id:1412},"ego sum pastor cum alleluia":{incipit:"Ego sum pastor cum Alleluia",parenthetic:"Solesmes",id:95},"ego sum pastor (sine alleluia)":{incipit:"Ego sum pastor (sine Alleluia)",parenthetic:"Solesmes",id:556},"ego sum pauper":{incipit:"Ego sum pauper",parenthetic:"Solesmes",id:976},"ego vos elegi":{incipit:"Ego vos elegi",parenthetic:"Solesmes",id:470},"erubescant et conturbentur":{Solesmes:{incipit:"Erubescant et conturbentur",parenthetic:"Solesmes",id:484},Vatican:{incipit:"Erubescant et conturbentur",parenthetic:"Vatican",id:1530}},"erubescant et revereantur":{Vatican:{incipit:"Erubescant et revereantur",parenthetic:"Vatican",id:1444},Solesmes:{incipit:"Erubescant et revereantur",parenthetic:"Solesmes",id:196}},"et erat ibi":{incipit:"Et erat ibi",parenthetic:"Solesmes",id:1371},"et si coram":{incipit:"Et si coram",parenthetic:"Solesmes",id:658},"exiit sermo":{Solesmes:{incipit:"Exiit sermo",parenthetic:"Solesmes",id:781},Vatican:{incipit:"Exiit sermo",parenthetic:"Vatican",id:1616}},"exsulta filia":{Vatican:{incipit:"Exsulta filia",parenthetic:"Vatican",id:1729},Solesmes:{incipit:"Exsulta filia",parenthetic:"Solesmes",id:1125}},"exsultavit ut gigas":{Solesmes:{incipit:"Exsultavit ut gigas",parenthetic:"Solesmes",id:88},Vatican:{incipit:"Exsultavit ut gigas",parenthetic:"Vatican",id:1410}},"factus est repente":{incipit:"Factus est cum Alleluia",parenthetic:"Solesmes",id:1041},"factus est repente... alleluia":{incipit:"Factus est repente... alleluia",parenthetic:"Vatican",id:2028},"factus est sine alleluia":{incipit:"Factus est sine Alleluia",parenthetic:"Solesmes",id:972},"feci judicium":{incipit:"Feci judicium",parenthetic:"Solesmes",id:844},"felices sensus":{incipit:"Felices sensus",parenthetic:"Solesmes",id:1180},"fidelis servus":{incipit:"Fidelis servus",parenthetic:"Solesmes",id:1008},"fili quid fecisti":{Solesmes:{incipit:"Fili quid fecisti",parenthetic:"Solesmes",id:705},Vatican:{incipit:"Fili quid fecisti",parenthetic:"Vatican",id:1593}},"florete... et collaudate":{incipit:"Florete... et collaudate",parenthetic:"Solesmes",id:995},"florete... et date":{incipit:"Florete... et date",parenthetic:"Solesmes",id:104},foderunt:{incipit:"Foderunt",parenthetic:"Solesmes",id:84},frumentum:{incipit:"Frumentum",parenthetic:"Solesmes",id:368},"gaudete cum alleluia":{incipit:"Gaudete cum alleluia",parenthetic:"Solesmes",id:772},"gaudete sine alleluia":{incipit:"Gaudete sine Alleluia",parenthetic:"Solesmes",id:1109},gloriosa:{incipit:"Gloriosa",parenthetic:"Solesmes",id:1004},gustate:{Solesmes:{incipit:"Gustate",parenthetic:"Solesmes",id:1203},Vatican:{incipit:"Gustate",parenthetic:"Vatican",id:1756}},"hoc corpus":{Vatican:{incipit:"Hoc corpus",parenthetic:"Vatican",id:1600},Solesmes:{incipit:"Hoc corpus",parenthetic:"Solesmes",id:726}},"homo peregre":{incipit:"Homo peregre",parenthetic:"Solesmes",id:1132},"honora dominum":{Vatican:{incipit:"Honora Dominum",parenthetic:"Vatican",id:1737},Solesmes:{incipit:"Honora Dominum",parenthetic:"Solesmes",id:1145}},"ignem veni":{incipit:"Ignem veni",parenthetic:"Solesmes",id:514},"illumina faciem":{Vatican:{incipit:"Illumina faciem",parenthetic:"Vatican",id:1576},Solesmes:{incipit:"Illumina faciem",parenthetic:"Solesmes",id:640}},imitatores:{incipit:"Imitatores",parenthetic:"Solesmes",id:201},"inclina aurem tuam":{Vatican:{incipit:"Inclina aurem tuam",parenthetic:"Vatican",id:1494},Solesmes:{incipit:"Inclina aurem tuam",parenthetic:"Solesmes",id:339}},"infirmus fui":{incipit:"Infirmus fui",parenthetic:"Solesmes",id:1126},"innova signa":{incipit:"Innova signa",parenthetic:"Solesmes",id:1087},"in omnem terram":{incipit:"In omnem terram",parenthetic:"Solesmes",id:212},"in salutari":{incipit:"In salutari",parenthetic:"Solesmes",id:1290},"in splendoribus":{Vatican:{incipit:"In splendoribus",parenthetic:"Vatican",id:1420},Solesmes:{incipit:"In splendoribus",parenthetic:"Solesmes",id:117}},"intellige clamorem":{Solesmes:{incipit:"Intellige clamorem",parenthetic:"Solesmes",id:373},Vatican:{incipit:"Intellige clamorem",parenthetic:"Vatican",id:1504}},introibo:{Vatican:{incipit:"Introibo",parenthetic:"Vatican",id:1548},Solesmes:{incipit:"Introibo",parenthetic:"Solesmes",id:554}},"jacob autem":{incipit:"Jacob autem",parenthetic:"Solesmes",id:534},"jerusalem quae":{Vatican:{incipit:"Jerusalem quae",parenthetic:"Vatican",id:1812},Solesmes:{incipit:"Jerusalem quae",parenthetic:"Solesmes",id:1353}},"jerusalem surge":{Solesmes:{incipit:"Jerusalem surge",parenthetic:"Solesmes",id:966},Vatican:{incipit:"Jerusalem surge",parenthetic:"Vatican",id:1681}},"joseph autem":{incipit:"Joseph autem",parenthetic:"Solesmes",id:111},"joseph fili david":{incipit:"Joseph fili David",parenthetic:"Solesmes",id:139},"justorum animae":{incipit:"Justorum animae",parenthetic:"Solesmes",id:209},"justus dominus":{Solesmes:{incipit:"Justus Dominus",parenthetic:"Solesmes",id:268},Vatican:{incipit:"Justus Dominus",parenthetic:"Vatican",id:1469}},laetabimur:{Solesmes:{incipit:"Laetabimur",parenthetic:"Solesmes",id:1296},Vatican:{incipit:"Laetabimur",parenthetic:"Vatican",id:1792}},"laetabitur justus":{incipit:"Laetabitur justus",parenthetic:"Solesmes",id:617},laetare:{incipit:"Laetare",parenthetic:"Solesmes",id:854},"laudate dominum":{incipit:"Laudate Dominum",parenthetic:"Solesmes",id:322},lavabo:{Vatican:{incipit:"Lavabo",parenthetic:"Vatican",id:1429},Solesmes:{incipit:"Lavabo",parenthetic:"Solesmes",id:141}},"lutum fecit":{Vatican:{incipit:"Lutum fecit",parenthetic:"Vatican",id:1688},Solesmes:{incipit:"Lutum fecit",parenthetic:"Solesmes",id:989}},"lux aeterna":{incipit:"Lux aeterna",parenthetic:"Solesmes",id:241},"magna est":{incipit:"Magna est",parenthetic:"Solesmes",id:365},magnificabitur:{incipit:"Magnificabitur",parenthetic:"Solesmes",id:126},manducaverunt:{Vatican:{incipit:"Manducaverunt",parenthetic:"Vatican",id:1587},Solesmes:{incipit:"Manducaverunt",parenthetic:"Solesmes",id:677}},"manete in me":{incipit:"Manete in me",parenthetic:"Solesmes",id:112},"memento verbi tui":{incipit:"Memento verbi tui",parenthetic:"Solesmes",id:696},"mense septimo":{incipit:"Mense septimo",parenthetic:"Solesmes",id:1149},"mirabantur omnes":{Solesmes:{incipit:"Mirabantur omnes",parenthetic:"Solesmes",id:1148},Vatican:{incipit:"Mirabantur omnes",parenthetic:"Vatican",id:1739}},"mitte manum... alleluia":{incipit:"Mitte manum... alleluia",parenthetic:"Vatican",id:1678},"mitte manum tuam":{incipit:"Mitte manum cum Alleluia",parenthetic:"Solesmes",id:953},"mitte manum sine alleluia":{incipit:"Mitte manum sine Alleluia",parenthetic:"Solesmes",id:589},modicum:{Vatican:{incipit:"Modicum",parenthetic:"Vatican",id:1626},Solesmes:{incipit:"Modicum",parenthetic:"Solesmes",id:813}},"multitudo... ad eum":{incipit:"Multitudo... ad eum",parenthetic:"Solesmes",id:902},"multitudo... ad jesum":{incipit:"Multitudo... ad Jesum",parenthetic:"Solesmes",id:833},"multitudo languentium":{incipit:"Multitudo languentium",parenthetic:"Solesmes 1974",id:1267},"narrabo omnia":{Solesmes:{incipit:"Narrabo omnia",parenthetic:"Solesmes",id:639},Vatican:{incipit:"Narrabo omnia",parenthetic:"Vatican",id:1575}},"nemo te condemnavit":{Vatican:{incipit:"Nemo te condemnavit",parenthetic:"Vatican",id:1694},Solesmes:{incipit:"Nemo te condemnavit",parenthetic:"Solesmes",id:1010}},"ne tradideris me":{Solesmes:{incipit:"Ne tradideris me",parenthetic:"Solesmes",id:1158},Vatican:{incipit:"Ne tradideris me",parenthetic:"Vatican",id:1743}},"non fecit":{incipit:"Non fecit",parenthetic:"Solesmes",id:1133},"non vos relinquam":{Solesmes:{incipit:"Non vos relinquam",parenthetic:"Solesmes",id:981},Vatican:{incipit:"Non vos relinquam",parenthetic:"Vatican",id:1686}},"notas mihi fecisti":{Solesmes:{incipit:"Notas mihi fecisti",parenthetic:"Solesmes",id:531},Vatican:{incipit:"Notas mihi fecisti",parenthetic:"Vatican",id:1541}},"omnes gentes":{incipit:"Omnes gentes",parenthetic:"Solesmes",id:8},"omnes qui":{Vatican:{incipit:"Omnes qui",parenthetic:"Vatican",id:1790},Solesmes:{incipit:"Omnes qui",parenthetic:"Solesmes",id:1293}},"oportet te fili":{Solesmes:{incipit:"Oportet te fili",parenthetic:"Solesmes",id:1066},Vatican:{incipit:"Oportet te fili",parenthetic:"Vatican",id:1711}},"oves meae":{incipit:"Oves meae",parenthetic:"Solesmes",id:508},"pacem meam":{Solesmes:{incipit:"Pacem meam",parenthetic:"Solesmes",id:91},Vatican:{incipit:"Pacem meam",parenthetic:"Vatican",id:1411}},"pacem relinquo":{incipit:"Pacem relinquo",parenthetic:"Solesmes",id:942},"panem caeli":{incipit:"Panem caeli",parenthetic:"Solesmes",id:711},"panem de caelo":{Solesmes:{incipit:"Panem de caelo",parenthetic:"Solesmes",id:388},Vatican:{incipit:"Panem de caelo",parenthetic:"Vatican",id:1507}},"panis quem ego":{incipit:"Panis quem ego",parenthetic:"Solesmes",id:782},"pascha nostrum":{Solesmes:{incipit:"Pascha nostrum",parenthetic:"Solesmes",id:952},Vatican:{incipit:"Pascha nostrum",parenthetic:"Vatican",id:1677}},"passer invenit":{Solesmes:{incipit:"Passer invenit",parenthetic:"Solesmes",id:1090},Vatican:{incipit:"Passer invenit",parenthetic:"Vatican",id:1720}},"pater cum essem":{Solesmes:{incipit:"Pater cum essem",parenthetic:"Solesmes",id:1091},Vatican:{incipit:"Pater cum essem",parenthetic:"Vatican",id:1721}},"pater si non potest":{Vatican:{incipit:"Pater si non potest",parenthetic:"Vatican",id:1580},Solesmes:{incipit:"Pater si non potest",parenthetic:"Solesmes",id:650}},"per signum crucis":{incipit:"Per signum crucis",parenthetic:"Solesmes",id:346},"petite... alleluia":{incipit:"Petite... alleluia",parenthetic:"Vatican",id:1500},"petite cum alleluia":{incipit:"Petite cum Alleluia",parenthetic:"Solesmes",id:364},"petite sine alleluia":{incipit:"Petite sine Alleluia",parenthetic:"Solesmes",id:422},"populus acquisitionis":{Solesmes:{incipit:"Populus acquisitionis",parenthetic:"Solesmes",id:1219},Vatican:{incipit:"Populus acquisitionis",parenthetic:"Vatican",id:1764}},posuerunt:{incipit:"Posuerunt",parenthetic:"Solesmes",id:184},"posuisti domine":{incipit:"Posuisti Domine",parenthetic:"Solesmes",id:586},"potum meum":{Solesmes:{incipit:"Potum meum",parenthetic:"Solesmes",id:588},Vatican:{incipit:"Potum meum",parenthetic:"Vatican",id:1564}},"praedicabunt apostoli":{incipit:"Praedicabunt Apostoli",parenthetic:"Solesmes",id:257},"praevenisti eam":{incipit:"Praevenisti eam",parenthetic:"Solesmes",id:66},"primum quaerite":{incipit:"Primum quaerite",parenthetic:"Solesmes",id:868},principes:{incipit:"Principes",parenthetic:"Solesmes",id:1292},"prudentes virgines":{incipit:"Prudentes Virgines",parenthetic:"Solesmes",id:360},"psallite domino":{Solesmes:{incipit:"Psallite Domino",parenthetic:"Solesmes",id:263},Vatican:{incipit:"Psallite Domino",parenthetic:"Vatican",id:1466}},"quae mihi fuerunt":{incipit:"Quae mihi fuerunt",parenthetic:"Solesmes",id:991},"quam magna":{incipit:"Quam magna",parenthetic:"Solesmes",id:6},"quam pulchri":{incipit:"Quam pulchri",parenthetic:"Solesmes",id:193},"qui biberit":{Vatican:{incipit:"Qui biberit",parenthetic:"Vatican",id:1655},Solesmes:{incipit:"Qui biberit",parenthetic:"Solesmes",id:894}},"quicumque fecerit":{incipit:"Quicumque fecerit",parenthetic:"Solesmes",id:957},"qui fecerit":{incipit:"Qui fecerit",parenthetic:"Solesmes",id:15},"qui manducat":{Vatican:{incipit:"Qui manducat",parenthetic:"Vatican",id:1621},Solesmes:{incipit:"Qui manducat",parenthetic:"Solesmes",id:798}},"qui me dignatus est":{incipit:"Qui me dignatus est",parenthetic:"Solesmes",id:454},"qui meditabitur":{Vatican:{incipit:"Qui meditabitur",parenthetic:"Vatican",id:2807},Solesmes:{incipit:"Qui meditabitur",parenthetic:"Solesmes",id:582}},"qui mihi ministrat":{incipit:"Qui mihi ministrat",parenthetic:"Solesmes",id:685},"quinque prudentes":{incipit:"Quinque prudentes",parenthetic:"Solesmes",id:1301},"quis dabit":{Vatican:{incipit:"Quis dabit",parenthetic:"Vatican",id:1672},Solesmes:{incipit:"Quis dabit",parenthetic:"Solesmes",id:931}},"qui vicerit":{incipit:"Qui vicerit",parenthetic:"Solesmes",id:1190},"qui vult venire":{incipit:"Qui vult venire",parenthetic:"Solesmes",id:89},"quod dico vobis":{incipit:"Quod dico vobis",parenthetic:"Solesmes",id:1002},quotiescumque:{Vatican:{incipit:"Quotiescumque",parenthetic:"Vatican",id:1558},Solesmes:{incipit:"Quotiescumque",parenthetic:"Solesmes",id:577}},"redime me":{Vatican:{incipit:"Redime me",parenthetic:"Vatican",id:1521},Solesmes:{incipit:"Redime me",parenthetic:"Solesmes",id:433}},"regina mundi":{incipit:"Regina mundi",parenthetic:"Solesmes",id:1053},"religio munda":{incipit:"Religio munda",parenthetic:"Solesmes",id:1014},"reposita est":{incipit:"Reposita est",parenthetic:"Solesmes",id:400},responsum:{incipit:"Responsum",parenthetic:"Solesmes",id:803},revelabitur:{Solesmes:{incipit:"Revelabitur",parenthetic:"Solesmes",id:367},Vatican:{incipit:"Revelabitur",parenthetic:"Vatican",id:1501}},"sacerdos magnus":{incipit:"Sacerdos magnus",parenthetic:"Solesmes",id:1196},"scapulis suis":{Solesmes:{incipit:"Scapulis suis",parenthetic:"Solesmes",id:1100},Vatican:{incipit:"Scapulis suis",parenthetic:"Vatican",id:1723}},"sedebit dominus":{incipit:"Sedebit Dominus",parenthetic:"Solesmes",id:1229},"semel juravi":{incipit:"Semel juravi",parenthetic:"Solesmes",id:317},"servite domino":{Vatican:{incipit:"Servite Domino",parenthetic:"Vatican",id:1656},Solesmes:{incipit:"Servite Domino",parenthetic:"Solesmes",id:897}},"si ambulavero":{incipit:"Si ambulavero",parenthetic:"Solesmes",id:1211},"si consurrexistis":{Vatican:{incipit:"Si consurrexistis",parenthetic:"Vatican",id:1462},Solesmes:{incipit:"Si consurrexistis",parenthetic:"Solesmes",id:243}},"signa eos":{incipit:"Signa eos",parenthetic:"Solesmes",id:608},"simile est... homini":{incipit:"Simile est... homini",parenthetic:"Solesmes",id:673},"simile est... homini... autem":{incipit:"Simile est... homini... autem",parenthetic:"Solesmes",id:944},"simile est... thesauro":{incipit:"Simile est... thesauro",parenthetic:"Solesmes",id:1070},"simon joannis":{incipit:"Simon Joannis",parenthetic:"Solesmes",id:846},"sinite parvulos":{incipit:"Sinite parvulos",parenthetic:"Solesmes",id:643},"si quis sitit":{incipit:"Si quis sitit",parenthetic:"Solesmes",id:154},"spiritus qui":{Vatican:{incipit:"Spiritus qui",parenthetic:"Vatican",id:1493},Solesmes:{incipit:"Spiritus qui",parenthetic:"Solesmes",id:333}},"spiritus sanctus":{Vatican:{incipit:"Spiritus Sanctus",parenthetic:"Vatican",id:1741},Solesmes:{incipit:"Spiritus Sanctus",parenthetic:"Solesmes",id:1151}},"spiritus ubi":{Vatican:{incipit:"Spiritus ubi",parenthetic:"Vatican",id:1443},Solesmes:{incipit:"Spiritus ubi",parenthetic:"Solesmes",id:190}},"surrexit dominus":{Solesmes:{incipit:"Surrexit Dominus",parenthetic:"Solesmes",id:121},Vatican:{incipit:"Surrexit Dominus",parenthetic:"Vatican",id:1423}},"tanto tempore":{incipit:"Tanto tempore",parenthetic:"Solesmes",id:921},"tolle puerum":{Solesmes:{incipit:"Tolle puerum",parenthetic:"Solesmes",id:1282},Vatican:{incipit:"Tolle puerum",parenthetic:"Vatican",id:1788}},"tollite hostias":{incipit:"Tollite hostias",parenthetic:"Solesmes",id:404},"tu domine servabis":{Solesmes:{incipit:"Tu Domine servabis",parenthetic:"Solesmes",id:1159},Vatican:{incipit:"Tu Domine servabis",parenthetic:"Vatican",id:1744}},"tu es petrus":{incipit:"Tu es Petrus",parenthetic:"Solesmes",id:666},"tu es petrus... alleluia":{incipit:"Tu es Petrus... alleluia",parenthetic:"Solesmes",id:509},"tu mandasti":{incipit:"Tu mandasti",parenthetic:"Solesmes",id:479},"tu puer":{incipit:"Tu puer",parenthetic:"Solesmes",id:133},"ultimo festivitatis":{Solesmes:{incipit:"Ultimo festivitatis",parenthetic:"Solesmes",id:255},Vatican:{incipit:"Ultimo festivitatis",parenthetic:"Vatican",id:1465}},"unam petii":{Vatican:{incipit:"Unam petii",parenthetic:"Vatican",id:1557},Solesmes:{incipit:"Unam petii",parenthetic:"Solesmes",id:574}},"unde huic sapientia haec":{incipit:"Unde huic sapientia haec",parenthetic:"Solesmes",id:28},"unus militum":{incipit:"Unus militum",parenthetic:"Solesmes",id:1356},"unus panis":{incipit:"Unus panis",parenthetic:"Solesmes",id:147},"valde mirabilis":{incipit:"Valde mirabilis",parenthetic:"Solesmes",id:204},"veni, domine":{incipit:"Veni, Domine",parenthetic:"Solesmes 1974",id:757},"venite post me":{incipit:"Venite post me",parenthetic:"Solesmes",id:552},"venit sponsus":{incipit:"Venit Sponsus",parenthetic:"Solesmes",id:1177},"veritas mea":{incipit:"Veritas mea",parenthetic:"Solesmes",id:712},"veste sancta":{incipit:"Veste sancta",parenthetic:"Solesmes",id:145},videbunt:{incipit:"Videbunt",parenthetic:"Solesmes",id:1059},"videns dominus":{Vatican:{incipit:"Videns Dominus",parenthetic:"Vatican",id:1592},Solesmes:{incipit:"Videns Dominus",parenthetic:"Solesmes",id:704}},"video caelos":{incipit:"Video caelos",parenthetic:"Solesmes",id:920},"video coelos":{incipit:"Video coelos",parenthetic:"Vatican",id:1667},"viderunt omnes":{Solesmes:{incipit:"Viderunt omnes",parenthetic:"Solesmes",id:1139},Vatican:{incipit:"Viderunt omnes",parenthetic:"Vatican",id:1735}},videte:{incipit:"Videte",parenthetic:"Solesmes",id:703},"vidimus stellam":{incipit:"Vidimus stellam",parenthetic:null,id:3047,Solesmes:{incipit:"Vidimus stellam",parenthetic:"Solesmes",id:918},Vatican:{incipit:"Vidimus stellam",parenthetic:"Vatican",id:1666}},vigilate:{incipit:"Vigilate",parenthetic:"Solesmes",id:341},visionem:{incipit:"Visionem",parenthetic:"Solesmes",id:885},"visitasti terram":{incipit:"Visitasti terram",parenthetic:"Solesmes",id:80},"volavit ad me":{incipit:"Volavit ad me",parenthetic:"Solesmes",id:891},"vos estis lux":{incipit:"Vos estis lux",parenthetic:"Solesmes",id:559},"vos qui secuti":{incipit:"Vos qui secuti",parenthetic:"Solesmes",id:1028},"vos qui secuti... dicit":{incipit:"Vos qui secuti... dicit",parenthetic:"Solesmes",id:97},vovete:{incipit:"Vovete",parenthetic:"Solesmes",id:1134},"vox in rama":{Solesmes:{incipit:"Vox in Rama",parenthetic:"Solesmes",id:136},Vatican:{incipit:"Vox in Rama",parenthetic:"Vatican",id:1426}}},
graduale:{"benedictus es (hymn)":{id:2166},"vultum tuum":{id:58},"ab occultis meis":{Solesmes:{incipit:"Ab occultis meis",parenthetic:"Solesmes",id:1210},Vatican:{incipit:"Ab occultis meis",parenthetic:"Vatican",id:1759}},accedite:{incipit:"Accedite",parenthetic:"Solesmes",id:688},"ad dominum":{Solesmes:{incipit:"Ad Dominum",parenthetic:"Solesmes",id:697},Vatican:{incipit:"Ad Dominum",parenthetic:"Vatican",id:1590}},"adjutor in opportunitatibus":{Solesmes:{incipit:"Adjutor in opportunitatibus",parenthetic:"Solesmes",id:222},Vatican:{incipit:"Adjutor in opportunitatibus",parenthetic:"Vatican",id:1452}},"adjutor meus":{Solesmes:{incipit:"Adjutor meus",parenthetic:"Solesmes",id:851},Vatican:{incipit:"Adjutor meus",parenthetic:"Vatican",id:1641}},"adjuvabit eam":{incipit:"Adjuvabit eam",parenthetic:"Solesmes",id:1373},"angelis domini":{incipit:"Angelis Domini",parenthetic:"Solesmes",id:581},"angelis suis":{Solesmes:{incipit:"Angelis suis",parenthetic:"Solesmes",id:834},Vatican:{incipit:"Angelis suis",parenthetic:"Vatican",id:2991}},"anima... sicut passer":{incipit:"Anima... sicut passer",parenthetic:"Solesmes",id:432},"anima... sustinet":{incipit:"Anima... sustinet",parenthetic:"Solesmes",id:1287},"annuntiavi justitiam":{incipit:"Annuntiavi justitiam",parenthetic:"Solesmes",id:977},"aquae multae":{incipit:"Aquae multae",parenthetic:"Solesmes",id:790},"a summo caelo":{incipit:"A summo caelo",parenthetic:"Solesmes",id:698},"audi filia... et concupiscet":{incipit:"Audi filia... et concupiscet",parenthetic:"Solesmes",id:1000},"audi filia...quia concupivit":{incipit:"Audi filia...quia concupivit",parenthetic:"Solesmes",id:840},"beata gens":{incipit:"Beata gens",parenthetic:"Solesmes",id:1044},"beatus quicumque":{incipit:"Beatus quicumque",parenthetic:"Solesmes",id:1344},"beatus vir cujus":{incipit:"Beatus vir cujus",parenthetic:"Solesmes",id:1327},"beatus vir qui timet":{incipit:"Beatus vir qui timet",parenthetic:"Solesmes",id:153},"benedicam dominum":{Solesmes:{incipit:"Benedicam Dominum",parenthetic:"Solesmes",id:1182},Vatican:{incipit:"Benedicam Dominum",parenthetic:"Vatican",id:1752}},"benedicite dominum":{incipit:"Benedicite Dominum",parenthetic:"Solesmes",id:609},"benedicta es tu":{incipit:"Benedicta es tu",parenthetic:"Solesmes",id:713},"benedicta et venerabilis":{incipit:"Benedicta et venerabilis",parenthetic:"Solesmes",id:392},"benedictus dominus":{Vatican:{incipit:"Benedictus Dominus",parenthetic:"Vatican",id:1547},Solesmes:{incipit:"Benedictus Dominus",parenthetic:"Solesmes",id:553}},"benedictus es":{Vatican:{incipit:"Benedictus es",parenthetic:"Vatican",id:1680},Solesmes:{incipit:"Benedictus es",parenthetic:"Solesmes",id:965}},"benedictus qui venit":{Vatican:{incipit:"Benedictus qui venit",parenthetic:"Vatican",id:1450},Solesmes:{incipit:"Benedictus qui venit",parenthetic:"Solesmes",id:217}},"bonum est confidere":{incipit:"Bonum est confidere",parenthetic:"Solesmes",id:547},"bonum est confiteri":{incipit:"Bonum est confiteri",parenthetic:"Solesmes",id:1338},"christus factus est":{Solesmes:{incipit:"Christus factus est",parenthetic:"Solesmes",id:873},Vatican:{incipit:"Christus factus est",parenthetic:"Vatican",id:1649}},clamaverunt:{incipit:"Clamaverunt",parenthetic:"Solesmes",id:1009},communicantes:{incipit:"Communicantes",parenthetic:"Solesmes",id:1181},"concupivit rex":{incipit:"Concupivit rex",parenthetic:"Solesmes",id:686},"confiteantur domino":{incipit:"Confiteantur Domino",parenthetic:"Solesmes",id:971},"confiteantur tibi":{incipit:"Confiteantur tibi",parenthetic:"Solesmes",id:632},"confitebuntur caeli":{incipit:"Confitebuntur caeli",parenthetic:"Solesmes",id:156},"confiteor tibi":{incipit:"Confiteor tibi",parenthetic:"Solesmes",id:1034},"constitues eos":{incipit:"Constitues eos",parenthetic:"Solesmes",id:307},consummatus:{incipit:"Consummatus",parenthetic:"Solesmes",id:12},"convertere domine":{Solesmes:{incipit:"Convertere Domine",parenthetic:"Solesmes",id:1046},Vatican:{incipit:"Convertere Domine",parenthetic:"Vatican",id:1704}},"corona aurea":{incipit:"Corona aurea",parenthetic:"Solesmes",id:771},"custodi me":{Solesmes:{incipit:"Custodi me",parenthetic:"Solesmes",id:1088},Vatican:{incipit:"Custodi me",parenthetic:"Vatican",id:1719}},"da nobis, deus":{incipit:"Da nobis, Deus",parenthetic:"Solesmes",id:414},deriventur:{incipit:"Deriventur",parenthetic:"Solesmes",id:75},"desiderium cordis":{incipit:"Desiderium cordis",parenthetic:"Solesmes",id:54},"deus exaudi":{Vatican:{incipit:"Deus exaudi",parenthetic:"Vatican",id:1569},Solesmes:{incipit:"Deus exaudi",parenthetic:"Solesmes",id:621}},"deus qui praecinxit me":{incipit:"Deus qui praecinxit me",parenthetic:"Solesmes",id:306},"deus vitam meam":{Solesmes:{incipit:"Deus vitam meam",parenthetic:"Solesmes",id:118},Vatican:{incipit:"Deus vitam meam",parenthetic:"Vatican",id:1421}},"diffusa est":{incipit:"Diffusa est",parenthetic:"Solesmes",id:947},dilexisti:{incipit:"Dilexisti",parenthetic:"Solesmes",id:394},"diligite dominum":{incipit:"Diligite Dominum",parenthetic:"Solesmes",id:375},"dirigatur oratio mea":{Solesmes:{incipit:"Dirigatur oratio mea",parenthetic:"Solesmes",id:44},Vatican:{incipit:"Dirigatur oratio mea",parenthetic:"Vatican",id:1394}},"discerne causam":{Vatican:{incipit:"Discerne causam",parenthetic:"Vatican",id:1584},Solesmes:{incipit:"Discerne causam",parenthetic:"Solesmes",id:665}},dispersit:{incipit:"Dispersit",parenthetic:"Solesmes",id:1212},dolorosa:{incipit:"Dolorosa",parenthetic:"Solesmes",id:1383},dominabitur:{incipit:"Dominabitur",parenthetic:"Solesmes",id:583},"domine deus virtutum":{Vatican:{incipit:"Domine Deus virtutum",parenthetic:"Vatican",id:1391},Solesmes:{incipit:"Domine Deus virtutum",parenthetic:"Solesmes",id:38}},"domine dominus noster":{Vatican:{incipit:"Domine Dominus noster",parenthetic:"Vatican",id:1757},Solesmes:{incipit:"Domine Dominus noster",parenthetic:"Solesmes",id:1205}},"domine praevenisti":{incipit:"Domine praevenisti",parenthetic:"Solesmes",id:600},"domine refugium":{incipit:"Domine refugium",parenthetic:"Solesmes",id:1108},"domine spes mea":{incipit:"Domine spes mea",parenthetic:"Solesmes",id:1334},"dominus mihi":{incipit:"Dominus mihi",parenthetic:"Solesmes",id:443},"dulcis et rectus":{incipit:"Dulcis et rectus",parenthetic:"Solesmes",id:1035},"ecce quam bonum":{incipit:"Ecce quam bonum",parenthetic:"Solesmes",id:614},"ecce sacerdos":{incipit:"Ecce sacerdos",parenthetic:"Solesmes",id:235},"ego autem":{Vatican:{incipit:"Ego autem",parenthetic:"Vatican",id:1658},Solesmes:{incipit:"Ego autem",parenthetic:"Solesmes",id:903}},"ego dixi":{Solesmes:{incipit:"Ego dixi",parenthetic:"Solesmes",id:399},Vatican:{incipit:"Ego dixi",parenthetic:"Vatican",id:1511}},"ego sapientia":{incipit:"Ego sapientia",parenthetic:"Solesmes",id:1024},"egredietur virga":{incipit:"Egredietur virga",parenthetic:"Solesmes",id:471},"electi mei":{incipit:"Electi mei",parenthetic:"Solesmes",id:1084},"eripe me domine":{Vatican:{incipit:"Eripe me Domine",parenthetic:"Vatican",id:1611},Solesmes:{incipit:"Eripe me Domine",parenthetic:"Solesmes",id:760}},eructavit:{incipit:"Eructavit",parenthetic:"Solesmes",id:654},"esto mihi":{Vatican:{incipit:"Esto mihi",parenthetic:"Vatican",id:1652},Solesmes:{incipit:"Esto mihi",parenthetic:"Solesmes",id:886}},evangelizare:{incipit:"Evangelizare",parenthetic:"Solesmes",id:1273},"exaltabo te":{Vatican:{incipit:"Exaltabo te",parenthetic:"Vatican",id:1473},Solesmes:{incipit:"Exaltabo te",parenthetic:"Solesmes",id:277}},"exaltent eum":{incipit:"Exaltent eum",parenthetic:"Solesmes",id:1119},"excita domine":{Solesmes:{incipit:"Excita Domine",parenthetic:"Solesmes",id:506},Vatican:{incipit:"Excita Domine",parenthetic:"Vatican",id:1534}},"exiit sermo":{Vatican:{incipit:"Exiit sermo",parenthetic:"Vatican",id:1591},Solesmes:{incipit:"Exiit sermo",parenthetic:"Solesmes",id:702}},"ex sion species":{Solesmes:{incipit:"Ex Sion species",parenthetic:"Solesmes",id:1268},Vatican:{incipit:"Ex Sion species",parenthetic:"Vatican",id:1785}},exsultabit:{incipit:"Exsultabit",parenthetic:"Solesmes",id:778},exsultabunt:{incipit:"Exsultabunt",parenthetic:"Solesmes",id:963},"exsulta et lauda":{incipit:"Exsulta et lauda",parenthetic:"Solesmes",id:492},"exsurge domine et intende":{Solesmes:{incipit:"Exsurge... et intende",parenthetic:"Solesmes",id:783},Vatican:{incipit:"Exsurge... et intende",parenthetic:"Vatican",id:1617}},"exsurge domine fer opem":{Vatican:{incipit:"Exsurge... fer opem",parenthetic:"Vatican",id:1434},Solesmes:{incipit:"Exsurge... fer opem",parenthetic:"Solesmes",id:152}},"exsurge domine non praevaleat":{Vatican:{incipit:"Exsurge... non praevaleat",parenthetic:"Vatican",id:1793},Solesmes:{incipit:"Exsurge... non praevaleat",parenthetic:"Solesmes",id:1298}},"fiat pax":{incipit:"Fiat pax",parenthetic:"Solesmes",id:996},"flores apparuerunt":{incipit:"Flores apparuerunt",parenthetic:"Solesmes",id:27},"fuit homo":{incipit:"Fuit homo",parenthetic:"Solesmes",id:424},"gloria et honore":{incipit:"Gloria et honore",parenthetic:"Solesmes",id:1206},"gloriosus deus":{incipit:"Gloriosus Deus",parenthetic:"Solesmes",id:888},"haec dies. ℣. benedictus":{Vatican:{incipit:"Haec dies. ℣. Benedictus",parenthetic:"Vatican",id:1796},Solesmes:{incipit:"Haec dies. ℣. Benedictus",parenthetic:"Solesmes",id:1305}},"haec dies. ℣. confitemini":{Solesmes:{incipit:"Haec dies. ℣. Confitemini",parenthetic:"Solesmes",id:1075},Vatican:{incipit:"Haec dies. ℣. Confitemini",parenthetic:"Vatican",id:1713}},"haec dies. ℣. dextera":{Vatican:{incipit:"Haec dies. ℣. Dextera",parenthetic:"Vatican",id:1516},Solesmes:{incipit:"Haec dies. ℣. Dextera",parenthetic:"Solesmes",id:416}},"haec dies. ℣. dicant nunc":{Vatican:{incipit:"Haec dies. ℣. Dicant nunc",parenthetic:"Vatican",id:1753},Solesmes:{incipit:"Haec dies. ℣. Dicant nunc",parenthetic:"Solesmes",id:1188}},"haec dies. ℣. dicat nunc":{Vatican:{incipit:"Haec dies. ℣. Dicat nunc",parenthetic:"Vatican",id:1740},Solesmes:{incipit:"Haec dies. ℣. Dicat nunc",parenthetic:"Solesmes",id:1150}},"haec dies. ℣. lapidem":{Solesmes:{incipit:"Haec dies. ℣. Lapidem",parenthetic:"Solesmes",id:975},Vatican:{incipit:"Haec dies. ℣. Lapidem",parenthetic:"Vatican",id:1684}},"hic est qui venit":{incipit:"Hic est qui venit",parenthetic:"Solesmes",id:1263},"hodie scietis":{Vatican:{incipit:"Hodie scietis",parenthetic:"Vatican",id:1445},Solesmes:{incipit:"Hodie scietis",parenthetic:"Solesmes",id:202}},improperium:{incipit:"Improperium",parenthetic:"Solesmes",id:780},"in deo confisum":{incipit:"In Deo confisum",parenthetic:"Solesmes",id:1251},"in deo speravit":{Vatican:{incipit:"In Deo speravit",parenthetic:"Vatican",id:1647},Solesmes:{incipit:"In Deo speravit",parenthetic:"Solesmes",id:865}},"inflammatum est":{incipit:"Inflammatum est",parenthetic:"Solesmes",id:1186},"in me gratia":{incipit:"In me gratia",parenthetic:"Solesmes",id:1214},"in omnem terram":{incipit:"In omnem terram",parenthetic:"Solesmes",id:351},"in sole posuit":{Vatican:{incipit:"In sole posuit",parenthetic:"Vatican",id:1446},Solesmes:{incipit:"In sole posuit",parenthetic:"Solesmes",id:203}},"inveni david":{incipit:"Inveni David",parenthetic:"Solesmes",id:827},"ipse habet":{incipit:"Ipse habet",parenthetic:"Solesmes",id:1368},"jacta cogitatum":{Solesmes:{incipit:"Jacta cogitatum",parenthetic:"Solesmes",id:423},Vatican:{incipit:"Jacta cogitatum",parenthetic:"Vatican",id:1518}},"justorum anime":{incipit:"Justorum anime",parenthetic:"Solesmes",id:98},"justus cum ceciderit":{incipit:"Justus cum ceciderit",parenthetic:"Solesmes",id:764},"justus ut palma":{incipit:"Justus ut palma",parenthetic:"Solesmes",id:34},"laetatus sum":{Vatican:{incipit:"Laetatus sum",parenthetic:"Vatican",id:1695},Solesmes:{incipit:"Laetatus sum",parenthetic:"Solesmes",id:1011}},"laudate dominum":{incipit:"Laudate Dominum",parenthetic:"Solesmes",id:348},"liberabit pauperem":{incipit:"Liberabit pauperem",parenthetic:"Solesmes",id:498},"liberasti nos":{incipit:"Liberasti nos",parenthetic:"Solesmes",id:395},"locus iste":{incipit:"Locus iste",parenthetic:"Solesmes",id:651},mementote:{incipit:"Mementote",parenthetic:"Solesmes",id:1174},"memor fui":{incipit:"Memor fui",parenthetic:"Solesmes",id:73},"mihi autem":{incipit:"Mihi autem",parenthetic:"Solesmes",id:571},"miserere mei deus":{Solesmes:{incipit:"Miserere mei Deus",parenthetic:"Solesmes",id:754},Vatican:{incipit:"Miserere mei Deus",parenthetic:"Vatican",id:1608}},"miserere mihi":{Vatican:{incipit:"Miserere mihi",parenthetic:"Vatican",id:1553},Solesmes:{incipit:"Miserere mihi",parenthetic:"Solesmes",id:562}},"misit dominus":{Solesmes:{incipit:"Misit Dominus",parenthetic:"Solesmes",id:932},Vatican:{incipit:"Misit Dominus",parenthetic:"Vatican",id:1673}},"ne avertas":{Solesmes:{incipit:"Ne avertas",parenthetic:"Solesmes",id:1239},Vatican:{incipit:"Ne avertas",parenthetic:"Vatican",id:1774}},"nimis honorati":{incipit:"Nimis honorati",parenthetic:"Solesmes",id:148},"nova bella":{incipit:"Nova bella",parenthetic:"Solesmes",id:357},"oculi omnium":{Solesmes:{incipit:"Oculi omnium",parenthetic:"Solesmes",id:1230},Vatican:{incipit:"Oculi omnium",parenthetic:"Vatican",id:1770}},"omnes de saba":{Vatican:{incipit:"Omnes de Saba",parenthetic:"Vatican",id:1447},Solesmes:{incipit:"Omnes de Saba",parenthetic:"Solesmes",id:205}},"omnes gentes":{incipit:"Omnes gentes",parenthetic:"Solesmes",id:613},"os justi":{incipit:"Os justi",parenthetic:"Solesmes",id:511},"ostende nobis":{Solesmes:{incipit:"Ostende nobis",parenthetic:"Solesmes",id:1055},Vatican:{incipit:"Ostende nobis",parenthetic:"Vatican",id:1708}},"pacifice loquebantur":{Solesmes:{incipit:"Pacifice loquebantur",parenthetic:"Solesmes",id:819},Vatican:{incipit:"Pacifice loquebantur",parenthetic:"Vatican",id:1629}},"pontifex sacerdos":{incipit:"Pontifex sacerdos",parenthetic:"Solesmes",id:546},priusquam:{incipit:"Priusquam",parenthetic:"Solesmes",id:647},"probasti domine":{incipit:"Probasti Domine",parenthetic:"Solesmes",id:1027},"prope est dominus":{Solesmes:{incipit:"Prope est Dominus",parenthetic:"Solesmes",id:284},Vatican:{incipit:"Prope est Dominus",parenthetic:"Vatican",id:1477}},"propitius esto":{Vatican:{incipit:"Propitius esto",parenthetic:"Vatican",id:1492},Solesmes:{incipit:"Propitius esto",parenthetic:"Solesmes",id:332}},"propter fratres meos":{incipit:"Propter fratres meos",parenthetic:"Solesmes",id:672},"propter veritatem":{incipit:"Propter veritatem",parenthetic:"Solesmes",id:807},"protector noster":{Vatican:{incipit:"Protector noster",parenthetic:"Vatican",id:1768},Solesmes:{incipit:"Protector noster",parenthetic:"Solesmes",id:1226}},"quae est ista":{incipit:"Quae est ista",parenthetic:"Solesmes",id:468},"quam magna":{incipit:"Quam magna",parenthetic:"Solesmes",id:1291},quemadmodum:{incipit:"Quemadmodum",parenthetic:"Solesmes",id:398},"qui ambulat":{incipit:"Qui ambulat",parenthetic:"Solesmes",id:637},"qui operatus est":{incipit:"Qui operatus est",parenthetic:"Solesmes",id:1347},"qui sedes domine":{Solesmes:{incipit:"Qui sedes Domine",parenthetic:"Solesmes",id:1007},Vatican:{incipit:"Qui sedes Domine",parenthetic:"Vatican",id:1693}},"quis sicut dominus":{incipit:"Quis sicut Dominus",parenthetic:"Solesmes",id:472},"qui timetis":{incipit:"Qui timetis",parenthetic:"Solesmes",id:370},"repleta est":{incipit:"Repleta est",parenthetic:"Solesmes",id:519},requiem:{incipit:"Requiem",parenthetic:"Solesmes",id:1261},"respice domine":{Solesmes:{incipit:"Respice Domine",parenthetic:"Solesmes",id:1232},Vatican:{incipit:"Respice Domine",parenthetic:"Vatican",id:1771}},"rogate dominum":{incipit:"Rogate Dominum",parenthetic:"Solesmes",id:898},"rogate quae ad pacem":{incipit:"Rogate quae ad pacem",parenthetic:"Solesmes",id:180},"sacerdotes ejus":{incipit:"Sacerdotes ejus",parenthetic:"Solesmes",id:415},"sacrificent domino":{incipit:"Sacrificent Domino",parenthetic:"Solesmes",id:402},"salvasti enim nos":{incipit:"Salvasti enim nos",parenthetic:"Solesmes",id:915},"salvos fac nos":{incipit:"Salvos fac nos",parenthetic:"Solesmes",id:670},"salvum fac populum":{Solesmes:{incipit:"Salvum fac populum",parenthetic:"Solesmes",id:296},Vatican:{incipit:"Salvum fac populum",parenthetic:"Vatican",id:1483}},"salvum fac servum":{Solesmes:{incipit:"Salvum fac servum",parenthetic:"Solesmes",id:1117},Vatican:{incipit:"Salvum fac servum",parenthetic:"Vatican",id:1726}},"sapientia hujus mundi":{incipit:"Sapientia hujus mundi",parenthetic:"Solesmes",id:1345},"sciant gentes":{Solesmes:{incipit:"Sciant gentes",parenthetic:"Solesmes",id:1265},Vatican:{incipit:"Sciant gentes",parenthetic:"Vatican",id:1784}},"sederunt principes":{Solesmes:{incipit:"Sederunt principes",parenthetic:"Solesmes",id:906},Vatican:{incipit:"Sederunt principes",parenthetic:"Vatican",id:1660}},"si ambulem":{Solesmes:{incipit:"Si ambulem",parenthetic:"Solesmes",id:1121},Vatican:{incipit:"Si ambulem",parenthetic:"Vatican",id:1727}},"sicut lilium":{incipit:"Sicut lilium",parenthetic:"Solesmes",id:748},"specie tua":{incipit:"Specie tua",parenthetic:"Solesmes",id:174},"speciosus. ℣. eructavit":{Vatican:{incipit:"Speciosus. ℣. Eructavit",parenthetic:"Vatican",id:1797},Solesmes:{incipit:"Speciosus. ℣. Eructavit",parenthetic:"Solesmes",id:1308}},"speciosus. ℣. filiae regum":{incipit:"Speciosus. ℣. Filiae regum",parenthetic:"Solesmes",id:1354},spera:{incipit:"Spera",parenthetic:"Solesmes",id:21},"spiritus domini":{incipit:"Spiritus Domini",parenthetic:"Solesmes",id:1016},"suscepimus deus":{incipit:"Suscepimus Deus",parenthetic:"Solesmes",id:50},"tecum principium":{Solesmes:{incipit:"Tecum principium",parenthetic:"Solesmes",id:518},Vatican:{incipit:"Tecum principium",parenthetic:"Vatican",id:1537}},"tenuisti manum":{Solesmes:{incipit:"Tenuisti manum",parenthetic:"Solesmes",id:49},Vatican:{incipit:"Tenuisti manum",parenthetic:"Vatican",id:1398}},"testis mihi":{incipit:"Testis mihi",parenthetic:"Solesmes",id:155},"tibi domine":{Solesmes:{incipit:"Tibi Domine",parenthetic:"Solesmes",id:818},Vatican:{incipit:"Tibi Domine",parenthetic:"Vatican",id:1628}},"timebunt gentes":{Solesmes:{incipit:"Timebunt gentes",parenthetic:"Solesmes",id:1173},Vatican:{incipit:"Timebunt gentes",parenthetic:"Vatican",id:1749}},"timete dominum":{incipit:"Timete Dominum",parenthetic:"Solesmes",id:371},"tollite hostias":{Solesmes:{incipit:"Tollite hostias",parenthetic:"Solesmes",id:282},Vatican:{incipit:"Tollite hostias",parenthetic:"Vatican",id:1476}},"tollite portas":{Solesmes:{incipit:"Tollite portas",parenthetic:"Solesmes",id:756},Vatican:{incipit:"Tollite portas",parenthetic:"Vatican",id:1609}},"tota formosa":{incipit:"Tota formosa",parenthetic:"Solesmes",id:1166},"tribulationes cordis":{Vatican:{incipit:"Tribulationes cordis",parenthetic:"Vatican",id:1567},Solesmes:{incipit:"Tribulationes cordis",parenthetic:"Solesmes",id:596}},"tu es deus":{Vatican:{incipit:"Tu es Deus",parenthetic:"Vatican",id:1640},Solesmes:{incipit:"Tu es Deus",parenthetic:"Solesmes",id:850}},"unam petii. ℣. beati":{incipit:"Unam petii. ℣. Beati",parenthetic:"Solesmes",id:260},"unam petii. ℣. ut... protegar":{incipit:"Unam petii. ℣. Ut... protegar",parenthetic:"Vatican",id:1456},"unam petii. ℣. ut videam... et protegar":{incipit:"Unam petii. ℣. Ut videam... et protegar",parenthetic:"Solesmes",id:229},"unam petii. ℣. ut videam... et visitem":{incipit:"Unam petii. ℣. Ut videam... et visitem",parenthetic:"Solesmes",id:565},universi:{Solesmes:{incipit:"Universi",parenthetic:"Solesmes",id:1169},Vatican:{incipit:"Universi",parenthetic:"Vatican",id:1747}},"uxor tua":{incipit:"Uxor tua",parenthetic:"Solesmes",id:311},"venite filii":{Vatican:{incipit:"Venite filii",parenthetic:"Vatican",id:1697},Solesmes:{incipit:"Venite filii",parenthetic:"Solesmes",id:1022}},"viderunt omnes":{Vatican:{incipit:"Viderunt omnes",parenthetic:"Vatican",id:1745},Solesmes:{incipit:"Viderunt omnes",parenthetic:"Solesmes",id:1163}},"vindica domine":{incipit:"Vindica Domine",parenthetic:"Solesmes",id:206}},
offertorium:{"assumpta est maria":{id:3317},"viri galilaei":{id:3315},"ubi caritas est vera":{id:3313},"accedite ad dominum":{incipit:"Accedite ad Dominum",parenthetic:"Solesmes",id:366},"adducam eos":{incipit:"Adducam eos",parenthetic:"Solesmes",id:1275},"ad te domine":{Solesmes:{incipit:"Ad te Domine",parenthetic:"Solesmes",id:962},Vatican:{incipit:"Ad te Domine",parenthetic:"Vatican",id:1679}},"afferentur... post eam":{incipit:"Afferentur... post eam",parenthetic:"Solesmes",id:768},"afferentur... proximae":{incipit:"Afferentur... proximae",parenthetic:"Solesmes",id:1107},"afferte domino":{incipit:"Afferte Domino",parenthetic:"Solesmes",id:1277},ambulate:{incipit:"Ambulate",parenthetic:"Solesmes",id:773},"angelus domini":{Solesmes:{incipit:"Angelus Domini",parenthetic:"Solesmes",id:789},Vatican:{incipit:"Angelus Domini",parenthetic:"Vatican",id:1618}},"anima nostra":{Solesmes:{incipit:"Anima nostra",parenthetic:"Solesmes",id:1031},Vatican:{incipit:"Anima nostra",parenthetic:"Vatican",id:1699}},"ascendit deus":{Vatican:{incipit:"Ascendit Deus",parenthetic:"Vatican",id:1448},Solesmes:{incipit:"Ascendit Deus",parenthetic:"Solesmes",id:211}},"audi israel":{incipit:"Audi Israel",parenthetic:"Solesmes 1974",id:872},"ave gratia plena":{incipit:"Ave gratia plena",parenthetic:"Solesmes",id:234},"ave maria":{incipit:"Ave Maria",parenthetic:"Solesmes",id:210},"ave maria... et benedictus":{Solesmes:{incipit:"Ave Maria... et benedictus",parenthetic:"Solesmes",id:843},Vatican:{incipit:"Ave Maria... et benedictus",parenthetic:"Vatican",id:1637}},"beata es virgo":{incipit:"Beata es Virgo",parenthetic:"Solesmes",id:567},"beati qui custodiunt":{incipit:"Beati qui custodiunt",parenthetic:"Solesmes",id:3},"benedicam dominum":{Solesmes:{incipit:"Benedicam Dominum",parenthetic:"Solesmes",id:143},Vatican:{incipit:"Benedicam Dominum",parenthetic:"Vatican",id:1430}},"benedic anima mea":{incipit:"Benedic anima mea",parenthetic:"Solesmes",id:1359},"benedic... et renovabitur":{incipit:"Benedic... et renovabitur",parenthetic:"Vatican",id:1815},"benedicite dominum":{incipit:"Benedicite Dominum",parenthetic:"Solesmes",id:1270},"benedicite gentes":{Vatican:{incipit:"Benedicite gentes",parenthetic:"Vatican",id:1643},Solesmes:{incipit:"Benedicite gentes",parenthetic:"Solesmes",id:860}},"benedictio perituri":{incipit:"Benedictio perituri",parenthetic:"Solesmes",id:449},"benedictus es domine doce me justificationes tuas et non tradas":{Vatican:{incipit:"Benedictus es... et non tradas",parenthetic:"Vatican",id:1514},Solesmes:{incipit:"Benedictus es... et non tradas",parenthetic:"Solesmes",id:408}},"benedictus es domine doce me justificationes tuas in labiis":{Solesmes:{incipit:"Benedictus es... in labiis",parenthetic:"Solesmes",id:1317},Vatican:{incipit:"Benedictus es... in labiis",parenthetic:"Vatican",id:1801}},"benedictus qui venit":{Vatican:{incipit:"Benedictus qui venit",parenthetic:"Vatican",id:1676},Solesmes:{incipit:"Benedictus qui venit",parenthetic:"Solesmes",id:941}},"benedictus sit":{Vatican:{incipit:"Benedictus sit",parenthetic:"Vatican",id:1795},Solesmes:{incipit:"Benedictus sit",parenthetic:"Solesmes",id:1303}},benedixerunt:{incipit:"Benedixerunt",parenthetic:"Solesmes",id:1255},"benedixisti domine":{Solesmes:{incipit:"Benedixisti Domine",parenthetic:"Solesmes",id:113},Vatican:{incipit:"Benedixisti Domine",parenthetic:"Vatican",id:1419}},"bonitas domini":{incipit:"Bonitas Domini",parenthetic:"Solesmes",id:26},"bonum est confiteri":{Solesmes:{incipit:"Bonum est confiteri",parenthetic:"Solesmes",id:1194},Vatican:{incipit:"Bonum est confiteri",parenthetic:"Vatican",id:1754}},"calix benedictionis":{incipit:"Calix benedictionis",parenthetic:"Solesmes",id:320},"christi factus sum":{incipit:"Christi factus sum",parenthetic:"Solesmes",id:1098},"christus unam":{incipit:"Christus unam",parenthetic:"Solesmes",id:1364},cognoscetur:{incipit:"Cognoscetur",parenthetic:"Solesmes",id:269},confessio:{incipit:"Confessio",parenthetic:"Solesmes",id:105},"confirma hoc... alleluia":{incipit:"Confirma hoc... alleluia",parenthetic:"Vatican",id:1499},"confirma hoc deus":{incipit:"Confirma hoc cum Alleluia",parenthetic:"Solesmes",id:361},"confitebor domino":{Vatican:{incipit:"Confitebor Domino",parenthetic:"Vatican",id:1562},Solesmes:{incipit:"Confitebor Domino",parenthetic:"Solesmes",id:584}},"confitebor tibi domine deus":{incipit:"Confitebor tibi... Deus",parenthetic:"Solesmes",id:980},"confitebor tibi domine in toto":{Solesmes:{incipit:"Confitebor tibi... in toto",parenthetic:"Solesmes",id:318},Vatican:{incipit:"Confitebor tibi... in toto",parenthetic:"Vatican",id:1487}},confitebuntur:{incipit:"Confitebuntur",parenthetic:"Solesmes",id:1382},confortamini:{Solesmes:{incipit:"Confortamini",parenthetic:"Solesmes",id:290},Vatican:{incipit:"Confortamini",parenthetic:"Vatican",id:1478}},"constitues eos":{incipit:"Constitues eos",parenthetic:"Solesmes",id:1319},"cum esset desponsata":{incipit:"Cum esset desponsata",parenthetic:"Solesmes",id:910},"custodi me":{Vatican:{incipit:"Custodi me",parenthetic:"Vatican",id:1803},Solesmes:{incipit:"Custodi me",parenthetic:"Solesmes",id:1322}},"de profundis":{incipit:"De profundis",parenthetic:"Solesmes",id:986},"desiderium animae":{incipit:"Desiderium animae",parenthetic:"Solesmes",id:722},"desiderium pauperum":{incipit:"Desiderium pauperum",parenthetic:"Solesmes",id:1331},"det vobis":{incipit:"Det vobis",parenthetic:"Solesmes",id:1272},"deus deus meus":{Vatican:{incipit:"Deus Deus meus",parenthetic:"Vatican",id:1669},Solesmes:{incipit:"Deus Deus meus",parenthetic:"Solesmes",id:924}},"deus enim":{Vatican:{incipit:"Deus enim",parenthetic:"Vatican",id:1685},Solesmes:{incipit:"Deus enim",parenthetic:"Solesmes",id:979}},"deus tu convertens":{Vatican:{incipit:"Deus tu convertens",parenthetic:"Vatican",id:1572},Solesmes:{incipit:"Deus tu convertens",parenthetic:"Solesmes",id:631}},"dextera domini":{Solesmes:{incipit:"Dextera Domini",parenthetic:"Solesmes",id:47},Vatican:{incipit:"Dextera Domini",parenthetic:"Vatican",id:1397}},"dextera domini... alleluia":{incipit:"Dextera Domini... alleluia",parenthetic:"Solesmes",id:448},"diffusa est":{incipit:"Diffusa est",parenthetic:"Solesmes",id:177},"diligis justitiam":{incipit:"Diligis justitiam",parenthetic:"Solesmes",id:520},"dixit jesus":{incipit:"Dixit Jesus",parenthetic:"Solesmes",id:687},doctrinam:{incipit:"Doctrinam",parenthetic:"Solesmes",id:1300},"domine ad adjuvandum":{Solesmes:{incipit:"Domine ad adjuvandum",parenthetic:"Solesmes",id:731},Vatican:{incipit:"Domine ad adjuvandum",parenthetic:"Vatican",id:1602}},"domine convertere":{Solesmes:{incipit:"Domine convertere",parenthetic:"Solesmes",id:848},Vatican:{incipit:"Domine convertere",parenthetic:"Vatican",id:1639}},"domine deus... qui repertus":{incipit:"Domine Deus... qui repertus",parenthetic:"Solesmes",id:200},"domine deus salutis":{Solesmes:{incipit:"Domine Deus salutis",parenthetic:"Solesmes",id:542},Vatican:{incipit:"Domine Deus salutis",parenthetic:"Vatican",id:1545}},"domine deus salutis... alleluia":{Vatican:{incipit:"Domine Deus salutis... alleluia",parenthetic:"Vatican",id:1687},Solesmes:{incipit:"Domine Deus salutis... alleluia",parenthetic:"Solesmes",id:987}},"domine exaudi... et clamor":{incipit:"Domine exaudi... et clamor",parenthetic:"Solesmes",id:461},"domine exaudi... ne avertas":{Vatican:{incipit:"Domine exaudi... ne avertas",parenthetic:"Vatican",id:1527},Solesmes:{incipit:"Domine exaudi... ne avertas",parenthetic:"Solesmes",id:867}},"domine fac mecum":{Vatican:{incipit:"Domine fac mecum",parenthetic:"Vatican",id:1817},Solesmes:{incipit:"Domine fac mecum",parenthetic:"Solesmes",id:1369}},"domine fortitudo":{incipit:"Domine fortitudo",parenthetic:"Solesmes",id:1351},"domine in auxilium":{incipit:"Domine in auxilium",parenthetic:"Solesmes",id:993},"domine in lumine":{incipit:"Domine in lumine",parenthetic:"Solesmes",id:767},"domine jesu christe":{incipit:"Domine Jesu Christe",parenthetic:"Solesmes",id:1199},"domine vivifica":{Solesmes:{incipit:"Domine vivifica",parenthetic:"Solesmes",id:109},Vatican:{incipit:"Domine vivifica",parenthetic:"Vatican",id:1418}},"ecce dedi":{incipit:"Ecce dedi",parenthetic:"Solesmes",id:358},"ego autem":{incipit:"Ego autem",parenthetic:"Solesmes",id:607},"elegerunt apostoli":{Solesmes:{incipit:"Elegerunt Apostoli",parenthetic:"Solesmes",id:462},Vatican:{incipit:"Elegerunt Apostoli",parenthetic:"Vatican",id:1528}},elegi:{incipit:"Elegi",parenthetic:"Solesmes",id:7},"emitte spiritum":{Vatican:{incipit:"Emitte Spiritum",parenthetic:"Vatican",id:1751},Solesmes:{incipit:"Emitte Spiritum",parenthetic:"Solesmes",id:1176}},"eo quod liberassem":{incipit:"Eo quod liberassem",parenthetic:"Solesmes",id:1269},"eripe me... deus":{Solesmes:{incipit:"Eripe me... Deus",parenthetic:"Solesmes",id:245},Vatican:{incipit:"Eripe me... Deus",parenthetic:"Vatican",id:1463}},"eripe me... domine":{Solesmes:{incipit:"Eripe me... Domine",parenthetic:"Solesmes",id:411},Vatican:{incipit:"Eripe me... Domine",parenthetic:"Vatican",id:1515}},"erit vobis":{Vatican:{incipit:"Erit vobis",parenthetic:"Vatican",id:1433},Solesmes:{incipit:"Erit vobis",parenthetic:"Solesmes",id:151}},"exaltabo te":{Solesmes:{incipit:"Exaltabo te",parenthetic:"Solesmes",id:648},Vatican:{incipit:"Exaltabo te",parenthetic:"Vatican",id:1578}},"exaudi deus":{Vatican:{incipit:"Exaudi Deus",parenthetic:"Vatican",id:1636},Solesmes:{incipit:"Exaudi Deus",parenthetic:"Solesmes",id:842}},exspectans:{incipit:"Exspectans",parenthetic:"Solesmes",id:182},"exsultabunt sancti":{incipit:"Exsultabunt sancti",parenthetic:"Solesmes",id:33},"exsulta satis":{Solesmes:{incipit:"Exsulta satis",parenthetic:"Solesmes",id:929},Vatican:{incipit:"Exsulta satis",parenthetic:"Vatican",id:1671}},exsultavit:{incipit:"Exsultavit",parenthetic:"Solesmes",id:1045},"factus est":{Vatican:{incipit:"Factus est",parenthetic:"Vatican",id:1453},Solesmes:{incipit:"Factus est",parenthetic:"Solesmes",id:223}},"felix namque es":{incipit:"Felix namque es",parenthetic:"Solesmes",id:280},"filiae regum":{incipit:"Filiae regum",parenthetic:"Solesmes",id:1333},gaudeo:{incipit:"Gaudeo",parenthetic:"Solesmes",id:436},gloriabuntur:{incipit:"Gloriabuntur",parenthetic:"Solesmes",id:1375},"gloria et divitiae":{incipit:"Gloria et divitiae",parenthetic:"Solesmes",id:125},"gloria et honore":{incipit:"Gloria et honore",parenthetic:"Solesmes",id:407},"gressus meos":{Solesmes:{incipit:"Gressus meos",parenthetic:"Solesmes",id:1099},Vatican:{incipit:"Gressus meos",parenthetic:"Vatican",id:1722}},holocaustum:{incipit:"Holocaustum",parenthetic:"Solesmes",id:319},"honora dominum":{incipit:"Honora Dominum",parenthetic:"Solesmes",id:1116},illumina:{Solesmes:{incipit:"Illumina",parenthetic:"Solesmes",id:708},Vatican:{incipit:"Illumina",parenthetic:"Vatican",id:1594}},"immittet angelus":{incipit:"Immittet Angelus",parenthetic:"Solesmes",id:747},improperium:{incipit:"Improperium",parenthetic:"Vatican",id:1531},"improperium... et dederunt":{incipit:"Improperium... et dederunt",parenthetic:"Solesmes",id:486},"improperium exspectavit":{incipit:"Improperium exspectavit",parenthetic:"Solesmes",id:628},"inclinet dominus":{incipit:"Inclinet Dominus",parenthetic:"Solesmes",id:994},"in conspectu angelorum":{incipit:"In conspectu Angelorum",parenthetic:"Solesmes",id:662},"in die solemnitatis":{Solesmes:{incipit:"In die solemnitatis",parenthetic:"Solesmes",id:1129},Vatican:{incipit:"In die solemnitatis",parenthetic:"Vatican",id:1731}},"ingressus aaron":{incipit:"Ingressus Aaron",parenthetic:"Solesmes",id:129},"inimicitias ponam":{incipit:"Inimicitias ponam",parenthetic:"Solesmes",id:1083},"in me gratia":{incipit:"In me gratia",parenthetic:"Solesmes",id:494},"in omnem terram":{incipit:"In omnem terram",parenthetic:"Solesmes",id:570},insurrexerunt:{incipit:"Insurrexerunt",parenthetic:"Solesmes",id:426},"intende voci":{Solesmes:{incipit:"Intende voci",parenthetic:"Solesmes",id:293},Vatican:{incipit:"Intende voci",parenthetic:"Vatican",id:1481}},"in te speravi":{Solesmes:{incipit:"In te speravi",parenthetic:"Solesmes",id:967},Vatican:{incipit:"In te speravi",parenthetic:"Vatican",id:1682}},"intonuit de caelo":{incipit:"Intonuit de caelo",parenthetic:"Solesmes",id:869},"intonuit de coelo":{incipit:"Intonuit de coelo",parenthetic:"Vatican",id:1648},"introibo ad altare":{incipit:"Introibo ad altare",parenthetic:"Solesmes",id:720},"introibo in domum":{incipit:"Introibo in domum",parenthetic:"Solesmes",id:876},"inveni david":{incipit:"Inveni David",parenthetic:"Solesmes",id:779},"in virtute tua":{incipit:"In virtute tua",parenthetic:"Solesmes",id:667},invocavit:{incipit:"Invocavit",parenthetic:"Solesmes",id:244},"jubilate deo omnis":{Solesmes:{incipit:"Jubilate Deo omnis",parenthetic:"Solesmes",id:718},Vatican:{incipit:"Jubilate Deo omnis",parenthetic:"Vatican",id:1598}},"jubilate deo universa":{Vatican:{incipit:"Jubilate Deo universa",parenthetic:"Vatican",id:1674},Solesmes:{incipit:"Jubilate Deo universa",parenthetic:"Solesmes",id:937}},"justi epulentur":{incipit:"Justi epulentur",parenthetic:"Solesmes",id:369},"justitiae domini":{Solesmes:{incipit:"Justitiae Domini",parenthetic:"Solesmes",id:591},Vatican:{incipit:"Justitiae Domini",parenthetic:"Vatican",id:1565}},"justitia indutus":{incipit:"Justitia indutus",parenthetic:"Solesmes",id:515},"justorum animae":{incipit:"Justorum animae",parenthetic:"Solesmes",id:835},"justus ut palma":{incipit:"Justus ut palma",parenthetic:"Solesmes",id:777},laetamini:{incipit:"Laetamini",parenthetic:"Solesmes",id:786},"laetamini cum alleluia":{incipit:"Laetamini cum Alleluia",parenthetic:"Solesmes",id:870},"laetentur caeli":{Solesmes:{incipit:"Laetentur caeli",parenthetic:"Solesmes",id:811},Vatican:{incipit:"Laetentur caeli",parenthetic:"Vatican",id:1625}},"lauda anima":{Vatican:{incipit:"Lauda anima",parenthetic:"Vatican",id:1585},Solesmes:{incipit:"Lauda anima",parenthetic:"Solesmes",id:668}},"lauda jerusalem":{incipit:"Lauda Jerusalem",parenthetic:"Solesmes",id:845},laudamini:{incipit:"Laudamini",parenthetic:"Solesmes",id:604},"laudate dominum":{Vatican:{incipit:"Laudate Dominum",parenthetic:"Vatican",id:1657},Solesmes:{incipit:"Laudate Dominum",parenthetic:"Solesmes",id:899}},"levabo oculos":{Solesmes:{incipit:"Levabo oculos",parenthetic:"Solesmes",id:1060},Vatican:{incipit:"Levabo oculos",parenthetic:"Vatican",id:1710}},"lignum habet":{incipit:"Lignum habet",parenthetic:"Solesmes",id:166},magnificat:{incipit:"Magnificat",parenthetic:"Solesmes",id:362},"majorem caritatem":{incipit:"Majorem caritatem",parenthetic:"Solesmes",id:401},meditabor:{incipit:"Meditabor",parenthetic:"Vatican",id:1624},"meditabor... alleluia":{incipit:"Meditabor... alleluia",parenthetic:"Vatican",id:1763},"meditabor cum alleluia":{incipit:"Meditabor cum Alleluia",parenthetic:"Solesmes",id:1218},"meditabor sine alleluia":{incipit:"Meditabor sine Alleluia",parenthetic:"Solesmes",id:810},"mihi autem adhaerere":{incipit:"Mihi autem adhaerere",parenthetic:"Solesmes",id:102},"mihi autem nimis":{incipit:"Mihi autem nimis",parenthetic:"Solesmes",id:499},"mirabilis deus":{incipit:"Mirabilis Deus",parenthetic:"Solesmes",id:919},"miserere mihi":{Solesmes:{incipit:"Miserere mihi",parenthetic:"Solesmes",id:922},Vatican:{incipit:"Miserere mihi",parenthetic:"Vatican",id:1668}},"non duplices":{incipit:"Non duplices",parenthetic:"Solesmes",id:187},"non enim judicavi":{incipit:"Non enim judicavi",parenthetic:"Solesmes",id:285},"non habemus hic":{incipit:"Non habemus hic",parenthetic:"Solesmes",id:680},"non participentur":{incipit:"Non participentur",parenthetic:"Solesmes",id:690},"obaudite me":{incipit:"Obaudite me",parenthetic:"Solesmes",id:419},"o domine... ego servus":{incipit:"O Domine... ego servus",parenthetic:"Solesmes",id:951},"o domine... et filius":{incipit:"O Domine... et filius",parenthetic:"Solesmes",id:1193},"oratio mea":{incipit:"Oratio mea",parenthetic:"Solesmes",id:185},"oravi deum":{incipit:"Oravi Deum",parenthetic:"Solesmes",id:652},"perfice gressus":{Vatican:{incipit:"Perfice gressus",parenthetic:"Vatican",id:1467},Solesmes:{incipit:"Perfice gressus",parenthetic:"Solesmes",id:265}},"populum humilem":{Solesmes:{incipit:"Populum humilem",parenthetic:"Solesmes",id:1080},Vatican:{incipit:"Populum humilem",parenthetic:"Vatican",id:1715}},"portas caeli":{incipit:"Portas caeli",parenthetic:"Solesmes",id:1361},"portas coeli":{incipit:"Portas coeli",parenthetic:"Vatican",id:1816},"post partum":{incipit:"Post partum",parenthetic:"Solesmes",id:427},"postula a me":{incipit:"Postula a me",parenthetic:"Solesmes",id:390},posuisti:{incipit:"Posuisti",parenthetic:"Solesmes",id:487},"precatus est":{Vatican:{incipit:"Precatus est",parenthetic:"Vatican",id:1490},Solesmes:{incipit:"Precatus est",parenthetic:"Solesmes",id:325}},"protege domine":{incipit:"Protege Domine",parenthetic:"Solesmes",id:195},"quaerite dominum":{incipit:"Quaerite Dominum",parenthetic:"Solesmes",id:1069},"quam magna":{incipit:"Quam magna",parenthetic:"Solesmes",id:683},"quando orabas":{incipit:"Quando orabas",parenthetic:"Solesmes",id:1362},"quid bonum":{incipit:"Quid bonum",parenthetic:"Solesmes",id:618},"quis ascendet":{incipit:"Quis ascendet",parenthetic:"Solesmes",id:1306},"recordare mei":{incipit:"Recordare mei",parenthetic:"Solesmes",id:67},"recordare virgo":{incipit:"Recordare Virgo",parenthetic:"Solesmes",id:787},"regali ex progenie":{incipit:"Regali ex progenie",parenthetic:"Solesmes",id:719},"reges tharsis":{Solesmes:{incipit:"Reges Tharsis",parenthetic:"Solesmes",id:1147},Vatican:{incipit:"Reges Tharsis",parenthetic:"Vatican",id:1738}},"sacerdotes domini":{Vatican:{incipit:"Sacerdotes Domini",parenthetic:"Vatican",id:1577},Solesmes:{incipit:"Sacerdotes Domini",parenthetic:"Solesmes",id:645}},"salus populi":{incipit:"Salus populi",parenthetic:"Solesmes",id:379},"salvum me fac":{incipit:"Salvum me fac",parenthetic:"Solesmes",id:328},sanctificavit:{incipit:"Sanctificavit",parenthetic:"Solesmes",id:838},"scapulis suis":{Solesmes:{incipit:"Scapulis suis",parenthetic:"Solesmes",id:294},Vatican:{incipit:"Scapulis suis",parenthetic:"Vatican",id:1482}},"si ambulavero":{incipit:"Si ambulavero",parenthetic:"Solesmes",id:616},"sicut in holocausto":{Vatican:{incipit:"Sicut in holocausto",parenthetic:"Vatican",id:1586},Solesmes:{incipit:"Sicut in holocausto",parenthetic:"Solesmes",id:675}},"sperent in te":{Vatican:{incipit:"Sperent in te",parenthetic:"Vatican",id:1805},Solesmes:{incipit:"Sperent in te",parenthetic:"Solesmes",id:1328}},"stetit angelus":{incipit:"Stetit Angelus",parenthetic:"Solesmes",id:302},"stetit pontifex":{incipit:"Stetit pontifex",parenthetic:"Solesmes",id:723},"super flumina":{incipit:"Super flumina",parenthetic:"Solesmes",id:812},"tamquam aurum":{incipit:"Tamquam aurum",parenthetic:"Solesmes",id:1113},"terra tremuit":{Solesmes:{incipit:"Terra tremuit",parenthetic:"Solesmes",id:725},Vatican:{incipit:"Terra tremuit",parenthetic:"Vatican",id:1599}},"timeat eum":{incipit:"Timeat eum",parenthetic:"Solesmes",id:809},"tollite portas":{Solesmes:{incipit:"Tollite portas",parenthetic:"Solesmes",id:171},Vatican:{incipit:"Tollite portas",parenthetic:"Vatican",id:1440}},"tuam coronam":{incipit:"Tuam coronam",parenthetic:"Solesmes",id:1095},"tu es petrus":{incipit:"Tu es Petrus",parenthetic:"Solesmes",id:1234},"tui sunt caeli":{Vatican:{incipit:"Tui sunt caeli",parenthetic:"Vatican",id:1786},Solesmes:{incipit:"Tui sunt caeli",parenthetic:"Solesmes",id:1274}},"tulerunt jesum":{incipit:"Tulerunt Jesum",parenthetic:"Solesmes",id:93},"venite filii":{incipit:"Venite filii",parenthetic:"Solesmes",id:805},"veritas mea":{incipit:"Veritas mea",parenthetic:"Solesmes",id:630},"viam mandatorum":{incipit:"Viam mandatorum",parenthetic:"Solesmes",id:1253},videbam:{incipit:"Videbam",parenthetic:"Solesmes",id:1074},"vir erat":{incipit:"Vir erat",parenthetic:"Solesmes",id:1363}},
sequentia:{"ave verum":{incipit:"Ave verum",parenthetic:"Solesmes",id:2441},"dies irae":{incipit:"Dies irae",parenthetic:"Solesmes",id:1198},"ecce panis angelorum":{incipit:"Ecce panis Angelorum",parenthetic:"Solesmes",id:3025},laetabundus:{incipit:"Laetabundus",parenthetic:"Solesmes",id:3028},"lauda sion":{Solesmes:{incipit:"Lauda Sion",parenthetic:"Solesmes",id:308},Vatican:{incipit:"Lauda Sion",parenthetic:"Vatican",id:1485}},"o panis dulcissime":{incipit:"O Panis dulcissime",parenthetic:"Solesmes",id:3032},"stabat mater":{incipit:"Stabat Mater",parenthetic:"Solesmes",id:681},"veni sancte spiritus":{Vatican:{incipit:"Veni Sancte Spiritus",parenthetic:"Vatican",id:1402},Solesmes:{incipit:"Veni Sancte Spiritus",parenthetic:"Solesmes",id:68}},"victimae paschali":{Solesmes:{incipit:"Victimae paschali",parenthetic:"Solesmes",id:1086},Vatican:{incipit:"Victimae paschali",parenthetic:"Vatican",id:1718}}},
tractus:{"ab ortu solis":{incipit:"Ab ortu solis",parenthetic:"Solesmes",id:644},absolve:{incipit:"Absolve",parenthetic:"Solesmes",id:338},"adjuva nos":{incipit:"Adjuva nos",parenthetic:"Solesmes",id:380},"adoramus te":{incipit:"Adoramus te",parenthetic:"Solesmes",id:114},"ad te levavi":{Solesmes:{incipit:"Ad te levavi",parenthetic:"Solesmes",id:1329},Vatican:{incipit:"Ad te levavi",parenthetic:"Vatican",id:1806}},"angelis suis":{incipit:"Angelis suis",parenthetic:"Solesmes",id:927},"angelus domini":{incipit:"Angelus Domini",parenthetic:"Solesmes",id:660},annuntiate:{incipit:"Annuntiate",parenthetic:"Solesmes",id:516},annuntiavi:{incipit:"Annuntiavi",parenthetic:"Solesmes",id:1085},"apud dominum":{incipit:"Apud Dominum",parenthetic:"Solesmes",id:110},"attende coelum":{incipit:"Attende coelum",parenthetic:"Vatican",id:1638},"audi filia":{incipit:"Audi filia",parenthetic:"Solesmes",id:738},"ave maria":{incipit:"Ave Maria",parenthetic:"Solesmes",id:266},"beatus vir cujus":{incipit:"Beatus vir cujus",parenthetic:"Solesmes",id:728},"beatus vir qui timet":{incipit:"Beatus vir qui timet",parenthetic:"Solesmes",id:444},"benedicte dominum":{incipit:"Benedicte Dominum",parenthetic:"Solesmes",id:949},"bonum est confiteri":{incipit:"Bonum est confiteri",parenthetic:"Solesmes",id:1063},"cantemus domino":{incipit:"Cantemus Domino",parenthetic:"Vatican",id:1661},"christo igitur":{incipit:"Christo igitur",parenthetic:"Solesmes",id:1005},commovisti:{Vatican:{incipit:"Commovisti",parenthetic:"Vatican",id:2377},Solesmes:{incipit:"Commovisti",parenthetic:"Solesmes",id:1178}},confitemini:{Solesmes:{incipit:"Confitemini",parenthetic:"Solesmes",id:455},Vatican:{incipit:"Confitemini",parenthetic:"Vatican",id:1525}},"contristatus sum":{incipit:"Contristatus sum",parenthetic:"Solesmes",id:175},"cor meum":{incipit:"Cor meum",parenthetic:"Solesmes",id:63},"de necessitatibus":{Vatican:{incipit:"De necessitatibus",parenthetic:"Vatican",id:1472},Solesmes:{incipit:"De necessitatibus",parenthetic:"Solesmes",id:276}},"de profundis":{Solesmes:{incipit:"De profundis",parenthetic:"Solesmes",id:926},Vatican:{incipit:"De profundis",parenthetic:"Vatican",id:1670}},desiderium:{incipit:"Desiderium",parenthetic:"Solesmes",id:176},"deus deus meus":{Solesmes:{incipit:"Deus Deus meus",parenthetic:"Solesmes",id:372},Vatican:{incipit:"Deus Deus meus",parenthetic:"Vatican",id:1503}},"deus docuisti":{incipit:"Deus docuisti",parenthetic:"Solesmes",id:682},"domine audivi":{incipit:"Domine audivi",parenthetic:"Vatican",id:1437},"domine deus":{incipit:"Domine Deus",parenthetic:"Solesmes",id:1167},"domine exaudi":{Solesmes:{incipit:"Domine exaudi",parenthetic:"Solesmes",id:824},Vatican:{incipit:"Domine exaudi",parenthetic:"Vatican",id:1633}},"domine non secundum":{Vatican:{incipit:"Domine non secundum",parenthetic:"Vatican",id:1519},Solesmes:{incipit:"Domine non secundum",parenthetic:"Solesmes",id:425}},"ecce sic benedicetur":{incipit:"Ecce sic benedicetur",parenthetic:"Solesmes",id:144},effuderunt:{Vatican:{incipit:"Effuderunt",parenthetic:"Vatican",id:1461},Solesmes:{incipit:"Effuderunt",parenthetic:"Solesmes",id:240}},"ego autem cum":{incipit:"Ego autem cum",parenthetic:"Solesmes",id:437},"ego diligentes":{incipit:"Ego diligentes",parenthetic:"Solesmes",id:858},"ego pascam":{incipit:"Ego pascam",parenthetic:"Solesmes",id:769},"ego sum":{incipit:"Ego sum",parenthetic:"Solesmes",id:56},"emitte spiritum":{incipit:"Emitte Spiritum",parenthetic:"Solesmes",id:925},"eripe me":{incipit:"Eripe me",parenthetic:"Vatican",id:1561},"exaudi me":{incipit:"Exaudi me",parenthetic:"Solesmes",id:1105},exsurge:{incipit:"Exsurge",parenthetic:"Solesmes",id:1370},"factus es":{incipit:"Factus es",parenthetic:"Solesmes",id:837},"filii hominum":{incipit:"Filii hominum",parenthetic:"Solesmes",id:343},"fortitudo mea":{incipit:"Fortitudo mea",parenthetic:"Solesmes",id:250},"fundamenta ejus":{incipit:"Fundamenta ejus",parenthetic:"Solesmes",id:689},"gaude maria":{incipit:"Gaude Maria",parenthetic:"Solesmes",id:18},"gratificavit nos":{incipit:"Gratificavit nos",parenthetic:"Solesmes",id:502},"gustate... ℣. beatus":{incipit:"Gustate... ℣. Beatus",parenthetic:"Solesmes",id:219},"gustate... ℣. timete":{incipit:"Gustate... ℣. Timete",parenthetic:"Solesmes",id:968},hostiam:{incipit:"Hostiam",parenthetic:"Solesmes",id:1153},"induit eum":{incipit:"Induit eum",parenthetic:"Solesmes",id:76},"ipse invocabit me":{incipit:"Ipse invocabit me",parenthetic:"Solesmes",id:483},"jam hiems":{incipit:"Jam hiems",parenthetic:"Solesmes",id:739},"jubilate domino":{Vatican:{incipit:"Jubilate Domino",parenthetic:"Vatican",id:1794},Solesmes:{incipit:"Jubilate Domino",parenthetic:"Solesmes",id:1299}},"laudate... omnes angeli":{incipit:"Laudate... omnes Angeli",parenthetic:"Solesmes",id:671},"laudate... omnes gentes":{Solesmes:{incipit:"Laudate... omnes gentes",parenthetic:"Solesmes",id:1247},Vatican:{incipit:"Laudate... omnes gentes",parenthetic:"Vatican",id:1778}},magnificentiam:{incipit:"Magnificentiam",parenthetic:"Solesmes",id:92},"manum suam":{incipit:"Manum suam",parenthetic:"Solesmes",id:249},"meum est consilium":{incipit:"Meum est consilium",parenthetic:"Solesmes",id:412},"miserere mei":{incipit:"Miserere mei",parenthetic:"Solesmes",id:729},"misericors et miserator":{incipit:"Misericors et miserator",parenthetic:"Solesmes",id:1244},"misit me":{incipit:"Misit me",parenthetic:"Solesmes",id:883},nolite:{incipit:"Nolite",parenthetic:"Solesmes",id:1112},"non judicavi":{incipit:"Non judicavi",parenthetic:"Solesmes",id:969},"notus in judaea":{incipit:"Notus in Judaea",parenthetic:"Solesmes",id:421},"nunc dimittis":{incipit:"Nunc dimittis",parenthetic:"Solesmes",id:1346},"nunc ergo":{incipit:"Nunc ergo",parenthetic:"Solesmes",id:793},"omnis gloria":{incipit:"Omnis gloria",parenthetic:"Solesmes",id:19},persequar:{incipit:"Persequar",parenthetic:"Solesmes",id:35},"probasti nos":{incipit:"Probasti nos",parenthetic:"Solesmes",id:55},"qui confidunt":{Solesmes:{incipit:"Qui confidunt",parenthetic:"Solesmes",id:1377},Vatican:{incipit:"Qui confidunt",parenthetic:"Vatican",id:1818}},"qui gloriatur":{incipit:"Qui gloriatur",parenthetic:"Solesmes",id:928},"qui habitat":{Solesmes:{incipit:"Qui habitat",parenthetic:"Solesmes",id:889},Vatican:{incipit:"Qui habitat",parenthetic:"Vatican",id:1653}},"qui regis israel":{Solesmes:{incipit:"Qui regis Israel",parenthetic:"Solesmes",id:1157},Vatican:{incipit:"Qui regis Israel",parenthetic:"Vatican",id:1742}},"qui seminant":{incipit:"Qui seminant",parenthetic:"Solesmes",id:305},"sacerdotes ejus":{incipit:"Sacerdotes ejus",parenthetic:"Solesmes",id:1281},"saepe expugnaverunt":{Solesmes:{incipit:"Saepe expugnaverunt",parenthetic:"Solesmes",id:742},Vatican:{incipit:"Saepe expugnaverunt",parenthetic:"Vatican",id:1605}},"sicut cervus":{incipit:"Sicut cervus",parenthetic:"Vatican",id:1395},"si quis putat":{incipit:"Si quis putat",parenthetic:"Solesmes",id:710},"stabat sancta maria":{incipit:"Stabat sancta Maria",parenthetic:"Solesmes",id:1156},"surge domine":{incipit:"Surge Domine",parenthetic:"Solesmes",id:597},suscepimus:{incipit:"Suscepimus",parenthetic:"Solesmes",id:1240},"te deum patrem":{incipit:"Te Deum Patrem",parenthetic:"Solesmes",id:763},"tu es petrus":{incipit:"Tu es Petrus",parenthetic:"Solesmes",id:1029},"tu es vas":{incipit:"Tu es vas",parenthetic:"Solesmes",id:884},"tu gloria jerusalem":{incipit:"Tu gloria Jerusalem",parenthetic:"Solesmes",id:485},"veni sponsa":{incipit:"Veni sponsa",parenthetic:"Solesmes",id:256},"vere languores":{incipit:"Vere languores",parenthetic:"Solesmes",id:978},"vinea facta est":{incipit:"Vinea facta est",parenthetic:"Vatican",id:1388}}
};
for(key in chantID.alleluia) {
    chantID.graduale['alleluia ℣. ' + key] = chantID.alleluia[key];
}
//GABC URL: http://gregobase.selapa.net/download.php?format=gabc&id={ID}
//Read mode from header
