var regexLatin = /((?:s[uú]bs|tr[aá]ns|p[oó]st|[aá]bs|[oó]bs|[eé]x|(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[bcdfghjklmnprstvwxz])*([aá]u|[ao][eé]?|[eiuyáéëíóúýæœ])(?:[\wáéíóúý]*(?=-)|(?=[bcdgptf][lr])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáéíóúý])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnprstvwxz]+))?)))(?:([\*-])|([^\w\sáéíóúý]+(?=\s|$))?)(\s*|$)/gi;
var regexAccent = /[áéíóúý]/i;
var regexToneGabc = /(')?(([^\sr]+)(r)?)(?=$|\s)/gi;
var sym_flex = '†';
var sym_med = '*';
var bi_formats = {html: {bold: ["<b>", "</b>"], italic: ["<i>", "</i>"]},
                  tex: {bold:  ["{\\bf ", "}"], italic:  ["{\\it ", "}"]}
                 };
function syllable(match) {
  return {index: match.index,
          all: match[0],
          syl: match[1],
          vowel: match[2],
          separator: match[3], // - or *
          punctuation: match[4]? match[4] : "",
          space: match[5],
          accent: match[3] == '*' || regexAccent.test(match[2])
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

function applyPsalmTone(text,gabc) {
  var italiciseIntonation = false;
  var syl = getSyllables(text);
  var toneList = getGabcTones(gabc);
  var tones = toneList.tones;
  var r = [];
  var si = syl.length - 1;
  var lastOpen;
  var italic=true;
  for(var ti = tones.length - 1; ti >= 0; --ti,--si) {
    var tone = tones[ti];
    var s = syl[si];
    if(tone.open) {
	  if(italic) {
	    r.push("<i>");
	    italic = false;
	  }
      if(lastOpen && lastOpen.accent) {
        while(!s.accent) {
          r.push(s.space);
          r.push(tone.gabcClosed);
          r.push(s.syl);
          --si;
          s = syl[si];
        }
        lastOpen = undefined;
        r.push(s.space);
        r.push(tone.gabcClosed);
        r.push(s.syl);
		if(s.accent)
		  r.push("<b>");
      } else {
        lastOpen = tone;
        ++si;
      }
    } else if(tone.accent) {
	  italic = false;
	  if(lastOpen) {
        while(!s.accent) {
          r.push(s.space);
          r.push(lastOpen.gabcClosed);
          r.push(s.syl);
          --si;
          s = syl[si];
        }
        lastOpen = undefined;
      } else if(!s.accent) {
        lastOpen = tone;
      }
      r.push(s.space);
      r.push(tone.gabc);
	  r.push("</b>");
      r.push(s.syl);
	  if(!lastOpen) {
		r.push("<b>");
      }
    } else {
      if(lastOpen) {
        while(si > ti) {
          r.push(s.space);
          r.push(lastOpen.gabcClosed);
          r.push(s.syl);
          --si;
          s = syl[si];
        }
        lastOpen = undefined;
      }
      r.push(s.space);
      r.push(tone.gabc);
	  if(!italic && tones[ti+1] && (tones[ti+1].accent || (tones[ti+1].open && italiciseIntonation))) {
        r.push("</i>");
		italic = true;
	  }
      r.push(s.syl);
    }
  }
  if(italic) r.push("<i>");
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
  var isOpen = false;
  for(var i=tones.length - 1; i>=0; --i) {
    var ton = tones[i];
    if(ton.accent) {
      ++accents;
      state = 1;
      isOpen = false;
    }
    else if(ton.open) {
      if(state==3) {
        afterLastAccent = 0;
        state = 2;
      }
      isOpen = true;
    } else if(state==3) {
      afterLastAccent++;
    } else if(state==1) {
      if(!isOpen) {
        ++preparatory;
      } else {
        ++intonation;
        continue;
      }
      isOpen = false;
    }
  }
  return {tones: tones,
          intonation: intonation,
          accents: accents,
          preparatory: preparatory,
          afterLastAccent: afterLastAccent
         };
}

function getSyllables(text) {
  var syl = [];
  var match;
  while(match=regexLatin.exec(text)) {
    syl.push(syllable(match));
  }
  getWords(syl);
  return syl;
}

function getWords(syls) {
  var len = syls.length;
  var curWord = [];
  var r = [];
  for(var i = 0; i < len; ++i) {
    var syl = syls[i];
	curWord.push(syl);
	if(i == (len - 1) || (syl.space && syl.space.length > 0)) {
	  if(curWord.length == 2 && !curWord[0].accent && !curWord[1].accent) {
	    curWord[0].accent = true;
	  }
	  r.push(curWord);
	  curWord = [];
	}
  }
  return r;
}

function addBoldItalic(text,accents,preperatory,sylsAfterBold,format) {
  if(!sylsAfterBold) sylsAfterBold = 0;
  var f = bi_formats[format];
  if(!f) f = bi_formats.html;
  var syl = getSyllables(text);
  var doneAccents = 0;
  var donePrep = 0;
  var index = text.length;
  var len;
  var sylCount = 0;
  var sylEndIndex = 0;
  var i=syl.length - 1;
  for(; i >= 0 && doneAccents < accents; --i) {
    var s = syl[i];
    len = s.all.length;
    index = s.index;
    if(sylCount < sylsAfterBold) {
      ++sylCount;
      if(sylCount == sylsAfterBold) {
        sylEndIndex = index;
      }
      continue;
    }
    if(s.accent) {
      var stext = s.syl;
      if(sylEndIndex != 0) {
        len = sylEndIndex - index;
        stext = text.substr(index,len);
        sylEndIndex = 0;
      }
      text = text.substr(0,index) + f.bold[0] + stext + f.bold[1] + s.punctuation + s.space + text.substr(index + len);
      ++doneAccents;
    }
  }
  len = index;
  for(; i >= 0 && donePrep < preperatory; --i) {
    index -= syl[i].all.length;
    ++donePrep;
  }
  if(donePrep > 0) {
    len = len - index;
    text = text.substr(0,index) + f.italic[0] + text.substr(index,len) + f.italic[1] + text.substr(index+len);
  }
  return text;
}