"use strict";
if(!location.hash) location.hash = 1;
$(function() {
  var liber = [], vulgate = [], psalmMap = [];
  $.get('../psalmMap.json', function(map) {
    psalmMap = map;
  });
  $.get('vulgate', function(wholeVulgate) {
    wholeVulgate.trim().split('\n').reduce(function(vulgate, verse) {
      var match = /^(\d+)\s+(\d+)\s+(.*)$/.exec(verse);
      var psalm = match[1] - 1,
          vnum = match[2] - 1;
      if(!(psalm in vulgate)) vulgate[psalm] = [];
      vulgate[psalm][vnum] = match[3];
      return vulgate;
    }, vulgate);
    $(window).on('hashchange', function() {
      var psalm = location.hash.slice(1);
      $('.title').text('Psalm ' + psalm);
      $('#psalm').empty();
      $.get(('00'+psalm).slice(-3), function(result) {
        liber = result.trim().split('\n');
        var map = psalmMap[psalm - 1];
        $('#psalm').append(vulgate[psalm - 1].map(function(verse, index) {
          var a = map[index],
              b = map[index + 1],
              c = map[index - 1];
          if(typeof a != 'number') a = Infinity;
          if(c === a) ++a;
          if(b === a) ++b;
          return `<div class='vulgate'>${index + 1}. ${verse}</div>
${liber.slice(a, b||undefined).map(verse => `<div class='liber'>${verse}</div>`).join('')}
<br>`;
        }).join(''))
      });
    }).trigger('hashchange');
  });
})