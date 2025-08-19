if(location.search.match(/dominican/i))g_tones=d_tones;
var selLang = 'latin';
var custom_tones={};
var gSyl,syl,_clef;
var last_syl,last_gSyl,gShortMediant;
var last_lines,last_terTones,last_medTones;
var useFormat,useInitStyle,onlyVowels,gabcFormat,usePunctaCava,repeatIntonation,italicizeIntonation,useNovaVulgata;
var includeGloriaPatri;
function updateEditor(forceGabcUpdate,_syl,_gSyl,_gShortMediant,clef) {
  var actuallyUpdate=(typeof(_syl)=="undefined");
  if(!gSyl) gSyl = $("#versegabc").val();
  if(!syl) syl = $("#versetext").val();
  if(!_gShortMediant)_gShortMediant = gShortMediant;
  _syl = _syl || syl;
  _gSyl = _gSyl || gSyl;
  clef = clef || _clef;
  var sameSyl = (_syl == last_syl);
  var sameGSyl = (_gSyl == last_gSyl);
  var lines = sameSyl? last_lines : _syl.split('\n');
  var gMediant,gTermination;
  if(sameGSyl) {
    gMediant = last_medTones;
    gTermination = last_terTones;
  } else {
    var gabcs = _gSyl.split('\n');
    gMediant = getGabcTones(gabcs[0]);
    gTermination = getGabcTones(gabcs[1]);
  }
  var gabc;
  var medTones, terTones;
  if(sameGSyl) {
    medTones = last_medTones;
    terTones = last_terTones;
  } else {
    medTones = gMediant;
    terTones = gTermination;
    if(actuallyUpdate){
      $("#sMedAccent")[0].innerText = String(medTones.accents);
      $("#sMedAccentS")[0].innerText = (medTones.accents == 1)? "" : "s";
      if(medTones.preparatory == 0) {
        $("#sMedPrepOuter").hide();
      } else {
        $("#sMedPrep")[0].innerText = String(medTones.preparatory);
        $("#sMedPrepS")[0].innerText = (medTones.preparatory == 1)? "" : "s";
        $("#sMedPrepOuter").show();
      }
      if(gTermination) {
      $("#sTermAccent")[0].innerText = String(terTones.accents);
        $("#sTermAccentS")[0].innerText = (terTones.accents == 1)? "" : "s";
        if(terTones.preparatory == 0) {
          $("#sTermPrepOuter").hide();
        } else {
          $("#sTermPrep")[0].innerText = String(terTones.preparatory);
          $("#sTermPrepS")[0].innerText = (terTones.preparatory == 1)? "" : "s";
          $("#sTermPrepOuter").show();
        }
      }
    }
    last_medTones = medTones;
    last_terTones = terTones;
  }
  if(!sameSyl || !sameGSyl || forceGabcUpdate) {
    last_lines = lines;
  }
  var flex;
  var firstVerse=true;
  var r = '';
  var vr = '';
  var asCode = !useFormat.match(/html/i);
  var asGabc = useFormat.match(/gabc/i);
  var firstVerseAsGabc = $("#cbFirstVerseGabc").prop('checked');
  if(asCode) r+="<code>";
  if(!asGabc || !sameSyl || !sameGSyl || forceGabcUpdate) {
    gabc = "(" + clef + ")"
    for(var i=0; i<lines.length; ++i) {
      var line = splitLine(lines[i]);
      if(asGabc || (firstVerse && firstVerseAsGabc)) {
        var result={shortened:false};
        gabc += applyPsalmTone({
          text: line[0].trim(),
          gabc: gMediant,
          useOpenNotes: usePunctaCava,
          useBoldItalic: true,
          firstPrefix: (!useInitStyle),
          onlyVowel: onlyVowels,
          format: gabcFormat,
          verseNumber: useNovaVulgata?"":i+1,
          prefix: true,
          suffix: false,
          italicizeIntonation: italicizeIntonation,
          result: result,
          gabcShort: _gShortMediant,
          favor: i == 0? 'intonation' : ''
        }) + (line.length == 1? "" : ((gabcFormat||bi_formats.gabc).nbsp) + gabcStar + "(:) " +
          applyPsalmTone({
            text: line[1].trim(),
            gabc: gTermination,
            useOpenNotes: usePunctaCava,
            useBoldItalic: true,
            firstPrefix: (!useInitStyle),
            onlyVowel: onlyVowels,
            format: gabcFormat,
            verseNumber: useNovaVulgata?"":i+1,
            prefix: false,
            suffix: true,
            italicizeIntonation: false,
            favor: 'termination'
          })) + " (::)\n";
        if(i==0) {
          if(!repeatIntonation)gMediant=removeIntonation($.extend(true,{},gMediant));
          flex = (line[0].indexOf(sym_flex) >= 0);
        }
        if(!result.shortened)firstVerse=false;
      } else {
        if(gabc && !flex) {
          var flexI = line[0].indexOf(sym_flex);
          if(flexI >= 0) {
            var syls = getSyllables(line[0].slice(0,flexI));
            var index = syls.length - 1;
            syls[index].punctuation += ' ' + gabcFlex;
            syls[index].space = "";
            var sylcount = syls[index].word.length;
            index -= sylcount - 1;
            while((syls.length - index) < 3) {
              --index;
              sylcount = syls[index].word.length;
              index -= sylcount - 1;
            }
            syls.splice(0,index);
            gabc += "<i>Flex:</i>() " + applyPsalmTone({
              text: syls,
              gabc: getFlexGabc(medTones),
              useOpenNotes: false,
              useBoldItalic: false,
              firstPrefix: true,
              onlyVowel: onlyVowels,
              format: gabcFormat
            });
            gabc = gabc.slice(0,-1) + new Array(4).join(" " + medTones.toneTenor) + "  ::)";
            flex = true;
          }
        }
        var tempString=addBoldItalic(line[0], medTones.accents, medTones.preparatory, medTones.afterLastAccent, useFormat, onlyVowels, useNovaVulgata?"":i+1,true,false,i)
            + (line.length == 1? "" : ((((useFormat in bi_formats)&&bi_formats[useFormat])||bi_formats.gabc).nbsp) + "* " + addBoldItalic(line[1], terTones.accents, terTones.preparatory, terTones.afterLastAccent, useFormat, onlyVowels,useNovaVulgata?"":i+1,false,true,i));
        vr += tempString + '\n';
        r += "<p style='line-height:100%;margin: 6pt 0px;'>"
          + tempString
          + "</p>";
      }
    }
  }
  var filename;
  if(asCode) r+="</code>";
  if(gabc) {
    if(!asGabc && includeGloriaPatri) {
      try {
        gabc += "\n\n%" +
          applyPsalmTone({
            text: gloria_patri_end_vowels,
            gabc: removeIntonation($.extend(true,{},gTermination)),
            useOpenNotes: false,
            useBoldItalic: false,
            firstPrefix: true,
            onlyVowel: onlyVowels,
            format:gabcFormat,
            favor: 'termination'
          })+" (::)";
      } catch(e) { }
    }
    if(actuallyUpdate){
      filename = versesFilename(bi_formats[useFormat],$("#selPsalm").val(),$("#selTones").val(),$("#selEnd").val(),$("#cbSolemn")[0].checked)
      var header = getHeader(localStorage.psalmHeader||'');
      header["name"] = filename.replace(/\.[^.]*$/,'');
      header["initial-style"] = (useInitStyle) ? '1' : '0';
      header["annotation"] = annotationTextFormat($("#txtAnnotation").val(),
                                                  $("#selPsalm").val(),
                                                  $("#selTones").val(),
                                                  $("#selEnd").val());
      header["user-notes"] = annotationTextFormat($("#txtUserNotes").val(),
                                                  $("#selPsalm").val(),
                                                  $("#selTones").val(),
                                                  $("#selEnd").val());
      header["centering-scheme"] = selLang;
      gabc=header+gabc;
      $("#txtGabc").val(gabc);
      $("#txtGabc").keyup();
    }
  }
  last_syl = _syl;
  last_gSyl = _gSyl;
  if(actuallyUpdate){
    var verses=$("#verses")[0];
    verses.innerHTML = r;
    vtext= (useFormat == 'html') ? r : verses.innerText;
    try {
      var utf8=encode_utf8(vtext);
      var url="data:text/plain;charset=utf8;base64,"+btoa(utf8);
      $("#lnkDownloadVerses")
        .attr("charset","UTF-8")
        .prop("href",url)
        .prop("download",filename)
        .attr("data-downloadurl","text/plain:"+filename+":"+url);
    } catch(e) {
      vtext="";
    }
    if(vtext){
      $("#lnkDownloadVerses").show();
    }else{
      $("#lnkDownloadVerses").hide();
    }
  } else {
    if(!asGabc && !firstVerseAsGabc) gabc = null;
    return [gabc,vr];
  }
}

