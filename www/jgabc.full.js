String.prototype.repeat = function(num){return new Array(num+1).join(this);};
String.prototype.reverse = function(){return this.split('').reverse().join('');};
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
if(!String.prototype.trimRight) String.prototype.trimRight = function(){return this.replace(/\s+$/,'');};
var gabcSettings={trimStaff:true,showSyllableEditorOnHover:true,showSyllableEditorOnClick:true};
var uuid;
// lower-staff ext: 0xe1, upper: 0xe2
var _indicesChar = {
  flat:    [0xE0F1,0xe340,0xE0F2,0xe341,0xE0F3,0xe342,0xE0F4,0xe343,0xE0F5,0xe344,0xE0F6,0xe345,0xE0F7],
  natural: [0xE0F9,0xe346,0xE0FA,0xe347,0xE0FB,0xe348,0xE0FC,0xe349,0xE0FD,0xe34A,0xE0FE,0xe34B,0xE0FF],
  flat_line: 0xe340,  // these only exist for lines (bdfhjl)
  natural_line: 0xe346,
  punctum: 0xE103,
  diamond: 0xE113,
  virga: 0xE123,
  v: 0xE123,
  leftVirga: 0xE133,
  quilisma: 0xE143,
  w: 0xE143,
  bottomPartPodatus: 0xE154,
  topPartPodatus: 0xE163,
  podatus: [
    null,
    0xE173,
    0xE183,
    0xE194,
    0xe1a3
  ],
  o: 0xe1b3,
  O: 0xe1c3,
  diamond_tilde: 0xe1d3,
  ">": 0xe1e3,
  "<": 0xe1f3,
  upper_tilde: 0xe203,
  lower_tilde: 0xe213,
  porrectus: [
    null,
    0xe223,
    0xe233,
    0xe243,
    0xe253
  ],
  r: 0xe273,
  s: 0xe283,
  custos: 0xe2a3,
  '+': 0xe2a3,
  dot: 0xe2b3,
  apos: 0xe2c2, //ichtus
  ictus: 0xe2c2,
  ictus_above:0xe2c5,
  ictus_below:0xe2c2,
  underscore: 0xe2d2,
  episema: 0xe2d2,
  episema_below:0xe2d2,
  episema_above:0xe2d5,
  underscore_longer: 0xe2e2,
  episema_longer: 0xe2e2,
  clivis: [
    null,
    0xe303,
    0xe313,
    0xe323,
    0xe333
  ],
  accent_above_staff: 0xe34c, // four different heights
  connecting_line: [
    undefined,
    undefined,
    0xe703,
    0xe713,
    0xe723,
    0xe733
  ],
  decorative_line: [
    undefined,
    0xe743,
    0xe753,
    0xe763,
    0xe773,
    0xe783
  ]
};
var vCodes = {
  Abar: 'a',
  Vbar: 'v',
  Rbar: 'r'
};
// var _indicesLig = {
//   flat: 'b', // these only exist for spaces (acegikm)
//   natural: 'a', // ditto
//   punctum: 'p',
//   diamond: 'n',
//   virga: 'v',
//   v: 'v',
//   leftVirga: 'c',
//   quilisma: 'q',
//   w: 'q',
//   podatus: 'P',
//   bottomPartPodatus: 0xE154,
//   topPartPodatus: 'P',
//   o: 'o',
//   O: 'O',
//   diamond_tilde: 'N',
//   ">": 'L',
//   "<": 'k',
//   upper_tilde: 'K',
//   lower_tilde: 'l',
//   porrectus: 'R',
//   r: 'w',
//   s: 's',
//   custos: 'u',
//   '+': 'u',
//   dot: '.',
//   apos: 'I', //ichtus
//   ictus: 'I',
//   ictus_above: 'I',
//   ictus_below: 'i',
//   underscore: 'H',
//   episema: 'H',
//   episema_above: 'H',
//   episema_below: 'h',
//   underscore_longer: 0xe2e2,
//   episema_longer: 0xe2e2,
//   clivis: 'C',
//   accent_above_staff: '~', // four different heights
//   connecting_line: 'x',
//   decorative_line: 'X'
// };
var fontclass = "goudy"
// var _neumeLig=function(a,b){
//   if(arguments.length<2)return"";
//   if(typeof(a)!=="string") {
//     if(arguments.length==2 && typeof(a)=="number"){
//       return _neumeChar(a,b);
//     }
//     return"";
//   }
//   var result='';
//   var i=1;
//   while(i<arguments.length){
//     result += _ci[arguments[i++]];
//   }
//   return result + a;
// }
var _neumeChar=function(a,b){
  if(arguments.length<2)return"";
  var base=a;
  var a,b;
  a=parseInt(b);
  b=0;
  if(typeof(base)=='object'){
    if(arguments.length>2)b=parseInt(arguments[2]);
    base=base[Math.abs(b-a)];
    if(arguments.length==2)a=0;
  }
  return String.fromCharCode(base + a);
}

// var _clefSpanLig=function(tone){
//   var line = parseInt(tone.clef.slice(-1),10);
//   var num=line*2-1;
//   var extra="";
//   if(tone.clef.length==3) {
//     extra += neume(indices.flat,num+1) + "-";
//   }
//   return make('tspan',String(num) + (tone.index==2? "d" : "f") + "-" + extra);
// }
var _clefSpanChar=function(tone,minDy){
  var result,
      line = parseInt(tone.clef.slice(-1),10),
      dy = 0,
      curChar;
  if(tone.index == 2) {
    curChar = "d-";
    dy = 2 - line;
  } else {
    curChar = "f-";
    dy = 3 - line;
  }
  if(tone.clef.length==3) {
    curChar += neume(indices.flat,4) + "-";
  }
  dy *= spaceheight;
  minDy[0] = Math.min(minDy[0],dy);
  result=make('tspan',curChar);
  result.setAttribute('dy', dy);
  return result;
}

var _ci=['B','A','0','1','2','3','4','5','6','7','8','9','Z'];
var staffheight = 48;
var spaceheight = staffheight / 4;
var notewidth = staffheight / 6;
var spaceBetweenNeumes = notewidth;
var slashSpace = staffheight/20;
var verticalSpace = staffheight/4;
var fontsize = spaceheight*3/2;
var spaceWidth = spaceheight * 3/4;
var staffoffset = Math.ceil(staffheight - spaceheight/2);
var svgns = "http://www.w3.org/2000/svg";
var xlinkns="http://www.w3.org/1999/xlink";
var staffInFont = false;
var fontExt='ttf';
var fontExtS='svg#webfont';
var fontFormat="truetype";
var fontFormatS="svg";
var filenameCaeciliae = "Caeciliae-" + (staffInFont? "Regular." : "Staffless.")+fontExt;
var filenameCaeciliaeS = "Caeciliae-" + (staffInFont? "Regular." : "Staffless.")+fontExtS;
var filenameCaeciliaePrint = "Caeciliae-" + (staffInFont? "Regular" : "Staffless")+"-Print."+fontExt;
var localCaeciliae = "Caeciliae" + (staffInFont? "" : " Staffless");
var familyCaeciliae = "Caeciliae" + (staffInFont? "" : " Staffless");
var styleCaeciliae = "font-family: '"+familyCaeciliae+"'; font-size:" + staffheight + "px;";
var styleCaeciliaeSvg="font-family: '"+familyCaeciliae+" SVG'; font-size:" + staffheight + "px;";
var styleGoudy = "font-family: 'Crimson Text';" + " font-size: " + fontsize + "px;";

var styleFont="@font-face {font-family: '"+familyCaeciliae+"'; font-weight: normal; font-style: normal;src: local('"+localCaeciliae+"'); src: url('"+filenameCaeciliae+"') format('"+fontFormat+"')}"
        + "@font-face {font-family: '"+familyCaeciliae+" SVG'; font-weight: normal; font-style: normal;src: url('"+filenameCaeciliaeS+"') format('"+fontFormatS+"')}"
        + "@font-face {font-family: '"+familyCaeciliae+" Print'; font-weight: normal; font-style: normal;src: url('"+filenameCaeciliaePrint+"') format('"+fontFormat+"')}"
        + "@font-face { font-family: 'Crimson Text'; src: url('fonts/crimson-bold-webfont.woff2') format('woff2'), url('fonts/crimson-bold-webfont.woff') format('woff'); font-weight: bold; font-style: normal; }"
        + "@font-face { font-family: 'Crimson Text'; src: url('fonts/crimson-italic-webfont.woff2') format('woff2'), url('fonts/crimson-italic-webfont.woff') format('woff'); font- weight: normal; font-style: italic; }"
        + "@font-face { font-family: 'Crimson Text'; src: url('fonts/crimson-roman-webfont.woff2') format('woff2'), url('fonts/crimson-roman-webfont.woff') format('woff'); font- weight: normal; font-style: normal; }";

var svgWidth;
var _svg,svg;
var textElem;
var codea = 'a'.charCodeAt(0);
var codem = codea + 12;
var codeA = 'A'.charCodeAt(0);
var codeM = codeA + 12;
var regexLatinLongPenult = /([ao]e|au|[aeiouyāēīōūȳăĕĭŏŭäëïöüÿ])(?!([bcdgkpt][rl]|qu|[bcdfghjklmnprstvy])[aeiouyāēīōūȳăĕĭŏŭäëïöüÿ])((?:[bcdfghjklmnprstvy]{2,}|[xz])(?:[ao]e|au|[aeiouyāēīōūȳăĕĭŏŭäëïöüÿ])[bcdfghjklmnprstvxyz]*)$/i;
var regexTranslate=/translate\((-?\d+(?:\.\d+)?)(?:[,\s]\s*(-?\d+(?:.\d+)?))?\)/;
var regexTranslateG=/translate\((-?\d+(?:\.\d+)?)(?:[,\s]\s*(-?\d+(?:.\d+)?))?\)/g;
var regexHeaderEnd=/(?:^|\n)%%\s?\n/;
var regexOuter = /((([^\(\r\n]+)($|\())|\()([^\)]*)($|\))(?:(\s+)|(?=(?:\([^\)]*\))+(\s*))|)/g;
var regexTag = /<(\/)?(\w+)>/i;
var regexSqBrackets = /\[([^\]]*)(?:\]|$)/;
var regexTags= /(<\w+>)(.*?)(?:(<\/\1>)|$)/i;
var regexTagsSp = /<sp>([^<]*)<\/sp>/gi;
var spSubstitutions = {
  "'ae": 'ǽ',
  "'æ": 'ǽ',
  "ae": 'æ',
  "oe": 'œ',
  "'œ": 'œ',
  "'oe": 'œ',
  "AE": 'Æ',
  "OE": 'Œ',
  "Ae": 'Æ',
  "Oe": 'Œ',
  "V/": 'V',
  "R/": 'R',
  "A/": 'A'
};
String.prototype.replaceSpTags = function(){
  return this.replace(regexTagsSp,function(s){
    var tmp = s.slice(4,-5);
    return spSubstitutions[tmp]||tmp;
  });
}
var regexInner = /[!\/ ,;:`]+|(([^\)!\/ ,;:`\[]+)(\[[^\]]*(?:$|\]))?)+/g;
var rog = {
  syl:3,
  gabc:5,
  whitespace:7
}
var linkSelector="";
var linkDownloadSelector="";
var setPdfLinkSelector=function(sel){
  linkSelector=sel;
};
var onDragStart=function(e){
  console.info(e);
  e.originalEvent.dataTransfer.setData("DownloadURL",this.getAttribute("data-downloadurl"));
};
var setGabcLinkSelector=function(sel){
  linkDownloadSelector=sel;
  $(sel).bind("dragstart",onDragStart);
};
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


