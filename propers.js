var selDay,selPropers,selGabc={};
var partAbbrev = {
  tractus:'Tract.',
  offertorium:'Offert.',
  introitus:'Intr.',
  graduale:'Grad.',
  communio:'Comm.',
  alleluia:''
};
$(function(){
  var removeDiacritics=function(string) {
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
  var updatePart = function(part) {
    var id = selPropers[part+'ID'];
    var capPart = part[0].toUpperCase()+part.slice(1);
    var $div = $('#div'+capPart);
    if(id) {
      $div.show();
      $.get('gabc/'+id+'.gabc',function(gabc){
        gabc = gabc.replace(/\s+$/,'');
        var header = getHeader(gabc);
        header.annotation = partAbbrev[part];
        gabc = header + gabc.slice(header.original.length);
        var $txt = $('#txt'+capPart),
            $preview = $('#'+part+'-preview');
        selGabc[part] == gabc;
        $txt.val(decompile(gabc,true));
        updateChant(gabc,$preview[0],true)
        $txt.css('min-height',$preview.parents('.chant-parent').height() - $($txt.prop('labels')).height()).trigger('autosize');
      });
    } else {
      $div.hide();
    }
  }
  var selectedDay = function(e){
    selDay = $(this).val();
    selPropers = proprium[selDay];
    if(selPropers) {
      updatePart('introitus');
      updatePart('graduale');
      updatePart('alleluia');
      updatePart('tractus');
      updatePart('offertorium');
      updatePart('communio');
    }
  };
  
  var $selDay = $('#selDay').change(selectedDay);
  $.each(sundayKeys,function(i,o){
    var $temp = $('<option>'+ o.title +'</option>');
    $temp.val(o.key);
    $selDay.append($temp);
  });
  $('textarea').autosize().keydown(internationalTextBoxKeyDown);
  //$('.preview-container').height(function(){return $(this).parent().height();});
});