function updateVerseGabc() {
  gSyl = $("#versegabc").val();
  updateCustomTone();
  updateEditor();
}

function updateText() {
  syl = $("#versetext").val();
  updateEditor();
}

function updateEndings() {
  //update text of delete tone button
  var name = $("#selTones").val();
  var onlyReset = (name in o_g_tones);
  $("#btnDelTone").val((onlyReset?"Reset":"Delete") + " Tone")
    .attr("disabled",onlyReset && JSON.stringify(o_g_tones[name])==JSON.stringify(g_tones[name]));

  $("#selEnd").empty();
  var tone = $("#selTones").val();
  localStorage.selTones = tone;
  var endings = getEndings(tone);
  var t = g_tones[tone];
  _clef = t.clef;
  var solemn=$("#cbSolemn")[0].checked;
  var vgabc = (solemn&&t.solemn)||t.mediant;
  vgabc += "\n";
  if(endings.length == 0) {
    vgabc += t.termination||t.mediant;
  } else {
    $("#selEnd").append('<option>' + endings.join('</option><option>') + '</option>');
    vgabc += t.terminations[$("#selEnd").val()];
  }
  gShortMediant = getGabcTones((solemn&&t.shortSolemn)||t.shortMediant||t.solemn||t.mediant);
  $("#selEnd")[0].disabled = (endings.length <= 1);
  $("#versegabc").val(vgabc);
  $("#txtClef").val(t.clef);
  gSyl = vgabc;
  updateEditor();
}

