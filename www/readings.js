var selLang = 'english';
var custom_tones={english:{},latin:{}};
var gSyl,syl,_clef;
var last_syl,last_gSyl,gShortMediant;
var last_lines,last_terTones,last_medTones;
var useFormat,onlyVowels,gabcFormat,usePunctaCava=false;
function updateEditor(forceGabcUpdate,_syl) {
  var actuallyUpdate=(typeof(_syl)=="undefined");
  if(!syl) syl = $("#versetext").val();
  _syl = _syl || syl;
  var sameSyl = (_syl == last_syl);
  var lines = sameSyl? last_lines : splitSentences(_syl);
  var gReciting,gFlex,gMediant,gFullStop,gQuestion,gTermination;
  gReciting = $("#txtRecitingTone").val();
  var flexTone = $("#txtFlexTone").val();
  var prefix = gReciting+"r ";
  var recitingTone = gReciting.replace(/^.+\s(\S+)$/,'$1');
  var gPause = prefix + recitingTone + ".";
  gFlex = prefix + "'" + recitingTone + " " + flexTone + "r " + flexTone;
  gFlex = "t[0].accent?" + prefix + flexTone + ":" + gFlex;
  
  var question = $("#txtQuestion").val();
  var conclusion = $("#txtConclusion").val();
  var mediant = $("#txtMediant").val();
  var fullStop = $("#txtFullStop").val()
  
  var splitTone = function(gabc) {
    var tmp = gabc.replace(/^([,;])/,' $1').split(/\s*(?=[,;])/);
    var result = [getGabcTones(tmp[0] || mediant,prefix)];
    for(var i=1; i < tmp.length; ++i){
      result.push(tmp[i].slice(0,1))
      result.push(getGabcTones(tmp[i].slice(1).trim()));
    }
    return result;
  }
  gQuestion = splitTone(question);
  gConclusion = splitTone(conclusion || fullStop);
  gFullStop = splitTone(fullStop);

  gMediant = getGabcTones(mediant,prefix);

  var gabc;
  if(!sameSyl || forceGabcUpdate) {
    last_lines = lines;
  }
  
  gabc = ' (::)';
  var psalmToneStack = gConclusion;
  for(var i = lines.length - 1; i>=0; --i){
    var line = lines[i][1];
    var punctuation = lines[i][2];
    punctuation = (punctuation.match(/[+^`]/) || punctuation)[0]
    var loop = false;
    do{
      psalmTone = psalmToneStack.pop();
      loop = (typeof(psalmTone) == "string");
      if(loop) {
        switch(punctuation){
          case '.':
          case '!':
          case '?':
            psalmTone = ':';
            break;
          case ':':
            if(psalmTone.match(/^[;:,]$/)) break;
            psalmTone = (line.slice(-2,-1) == ':')? ':' : ';';
            break;
          case '+':
          case '^':
          case ',':
          case '`':
            if(psalmTone.match(/^[;:,]$/)) break;
            psalmTone = ',';
            break;
          default:
            if(psalmTone.match(/^[;:,]$/)) break;
            if(line.match(/[a-z]$/i)) {
              psalmTone = ',';
            } else {
              psalmTone = ';';
            }
        }
        gabc = ' (' + psalmTone + ') ' + gabc;
      }
    } while(loop);
    if(!psalmTone){
      switch(punctuation){
        case '.':
        case '!':
          psalmToneStack = gFullStop.slice(0);
          psalmTone = psalmToneStack.pop();
          gabc = ' (:) ' + gabc;
          break;
        case ':':
          if(line.slice(-2,-1) == ':'){
            line = line.slice(0,-1);
            psalmToneStack = gFullStop.slice(0);
            psalmTone = psalmToneStack.pop();
            gabc = ' (:) ' + gabc;
          } else {
            psalmTone = gMediant;
            gabc = ' (;) ' + gabc;
          }
          break;
        case '?':
          psalmToneStack = gQuestion.slice(0);
          psalmTone = psalmToneStack.pop();
          var match;
          if(i==0 || lines[i-1][1].match(/\?['"‘“’”]?$/)) {
            // try to find an earlier place in this sentence to put the pause.
            var indexComma = 1 + lines[i][1].lastIndexOf(', ');
            if(indexComma == 0) {
              indexComma = lines[i][1].indexOf(' ');
            }
            if(indexComma < 0) {
              psalmToneStack = [];
            } else {
              lines.splice(i++,0,['',line.slice(0,indexComma).trim(),'']);
              line = line.slice(indexComma+1).trim();
            }
          } else if((match = line.match(/(['"‘“])[a-z].+?(\1|[”’])$/i))) {
            // the question tone should not start before the quotation.
            var search = match[2];
            switch(search) {
              case '’':
                search = '‘';
                break;
              case '”':
                search = '“';
                break;
            }
            search = " " + search;
            var indexComma = line.lastIndexOf(search,line.length-2);
            if(indexComma>=0) {
              lines.splice(i++,0,['',line.slice(0,indexComma).trim(),'']);
              line = line.slice(indexComma+1).trim();
            }
          }
          gabc = ' (:) ' + gabc;
          break;
        case '+':
          if(flexTone) {
            psalmTone = gFlex;
            gabc = ' †(,) ' + gabc;
            break;
          } // otherwise, fall through to next case...
        case '^':
          psalmTone = gPause;
          gabc = ' (,) ' + gabc;
          break;
        case '`':
          psalmTone = gPause.slice(0, -1);
          gabc = ' (,) ' + gabc;
          break;
        case '~':
          line = line.slice(0,-1);
        default:
          psalmTone = gMediant;
          gabc = ' (;) ' + gabc;
      }
    }
    gabc = applyPsalmTone(
      {
        text: line,
        gabc: psalmTone,
        useOpenNotes: usePunctaCava,
        useBoldItalic: true,
        onlyVowel: onlyVowels,
        format: gabcFormat,
        verseNumber: "",
        prefix: false,
        suffix: false,
        italicizeIntonation: false,
        favor: 'termination'
      }) + gabc;
  }
  var header = getHeader(localStorage.readingHeader||'');
  delete header.name;
  delete header.mode;
  header["centering-scheme"] = selLang;
  gabc=header+ '(' + _clef + ') ' + gabc;
  $("#txtGabc").val(gabc);
  $("#txtGabc").keyup();
}

function keyupTxtGabc() {
  gSyl = $("#versegabc").val();
  updateCustomTone();
  updateEditor();
}

function updateText() {
  localStorage.text = syl = $("#versetext").val();
  updateEditor();
}

function shiftGabc(gabc,shift) {
  var newGabc = [];
  for(var i=gabc.length - 1; i>=0; --i) {
    var c = gabc[i];
    if(parseInt(c,23)>9)newGabc.push(String.fromCharCode(c.charCodeAt(0) + shift));
      else newGabc.push(c);
  }
  return newGabc.reverse().join("");
}

function updateClef() {
  var clef = $("#txtClef").val();
  if(clef.length < 2)return;
  var baseClefI = parseInt(_clef[1],10);
  var clefI = parseInt(clef[1],10);
  var diff = (clefI - baseClefI) * 2;
  
  var tone = $("#selTones").val();
  var t = g_tones[selLang][tone];
  var solemn = $("#cbSolemn")[0].checked;
  if(t.solemn || t.simple) {
    if(solemn && t.solemn) t = t.solemn;
    else t = t.simple;
  }
  
  var baseClefI=parseInt(t.clef[1],10);
  diff = (clefI - baseClefI) * 2;
  //gShortMediant = getGabcTones(shiftGabc(t.shortMediant||t.solemn||t.mediant,diff));
  
  //gSyl = vgabc;
  _clef = clef;
  updateEditor();
}

function updateFormat() {
  var oldGabcFormat = gabcFormat;
  var oldFormat = useFormat;
  useFormat = $("#selFormat").val();
  gabcFormat = bi_formats["gabc-" + useFormat.slice(useFormat.lastIndexOf("-")+1)];
  localStorage.selFormat = useFormat;
  $("#btnDelFormat").val(((useFormat in o_bi_formats)? "Reset" : "Delete") + " Current Format");
  var f = bi_formats[useFormat];
  $("#txtBeginPrep").val(f.italic[0]);
  $("#txtEndPrep").val(f.italic[1]);
  $("#txtBeginAccented").val(f.bold[0]);
  $("#txtEndAccented").val(f.bold[1]);
  $("#txtNbsp").val(f.nbsp);
  $("#txtVersesFilename").val(f.versesName);
  $("#txtPrefix").val(f.verse[0]||"");
  $("#txtSuffix").val(f.verse[1]||"");
  updateEditor((JSON.stringify(gabcFormat) != JSON.stringify(oldGabcFormat)) || useFormat.match(/gabc(?=$|-)/) || oldFormat.match(/gabc(?=$|-)/));
}
function storeBiFormatsAndUpdate() {
  localStorage.bi_formats = JSON.stringify(bi_formats);
  updateEditor(useFormat.match(/gabc(?=$|-)/));
}
function updateBeginAccented() {
  bi_formats[useFormat].bold[0] = $("#txtBeginAccented").val();
  storeBiFormatsAndUpdate();
}
function updateEndAccented() {
  bi_formats[useFormat].bold[1] = $("#txtEndAccented").val();
  storeBiFormatsAndUpdate();
}
function updateBeginPrep() {
  bi_formats[useFormat].italic[0] = $("#txtBeginPrep").val();
  storeBiFormatsAndUpdate();
}
function updateEndPrep() {
  bi_formats[useFormat].italic[1] = $("#txtEndPrep").val();
  storeBiFormatsAndUpdate();
}
function updateNbsp() {
  bi_formats[useFormat].nbsp = $("#txtNbsp").val();
  storeBiFormatsAndUpdate();
}
function updateVersesFilename(){
  bi_formats[useFormat].versesName = $("#txtVersesFilename").val();
  storeBiFormatsAndUpdate();
}

function updatePrefix() {
  bi_formats[useFormat].verse[0] = $("#txtPrefix").val();
  storeBiFormatsAndUpdate();
}

function updateSuffix() {
  bi_formats[useFormat].verse[1] = $("#txtSuffix").val();
  storeBiFormatsAndUpdate();
}

function updateCustomTone(name){
  var selTone = $("#selTones").val();
  if(!name && !(selTone in custom_tones[selLang])) {
    $("#btnDelTone").attr("disabled",true);
    return;
  }
  name=name||selTone;
  $("#btnDelTone").attr("disabled",false);
  var customTone = {
    clef: $("#txtClef").val(),
    recitingTone: $("#txtRecitingTone").val(),
    flexTone: $("#txtFlexTone").val(),
    mediant: $("#txtMediant").val(),
    fullStop: $("#txtFullStop").val(),
    question: $("#txtQuestion").val(),
    conclusion: $("#txtConclusion").val()
  };
  var solemn = $("#cbSolemn")[0].checked;
  custom_tones[selLang][name] = custom_tones[selLang][name] || {};
  custom_tones[selLang][name][solemn? 'solemn' : 'simple'] = customTone;
  g_tones[selLang]=$.extend({},g_tones[selLang],custom_tones[selLang]);
  localStorage.customReadingTones = JSON.stringify(custom_tones);
  return g_tones[selLang][name][solemn? 'solemn' : 'simple'];
}
function newTone(){
  var name = prompt("Please enter a name for the new custom tone");
  while(name.length>0 && name in g_tones[selLang]) {
    name = prompt("There is already a tone named '" + name + "'.  Please enter a new name.");
  }
  if(name.length > 0) {
    updateCustomTone(name);
    $("#selTones optgroup").empty().append('<option>' + getPsalmTones(custom_tones[selLang]).join('</option><option>') + '</option>');
    $("#selTones").val(name);
    localStorage.tone = name;
  }
}
function deleteTone() {
  var name = $("#selTones").val();
  var onlyReset = (name in o_g_tones[selLang]);
  var q = "Really " + (onlyReset?"reset":"delete") + " the tone '" + name + "'?";
  if(confirm(q)) {
    delete custom_tones[selLang][name]
    if(onlyReset) {
      g_tones[selLang][name] = $.extend(true,{},o_g_tones[selLang][name]);
    } else {
      delete g_tones[selLang][name];
      var sel = $("#selTones")[0];
      $(sel).find("option:eq("+sel.selectedIndex+")").remove();
      var ttones=getPsalmTones(custom_tones[selLang]);
      ttones = ttones.length? '<option>' + ttones.join('</option><option>') + '</option>' : '';
      $("#selTones optgroup").empty().append(ttones);
    }
    localStorage.customReadingTones = JSON.stringify(custom_tones);
  }
}

function newFormat() {
  var name = prompt("Please enter a name for the new custom format");
  while(name.length>0 && name in bi_formats) {
    name = prompt("There is already a format named '" + name + "'.  Please enter a new name.");
  }
  if(name.length > 0) {
    bi_formats[name] = {italic:["_","_"],bold:["*","*"],nbsp:" ",verse:["$c. ",""]};
    $("#selFormat").append('<option>' + name + '</option>');
    $("#selFormat").val(name);
    updateFormat();
  }
}
function deleteFormat() {
  var onlyReset = (useFormat in o_bi_formats);
  var q = "Really " + (onlyReset?"reset":"delete") + " the format '" + useFormat + "'?";
  if(confirm(q)) {
    if(onlyReset) {
      bi_formats[useFormat] = $.extend(true,{},o_bi_formats[useFormat]);
    } else {
      delete bi_formats[useFormat];
      var sel = $("#selFormat")[0];
      $(sel.childNodes[sel.selectedIndex]).remove();
    }
    localStorage.bi_formats = JSON.stringify(bi_formats);
    updateFormat();
  }
}

function updateOnlyVowels() {
  localStorage.cbOnlyVowels = onlyVowels = $("#cbOnlyVowels")[0].checked;
  updateEditor(true);
}
function updateUsePunctaCava() {
  localStorage.cbUsePunctaCava = usePunctaCava = false;//$("#cbUsePunctaCava")[0].checked;
  updateEditor(true);
}
function versesFilename(format,psalmNum,tone,ending,solemn){
  var tone = tone.replace(/\./g,'');
  var match = tone.match(/\d+/);
  if(match)tone=match[0];
  tone = (solemn?"solemn":"") + tone + (ending? ending.replace(/\*/,"star") : '');
  return format && format.versesName?format.versesName.format(
    {"psalm":psalmNum,
      "tone":tone
    }) : psalmNum + '-' + tone + ".txt";
}

function updateLocalHeader() {
  var gabc = $("#txtGabc").val();
  var header=getHeader(gabc);
  localStorage.readingHeader=header;
}
function windowResized(){
  var $cp = $("#chant-parent2");
  var totalHeight = $(window).height() - $cp.position().top - 10;
  totalHeight = Math.max(120,totalHeight);
  $cp.height(totalHeight);
  if(exsurge.layoutMyChant) exsurge.layoutMyChant();
}
var splitSentences = (function(){
  var countAccents = function(gabc) {
    gabc = (gabc||"").replace(/^([,;:])/,' $1').split(/\s*(?=[,;:])/).slice(-1)[0];
    return (gabc.match(/'[a-m]/g) || ['']).length;
  }

  var sentenceRegex = /((?:,(?![,\r\n])["'“”‘’]?|[^\^`~+.?!;:,])+($|,(?=[,\r\n])|[+^`~.?!;:](?:\s*[:+^`])?["'“”‘’]*)),?\s*/gi;
  return function(text){
    var question = countAccents($("#txtQuestion").val());
    var mediant = countAccents($("#txtMediant").val());
    var fullStop = countAccents($("#txtFullStop").val());
    var flex = countAccents($("#txtFlexTone").val());
    var result = [];
    var m;
    while((m=sentenceRegex.exec(text))){
      switch(m[2]) {
        case '.':
        case '!':
          m.accents = fullStop;
          break;
        case '?':
          m.accents = question;
          break;
        case '+':
          m.accents = flex;
        case ',':
        case ':':
          m.accents = mediant;
          break;
        default:
          m.accents = 1;
      }
      result.push(m);
    }
    return result;
  };
})()
var updateTone = function(){
  var tone = g_tones[selLang][$("#selTones").val()];
  var solemn = $("#cbSolemn")[0].checked;
  localStorage.cbSolemn = solemn;
  localStorage.tone = $("#selTones").val();
  if(tone.solemn || tone.simple) {
    if(solemn && tone.solemn) tone = tone.solemn;
    else tone = tone.simple;
    if(!tone) tone = updateCustomTone()
  }
  _clef = tone.clef;
  $("#txtClef").val(tone.clef);
  $("#txtRecitingTone").val(tone.recitingTone);
  $("#txtFlexTone").val(tone.flexTone||'');
  $("#txtMediant").val(tone.mediant);
  $("#txtFullStop").val(tone.fullStop);
  $("#txtQuestion").val(tone.question);
  $("#txtConclusion").val(tone.conclusion);
  updateEditor();
}
var readingTones;
$(function() {
  o_g_tones = readingTones = {
    'english': {
      'Gospel': {
        simple: {
          'clef':'c3',
          'recitingTone':'h',
          'mediant': "f h g 'gr hr h.",
          'fullStop': "'hr fr f.",
          'question': "h. , gr f g 'gh hr h.",
          'conclusion': "'fh hr h. , gr 'gh hr h."
        },
        solemn: {
          'clef':'c4',
          'recitingTone':'h',
          'mediant': "f h g 'gr hr h.",
          'fullStop': "'hr gr g.",
          'question': "h. , gr f g 'gh hr h.",
          'conclusion': "'fh hr h. , gr 'gh hr h."
        }
      },
      'Old Testament and Acts': {
        'clef':'c4',
        'recitingTone':'j',
        'mediant': "'jr hr h.",
        'fullStop': "'jr fr f.",
        'question': "j. , ir h i 'ij jr j.",
        'conclusion': "'jr fr f."
      },
      'Epistle and Book of Revelation': {
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "f h g 'gr hr h.",
        'fullStop': "t[0].accent?'hig fr g 'g.:'hig gr 'f gr g.",
        'question': "h. , gr f g 'gh hr h.",
        'conclusion': "f 'fh hr h. , gr 'gh hr h."
      },
      'Presidential Prayer': {
        simple: {
          "clef": "c3",
          "recitingTone": "h",
          "flexTone": "f",
          "mediant": "g f 'h hr h.",
          "fullStop": "t[0].accent?d.:'hr dr d.",
          "question": "h. , gr f g gh",
          "conclusion": "t[0].accent?f.:'hr fr f."
        },
        solemn: {
          "clef": "c4",
          "recitingTone": "g h",
          "flexTone": "g",
          "mediant": "'hr gr g.",
          "fullStop": "g g 'h hr h.",
          "question": "h. , gr f g gh",
          "conclusion": "g g 'h hr h. ; hr g h hg g."
        }
      }
    },
    'latin': {
      'Prophecy': {
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "((t[0].word&&t[0].word.length==1)||t[0].accent)?f hg..:'h hr g.",
        'fullStop': "((t[0].word&&t[0].word.length==1)||t[0].accent)?f g.:(t[1]&&t[1].accent)?h. d.:'h dr d.",
        'question': "h. , gr f g gh..",
        'conclusion': "'i hr 'gxg gr g."
      },
      'Epistle': {
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "f 'h gr 'g hr h.",
        'fullStop': "'hi gr 'f gr g.",
        'question': "h. , gr f g gh..",
        'conclusion': "'fh hr h. , ((t[0].word&&t[0].word.length==1)||t[0].accent)?gr gh..:gr 'gh hr h."
      },
      'Gospel': {
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "h.",
        'fullStop': "f h h h.",
        'question': "h. , gr f g gh..",
        'conclusion': "h. , hr 'f!gwh hr 'h hr h."
      },
      'Gospel Tone ad libitum': {
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "f 'h gr 'g hr h.",
        'fullStop': "((t[0].word&&t[0].word.length==1)||t[0].accent)?hf..:'hf fr f.",
        'question': "h. , gr f g gh..",
        'conclusion': "'fh hr h. , gr 'gh hr h."
      },
      'Gospel, more ancient': {
        'clef':'c4',
        'recitingTone':'h',
        'mediant': "f 'h gr 'g hr h.",
        'fullStop': "((t[0].word&&t[0].word.length==1)||t[0].accent)?g.:'g gr g.",
        'question': "h. , gr f g gh..",
        'conclusion': "'fh hr h. , gr 'gh hr h."
      },
      'Lesson Ordinary Tone':{
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "((t[0].word&&t[0].word.length==1)||t[0].accent)?f hg..:'h hr g.",
        'fullStop': "((t[0].word&&t[0].word.length==1)||t[0].accent)?f g.:(t[1]&&t[1].accent)?h. d.:'h dr d.",
        'question': "h. , gr f g gh..",
        'conclusion': "g f 'h hr h. , (t[1]&&t[1].accent)?hr h. d.:hr 'h dr d."
      },
      'Lesson Solemn Tone ad libitum':{
        'clef':'c3',
        'recitingTone':'h',
        'flexTone': 'f',
        'mediant': "((t[0].word&&t[0].word.length==1)||t[0].accent)?g f h.:g f 'h hr h.",
        'fullStop': "((t[0].word&&t[0].word.length==1)||t[0].accent)?f g.:e 'f dr d.",
        'question': "h. , gr f g gh..",
        'conclusion': "g f 'h hr h. , hr e 'f dr d."
      },
      'Lesson Ancient Tone':{
        'clef':'c4',
        'recitingTone':'h',
        'flexTone':'f',
        'mediant': "((t[0].word&&t[0].word.length==1)||t[0].accent)?g f h.:g f 'h hr h.",
        'fullStop': "((t[0].word&&t[0].word.length==1)||t[0].accent)?f g.:f 'g dr d.",
        'question': "h. , gr f g gh..",
        'conclusion': "g f 'h hr h. , hr f 'g dr d."
      },
      'Chapter':{
        'clef':'c3',
        'recitingTone':'h',
        'mediant': "((t[0].word&&t[0].word.length==1)||t[0].accent)?g f h.:g f 'h hr h.",
        'fullStop': "'f er ef..",
        'question': "h. , gr f g gh..",
        'conclusion': "'f er ef.."
      },
      'Old Testament and Acts': {
        simple: {
          'clef':'c3',
          'recitingTone':'h',
          'flexTone':'f',
          'mediant': "'hr fr f.",
          'fullStop': "'hr dr d.",
          'question': "h. , gr f g gh",
          'conclusion': "'hr dr d."
        },
        solemn: {
          'clef':'c4',
          'recitingTone':'h',
          'flexTone':'f',
          'mediant': "g f 'h hr h.",
          'fullStop': "f 'g dr d.",
          'question': "h. , gr f g gh",
          'conclusion': "g f 'h hr h. , hr f 'g dr d."
        }
      }
    }
  };
  g_tones = $.extend({},o_g_tones);
  //if(!localStorage)localStorage=false;
  if(localStorage.bi_formats) {
    bi_formats = JSON.parse(localStorage.bi_formats);
    for(i in o_bi_formats) {
      if(i in bi_formats) {
        for(j in o_bi_formats[i]) {
          if(!(j in bi_formats[i])) {
            if(typeof(o_bi_formats[i][j])=="object") bi_formats[i][j] = $.extend(true,{},o_bi_formats[i][j]);
              else bi_formats[i][j] = o_bi_formats[i][j];
          }
        }
      } else {
        bi_formats[i] = o_bi_formats[i];
      }
    }
  }
  $("label[title][for]").each(function() {
    var forId = this.getAttribute('for');
    $("#" + forId).attr('title',this.title);
  });
  $("#chant-parent2").resizable({handles:"e"});
  $(window).resize(windowResized);
  $("#selFormat").append('<option>' + Object.keys(bi_formats).join('</option><option>') + '</option>');
  $("#txtRecitingTone,#txtFlexTone,#txtMediant,#txtFullStop,#txtQuestion,#txtConclusion").keyup(keyupTxtGabc);
  $("#versetext").keyup(updateText).keydown(makeInternationalTextBoxKeyDown(false));
  if(localStorage.text) $("#versetext").val(localStorage.text);
  var cbEnglishChanged = function(){
    selLang = cbEnglish.checked? 'english' : 'latin';
    localStorage.selLang = selLang;
    getSyllables = cbEnglish.checked? _getEnSyllables : _getLaSyllables;
    $("#selTones").empty().append('<option>' + getPsalmTones(g_tones[selLang]).join('</option><option>') + '</option><optgroup label="Custom"></optgroup>');
    var ttones = getPsalmTones(custom_tones[selLang] || []);
    if(ttones.length>0){
      g_tones[selLang]=$.extend({},g_tones[selLang],custom_tones[selLang]);
      $("#selTones optgroup").append('<option>' + getPsalmTones(custom_tones[selLang]).join('</option><option>') + '</option>');
    }
    updateText();
  };
  $("#cbEnglish").click(cbEnglishChanged);
  $("#cbOnlyVowels").change(updateOnlyVowels);
  $("#cbUsePunctaCava").change(updateUsePunctaCava);
  $("#cbSolemn,#selTones").change(updateTone);
  $("#selTones").keyup(updateTone);
  $("#selFormat").change(updateFormat);
  $("#selFormat").keyup(updateFormat);
  $("#txtPrefix").keyup(updatePrefix);
  $("#txtSuffix").keyup(updateSuffix);
  $("#txtNbsp").keyup(updateNbsp);
  $("#txtVersesFilename").keyup(updateVersesFilename);
  $("#txtClef").keyup(updateClef);
  $("#btnNewFormat").click(newFormat);
  $("#btnNewTone").click(newTone);
  $("#btnDelTone").click(deleteTone);
  $("#btnDelFormat").click(deleteFormat);
  
  $("#cbSolemn")[0].checked = (localStorage.cbSolemn == "true");
  $("#cbOnlyVowels")[0].checked = onlyVowels = (localStorage.cbOnlyVowels == "true");
  $("#cbEnglish")[0].checked = (localStorage.selLang == "english");
  $("#cbUsePunctaCava")[0].checked = false;
  $("#selFormat").val('gabc-plain');
  $("#txtBeginPrep").keyup(updateBeginPrep);
  $("#txtEndPrep").keyup(updateEndPrep);
  $("#txtBeginAccented").keyup(updateBeginAccented);
  $("#txtEndAccented").keyup(updateEndAccented);
  $("#txtGabc").keyup(updateLocalHeader);
  $("#lnkDownloadVerses").bind("dragstart",onDragStart);
  cbEnglishChanged();
  var getGabc = function(){
    var gabc = $('#txtGabc').val(),
        header = getHeader(gabc);
    if(!header.name) header.name = '';
    if(!header['%font']) header['%font'] = 'GaramondPremierPro';
    if(!header['%width']) header['%width'] = '7.5';
    return gabc = header + gabc.slice(header.original.length);
  }
  $('#lnkPdf').click(function(e){
    var result=getGabc();    
    if(e && typeof(e.preventDefault)=="function"){
      e.preventDefault();
    }
    $('#pdfForm').attr('action','https://www.sourceandsummit.com/editor/legacy/#' + encodeURI(result)).submit();
  });
  $('#lnkPdfDirect').click(function(e){
    var gabcs=[getGabc()];
    if(e && typeof(e.preventDefault)=="function"){
      e.preventDefault();
    }
    $('#pdfFormDirect [name="gabc[]"]').remove();
    for(var i=0;i<gabcs.length;++i){
      $('#pdfFormDirect').append($('<input type="hidden" name="gabc[]"/>').val(gabcs[i]));
    }
    $("#pdfFormDirect").submit();
  });
  localStorage.removeItem("cbTeX");
  if(localStorage.customReadingTones){
    custom_tones=JSON.parse(localStorage.customReadingTones);
    var ttones = getPsalmTones(custom_tones[selLang] || []);
    if(ttones.length>0){
      g_tones[selLang]=$.extend({},g_tones[selLang],custom_tones[selLang]);
      $("#selTones optgroup").append('<option>' + getPsalmTones(custom_tones[selLang]).join('</option><option>') + '</option>');
    }
  }
  if(localStorage.tone) $("#selTones").val(localStorage.tone);
  updateTone();
  setGabcLinkSelector("#lnkDownloadGabc");
  windowResized();
  updateFormat();
  var ctxt = makeExsurgeChantContext();
  var chantContainer = $('#chant-preview')[0];
  var score;
  $('#txtGabc').keyup(function(){
    var gabc = this.value.replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
      .replace(/<b><\/b>/g,'')
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*')
      .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}')
      .replace(/<\/?sc>/g,'%')
      .replace(/<\/?b>/g,'*')
      .replace(/<\/?i>/g,'_')
        .replace(/(\s)_([^\s*]+)_(\(\))?(\s)/g,"$1^_$2_^$3$4")
        .replace(/(\([cf][1-4]\)|\s)(\d+\.)(\s\S)/g,"$1^$2^$3");
    var header = getHeader(this.value);
    var mappings = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
    score = new exsurge.ChantScore(ctxt, mappings, header['initial-style']!=='0');
    if(header['initial-style']!=='0' && header.annotation) {
      score.annotation = new exsurge.Annotation(ctxt, header.annotation);
    }
    layoutChant();
  }).keyup();
  function loadVulgateReference() {
    var book = $('#vulgateBook').val(),
        chapterVerse = $('#vulgateChapterVerse').val();
    if(chapterVerse) {
      getReading(book + ' ' + chapterVerse, true).then(function(text) {
        if(book == $('#vulgateBook').val() && chapterVerse == $('#vulgateChapterVerse').val()) {
          $('#versetext').val(text);
        }
      });
    }
  }
  $("#btnVulgateLoad").click(updateText);
  $('#vulgateBook').change(loadVulgateReference);
  $('#vulgateChapterVerse').change(loadVulgateReference);
  function layoutChant() {
    // perform layout on the chant
    score.performLayoutAsync(ctxt, function() {
      score.layoutChantLines(ctxt, chantContainer.clientWidth, function() {
        // render the score to svg code
        var svg = score.createSvgNode(ctxt);
        svg.removeAttribute('viewBox');
        $(chantContainer).empty().append(svg);
      });
    });
  }
  function layoutChantSync() {
    // perform layout on the chant
    score.performLayout(ctxt);
    score.layoutChantLines(ctxt, chantContainer.clientWidth);
    // render the score to svg code
    chantContainer.innerHTML = score.createSvgForEachLine(ctxt);
  }
  exsurge.layoutMyChant = layoutChant;
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
        layoutChantSync();
      } else {
        layoutChantSync();
      }
    });
  }
  window.onbeforeprint = layoutChantSync;
  window.onafterprint = layoutChantSync;
});