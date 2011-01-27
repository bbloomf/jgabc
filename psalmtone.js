var regexLatin = /((?:s[uú]bs|tr[aá]ns|p[oó]st|[aá]bs|[oó]bs|[eé]x|(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[bcdfghjklmnprstvwxz])*([aá]u|[ao][eé]?|[eiuyáéëíóúýæœ])(?:[\wáéíóúý]*(?=-)|(?=[bcdgptf][lr])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáéíóúý])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnprstvwxz]+))?)))(?:([\*-])|([^\w\sáéíóúý]+(?=\s|$))?)(\s*|$)/gi;
var regexAccent = /[áéíóúý]/i;
var regexToneGabc = /(')?(([^\sr]+)(r)?)(?=$|\s)/gi;
var sym_flex = '†';
var sym_med = '*';
var bi_formats = {html: {bold: ["<b>", "</b>"], italic: ["<i>", "</i>"]},
                  tex: {bold:  ["{\\bf ", "}"], italic:  ["{\\it ", "}"]}
                 };
var g_tones = {'1':{mediant:"f gh hr 'ixi hr 'g hr h.",
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
			 '2':{mediant:"e f h hr 'i hr h.",
				  termination:"h hr g 'e fr f."
				 },
			 '3':{mediant:"g hj jr 'k jr jr 'ih j.",
				  terminations:{'b':"j jr h 'j jr i.",
							    'a':"j jr h 'j jr ih..",
								'a2':"j jr ji hi 'h gr gh..",
								'g':"j jr ji hi 'h gr g.",
								'g2': "j jr h j i 'h gr g."
							   }
				 },
			 '4':{mediant:"h gh hr g h 'i hr h.",
				  terminations:{'g':"h hr 'h gr g.",
							    'E':"h hr g h ih gr 'gf e."
							   }
				 },
			 '4 alt':{mediant:"i hi ir h i 'j ir i.",
				      terminations:{'c':"i ir 'i hr h.",
									'A':"i ir h i j 'h fr f.",
									'A*':"i ir h i j 'h fr fg..",
									'd':"i ir h i j 'h ir i."
								   }
					 },
			 '5':{mediant:"d f h hr 'i hr h.",
				  termination:"h hr 'i gr 'h fr f."
				 },
			 '6':{mediant:"f gh hr 'ixi hr 'g hr h.",
				  termination:"h hr f gh 'g fr f."
				 },
			 '6 alt':{mediant:"f gh hr g 'h fr f.",
				      termination:"h hr f gh 'g fr f."
				     },
			 '7':{mediant:"hg hi ir 'k jr 'i jr j.",
				  terminations:{'a':"i ir 'j ir 'h hr gf..",
								'b':"i ir 'j ir 'h hr g.",
								'c':"i ir 'j ir 'h hr gh..",
								'c2':"i ir 'j ir 'h hr ih..",
								'd':"i ir 'j ir 'h hr gi.."
				               },
				 },
			 '8':{mediant:"g h jr 'k jr j.",
				  terminations:{'G':"j jr i j 'h gr g.",
								'G*':"j jr i j 'h gr gh..",
								'c':"j jr h j 'k jr j."
							   }
				 },
			 'per.':{mediant:"ixhi hr g ixi h 'g fr f.",
				     termination:"g gr d 'f fr ed.."
				    }
			};
function syllable(match) {
  return {index: match.index,
          all: match[0],
          syl: match[1],
          vowel: match[2],
          separator: match[3], // - or *
          punctuation: match[4]? (match[4]==":"? " :" : match[4]) : "",
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
function getPsalmTones() {
	var tones = [];
	var i;
	for(i in g_tones) {
		tones.push(i);
	}
	return tones;
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

function applyPsalmTone(text,gabc) {
  var bi = bi_formats.html;
  var useOpenNotes = true;
  var openCount = 0;
  var italiciseIntonation = false;
  var syl = getSyllables(text);
  var toneList = getGabcTones(gabc);
  var tones = toneList.tones;
  var r = [];
  var si = syl.length - 1;
  var lastOpen;
  var italic=false;
  var lastAccentI = si;
  
  for(var ti = tones.length - 1; ti >= 0; --ti,--si) {
    var tone = tones[ti];
    var s = syl[si];
    if(tone.open) {
	  if(italic) {
	    r.push(bi.italic[0]);
	    italic = false;
	  }
      if(lastOpen && lastOpen.accent) {
        while(!s.accent) {
		  r.push(s.syl + s.punctuation + tone.gabcClosed + s.space);
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
        r.push(s.syl + s.punctuation);
		if(s.accent)
		  r.push(bi.bold[0]);
      } else {
        lastOpen = tone;
		openCount = 0;
        ++si;
      }
    } else if(tone.accent) {
	  var openNoteBeforeAccent = useOpenNotes && !lastOpen && s.accent;
	  italic = false;
	  if(lastOpen) {
	    var originalSi = si;
	    while(!s.accent) {
		  --si;
		  s = syl[si];
		}
		var countToNext = lastAccentI - si;
        while(countToNext > 3) {
		  si += 2;
		  s = syl[si];
		  countToNext = lastAccentI - si;
        }
		s.accent = true;
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
          r.push(s.syl + s.punctuation);
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
      r.push(s.syl + bi.bold[1] + s.punctuation + tone.gabc + s.space);
	  if(!lastOpen) {
		r.push(bi.bold[0]);
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
        while(si > ti) {
          r.push(s.syl + s.punctuation + lastOpen.gabcClosed + s.space);
          --si;
          s = syl[si];
        }
        lastOpen = undefined;
      }
      r.push(s.punctuation + tone.gabc + s.space);
	  if(!italic && tones[ti+1] && (tones[ti+1].accent || (tones[ti+1].open && (italiciseIntonation || (tones[ti+2] && tones[ti+2].accent))))) {
        r.push(bi.italic[1]);
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
	  if(isOpen) {
        isOpen = false;
	  } else if(tones[i-1].open) {
	    --i;
	  }
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
  var lastAccentI = i;
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
	  var countToNext = lastAccentI - i;
	  while(countToNext > 3) {
		i += 2;
		s = syl[i];
		countToNext = lastAccentI - i;
		len = s.all.length;
		index = s.index;
	  }
	  lastAccentI = i;
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