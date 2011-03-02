var regexVowel = /(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[iy])?([aá]u|[ao][eé]?|[aeiouyáéëíóúýæœ])/i;
var regexLatin = /(\b\s*)(((?:\b(?:s[uú]bs?|tr[aá]ns|p[oó]st|[aá]bs|[oó]bs|[eé]x|p[eé]r|[ií]n))|(?:(?:[cgq]u(?=[aeiouyáéëíóúýǽæœ])|[bcdfghjklmnprstvwxz])*([aá]u|[ao][eé]?|[eiuyáéëíóúýæœ])(?:[\wáéíóúýæœ]*(?=-)|(?=[bcdgptf][lrh][^\s$]|sc[ei]|(?:[sc]t|gn)[aeiouyáéíóúýæœ])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|([^\w\sáëéíóúýæœ]*(?:\s[:†\*\"«»‘’“”„‟‹›‛])*(?=\s|$))?)(?=(\s*|$)))/gi;
var regexAccent = /[áéíóúýǽ]/i;
var regexToneGabc = /(')?(([^\sr]+)(r)?)(?=$|\s)/gi;
var regexVerseNumber = /(\d+)\.?\s*/;
var sym_flex = '†';
var sym_med = '*';
var gloria_patri = "Glória Pátri, et Fílio, * et Spirítui Sáncto.\nSicut érat in princípio, et núnc, et sémper, * et in saécula sæculórum. Amen.";
var gloria_patri_end_vowels = "E u o* u a e.";
var algorithmTwoBefore = true; //count as an accent the syllable two prior to the next accent
var algorithmTwoAfter = false; //count as an accent the syllable two after the last accent
var o_bi_formats, bi_formats;
var o_bi_formats = 
    bi_formats = {html: {bold: ["<b>", "</b>"], italic: ["<i>", "</i>"]},
                  tex: {bold:  ["{\\textbf{", "}"], italic:  ["{\\it ", "}"]},
                  gabc: {bold: ["<b>", "</b>"], italic: ["<i>", "</i>"]},
                  "html-underline": {bold:["<u>","</u>"], italic:["<span style='border-bottom:3px double;'>","</span>"]},
                  "tex-underline": {bold:["\\uline{","}"], italic:["\\uuline{","}"]}
                 };
var g_tones = {'1':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h.",
                  solemn:"f gh hr hg ixgi h hr 'hg gh..",
                  terminations:{'D':"h hr g f 'gh gr gvFED.",
                                'D-':"h hr g f 'g gr gvFED.",
                                'D2':"h hr g f gr 'gf d.",
                                'f':"h hr g f 'gh gr gf.",
                                'g':"h hr g f 'gh gr g.",
                                'g2':"h hr g f 'g gr ghg.",
                                'g3':"h hr g f 'g gr g.",
                                'a':"h hr g f 'g hr h.",
                                'a2':"h hr g f 'g gr gh..",
                                'a3':"h hr g f 'gh gr gh.."
                               }
                 },
             '2':{clef:"f3",
                  mediant:"e f hr 'i hr h.",
                  solemn:"e fe eh hr hg hi i 'hi hr h.",
                  termination:"h hr g 'e fr f."
                 },
             '3':{clef:"c4",
                  mediant:"g hj jr 'k jr jr 'ih j.",
                  solemn:"g hj jr 'jk jr jr 'ih hj..",
                  terminations:{'b':"j jr h 'j jr i.",
                                'a':"j jr h 'j jr ih..",
                                'a2':"j jr ji hi 'h gr gh..",
                                'g':"j jr ji hi 'h gr g.",
                                'g2': "j jr h j i 'h gr g."
                               }
                 },
             '4':{clef:"c4",
                  mediant:"h gh hr g h 'i hr h.",
                  solemn:"h gh hr hg gi i 'hi hr h.",
                  terminations:{'g':"h hr 'h gr g.",
                                'E':"h hr g h ih gr 'gf e."
                               }
                 },
             '4 alt':{clef:"c3",
                      mediant:"i hi ir h i 'j ir i.",
                      solemn:"i hi ir ih hj j 'ij ir i.",
                      terminations:{'c':"i ir 'i hr h.",
                                    'A':"i ir h i j 'h fr f.",
                                    'A*':"i ir h i j 'h fr fg..",
                                    'd':"i ir h i j 'h ir i."
                                   }
                     },
             '5':{clef:"c3",
                  mediant:"d f hr 'i hr h.",
                  solemn:"d f hr i 'i hr h.",
                  termination:"h hr 'i gr 'h fr f."
                 },
             '6':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h.",
                  solemn:"f gh hr hg ixgi h hr 'hg gh..",
                  termination:"h hr f gh 'g fr f."
                 },
             '6 alt':{clef:"c4",
                      mediant:"f gh hr g 'h fr f.",
                      termination:"h hr f gh 'g fr f."
                     },
             '7':{clef:"c3",
                  mediant:"hg hi ir 'k jr 'i jr j.",
                  solemn:"ehg hi ir 'ik jr jr 'ji ij..",
                  terminations:{'a':"i ir 'j ir 'h hr gf..",
                                'b':"i ir 'j ir 'h hr g.",
                                'c':"i ir 'j ir 'h hr gh..",
                                'c2':"i ir 'j ir 'h hr ih..",
                                'd':"i ir 'j ir 'h hr gi.."
                               }
                 },
             '8':{clef:"c4",
                  mediant:"g h jr 'k jr j.",
                  solemn:"g hg gj jr ji jk k 'jk jr j.",
                  terminations:{'G':"j jr i j 'h gr g.",
                                'G*':"j jr i j 'h gr gh..",
                                'c':"j jr h j 'k jr j."
                               }
                 },
             'per.':{clef:"c4",
                     mediant:"ixhi hr g ixi h 'g fr f.",
                     termination:"g gr d 'f fr ed.."
                    },
             'V.1':{clef:"c3",
                    mediant:"h hr 'h ghvGFEfgf"
                   },
             'V.2':{clef:"c4",
                    mediant:"h hr 'h h/hf,fgwhvGFEfg/gf"
                   }
            };
var d_tones = {'1':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h",
                  solemn:"f gh hr hg ixgi h hr 'hg gh",
                  terminations:{'D':"h hr g f 'gh gr gvFED",
                                'g':"h hr g f 'gh gr g",
                                'a':"h hr g f 'g hr h"
                               }
                 },
             '2':{clef:"f3",
                  mediant:"e f hr 'i hr h",
                  solemn:"e fe eh hr hg hi i 'hi hr h",
                  termination:"h hr g 'e fr f"
                 },
             '3':{clef:"c4",
                  mediant:"g hj jr 'k jr jr 'ih j",
                  solemn:"g hj jr 'jk jr jr 'ih hj",
                  terminations:{'a':"j jr h 'j jr ih",
                                'a2':"j jr ji hi 'h gr gh"
                               }
                 },
             '4':{clef:"c4",
                  mediant:"h gh hr g h 'i hr h",
                  solemn:"h gh hr hg gi i 'hi hr h",
                  terminations:{'E':"h hr g h ih gr 'gf e"
                               }
                 },
             '4 alt':{clef:"c3",
                      mediant:"i hi ir h i 'j ir i",
                      solemn:"i hi ir ih hj j 'ij ir i",
                      terminations:{'A':"i ir h i j 'h fr f"
                                   }
                     },
             '5':{clef:"c3",
                  mediant:"d f hr 'i hr h",
                  solemn:"d f hr i 'i hr h",
                  termination:"h hr 'i gr 'h fr f"
                 },
             '6':{clef:"c4",
                  mediant:"f gh hr 'ixi hr 'g hr h",
                  solemn:"f gh hr hg ixgi h hr 'hg gh",
                  termination:"h hr f gh 'g fr f"
                 },
             '7':{clef:"c3",
                  mediant:"hg hi ir 'k jr 'i jr j",
                  solemn:"ehg hi ir 'ik jr jr 'ji ij",
                  terminations:{'a':"i ir 'j ir 'h hr gf",
                                'd':"i ir 'j ir 'h hr gi"
                               }
                 },
             '8':{clef:"c4",
                  mediant:"g h jr 'k jr j",
                  solemn:"g hg gj jr ji jk k 'jk jr j",
                  terminations:{'G':"j jr i j 'h gr g",
                                'c':"j jr h j 'k jr j"
                               }
                 },
             'per.':{clef:"c4",
                     mediant:"ixhi hr ixi h 'g fr f",
                     termination:"g gr d 'f fr ed"
                    }
            };
function syllable(match,index) {
  return typeof(match)=="string"?
         {index:index,
          all:match,
          punctuation:match,
          space: "",
          prepunctuation: "",
          word: undefined
     } : {index: match.index,
          all: match[2],
          syl: match[3],
          vowel: match[4],
          separator: match[5], // - or *
          punctuation: match[6]? (match[6][0]==":"? " " + match[6] : match[6]) : "",
          space: match[7],
          accent: match[5] == '*' || regexAccent.test(match[3]),
          prepunctuation: typeof(index) == "string"? index : "",
          word: undefined
         };
}
function toneGabc(match) {
  return {index: match.index,
          all: match[0],
          accent: match[1] == "'",
          gabc: "(" + match[2] + ")",
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
function getPsalmTones() {
  return getKeys(g_tones);
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
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.addMenu("Generate Psalm Tone", getTones());
}

function getTones() {
  var sheetTones = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tones");
  var range = sheetTones.getRange(2, 1, sheetTones.getMaxRows() - 1, 2);
  var row = range.getValues();
  var tones = [];
  for(var i in row) {
    var tone = String(row[i][0]);
    if(tone.length == 0)
      break;
    var end = String(row[i][1]);
    tones.push({name:tone + "." + end, functionName:"doToneRow1"});
  }
  return tones;
}

function getFlexGabc(mediant) {
  if(typeof(mediant)=="string") mediant = getGabcTones(mediant);
  var toneTenor = mediant.toneTenor;
  var toneFlex = mediant.toneFlex;
  return toneTenor + " " + toneTenor + "r '" + toneTenor + " " + toneFlex + "r " + toneFlex + ".";
}

function applyPsalmTone(text,gabc,useOpenNotes,useBoldItalic,onlyVowel,format) {
  var bi = format || bi_formats.gabc;
  if(useOpenNotes == undefined) {
    useOpenNotes = true;
  }
  if(useBoldItalic == undefined) {
    useBoldItalic = true;
  }
  var openCount = 0;
  var italiciseIntonation = false;
  var verseNum = regexVerseNumber.exec(text);
  if(verseNum) {
    text = text.slice(verseNum[0].length);
    verseNum = parseInt(verseNum[1]);
  }
  var syl = getSyllables(text);
  var toneList = getGabcTones(gabc);
  var tones = toneList.tones;
  var r = [];
  var si = syl.length - 1;
  var lastOpen;
  var vow;
  var italic=false;
  var lastAccentI = si + 1;
  if(toneList.intonation > 0 && syl.length < tones.length) {
    tones.splice(toneList.intonation + 1, tones.length - toneList.intonation - 1);
  }
  var lastTone;
  for(var ti = tones.length - 1; ti >= 0 && si >= 0; --ti,--si) {
    var tone = tones[ti];
    var s = syl[si];
    if(tone.open) {
      if(italic) {
        italic = false;
      }
      if(lastOpen && lastOpen.accent) {
        while(!s.accent) {
          r.push(s.punctuation + tone.gabcClosed + s.space);
          if(useBoldItalic) {
            if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
              r.push(s.syl.slice(0,vow.index) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length));
            } else {
              r.push(bi.bold[0] + s.syl + bi.bold[1]);
            }
          } else {
            r.push(s.syl);
          }
          r.push(s.prepunctuation);
          --si;
          s = syl[si];
        }
        lastOpen = undefined;
        r.push(s.space);
        if(useOpenNotes) {
          r.push(tone.gabc.slice(0,-1) + "[ocba:1;6mm])");
        } else {
          r.push(tone.gabcClosed);
        }
        r.push(s.punctuation);
        if(s.accent) {
          if(useBoldItalic) {
            if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
              r.push(s.syl.slice(0,vow.index) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length));
            } else {
              r.push(bi.bold[0] + s.syl + bi.bold[1]);
            }
          } else {
            r.push(s.syl);
          }
          lastAccentI = si;
        } else {
          r.push(s.syl);
        }
        r.push(s.prepunctuation);
      } else {
        lastOpen = tone;
        openCount = (lastTone && !lastTone.accent && !lastTone.open)? 1 : 0;
        ++si;
      }
    } else if(tone.accent) {
      var openNoteBeforeAccent = useOpenNotes && !lastOpen && s.accent;
      italic = false;
      if(lastOpen) {
        var originalSi = si;
        while(s && !s.accent) {
          --si;
          s = syl[si];
        }
        var countToNext = lastAccentI - si;
        if(countToNext > 3 || si < 0) {
          if(algorithmTwoAfter) {
            while(countToNext > 3) {
              si += 2;
              countToNext = lastAccentI - si;
            }
          } else if(algorithmTwoBefore && countToNext > 3) {
            si = lastAccentI - 2;
          }
          s = syl[si];
          s.accent = true;
        }
        si = originalSi;
        s = syl[si];
        while(!s.accent) {
          r.push(s.space);
          if(useOpenNotes) {
            ++openCount;
            if(syl[si-1].accent && openCount > 1) {
              r.push(lastOpen.gabc);
            } else {
              r.push(lastOpen.gabcClosed);
            }
          } else {
            r.push(lastOpen.gabcClosed);
          }
          r.push(s.prepunctuation + s.syl + s.punctuation);
          --si;
          s = syl[si];
        }
        if(useOpenNotes && openCount <= 1) {
          r.push(lastOpen.gabc + s.space);
        }
        lastOpen = undefined;
      } else if(!s.accent) {
        lastOpen = tone;
        openCount = 0;
      }
      r.push(s.punctuation + tone.gabc + s.space);
      if(useBoldItalic) {
        if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
          r.push(s.syl.slice(0,vow.index) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length));
        } else {
          r.push(bi.bold[0] + s.syl + bi.bold[1]);
        }
      } else {
        r.push(s.syl);
      }
      r.push(s.prepunctuation);
      if(!lastOpen) {
        lastAccentI = si;
      }
      if(openNoteBeforeAccent) {
        tone = tones[--ti];
        if(useOpenNotes && tone && tone.open) {
          r.push(tone.gabc.slice(0,-1) + "[ocba:1;6mm])");
        }
      }
    } else {
      if(lastOpen) {
        var tenorUntilAccent = false;
        while(si > ti) {
          if(s.punctuation.indexOf(sym_flex) > 0) {
            r.push(s.prepunctuation + s.syl + s.punctuation + "(" + toneList.toneFlex + ".)" + s.space);
            tenorUntilAccent = "(" + toneList.toneFlex + ")";
          } else {
            tenorUntilAccent = !s.accent && tenorUntilAccent;
            r.push(s.prepunctuation + s.syl + s.punctuation + (tenorUntilAccent || lastOpen.gabcClosed) + s.space);
          }
          --si;
          s = syl[si];
        }
        lastOpen = undefined;
      }
      r.push(s.punctuation + tone.gabc + s.space);
      if(useBoldItalic && !italic && tones[ti+1] && (tones[ti+1].accent || (tones[ti+1].open && (italiciseIntonation || si > ti || (tones[ti+2] && tones[ti+2].accent && tones[ti+3] && !tones[ti+3].open))))) {
        italic = true;
      }
      if(italic) {
        if(onlyVowel) {
          if(ti>0 && tones[ti-1].open && (vow = regexVowel.exec(s.syl))) {
            r.push(s.syl.slice(0,vow.index) + bi.italic[0] + vow[0] + bi.italic[1] + s.syl.slice(vow.index + vow[0].length));
          } else {
            r.push(s.syl);
          }
        } else {
          r.push(bi.italic[0] + s.syl + bi.italic[1]);
        }
      } else {
        r.push(s.syl);
      }
      r.push(s.prepunctuation);
    }
    lastTone = tone;
  }
  return r.reverse().join('');
}

function getGabcTones(gabc) {
  var tones = [];
  var match;
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
        state = 2;
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
    var clef = (_clef[0] == "f")? 6 : 1;
    clef += (parseInt(_clef[1]) * 2);
    var toneNumber = ((parseInt(toneTenor,36) - 10) + 16 - clef) % 8;
    var code = toneTenor.charCodeAt(0);
    code -= (toneNumber == 0 || toneNumber == 3)? 2 : 1;
    var toneFlex = String.fromCharCode(code);
  }
  return {tones: tones,
          intonation: intonation,
          accents: accents,
          preparatory: preparatory,
          afterLastAccent: afterLastAccent,
          toneTenor: toneTenor,
          toneFlex: toneFlex
         };
}

