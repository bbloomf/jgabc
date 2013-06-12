var gabcStar = '*';
var selDay,selTempus='',selPropers,sel={
  tractus:{},
  offertorium:{},
  introitus:{},
  graduale:{},
  communio:{},
  alleluia:{},
  sequentia:{}
},includePropers=[]
$(function(){
  $('#menu').menu({select: function(e,ui){e.preventDefault();}});
  var partAbbrev = {
    tractus:'Tract.',
    offertorium:'Offert.',
    introitus:'Intr.',
    graduale:'Grad.',
    communio:'Comm.'
  };
  var defaultTermination={
    '1':'f',
    '3':'a',
    '4':'E',
    '7':'a',
    '8':'G'
  }
  var regexGabcGloriaPatri = /Gl[oó]\([^)]+\)ri\([^)]+\)a\([^)]+\)\s+P[aá]\([^)]+\)tri\.?\([^)]+\)\s*\(::\)\s*s?[aeæ]+\([^)]+\)\s*c?u\([^)]+\)\s*l?[oó]\([^)]+\)\s*r?um?\.?\([^)]+\)\s*[aá]\(([^)]+)\)\s*m?en?\.?\(([^)]+)\)/i;
  var removeDiacritics=function(string) {
    if(typeof(string) != 'string') return '';
    return string.replace(/á/g,'a').replace(/é|ë/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u').replace(/ý/g,'y').replace(/æ|ǽ/g,'ae').replace(/œ/g,'oe').replace(/[,.;?“”‘’"':]/g,'');
  };
  var getGabcForPropers=function(propers,part,text){
    var id = propers[part + 'ID'];
    if(id) { return id; }
    var proper = text || propers[part];
    var ids = chantID[part];
    var properLines = proper.split('\n');
    var i=0;
    var firstLine = properLines[i];
    while(firstLine[0]=='!') {
      firstLine = properLines[++i];
    }
    firstLine = firstLine.replace(/^v.\s+/i,'');
    firstLine = removeDiacritics(firstLine.toLowerCase());
    firstWords = firstLine.split(/\s+/);
    var n = 1;
    while(!id) {
      id = ids[firstWords.slice(0,n++).join(' ')];
      if(n > firstWords.length) return;
    }
    if(id.psalm) {
      var psalm = properLines[++i];
      while(psalm.slice(0,3)!='!Ps') {
        psalm = properLines[++i];
      }
      psalm = properLines[++i];
      psalm = removeDiacritics(psalm.toLowerCase());
      psalmWords = psalm.split(/\s+/);
      n = 1;
      var idd;
      while(!idd) {
        idd = id.psalm[psalmWords.slice(0,n++).join(' ')];
        if(n > psalmWords.length) return;
      }
      id = idd;
    }
    if(id.Solesmes) id = id.Solesmes;
    if(id.Vatican) id = id.Vatican;
    console.info(id);
    return id.id;
  };
  var parseGraduale = function(graduale) {
    graduale = graduale.replace(/lleluia/g,'llelúja');
    var match = /^([^}]*?)Allelúja, allelúja[.,]?\s+([^}]*)/.exec(graduale);
    var result = {};
    if(match) {
      if(match[1]) result.graduale = match[1];
      result.alleluia = match[2];
    } else {
      match = /(![^\n]+[^}]+)\n(![^}]+)/.exec(graduale);
      if(!match) return {graduale:graduale};
      result.graduale = match[1];
      result.tractus = match[2];
    }
    return result;
  }
  var romanNumeral = ['','i','ii','iii','iv','v','vi','vii','viii'];
  var updatePart = function(part) {
    var id = selPropers[part+'ID'];
    var capPart = part[0].toUpperCase()+part.slice(1);
    var $div = $('#div'+capPart);
    var $includePart = $('#include'+capPart);
    if(id) {
      $includePart.parent('li').removeClass('ui-state-disabled');
      var $txt = $('#txt'+capPart);
      $($txt.prop('labels')).find('a').attr('href','http://gregobase.selapa.net/chant.php?id='+id);
      $div.show();
      $.get('gabc/'+id+'.gabc',function(gabc){
        gabc = gabc.replace(/\s+$/,'').replace(/<sp>V\/<\/sp>\./g,'<sp>V/</sp>');
        var text = sel[part].text = versify(decompile(gabc,true));
        var truePart = isAlleluia(part,text)? 'alleluia' : part;
        if(part == 'graduale') {
          if(truePart == 'alleluia') {
            $('#optFullPsalmToneGraduale').show();
          } else {
            $('#optFullPsalmToneGraduale').hide();
            var $style = $('#selStyleGraduale');
            if($style.val()=='psalm-tone1') {
              $style.val('psalm-tone');
            }
          }
        }
        var header = getHeader(gabc);
        var romanMode = romanNumeral[header.mode];
        if(partAbbrev[truePart]) {
          header.annotation = partAbbrev[part];
          header.annotationArray = [header.annotation, romanMode];
        } else {
          header.annotation = romanMode;
        }
        gabc = header + gabc.slice(header.original.length);
        sel[part].gabc = gabc;
        $('#selTone' + capPart).val(header.mode).change();
      });
    } else {
      $div.hide();
      $includePart.parent('li').addClass('ui-state-disabled');
    }
  }
  var updateDay = function() {
    selPropers = proprium[selDay + selTempus];
    if(selPropers) {
      updatePart('introitus');
      updatePart('graduale');
      updatePart('alleluia');
      updatePart('tractus');
      updatePart('sequentia');
      updatePart('offertorium');
      updatePart('communio');
    }
  }
  
  var selectedDay = function(e){
    selDay = $(this).val();
    var self = this;
    $('#selSunday,#selMass').each(function(i,o){
      if(this != self) this.selectedIndex = 0;
    });
    if((selDay + 'Pasch') in proprium || (selDay + 'Quad') in proprium) {
      $('#selTempus').show();
    } else {
      selTempus = '';
      $('#selTempus').prop('selectedIndex',0).hide();
    }
    updateDay();
  };
  var selectedTempus = function(e){
    selTempus = $(this).val();
    updateDay();
  };
  
  
  
  var decompile = function(mixed,ignoreSyllablesOnDivisiones) {
    regexOuter.exec('');
    var curClef;
    var regRep=/^[cf]b?[1-4]\s*|(\s+)[`,;:]+\s*/gi;
    var text='';
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
        if(!m||m[4])text += tws;
      } else {
        text += tws;
      }
      if(ignoreSyllablesOnDivisiones) {
        if(match[rog.gabc].indexOf('::')>=0) text += '~';
        else if(match[rog.gabc].indexOf(':')>=0) text += ' % ';
        else if(match[rog.gabc].indexOf(';')>=0) text += ' | ';
      }
      if(syl && (!ignoreSyllablesOnDivisiones || !match[rog.gabc].match(/^(?:(?:[cf]b?[1-4])|[:;,\s])*$/) || syl.match(/<i>Ps\.?<\/i>/))){
        var sylR=syl.replace(/<i>([aeiouy])<\/i>/ig,'($1)');
        hasElisions = hasElisions||(syl!=sylR);
        if(sylR[0]=='e' && text.slice(-1)=='a') {
          sylR = 'ë' + sylR.slice(1);
        }
        text += sylR;
      }
      gabc+=match[rog.gabc] + (ws.replace(/[^\n]*\n[^\n]*/g,'\n')||" ");
      var nextMatch=regexOuter.exec(mixed);
      
      tws=ws;
      match=nextMatch;
    }
    if(tws)text += tws;
    regexGabc.exec('');
    var gs =verses.join('\n--\n');
    gSyl=[];
    var offset = 0;
    $.each(verses,function(i,o){
      gSyl.push(splitGabc(o,offset));
      offset += o.length + 4;
    });

    //gSyl = splitGabc(gs);
    var s = text.replace(/\s+/g,' ').replace(/^\s+|\s+$|[*{}-]/g,'');
    var index=s.indexOf(' ');
    if(index>1) {
      // make the rest of the first word minuscule
      s=s[0] + s.slice(1,index).toLowerCase() + s.slice(index);
    }
    s = s.replace(/\s*~\s*/g,'\n').replace(/%/g,'*').replace(/(\|\s*)*(\*\s*)+(\|\s*)*/g,'* ');
    return s;
  };
  var getSylCount = function(splitArray) {
    var syls=[];
    for(var j=0; j<splitArray.length; ++j) {
      syls[j] = (splitArray[j].match(reVowels) || []).length;
    }
    return syls;
  }
  
  var reFullBarsWithNoPunctuation = /([^;:,.!?\s])\s*\*/g;
  var reHalfBarsWithNoPunctuation = /([^;:,.!?\s])\s*\|/g;
  var reBarsWithNoPunctuation = /([^;:,.!?\s])\s*[|*]/g;
  var reFullBars = /\*/g;
  var reHalfBars = /\|/g;
  var reCommaWords = /[,]\s/g;
  var reFullStops = /[.:;!?]\s/g;
  var reVowels = /[aeiouyáéíóúýæǽœ]/ig;
  var splitIntoVerses = function(line){
    var fullbars = line.match(reFullBars);
    var halfbars = line.match(reHalfBars);
    if(!fullbars && !halfbars) {
      line = line.replace(reCommaWords,function(a){return a + '| '})
                 .replace(reFullStops,function(a){return a + '* '});
      fullbars = line.match(reFullBars);
      halfbars = line.match(reHalfBars);
    }
    var split;
    if(fullbars) {
      verses = [];
      split = line.split(reFullBars);
      var i=0;
      for(var j=1; j<=split.length; ++j) {
        var left = split.slice(i,j).join('*');
        var normalizedLeft = normalizeMediant(left).split('*');
        var segmentsRemaining = split.length - j;
        if(normalizedLeft.length == 2 && Math.min.apply(null,getSylCount(normalizedLeft))>=7) {
          if (segmentsRemaining == 1) {
            //Check to make sure the one remaining segment can also be split.
            var right = split[j];
            var normalizedRight = normalizeMediant(right).split('*');
            if(normalizedRight.length != 2 || Math.min.apply(null,getSylCount(normalizedRight))<7) {
              j++;
            }
          }
          verses.push(split.slice(i,j).join('*'));
          i = j;
        }
        if(j == split.length && j>i) {
          verses.push(split.slice(i,j).join('*'));
        }
      }
      return verses;
    } else {
      return [line];
    }
  }
  var sum = function(array){
    var result = 0;
    for(var i=array.length-1; i>=0; --i){
      result += array[i];
    }
    return result;
  }
  var makeVerse = function(arrayVerse) {
    var syls = getSylCount(arrayVerse);
    for(var i=1;i<arrayVerse.length; ++i) {
      var left = sum(syls.slice(0,i));
      var right = sum(syls.slice(i));
      if(left >= right || i==(arrayVerse.length-1)) {
        var leftText;
        if(left >= 20) {
          leftText = normalizeMediant(arrayVerse.slice(0,i).join('*'));
          var leftArray = leftText.split('*');
          var leftSyls = getSylCount(leftArray);
          if(leftSyls.length==2 && Math.min.apply(null,leftSyls)>=10) {
            leftText = leftText.replace('*','†') + ' ';
          } else {
            leftText = null;
          }
        }
        if(!leftText) leftText = arrayVerse.slice(0,i).join('');
        var result = (leftText + '*' + arrayVerse.slice(i).join('')).replace(/\s*\|\s*|\s+/g,' ').replace(/^\s+|\s+$/g,'');
        return result[0].toUpperCase() + result.slice(1);
      }
    }
    return "";
  }
  var normalizeMediant = function(verse){
    var fullBars = verse.match(reFullBars);
    if(fullBars && fullBars.length >= 1) {
      return makeVerse(verse.split(reFullBars));
    }
    var halfBars = verse.match(reHalfBars);
    if(halfBars && halfBars.length >= 1) {
      return makeVerse(verse.split(reHalfBars));
    }
    return verse;
  }
  var versify = function(text){
    var lines = text.split('\n');
    var result = '';
    for(var i=0; i<lines.length; ++i) {
      var line = lines[i].replace(reBarsWithNoPunctuation,function(a,b){return b;});
      var verses = splitIntoVerses(line);
      if(verses.length == 1 && !line.match(reFullBars) && !line.match(reHalfBars)) {
        verses[0] = lines[i];
      }
      for(var j=0; j<verses.length; ++j) {
        result += normalizeMediant(verses[j]) + '\n';
      }
    }
    return result.replace(/^\s+|\s+$/,'');
  }
  
  var updateStyle = function(part,style){
    if(sel[part].style != style) {
      sel[part].style = style;
      var capPart = part[0].toUpperCase() + part.slice(1);
      var $selToneEnding = $('#selToneEnding' + capPart),
          $selTone = $('#selTone' + capPart),
          $cbSolemn = $('#cbSolemn' + capPart);
      if(style.match(/^psalm-tone/)) {
        if(part != 'graduale' || !isAlleluia(part,sel[part].text)) {
          $selToneEnding.show();
          $cbSolemn.show();
        }
        $selTone.attr('disabled',false);
      } else {
        $selToneEnding.hide();
        $cbSolemn.hide();
        var gabc = sel[part].gabc;
        $selTone.attr('disabled',true);
        if(gabc) {
          $selTone.val(getHeader(gabc).mode);
        }
      }
      $selTone.change();
    }
  }
  
  var capitalizeForBigInitial = function(text) {
    m = text.match(regexLatin);
    m = m && m[0].match(/^[a-z]+/i);
    if(m) {
      m = m[0];
      result = m[0].toUpperCase();
      if(m[1]) {
        result += m[1].toUpperCase();
        if(m[2] && m.length==3 && (text[3]==' ' || text[3]==',')) {
          result += m[2].toUpperCase();
        }
      }
    }
    return result + text.slice(result.length);
  }
  
  var shiftGabcForClefChange = function(gabc,oldClef,newClef) {
    if(newClef.length < 2)return;
    var baseClefI = parseInt(oldClef[1],10);
    var clefI = parseInt(newClef[1],10);
    var diff = (baseClefI - clefI) * 2;
    return shiftGabc(gabc,diff);
  }
  
  var applyLiquescents = function(gabc){
    return gabc.replace(/[aeiouyáéíóúýæǽœ][mn]\([^)]*([a-m])([a-l])\)(?=\S)/ig,function(m,first,second){
      if(first>second) return m.slice(0,-1) + '~)';
      return m;
    });
  }
  
  var psalmToneIntroitGloriaPatri = function(gMediant,gTermination,gAmenTones) {
    var gp = "Glória Pátri, et Fílio, et Spirítui Sáncto.\nSicut érat in princípio, et núnc, et sémper, * et in sǽcula sæculórum. Amen.".split('\n');
    var result = applyPsalmTone({
      text: gp[0],
      gabc: gMediant,
      format: bi_formats.gabc
    });
    result = result.replace(/o,\([^)]+/,function(m){return m+'.) (,';}) + ' *(:) ';
    
    var match = gTermination.match(/([^r]+)\s+[a-m]r\s/);
    var gTertium = match[1];
    // a hack for Introit tone 6.
    match = gTertium.match(/^\([^)]+\)\s+'/);
    if(match) {
      gTertium = match[0] + gMediant.match(/\s([a-m])r\s/)[1];
    }
    match = gMediant.match(/\s[a-m]r\s+.+$/);
    gTertium += match[0];
    gp[1] = gp[1].split('*');
    var temp = applyPsalmTone({
      text: gp[1][0].trim(),
      gabc: gTertium,
      format: bi_formats.gabc
    });
    result += temp.replace(/o,\([^)]+/,function(m){return m+'.) (,';}) + ' (:) ';
    temp = applyPsalmTone({
      text: gp[1][1].trim(),
      gabc: gTermination,
      format: bi_formats.gabc
    });
    if(gAmenTones){
      for(var i=2,index=temp.length; i>0; --i) {
        index = 1 + temp.lastIndexOf('(',index-2);
        if(index>0) {
          var index2 = temp.indexOf(')',index);
          if(index2>=0) {
            temp = temp.slice(0,index) + gAmenTones[i] + temp.slice(index2);
          }
        }
      }
    }
    return result + temp + " (::)\n";
  }
  
  var isAlleluia = function(part,text){
    return part=='alleluia' || (part=='graduale' && removeDiacritics(text).match(/^allelu[ij]a/i));
  }
  
  var getPsalmToneForPart = function(part){
    var text = sel[part].text;
    if(!text) return;
    var tone;
    var header = getHeader(sel[part].gabc||'');
    var termination = sel[part].termination;
    var mode = sel[part].mode;
    var solemn = sel[part].solemn;
    var isAl = isAlleluia(part,text);
    if(part=='introitus' || isAl) {
      tone = g_tones['Introit ' + mode];
    } else {
      tone = g_tones[mode + '.'];
    }
    if(!tone) return;
    _clef = tone.clef;
    var gMediant = (solemn && tone.solemn) || tone.mediant;
    var gTermination = tone.termination;
    if(!gTermination) {
      if(!(gTermination = tone.terminations[termination])) {
        for(i in tone.terminations) { gTermination = tone.terminations[i]; break; }
      }
    }
    var gabc;
    var lines;
    if(isAl) {
      if(sel[part].style=='psalm-tone1') {
        lines = sel[part].text.split('\n');
        var line = lines[0];
        gabc = header + '(' + tone.clef + ') ';
        if(line.match(/ij|bis/)) {
          if(part=='graduale') {
            if(sel['alleluia'].style!='psalm-tone1') {
              $('#selStyleAlleluia').val('psalm-tone1').change();
            }
          }
          var i = lines.length - 1;
          lines[i] = lines[i].replace(/([\.!?:;,]?)\s*$/,function(m,a){ return ', Allelúia' + a; });
          line = line.match(/s*([^!?.;,:\s]+)/)[1];
          line = capitalizeForBigInitial(line + ', ' + line + '.');
          gabc += applyPsalmTone({
              text: line,
              gabc: gTermination,
              useOpenNotes: false,
              useBoldItalic: false,
              onlyVowel: false,
              format: bi_formats.gabc,
              prefix: false,
              suffix: false,
              italicizeIntonation: false,
              favor: 'termination'
            }) + " (::)\n";
        } else {
          if(sel.graduale.style!='psalm-tone1') {
            $('#selStyleGraduale').val('psalm-tone1').change();
          }
        }
      } else {
        if(part=='graduale') {
          if(sel['alleluia'].style=='psalm-tone1') {
            $('#selStyleAlleluia').val('psalm-tone').change();
          }
        } else if(sel['graduale'].style=='psalm-tone1') {
          $('#selStyleGraduale').val('psalm-tone').change();
        }
        var match = sel[part].gabc.match(/\([^):]*::[^)]*\)/);
        gabc = sel[part].gabc.slice(0,match.index+match[0].length)+'\n';
        var clef = gabc.slice(getHeaderLen(gabc)).match(/\([^)]*([cf]b?[1234])/);
        if(clef) {
          clef = clef[1];
          if(clef != _clef) {
            gMediant = shiftGabcForClefChange(gMediant,clef,_clef);
            gTermination = shiftGabcForClefChange(gTermination,clef,_clef);
          }
        }
        lines = sel[part].text.split('\n');
      }
      lines.splice(0,1);
    } else {
      gabc = header + '(' + tone.clef + ') ';
      lines = capitalizeForBigInitial(sel[part].text).split('\n');
    }
    
    var firstVerse = true;
    var asGabc = true;      // Right now this is hard coded, but perhaps I could add an option to only do the first verse, and just point the rest.
    for(var i=0; i<lines.length; ++i) {
      var line = splitLine(lines[i]);
      var italicNote = line[0].match(/^\s*<i>[^<]+<\/i>\s*/);
      if(italicNote) {
        italicNote = italicNote[0];
        line[0] = line[0].slice(italicNote.length);
      }
      // special case for gloria patri.
      if(part=='introitus' && removeDiacritics(line[0]).match(/^\s*gloria patri/i) &&
          lines[i+1] && removeDiacritics(lines[i+1]).match(/^\s*[sa.\s]*e[c.\s]*u[l.\s]*o[r.\s]*u[m.*\s]*a[m.\s]*e/i)) {
        var gAmenTones;
        var originalGabc = sel[part].gabc;
        var header;
        if(originalGabc && (header = getHeader(originalGabc)) && header.mode == mode) {
          gAmenTones = regexGabcGloriaPatri.exec(originalGabc);
        }
        gabc += psalmToneIntroitGloriaPatri(gMediant,gTermination,gAmenTones);
        ++i;
      } else if(firstVerse || asGabc) {
        var result={shortened:false};
        gabc += (italicNote||'') + applyPsalmTone({
          text: line[0].trim(),
          gabc: gMediant,
          useOpenNotes: false,
          useBoldItalic: false,
          onlyVowel: false,
          format: bi_formats.gabc,
          verseNumber: i+1,
          prefix: !firstVerse && !italicNote,
          suffix: false,
          italicizeIntonation: false,
          result: result,
          favor: 'intonation'
        }) + (line.length == 1? "" : bi_formats.gabc.nbsp + gabcStar + "(:) " +
          applyPsalmTone({
            text: line[1].trim(),
            gabc: gTermination,
            useOpenNotes: false,
            useBoldItalic: false,
            onlyVowel: false,
            format: bi_formats.gabc,
            verseNumber: i+1,
            prefix: false,
            suffix: true,
            italicizeIntonation: false,
            favor: 'termination'
          })) + " (::)\n";
        if(i==0) {
          //if(!repeatIntonation)gMediant=removeIntonation($.extend(true,{},gMediant));
          flex = (line[0].indexOf(sym_flex) >= 0);
        }
        if(!result.shortened)firstVerse=false;
      } /*else {
        if(gabc && !flex) {
          var flexI = line[0].indexOf(sym_flex);
          if(flexI >= 0) {
            var syls = getSyllables(line[0].slice(0,flexI));
            var index = syls.length - 1;
            syls[index].punctuation += ' ' + sym_flex;
            syls[index].space = "";
            var sylcount = syls[index].word.length;
            index -= sylcount - 1;
            while((syls.length - index) < 3) {
              --index;
              sylcount = syls[index].word.length;
              index -= sylcount - 1;
            }
            syls.splice(0,index);
            gabc += "<i>Flex :</i>() " + applyPsalmTone({
              text: syls,
              gabc: getFlexGabc(medTones),
              useOpenNotes: false,
              useBoldItalic: false,
              onlyVowel: onlyVowels,
              format: gabcFormat
            });
            gabc = gabc.slice(0,-1) + new Array(4).join(" " + medTones.toneTenor) + "  ::)";
            flex = true;
          }
        }
        var tempString=addBoldItalic(line[0], medTones.accents, medTones.preparatory, medTones.afterLastAccent, useFormat, onlyVowels, useNovaVulgata?"":i+1,true)
            + (line.length == 1? "" : ((((useFormat in bi_formats)&&bi_formats[useFormat])||bi_formats.gabc).nbsp) + "* " + addBoldItalic(line[1], terTones.accents, terTones.preparatory, terTones.afterLastAccent, useFormat, onlyVowels,useNovaVulgata?"":i+1,false,true));
        vr += tempString + '\n';
        r += "<p style='line-height:100%;margin: 6pt 0px;'>"
          + tempString
          + "</p>";
      } */
    }
    
    
    return applyLiquescents(gabc);
  }
  
  var updateTextAndChantForPart = function(part,instant) {
    var gabc,
        capPart = part[0].toUpperCase()+part.slice(1),
        $div = $('#div'+capPart),
        $txt = $('#txt'+capPart),
        $preview = $('#'+part+'-preview'),
        instant = (instant !== false);
    switch(sel[part].style) {
      case 'full':
        $txt.val(sel[part].gabc);
        gabc = sel[part].gabc;
        if(isAlleluia(part,sel[part].text)) {
          if(part == 'graduale') {
            if(sel.alleluia.style == 'psalm-tone1') {
              $('#selStyleAlleluia').val('psalm-tone').change();
            }
          } else {
            if(isAlleluia('graduale',sel.graduale.text) &&
                sel.graduale.style == 'psalm-tone1') {
              $('#selStyleGraduale').val('psalm-tone').change();
            }
          }
        }
        break;
      case 'psalm-tone':
      case 'psalm-tone1':
        $txt.val(sel[part].text);
        gabc = getPsalmToneForPart(part);
        break;
      default:
        return;
    }
    sel[part].activeGabc = gabc;
    updateChant(gabc,$preview[0],instant);
    updateTextSize(part);
  }
  
  var updateTextSize = function(part){
    var capPart = part[0].toUpperCase()+part.slice(1),
        $txt = $('#txt'+capPart),
        $preview = $('#'+part+'-preview');
    $txt.css('min-height',$preview.parents('.chant-parent').height() - $($txt.prop('labels')).height() - 3).trigger('autosize');
  }
  
  var splitGabc = function(gabc){
    var result=[];
    var lines=gabc.split(/\r?\n/);
    var state=0;
    var current='';
    $.each(lines,function(i,line){
      switch(state){
        case 0:
          if(line.match(/^%%$/))state=1;
          break;
        case 1:
          if(line.match(/^\s*[-\w]+:[^;]+;\s*$/)){
            state=0;
            result.push(current);
            current='';
          }
          break;
      }
      current += line + '\n';
    });
    if(current.length)result.push(current);
    return result;
  }

  
  var $selSunday = $('#selSunday');
  var $selMass = $('#selMass');
  var $selTempus = $('#selTempus');
  $('#selSunday,#selMass').change(selectedDay);
  $('#selTempus').change(selectedTempus);
  var key = (navigator.language || navigator.browserLanguage || 'en').match(/en/)?'en':'title';
  var populate = function(keys,$sel) {
    $.each(keys,function(i,o){
      var $temp = $('<option>'+ o[key] +'</option>');
      if(typeof(o.key)=='string') {
        $temp.val(o.key);
      } else {
        $temp.attr('disabled',true);
        if(i==0) {
          $temp.attr('selected',true);
        }
      }
      $sel.append($temp);
    });
  };
  populate(sundayKeys,$selSunday);
  populate(otherKeys,$selMass);
  populate(tempusKeys,$selTempus);
  $('textarea').autosize().keydown(internationalTextBoxKeyDown);
  $('select[id^=selStyle]').change(function(e){
    var style=this.value;
    if(this.id=='selStyle') {
      if(style!='mixed') {
        $('select[id^=selStyle]:not(#selStyle)').val(style).each(function(i,o){updateStyle(o.id.slice(8).toLowerCase(),style);});
      }
    } else {
      updateStyle(this.id.slice(8).toLowerCase(),style);
      var baseStyle = style.replace(/\d+$/,'');
      $('select[id^=selStyle]:not(#selStyle)').each(function(i,o){if(baseStyle!=o.value.slice(0,baseStyle.length)){baseStyle='mixed';return false;}});
      $('#selStyle').val(baseStyle);
    }
  });
  $('#selStyle').change();
  $('select.tones').change(function(e){
    //update endings for this tone.
    var capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase();
    sel[part].mode = this.value;
    $selEnding = $('#selToneEnding' + capPart);
    var tone = this.value + '.',
        endings = getEndings(tone);
    if(endings.length==0 || isAlleluia(part,sel[part].text)) {
      $selEnding.hide();
    } else {
      $selEnding.empty().append('<option>' + endings.join('</option><option>') + '</option>');
      $selEnding.val(defaultTermination[this.value]);
      sel[part].termination = $selEnding.val();
      if(sel[part].style == 'psalm-tone') $selEnding.show();
    }
    updateTextAndChantForPart(part);
  });
  $('select.endings').change(function(e){
    var capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase();
    sel[part].termination = this.value;
    updateTextAndChantForPart(part);
  });
  $('input.cbSolemn').change(function(e){
    var capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase();
    sel[part].solemn = this.checked;
    updateTextAndChantForPart(part);
  });
  var $selTones = $('select.tones');
  for(var i=1; i<=8; ++i) {
    $selTones.append('<option>'+i+'</option>');
  }
  $('textarea[id^=txt]').keyup(function(e){
    var capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase();
    if(sel[part].style.match(/^psalm-tone/) && sel[part].text != this.value) {
      sel[part].text = this.value;
      updateTextAndChantForPart(part,false);
    } else if(sel[part].style == 'full' && sel[part].gabc != this.value) {
      sel[part].gabc = this.value;
      updateTextAndChantForPart(part,false);
    }
  });
  var getAllGabc = function() {
    var result=[];
    $('textarea[id^=txt]:visible').each(function(i,o){
      var capPart = this.id.match(/[A-Z][a-z]+$/)[0],
          part = capPart.toLowerCase(),
          proper = sel[part],
          gabc = proper.activeGabc,
          header = getHeader(gabc);
      if(includePropers.indexOf(part)<0) return;
      header.name = '';
      header['%font'] = 'GaramondPremierPro';
      header['%width'] = '7.5';
      gabc = header + gabc.slice(header.original.length);
      result.push(gabc);
    });
    return result;
  };
  $('#lnkPdf').click(function(e){
    var result=getAllGabc().join('\n\n');    
    if(e && typeof(e.preventDefault)=="function"){
      e.preventDefault();
    }
    $('#pdfForm').attr('action','http://illuminarepublications.com/gregorio/#' + encodeURI(result)).submit();
  });
  $('#lnkPdfDirect').click(function(e){
    var gabcs=getAllGabc();
    if(e && typeof(e.preventDefault)=="function"){
      e.preventDefault();
    }
    $('#pdfFormDirect [name="gabc[]"]').remove();
    for(var i=0;i<gabcs.length;++i){
      $('#pdfFormDirect').append($('<input type="hidden" name="gabc[]"/>').val(gabcs[i]));
    }
    $("#pdfFormDirect").submit();
  });
  $('[id$=-preview]').on('relayout',function(){
      var part = this.id.match(/^([a-z]+)-preview$/)[1];
      updateTextSize(part);
  });
  $('a[id^=include]').each(function(){
    includePropers.push(this.id.slice(7).toLowerCase());
  }).click(function(e){
    e.preventDefault();
    var capPart = this.id.slice(7),
        part = capPart.toLowerCase(),
        i = includePropers.indexOf(part),
        $span = $(this).find('span');
    if(i<0) {
      // wasn't included, now it will be:
      includePropers.push(part);
      $span.show();
    } else {
      //had been included, now it won't be:
      includePropers.splice(i,1);
      $span.hide();
    }
  });
});