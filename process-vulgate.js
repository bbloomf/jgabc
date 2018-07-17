"use strict";
var fs = require("fs"),
    psalmMap = [],
    regexNonWord = /[^a-záéíóúæœǽýë\d\n]+/ig,
    vulgatePsalms = fs.readFileSync('psalms/vulgate','utf8').replace(regexNonWord,' ').toLowerCase().split('\n'),
    vulgateLine = 0;

var normalize = word => {
  return word.replace(/^[áéóíú]/, match => (({"á":"a","é":"e","í":"i","ó":"o","ú":"u"})[match])).replace(/ë/,'e');
}

for(var psalm=1; psalm <= 150; ++psalm) {
  psalmMap[psalm - 1] = [];
  var liberPsalm = fs.readFileSync(`psalms/${('00'+psalm).slice(-3)}`,'utf8').replace(regexNonWord,' ').toLowerCase().replace(/jí/g,'í').replace(/ji?/g,'i').split('\n');
  var liberI = 0;
  var liber = liberPsalm[liberI].trim().split(/\s+/);
  var vulgate;
  var li=0;
  for(var verse=1; ((vulgate = vulgatePsalms[vulgateLine])); ++verse, ++vulgateLine) {
    var matched = null;
    var match = vulgate.match(`^${psalm}\\s+${verse}\\s+`);
    var lastOfPsalm = !vulgatePsalms[vulgateLine+1] || !vulgatePsalms[vulgateLine+1].match(`^${psalm}\\s+`);
    if(match) {
      vulgate = vulgate.slice(match[0].length).trim().split(/\s+/);
      var vi=0;
      while(vi < vulgate.length) {
        if(li >= liber.length) {
          li = 0;
          liber = (liberPsalm[++liberI] || '').trim().split(/\s+/);
        }
        if(normalize(liber[li]) == normalize(vulgate[vi])) {
          li++;
          if(typeof matched != 'number') matched = liberI;
        } else if((typeof matched=='number' || liberI > 0 || li > 0) && vulgate.length > vi + 1 && normalize(liber[li]) == normalize(vulgate[vi+1])) {
          console.warn(`\n${psalm} : ${verse}: missing word: ${vulgate[vi]}, \n${liber.join(' ')}\n${vulgate.join(' ')}`);
        } else if((typeof matched=='number' || liberI > 0 || li > 0) && vulgate.length > vi + 1 && liber.length > li + 1 && normalize(liber[li+1]) == normalize(vulgate[vi+1])) {
          console.warn(`\n${psalm} : ${verse}: different words: ${liber[li]} and ${vulgate[vi]}, \n${liber.join(' ')}\n${vulgate.join(' ')}`);
          li++;
        } else if(!liber[li] && normalize(vulgate[vi]) == 'allelúia') {

        } else if(typeof matched=='number' || liberI > 0 || li > 0) {
          if(liberI > 0 && !lastOfPsalm) {
            console.error(`${psalm} : ${verse}`, '\n'+liber.join(' '), "\nvs.\n", vulgate.join(' '));
            throw `error in psalm ${psalm}: couldn't find verse ${liberI}:\n"${liber}" at word ${liber[li]},\n«${vulgate}»\nlength:${liber.length},${li}`;
          }
          if(lastOfPsalm) console.warn(`Psalm ${psalm} is missing last verse (${vulgate.join(' ')})`);
          li = 0;
          matched = null;
          break;
        }
        vi++;
      }
      if(typeof matched == 'number' && !((verse - 1) in psalmMap[psalm - 1])) {
        psalmMap[psalm - 1][verse - 1] = matched;
      }
      // console.info(`${psalm} : ${verse}`, li, '\n'+liber.join(' '), "\nvs.\n", vulgate.join(' '));
      if(li == liber.length && liberI == liberPsalm.length) {
        liber = (liberPsalm[++liberI]||'').split(/\s+/);
      }
    } else {
      break;
    }
  }
  //console.info(`${verse-1} verses in psalm ${psalm}`);
}
fs.writeFileSync('psalmMap.json','['+psalmMap.map(m => JSON.stringify(m)).join(',\n')+']','utf8');