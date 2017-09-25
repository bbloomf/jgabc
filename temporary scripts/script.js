var fs = require('fs');
var main={};
var files = fs.readdirSync('../Psalms-RGP/rgp-pointed');
var novaVulgata = fs.readFileSync('../psalms/NovaVulgata.txt', {encoding:'UTF8'}).split(/\s*\n\s*/);
var regexLatin = /((?:<\w+>)*)(((?:(?:(\s+)|)(?:(?:i(?!i)|(?:n[cg]|q)u)(?=[aeiouyáéëíóúýǽæœ])|[bcdfghjklmnprstvwxz]*)([aá]u|[ao][eé]?|[eiuyáéëíóúýǽæœ])(?:[\wáéíóúýǽæœ]*(?=-)|(?=(?:n[cg]u|sc|[sc][tp]r?|gn|ps)[aeiouyáéëíóúýǽæœ]|[bcdgptf][lrh][\wáéíóúýǽæœ])|(?:[bcdfghjklmnpqrstvwxz]+(?=$|[^\wáëéíóúýǽæœ])|[bcdfghjklmnpqrstvwxz](?=[bcdfghjklmnpqrstvwxz]+))?)))(?:([\*-])|([^\w\sáëéíóúýǽæœ]*(?:\s[:;†\*\"«»‘’“”„‟‹›‛])*\.?(?=\s|$))?)(?=(\s*|$)))((?:<\/\w+>)*)/gi;
var regexAccent = /[áéíóúýǽ]/i;
var regexCapitalVowel = /[AEIOUYÆŒæœ]/

var regexEnglish = /[a-z']+/gi;
var regexEnglishAccent = /'/;
var linesWithThreeOrMoreSyllablesBetweenFinalAccents = 0;
var linesWithMonoSyllableImmediatelyPrecedingFinalAccent = [];
q = function(line, reSyl, reAccent){
  var syllables = line.match(reSyl);
  if(!syllables) return false;
  var accents = [];
  for(var i = syllables.length - 1; i >= 0; --i) {
    var hasAccent = false;
    if(regexLatin == reSyl) {
      hasAccent = syllables[i].match(reAccent);
      if(!hasAccent && (i == 0 || syllables[i][0] == ' ')) {
        hasAccent = syllables[i+1] && syllables[i+1][0] != ' ' && (!syllables[i+2] || syllables[i+2][0] == ' ');
      }
      if(!hasAccent && syllables[i].match(regexCapitalVowel)) {
        for(var j = i+1; j < syllables.length; ++j) {
          if(syllables[j].match(regexAccent)) break;
          if(j == syllables.length - 1 || syllables[j][0] == ' ') {
            hasAccent = true;
            break;
          }
        }
      }
    }
    if(hasAccent || syllables[i].match(reAccent)) {
      accents.push(i);
      if(accents.length == 2) break;
    }
  }
  if(syllables.length >= 2 && (accents[0] - accents[1]) >= 4) {
    ++linesWithThreeOrMoreSyllablesBetweenFinalAccents;
    //console.info(line);
  }
  if(syllables[accents[0]][0] == ' ' && syllables[accents[0]-1][0] == ' ') linesWithMonoSyllableImmediatelyPrecedingFinalAccent.push(line);
  if(syllables.length < 2 || accents.length < 2) console.info(line);
  return accents;
};

var totalLines = 0;
for(i in novaVulgata) {
  var line = novaVulgata[i].trim();
  if(line.match(/^PSALMUS\s/)) continue;
  line = line.split(/\s*\*\s*/);
  q(line[0], regexLatin, regexAccent);
  q(line[1], regexLatin, regexAccent);
  ++totalLines
}

/// *** RGP ***
// for(var i=1; i <= 150; ++i) {
//   //console.info(i + '.txt')
//   var lines = fs.readFileSync('../Psalms-RGP/rgp-pointed/' + i + '.txt', {encoding:'UTF8'}).split(/\s*\n\s*/);
//   for(j in lines) {
//     var line = lines[j].trim();
//     if(!line) continue;
//     if(q(line, regexEnglish, regexEnglishAccent)) ++totalLines;
//   }
// }




console.info('lines with mono syllable immediately preceding final accent:');
console.info(linesWithMonoSyllableImmediatelyPrecedingFinalAccent.join('\n'));
console.info({totalLines, linesWithThreeOrMoreSyllablesBetweenFinalAccents, linesWithMonoSyllableImmediatelyPrecedingFinalAccent: linesWithMonoSyllableImmediatelyPrecedingFinalAccent.length});
