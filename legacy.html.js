var hy_options = {
  minLength:2
};
//var regexGabc = /(((?:([`,;:]\d*)|([cf]b?[1-4]))+)|(\S+))(?:\s+|$)/ig;
  var regexGabc = /(((?:([`,;:]\d*z?)|([cf]b?[1-4]))+)|([^\s\\]+|(?=\\)))(?:\s+|$|\\(.|$))/ig;
var emptyGabc={gabc:'()',hasSyllable:true};
var emptySyl={syl:'',punctuation:''};
var emptySylElision=$.extend({elision:1},emptySyl);
var _hymnGabcMap=[];
//TODO: have an option to use a regular * instead of <v>\greheightstar</v>
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
        if(cSyl.elision != syl[iS][0].elision) {
          if(cSyl.elision) {
            syl.splice(iS,0,[]);
            for(var j=passNum; j>0; --j) {
              syl[iS].push(emptySylElision);
            }
          } else {
            syl[iS++].push(emptySyl);
          }
        }
        syl[iS].push(cSyl);
        ++iS;
      }
      if(cSyl.elision) --iG;
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
      _hymnGabcMap[result.length+mapOffset] = cGabc.index + indexOffset;
      result+=cGabc.gabc;
      cGabc = gSyl[iG++]||emptyGabc;
    }
    if(!multipleVerses) cSyl = [cSyl];
    for(var j = 0; j < cSyl.length; ++j) {
      var curSyl = cSyl[j];
      if(j > 0) {
        result+='|';
      }
      result+=curSyl.syl;
      if(curSyl.punctuation.length > 0) {
        if(curSyl.space && curSyl.punctuation.match(/(^|[^\\])\\$/)) {
          //if it ends with exactly one backslash, consider the following space as part of this syllable:
          if(curSyl.punctuation.length>1) result+=curSyl.punctuation.slice(0,-1);
          --iG;
          continue;
        }
        result+=curSyl.punctuation;
      }
      if(j>0 && (curSyl.space||curSyl.punctuation)) result += ' ';
    }
    cSyl = cSyl[0];
    if(cSyl.syl) {
      if(cSyl.elision) {
        if(useElisionGabc) {
          if(!cGabc.tones || cGabc.tones.length<=1) {
            _hymnGabcMap[result.length+mapOffset] = cGabc.index + indexOffset;
            result+=cGabc.gabc.replace(/'/g,"");
            elisionOn=true;
          } else {
            if(!elisionGabc)elisionGabc=cGabc;
            _hymnGabcMap[result.length+mapOffset] = cGabc.index + indexOffset;
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
        _hymnGabcMap[result.length+mapOffset] = cGabc.index + indexOffset;
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
          _hymnGabcMap[result.length+mapOffset] = cGabc.index + indexOffset;
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
  for(var i=0; i<count; ++i) {
    result += applyGabc(syl[i],gSyl[i],i<maxCount-1,result.length,headerString.length) + '\n';
  }
  $("#editor").val(result)
    .unbind("keyup",updateBoth)
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

var _regexParens=/\(([^\s\)]*[aeiouyáéëíóúý?æœ][^\s\)]*)\)/;
function splitText(text) {
  switch($("#selLanguage").val()) {
    case 'en':
      return Syl.syllabify(text,'en');
    case 'pl':
      return Syl.syllabify(text,'pl');
    case 'la-liturgical':
      return Syl.syllabify(text,'la');
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
    if(m[0].match(/^n[cg]u[aeiouyáéíóúý?æœ]/i)) {
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

function updateSyl(txt) {
  var tmp=(txt||$("#hymntext").val()).split(regexDashedLine);
  syl=[];
  tmp.forEach(
    function(a,b){
      syl.push(splitText(a));
    });
}

function updateText() {
  updateSyl();
  updateEditor();
}

function selLanguageChanged() {
  localStorage.selLanguage = $(this).val();
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
      var sylR=syl.replace(/<i>([aeiouy])<\/i>/ig,'($1)');
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
      if(!hasElisions) {
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
  $("#hymngabc").keyup(updateGabcSide);
  $("#hymntext").keyup(updateText).keydown(internationalTextBoxKeyDown);
  $("#editor").keyup(updateBoth).keydown(gabcEditorKeyDown).keydown(internationalTextBoxKeyDown);
  $("#cbElisionHasNote").click(updateEditor)[0].checked=localStorage.elisionHasNote!="false";
  $("#cbMultipleVerses").click(updateText);
  $("#selLanguage").change(selLanguageChanged);
  var getGabc = function(){
    var gabc = $('#editor').val(),
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
    $('#pdfForm').attr('action','http://www.sourceandsummit.com/editor/legacy/#' + encodeURI(result)).submit();
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
  windowResized();
  updateEditor();
});