//var regexVowel = /(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[iy])?([aá]u|[ao][eé]?|[aeiouyáéëíóúýæœ])/i;
//var regexVowel = /(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[iy])?([aá]u|[ao][eé]?|[aeiouyáéëíóúýæœ])/i;
var regexVowel = /(?:[cgq]u|[iy])?([aeiouyáäąéëęíïóöúüýÿǽæœ́œ]+)/i;
var transforms = [['/',' ',',',';',':','`',''],
      ["'",'_','+',';','|',',',''],
      [/\//g,/ /g,/,/g,/;/g,/:/g,/`/g,/!/g]];
var abcs = {};
var _defs = null;
var defText = null;
var _defText = null;
var defChant = null;
var masks = [];
var selectedPunctum=-1;
var selectedNeume=-1;
var selectedPunctumTag=null;
var selectedNeumeTag=null;
var selectedNeumeTextTag=null;
var syllableGabcIndex = -1;
var syllableGabcPrefix='';
var syllableGabcSuffix='';
var syllableGabcOriginalLength=0;
var syllableTextIndex = -1;
var syllableTextPrefix='';
var syllableTextSuffix='';
var syllableTextOriginalLength=0;
var syllableTextTag=null;
var syllableOffsetCorrection = {};
var _timeoutGabcUpdate = null;
var _minUpdateInterval = 1700;
var _heightCorrection = 0;

var utf8_bom=String.fromCharCode(0xEF)+String.fromCharCode(0xBB)+String.fromCharCode(0xBF);
function encode_utf8( s )
{
  return utf8_bom+unescape( encodeURIComponent( s ) );
}
function decode_utf8( s )
{
  return decodeURIComponent( escape( s ) );
}

function Header(text){
  if(typeof(text)!='string') text='';
  this.comments=[];
  this.cValues={};
  this.original='';
  var match=text.match(regexHeaderEnd);
  if(match){
    var txtHeader = this.original = text.slice(0,match.index+match[0].length);
    var lines = txtHeader.split(/\r?\n/g);
    for(var i=0; i<lines.length; ++i){
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
Header.prototype.toString = function(){
  var result=[];
  for(key in this){
    if(key=='length' || key=='original' || key=='comments' || key=='cValues' || (typeof this[key])!="string")continue;
    var array = this[key+'Array'];
    if(array) {
      for(var i=0; i<array.length; ++i) {
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
var regexHeaderLine = /^([\w-_]+):\s*([^;\r\n]*)(?:;|$)/i;
var regexHeaderComment = /^%.*/;
function getHeader(text){
  return new Header(text);
}
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
var gabcProcessTime = 0;
var _nextUpdate = new Date().getTime();
var dontUpdateChant = false;
var otherElements = [];
function updateChant(text, svg, dontDelay) {
  var originalSvg = svg;
  var $svg = $(svg);
  if(!$svg.is('svg')) {
    $svg = $svg.find('svg');
    if(!$svg.length) {
      $svg = $(_svg).clone().appendTo(svg);
    }
    svg = $svg[0];
  }
  if(svg != _svg && otherElements.indexOf(svg)<0 && originalSvg){
    otherElements.push(originalSvg);
  }
  if(dontUpdateChant || !text)return;
  var gtext=updateLinks(text);
  if(_timeoutGabcUpdate) clearTimeout(_timeoutGabcUpdate);
  if(!dontDelay) {
    var delay = gabcProcessTime+100;
    _timeoutGabcUpdate = setTimeout(function() {updateChant(text,svg,true);},delay);
    return;
  }
  _nextUpdate = new Date().getTime() + 100 + gabcProcessTime;
  var startTime=new Date();
  text=gtext;
  _timeoutGabcUpdate = null;
  var old = $(svg).find(">g")[0];
  if(!old) return;
  var top=[0];
  var newElem = getChant(text,svg,old,top);
  //svg.replaceChild(newElem,old);
  var height = newElem.getBBox().height + top[0] + _heightCorrection - _defText.getExtentOfChar("q").height;
  $(svg).height(height);
  //svg.setAttribute('height',height);
  if(svg.parentNode.tagName.match(/span/i)){
    $(svg).css('width',newElem.getBBox().width);
  }
  gabcProcessTime = new Date() - startTime;
  console.info("Update chant time: " + gabcProcessTime);// + "; height: " + _ht + "; correction: "+_heightCorrection);
  if(gabcProcessTime > 3000) gabcProcessTime=3000;
}

function make(tag,innerText,attributes) {
  var result=document.createElementNS(svgns,tag);
  if(innerText)result.appendChild(document.createTextNode(innerText));
  if(attributes) {
    switch(typeof(attributes)) {
      case 'string':
        result.setAttribute('class',attributes);
        break;
      case 'object':
        for(a in attributes){
          result.setAttribute(a,attributes[a]);
        }
        break;
    }
  }
  return result;
}

var _txtWidths={};

//returns the width of txt.
// txt can be a string, array of TagInfo objects, or a TSpan tag object.
// if txt is not a string, clas and special can be an index and length to get the width of a substring.
function textWidth(txt,clas,special) {
  var i=0;
  var len=undefined;
  if(txt.length===0)return 0;
  if(typeof(clas)=="number" && typeof(special)=="number"){
    i=clas;
    len=special;
    clas='goudy';
    special=undefined;
    if(len===0)return 0;
  }
  var dt=special?_defText:defText;
  if($.isArray(txt)){
    var tw;
    var key;
    if(txt.length==1 && txt[0].tags.length==0) {
      txt = txt[0].text;
      if(txt.length==0) return 0;
      if(clas==undefined)clas="";
      if(i==0 && !len && (key=clas+","+txt) && (tw=_txtWidths[key])) return tw;
    } else {
      if(i==0 && !len && (key=JSON.stringify(txt)) && (tw=_txtWidths[key])) return tw;
      $(dt).empty();
      var wid=0;
      var idx=0;
      txt.forEach(function(e){
        var tmp=e.span();
        dt.appendChild(tmp);
        var sIndex=Math.max(i,idx);
        var txtLen = tmp.textContent.length;
        var tlen=Math.min(idx+txtLen,i+(len||1000000))-sIndex;
        sIndex-=idx;
        idx+=txtLen;
        try {
          if(tlen>0&&sIndex>=0)wid+=tmp.getSubStringLength(sIndex,tlen);
        } catch(exception){
          console.warn(exception);
        }
      });
      if(key)_txtWidths[key]=wid||dt.getComputedTextLength();
      return wid;
    }
  } else if(typeof(txt)=="object") {
    if(txt.childNodes.length==1) {
      var temp=txt.firstChild;
      var key=$(temp).attr("class").replace(new RegExp('(?:^|\\s)'+fontclass+'(?:\\s|$)|\\s+$','g'),'') + "," + temp.textContent;
      var tw=_txtWidths[key];
      if(tw)return tw;
    }
    //txt is a span object hopefully
    $(dt).empty().append($(txt).clone());
    var wid=dt.getComputedTextLength();
    if(key)_txtWidths[key]=wid;
    return wid;
  }
  if(clas)dt.setAttribute("class", clas);
  $(dt).text(txt.replace(/ /g,'\u00a0'));
  var wid=dt.getSubStringLength(i, len||txt.length);
  if(key)_txtWidths[key]=wid;
  return wid;
}

function useWidth(use,idx,len) {
  if(use.tagName.match(/^use$/i))use = document.getElementById(use.getAttribute('href').slice(1));
  if(typeof(idx)=="undefined"){
    return getChantWidth(use.textContent);
  } else {
    // Go through the tspan elements until we get to idx.
    var id=0;
    var tmp='';
    var mostRecent='';
    var result=[];
    for(var i = 0; i < use.childNodes.length; ++i){
      var cNode = use.childNodes[i];
      if(id>=idx ){
        if(result.length==0 && getChantWidth(cNode.textContent)<=2){
          tmp = tmp.slice(0,0-mostRecent.length);
        } else mostRecent='';
        result.push(getChantWidth(tmp));
        if(result.length==2)return result;
        tmp=mostRecent;
        idx += len;
      }
      tmp += cNode.textContent;
      mostRecent=cNode.textContent;
      id+=1;
    }
    result.push(getChantWidth(tmp));
    return result;
  }
}

function getChantWidth(text) {
  defChant.textContent=text;
  return defChant.getComputedTextLength();
}

function selectGabc(start,len,svg){
  var e = $('#' + $(svg).parent().attr('for'));
  if(e.length==0) e = $('#editor');
  start+=getHeaderLen(e.val());
  if(e.is(':visible')){
    e=e[0];
  } else {
    e = $("#hymngabc")[0];
    var i=0,j;
    for(j in _hymnGabcMap){
      if(!_hymGabcMap.hasOwnProperty(j)) continue;
      if(j>start)break;
      i=_hymnGabcMap[j] + start - j;
    }
    start = i;
  }
  if(len == -1) {
    var m = $(e).val().slice(start).match(/^[^) ]*/);
    len = m[0].length;
  }
  e.select(start,len);
  e.selectionStart=start;
  e.selectionEnd=start+len;
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

function tagsForText(txtArray,activeTags){
  if(typeof(txtArray)=="string")txtArray=[txtArray];
  var result=[];
  var txt=txtArray[0];
  if(!activeTags)activeTags=[];
  var tm;
  while(tm = regexTag.exec(txt)) {
    var temp=txt.slice(0,tm.index);
    if(temp.length>0)result.push(new TagInfo(temp,activeTags));
    if(tm[1] != "/") {
      if(activeTags.indexOf(tm[2]) < 0) {
        activeTags.push(tm[2]);
      }
    }
    else {
      var idx = activeTags.indexOf(tm[2]);
      if(idx>=0)activeTags.splice(idx,1);
    }
    var lastIndex = tm.index + tm[0].length;
    txt = txt.slice(lastIndex);
  }
  txtArray[0]=txt;
  return result;
}

function TagInfo(txt,tags) {
  this.tags = $.merge([],tags||[]);
  this.text = txt.replace(/ /g,'\u00a0');  //(\u00a0 == nbsp)
  if(tags && tags.indexOf('v')>=0){
    this.span = this.spanV;
    this.spans = [];
    var txt='';
    var strings = this.text.match(/\\[^\\\s]*|[^\\]+/g);
    for(var i=0; i<strings.length; ++i) {
      var s = strings[i];
      if(s[0] == '\\') {
        s = s.slice(1);
        var code = vCodes[s];
        if(code) {
          this.spans.push({txt:code});
          txt += code;
          continue;
        }
      }
      this.spans.push(s);
      txt += s;
    }
    this.text = txt;
  }
};
TagInfo.prototype.span = function(){
  var result=make('tspan',this.text, fontclass + ' ' + this.tags.join(" "));
  return result;
};
TagInfo.prototype.spanV = function(){
  var c = fontclass + " " + this.tags.join(" ");
  var result = make('tspan','',c);
  for(var i=0; i<this.spans.length; ++i) {
    var s = this.spans[i];
    switch(typeof(s)) {
      case 'object':
        result.appendChild(make('tspan',s.txt,'versiculum'));
        break;
      case 'string':
        result.appendChild(document.createTextNode(s));
        break;
    }
  }
  return result;
}

//This function will update the height and y offset of the staff once there is no more chant to be put on it, based on htone and ltone
var finishStaff=function(curStaff){
  var result=curStaff.parentNode;
  var line = parseInt(curStaff.id.match(/\d+$/)[0]);
  var staffInfo=curStaff.info;
  var ltone=staffInfo.ltone;
  var htone=staffInfo.htone;
  ltone = (3 - ltone);
  ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
  htone = (htone - 9);
  htone = (htone <= 0)? 0 : ((htone * spaceheight)/2);
  var y = Math.ceil(0.1*staffheight + fontsize + ltone + htone);
  staffInfo.vOffset = staffInfo.y;
  if(staffInfo.txtInitial)staffInfo.txtInitial.setAttribute('y',y + staffInfo.y);
  if(staffInfo.txtAnnotation)staffInfo.txtAnnotation.setAttribute('y',staffInfo.y+Math.ceil(htone)-25);
  staffInfo.eText.setAttribute("y",y);
  staffInfo.eTrans.setAttribute('y',y+fontsize);
  
  staffInfo.eText.setAttribute("transform", "translate("+staffInfo.x+","+staffInfo.vOffset+")");
  staffInfo.eText.setAttribute("class", "system"+line);
  staffInfo.eTrans.setAttribute("transform", "translate("+staffInfo.x+","+staffInfo.vOffset+")");
  staffInfo.eTrans.setAttribute("class", "system"+line);
  if(result){
    var $result = $(result);
    $result.append($result.children('text'));
    result.appendChild(staffInfo.eText);
    result.appendChild(staffInfo.eTrans);
  }
  if(staffInfo.eTrans.childNodes.length>0){
    y += fontsize;
  }
  if(htone>0) {
    staffInfo.vOffset += htone;
    if(line==0) {
      var heightCorrection = 0;
      $(curStaff).children("[id^=neume]").each(function(){
        heightCorrection = Math.min(heightCorrection,this.neume.info.mindy);
      });
      _heightCorrection = heightCorrection + htone;
    }
    curStaff.setAttribute("transform","translate("+staffInfo.x+", " + (staffInfo.y + htone) + ")");
  }
  return y;
}

//This function will trim the width of the staff to lign up with the last element on it.
var trimStaff=function(curStaff,width){
  var x;
  var staffUse=$(curStaff).find("use[href=#staff]");
  if(width){
    x = width;
  } else {
    var lastUse=$(curStaff).find("[id^=neume]:last");
    var lastText=$(curStaff.parentNode).find("[id^=neumetext]:last");
    href=lastUse.attr("href");
    if(href) {
      if(!/\:$/.exec(href))return;
    } else if(!/\|$/.exec(lastUse.text()))return;
    var neumeId = /\d+$/.exec(lastUse.prop('id'))[0];
    var textId = /\d+$/.exec(lastText.prop('id'))[0];
    if(textId > neumeId)return;
    x=parseFloat(lastUse.attr("x"));
    var transform=lastUse.attr("transform");
    var m = regexTranslate.exec(transform);
    if(m && m[1])x += parseFloat(m[1]);
    x += lastUse[0].neume.wChant;
  }
  var scale="scale("+x+",1)";
  staffUse.attr("transform",function(index,transform){
    return transform.replace(/scale\([^\)]*\)/,scale);
  });
}
var justifyLine=function(curStaff,useNeumeX,justCommit){
  var currentX=0;
  var x2=0;
  var words=curStaff.words;
  if(!justCommit){
    var endSpace=2*spaceBetweenNeumes;
    x2=svgWidth - curStaff.info.x - endSpace;
    var lastUse,lastTspan;
    var i=words.length-1;
    while(i>=0 && !(lastUse && lastTspan)){
      var cWord=words[i--];
      var j=cWord.length-1;
      while(j>=0 && !(lastUse && lastTspan)){
        var tag=cWord[j--];
        if(!lastUse && tag.tagName.match(/^use|text$/i) && tag.neume){
          lastUse = tag;
          continue;
        } else if(!lastTspan && tag.tagName.match(/^tspan$/i)){
          lastTspan=tag;
          continue;
        }
      }
    }
    if(lastUse){
      if(useNeumeX) {
        currentX = lastUse.neume.x + (lastUse.neume.transformX || 0);
      } else {
        currentX=parseFloat($(lastUse).attr("x"));
        var transform=useNeumeX?lastUse.neume.transform : $(lastUse).attr("transform");
        var m = regexTranslate.exec(transform);
        if(m && m[1])currentX += parseFloat(m[1]);
      }
      currentX += lastUse.neume.wChant;
    }
    if(lastTspan){
      var tmpX;
      if(useNeumeX && lastTspan.neume){
        tmpX=lastTspan.neume.x;
      } else {
        tmpX=parseFloat($(lastTspan).attr("x"));
        tmpX += textWidth(lastTspan) - endSpace;
      }
      currentX=Math.max(currentX,tmpX);
  //      console.info(tmpX==currentX?lastTspan:lastUse);
    }
  }
  if(justCommit || currentX>0){
    var extraSpace=x2-currentX;
    var len=words.length-1;
    var delta=extraSpace/len;
    if(justCommit || extraSpace>0) {
      while(len>=0){
        words[len].forEach(function(o){
          if(o.neume)o.neume.justifyOffset=Math.round(extraSpace);
          if($(o).attr("transform")) {
            if(useNeumeX && o.neume)$(o).attr("x", o.neume.x);
            $(o).attr("transform",function(e,cv){
              return "translate("+Math.round(extraSpace + (o.neume&&o.neume.transformX||0))+")";
            });
          } else {
            $(o).attr("x",function(e,cv){
              return (useNeumeX? o.neume.x : (cv?parseFloat(cv):0)) + Math.round(extraSpace);
            });
          }
        });
        extraSpace -= delta;
        --len;
      }
    }
  }
}
var addCustos=function(staff,cneume,justify,custosXoffset) {
  var tone = cneume.info.ftone;
  var neumeText = neume(indices.custos,tone);
  var t = staff.custos;
  if(t){
    t.textContent = neumeText;
    if(staff.custosLedger)try{staff.removeChild(staff.custosLedger);delete staff.custosLedger;}catch(e){}
  } else {
    t = make('text',neumeText);
    t.setAttribute('class',defChant.getAttribute('class'));
    t.setAttribute('y',0);
  }
  if(justify || typeof(justify)=="undefined"){
    justifyLine(staff,typeof(cneume.x)!='undefined');
    justify=true;
  }
  var x2=justify? svgWidth - staff.info.x - (staffheight/15) : custosXoffset;
  t.setAttribute('x',x2);
  staff.appendChild(t);
  staff.custos=cneume.custos=t;
  var ledgerAbove=tone>10;
  var ledgerBelow=tone<2;
  if(ledgerAbove||ledgerBelow)staff.custosLedger=cneume.custosLedger=insertLedger(ledgerAbove,staff,t,true);
}

function relayoutChant(svg, width){
  width = svgWidth = width || svg.parentNode.clientWidth;
  var $svg = $(svg),
      $svgg = $svg.children('g'),
      $tmp = $svg.find('#commentary'),
      x = 0,
      xChantMin = 0,
      staffI = 0,
      neumeI = 0,
      $staff = $svg.find('#system'+staffI),
      curStaff = $staff[0],
      $neume,
      $text,
      $trans,
      $all,
      staffInfo = $staff[0].info,
      cneume,
      pneume,
      $lastText,
      needCustos,
      defs = $svg.find("defs")[0],
      extraHeight = staffInfo.y,
      offset,
      curWord = [],
      curSyl,
      currentUse,
      words = [],
      maxX = width - staffInfo.x - spaceBetweenNeumes;
      tagsBetweenText = [];
  svg = $svg[0];
  staffInfo.ltone = 3;
  staffInfo.htone = 10;
  if($tmp.length)$tmp.attr('x',width-$tmp[0].getComputedTextLength());
  while(true){
    pneume = cneume;
    $lastText = $text;
    $neume = $svgg.find('#neume'+neumeI);
    $text = $svgg.find('#neumetext'+neumeI);
    $trans = $svgg.find('#neumetrans'+neumeI);
    cneume = $neume[0]? $neume[0].neume : ($text[0]? $text[0].neume : {match:{}});
    delete cneume.custos;
    var $mask = $svgg.find('#neumemask'+neumeI);
    $all = $().add($neume).add($text).add($trans).add($mask);
    curSyl = $all.toArray();
    currentUse = $neume.toArray().concat($mask.toArray());
    var hasLedgers = false;
    for(i in cneume.ledgers){
      if(!cneume.ledgers.hasOwnProperty(i)) continue;
      hasLedgers = true;
      break;
    }
    offset = cneume.offset || 0;
    if($all.length == 0) {
      break;
    }
    
    xChantMin += Math.min(0,offset);
    if(cneume.wChant > 0 && (x < xChantMin || !$text.length)) {
      x = xChantMin;
    } else if(pneume.lastOnLineHyphen){
      $(pneume.lastOnLineHyphen).remove();
      delete pneume.lastOnLineHyphen;
    }
    var nextXTextMin = $text.length?
        x + cneume.wText + Math.max(Math.floor(offset),0)
      : nextXTextMin||0;
    if(cneume.match[7]&&cneume.match.index>0)nextXTextMin+=5;
    var nextXChantMin = x + cneume.wChant + (cneume.spaceBeforeNextNeume || spaceBetweenNeumes) - Math.min(offset,0);
    var lastX;
    cneume.x = x;

    if(Math.max(nextXTextMin, nextXChantMin) > maxX){
      var clef = lastClefBeforeNeume(neumeI,svg);
      var wClef = clef? clef.wChant : 0;
      
      if($lastText.length && !pneume.lastOnLineHyphen && !$lastText.text().slice(-1).match(/-|\s/)){
        pneume.lastOnLineHyphen = new TagInfo('-').span();
        $lastText.append(pneume.lastOnLineHyphen);
      }
      
      nextXTextMin -= x;
      nextXChantMin -= x;
      x=0;
      xChantMin=wClef+(cneume.spaceBeforeNextNeume || spaceBetweenNeumes)+offset;
      if(cneume.wChant > 0 && x < xChantMin) {
        x = xChantMin;
      }
      nextXTextMin+=x;
      nextXChantMin+=x;
      cneume.x = x;

      // set custos and move to next system.
      ++staffI;
      if(curWord.length){
        words.push(curWord);
        curWord = [];
      }
      curStaff.words = words;
      words = [];
      tagsBetweenText = [];
      needCustos = curStaff;
      trimStaff(curStaff,width - staffInfo.x);
      var y = finishStaff(curStaff);
      $staff = $svg.find('#system'+staffI);
      if($staff.length){
        curStaff = $staff[0];
        curStaff.info.htone = 10;
        curStaff.info.ltone = 3;
      } else {
        var lineOffset = staffoffset + y + verticalSpace + staffInfo.y;
        curStaff = addStaff(svg,curStaff.parentNode,0,lineOffset,staffI, null, defs);
        curStaff.info.vOffset = curStaff.info.y;
        $staff = $(curStaff);
      }
      staffInfo = curStaff.info;
      maxX = width - staffInfo.x - (cneume.spaceBeforeNextNeume || spaceBetweenNeumes);
    }
    curWord = curWord.concat(curSyl);
    
    if($neume.length){
      staffInfo.ltone = Math.min(staffInfo.ltone, cneume.info.ltone);
      staffInfo.htone = Math.max(staffInfo.htone, cneume.info.htone);
      $staff.append($neume);
      //$neume.attr('x',x);
      //if(cneume.transform)$neume.attr('transform',cneume.transform);
      if(needCustos && !cneume.gabc.match(/^[,;:]+$/)){
        addCustos(needCustos,cneume);
        //justifyLine(needCustos,true,true);
        needCustos = null;
      }
    }

    if($trans.length){
      $trans[0].neume = cneume;
    }
    if($text.length){
      //$text.attr('x',x);
      //$trans.attr('x',x);
      $(staffInfo.eText).append($text);
      $(staffInfo.eTrans).append($trans);
      //x += $text.width();
      
      var count = tagsBetweenText.length - 1;
      if(count<=0) {
        tagsBetweenText[0]=currentUse;
      } else {
        var first = tagsBetweenText[0][0];
        var x1=first.neume.x+first.neume.wChant;
        x1 += (cneume.transformX || 0);
        var x2=x;
        if(offset<0)x2-=offset;
        var chantWidth=0;
        for(var i=1;i<=count;++i) {
          chantWidth+=tagsBetweenText[i][0].neume.wChant;
        }
        var spaceWidth=x2-x1-chantWidth;
        spaceWidth /= (count+1);
        var xx = x1 + spaceWidth;
        for(var i=1;i<=count;++i) {
          //$(tagsBetweenText[i]).attr('x',xx);
          for(var j=0; j < tagsBetweenText[i].length; ++j){
            tagsBetweenText[i][j].neume.x = xx;
          }
          xx += spaceWidth + tagsBetweenText[i][0].neume.wChant;
        }
        tagsBetweenText = [currentUse];
      }
    } else if(tagsBetweenText.length>0 && !cneume.info.ftone) {
      tagsBetweenText.push(currentUse);
      if((curWord.length==1 && curWord[0]==$neume[0]) || (curWord.length==2 && curWord[0]==$neume[0] && curWord[1]==$mask[0])){
        words.push(curWord);
        curWord=[];
      }
    }
    
    if(hasLedgers){
      processLedger(cneume,$neume[0],curWord);
    }
    if(cneume.match[7]){
      words.push(curWord);
      curWord=[];
    }
    
    x = nextXTextMin;
    xChantMin = nextXChantMin;
    
    ++neumeI;
  }
  if(curWord.length){
    words.push(curWord);
  }
  curStaff.words = words;
  justifyLine(curStaff,true,true);
  if(curStaff.custos){
    $(curStaff.custos).remove();
    curStaff.custos = undefined;
  }
  if(curStaff.custosLedger){
    $(curStaff.custosLedger).remove();
    curStaff.custosLedger = undefined;
  }
  trimStaff(curStaff,width - staffInfo.x);
  finishStaff(curStaff);
  trimStaff(curStaff);
  while($staff.length){
    ++staffI;
    $staff = $svg.find('#system'+staffI+',.system'+staffI);
    $staff.remove();
  }
  var height = $svg.children("g")[0].getBBox().height + extraHeight + _heightCorrection - _defText.getExtentOfChar("q").height;
  svg.setAttribute('height',height);
  $svg.height(height);
}

function getChant(text,svg,result,top) {
  if(!top)top=[];
  var header=text[0];
  text = text[1];
  var m = text.match(/[\r\n]\s*[-\w]+:[^;]+;\s*[\r\n]/);
  if(m)text = text.slice(0,m.index);
  var forEditor = svg.parentNode.getAttribute('for'),
      $forEditor = $('#'+forEditor);
  if(!$forEditor.is('textarea')) forEditor = $forEditor = null;
  var makeLinks=svg?(svg.parentNode&&(svg.parentNode.id=="chant-preview"||forEditor)):false;
  var defs = $(svg).find("defs")[0];
  if(!defs)defs=_defs;
  var match;
  var neumeId = 0;
  var punctumId = 0;
  var remaking=result?true:false;
  if(result){
    $(result).empty();
  } else {
    result=make('g');
    result.setAttribute("transform", "translate(0," + staffoffset + ")");
    result.setAttribute("class", "caeciliae");
  }
  svg.clefs=[];
  svg.accidentals=[];
  if(makeLinks){
    svg.tones=[];
    syllableOffsetCorrection = {};
  }
  var width = $(svg.parentNode).width();
  var userNotes = header["user-notes"];
  var commentary= header["commentary"];
  var timing = String(header.cValues.timing||'').split(' ')||[];
  var volume = String(header.cValues.volume||'').split(' ')||[];
  var curHeight = 0;
  if(typeof(userNotes)=="string" && userNotes.length>0){
    var txt = make('text',userNotes);
    txt.setAttribute('id','userNotes');
    txt.setAttribute('class',fontclass + ' i');
    txt.setAttribute('y',16-staffoffset);
    result.appendChild(txt);
    curHeight = 20;
  }
  if(typeof(commentary)=="string" && commentary.length>0){
    var txt = make('text',commentary);
    txt.setAttribute('id','commentary');
    txt.setAttribute('class',fontclass + ' i');
    txt.setAttribute('y',16-staffoffset);
    result.appendChild(txt);
    txt.setAttribute('x',width-txt.getComputedTextLength());
    curHeight = 20;
  };
  top[0]=curHeight;
  regexOuter.lastIndex = 0;
  var xoffset = 0;
  var xoffsetChantMin = 0;
  var use;
  var use2;
  var span = null;
  var spanNeume;
  var needCustosNextTime;
  var custosXoffset;
  var startX=0;
  var firstText=true;
  var lastSpan;
  var line = 0;
  var words=[];
  var currentWord=[];
  var activeTags=[];
  var clef,wClef,clefNeume;
  var needCustos = false;
  var previousMatch;
  var activeClass = fontclass;
  var usesBetweenText = [];
  var curStaff = addStaff(svg,result,0,curHeight,line, null, defs);
  var staffInfo = curStaff.info;
  try {
    var padding = $(svg.parentNode).css("padding-left");
    if(padding) width -= parseFloat(padding);
  } catch(e) { }
  svgWidth = width;
  
  while(gmatch = regexOuter.exec(text)) {
    var curGabc = gmatch[5]? gmatch[5].match(/(?:\[[^\]]*\]?|[^[\/,;:]+\/*|\/+)+|[`,;:]+/g) : [''];
    
    var spaceBeforeNextNeume;
    var matchIndex = gmatch.index;
    for(var gabcI=0; gabcI < curGabc.length; ++gabcI) {
      //TODO: first collect all data from match into the cneume object
      // so that we can have a function to process just from a cneume object
      // Put the actual text elements in the cneume object as well.
      var match = (curGabc.length == 1)? gmatch : (gabcI == 0? gmatch.slice(0,6) : ((gabcI == curGabc.length - 1)? gmatch.slice(4) : ['','']));
      if(match.length == 5) {
        match.splice(0,0,'','','','');
      }
      match.index = (matchIndex += match[1].length);
      var cGabc = curGabc[gabcI];
      matchIndex += cGabc.length;
      var slashCount = cGabc.match(/\/+$/);
      if(slashCount) {
        slashCount = slashCount[0].length;
        cGabc = cGabc.slice(0,-slashCount);
        spaceBeforeNextNeume = slashCount * slashSpace;
      } else {
        spaceBeforeNextNeume = spaceBetweenNeumes;
      }
      if(cGabc=='z0') continue; //TODO: Instead, it needs to create a custos character based on the new clef and the next actual note.
      var cneume={index:match.index,match:match,ledgers:{},wChant:0,wText:0,spaceBeforeNextNeume:spaceBeforeNextNeume};
      var tags=[];
      cneume.gabc=cGabc;
      // if there is an open paren, assume that the correct close paren has not yet been marked for this GABC.
      /*
      if(cneume.gabc.indexOf('(')>=0){
        var iop=match[0].indexOf('(');
        var mspace=cneume.gabc.match(/ /);
        var gabclen=0;
        if(mspace)gabclen=mspace.index;
        cneume.gabc=cneume.gabc.slice(0,gabclen);
        if(gabclen)++gabclen;
        regexOuter.lastIndex -= match[0].length - iop - 1 - gabclen;
      }*/
      cneume.info = getChantFragment(cneume.gabc||'/',defs);
      clef=cneume.info.clef||clef;
      if(cneume.info.clef){
        svg.clefs[neumeId]=clefNeume=cneume;
        clefNeume.clefs = [];
        svg.accidentals[punctumId] = clef.length==3? -1 : null;
      }
      if(makeLinks){
        svg.tones=svg.tones.concat(cneume.info.tones);
      }
      var tContent = cneume.info.def.textContent;
      for(var i=0; i<cneume.info.tones.length; ++i) {
        var ton = cneume.info.tones[i];
        if(ton.choralSign) {
          tContent = tContent.replace(ton.choralSign,'');
        }
      }
      cneume.wChant = getChantWidth(tContent);
      if(cneume.gabc==clef)wClef=cneume.wChant;
      if(currentWord.length>0 && previousMatch && (previousMatch[7]||previousMatch[8])) {
        words.push(currentWord);
        currentWord=[];
      }
      var space = match[7]||match[8];
      var txt = match[3] || space;
      var translation = regexSqBrackets.exec(txt);
      if(translation){
        txt = txt.slice(0,translation.index) + txt.slice(translation.index + translation[0].length);
        translation = translation[1];
      }
      var originalText = txt;
      if(match[3] && space) {
        txt += space;
      }
      cneume.txt = txt;
      cneume.translation = translation;
      var offset = 0;
      if(txt) {
        if(firstText && match[3]) {
          firstText=false;
          if(header["initial-style"]!="0") {
            var initial = txt[0];
            txt = txt.slice(1);
            if(txt.replace(/[{}]/g,'').length==0)txt='-';
            var txtInitial = staffInfo.txtInitial = make('text',initial);
            txtInitial.setAttribute('transform','translate(0,'+staffInfo.vOffset+')');
            if(makeLinks && neumeId==selectedNeume) {
              txtInitial.setAttribute('class','greinitial selectable selected neume'+neumeId + ' ' + fontclass);
            } else {
              txtInitial.setAttribute('class','greinitial ' + (makeLinks? 'selectable ' : '') + 'neume'+neumeId+ ' ' + fontclass);
            }
            result.appendChild(txtInitial);
            var lenInitial=txtInitial.getComputedTextLength();
            var annotation = header["annotation"];
            if(typeof(annotation)=="string" && annotation.length>0){
              var m=/([a-g]\d?\*?\s*)$/.exec(annotation);
              var suffix='</sc>';
              if(m){
                annotation=annotation.slice(0,m.index);
                suffix+=m[0];
              }
              annotation = annotation.replace(/\b[A-Z\d]+\b/,function(s){return s.toLowerCase();}) + suffix;
              var txtAnnotation = staffInfo.txtAnnotation = make('text');
              var tagsAnnotation = tagsForText('<sc><v>'+annotation+'</v></sc>');
              for(var i=0; i < tagsAnnotation.length; ++i){
                txtAnnotation.appendChild(tagsAnnotation[i].span());
              }
              txtAnnotation.setAttribute('class','greannotation');
              txtAnnotation.setAttribute('y',staffInfo.vOffset-25);
              result.appendChild(txtAnnotation);
              var lenAnnotation=txtAnnotation.getComputedTextLength();
              var centerX = Math.max(lenAnnotation,lenInitial) / 2;
              txtAnnotation.setAttribute('x',centerX-(lenAnnotation/2));
              txtInitial.setAttribute('x',centerX-(lenInitial/2));
              startX=Math.max(lenAnnotation,lenInitial)+5;
            } else {
              startX=lenInitial + 5;
            }
            staffInfo.eText.setAttribute("transform", "translate("+startX+","+staffInfo.vOffset+")");
            staffInfo.eTrans.setAttribute("transform", "translate("+startX+","+staffInfo.vOffset+")");
            staffInfo.x=startX;
            var useStaff = $(curStaff).find("use[href=#staff]")[0];
            useStaff.setAttribute("transform", "scale(" + (width-startX) + ",1)");
          }
        }
        txt = txt.replace(/^\s+/,'').replace(/\r\n/g,' ').replace(/\n/g,' ').replace(/<v>(?:\\greheightstar|\$\\star\$)<\/v>/g,'*').replaceSpTags();
        
        var tmpArray=[txt];
        tags = tagsForText(tmpArray,activeTags);
        txt=tmpArray[0];
        var pretext="";
        if(tags.length>0)tags.forEach(function(e){pretext+=e.text;});
        if(txt.length>0){
          var newTxt = txt.replace(/[{}]/g,'');
          if(newTxt.length > 0) tags.push(new TagInfo(newTxt,activeTags));
        }
        txt = pretext+txt;
        cneume.wText = textWidth(tags);
        if(txt) {
          var obi=txt.indexOf('{'), //opening brace index
              cbi=txt.indexOf('}'), //closing brace index
              vowel;
          if(obi>=0 && cbi>obi){
            var tmp=txt.slice(obi+1,cbi);
            txt=txt.slice(0,obi) + tmp + txt.slice(cbi+1);
            --cbi;
            vowel = {index:obi, "0":tmp, "1":tmp};
          } else if(/^english$/i.exec(header["centering-scheme"])) {
            vowel = {index: 0, "0":txt.replace(/[,.:;\s]*$/,''), "1":txt.replace(/[,.:;\s]*$/,'')};
          } else {
            vowel = regexVowel.exec(txt);
          }
          if(!vowel) {
            vowel = {index: 0, "0":txt.trimRight(), "1":txt.trimRight()};
          }
          try {
            var index = vowel.index + vowel[0].length - vowel[1].length;
            offset -= textWidth(tags,0,index);
            offset -= textWidth(tags,index,vowel[1].length) / 2;
          } catch(e) {
          }
          offset += notewidth / 2;//defChant.getComputedTextLength() / 2;
        }
      }
      // if there aren't enough characters before the vowel so that the neume begins far enough to the right of the previous neume,
      // add extra space in the text:
      var preWidth=cneume.info.startsWithAccidental?getChantWidth("b-"):0;
      offset += preWidth;
      cneume.offset = offset;
      xoffsetChantMin += Math.min(0,offset);
      if(cneume.wChant > 0 && (xoffset < xoffsetChantMin || !txt)) {
        xoffset = xoffsetChantMin;
      }
      var nextXoffsetTextMin = txt?
          xoffset + cneume.wText + Math.max(Math.floor(offset),0)
        : nextXoffsetTextMin||0;
      if(match[7]&&match.index>0)nextXoffsetTextMin+=5;
      var nextXoffsetChantMin = Math.max(xoffset,xoffsetChantMin) + cneume.wChant + spaceBeforeNextNeume - Math.min(offset,0);
     //Experimental change (2010.03.14)  Old line:
      var nextXoffset = cneume.wText==0?Math.max(nextXoffset||0,xoffset):Math.max(nextXoffsetTextMin, nextXoffsetChantMin);
      //var nextXoffset = wText==0?Math.max(nextXoffset||0,xoffset):nextXoffsetTextMin;
      var lastX;
      if(needCustosNextTime || nextXoffset >= width - startX - spaceBeforeNextNeume - cneume.wChant) {
        needCustos = curStaff;
        needCustos.justify = needCustosNextTime? needCustosNextTime.justify : true;
        if(!needCustos.justify){
          custosXoffset = xoffset;
        }
        needCustosNextTime=undefined;
        usesBetweenText=[];
        if(span&&txt&&$(span).text().slice(-1)!='-'){
          span.appendChild(cneume.lastOnLineHyphen = new TagInfo('-').span());
        }
        if(currentWord.length>0){
          words.push(currentWord);
          currentWord=[];
        }
        curStaff.words=words;
        words=[];
        var y = finishStaff(curStaff);
        var lineOffset = staffoffset + y + verticalSpace + staffInfo.y;
        curStaff = addStaff(svg,result,0,lineOffset,++line, null, defs);
        curStaff.info.vOffset = curStaff.info.y;
        staffInfo = curStaff.info;
        staffInfo.eText.setAttribute('transform', "translate(0," + staffInfo.vOffset + ")");
        staffInfo.eTrans.setAttribute('transform', "translate(0," + staffInfo.vOffset + ")");
        
        nextXoffset -= xoffset;
        nextXoffsetTextMin -= xoffset;
        nextXoffsetChantMin -= xoffset;
        if(clef){
          var use = make('use');
          use.setAttribute('class','clef');
          use.setAttributeNS(xlinkns, 'href', '#' + clef);
          use.setAttribute('x', 0);
          use.setAttribute('y', 0);
          curStaff.appendChild(use);
          if(clefNeume && clefNeume.clefs){
            clefNeume.clefs.push(use);
          }
          xoffset=0;
          xoffsetChantMin=wClef+spaceBeforeNextNeume+offset;
  //        nextStaffX=wClef;
          if(cneume.wChant > 0 && xoffset < xoffsetChantMin) {
            xoffset = xoffsetChantMin;
          }
          nextXoffset+=xoffset;
          nextXoffsetTextMin+=xoffset;
          nextXoffsetChantMin+=xoffset;
        } else {
          xoffset=0;
        }
      }
      needCustosNextTime = cneume.gabc && cneume.gabc.match(/z(?!0)/i);
      if(needCustosNextTime){
        needCustosNextTime.justify = cneume.gabc.match(/z/);
      }
        
      if(cneume.gabc || cneume.gabc==='') {
        if(needCustos && !cneume.gabc.match(/^[`,;:]+$/)) {
          addCustos(needCustos,cneume,needCustos.justify,custosXoffset);
          needCustos = false;
          startX=0;
        }
        if(cneume.info.mask) {
          use2 = make('use');
          use2.setAttributeNS(xlinkns, 'href', '#' + cneume.info.mask);
          use2.setAttribute('id','neumemask'+neumeId);
          use2.setAttribute('class',"caeciliae");
          use2.setAttribute('x', xoffset);
          use2.setAttribute('y', 0);
          
          currentWord.push(use2);
          masks[line].firstChild.appendChild(use2);
        } else use2 = null;
        staffInfo.ltone = Math.min(staffInfo.ltone, cneume.info.ltone);
        staffInfo.htone = Math.max(staffInfo.htone, cneume.info.htone);
        if(makeLinks) {
          use = $(cneume.info.def).clone()[0];
        } else {
          use = make('use');
          use.setAttributeNS(xlinkns, 'href', '#' + cneume.gabc);
        }
        use.setAttribute('id','neume'+neumeId);
        use.setAttribute('x', xoffset);
        use.setAttribute('y', 0);
        use.neume = cneume;
        if(makeLinks) {
          if(neumeId==selectedNeume) {
            selectedNeumeTag = use;
            var $lastChild = $(use).children().last();
            syllableGabcOriginalLength = cneume.gabc==''? 0 : parseInt($lastChild.attr('offset')) + parseInt($lastChild.attr('len'));
          }
          punctumId = setUpPunctaIn(use,punctumId,svg);
          //use.setAttributeNS(xlinkns, 'href', 'javascript:selectGabc('+(match.index+match[1].length)+','+cneume.gabc.length+')');
        }
        if(space){
          var tmp = clef && clef.length==3? -1 : null;
          if(svg.accidentals[svg.accidentals.length-1] != tmp){
            svg.accidentals[punctumId] = tmp;
          }
        }
        curStaff.appendChild(use);
        currentWord.push(use);
        
        currentUse=[use];
        if(use2)currentUse.push(use2);
        if(txt) {
          var count = usesBetweenText.length - 1;
          if(count<=0) {
            usesBetweenText[0]=currentUse;
          } else {
            var first = usesBetweenText[0][0];
            var x1=parseFloat(first.getAttribute('x'))+first.neume.wChant;
            var transform = first.getAttribute('transform');
            if(transform) {
              var m = regexTranslate.exec(transform);
              x1 += parseFloat(m[1]);
            }
            var x2=xoffset;
            if(offset<0)x2-=offset;
            var chantWidth=0;
            for(var i=1;i<=count;++i) {
              chantWidth+=usesBetweenText[i][0].neume.wChant;
            }
            var spaceWidth=x2-x1-chantWidth;
            spaceWidth /= (count+1);
            var x = x1 + spaceWidth;
            for(var i=1;i<=count;++i) {
              $(usesBetweenText[i]).attr('x',x);
              x += spaceWidth + usesBetweenText[i][0].neume.wChant;
            }
            usesBetweenText = [currentUse];
          }
        } else if(usesBetweenText.length>0 && !cneume.info.ftone) {
          usesBetweenText.push(currentUse);
          if((currentWord.length==1 && currentWord[0]==use) || (currentWord.length==2 && currentWord[0]==use2 && currentWord[1]==use)){
            words.push(currentWord);
            currentWord=[];
          }
        } else if(cneume.info.ftone) {
          usesBetweenText = [];
        }
      } else use = use2 = null;
      if(txt) {
        lastSpan = span;
        pneume = spanNeume;
        span = make('tspan');
        spanNeume = cneume;
        var spanXoffset = xoffset;
        // Don't worry about placing the vowel correctly if there is no neume.
        if(use) {
          cneume.transform = "translate("+(-offset)+")";
          cneume.transformX = -offset;
          if(offset > 0) {
            //check if we can push the syllable to the left rather than force a hyphen.
            if(spanXoffset-offset >= xoffsetChantMin) {
              cneume.wText -= offset;
              use.setAttribute('transform', cneume.transform);
              if(use2)
                use2.setAttribute('transform', cneume.transform);
            } else {
              spanXoffset += offset;
              cneume.wText += offset;
            }
          } else {
            use.setAttribute('transform', cneume.transform);
            if(use2)
              use2.setAttribute('transform', cneume.transform);
          }
        }
        if(lastSpan) {
          var lastXoffset = parseFloat(lastSpan.getAttribute('x'),10);
          var lastSpanX2 = lastXoffset + textWidth(lastSpan);
          if(lastSpanX2 < spanXoffset) {
            if($(lastSpan).text().slice(-1)!='-'){
              lastSpan.appendChild(new TagInfo('-').span());
              pneume.wText = textWidth(lastSpan);
              lastSpanX2 = lastXoffset + pneume.wText;
              if(lastSpanX2 > spanXoffset) {
                var additionalOffset = lastSpanX2 - spanXoffset;
                spanXoffset = lastSpanX2;
                if(use) {
                  use.setAttribute('x', xoffset + additionalOffset);
                  if(use2) {
                    use2.setAttribute('x', xoffset + additionalOffset);
                  }
                }
                nextXoffsetTextMin += additionalOffset;
                nextXoffsetChantMin += additionalOffset;
              }
            }
          }
        }
        span.setAttribute('id', 'neumetext'+neumeId);
        span.setAttribute('x', spanXoffset);
        var len = originalText.length;
        span.setAttribute("selectIndex", cneume.index-1-len);
        span.setAttribute("selectLen", len);
        if(makeLinks && neumeId == selectedNeume) {
          syllableTextOriginalLength = len;
          span.setAttribute("class", activeClass + ' selectable selected');
          selectedNeumeTextTag = $(span);
        } else {
          span.setAttribute("class", activeClass + (makeLinks? ' selectable' : ''));
        }
        span.neume = cneume;
        xoffset = nextXoffsetTextMin;
        xoffsetChantMin = nextXoffsetChantMin;
        tags.forEach(function(e){
          span.appendChild(e.span());
        });
        if(translation){
          var cspan = new TagInfo(translation,['i','trans']).span();
          cspan.setAttribute('id','neumetrans'+neumeId);
          cspan.setAttribute('x',spanXoffset);
          currentWord.push(cspan);
          staffInfo.eTrans.appendChild(cspan);
        }
        currentWord.push(span);
        staffInfo.eText.appendChild(span);
      } else {
        if(use) {
          xoffsetChantMin = Math.max(xoffsetChantMin,xoffset+getChantWidth(cneume.info.def.textContent) + spaceBeforeNextNeume);
          xoffset=nextXoffsetTextMin;
        } else {
          xoffsetChantMin = Math.max(xoffsetChantMin,xoffset);
        }
      }
      neumeId++;
      previousMatch = match;
      if(space)span=null;
      processLedger(cneume,use,currentWord);
    }
  }
  finishStaff(curStaff);
  if(gabcSettings.trimStaff) trimStaff(curStaff);
  if(makeLinks){
    if(selectedNeumeTag) $('#txtSyllableGabc,#txtSyllable').trigger('autoSizeInput');
    var volumes=[],
        timings=[];
    var lastVol = 100;
    for(var c=0,d=0;(c+d)<svg.tones.length; c++) {
      while(!svg.tones[c+d].isPlayable()) {
        ++d;
        if((c+d)>=svg.tones.length) break;
      }
      if((c+d)>=svg.tones.length) break;
      var vol=volume[c],
          tim=timing[c]?/(\d+(?:\.\d+)?)(?:\:(\d+(?:\.\d+)?))?/.exec(timing[c]):null;
      lastVol = (vol && parseInt(vol)) || lastVol;
      volumes[c+d] = lastVol;
      if(tim && tim.length) {
        var len = parseFloat(tim[1]);
        if(len > 20) len /= 400;
        timings[c+d]={length: len};
        if(tim[2]) timings[c+d].restAfter = parseFloat(tim[2]);
      }
    }
    svg.volumes = volumes;
    svg.timings = timings;
  }
  return result;
}
var boolArray=[true,false];
function processLedger(cneume,use,currentWord){
  for(i in cneume.ledgers){
    if(!cneume.ledgers.hasOwnProperty(i)) continue;
    $(cneume.ledgers[i]).remove();
  }
  cneume.ledgers={};
  if(cneume.info.ledgerA && (cneume.info.ledgerA.length || cneume.info.ledgerB.length) && use) {
    var curStaff = use.parentNode;
    var led=[];
    processLedgerHelper(cneume.info.ledgerA,led,true);
    processLedgerHelper(cneume.info.ledgerB,led,false);
    
    led.forEach(function(a){
      var tmp = insertLedger(a,curStaff,use);
      cneume.ledgers[a.above]=tmp;
      if(currentWord)currentWord.push(tmp);
    });
  }
}
function processLedgerHelper(old,led,aboveStaff){
  var lastI=null,
      curLen=0;
  for(a in old){
    if(!old.hasOwnProperty(a)) continue;
    var i=old[a];
    if(i-1==lastI){
      ++curLen;
    } else if(i-2==lastI){
      curLen += 2;
    } else {
      if(curLen>0)led.push({i:lastI,len:curLen,above:aboveStaff});
      lastI=i;
      curLen=1;
    }
  }
  if(curLen>0)led.push({i:lastI,len:curLen,above:aboveStaff});
}
function insertLedger(above,curStaff,use,isCustos){
  var index=0,len=1;
  if(typeof(above)=='object'){
    index=above.i;
    len=above.len;
    above=above.above;
  }
  var temp = make('use');
  temp.setAttributeNS(xlinkns, 'href', above?'#ledgera':'#ledgerb');
  temp.setAttribute('y',use.getAttribute('y'));
  var transform = use.getAttribute('transform');
  var tx = parseFloat(use.getAttribute('x'));
  if(transform) {
    while(m = regexTranslateG.exec(transform)){
      tx += parseFloat(m[1]);
    }
  }
  var chantWidth=useWidth(use,index,len);
  tx += chantWidth[0];
  chantWidth=chantWidth[1];
  if(isCustos){
    tx -= 0.25*notewidth;
    temp.setAttribute('transform',"translate("+tx+") scale("+(chantWidth+0.25*notewidth)+",1)");
  } else {
    tx -= 0.75*notewidth;
    temp.setAttribute('transform',"translate("+tx+") scale("+(chantWidth+1.5*notewidth)+",1)");
  }
  if(use){
    curStaff.insertBefore(temp,use);
  } else {
    curStaff.appendChild(temp);
  }
  return temp;
}
var ToneInfo = function(obj){
  for(i in obj){
    if(!obj.hasOwnProperty(i)) continue;
    this[i] = obj[i];
  }
};
(function(){
  var tones,result,minDy,htone,ltone,nextDX,nextDY,bottomPodatus=false;
  getChantFragment=function(gabc,defs) {
    if(abcs[gabc] != undefined) {
      var r = abcs[gabc];
      if($(defs).find("[id='"+gabc.replace(/\'/g,'\\\'')+"']").length==0){
        defs.appendChild($.clone(r.def));
        if(r.mask) {
          getChantFragment(r.mask,defs);
        }
      }
      return r;
    }
    var mask = undefined;
    if(gabc.indexOf('r') > -1) {
      mask = gabc.replace(/r/g,'!');
      getChantFragment(mask,defs);
    }
    result = make('text');
    ltone = 3;
    htone = 0;
    result.setAttribute('id', gabc);
    var ftone = null,
        code,
        curChar,
        nextChar,
        index = 0,
        prevIndex = 0,
        match,
        clef,
        clefTone,
        startsWithAccidental = false,
        countTones=0;
        ledgerA=[],
        ledgerB=[];

    minDy = 0;
    regexInner.lastMatch = 0;
    var globalTones=[];
    nextDX = 0;
    nextDY = 0;
    while(match = regexInner.exec(gabc)) {
      tones = [];
      var previousToneId = -1;
      chant=match[0];
      regexTones.exec('');
      var cmatch;
      while(cmatch = regexTones.exec(chant)) {
        ++countTones;
        var imatch=[];
        if(cmatch[regexTonesSpliceIndex]) {
          var test = cmatch[regexTonesSpliceIndex];
          var newmatch;
          while(newmatch=regexToneModifiers.exec(test)) {
            if(newmatch[3]) {
              var eLoc=newmatch[3].match(/0/)?-1:0;
              var count=newmatch[3].length + eLoc - 1;
              newmatch[3]=newmatch[3].slice(eLoc-1);
              var i=1;
              var len=tones.length;
              while(i<=count && i<=len) {
                var lastTone = tones[len-i];
                if(!lastTone.match[rtg.episema]) {
                  lastTone.match[rtg.episema]=newmatch[3];
                  lastTone.episemaLoc=eLoc;
                }
                ++i;
              }
            }
            if(newmatch[2]){
              var count = newmatch[2].length;
              if(count > 1){
                var lastTone = tones[tones.length-1];
                if(!lastTone.match[rtg.dot]){
                  lastTone.match[rtg.dot]='.';
                }
              }
            }
            $.extend(imatch,newmatch);
          }
        } else {
          imatch = new Array(regexToneModifiersCount);
        }
        var tmpIndex=cmatch.index;
        cmatch = cmatch.splice(0,regexTonesSpliceIndex).concat(imatch.splice(1,imatch.length-1)).concat(cmatch.splice(1,cmatch.length-1));
        cmatch.index=tmpIndex+match.index;
        if(cmatch[rtg.clef]){
          clef=cmatch[rtg.clef];
          clefTone = (clef[0] == "f")? 5 : 1;
          clefTone += (parseInt(clef.slice(-1)) * 2);
        }
        tone = cmatch[0];
        if(cmatch[rtg.whitespace]) {
          // merely some kind of text substitution.
          for(var i=0; i < transforms[0].length; ++i) {
            tone = tone.replace(transforms[2][i],transforms[1][i]);
          }
          var tmp=make('tspan',tone);
          tmp.setAttribute('offset',cmatch.index);
          tmp.setAttribute('len',cmatch[0].length);
          if(nextDX) {
            tmp.setAttribute('dx',nextDX);
            nextDX = 0;
          }
          if(nextDY) {
            tmp.setAttribute('dy',nextDY);
            nextDY = 0;
          }
          result.appendChild(tmp);
          htone = Math.max(htone,(/[`,]/.exec(cmatch[rtg.whitespace])&&9.5)||0);
          globalTones.push(tmp=new ToneInfo({match:[]}));
          tmp.match[rtg.whitespace] = cmatch[rtg.whitespace];
        } else {
          var toneId = parseInt(cmatch[rtg.tone]||cmatch[rtg.clef]&&cmatch[rtg.clef].slice(0,1),23)-10;
          var choralSign = null;
          if(cmatch[rtg.tone] && cmatch[rtg.tone].length == 1) {
            ltone = Math.min(ltone,toneId);
            htone = Math.max(htone,toneId);
            if(ftone==null && !cmatch[rtg.accidental])ftone = toneId;
          } else {
            htone = Math.max(htone,(cmatch[rtg.clef]&&(parseInt(cmatch[rtg.clef].slice(-1))*2+2))||0);
          }
          var bmatch = /^cs\:([^\]]+)/.exec(cmatch[rtg.bracketed]);
          if(bmatch) {
            choralSign = bmatch[1];
          }
          if(toneId>10){
            ledgerA.push(countTones-1);
          } else if(toneId<2){
            ledgerB.push(countTones-1);
          }
          var tmp=new ToneInfo({
            match: cmatch,
            index: toneId,
            relativeTone: previousToneId < 0? 0 : toneId - previousToneId,
            modifiers: cmatch[rtg.noteType],
            clef: cmatch[rtg.clef],
            episemaLoc:(cmatch[rtg.episema] && cmatch[rtg.episema].match(/0/))?-1:0,
            diamond: cmatch[rtg.toneUpper]? true: false,
            markings: cmatch[rtg.ictus] || cmatch[rtg.dot] || cmatch[rtg.episema],
            liq: cmatch[rtg.diminutiveLiquescentia],
            accidental: cmatch[rtg.accidental],
            choralSign: choralSign
          });
          tones.push(tmp);
          globalTones.push(tmp);
          previousToneId = toneId;
        }
      }
      for(var i=0; i < tones.length; ++i) {
        i=getNeumeText(i);
      }
    }
    defs.appendChild(result);
    return abcs[gabc] = { 
      ltone:ltone,
      htone:htone,
      ftone:ftone,
      tones:globalTones,
      startsWithAccidental:(globalTones.length>0&&globalTones[0].match[rtg.accidental])?true:false,
      mask:mask,
      clef:clef,
      clefTone: clefTone,
      mindy:minDy,
      ledgerA:ledgerA,
      ledgerB:ledgerB,
      def:result
    };
  }
  var getNeumeText=function(i) {
    var addEpisema=function(loc,loTone,hiTone){
      if(!hiTone)hiTone=loTone;
      if(loc==-1){
        tmpdata += neume(indices.episema_below,loTone);
        ltone=Math.min(ltone,loTone-1);
      } else {
        tmpdata += neume(indices.episema_above,hiTone);
        htone=Math.max(htone,hiTone+1);
      }
    },  addIctus=function(loc,tone){
      if(loc==1){
        tmpdata += neume(indices.ictus_above, tone);
        htone=Math.max(htone,tone+1);
      } else {
        tmpdata += neume(indices.ictus_below, tone);
        ltone=Math.min(ltone,tone-1);
      }
    }, addChoralSign=function(ton,right,parent){
      //var right = true;
      var text = ton.choralSign,
          tone = ton.index,
          tspan=make('tspan',text),
          twidth = textWidth(text,'choral-sign'),
          cwidth = getChantWidth($(parent).text());
      if(ton.match[rtg.episema] && ton.episemaLoc!=-1) {
        tone += 2;
        if(tone%2) --tone;
      }
      var xOffset = right? 1 : (cwidth>(2*notewidth)? (-cwidth+(notewidth-twidth)/2) : ((-twidth-notewidth)/2)),
          yOffset = -3 + (1-Math.floor(tone/2)+(right?1:0))*(staffheight/4);
      if(tone%2 == 1) yOffset -= 2;
      xOffset += nextDX;
      yOffset += nextDY;
      tspan.setAttribute('class', 'choral-sign');
      tspan.setAttribute('dx', xOffset);
      tspan.setAttribute('dy', yOffset);
      nextDX -= (twidth + xOffset);
      nextDY -= yOffset;
      if(right){
        tspan.setAttribute('transform','translate('+notewidth+',0)');
      }
      parent.appendChild(tspan);
    }, commitTmpData=function(tone){
      if(!tone || !tmpdata || tmpdata.length==0)return;
      var tspan=make('tspan',tmpdata);
      tspan.setAttribute('offset',tone.match.index);
      tspan.setAttribute('len',tone.match[0].length);
      if(nextDX) {
        tspan.setAttribute('dx',nextDX);
        nextDX = 0;
      }
      if(nextDY) {
        tspan.setAttribute('dy',nextDY);
        nextDY = 0;
      }
      for(var i=1; i<arguments.length; ++i){
        tspan.setAttribute('len'+i,arguments[i].match[0].length);
      }
      if(arguments.length>1)tspan.setAttribute('count',arguments.length);
      result.appendChild(tspan);
      
      for(var i=0; i<arguments.length; ++i){
        var tone = arguments[i];
        if(tone.choralSign) {
          addChoralSign(tone,i==1||bottomPodatus,tspan);
        }
      }
      tmpdata='';
      bottomPodatus=false;
    },  tmpdata = '',
        tonesInGlyph = 1,
        toneReps = 1,
        extraSpace='',
        tone = tones[i],
        nextTone = (tones.length > i+1)? tones[i+1] : null,
        thirdTone = (tones.length > i+2)? tones[i+2] : null,
        fourthTone = (tones.length > i+3)? tones[i+3] : null,
        lastTone = (i > 0)? tones[i-1]: null,
        base = indices.punctum

    if(i>0 && tone.relativeTone==0) tmpdata += "'";
    if(tone.diamond) {
      base = tone.liq? indices.diamond_tilde : indices.diamond;
      var di = Math.abs(tone.relativeTone);
      if(lastTone && lastTone.diamond && (di == 2)) {
        tmpdata += "'";
      }
      if(nextTone && !nextTone.diamond) extraSpace="-";
    } else if(tone.clef) {
        var minDyData=[minDy];
        result.appendChild(makeClefSpan(tone,minDyData));
        minDy=minDyData[0];
        return i;
    } else if(tone.modifiers) {
      if(tone.match[rtg.accidental]) {
        if(i==0)startsWithAccidental=true;
        var aname = (tone.match[rtg.flat])? 'flat' : 'natural';
        tmpdata += neume(indices[aname],tone.index) + "-";
        commitTmpData(tone);
        return i;
      } else {
        if(tone.match[rtg.virga]) {
          base = indices.v;
          toneReps=tone.match[rtg.virga].length;
          extraSpace="'";
        } else if(tone.match[rtg.stropha]) {
          base = indices.s;
          toneReps=tone.match[rtg.stropha].length;
          extraSpace="'";
        } else if(indices[tone.modifiers[0]]) {
          base = indices[tone.modifiers[0]];
          if(nextTone && (nextTone.relativeTone > 0 && nextTone.relativeTone <=5) && tone.modifiers == 'w' && (!thirdTone || thirdTone.relativeTone >= 0)) {
            tmpdata += neume(base,tone.index);
            if(tone.match[rtg.ictus]) {
              addIctus(-1,tone.index);
            }
            if(tone.match[rtg.episema]) {
              addEpisema(-1,tone.index);
            }
            commitTmpData(tone);
            if(nextTone.relativeTone>1) {
              tmpdata += neume(indices.connecting_line,tone.index,nextTone.index);
            }
            ++i;
            base = indices.topPartPodatus;
            tone = nextTone;
            tone.episemaLoc = 1;
          }
        }
      }
    } else if(nextTone && !nextTone.diamond && (!nextTone.modifiers || nextTone.liq)) {
      // no modifers, and there is at least one more tone on the stack.
      if(nextTone.relativeTone > 0 && nextTone.relativeTone <=5) {
        if(thirdTone && !thirdTone.diamond && (!thirdTone.modifiers || thirdTone.modifiers=='~') && thirdTone.relativeTone < 0 && thirdTone.relativeTone >= -4) {
          base = indices.punctum;
          if(!thirdTone.modifiers && fourthTone && fourthTone.relativeTone>=1 && fourthTone.relativeTone <=5) {
            //Going for porrectus next time...this one will be a straight punctum
            --i;
            tone.episemaLoc=0;
            nextTone.episemaLoc=0;
          } else {
            //torculus
            tmpdata += neume(base,tone.index);
            var hiTone=nextTone.index;
            var loTone=Math.min(tone.index,thirdTone.index);
            if(tone.match[rtg.episema]) {
              addEpisema(tone.episemaLoc,loTone,hiTone);
            }
            if(tone.match[rtg.ictus]) {
              addIctus(tone.episemaLoc,tone.index);
              tone.match[rtg.ictus]=undefined;
            }
            commitTmpData(tone);
            if(nextTone.relativeTone > 1) {
              tmpdata += neume(indices.connecting_line,tone.index,nextTone.index);
            }
            if(thirdTone.modifiers=='~'){
              --i;
              base=undefined;
            } else {
              tmpdata += neume(base,nextTone.index);
              if(nextTone.match[rtg.episema]) {
                addEpisema(tone.episemaLoc,loTone,hiTone);
              }
              if(nextTone.match[rtg.ictus]) {
                addIctus(nextTone.episemaLoc,nextTone.index);
                nextTone.match[rtg.ictus]=undefined;
              }
              commitTmpData(nextTone);
              if(thirdTone.relativeTone < -1) {
                tmpdata += neume(indices.connecting_line,thirdTone.index,nextTone.index);
              }
              tone = thirdTone;
              if(thirdTone.match[rtg.episema])tone.episemaTone = thirdTone.episemaLoc==-1?loTone:hiTone;
              if(thirdTone.modifiers=='~')base=indices.lower_tilde;
              tonesInGlyph = 3;
              ++i;
            }
          }
        } else if(nextTone.relativeTone <=5) {
          tone.episemaLoc=-1;
          nextTone.episemaLoc=1;
          base = indices.topPartPodatus;
          tonesInGlyph = 2;
          if(thirdTone && thirdTone.relativeTone <= 0) extraSpace="-";
          if(nextTone.liq) {
            tmpdata += neume(indices['<'],tone.index);
            base = indices.upper_tilde;
          } else {
            tmpdata += neume(indices.bottomPartPodatus,tone.index);
            bottomPodatus = true;
          }
          commitTmpData(tone);
          if(nextTone.relativeTone > 1) {
            tmpdata += neume(indices.connecting_line,tone.index,nextTone.index);
          }
          var temp=tone;
          tone=nextTone;
          nextTone=temp;
        }
        ++i;
      } else if(nextTone.relativeTone < 0 && nextTone.relativeTone >= -5) {
        if(!tone.markings && thirdTone && !thirdTone.diamond && (!thirdTone.modifiers || thirdTone.modifiers=='~') && thirdTone.relativeTone >= 1 && thirdTone.relativeTone <= 4 && nextTone.relativeTone >= -4) {
          if(tone.relativeTone >= 2 && tone.relativeTone <= 5) {
            tmpdata += neume(indices.connecting_line,tone.index-tone.relativeTone,tone.index);
          } else if(tone.relativeTone < 1) {
            var lineLen=Math.max(-nextTone.relativeTone,1);
            tmpdata += (result.childNodes.length>0?"-":"") + neume(indices.decorative_line,tone.index-lineLen,tone.index);
          }
          if(thirdTone.modifiers=='~'){
            --i;
            tmpdata += neume(base,tone.index);
            commitTmpData(tone);
            tmpdata += neume(indices.connecting_line,nextTone.index,tone.index);
            base=undefined;
          } else {
            tmpdata += neume(indices.porrectus,tone.index,nextTone.index);
            commitTmpData(tone,nextTone);
            tmpdata += neume(indices.decorative_line,nextTone.index,thirdTone.index);
            nextTone.episemaLoc=-1;
            if(!fourthTone || fourthTone.relativeTone>=0 || fourthTone.relativeTone < -5) {
              base = indices.topPartPodatus;
              thirdTone.episeamLoc=1;
              tone = thirdTone;
              tonesInGlyph = 3;
              ++i;
            } else {
              base = undefined;
              thirdTone.connectingLine = true;
              tonesInGlyph = 2;
            }
          }
        } else {
          // clivis
          tonesInGlyph = 2;
          if(nextTone.liq) {
            var lineLen=Math.min(-nextTone.relativeTone,2);
            tmpdata += neume(indices.decorative_line,tone.index-lineLen,tone.index);
            tmpdata += neume(indices['>'],tone.index);
            commitTmpData(tone);
            base = indices.lower_tilde;
          } else {
            if(tone.relativeTone>0 && tone.relativeTone<=5 && (lastTone.modifiers=="w" || tone.connectingLine) ) {
              if(tone.relativeTone>1)tmpdata += neume(indices.connecting_line,lastTone.index,tone.index);
            } else {
              tmpdata += neume(indices.decorative_line,nextTone.index,tone.index);
            }
            tmpdata += neume(indices.punctum,tone.index);
            if(tone.match[rtg.episema]) {
              addEpisema(tone.episemaLoc,nextTone.index,tone.index);
              tonesInGlyph=1;
            }
            if(tone.match[rtg.ictus]) {
              addIctus(tone.episemaLoc,tone.index);
              tone.match[rtg.ictus]=undefined;
            }
            if(nextTone.match[rtg.episema]) {
              temp = nextTone.episemaLoc==-1?loTone:hiTone;
              tone.episemaTone=1;
              if(nextTone.episemaLoc!=-1)nextTone.episemaTone = tone.index;
            }
            if(tone.match[rtg.dot]) {
              if(nextTone.match[rtg.dot]) {
                if(nextTone.match[rtg.dot].length==1) nextTone.match[rtg.dot]='..';
              } else {
                tmpdata += neume(indices.dot,tone.index);
                tonesInGlyph=1;
              }
            }
            commitTmpData(tone);
          }
          if(nextTone.relativeTone < -1) {
            tmpdata += neume(indices.connecting_line,nextTone.index,tone.index);
          }
          var temp=tone;
          tone=nextTone;
          nextTone=temp;
        }
        ++i;
      }
    }
    var temp = neume(base,tone.index);
    if(toneReps>1) {
      temp = (temp+"'").repeat(toneReps).slice(0,-1);
    }
    tmpdata += temp;
    if(tone.match[rtg.ictus]) {
      addIctus(tone.episemaLoc,tone.index);
    }
    if(tone.match[rtg.episema]) {
      var temp = tone.episemaTone||tone.index;
      addEpisema(tone.episemaLoc,temp);
    }
    if(tonesInGlyph>1) {
      if(nextTone.match[rtg.ictus]) {
        addIctus(nextTone.episemaLoc,nextTone.index);
      }
      if(nextTone.match[rtg.episema] && !tone.episemaTone) {
        addEpisema(nextTone.episemaLoc,nextTone.index);
      }
    }
    var lo,hi;
    if(tonesInGlyph>1){
      lo=Math.min(nextTone.index, tone.index);
      hi=Math.max(nextTone.index, tone.index);
      if((hi-lo)>=2 || lo%2 == 0) lo=undefined;
    }
    var temp = tone.match[rtg.dot];
    if(temp) {
      if(tone.index==lo) {
        tmpdata+=neume(indices.dot,lo-1);
      } else {
        tmpdata+=neume(indices.dot,tone.index);
      }
      temp = temp.length;
    } else {
      temp = 0;
    }
    if(nextTone && (temp>1 || (tonesInGlyph>1 && (temp=nextTone.match[rtg.dot])))) {
      if(nextTone.index==lo) {
        tmpdata+=neume(indices.dot,lo-1);
      } else {
        tmpdata+=neume(indices.dot,nextTone.index);
      }
    }
    if(temp && tones[i+1]) extraSpace += "--";
    tmpdata += extraSpace;
    if(base){
      commitTmpData(tone);
    }
    return i;
  }
})();
//temporary...wont work with multiple chants on the same page.
function addStaff(svg,result,x,y,line,width,defs) {
  var maskId = 'staffmask' + line;
  var staffId= 'staff'+line;
  var systemId='system'+line;
  var T;
  if(masks[line]) {
    var tmp = masks[line].firstChild;
    while(tmp.childElementCount > 1) {
      tmp.removeChild(tmp.childNodes[1]);
    }
    T = tmp.firstChild;
  } else {
    var oldMask=masks[line],
        mask,
        g;
    if(oldMask && oldMask.parentNode != defs) {
      oldMask = $(defs).find("#"+maskId)[0];
    }
    if(oldMask) {
      mask = oldMask;
      g = mask.firstChild;
      T = $(g).find(">rect")[0];
    } else {
      mask = make('mask');
      mask.setAttribute('maskUnits','objectBoundingBox');
      mask.setAttribute('id', maskId);
      g = make('g');
      g.setAttribute('class', 'caeciliae');
      mask.appendChild(g);
      T = make('rect');
      g.appendChild(T);
      defs.appendChild(mask);
    }
    masks[line] = mask;
    mask.setAttribute('transform','translate(0,'+(y)+')');
  }
  T.setAttribute('y', -staffheight);
  T.setAttribute('width', '10000');
  T.setAttribute('height', 1+staffheight);
  T.setAttribute('fill', 'white');
  
  var returnVal = make('g');
  var staffInfo = returnVal.info = {
    ltone:3,
    htone:10,
    vOffset:0,
    x:0,
    y:parseInt(y),
    eText:make('text'),
    eTrans:make('text')
  };
  staffInfo.eText.setAttribute("class",fontclass);
  staffInfo.eTrans.setAttribute("class",fontclass);
      
  var group = make('g');
  returnVal.setAttribute('id',systemId);
  group.setAttribute('id',staffId);
  group.setAttribute('mask','url(#' + maskId + ')');
  var staff = make("use");
  staff.setAttributeNS(xlinkns, "href", "#staff");
  if(!width) width = $(svg.parentNode).width();
  staff.setAttribute("transform", "translate("+(x)+") scale(" + (width) + ",1)");
  group.appendChild(staff);
  returnVal.appendChild(group);
  result.appendChild(returnVal);
  return returnVal;
}
var gradients={};
// sets the gradient for the selected part of a porrectus
// punctumTag is the tspan element for the porrectus
// offset is 0 if the left side is selected and 1 if the right.
function setGradient(punctumTag,offset){
  var gradType = offset==0?'RedBlack':'BlackRed',
      neumeTag = punctumTag.parentNode,
      tmp=[],
      punctumIndex = $(punctumTag).index(),
      i,
      stops = useWidth(neumeTag,punctumIndex,1),
      totalWidth=neumeTag.neume.wChant || useWidth(neumeTag),
      gradId = 'grad' + gradType + stops.join('_') + '_' + totalWidth;

  if(!(gradId in gradients)){
    var $grad = $(gradients[gradType]).clone(),
        $stops = $grad.find("stop");

    $grad.attr("id",gradId);
    $($stops[0]).attr("offset",(stops[0]+(0.25*stops[1]))/totalWidth);
    $($stops[1]).attr("offset",(stops[0]+(0.75*stops[1]))/totalWidth);
    _defs.appendChild($grad[0]);
    gradients[gradId]=$grad[0];
  }
  
  punctumTag.setAttribute("style","fill:url(#"+gradId+")");
}
function setUpPunctaIn(use,punctumId,svg){
  var id=0,
      oId=punctumId,
      tones=use.neume.info.tones,
      clefs = svg.clefs;
  $(use).children().each(function(){
    var tone = tones[id];
    if(tone.match[rtg.accidental]){
      svg.accidentals[punctumId] = tone.match[rtg.flat]? (tone.index - clefs[clefs.length-1].info.clefTone) : null;
    } else if(tone.match[rtg.whitespace] && tone.match[rtg.whitespace].match(/[,;:]/)){
      svg.accidentals[punctumId] = (clefs.length && clefs[clefs.length-1].gabc.length==3)? -1 : null;
    }
    this.setAttribute('id','punctum'+punctumId);
    this.tone = tone;
    var count = parseInt(this.getAttribute('count'))||1;
    if(count == 2) {
      if(punctumId==selectedPunctum){
        selectedPunctumTag=this;
        this.setAttribute('class','selectable selected-1');
        setGradient(this,0);
      } else if(punctumId+1 == selectedPunctum){
        selectedPunctumTag=this;
        this.setAttribute('class','selectable selected-2');
        setGradient(this,1);
      } else {
        this.setAttribute('class','selectable');
      }
    } else if(punctumId==selectedPunctum){
      selectedPunctumTag=this;
      this.setAttribute('class','selectable selected');
    } else {
      this.setAttribute('class','selectable');
    }
    id += parseInt(this.getAttribute('count'))||1;
    punctumId = oId + id;
  });
  return punctumId
}
var playTone = function(){console.warn('Audiolet library not loaded.');};
var playScore = playTone;
var stopScore = playTone;
var baseFreq=370;
$(function() {
  $.fn.autoSizeInput = function(o) {
    o = $.extend({
        maxWidth: 1000,
        minWidth: 0,
        comfortZone: 0
    }, o);
    this.filter('input:text').each(function(){
        var minWidth = o.minWidth || $(this).width(),
            val = '',
            input = $(this),
            testSubject = $('<tester/>').css({
                position: 'absolute',
                top: -9999,
                left: -9999,
                width: 'auto',
                fontSize: input.css('fontSize'),
                fontFamily: input.css('fontFamily'),
                fontWeight: input.css('fontWeight'),
                letterSpacing: input.css('letterSpacing'),
                whiteSpace: 'nowrap'
            }),
            check = function(e) {
                if (val === (val = input.val())) {return;}
                
                // Enter new content into testSubject
                var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,'&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                testSubject.html(escaped);
                // Calculate new width + whether to change
                var testerWidth = testSubject.width(),
                    newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
                    currentWidth = input.width(),
                    isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
                                         || (newWidth > minWidth && newWidth < o.maxWidth);
                // Animate width
                if (isValidWidthChange) {
                    input.width(newWidth);
                    input.trigger('autoSizeInput');
                }
            };
        testSubject.insertAfter(input);
        $(this).bind('keyup blur update', check).bind('keydown', function(e){window.setTimeout( function(){ check.apply(this,[e]); },1)});
    });
    
    return this;

};
  var onAudiolet = function(){
    //var audiolet = new Audiolet(baseFreq*4,2,baseFreq);
    try {
      var audiolet = new Audiolet();
      var Synth = function(frequency,duration,volume) {
        AudioletGroup.apply(this, [audiolet, 0, 1]);
        this.sine = new Sine(audiolet, frequency);
        
        this.gain = new Gain(audiolet, volume * 0.01);
        this.env = new PercussiveEnvelope(audiolet, 1, 0.3, (duration || 1) * .3,
            function() {
                this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
            }.bind(this)
        );
        this.envMulAdd = new Multiply(audiolet, 0.002 * volume, 0);

        // Main signal path
        this.sine.connect(this.gain);
        this.gain.connect(this.outputs[0]);

        // Envelope
        this.env.connect(this.envMulAdd);
        this.envMulAdd.connect(this.gain, 0, 1);
      };
      extend(Synth,AudioletGroup);
      var playFreq = function(freq,duration,volume){
        var s = new Synth(freq,duration,volume);
        s.connect(audiolet.output);
      };
      var semitones={
        0:0,
        1:2,
        2:4,
        3:5,
        4:7,
        5:9,
        6:11
      };
      playTone = function(tone,isFlat,duration,volume){
        var freq=baseFreq;
        isFlat = tone==isFlat;
        while(tone<0){
          tone += 7, freq /= 2;
        }
        while(tone>=7){
          tone -= 7, freq *= 2;
        }
        if(tone>0){
          freq *= Math.pow(2.0, (semitones[tone] - (isFlat?1:0))/12);
        }
        playFreq(freq,duration,volume);
      };
      var _isPlaying=false;
      tempo=150;
      setTempo = function(newTempo) { tempo = newTempo || 150; }
      setRelativeTempo = function(delta) { tempo += delta; if(tempo <= 0) tempo = 150; }
      var seq;
      playScore = function(fromBeginning){
        var svg = selectedSvg;
        var punctumId = fromBeginning?0:(selectedPunctum||0);
        while(seq && seq.next());
        seq = new PSequence(svg.tones,1,punctumId);
        _isPlaying=true;
        audiolet.scheduler.setTempo(tempo);
        audiolet.scheduler.play([seq], 1, function(toneInfo){
          var duration;
          while(!(_isPlaying=_isPlaying && punctumId < svg.tones.length) || !(duration = toneInfo.play(punctumId))){
            ++punctumId;
            if(!(toneInfo=seq.next())){
              selectPunctum(-1);
              _isPlaying=false;
              return;
            }
          }
          selectPunctum(punctumId,true);
          if(duration)audiolet.scheduler.setTempo(tempo/duration);
          ++punctumId;
        });
      };
      stopScore = function(){
        _isPlaying=false;
      }
    } catch(ex) {
      console.warn(ex);
    }
  };
  var onSink = function(){
    if(typeof(Audiolet)=='function'){
      try{onAudiolet();} catch(e){}
    } else {
      $.getScript('audiolet.js',onAudiolet);
    }
  };
  if(typeof(Sink)=='function'){
    onSink();
  } else {
    $.getScript('sink.js',onSink);
  }
  if($("link[href=style\\.css]").length==0){
    $(document.head).append($('<link rel="stylesheet" type="text/css" href="style.css">'));
  }
  var table = $("#tbl");
  if(table) {
    for(var code = 0xE0E0; code < 0xFFFF; code += 16) {
      var row = document.createElement('row');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      td1.innerText = '0x' + code.toString(16);
      var s = '';
      for(var i=0; i < 16; ++i) {
        s += String.fromCharCode(code+i) + '_';
      }
      td2.innerText = s;
      
      td2.className = 'caeciliae';
      row.appendChild(td1);
      row.appendChild(td2);
      table.append(row);
    }
  }

  if(typeof(document.createElementNS)!='function') {
    return;
  }
  _svg = svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('style','width:100%;height:0');
  setPrintFont=function(usePrintFont){
    $(svg).find(".caeciliae,.caeciliae-print").attr("class",usePrintFont?"caeciliae-print":"caeciliae");
  };
  /*var style = document.createElementNS(svgns, "style");
  style.setAttribute("type", "text/css");
  svgStyle=style;
  svgStyle.appendChild(document.createTextNode(""));
  setSvgFont=function(useSvg){
    style.firstChild.textContent = useSvg?styleFontPrint:styleFont;
  };
  var otherStyle = document.createElementNS(svgns, "style");
  otherStyle.appendChild(document.createTextNode("a.svg{text-decoration:none}\na.svg:hover{fill:#e22}\n"
    + ".b{font-weight:700}\n"
    + ".i{font-style:italic}\n"
    + ".sc{font-variant:small-caps}\n"
    + ".goudy{" + styleGoudy + "}\n"
    + ".caeciliae{" + styleCaeciliae + "}\n"
    + ".caeciliaeSvg{" +styleCaeciliaeSvg + "}"
  ));
  otherStyle.setAttribute("type", "text/css");
  svg.appendChild(otherStyle);
  setSvgFont(false);
  svg.appendChild(style);
  */
  _defs = document.createElementNS(svgns, "defs");
  defText = make('text','');
  defText.setAttribute("class", "goudy");
  _defs.appendChild(defText);
  _defText = make('text','');
  _defText.setAttribute("class", "goudy");
  _defs.appendChild(_defText);
  defChant = make('text','p');
  defChant.setAttribute('class', 'caeciliae');
  _defs.appendChild(defChant);
  defChantSvg=make('text','p');
  defChantSvg.setAttribute('class', 'caeciliaeSvg');
  _defs.appendChild(defChantSvg);
  var tmp=make('linearGradient');
  tmp.setAttribute('gradientUnits','objectBoundingBox');
  tmp.setAttribute('id','gradRedBlack');
  var tmp2=make('stop');
  tmp2.setAttribute('offset','0');
  tmp2.setAttribute('stop-color','#e22');
  tmp.appendChild(tmp2);
  tmp2=make('stop');
  tmp2.setAttribute('offset','100');
  tmp2.setAttribute('stop-color','#000');
  tmp.appendChild(tmp2);
  gradients.RedBlack=tmp;
  tmp=make('linearGradient');
  tmp.setAttribute('gradientUnits','objectBoundingBox');
  tmp.setAttribute('id','gradBlackRed');
  var tmp2=make('stop');
  tmp2.setAttribute('offset','0');
  tmp2.setAttribute('stop-color','#000');
  tmp.appendChild(tmp2);
  tmp2=make('stop');
  tmp2.setAttribute('offset','100');
  tmp2.setAttribute('stop-color','#e22');
  tmp.appendChild(tmp2);
  gradients.BlackRed=tmp;
  
  var gStaff;
  if(staffInFont) {
    gStaff = document.createElementNS(svgns, "text")
    gStaff.textContent="'";
    gStaff.setAttribute("transform","scale(0.5,1)");
  } else {
    gStaff = document.createElementNS(svgns, "g");
    var height = 1;
    var line = document.createElementNS(svgns, "path");
    var stringLine = "h1v" + height + "h-1zm0 -" + spaceheight;
    line.setAttribute("d", "M0 0" + stringLine.repeat(4));
    
/*    var grey = document.createElementNS(svgns,"rect");
    grey.setAttribute("width","1000");
    grey.setAttribute("fill","grey");
    grey.setAttribute("height",staffheight*4/5);
    grey.setAttribute("y","-47");
    gStaff.appendChild(grey);
*/
    gStaff.appendChild(line);
    
    var ledger = document.createElementNS(svgns, "g");
    //stringLine = stringLine.replace(/m0.*$/,'');
    line = document.createElementNS(svgns, "path");
    line.setAttribute("d","M0 " + spaceheight + stringLine);
    ledger.appendChild(line);
    ledger.setAttribute("id","ledgerb");
    _defs.appendChild(ledger);
    ledger = document.createElementNS(svgns, "g");
    line = document.createElementNS(svgns, "path");
    line.setAttribute("d","M0 " + (-spaceheight*4) + stringLine);
    ledger.appendChild(line);
    ledger.setAttribute("id","ledgera");
    _defs.appendChild(ledger);
  }
  gStaff.setAttribute("id", "staff");
  _defs.appendChild(gStaff);
  
  
  svg.appendChild(_defs);
  textElem = document.createElementNS(svgns, "g");
  textElem.setAttribute("transform", "translate(0," + staffoffset + ")");
  textElem.setAttribute("class", "caeciliae");
  svg.appendChild(textElem);
  window.lastClefBeforeNeume=function(neumeId,svg){
    var i,result={clefTone:9};
    for(i in svg.clefs){
      if(!svg.clefs.hasOwnProperty(i)) continue;
      if(i<neumeId)result=svg.clefs[i];
      else break;
    }
    return result;
  };
  window.lastClefBeforePunctum=function(punctumId,svg){
    var i,result={clefTone:9};
    for(i in svg.clefs){
      if(!svg.clefs.hasOwnProperty(i)) continue;
      try {
        var punctumI = parseInt($(svg).find('#neume'+i).children()[0].id.match(/\d+$/)[0]);
        if(punctumI<punctumId)result=svg.clefs[i].info;
        else break;
      } catch(e){}
    }
    return result;
  }
  window.isPunctumFlat=function(punctumId,svg){
    var i,result=null;
    for(i in svg.accidentals){
      if(!svg.accidentals.hasOwnProperty(i)) continue;
      if(i<=punctumId)result=svg.accidentals[i];
      else break;
    }
    return result;
  }

  var cp=$("#chant-preview,[id$=-preview][for]");
  if(cp.length==0) {
    $(document.body).append(svg);
  } else {
    cp.append(svg);
    cp.append('<input type="text" id="txtSyllableGabc" style="display:none;position:absolute;padding:2px;width:5px;font-family:monospace;font-size:11pt;border:1px solid #aaa" spellcheck="false">');
    cp.append('<input type="text" id="txtSyllable" class="goudy" style="display:none;position:absolute;padding:2px;width:5px;border:1px solid #aaa" spellcheck="false">');

    ToneInfo.prototype.isPlayable = function(punctumId){
      return !this.clef && !this.accidental && typeof(this.index)=="number";
    };
    ToneInfo.prototype.play = function(punctumId){
      var svg=selectedSvg,
          timings = svg.timings,
          volumes = svg.volumes;
          clefIndex = lastClefBeforePunctum(punctumId,svg).clefTone,
          setDuration = timings && timings[punctumId],
          volume = volumes[punctumId] || 100,
          duration = setDuration || this.match&&(this.match[rtg.dot]||this.match[rtg.episema])?2:(this.match[rtg.virga]||'v').length,
          longDuration = 0;
      if(setDuration) {
        duration = setDuration.length;
        longDuration = duration + (setDuration.restAfter||0);
      }
      else {
        if(duration == 1){
          var nextPunctum = $(svg).find("[id=punctum" + (1+punctumId) + "]");
          if(nextPunctum.length){
            nextPunctum = nextPunctum[0].tone;
            if(nextPunctum && nextPunctum.match[rtg.quilisma]) duration = 2;
          }
        }
        longDuration = duration;
      }
      if(!this.clef && !this.accidental && typeof(this.index)=="number"){
        playTone(this.index-clefIndex,isPunctumFlat(punctumId,svg),duration,volume);
        return longDuration;
      }
      return false;
    };

    var moveSelectedPunctum=function(offset){
      var tag = selectedPunctumTag,
          svg = selectedSvg,
          e = $('#' + $(svg).parent().attr('for'));
      if(e.length==0) e = $('#editor');
      if(!tag)return;
      var neumeTag = tag.parentNode;
      var punctumId = selectedPunctum - /^punctum(\d+)$/.exec(neumeTag.childNodes[0].id)[1];
      var neume = neumeTag.neume;
      var tone = neume.info.tones[punctumId];
      if(!tone || !tone.match)return;
      var letter = tone.match[rtg.tone],
          newLetter,clef;
      if(!letter){
        clef = tone.match[rtg.clef];
        letter = parseInt(clef.slice(-1));
        var newLetter = letter + offset;
        if(newLetter<1)newLetter=1;
        else if(newLetter>4)newLetter=4;
        offset = newLetter - letter;
        if(offset==0)return;
        clef = clef.slice(0,-1) + newLetter;
      } else {
        var newIndex = tone.index + offset;
        if(newIndex<0)newIndex=0;
        else if(newIndex>12)newIndex=12;
        offset = newIndex - tone.index;
        if(offset==0)return;
        newLetter = String.fromCharCode(letter.charCodeAt(0)+offset);
      }

      var cGABC = e.val();
      var index = getHeaderLen(cGABC);
      index += neume.index;
      var tmp=cGABC.slice(0,index);
      cGABC = cGABC.slice(index);
      index = selectSelectedGabc(true);
      var i2 = index + tone.match[0].length;
      var neumeText = cGABC.slice(0,index);
      neumeText += cGABC.slice(index,i2).replace(letter,newLetter);
      index = neume.gabc.length;
      neumeText += cGABC.slice(i2,index);
      cGABC = tmp + neumeText + cGABC.slice(index);
      neume.gabc = neumeText;
      var oldInfo = neume.info;
      var newNeume = neume.info = getChantFragment(neumeText,$(svg).find("defs")[0]);
      if(clef){
        for(i in svg.clefs[selectedNeume].clefs){
          if(!svg.clefs[selectedNeume].clefs.hasOwnProperty(i)) continue;
          var c = svg.clefs[selectedNeume].clefs[i];
          c.setAttributeNS(xlinkns, 'href', '#' + clef);
        }
      }
      stopScore();
      newNeume.tones[punctumId].play(selectedPunctum);
      var use = $(newNeume.def).clone()[0];
      use.neume=neume;
      use.setAttribute("id",neumeTag.id);
      use.setAttribute("x",neumeTag.getAttribute("x"));
      use.setAttribute("y",neumeTag.getAttribute("y"));
      use.setAttribute("transform",neumeTag.getAttribute("transform"));
      $(neumeTag).replaceWith(use);
      neume.wChant = useWidth(use);
      processLedger(neume,use);
      relayoutChant(svg);
      // if this punctum has an associated custos, that needs to be moved as well
      if(punctumId==0 && neume.custos){
        addCustos(neume.custos.parentNode,neume);
      }
      
      var staff = use.parentNode;
      var oldHtone = staff.info.htone;
      var oldLtone = staff.info.ltone;
      if(oldInfo.htone <= neume.info.htone){
        staff.info.htone = Math.max(staff.info.htone,neume.info.htone);
      } else {
        // re-calculate the htone of the system based on all neumes in it.
        staff.info.htone = 10;
        $(staff).find("[id^=neume]").each(function(){
          staff.info.htone = Math.max(staff.info.htone,this.neume.info.htone);
        });
      }
      if(oldInfo.ltone >= neume.info.ltone){ 
        staff.info.ltone = Math.min(staff.info.ltone,neume.info.ltone);
      } else {
        // re-calculate the ltone of the system based on all neumes in it.
        staff.info.ltone = 3;
        $(staff).find("[id^=neume]").each(function(){
          staff.info.ltone = Math.min(staff.info.ltone,this.neume.info.ltone);
        });
      }
      var extraHeight = $(staff.parentNode).children("#system0")[0].info.y;
      if(clef || oldHtone != staff.info.htone || oldLtone != staff.info.ltone){
        var y = finishStaff(staff);
        var lineOffset = staffoffset + y + verticalSpace + staff.info.y;
        // update all staves below as well.
        var i = parseInt(staff.id.match(/\d+$/)[0]) + 1;
        while( (staff = $(staff).siblings('#system'+i)[0]) ){
          staff.info.y = lineOffset;
          y = finishStaff(staff);
          lineOffset = staffoffset + y + verticalSpace + staff.info.y;
          ++i;
        }
      }
      svg.setAttribute('height',$(svg).children("g")[0].getBBox().height + extraHeight + _heightCorrection - _defText.getExtentOfChar("q").height);
      
      punctumId = selectedPunctum - punctumId;
      selectedPunctumTag=null;
      punctumId = setUpPunctaIn(use,punctumId,svg);
      selectedNeumeTag=use;
      e.val(cGABC);
    }
    var selectedSvg = svg;
    var getPunctumOffset=function(parent) {
      var tag=parent.firstElementChild;
      var offset = (tag && parseInt(tag.getAttribute("offset")))||0;
      return parent.neume.index+offset;
    };
    var selectSelectedGabc=function(getOffset){
      if(!(selectedPunctum!=null && selectedPunctumTag))return;
      var tag = selectedPunctumTag;
      var punctumOffset=selectedPunctum - tag.id.match(/^punctum(\d+)$/)[1];
      var parent=tag.parentNode;
      var offset = parseInt(tag.getAttribute("offset"))||0;
      var len = parseInt(tag.getAttribute("len"))||3;
      if(punctumOffset){
        offset += len;
        len = parseInt(tag.getAttribute("len1"));
      }
      if(getOffset) return offset;
      selectGabc(parent.neume.index+offset,len,selectedSvg);
    }
    var selectPunctum=function(punctumToSelect,dontPlay,svg){
      if(svg) {
        selectedSvg = svg;
      } else {
        svg = selectedSvg;
      }
      punctumToSelect=parseInt(punctumToSelect);
      if(punctumToSelect<0)punctumToSelect=-1;
      if(punctumToSelect==selectedPunctum)return;
      var punctumOffset=0,
          punctum;
      if(punctumToSelect<0) {
        dontPlay=true;
        punctum=$();
      } else {
        punctum=$(svg).find("#punctum"+punctumToSelect);
        if(punctum.length==0){
          punctumOffset=1;
          --punctumToSelect;
          punctum=$(svg).find("#punctum"+punctumToSelect);
          if(punctum.length==0 || punctum.attr("count")!=2){
            selectedPunctumTag=null;
            return;
          }
        }
      }
      selectedPunctum=punctumToSelect+punctumOffset;
      selectedPunctumTag=punctum[0];
      var tmp=punctum.parent().attr("id");
      if(tmp)tmp = /neume(\d+)/i.exec(tmp);
      selectedNeume = tmp?parseInt(tmp[1]):-1;
      selectedNeumeTag = selectedPunctumTag && selectedPunctumTag.parentNode;
      selectedNeumeTextTag = $(svg).find('#neumetext'+selectedNeume);
      $(svg).find('.selectable').attr('style','').attr('class',function(i,v){return v.replace(/(^|\s+)selected(?=\s+|$)/g,'');});
      $(svg).find('.neume'+selectedNeume).attr('class',function(i,v){return v+' selected';});
      punctum.attr("class","selectable selected" + (punctum.attr("count")==2?"-"+(1+punctumOffset):""));
      selectedNeumeTextTag.attr('class','selectable selected');
      if(punctum.attr("count")==2)setGradient(punctum[0],punctumOffset);
      
      if(!dontPlay){
        //play tone
        stopScore();
        var punctumId = selectedPunctum - /^punctum(\d+)$/.exec(selectedNeumeTag.childNodes[0].id)[1];
        selectedNeumeTag.neume.info.tones[punctumId].play(selectedPunctum);
      }
    };
    var selectNeume=function(neumeToSelect){
      var neume=$(selectedSvg).find("#neume"+neumeToSelect + ">tspan");
      punctumToSelect=/punctum(\d+)/i.exec(neume.attr("id"));
      if(punctumToSelect) {
        selectPunctum(parseInt(punctumToSelect[1]),true);
        return true;
      } else {
        selectedNeume = parseInt(neumeToSelect);
        selectedNeumeTag = $(selectedSvg).find('#neume'+neumeToSelect).get(0);
        selectedNeumeTextTag = $(selectedSvg).find('#neumetext'+neumeToSelect);
        $(selectedSvg).find('.selectable').attr('style','').attr('class',function(i,v){return v.replace(/(^|\s+)selected(?=\s+|$)/g,'');});
        $(selectedSvg).find('.neume'+selectedNeume).attr('class',function(i,v){return v+' selected';});
        selectedNeumeTextTag.attr('class','selectable selected');
        return selectedNeumeTag;
      }
    };
    var hideSyllableGabc=function(){      
      syllableGabcIndex=-1;
      syllableGabcPrefix='';
      syllableGabcSuffix='';
      syllableGabcOriginalLength=0;
      $('#txtSyllableGabc').hide();
    };
    var hideSyllableEditor=function(){      
      syllableTextIndex=-1;
      syllableTextPrefix='';
      syllableTextSuffix='';
      syllableTextOriginalLength=0;
      $('#txtSyllable').hide();
    };
    var positionTxtSyllableGabc=function(){
      var pos = {my:'center bottom',at:'center top',of:selectedNeumeTag,collision:'fit'},
          tone = (selectedNeumeTag.neume.info.htone < 8.5)? 8 : selectedNeumeTag.neume.info.htone,
      //MOVE txtSyllableGabc down a bit...j
          offset = (5+((12-tone) * staffheight / 8));
      if($.ui.version.match(/^1\.8/)) {
        pos.offset = '0 ' + offset;
      } else {
        pos.my += '+' + offset;
      }
      $('#txtSyllableGabc').position(pos);
    };
    var positionTxtSyllable=function(){
      var $tag = syllableTextTag || selectedNeumeTextTag;
      if($tag && $tag.length) {
        var $txtSyllable = $('#txtSyllable'),
            txtSylText = $txtSyllable.val(),
            sylText = $tag.text(),
            $parent = $tag.parent(),
            parentOffset = $parent.offset(),
            firstX = parseFloat($parent.children().first().attr('x')),
            offset = {top:parentOffset.top - 4, left: parentOffset.left - firstX - 3 + $tag.get(0).x.baseVal.getItem(0).value};
        if(sylText.slice(0,txtSylText.length) != txtSylText) {
          var $lastChild = $tag.children().last(),
              lastChildText = $lastChild.text(),
              txtWidth = $txtSyllable.width(),
              extraSylWidth = lastChildText=='-'?$lastChild.width():textWidth(lastChildText.match(/\s*$/)[0]),
              sylWidth = $tag.width() - extraSylWidth;
          offset.left += sylWidth - txtWidth + 1;
        }
        $txtSyllable.offset(offset);
      }
    };
    var showSyllableGabc=function(neumeTag){
      var originalText,
          text,
          pos = {my:'center bottom',at:'center top',collision:'fit'};
      if(neumeTag==1) {
        pos.of = selectedNeumeTag;
        pos.my = 'left bottom';
        pos.at = 'right top';
        var suffix;
        if($('#txtSyllableGabc').is(':visible')){
          syllableGabcPrefix += $('#txtSyllableGabc').val();
          suffix = syllableGabcSuffix;
        } else {
          syllableGabcPrefix = syllableTextPrefix + $('#txtSyllable').val();
          suffix = syllableTextSuffix;
        }
        var index = 1 + suffix.indexOf(')');
        if(index <= 0) index = suffix.length;
        syllableGabcPrefix += suffix.slice(0,index) + ' (';
        syllableGabcSuffix = ')' + suffix.slice(index);
        text = '';
        ++selectedNeume;
        $('#editor').val(syllableGabcPrefix + syllableGabcSuffix).keyup();
      } else {
        var tag = neumeTag || selectedNeumeTag;
        pos.of = tag;
        syllableGabcIndex = getPunctumOffset(tag);
        if(syllableOffsetCorrection && syllableOffsetCorrection.afterNeume <= selectedNeume) {
          syllableGabcIndex += syllableOffsetCorrection.offset;
        }
        originalText = $('#editor').val();
        syllableGabcIndex += getHeaderLen(originalText);
        var $lastChild = $(tag).children().last();
        syllableGabcOriginalLength = (tag.neume && tag.neume.gabc=='')? 0 : parseInt($lastChild.attr('offset')) + parseInt($lastChild.attr('len'));
        if(isNaN(syllableGabcOriginalLength)) {
          var match = /^([^\)]*)\)/.exec(originalText.slice(syllableGabcIndex));
          syllableGabcOriginalLength = match? match[1].length : 0;
        }
        text = originalText.slice(syllableGabcIndex,syllableGabcIndex+syllableGabcOriginalLength);
        syllableGabcPrefix = originalText.slice(0,syllableGabcIndex)
        syllableGabcSuffix = originalText.slice(syllableGabcIndex+syllableGabcOriginalLength);
      }
      tone = (pos.of.neume.info.htone < 8.5)? 8 : pos.of.neume.info.htone;
      //MOVE txtSyllableGabc down a bit...
      pos.my += '+' + (5+((12-tone) * staffheight / 8));
      $('#txtSyllableGabc').show()
        .val(text)
        .position(pos)
        .trigger('update')
        .select();
    };
    var showSyllableEditor=function($neumeTextTag){
      var $tag = $neumeTextTag || selectedNeumeTextTag,
          tag = $tag.get(0),
          $txtSyllable=$('#txtSyllable');
      syllableTextIndex = parseInt(tag.getAttribute('selectIndex'));
      if(syllableOffsetCorrection && syllableOffsetCorrection.afterNeume < selectedNeume) {
        syllableTextIndex += syllableOffsetCorrection.offset;
      }
      var len = parseInt(tag.getAttribute('selectLen'));
      var originalText = $('#editor').val();
      syllableTextIndex += getHeaderLen(originalText);
      var text = originalText.slice(syllableTextIndex,syllableTextIndex+len);
      syllableTextPrefix = originalText.slice(0,syllableTextIndex);
      syllableTextSuffix = originalText.slice(syllableTextIndex+len);
      syllableTextOriginalLength=len;
      $txtSyllable.show()
        .val(text)
        .trigger('update');
      if($neumeTextTag) {
        syllableTextTag = $neumeTextTag;
      } else {
        $txtSyllable.select();
      }
      positionTxtSyllable();
    }
    var updateOffsetCorrectionGabc=function(){
      var offset = this.value.length - syllableGabcOriginalLength;
      if(offset == 0) {
        syllableOffsetCorrection = {};
      } else {
        syllableOffsetCorrection = {
          afterNeume: selectedNeume + 0.5,
          offset: offset
        };
      }
    };
    var updateOffsetCorrection=function(){
      var offset = this.value.length - syllableTextOriginalLength;
      if(offset == 0) {
        syllableOffsetCorrection = {};
      } else {
        syllableOffsetCorrection = {
          afterNeume: selectedNeume,
          offset: offset
        };
      }
    };
    $(document).on("click","tspan.selectable[id^=punctum]",function(e){
      selectPunctum(/punctum(\d+)/i.exec(this.id)[1],false,$(e.target).parents('svg')[0],!e.altKey);
      if(e.altKey){
        showSyllableGabc();
      }
    }).on("dblclick","tspan.selectable[id^=punctum]",function(e){
      selectPunctum(/punctum(\d+)/i.exec(this.id)[1],false,$(e.target).parents('svg')[0],false);
      showSyllableGabc();
    }).on("mousedown","tspan.selectable[id^=punctum]",function(e){
      if(e.which == 2) {
        selectPunctum(/punctum(\d+)/i.exec(this.id)[1],false,$(e.target).parents('svg')[0],true);
        showSyllableGabc();
        e.preventDefault();
      }
    }).on("click","tspan.selectable[id^=neumetext]",function(e){
      selectNeume(/neumetext(\d+)/i.exec(this.id)[1]);
      if(gabcSettings.showSyllableEditorOnClick) showSyllableEditor();
    }).on("mouseenter","tspan.selectable[id^=neumetext]",function(e){
      if(gabcSettings.showSyllableEditorOnHover && !$('#txtSyllable').is(':visible') || syllableTextTag) {
        showSyllableEditor($(this));
      }
    });
    $('#txtSyllableGabc').on('blur',hideSyllableGabc)
      .keyup(function(e){
        var text = syllableGabcPrefix + $(this).val() + syllableGabcSuffix;
        $('#editor').val(text).keyup();
      }).keydown(function(e){
        switch(e.which) {
          case 27: //escape
            this.blur();
            break;
          case 40: //down
            showSyllableEditor();
            e.preventDefault();
            break;
          case 66: //b
            if(e.ctrlKey || e.altKey) {
              e.preventDefault();
              showSyllableGabc(1)
            }
            break;
          case 37: //left
            if(this.selectionStart == this.selectionEnd && this.selectionStart == 0) {
              selectNeume(selectedNeume - 1);
              showSyllableGabc();
              this.selectionStart = this.value.length;
              e.preventDefault();
            }
            break;
          case 39: //right
            if(this.selectionStart == this.selectionEnd && this.selectionStart == this.value.length) {
              selectNeume(selectedNeume + 1);
              showSyllableGabc();
              this.selectionStart = this.selectionEnd = 0;
              e.preventDefault();
            }
            break;
          case 9: //tab
            selectNeume(selectedNeume + (e.shiftKey? -1 : 1));
            showSyllableGabc();
            e.preventDefault();
        }
      }).on('autoSizeInput',positionTxtSyllableGabc)
      .keydown(function(){var self=this;window.setTimeout( function(){ updateOffsetCorrectionGabc.apply(self); },1)})
      .autoSizeInput();
    var showNextSyllableEditor = function(increment,withSpace) {
      selectedNeumeTextTag = [];
      var neumeToSelect = 1;
      while(neumeToSelect >= 0 && selectedNeumeTextTag.length == 0 && selectedNeumeTag) {
        neumeToSelect = selectedNeume + increment;
        if(!selectNeume(neumeToSelect)) {
          var $txtSyllable = $('#txtSyllable');
          syllableTextPrefix = $('#editor').val() + (withSpace? ' ':'');
          syllableTextSuffix = '()';
          syllableTextOriginalLength=0;
          $txtSyllable.show()
            .val('')
            .trigger('update')
            .select();
          return;
        }
      }
      showSyllableEditor();
    };
    $('#txtSyllable').on('mouseleave',function(){
      if(syllableTextTag) {
        syllableTextTag = null;
        $(this).hide();
      }
    }).on('blur',hideSyllableEditor)
      .click(function(){
        if(syllableTextTag) {
          selectNeume(/neumetext(\d+)/i.exec(syllableTextTag.get(0).id)[1]);
          syllableTextTag = null;
        }
      }).keydown(internationalTextBoxKeyDown)
      .keyup(function(e){
        var text = syllableTextPrefix + $(this).val() + syllableTextSuffix;
        $('#editor').val(text).keyup();
      }).keydown(function(e){
        switch(e.which) {
          case 27: //escape
            this.blur();
            break;
          case 38: //up
            showSyllableGabc();
            e.preventDefault();
            break;
          case 66: //b //TODO...update this
            if(e.ctrlKey || e.altKey) {
              showSyllableGabc(1)
            }
            break;
          case 37: //left
            if(this.selectionStart == this.selectionEnd && this.selectionStart == 0) {
              showNextSyllableEditor(-1);
              this.selectionStart = this.value.length;
              e.preventDefault();
            }
            break;
          case 39: //right
            if(this.selectionStart == this.selectionEnd && this.selectionStart == this.value.length) {
              showNextSyllableEditor(1);
              this.selectionStart = this.selectionEnd = 0;
              e.preventDefault();
            }
            break;
          case 32: //space
            if(this.selectionStart == this.selectionEnd && this.selectionStart == this.value.length) {
              e.preventDefault();
              showNextSyllableEditor(1,true);
            }
            break;
          case 9: //tab
            showNextSyllableEditor(e.shiftKey? -1 : 1);
            //this.selectionStart = 0;
            //this.selectionEnd = this.value.length;
            e.preventDefault();
        }
      }).on('autoSizeInput',positionTxtSyllable)
      .keydown(function(){var self=this;window.setTimeout( function(){ updateOffsetCorrection.apply(self,[e]); },1)})
      .autoSizeInput({comfortZone:1});
    var docKeyDown=function(e){
      if(e.which == 27) { // escape
        stopScore();
        hideSyllableGabc();
        return;
      }
      if(e.target.tagName.match(/textarea|input|select/i)){
        if(e.target.id!='txtSyllableGabc' && e.target.id!='txtSyllable') {
          selectPunctum(-1);
        }
        return;
      }
      var punctumToSelect=selectedPunctum;
      if(e.ctrlKey) {
        var neumeToSelect = selectedNeume;
        switch(e.which){
          case 37: // left;
            --neumeToSelect;
            break;
          case 39: // right
            ++neumeToSelect;
            break;
          case 38: // up
            moveSelectedPunctum(2);
            e.preventDefault();
            return;
          case 40: // down
            moveSelectedPunctum(-2);
            e.preventDefault();
            return;
          case 13: // enter
            callUpdateChant();
            return;
          case 32: // space
            playScore();
            return;
          case 107: // plus
            setRelativeTempo(1);
            return;
          case 109: // minus
            setRelativeTempo(-1);
            return;
          default:
            return;
        }
        selectNeume(neumeToSelect);
      } else {
        switch(e.which){
          case 37: // left;
            --punctumToSelect;
            break;
          case 39: // right
            ++punctumToSelect;
            break;
          case 38: // up
            moveSelectedPunctum(1);
            e.preventDefault();
            return;
          case 40: // down
            moveSelectedPunctum(-1);
            e.preventDefault();
            return;
          case 13: // enter
            showSyllableGabc();
            e.preventDefault();
            return;
          case 32: // space
            playScore(true);
            e.preventDefault();
            return;
          case 107: // plus
            setRelativeTempo(10);
            e.preventDefault();
            return;
          case 109: // minus
            setRelativeTempo(-10);
            e.preventDefault();
            return;
          default:
            //console.info(e.which);
            return;
        }
        selectPunctum(punctumToSelect);
      }
    };
    $(document).keydown(docKeyDown);
  }
  var elements = [];
  var srcCount = 0;
  var srcDownloaded = 0;
  window['updateGabc'] = updateGabc = function(){
    var myElements = $('.jgabc:visible');
    myElements.each(function(index, element) {
      var $element = $(element);
      var elem=$element.clone().toggleClass("jgabc jgabc-svg").text("");
      $element.hide();
      $(svg).clone().appendTo(elem);
      $element.after(elem);
      var src = $element.attr('src');
      if(src) {
        initCount = 200;
        ++srcCount;
        $.get(src,function(data){
          $element.html(data);
          if(++srcDownloaded == srcCount) {
            initCount = 0;
            init();
            updateAllChant(0,true,true);
          }
        });
      }
    });
    elements = $('.jgabc');
    if(elements.length) setTimeout(init,500);
  }
  var _timeoutUpdate=null;
  var _timeoutUpdateWidth=null;
  var updateAllChant = function(e,dontDelay,onlyNewOnes){
    callUpdateChant();
    if(_timeoutUpdate) clearTimeout(_timeoutUpdate);
    if(!dontDelay) {
      var delay = 500;
      _timeoutUpdate = setTimeout(function() {updateAllChant(null,true);},delay);
      return;
    }
    _timeoutUpdate = null;
    $.each(elements, function(index, element) {
      var old=$(element).next(".jgabc-svg").find("svg")[0];
      if(!old) return;
      if(element.innerHTML.match(/^\s*$/)) return;
      if(onlyNewOnes && element.hasSvg) return;
      updateChant(element.innerHTML, old, true);
      element.hasSvg = true;
    });
  }
  var updateAllChantWidthHelper = function(dontDelay){
    if(_timeoutUpdateWidth) clearTimeout(_timeoutUpdateWidth);
    if(!dontDelay) {
      var delay = 500;
      _timeoutUpdateWidth = setTimeout(function() {updateAllChantWidthHelper(true);},delay);
      return;
    }
    _timeoutUpdateWidth = null;
    try {
      relayoutChant(svg);
    } catch(ex) { }
    var chantSvgs = [];
    $.each(elements,function(index, element) {
      var $old=$(element).next(".jgabc-svg").find("svg");
      if($old.length == 0) return;
      $old.data('width', $old[0].parentNode.clientWidth)
      chantSvgs.push($old);
    });
    $.each(chantSvgs, function(index, $old) {
      var startTime = new Date();
      relayoutChant($old,$old.data('width'));
      var gabcProcessTime = new Date() - startTime;
      console.info("Relayout chant time: " + gabcProcessTime);
      $old.trigger('relayout');
    });
    // $.each(otherElements,function(i,e){
    //   var $old=$(e),
    //       old=$old.is('svg')?$old[0] : $old.find('svg')[0];
    //   if(!old) return;
    //   relayoutChant(old);
    //   $old.trigger('relayout');
    // });
  }
  //var updateAllChantWidth;
  if(navigator.userAgent.match(/\bChrome\b/)){
    updateAllChantWidth = function(e){
      updateAllChantWidthHelper(true);
    };
  } else {
    updateAllChantWidth = function(e){
      updateAllChantWidthHelper();
    };
  }
  var callUpdateChant = function(){
    updateChant($("#editor").val(),svg);
  };
  forceUpdateChant = function(){
    updateChant($("#editor").val(),svg,true);
  }
  var handleDragOver=function(e){
    e.stopPropagation();
    e.preventDefault();
    return false;
  };
  var b = function(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};
  var handleDrop=function(e){
    e.stopPropagation();
    e.preventDefault();
    var i;
    var $txtArea = $(this);
    var fileCount = e.originalEvent.dataTransfer.files.length;
    var guid = (uuid && uuid.v4)? uuid.v4() : b();
    for(i=0; i < fileCount; ++i){
      var file = e.originalEvent.dataTransfer.files[i];
      var reader=new FileReader();
      reader.onload=function(e){
        var gabc = processDraggedFile(e.target.result);
        if(fileCount==1) {
          $txtArea
            .val(gabc)
            .keyup();
          }
        if(typeof(processGabc)=="function")processGabc(gabc,guid,fileCount);
      };
      reader.readAsText(file);
    }
  };
  $("#editor")
    .keyup(callUpdateChant)
    .bind('dragover', handleDragOver)
    .bind('drop', handleDrop);
  //$(window).resize(updateAllChant);
  $(window).resize(updateAllChantWidth);
  var tWidth=0;
  var oldTWidth=0;
  var cWidth=0;
  var oldCWidth=0;
  var initCount=0;
  var init = function() {
    if(svg) {
      if(svg.parentNode && svg.parentNode.clientWidth == 0) {
        setTimeout(init, 100);
      } else {
        tWidth=textWidth("abcdefghijklmnopqrstuvwxyz",fontclass,true);
        notewidth = getChantWidth("p");
        cWidth = getChantWidth("p p p p p p p p p p p p p p p");
        if(tWidth != oldTWidth) {
          //console.info('twidth = ' + tWidth + '; (old was ' + oldTWidth + ')');
          _txtWidths={};
          oldTWidth=tWidth;
          forceUpdateChant();
          updateAllChant();
        }
        if(cWidth != oldCWidth) {
          //console.info('cwidth = ' + cWidth + '; (old was ' + oldCWidth + ')');
          oldCWidth=cWidth;
          forceUpdateChant();
          updateAllChant();
        }
        if(++initCount < 100) {
          setTimeout(init,300);
        }
      }
    }
  };
  setTimeout(init, 100);
  updateGabc();
}
);
var processDraggedFile = function(txt){return txt;};
window.updateChant=updateChant;
var neume=_neumeChar;
var indices=_indicesChar;
var makeClefSpan=_clefSpanChar;

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

var makeInternationalTextBoxKeyDown = function(convertFlexa){
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