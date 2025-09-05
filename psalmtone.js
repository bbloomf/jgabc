var regexGabc = /(((?:([`,;:]\d*)|([cf]b?[1-4]))+)|(\S+))(?:\s+|$)/ig;
var regexVowel = /(?:[cgq]u|[iy])?([aeiouyáéëíóúýǽæœ]+)/i;
var regexLatin = /((?:<\w+>)*)(((?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽœ́æœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ]\u0301?)(?:(?:[\wáéíóúýǽæœ]\u0301?)*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]\u0301?|[bcdgptf][lrh][\wáéíóúýǽæœ]\u0301?)|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|((?:[^\w\sáëéíóúýǽæœ\u0301])*(?:\s[:;†\^\*"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/\w+>)*)/gi
var regexWords = /((?:<\w+>)*)([^a-z\xDF-\xFF\u00c0-\u024f\u1e00-\u1eff\u02C6-\u0323\u4e00-\u9fff\)\<!]*\s*"*(?=[a-z\xDF-\xFF\u00c0-\u024f\u1e00-\u1eff\u02C6-\u0323\u4e00-\u9fff(<!]))(!(?:<\w+>.*?<\/\w+>|\S+)|([a-z\xDF-\xFF\u00c0-\u024f\u1e00-\u1eff\u02C6-\u0323’\u4e00-\u9fff'*]*)(?:\(([a-z\xDF-\xFF\u00c0-\u024f\u1e00-\u1eff\u02C6-\u0323’\u4e00-\u9fff'*]+)\)([a-z\xDF-\xFF\u00c0-\u024f\u1e00-\u1eff\u02C6-\u0323’\u4e00-\u9fff'*]*))?)(=?)((?:\s*[-"'“”‘’«»„:;,.\)¿\?¡!])*)(\s+[†*])?((?:<\/\w+>\s*)*)/gi;
var regexQuoteTernary = /([?:])([^?:]*)(?=$|:)/g;
var regexAccent = /[áéíóúýǽ\u0301]/i;
var regexToneGabc = /(')?(([^\sr]+)(r)?)(?=$|\s)/gi;
var regexVerseNumber = /^(\d+)\.?\s*/;
var sym_flex = '†';
var sym_med = '*';
var gloria_patri = "Glória Patri, et Fílio, * et Spirítui Sancto.\nSicut erat in princípio, et nunc, et semper, * et in sǽcula sæculórum. Amen.";
var gloria_patri_end_vowels = "E u o* u a* e.";
var bi_formats;
var gabcStar = localStorage.gabcStar || '<v>\\greheightstar</v>';
var gabcFlex = localStorage.gabcFlex || sym_flex;
String.prototype.format = function(keys){
  return this.replace(/\$([a-z]+)/gi,function(e){return keys[e.slice(1)]||e;});
}
String.prototype.countSyllables = function() {
  return (this.match && this.match(regexLatin) || []).length;
}
Array.prototype.sum = function() { return this.reduce(function(a,b){ return a+b; }, 0) }
Array.prototype.mapSyllableCounts = function() {
  return this.map(function(substring) {
    return substring.countSyllables();
  })
}
var o_bi_formats =
    bi_formats = (function(){
                    return {
                      html: {
                        bold: ["<b>", "</b>"],
                        italic: ["<i>", "</i>"],
                        nbsp: "&nbsp;",
                        verse: ["<span style='float:left;width:25pt;text-align:right;'>($c.)&nbsp;</span>","<br/>"],
                        versesName: "$psalm-$tone.html",
                        annotation: "$tone",
                        userNotes: "$psalm"
                      },
                      tex: {
                        bold: ["\\textbf{", "}"],
                        italic: ["\\textit{", "}"],
                        nbsp: "~",
                        verse: ["\\item ",""],
                        versesName: "$psalm-$tone.tex",
                        annotation: "$tone",
                        userNotes: "$psalm"
                      },
                      gabc: {
                        bold: ["<b>", "</b>"],
                        italic: ["<i>", "</i>"],
                        nbsp: " ",
                        verse: ["($c. )",""],
                        versesName: "$psalm-$tone.gabc",
                        // makeSylSubstitutions: function(o){
                        //   return o? o.replace(_syl_subRegex,function(e){return _syl_substitutions[e]||e}) : o;
                        // },
                        annotation: "$tone",
                        userNotes: "$psalm"
                      },
                      "html-underline": {
                        bold: ["<u>","</u>"],
                        italic: ["<span style='border-bottom:3px double;'>","</span>"],
                        nbsp: "&nbsp;",
                        verse: ["($c. )",""],
                        versesName: "$psalm-$tone.html",
                        annotation: "$tone",
                        userNotes: "$psalm"
                      },
                      "tex-underline": {
                        bold: ["\\uline{","}"],
                        italic: ["\\uuline{","}"],
                        nbsp: "~",
                        verse: ["($c. )",""],
                        versesName: "$psalm-$tone.tex",
                        annotation: "$tone",
                        userNotes: "$psalm"
                      },
                      "gabc-plain": {
                        bold: ["",""],
                        italic: ["",""],
                        nbsp: " ",
                        verse: ["($c. )",""],
                        versesName: "$psalm-$tone.gabc",
                        annotation: "$tone",
                        userNotes: "$psalm"
                      },
                      "gabc-versicle": {
                        bold: ["",""],
                        italic: ["",""],
                        nbsp: " ",
                        verse: ["<v>\\Vbar</v> ,<v>\\Rbar</v> ",""],
                        versesName: "versicle.gabc",
                        annotation: "$tone",
                        userNotes: "$psalm"
                      }
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
             '2. monasticus':{clef:"f3",
                  mediant:"e f hr 'i hr h.",
                  solemn:"e fe eh hr hg hi i 'hi hr h.",
                  termination:"hr g er 'ef f."
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
             '3. antiquo':{clef:"c4",
                  mediant:"g hi ir 'k jr jr 'ih j.",
                  solemn:"g hi ir 'jk jr jr 'ih hj..",
                  terminations:{'b':"ir 'j hr hr 'j jr i.",
                                'a':"ir 'j hr hr 'j jr ih..",
                                'a2':"ir 'j hr hi 'h gr gh..",
                                'a3':"ir 'ji hr hi 'h gr gh..",
                                'g':"ir 'j hr hi 'h gr g.",
                                'g2':"ir 'ji hr hi 'h gr g."
                               }
                 },
             '4.':{clef:"c4",
                  mediant:"h gh hr g h 'i hr h.",
                  solemn:"h gh hr hg gi i 'hi hr h.",
                  terminations:{'g':"hr 'h gr g.",
                                'E':"hr g h ih gr 'gf e."
                               }
                 },
             '4. antiquo':{clef:"c4",
                  mediant:"e gh hr g h 'i hr h.",
                  solemn:"h gh hr hg gi i 'hi hr h.",
                  terminations:{'g':"hr 'h gr g.",
                                'E':"hr g h ih gr 'gf e."
                               }
                 },
             '4. alt':{clef:"c3",
                  mediant:"i hi ir h i 'j ir i.",
                  solemn:"i hi ir ih hj j 'ij ir i.",
                  terminations:{'c':"ir 'i hr h.",
                                'A':"ir h i j 'h fr f.",
                                'A*':"ir h i j 'h fr fg..",
                                'd':"ir h i j 'h ir i."
                               }
                 },
             '4. antiquo alt':{clef:"c3",
                  mediant:"f hi ir h i 'j ir i.",
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
             '6. alt':{clef:"c4",
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
         'per.-alt':{clef:"c4",
                 mediant:"ixhi hr ixi h 'g fr f.",
                 termination:"ixhi gr d 'f fr ed.."
                },
             'irregularis': {clef:"c4",
                      mediant:"f gh hr 'g fr f.",
                      terminations:{'a': "hr ixi g ixi h.",
                                    'a2':"hr 'ixi gr gr 'ixi ir h."
                                   }
                    },
         'in dir. romanus': {clef:"c3",
                  mediant:"hr g f 'h hr h.",
                  termination:"hr f."
                },
          'in dir. monasticus': {clef:"c3",
                      mediant:"hr g f 'h hr h.",
                      termination:"hr h."
                    },
			'tonus T.P.': {clef:"c3",
						mediant:"e f hr i 'i fr f.",
					termination:"hr e f 'g fr f."},
			'tonus ad Horas 2 nov ad lib.': {clef:"c4",
						mediant:"f gh hr 'g gr f.",
					termination:"hr 'g g."},
					 	
             // 'in directum (alt.)': {clef:"c4",
             //          mediant:"t[0].word.length==1?f gh hr g h.:f gh hr 'g fr f.",
             //          termination:"hr f 'g gr g."
             //        },
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
                          "termination":"jh hj jr j/ji gh ji 'h hr g."},
             'V.1':{clef:"c3",
                    mediant:"hr h g_hvGFEfgf."
                   },
             'V.2':{clef:"c4",
                    mediant:"hr h h/hf,fgwhvGFEfg/gf"
                   },
			
  'V. Solemnior':{clef:"c3",
         mediant:"hr 'hi hr h_,",
         termination: "hr f e 'f_h hr hiHGhih.ghGFE'fggf."
        }
 }
			;
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
      if(typeof(text)!="string") {
        return text;
      }
      var result=[],
          m,
          d,
          forceSyl=false,
          words=this.words,
          accentsMarked=text.match(/[a-z]\*/i),
          prefix = null,
          sylWords = [];
      lang = lang || 'en';
      regexWords.exec("");
      // in Polish, sometimes a word does not contain a vowel, and therefore has to be part of first syllable of the following word.
      preword = '';
      while((m=regexWords.exec(text)) && m[0]){
        var w=(m[5]?(m[4]+m[5]+m[6]):m[3]).toLowerCase(),
            opi=m[4]?m[4].length:0,         // opening parenthesis index
            cpi=m[5]?1+opi+m[5].length:0,   // closing parenthesis index
            ai=w.split('*'),                // accent indices
            wordSyls = [];
        sylWords.push(wordSyls);
        w = ai.join('');
        if(/^!/.test(m[3])) {
          result.push(syllable(m[3].slice(1),regexWords.lastIndex+1,{nbsp:""}))
          continue;
        }
        m[3] = m[3] && m[3].replace(/\*/g,'');
        m[5] = m[5] && m[5].replace(/\*/g,'');
        ai.pop();
        var c = 0;
        ai.forEach(function(i,j){
          ai[j] = (c += i.length);
        });
        if(forceSyl && (m[2] || m[9]))forceSyl=false;
        if(m[7] || (m[1]=='<v>' && m[2]=='\\')) forceSyl=true;
        if(forceSyl || lang === 'vi') {
          d=[];
        } else if (lang === 'zh') {
          d = w.split('').slice(0,-1).map(syl => syl.length);
        } else if(lang != 'en') {
          if(typeof(Hypher)!='undefined' && Hypher.languages[lang]) {
            d=Hypher.languages[lang].hyphenate(w).slice(0,-1).map(function(syl){return syl.length;})
            if(!d.length && !w.match(/[aeiouyæœáéíóúýǽäëïöüÿąęįǫų]/i)) {
              // no vowels in this syllable, so use this as a "pre-word", as long as there are still more words to come.
              var lastIndex = regexWords.lastIndex;
              var stillMoreWords = text.slice(lastIndex).match(regexWords);
              regexWords.lastIndex = lastIndex;
              if(stillMoreWords) {
                preword = w;
                continue;
              }
            } else if(d.length) {
              // check to make sure each syllable has a vowel:
              for(var si=0, startIndex = 0; si<=d.length; ++si) {
                var syl = w.substr(startIndex, d[si] || w.length);
                var vowelCount = syl.match(/[aeiouyæœáéíóúýǽäëïöüÿąęįǫų]/gi);
                vowelCount = vowelCount? vowelCount.length : 0;
                if(vowelCount == 0) {
                  // merge into the next syllable if there is one:
                  if(si < d.length - 1) {
                    d[si] += d[si + 1] || (w.length - d.reduce(function(a,b){return a+b;}));
                    d.splice(si + 1, 1);
                    --si;
                    continue;
                  } else {
                    // otherwise, merge into the previus syllable:
                    d.splice(si - 1, 1);
                  }
                }
                startIndex += d[si];
              }
            }
          }
        } else if(w in words){
          d=words[w];
        } else {
          if(typeof(Hypher)!='undefined' && Hypher.languages[lang]) {
            d=Hypher.languages[lang].hyphenate(w).slice(0,-1).map(function(syl){return syl.length;})
          } else {
            d=[];
          }
          if(this.queue.indexOf(w)<0)this.queue.push(w);
        }
        if(preword) {
          w = preword + ' ' + w;
          m[3] = preword + ' ' + m[3];
          if(d[0]) d[0] += preword.length + 1;
          preword = '';
        }
        var tmp=["",m[1],"",m[2]||"",m[2]||""],
            index=m.index+m[1].length+m[2].length,
            i=0,
            wi=0,
            di;
        while(i<d.length){
          tmp[9]="";
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
            tmp[6] = '*';
            ++index;
          }
          var tmpSyllable = syllable(tmp,prefix,{nbsp:""});
          prefix = null;
          tmpSyllable.word = wordSyls;
          wordSyls.push(tmpSyllable);
          result.push(tmpSyllable);
          m[2] = "";
          wi=di;
          ++i;
          tmp=["","","",""];
        }
        var ts = m[3].slice(wi);;
        tmp[2] = tmp[3] = tmp[3] + ts;
        //tmp[3] = ts;
        tmp[7] = m[8] + (m[9]||'').replace(/\s+(?:(†|\*)|!(\S+))/, ' $1$2');
        tmp[8]=" ";
        tmp[9]=m[10];
        if(ai.length) tmp[6]='*';
        tmp.index=index+wi;
        var tmpSyllable = syllable(tmp,prefix,{nbsp:""});
        tmpSyllable.word = wordSyls;
        if(w.match(/^\s*$/) || (m[1]=='<v>' && m[2]=='\\')) {
          prefix = (tmpSyllable.prepunctuation || '') + m[0];
        } else {
          prefix = null;
          wordSyls.push(tmpSyllable);
          result.push(tmpSyllable);
        }
      }
      if(lang == 'la') {
        sylWords.forEach(function(syls) {
          var word = syls.map(function(syl) { return syl.syl; }).join('');
          if(!regexAccent.test(word)) {
            if(syls.length == 2) {
              syls[0].accent = true;
            } else if(syls.length > 2) {
              syls = syls.slice(-3,-1).filter(function(syl) { return /[AEIOUYÆŒæœ]/.test(syl.syl); });
              if(syls.length === 1) syls[0].accent = true;
            }
          }
        });
        for(var i=1, lastAccent = 0; i <= result.length; ++i) {
          var curSyl = result[result.length - i];
          var nextSyl = result[result.length - i - 1];
          if(curSyl.accent) {
            lastAccent = i;
          } else if(lastAccent == i-2 && !(nextSyl && nextSyl.accent)) {
            lastAccent = i;
            curSyl.accent = true;
          }
        }
      } else if(!accentsMarked) {
        for(var i=1; i<=3; ++i) {
          var curSyl = result[result.length-i];
          if(!curSyl) break;
          var curWord = curSyl.word;
          if(curWord.length == 1) {
            curSyl.accent = true;
            break;
          } else if(curWord.length>1) {
            curWord[curWord.length-2].accent = true;
          }
        }
      }
      return result;
    },
    updateWords:function(){
      if(this.queue.length>0){
        $.getScript("//www.sourceandsummit.com/editor/legacy/syl.php?txt="+this.queue.join('+'));
        this.queue=[];
      } else {
        intUpdate=setTimeout(function(){Syl.updateWords();},5000);
      }
    },
    addResult:function(list){
      intUpdate=setTimeout(function(){Syl.updateWords();},5000);
      var array=list.split(" ");
      for(var i=0; i < array.length; ++i){
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
  var prespace=match[4]||"";
  var isAccent = (match[6] == '*' || regexAccent.test(match[3]));
  if(typeof(match)=="string"){
    if(bi && bi.makeSylSubstitutions)match = bi.makeSylSubstitutions(match);
    return {index:index,
            all:match,
            punctuation:match,
            space: "",
            syl:"",
            prepunctuation: "",
            word: undefined,
            directive: true
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
    var oTags=getTagsFrom(match[1]);
    var cTags=getTagsFrom(match[9]);
    var tmp;
    var prepunc=typeof(index) == "string"? index.replace(/(["'«»‘’“”„‟‹›‛])\s*/g,"$1"+nbsp).replace(/(\d+)\.?\s*/g,"$1."+nbsp) : "";
    var sylnospace=match[3].slice(prespace.length);
    return {index: match.index,
            all: match[2],
            syl: match[1] + (prepunc?sylnospace:match[3]) + match[9],
            vowel: match[5]||(tmp=regexVowel.exec(match[3]),(tmp&&tmp[0]||"")),
            separator: match[6], // - or *
            punctuation: /[a-z]/i.test(match[7])? "" : (match[7].replace(/\s|[\*†]$/g,"")/*.replace(/[:;"«»‘’“”„‟‹›‛]/g,nbsp+"$&")*/),  // TODO: make space before punctuation optional
            prespace: prepunc?"":prespace,
            sylnospace: sylnospace,
            space: match[8],
            accent: isAccent,
            prepunctuation: prepunc,
            word: undefined,
            oTags: oTags,
            cTags: cTags,
            elision: elision,
            flex: match[7] && match[7].match(/†$/),
            mediant: match[7] && match[7].match(/\*$/),
            pause: match[7] && match[7].match(/\^$/)
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
function getPsalmTones(tones) {
  return Object.keys(tones||g_tones);
}
function getEndings(tone) {
  var endings = [];
  var t = g_tones[tone];
  if(t && t.terminations) {
    return Object.keys(t.terminations);
  }
  return endings;
}

function getFlexGabc(mediant,clef) {
  if(typeof(mediant)=="string") mediant = getGabcTones(mediant,clef);
  var toneTenor = mediant.toneTenor;
  var toneFlex = mediant.toneFlex;
  return toneTenor + " " + toneTenor + "r '" + toneTenor + " " + toneFlex + "r " + toneFlex + ".";
}
function processGabcPrespace(prespace) {
  return prespace.replace(/\(/g, '<v>(</v>');
}
function processGabcPrespaceForWhitespace(prespace) {
  return prespace.replace(/\S*/g, '');
}
function applyPsalmTone(options) {
  var text = options.text,
      gabc = options.gabc,
      clef = options.clef,
      useOpenNotes = options.useOpenNotes || false,
      useBoldItalic = options.useBoldItalic || false,
      firstPrefix = options.firstPrefix || false,
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
    getSyllables = lang=='en' ? _getEnSyllables : _getSyllables;
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
  if(!firstPrefix && (Number(verseNum)==1)) {
    prefix = "";
  }
  tmp = suffix.split(',');
  if(tmp.length>1 && tmp.slice(-1)[0].length>0) {
    suffix = tmp[typeof(verseNum)=='number'? (verseNum-1)%tmp.length : 0];
  }
  // use <alt> as a prefix; don't consider it part of the psalm text
  var match = text.match && text.match(/<alt>(.*?)<\/alt>/);
  if(match) {
    text = text.slice(0, match.index) + text.slice(match.index + match[0].length);
    prefix = match[0] + prefix;
  }
  var syl = getSyllables(text,bi);
  var biFlex = bi.flex || ['','','',''];
  var toneList = typeof(gabc)=="string"? getGabcTones(gabc,undefined,flexEqualsTenor,clef) : gabc;
  if(typeof(toneList.eval)=="function"){
    t = syl.slice(-3).reverse();
    toneList = toneList.eval();
  }
  var toneListShort = (typeof(gabcShort)=="string"? getGabcTones(gabcShort,undefined,flexEqualsTenor,clef) : gabcShort)||toneList;
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
    var intonationLength = (typeof intonationLength=='number')? intonationLength : toneList.intonation + (toneList.variableIntonationLength||0);
    for(var ti = tones.length - 1; (ti >= 0 || lastOpen) && si >= 0; --ti,--si) {
      if(!result.shortened && ti == intonationLength && si < ti - 1) {
        // we need to break out of the loop: there aren't enough syllables to give us the entire intonation as well as at least one tone that is not part of the intonation
        break;
      }
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
                r=processGabcPrespace(s.syl.slice(0,vow.index)) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length)+r;
              } else {
                r=processGabcPrespace(s.prespace) + bi.bold[0] + s.sylnospace + bi.bold[1]+r;
              }
            } else {
              r=processGabcPrespace(s.syl)+r;
            }
            r=s.prepunctuation+r;
            --si;
            ++count;
            s = syl[si];
          }
          lastOpen = undefined;
          if(useOpenNotes) {
            r=tone.gabc.slice(0,-1) + "[ocb:1{])"+r;
          } else {
            r=tone.gabcClosed+r;
          }
          r=s.punctuation+r;
          if(s.accent) {
            if(!onlyVowel && useBoldItalic) {
              if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
                r=processGabcPrespace(s.syl.slice(0,vow.index)) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length)+r;
              } else {
                r=processGabcPrespace(s.prespace) + bi.bold[0] + s.sylnospace + bi.bold[1]+r;
              }
            } else {
              r=processGabcPrespace(s.syl)+r;
            }
            lastAccentI = si;
          } else {
            r=processGabcPrespace(s.syl)+r;
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
            si = lastAccentI - 2;
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
            r=s.prepunctuation + processGabcPrespace(s.syl) + s.punctuation+r;
            --si;
            s = syl[si];
          }
          if(s && useOpenNotes && openCount <= 1) {
            r=processGabcPrespaceForWhitespace(syl[si+1].prespace)+lastOpen.gabc+r;
          }
          lastOpen = undefined;
        } else if(!s.accent) {
          lastOpen = tone;
          openCount = 0;
        }
        if(s){
          if(useOpenNotes && (openNoteBeforeAccent || lastOpen === tone)) {
            r = "[ocb:0}])" + r;
          } else {
            r = ")" + r;
          }
          r=s.punctuation + tone.gabc.slice(0,-1) + r;
          if(useBoldItalic) {
            if(onlyVowel && (vow = regexVowel.exec(s.syl))) {
              r=processGabcPrespace(s.syl.slice(0,vow.index)) + bi.bold[0] + vow[0] + bi.bold[1] + s.syl.slice(vow.index + vow[0].length)+r;
            } else {
              r=processGabcPrespace(s.prespace) + bi.bold[0] + s.sylnospace + bi.bold[1]+r;
            }
          } else {
            r=processGabcPrespace(s.syl)+r;
          }
          r=s.prepunctuation+r;
          if(!lastOpen) {
            lastAccentI = si;
          }
          if(openNoteBeforeAccent) {
            tone = tones[--ti];
            if(useOpenNotes && tone && tone.open) {
              r=processGabcPrespaceForWhitespace(s.prespace) + tone.gabc.slice(0,-1) + "[ocb:1{])"+r;
            }
          }
        }
      } else {
        if(lastOpen) {
          var tenorUntilAccent = false;
          var oldSi = si;
          var flexAccent = false;
          while(si > ti && s) {
            if(s.pause) {
              r=s.prepunctuation + processGabcPrespace(s.syl) + s.punctuation + "(" + toneList.toneTenor + ".) (,)"+r;
            } else if(s.flex) {
              if(flexEqualsTenor) {
                r=s.prepunctuation + processGabcPrespace(s.syl) + s.punctuation + "(" + toneList.toneFlex + ".) (,)"+r;
              } else {
                r=s.prepunctuation + processGabcPrespace(s.prespace) + biFlex[2] + s.sylnospace + biFlex[3] + s.punctuation + " †(" + toneList.toneFlex + ".)"+r;
              }
              tenorUntilAccent = "(" + toneList.toneFlex + ")";
            } else {
              flexAccent = tenorUntilAccent && s.accent;
              tenorUntilAccent = !s.accent && tenorUntilAccent;
              if(tenorUntilAccent) {
                r=s.prepunctuation + processGabcPrespace(s.prespace) + biFlex[2] + s.sylnospace + biFlex[3] + s.punctuation + tenorUntilAccent + r;
              } else if(flexAccent) {
                r=s.prepunctuation + processGabcPrespace(s.prespace) + biFlex[0] + s.sylnospace + biFlex[1] + s.punctuation + lastOpen.gabcClosed + r;
              } else {
                r=s.prepunctuation + processGabcPrespace(s.syl) + s.punctuation + lastOpen.gabcClosed + r;
              }
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
        if(useBoldItalic && !italic) {
          if(tones[ti+1]) {
            italic = (tones[ti+1].accent || (tones[ti+1].open && (italicizeIntonation || si > ti || (tones[ti+2] && tones[ti+2].accent && tones[ti+3] && !tones[ti+3].open))));
          } else {
            italic = (tones[ti-1] && !tones[ti-1].open && !tones[ti-1].accent);
          }
        }
        if(italic && ti>2 && tones[ti-1].open && tones[ti-2].accent) {
          // if this is the end of a series of unaccented syllables following a prior accent, we don't want to mark it:
          italic = false;
        }
        if(italic) {
          if(onlyVowel) {
            if(ti>0 && tones[ti-1].open && (vow = regexVowel.exec(s.syl))) {
              r=processGabcPrespace(s.syl.slice(0,vow.index)) + bi.italic[0] + vow[0] + bi.italic[1] + s.syl.slice(vow.index + vow[0].length)+r;
            } else {
              r=processGabcPrespace(s.syl)+r;
            }
          } else {
            r=processGabcPrespace(s.prespace) + bi.italic[0] + s.sylnospace + bi.italic[1]+r;
          }
        } else {
          r=processGabcPrespace(s.syl)+r;
        }
        r=s.prepunctuation+r;
      }
      lastTone = tone;
    }
    if(!result.shortened && ti>=0){
      if(ti==0 && tones[ti].open) {
        finished = true;
      } else {
        if(++ti < toneList.preparatory) {
          tones = tones.slice(0,intonationLength+1).concat(tones.slice(intonationLength+1 + ti));
        } else if(!favor.intonation && toneList.variableIntonation && toneList.variableIntonationLength >= ti && syl[0].accent) {
          tones = tones.slice(toneList.variableIntonationLength);
          toneList.variableIntonationLength = 0;
        } else if((ti - 1) <= intonationLength && !favor.intonation && !favor.termination) {
          // if we made it at least to the first reciting tone and we aren't favoring the intonation, then we'll have to get rid of the intonation:
          tones = tones.slice(intonationLength);
          regexToneGabc.exec('');
          tones.splice(0,0,toneGabc(regexToneGabc.exec(tones[0].gabcClosed.slice(1,-1))));
          toneList.variableIntonationLength = 0;
          intonationLength = 0;
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
function getGabcTones(gabc,prefix,flexEqualsTenor,clef) {
  clef = clef || _clef || 'c4';
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
  for(var i=tones.length - 1; i>=0; --i) {
    var ton = tones[i];
    if(ton.accent) {
      ++accents;
      state = 1;
      preparatory = 0;
      if(lastOpen) {
        lastOpen = undefined;
      } else if(tones[i-1].open) {
        --i;
      }
    }
    else if(ton.open) {
      toneTenor = ton.all[0];
      if(state==3) {
        if(accents==0 && i==0) {
          preparatory = afterLastAccent;
        }
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
      var clefI = (clef[0] == "f")? 6 : 1;
      clef = clefI + (parseInt(clef.slice(-1)) * 2);
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
  // add any implicit accents:
  var lastAccentI = syl.length;
  for(var i=syl.length - 1; i >= 0; --i) {
    var s = syl[i];
    // if it's gone through all syllables, or it is on an accented syllable:
    if(i < 0 || s.accent) {
      // go two syllables back from the last accent seen, and add an accent as long as it is more than one syllable ahead of the current accent.
      while((lastAccentI -= 2) > i + 1) {
        syl[lastAccentI].accent = true;
      }
      lastAccentI = i;
    }
  }
  return syl;
}
var _getEnSyllables = function(text){return Syl.syllabify(text);};
var _getLaSyllables = function(text){return Syl.syllabify(text,'la');};
var getSyllables = _getLaSyllables;

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

function addBoldItalic(text,accents,preparatory,sylsAfterBold,format,onlyVowel,verseNumber,prefix,suffix,verseIndex) {
  if(!sylsAfterBold) sylsAfterBold = 0;
  var f = bi_formats[format];
  if(!f) f = bi_formats.html;
  var biFlex = f.flex || ['','','',''];
  var verseNum = regexVerseNumber.exec(text);
  if(verseNum) {
    if(prefix)text = text.slice(verseNum[0].length);
    verseNum = parseInt(verseNum[1]);
  } else {
    verseNum = verseNumber||"";
  }
  prefix = (prefix && f.verse[0])||"";
  suffix = (suffix && f.verse[1])||"";
  var tmp = prefix.split(',');
  verseIndex = verseIndex || verseNum - 1;
  if(tmp.length>1 && tmp.slice(-1)[0].length>0) {
    prefix = tmp[typeof(verseIndex)=='number'? verseIndex%tmp.length : 0];
  }
  tmp = suffix.split(',');
  if(tmp.length>1 && tmp.slice(-1)[0].length>0) {
    suffix = tmp[typeof(verseIndex)=='number'? verseIndex%tmp.length : 0];
  }
  var syl = getSyllables(text,f);
  var doneAccents = 0;
  var donePrep = 0;
  var sylCount = 0;
  var lastAccentI = syl.length;
  var result = '';
  var bold = false;
  var vow;
  for(var i=lastAccentI - 1; i >= 0; --i) {
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
        result = processGabcPrespace(s.prespace) + f.bold[0] + s.sylnospace + f.bold[1] + result;
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
        result = processGabcPrespace(s.prespace) + f.bold[0] + s.sylnospace + f.bold[1] + result;
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
        result = processGabcPrespace(s.prespace) + f.italic[0] + s.sylnospace + f.italic[1] + result;
      }
      result = s.prepunctuation + result;
      ++donePrep;
    } else if(s.flex) {
      result = s.prepunctuation + processGabcPrespace(s.prespace) + biFlex[2] + s.sylnospace + biFlex[3] + s.punctuation + f.nbsp + gabcFlex + result;
      var j = i - 2
      --i;
      while(!syl[i].accent && i >= j) {
        result = syl[i].prepunctuation + processGabcPrespace(syl[i].prespace) + biFlex[2] + syl[i].sylnospace + biFlex[3] + syl[i].punctuation + result;
        --i;
      }
      s = syl[i];
      result = s.prepunctuation + processGabcPrespace(s.prespace) + biFlex[0] + s.sylnospace + biFlex[1] + s.punctuation + result;
    } else {
      result = s.prepunctuation + s.syl + s.punctuation + result;
    }
  }
  return ((prefix && prefix.replace(/\(([^$]*)\$c([^)]*)\)/gi,String(verseNum?("$1" + verseNum + "$2"):"")).replace(/\$c/gi,String(verseNum))) || "")
    + result +
         ((suffix && suffix.replace(/\(([^$]*)\$c([^)]*)\)/gi,String(verseNum?("$1" + verseNum + "$2"):"")).replace(/\$c/gi,String(verseNum))) || "");
}
splitPsalmsMap = {
  "7"   : [10, 8],
  "9"   : {
    "": [10, 11, 13, 8],
    "monastic": [19, 23]
  },
  "17"  : {
    "": [18, 19, 17],
    "monastic": [27, 27]
  },
  "18"  : [7, 9],
  "21"  : [11, 12, 11],
  "24"  : [8, 7, 8],
  "26"  : [11, 9],
  "30"  : [10, 12, 9],
  "32"  : [11, 11],
  "33"  : [10, 12],
  "34"  : [12, 8, 12],
  "36"  : [16, 15, 11],
  "37"  : [10, 13],
  "39"  : [7, 11, 6],
  "41"  : [7, 9],
  "43"  : [10, 11, 7],
  "44"  : [11, 9],
  "48"  : [12, 9],
  "49"  : [16, 8],
  "54"  : [17, 10],
  "58"  : [10, 10],
  "65"  : [11, 8],
  "67"  : [11, 14, 13],
  "68"  : [16, 17, 9],
  "70"  : [13, 13],
  "71"  : [8, 12],
  "72"  : [9, 8, 11],
  "73"  : [10, 8, 6],
  "75"  : [6, 6],
  "76"  : [12, 8],
  "77"  : [11, 8, 16, 11, 18, 14],
  "79"  : [8, 12],
  "83"  : [7, 6],
  "88"  : [18, 18, 15],
  "93"  : [11, 12],
  "101" : [13, 10, 6],
  "102" : [12, 10],
  "103" : [13, 11, 12],
  "104" : [15, 11, 18],
  "105" : [16, 15, 16],
  "106" : [14, 16, 13],
  "108" : [12, 8, 10],
  "115&": {
    "monastic, Monday Vespers": ["116"],
  },
  "118" : {
    "": [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
    "monastic": [
      8, 8, 8, 8,
      8, 8, 8,
      8, 8, 8,
      8, 8, 8,
      8, 8, 8,
      8, 8, 8,
      8, 8, 8
    ]
  },
  "135" : [9, 18],
  "138" : {
    "": [12, 11],
    "monastic, Thursday Vespers": [9, 14]
  },
  "142" : {
    "Saturday Lauds, divided on feast days only": [8, 6]
  },
  "143" : [9, 9],
  "144" : {
    "": [7, 6, 9],
    "monastic": [9, 13]
  },
  "148&" : {
    "monastic, Lauds": ["149&150"]
  }
};
splitPsalmNames = {
  "9"  : ["Tuesday Prime", "Wednesday Prime"],
  "17" : ["Friday Prime", "Saturday Prime"],
  "144": {
    "monastic": ["Friday Vespers", "Saturday Vespers"]
  }
};
function slicePsalm(text, psalmNum, psalmPart){
  var match = /^(\d+)(?:\.(.*))?$/.exec(psalmPart);
  var psalmDivisonName = '';
  if (!match) {
    psalmPart = 0;
  } else {
    psalmPart = Number(match[1]);
    psalmDivisonName = match[2];
  }
  if(psalmPart>0){
    psalmNum = Number(psalmNum).toString();
    var start = 0;
    let split = splitPsalmsMap[psalmNum];
    if (!split.length) split = split[psalmDivisonName];
    for (var i = 0; i < psalmPart - 1; i ++) {
      start += split[i];
    }
    var end   = start + split[psalmPart-1];
    text = text.split('\n').slice(start, end).join('\n');
  }
  return text;
}
function normalizePsalm(text, psalmNum, psalmPart, includeGloriaPatri) {
  text = slicePsalm(text,psalmNum,psalmPart).replace(/\s+$/,'');
  return includeGloriaPatri? (text + "\n" + gloria_patri) : text;
}
var _novaVulgata=null;
var regexBaseNovaVulgata=["PSALMUS ","[^\\n]*\\n((?:\\S|(\\s+(?!PSALMUS \\d)))+)(?:\\s+PSALMUS|\\s*$)"];
function getPsalm(psalmNum, includeGloriaPatri, useNovaVulgata, success, fail) {
  psalmNum = String(psalmNum);
  var match = /^(\d+)(?:\.(\d+))?(?:\s+\(([^)]+)\))?$/.exec(psalmNum);
  var splits = psalmNum.split(' & ');
  var psalmPart = 0;
  if (match){
    psalmPart = (match[2] || '') + '.' + (match[3] || '');
    psalmNum  = match[1];
  } else if (splits.length > 1) {
    let successCount = 0;
    let psalms = [];
    splits.map(function(psalm, i) { getPsalm(psalm, includeGloriaPatri && (i === splits.length - 1), useNovaVulgata,
      function(psalmText) {
        ++successCount;
        psalms[i] = psalmText;
        if (successCount === splits.length) {
          success(psalms.join('\n'));
        }
      });
    });
    return;
  }
  if(useNovaVulgata){
    if(!/^\d+$/.test(psalmNum)) {
      // Canticle...
      $.get("psalms/NovaVulgata/" + psalmNum + ".txt").done(function(data){
        success(normalizePsalm(data, psalmNum, psalmPart, includeGloriaPatri));
      }).fail(function(jqXHR, textStatus){
        if (fail) {
          fail();
        } else {
          success("ERROR retrieving Canticum '" + psalmNum + "': " + textStatus);
        }
      });
    } else if(_novaVulgata==null){
      $.get("psalms/NovaVulgata.txt", function(data){
        _novaVulgata=data;
        getPsalm(psalmNum, includeGloriaPatri, useNovaVulgata, success);
      });
    } else {
      var regex=new RegExp(regexBaseNovaVulgata.join(psalmNum));
      var psalm = regex.exec(_novaVulgata);
      if(psalm) {
        setTimeout(function() { success(normalizePsalm(psalm[1], psalmNum, psalmPart, includeGloriaPatri)); });
      } else if (fail) {
        fail();
      } else {
        success("ERROR retrieving PSALMUS " + psalmNum);
      }
    }
  } else {
    var calledSuccess=false;
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
          for(var i = 0; i<temp.length; ++i) {
            temp[i] = temp[i].trim();
          }
          data = temp.join(' ').replace(/\s*<br>\s*/g,"\n");
          if(data.charCodeAt(0) == 65279) data = data.slice(1);
          data = slicePsalm(data,psalmNum,psalmPart);
        }
        if(data && !calledSuccess) {
          calledSuccess=true;
          success(normalizePsalm(data, psalmNum, psalmPart, includeGloriaPatri));
        }
      },
      complete: function(jqXHR, textStatus) {
        if((t != undefined && t.responseText != undefined && t.responseText === "") || textStatus == "error") {
          if (fail) {
            fail();
          } else {
            success("ERROR retrieving Canticum '" + psalmNum + "': " + textStatus);
          }
          return;
        }
        var text = t.responseText;
        if(!calledSuccess) {
          calledSuccess=true;
          success(normalizePsalm(text, psalmNum, psalmPart, includeGloriaPatri));
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

function maxDiff(array) {
  var diff = 0;
  for(var i=0; i < array.length - 1; ++i) {
    for(var j=i+1; j < array.length; ++j) {
      diff += Math.abs(array[i] - array[j]);
    }
  }
  return diff;
}

function splitPosition(sylCounts) {
  var totalSyllables = sylCounts.sum();
  var syllables = 0, difference, lastDifference = Infinity;
  for(var i=0; i < sylCounts.length; ++i) {
    syllables += sylCounts[i];
    difference = Math.abs(totalSyllables - syllables - syllables)
    if(difference > lastDifference) break;
    lastDifference = difference;
  }
  return i;
}

function splitLine(oLine, segments, joinString, maxSyllablesPerSegment) {
  if(typeof joinString !== 'string') joinString = ' ' + gabcFlex + ' ';
  if(!maxSyllablesPerSegment) maxSyllablesPerSegment = Infinity;
  if(!segments) segments = 2;
  var line = typeof oLine == 'string'? oLine.split(' * ') : oLine;
  if(line.length > segments) {
    if(segments === 1) {
      return [line.join(joinString)];
    }
    // Split the line so that the two segments have as close to the same number of syllables possible, favoring the length of the first segment
    var sylCounts = line.mapSyllableCounts();
    if(sylCounts.sum() > maxSyllablesPerSegment * segments) {
      segments = Math.ceil(sylCounts.sum() / maxSyllablesPerSegment);
    }
    if(segments > 3) {
      var subSegments = (segments % 3 == 0)? 3 : 2;
      var maxSubSyllables = maxSyllablesPerSegment * Math.ceil(segments / subSegments);
      var firstSplit = splitLine(line, subSegments, ' * ', maxSubSyllables, false);
      var result = [];
      for (var i = 0; i < subSegments; ++i) {
        var segs = Math.ceil((segments - result.length) / (subSegments - i));
        maxSubSyllables = maxSyllablesPerSegment * Math.ceil(segments / (subSegments * segs));
        result = result.concat(splitLine(firstSplit[i], segs, segs <= 3? joinString : ' * ', maxSubSyllables))
      }
      return result;
    }
    // if there are 3 segments right now, but we're only asking for two, always put the flex in the first segment
    var i = (line.length == 3 && (joinString == ' ' + gabcFlex + ' '))? 2 : splitPosition(sylCounts, maxSyllablesPerSegment);
    if(segments === 2 && Math.max(sylCounts.slice(i).sum(), sylCounts.slice(0,i).sum()) > maxSyllablesPerSegment) {
      segments = 3;
    }
    if(segments === 3) {
      var maxI = sylCounts.length - 2, difference, lastDifference = Infinity, j, lastJ;
      i = 1;
      while(i <= maxI) {
        j = i + splitPosition(sylCounts.slice(i));
        difference = maxDiff([sylCounts.slice(0,i).sum(), sylCounts.slice(i, j).sum(), sylCounts.slice(j).sum()]);
        if(difference > lastDifference) break;
        lastDifference = difference;
        lastJ = j;
        ++i;
      }
      --i;
      return [line.slice(0,i).join(joinString), line.slice(i,lastJ).join(joinString), line.slice(lastJ).join(joinString)];
    }
    return [line.slice(0,i).join(joinString), line.slice(i).join(joinString)];
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
