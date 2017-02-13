var selDay,selTempus='',selPropers,selOrdinaries={},sel={
  tractus:{},
  offertorium:{},
  introitus:{},
  graduale:{},
  communio:{},
  alleluia:{},
  sequentia:{},
  asperges:{},
  kyrie:{},
  gloria:{},
  credo:{},
  sanctus:{},
  agnus:{},
  ite:{}
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
  var gregobaseUrlPrefix = 'http://gregobase.selapa.net/chant.php?id=';
  var $gradualeOptions = $('#selStyleGraduale>option').clone();
  var $alleluiaOptions = $('#selStyleAlleluia>option').clone();
  var NBSP = '\xA0';
  // the following function is based on one taken from http://www.irt.org/articles/js052/index.htm
  var dateCache = {};
  var Dates = function(Y) {
    if(dateCache[Y]) return dateCache[Y];
    var result = {};
    result.year = Y;
    result.pascha = moment.easter(Y);
    result.septuagesima = moment(result.pascha).subtract(7*9,'days');
    result.quad1 = moment(result.septuagesima).add(7*3,'days');
    result.ascension = moment(result.pascha).add(39,'days');
    result.pentecost = moment(result.pascha).add(49,'days');
    result.nativitas = moment([Y,11,25]);
    result.advent1 = moment(result.nativitas).subtract((result.nativitas.day() || 7) + 7*3,'days');
    result.corpusChristi = moment(result.pentecost).add(11,'days');
    result.sacredHeart = moment(result.pentecost).add(19,'days');
    result.ChristusRex = moment([Y,9,31]);
    result.ChristusRex.subtract(result.ChristusRex.day(),'days');
    result.epiphany = moment([Y,0,6]);
    // The Feast of the Holy Family is on the Sunday following Epiphany, unless Epiphany falls on a Sunday,
    // in which case The Holy Family will be on the Saturday following.
    result.holyFamily = moment(result.epiphany).add(7 - (result.epiphany.day()||1), 'days');
    dateCache[Y] = result;
    return result;
  };
  var dateForSundayKey = function(key) {
    var weekdayKeys = ['m','t','w','h','f','s'];
    var m;
    if(key.match(/^[A-Z][a-z]{2}\d{1,2}/)) {
      m = moment(key.replace(/_.+$/,''),'MMMD');
      if(m.isValid()) return m;
    }
    var dates = Dates(moment().year());
    var match;
    if(match = key.match(/Adv(\d)(Sat)?/)) {
      m = moment(dates.advent1);
      m.add(parseInt(match[1])-1, 'weeks');
      if(match[2]) m.add(6, 'days');
    } else if(match = key.match(/Epi(\d)/)) {
      if(match[1]==3) return moment(dates.septuagesima).subtract(1, 'week');
      m = moment(dates.epiphany);
      m = m.add(parseInt(match[1]), 'weeks').subtract(m.day()||(match[1]==1?1:0), 'days');
    } else if(match = key.match(/Quad(\d)([mtwhfs]|Sat)?/)) {
      m = moment(dates.septuagesima).add(2 + parseInt(match[1]), 'weeks');
      if(match[2]) {
        var day = (match[2]=='Sat')? 6 : 1 + weekdayKeys.indexOf(match[2]);
        m = m.add(day, 'day');
      }
    } else if(match = key.match(/Pasc(\d)([mtwhfs])?/)) {
      m = moment(dates.pascha).add(parseInt(match[1]), 'weeks');
      if(match[2]) {
        var day = 1 + weekdayKeys.indexOf(match[2]);
        m = m.add(day, 'day');
      }
    } else if(match = key.match(/Pent(\d+)([mtwhfs])?/)) {
      if(match[1] == 23) {
        return moment(dates.advent1).subtract(1, 'week');
      }
      m = moment(dates.pentecost).add(parseInt(match[1]), 'weeks');
      if(match[2]) {
        var day = 1 + weekdayKeys.indexOf(match[2]);
        m = m.add(day, 'day');
      }
    }
    if(m && m.isValid()) return m;
    switch(key) {
      case "Nat1":
        m = moment('12-25','MM-DD').add(1, 'week');
        m = m.subtract(m.day(), 'days');
        break;
      case "Nat2":
        ///Sunday between 01/01 and 01/06, or, with this lacking, 2 January:: The most holy Name of Jesus, II class
        m = moment('01-06','MM-DD');
        m = m.subtract(m.day(), 'days');
        if(m.isSameOrAfter(moment('01-06','MM-DD')) || m.isSameOrBefore(moment('01-01','MM-DD'))) m = moment('01-02','MM-DD');
        break;
      case "Epi":
        return dates.epiphany;
      case "Septua":
        return moment(dates.septuagesima);
      case "Sexa":
        return moment(dates.septuagesima).add(1, 'week');
      case "Quinqua":
        return moment(dates.septuagesima).add(2, 'weeks');
      case "AshWed":
        return moment(dates.septuagesima).add(17, 'days');
      case "Asc":
        return dates.ascension;
      case "CorpusChristi":
        return dates.corpusChristi;
      case "SCJ":
        return dates.sacredHeart;
      case "EmbSatSept":
        m = moment('09-21','MM-DD');
        m = m.subtract(m.day(), 'days').add(6, 'days');
        break;
      case "ChristusRex":
        return dates.ChristusRex;
    }
    return m;
  }
  $('#menu').menu({select: function(e,ui){e.preventDefault();}});
  var partAbbrev = {
    tractus:'Tract.',
    offertorium:'Offert.',
    introitus:'Intr.',
    graduale:'Grad.',
    communio:'Comm.',
    sequentia: 'Seq.',
    hymnus: 'Hymn.',
    antiphona: "Ant.",
    responsorium: "Resp."
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
  var updatePart = function(part, ordinaryName) {
    var selPO = $.extend({},selPropers,selOrdinaries);
    var id;
    var incipit;
    var match = part.match(/^([a-z]+)(\d+)$/i);
    var partIndex = 0;
    var partType = part;
    if(match) {
      partType = match[1];
      partIndex = parseInt(match[2]);
    }
    var capPart = part[0].toUpperCase()+part.slice(1);
    var $div = $('#div'+capPart)
    $div.find('.block.right .psalm-editor').remove();
    var isOrdinaryPart = $div.is('.ordinary');
    if(isNovus && !isOrdinaryPart) {
      var optionID = novusOption[partType]||0;
      var year = $('#selYearNovus').val();
      id = selPO[partType];
      if(id && id[year]) id = id[year];
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
      id = selPO[partType+'ID'];
      if(id == 'no') id = '';
      if(id && id.constructor == [].constructor) {
        id = id[partIndex];
        partIndex++;  // for human readable 1-based index.
      }
    }
    var $includePart = $('#include'+capPart);
    $('#lbl'+capPart).find('a').attr('href',id? gregobaseUrlPrefix+id : null);
    if(id || (selDay=='custom' && !isOrdinaryPart)) {
      $includePart.parent('li').removeClass('ui-state-disabled');
      var $txt = $('#txt'+capPart);
      $div.show();
      var $sel = $('#sel'+capPart);
      var selValue = $sel.val();
      var updateGabc = function(gabc){
        if(selValue != $sel.val()) return;
        gabc = gabc.replace(/\s+$/,'').replace(/<sp>V\/<\/sp>\./g,'<sp>V/</sp>');
        var header = getHeader(gabc);
        //if(gabcStar) gabc = gabc.replace(/\*/g,gabcStar);
        var text,
            truePart = partType;
        if(!isOrdinaryPart) {
          var plaintext = decompile(gabc,true);
          if(isAlleluia(part,plaintext)) truePart = 'alleluia';
          var lines = sel[part].lines = plaintext.split(/\n/).map(function(line) {
            return line.split(/\s*[|*]\s*/);
          });
          if(!sel[part].pattern) {
            sel[part].pattern = deducePattern(plaintext, lines, !truePart.match(/alleluia|graduale|tractus/));
          }
          if(sel[part].pattern && sel[part].pattern.length && sel[part].pattern[0] && sel[part].pattern[0].length) {
            text = sel[part].text = versifyByPattern(lines, sel[part].pattern);
          } else {
            text = sel[part].text = versify(plaintext, !truePart.match(/alleluia|graduale|tractus/));
          }
        }
        if(part.match(/^graduale/)) {
          var $style = $('#selStyle'+capPart),
              styleVal = $style.val();
          $style.empty();
          if(truePart == 'alleluia') {
            $style.append($alleluiaOptions.clone());
          } else {
            $style.append($gradualeOptions.clone());
            if(header['office-part']=='Hymnus') {
              truePart = 'hymnus';
              partIndex = null;
            }
            if(styleVal.match(/^psalm-tone/)) {
              styleVal = 'psalm-tone';
            }
          }
          $style.val(styleVal);
        }
        var capTruePart = truePart[0].toUpperCase() + truePart.slice(1);
        if(capTruePart) {
          $('#lbl'+capPart+'>a,#include'+capPart+'>span.label').text(capTruePart + (partIndex? ' '+partIndex : ''));
          $('#selStyle'+capPart+' option[value=full]').text('Full ' + capTruePart);
        }
        var romanMode = romanNumeral[header.mode];
        if(partAbbrev[truePart]) {
          header.annotation = (partIndex? partIndex + '. ' : '') + partAbbrev[truePart];
          header.annotationArray = [header.annotation, romanMode];
        } else {
          header.annotation = romanMode;
        }
        gabc = gabc? (header + gabc.slice(header.original.length)) : '';
        sel[part].gabc = gabc;
        var $selTone = $('#selTone' + capPart).val(header.mode).change();
        if(!$selTone.length) {
          sel[part].style = 'full';
          updateTextAndChantForPart(part);
        }
        var $toggleEditMarkings = $div.find('.toggleEditMarkings');
        if($toggleEditMarkings.find('.showHide').hasClass('showing')) {
          toggleEditMarkings.call($toggleEditMarkings[0],true);
        }
      };
      if(id) {
        $.get('gabc/'+id+'.gabc',updateGabc);
      } else {
        updateGabc('');
      }
    } else {
      if(isOrdinaryPart) {
        $div.find('.chant-preview').empty();
      } else {
        $div.hide();
      }
      $includePart.parent('li').addClass('ui-state-disabled');
    }
  }
  var removeMultipleGraduales = function() {
    var i = 1;
    var $multipleGraduales = $('.multiple-graduales-'+i);
    while($multipleGraduales.length) {
      $multipleGraduales.remove();
      delete sel['graduale'+i];
      ++i;
      $multipleGraduales = $('.multiple-graduales-'+i);
    }
  };
  var setGradualeId = function(id) {
    return function() {
      $(this).children().each(setGradualeId(id));
      for(var i=0; i < this.attributes.length; ++i) {
        if(this.attributes[i].name != 'placeholder') this.attributes[i].value = this.attributes[i].value.replace(/(graduale)(?!\d|s)/gi,'$1'+id);
      }
    }
  };
  var addMultipleGraduales = function(count) {
    var i = 0;
    var $multipleGradualesTemplate = $('.multiple-graduales-0');
    var $lastGraduale = $multipleGradualesTemplate;
    while(i < count) {
      var $newGraduale = $multipleGradualesTemplate.clone(true);
      ++i;
      sel['graduale'+i] = {};
      makeChantContextForSel(sel['graduale'+i]);
      $newGraduale.removeClass('multiple-graduales-0').addClass('multiple-graduales-'+i);
      $newGraduale.each(setGradualeId(i));
      $newGraduale.find('textarea[id^=txt]').autosize();
      $lastGraduale.each(function(i){
        $(this).after($newGraduale[i]);
      });
      $newGraduale.find('.sel-style').change();
      $lastGraduale = $newGraduale;
    }
    includePropers = [];
    $('a[id^=include]').each(function(){
      includePropers.push(this.id.slice(7).toLowerCase());
    });
  }
  var updateDay = function() {
    selPropers = proprium[selDay + selTempus];
    if(selPropers || selDay=='custom') {
      removeMultipleGraduales();
      if(selPropers) {
        if(selPropers.gradualeID && selPropers.gradualeID.constructor === [].constructor) {
          addMultipleGraduales(selPropers.gradualeID.length - 1);
        }
      } else {
        selPropers = {};
      }
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
    $('div[part]').each(function(){
      updatePart($(this).attr('part'));
    });
  };
  var selectedDayNovus = function(e){
    selDay = $(this).val();
    if(!isNovus) {
      isNovus = true;
      $('#selSunday,#selSaint,#selMass,#selTempus').hide();
      $('#selSundayNovus,#selYearNovus').show();
      $('#btnCalendar').find('span').text('Novus Ordo Calendar');
    }
    clearHash({ sundayNovus: selDay }, selDay);
    updateDayNovus();
  };
  var getSeasonForMoment = function(m) {
    var dates = Dates(m.year());
    if(m.isSameOrAfter(dates.septuagesima) && m.isBefore(dates.pascha)) {
      return 'Quad';
    } else if(m.isSameOrAfter(dates.pascha) && m.isBefore(dates.pentecost)) {
      return 'Pasch';
    }
    return '';
  }
  var showHideExtraChants = function(e) {
    e && e.preventDefault && e.preventDefault();
    var $this = $('#divExtraChants a.showHide'),
        $showHide = $this.find('span.showHide'),
        $container = $('#extra-chants'),
        showHide = typeof(e)=='boolean'? e : $showHide.text() === 'Show';
    $showHide.text(showHide? 'Hide' : 'Show');
    $container.toggle(showHide);
    if(showHide && $container.is(':empty')) {
      // set up the chants for first time rendering:
      sel.extraChants.forEach(function(chant, i) {
        if(chant.title) {
          $container.append($('<div>').addClass('chant-title').html(chant.title.replace(/</g,'<span class="rubric">').replace(/>/g,'</span>')));
        }
        if(chant.rubric) {
          $container.append($('<div>').addClass('rubric').html(chant.rubric.replace(/</g,'<span class="quote">').replace(/>/g,'</span>')));
        }
        if(chant.gabc || chant.id) {
          var part = 'extra-' + i;
          sel[part] = {
            gabc: chant.gabc,
            activeGabc: chant.gabc,
            id: chant.id,
            style: 'full',
            noDropCap: !!chant.gabc || (typeof(chant.id)=='string' && chant.id.match(/-/))
          };
          $container.append($('<div>').attr('id',part+'-preview'));
          makeChantContextForSel(sel[part]);
          if(chant.id) {
            $.get('gabc/'+chant.id+'.gabc',function(gabc) {
              sel[part].gabc = sel[part].activeGabc = gabc.replace(/\(::\)([^()]+\(\))+$/,'(::)');
              updateExsurge(part, chant.id);
            });
          }
          if(chant.gabc) updateExsurge(part);
        }
        if(chant.rubricAfter) {
          $container.append($('<div>').addClass('rubric').addClass('after').html(chant.rubricAfter.replace(/</g,'<span class="quote">').replace(/>/g,'</span>')));
        }
        if(chant.html) {
          $container.append($('<div>').html(chant.html));
        }
      });
    }
  }
  var selectedDay = function(e){
    selDay = $(this).val();
    var hash = {
      sundayNovus: false
    };
    hash[this.id] = selDay;
    var self = this;
    $('#selSunday,#selSaint,#selMass').each(function(){
      if(this != self) {
        this.selectedIndex = 0;
        hash[this.id] = false;
      }
    });
    clearHash(hash, selDay);
    loadStoredDataForKey(selDay);
    if((selDay + 'Pasch') in proprium || (selDay + 'Quad') in proprium) {
      $selTempus.show();
      var m = moment(selDay,'MMMD');
      if(m.isValid()) {
        if(m.isBefore(moment().startOf('day'))) m.add(1, 'year');
        $selTempus.val(selTempus = getSeasonForMoment(m));
      }
    } else {
      selTempus = '';
      $selTempus.prop('selectedIndex',0).hide();
      addToHash('tempus', false, true);
    }
    if(selDay=='custom') {
      $('.sel-custom').show();
    } else {
      $('.sel-custom').hide();
    }
    $("#extra-chants").empty();
    sel.extraChants = extraChants[selDay];
    if(sel.extraChants) {
      $("#divExtraChants").show();
      showHideExtraChants(false);
    } else {
      $("#divExtraChants").hide();
    }
    updateDay();
  };
  var selectedTempus = function(e){
    selTempus = $(this).val();
    addToHash('tempus', selTempus);
    updateDay();
  };
  var ordinaryParts = ['asperges','kyrie','gloria','credo','sanctus','agnus','ite'];
  var selectedOrdinary = function(e){
    selOrdinary = $(this).val();
    addToHash('ordinary', selOrdinary);
    massName = $(this.selectedOptions[0]).text();
    massName = massName.slice(0, massName.indexOf(' -'));
    var ordinary = massOrdinary[selOrdinary - 1] || {};
    ordinaryParts.forEach(function(part){
      var capPart = part[0].toUpperCase() + part.slice(1),
          $part = $('[part=' + part + ']'),
          $select = $part.find('select'),
          selectedPart = ordinary[part] || [],
          adLibPart = ordinaryAdLib[part] || [],
          optionNone = $('<option></option>').val('no').text('No ' + capPart);
      if(selectedPart.constructor != [].constructor) {
        selectedPart = [selectedPart];
      }
      if(adLibPart.constructor != [].constructor) {
        adLibPart = [adLibPart];
      }
      if(part == 'ite') {
        if(ordinary.benedicamus) selectedPart = selectedPart.concat(ordinary.benedicamus);
        adLibPart = adLibPart.concat(ordinaryAdLib.benedicamus);
      }
      if(selectedPart.length == 0) optionNone.attr('default', true).attr('selected', true);
      $select.empty().append(optionNone);
      var options = [];
      options.push(selectedPart);
      var temp = selectedPart.reduce(function(result,part){
        result[part.id] = part;
        return result;
      }, {});
      options.push(adLibPart.filter(function(part){
        if(!(part.id in temp)) return true;
      }));
      temp = adLibPart.reduce(function(result,part){
        result[part.id] = part;
        return result;
      }, temp);
      options.push(massOrdinary.reduce(function(result,mass){
        var p = mass[part];
        if(!p) return result;
        if(p.constructor != [].constructor) p = [p];
        p.forEach(function(one){
          if(!(one.id in temp)) result.push(one);
        });
        return result;
      }, []));
      var labelArray = [massName, 'Ad Libitum', 'Masses'];
      if(selectedPart.length == 0) {
        // move the Masses ahead of the ad libitum parts:
        options.splice(1,0,options.pop());
        labelArray.splice(1,0,labelArray.pop());
      } else {
        labelArray[2] = 'Other Masses';
      }
      options.forEach(function(optGroup, index){
        if(optGroup.length == 0) return;
        var $optGroup = $('<optgroup></optgroup>');
        var label = labelArray[index];
        $optGroup.attr('label', label);
        optGroup.forEach(function(option, optIndex){
          var $option = $('<option></option>').
            text(option.name || '').
            val(option.id).
            appendTo($optGroup);
          if(index == 0 && optIndex == 0) {
            $option.attr('default', true).attr('selected', true);
          }
        });
        $optGroup.appendTo($select);
      });

      $select.change();
    });
  };
  
  
  var decompile = function(mixed,ignoreSyllablesOnDivisiones) {
    regexOuter.exec('');
    mixed = mixed.replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*');
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
    s = s.replace(/\s*~\s*/g,'\n').replace(/%/g,'*').replace(/\s*\|\s*\n/g,'\n').replace(/(\|\s*)*(\*\s*)+(\|\s*)*/g,'* ').replace(/\s*[*|]?\s*$/,'');
    return s;
  };
  
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
        if(normalizedLeft.length == 2 && Math.min.apply(null,normalizedLeft.mapSyllableCounts())>=7) {
          if (segmentsRemaining == 1) {
            //Check to make sure the one remaining segment can also be split.
            var right = split[j];
            var normalizedRight = normalizeMediant(right).split('*');
            if(normalizedRight.length != 2 || Math.min.apply(null,normalizedRight.mapSyllableCounts())<7) {
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
  var makeVerse = function(arrayVerse) {
    var syls = arrayVerse.mapSyllableCounts();
    for(var i=1;i<arrayVerse.length; ++i) {
      var left = syls.slice(0,i).sum();
      var right = syls.slice(i).sum();
      if(left >= right || i==(arrayVerse.length-1)) {
        var leftText;
        if(left >= 20) {
          leftText = normalizeMediant(arrayVerse.slice(0,i).join('*'));
          var leftArray = leftText.split('*');
          var leftSyls = leftArray.mapSyllableCounts();
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
  var versify = function(text, allowSplittingLines){
    var lines = text.split('\n');
    var result = '';
    for(var i=0; i<lines.length; ++i) {
      var line = lines[i].replace(reBarsWithNoPunctuation,function(a,b){return b;});
      var verses = allowSplittingLines? splitIntoVerses(line) : [line];
      if(verses.length == 1 && !line.match(reFullBars) && !line.match(reHalfBars)) {
        verses[0] = lines[i];
      }
      for(var j=0; j<verses.length; ++j) {
        result += normalizeMediant(verses[j]) + '\n';
      }
    }
    return result.trim();
  }

  function deducePattern(text, lines, allowSplittingLines) {
    var versified = text.split('\n').map(function(text) {
      return versify(text, allowSplittingLines);
    });
    var pattern = lines.map(function(segments, i) {
      var regex = /\s*([†*\n])/g,
          pat = [],
          verse = versified[i].toLowerCase(),
          text = '',
          match = regex.exec(verse),
          nextVerseChar = (match||{}).index;
      segments.forEach(function(seg, segNum) {
        if(!match) return;
        text += seg.toLowerCase();
        if(verse.slice(text.length, text.length + match[0].length) == match[0]) {
          text += match[0];
          pat.push(match[1].replace('†','*').replace('\n','℣'));
          match = regex.exec(verse),
          nextVerseChar = (match||{}).index;
        } else {
          pat.push('');
        }
        if(segNum != seg.length - 1 && text.slice(-1) != '\n') text += ' ';
      });
      if(text != verse.slice(0,text.length)) {
        console.warn('error deducing pattern in verse: ', verse, text, segments);
        return null;
      }
      return pat;
    });
    return pattern;
  }

  function versifyByPattern(lines, pattern) {
    return lines.map(function(segments, lineNum) {
      var text = '',
          pat = pattern[lineNum],
          capitalize = true;
      segments.forEach(function(seg, segNum) {
        if(capitalize && seg[0]) {
          text += seg[0].toUpperCase() + seg.slice(1);
          capitalize = false;
        } else {
          text += seg;
        }
        var code = pat && pat[segNum];
        switch(code) {
          case '*':
          case '†':
            text += ' * ';
            break;
          case '℣':
            text += '\n';
            capitalize = true;
            break;
          default:
            text += ' ';
            break;
        }
      });
      return text;
    }).join('\n');
  }

  var toggleMediant = function(event) {
    var $this = $(this),
        $part = $this.parents('div[part]'),
        part = $part.attr('part'),
        lines = sel[part].lines,
        text = '',
        btnText = $this.text();
    switch(btnText) {
      case '*':
      case '†':
        btnText = '℣';
        break;
      case '℣':
        btnText = NBSP;
        break;
      default:
        btnText = '*';
        break;
    }
    $this.text(btnText);
    var versePattern = sel[part].pattern = lines.map(function(segments, lineNum) {
      var pattern = [],
          $lastBtn = $();
      segments.forEach(function(seg, segNum) {
        var $btn = $part.find('button[line=' + lineNum + '][seg=' + segNum + ']');
        if($btn.length) {
          btnText = $btn.text();
          pattern.push(btnText.replace('†','*').replace(NBSP,''))
          if(btnText.match(/[*†]/)) {
            if($lastBtn.text() == '*') $lastBtn.text('†');
            $btn.text('*');
            $lastBtn = $btn;
          } else if(btnText == '℣') {
            $lastBtn = $();
          }
        }
      });
      return pattern;
    });
    sel[part].text = versifyByPattern(lines, versePattern);
    updateTextAndChantForPart(part)
    addToHash(part + 'Pattern', versePattern.map(function(pattern) {
        return pattern.join(',').replace(/,+$/,'').replace(/,{2,}/g, function(match, index) {
          var len = match.length;
          if(index) {
            return ',' + (len - 1) + ',';
          } else {
            return len + ',';
          }
        });
      }).join(';').replace(/℣/g,'V'));
  }
  var tagReplacements = {
    "*": /<v>\\greheightstar<\/v>/g,
    "«": /<v>\$\\guillemotleft\$<\/v>/g,
    "»": /<v>\$\\guillemotright\$<\/v>/g,
    "$1": /<v>([\[\(\)\]])/g,
    "$1": /<v>\\large\{(.*?)}<\/v>/g,

    "℣": /<sp>V\/<\/sp>/g,
    "℟": /<sp>R\/<\/sp>/g,
    "æ": /<sp>ae<\/sp>/g,
    "ǽ": /<sp>'(ae|æ)<\/sp>/g,
    "œ": /<sp>'?(oe|œ)<\/sp>/g,
    "[$1]": /<sp>(.*?)<\/sp>/g,

    "($1) ": /<alt>(.*?)<\/alt>\s*/g
  };
  var replaceGabcTags = function(text) {
    Object.keys(tagReplacements).forEach(function(replace) {
      var find = tagReplacements[replace];
      text = text.replace(find,replace);
    });
    return text;
  }
  var toggleEditMarkings = function(event) {
    event && event.preventDefault && event.preventDefault();
    var $this = $(this),
        $part = $this.parents('div[part]'),
        part = $part.attr('part'),
        $showHide = $this.find('.showHide'),
        showing = $showHide.toggleClass('showing', event).hasClass('showing'),
        $blockRight = $part.find('.block.right'),
        $psalmEditor = $blockRight.find('.psalm-editor');
    $showHide.text(showing? 'Hide' : 'Show');
    if(showing) {
      if($psalmEditor.length) {
        $psalmEditor.show();
      } else {
        $psalmEditor = $('<div class="psalm-editor">');
        var lines = sel[part].lines || [[]];
        var pattern = sel[part].pattern || [];
        lines.forEach(function(segments, lineNum) {
          var $lastBtn = $();
          var pat = pattern[lineNum] || [];
          segments.forEach(function(segment, segNum) {
            var $span = $('<span>'),
                code = (pat[segNum] || NBSP).replace('†','*');
            $span.html(replaceGabcTags(segment));
            $psalmEditor.append($span);
            if(segNum != segments.length - 1) {
              var $button = $('<button>');
              $button.addClass('toggle-mediant');
              $button.attr('line', lineNum).attr('seg', segNum);
              $button.click(toggleMediant);
              $button.text(code);
              if(code == '*') {
                $lastBtn.text('†');
                $lastBtn = $button;
              } else if(code == '℣') {
                $lastBtn = $();
              }
              $psalmEditor.append($button);
            }
          });
          if(lineNum != lines.length - 1) {
            $psalmEditor.append('<br>');
          }
        });
        $blockRight.prepend($psalmEditor);
      }
    } else {
      $psalmEditor.hide();
    }
  }
  
  var updateStyle = function(part,style){
    addToHash('style'+part[0].toUpperCase()+part.slice(1), style == 'full' ? '' : style);
    if(style == 'full') {
      addToHash(part+'Pattern','');
    }
    sel[part].style = style;
    var capPart = part[0].toUpperCase() + part.slice(1);
    var $selToneEnding = $('#selToneEnding' + capPart),
        $selTone = $('#selTone' + capPart),
        $cbSolemn = $('#cbSolemn' + capPart),
        $right = $selTone.parent(),
        $toggleEditMarkings = $right.find('.toggleEditMarkings'),
        gabc = sel[part].gabc;
    if(style.match(/^psalm-tone/)) {
      if($toggleEditMarkings.length == 0) {
        $toggleEditMarkings = $("<a href='' class='toggleEditMarkings'>(<span class='showHide'>Show</span> Editor)</a>")
        $toggleEditMarkings.click(toggleEditMarkings);
        $right.prepend($toggleEditMarkings);
      } else {
        $toggleEditMarkings.show();
      }
      // if it is an alleluia:
      if(part.match(/^(?:graduale|allelu[ij]a)/) && isAlleluia(part,sel[part].text)) {
        if(style=='psalm-tone2') {
          // if it uses the simple psalm tone, then we still want to show these:
          $selToneEnding.show();
          $cbSolemn.show();
        } else {
          $selToneEnding.hide();
          $cbSolemn.hide();
        }
        var gabcHeader = gabc && getHeader(gabc);
        if(style=='psalm-tone1' || !(gabcHeader && gabcHeader.mode)) {
          // for alleluias, we can't allow changing the tone unless it is "fully psalm toned"
          $selTone.attr('disabled',false);
        } else {
          $selTone.attr('disabled',true);
          $selTone.val(gabcHeader.mode);
        }
      } else {
        $selToneEnding.show();
        $cbSolemn.show();
        $selTone.attr('disabled',false);
      }
    } else {
      if($toggleEditMarkings.length) toggleEditMarkings.call($toggleEditMarkings[0],false);
      $toggleEditMarkings.hide();
      $selToneEnding.hide();
      $cbSolemn.hide();
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
    var gp = "Glória Patri, et Fílio, † et Spirítui Sancto.\nSicut erat in princípio, † et nunc, et semper, * et in sǽcula sæculórum. Amen.".split('\n');
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
    return part=='alleluia' || (part.match(/^graduale/) && removeDiacritics(text).match(/^allelu[ij]a/i));
  }

  var getFullGloriaPatriGabc = function(part) {
    var gabc = part.gabc;
    if(!gabc) return;
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
    if(part=='introitus' || (isAl && sel[part].style != 'psalm-tone2')) {
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
          if(part.match(/^graduale/) && sel['alleluia'].style=='psalm-tone1') {
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
        if(part.match(/^graduale/)) {
          if(sel['alleluia'].style=='psalm-tone1') {
            $('#selStyleAlleluia').val('psalm-tone').change();
          }
        } else if(sel.graduale.style=='psalm-tone1') {
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
      var line = splitLine(lines[i], introitTone? 3 : 2);
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
        if(introitTone && line.length == 3) { //TODO: Make this optional perhaps
          var left = [line[0], line[1]];
          line.splice(1,1);
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
            flexEqualsTenor: true
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

  var updateTextAndChantForPart = function(part) {
    var gabc,
        capPart = part[0].toUpperCase()+part.slice(1),
        $div = $('#div'+capPart),
        $txt = $('#txt'+capPart);
    switch(sel[part].style) {
      case 'full':
        $txt.val((gabc = sel[part].gabc));
        if(isAlleluia(part,sel[part].text)) {
          if(part.match(/^graduale/)) {
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
      case 'psalm-tone2':
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
  function makeChantContextForSel(sel) {
    var ctxt = new exsurge.ChantContext(exsurge.TextMeasuringStrategy.Canvas);
    ctxt.lyricTextFont = "'Crimson Text', serif";
    ctxt.lyricTextSize *= 1.2;
    ctxt.dropCapTextFont = ctxt.lyricTextFont;
    ctxt.annotationTextFont = ctxt.lyricTextFont;
    sel.ctxt = ctxt;
  };
  $.each(sel,function(){
    makeChantContextForSel(this);
  });

  var updateExsurge = function(part, id) {
    var chantContainer = $('#'+part+'-preview')[0];
    var prop = sel[part];
    var ctxt = prop.ctxt;
    // some gregobase chants are encoded this way (two underscores for three note episema), and at least in the version of Gregrio on illuminarepublications.com, this does not work as desired.
    prop.activeGabc = prop.activeGabc.replace(/(aba|[a-b]c[a-b]|[a-c]d[a-c]|[a-d]e[a-d]|[a-e]f[a-e]|[a-f]g[a-f]|[a-g]h[a-g]|[a-h]i[a-h]|[a-i]j[a-i]|[a-j]k[a-j]|[a-k]l[a-k]|[a-l]m[a-l])\.*__(?!_)/g,'$&_');
    prop.activeGabc = prop.activeGabc.replace(/ae/g,'æ').replace(/oe/g,'œ').replace(/aé/g,'ǽ').replace(/A[Ee]/,'Æ').replace(/O[Ee]/,'Œ');
    var gabc = prop.activeGabc.replace(/<v>\\([VRA])bar<\/v>/g,function(match,barType) {
        return barType + '/.';
      }).replace(/<sp>([VRA])\/<\/sp>\.?/g,function(match,barType) {
        return barType + '/.';
      }).replace(/(\)\s+)([^()]*V\/\.\s*\d+\.?)(?=[ (])/g,'$1^$2^')
      .replace(/\)(\s+)(\d+\.?|[*†])(\s)/g,')$1^$2^$3')
      .replace(/([^)]\s+)([*†])\(/g,'$1^$2^(')
      .replace(/(<b>[^<]+)<sp>'(?:oe|œ)<\/sp>/g,'$1œ</b>\u0301<b>') // character doesn't work in the bold version of this font.
      .replace(/<b><\/b>/g,'')
      .replace(/!\//,'/') // some gregobase chants are encoded this way for some reason
      .replace(/<sp>'(?:ae|æ)<\/sp>/g,'ǽ')
      .replace(/<sp>'(?:oe|œ)<\/sp>/g,'œ́')
      .replace(/<v>\\greheightstar<\/v>/g,'*')
      .replace(/<\/?sc>/g,'%')
      .replace(/<\/?b>/g,'*')
        .replace(/(\([^)]*)([a-m])([vV]{2,3})/g, function(x,beginning,note,virgaCount) { // clumsy fix until it gets added to exsurge
          return beginning + new Array(virgaCount.length+1).join(note+virgaCount[0])
        })
        .replace(/<i>\(([^)]+)\)<\/i>/g,'_{}$1_') // There is no way to escape an open parenthesis in Exsurge.
      .replace(/<\/?i>/g,'_')
        .replace(/<v>[^<]+<\/v>/g,'')  // not currently supported by Exsurge
        .replace(/\[([^\]]+)\](?=\()/g,'\|$1')  // Translations are basically just additional lyrics
        .replace(/([^c])u([aeiouáéíóú])/g,'$1u{$2}') // center above vowel after u in cases of ngu[vowel] or qu[vowel]
        .replace(/(\w)(\s+)([^(\w]+\([^)]+\))/g,'$1$3$2') // change things like "et :(gabc)" to "et:(gabc) "
        .replace(/(\s[^(\w]+)\s+(\w+[^\(\s]*\()/g,'$1$2'); // change things like "« hoc" to "«hoc"
    var gabcHeader = getHeader(gabc);
    if(gabcHeader.original) {
      gabc = gabc.slice(gabcHeader.original.length);
    }
    var score = prop.score;
    if(score) {
      exsurge.Gabc.updateMappingsFromSource(ctxt, score.mappings, gabc);
      score.updateNotations(ctxt);
    } else {
      var mappings = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
      score = prop.score = new exsurge.ChantScore(ctxt, mappings, !prop.noDropCap);
    }
    if(gabcHeader.original) {
      if(gabcHeader.annotationArray) {
        score.annotation = new exsurge.Annotations(ctxt, '%'+gabcHeader.annotationArray[0]+'%', '%'+gabcHeader.annotationArray[1]+'%');
      } else if(gabcHeader.annotation) {
        score.annotation = new exsurge.Annotations(ctxt, '%'+gabcHeader.annotation+'%');
      } else if(!prop.noDropCap && (gabcHeader.mode || gabcHeader['office-part'])) {
        var annotation;
        if(gabcHeader['office-part']) annotation = partAbbrev[gabcHeader['office-part'].toLowerCase()];
        if(annotation) {
          score.annotation = new exsurge.Annotations(ctxt, '%'+annotation+'%', '%'+romanNumeral[gabcHeader.mode]+'%');
        } else if(gabcHeader.mode) {
          score.annotation = new exsurge.Annotations(ctxt, '%'+romanNumeral[gabcHeader.mode]+'%');
        }
      }
    }
    layoutChant(part, false, id);
  }
  var queue = [];
  function processQueue() {
    var callback;
    while(callback = queue.shift()) {
      callback();
    }
  }

  var layoutChant = function(part, synchronous, id) {
    var chantContainer = $('#'+part+'-preview');
    chantContainer.attr('gregobase-id', id || null);
    chantContainer = chantContainer[0];
    if(!chantContainer) return;
    var ctxt = sel[part].ctxt;
    var score = sel[part].score;
    var newWidth = chantContainer.clientWidth - 4;
    if(!score) return;
    ctxt.width = newWidth;
    // perform layout on the chant
    if(synchronous) {
      score.performLayout(ctxt);
      score.layoutChantLines(ctxt, ctxt.width);
      // render the score to svg code
      chantContainer.innerHTML = score.createSvgForEachLine(ctxt);
      updateTextSize(part);
    } else {
      score.performLayoutAsync(ctxt, function() {
        score.layoutChantLines(ctxt, ctxt.width, function() {
          // render the score to svg code
          chantContainer.innerHTML = score.createSvg(ctxt);
          var callback = function() {
            updateTextSize(part);
          };
          queue.push(callback);
          setTimeout(processQueue, 100);
        });
      });
    }
  }
  var relayoutAllChant = function(synchronous) {
    $.each(sel, function(part) {
      layoutChant(part, synchronous);
    });
  };
  var relayoutAllChantSync = function() {
    relayoutAllChant(true);
  };
  var relayoutAllChantAsync = function() {
    relayoutAllChant(false);
  };
  $(window).on('resize', relayoutAllChantAsync);
  
  var updateTextSize = function(part){
    var capPart = part[0].toUpperCase()+part.slice(1),
        $txt = $('#txt'+capPart),
        $preview = $('#'+part+'-preview');
    $txt.css('min-height',$preview.parents('.chant-parent').height() - $($txt.prop('labels')).height()).trigger('autosize');
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
  var $selOrdinary = $('#selOrdinary');
  $('#selSunday,#selSaint,#selMass').change(selectedDay);
  $selSundayNovus.change(selectedDayNovus);
  $selYearNovus.change(function(){
    selYearNovus = $(this).val();
    addToHash('yearNovus', selYearNovus);
    updateAllParts();
  });
  $selTempus.change(selectedTempus);
  $selOrdinary.change(selectedOrdinary).change();
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
  var i = 1;
  var now = moment().startOf('day');
  while(i < saintKeys.length) {
    var m = moment(saintKeys[i].key,'MMMD');
    if(m.isSameOrAfter(now)) break;
    ++i;
  }
  var beginningOfYearEntry = {title:"(Principium Annis)",en:"(Beginning of the Year)"}
  var moveToEnd = saintKeys.splice(1,i - 1);
  if(i < saintKeys.length && i >= 1) saintKeys.push(beginningOfYearEntry);
  saintKeys = saintKeys.concat(moveToEnd);

  i = 1;
  var outoforder = {
    EmbSatSept: null,
    ChristusRex: null
  };
  while(i < sundayKeys.length) {
    var sunday = sundayKeys[i];
    var m = dateForSundayKey(sunday.key);
    if(!m.isValid()) console.error(sunday);
    sunday.date = m;
    if(sunday.key in outoforder) {
      outoforder[sunday.key] = sunday;
      sundayKeys.splice(i,1);
    } else {
      ++i;
    }
  }

  // Put EmbSatSept and ChristusRex in the proper order
  Object.keys(outoforder).forEach(function(key) {
    var toPlace = outoforder[key];
    var lastDate = moment('12-31','MM-DD');
    var i = 1;
    while(i < sundayKeys.length) {
      var sunday = sundayKeys[i];
      var next = sundayKeys[++i];
      if(!next || (sunday.date.isBefore(toPlace.date) && next.date.isSameOrAfter(toPlace.date))) {
        sundayKeys.splice(i, 0, toPlace);
        break;
      }
    }
  });

  var i = 1;
  while(i < sundayKeys.length) {
    var sunday = sundayKeys[i];
    var next = sundayKeys[++i];
    if(next && (sunday.date.isBefore(now) && next.date.isSameOrAfter(now))) {
      moveToEnd = sundayKeys.splice(1, i - 1);
      sundayKeys.push(beginningOfYearEntry);
      sundayKeys = sundayKeys.concat(moveToEnd);
      break;
    }
  }

  populate(sundayKeys,$selSunday);
  populate(sundaysNovusOrdo,$selSundayNovus);
  populate(saintKeys,$selSaint);
  populate(otherKeys,$selMass);
  populate(tempusKeys,$selTempus);
  populate(yearArray,$selYearNovus);

  var ordinaryKeys = massOrdinary.map(function(e,i){
    var name = '';
    ++i;
    if(i<=18) name = i + ' - ';
    if(e.name) {
      name += e.name + ' (' + e.season + ')';
    } else {
      name += e.season;
    }
    return {
      key: i.toString(),
      title: 'Missa ' + name,
      en: 'Mass ' + name
    }
  });
  ordinaryKeys.unshift({
    key: '',
    title: 'Ordinaria Ad Libitum',
    en: 'Mass Ordinaries...'
  })
  populate(ordinaryKeys,$selOrdinary)
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
    var capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase();
    novusOption[part] = this.selectedIndex;
    updatePart(part);
  });
  $('.ordinary select').change(function(){
    var capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase();
    selOrdinaries[part + 'ID'] = this.value;
    addToHash(part, $(this.selectedOptions[0]).attr('default')? false : this.value);
    updatePart(part, this.selectedOptions[0].innerText);
  })
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
        $('select[id^=selStyle]:not(#selStyle)').val(style).each(function(i,o){
          updateStyle(o.id.slice(8).toLowerCase(),style);
        });
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
    var capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase();
    sel[part].mode = this.value;
    $selEnding = $('#selToneEnding' + capPart);
    var tone = this.value + '.',
        endings = getEndings(tone);
    if(endings.length==0 || (isAlleluia(part,sel[part].text) && sel[part].style != 'psalm-tone2')) {
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
    var capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase();
    sel[part].termination = this.value;
    updateTextAndChantForPart(part);
  });
  $('input.cbSolemn').change(function(e){
    var capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase();
    sel[part].solemn = this.checked;
    updateTextAndChantForPart(part);
  });
  var $selTones = $('select.tones');
  for(var i=1; i<=8; ++i) {
    $selTones.append('<option>'+i+'</option>');
  }
  $('textarea[id^=txt]').autosize().keydown(internationalTextBoxKeyDown).keydown(gabcEditorKeyDown).keyup(function(e){
    var capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
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
    $('[part]').each(function(){
      var $this = $(this),
          part = $this.attr('part'),
          capPart = part[0].toUpperCase() + part.slice(1),
          $includePart = $('#include' + capPart),
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
        $span = $(this).find('span.ui-icon');
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
  $('a.toggleShowGabc').attr('href','').click(function(e){
    e.preventDefault();
    var $this = $(this),
        $part = $this.parents().filter('[part]'),
        part = $part.attr('part');
        isShowing = $part.toggleClass('show-gabc').hasClass('show-gabc');
    $this.find('.showHide').text(isShowing?'Hide' : 'Show');
    layoutChant(part);
  });
  $('a.toggleShowChantPreview').attr('href','').click(function(e){
    e.preventDefault();
    var $this = $(this),
        $part = $this.parents().filter('[part]'),
        part = $part.attr('part');
        isShowing = !$part.toggleClass('hide-chant').hasClass('hide-chant');
    $this.find('.showHide').text(isShowing?'Hide' : 'Show');
    if(isShowing) layoutChant(part);
  });
  var customProperSelected = function(event,ui){
    var $this=$(this),
        capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase(),
        temp = chantID[part][ui.item.value];
    addToHash(part, (selPropers[part+'ID'] = (temp.Solesmes || temp).id || ''));
console.info(JSON.stringify(selPropers));
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
        capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
        part = capPart.toLowerCase();
    $this.autocomplete({minLength:0,
                        select:customProperSelected,
                        source:Object.keys(chantID[part])})
         .keyup(function(){
            if(this.value == '' && selPropers[part + 'ID']) {
              delete selPropers[part + 'ID'];
              addToHash(part, false);
              updatePart(part);
            }
         });
  });
  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
        relayoutAllChantSync();
      } else {
        relayoutAllChantSync();
      }
    });
  }
  window.onbeforeprint = relayoutAllChantSync;
  window.onafterprint = relayoutAllChantSync;
  var LocationHash = function(hash) {
    var regexKeyVal = /#([^=#]+)(?:=([^#]+))?/g;
    var curMatch;
    while(curMatch = regexKeyVal.exec(hash)) {
      this[curMatch[1]] = (typeof(curMatch[2])=='undefined')? true : curMatch[2];
    }
    return this;
  };
  LocationHash.prototype.toString = function() {
    var result = '';
    var hash = this;
    if(!hash.selSundayNovus) delete hash.selYearNovus;
    Object.keys(hash).forEach(function(key) {
      switch(typeof(hash[key])) {
        case 'boolean':
          if(hash[key]) result += '#' + key;
          break;
        case 'string':
          if(hash[key].match(/\.\.\.$/) || hash[key].length==0) break;
          // otherwise, fall through to default:
        default:
          result += '#' + key + '=' + hash[key];
          break;
      }
    });
    return result;
  }
  function parseHash() {
    if(!LocationHash) return null;
    return new LocationHash(location.hash);
  }
  function removeSelIfPresent(s) {
    if(typeof(s) != 'string') return s;
    if(s.match(/^sel[A-Z]/)) {
      return s[3].toLowerCase() + s.slice(4);
    }
    return s;
  }
  var allowAddToHash = false;
  function clearHash(obj,key) {
    if(!allowAddToHash) return;
    $(window).off('hashchange',hashChanged);
    location.hash = '';
    $('#selStyle').val('full');
    Object.keys(sel).forEach(function(key) {
      if(sel[key] && 'style' in sel[key]) {
        sel[key].style = 'full';
        $('#selStyle' + key[0].toUpperCase() + key.slice(1)).val('full');
      }
    });
    addToHash(obj,undefined,true);
    $(window).on('hashchange',hashChanged);
    loadStoredDataForKey(key);
  }
  /// addToHash(object)
  /// addToHash(key,value)
  function addToHash(a,b,dontStore) {
    if(!allowAddToHash) return;
    $(window).off('hashchange',hashChanged);
    var hash = parseHash();
    if(!hash) return;
    if(typeof b == 'undefined') {
      Object.keys(a).forEach(function(key) {
        hash[removeSelIfPresent(key)] = a[key];
      });
    } else {
      hash[removeSelIfPresent(a)] = b || false;
    }
    if(hash.mass != 'custom') {
      $('input.sel-custom').each(function(){
        var $this=$(this),
            capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
            part = capPart.toLowerCase();
        delete hash[part];
      });
    }
    if(hash.toString() != location.hash) location.hash = hash;
    var key = ['sunday','saint','mass','sundayNovus'].reduce(function(result, key){
      return result || (hash[key] && key);
    },'');
    if(key && !dontStore) {
      var realKey = hash[key];
      delete hash[key];
      var hashString = hash.toString();
      console.info(realKey, hashString);
      localStorage[realKey] = hashString;
      var storedKeys = JSON.parse(localStorage.storedKeys || "[]");
      var index;
      while((index = storedKeys.indexOf(realKey)) >= 0) {
        storedKeys.splice(index,1);
      }
      storedKeys.push(realKey);
      while(storedKeys.length > 4) {
        delete localStorage[storedKeys.shift()];
      }
      localStorage.storedKeys = JSON.stringify(storedKeys);
    }
    $(window).on('hashchange',hashChanged);
  }
  function loadStoredDataForKey(key) {
    var hash = localStorage[key];
    if(hash) location.hash += hash;
  }
  function hashChanged() {
    allowAddToHash = false;
    var hash = parseHash();
    ['sunday', 'sundayNovus', 'saint', 'mass',
     'tempus', 'yearNovus',
     'ordinary'].concat(ordinaryParts).reduce(function(result, key) {
      if(key in hash) {
        var $elem = $('#sel' + key[0].toUpperCase() + key.slice(1));
        if($elem.val() != hash[key]) $elem.val(hash[key]).change();
      }
    }, null);
    if(hash.mass == 'custom') {
      $('input.sel-custom').each(function(){
        var $this=$(this),
            capPart = this.id.match(/[A-Z][a-z]+\d*$/)[0],
            part = capPart.toLowerCase();
        if(hash[part]) {
          selPropers[part+'ID'] = hash[part];
          updatePart(part);
        }
      });
    }
    $('select[id^=selStyle]').each(function(){
      var $this=$(this),
          capPart = this.id.slice(3),
          part = capPart[0].toLowerCase() + capPart.slice(1),
          style = hash[part];
      if(style) {
        part = part.slice(5).toLowerCase();
        var pattern = hash[part+'Pattern'];
        if(pattern) {
          pattern = pattern.replace(/V/g,'℣').replace(/\d+/g,function(num) {
            return new Array(parseInt(num)).join(',');
          }).split(';').map(function(seg) {
            return seg.split(',');
          });
          sel[part].pattern = pattern;
        }
        if($this.val() != style) $this.val(style).change();
      }
    });
    allowAddToHash = true;
  }
  $('#divExtraChants a').click(showHideExtraChants);
  $(window).on('hashchange',hashChanged);
  $(document).on('click', 'div[gregobase-id] text.dropCap', function() {
    var id = $(this).parents('[gregobase-id]').attr('gregobase-id');
    window.open(gregobaseUrlPrefix + id, '_blank');
  })
  hashChanged();
});