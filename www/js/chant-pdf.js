// Quick PDF: makes a PDF in the browser from exsurge's SVG (with jsPDF and svg2pdf.js) instead of sending the
// gabc to the sourceandsummit.com server.  The libraries and fonts are only downloaded the first time.
var ChantPdf = (function() {
  // [url, jsPDF font name, style]; the names match the font-family values in exsurge's SVG, apart from the
  // semibold face, which only the title uses
  var fontFiles = [
    ['fonts/CrimsonText-Regular.ttf', 'Crimson Text', 'normal'],
    ['fonts/CrimsonText-Italic.ttf', 'Crimson Text', 'italic'],
    ['fonts/CrimsonText-Bold.ttf', 'Crimson Text', 'bold'],
    ['fonts/CrimsonText-BoldItalic.ttf', 'Crimson Text', 'bolditalic'],
    ['fonts/CrimsonText-SemiBold.ttf', 'Crimson Text SemiBold', 'normal'],
    ['versiculum.ttf', 'Versiculum', 'normal']
  ];
  // the browser measures the text for svg2pdf, so these faces have to be loaded too
  var browserFonts = ['16px "Crimson Text"', 'italic 16px "Crimson Text"', 'bold 16px "Crimson Text"',
    'italic bold 16px "Crimson Text"', '16px Versiculum'];
  // small caps are drawn as capitals at this fraction of the font size
  var smallCapsSize = 0.7;
  var loading = null;

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = function() { reject(new Error('Could not load ' + src)); };
      document.head.appendChild(script);
    });
  }
  function fetchBase64(url) {
    return fetch(url).then(function(response) {
      if(!response.ok) throw new Error('Could not load ' + url);
      return response.arrayBuffer();
    }).then(function(buffer) {
      var bytes = new Uint8Array(buffer), binary = '';
      for(var i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      }
      return btoa(binary);
    });
  }
  // resolves to the base64 data of fontFiles
  function load() {
    if(!loading) {
      loading = loadScript('js/jspdf.umd.min.js').then(function() {
        return loadScript('js/svg2pdf.umd.min.js');
      }).then(function() {
        return Promise.all([
          Promise.all(fontFiles.map(function(font) { return fetchBase64(font[0]); })),
          document.fonts? Promise.all(browserFonts.map(function(font) { return document.fonts.load(font); })) : null
        ]);
      }).then(function(results) {
        return results[0];
      });
      loading.catch(function() { loading = null; }); // try again next time
    }
    return loading;
  }

  // The sizes, in PDF points, that the sourceandsummit.com server's GregorioTeX PDFs use (see process.php in
  // gregoriophp): the lyrics are set at the font size, and the staff size is fontsize * 17 / 13.333, or 17 at 12pt.
  // The title and commentary keep their size whatever the font size.  The staff and spacing ratios were measured
  // from the server's PDFs.
  function getSizes(fontSize) {
    var texPoint = 72 / 72.27,
        staffSize = fontSize == 12? 17 : Math.round(fontSize * 17 / 13.333),
        staffSpace = staffSize * 0.4789,
        lyric = fontSize * texPoint;
    return {
      lyric: lyric,
      dropCap: lyric * 3,
      annotation: lyric * 5 / 6, // and the text above the staff, and translations
      choralSign: staffSize / 2 * texPoint,
      staffSpace: staffSpace, // from one staff line to the next
      staffLineWeight: staffSpace * 0.0477,
      spaceAboveStaff: 0.2044 * 72, // at least this much above the top staff line
      lyricDrop: staffSpace * 2.14, // from the bottom staff line down to the lyrics' baseline
      lyricDepth: lyric * 0.25, // below the lyrics' baseline, where the next line's space above its staff starts
      title: { size: 20.74 * texPoint, baseline: 13.5, height: 20.5 }, // \huge, centred, in small caps
      commentary: { size: 12 * texPoint, baseline: 7, height: 8.6 } // italic, on the right
    };
  }

  // paper: { width: printed width in inches, height: page height in inches, fontSize }; the lengths returned are
  // in points
  function getLayout(paper) {
    var width = paper.width || 7.5;
    return {
      pageWidth: (width + 1) * 72,
      pageHeight: (paper.height || 11) * 72,
      margin: 36,
      width: width * 72,
      sizes: getSizes(paper.fontSize || 20)
    };
  }

  // Sets ctxt up to lay the chant out at sizes (from getSizes), with one svg unit to a point.  Returns a function
  // that puts ctxt back as it was, as the transcriber's context also makes its PNG and SVG downloads.
  function useSizes(ctxt, sizes) {
    var saved = {
          glyphScaling: ctxt.glyphScaling / ctxt.glyphMultiplier,
          glyphMultiplier: ctxt.glyphMultiplier,
          minSpaceAboveStaff: ctxt.minSpaceAboveStaff,
          minSpaceBelowStaff: ctxt.minSpaceBelowStaff,
          spaceBetweenSystems: ctxt.spaceBetweenSystems,
          textSizes: {}
        },
        ratio = sizes.lyric / ctxt.textStyles.lyric.size;
    Object.keys(ctxt.textStyles).forEach(function(key) {
      saved.textSizes[key] = ctxt.textStyles[key].size;
      ctxt.textStyles[key].size *= ratio;
    });
    ctxt.textStyles.dropCap.size = sizes.dropCap;
    ctxt.textStyles.annotation.size = ctxt.textStyles.al.size = ctxt.textStyles.translation.size = sizes.annotation;
    ctxt.textStyles.choralSign.size = sizes.choralSign;
    // the staff lines are two staff intervals apart
    ctxt.setGlyphScaling(sizes.staffSpace / 2 / ctxt.glyphPunctumWidth);
    var staffInterval = ctxt.staffInterval;
    ctxt.staffLineWeight = sizes.staffLineWeight;
    // (exsurge adds half the staff line weight above the staff, counted in staff intervals)
    ctxt.minSpaceAboveStaff = sizes.spaceAboveStaff / staffInterval - ctxt.staffLineWeight / 2;
    // placeLyrics sets the space below the notes for each line that has lyrics
    ctxt.minSpaceBelowStaff = 0.5;
    // createSvgNodeForEachLine assumes exsurge's default space between lines (the page uses 0); with any other
    // value each line's drawing drifts further up its own SVG.  The lines are stacked here, so it changes nothing else.
    ctxt.spaceBetweenSystems = 1.5;
    return function() {
      Object.keys(saved.textSizes).forEach(function(key) {
        ctxt.textStyles[key].size = saved.textSizes[key];
      });
      ctxt.minSpaceAboveStaff = saved.minSpaceAboveStaff;
      ctxt.minSpaceBelowStaff = saved.minSpaceBelowStaff;
      ctxt.spaceBetweenSystems = saved.spaceBetweenSystems;
      ctxt.setGlyphScaling(saved.glyphScaling, saved.glyphMultiplier);
    };
  }

  // The paper for a chant from its gabc header, which can set width, height and fontsize (or %width etc.) as it
  // can for the server; defaults gives the font size the page's server form uses.
  function getPaper(header, defaults) {
    function inches(key) {
      var match = /^\s*(\d+(?:\.\d+)?)\s*(in|cm|mm)?/.exec(header[key] || header.cValues[key] || '');
      return match && parseFloat(match[1]) / ({ cm: 2.54, mm: 25.4 }[match[2]] || 1);
    }
    return {
      width: inches('width') || 7.5,
      height: inches('height') || 11,
      fontSize: parseFloat(header.fontsize || header.cValues.fontsize) || (defaults && defaults.fontSize) || 20
    };
  }

  // items: [{ height, gap, pageBreak, keepWithNext }]; returns [{ page, y }] for each item.
  // gap is the space above an item when it isn't at the top of a page.
  function paginate(items, pageHeight) {
    var page = 0, y = 0;
    return items.map(function(item, i) {
      var gap = item.gap || 0;
      if(item.pageBreak && y > 0) {
        ++page;
        y = 0;
      } else if(y > 0) {
        var height = gap + item.height;
        for(var j = i; items[j].keepWithNext && j + 1 < items.length && !items[j + 1].pageBreak; ++j) {
          height += (items[j + 1].gap || 0) + items[j + 1].height;
        }
        if(y + height > pageHeight) {
          ++page;
          y = 0;
        }
      }
      if(y > 0) y += gap;
      var placement = { page: page, y: y };
      y += item.height;
      return placement;
    });
  }

  // var(--rubric-color, #d00) -> #d00
  function resolveCssVariables(value) {
    return value.replace(/var\(\s*--[\w-]+\s*,\s*([^()]*(?:\([^()]*\)[^()]*)*)\)/g, function(match, fallback) {
      return fallback.trim();
    });
  }

  // exsurge squeezes a hyphen into a tight gap by giving its tspan a textLength, with lengthAdjust="spacingAndGlyphs".
  // svg2pdf ignores that on a tspan, and drew the hyphen at full width into the next syllable, so each such tspan
  // becomes a text of its own, where the browser draws it and scaled across to its textLength.
  function fitTextLengths(svg) {
    [].forEach.call(svg.querySelectorAll('tspan[textLength][lengthAdjust=spacingAndGlyphs]'), function(tspan) {
      var text = tspan.closest('text');
      if(!text || !tspan.textContent) return;
      // (in the text's own coordinates, as the tspan has none of its own)
      var start = tspan.getStartPositionOfChar(0),
          natural = tspan.cloneNode(true);
      natural.removeAttribute('textLength');
      natural.removeAttribute('lengthAdjust');
      text.appendChild(natural);
      var width = natural.getComputedTextLength();
      text.removeChild(natural);
      if(!width) return;
      // the text's class, style and font attributes, with the tspan's style on top
      var fitted = text.cloneNode(false);
      ['x', 'y', 'dx', 'dy', 'textLength', 'lengthAdjust', 'text-anchor'].forEach(function(attr) {
        fitted.removeAttribute(attr);
      });
      fitted.setAttribute('style', (text.getAttribute('style') || '') + ';' + (tspan.getAttribute('style') || ''));
      fitted.setAttribute('transform', (text.getAttribute('transform') || '') + ' translate(' + start.x + ' ' + start.y +
        ') scale(' + parseFloat(tspan.getAttribute('textLength')) / width + ' 1)');
      fitted.textContent = tspan.textContent;
      text.parentNode.insertBefore(fitted, text.nextSibling);
      tspan.parentNode.removeChild(tspan);
    });
  }

  // Fixes the parts of exsurge's SVG that svg2pdf and jsPDF can't draw:
  // - The page's chant colours are CSS variables (see makeExsurgeChantContext), which svg2pdf can't read, so each
  //   one is replaced by its fallback; currentColor is drawn black.
  // - jsPDF has no OpenType mark positioning, so a combining accent (œ́) would land beside its letter; it's dropped,
  //   as it is for the server (see getAllGabc in propers.js).
  // - svg2pdf ignores font-variant and percentage font sizes, so small caps become smaller capitals, and every
  //   percentage size is resolved.
  // - svg2pdf ignores textLength on a tspan, which exsurge uses to squeeze a hyphen into a tight gap; see fitTextLengths.
  // The SVG has to be in the document for getComputedStyle to see its <style>.
  function prepareSvg(svg) {
    var host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden';
    host.appendChild(svg);
    document.body.appendChild(host);
    try {
      [].forEach.call(svg.querySelectorAll('style'), function(style) {
        style.textContent = resolveCssVariables(style.textContent);
      });
      [].forEach.call(svg.querySelectorAll('[fill], [stroke], [style]'), function(el) {
        ['fill', 'stroke', 'style'].forEach(function(attr) {
          var value = el.getAttribute(attr);
          if(value && value.indexOf('var(') >= 0) el.setAttribute(attr, resolveCssVariables(value));
        });
      });
      var walker = document.createTreeWalker(svg, NodeFilter.SHOW_TEXT), node;
      while((node = walker.nextNode())) {
        if(node.parentNode.nodeName == 'style') continue;
        node.nodeValue = node.nodeValue.normalize('NFC').replace(/\u0301/g, '');
      }
      fitTextLengths(svg);
      [].forEach.call(svg.querySelectorAll('text, tspan'), function(el) {
        var style = getComputedStyle(el);
        if(/%/.test(el.style.fontSize) || /%/.test(el.getAttribute('font-size') || '')) {
          el.style.fontSize = style.fontSize;
        }
        if(el.tagName == 'tspan' && el.childElementCount === 0 &&
            (style.fontVariantCaps == 'small-caps' || style.fontVariant == 'small-caps')) {
          var size = parseFloat(style.fontSize),
              isFirst = true;
          el.textContent.split(/(\p{Ll}+)/u).forEach(function(run, i) {
            if(!run) return;
            var piece = el.cloneNode(false);
            if(!isFirst) ['x', 'y', 'dx', 'dy'].forEach(function(attr) { piece.removeAttribute(attr); });
            isFirst = false;
            piece.textContent = i % 2? run.toUpperCase() : run;
            piece.style.fontVariant = 'normal';
            piece.style.fontSize = (i % 2? size * smallCapsSize : size) + 'px';
            el.parentNode.insertBefore(piece, el);
          });
          el.parentNode.removeChild(el);
        }
      });
    } finally {
      document.body.removeChild(host);
      host.removeChild(svg);
    }
    return svg;
  }

  // jsPDF has no small caps, so the lower-case runs of text are drawn as smaller capitals, as prepareSvg does.
  // x is where the text is aligned to.
  function drawText(doc, text, x, y, font, fontSize, align, smallCaps) {
    doc.setFont(font[0], font[1]);
    var runs = (smallCaps? text.split(/(\p{Ll}+)/u) : [text]).map(function(run, i) {
      var size = i % 2? fontSize * smallCapsSize : fontSize;
      run = i % 2? run.toUpperCase() : run;
      doc.setFontSize(size);
      return { text: run, size: size, width: doc.getTextWidth(run) };
    });
    var width = runs.reduce(function(sum, run) { return sum + run.width; }, 0);
    x -= align == 'center'? width / 2 : align == 'right'? width : 0;
    runs.forEach(function(run) {
      if(!run.text) return;
      doc.setFontSize(run.size);
      doc.text(run.text, x, y);
      x += run.width;
    });
  }

  // TeX keeps the lyrics lyricDrop below the bottom staff line, and only moves them down for a note, or a mark below
  // a note, that would otherwise come too close, whereas exsurge puts them minSpaceBelowStaff below the lowest part
  // of any neume, including the stem of a clivis.  So each line is laid out again with the space below that puts
  // its lyrics where TeX would.
  function placeLyrics(score, ctxt, sizes) {
    var staffInterval = ctxt.staffInterval,
        minSpaceBelowStaff = ctxt.minSpaceBelowStaff,
        // a line's origin is one staff interval below its bottom staff line, at staff position 0
        texBaseline = sizes.lyricDrop - staffInterval,
        // from a note's staff position down to the bottom of its notehead
        noteDepth = ctxt.glyphPunctumHeight * ctxt.glyphScaling / 2,
        // from the bottom of the lowest note or mark to the top of the lyrics
        gap = 0.5 * staffInterval,
        firstLine = score.lines[0],
        y = firstLine? firstLine.bounds.y + firstLine.notationBounds.y : 0;
    score.lines.forEach(function(line) {
      // (laying out extra text-only lyrics again would move them along twice)
      if(line.numLyricLines && line.extraTextOnlyIndex === null) {
        var bottom = -Infinity,
            ascent = 0;
        score.notations.slice(line.notationsStartIndex, line.notationsStartIndex + line.numNotationsOnLine)
          .forEach(function(notation) {
            (notation.notes || []).forEach(function(note) {
              bottom = Math.max(bottom, -note.staffPosition * staffInterval + noteDepth);
              // the note's ictus, episemata etc., which can go below a low note
              (note.episemata || []).concat(note.morae || [], note.ictus || [], note.accent || []).forEach(function(mark) {
                bottom = Math.max(bottom, mark.bounds.y + mark.bounds.height);
              });
            });
            // exsurge puts the lyrics below the line's tallest letter
            if(notation.lyrics.length && notation.lyrics[0].text) ascent = Math.max(ascent, notation.lyrics[0].origin.y);
          });
        var baseline = Math.max(texBaseline, bottom + gap + ascent);
        if(Math.abs(baseline - line.lyricLineBaseline) > 0.01) {
          ctxt.minSpaceBelowStaff = minSpaceBelowStaff + (baseline - line.lyricLineBaseline) / staffInterval;
          line.performLayout(ctxt);
          ctxt.minSpaceBelowStaff = minSpaceBelowStaff;
        }
      }
      // where layoutChantLines puts each line
      line.bounds.y = y - line.notationBounds.y;
      y += line.bounds.height + ctxt.spaceBetweenSystems * staffInterval;
    });
  }

  // The lines of a chant laid out for the PDF.  Each one's height runs from the top of its SVG to just below its
  // lyrics, which is where TeX starts the next line's space above the staff; exsurge's own line height goes
  // further down, so the SVG is drawn taller than that.
  function getLines(chant, layout) {
    var ctxt = chant.ctxt,
        score = chant.score,
        restore = useSizes(ctxt, layout.sizes),
        svgs;
    try {
      score.performLayout(ctxt, true);
      score.layoutChantLines(ctxt, layout.width);
      placeLyrics(score, ctxt, layout.sizes);
      svgs = score.createSvgNodeForEachLine(ctxt);
    } finally {
      restore();
    }
    return svgs.map(function(svg, i) {
      var line = score.lines[i],
          height = line.bounds.height;
      if(line.numLyricLines == 1 && !line.numTranslationLines && !line.extraTextOnlyHeight) {
        // the line's origin is -notationBounds.y down its SVG
        height = line.lyricLineBaseline - line.notationBounds.y + layout.sizes.lyricDepth;
      }
      // keep the first two lines together, and the last two
      return {
        svg: svg,
        height: height,
        keepWithNext: i < svgs.length - 1 && (i === 0 || i === svgs.length - 2)
      };
    });
  }

  // options: {
  //   title: printed at the top of the first page and used for the file name,
  //   paper: see getLayout,
  //   chants: [{ score, ctxt, commentary, pageBreak }]; create() lays each score out again at the paper's sizes
  //     and width, and puts ctxt back afterwards
  // }
  // Resolves to the jsPDF document.
  function create(options) {
    return load().then(function(fontData) {
      var layout = getLayout(options.paper || {}),
          sizes = layout.sizes,
          pageWidth = layout.pageWidth,
          pageHeight = layout.pageHeight,
          doc = new window.jspdf.jsPDF({
            unit: 'pt',
            format: [pageWidth, pageHeight],
            orientation: pageWidth > pageHeight? 'landscape' : 'portrait',
            compress: true
          });
      fontFiles.forEach(function(font, i) {
        var fileName = font[0].replace(/^.*\//, '');
        doc.addFileToVFS(fileName, fontData[i]);
        doc.addFont(fileName, font[1], font[2]);
      });
      doc.setProperties({ title: options.title || '', creator: 'Chant Tools' });

      // TeX adds no space between chants: a chant's commentary goes just below the lyrics before it
      var items = [];
      if(options.title) {
        items.push({ text: options.title, font: ['Crimson Text SemiBold', 'normal'], fontSize: sizes.title.size,
          align: 'center', smallCaps: true, baseline: sizes.title.baseline, height: sizes.title.height,
          keepWithNext: true });
      }
      (options.chants || []).forEach(function(chant) {
        var lines = getLines(chant, layout);
        if(!lines.length) return;
        if(chant.commentary) {
          lines.unshift({ text: chant.commentary, font: ['Crimson Text', 'italic'], fontSize: sizes.commentary.size,
            align: 'right', baseline: sizes.commentary.baseline, height: sizes.commentary.height, keepWithNext: true });
        }
        lines[0].pageBreak = !!chant.pageBreak;
        items = items.concat(lines);
      });

      var placements = paginate(items, pageHeight - 2 * layout.margin),
          left = layout.margin,
          right = pageWidth - left,
          page = 0;
      return items.reduce(function(previous, item, i) {
        return previous.then(function() {
          var placement = placements[i],
              top = layout.margin + placement.y;
          for(; page < placement.page; ++page) doc.addPage();
          doc.setTextColor(0, 0, 0);
          if(item.svg) {
            // svg2pdf only sets the font style when it differs from its own default, so start from that default
            doc.setFont('times', 'normal');
            prepareSvg(item.svg);
            return doc.svg(item.svg, {
              x: left,
              y: top,
              width: parseFloat(item.svg.getAttribute('width')),
              height: parseFloat(item.svg.getAttribute('height'))
            });
          }
          drawText(doc, item.text, item.align == 'center'? pageWidth / 2 : right, top + item.baseline, item.font,
            item.fontSize, item.align, item.smallCaps);
        });
      }, Promise.resolve()).then(function() {
        return doc;
      });
    });
  }

  function fileName(title) {
    return (title || 'Chant').replace(/[\\/:*?"<>|]+/g, '-').trim() + '.pdf';
  }

  // The tab the PDF will open in.  It has to be opened during the click, before the PDF is made, or the browser
  // blocks it.  Returns null if it was blocked anyway.
  function openTab() {
    var tab = window.open('', '_blank');
    if(tab) {
      tab.document.title = 'Making PDF…';
      tab.document.body.textContent = 'Making PDF…';
    }
    return tab;
  }

  // The app's web views (Android's WebView and iOS's WKWebView) ignore downloads, so the PDF is written to the app's
  // cache and opened in the phone's PDF viewer, with cordova-plugin-file and cordova-plugin-file-opener2.
  function openInApp(blob, name) {
    function failed(reject, what) {
      return function(error) {
        var detail = error && (error.message || error.code != null && 'error ' + error.code);
        reject(new Error(what + (detail? ' (' + detail + ')' : '')));
      };
    }
    return new Promise(function(resolve) {
      document.addEventListener('deviceready', resolve, false);
    }).then(function() {
      if(!window.resolveLocalFileSystemURL || !(window.cordova.plugins && window.cordova.plugins.fileOpener2)) {
        throw new Error("this version of the app can't open PDFs");
      }
      return new Promise(function(resolve, reject) {
        var saveFailed = failed(reject, 'the phone could not save it');
        window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, function(dir) {
          dir.getFile(name, { create: true }, function(file) {
            file.createWriter(function(writer) {
              // an earlier, longer PDF of the same name is cut short first
              var truncated = false;
              writer.onwriteend = function() {
                if(truncated) return resolve(file.nativeURL);
                truncated = true;
                writer.write(blob);
              };
              writer.onerror = saveFailed;
              writer.truncate(0);
            }, saveFailed);
          }, saveFailed);
        }, saveFailed);
      });
    }).then(function(url) {
      return new Promise(function(resolve, reject) {
        window.cordova.plugins.fileOpener2.open(url, 'application/pdf', {
          success: resolve,
          error: failed(reject, 'no app could open it')
        });
      });
    });
  }

  // Makes the PDF for a button click and shows it: in a new tab on the web, or in the phone's PDF viewer in the app.
  // getOptions is called once the libraries have loaded and returns the options for create().
  function show(button, getOptions) {
    var $button = $(button);
    if($button.hasClass('disabled')) return Promise.resolve();
    var label = $button.text(),
        tab = window.cordova? null : openTab();
    $button.addClass('disabled').attr('aria-busy', 'true').text('Making PDF…');
    return load().then(function() {
      var options = getOptions();
      return create(options).then(function(doc) {
        var name = fileName(options.title);
        if(window.cordova) return openInApp(doc.output('blob'), name);
        if(!tab) return doc.save(name);
        if(!tab.closed) tab.location.replace(doc.output('bloburl'));
      });
    }).catch(function(error) {
      if(tab) tab.close();
      console.error(error);
      alert('Sorry, the PDF could not be made: ' + (error && error.message || error));
    }).then(function() {
      $button.removeClass('disabled').removeAttr('aria-busy').text(label);
    });
  }

  return { load: load, getPaper: getPaper, getSizes: getSizes, getLayout: getLayout, paginate: paginate, create: create,
    show: show };
})();
