var http= require('http'),
    fs = require('fs'),
    vr = require("./verseRef.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var festa = {};
var propria = {};
var partMap = {
  "Intr": "in",
  "Grad": "gr",
  "Tract": "tr",
  "All": "al",
  "Seq": "seq",
  "Offert": "of",
  "Comm": "co",
  "Missa": "ref"
}
var parts = Object.keys(partMap);
var regexPart = new RegExp(`^\\s*(${parts.join('|')})\\.\\s+(.+)$`);
var weekdays = ["mon","tue","wed","thu","fri","sat"];
var regexWeekday = new RegExp(`^(.*?)_?(${weekdays.join('|')})$`);
var currentFeast = "";
var urls = ['propers','saints'];
var iUrl = 0;
processUrl(urls[iUrl++]);
function processUrl(urlKey) {
  if(!urlKey) return;
  var url = `http://www.gregorianbooks.com/${urlKey}.html`;
  http.get(url, result => {
    result.setEncoding('utf8');
    var fileData = '';
    result.on('data', data => {
      fileData += data;
      console.info(fileData.length / result.headers["content-length"]);
    });
    result.on('close',e => console.info('socket closed on file: ' + file));
    result.on('aborted',e => console.info('ABORTED on file: ' + file));
    result.on('error',e => console.info('ERROR on file: ' + file));
    result.on('end', () => {
      

  var dom = new JSDOM(fileData, {url});
  var table = dom.window.document.querySelector('#main_table tbody')
  table.children.__proto__.forEach = Array.prototype.forEach;
  table.children.forEach(tr => {
    var td = tr.children[0];
    var a = td && td.querySelector("a[name]");
    var aHref = td && td.querySelector("a[href]");
    var sept = td && td.querySelector('.sept');
    var pasch = td && td.querySelector('.pasch');
    if(tr.children.length == 1) {
      if(!td.classList.contains("bar") &&
        !td.classList.contains("bar2") && a) {
        // new feast:
        if(currentFeast && !('ref' in propria) && !('in' in propria)) {
          delete festa[currentFeast];
        }
        propria = {};
        currentFeast = a.name;
        festa[a.name] = propria;
        propria.title = (td.querySelector('.greg0') || td).textContent.trim();
        let match = propria.title.match(/^(\d+)\s+(?:(or)\s+(\d+)\s+)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+-/);
        if(match) propria.date = match[4] + match[1] + (match[2]||'') + (match[3]||'');
        var href = td.querySelector('.jib>a[href*="introibo.fr"]');
        if(href) {
          propria.href = href.href;
        }
      }
    } else {
      if(a || aHref) {
        var match = (a || aHref).textContent.match(regexPart);
        if(match) {
          var key = partMap[match[1]];
          if(sept) key += "Sept";
          if(pasch) key += "Pasch";
          if(!(key in propria)) {
            if(key == 'ref') {
              var m = currentFeast.match(regexWeekday);
              if(m && m[1] in festa) {
                delete festa[currentFeast];
              }
              propria[key] = aHref.href.replace(/^http:\/\/www\.gregorianbooks\.com\//,'');
              return;
            }
            propria[key] = match[2];
            var span = td.querySelector('span.ps1');
            if(span) {
              var ref = span.innerHTML.replace(/(\s)et(\s)/g,' & ').replace(/(\w)\s+(?=[,;:!\.?])/g,'$1').replace(/[\.;]?<br>\s*/g,'; ').replace(/<hr>/,'\n').trim();
              if(ref) {
                propria[key+"Ref"] = ref;
              }
            }
          }
        }
      }
    }
  });

  fs.writeFileSync(`gregorian-${urlKey}.js`,`// from ${url}
gregorianPropers = ` + JSON.stringify(festa,null," "));

  processUrl(urls[iUrl++]);

    });
  });
}