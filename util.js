var linkSelector="";
var linkDownloadSelector="";
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
        .attr("href",url)
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
var regexHeaderLine = /^([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i;
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
        if(this[match[1]]) {
          var arrayName=match[1]+'Array';
          if(!this[arrayName]){
            this[arrayName] = [this[match[1]]];
          }
          this[arrayName].push(match[2]);
        } else {
          this[match[1]]=match[2];
        }
      } else if((match = regexHeaderComment.exec(line))){
        if(line!='%%'){
          match = regexHeaderLine.exec(line.slice(1));
          if(match){
            this.cValues[match[1]]=match[2];
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