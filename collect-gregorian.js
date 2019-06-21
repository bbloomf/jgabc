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
  "Missa": "ref",
  "Ant": "an",
  "Resp": "re"
}
var parts = Object.keys(partMap);
var regexPart = new RegExp(`^\\s*(?:(\\d+|[IiVv]+)\\s+)?(${parts.join('|')})\\.\\s+(.+)$`);
var weekdays = ["mon","tue","wed","thu","fri","sat"];
var regexWeekday = new RegExp(`^(.*?)_?(${weekdays.join('|')})$`);
var currentFeast = "";
var urls = ['propers','saints'];
var gabcRefs = {};
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
    result.on('close',e => console.info('socket closed on url: ' + url));
    result.on('aborted',e => console.info('ABORTED on url: ' + url));
    result.on('error',e => console.info('ERROR on url: ' + url));
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
        if(currentFeast && propria && !('ref' in propria) && !('refPasch' in propria) && !('in' in propria)) {
          delete festa[currentFeast];
        }
        if(currentFeast && !/_pt$/.test(currentFeast) && propria && !('ref' in propria) && ('refPasch' in propria) && !('in' in propria)) {
          console.info(currentFeast);
          console.info(propria.title);
          console.info(propria.refPasch);
          if(propria.refPasch == "saints.html#mass_one_martyr") {
            propria.ref = "saints.html#mass_i_martyr_not_bishop";
          }
        }
        propria = tempPropria = {};
        betweenBars = false;
        currentFeast = a.name;
        var iCount = 0;
        while(currentFeast in festa) {
          console.warn("2nd instance found of ", currentFeast)
          currentFeast = a.name + (++iCount);
        }
        festa[currentFeast] = propria;
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
          if(pasch && !(pasch.nextSibling && /\bper\sannum\b/i.test(pasch.nextSibling.textContent))) key += "Pasch";
          var name = (match[3] || '').replace(/([a-z])([A-Z])/g,'$1 $2');
          if((key in propria) && name != propria[key] && !name.startsWith(propria[key]+'(')) {
            match[1] = 1;
          }
          if(match[1] || !(key in propria)) {
            var rubric = tr.children[4];
            if(betweenBars || key == 'ref') {
              var rubric = rubric.innerHTML.replace(/\s+/g,' ').replace(/<br>|<\/div>/g,'\n').replace(/<[^>]+>/g,'').trim().replace(/^\S\s+/,'').split(/\n+/);
              var rubricText = rubric.slice(-1)[0].trim();
              if(/^(From|Same|Proper)\s/.test(rubricText)) {
                rubricText = rubric[0].trim();
              }
              if(key == 'ref' && /^M(ass|issa)/.test(rubricText)) {
                rubricText = rubricText.match(/\(([^)]+)\)/);
                rubricText = rubricText && rubricText[1];
                if(/^\d+$/.test(rubricText)) rubricText = null;
              }
              if(/^(From|Same|Proper)\s/.test(rubricText)) {
                rubricText = null;
              }
            }
            if(betweenBars && !sept && !pasch) {
              if((/^(gr|al)$/.test(key) && (propria.al instanceof Array) && !('gr' in propria)) ||
                  (key=='al' && /\bout\s+of\s+paschal/i.test(rubricText))) {
                if(propria.al && !('alPasch' in propria)) {
                  propria.alPasch = propria.al;
                  propria.alPaschID = propria.alID;
                  if(propria.alRef) {
                    propria.alPaschRef = propria.alRef;
                  }
                  delete propria.al;
                  delete propria.alID;
                  delete propria.alRef;
                }
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
              if(/\bin\s+paschal\b/i.test(rubricText) && !/Pasch$/.test(key)) {
                key += "Pasch";
                rubricText = null;
              }
              var href = aHref.href.replace(/^http:\/\/www\.gregorianbooks\.com\//,'');
              if(/\bMartyr\b/i.test(propria.title) && /confessor/.test(href)) {
                href = href.replace("confessor","martyr");
              }
              propria[key] = href;
              if(rubricText) propria[key+'Rubric'] = rubricText;
              return;
            } else {
              if(key == 'al' && name == 'Alleluia') name = 'Confitemini... quoniam';
              var incipitId = vr.findIncipitId(name,key,grPage,mode);
              if(incipitId == 451 && currentFeast === "rogations") {
                incipitId = 939;
              }
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
            var storePropria = !/^(an|re)(Extra)?$/.test(key);
            if(!storePropria && !grPage && !/^O\s/.test(name)) return;
            if(storePropria) {
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
            }

            var span = td.querySelector('span.ps1');
            if(span) {
              var ref = span.innerHTML.replace(/(\s)et(\s)/g,' & ').replace(/(\w)\s+(?=[,;:!\.?])/g,'$1').replace(/[\.;]?<br>\s*/g,'; ').replace(/<hr>/,'\n').trim();
              if(storePropria && !ref && !(key+"Ref" in propria) && propria[key] instanceof Array) {
                propria[key+"Ref"] = [""];
              }
              if(ref || (key+"Ref" in propria)) {
                var refs = ref.split('\n').map(ref => vr.parseRef(ref).verseRefString());
                ref = refs[0];
                if(/<hr>/.test(span.innerHTML) && refs.length == 1) {
                  refs[1] = ref;
                  ref = "";
                }
                if(ref) {
                  ref = ref.replace(/\bI([aeouy])/,'J$1');
                }
                if(storePropria) {
                  if(match[1]) {
                    propria[key+"Ref"] = propria[key+"Ref"] || [];
                    if(!(propria[key+'Ref'] instanceof Array)) propria[key+'Ref'] = [propria[key+'Ref']];
                    propria[key+"Ref"].push(ref);
                  } else if(ref) {
                    propria[key+"Ref"] = ref;
                  }
                }
                if(ref && (typeof incipitId == 'number')) {
                  if(incipitId in gabcRefs && (gabcRefs[incipitId] != ref)) {
                    console.info(`different Refs for chant ${incipitId}: ${gabcRefs[incipitId]} & ${ref}`);
                  } else {
                    gabcRefs[incipitId] = ref;
                  }
                }
                if(storePropria && refs.length > 1) {
                  if(refs.length > 2) throw propria;
                  propria[key+"Verses"] = refs[1];
                }
              }
            }
            if(typeof incipitId == 'number') {
              if(!gabcRefs[incipitId]) gabcRefs[incipitId] = "";
            }
            if(!storePropria) return;

            if(betweenBars && key == 'alPasch' && /\bsing\s+this\s+Alleluia\s+first/i.test(rubricText) && propria.al) {
              propria.alPasch = [propria.alPasch, propria.al];
              propria.alPaschID = [propria.alPaschID, propria.alID];
              if(propria.alPaschRef || propria.alRef)
              propria.alPaschRef = [propria.alPaschRef || "", propria.alRef || ""];
              rubricText = null;
            }
            if(betweenBars && rubricText) {
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
gregorianPropers = ${JSON.stringify(festa,null," ")}`);
  fs.writeFileSync('gabc-refs.js', `gabcRefs = ${JSON.stringify(gabcRefs,0,'\t')}`)

  processUrl(urls[iUrl++]);

    });
  });
}