// English:
// 3 He is like a tree that is plant+ed †
// be+side the flow+ing |wa|ters, *
// that yields its fruit in due |sea|son,

// Vulgate:
// Manus habent, et non palpábunt: † pedes habent, et non ambulábunt: * non clamábunt in gútture suo.

// Nova Vulgata:
// 7 Manus habent et non palpábunt, † pedes habent et non ambulábunt; * non clamábunt in gútture suo.

var fs = require('fs'),
    _novaVulgata = fs.readFileSync('psalms/NovaVulgata.txt',{encoding:'utf8'}),
    novaVulgata = [],
    vulgata = fs.readdirSync('psalms').filter(function(fn){return fn.match(/^\d{3}$/)}),
    rgp = fs.readdirSync('Psalms-RGP').sort(function(a,b){return parseInt(a.slice(0,-4)) - parseInt(b.slice(0,-4)); });

vulgata = vulgata.map(function(fn) {
  novaVulgata.push(getNovaVulgataPsalm(parseInt(fn)));
  return getPsalmLines(fs.readFileSync('psalms/' + fn,{encoding:'utf8'}));
});
rgp = rgp.map(function(fn) {
  return getPsalmLines(fs.readFileSync('Psalms-RGP/' + fn,{encoding:'utf8'}));
});

// initial setup complete: novaVulgata, vulgata, and rgp are now arrays of arrays: rgp[2][0] is the first line of the 3rd psalm.
var stats = {};
console.info('processing rgp')
stats.rgp = collectStats(rgp,true, 'rgp');
console.info('processing vulgata')
stats.vulgata = collectStats(vulgata, false, 'vulgata');
console.info('processing nova vulgata')
stats.novaVulgata = collectStats(novaVulgata, false, 'novaVulgata');
fs.writeFileSync('psalmStats.json',JSON.stringify(stats,null,'  '));

function collectStats(psalms,isEnglish,psalterName) {
  var result = { psalmResults: [] };
  var mono = [];
  psalms.forEach(function(psalmLines, psalmIndex) {
    var psalmStats = {};
    var monosyllables = [];
    psalmLines.forEach(function(line, lineIndex) {
      var stats = statsFor(line.replace(/\d+|[,;:.!?]+/g,''), isEnglish, psalmIndex, lineIndex);
      accumulateStats([psalmStats,result], stats);
      if(stats.mediant && stats.ending && (stats.mediant.mono || stats.ending.mono)) monosyllables.push(line.trim());
    });
    mono.push(monosyllables)
    result.psalmResults.push(psalmStats);
  });
  if(Object.keys(mono).length) writeMonosyllables(mono,psalterName);
  return result;
}

function writeMonosyllables(mono, psalterName) {
  var string = mono.reduce(function(s, syls, psalmIndex){
    if(syls.length) {
      s += 'Psalm ' + (psalmIndex+1) + '\n';
      s += syls.join('\n') + '\n\n';
    }
    return s;
  }, '');
  fs.writeFileSync(psalterName+'Monosyllables.txt',string);
}

function statsFor(line, isEnglish, psalmIndex, lineIndex) {
  if(isEnglish) {
    if(line.match(/†$/)) return {};
    if(line.match(/\*$/)) return {mediant: statsForEndingEnglish(line.replace(/\s*\*$/,''), psalmIndex, lineIndex)};
    return {ending: statsForEndingEnglish(line, psalmIndex, lineIndex)};
  }
  var line = line.split(/\s*\*\s*/);
  switch(line.length) {
    case 2:
      break;
    case 3:
      line = line.slice(1);
      break
    default:
      console.error('Expected exactly one mediant, found %s in (Psalm %s: %s) line:\n%s', line.length-1, psalmIndex, lineIndex, line);
      break;
  }
  return {mediant: statsForEnding(line[0]), ending: statsForEnding(line[1])};
}

function statsForEnding(ending) {
  if(ending.match(/^\s*$/)) return;
  var syls = getSyllables(ending).reverse();
  var monosyllable = syls[0].word.length == 1;
  var count = 0, index=0;
  while(!syls[index++].accent) {
    ++count;
  }
  return {mono: monosyllable, count: count};
}

function statsForEndingEnglish(ending, psalmIndex, lineIndex) {
  var match = ending.match(/\|([^|]*$)/);
  if(!match) {
    //console.warn('no ending found in (Psalm %s: %s) line:\n %s', psalmIndex, lineIndex, ending)
    return;
  }
  ending = match[1];
  var result = 0;
  if(ending.length) {
    result = ending.split(/[+\s]/).length;
  }
  return result;
}

function accumulateStats(statsArray,stats) {
  Object.keys(stats).forEach(function(key){
    var val = stats[key];
    if(val==undefined) {
      return;
    }
    statsArray.forEach(function(accum){
      var count = (typeof val == 'number')? val : val.count;
      if(!(key in accum)) accum[key] = {};
      if(!(count in accum[key])) accum[key][count] = 0;
      ++accum[key][count];
      if(typeof val == 'object' && val.mono) {
        if(!('mono' in accum[key])) accum[key].mono = 0;
        ++accum[key].mono;
      }
    });
  });
}

