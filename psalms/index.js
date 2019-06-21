"use strict";
if(!location.hash) location.hash = 1;
$(function() {
  var psalmVersion = "liber";
  var liber = [], vulgate = [], psalmMap = [];
  $.get('../psalmMap.json', function(map) {
    psalmMap = map;
  });
  $.get('../vulgate/Psalmi', function(wholeVulgate) {
    wholeVulgate.trim().split('\n').reduce(function(vulgate, verse) {
      var match = /^(\d+)\s+(\d+)\s+(.*)$/.exec(verse);
      var psalm = match[1] - 1,
          vnum = match[2] - 1;
      if(!(psalm in vulgate)) vulgate[psalm] = [];
      vulgate[psalm][vnum] = match[3];
      return vulgate;
    }, vulgate);
    $(window).on('hashchange', function() {
      var txtRef = decodeURIComponent(window.location.hash.slice(1));
      if(/^\d/.test(txtRef)) {
        txtRef = "Psalm " + txtRef;
      }
      var refs = parseRef(txtRef);
      var title = refArrayString(refs);
      $('.title').text(title);
      $('#psalm').empty();
      var lastRef = null;
      var result = refs.map(ref => {
        var obj = {};
        ref.startInMiddle = lastRef && lastRef.book == ref.book && lastRef.chapter == ref.chapter && lastRef.getEndVerse() == (ref.verse - 1);
        lastRef = ref;
        ref.getLinesFromLiber().then(lines => {
          obj.html = lines.map(l => `<div class='liber'>${l}</div>`).join('');
          $('#psalm').html(result.map(o => o.html || '').join(''));
        });
        return obj;
      });
    }).trigger('hashchange');
  });
})