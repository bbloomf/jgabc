var linkSelector="";
var linkDownloadSelector="";

var utf8_bom=String.fromCharCode(0xEF)+String.fromCharCode(0xBB)+String.fromCharCode(0xBF);
function encode_utf8( s )
{
  return utf8_bom+unescape( encodeURIComponent( s ) );
}
function decode_utf8( s )
{
  return decodeURIComponent( escape( s ) );
}

HTMLTextAreaElement.prototype.selectAndScroll = function(start,end,onlyUp) {
  var text = this.value;
  var txtBox = this;
  setTimeout(function(){
    if(text != txtBox.value) return;
    var scrollTop = txtBox.scrollTop;
    var extra = ''
    if(onlyUp) {
      var $txtBox = $(txtBox);
      var lineHeight = parseFloat($txtBox.css('line-height'));
      if(isNaN(lineHeight)) lineHeight = 1.2 * parseFloat($txtBox.css('font-size'));
      var rows = Math.floor($txtBox.height() / lineHeight);
      extra = '\n'.repeat(rows-1);
    }
    txtBox.value = text.slice(0,end) + extra;
    txtBox.scrollTop = txtBox.scrollHeight;

    txtBox.value = text;
    txtBox.setSelectionRange(start,end);
    if(((txtBox.scrollTop - scrollTop) * (onlyUp? -1 : 1)) < 0) txtBox.scrollTop = scrollTop;
  })
}
var regexToneModifiers = /(')|(\.{1,2})|(_{1,4}0?)/g
var regexTones = new RegExp("([/ ,;:`]+)|((?:[fF]|[cC][bB]?)[1-4])|(?:(-)?(([A-M])|([a-m]))(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5])|(\\+))?((?:" + regexToneModifiers.source.replace(/\((?!\?:)/g,"(?:") + ")*)(?:\\[([^\\]]*)(?:]|$))?|(z0))","g");
//                          /([\/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(([A-M])|([a-m]))(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5]))?((?:(?:')|(?:\.{1,2})|(?:(?:_0?){1,4}))*)|(z0))|\[([^\]]*)(?:\]|$)                                )*)|(z0))|\[([^\]]*)(?:\]|$)
//                          /([\/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(([A-M])|([a-m]))(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5]))?((?:(?:')|(?:\.{1,2})|(?:(?:_0?){1,4}))*)|(z0))|\[([^\]]*)(?:\]|$)
var regexTonesSpliceIndex=27;
var regexToneModifiersCount = 4;
var rtg = {
  whitespace: 1,
  clef: 2,
  initioDebilis: 3,
  tone: 4,
  toneUpper: 5, // diamond
  toneLower: 6,
  noteType: 7,      // (([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|([oO])|([xy])|(q)]|(R|r0|r(?![1-5]))|(r[1-5])|(\+))
  virga: 8,        // [Vv]{1,3}
  stropha: 9,      // s{1,3}
  liquescentia: 10,      // [<>~]
  ascendingLiquescentia: 11,  // <
  descendingLiquescentia: 12,  // >
  diminutiveLiquescentia: 13,  // ~
  quilisma: 14,      // w
  oriscus: 15,      // o
  oriscusReverse: 16,    // O
  accidental: 17,      // [xy]
  flat: 18,        // x
  natural: 19,      // y
  q: 20,        // q
  lineaPunctum: 22,      // R
  lineaPunctumCavum: 23,    // r0
  punctumCavum: 24,      // r
  rNumber: 25,      // r[1-5]
  custos: 26,       // \+
  ictus: 27,        // (')
  dot: 28,          // (\.{1,2})
  episema: 29,      // ((?:_0?)){1,4})
  bracketed: 30,     // [text]
  autoCustos: 31    // z0
};

function setPdfLinkSelector(sel){
  linkSelector=sel;
};
function onDragStart(e){
  console.info(e);
  e.originalEvent.dataTransfer.setData("DownloadURL",this.getAttribute("data-downloadurl"));
};
function setGabcLinkSelector(sel){
  linkDownloadSelector=sel;
  $(sel).bind("dragstart",onDragStart);
};
function updateLinks(text){
  var header=getHeader(text);
  if(header){
    text = text.slice(header.original.length);
  } else {
    header = '%%\n';
  }
  if(linkSelector){
    $(linkSelector).attr("href","http://gregorio.gabrielmass.com/cgi/process.pl?gregtext="
      + window.escape(header+text) + "&gregfontselect=17&gregtextfontselect=12&greginitialselect=43&gregspaceselect=7mm&gregredselect=N&greglinethickselect=10&gregpaperselect=letterpaper&gregfaceselect=libertine&gregcropselect=N");
  }
  try {
    if(linkDownloadSelector){
      var utf8=encode_utf8(header+text);
      var url="data:text/plain;charset=utf8;base64,"+btoa(utf8);
      var filename = header.name||"Untitled";
      if(!filename.match(/\.gabc$/))filename += ".gabc";
      $(linkDownloadSelector).attr("charset","UTF-8")
        .prop("href",url)
        .prop("download",filename)
        .attr("data-downloadurl","text/plain:"+filename+":"+url);
    }
  } catch(e) {
  }
  return [header,text];
}

var rog = {
  syl:3,
  gabc:5,
  whitespace:7
};
var regexTag = /<(\/)?(\w+)>/i;
var regexOuter = /((([^\(\r\n]+)($|\())|\()([^\)]*)($|\))(?:(\s+)|(?=(?:\([^\)]*\))+(\s*))|)/g;
var regexHeaderEnd=/(?:^|\n)%%\s?\n/;
var regexHeaderLine = /^([\w-_.]+):\s*([^;\r\n]*)(?:;|$)/i;
var regexHeaderComment = /^%.*/;
function GabcHeader(text){
  if(typeof(text)!='string') text='';
  this.comments=[];
  this.cValues={};
  this.original='';
  var match=text.match(regexHeaderEnd);
  if(match){
    var txtHeader = this.original = text.slice(0,match.index+match[0].length);
    var lines = txtHeader.split(/\r?\n/g);
    for(var i=0; i < lines.length; ++i){
      var line=lines[i],
          match = regexHeaderLine.exec(line);
      if(match){
        var key = match[1].replace(/-([a-z])/g,function(a,letter) { return letter.toUpperCase(); });
        if(this[match[1]]) {
          var arrayName=match[1]+'Array';
          if(!this[arrayName]){
            this[arrayName] = [this[match[1]]];
          }
          this[arrayName].push(match[2]);
        } else {
          this[match[1]]=match[2];
        }
        if(key != match[1]) this[key] = this[match[1]];
      } else if((match = regexHeaderComment.exec(line))){
        if(line!='%%'){
          match = regexHeaderLine.exec(line.slice(1));
          if(match){
            var key = match[1].replace(/-([a-z])/g,function(a,letter) { return letter.toUpperCase(); });
            this.cValues[match[1]]=match[2];
            if(key != match[1]) this.cValues[key] = match[2];
          } else {
            this.comments[i]=line;
          }
        }
      }
    }
  }
}
GabcHeader.prototype.toString = function(){
  var result=[];
  for(key in this){
    if(key=='length' || key=='original' || key=='comments' || key=='cValues' || (typeof this[key])!="string")continue;
    var alternateKey = key.replace(/[A-Z]/g,function(letter) { return '-'+letter.toLowerCase(); });
    if(alternateKey != key && alternateKey in this) continue;
    var array = this[key+'Array'];
    if(array) {
      for(var i=0; i < array.length; ++i) {
        result.push(key + ': ' + array[i] + ';');
      }
    } else {
      result.push(key + ': ' + this[key] + ';');
    }
  }
  for(key in this.cValues){
    if(key.length==0 || !this.cValues.hasOwnProperty(key))continue;
    result .push('%'+key + ': ' + this.cValues[key] + ';');
  }
  for(i in this.comments){
    if(!this.comments.hasOwnProperty(i)) continue;
    try{
      result.splice(i,0,this.comments[i]);
    } catch(e){}
  }
  return result.join('\n') + '\n%%\n';
};
function getHeaderLen(text){
  var match=text.match(regexHeaderEnd);
  if(match){
    return match.index+match[0].length;
  } else {
    return 0;
  }
}
function getHeader(text){
  return new GabcHeader(text);
}

function getTagsFrom(txt){
  var tm,r=[];
  while(tm = regexTag.exec(txt)) {
    r.push(tm[2]);
    var lastIndex = tm.index + tm[0].length;
    if(tm.index == 0)
      txt = txt.slice(tm[0].length);
    else txt = txt.slice(0,tm.index) + txt.slice(lastIndex);
  }
  return r;
}

function transposeGabc(gabc,offset) {
  var replaceLetter = function(letter, clef) {
    if(clef) return letter;
    var newLetter = String.fromCharCode(offset + letter.charCodeAt(0));
    if(!newLetter.match(/[a-m]/i)) throw true;
    return newLetter;
  };
  var regex = /([cf]b?[1-4])|[a-mA-M]/g;
  return gabc.replace(/\(([^)]+)\)/g, function(whole,gabc) {
    return '(' + gabc.replace(regex, replaceLetter) + ')';
  });
}

function gabcEditorKeyDown(e) {
  var $this = $(this), txt = $this.val(), selStart = this.selectionStart, selEnd = this.selectionEnd;
  switch(e.which) {
    case 66: //b
      if(e.ctrlKey || e.altKey) {
        e.preventDefault();
        index = txt.indexOf(' ',this.selectionEnd);
        if(index <= 0) index = txt.length;
        $this.val(txt.slice(0,index) + ' ()' + txt.slice(index));
        this.selectionEnd = this.selectionStart = index + 2;
      }
      break;
    case 83: //s
      if(selStart == selEnd && (e.ctrlKey || e.altKey) && txt[selStart-1]!='(' && txt[selStart]!=')') {
        e.preventDefault();
        $this.val(txt.slice(0,selStart) + '()' + txt.slice(selStart));
        this.selectionEnd = this.selectionStart = selStart + 1;
      }
      break;
    case 9: { //tab
      var index, indexEnd, headerIndex;
      e.preventDefault();
      if(e.shiftKey) {
        // go backwards
        index = this.selectionStart;
        headerIndex = txt.lastIndexOf('\n%%\n',index-1);
        index = txt.lastIndexOf(')',index - 1);
        if(index <= headerIndex) index = txt.lastIndexOf(')');
        if(index >= 0) {
          indexEnd = index;
          index = txt.lastIndexOf('(',index);
        }
      } else {
        index = this.selectionEnd;
        var regex = /(\()|(-(?!\())|(\s+(?![:;!.]))|([^)\s]$)/g;
        regex.lastIndex = index;
        var match;
        while((match = regex.exec(txt)) && (match[2]||match[3])) {
          if(match[3] && (match.index==0 || txt[match.index-1]==')')) continue;
          //check if this line is in the header:
          index = match.index;
          var begIndex = txt.lastIndexOf('\n',index-1)+1,
          endIndex = txt.indexOf('\n',index);
          if(endIndex < 0) endIndex = txt.length;
          if(txt[endIndex]=='\r') endIndex--;
          var line = txt.slice(begIndex,endIndex);
          if(line.match(/^(?:\s*(?:%.*|[-\w]+:[^;]+;)\s*|%%)$/)) {
            continue;
          } else {
            break;
          }
        }
        if(match) {
          if(match[1]) {
            index = match.index;
          } else if(match[2]||match[3]||match[4]) {
            if(match[2]||match[4]) index = match.index+1;
            txt = txt.slice(0,index) + '()' + txt.slice(index);
            $this.val(txt);
          } else {
            index = txt.indexOf('(');
          }
        } else {
          index = txt.indexOf('(');
        }
        index = txt.indexOf('(',index);
        
        if(index >= 0) {
          indexEnd = txt.indexOf(')',index);
        }
      }
      if(index >= 0 && indexEnd >= 0) {
        this.selectionStart = index + 1;
        this.selectionEnd = indexEnd;
      }
      break;
    }
    case 57:
      if(e.shiftKey) { //open parenthesis
        var rightSide = this.value.slice(selEnd),
            firstClose = rightSide.indexOf(')'),
            firstOpen = rightSide.indexOf('(');
        if(firstClose < 0 || (firstOpen >= 0 && firstOpen < firstClose)) {
          this.value=this.value.slice(0,this.selectionStart) + '()' + this.value.slice(selEnd);
          this.selectionStart=this.selectionEnd=selStart+1;
          e.preventDefault();
          return;
        }
      }
      break;
    case 48:
      if(e.shiftKey) { //close parenthesis
        if(selStart == selEnd && txt[selStart]==')') {
          e.preventDefault();
          this.selectionStart = this.selectionEnd = selStart + 1;
        }
      }
      break;
    case 8: {
      var selEnd = this.selectionEnd;
      if(selEnd == this.selectionStart && selEnd > 0 && this.value[selEnd]==')' && this.value[selEnd-1]=='(') {
        e.preventDefault();
        this.value=this.value.slice(0,this.selectionStart-1) + this.value.slice(selEnd+1);
        this.selectionStart=this.selectionEnd=selEnd-1;
      }
      break;
    }
    case 38: // up
    case 40: // down
      if(e.altKey) {
        var up = e.which === 38;
        e.preventDefault();
        var allGabc = this.value
            header = getHeader(allGabc),
            selectionStart = this.selectionStart,
            selectionEnd = this.selectionEnd,
            gabc = allGabc = allGabc.slice(header.original.length);
        if(selectionStart != selectionEnd) {
          var startIndex = Math.max(0,selectionStart - header.original.length),
              endIndex = Math.max(0,selectionEnd - header.original.length),
              lastOpenParen = allGabc.lastIndexOf('(',startIndex),
              lastCloseParen = allGabc.lastIndexOf(')',startIndex),
              firstOpenParen = allGabc.indexOf('(',endIndex),
              firstCloseParen = allGabc.indexOf(')',endIndex);
          if(firstOpenParen < 0) firstOpenParen = Infinity;
          if(firstCloseParen < 0) firstCloseParen = Infinity;
          gabc = gabc.slice(startIndex, endIndex);
        }
        var offset = up? 1 : -1;
        try {
          gabc = transposeGabc(gabc, offset)
        } catch(e) {
          return;
        }
        if(selectionStart == selectionEnd) {
          this.value = header.original + gabc;
        } else {
          if(lastOpenParen > lastCloseParen && firstCloseParen < firstOpenParen && gabc.search(/[()]/) < 0) {
            try {
              gabc = gabc.replace(regex, replaceLetter);
            } catch(e) {
              return;
            }
          }
          this.value = header.original + allGabc.slice(0,startIndex) + gabc + allGabc.slice(endIndex);
        }
        this.setSelectionRange(selectionStart, selectionEnd);
      }
      break;
  }
}

function makeInternationalTextBoxKeyDown(convertFlexa){
  var lastKey = 0;
  var dictionaries=
      {222://apostrophe
        {"false":
          {'a':'á',
           'e':'é',
           'i':'í',
           'o':'ó',
           'u':'ú',
           'y':'ý',
           'A':'Á',
           'E':'É',
           'I':'Í',
           'O':'Ó',
           'U':'Ú',
           'Y':'Ý',
           'æ':"ǽ",
           'œ':"oé",
           'Æ':"Ǽ",
           'Œ':"Oé"
           },
        "true":
          {'a':'ä',
           'e':'ë',
           'i':'ï',
           'o':'ö',
           'u':'ü',
           'y':'ÿ',
           'A':'Ä',
           'E':'Ë',
           'I':'Ï',
           'O':'Ö',
           'U':'Ü',
           'æ':"aë",
           'œ':"oë",
           'Æ':"Aë",
           'Œ':"Oë"
          }
        },
        69://e
        {"false":
          {'a':'æ',
           'o':'œ',
           'A':'Æ',
           'O':'Œ'
          },
        "true":
          {'a':'æ',
           'o':'œ',
           'A':'Æ',
           'O':'Œ'
          }
        },
        8://backspace
        {"false":
          {
            '†':"+",
            'æ':"ae",
            'œ':"oe",
            'Æ':"Ae",
            'Œ':"Oe",
            'á':'a',
            'é':'e',
            'í':'i',
            'ó':'o',
            'ú':'u',
            'ý':'y',
            'Á':'A',
            'É':'E',
            'Í':'I',
            'Ó':'O',
            'Ú':'U',
            'Ý':'Y',
            'ä':'a',
            'ë':'e',
            'ï':'i',
            'ö':'o',
            'ü':'u',
            'ÿ':'y',
            'Ä':'A',
            'Ë':'E',
            'Ï':'I',
            'Ö':'O',
            'Ü':'U',
            'Ǽ':"Aé",
            'ǽ':"aé"
          },
        "true":
          {
          }
        }
      };
      var removeAccent = {
        'á':'a',
        'é':'e',
        'í':'i',
        'ó':'o',
        'ú':'u',
        'ý':'y',
        'Á':'A',
        'É':'E',
        'Í':'I',
        'Ó':'O',
        'Ú':'U',
        'Ý':'Y',
        'Ǽ':"Æ",
        'ǽ':"æ",
        "áu": "au",
        "oé": "oe",
        "aé": "ae"
      };
      var accentSyllable = function(syllables,which) {
        word = '';
        for(var i = 0; i<syllables.length; ++i) {
          if(which == i) {
            word = syllables[i].replace(/((?:[gq]u|i|[^aeiouyáéíóúýæœ])*)([ao][eé]|[aá]u|[aeiouyáéíóúýǽæœ])(?=[^aeiouyáéëíóúýǽæœ]|$)/, function(match,first,vowel){
              if(vowel.length == 2) {
                if(vowel[1] == 'u') {
                  return first + 'áu';
                } else {
                  first += vowel[0];
                  vowel = vowel[1];
                }
              }
              return first + (dictionaries[222]['false'][vowel] || vowel);
            }) + word;
          } else {
            word = syllables[i].replace(/((?:[gq]u|i|[^aeiouyáéíóúýæœ])*)(ae|au|oe|[aeiouyáéíóúýǽæœ])(?=[^aeiouyáéëíóúýǽæœ]|$)/, function(match,first,vowel){
              return first + (removeAccent[vowel] || vowel);
            }) + word;
          }
        }
        return word;
      }
  return function(e){
    if(typeof(getHeaderLen)=='function' && getHeaderLen(this.value)>0) {
      // Only process as international textbox if the cursor is not within parentheses:
      var lastOpenParen = this.value.lastIndexOf('(',this.selectionStart-1);
      var lastCloseParen = this.value.lastIndexOf(')',this.selectionStart-1);
      if(lastCloseParen < lastOpenParen) return;
    }
    if(convertFlexa && e.which == 187 && e.shiftKey) { //if + was entered
      var selStart=this.selectionStart;
      var len=1;
      this.value=this.value.slice(0,selStart) + '†' + this.value.slice(this.selectionEnd);
      this.selectionStart=this.selectionEnd=selStart+len;
      e.preventDefault();
      return;
    }
    var isEnglish=$("#cbEnglish")[0] && cbEnglish.checked;
    if(e.which == 49 || e.which == 50 || (e.which == 51 && isEnglish)) {
      // swap e.which (49;50;51 => 2;1;0)
      var which = 2 - (e.which - 49),
          start = this.selectionStart,
          end = this.selectionEnd,
          wordStart = this.value.lastIndexOf(' ',start) + 1,
          wordEnd = this.value.indexOf(' ',end);
          if(wordEnd < 0) wordEnd = this.value.length;
      if(isEnglish) {
        var phrase = this.value.slice(wordStart,end).replace(/\*/g,''),
            syllables = Syl.syllabify(phrase),
            which = syllables.length - 1 - which;
        if(which < 0) return;
        var syl = syllables[which];
        phrase = phrase.slice(0,syl.index) + syl.sylnospace + '*' + phrase.slice(phrase.indexOf(syl.sylnospace,syl.index) + syl.sylnospace.length);
        this.value = this.value.slice(0, wordStart) + phrase + this.value.slice(end);
        this.selectAndScroll(start, start + phrase.length, e.shiftKey);
        e.preventDefault();
        return;
      } else {
        // TODO: expand selection to entire word if it isn't currently on a whole word
        var word = this.value.slice(start,end);
        var syllables = word.match(regexLatin);
        if(syllables.length>2) {
          syllables = syllables.reverse();
          word = accentSyllable(syllables,which);
          this.value = this.value.slice(0,start) + word + this.value.slice(end);
          this.selectAndScroll(start,end, e.shiftKey);
          e.preventDefault();
        }
      }
    }
    if(e.which==9 || (!isEnglish && (e.which == 49 || e.which == 50))) {
      if(isEnglish) {
        var selectionEnd = this.selectionEnd;
        if(this.selectionEnd == this.selectionStart) {
          selectionEnd = 0;
          this.scrollTop = 0;
        }
        var part, lines, line;
        if(e.shiftKey) {
          part = this.value.slice(0,this.selectionStart);
          lines = splitSentences(part);
          if(lines.length<2) return;
          line = lines.slice(-2)[0];
          if(line) selectionEnd = part.lastIndexOf(line); 
        } else {
          part = this.value.slice(selectionEnd);
          lines = splitSentences(part);
          line = lines[0];
          if(line && line.length < 4) line = lines[1];
          if(line) selectionEnd += part.indexOf(line);
        }
        if(!line) return;
        var syllables = Syl.syllabify(line);
        if(syllables.length<3) return;
        var lastSyl = syllables.slice(-1)[0];
        var last3syl = syllables.slice(-3);
        if(line.indexOf('*',last3syl[0].index)<0) {
          var accentSyl = lastSyl.word.length==1? lastSyl : last3syl[1];
          accentSyl.separator = '*';
          var index = accentSyl.index + accentSyl.sylnospace.length;
          line = line.slice(0,index) + '*' + line.slice(index);
          this.value = this.value.slice(0, selectionEnd) + line + this.value.slice(selectionEnd + line.length - 1);
        }
        this.selectAndScroll(selectionEnd + syllables.slice(-3)[0].index, selectionEnd + line.indexOf(lastSyl.sylnospace,lastSyl.index) + lastSyl.sylnospace.length + (lastSyl.separator && lastSyl.separator.length || 0), e.shiftKey);
        e.preventDefault();
        return;
      }
      // else Latin:
      var index = e.shiftKey? this.selectionStart : this.selectionEnd;
      if(e.which == 9 && this.selectionEnd == this.selectionStart) index = e.shiftKey? this.value.length : 0;
      var subIndex;
      while(true) {
        var slice = e.shiftKey? this.value.slice(0,index).reverse() : this.value.slice(index),
            match = slice.match(/[a-zæœ]{3,}(?=$|[\s,.;!\?])/i),
            word = match && match[0] || '';
        if(e.shiftKey) word = word.reverse();
        if(e.shiftKey) index -= match.index + word.length;
          else index += match.index;
        var syllables = word.match(regexLatin);
        if(!syllables || syllables.length <= 2) {
          if(!e.shiftKey) index += word.length;
          continue;
        }
        var longPenult = word.match(regexLatinLongPenult);
        if(longPenult) {
          this.value = this.value.slice(0,index) + accentSyllable(syllables.reverse(),1) + this.value.slice((index += word.length));
          this.selectAndScroll(index - word.length, index, e.shiftKey);
          continue;
        }
        this.selectAndScroll(index, index + word.length, e.shiftKey);
        e.preventDefault();
        break;
      }
    }
    var dictionary=dictionaries[e.which];
    if(dictionary && this.selectionStart==this.selectionEnd && this.selectionStart>0){
      var previousChar=this.value[this.selectionStart-1];
      var r=dictionary[e.shiftKey][previousChar];
      if(r){
        var selEnd=this.selectionEnd;
        var len=r.length - 1;
        this.value=this.value.slice(0,--this.selectionStart) + r + this.value.slice(selEnd);
        this.selectionStart=this.selectionEnd=selEnd+len;
        e.preventDefault();
        return;
      }
    }
  }
};
var internationalTextBoxKeyDown = makeInternationalTextBoxKeyDown(true);

(function(window) {
  var baseFreq = 130, timeoutNextNote, transpose = 0;
  window.tempo=200;
  playPitch = function(pitch, options){
    tones.play(pitch, options, transpose);
  }
  var _isPlaying=false;
  setTempo = function(newTempo) { tempo = newTempo || 150; }
  setRelativeTempo = function(delta) { tempo += delta; if(tempo <= 0) tempo = 150; }
  var noteElem, syllable;
  window.playScore = function(score, firstPitch){
    if(!firstPitch) firstPitch = 48;
    if(firstPitch.toInt) firstPitch = firstPitch.toInt();
    window.clearTimeout(timeoutNextNote);
    if(syllable) {
      syllable.classList.remove('active');
      syllable = null;
    }
    var originalSvg = score.svg;
    var dropCap = $('text', originalSvg)[0];
    if(dropCap)
      dropCap.classList.add('active');
    var noteId = 0;
    var notes = [].concat.apply([],score.notations.map(function(notation) { return notation.notes || notation; }));
    transpose = firstPitch - notes[0].pitch.toInt();
    _isPlaying = true;
    function playNextNote(){
      var note = notes[noteId];
      if(noteElem) noteElem.classList.remove('active');
      if(originalSvg != score.svg || note == null) {
        if(syllable) syllable.classList.remove('active');
        _isPlaying = false;
      }
      if(!_isPlaying) {
        if(dropCap) dropCap.classList.remove('active');
        return;
      }
      var duration = 1;
      if(note.constructor != exsurge.Note) {
        while(note.constructor != exsurge.Note && (!note.isDivider || note.constructor === exsurge.QuarterBar)) {
          if(!(note = notes[++noteId])) return;
        }
        if(note.isDivider) {
          if(syllable) syllable.classList.remove('active');
          if(note.constructor === exsurge.FullBar || note.constructor === exsurge.DoubleBar) {
            duration = 2;
          } // otherwise (for half bar) duration is default of 1.
        }
      }
      noteElem = note.svgNode;
      if(noteElem) {
        if(noteElem.attributes.getNamedItem('href').value == '#None') {
          noteElem = noteElem.previousSibling;
        }
        noteElem.classList.add('active');
        var tmpSyllable = $(noteElem).parent().parent().find('text')[0];
        if(tmpSyllable && tmpSyllable != syllable) {
          if(dropCap && syllable) dropCap.classList.remove('active');
          if(syllable) syllable.classList.remove('active');
          syllable = tmpSyllable;
          if(syllable) syllable.classList.add('active');
        }
      }
      if(note.constructor === exsurge.Note) {
        var nextNote = notes[noteId + 1];
        if(nextNote && nextNote.constructor != exsurge.Note) nextNote = null;
        var prevNote = notes[noteId - 1];
        if(prevNote && prevNote.constructor != exsurge.Note) prevNote = null;
        if(note.morae.length) {
          duration = 2;
        } else if(nextNote && (nextNote.morae.length > 1 || nextNote.shape == exsurge.NoteShape.Quilisma || (note.ictus && prevNote && (note.pitch.toInt() - prevNote.pitch.toInt() == 7) && (nextNote.pitch.toInt() - note.pitch.toInt() == 1)))) {
          duration = 1.8;
        } else if(note.episemata.length) {
          var episemataCount = 1;
          if(prevNote && prevNote.episemata.length) ++ episemataCount;
          if(nextNote && nextNote.episemata.length) ++ episemataCount;
          duration += 0.9 / episemataCount;
        }
        var noteNeume = noteElem.parentNode.parentNode.source;
        var nextNoteNeume = nextNote && nextNote.svgNode.parentNode.parentNode.source;
        var nextNoteIsForSameSyllable = nextNote && (noteNeume == nextNoteNeume || nextNoteNeume.lyrics.length == 0);
        var nextNoteIsSamePitchDifferentSyllable = !nextNoteIsForSameSyllable && nextNote && note.pitch.toInt() == nextNote.pitch.toInt();
        var durationMS = duration * 60000 / tempo - tones.attack;
        var options = nextNoteIsSamePitchDifferentSyllable? {release: durationMS} : {length: durationMS, release: tones.attack};
        playPitch(note.pitch, options);
      }
      ++noteId;
      if(noteId >= notes.length) _isPlaying = false;
      timeoutNextNote = window.setTimeout(playNextNote, duration * 60000 / tempo);
    };
    timeoutNextNote = window.setTimeout(playNextNote);
  };
  window.stopScore = function(){
    _isPlaying=false;
  }
  window.removeChantContextMenus = function() {
    $('[part] use[source-index].active,[part] text[source-index]:not(.dropCap).active').each(function(){ this.classList.remove('active'); });
    $('.chant-context').remove();
    $('.btn-group.open').removeClass('open');
  }
})(window);

$(function($) {
  var gregobaseUrlPrefix = 'http://gregobase.selapa.net/chant.php?id=';
  $(document).on('click', function() {
    removeChantContextMenus();
    stopScore();
  }).on('click', 'svg text.dropCap', function(e) {
    e.stopPropagation();
    removeChantContextMenus();
    var $this = $(this);
    var $div = $this.parents('div').first();
    var gregoBaseId = $div.attr('gregobase-id');
    var score = $this.parents('svg').prop('source');
    var lowPitch = 100000, highPitch = 0;
    var startPitch = null;
    score.notations.forEach(function(notation) {
      if(notation.notes) notation.notes.forEach(function(note) {
        var pitch = note.pitch.toInt()
        if(startPitch == null) startPitch = pitch;
        lowPitch = Math.min(lowPitch, pitch);
        highPitch = Math.max(highPitch, pitch);
      });
    });
    // default to putting the middle pitch at G above middle C
    score.defaultStartPitch = score.defaultStartPitch || new exsurge.Pitch(startPitch + ((4 * 12 + 7) - Math.floor((lowPitch + highPitch) / 2)));
    var $toolbar = $('<div>').addClass('chant-context btn-group-vertical');
    if(gregoBaseId) {
      $toolbar.append($('<a>').attr('target','_blak').attr('href',gregobaseUrlPrefix + gregoBaseId).addClass('btn btn-success').html('<span class="glyphicon glyphicon-share-alt"></span> GregoBase'));
    }
    function changePitch(offset) {
      score.defaultStartPitch = new exsurge.Pitch(score.defaultStartPitch.toInt() + offset);
      $toolbar.find('.start-pitch').text(tones.noteName[score.defaultStartPitch.step]);
    }
    $toolbar.append($('<button>').addClass('btn btn-primary').html('<span class="glyphicon glyphicon-play"></span> Play').click(function(e) {
      e.stopPropagation();
      playScore(score, score.defaultStartPitch);
      $toolbar.remove();
    }));
    $toolbar.append($('<button class="btn btn-success"><span class="glyphicon glyphicon-arrow-up"></span></button>').click(function(e) {
      e.stopPropagation();
      changePitch(1);
    }));
    var stopTone;
    $toolbar.append($('<button>').addClass('btn btn-info').html('Starting Pitch: <span class="start-pitch">' + tones.noteName[score.defaultStartPitch.step] + '</span>').click(function(e) {
      e.stopPropagation();
    }).mousedown(function() {
      stopTone = tones.play(score.defaultStartPitch, {start: true});
    }).mouseup(function() {
      stopTone && stopTone();
      stopTone = null;
    }));
    $toolbar.append($('<button class="btn btn-success"><span class="glyphicon glyphicon-arrow-down"></span></button>').click(function(e) {
      e.stopPropagation();
      changePitch(-1);
    }));
    $toolbar.appendTo(document.body);
    var staffTop = $this.parent().offset().top,
        toolbarWidth = $toolbar.outerWidth(),
        left = $this.offset().left + ( $this.width() - toolbarWidth) / 2,
        bodyWidth = $(document.body).outerWidth();
    if(left < 8) left = 8;
    if(left + toolbarWidth > bodyWidth - 8) left = bodyWidth - 8 - toolbarWidth;
    $toolbar.offset({
      top: staffTop - $toolbar.outerHeight(),
      left: left
    });
  });
});