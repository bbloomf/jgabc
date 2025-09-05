String.prototype.repeat = function(num){return new Array(num+1).join(this);};
var $=require('jquery');
var regexGabc = /(((?:([`,;:]\d*)|([cf]b?[1-4]))+)|(\S+))(?:\s+|$)/ig;
var regexVowel = /(?:[cgq]u|[iy])?([aeiouyáéëíóúýǽæœ]+)/i;
var regexLatin = /((?:<(?:b|i|sc)>)*)(((?:(?:(\s+)|^)(?:s[uú](?:bs?|s(?=[cpqt]))|tr[aá]ns|p[oó]st|[aá]d|[oó]bs|[eé]x|p[eéoó]r|[ií]n|r[eé](?:d(?=d|[aeiouyáéëíóúýǽæœ]))))|(?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽæœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ])(?:[\wáéíóúýǽæœ]*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]|[bcdgptf][lrh][\wáéíóúýǽæœ])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|([^\w\sáëéíóúýǽæœ]*(?:\s[:;†\*\"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/(?:b|i|sc)>)*)/gi
var regexWords = /((?:<(?:b|i|sc)>)*)([^a-z\(\)]*\s*"*(?=\b|\())(([a-z'*]*)(?:\(([a-z'*]+)\)([a-z'*]*))?)(=?)([-":;,.\)\?]*)(\s+[†*])?((?:<\/(?:b|i|sc)>)*)/gi
var regexQuoteTernary = /([?:])([^?:]*)(?=$|:)/g;
var regexAccent = /[áéíóúýǽ]/i;
var regexToneGabc = /(')?(([^\sr]+)(r)?)(?=$|\s)/gi;
var regexVerseNumber = /^(\d+)\.?\s*/;
var sym_flex = '†';
var sym_med = '*';
var gloria_patri = "Glória Patri, et Fílio, * et Spirítui Sancto.\nSicut erat in princípio, et nunc, et semper, * et in sǽcula sæculórum. Amen."
var gloria_patri_end_vowels = "E u o* u a* e.";
var bi_formats;
var gabcStar;
var window = typeof(window)=='undefined'?{localStorage:{}}:window;
var localStorage = typeof(localStorage)=='undefined'?{}:window.localStorage;
if(localStorage.gabcStar) {
  gabcStar = localStorage.gabcStar;
} else {
  gabcStar = '<v>\\greheightstar</v>'
}
String.prototype.format = function(keys){
  return this.replace(/\$([a-z]+)/gi,function(e){return keys[e.slice(1)]||e;});
}
var regexTag = /<(\/)?(b|i|sc|v)>/i;
function getTagsFrom(txt){
  var tm,r=[];
  while(tm = regexTag.exec(txt)) {
    r.push(tm[2]);
    var lastIndex = tm.index + tm[0].length;
    if(tm.index == 0)
      txt = txt.slice(tm[0].length);
    else txt = txt.slice(0,tm.index) + txt.slice(lastIndex);
  }
  return r;
}
var o_bi_formats = 
    bi_formats = (function(){
                  var _syl_subRegex= /ǽ/g;
                  var _syl_substitutions= {'ǽ':"{<sp>'ae</sp>}"};
                  return {
                      html: {bold: ["<b>", "</b>"], italic: ["<i>", "</i>"],nbsp:"&nbsp;",verse: ["<span style='float:left;width:25pt;text-align:right;'>($c.)&nbsp;</span>","<br/>"],versesName:"$psalm-$tone.html"},
                      tex: {bold:  ["{\\textbf{", "}"], italic:  ["{\\it ", "}"],nbsp:"~",verse:["\\item ",""],versesName:"$psalm-$tone.tex"},
                      gabc: {bold: ["<b>", "</b>"], italic: ["<i>", "</i>"],nbsp:" ",verse:["($c. )",""],versesName:"$psalm-$tone.gabc",
                        makeSylSubstitutions: function(o){
                          return o? o.replace(_syl_subRegex,function(e){return _syl_substitutions[e]||e}) : o;
                        }
                      },
                      "html-underline": {bold:["<u>","</u>"], italic:["<span style='border-bottom:3px double;'>","</span>"],nbsp:"&nbsp;",verse:["($c. )",""],versesName:"$psalm-$tone.html"},
                      "tex-underline": {bold:["\\uline{","}"], italic:["\\uuline{","}"],nbsp:"~",verse:["($c. )",""],versesName:"$psalm-$tone.tex"},
                      "gabc-plain": {bold:["",""],italic:["",""],nbsp:" ",verse:["($c. )",""],versesName:"$psalm-$tone.gabc"},
                      "gabc-versicle": {bold:["",""],italic:["",""],nbsp:" ",verse:["<v>\\Vbar</v> ,<v>\\Rbar</v> ",""],versesName:"versicle.gabc"}
                    };
                })();
var o_g_tones = 
    g_tones = {'1.':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h.",
                  solemn:"f gh hr hg ixgi h hr 'hg gh..",
                  terminations:{'D':"hr g f 'gh gr gvFED.",
                                'D-':"hr g f 'g gr gvFED.",
                                'D2':"hr g f gr 'gf d.",
                                'f':"hr g f 'gh gr gf..",
                                'g':"hr g f 'gh gr g.",
                                'g2':"hr g f 'g gr ghg.",
                                'g3':"hr g f 'g gr g.",
                                'a':"hr g f 'g hr h.",
                                'a2':"hr g f 'g gr gh..",
                                'a3':"hr g f 'gh gr gh.."
                               }
                 },
             '2.':{clef:"f3",
                  mediant:"e f hr 'i hr h.",
                  solemn:"e fe eh hr hg hi i 'hi hr h.",
                  termination:"hr g 'e fr f."
                 },
             '3.':{clef:"c4",
                  mediant:"g hj jr 'k jr jr 'ih j.",
                  solemn:"g hj jr 'jk jr jr 'ih hj..",
                  terminations:{'b':"jr h 'j jr i.",
                                'a':"jr h 'j jr ih..",
                                'a2':"jr ji hi 'h gr gh..",
                                'g':"jr ji hi 'h gr g.",
                                'g2':"jr h j i 'h gr g."
                               }
                 },
             '4.':{clef:"c4",
                  mediant:"h gh hr g h 'i hr h.",
                  solemn:"h gh hr hg gi i 'hi hr h.",
                  terminations:{'g':"hr 'h gr g.",
                                'E':"hr g h ih gr 'gf e."
                               }
                 },
             '4 alt':{clef:"c3",
                      mediant:"i hi ir h i 'j ir i.",
                      solemn:"i hi ir ih hj j 'ij ir i.",
                      terminations:{'c':"ir 'i hr h.",
                                    'A':"ir h i j 'h fr f.",
                                    'A*':"ir h i j 'h fr fg..",
                                    'd':"ir h i j 'h ir i."
                                   }
                     },
             '5.':{clef:"c3",
                  mediant:"d f hr 'i hr h.",
                  solemn:"d f hr i 'i hr h.",
                  termination:"hr 'i gr 'h fr f."
                 },
             '6.':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h.",
                  solemn:"f gh hr hg ixgi h hr 'hg gh..",
                  termination:"hr f gh 'g fr f."
                 },
             '6 alt':{clef:"c4",
                      mediant:"f gh hr g 'h fr f.",
                      termination:"hr f gh 'g fr f."
                     },
             '7.':{clef:"c3",
                  mediant:"hg hi ir 'k jr 'i jr j.",
                  shortMediant:"hg hi ir i.",
                  solemn:"ehg hi ir 'ik jr jr 'ji ij..",
                  shortSolemn:"ehg hi ir i.",
                  terminations:{'a':"ir 'j ir 'h hr gf..",
                                'b':"ir 'j ir 'h hr g.",
                                'c':"ir 'j ir 'h hr gh..",
                                'c2':"ir 'j ir 'h hr ih..",
                                'd':"ir 'j ir 'h hr gi.."
                               }
                 },
             '8.':{clef:"c4",
                  mediant:"g h jr 'k jr j.",
                  solemn:"g hg gj jr ji jk k 'jk jr j.",
                  terminations:{'G':"jr i j 'h gr g.",
                                'G*':"jr i j 'h gr gh..",
                                'c':"jr h j 'k jr j."
                               }
                 },
             'per.':{clef:"c4",
                     mediant:"ixhi hr g ixi h 'g fr f.",
                     termination:"gr d 'f fr ed.."
                    },
             "Introit 1":{"clef":"c4",
                          "mediant":"f gh hr 'hj hr hr 'hg gh..",
                          "termination":"gf gh hr hjh g f fff d."},
             "Introit 2":{"clef":"f3",
                          "mediant":"e fe eh hr hg hi i 'hi hr h.",
                          "termination":"hf fh hr i hf h ge fgf."},
             "Introit 3":{"clef":"c4",
                          "mediant":"g hj jr 'k jr jr 'ih jjj",
                          "termination":"ig hj jr j/ji hg h i gh.."},
             "Introit 4":{"clef":"c4",
                          "mediant":"hg gh hr hg gi i 'hi hr h.",
                          "termination":"hg gh hr gf gh g e."},
             "Introit 5":{"clef":"c3",
                          "mediant":"d f hr i 'i hr h.",
                          "termination":"f hr 'i gr 'h fr f."},
             "Introit 6":{"clef":"c4",
                          "mediant":"fg gf gh hr g 'ixi hr 'g fr f.",
                          "termination":"(h | f gh | f gh h) 'hj g fr g fd f 'g fr f."},
             "Introit 7":{"clef":"c3",
                          "mediant":"ehg hi ir 'ik jr jr 'ji ij..",
                          "termination":"ig hi ir i!jwk i h hhh fe.."},
             "Introit 8":{"clef":"c4",
                          "mediant":"g hg gj jr ji jk k 'jk jr j.",
                          "termination":"jh hj jr j/ji gh ji h g."},
             'V.1':{clef:"c3",
                    mediant:"hr h g_hvGFEfgf."
                   },
             'V.2':{clef:"c4",
                    mediant:"hr h h/hf,fgwhvGFEfg/gf"
                   }
            };
var d_tones = {'1.':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h",
                  solemn:"f gh hr hg ixgi h hr 'hg gh",
                  terminations:{'D':"hr g f 'gh gr gvFED",
                                'g':"hr g f 'gh gr g",
                                'a':"hr g f 'g hr h"
                               }
                 },
             '2.':{clef:"f3",
                  mediant:"e f hr 'i hr h",
                  solemn:"e fe eh hr hg hi i 'hi hr h",
                  termination:"hr g 'e fr f"
                 },
             '3.':{clef:"c4",
                  mediant:"g hj jr 'k jr jr 'ih j",
                  solemn:"g hj jr 'jk jr jr 'ih hj",
                  terminations:{'a':"jr h 'j jr ih",
                                'a2':"jr ji hi 'h gr gh"
                               }
                 },
             '4.':{clef:"c4",
                  mediant:"h gh hr g h 'i hr h",
                  solemn:"h gh hr hg gi i 'hi hr h",
                  terminations:{'E':"hr g h ih gr 'gf e"
                               }
                 },
             '4 alt':{clef:"c3",
                      mediant:"i hi ir h i 'j ir i",
                      solemn:"i hi ir ih hj j 'ij ir i",
                      terminations:{'A':"ir h i j 'h fr f"
                                   }
                     },
             '5.':{clef:"c3",
                  mediant:"d f hr 'i hr h",
                  solemn:"d f hr i 'i hr h",
                  termination:"hr 'i gr 'h fr f"
                 },
             '6.':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h",
                  solemn:"f gh hr hg ixgi h hr 'hg gh",
                  termination:"hr f gh 'g fr f"
                 },
             '7.':{clef:"c3",
                  mediant:"hg hi ir 'k jr 'i jr j",
                  shortMediant:"hg hi ir",
                  solemn:"ehg hi ir 'ik jr jr 'ji ij",
                  shortSolemn:"ehg hi ir i",
                  terminations:{'a':"ir 'j ir 'h hr gf",
                                'd':"ir 'j ir 'h hr gi"
                               }
                 },
             '8.':{clef:"c4",
                  mediant:"g h jr 'k jr j",
                  solemn:"g hg gj jr ji jk k 'jk jr j",
                  terminations:{'G':"jr i j 'h gr g",
                                'c':"jr h j 'k jr j"
                               }
                 },
             'per.':{clef:"c4",
                     mediant:"ixhi hr ixi h 'g fr f",
                     termination:"gr d 'f fr ed"
                    }
            };
var Syl = (function(){
  var intUpdate=setTimeout(function(){Syl.updateWords();},8000);
  return {
    words:(window.localStorage&&window.localStorage.words&&JSON.parse(window.localStorage.words))||{},
    queue:[],
    syllabify:function(text,lang){
      var result=[],
          m,
          d,
          forceSyl=false,
          words=this.words;
      regexWords.exec("");
      while((m=regexWords.exec(text)) && m[0]){
        var w=(m[5]?(m[4]+m[5]+m[6]):m[3]).toLowerCase(),
            opi=m[4]?m[4].length:0,         // opening parenthesis index
            cpi=m[5]?1+opi+m[5].length:0,   // closing parenthesis index
            ai=w.split('*');                // accent indices
        w = ai.join('');
        m[3] = m[3] && m[3].replace(/\*/g,'');
        m[5] = m[5] && m[5].replace(/\*/g,'');
        ai.pop();
        var c = 0;
        ai.forEach(function(i,j){
          ai[j] = (c += i.length);
        });
        if(forceSyl && m[9])forceSyl=false;
        if(m[7])forceSyl=true;
        if(forceSyl) {
          d=[];
        } else if(w in words){
          d=words[w];
        } else {
          d=[];
          if(this.queue.indexOf(w)<0)this.queue.push(w);
        }
        var tmp=["",m[1],"",m[2]||"",m[2]||""],
            index=m.index+tmp.join('').length,
            i=0,
            wi=0,
            di;
        while(i<d.length){
          tmp[10]="";
          di=wi+d[i];
          if(m[5]){
            if(di>opi){
              ++di;opi=m[3].length;
            }
            if(di>cpi){
              ++di;cpi=m[3].length;
            }
          }
          var ts = m[3].slice(wi,di);
          tmp[2] = tmp[3] = tmp[3] + ts;
          //tmp[3] = ts;
          
          tmp.index=index+wi;
          if(wi + tmp[2].length >= ai[0]){
            ai.shift();
            tmp[7] = '*';
          }
          result.push(syllable(tmp,null,{nbsp:""}));
          m[2] = "";
          wi=di;
          ++i;
          tmp=["","","",""];
        }
        var ts = m[3].slice(wi);;
        tmp[2] = tmp[3] = tmp[3] + ts;
        //tmp[3] = ts;
        tmp[8] = m[8] + ((m[9]||'').match(/†/)? ' †':'');
        tmp[9]=" ";
        tmp[10]=m[10];
        if(ai.length) tmp[7]='*';
        tmp.index=index+wi;
        result.push(syllable(tmp,null,{nbsp:""}));
      }
      return result;
    },
    updateWords:function(){
      if(this.queue.length>0){
        $.getScript("https://www.sourceandsummit.com/editor/legacy/syl.php?txt="+this.queue.join('+'));
        this.queue=[];
      } else {
        intUpdate=setTimeout(function(){Syl.updateWords();},5000);
      }
    },
    addResult:function(list){
      intUpdate=setTimeout(function(){Syl.updateWords();},5000);
      var array=list.split(" ");
      for(i in array){
        var w=array[i],
            data=[],
            idx=w.indexOf('-'),
            lastIdx=0;
        while(idx>=0){
          data.push(idx-lastIdx);
          lastIdx=++idx;
          idx=w.indexOf('-',idx);
        }
        this.words[w.replace(/-/g,'')]=data;
      }
      if(typeof(updateText)=="function")updateText();
      if(window.localStorage)window.localStorage.words=JSON.stringify(this.words);
    }
  }
})();
function syllable(match,index,bi) {
  var nbsp=bi?bi.nbsp:" ";
  var prespace=match[4]||match[5]||"";
  var isAccent = (match[7] == '*' || regexAccent.test(match[3]));
  if(typeof(match)=="string"){
    if(bi && bi.makeSylSubstitutions)match = bi.makeSylSubstitutions(match);
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
    }if(bi && bi.makeSylSubstitutions)
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
    var oTags=getTagsFrom(match[1]);
    var cTags=getTagsFrom(match[10]);
    var tmp;
    var prepunc=typeof(index) == "string"? index.replace(/(["'«»‘’“”„‟‹›‛])\s*/g,"$1"+nbsp).replace(/(\d+)\.?\s*/g,"$1."+nbsp) : "";
    var sylnospace=match[3].slice(prespace.length);
    return {index: match.index,
            all: match[2],
            syl: match[1] + (prepunc?sylnospace:match[3]) + match[10],
            vowel: match[6]||(tmp=regexVowel.exec(match[3]),(tmp&&tmp[0]||"")),
            separator: match[7], // - or *
            punctuation: match[8]? (match[8].replace(/\s|[\*†]$/g,"")/*.replace(/[:;"«»‘’“”„‟‹›‛]/g,nbsp+"$&")*/) : "",  // TODO: make space before punctuation optional
            prespace: prepunc?"":prespace,
            sylnospace: sylnospace,
            space: match[9],
            accent: isAccent,
            prepunctuation: prepunc,
            word: undefined,
            oTags: oTags,
            cTags: cTags,
            elision: elision,
            flex: match[8] && match[8].match(/†$/),
            mediant: match[8] && match[8].match(/\*$/)
    };
  }
}
function toneGabc(match) {
  return {index: match.index,
          all: match[0],
          accent: match[1] == "'",
          gabc: "(" + match[(match[1] == "'"? 3 : 2)] + ")",  // use group 3 if accented, otherwise group 2  (this is because accents can possibly be open, but should never be drawn that way)
          gabcClosed: "(" + match[3] + ")",
          open: match[4] == "r"
         };
}
function getKeys(aa) {
  var result = [];
  var i;
  for(i in aa) {
    result.push(i);
  }
  return result;
}
function getPsalmTones(tones) {
  return getKeys(tones||g_tones);
}
function getEndings(tone) {
  var endings = [];
  var t = g_tones[tone];
  if(t && t.terminations) {
    var i;
    for(i in t.terminations) {
      endings.push(i);
    }
  }
  return endings;
}

function getFlexGabc(mediant) {
  if(typeof(mediant)=="string") mediant = getGabcTones(mediant);
  var toneTenor = mediant.toneTenor;
  var toneFlex = mediant.toneFlex;
  return toneTenor + " " + toneTenor + "r '" + toneTenor + " " + toneFlex + "r " + toneFlex + ".";
}
function applyPsalmTone(options) {
  var text = options.text,
      gabc = options.gabc,
      useOpenNotes = options.useOpenNotes || false,
      useBoldItalic = options.useBoldItalic || false,
      onlyVowel = options.onlyVowel || false,
      format = options.format,
      verseNumber = options.verseNumber,
      prefix = options.prefix,
      suffix = options.suffix,
      italicizeIntonation = options.italicizeIntonation || false,
      result = options.result,
      gabcShort = options.gabcShort,
      favor = options.favor || {},
      flexEqualsTenor = options.flexEqualsTenor || false,
      lang = options.lang;
  if(lang) {
    getSyllables = lang=='en'?_getEnSyllables : _getSyllables;
  }
  if(typeof(favor)=='string') {
    temp = {};
    temp[favor]=true;
    favor = temp;
  }
  if(typeof(result)!="object") {
    result={shortened:false};
  }
  var bi = format || bi_formats.gabc;
  if(useOpenNotes == undefined) {
    useOpenNotes = true;
  }
  if(useBoldItalic == undefined) {
    useBoldItalic = true;
  }
  var openCount = 0;
  var verseNum = regexVerseNumber.exec(text);
  if(verseNum) {
    if(prefix)text = text.slice(verseNum[0].length);
    verseNum = parseInt(verseNum[1]);
  } else {
    verseNum = verseNumber||"";
  }
  prefix = (prefix && bi.verse[0])||"";
  suffix = (suffix && bi.verse[1])||"";
  var tmp = prefix.split(',');
  if(tmp.length>1 && tmp.slice(-1)[0].length>0) {
    prefix = tmp[typeof(verseNum)=='number'? (verseNum-1)%tmp.length : 0];
  }
  tmp = suffix.split(',');
  if(tmp.length>1 && tmp.slice(-1)[0].length>0) {
    suffix = tmp[typeof(verseNum)=='number'? (verseNum-1)%tmp.length : 0];
  }
  var syl = getSyllables(text,bi);
  var toneList = typeof(gabc)=="string"? getGabcTones(gabc,undefined,flexEqualsTenor) : gabc;
  if(typeof(toneList.eval)=="function"){
    t = syl.slice(-3).reverse();
    toneList = toneList.eval();
  }
  var toneListShort = (typeof(gabcShort)=="string"? getGabcTones(gabcShort,undefined,flexEqualsTenor) : gabcShort)||toneList;
  var tones = toneList.tones;
  var tonesShort = (gabcShort&&toneListShort.tones) || null;
  var r;
  while(!finished){
    r = '';
    var si = syl.length - 1;
    var lastOpen;
    var vow;
    var italic=false;
    var lastAccentI = si + 1;
    var lastTone;
    var finished=false;
    if(toneList.variableIntonation && !result.shortened) {
      //find first accented syllable
      var acceptableAccentIndices = {};
      toneList.variableIntonation.forEach(function(o){ acceptableAccentIndices[o.length]=o; });
      var accentI = -1;
      for(var i=0; accentI<0 && i<syl.length; ++i) {
        if(syl[i].accent) {
          for(var j=i; j>=0; j -= 2) {
            if(j in acceptableAccentIndices) {
              accentI = j;
              break;
            }
          }
        }
      }
      if(accentI < 0) {
        for(i in acceptableAccentIndices) { accentI = i; break; }
      }
      tones = acceptableAccentIndices[accentI].concat(tones);
      toneList.variableIntonationLength = accentI;
    }
    for(var ti = tones.length - 1; (ti >= 0 || lastOpen) && si >= 0; --ti,--si) {
      var tone = tones[ti];
      var s = syl[si];
      if(ti == tones.length - 1 && si == syl.length - 1 && toneList.accents > 0 && s.accent){
        ti = toneList.lastAccentI();
        if(!toneList.lastAccent().open){
          var addDots = /\./g.test(tone.all);
          tone = tones[ti];
          if(addDots && !/\./.test(tone.all)){
            var dots = '.'.repeat( tone.gabc.match(/[a-m]/gi).length );
            tone = $.extend({},tone);
            tone.gabc = tone.gabcClosed = tone.gabc.slice(0,-1) + dots + ')';
            lastOpen = true;
          }
        }
      }
      if(tone && tone.open && !tone.accent) {
        if(italic) {
          italic = false;
        }
        if(lastOpen && lastOpen.accent) {
          var count = 0;
          while(!s.accent && count < 2) {
            r=s.punctuation + tone.gabcClosed+r;
            if(!onlyVowel && useBoldItalic) {
              if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
                r=s.syl.slice(0,vow.index) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length)+r;
              } else {
                r=s.prespace + bi.bold[0] + s.sylnospace + bi.bold[1]+r;
              }
            } else {
              r=s.syl+r;
            }
            r=s.prepunctuation+r;
            --si;
            ++count;
            s = syl[si];
          }
          lastOpen = undefined;
          if(useOpenNotes) {
            r=tone.gabc.slice(0,-1) + "[ocba:1;6mm])"+r;
          } else {
            r=tone.gabcClosed+r;
          }
          r=s.punctuation+r;
          if(s.accent) {
            if(!onlyVowel && useBoldItalic) {
              if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
                r=s.syl.slice(0,vow.index) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length)+r;
              } else {
                r=s.prespace + bi.bold[0] + s.sylnospace + bi.bold[1]+r;
              }
            } else {
              r=s.syl+r;
            }
            lastAccentI = si;
          } else {
            r=s.syl+r;
          }
          r=s.prepunctuation+r;
        } else {
          lastOpen = tone;
          openCount = (lastTone && !lastTone.accent && !lastTone.open)? 1 : 0;
          ++si;
        }
      } else if(tone && tone.accent) {
        var openNoteBeforeAccent = !lastOpen && s.accent;
        italic = false;
        if(lastOpen) {
          var originalSi = si;
          while(s && !s.accent) {
            --si;
            s = syl[si];
          }
          var countToNext = lastAccentI - si;
          if(countToNext > 3 || si < 0) {
            if(countToNext > 3) {
              si = lastAccentI - 2;
            }
            s = syl[si];
            if(s)s.accent = true;
          }
          si = originalSi;
          s = syl[si];
          while(s && !s.accent) {
            if(useOpenNotes) {
              ++openCount;
              if(syl[si-1] && syl[si-1].accent && openCount > 1) {
                r=lastOpen.gabc+r;
              } else {
                r=lastOpen.gabcClosed+r;
              }
            } else {
              r=lastOpen.gabcClosed+r;
            }
            r=s.prepunctuation + s.syl + s.punctuation+r;
            --si;
            s = syl[si];
          }
          if(s && useOpenNotes && openCount <= 1) {
            r=syl[si+1].prespace+lastOpen.gabc+r;
          }
          lastOpen = undefined;
        } else if(!s.accent) {
          lastOpen = tone;
          openCount = 0;
        }
        if(s){
          r=s.punctuation + tone.gabc+r;
          if(useBoldItalic) {
            if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
              r=s.syl.slice(0,vow.index) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length)+r;
            } else {
              r=s.prespace + bi.bold[0] + s.sylnospace + bi.bold[1]+r;
            }
          } else {
            r=s.syl+r;
          }
          r=s.prepunctuation+r;
          if(!lastOpen) {
            lastAccentI = si;
          }
          if(openNoteBeforeAccent) {
            tone = tones[--ti];
            if(useOpenNotes && tone && tone.open) {
              r=s.prespace + tone.gabc.slice(0,-1) + "[ocba:1;6mm])"+r;
            }
          }
        }
      } else {
        if(lastOpen) {
          var tenorUntilAccent = false;
          var oldSi = si;
          while(si > ti && s) {
            if(s.flex) {
              if(flexEqualsTenor) {
                r=s.prepunctuation + s.syl + s.punctuation + " (" + toneList.toneFlex + ".) (,)"+r;
              } else {
                r=s.prepunctuation + s.syl + s.punctuation + " †(" + toneList.toneFlex + ".)"+r;
              }
              tenorUntilAccent = "(" + toneList.toneFlex + ")";
            } else {
              tenorUntilAccent = !s.accent && tenorUntilAccent;
              r=s.prepunctuation + s.syl + s.punctuation + (tenorUntilAccent || lastOpen.gabcClosed)+r;
            }
            --si;
            s = syl[si];
          }
          if(oldSi==si && useOpenNotes){
            r = lastOpen.gabc + r;
          }
          lastOpen = undefined;
        }
        if(!(s&&tone))break;
        r=s.punctuation + tone.gabc+r;
        if(useBoldItalic && !italic && tones[ti+1] && (tones[ti+1].accent || (tones[ti+1].open && (italicizeIntonation || si > ti || (tones[ti+2] && tones[ti+2].accent && tones[ti+3] && !tones[ti+3].open))))) {
          italic = true;
        }
        if(italic) {
          if(onlyVowel) {
            if(ti>0 && tones[ti-1].open && (vow = regexVowel.exec(s.syl))) {
              r=s.syl.slice(0,vow.index) + bi.italic[0] + vow[0] + bi.italic[1] + s.syl.slice(vow.index + vow[0].length)+r;
            } else {
              r=s.syl+r;
            }
          } else {
            r=s.prespace + bi.italic[0] + s.sylnospace + bi.italic[1]+r;
          }
        } else {
          r=s.syl+r;
        }
        r=s.prepunctuation+r;
      }
      lastTone = tone;
    }
    if(!result.shortened && ti>=0){
      var intonationLength = toneList.intonation + (toneList.variableIntonationLength||0)
      if(ti==0 && tones[ti].open) {
        finished = true;
      } else {
        if(++ti < toneList.preparatory) {
          tones = tones.slice(0,intonationLength+1).concat(tones.slice(intonationLength+1 + ti));
        } else if(!favor.intonation && toneList.variableIntonation && toneList.variableIntonationLength >= ti && syl[0].accent) {
          tones = tones.slice(toneList.variableIntonationLength);
          toneList.variableIntonationLength = 0;
        } else if(!favor.intonation) {
          tones = tones.slice(intonationLength);
          regexToneGabc.exec('');
          tones.splice(0,0,toneGabc(regexToneGabc.exec(tones[0].gabcClosed.slice(1,-1))));
          toneList.variableIntonationLength = 0;
          toneList.intonationLength = 1;
        } else if(!favor.termination && intonationLength > 0){
          var punctumMorum=(tones[tones.length-1].all.slice(-1)=='.');
          tones = tonesShort || tones.slice(0);
          tones.splice(toneListShort.intonation + (toneListShort.variableIntonationLength||0) + 1, tones.length - toneListShort.intonation - (toneListShort.variableIntonationLength||0) - 1);
          if(punctumMorum) {
            regexToneGabc.exec('');
            tones.push(toneGabc(regexToneGabc.exec(tones[tones.length-1].gabcClosed.slice(1,-1)+'.')));
          }
        }
        result.shortened=true;
        r='';
      }
    } else {
      finished = true;
    }
  }
  return (((prefix && prefix.replace(/\(([^$]*)\$c([^)]*)\)/gi,String(verseNum?("$1" + verseNum + "$2"):"")).replace(/\$c/gi,String(verseNum))) || "")
    + r + ((suffix && suffix.replace(/\(([^$]*)\$c([^)]*)\)/gi,String(verseNum?("$1" + verseNum + "$2"):"")).replace(/\$c/gi,String(verseNum))) || "")).replace(/\) ?\(([a-m]r)/g," $1");
}

function removeIntonation(t) {
  t.tones.splice(0,t.intonation);
  t.intonation = 0;
  return t;
}

function GABCTones(tones,
  intonation,
  accents,
  preparatory,
  afterLastAccent,
  toneTenor,
  toneFlex,
  variableIntonation) {
  this.tones = tones;
  this.intonation = intonation;
  this.accents = accents;
  this.preparatory = preparatory;
  this.afterLastAccent = afterLastAccent;
  this.toneTenor = toneTenor;
  this.toneFlex = toneFlex;
  this.variableIntonation = variableIntonation;
}
GABCTones.prototype.lastAccent = function(){
  if(this.accents == 0) return undefined;
  for(var i=this.tones.length - 1; i>=0; --i){
    var result = this.tones[i];
    if(result.accent) return result;
  }
};
GABCTones.prototype.lastAccentI = function(){
  if(this.accents == 0) return undefined;
  for(var i=this.tones.length - 1; i>=0; --i){
    var result = this.tones[i];
    if(result.accent) return i;
  }
}
function getGabcTones(gabc,prefix,flexEqualsTenor) {
  var evaluatable = new Evaluatable(gabc,getGabcTones,prefix);
  if(!evaluatable.isString()) return evaluatable;
  if(prefix) gabc = prefix + gabc;
  var tones = [];
  var match;
  var variableIntonation = gabc.match(/^\(([^)]+)\)\s*'/);
  var index = 0;
  regexToneGabc.exec('');
  if(variableIntonation) {
    var startIndex = variableIntonation[0].length;
    variableIntonation = variableIntonation[1].split('|');
    var temp = [];
    for(var i=0; i<variableIntonation.length; ++i) {
      var curIntonation = variableIntonation[i];
      var curTemp = [];
      regexToneGabc.exec('');
      while(match=regexToneGabc.exec(curIntonation)) {
        curTemp.push(toneGabc(match));
      }
      temp.push(curTemp);
    }
    regexToneGabc.lastIndex = startIndex
    variableIntonation = temp;
  }
  while(match=regexToneGabc.exec(gabc)) {
    tones.push(toneGabc(match));
  }
  var intonation = 0;
  var accents = 0;
  var preparatory = 0;
  var afterLastAccent = 0;
  var state=3;
  var lastOpen = undefined;
  var toneTenor;
  var toneFlex;
  var _clef = typeof(_clef)=='undefined'?'c4' : _clef;
  for(var i=tones.length - 1; i>=0; --i) {
    var ton = tones[i];
    if(ton.accent) {
      ++accents;
      state = 1;
      if(lastOpen) {
        lastOpen = undefined;
      } else if(tones[i-1].open) {
        --i;
      }
    }
    else if(ton.open) {
      toneTenor = ton.all[0];
      if(state==3) {
        afterLastAccent = 0;
        state = 1;
      }
      lastOpen = ton;
    } else if(state==3) {
      afterLastAccent++;
    } else if(state==1) {
      if(!lastOpen) {
        ++preparatory;
      } else {
        if(intonation > 0 || ton.gabcClosed != lastOpen.gabcClosed)
          ++intonation;
        continue;
      }
      lastOpen = undefined;
    }
  }
  if(toneTenor) {
    if(flexEqualsTenor) {
      toneFlex = toneTenor;
    } else {
      var clef = (_clef[0] == "f")? 6 : 1;
      clef += (parseInt(_clef.slice(-1)) * 2);
      var toneNumber = ((parseInt(toneTenor,36) - 10) + 16 - clef) % 8;
      var code = toneTenor.charCodeAt(0);
      code -= (toneNumber == 0 || toneNumber == 3)? 2 : 1;
      toneFlex = String.fromCharCode(code);
    }
  }
  return new GABCTones(tones,
                       intonation,
                       accents,
                       preparatory,
                       afterLastAccent,
                       toneTenor,
                       toneFlex,
                       variableIntonation);
}

var _getSyllables = function(text,bi) {
  if(typeof(text)!="string") {
    return text;
  }
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
var getSyllables = _getSyllables;
var _getEnSyllables = function(text){return Syl.syllabify(text);};

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

function addBoldItalic(text,accents,preparatory,sylsAfterBold,format,onlyVowel,verseNumber,prefix,suffix) {
  if(!sylsAfterBold) sylsAfterBold = 0;
  var f = bi_formats[format];
  if(!f) f = bi_formats.html;
  var verseNum = regexVerseNumber.exec(text);
  if(verseNum) {
    if(prefix)text = text.slice(verseNum[0].length);
    verseNum = parseInt(verseNum[1]);
  } else {
    verseNum = verseNumber||"";
  }
  prefix = (prefix && f.verse[0])||"";
  suffix = (suffix && f.verse[1])||"";
  var syl = getSyllables(text,f);
  var doneAccents = 0;
  var donePrep = 0;
  var sylCount = 0;
  var i=syl.length - 1;
  var lastAccentI = i + 1;
  var result = '';
  var bold = false;
  var vow;
  for(; i >= 0; --i) {
    var s = syl[i];
    if(sylCount < sylsAfterBold) {
      ++sylCount;
      if(sylCount == sylsAfterBold) {
        bold = true;
      }
      result = s.prepunctuation + s.syl + s.punctuation + result;
      continue;
    }
    if(doneAccents < accents && (s.accent || (i == lastAccentI - 2  && (i==0 || !syl[i-1].accent)))) {
      var countToNext = lastAccentI - i;
      lastAccentI = i;
      result = s.punctuation + result;
      if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
        if(!bold && doneAccents>=accents) {
          result = s.syl + result;
        } else {
          result = s.syl.slice(0,vow.index) + f.bold[0] + vow[0] + f.bold[1] + s.syl.slice(vow.index + vow[0].length) + result;
        }
      } else {
        result = s.prespace + f.bold[0] + s.sylnospace + f.bold[1] + result;
      }
      result = s.prepunctuation + result;
      ++doneAccents;
      bold = false;
    } else if(bold) {
      result = s.punctuation + result;
      if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
        result = s.syl.slice(0,vow.index) + f.bold[0] + vow[0] + f.bold[1] + s.syl.slice(vow.index + vow[0].length) + result;
        ++doneAccents;
        bold=false;
      } else {
        result = s.prespace + f.bold[0] + s.sylnospace + f.bold[1] + result;
      }
      result = s.prepunctuation + result;
    } else if(doneAccents == accents && donePrep < preparatory) {
      result = s.punctuation + result;
      if(onlyVowel) {
        if((donePrep == preparatory - 1) && (vow = regexVowel.exec(s.syl))) {
          result = s.syl.slice(0,vow.index) + f.italic[0] + vow[0] + f.italic[1] + s.syl.slice(vow.index + vow[0].length) + result;
        } else {
          result = s.syl + result;
        }
      } else {
        result = s.prespace + f.italic[0] + s.sylnospace + f.italic[1] + result;
      }
      result = s.prepunctuation + result;
      ++donePrep;
    } else {
      result = s.prepunctuation + s.syl + s.punctuation + (s.flex?f.nbsp+sym_flex:"") + result;
    }
  }
  return ((prefix && prefix.replace(/\(([^$]*)\$c([^)]*)\)/gi,String(verseNum?("$1" + verseNum + "$2"):"")).replace(/\$c/gi,String(verseNum))) || "")
    + result +
         ((suffix && suffix.replace(/\(([^$]*)\$c([^)]*)\)/gi,String(verseNum?("$1" + verseNum + "$2"):"")).replace(/\$c/gi,String(verseNum))) || "");
}
function normalizePsalm(text,includeGloriaPatri) {
  text = text.replace(/\s+$/,'');
  return includeGloriaPatri?
      (text + "\n" + gloria_patri)
    : text;
}
var _novaVulgata=null;
var regexBaseNovaVulgata=["PSALMUS ","[^\\n]*\\n((?:\\S|(\\s+(?!PSALMUS \\d)))+)(?:\\s+PSALMUS|\\s*$)"];
function getPsalm(psalmNum, includeGloriaPatri, useNovaVulgata, success) {
  if(useNovaVulgata){
    if(_novaVulgata==null){
      $.get("psalms/NovaVulgata.txt", function(data){
        _novaVulgata=data;
        getPsalm(psalmNum, includeGloriaPatri, useNovaVulgata, success);
      });
    } else {
      var regex=new RegExp(regexBaseNovaVulgata.join(psalmNum));
      var psalm = regex.exec(_novaVulgata);
      if(psalm) {
        success(normalizePsalm(psalm[1],includeGloriaPatri));
      } else {
        success("ERROR retrieving PSALMUS " + psalmNum);
      }
    }
  } else {
    var calledSuccess=false;
    psalmNum = String(psalmNum);
    if(psalmNum.length < 3) psalmNum = ("00" + psalmNum).slice(-3);
    var t = $.ajax({url:"psalms/" + psalmNum + ".txt",
      type: "GET",
      crossDomain: false,
      success: function(data) {
        if(data.responseText != undefined) {
          var temp = $(data.responseText);
          var pI = temp.length;
          while(pI >= 0 && !/p/i.test(temp[--pI].tagName)) ;
          temp = temp[pI].innerHTML.split('\n');
          for(var i in temp) {
            temp[i] = temp[i].trim();
          }
          data = temp.join(' ').replace(/\s*<br>\s*/g,"\n");
          if(data.charCodeAt(0) == 65279) data = data.slice(1);
        }
        if(data && !calledSuccess) {
          calledSuccess=true;
          success(normalizePsalm(data,includeGloriaPatri));
        }
      },
      complete: function(jqXHR, textStatus) {
        if((t != undefined && t.responseText != undefined && t.responseText === "") || textStatus == "error") return;
        var text = t.responseText;
        if(!calledSuccess) {
          calledSuccess=true;
          success(normalizePsalm(text,includeGloriaPatri));
        }
      },
      dataType:"text"
    });
  }
}
function Evaluatable(s,callback,prefix){
  this.string = s.replace(regexQuoteTernary,'$1"$2"');
  this.callback = callback;
  if(this.string.length == s.length) {
    this.eval = this.getString;
    this.isString = function(){return true;}
  } else if(callback||prefix) {
    this.string = ((callback&&'callback')||'') + '("' + (prefix||'') + '" + (' + this.string + '))';
  }
}
Evaluatable.prototype.isString = function(){return false;};
Evaluatable.prototype.getString = function(){return this.string;};
Evaluatable.prototype.eval = function(){
  callback=this.callback;
  return eval(this.string);
};

function splitLine(oLine) {
  var line = oLine.split(' * ');
  if(line.length == 3) {
    var temp = line.splice(0,2);
    line.splice(0,0,temp.join(' ' + sym_flex + ' '));
  }
  return line;
}
function shiftGabc(gabc,shift) {
  var newGabc = '';
  for(var i=gabc.length - 1; i>=0; --i) {
    var c = gabc[i];
    if(parseInt(c,23)>9)newGabc = String.fromCharCode(c.charCodeAt(0) + shift) + newGabc;
      else newGabc = c + newGabc;
  }
  return newGabc;
}
window['getPsalm'] = getPsalm;
window['getPsalmTones'] = getPsalmTones;
window['getEndings'] = getEndings;
window['applyPsalmTone'] = applyPsalmTone;
window['getSyllables'] = getSyllables;
window['addBoldItalic'] = addBoldItalic;
window['shiftGabc'] = shiftGabc;
if(exports) {
  exports.getPsalm = getPsalm;
  exports.getPsalmTones = getPsalmTones;
  exports.getEndings = getEndings;
  exports.applyPsalmTone = applyPsalmTone;
  exports.getSyllables = getSyllables;
  exports.addBoldItalic = addBoldItalic;
  exports.shiftGabc = shiftGabc;
  exports.bi_formats = bi_formats;
  exports.getEnSyllables = _getEnSyllables;
}