// Draws the Quick PDF (see chant-pdf.js) with jsPDF and svg2pdf.js.  This runs as a web worker, so that the page
// doesn't freeze while the PDF is made; where the worker can't start, chant-pdf.js loads it on the page instead.
// The page lays the chant out and sends each line's SVG here as plain objects (see toTree in chant-pdf.js), which
// become the few DOM methods svg2pdf uses.
var ChantPdfRender = (function() {
  var fontCache = {};
  // the jsPDF document being drawn, whose fonts measure the text for svg2pdf in the worker
  var measuringDoc = null;

  function fetchBase64(url) {
    if(!fontCache[url]) {
      fontCache[url] = fetch(url).then(function(response) {
        if(!response.ok) throw new Error('Could not load ' + url);
        return response.arrayBuffer();
      }).then(function(buffer) {
        var bytes = new Uint8Array(buffer), binary = '';
        for(var i = 0; i < bytes.length; i += 0x8000) {
          binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
        }
        return btoa(binary);
      });
      fontCache[url].catch(function() { delete fontCache[url]; }); // try again next time
    }
    return fontCache[url];
  }
  // fonts: [{ url, family, style }], TrueType fonts; resolves to their base64 data, and fails if any can't be loaded
  function loadFonts(fonts) {
    return Promise.all(fonts.map(function(font) { return fetchBase64(font.url); }));
  }
  // resolves to [{ font, data }] for the fonts that could be loaded; svg2pdf draws the text of the others in Times
  function loadMoreFonts(fonts) {
    return Promise.all((fonts || []).map(function(font) {
      return fetchBase64(font.url).then(function(data) {
        return { font: font, data: data };
      }, function(error) {
        console.warn(error);
        return null;
      });
    })).then(function(loaded) {
      return loaded.filter(Boolean);
    });
  }

  // tree: { name, attributes: { name: value }, children: [tree or text] }
  function Element(tree, parent, ownerSVGElement) {
    var self = this;
    this.tagName = this.nodeName = tree.name;
    this.nodeType = 1;
    this.parentNode = this.parentElement = parent || null;
    this.ownerSVGElement = ownerSVGElement || null;
    this.attrs = tree.attributes;
    this.style = new Style(this.attrs.style);
    var svg = tree.name == 'svg'? this : ownerSVGElement;
    this.childNodes = tree.children.map(function(child) {
      return typeof child == 'string'? new TextNode(child, self) : new Element(child, self, svg);
    });
    this.updateChildren();
  }
  Element.prototype = {
    updateChildren: function() {
      this.children = this.childNodes.filter(function(node) { return node.nodeType == 1; });
      this.childElementCount = this.children.length;
      this.firstChild = this.childNodes[0] || null;
    },
    get id() { return this.attrs.id || ''; },
    get textContent() {
      return this.childNodes.map(function(node) { return node.textContent; }).join('');
    },
    set textContent(text) {
      this.childNodes = [new TextNode(text, this)];
      this.updateChildren();
    },
    hasAttribute: function(name) { return this.attrs.hasOwnProperty(name); },
    getAttribute: function(name) { return this.hasAttribute(name)? this.attrs[name] : null; },
    setAttribute: function(name, value) {
      this.attrs[name] = String(value);
      if(name == 'style') this.style = new Style(this.attrs.style);
    },
    setAttributeNS: function(namespace, name, value) { this.setAttribute(name, value); },
    // for svg2pdf's 'style,link'; the page has already copied the <style> rules onto the elements
    querySelectorAll: function(selector) {
      var names = selector.split(','), found = [];
      (function search(element) {
        element.children.forEach(function(child) {
          if(names.indexOf(child.nodeName.toLowerCase()) >= 0) found.push(child);
          search(child);
        });
      })(this);
      return found;
    },
    matches: function() { return false; }
  };
  function TextNode(text, parent) {
    this.nodeName = '#text';
    this.nodeType = 3;
    this.textContent = text;
    this.parentNode = this.parentElement = parent;
  }
  function Style(text) {
    var properties = this.properties = {};
    (text || '').split(';').forEach(function(declaration) {
      var colon = declaration.indexOf(':');
      if(colon > 0) {
        properties[declaration.slice(0, colon).trim().toLowerCase()] =
          declaration.slice(colon + 1).replace(/!\s*important\s*$/i, '').trim();
      }
    });
  }
  Style.prototype = {
    getPropertyValue: function(name) { return this.properties[name] || ''; },
    getPropertyPriority: function() { return ''; },
    setProperty: function(name, value) { this.properties[name] = value; }
  };

  // The width of text in the PDF font svg2pdf will draw it in, for the worker, which has no fonts of its own to
  // measure with.  The page has already put each piece of text where the browser put it (see placeText in
  // chant-pdf.js), so svg2pdf only uses this for things like bounding boxes.  fontFamily is the jsPDF font name, and
  // fontStyle and fontWeight are combined as svg2pdf does.
  function measureText(text, fontFamily, fontSize, fontStyle, fontWeight) {
    var style = fontWeight == 400 || fontWeight === 'normal'?
          (fontStyle === 'italic'? 'italic' : 'normal') :
          (fontWeight == 700 || fontWeight === 'bold') && fontStyle === 'normal'? 'bold' :
          (fontWeight == 700? 'bold' : fontWeight) + '' + fontStyle,
        font = measuringDoc.internal.getFont(fontFamily, style),
        size = parseFloat(fontSize);
    return typeof font.metadata.widthOfString == 'function'? font.metadata.widthOfString(text, size, 0) :
      measuringDoc.getStringUnitWidth(text, { font: font, fontSize: size, charSpace: 0 }) * size;
  }
  // The parts of document that svg2pdf uses in the worker: a canvas and an SVG text element to measure text with,
  // which it compares to choose between them, and a document to parse the <style>s into, of which there are none.
  function installDocument(global) {
    function MeasuringElement() {
      this.attrs = {};
      this.style = { setProperty: function() {} };
      this.parentNode = null;
      this.textContent = '';
    }
    MeasuringElement.prototype = {
      setAttribute: function(name, value) { this.attrs[name] = value; },
      setAttributeNS: function(namespace, name, value) { this.attrs[name] = value; },
      appendChild: function(child) { child.parentNode = this; },
      getBBox: function() {
        var attrs = this.attrs;
        return { width: measureText(this.textContent, attrs['font-family'], attrs['font-size'], attrs['font-style'],
          attrs['font-weight']) };
      }
    };
    var body = { appendChild: function() {}, removeChild: function() {} };
    global.document = {
      body: body,
      implementation: {
        createHTMLDocument: function() { return { body: body, createElement: function() { return {}; } }; }
      },
      createElementNS: function() { return new MeasuringElement(); },
      createElement: function() {
        return {
          getContext: function() {
            return {
              font: '',
              // font is [fontStyle, fontWeight, fontSize, fontFamily].join(' ')
              measureText: function(text) {
                var parts = /^(\S+) (\S+) (\S+) (.*)$/.exec(this.font);
                return { width: measureText(text, parts[4], parts[3], parts[1], parts[2]) };
              }
            };
          }
        };
      }
    };
  }

  // jsPDF has no small caps, so the lower-case runs of text are drawn as smaller capitals, as prepareSvg in
  // chant-pdf.js does.  x is where the text is aligned to.
  function drawText(doc, item, smallCapsSize) {
    doc.setFont(item.font[0], item.font[1]);
    var runs = (item.smallCaps? item.text.split(/(\p{Ll}+)/u) : [item.text]).map(function(run, i) {
      var size = i % 2? item.fontSize * smallCapsSize : item.fontSize;
      run = i % 2? run.toUpperCase() : run;
      doc.setFontSize(size);
      return { text: run, size: size, width: doc.getTextWidth(run) };
    });
    var width = runs.reduce(function(sum, run) { return sum + run.width; }, 0),
        x = item.x - (item.align == 'center'? width / 2 : item.align == 'right'? width : 0);
    runs.forEach(function(run) {
      if(!run.text) return;
      doc.setFontSize(run.size);
      doc.text(run.text, x, item.y);
      x += run.width;
    });
  }

  // job: {
  //   title, pageWidth, pageHeight (in points), smallCapsSize,
  //   fonts: [{ url, family, style }], the fonts the PDF needs, and moreFonts, the fonts it can do without,
  //   items: [{ page, x, y, svg: tree, width, height }], each line of chant, where x and y are its top left corner,
  //     or [{ page, x, y, text, font: [name, style], fontSize, align, smallCaps }], where y is the baseline
  // }
  // Resolves to the PDF, as an ArrayBuffer.
  function render(job) {
    return Promise.all([loadFonts(job.fonts), loadMoreFonts(job.moreFonts)]).then(function(results) {
      var doc = new jspdf.jsPDF({
            unit: 'pt',
            format: [job.pageWidth, job.pageHeight],
            orientation: job.pageWidth > job.pageHeight? 'landscape' : 'portrait',
            compress: true
          }),
          page = 0;
      job.fonts.forEach(function(font, i) {
        var fileName = font.url.replace(/^.*\//, '');
        doc.addFileToVFS(fileName, results[0][i]);
        doc.addFont(fileName, font.family, font.style);
      });
      results[1].forEach(function(loaded, i) {
        var fileName = 'font-' + i + '.ttf';
        doc.addFileToVFS(fileName, loaded.data);
        doc.addFont(fileName, loaded.font.family, loaded.font.style);
      });
      doc.setProperties({ title: job.title || '', creator: 'Chant Tools' });
      measuringDoc = doc;
      return job.items.reduce(function(previous, item) {
        return previous.then(function() {
          for(; page < item.page; ++page) doc.addPage();
          doc.setTextColor(0, 0, 0);
          if(item.svg) {
            // svg2pdf only sets the font style when it differs from its own default, so start from that default
            doc.setFont('times', 'normal');
            return doc.svg(new Element(item.svg), { x: item.x, y: item.y, width: item.width, height: item.height });
          }
          drawText(doc, item, job.smallCapsSize);
        });
      }, Promise.resolve()).then(function() {
        return doc.output('arraybuffer');
      }).finally(function() {
        measuringDoc = null;
      });
    });
  }

  return { loadFonts: loadFonts, render: render, installDocument: installDocument };
})();

// In the worker, each message calls one of ChantPdfRender's functions: { id, method, argument }, which is answered
// with { id, result } or { id, error }.  { ready: true } says the libraries have loaded.
if(typeof document == 'undefined' && typeof importScripts == 'function') {
  importScripts('jspdf.umd.min.js', 'svg2pdf.umd.min.js');
  ChantPdfRender.installDocument(self);
  self.onmessage = function(event) {
    var message = event.data;
    Promise.resolve().then(function() {
      return ChantPdfRender[message.method](message.argument);
    }).then(function(result) {
      self.postMessage({ id: message.id, result: result }, result instanceof ArrayBuffer? [result] : []);
    }, function(error) {
      console.error(error);
      self.postMessage({ id: message.id, error: error && error.message || String(error) });
    });
  };
  self.postMessage({ ready: true });
}
