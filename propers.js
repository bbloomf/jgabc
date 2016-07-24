var selDay,selTempus='',selPropers,sel={
  tractus:{},
  offertorium:{},
  introitus:{},
  graduale:{},
  communio:{},
  alleluia:{},
  sequentia:{}
},includePropers=[],
// Taken from the Chants Abrégés (http://media.musicasacra.com/pdf/chantsabreges.pdf) [They are found throughout the book, wherever Alleluia verses are found:
  alleluiaChantsAbreges=[
    undefined,
    "(c4)Al(c)le(d)lu(ixed/hi)ia.(hvhvGE//fd.) (::)",
    "(f3)Al(ef~)le(f)lu(hf/fe~)ia.(egf.) (::)",
    "(c4)Al(e/ef)le(dg)lu(gih___!iwj)ia.(ijh'___/ig/ge.) (::)",
    "(c4)Al(e//ed~)le(e/ghe/fe)lu(de~)ia.(e.) (::)",
    "(c3)Al(d/f'h~)le(hf__)lu(fh'/ih~)ia.(i.////hiHF'/fd.) (::)",
    "(c4)Al(f/fg)le(gf)lu(ixf!gi//hig//g)ia.(gf..) (::)",
    "(c3)Al(ef)le(e)lu(e!f'h/ihi)ia.(ie..) (::)",
    "(c4)Al(g)le(hvGF/ghg)lu(fh!jvIG'h)ia.(g.) (::)"
  ],
  isNovus = false,
  novusOption={},
  yearArray = ['A','B','C'];
