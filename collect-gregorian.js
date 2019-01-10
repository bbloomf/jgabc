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
var regexPart = new RegExp(`^(${parts.join('|')})\\.\\s+(.+)$`);
var weekdays = ["mon","tue","wed","thu","fri","sat"];
var regexWeekday = new RegExp(`^(.*?)_?(${weekdays.join('|')})$`);
var currentFeast = "";
var table = document.querySelector('#main_table tbody')
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
      if(currentFeast && Object.keys(propria).length <= 2 && !('ref' in propria)) {
        delete festa[currentFeast];
      }
      propria = {};
      currentFeast = a.name;
      festa[a.name] = propria;
      propria.title = td.querySelector('.greg0').innerText;
      var href = td.querySelector('.jib>a[href*="introibo.fr"]');
      if(href) {
        propria.href = href.href;
      }
    }
  } else {
    if(a || aHref) {
      var match = (a || aHref).innerText.match(regexPart);
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
            propria[key] = aHref.href;
            return;
          }
          propria[key] = match[2];
          var span = td.querySelector('span.ps1');
          if(span) {
            propria[key+"Ref"] = span.innerText;
          }
        }
      }
    }
  }
});

JSON.stringify(festa,null," ");