function getSyllables(text) {
  if(typeof(text)!="string") {
    return text;
  }
  var syl = [];
  var match;
  var lastI = 0;
  while(match=regexLatin.exec(text)) {
    syl.push(syllable(match,text.slice(lastI,match.index)));
    lastI = match.index + match[0].length;
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
    if(i == (len - 1) || (syl.space && syl.space.length > 0)) {
      if(curWordAccents == 0) {
        if(curWord.length == 2) {
          curWord[0].accent = true;
        } else if(curWord.length > 2) {
          if(curWord[0].vowel == curWord[0].all.substring(0,1)) {
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

function addBoldItalic(text,accents,preparatory,sylsAfterBold,format,onlyVowel) {
  if(!sylsAfterBold) sylsAfterBold = 0;
  var f = bi_formats[format];
  if(!f) f = bi_formats.html;
  var verseNum = regexVerseNumber.exec(text);
  if(verseNum) {
    text = text.slice(verseNum[0].length);
    verseNum = parseInt(verseNum[1]);
  }
  var syl = getSyllables(text);
  var doneAccents = 0;
  var donePrep = 0;
  var sylCount = 0;
  var i=syl.length - 1;
  var lastAccentI = i + 1;
  var result = [];
  var bold = false;
  var vow;
  for(; i >= 0; --i) {
    var s = syl[i];
    if(sylCount < sylsAfterBold) {
      ++sylCount;
      if(sylCount == sylsAfterBold) {
        bold = true;
      }
      result.push(s.prepunctuation + s.syl + s.punctuation + s.space);
      continue;
    }
    if(doneAccents < accents && s.accent) {
      var countToNext = lastAccentI - i;
      if(countToNext > 3) {
        if(algorithmTwoAfter) {
          while(countToNext > 3) {
            i += 2;
            result.pop();
            result.pop();
            countToNext = lastAccentI - i;
          }
        } else if(algorithmTwoBefore) {
          while (i < lastAccentI - 2) {
            result.pop();
            ++i;
          }
        }
        s = syl[i];
        s.accent = true;
      }
      lastAccentI = i;
      result.push(s.punctuation + s.space);
      if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
        result.push(s.syl.slice(0,vow.index) + f.bold[0] + vow[0] + f.bold[1] + s.syl.slice(vow.index + vow[0].length));
      } else {
        result.push(f.bold[0] + s.syl + f.bold[1]);
      }
      result.push(s.prepunctuation);
      ++doneAccents;
      bold = false;
    } else if(bold) {
      result.push(s.punctuation + s.space);
      if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
        result.push(s.syl.slice(0,vow.index) + f.bold[0] + vow[0] + f.bold[1] + s.syl.slice(vow.index + vow[0].length));
      } else {
        result.push(f.bold[0] + s.syl + f.bold[1]);
      }
      result.push(s.prepunctuation);
    } else if(doneAccents == accents && donePrep < preparatory) {
      result.push(s.punctuation + s.space);
      if(onlyVowel) {
        if((donePrep == preparatory - 1) && (vow = regexVowel.exec(s.syl))) {
          result.push(s.syl.slice(0,vow.index) + f.italic[0] + vow[0] + f.italic[1] + s.syl.slice(vow.index + vow[0].length));
        } else {
          result.push(s.syl);
        }
      } else {
        result.push(f.italic[0] + s.syl + f.italic[1]);
      }
      result.push(s.prepunctuation);
      ++donePrep;
    } else {
      result.push(s.prepunctuation + s.syl + s.punctuation + s.space);
    }
  }
  return result.reverse().join('');
}
function normalizePsalm(text) {
  var i = text.length;
  while(i >= 0) {
    var code = text.charCodeAt(--i);
    if(code != 10 && code != 13) break;
  }
  text = text.slice(0,i) + "\n" + gloria_patri;
  return text;
}
function getPsalm(psalmNum, success) {
  psalmNum = String(psalmNum);
  if(psalmNum.length < 3) psalmNum = ("00" + psalmNum).slice(-3);
  var t = $.ajax({url:(_local?"" : "http://jgabc.googlecode.com/svn/trunk/web-") + "psalms/" + psalmNum,
    type: "GET",
    crossDomain: _local?false : true,
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
      if(data) {
        success(normalizePsalm(data));
      }
    },
    complete: function(jqXHR, textStatus) {
      if((t != undefined && t.responseText != undefined && t.responseText === "") || textStatus == "error") return;
      var text = t.responseText;
      success(normalizePsalm(text));
    },
    dataType:_local?"text" : "text"});
}
function splitLine(oLine) {
  var line = oLine.split(' * ');
  if(line.length == 3) {
    var temp = line.splice(0,2);
    line.splice(0,0,temp.join(' ' + sym_flex + ' '));
  }
  return line;
}
window['getPsalm'] = getPsalm;
window['getPsalmTones'] = getPsalmTones;
window['getEndings'] = getEndings;
window['applyPsalmTone'] = applyPsalmTone;
window['getSyllables'] = getSyllables;
window['addBoldItalic'] = addBoldItalic;