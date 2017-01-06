var regexSplit = /\s+(?=[^\)]*(?:\(|$))/;
var regexMatch = /(?:\([^)]+(?:\)|$)|\S)+/g;
ArrayParent = function(){};
ArrayParent.prototype.get = function(key){ if(!this[key]) this[key] = []; return this[key]; }

var fs = require('fs');
var regexLatin = /((?:<(?:b|i|sc)>)*)(((?:(?:(\s+)|^)(?:s[uú](?:bs?|s(?=[cpqt]))|tr[aá]ns|p[oó]st|[aá]d|[oó]bs|[eé]x|p[eéoó]r|[ií]n|r[eé](?:d(?=d|[aeiouyáéëíóúýǽæœ]))))|(?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽæœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ])(?:[\wáéíóúýǽæœ]*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]|[bcdgptf][lrh][\wáéíóúýǽæœ])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|([^\w\sáëéíóúýǽæœ]*(?:\s[:;†\*\"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/(?:b|i|sc)>)*)/gi;
var regexGabc = /<alt>.*?<\/alt>|(((?:<(\w+)>.*?<\/\3>)?([^\(\s,.:;!?*†][^\(\r\n,.:;!?*†]*)[,.:;!?*†]*(?:($)|\())|\()([^\)]*)(?:($)|\))([\s*†]*(\s*))/g;
var regexAccents = /[áéíóúýǽ]/i;
var regexVowel = /[AEIOUYÆŒ]/;
var accentVowel = {
  'a': 'á',
  'e': 'é',
  'i': 'í',
  'o': 'ó',
  'u': 'ú',
  'y': 'ý',
  'æ': 'ǽ',
  'œ': 'oé'
}
var regexHeaderEnd=/(?:^|\n)%%\s?\n/;
var gabcDir = 'gabc'
var gabcs = fs.readdirSync(gabcDir);
var processedGabcs = [];
var algorithms = [
  function(gabc) {
    return gabc.split(regexSplit);
  },
  function(gabc) {
    return gabc.match(regexMatch);
  }
];
gabcs = gabcs.map(function(fn) {
  fn = gabcDir+'/'+fn;
  var text = fs.readFileSync(fn,{encoding:'utf8'});
  //find header...
  var index = text.indexOf('\n%%\n');
  if(index<0) {
    console.info('No GABC header found: ' + fn);
    return '';
  }
  return text.slice(index+3).trim();
});
var times = algorithms.map(function(processGabc) {
  var start = new Date().getTime();
  processedGabcs.push(gabcs.map(processGabc));
  return new Date().getTime() - start;
});
gabcs.forEach(function(gabc, index) {
  if(JSON.stringify(processedGabcs[0][index]) != JSON.stringify(processedGabcs[1][index])) {
    console.info(JSON.stringify(processedGabcs[0][index]))
    console.info(JSON.stringify(processedGabcs[1][index]));
  }
});
console.info(times);
