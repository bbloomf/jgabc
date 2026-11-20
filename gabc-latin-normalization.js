const { consonantalJ, hyphenateLatin, removeAcuteAccents } = require('./gabc-latin-syllables');
const { accentLatinWord } = require('./gabc-latin-accents');
const regexTag = /<\/?[^>]*>/g;
// House spelling for application lyrics. Keep source/publication text untouched,
// and never turn adjacent GABC pitch letters into a text ligature.
function normalizeLatinLyrics(source) {
  return source.replace(/\([^)]*\)|<sp>'(?:ae|æ)<\/sp>|<sp>'(?:oe|œ)<\/sp>|<sp>ae<\/sp>|<sp>oe<\/sp>|<[^>]*>|[^<(]+/g, token => {
    if (token[0] === '(') return token;
    const special = { "<sp>'ae</sp>": 'ǽ', "<sp>'æ</sp>": 'ǽ', "<sp>'oe</sp>": 'œ́', "<sp>'œ</sp>": 'œ́', '<sp>ae</sp>': 'æ', '<sp>oe</sp>': 'œ' };
    if (special[token]) return special[token];
    if (token[0] === '<') return token;
    return token.replace(/A[éÉ]/g,'Ǽ').replace(/oé/g,'œ́')
      .replace(/ae/g,'æ').replace(/oe/g,'œ').replace(/aé/g,'ǽ')
      .replace(/A[Ee]/g,'Æ').replace(/O[Ee]/g,'Œ');
  });
}
// Punctuation and quotation marks go with their word, without the space some transcriptions print between them
// (as in no(ef)stra :(f), which would otherwise be taken for the two words no and stra)
function attachPunctuation(content) {
  return content
    .replace(/\s+([»’”"':;!?.,]+)\s*([(<])/g,'$1$2')
    .replace(/([«‘“"']+)\s+(?=[a-zæœǽǽœ́áéíóúýäëïöüÿ])/gi,'$1');
}
// What both importers do to the body of a score from GregoBase before its syllables are divided:
// house spelling and layout, and other ways of writing the notation the older Exsurge could not draw as written.
function cleanGregobaseGabc(content) {
  content = normalizeLatinLyrics(content)
    // a ~ in the lyrics is a non-breaking space, so keep a single one that joins a word to what is next to it (as in *~Quam, +~in, o~: and <i>Ps.~50.</i>),
    // and remove the rest, which only add space (as in ~~~<i>T. P.</i>, ~*, {~} and <v>~</v>) and keep the regexes here and in propers.js from finding things
    .replace(/(?<=(.?))(?:<v>~+<\/v>|~+)(?=([^()]?)[^()]*\()/g, (tildes, before, after) =>
      (tildes == '~' && /[^\s)]/.test(before) && /\S/.test(after) && /[a-zæœǽœ́áéíóúýäëïöüÿ\d]/i.test(before + after)) ? tildes : '')
    // remove empty {}; an asterisk before them becomes its own syllable, as in the other Kyries, or goes before the bar it follows, as in the other Alleluias (only in 1266.gabc)
    .replace(/(\([,;:]+\)\s+)?\*\{\s*\}(?=\()/g, (_, bar) => bar ? `*${bar}` : '*() ')
    .replace(/\{\s*\}(?=[^()]*\()/g, '')
    .replace(/@/g,'!') // TODO: support @ in Exsurge
    .replace(/([A-M])[0-2]/g, '$1') // TODO?: right now 0 in this exsurge shifts the vertical position, and it doesn't support https://gregorio-project.github.io/tips/inclinatum.html
    .replace(/\/\[-[^\]]+\]/g, '!') // TODO: support variable neumatic cuts, for now, any negatives must be removed
    .replace(/\[[uo](?:h|ll)(?::[^\]]*|})?\]/g, '') // TODO: support in Exsurge
    .replace(/<\/?nlba>/g, '') // GregoBase's no-line-break areas keep the line breaks of a printed page, which a page of any width doesn't need (an introit's Glória Patri gets its own below)
    .replace(/(<\/?)e>/g, '$1i>') // TODO: support in Exsurge
    .replace(/<clear>/g, '') // TODO: what does this even do in Exsurge?
    .replace(/\*{2,}/g,'<c>$&</c>')
    .replace(/<i>\s+/g,'<i>')
    .replace(/\s+<\/i>/g,'</i>')
    .replace(/^([^)]*\)?\s*[A-Z]*)(<sc>.*?\)\s)/, (_, start, firstWord) =>
      // get rid of small caps in initial word
      start + firstWord.replace(/<sc>([\wáéíóúæœǽœ́ýÁÉÍÓÚÆŒǼŒ́Ý]+)<\/sc>/g, '$1')
    )
    .replace(/([^)])\s+\*(\([a-m][^)]*\))/,"$1 <c>*</c>$2") // asterisks being kept with the previous word
    .replace(/\)\s+\*(?=\([a-m])/,") *() ") // asterisks being under the melody
    .replace(/\)\(([,;])\)\(/g,'$1')
    .replace(/<b><\/b>/g,'')
    .replace(/<v>\\greheightstar<\/v>/g,'*')
    .replace(/\s*((?:<sp>v\/<\/sp>\.?\s*)?\d+\.)\(\)\s*/gi,' $1 ')
    .replace(/\s*(<sp>v\/<\/sp>\.?|<i>Ps.<\/i>|(?:<sp>v\/<\/sp>\.?\s*)?\d+\.)(\((?:z0|[a-m]\+)?::(z|[cf][1-4])?\))\s*/gi,' $2\n$1 ')
    .replace(/\s*(<sp>[vra]\/<\/sp>\.?\s*)\(\)\s*/gi,' $1 ')
    .replace(/\s*(<sp>[vra]\/<\/sp>\.?\s*)(\((?:z0|[a-m]\+)?::(z|[cf][1-4])?\))\s*/gi,' $2\n$1 ')
    .replace(/(\w)(\([^)]+\)\s+):/g,'$1:$2')
    .replace(/[/ ]+\)/g,')')
    .replace(/!\//g,'/')
    .replace(/<v>\$\\guillemotright\$<\/v>/g,'»')
    .replace(/<v>\$\\guillemotleft\$<\/v>/g,'«')
    .replace(/<v>\s*\\kern[^<]*<\/v>/g,'');
  content = attachPunctuation(content)
    .replace(/(\((?:z0|[a-m]\+)?:+(z|[cf][1-4])?\))\s+/gi,'$1\n')
    .replace(/\/+([a-m]w)/g,'!$1') // don't put space before a quilisma
    .replace(/\s+$/,'')
    .replace(/\+(?=[^()]*\()/g,'†')
    .replace(/(\S)(\([a-m]\+[^)]*\))/g,'$1() $2') // put any lyrics after a manual custos
    .replace(/(\s+)(\([a-m]\+[^)]*\))\s+([^(\s][^(]*\(\))/g,'$1$3 $2') // put any lyrics after a manual custos
    // some gregobase chants are encoded this way (two underscores for three note episema), and in Gregorio and Exsurge, this does not work as desired.
    .replace(/(a'?b'?a|[a-b]'?c'?[a-b]|[a-c]'?d'?[a-c]|[a-d]'?e'?[a-d]|[a-e]'?f'?[a-e]|[a-f]'?g'?[a-f]|[a-g]'?h'?[a-g]|[a-h]'?i'?[a-h]|[a-i]'?j'?[a-i]|[a-j]'?k'?[a-j]|[a-k]'?l'?[a-k]|[a-l]'?m'?[a-l])[.']*__(?!_)/g,'$&_')
    .replace(/!\//g,'/') // some gregobase chants are encoded this way for some reason
    .replace(/(\w)(\s+)([^()|a-z†*]+(<\/?\w+>)*\([^)]*\))/gi,'$1$3$2') // change things like "et :(gabc)" to "et:(gabc) "
    .replace(/(\s[^()\w†*,;:]+) +(\w+[^\(\s]*\()/g,'$1$2') // change things like "« hoc" to "«hoc"
    .replace(/\s*\n\s*/g,'\n')
    .replace(/\s{2,}/g,' ')
    .replace(/<i>\((.*?)\)<\/i>/g, '<i>$1</i>') // these parenthetical italicised notes are rubrics, found in 635 and 1236.gabc
    .replace(/\)\s*<i>(?:<v>[()]<\/v>|[^()])+\(\)$/,')') // get rid of things like  <i>at Mass only.</i><v>)</v>() that come at the very end.  This is only in 30.gabc and 308.gabc
    .replace(/\bi[{}]?j[{}]?\.[{}]?(?=\W)/, (whole) => !(whole.includes('{') && whole.includes('}')) ? whole : whole.replace(/[{}]/g, ''));
    content = content
    .replace(/(?:\s+(\([,;:]*\)\s)|\s)\s*\*(\([,;:]*\)\s)?[\s{}]*<i>\{?(ij\.|non\s+rep[eé]titur\.?)\}?<\/i>([\s{}]*)\(/gi, ' {*}~<i>$3</i>$2$1(')
    // .replace(/\s\*(\([,;:]*\)\s)?[\s{}]*<i>\{?(ij\.|non\s+rep[eé]titur\.?)\}?<\/i>([\s{}]*)\(/gi,' {*}~<i>$2</i>$1(')
    .replace(/<i>(i+j)\.?<\/i>\(:/g,'<i>$1.</i>() (:')
    .replace(/\(\s+(?:\)\s*\()?(Z)\)/g, '() (Z)');
  return content;
}
// Only for the chants of the Graduale: an asterisk after a bar goes before it.
// The verses of the Offertoriale keep theirs, where a return printed as words alone (()* Quóniam quis.() (::)) would
// otherwise lose its star to the empty notes before it, and would lose it differently each time this was applied.
function moveStarsBeforeBars(content) {
  return content
    .replace(/(\s)(\([`,;:]*\))(\s*)(\{?\*+\}?(?:\s*<i>[^<]*<\/i>)?)(?:(\()|\s+)/g, '$1$4$2\n$5'); /// TODO: this should be removed and fixed in Exsurge (pushing * back to before the last bar)
}

// Gives the syllables of each sung word the house division, with a consonantal j, and returns the words for the text index.
// `accentWord` supplies an accent that was left off a word of three or more syllables.
// Text that cannot be right (a word with two accents, or more vowels than sung syllables) stops the download of a chant
// of the Graduale. A score that has not been through this before passes `issues` instead, to have each such word,
// and each that still has no accent, listed there and left as it is.
function resyllabifyLatin(content, { id, file, errors = [], sylReplacements = {}, issues, accentWord } = {}) {
  var log = issues ? { info() {}, warn() {}, error() {} } : console;
  var text = [];
  var checkTextRepeat = 0;
  content = content.replace(/<(?:i|sp)>(Ps|V\/|Cant)\.?<\/(?:i|sp)>\.?|((?:~+(?:<c>)?\*+(?:<\/c>)?|[a-zæœǽǽœ́áéíóúýäëïöüÿ|{}*<>\/]+)([,.;:!?*+†\s»"'‘’“”]*(?:<\/[a-z]+>)*(\([^)]*\))+))+/gi, function(whole, psalmMark, lastSyl, toIgnore, lastParens, index, content){
    // figure out syllabification...
    // 1. build word
    // 2. syllabify
    // 3. verify same number of syllables
    // 4. verify that each syllable has at least one vowel.
    // replace...
    if(psalmMark) text.push("℣");
    if(whole.match(/\||<\/?alt>/)) return whole;
    // for now, just ignore ij marked words.
    if (/\bi+j\.?(?=[\s\(<])/.test(whole)) return whole;
    // ignore any words that have nothing in their parentheses or start with a space:
    if(whole == lastSyl && /^\(([Zz\s)]|[a-g]\+)/.test(lastParens)) {
      return whole;
    }
    var regex = /((?:<i>[^<]*<\/i>|<sp>'?(?:[ao]e|æ|œ)<\/sp>|[a-zæœǽœ́áéíóúýäëïöüÿ{}])+)(?=[,.;:!?*+†\s»"'‘’“”]*(?:<\/?[a-z]+>)*(\([^)]*\)))/gi;
    var match,
        syls = [],
        unsung = false;
    while(match = regex.exec(whole.replace(/<\/?sc>|V\/\.?|℣\.?/g, ''))) {
      let match1 = match[1] || '';
      var braces = match1.match(/[{}]/g) || [];
      if(braces.length % 2 === 0) match1 = match1.replace(/[{}]/g,'');
      let syl = match1.replace(/(<sp>)?ae(<\/sp>)?/,'æ').replace(/aé|<sp>'(ae|æ)<\/sp>/,'ǽ').replace(/A[Ee]/,'Æ').replace(/(<sp>'?)?o[eé](<\/sp>)?/,'œ').replace(/O[Ee]/,'Œ');
      syls.push(syl);
      unsung = unsung || !/[a-m]/i.test(match[2].replace(/\[[^\]]*\]/g, ''));
    }
    // words printed without notes, as the cue of a return, are not divided
    if(issues && unsung) return whole;
    var word = syls.join('');
    // ignore any words that have no syllables:
    if(/^[^a-zæœǽœ́áéíóúýäëïöüÿ]*$/i.test(word)) return whole;
    var accents = whole.match(/[áéíóú]|ǽ|œ́|ý/g);
    if(accentWord && syls.length > 2 && (!accents || accents.length > 1)) {
      var accented = accentWord(word);
      if(accented != word && removeAcuteAccents(accented) == removeAcuteAccents(word)) {
        syls = accentedSyllables(accented, syls);
        accents = accented.match(/[áéíóú]|ǽ|œ́|ý/g);
        word = accented;
      }
    }
    if(accents && accents.length > 1) {
      if(!issues) throw id + ": " + whole;
      issues.push({word, syllables: syls, problem: 'more than one accent'});
      return whole;
    }
    if(!/^(allel[uú]ia|[eé]ia)$/i.test(word.toLowerCase())) {
      syls = consonantalJ(syls);
      if(word != syls.join('')) {
        log.info(word, file);
        errors.push(file + ': ' + word + '; replaced with ' + JSON.stringify(syls));
      }
      word = syls.join('');
    }
    if(word) text.push(removeAcuteAccents(word.toLowerCase().replace(regexTag, '')));
    if(checkTextRepeat == text.length) {
      if(text.slice(0,text.length / 2).join(' ') == text.slice(text.length / 2).join(' ')) {
        text = text.slice(0, text.length / 2);
      }
      checkTextRepeat = Infinity;
    } else if(text.length > 4 && !checkTextRepeat && text[0] == text.slice(-1)[0]) {
      checkTextRepeat = 2 * (text.length - 1);
    }
    var accentCount = (word.match(/[ǽ́áéíóúý]|œ́/gi)||[]).length;
    var vowelCount = (word.match(/(?![^<]*>)(?:[aá]u|(qu|ngu)?[aeiouyæœǽáéíóúýäëïöüÿ])/gi)||[]).length;
    var vowelCountIJ  = (word.match(/(?![^<]*>)(?:[aá]u|(i|qu|ngu)?[aeiouyæœǽáéíóúýäëïöüÿ])/gi)||[]).length;
    // words with <i> are elisions or rubrics, so a vowel count mismatch is expected
    if(word.toLowerCase() !== 'cui' && !/<\/?i>/.test(whole) && vowelCount !== syls.length && vowelCountIJ !== syls.length) {
      log.warn(word, vowelCount, vowelCountIJ, "!=", syls.length, syls);
      log.info({lastParens, whole, lastSyl, file});
      if(vowelCount && !/^(c[uú]i|euge|ceu|Allelúia)$|<[ie]>/i.test(word)) {
        if(!issues) throw 1;
        issues.push({word, syllables: syls, expected: hyphenateLatin(word.replace(regexTag, ''))});
        return whole;
      }
    }
    const finalSyl = syls.length && syls.slice(-1)[0];
    if(finalSyl && !/<[ie]>/.test(finalSyl) && finalSyl.match(/[ǽœ́áéíóúý](?![aeiouyæœǽœ́áéíóúýäëïöüÿ])/)) {
      log.error(word, 'accent on final syllable', file, content.slice(index, index + 100));
      if(!issues) throw 1;
      issues.push({word, syllables: syls, problem: 'accent on the last syllable'});
      return whole;
    }
    if(accentCount && vowelCount === 2) {
      word = removeAcuteAccents(word);
    }
    // (this ignores case, so it only stops a download for a word whose two syllables before the last have no vowel at all)
    if(syls.length > 2 && (syls.slice(-3,-1).join('').match(/[ǽ́áéíóúýæœǼ́ÁÉÍÓÚÝÆŒAEIOUY]|œ́|Œ́/gi) || []).length == 0) {
      if(!issues) throw `strangely accented: ${word} (${syls.join('~')})`;
    }
    // a word of three syllables or more has an accent on one of the two before the last, unless that would be on a capital
    if(issues && syls.length > 2 && !/[ǽáéíóúý\u0301AEIOUYÆŒÁÉÍÓÚÝǼ]/.test(syls.slice(-3,-1).join('').replace(regexTag, ''))) {
      issues.push({word, syllables: syls, problem: 'no accent'});
    }
    var otherSyls = hyphenateLatin(word.replace(regexTag, ''));
    if(otherSyls.length != syls.length ||
       (otherSyls.length > 0 && otherSyls[0].length > 0 && !otherSyls.every(syl => syl.match(/[æœǽœ́aeiouyáéíóúýäëïöüÿ]/i)))) {
      if(syls.length && (syls.length > 1 || syls[0] != '}') && word.toLowerCase() !== 'cui') {
        log.error(file, syls, otherSyls);
        errors.push(file + ': ' + JSON.stringify(syls) + '::' + JSON.stringify(otherSyls));
        if(issues) issues.push({word, syllables: syls, expected: otherSyls});
      }
      return whole;
    } else {
      var key = syls.join('-').toLowerCase(),
          val = otherSyls.join('-').toLowerCase();
      if(key != val) {
        if (regexTag.test(key)) {
          if (val === removeAcuteAccents(key.replace(regexTag, ''))) {
            val = removeAcuteAccents(key);
            otherSyls = syls.map(removeAcuteAccents);
          } else if (val === key.replace(regexTag, '')) {
            val = key;
            otherSyls = syls;
          } else {
            for (let i = 0; i < syls.length; ++i) {
              const sylLen = syls[i].replace(regexTag, '').length;
              const otherSylLen = otherSyls[i].length;
              const missingSyllables = otherSylLen - sylLen;
              if (missingSyllables < 0) {
                syls[i + 1] = syls[i].slice(missingSyllables) + syls[i + 1];
                syls[i] = syls[i].slice(0, missingSyllables);
              } else if (missingSyllables > 0) {
                syls[i] = syls[i] + syls[i + 1].slice(0, missingSyllables);
                syls[i + 1] = syls[i + 1].slice(missingSyllables);
              }
            }
            val = syls.join('-').toLowerCase();
            otherSyls = syls;
          }
        }
        sylReplacements[key] = val;
      }
      var i = 0;
      //return whole; // don't actually perform the replacement for now
      return whole.replace(regex, function(match, first){
        return otherSyls[i++];
      });
    }
  });
  return { content, text };
}
// The first word of a chant, which was still in capitals when resyllabifyLatin() looked for its accent
// (SAPIENTIA, which the Graduale downloader then writes as SApientia), gets the accent `accentWord` supplies.
function accentFirstWord(content, accentWord) {
  return content.replace(/^(\s*\([cf]b?[1-4]\)\s*)((?:[a-zæœǽáéíóúý\u0301]+[,.;:!?]*\([^)]*\)){3,})/i, (all, clef, sung) => {
    var syllables = sung.match(/[a-zæœǽáéíóúý\u0301]+(?=[,.;:!?]*\()/gi), word = syllables.join(''), accented = accentWord(word);
    if(accented == word || removeAcuteAccents(accented) != removeAcuteAccents(word)) return all;
    syllables = accentedSyllables(accented, syllables);
    return clef + sung.replace(/[a-zæœǽáéíóúý\u0301]+(?=[,.;:!?]*\()/gi, () => syllables.shift());
  });
}
// The syllables of a word after an accent was put on it or taken off it
function accentedSyllables(word, syllables) {
  var at = 0;
  return syllables.map(syllable => {
    var start = at;
    for(var letters = syllable.replace(/\u0301/g, '').length; letters > 0; --letters) ++at;
    while(word[at] == '\u0301') ++at;
    return word.slice(start, at);
  });
}
// The application copy of a verse score of the Offertoriale, from its source as it was reviewed against the print:
// what download-gabc.js does to a chant of the Graduale, except for moving its stars. The words that still need review
// are listed in `issues` rather than stopping the import. Space around the body is kept, so a file keeps its last line break.
function normalizeGabcLatin(source, issues = []) {
  const start = source.lastIndexOf('%%') + 2, header = start > 1 ? source.slice(0, start) : '';
  const body = source.slice(header.length), lead = /^\s*/.exec(body)[0], end = /\s*$/.exec(body)[0];
  if (!body.trim()) return source;
  return header + lead + resyllabifyLatin(cleanGregobaseGabc(body).trim(), { issues, accentWord: accentLatinWord }).content + end;
}
module.exports = { normalizeLatinLyrics, cleanGregobaseGabc, moveStarsBeforeBars, resyllabifyLatin, accentFirstWord, normalizeGabcLatin };
