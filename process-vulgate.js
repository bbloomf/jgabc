"use strict";
var fs = require("fs"),
    psalmMap = [],
    regexNonWord = /[^a-záéíóúæœǽýë\d\n]+/ig,
    vulgatePsalms = fs.readFileSync('vulgate/Psalmi','utf8').replace(regexNonWord,' ').toLowerCase().split('\n'),
    vulgateLine = 0;

var normalize = word => 
  word.replace(/^[áéóíú]/, match => (({"á":"a","é":"e","í":"i","ó":"o","ú":"u"})[match])).replace(/ë/,'e').
    replace(/^([eé])xs/,'$1x').replace(/^([aá])ss/,'$1s').replace(/p([uú])lcr/,'p$1lchr').replace(/^her([ée])dit/,'hær$1dit').
    replace(/^n([eé])pht([áa])li/,'n$1phth$2li').replace(/^d([íi])sr([iíuú])p/,'d$1r$2p');

// cantica
/*
Dan 3: 57, 60-65, 83-87 // Canticum Trium Puerorum
Dan 3: 58-61
Deut 32: 1-4
Is 12: 1-6
Is 35: 1, 2-3, 5-7
Luc 1: 46-55 // Magnificat
Luc 1: 68-79 // Benedictus
Luc 2: 29-32 // Nunc dimíttis
Sap 3: 1-3, 5, 8-9
Tob 13: 1, 3, 5-6, 8-10
*/

for(var psalm=1; psalm <= 150; ++psalm) {
  psalmMap[psalm - 1] = [];
  var liberPsalm = fs.readFileSync(`psalms/${('00'+psalm).slice(-3)}`,'utf8').replace(regexNonWord,' ').toLowerCase().split('\n');
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
        } else if((typeof matched=='number' || liberI > 0 || li > 0) && liber.length > li + 1 && normalize(liber[li+1]) == normalize(vulgate[vi])) {
          console.warn(`\n${psalm} : ${verse}: missing word in vulgate: ${liber[li]}, \n${liber.join(' ')}\n${vulgate.join(' ')}`);
          ++li;
          continue;
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