function updateEnding() {
  var tone = $("#selTones").val();
  var selEnd = $("#selEnd").val();
  var solemn = $("#cbSolemn")[0].checked;
  if(solemn)$("#cbRepeatIntonation")[0].checked=localStorage.cbRepeatIntonation=repeatIntonation=true;
  localStorage.selEnd = selEnd;
  localStorage.cbSolemn = solemn;
  var t = g_tones[tone];
  _clef = t.clef;
  var vgabc = (solemn&&t.solemn)||t.mediant;
  vgabc+="\n";
  if(t.terminations) {
    vgabc += t.terminations[selEnd];
  } else {
    vgabc += t.termination||t.mediant;
  }
  gShortMediant = getGabcTones((solemn&&t.shortSolemn)||t.shortMediant||t.solemn||t.mediant);
  $("#versegabc").val(vgabc);
  $("#txtClef").val(t.clef);
  gSyl = vgabc;
  updateEditor();
}

function getPsalms() {
  var r = [];
  for(var i = 1; i <= 150; i++) {
    r.push(i);
    if(i.toString() in splitPsalmsMap) {
      var splits = splitPsalmsMap[i.toString()];
      if (splits.length) splits = { "": splits };
      for (key of Object.keys(splits)) {
        var split = splits[key];
        for(var j = 0; j < split.length; j++) {
          var ID = i + '.' + (j+1) + (key ? ' (' + key + ')' : '');
          r.push(ID);
        }
      }
    }
    if (i.toString() + '&' in splitPsalmsMap) {
      var joins = splitPsalmsMap[i.toString() + '&'];
      if (joins.length) joins = { "": joins };
      for (key of Object.keys(joins)) {
        var join = joins[key];
        for (var j = 0; j < join.length; j++) {
          var ID = (i + '&' + join[j]).replace(/&/g,' & ') + (key ? ' (' + key + ')' : '');
          r.push(ID);
        }
      }
    }
  }
  return r;
}

function updatePsalm() {
  var psalmNum = $("#selPsalm").val();
  $("#cbRepeatIntonation")[0].checked= localStorage.cbRepeatIntonation = repeatIntonation = psalmNum.match(/^(?:[\d\.]+$|Canticum )/)?false:true;
  
  localStorage.selPsalm = psalmNum;
  includeGloriaPatri = $("#cbIncludeGloriaPatri")[0].checked;
  localStorage.cbIncludeGloriaPatri = includeGloriaPatri;
  useNovaVulgata = $("#cbUseNovaVulgata")[0].checked;
  localStorage.cbUseNovaVulgata = useNovaVulgata;
  $(`#selPsalm option.${useNovaVulgata ? '' : 'nova-'}vulgata`).attr('disabled', true);
  $(`#selPsalm option.${useNovaVulgata ? 'nova-' : ''}vulgata`).attr('disabled', false);
  getPsalm(psalmNum,includeGloriaPatri,useNovaVulgata,function(text) {
    var vt = $("#versetext");
    vt.val(text);
    updateText();
  });
}

function updateGloriaPatri() {
  includeGloriaPatri = $("#cbIncludeGloriaPatri")[0].checked;
  localStorage.cbIncludeGloriaPatri = includeGloriaPatri;
  var vt = $("#versetext");
  var text=vt.val();
  var m=text.match("\\s"+gloria_patri.replace(/[?*\$\.]/g,"\\$&")+"$");
  if(includeGloriaPatri) {
    if(!m)vt.val(text+"\n"+gloria_patri);
  } else if(m)vt.val(text.slice(0,m.index));
  updateText();
}