$(function(){
  // the following function is based on one taken from http://www.irt.org/articles/js052/index.htm
  function EasterDates(Y) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);

    var easter = new Date(Y,M-1,D);
    var septuagesima = new Date(easter);
    var pentecost = new Date(easter);
    septuagesima.setDate(easter.getDate() -(7 * 9));
    pentecost.setDate(easter.getDate() + (7 * 7));
    return {
      easter: easter,
      septuagesima: septuagesima,
      pentecost: pentecost
    }
  }
  $('#menu').menu({select: function(e,ui){e.preventDefault();}});
  var partAbbrev = {
    tractus:'Tract.',
    offertorium:'Offert.',
    introitus:'Intr.',
    graduale:'Grad.',
    communio:'Comm.',
    sequentia: 'Seq.'    
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
    var id;
    var incipit;
    if(isNovus) {
      var optionID = novusOption[part]||0;
      var year = $('#selYearNovus').val();
      id = selPropers && selPropers[part];
      if (id && id[year]) id = id[year];
      if(id && id.length > 1) {
        var $options = $('.novus-options.'+part);
        var $select = $options.find('select');
        var options = '';
        for(var i in id) {
          var o = id[i];
          options += '<option value="' + i + '">' + o.incipit + '</option>';
        }
        $select.empty().append(options);
        $select.val(optionID);
        optionID = $select.prop('selectedIndex');
        $options.show();
      } else {
        optionID = 0;
      }
      id = id && id[optionID];
      incipit = id && id.incipit;
      id = id && id.id;
    } else {
      id = selPropers? selPropers[part+'ID'] : null;
    }
    var capPart = part[0].toUpperCase()+part.slice(1);
    var $div = $('#div'+capPart);
    var $includePart = $('#include'+capPart);
    if(id || selDay=='custom') {
      $includePart.parent('li').removeClass('ui-state-disabled');
      var $txt = $('#txt'+capPart);
      $('#lbl'+capPart).find('a').attr('href',id? 'http://gregobase.selapa.net/chant.php?id='+id : null);
      $div.show();
      var updateGabc = function(gabc){
        gabc = gabc.replace(/\s+$/,'').replace(/<sp>V\/<\/sp>\./g,'<sp>V/</sp>');
        //if(gabcStar) gabc = gabc.replace(/\*/g,gabcStar);
        var text = sel[part].text = versify(decompile(gabc,true));
        var truePart = isAlleluia(part,text)? 'alleluia' : part;
        if(part == 'graduale') {
          if(truePart == 'alleluia') {
            $('#selStyleGraduale>option.alleluia').show();
          } else {
            $('#selStyleGraduale>option.alleluia').hide();
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
        gabc = gabc? (header + gabc.slice(header.original.length)) : '';
        sel[part].gabc = gabc;
        $('#selTone' + capPart).val(header.mode).change();
      };
      if(id) {
        $.get('gabc/'+id+'.gabc',updateGabc);
      } else {
        updateGabc('');
      }
    } else {
      $div.hide();
      $includePart.parent('li').addClass('ui-state-disabled');
    }
  }
  var updateDay = function() {
    selPropers = proprium[selDay + selTempus];
    if(selPropers || selDay=='custom') {
      if(!selPropers) selPropers = {};
      updateAllParts();
    }
  }
  var updateDayNovus = function() {
    selPropers = propriumNoviOrdinis[selDay + selTempus];
    if(selPropers) {
      selPropers.isNovus = true;
      novusOption = {};
      updateAllParts();
    }
  }
  var updateAllParts = function() {
    $('.novus-options').hide();
    updatePart('introitus');
    updatePart('graduale');
    updatePart('alleluia');
    updatePart('tractus');
    updatePart('sequentia');
    updatePart('offertorium');
    updatePart('communio');
  };
  var selectedDayNovus = function(e){
    selDay = $(this).val();
    updateDayNovus();
  };
  var getSeasonForDate = function(date) {
    var easterDates = EasterDates(date.getFullYear());
    if(date >= easterDates.septuagesima && date < easterDates.easter) {
      return 'Quad';
    } else if(date >= easterDates.easter && date < easterDates.pentecost) {
      return 'Pasch';
    }
    return '';
  }
  var selectedDay = function(e){
    selDay = $(this).val();
    var self = this;
    $('#selSunday,#selSaint,#selMass').each(function(i,o){
      if(this != self) this.selectedIndex = 0;
    });
    if((selDay + 'Pasch') in proprium || (selDay + 'Quad') in proprium) {
      $selTempus.show();
      var date = new Date();
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var dateMatch = selDay.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\d+)/);
      if(dateMatch) {
        date = new Date(date.getFullYear(), months.indexOf(dateMatch[1]), parseInt(dateMatch[2]));
        if(date < new Date()) date.setYear(date.getFullYear() + 1);
        $selTempus.val(selTempus = getSeasonForDate(date));
      }
    } else {
      selTempus = '';
      $selTempus.prop('selectedIndex',0).hide();
    }
    if(selDay=='custom') {
      $('.sel-custom').show();
    } else {
      $('.sel-custom').hide();
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
      if(syl && (!ignoreSyllablesOnDivisiones || !match[rog.gabc].match(/^(?:(?:[cf]b?[1-4])|[:;,\s])*$/) || syl.match(/<i>(?:Ps\.?|T\.?\s*P\.?\s*)<\/i>/))){
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
    s = s.replace(/\s*~\s*/g,'\n').replace(/%/g,'*').replace(/(\|\s*)*(\*\s*)+(\|\s*)*/g,'* ').replace(/\s*[*|]\s*$/,'');
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
    var lines = text.replace(/<alt>[^<]+<\/alt>/,'').split('\n');
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
    //if(oldClef[0]=='f') baseClefI += 2;
    var clefI = parseInt(newClef[1],10);
    //if(newClef[0]=='f') clefI += 2;
    var diff = (baseClefI - clefI) * 2;
    return shiftGabc(gabc,diff);
  }
  
  var applyLiquescents = function(gabc){
    return gabc.replace(/[aeiouyáéíóúýæǽœ][mn]\([^)]*([a-m])([a-l])\)(?=\S)/ig,function(m,first,second){
      if(first>second) return m.slice(0,-1) + '~)';
      return m;
    });
  }
  
  var getTertiumQuid = function(gMediant,gTermination) {
    var match = gTermination.match(/([^r]+)\s+[a-m]r\s/);
    var gTertium = match[1];
    // a hack for Introit tone 6.
    match = gTertium.match(/^\([^)]+\)\s+'/);
    if(match) {
      gTertium = match[0] + gMediant.match(/\s([a-m])r\s/)[1];
    }
    match = gMediant.match(/\s[a-m]r\s+.+$/);
    gTertium += match[0];
    return gTertium;
  }
  
  var psalmToneIntroitGloriaPatri = function(gMediant,gTermination,gAmenTones,clef) {
    var gp = "Glória Pátri, et Fílio, † et Spirítui Sáncto.\nSicut érat in princípio, † et núnc, et sémper, * et in sǽcula sæculórum. Amen.".split('\n');
    var result = applyPsalmTone({
      text: gp[0],
      gabc: gMediant,
      clef: clef,
      format: bi_formats.gabc,
      flexEqualsTenor: true
    });
    result = result + ' *(:) ';
    
    var gTertium = getTertiumQuid(gMediant,gTermination);
    gp[1] = gp[1].split('*');
    var temp = applyPsalmTone({
      text: gp[1][0].trim(),
      gabc: gTertium,
      clef: clef,
      format: bi_formats.gabc,
      flexEqualsTenor: true
    });
    result += temp + ' (:) ';
    temp = applyPsalmTone({
      text: gp[1][1].trim(),
      gabc: gTermination,
      clef: clef,
      format: bi_formats.gabc,
      flexEqualsTenor: true
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

  var getFullGloriaPatriGabc = function(part) {
    var gabc = part.gabc;
    var tone = g_tones['Introit ' + part.mode];
    var gMediant = tone.mediant;
    var gTermination = tone.termination;
    if(!gTermination) {
      if(!(gTermination = tone.terminations[termination])) {
        for(i in tone.terminations) { gTermination = tone.terminations[i]; break; }
      }
    }
    var clef = gabc.slice(getHeaderLen(gabc)).match(/\([^)]*([cf]b?[1234])/);
    if(clef) {
      clef = clef[1];
      if(clef != tone.clef) {
        gMediant = shiftGabcForClefChange(gMediant,clef,tone.clef);
        gTermination = shiftGabcForClefChange(gTermination,clef,tone.clef);
      }
    } else clef = tone.clef;
    var gAmenTones;
    var header = getHeader(gabc);
    gAmenTones = regexGabcGloriaPatri.exec(gabc);
    if(!gAmenTones) gAmenTones = {index: gabc.length};
    return gabc.slice(0,gAmenTones.index) + psalmToneIntroitGloriaPatri(gMediant,gTermination,gAmenTones,clef);
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
    var introitTone = false;
    if(part=='introitus' || isAl) {
      tone = g_tones['Introit ' + mode];
      introitTone = true;
    } else {
      tone = g_tones[mode + '.'];
    }
    if(!tone) return;
    var clef = tone.clef;
    var gMediant = (solemn && tone.solemn) || tone.mediant;
    var gTermination = tone.termination;
    if(!gTermination) {
      if(!(gTermination = tone.terminations[termination])) {
        for(i in tone.terminations) { gTermination = tone.terminations[i]; break; }
      }
    }
    var gTertium = introitTone && getTertiumQuid(gMediant,gTermination);
    var gabc;
    var lines;
    if(isAl) {
      if(sel[part].style=='psalm-tone1') {
        lines = text.split('\n');
        var i = lines.length - 1;
        if(part == 'alleluia') lines[i] = lines[i].replace(/([\.!?:;,]?)\s*$/,function(m,a){ return ', Allelúia' + a; });
        var line = lines[0];
        gabc = header + '(' + tone.clef + ') ';
        if(line.match(/ij|bis/)) {
          if(part=='graduale' && sel['alleluia'].style=='psalm-tone1') {
            lines[i] = lines[i].replace(/([\.!?:;,]?)\s*$/,function(m,a){ return ', Allelúia' + a; });
          }
          line = line.match(/s*([^!?.;,:\s]+)/)[1];
          line = capitalizeForBigInitial(line + ', ' + line + '.');
          gabc += applyPsalmTone({
              text: line,
              gabc: gTermination,
              clef: clef,
              useOpenNotes: false,
              useBoldItalic: false,
              onlyVowel: false,
              format: bi_formats.gabc,
              prefix: false,
              suffix: false,
              italicizeIntonation: false,
              favor: 'termination',
              flexEqualsTenor: introitTone
            }) + " (::)\n";
        } else {
          // dealing with an Alleluia verse during the Easter season (one without "bis" or "ij" after the Alleluia antiphon)
          if(sel.graduale.style=='psalm-tone1') {
            $('#selStyleGraduale').change();
          } else {
            $('#selStyleGraduale').val('psalm-tone1').change();
          }
        }
      } else {
        // alleluia, but not full psalm tone:
        if(part=='graduale') {
          if(sel['alleluia'].style=='psalm-tone1') {
            $('#selStyleAlleluia').val('psalm-tone').change();
          }
        } else if(sel['graduale'].style=='psalm-tone1') {
          // update graduale so that it doesn't end with an extra "alleluia"
          $('#selStyleGraduale').change();
        }
        if(sel[part].style=='psalm-tone-sal') {
          gabc = alleluiaChantsAbreges[mode];
          if(text.split('\n')[0].match(/ij|bis/)) {
            gabc = gabc.replace(')ia.(',')ia. <i>ij.</i>(');
          }
        } else {
          var match = sel[part].gabc.match(/\([^):]*::[^)]*\)/);
          gabc = sel[part].gabc.slice(0,match.index+match[0].length)+'\n';
        }
        clef = gabc.slice(getHeaderLen(gabc)).match(/\([^)]*([cf]b?[1234])/);
        if(clef) {
          clef = clef[1];
          if(clef != tone.clef) {
            gMediant = shiftGabcForClefChange(gMediant,clef,tone.clef);
            gTermination = shiftGabcForClefChange(gTermination,clef,tone.clef);
          }
        } else clef = tone.clef;
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
        gabc += psalmToneIntroitGloriaPatri(gMediant,gTermination,gAmenTones,clef);
        ++i;
      } else if(firstVerse || asGabc) {
        var result={shortened:false};
        if(false && introitTone && line[0].match(/†/)) { //TODO: Make this optional perhaps
          var left = line[0].split('†');
          gabc += (italicNote||'') + applyPsalmTone({
            text: left[0].trim(),
            gabc: gMediant,
            clef: clef,
            useOpenNotes: false,
            useBoldItalic: false,
            onlyVowel: false,
            format: bi_formats.gabc,
            verseNumber: i+1,
            prefix: !firstVerse && !italicNote,
            suffix: false,
            italicizeIntonation: false,
            result: result,
            favor: 'intonation',
            flexEqualsTenor: introitTone
          }) + bi_formats.gabc.nbsp + '(:) ' +
          (italicNote||'') + applyPsalmTone({
            text: left[1].trim(),
            gabc: gTertium,
            clef: clef,
            useOpenNotes: false,
            useBoldItalic: false,
            onlyVowel: false,
            format: bi_formats.gabc,
            verseNumber: i+1,
            prefix: false,
            suffix: false,
            italicizeIntonation: false,
            result: result,
            favor: 'intonation',
            flexEqualsTenor: introitTone
          });
        } else {
          gabc += (italicNote||'') + applyPsalmTone({
            text: line[0].trim(),
            gabc: line.length==1? gTermination : gMediant,
            clef: clef,
            useOpenNotes: false,
            useBoldItalic: false,
            onlyVowel: false,
            format: bi_formats.gabc,
            verseNumber: i+1,
            prefix: !firstVerse && !italicNote,
            suffix: false,
            italicizeIntonation: false,
            result: result,
            favor: 'intonation',
            flexEqualsTenor: introitTone
          });
        }
        gabc += (line.length == 1? "" : bi_formats.gabc.nbsp + gabcStar + "(:) " +
          applyPsalmTone({
            text: line[1].trim(),
            gabc: gTermination,
            clef: clef,
            useOpenNotes: false,
            useBoldItalic: false,
            onlyVowel: false,
            format: bi_formats.gabc,
            verseNumber: i+1,
            prefix: false,
            suffix: true,
            italicizeIntonation: false,
            favor: 'termination',
            flexEqualsTenor: introitTone
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
        instant = (instant !== false);
    switch(sel[part].style) {
      case 'full':
        $txt.val((gabc = sel[part].gabc));
        if(isAlleluia(part,sel[part].text)) {
          if(part == 'graduale') {
            if(sel.alleluia.style == 'psalm-tone1') {
              $('#selStyleAlleluia').val('psalm-tone').change();
            }
          } else {
            if(isAlleluia('graduale',sel.graduale.text) &&
                sel.graduale.style == 'psalm-tone1') {
              // update graduale so that it doesn't end with an extra "alleluia"
              $('#selStyleGraduale').change();
            }
          }
        }
        break;
      case 'full-gloria':
        $txt.val((gabc = getFullGloriaPatriGabc(sel[part])));
        break;
      case 'psalm-tone':
      case 'psalm-tone1':
      case 'psalm-tone-sal':
        $txt.val(sel[part].text);
        gabc = getPsalmToneForPart(part);
        break;
      default:
        return;
    }
    sel[part].activeGabc = gabc;
    if(gabc) updateExsurge(part);
  }

  $.each(sel,function(){
    var ctxt = new exsurge.ChantContext();
    ctxt.lyricTextFont = "'Crimson Text', serif";
    ctxt.lyricTextSize *= 1.2;
    ctxt.dropCapTextFont = ctxt.lyricTextFont;
    ctxt.annotationTextFont = ctxt.lyricTextFont;
    this.ctxt = ctxt;
  });

  var updateExsurge = function(part) {
    var chantContainer = $('#'+part+'-preview')[0];
    var prop = sel[part];
    var ctxt = prop.ctxt;
    var gabc = prop.activeGabc.replace(/<v>\\([VRA])bar<\/v>/g,function(match,barType) {
        return barType + '/.';
      }).replace(/<sp>([VRA])\/<\/sp>/g,function(match,barType) {
        return barType + '/.';
      }).replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
      .replace(/<b><\/b>/g,'')
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*')
      .replace(/<\/?sc>/g,'%')
      .replace(/<\/?b>/g,'*')
      .replace(/<\/?i>/g,'_')
        .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}') // center above vowel after u in cases of ngu[vowel] or qu[vowel]
        .replace(/(\w)(\s+)([^(\w]+\([^)]+\))/g,'$1$3$2'); // change things like "et :(gabc)" to "et:(gabc) "
    var gabcHeader = '';
    var headerEndIndex = gabc.indexOf('\n%%\n');
    if(headerEndIndex >= 0) {
      gabcHeader = gabc.slice(0,headerEndIndex).split(/\r?\n/);
      gabc = gabc.slice(headerEndIndex + 4);
    }
    var score = prop.score;
    if(score) {
      exsurge.Gabc.updateMappingsFromSource(ctxt, score.mappings, gabc);
      score.updateNotations(ctxt);
    } else {
      var mappings = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
      score = prop.score = new exsurge.ChantScore(ctxt, mappings, true);
      score.annotation = new exsurge.Annotation(ctxt, "%V%");
    }
    if(gabcHeader) {
      gabcHeader = gabcHeader.reduce(function(result,line){
        var match = line.match(/^([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i);
        if(match && !result[match[1]]) result[match[1]] = match[2];
        return result;
      }, {});
      if(gabcHeader.annotation) {
        score.annotation = new exsurge.Annotation(ctxt, gabcHeader.annotation);
      }
    }
    layoutChant(part);
  }

  var layoutChant = function(part) {
    var chantContainer = $('#'+part+'-preview')[0];
    if(!chantContainer) return;
    var ctxt = sel[part].ctxt;
    var score = sel[part].score;
    var newWidth = chantContainer.clientWidth - 4;
    if(!score) return;
    ctxt.width = newWidth;
    // perform layout on the chant
    score.performLayoutAsync(ctxt, function() {
      score.layoutChantLines(ctxt, ctxt.width, function() {
        // render the score to svg code
        chantContainer.innerHTML = score.createSvg(ctxt);
        updateTextSize(part);
      });
    });
  }
  $(window).on('resize',function() {
    $.each(sel, function(part) {
      layoutChant(part);
    })
  });
  
  var updateTextSize = function(part){
    var capPart = part[0].toUpperCase()+part.slice(1),
        $txt = $('#txt'+capPart),
        $preview = $('#'+part+'-preview');
    $txt.css('min-height',$preview.parents('.chant-parent').height() - $($txt.prop('labels')).height() - 2).trigger('autosize');
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
  var $selSaint = $('#selSaint');
  var $selMass = $('#selMass');
  var $selTempus = $('#selTempus');
  var $selSundayNovus = $('#selSundayNovus');
  var $selYearNovus = $('#selYearNovus');
  $('#selSunday,#selSaint,#selMass').change(selectedDay);
  $('#selSundayNovus').change(selectedDayNovus);
  $('#selYearNovus').change(function(){updateAllParts();});
  $('#selTempus').change(selectedTempus);
  var key = (navigator.language || navigator.browserLanguage || 'en').match(/en/)?'en':'title';
  if(location.search.match(/\bla\b/)) key = 'title';
  var populate = function(keys,$sel) {
    $.each(keys,function(i,o){
      if(typeof(o) == 'string') {
        var title = o.length==1? 'Year ' + o : o;
        o = o.match(/\.{3}$/)?
            {en: o, title: title}
          : {key: o, en: title, title: title};
      }
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
  populate(sundaysNovusOrdo,$selSundayNovus);
  populate(saintKeys,$selSaint);
  populate(otherKeys,$selMass);
  populate(tempusKeys,$selTempus);
  populate(yearArray,$selYearNovus);
  //Determine which year...Check when Advent begins this year, and if it is before today, use last year as the year number
  //When the year number is found, Take year = yearArray[year%3];
  var date = new Date(),
      year = date.getFullYear(),
      Christmas = new Date(year,11,25),
      Advent = Christmas.setDate(25 - (Christmas.getDay()||7) - 21);
  if(Advent > date) --year;
  $selYearNovus.val(yearArray[year%3]);
  $('.novus-options').hide();
  $('.novus-options select').change(function(){
    var capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase();
    novusOption[part] = this.selectedIndex;
    updatePart(part);
  });
  $('#btnCalendar').button().click(function(e){
    var $this = $(this);
    isNovus = !isNovus;
    if(isNovus) {
      $('#selSunday,#selSaint,#selMass,#selTempus').hide();
      $('#selSundayNovus,#selYearNovus').show();
      $this.find('span').text('Novus Ordo Calendar');
      $('#selSundayNovus').prop('selectedIndex',0).change();
    } else {
      $('#selSunday,#selSaint,#selMass,#selTempus').show();
      $('#selSundayNovus,#selYearNovus').hide();
      $this.find('span').text('Traditional Calendar');
      $('#selSunday').prop('selectedIndex',0).change();
    }
  });
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
  $('textarea[id^=txt]').autosize().keydown(internationalTextBoxKeyDown).keydown(gabcEditorKeyDown).keyup(function(e){
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
    $('a[id^=include]').each(function(){
      var $includePart = $(this)
          capPart = this.id.match(/[A-Z][a-z]+$/)[0],
          part = capPart.toLowerCase(),
          proper = sel[part],
          gabc = proper.activeGabc || proper.gabc,
          header = getHeader(gabc);
      if($includePart.parent('li').hasClass('ui-state-disabled') ||
        includePropers.indexOf(part)<0 ||
        !gabc) return;
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
    $('#pdfForm').attr('action','http://apps.illuminarepublications.com/gregorio/#' + encodeURI(result)).submit();
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
  var customProperSelected = function(event,ui){
    var $this=$(this),
        capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase(),
        temp = chantID[part][ui.item.value];
    selPropers[part+'ID'] = (temp.Solesmes || temp).id || '';
    updatePart(part);
  };
  $.each(chantID,function(part){
    $.each(this,function(incipit){
      if(this.psalm) {
        $.each(this.psalm,function(psalmIncipit){
          var fullIncipit = incipit + ' ps. ' + psalmIncipit;
          chantID[part][fullIncipit] = this;
        });
        delete chantID[part][incipit];
      }
    });
  });
  $('input.sel-custom').each(function(){
    var $this=$(this),
        capPart = this.id.match(/[A-Z][a-z]+$/)[0],
        part = capPart.toLowerCase();
    $this.autocomplete({minLength:0,
                        select:customProperSelected,
                        source:Object.keys(chantID[part])})
         .keyup(function(){
            if(this.value == '' && selPropers[part + 'ID']) {
              delete selPropers[part + 'ID'];
              updatePart(part);
            }
         });
  });
});