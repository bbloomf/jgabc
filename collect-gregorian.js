var http= require('http'),
    fs = require('fs'),
    vr = require("./verseRef.js"),
    prData = require('./incipits.js');
const incipits = prData.incipits;
const pages = prData.pages;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var propria = {};
var tempPropria;
var betweenBars = false;
var partMap = {
  "Intr": "in",
  "Grad": "gr",
  "Hymn": "hy",
  "Tract": "tr",
  "All": "al",
  "Seq": "seq",
  "Offert": "of",
  "Comm": "co",
  "Missa": "ref"
}
var parts = Object.keys(partMap);
var regexPart = new RegExp(`^\\s*(?:(\\d+|[IiVv]+)\\s+)?(${parts.join('|')})\\.\\s+(.+)$`);
var weekdays = ["mon","tue","wed","thu","fri","sat"];
var regexWeekday = new RegExp(`^(.*?)_?(${weekdays.join('|')})$`);
var currentFeast = "";
var urls = ['propers','saints'];
var iUrl = 0;
processUrl(urls[iUrl++]);
function processUrl(urlKey) {
  var festa = {};
  if(!urlKey) return;
  var url = `http://www.gregorianbooks.com/${urlKey}.html`;
  http.get(url, result => {
    result.setEncoding('utf8');
    var fileData = '';
    var lastPercent = 0;
    result.on('data', data => {
      fileData += data;
      var percent = Math.floor(100 * fileData.length / result.headers["content-length"]);
      if(percent != lastPercent) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(percent.toString());
        if(percent == 100) process.stdout.write("\n");
      }
      lastPercent = percent;
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
    var modeTd = tr.children[1];
    var mode = modeTd && parseInt(modeTd.textContent);
    var grTd = tr.children[3];
    var grA = grTd && grTd.querySelector('a');
    var gr = grA && grA.textContent.match(/GR(\S+)/);
    var grPage = gr && gr[1];
    var a = td && td.querySelector("a[name]");
    var aHref = td && td.querySelector("a[href]");
    var sept = td && td.querySelector('.sept');
    var pasch = td && td.querySelector('.pasch');
    if(tr.children.length == 1) {
      if(propria && (('in' in propria) || ('ref' in propria)) && td.classList.contains("bar2")) {
        betweenBars = !betweenBars;
        if(!betweenBars && propria.alPasch && propria.gr && !propria.al) {
          // just guess that it is usally the second alleluia that gets used outside of paschal time
          // though for st_robert_bellarmine it is the first:
          var i = 1;
          if(currentFeast == 'st_robert_bellarmine') i = 0;
          propria.al = propria.alPasch[i];
          propria.alID = propria.alPaschID[i];
          if(propria.alPaschRef && propria.alPaschRef[i]) {
            propria.alRef = propria.alPaschRef[i];
          }
        }
      }
      if(!td.classList.contains("bar") &&
        !td.classList.contains("bar2") && a) {
        // new feast:
        if(currentFeast && propria && !('ref' in propria) && !('in' in propria)) {
          delete festa[currentFeast];
        }
        propria = tempPropria = {};
        betweenBars = false;
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
    } else if(propria || (td && td.classList.contains('ser') && /^(Missa|Mass)$/.test(td.textContent.trim()))) {
      if(td && td.classList.contains('ser')) {
        var match = /^(Missa|Mass)$/.test(td.textContent.trim());
        if(match) {
          festa[currentFeast] = propria = tempPropria;
          betweenBars = false;
        } else {
          if(currentFeast && propria && !('ref' in propria) && !('in' in propria)) {
            delete festa[currentFeast];
          }
          propria = null;
        }
      }
      if(a || aHref) {
        var match = (a || aHref).textContent.match(regexPart);
        if(match) {
          var key = partMap[match[2]];
          if(key == 'hy' && (betweenBars || !('in' in propria))) return;
          if(sept) key += "Sept";
          if(pasch) key += "Pasch";
          var name = (match[3] || '').replace(/([a-z])([A-Z])/g,'$1 $2');
          if((key in propria) && name != propria[key] && !name.startsWith(propria[key]+'(')) {
            match[1] = 1;
          }
          if(match[1] || !(key in propria)) {
            var rubric = tr.children[4];
            if(betweenBars) {
              var rubric = rubric.innerHTML.replace(/\s+/g,' ').replace(/<br>|<\/div>/g,'\n').replace(/<[^>]+>/g,'').trim().replace(/^\S\s+/,'').split(/\n+/);
              var rubricText = rubric.slice(-1)[0].trim();
              if(/^(From|Same)\s/.test(rubricText)) {
                rubricText = rubric[0].trim();
              }
            }
            if(betweenBars && !sept && !pasch) {
              if(/^(gr|al)$/.test(key) && (propria.al instanceof Array) && !('gr' in propria)) {
                propria.alPasch = propria.al;
                propria.alPaschID = propria.alID;
                if(propria.alRef) {
                  propria.alPaschRef = propria.alRef;
                }
                delete propria.al;
                delete propria.alID;
                delete propria.alRef;
              } else {
                key += "Extra";
                match[1] = key in propria;
              }
            }
            if(/^ref/.test(key)) {
              var m = currentFeast.match(regexWeekday);
              if(m && m[1] in festa) {
                delete festa[currentFeast];
              }
              propria[key] = aHref.href.replace(/^http:\/\/www\.gregorianbooks\.com\//,'');
              return;
            } else {
              if(key == 'al' && name == 'Alleluia') name = 'Confitemini... quoniam';
              var incipitId = vr.findIncipitId(name,key,grPage,mode);
              if(key == 'hy' && (typeof incipitId != 'number')) return;
              if(key == 'al' && name.match(/\(Rogations\)/)) incipitId = null;
              if(key == 'tr' && 'al' in propria && !('gr' in propria)) {
                propria.gr = propria.al;
                propria.grID = propria.alID;
                if(propria.alRef) {
                  propria.grRef = propria.alRef;
                }
                delete propria.al;
                delete propria.alID;
                delete propria.alRef;
              }
              if(typeof incipitId == 'object') {
                console.info(`findIncipitId(${JSON.stringify(name)}, ${JSON.stringify(key)}, ${JSON.stringify(grPage)}, ${JSON.stringify(mode)}) =
${JSON.stringify(incipitId,1,' ')}`);
              }
            }
            if(match[1]) {
              propria[key] = propria[key] || [];
              if(!(propria[key] instanceof Array)) propria[key] = [propria[key]];
              propria[key].push(name);
              propria[key+'ID'] = propria[key+'ID'] || [];
              if(!(propria[key+'ID'] instanceof Array)) propria[key+'ID'] = [propria[key+'ID']];
              propria[key+'ID'].push(incipitId);
            } else {
              propria[key] = name;
              if(incipitId) propria[key+'ID'] = incipitId;
            }

            var span = td.querySelector('span.ps1');
            if(span) {
              var ref = span.innerHTML.replace(/(\s)et(\s)/g,' & ').replace(/(\w)\s+(?=[,;:!\.?])/g,'$1').replace(/[\.;]?<br>\s*/g,'; ').replace(/<hr>/,'\n').trim();
              if(!ref && !(key+"Ref" in propria) && propria[key] instanceof Array) {
                propria[key+"Ref"] = [""];
              }
              if(ref || (key+"Ref" in propria)) {
                var refs = ref.split('\n').map(ref => vr.parseRef(ref).verseRefString());
                ref = refs[0];
                if(match[1]) {
                  propria[key+"Ref"] = propria[key+"Ref"] || [];
                  if(!(propria[key+'Ref'] instanceof Array)) propria[key+'Ref'] = [propria[key+'Ref']];
                  propria[key+"Ref"].push(ref);
                } else {
                  propria[key+"Ref"] = ref;
                }
                if(refs.length > 1) {
                  if(refs.length > 2) throw propria;
                  propria[key+"Verses"] = refs[1];
                }
              }
            }

            if(betweenBars) {
              if(key+'Rubric' in propria) {
                if(!(propria[key+'Rubric'] instanceof Array)) propria[key+'Rubric'] = [propria[key+'Rubric']];
                propria[key+'Rubric'].push(rubricText);
              } else {
                propria[key+'Rubric'] = rubricText;
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