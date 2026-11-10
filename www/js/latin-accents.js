// Keep the user's spelling, case, markup and explicit accents. Accenteur supplies
// only the stress position; unknown words and conflicting analyses stay as entered.
(function() {
  var cache = Object.create(null);
  function expand(word) {
    return word.toLowerCase().replace(/ǽ|æ\u0301/g, 'áe').replace(/œ\u0301/g, 'óe')
      .replace(/æ/g, 'ae').replace(/œ/g, 'oe');
  }
  function accentWord(word) {
    if (/[áéíóúýǽÁÉÍÓÚÝǼ\u0301*]/.test(word)) return word;
    if (Object.prototype.hasOwnProperty.call(cache, word)) return cache[word];
    var plain = word.replace(/[()=]/g, '');
    if (Hypher.languages.la.hyphenate(plain.toLowerCase()).length < 3) return word;
    var choices = Accenteur.accentify(plain.toLowerCase());
    var result = word;
    if (choices.length === 1 && !/[<>]/.test(choices[0])) {
      var candidate = expand(choices[0]).normalize('NFD');
      var accent = candidate.indexOf('\u0301');
      if (accent >= 0 && candidate.replace(/\u0301/g, '') === expand(plain)) {
        var target = accent - 1, offset = 0;
        for (var i = 0; i < word.length; ++i) {
          if (/[()=]/.test(word[i])) continue;
          var width = expand(word[i]).length;
          if (target < offset + width) {
            result = word.slice(0, i) + (word[i] + '\u0301').normalize('NFC') + word.slice(i + 1);
            break;
          }
          offset += width;
        }
      }
    }
    cache[word] = result;
    return result;
  }
  window.LatinAccents = {
    apply: function(text, ignoreIndex, refreshIndexes) {
      var indexes = [], output = '', last = 0;
      function append(original, replacement, start) {
        var source = 0;
        for (var i = 0; i < replacement.length; ++i) {
          indexes.push(start + (original === replacement ? i : source));
          // A combining acute on œ is the only extra character we introduce.
          if (replacement[i] !== '\u0301') ++source;
        }
        output += replacement;
      }
      text.replace(/<v>[\s\S]*?<\/v>|<[^>]*>|!?[a-zæœáéíóúýǽ\u0301]+(?:[=(][a-zæœáéíóúýǽ\u0301]+\)?)*\*?/gi, function(word, index) {
        append(text.slice(last, index), text.slice(last, index), last);
        var editing = ignoreIndex !== undefined && index <= ignoreIndex && ignoreIndex <= index + word.length;
        if (refreshIndexes && refreshIndexes.some(function(position) {
          return index <= position && position < index + word.length;
        })) editing = false;
        append(word, editing || /^[<!]/.test(word) ? word : accentWord(word), index);
        last = index + word.length;
        return word;
      });
      append(text.slice(last), text.slice(last), last);
      indexes.push(text.length);
      return { text: output, indexes: indexes };
    },
    createEditor: function() {
      var previous = '', automatic = [];
      return {
        apply: function(text, ignoreIndex) {
          // Align accents we supplied with the latest user edit. An accent the
          // user replaces is no longer ours, and must be preserved as explicit.
          var prefix = 0, suffix = 0;
          while (prefix < previous.length && prefix < text.length && previous[prefix] === text[prefix]) ++prefix;
          while (suffix < previous.length - prefix && suffix < text.length - prefix &&
              previous[previous.length - suffix - 1] === text[text.length - suffix - 1]) ++suffix;
          var shift = text.length - previous.length;
          var retained = Object.create(null);
          automatic.forEach(function(accent) {
            var index = accent.index;
            if (index >= previous.length - suffix) index += shift;
            else if (index >= prefix) return;
            retained[index] = accent.original;
          });
          var plain = '', sourceIndexes = [], refresh = [];
          for (var i = 0; i < text.length; ++i) {
            if (Object.prototype.hasOwnProperty.call(retained, i)) {
              refresh.push(retained[i] === '' ? Math.max(0, plain.length - 1) : plain.length);
              if (retained[i] === '') continue;
              plain += retained[i];
            } else {
              plain += text[i];
            }
            sourceIndexes.push(i);
          }
          sourceIndexes.push(text.length);
          var plainCaret;
          if (ignoreIndex !== undefined) {
            plainCaret = 0;
            while (plainCaret < plain.length && sourceIndexes[plainCaret] < ignoreIndex) ++plainCaret;
          }
          var result = window.LatinAccents.apply(plain, plainCaret, refresh);
          automatic = [];
          for (var j = 0; j < result.text.length; ++j) {
            var source = result.indexes[j];
            if (result.text[j] !== plain[source]) {
              automatic.push({ index: j, original: result.text[j] === '\u0301' ? '' : plain[source] });
            }
          }
          // Keep ownership while an edited ending is temporarily unknown or
          // too short to accent, so a later keystroke can resolve its stress.
          refresh.forEach(function(position) {
            for (var j = 0; j < result.text.length; ++j) {
              if (result.indexes[j] === position && result.text[j] !== '\u0301' &&
                  !automatic.some(function(accent) { return accent.index === j; })) {
                automatic.push({ index: j, original: result.text[j] });
                break;
              }
            }
          });
          result.indexes = result.indexes.map(function(index) { return sourceIndexes[index]; });
          previous = result.text;
          return result;
        }
      };
    }
  };
})();
