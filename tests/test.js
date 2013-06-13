$(function(){
  $.ajaxSetup({cache:false});
  var ids=[1,551,311,191,967,490,144,505,766,1261,338,1198,1199,241,923,651,242,200,43,1377,1343,150,202,167,171,367,1175,518,890,811,117,917,217,714,979,1125,72,1163,324,1274,1139,863,403,205,524,1147,918,1355,17,57,211,263,715,1230,774,308,645,577,132,962,1036,1115,1169,356,631,966,292,1268,1225,113,218,855,1007,79,210,1144,224,284,336,93,626,260,816,13,937,230,538,932,1123,47,1148,1001,1173,564,1282,1308,1033,980,8,670,1043,725,952,1075,761,1086,25,789,953,1042,275,135,924,1549,912,1220,536,668,813,1341,446,42,39,159,1348,585,860,579,633,1040,990,1091,405,107,1644,361,1041,99,349,1303,391,1289,965,1111,848,794,801,697,1235,1328,1058,1264,423,874,708,512,727,332,396,143,574,797,1226,522,265,1079,239,1046,1136,675,339,77,1022,1254,1080,1203,709,886,1357,591,798,879,1205,299,1221,1052,1088,1026,648,1145,580,865,501,325,1245,1082,1182,691,388,820,1232,1071,747,868,1246,547,1165,182,782,1352,1338,335,993,1318,1077,1284,652,1134,595,1044,172,838,404,1097,1011,389,616,479,1192,44,1056,812,696,745,1047,1363,1290,1380,1108,1271,67,464,933,614,735,986,592,331,395,327,294,1100,889,834,1294,1624,373,455,596,916,1090,1329,1298,653,899,1353,78,318,726,742,760,1171,1531,650,372,49,1168,1194,640,926,222,529,554,1178,1265,1381,1317,677,1299,850];
  var $div = $('#div');
  var checkGabc = function(i){
    var id = ids[i];
    $.get('../gabc/'+id+'.gabc',function(gabc){
      var result;
      if((result = decompileTest(gabc))) {
        $div.append($('<a href="http://gregobase.selapa.net/chant.php?id=' + id + '">'+result+'</a><br/>'));
      }
      if(++i < ids.length) checkGabc(i);
    });
  }
  checkGabc(0);
  
  var decompileTest = function(mixed) {
    regexOuter.exec('');
    var firstWord = true;
    var wordAccent = false;
    var word = '';
    var wordSyllables = 0;
    var regexAccent = /[áéǽíóúýÁÉǼÍÓÚÝAEIOUYÆŒ]/g;
    var curClef;
    var regRep=/^[cf]b?[1-4]\s*|(\s+)[`,;:]+\s*/gi;
    var text='';
    var gabc='';
    var match;
    var ws;
    var tws='';
    var verses=[];
    var hasElisions=false;
    var lastVerseI=0;
    var lastClef='';
    var verseHasClef=false;
    var lastVerse=function(){return verses[verses.length-1]||null;}
    var match=regexOuter.exec(mixed);
    var verseReps=0;
    while(match) {
      ws=match[rog.whitespace]||'';
      var m=undefined;
      var syl=match[rog.syl];
      if(gabc.length==0) {
        regexGabc.exec('');
        m=regexGabc.exec(match[rog.gabc]);
        if(m && m[4]) {
          lastClef=m[4];
          if(gabc.length==0)verseHasClef=true;
        }
      }
      if(tws==' '&&!syl) {
        regexGabc.exec('');
        m=regexGabc.exec(match[rog.gabc]);
        if(!m||m[4])text += tws;
      } else {
        text += tws;
      }
      if(syl && (!match[rog.gabc].match(/^(?:(?:[cf]b?[1-4])|[:;,\s])*$/) || syl.match(/<i>Ps\.?<\/i>/))){
        var sylR=syl.replace(/<i>([aeiouy])<\/i>/ig,'($1)').replace(/[{}-]/g,'');
        hasElisions = hasElisions||(syl!=sylR);
        if(sylR[0]=='e' && text.slice(-1)=='a') {
          sylR = 'ë' + sylR.slice(1);
        }
        if(word.length && text.match(/\s$/)) {
          if(firstWord) {
            if(word.length == 3 && !word.match(/[A-Z]{3}/)) {
              return 'First Word: ' + word;
            }
          }
          var matchA = word.match(regexAccent);
          if(!word.match(/<[a-z]+>/) &&
            /*((matchA && matchA.length > 1) || */
            (wordSyllables > 2 && !matchA)) {
            return word;
          }
          word = '';
          wordSyllables = 0;
          firstWord = false;
        }
        text += sylR;
        word += sylR;
        ++wordSyllables;
        if(firstWord == true) {
          if(wordSyllables == 1) {
            if(!sylR[0].match(/[A-Z]/)) return 'First Syllable: ' + sylR;
            if(sylR.length > 1 && !sylR[1].match(/[A-Z]/)) return 'First Syllable: ' + sylR;
            if(sylR.length == 1 || sylR.length > 3) {
              firstWord = false;
            }
          }
        } else {
          if(word.match(/^[A-Z]{2,}[a-z]|^[a-z]+[A-Z]/)){
            return word;
          }
        }
      }
      gabc+=match[rog.gabc] + (ws.replace(/[^\n]*\n[^\n]*/g,'\n')||" ");
      var nextMatch=regexOuter.exec(mixed);
      
      tws=ws;
      match=nextMatch;
    }
    if(tws)text += tws;
    regexGabc.exec('');
    var gs =verses.join('\n--\n');
    gSyl=[];
    var offset = 0;
    verses.forEach(
      function(a,b){
        gSyl.push(splitGabc(a,offset));
        offset += a.length + 4;
      });

    //gSyl = splitGabc(gs);
    var s = text.replace(/\s+/g,' ').replace(/^\s+|\s+$|[*{}-]/g,'');
    var index=s.indexOf(' ');
    if(index>1) {
      // make the rest of the first word minuscule
      s=s[0] + s.slice(1,index).toLowerCase() + s.slice(index);
    }
    s = s.replace(/\s*~\s*/g,'\n').replace(/%/g,'*').replace(/(\|\s*)*(\*\s*)+(\|\s*)*/g,'* ');
    return false;
  };
});