function getSyllables(text,bi) {
  if(typeof(text)!="string") {
    return text;
  }
  var regexLatin = /((?:<\w+>)*)(((?:(?:(\s+)|^)(?:s[uú](?:bs?|s(?=[cpqt]))|tr[aá]ns|p[oó]st|[aá]d|[oó]bs|[eé]x|p[eéoó]r|[ií]n|r[eé](?:d(?=d|[aeiouyáéëíóúýǽæœ]))))|(?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽæœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ])(?:[\wáéíóúýǽæœ]*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]|[bcdgptf][lrh][\wáéíóúýǽæœ])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|([^\w\sáëéíóúýǽæœ]*(?:\s[:;†\*\"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/\w+>)*)/gi
  var syl = [];
  var match;
  var lastI = 0;
  while(match=regexLatin.exec(text)) {
    var index = match.index;
    if(match[0].match(/^n[cg]u[aeiouyáéíóúýǽæœ]/i)) {
      var lastSyl = syl.slice(-1);
      if(lastSyl) lastSyl = lastSyl[0];
      if(!lastSyl.space && !lastSyl.punctuation) {
        lastSyl.all +='n';
        lastSyl.syl +='n';
        lastSyl.sylnospace +='n';
        ++index;
        ++lastI;
        match[0] = match[0].slice(1);
        match[2] = match[2].slice(1);
        match[3] = match[3].slice(1);
      }
    }
    syl.push(syllable(match,text.slice(lastI,index),bi));
    lastI = index + match[0].length;
  }
  getWords(syl);
  return syl;
}
function getWords(syls) {
  var len = syls.length;
  var curWord = [];
  var r = [];
  var curWordAccents = 0;
  for(var i = 0; i < len; ++i) {
    var syl = syls[i];
    curWord.push(syl);
    syl.word = curWord;
    if(syl.accent) ++curWordAccents;
    if(i == (len - 1) || syl.space) {
      if(curWordAccents == 0) {
        if(curWord.length == 2) {
          curWord[0].accent = true;
        } else if(curWord.length > 2) {
          if(curWord[0].vowel == curWord[0].sylnospace.slice(0,1)) {
            curWord[0].accent = true;
          } else {
            for(var j = 0; j < curWord.length; ++j) {
              syl = curWord[j];
              if(syl.vowel == 'æ' || syl.vowel == 'œ') {
                syl.accent = true;
                break;
              }
            }
          }
        }
      }
      r.push(curWord);
      curWord = [];
      curWordAccents = 0;
    }
  }
  return r;
}
function syllable(match,index,bi) {
  var regexAccent = /[áéíóúýǽ]/i;
  var regexVowel = /(?:[cgq]u|[iy])?([aeiouyáéëíóúýǽæœ]+)/i;
  var nbsp=bi?bi.nbsp:" ";
  var prespace=match[4]||match[5]||"";
  var isAccent = (match[7] == '*' || regexAccent.test(match[3]));
  if(typeof(match)=="string"){
    if(bi && bi.makeSylSubstitutions) match = bi.makeSylSubstitutions(match);
    return {index:index,
            all:match,
            punctuation:match,
            space: "",
            syl:"",
            prepunctuation: "",
            word: undefined
    };
  } else {
    if(bi && bi.makeSylSubstitutions){
      var newmatch=[];
      for(var i=0;i<match.length;++i){
        newmatch.push(bi.makeSylSubstitutions(match[i]));
      };
      match=newmatch;
    }
    var elision=false;
    var lpi,rpi;
    lpi=match[2].lastIndexOf('(');
    rpi=match[2].indexOf(')');
    if(lpi>=0 && rpi>=0){
      elision=true;
      lpi=match[2].lastIndexOf('(');
      match[2]=match[2].slice(0,lpi)+'<i>'+match[2].slice(lpi+1);
      lpi=match[3].lastIndexOf('(');
      match[3]=match[3].slice(0,lpi)+'<i>'+match[3].slice(lpi+1);
      match[2]=match[2].replace(')','</i>');
      match[3]=match[3].replace(')','</i>');
    }
    var tmp;
    var prepunc=typeof(index) == "string"? index.replace(/(["'«»‘’“”„‟‹›‛])\s*/g,"$1"+nbsp).replace(/(\d+)\.?\s*/g,"$1."+nbsp) : "";
    var sylnospace=match[3].slice(prespace.length);
    return {index: match.index,
            all: match[2],
            syl: match[1] + (prepunc?sylnospace:match[3]) + match[10],
            vowel: match[6]||(tmp=regexVowel.exec(match[3]),(tmp&&tmp[0]||"")),
            separator: match[7], // - or *
            punctuation: match[8]? (match[8].replace(/\s|[\*†]$/g,"").replace(/[:;"«»‘’“”„‟‹›‛]/g,nbsp+"$&")) : "",
            prespace: prepunc?"":prespace,
            sylnospace: sylnospace,
            space: match[9],
            accent: isAccent,
            prepunctuation: prepunc,
            word: undefined,
            elision: elision,
            flex: match[8] && match[8].match(/†$/),
            mediant: match[8] && match[8].match(/\*$/)
    };
  }
}

function getPsalmLines(text) {
  return text.replace(/\s+$/g,'').split(/\s*\n\s*/);
}
function getNovaVulgataPsalm(psalmNum) {
  var regexBaseNovaVulgata=["PSALMUS ","[^\\n]*\\n((?:\\S|(\\s+(?!PSALMUS \\d)))+)(?:\\s+PSALMUS|\\s*$)"];
  var regex=new RegExp(regexBaseNovaVulgata.join(psalmNum));
  var psalm = regex.exec(_novaVulgata);
  if(psalm) {
    return getPsalmLines(psalm[1]);
  } else {
    console.error("ERROR retrieving PSALMUS " + psalmNum);
  }
}