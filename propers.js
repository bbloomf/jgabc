var selDay,selPropers;
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
  var selectedDay = function(e){
    selDay = $(this).val();
    selPropers = proprium[selDay];
    if(selPropers) {
      $('#txtIntroitus').text(selPropers.introitus);
      var id = getGabcForPropers(selPropers,'introitus')
      if(id) {
        selPropers.introitusID = id;
        $.get('gabc/'+id+'.gabc',function(gabc){
          $('#txtIntroitus').text(gabc);
        });
      }
      var graduale = selPropers.graduale;
      //TODO: Graduale, Tractus, Alleluia
      var gat = parseGraduale(selPropers.graduale);      
      if(gat.graduale) {
        $('#divGraduale').show();
        $('#txtGraduale').text(gat.graduale);
        id='';
        id = getGabcForPropers(selPropers,'graduale',gat.graduale);
        if(id) {
          selPropers.gradualeID = id;
          $.get('gabc/'+id+'.gabc',function(gabc){
            $('#txtGraduale').text(gabc);
          });
        }
      } else {
        $('#divGraduale').hide();
      }
      if(gat.alleluia) {
        $('#divAlleluia').show();
        $('#txtAlleluia').text(gat.alleluia);
        id = getGabcForPropers(selPropers,'alleluia',gat.alleluia);
        if(id) {
          selPropers.alleluiaID = id;
          $.get('gabc/'+id+'.gabc',function(gabc){
            $('#txtAlleluia').text(gabc);
          });
        }
      } else {
        $('#divAlleluia').hide();
      }
      if(gat.tractus) {
        $('#divTractus').show();
        $('#txtTractus').text(gat.tractus);
        id = getGabcForPropers(selPropers,'tractus',gat.tractus);
        if(id) {
          selPropers.tractusID = id;
          $.get('gabc/'+id+'.gabc',function(gabc){
            $('#txtTractus').text(gabc);
          });
        }
      } else {
        $('#divTractus').hide();
      }
      
      
      $('#txtOffertorium').text(selPropers.offertorium);
      var id = getGabcForPropers(selPropers,'offertorium')
      if(id) {
        selPropers.offertoriumID = id;
        $.get('gabc/'+id+'.gabc',function(gabc){
          $('#txtOffertorium').text(gabc);
        });
      }
      $('#txtCommunio').text(selPropers.communio);
      var id = getGabcForPropers(selPropers,'communio')
      if(id) {
        selPropers.communioID = id;
        $.get('gabc/'+id+'.gabc',function(gabc){
          $('#txtCommunio').text(gabc);
        });
      }
      
    }
  };
  
  var $selDay = $('#selDay').change(selectedDay);
  $.each(sundayKeys,function(i,o){
    var $temp = $('<option>'+ o.title +'</option>');
    $temp.val(o.key);
    $selDay.append($temp);
  });
});