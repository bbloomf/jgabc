// Shared by the importer and the browser. The stored GABC starts at the first verse,
// with its own clef; the opening offertory always comes from gabc/<id>.gabc.
(function(root) {
  function normalize(text) {
    return text.replace(/[æÆǽǼ]/g, 'ae').replace(/[œŒ]/g, 'oe')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      .replace(/j/g, 'i').replace(/[^a-z]/g, '');
  }
  function lyrics(gabc) {
    return gabc.replace(/\([^)]*\)/g, '').replace(/<[^>]*>/g, '')
      .replace(/~+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function parse(gabc) {
    // A few GregoBase records contain an extra header inside their body.
    var body = gabc.slice(gabc.lastIndexOf('%%') + 2).trim()
      .replace(/<sp>V<\/sp>/g, '<sp>V/</sp>');
    var index = body.indexOf('<sp>V/</sp>');
    if(index < 0) throw new Error('No offertory verse marker');
    var antiphon = body.slice(0, index).trim();
    var clefs = antiphon.match(/[cf]b?[1-4](?=\))/g);
    if(!clefs) throw new Error('No clef before the first verse');
    var verses = body.slice(index).trim();
    if(!/\([^)]*::[^)]*\)/.test(verses)) throw new Error('Verse has no final double bar');
    return { antiphon: antiphon, clef: clefs[clefs.length - 1], gabc: verses };
  }
  // Locate a cue in the current antiphon without depending on its syllabification,
  // accents, i/j spelling, or rhythmic signs. Preserve a position in the GABC.
  function cueInfo(gabc, cue, occurrence) {
    if(typeof gabc != 'string' || typeof cue != 'string') return null;
    var text = '', positions = [];
    for(var i = (gabc.indexOf('%%') < 0 ? 0 : gabc.lastIndexOf('%%') + 2); i < gabc.length;) {
      if(gabc[i] == '(' || gabc[i] == '<') {
        var end = gabc.indexOf(gabc[i] == '(' ? ')' : '>', i);
        if(end < 0) return null;
        i = end + 1;
      } else {
        var normalized = normalize(gabc[i]);
        for(var j = 0; j < normalized.length; ++j) { text += normalized[j]; positions.push(i); }
        ++i;
      }
    }
    var needle = normalize(cue.split(/…|\.{2,}/)[0]), at = -1;
    if(!needle) return null;
    for(var n = 0; n < (occurrence || 1); ++n) {
      at = text.indexOf(needle, at + 1);
      if(at < 0) return null;
    }
    var start = positions[at], finish = positions[at + needle.length - 1] + 1;
    var note = /\(([^)]*)\)/g, match, pitch;
    note.lastIndex = start;
    var pitchEnd;
    while(!pitch && (match = note.exec(gabc))) {
      // (a flat, natural or sharp before the first note is not that note)
      var notes = match[1].replace(/\[[^\]]*\]|[a-m][xy#]/gi, '');
      if(!/^[cf]b?[1-4]$/.test(notes)) pitch = (notes.match(/[a-m]/i) || [])[0];
      pitchEnd = note.lastIndex;
    }
    return { start: start, end: finish, pitch: pitch && pitch.toLowerCase(), pitchEnd: pitchEnd, clef: lastClef(gabc.slice(0, start)) };
  }
  function cueIndex(gabc, cue, occurrence) {
    var info = cueInfo(gabc, cue, occurrence);
    return info ? info.start : -1;
  }
  function lastClef(gabc) {
    var clefs = gabc.match(/[cf]b?[1-4](?=\))/g);
    return clefs && clefs[clefs.length - 1];
  }
  function removeRedundantClefs(gabc) {
    var headerEnd = gabc.lastIndexOf('%%'), start = headerEnd < 0 ? 0 : headerEnd + 2, active;
    // Each source needs its own opening clef. Once the sources are joined,
    // retain only actual changes, including changes attached to a double bar.
    return gabc.slice(0, start) + gabc.slice(start).replace(/\(([^)]*)\)/g, function(group, notes) {
      var removed = false;
      var result = notes.replace(/\[[^\]]*\]|[cf]b?[1-4]/g, function(token) {
        if(token[0] == '[') return token;
        if(token == active) { removed = true; return ''; }
        active = token;
        return token;
      });
      return removed && !result.trim() ? '' : '(' + result + ')';
    });
  }
  function prepareClefChanges(gabc) {
    gabc = removeRedundantClefs(gabc);
    // Put a new verse's clef on the preceding double bar so z0 supplies
    // its automatic custos in the old clef. Preserve existing explicit custodes.
    gabc = gabc.replace(/\(([^()]*)::\)\s*\(([cf]b?[1-4])\)/g, '($1::$2)');
    return gabc.replace(/\(([^()]*::\s*[cf]b?[1-4])\)/g, function(group, notes, index) {
        if(/z0|[a-m]\+/i.test(notes) || /\([^)]*[a-m]\+[^)]*\)\s*$/i.test(gabc.slice(0, index))) return group;
        return '(' + notes.replace('::', 'z0::') + ')';
      });
  }
  function markResponse(gabc, cue, occurrence) {
    return markResponseAt(gabc, cueInfo(gabc, cue, occurrence));
  }
  function markResponseAt(gabc, info) {
    if(!info) return gabc;
    var before = gabc.slice(0, info.start), words = gabc.slice(info.start, info.end);
    // A return to the very beginning takes no star: before the first syllable
    // it would take the place of the initial. Its words are still bold.
    var bodyStart = before.lastIndexOf('%%'),
        atBeginning = !normalize(lyrics(before.slice(bodyStart < 0 ? 0 : bodyStart + 2)));
    // Bold each lyric syllable, just as for the Requiem repeat. Leave the star
    // outside the bold span so that Exsurge keeps it red.
    if(!/<b>$/.test(before)) words = words.replace(/(<[^>]*>|\([^)]*\))|([^<()]+)/g, function(all, notation, lyric) {
      return notation || lyric.replace(/[^\s,;:.!?]+/g, '<b>$&</b>');
    });
    before = before.replace(/\*\(\)(\s*(?:<b>)?)$/, '*$1');
    var marker = atBeginning || /\*(?:\([,;:]*\))?\s*(?:<b>)?$/.test(before) ? '' : '* ';
    return before + marker + words + gabc.slice(info.end);
  }
  // The staff position of a GABC pitch letter: d, on the lowest line, is 1.
  function staffPosition(letter) { return letter.toLowerCase().charCodeAt(0) - 99; }
  // How high a staff position under a clef is sung, in diatonic steps. Both kinds of clef are written in one octave,
  // as Gregorio and Exsurge reckon them (the fa of an F clef is the one above the do of a C clef); octaves says how
  // many octaves from there each kind is sung (see clefOctaves).
  function sungHeight(position, clef, octaves) {
    return position - 2 * clef.slice(-1) + (clef[0] == 'f' ? 3 : 0) + 7 * (octaves[clef[0]] || 0);
  }
  // How many octaves from where it is written each kind of clef (c, f) is sung, once all of gabc has been sung.
  // The notation does not say how the octave of a C clef relates to that of an F clef. Exsurge settles it at the first
  // change between them, and this follows the same rule (ChantScore.getPlaybackPitches()): the first note after the
  // change is sung where the custos before it shows it, which is where an explicit custos on that note is written,
  // and otherwise where an automatic custos fits on the staff. Each kind of clef then keeps its octave.
  function clefOctaves(gabc) {
    var octaves = {}, clef, sungClef, custos, custosClef;
    gabc.slice(gabc.indexOf('%%') < 0 ? 0 : gabc.lastIndexOf('%%') + 2).replace(/\(([^)]*)\)/g, function(group, notes) {
      notes.replace(/\[[^\]]*\]|\|.*$/g, '').replace(/([cf]b?[1-4])|([a-mA-M])\+|[a-mA-M][xy#]|([a-mA-M])/g, function(token, newClef, shown, note) {
        if(newClef) clef = newClef;
        else if(shown) { custos = staffPosition(shown); custosClef = clef; }
        else if(note && clef) {
          var kind = clef[0], sungKind = sungClef && sungClef[0];
          if(sungKind && kind != sungKind) {
            // (an explicit custos after the new clef is drawn with that one, and says nothing of the change)
            var explicit = custos !== undefined && custosClef && custosClef[0] == sungKind,
                before = explicit ? custosClef : sungClef,
                written = sungHeight(staffPosition(note), clef, {}) + 2 * before.slice(-1) - (before[0] == 'f' ? 3 : 0),
                at;
            if(explicit && (custos - written) % 7 == 0) at = custos;
            else if(octaves[kind] === undefined) for(at = written; at < -2 || at > 10;) at += at < -2 ? 7 : -7;
            if(at !== undefined) octaves[kind] = octaves[sungKind] + (at - written) / 7;
          }
          if(octaves[kind] === undefined) octaves[kind] = 0;
          sungClef = clef;
          custos = custosClef = undefined;
        }
      });
    });
    return octaves;
  }
  // The return to cue, with a custos at its first note under clef. The cue is looked for in antiphon; sung is whatever
  // is sung after antiphon and before this return.
  function responseCue(antiphon, cue, clef, occurrence, sung) {
    var info = cueInfo(antiphon, cue, occurrence);
    if(!info || !info.pitch || !info.clef || !clef) return ' (::) <nlba>*~' + cue + '</nlba>() (Z)';
    // The custos is written where the first note of the return is sung, in the octave the clef has by now: after a
    // change between a C and an F clef, that is not always the octave the two clefs are written in.
    var height = sungHeight(staffPosition(info.pitch), info.clef, clefOctaves(antiphon.slice(0, info.pitchEnd))),
        octaves = clefOctaves(antiphon + '\n' + (sung || ''));
    function letter(clef) {
      var position = height - sungHeight(0, clef, octaves);
      return position < -2 || position > 10 ? '' : String.fromCharCode(position + 99);
    }
    // If the return pitch is outside this staff, show it in its original clef
    // and restore the verse clef afterwards; never substitute another octave.
    var pitch = letter(clef), original = !pitch && (letter(info.clef) || info.pitch);
    return (original ? ' (' + info.clef + ')' : '') + ' (::' + (pitch || original) + '+) ' +
      '<nlba>*~' + cue + '</nlba>() (Z)' + (original ? ' (' + clef + ')' : '');
  }
  // The text of every return that is printed between two double bars without
  // notes of its own, with or without its star, and with each alternative.
  function textReturns(verses) {
    var cues = [];
    verses.split(/\([^)]*::[^)]*\)/).forEach(function(section) {
      var text = section.replace(/<i>\s*vel\s*<\/i>/gi, '\n').replace(/<i>[\s\S]*?<\/i>/g, '').replace(/<v>[\s\S]*?<\/v>/g, '');
      if((text.match(/\([^)]*\)/g) || []).some(function(notes) { return !/^\([cf]b?[1-4]\)$/.test(notes) && /[a-m]/i.test(notes); })) return;
      text.split('\n').forEach(function(reference) {
        var cue = lyrics(reference).replace(/^[*~\s]+/, '').trim();
        if(normalize(cue)) cues.push(cue);
      });
    });
    return cues;
  }
  // allVerses is the whole verse score when verses is a shorter selection of it.
  function prepareFull(antiphon, verses, defaultCue, cueOccurrences, allVerses) {
    function occurrence(cue) { return cueOccurrences && cueOccurrences[normalize(cue)] || 1; }
    // A respond sung in full can point inside the original antiphon even
    // when its verse melody differs. Match the whole phrase to distinguish
    // repeated words (e.g. the second "nimis" in Mihi autem), then mark its incipit.
    var sungResponse = /\*([^*]*?)(?=\([^)]*::[^)]*\)|$)/g, sung;
    while((sung = sungResponse.exec(verses))) {
      var text = lyrics(sung[1]), words = text.match(/[^\s,;:.!?]+/g);
      if(!words || words.length < 2) continue;
      var target = cueInfo(antiphon, text);
      if(!target) continue;
      var firstWord = cueInfo(antiphon.slice(target.start), words[0]);
      if(firstWord) antiphon = markResponseAt(antiphon, {
        start: target.start + firstWord.start, end: target.start + firstWord.end
      });
    }
    var bars = [], regex = /\([^)]*::[^)]*\)/g, match;
    while((match = regex.exec(verses))) bars.push({ index: match.index, end: regex.lastIndex });
    var replacements = [], cues = [];
    for(var i = 0; i < bars.length - 1; ++i) {
      var section = verses.slice(bars[i].end, bars[i + 1].index);
      var withoutRubrics = section.replace(/<i>[\s\S]*?<\/i>/g, '').replace(/<v>[\s\S]*?<\/v>/g, '');
      var hasNotes = (withoutRubrics.match(/\([^)]*\)/g) || []).some(function(notes) {
        return !/^\([cf]b?[1-4]\)$/.test(notes) && /[a-m]/i.test(notes);
      });
      if(hasNotes || !/\*/.test(section)) continue;
      var references = section.split(/<i>\s*vel\s*<\/i>/i).map(function(reference) {
        return lyrics(reference.replace(/<i>[\s\S]*?<\/i>/g, '').replace(/<v>[\s\S]*?<\/v>/g, ''))
          .replace(/^[*~\s]+/, '').trim();
      });
      var earlier = antiphon + '\n' + verses.slice(0, bars[i].index);
      // The non-Paschal antiphon may omit an Alleluia that the book offers
      // as an alternative return. Keep the alternatives present in this setting.
      references = references.filter(function(cue) { return cue && cueIndex(earlier, cue, occurrence(cue)) >= 0; });
      if(!references.length) continue;
      var clef = lastClef(verses.slice(0, bars[i].end));
      var replacement = references.map(function(cue, index) {
        cues.push(cue);
        var reference = responseCue(earlier, cue, clef, occurrence(cue));
        // Alternative references belong to the same ending. Only the last
        // alternative closes the line; an earlier Z makes an empty staff.
        return index < references.length - 1 ? reference.replace(/\s*\(Z\)/, '') : reference;
      }).join(' <i>vel</i>() ');
      var closingClef = lastClef(verses.slice(bars[i + 1].index, bars[i + 1].end));
      if(closingClef && closingClef != clef) replacement += ' (' + closingClef + ')';
      replacements.push({ start: bars[i].index, end: bars[i + 1].end, text: replacement });
      ++i;
    }
    for(var j = replacements.length - 1; j >= 0; --j) {
      var r = replacements[j];
      verses = verses.slice(0, r.start) + r.text + verses.slice(r.end);
    }
    if(!cues.length && defaultCue) {
      // The book may print its return only after a later verse, or not at
      // all. Mark the usual return only where these verses lead back to it.
      var lastVerse = verses.slice(Math.max(0, verses.lastIndexOf('<sp>V/</sp>'))),
          ownReturn = lastVerse.split(/\*(?![^()]*\))/).slice(1).pop(),
          last = bars[bars.length - 1], before = bars[bars.length - 2],
          closing = before ? verses.slice(before.end, last.index) : '';
      // A return printed without its star (Benedíctus., no. 860) replaces the usual one in the same way.
      if(ownReturn === undefined && before && !/\([^)]*[a-m][^)]*\)/i.test(closing) && normalize(lyrics(closing))) {
        if(cueIndex(antiphon, lyrics(closing), occurrence(lyrics(closing))) >= 0) defaultCue = lyrics(closing);
        last = { index: before.index, end: last.end };
      }
      if(ownReturn !== undefined) {
        // This verse closes with its own respond: mark the usual return only if that is where it begins.
        if(normalize(lyrics(ownReturn)).indexOf(normalize(defaultCue.split(/[\s,;:.!?]+/)[0])) == 0) cues.push(defaultCue);
      } else if(last && !verses.slice(last.end).replace(/[~\s]/g, '') && cueIndex(antiphon, defaultCue, occurrence(defaultCue)) >= 0) {
        // Print the return in place of the closing bar (and of a custos for a verse that is not sung), as the psalm toned verses do.
        // Word it as the book does where a later verse prints the same return (Non móriar., no. 25).
        var usual = cueIndex(antiphon, defaultCue, occurrence(defaultCue));
        textReturns(allVerses || '').some(function(cue) {
          return cueIndex(antiphon, cue, occurrence(cue)) == usual && (defaultCue = cue);
        });
        var sung = verses.slice(0, last.index).replace(/\s*\((?:\/|\[[^\]]*\])*[a-m]\+\)\s*$/i, '').replace(/\s+$/, '');
        verses = sung + responseCue(antiphon, defaultCue, lastClef(sung), occurrence(defaultCue), sung);
        cues.push(defaultCue);
      }
    }
    var boundary = '<offertory-verses-boundary>', combined = antiphon + '\n' + boundary + '\n' + verses;
    cues.forEach(function(cue) { combined = markResponse(combined, cue, occurrence(cue)); });
    var split = combined.indexOf(boundary);
    return { antiphon: combined.slice(0, split).trim(), gabc: combined.slice(split + boundary.length).trim() };
  }
  function splitVerses(gabc) {
    var starts = [], regex = /<sp>V\/<\/sp>/g, match;
    while((match = regex.exec(gabc))) starts.push(match.index);
    return starts.map(function(start, i) {
      return { clef: lastClef(gabc.slice(0, start)), gabc: gabc.slice(start, starts[i + 1] || gabc.length).trim() };
    });
  }
  // Printed alternatives can replace the preceding verses (Elegerunt, no. 95).
  // Selection indices are one-based, matching the book's verse numbers.
  function selectVerseItems(items, count, selections) {
    return selections && selections[count] ? selections[count].map(function(n) { return items[n - 1]; }) : items.slice(0, count);
  }
  function takeVerses(gabc, count, selectionCues, selections) {
    var starts = [], regex = /<sp>V\/<\/sp>/g, match;
    while((match = regex.exec(gabc))) starts.push(match.index);
    if(count <= 0) return '';
    var selected = gabc.slice(0, starts[count] === undefined ? gabc.length : starts[count]).trim();
    if(selections && selections[count]) selected = selectVerseItems(splitVerses(gabc), count, selections)
      .map(function(verse) { return '(' + verse.clef + ') ' + verse.gabc; }).join('\n');
    // A clef printed for the next verse does not belong to a shortened
    // selection. Keeping it after a return cue creates an empty last staff.
    if(starts[count] !== undefined) selected = selected
      .replace(/\s*\([cf]b?[1-4]\)\s*$/, '')
      .replace(/(\([^)]*::)[cf]b?[1-4](\))\s*$/, '$1$2');
    // Some printed sets proceed directly from one verse to the next. An
    // explicitly recorded return makes a shortened selection usable without
    // inserting an unprinted cue into the authoritative transcription.
    if(selectionCues && selectionCues[count]) selected += ' *() ' + selectionCues[count] + '() (::)';
    return selected;
  }
  function psalmVerseText(gabc) {
    // A newly composed respond after the verse is not part of its psalm text.
    var verse = gabc.split(/\([^)]*::[^)]*\)/)[0].split(/\*(?![^()]*\))/)[0];
    return lyrics(verse.replace(/<sp>V\/<\/sp>\.?\s*(?:\d+\.?\s*)?/, '')
      .replace(/\(:\)/g, ' * ')).replace(/(?:\s+[*†])+\s*$/, '');
  }
  var api = { normalize: normalize, lyrics: lyrics, parse: parse, cueIndex: cueIndex, cueInfo: cueInfo, markResponse: markResponse, responseCue: responseCue, clefOctaves: clefOctaves, prepareFull: prepareFull, lastClef: lastClef, removeRedundantClefs: removeRedundantClefs, prepareClefChanges: prepareClefChanges, splitVerses: splitVerses, takeVerses: takeVerses, selectVerseItems: selectVerseItems, psalmVerseText: psalmVerseText };
  if(typeof module == 'object' && module.exports) module.exports = api;
  else root.offertoryVerseTools = api;
})(typeof window == 'object' ? window : this);