function updateClef() {
  var clef = $("#txtClef").val();
  if(clef.length < 2)return;
  var baseClefI = parseInt(_clef[1],10);
  var clefI = parseInt(clef[1],10);
  var diff = (clefI - baseClefI) * 2;
  var vgabc = shiftGabc(gSyl,diff);
  
  var tone = $("#selTones").val();
  var t = g_tones[tone];
  var baseClefI=parseInt(t.clef[1],10);
  diff = (clefI - baseClefI) * 2;
  gShortMediant = getGabcTones(shiftGabc(t.shortMediant||t.solemn||t.mediant,diff));
  
  $("#versegabc").val(vgabc);
  gSyl = vgabc;
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
  if(!f.flex) f.flex = ['','','',''];
  var useGabcFormat = /^gabc(?:$|-)/.test(useFormat);
  if(useGabcFormat) {
    $("#cbFirstVerseGabc").attr('disabled','disabled');
  } else {
    $("#cbFirstVerseGabc").attr('disabled',false);
  }
  $("#chant-preview").toggle(useGabcFormat || $("#cbFirstVerseGabc").prop('checked'));
  $("#lblFirstVerseGabc").attr("title","Use GABC for first verse instead of "+useFormat);
  $("#txtBeginPrep").val(f.italic[0]);
  $("#txtEndPrep").val(f.italic[1]);
  $("#txtBeginAccented").val(f.bold[0]);
  $("#txtEndAccented").val(f.bold[1]);
  $("#txtBeginFlexAccented").val(f.flex[0]);
  $("#txtEndFlexAccented").val(f.flex[1]);
  $("#txtBeginFlex").val(f.flex[2]);
  $("#txtEndFlex").val(f.flex[3]);
  $("#txtPrefix").val(f.verse[0]||"");
  $("#txtSuffix").val(f.verse[1]||"");
  $("#txtNbsp").val(f.nbsp);
  $("#txtVersesFilename").val(f.versesName);
  $("#txtAnnotation").val(f.annotation);
  $("#txtUserNotes").val(f.userNotes);
  updateEditor((JSON.stringify(gabcFormat) != JSON.stringify(oldGabcFormat)) || useFormat.match(/gabc(?=$|-)/) || oldFormat.match(/gabc(?=$|-)/));
}
function sanitizeFormats(bi_formats) {
  for(key in bi_formats) {
    var format = bi_formats[key];
    for(i in format) {
      var values = format[i];
      if(values.constructor === [].constructor) {
        for(var j=0; j<values.length; ++j) {
          var val = values[j];
          var indexOfLt = val.lastIndexOf('<');
          if(indexOfLt >= 0 && val.indexOf('>',indexOfLt) < 0) {
            values[j] += '>';
          }
        }
      }
    }
  }
}
function storeBiFormatsAndUpdate() {
  sanitizeFormats(bi_formats);
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
function updateBeginFlexAccented() {
  bi_formats[useFormat].flex[0] = $("#txtBeginFlexAccented").val();
  storeBiFormatsAndUpdate();
}
function updateEndFlexAccented() {
  bi_formats[useFormat].flex[1] = $("#txtEndFlexAccented").val();
  storeBiFormatsAndUpdate();
}
function updateBeginFlex() {
  bi_formats[useFormat].flex[2] = $("#txtBeginFlex").val();
  storeBiFormatsAndUpdate();
}
function updateEndFlex() {
  bi_formats[useFormat].flex[3] = $("#txtEndFlex").val();
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
function updatePrefix() {
  bi_formats[useFormat].verse[0] = $("#txtPrefix").val();
  storeBiFormatsAndUpdate();
}
function updateSuffix() {
  bi_formats[useFormat].verse[1] = $("#txtSuffix").val();
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
function updateAnnotation() {
  bi_formats[useFormat].annotation = $("#txtAnnotation").val();
  storeBiFormatsAndUpdate();
}
function updateUserNotes(){
  bi_formats[useFormat].userNotes = $("#txtUserNotes").val();
  storeBiFormatsAndUpdate();
}

function updateCustomTone(name){
  name=name||$("#selTones").val();
  $("#btnDelTone").attr("disabled",false);
  var temp=gSyl.split('\n');
  custom_tones[name] = g_tones[name] || {};
  custom_tones[name].clef = $("#txtClef").val();
  custom_tones[name].mediant = temp[0]||"";
  var termination = temp[1]||"";
  var ending = $("#selEnd").val();
  if(ending && custom_tones[name].terminations){
    custom_tones[name].terminations[ending] = termination;
  }
  custom_tones[name].termination = termination;
  g_tones=$.extend({},g_tones,custom_tones);
  localStorage.customTones = JSON.stringify(custom_tones);
}
function newTone(){
  var name = prompt("Please enter a name for the new custom tone");
  while(name.length>0 && name in g_tones) {
    name = prompt("There is already a tone named '" + name + "'.  Please enter a new name.");
  }
  if(name.length > 0) {
    updateCustomTone(name);
    $("#selTones optgroup").empty().append('<option>' + getPsalmTones(custom_tones).join('</option><option>') + '</option>');
    $("#selTones").val(name);
    updateEndings();
  }
}
function deleteTone() {
  var name = $("#selTones").val();
  var onlyReset = (name in o_g_tones);
  var q = "Really " + (onlyReset?"reset":"delete") + " the tone '" + name + "'?";
  if(confirm(q)) {
      delete custom_tones[name]
    if(onlyReset) {
      g_tones[name] = $.extend(true,{},o_g_tones[name]);
    } else {
      delete g_tones[name];
      var sel = $("#selTones")[0];
      $(sel).find("option:eq("+sel.selectedIndex+")").remove();
      var ttones=getPsalmTones(custom_tones);
      ttones = ttones.length? '<option>' + ttones.join('</option><option>') + '</option>' : '';
      $("#selTones optgroup").empty().append(ttones);
    }
    localStorage.customTones = JSON.stringify(custom_tones);
    updateEndings();
  }
}

function newFormat() {
  var name = prompt("Please enter a name for the new custom format");
  while(name.length>0 && name in bi_formats) {
    name = prompt("There is already a format named '" + name + "'.  Please enter a new name.");
  }
  if(name.length > 0) {
    bi_formats[name] = {italic:["_","_"],bold:["*","*"],flex:["","","",""],nbsp:" ",verse:["$c. ",""]};
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

function updateInitStyle() {
  localStorage.cbInitStyle = useInitStyle = $("#cbInitStyle")[0].checked;
  updateEditor(true);
}
function updateOnlyVowels() {
  localStorage.cbOnlyVowels = onlyVowels = $("#cbOnlyVowels")[0].checked;
  updateEditor(true);
}
function updateUsePunctaCava() {
  localStorage.cbUsePunctaCava = usePunctaCava = $("#cbUsePunctaCava")[0].checked;
  updateEditor(true);
}
function updateRepeatIntonation() {
  localStorage.cbRepeatIntonation = repeatIntonation = $("#cbRepeatIntonation")[0].checked;
  updateEditor(useFormat.match(/gabc/i));
}
function updateItalicizeIntonation() {
  localStorage.cbItalicizeIntonation = italicizeIntonation = $("#cbItalicizeIntonation")[0].checked;
  updateEditor(true);
}
function printMe(){
  $(document.body).css("max-width","7in");
  //setPrintFont(true);
  forceUpdateChant();
  window.print();
  $(document.body).css("max-width","initial");
  //setPrintFont(false);
  $("#txtGabc").keyup();
}
function errorHandler(e){
  console.error(e);
}
var cancelZipping=false;
function cancelZip(e){
  e.preventDefault();
  cancelZipping=true;
  $("#lnkCancelZip").hide();
}
function annotationTextFormat(text,psalmNum,tone,ending){
  var tone = tone.replace(/Introit /g,'').match(/^\S+/)[0];
  tone = tone + (ending ? ending : '');
  if(psalmNum.match(/\d+/)){
    psalmNum='Psalm ' + psalmNum;
  }
  psalmNum += '.';
  return text.format({"psalm":psalmNum,
                       "tone":tone});
}
function versesFilename(format,psalmNum,tone,ending,solemn,includeExtra){
  tone = tone.replace(/\./g,'');
  if (includeExtra) {
    tone = tone.trim().replace(/\s+/g,'-');
  } else {
    var match = tone.match(/\d+/);
    if(match)tone=match[0];
  }
  if (ending && /\D$/.test(tone)) tone += '-';
  if (solemn && /^\D/.test(tone)) tone = '-' + tone;
  tone = (solemn?"solemn":"") + tone + (ending? ending.replace(/\*/,"star") : '');
  return format && ((format.versesName) ? format.versesName.format(
    {"psalm":psalmNum,
      "tone":tone
    }) : (psalmNum + '-' + tone + ".txt"));
}
function downloadAll(e){
  e.preventDefault();
  cancelZipping=false;
  $("#lnkDownloadAll").hide();
  $("#lnkCancelZip").show();
  var zip = new JSZip();
  var psalms = getPsalms();
  var canticles = getCantica();
  var firstCanticleIndex = psalms.length;
  psalms = psalms.concat(canticles);
  var includeGloriaPatri = $("#cbIncludeGloriaPatri")[0].checked;
  var useNovaVulgata = $("#cbUseNovaVulgata")[0].checked;
  var clef;
  var addPsalm=function(psalmNum,text,t,ending,gSyl,shortMediant,solemn){
    var texts = updateEditor(true,text,gSyl,shortMediant,clef);
    var filename = versesFilename(bi_formats[useFormat],psalmNum,t,ending,solemn, true);
    var header = getHeader(localStorage.psalmHeader||'');
    header["initial-style"] = '0';
    header["name"] = filename.replace(/\.[^.]*$/,'');
    header["annotation"] = annotationTextFormat(bi_formats[useFormat].annotation,
                                                String(psalmNum),
                                                t,
                                                ending);
    header["user-notes"] = annotationTextFormat(bi_formats[useFormat].userNotes,
                                                String(psalmNum),
                                                t,
                                                ending);
    let replaceAsh = function(str) { return str.replace(/æ/g,'ae').replace(/Æ/g, 'Ae') };
    if(texts[0]) zip.add(replaceAsh(header["name"] + ".gabc"),header + texts[0]);
    if(texts[1].length>0)zip.add(replaceAsh(filename),texts[1]);
  };
  var getNextPsalm = function(i){
    if(cancelZipping){
      $("#lnkCancelZip").hide();
      $("#spnProgressZip").text("");
      $("#lnkDownloadAll").show();
      return;
    }
    var psalmNum = psalms[i];
    if (i === firstCanticleIndex || !psalmNum) {
      $("#spnProgressZip").text("Zipping...");
      var data = zip.generate(true);
      var byteArray = new Uint8Array(data.length);
      for (var idx = 0; idx < data.length; idx++) {
          byteArray[idx] = data.charCodeAt(idx) & 0xff;
      }
      var blob = new Blob([byteArray.buffer], {type: 'application/zip'});
      saveAs(blob, psalmNum ? 'psalms.zip' : 'canticles.zip', true);
      if (psalmNum) {
        zip = new JSZip();
      }
    }
    if(psalmNum){
      getPsalm(psalmNum,includeGloriaPatri,useNovaVulgata,function(text) {
        text = text.replace(/ \d+ /g,' ');
        var alsoSolemn = isNaN(parseInt(psalmNum));
        for(var t in g_tones) {
          if(t != 'per.' && isNaN(parseInt(t[0])))continue;
          var ctone=g_tones[t];
          clef = ctone.clef;
          var solemn=false;
          var shortMediant = getGabcTones(ctone.shortMediant||ctone.solemn||ctone.mediant);
          if(ctone.terminations){
            for(var ending in ctone.terminations){
              ctermination=ctone.terminations[ending];
              addPsalm(psalmNum,text,t,ending,ctone.mediant+"\n"+ctermination,shortMediant);
              if(alsoSolemn)addPsalm(psalmNum,text,t,ending,ctone.solemn+"\n"+ctermination,ctone.shortSolemn||shortMediant,true);
            }
          } else {
            addPsalm(psalmNum,text,t,"",ctone.mediant+"\n"+ctone.termination,shortMediant);
            if(alsoSolemn)addPsalm(psalmNum,text,t,"",ctone.solemn+"\n"+ctermination,ctone.shortSolemn||shortMediant,true);
          }
        }
        ++i;
        $("#spnProgressZip").text("Generated " + i + " of " + psalms.length);
        getNextPsalm(i);
      }, function() { getNextPsalm(++i); });
    } else {
      $("#spnProgressZip").text("");
      $("#lnkDownloadAll").show();
      $("#lnkCancelZip").hide();
    }
  };
  getNextPsalm(0);
}
function editorKeyDown(e) {
  if(e.which==9) {
    var index, indexEnd, $this = $(this), txt = $this.val();
    e.preventDefault();
    if(e.shiftKey) {
      // go backwards
      index = this.selectionStart;
      index = txt.lastIndexOf(')',index - 1);
      if(index < 0) index = txt.lastIndexOf(')');
      if(index >= 0) {
        indexEnd = index;
        index = txt.lastIndexOf('(',index);
      }
    } else {
      index = this.selectionEnd;
      index = txt.indexOf('(',index);
      if(index < 0) index = txt.indexOf('(');
      if(index >= 0) {
        indexEnd = txt.indexOf(')',index);
      }
    }
    if(index >= 0 && indexEnd >= 0) {
      this.selectionStart = index + 1;
      this.selectionEnd = indexEnd;
    }
  }
}
function updateLocalHeader() {
  var gabc = $("#txtGabc").val();
  var header=getHeader(gabc);
  localStorage.psalmHeader=header;
}
function windowResized(){
  var $cp = $("#chant-parent2");
  var totalHeight = $(window).height() - $cp.position().top - 10;
  totalHeight = Math.max(120,totalHeight);
  $cp.height(totalHeight);
  if(exsurge.layoutMyChant) exsurge.layoutMyChant();
}
function updateVerseGabcStar(newStar){
  if(typeof(newStar)!='string') {
    newStar = $(this).val();
  }
  if(typeof(newStar)!='string' || newStar.length == 0) newStar = sym_med;
  localStorage.gabcStar = gabcStar = newStar;
  updateEditor(true);
}
function updateVerseGabcFlex(newFlex){
  if(typeof(newFlex)!='string') {
    newFlex = $(this).val();
  }
  if(typeof(newFlex)!='string' || newFlex.length == 0) newFlex = sym_flex;
  localStorage.gabcFlex = gabcFlex = newFlex;
  updateEditor(true);
}
$(function() {
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
  $("#txtGabcStar").val(gabcStar).keyup(updateVerseGabcStar);
  $('#txtGabcFlex').val(gabcFlex).keyup(updateVerseGabcFlex);
  $("label[title][for]").each(function() {
    var forId = this.getAttribute('for');
    $("#" + forId).attr('title',this.title);
  });
  $("#chant-parent2").resizable({handles:"e"});
  $(window).resize(windowResized);
  function parseHash() {
    var regexKeyVal = /(?:^|#)(psalm|tone|ending|solemn|format|(?:no)?editor)(?:=([^#]+))?/g;
    var hash = {}, curMatch;
    while(curMatch = regexKeyVal.exec(location.hash)) {
      hash[curMatch[1]] = (typeof(curMatch[2])=='undefined')? true : curMatch[2];
    }
    return hash;
  }
  var hash = parseHash();
  $(window).on('hashchange',function(){
    hash = parseHash();
    if(hash.solemn) $("#cbSolemn")[0].checked = (hash.solemn == "true");
    if(hash.format) $("#selFormat").val((useFormat = hash.format));
    if(hash.psalm)  $("#selPsalm").val(hash.psalm);
    if(hash.tone)   $("#selTones").val(hash.tone);
    if(hash.ending && $("#selEnd")[0].firstChild) $("#selEnd").val(hash.ending);
    if(hash.editor && hash.noeditor) delete hash.noeditor;
    $('#chant-parent2').toggleClass('noeditor',hash.noeditor?true:false);
  });
  var cbEnglishChanged = function(){
    selLang = cbEnglish.checked? 'english' : 'latin';
    localStorage.selLang = selLang;
    getSyllables = cbEnglish.checked? _getEnSyllables : _getLaSyllables;
    last_syl = null;
    updateText();
  };
  $("#cbEnglish").click(cbEnglishChanged);
  $("#selTones").append('<option>' + getPsalmTones().join('</option><option>') + '</option><optgroup label="Custom"></optgroup>');
  $("#selPsalm").append('<optgroup label="Psalms"><option>' + getPsalms().join('</option><option>') + '</option></optgroup>' +
                        '<optgroup label="Canticles">' + getCanticaOptions() + '</optgroup>');
  $(`#selPsalm option.${useNovaVulgata ? '' : 'nova-'}vulgata`).attr('disabled', true);
  $(`#selPsalm option.${useNovaVulgata ? 'nova-' : ''}vulgata`).attr('disabled', false);
  $("#selFormat").append('<option>' + Object.keys(bi_formats).join('</option><option>') + '</option>');
  $("#versegabc").keyup(updateVerseGabc);
  $("#versetext").keyup(updateText).keydown(internationalTextBoxKeyDown);
  $("#selTones").change(updateEndings);
  $("#selTones").keyup(updateEndings);
  $("#cbSolemn").change(updateEnding);
  $("#cbInitStyle").change(updateInitStyle);
  $("#cbOnlyVowels").change(updateOnlyVowels);
  $("#cbRepeatIntonation").change(updateRepeatIntonation);
  $("#cbItalicizeIntonation").change(updateItalicizeIntonation);
  $("#cbUsePunctaCava").change(updateUsePunctaCava);
  $("#selFormat,#cbFirstVerseGabc").change(updateFormat);
  $("#selFormat").keyup(updateFormat);
  $("#selEnd").change(updateEnding);
  $("#selEnd").keyup(updateEnding);
  $("#selPsalm,#cbUseNovaVulgata").change(updatePsalm);
  $("#txtPrefix").keyup(updatePrefix);
  $("#txtSuffix").keyup(updateSuffix);
  $("#txtNbsp").keyup(updateNbsp);
  $("#txtVersesFilename").keyup(updateVersesFilename);
  $("#txtAnnotation").keyup(updateAnnotation);
  $("#txtUserNotes").keyup(updateUserNotes);
  $("#txtClef").keyup(updateClef);
  $("#btnNewFormat").click(newFormat);
  $("#btnNewTone").click(newTone);
  $("#btnDelTone").click(deleteTone);
  $("#btnDelFormat").click(deleteFormat);
  //$("#btnPrint").click(printMe);
  $("#selPsalm").keyup(updatePsalm);
  $("#cbSolemn")[0].checked = ((hash.solemn || localStorage.cbSolemn) == "true");
  $("#cbOnlyVowels")[0].checked = onlyVowels = (localStorage.cbOnlyVowels == "true");
  $("#cbInitStyle")[0].checked = useInitStyle = (localStorage.cbInitStyle != "false");
  $("#cbUsePunctaCava")[0].checked = usePunctaCava = (localStorage.cbUsePunctaCava != "false");
  $("#cbRepeatIntonation")[0].checked = repeatIntonation = (localStorage.cbRepeatIntonation == "true");
//  $("#cbItalicizeIntonation")[0].checked = italicizeIntonation = (localStorage.cbItalicizeIntonation == "true");
  $("#selFormat").val((useFormat = hash.format || (localStorage.cbTeX? "tex" : (localStorage.selFormat || "html"))));
  $("#selPsalm").val(hash.psalm || localStorage.selPsalm || "Magnificat");
  $("#selTones").val(hash.tone || localStorage.selTones || "1");
  $("#txtBeginPrep").keyup(updateBeginPrep);
  $("#txtEndPrep").keyup(updateEndPrep);
  $("#txtBeginAccented").keyup(updateBeginAccented);
  $("#txtEndAccented").keyup(updateEndAccented);
  $("#txtBeginFlexAccented").keyup(updateBeginFlexAccented);
  $("#txtEndFlexAccented").keyup(updateEndFlexAccented);
  $("#txtBeginFlex").keyup(updateBeginFlex);
  $("#txtEndFlex").keyup(updateEndFlex);
  $("#cbIncludeGloriaPatri").change(updateGloriaPatri);
  $("#cbIncludeGloriaPatri")[0].checked = (localStorage.cbIncludeGloriaPatri != "false");
  $("#cbUseNovaVulgata")[0].checked = useNovaVulgata = (localStorage.cbUseNovaVulgata == "true");
  $("#txtGabc").keyup(updateLocalHeader).keydown(editorKeyDown);
  $("#lnkDownloadVerses").bind("dragstart",onDragStart);
  $("#lnkDownloadAll").click(downloadAll);
  $("#lnkCancelZip").click(cancelZip);
  function gabcReplace(gabc){
    return gabc.
      replace(/\[ocb:[01]\{]/g,'[ocba:1;6mm]').
      replace(/\[ocb:[01]}]/g,'')
  }

  var getGabc = function(){
    var gabc = $('#txtGabc').val(),
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
    var gabcs=[gabcReplace(getGabc())];
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
  updateEndings();
  windowResized();
  if($("#selEnd")[0].firstChild) $("#selEnd").val(hash.ending || localStorage.selEnd || $("#selEnd")[0].firstChild.innerText);
  updateEnding();
  updatePsalm();
  updateFormat();
  localStorage.removeItem("cbTeX");
  if(localStorage.customTones){
    custom_tones=JSON.parse(localStorage.customTones);
    var ttones = getPsalmTones(custom_tones);
    if(ttones.length>0){
      g_tones=$.extend({},g_tones,custom_tones);
      $("#selTones optgroup").append('<option>' + getPsalmTones(custom_tones).join('</option><option>') + '</option>');
    }
  } else {
    g_tones = $.extend({},g_tones);
  }
  if(hash.noeditor) {
    $('#chant-parent2').addClass('noeditor');
  }
  var ctxt = makeExsurgeChantContext();
  var chantContainer = $('#chant-preview')[0];
  var score;
  $('#txtGabc').keyup(function(){
    updateLinks(this.value);
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
  });
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