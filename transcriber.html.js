var hy_options = {
  minLength:2
};
//var regexGabc = /(((?:([`,;:]\d*)|([cf]b?[1-4]))+)|(\S+))(?:\s+|$)/ig;
  var regexGabc = /(((?:([`,;:][\d'_]*z?)|([cf]b?[1-4]))+)|([^\s\\]+|(?=\\)))(?:\s+|$|\\(.|$))/ig;
var emptyGabc={gabc:'()',hasSyllable:true};
var emptySylElision={syl:'',punctuation:'',elision:1};
var _hymnGabcMap=[],
    _textGabcMap=[];
var gabcStar;
function applyGabc(syl,gSyl,repeat,mapOffset,indexOffset) {
  var result = "",
      match,
      iG = 0,
      iT = 0,
      newLines = 0,
      elisionOn=0,
      elisionGabc,
      i, cSyl, cGabc,
      useElisionGabc=$("#cbElisionHasNote").prop('checked'),
      multipleVerses=$("#cbMultipleVerses").prop('checked') && repeat;
  if(!mapOffset){
    mapOffset=0;
  } else {
    ++mapOffset;
  }
  localStorage.elisionHasNote=useElisionGabc;
  if(multipleVerses) {
    var originalSyl = syl;
    syl = [];
    var passNum = 0;
    var iS = 0;
    for(i = 0; i < originalSyl.length; ++i) {
      cSyl = originalSyl[i];
      cGabc = gSyl[iG++]||emptyGabc;
      if(cGabc.isClef && (iG==1||i>0)){
        cGabc = gSyl[iG++]||emptyGabc;
      }
      
      if(passNum == 0) {
        syl[i] = [cSyl];
      } else {
        cSyl.syl = cSyl.syl.replace(/^\s+/,'');
        if(cSyl.syl) {
          if(cSyl.elision != syl[iS][0].elision) {
            if(cSyl.elision) {
              syl.splice(iS,0,[]);
              for(var j=passNum; j>0; --j) {
                syl[iS].push(emptySylElision);
              }
            } else {
              syl[iS++].push(emptySylElision);
            }
          }
          syl[iS].push(cSyl);
          ++iS;
        }
      }
      if(cSyl.elision || !cSyl.syl) --iG;
      if(iG >= gSyl.length) {
        iG = iS = 0;
        ++passNum;
      }
      cGabc = gSyl[iG]||emptyGabc;
      while(!cGabc.hasSyllable) {
        ++iG;
        if(iG >= gSyl.length && gSyl.length > 1) {
          iG = iS = 0;
          ++passNum;
        }
        cGabc = gSyl[iG]||emptyGabc;
      }
    }
  }
  iG = 0;
  for(i = 0; i < syl.length; ++i) {
    if(newLines > 0) {
      result+="\n".repeat(newLines);
      newLines = 0;
    }
    cSyl = syl[i];
    if(!elisionOn) cGabc = gSyl[iG++]||emptyGabc;
    if(cGabc.isClef && (iG==1||i>0)){
      _hymnGabcMap.push([result.length+mapOffset, cGabc.index+indexOffset]);
      result+=cGabc.gabc;
      cGabc = gSyl[iG++]||emptyGabc;
    }
    if(!multipleVerses) cSyl = [cSyl];
    for(var j = 0; j < cSyl.length; ++j) {
      var curSyl = cSyl[j];
      if(j > 0) {
        result+='|';
      }
      _textGabcMap.push([result.length+mapOffset - 1, curSyl.index - ((curSyl.syl.match(/^\s*/)[0]).length) + (syl.offset || 0)]);
      result+=curSyl.syl;
      if(curSyl.punctuation.length > 0) {
        if(curSyl.space && curSyl.punctuation.match(/(^|[^\\])\\$/)) {
          //if it ends with exactly one backslash, consider the following space as part of this syllable:
          if(curSyl.punctuation.length>1) result+=curSyl.punctuation.slice(0,-1);
          --iG;
          continue;
        } else if(curSyl.directive) {
          result += " ";
        }
        result+=curSyl.punctuation;
        if(curSyl.directive) result += "()";
      }
      if(j>0 && (curSyl.space||curSyl.punctuation)) result += ' ';
    }
    cSyl = cSyl[0];
    if(cSyl.syl || cSyl === emptySylElision) {
      if(cSyl.elision) {
        if(useElisionGabc) {
          if(!cGabc.tones || cGabc.tones.length<=1) {
            _hymnGabcMap.push([result.length+mapOffset, cGabc.index+indexOffset]);
            result+=cGabc.gabc.replace(/'/g,"");
            elisionOn=true;
          } else {
            if(!elisionGabc)elisionGabc=cGabc;
            _hymnGabcMap.push([result.length+mapOffset, cGabc.index+indexOffset]);
            result+='('+elisionGabc.tones[elisionOn]+')';
            ++elisionOn;
            if(elisionOn >= elisionGabc.tones.length) elisionOn = elisionGabc.tones.length-1;
            var temp=elisionGabc.tones.slice(elisionOn).join('');
            cGabc={tones:elisionGabc.tones,gabc:'('+temp+')',index:cGabc.index+elisionGabc.tones.join('').length-temp.length};
          }
        } else {
          result+='()';
          --iG;
        }
      } else {
        _hymnGabcMap.push([result.length+mapOffset, cGabc.index+indexOffset]);
        result+=cGabc.gabc;
        elisionGabc=null;
        elisionOn=0;
      }
    } else {
      iG--;
    }
    if(repeat && iG >= gSyl.length)
      iG = 0;
    if(!elisionOn) {
      cGabc = gSyl[iG]||emptyGabc;
      var flexOrMediant=false;
      if(cSyl.flex) {
        result+=' †';
        flexOrMediant=true;
      } else if(cSyl.mediant) {
        result+=' ' + gabcStar
        flexOrMediant=true;
      }
      while(!cGabc.hasSyllable) {
        if((!cGabc.isClef||(iG!=0 && i!=(syl.length-1)))&&((i==syl.length-1)||cSyl.space||cSyl.punctuation||!cGabc.isBar)) {
          if(flexOrMediant) {
            flexOrMediant=false;
          } else {
            result+=" ";
          }
          if(syl[i+1] && syl[i+1].directive) {
            curSyl = syl[++i];
            _textGabcMap.push([result.length+mapOffset - 1, curSyl.index - ((curSyl.syl.match(/^\s*/)[0]).length) + (syl.offset || 0)]);
            result+=curSyl.all;
          }
          _hymnGabcMap.push([result.length+mapOffset, cGabc.index+indexOffset]);
          result+=cGabc.gabc;
        }
        //newLines = 1;
        ++iG;
        if(repeat && iG >= gSyl.length && gSyl.length > 1) {
          iG = 0;
          //++newLines;
        }
        cGabc = gSyl[iG]||emptyGabc;
      }
      if(flexOrMediant) result+='()';
    }
  }
  return result;
}

var gSyl;
var syl;

function updateEditor() {
  if(!gSyl) updateGSyl();
  if(!syl)  updateSyl();

  var gsCount = gSyl.length;
  var sCount = syl.length;
  var count = Math.min(gsCount,sCount);
  var maxCount = Math.max(gsCount,sCount);
  var header = getHeader(localStorage.transcribeHeader||'');
  header["initial-style"] = (syl[0] && syl[0][0] && !syl[0][0].all.match(/^[A-Z]/))? '0' : '1';
  if((localStorage.selLanguage == 'en' || localStorage.selLanguage == 'vi' || localStorage.selLanguage == 'zh') && !("centering-scheme" in header)) {
    header["centering-scheme"] = 'english';
  } else if(("centering-scheme" in header) && header['centering-scheme'] != 'latin' && /^la/.exec(localStorage.selLanguage)) {
    delete header["centering-scheme"];
    delete header.centeringScheme;
  }
  var headerString = header.toString();
  var $gabc = $("#hymngabc");
  if($gabc.is(":visible")){
    var gabcVal = $gabc.val();
    var gabcHeader = getHeader(gabcVal);
    if(gabcHeader.toString()!=headerString){
      var txtGabc = $gabc[0],
          selStart = txtGabc.selectionStart,
          selEnd = txtGabc.selectionEnd,
          originalLength = gabcHeader.original.length
          offset = headerString.length - originalLength;
      if(selStart < originalLength){
        headerString = gabcHeader.original;
      } else {
        $gabc.val(headerString + gabcVal.slice(gabcHeader.original.length));
        if($gabc.is(":focus")){
          txtGabc.selectionStart = selStart + offset;
          txtGabc.selectionEnd = selEnd + offset;
        }
      }
    }
  }
  var result = headerString;
  _hymnGabcMap = [];
  _textGabcMap = [];
  for(var i=0; i<count; ++i) {
    result += applyGabc(syl[i],gSyl[i],i<maxCount-1,result.length,headerString.length) + '\n';
  }
  $("#editor").val(result)
    .off("keyup",updateBoth)
    .keyup()
    .keyup(updateBoth);
  updateLocalHeader();
}

function splitGabc(gabc,offset) {
  var gSyl = [];
  regexGabc.exec('');
  while((match = regexGabc.exec(gabc))) {
    var tone,tones=[],
        hasSyl = match[5],
        sylGabc = match[1],
        isClef = match[4],
        isBar = match[3],
        index = match.index + offset;
    regexTones.exec('');
    var nextIndex = match.index + match[0].length - 1;
    while(match[6] && regexGabc.lastIndex < gabc.length && (regexGabc.lastIndex--, match = regexGabc.exec(gabc))) {
      if(nextIndex != match.index) {
        sylGabc += gabc[nextIndex];
        if(match.index > nextIndex + 1) {
          regexGabc.lastIndex = nextIndex;
          break;
        }
      }
      hasSyl = hasSyl || match[5];
      sylGabc += match[1];
      isClef = isClef || match[4];
      isBar = isBar || match[3];
      nextIndex = match.index + match[0].length - 1;
    }
    while((tone=regexTones.exec(sylGabc))){
      tones.push(tone[0]);
    }
    gSyl.push({match: match,
               hasSyllable: hasSyl,
               gabc: '(' + sylGabc + ')',
               isClef: isClef,
               isBar: isBar,
               tones: tones,
               index: index
              });
  }
  return gSyl;
}

var _regexParens=/\(([^\s\)]*[aeiouyáéëíóúý?æœǽœ́][^\s\)]*)\)/;
function splitText(text) {
  switch($("#selLanguage").val()) {
    case 'en':
      return Syl.syllabify(text,'en');
    case 'pl':
      return Syl.syllabify(text,'pl');
    case 'it':
      return Syl.syllabify(text,'it');
    case 'la-liturgical':
      return Syl.syllabify(text,'la');
    case 'vi':
      return Syl.syllabify(text,'vi')
    case 'zh':
      return Syl.syllabify(text,'zh')
  }

  //for handling parenthesized elisions, we will remove the parentheses but keep track of where they were.
  var m;
  var ps=[];
  while(m=_regexParens.exec(text)){
    ps.push({i:m.index,len:m[1].length});
    text=text.slice(0,m.index) + m[1] + text.slice(m.index+m[0].length);
  }
  var pi=0;       //parenthesis index
  var cp=ps[pi];  //current parenthesis
  var syl = [];
  var index = 0,lastIndex = 0;
  while((m = regexLatin.exec(text))) {
    index = m.index;
    if(m[0].match(/^n[cg]u[aeiouyáéíóúý?æœǽœ́]/i)) {
      var lastSyl = syl.slice(-1);
      if(lastSyl) lastSyl = lastSyl[0];
      if(!lastSyl.space && !lastSyl.punctuation) {
        lastSyl.all +='n';
        lastSyl.syl +='n';
        lastSyl.sylnospace +='n';
        ++index;
        ++lastIndex;
        m[0] = m[0].slice(1);
        m[2] = m[2].slice(1);
        m[3] = m[3].slice(1);
      }
    }
    var subI=index+m[0].indexOf(m[2]);
    if(cp && cp.i>=subI && cp.i<(subI+m[2].length)){
      cp.i -= subI;
      m[2] = m[2].slice(0,cp.i) + "(" + m[2].slice(cp.i,cp.i+cp.len) + ")" + m[2].slice(cp.i+cp.len);
      cp.i += subI - (index+m[0].indexOf(m[3]));
      m[3] = m[3].slice(0,cp.i) + "(" + m[3].slice(cp.i,cp.i+cp.len) + ")" + m[3].slice(cp.i+cp.len);
      cp=ps[++pi];
    }
    if(index>lastIndex) {
      var lastSyl = text.slice(lastIndex,index);
      if(m[0].match(/^i$/i) && lastSyl.match(/<\/?$/) && text.substr(index+1,1).match(/^>/)) {
        ++index;
        syl.push(syllable(lastSyl+"i>",lastIndex,o_bi_formats.gabc));
        lastIndex = index+1;
        continue;
      }
      syl.push(syllable(lastSyl,lastIndex,o_bi_formats.gabc));
    }
    syl.push(syllable(m,undefined,o_bi_formats.gabc));
    lastIndex = index + m[0].length;
  }
  return syl;
}
var regexDashedLine=/\s--(?:\s|$)/;
var lastGabc;
function updateGSyl() {
  var allGabc = $("#hymngabc").val();
  var header = getHeader(allGabc);
  localStorage.transcribeHeader = header;
  allGabc = allGabc.slice(header.original.length);
  if(lastGabc == allGabc)return false;
  var tmp=allGabc.split(regexDashedLine)
  gSyl=[];
  var offset = 0;
  tmp.forEach(
    function(a,b){
      gSyl.push(splitGabc(a,offset));
      offset += a.length + 4;
    });
  lastGabc = allGabc;
  return true;
}

function updateGabcSide() {
  updateGSyl();
  updateEditor();
}
function shiftGabc(e) {
  var up = e.which === 38;
  if(e.altKey && (up || e.which == 40)) {
    e.preventDefault();
    var $this = $(this),
        allGabc = $this.val(),
        header = getHeader(allGabc),
        selectionStart = this.selectionStart,
        selectionEnd = this.selectionEnd,
        gabc = allGabc = allGabc.slice(header.original.length);
    if(selectionStart != selectionEnd) {
      var startIndex = Math.max(0,selectionStart - header.original.length),
          endIndex = Math.max(0,selectionEnd - header.original.length);
      gabc = gabc.slice(startIndex, endIndex);
    }
    var addendum = up? 1 : -1;
    var replaceLetter = function(letter, clef) {
      if(clef) return letter;
      if((!up && letter.match(/a/i)) || (up && letter.match(/m/i))) throw true;
      return String.fromCharCode(addendum + letter.charCodeAt(0));
    };
    var regex = /([cf]b?[1-4])|[a-mA-M]/g;
    try {
      gabc = gabc.replace(regex, replaceLetter);
    } catch(e) {
      return;
    }
    if(selectionStart == selectionEnd) {
      $this.val(header.original + gabc);
    } else {
      $this.val(header.original + allGabc.slice(0,startIndex) + gabc + allGabc.slice(endIndex));
    }
    this.setSelectionRange(selectionStart, selectionEnd);
  }
}

function updateSyl(txt) {
  var tmp=(txt||$("#hymntext").val()).split(regexDashedLine);
  syl=[];
  var offset = 0;
  tmp.forEach(
    function(a,b){
      var o = splitText(a);
      o.offset = offset;
      syl.push(o);
      offset += a.length + 4;
    });
}

function updateText() {
  if(!$("#oneBox").is(':hidden')) return;
  updateSyl();
  updateEditor();
}

function selLanguageChanged() {
  localStorage.selLanguage = $(this).val();
  updateEditor();
}

function decompile(mixed) {
  regexOuter.exec('');
  var curClef;
  var regRep=/^[cf]b?[1-4]\s*|(\s+)[`,;:]+\s*/gi;
  var text=[];
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
      if(!m||m[4])text.push(tws);
    } else {
      text.push(tws);
    }
    if(syl){
      var sylR=syl.replace(/<i>([aeiouyæœ])<\/i>/ig,'($1)');
      hasElisions = hasElisions||(syl!=sylR);
      text.push(sylR);
    }
    gabc+=match[rog.gabc] + (ws.replace(/[^\n]*\n[^\n]*/g,'\n')||" ");
    var nextMatch=regexOuter.exec(mixed);
    if(match[rog.gabc]=='::' || !nextMatch) {
      if(nextMatch && lastVerseI>0) {
        text.splice(lastVerseI,0,'\n\n');
        text[lastVerseI-1] = text[lastVerseI-1].replace(/^\s+|\s+$/,'');
        text[lastVerseI+1] = text[lastVerseI+1].replace(/^\s+|\s+$/,'');
      }
      if(!hasElisions || (!nextMatch && verses.length == 0)) {
        var tempVerse=gabc.replace(/^\s+|\s+$/,'');
        var temp2=tempVerse.replace(regRep,'$1');
        var lastV=lastVerse();
        if(verseHasClef) {
          temp2 = temp2.slice(lastClef.length).replace(/^\s+/,'');
        }
        if(!lastV || temp2!=lastV.replace(regRep,'$1')) {
          if(!verseHasClef && verses.length==0)tempVerse = lastClef + ' ' + tempVerse;
          if(verseReps==1){
            verses.push(verses.pop()+"\n"+tempVerse);
          } else {
            verses.push(tempVerse);
            if(lastVerseI>0) {
              text[lastVerseI]='\n--\n';
            }
            verseReps=1;
          }
        } else {
          if(lastV.match(/^[cf]b?[1-4]/i)) {
            if(!verseHasClef && lastClef)tempVerse = lastClef + ' ' + tempVerse;
          }
          if(tempVerse.length>lastV.length) {
            verses[verses.length-1] = tempVerse;
          }
          ++verseReps;
        }
        lastVerseI=text.length;
      }
      verseHasClef=hasElisions=false;
      gabc='';
    }
    tws=ws;
    match=nextMatch;
  }
  if(tws)text.push(tws);
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
  var s = text.join('');
  updateSyl(s);
  $("#hymngabc").val(gs);
  $("#hymntext").val(s);
}

function updateBoth() {
  var text=$("#editor").val();
  text = text.slice(getHeaderLen(text));
  decompile(text);
  updateLocalHeader();
}

function updateLocalHeader() {
  var gabc = $("#editor:visible,#hymngabc:visible").val();
  var header=getHeader(gabc);
  localStorage.transcribeHeader=header;
}

function windowResized(){
  var $cp = $("#chant-parent2");
  var $ed = $("#editor,#hymngabc,#hymntext");
  var totalHeight = $(window).height() - $cp.position().top - 10 + $ed.height();
  var edHeight = Math.max(104,totalHeight*0.3);
  $cp.height(totalHeight - edHeight);
  $ed.height(edHeight);
  $("#blankSpace").height(Math.max($("#oneBox").height(),$("#twoBoxes").height()));
  exsurge.layoutMyChant();
}

function toggleMode(e){
  if(e && typeof(e.preventDefault)=="function")e.preventDefault();
  $("#lnkToggleMode").text($("#oneBox").is(':hidden')?"Show separate text boxes":"Show integrated GABC");
  $("#oneBox,#twoBoxes").fadeToggle();
}

function updateGabcStar(newStar){
  if(typeof(newStar)!='string') {
    newStar = $(this).val();
  }
  if(typeof(newStar)!='string' || newStar.length == 0) newStar = '*';
  localStorage.gabcStar = gabcStar = newStar;
  updateEditor(true);
}
function saveAsPng(name, dpi) {
  saveSvgAsPng(exportChant(), name, {scale: dpi / 96, backgroundColor: "#fff"});
}
function saveAsPngs(name, dpi) {
  var lines = exportChant(true);
  for(var i = 0; i < lines.length; ++i) {
    saveSvgAsPng(lines[i], name.replace(/\.png$/,'-' + (i+1) + '.png'), {scale: dpi / 96, backgroundColor: "#fff"});
  }
}
function currentHeader() {
  var gabc = $('#editor').val(),
    header = getHeader(gabc);
  header.name = header.name || 'Untitled';
  return header;
}
function savePng(e) {
  if(e && e.preventDefault) e.preventDefault();
  var header = currentHeader();
  name = header.name + '.png';
  var dpi = parseInt(header.dpi || header.cValues.dpi) || 300;
  console.info(e);
  if(e.metaKey || e.ctrlKey) saveAsPngs(name, dpi);
    else saveAsPng(name, dpi);
}
function saveAsSvg(e) {
  if(e && e.preventDefault) e.preventDefault();
  var header = currentHeader();
  name = header.name + '.svg';
  saveSvg(exportChant(), name);
}
$(function() {
  if(localStorage.gabcStar) {
    gabcStar = localStorage.gabcStar;
  } else {
    gabcStar = '<v>\\greheightstar</v>'
  }
  if(localStorage.selLanguage) {
    $('#selLanguage').val(localStorage.selLanguage);
  }
  $("#txtGabcStar").val(gabcStar).keyup(updateGabcStar);
  $("#chant-parent2").resizable({handles:"e"});
  $("#lnkToggleMode").click(toggleMode);
  $(window).resize(windowResized);
  $("#hymngabc").keyup(updateGabcSide).keydown(shiftGabc);
  $("#hymntext").keyup(updateText).keydown(internationalTextBoxKeyDown);
  $("#editor").keyup(updateBoth).keydown(gabcEditorKeyDown).keydown(internationalTextBoxKeyDown);
  $("#cbElisionHasNote").click(updateEditor)[0].checked=localStorage.elisionHasNote!="false";
  $("#cbMultipleVerses").click(updateText);
  $("#selLanguage").change(selLanguageChanged);
  $("#lnkDownloadPng").click(savePng);
  $("#lnkDownloadSvg").click(saveAsSvg);
  function selectSourceIndex(index, e) {
    if(score.mapExsurgeToGabc) index = score.mapExsurgeToGabc(index);
    var textarea;
    if($('#oneBox').is(':visible')) {
      textarea = $('#editor')[0];
    } else {
      if(e.currentTarget.tagName == 'use') {
        textarea = $('#hymngabc')[0];
        index = mapString(_hymnGabcMap,index);
      } else {
        textarea = $('#hymntext')[0];
        index = mapString(_textGabcMap,index);
      }
    }
    var length = 0;
    if(e.currentTarget.tagName == 'use') {
      length = 1;
    } else {
      try {
        length = e.currentTarget.source.text.length;
      } catch(e) { }
    }
    textarea.setSelectionRange(index, index + length);
    textarea.focus();
    return index;
  };
  $('#chant-preview').on('click', 'use[source-index],text[source-index]:not(.dropCap)', function(e) {
    removeChantContextMenus();
    e.stopPropagation();
    console.info(e);
    if(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
      selectSourceIndex(this.source.sourceIndex, e);
    } else {
      showToolbarForNote(this);
    }
  });
  var getGabc = function(){
    var gabc = $('#editor').val(),
        header = getHeader(gabc);
    if(!header.name) header.name = '';
    if(!header['%font']) header['%font'] = 'GaramondPremierPro';
    if(!header['%width']) header['%width'] = '7.5';
    if(!header['%fontsize']) header['%fontsize'] = '20';
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
  setGabcLinkSelector("#lnkDownloadGabc");

  var ctxt = makeExsurgeChantContext();
  var exportContext = makeExsurgeChantContext();
  var chantContainer = $('#chant-preview')[0];
  var score;
  function gabcToExsurge(gabc) {
    return gabc.replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
      .replace(/<v>\\([VRAvra])bar<\/v>/g,'$1/.')
      .replace(/<sp>([VRAvra])\/<\/sp>\.?/g,'$1/.')
      .replace(/<b><\/b>/g,'')
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*')
      .replace(/<\/?sc>/g,'%')
      .replace(/<\/?b>/g,'*')
      .replace(/<\/?i>/g,'_')
        .replace(/(\s)_([^\s*]+)_(\(\))?(\s)/g,"$1^_$2_^$3$4")
        .replace(/(\([cf][1-4]\)|\s)(\d+\.)(\s\S)/g,"$1^$2^$3");
  }
  function addHeaderKeyToContext(header, key) {
    const textStyleKeys = Object.keys(ctxt.textStyles || {});
    const regex = new RegExp(`^(?:exsurge\\.|(?:exsurge\\.)?(${textStyleKeys.join('|')})\\.)(.+)`);
    var match = regex.exec(key);
    if(match) {
      var value = header[key],
          floatVal = parseFloat(value);
      if(!value) return;
      if(floatVal == value) value = floatVal;
      let textStyleKey = match[1];
      key = match[2];
      if(key == 'glyphScaling') {
        value = parseFloat(value) / exsurge.Glyphs.PunctumQuadratum.bounds.height;
        if(value && (value !== ctxt.glyphScaling || value != exportContext.glyphScaling)) {
          exportContext.setGlyphScaling(value);
          ctxt.setGlyphScaling(value);
        }
      } else if(key == 'staffHeight') {
        value = parseFloat(value) / (6 * exsurge.Glyphs.PunctumQuadratum.bounds.width);
        if(value && (value !== ctxt.glyphScaling || value != exportContext.glyphScaling)) {
          exportContext.setGlyphScaling(value);
          ctxt.setGlyphScaling(value);
        }
      } else {
        if (textStyleKey) {
          exportContext.textStyles[textStyleKey][key] = ctxt.textStyles[textStyleKey][key] = value;
        } else {
          exportContext[key] = ctxt[key] = value;
        }
      }
    }
  }
  $('#editor').keyup(function(){
    updateLinks(this.value);
    var gabc = gabcToExsurge(this.value)
    var header = getHeader(this.value);
    exportContext.staffLineColor = ctxt.staffLineColor = header.staffLineColor || header.cValues.staffLineColor || '#000';
    for(var key in header) {
      if (header.hasOwnProperty(key)) {
        addHeaderKeyToContext(header, key);
      }
    }
    for(key in header.cValues) {
      addHeaderKeyToContext(header.cValues, key);
    }
    var mappings = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
    score = new exsurge.ChantScore(ctxt, mappings, header['initial-style']!=='0');
    if(header['initial-style']!=='0' && header.annotation) {
      var annotationArray = header.annotationArray;
      if(annotationArray) {
        score.annotation = new exsurge.Annotations(ctxt, '%'+annotationArray[0]+'%', '%'+annotationArray[1]+'%');
      } else if(header.annotation) {
        score.annotation = new exsurge.Annotations(ctxt, '%'+header.annotation+'%');
      }
    }
    var language = header['centering-scheme'] == 'english'? exsurgeEnglish : new exsurge.Latin();
    exportContext.defaultLanguage = language;
    ctxt.defaultLanguage = language;
    score.mapExsurgeToGabc = makeExsurgeToGabcMapper(gabc, this.value);
    layoutChant();
  });

  function getWidthInPixels(header) {
    var width = header.width || header.cValues.width;
    var match = width && width.match(/(\d+(?:\.\d+)?)(in|(([mc]?)m))?/);
    if(match) {
      width = parseFloat(match[1]);
      if(match[3]) {
        var divisor = 0.0254;
        if(match[4]) divisor *= match[4]=='c'? 100 : 1000;
        width /= divisor;
      }
      // width is now in inches!
    } else {
      return null;
    }
    width *= 96;
    return width;
  }
  function setupFontFromHeader(header) {
    var customFont = '';
    var fontFamilies = {};
    ['','lyric','al','dropCap','annotation'].forEach(function(fontType){
      var prefix = fontType + (fontType? 'Font':'font');
      var key = prefix + 'Family';
      var font = header[key] || header.cValues[key];
      // text color:
      if(fontType) {
        var colorKey = fontType+'TextColor';
        var textColor = header[colorKey] || header.cValues[colorKey];
        if(textColor) exportContext[colorKey] = ctxt[colorKey] = textColor;
      }
    
      ['','Bold','Italic','BoldItalic'].forEach(function(style) {
        var key = prefix + style + 'Src';
        var val = header[key] || header.cValues[key];
        var match = val && val.match(/\.([ot]tf|woff2?)/);
        var format = header.fontFormat || header.cValues.fontFormat;
        if(format && !format.match(/^([ot]f|woff2?)$/)) format = '';
        if(val && (match || format)) {
          format = format || match[1];
          font = font || "'Custom Exsurge Font'";
          customFont += "\
@font-face {\
  font-family: '" + (font) + "';\
  src: url('" + (val) + "') format('" + (format) + "');\
  " + (style.match(/Bold/)? 'font-weight: bold;' : '') + "\
  font-style: " + (style.match(/Italic/)? 'italic': 'normal') + ";\
}";
        }
        if(fontType) {
          if(font) fontFamilies[fontType] = font;
        } else {
          font = font || "'Crimson Text'";
          fontFamilies.lyric = fontFamilies.al = fontFamilies.dropCap = fontFamilies.annotation = font;
        }
      });
    });
    if(customFont) {
      var fontStyle = document.querySelector('#customFontStyle');
      if(fontStyle) {
        fontStyle.removeChild(fontStyle.firstChild);
      } else {
        fontStyle = document.createElement('style');
        fontStyle.id = 'customFontStyle';
      }
      fontStyle.appendChild(document.createTextNode(customFont));
      document.head.appendChild(fontStyle);
    }
    exportContext.lyricTextFont = ctxt.lyricTextFont = fontFamilies.lyric + ", serif";
    exportContext.dropCapTextFont = ctxt.dropCapTextFont = fontFamilies.dropCap + ", serif";
    exportContext.annotationTextFont = ctxt.annotationTextFont = fontFamilies.annotation + ", serif";
    exportContext.alTextFont = ctxt.alTextFont = fontFamilies.al + ", serif";
    ctxt.setGlyphScaling(ctxt.glyphScaling);
    exportContext.setGlyphScaling(exportContext.glyphScaling);
  }
  window.exportChant = function(eachLine) {
    var gabc = $('#editor').val(),
        code = gabcToExsurge(gabc),
        header = getHeader(gabc),
        mappings = exsurge.Gabc.createMappingsFromSource(exportContext, code),
        score = new exsurge.ChantScore(exportContext, mappings, header.initialStyle!=='0');
    if(header.initialStyle!=='0' && header.annotation) {
      var annotationArray = header.annotationArray;
      if(annotationArray) {
        score.annotation = new exsurge.Annotations(exportContext, annotationArray[0], annotationArray[1]);
      } else if(header.annotation) {
        score.annotation = new exsurge.Annotations(exportContext, header.annotation);
      }
    }
    
    var width = getWidthInPixels(header) || 6 * 96;
    score.performLayout(exportContext);
    score.layoutChantLines(exportContext, width);
    if(eachLine) {
      return score.createSvgNodeForEachLine(exportContext);
    } else {
      return score.createSvgNode(exportContext);
    }
  }
  function layoutChant() {
    if(!score) return;
    setupFontFromHeader(currentHeader());
    // perform layout on the chant
    score.performLayoutAsync(ctxt, function() {
      var width = getWidthInPixels(currentHeader());
      var responsiveSVG = !!width;
      if(!width) width = chantContainer.clientWidth;
      score.layoutChantLines(ctxt, width, function() {
        // render the score to svg code
        var svg = score.createSvgNode(ctxt);
        if(responsiveSVG) {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        } else {
          svg.removeAttribute('viewBox');
        }
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

  windowResized();
  if(location.hash) {
    const gabc = decodeURIComponent(location.hash.slice(1));
    $("#lnkToggleMode").click();
    $('#editor').val(gabc).keyup();
    updateLocalHeader();
  } else {
    updateEditor();
  }
});