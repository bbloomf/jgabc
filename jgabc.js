String.prototype.repeat = function(num){return new Array(num+1).join(this);}
// lower-staff ext: 0xe1, upper: 0xe2
var indices = {
  flat: 0xE0F1, // these only exist for spaces (acegikm)
  natural: 0xE0F9, // ditto
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
  dot: 0xe2b3,
  apos: 0xe2c2, //ichtus
  ictus: 0xe2c2,
  underscore: 0xe2d2,
  episema: 0xe2d2,
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
  connecting_lines: [
    0xe703,
    0xe713,
    0xe723,
    0xe733
  ],
  decorative_lines: [
    0xe743,
    0xe753,
    0xe763,
    0xe773,
    0xe783
  ]
};
var staffheight = 48;
var spaceheight = staffheight / 4;
var notewidth = staffheight / 6;
var spaceBetweenNeumes = notewidth;
var fontsize = spaceheight*3/2;
var spaceWidth = spaceheight * 3/4;
var staffoffset = Math.ceil(staffheight * 1.4);
var svgns = "http://www.w3.org/2000/svg";
var xlinkns="http://www.w3.org/1999/xlink";
var staffInFont = false;
var fontExt='ttf';
var fontExtS='svg#webfont';
var fontFormat="opentype";
var fontFormatS="svg";
var filenameCaeciliae = "Caeciliae-" + (staffInFont? "Regular." : "Staffless.")+fontExt;
var filenameCaeciliaeS = "Caeciliae-" + (staffInFont? "Regular." : "Staffless.")+fontExtS;
var localCaeciliae = "Caeciliae" + (staffInFont? "" : " Staffless");
var familyCaeciliae = "Caeciliae" + (staffInFont? "" : " Staffless");
var styleCaeciliae = "font-family: '"+familyCaeciliae+"'; font-size:" + staffheight + "px;";
var styleCaeciliaeSvg="font-family: '"+familyCaeciliae+" SVG'; font-size:" + staffheight + "px;";
var styleGoudy = "font-family: 'OFL Sorts Mill Goudy TT';" + " font-size: " + fontsize + "px;";

var styleFont="@font-face {font-family: '"+familyCaeciliae+"'; font-weight: normal; font-style: normal;src: local('"+localCaeciliae+"'); src:url('"+filenameCaeciliae+"') format('"+fontFormat+"')}"
        + "@font-face {font-family: '"+familyCaeciliae+" SVG'; font-weight: normal; font-style: normal;src: url('"+filenameCaeciliaeS+"') format('"+fontFormatS+"')}"
        + "@font-face {font-family: 'OFL Sorts Mill Goudy TT'; font-style: italic; font-weight: normal; src: local('OFL Sorts Mill Goudy Italic TT'), local('OFLGoudyStMTT-Italic'), url('OFLGoudyStMTT-Italic.ttf') format('truetype');}"
        + "@font-face {font-family: 'OFL Sorts Mill Goudy TT'; font-style: normal; font-weight: normal; src: local('OFL Sorts Mill Goudy TT'), local('OFLGoudyStMTT'), url('OFLGoudyStMTT.ttf') format('truetype');}"

var styleFontSvg="@font-face {font-family: '"+familyCaeciliae+"'; font-weight: normal; font-style: normal;src: url('"+filenameCaeciliaeS+"') format('"+fontFormatS+"')}"
        + "@font-face {font-family: 'OFL Sorts Mill Goudy TT'; font-style: italic; font-weight: normal; src: local('OFL Sorts Mill Goudy Italic TT'), local('OFLGoudyStMTT-Italic'), url('OFLGoudyStMTT-Italic.ttf') format('truetype');}"
        + "@font-face {font-family: 'OFL Sorts Mill Goudy TT'; font-style: normal; font-weight: normal; src: local('OFL Sorts Mill Goudy TT'), local('OFLGoudyStMTT'), url('OFLGoudyStMTT.ttf') format('truetype');}"
var svgWidth;
var svg;
var textElem;
var codea = 'a'.charCodeAt(0);
var codem = codea + 12;
var codeA = 'A'.charCodeAt(0);
var codeM = codeA + 12;
var regexHeaderEnd=/(?:^|\n)%%\n/;
var regexOuter = /((([^\(\r\n]+)($|\())|\()([^\)]*)($|\))(?:(\s+)|(?=(?:\([^\)]*\))+(\s*))|)/g;
var regexTag = /<(\/)?(b|i|sc)>/i;
var regexTags= /(<(b|i|sc)>)(.*?)(?:(<\/\1>)|$)/i;
var regexInner = /(?:[!\/ ,;:`]+|[^\)!\/ ,;:`\[]+)(?:\[[^\]]*(?:$|\]))?/g;
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
var setGabcLinkSelector=function(sel){
  linkDownloadSelector=sel;
};
var regexToneModifiers = /(')|(\.{1,2})|((?:_0?){1,4})/g
var regexTones = new RegExp("([/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(([A-M])|([a-m]))(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5]))?((?:" + String(regexToneModifiers).replace(/^\/|\/\w*$/g,"").replace(/\((?!\?:)/g,"(?:") + ")*)|(z0))|\\[([^\\]]*)(?:\\]|$)","g");
//                          /([\/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(([A-M])|([a-m]))(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5]))?((?:(?:')|(?:\.{1,2})|(?:(?:_0?){1,4}))*)|(z0))|\[([^\]]*)(?:\]|$)                                )*)|(z0))|\[([^\]]*)(?:\]|$)
//                          /([\/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(([A-M])|([a-m]))(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5]))?((?:(?:')|(?:\.{1,2})|(?:(?:_0?){1,4}))*)|(z0))|\[([^\]]*)(?:\]|$)
var regexTonesSpliceIndex=26;
var regexToneModifiersCount = 4;
var rtg = {
  whitespace: 1,
  clef: 2,
  initioDebilis: 3,
  tone: 4,
  toneUpper: 5, // diamond
  toneLower: 6,
  noteType: 7,      // (([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|([oO])|([xy])|(q)]|(R|r0|r(?![1-5]))|(r[1-5]))
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
  ictus: 26,        // (')
  dot: 27,          // (\.{1,2})
  episema: 28,      // ((?:_0?)){1,4})
  custos: 29,        // z0
  bracketed: 30      // [text]
};


var regexVowel = /(?:(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[iy])?([aá]u|[ao][eé]?|[aeiouyáéëíóúýæœ]))|\S+/i;
var transforms = [['/',' ',',',';',':','`',''],
      ["'",'_','+',';','|',',',''],
      [/\//g,/ /g,/,/g,/;/g,/:/g,/`/g,/!/g]];
var abcs = {};
var defs = null;
var defText = null;
var _defText = null;
var defChant = null;
var masks = [];
var _timeoutGabcUpdate = null;
var _minUpdateInterval = 1700;
var _heightCorrection = 0;

function updatePreview(text) {
  var old = textElem;
  textElem = getChant(text,true);
  svg.replaceChild(textElem,old);
  svg.setAttribute('height',textElem.getBBox().height + _heightCorrection);
}
var utf8_bom=String.fromCharCode(0xEF)+String.fromCharCode(0xBB)+String.fromCharCode(0xBF);
function encode_utf8( s )
{
  return utf8_bom+unescape( encodeURIComponent( s ) );
}
function decode_utf8( s )
{
  return decodeURIComponent( escape( s ) );
}

function getHeader(text){
  var match=text.match(regexHeaderEnd);
  if(match){
    return text.slice(0,match.index+match[0].length);
  }
  return "";
}
function updateLinks(text){
  var header=getHeader(text);
  if(header){
    text = text.slice(header.length);
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
      //utf8=(header+text).replace(/†/g,String.fromCharCode(134));
      $(linkDownloadSelector).attr("charset","UTF-8").attr("href","data:text/plain;charset=utf8;base64,"+btoa(utf8));
    }
  } catch(e) {
  }
  return text;
}
var gabcProcessTime = 0;
var _nextUpdate = new Date().getTime();
function updateChant(text, svg, dontDelay) {
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
  var nodes = svg.childNodes;
  var old = null;
  for(i = nodes.length - 1; i >= 0; --i) {
    if(nodes[i].tagName == 'g') {
      old = nodes[i];
      break;
    }
  }
  if(!old) return;
  var newElem = getChant(text,svg?(svg.parentNode.id=="chant-preview"):false);
  svg.replaceChild(newElem,old);
  svg.setAttribute('height',newElem.getBBox().height + _heightCorrection);
  gabcProcessTime = new Date() - startTime;
  console.info("Update chant time: " + gabcProcessTime);
  if(gabcProcessTime > 5000) gabcProcessTime=5000;
}

function make(tag) {
  return document.createElementNS(svgns,tag);
}

function textWidth(txt,clas,special) {
  var i=0;
  var len=undefined;
  if(txt.length===0)return 0;
  if(typeof(clas)=="number" && typeof(special)=="number"){
    i=clas;
    len=special;
    clas=special=undefined;
    if(len===0)return 0;
  }
  var dt=special?_defText:defText;
  if($.isArray(txt)){
    if(txt.length==1 && txt[0].tags.length==0) {
      txt = txt[0].text;
      if(clas==undefined)clas="goudy";
    } else {
      $(dt).empty();
      var wid=0;
      var idx=0;
      txt.forEach(function(e){
        var tmp=e.span();
        dt.appendChild(tmp);
        var sIndex=Math.max(i,idx);
        var tlen=Math.min(idx+e.text.length,i+(len||1000000))-sIndex;
        sIndex-=idx;
        idx+=e.text.length;
        if(tlen>0&&sIndex>=0)wid+=tmp.getSubStringLength(sIndex,tlen);
      });
      //console.info(dt.textContent + "[" + i + "," + (len||100) + "]: " + wid + " " + JSON.stringify(txt));
      return wid;
    }
  } else if(typeof(txt)=="object") {
    //txt is a span object hopefully
    $(dt).empty().append($(txt).clone());
    //console.info(txt.textContent + ": " + dt.getComputedTextLength());
    return dt.getComputedTextLength();
  }
  if(clas)dt.setAttribute("class", clas);
  $(dt).text('.' + txt + '.');
  return dt.getSubStringLength(1+i, len||txt.length);
}

function useWidth(use) {
  var text=document.getElementById(use.getAttribute('href').slice(1)).textContent;
  defChant.textContent=text;
  return defChant.getComputedTextLength();
}

function selectGabc(start,len){
  var e=$("#editor")[0];
  var header=getHeader(e.value);
  start+=header.length;
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

function TagInfo(txt,tags) {
  return {
    tags: $.merge([],tags||[]),
    text: txt,
    span: function(){
      var result=make('tspan');
      result.appendChild(document.createTextNode(this.text));
      result.setAttribute("class","goudy " + this.tags.join(" "));
      return result;
    }
  };
}

function getChant(text,makeLinks) {
  var blathering=false;
  var match;
  var count = 0;
  var result = make('g');
  regexOuter.lastIndex = 0;
  result.setAttribute("transform", "translate(0," + staffoffset + ")");
  result.setAttribute("class", "caeciliae");

  var xoffset = 0;
  var xoffsetChantMin = 0;
  var use;
  var use2;
  var span = null;
  var eText = make('text');
  eText.setAttribute("class", "goudy");
  var lastSpan;
  var ltone = 3;
  var line = 0;
  var lineOffsets = [0];
  var width = svg.parentNode.clientWidth;
  try {
    var padding = $(svg.parentElement).css("padding-left");
    if(padding) width -= parseFloat(padding);
  } catch(e) { }
  svgWidth = width;
  var activeTags=[];
  var neumeInfo = null;
  var clef,wClef;
  var needCustos = false;
  var previousMatch;
  var activeClass = "goudy";
  var usesBetweenText = [];
  var curStaff = addStaff(result,0,lineOffsets[line],line, null);
  _heightCorrection=0;
  while(match = regexOuter.exec(text)) {
    var tags=[];
    if(match[5]) {
      neumeInfo = getChantFragment(match[5]);
      clef=neumeInfo.clef||clef;
      if(line==0 && neumeInfo.mindy<_heightCorrection) {
        _heightCorrection = neumeInfo.mindy;
      }
    }
    var wChant = 0;
    if(match[5]){
      defChant.textContent = document.getElementById(match[5]).textContent;
      wChant = defChant.getComputedTextLength();
    }
    if(match[5]==clef)wClef=wChant;
    var wText;
    var space = match[7]||match[8];
    var txt = match[3] || space;
    if(match[3] && space) {
      txt += space;
    }
    var offset = 0;
    if(txt) {
      txt = txt.replace(/^\s+/,'').replace(/\r\n/g,' ').replace(/\n/g,' ').replace(/<v>\\greheightstar<\/v>/g,'*');
      var tm;
      while(tm = regexTag.exec(txt)) {
        var temp=txt.slice(0,tm.index);
        if(temp.length>0)tags.push(TagInfo(temp,activeTags));
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
      var pretext="";
      if(tags.length>0)tags.forEach(function(e){pretext+=e.text;});
      if(txt.length>0)tags.push(TagInfo(txt,activeTags));
      txt = pretext+txt;
      wText = textWidth(tags);
      if(txt) {
        vowel = regexVowel.exec(txt);
        if(!vowel) {
          vowel = {index: 0, "0":txt, "1":txt};
        }
        try {
          var index = vowel.index + vowel[0].length - vowel[1].length;
          offset -= textWidth(tags,0,index);
          offset -= textWidth(tags,index,vowel[1].length) / 2;
        } catch(e) {
        }
        offset += notewidth / 2;//defChant.getComputedTextLength() / 2;
        if(neumeInfo.startsWithAccidental) {
          offset += notewidth*1.2;
        }
      }
    } else {
      wText = 0;
    }
    // if there aren't enough characters before the vowel so that the neume begins far enough to the right of the previous neume,
    // add extra space in the text:
    xoffsetChantMin += offset;
    if(wChant > 0 && (xoffset < xoffsetChantMin || !txt)) {
      xoffset = xoffsetChantMin;
    }
    var nextXoffsetTextMin = txt?
     //Experimental change (2010.03.14)  Old line:
     //Math.max(nextXoffsetTextMin||0,xoffset + wText + Math.max(offset,0))
        xoffset + wText + Math.max(offset,0)
      : nextXoffsetTextMin||0;
    if(match[7]&&match.index>0)nextXoffsetTextMin+=5;
    var nextXoffsetChantMin = xoffset + wChant + spaceBetweenNeumes - Math.min(offset,0);
   //Experimental change (2010.03.14)  Old line:
  //var nextXoffset = wText==0?Math.max(nextXoffset||0,xoffset):Math.max(nextXoffsetTextMin, nextXoffsetChantMin);
    var nextXoffset = wText==0?Math.max(nextXoffset||0,xoffset):nextXoffsetTextMin;
    var lastX;
    if(nextXoffset >= width - spaceBetweenNeumes) {
      needCustos = true;
//      lastX = finishStaff(result,lineOffsets[line]);
      usesBetweenText=[];
      if(span&&txt)span.appendChild(TagInfo('-').span());
      ltone = (3 - ltone);
      ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
      var y = Math.ceil(0.1*staffheight + fontsize + ltone);
      eText.setAttribute("y",y);
      result.appendChild(eText);
      eText = make('text');
      eText.setAttribute("class", "goudy");
      ltone = 3;
      lineOffsets.push(staffoffset + y + lineOffsets[line++]);
      eText.setAttribute('transform', "translate(0," + lineOffsets[line] + ")");
      curStaff = addStaff(result,0,lineOffsets[line],line, null);
      nextXoffset -= xoffset;
      nextXoffsetTextMin -= xoffset;
      nextXoffsetChantMin -= xoffset;
      if(clef){
        var use = make('use');
        use.setAttributeNS(xlinkns, 'href', '#' + clef);
        use.setAttribute('x', 0);
        use.setAttribute('y', lineOffsets[line]);
        result.appendChild(use);
        xoffset=0;
        xoffsetChantMin=wClef+spaceBetweenNeumes+offset;
//        nextStaffX=wClef;
        if(wChant > 0 && xoffset < xoffsetChantMin) {
          xoffset = xoffsetChantMin;
        }
        nextXoffset+=xoffset;
        nextXoffsetTextMin+=xoffset;
        nextXoffsetChantMin+=xoffset;
      } else {
        xoffset=0;
      }
    }
      
    if(match[5]) {
      if(needCustos) {
        addCustos(result,neumeInfo.ftone,lastX,lineOffsets[line - 1]);
        needCustos = false;
      }
      if(neumeInfo.mask) {
        use2 = make('use');
        use2.setAttributeNS(xlinkns, 'href', '#' + neumeInfo.mask);
        use2.setAttribute('class',"caeciliae");
        use2.setAttribute('x', xoffset);
        use2.setAttribute('y', lineOffsets[line]);
        
        //use2 = make('rect');
        //use2.setAttribute('x', xoffset);
        //use2.setAttribute('y', lineOffsets[line]-47);
        //use2.setAttribute('fill','#ffff');
        //use2.setAttribute('height',staffheight*4/5);
        //use2.setAttribute('width',spaceheight/2);
        //use2 = make('circle');
        //use2.setAttribute('cx', xoffset + (64 * staffheight / 1000));
        //use2.setAttribute('cy', lineOffsets[line] - (132 * staffheight / 1000) - spaceheight/2);
        //use2.setAttribute('r', 250 * staffheight / 1000);
        //use2.setAttribute('fill','black');
        masks[line].firstChild.appendChild(use2);
      } else use2 = null;
      ltone = Math.min(ltone, neumeInfo.ltone);
      use = make('use');
      use.setAttributeNS(xlinkns, 'href', '#' + match[5]);
      use.setAttribute('x', xoffset);
      use.setAttribute('y', lineOffsets[line]);
      var aTag;
      if(makeLinks) {
        aTag = make('a');
        aTag.setAttribute('class','svg');
        aTag.setAttributeNS(xlinkns, 'href', 'javascript:selectGabc('+(match.index+match[1].length)+','+match[5].length+')');
        aTag.appendChild(use);
      } else {
        aTag = use;
      }
      result.appendChild(aTag);
      //newstuff
      currentUse=[use];
      if(use2)currentUse.push(use2);
      if(txt) {
        var count = usesBetweenText.length - 1;
        if(count<=0) {
          usesBetweenText[0]=currentUse;
        } else {
          var first = usesBetweenText[0][0];
          var x1=parseFloat(first.getAttribute('x'))+useWidth(first);
          var transform = first.getAttribute('transform');
          if(transform) {
            var m = /translate\((-?\d+(?:.\d+)?)(?:,[^\)+])?\)/.exec(transform);
            x1 += parseFloat(m[1]);
          }
          var x2=xoffset;
          if(offset<0)x2-=offset;
          var chantWidth=0;
          for(var i=1;i<=count;++i) {
            chantWidth+=useWidth(usesBetweenText[i][0]);
          }
          var spaceWidth=x2-x1-chantWidth;
          spaceWidth /= (count+1);
          var x = x1 + spaceWidth;
          for(var i=1;i<=count;++i) {
            var u=usesBetweenText[i];
            for(j in u) {
              u[j].setAttribute('x', x);
          }
            x += spaceWidth + useWidth(u[0]);
          }
          usesBetweenText = [currentUse];
        }
      } else if(usesBetweenText.length>0) {
        usesBetweenText.push(currentUse);
      }
    } else use = use2 = null;
    if(txt) {
      lastSpan = span;
      span = make('tspan');
      var spanXoffset = xoffset;
      // Don't worry about placing the vowel correctly if there is no neume.
      if(use) {
        if(offset > 0) {
          //check if we can push the syllable to the left rather than force a hyphen.
          if(spanXoffset-offset >= xoffsetChantMin) {
            wText -= offset;
            use.setAttribute('transform', "translate(" + (-offset) + ")");
            if(use2)
              use2.setAttribute('transform', "translate(" + (-offset) + ")");
          } else {
            spanXoffset += offset;
            wText += offset;
          }
        } else {
          use.setAttribute('transform', "translate(" + (-offset) + ")");
          if(use2)
            use2.setAttribute('transform', "translate(" + (-offset) + ")");
          wChant -= offset;
        }
      }
      if(lastSpan) {
        var lastXoffset = parseFloat(lastSpan.getAttribute('x'),10);
        var lastSpanX2 = lastXoffset + textWidth(lastSpan);
        if(lastSpanX2 < spanXoffset) {
          lastSpan.appendChild(TagInfo('-').span());
          lastSpanX2 = lastXoffset + textWidth(lastSpan);
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
      span.setAttribute('x', spanXoffset);
      span.setAttribute("class", activeClass);
      xoffset = nextXoffsetTextMin;
      xoffsetChantMin = nextXoffsetChantMin;
      tags.forEach(function(e){
        span.appendChild(e.span());
      });
      eText.appendChild(span);
    } else {
      if(use) {
        xoffsetChantMin = xoffset+document.getElementById(match[5]).getComputedTextLength() + spaceBetweenNeumes;
        xoffset=nextXoffsetTextMin;
      } else {
        xoffsetChantMin = xoffset;
      }
    }
    count++;
    previousMatch = match;
    if(space)span=null;
    if(neumeInfo.ledger && use) {
      var temp = make('use');
      temp.setAttributeNS(xlinkns, 'href', '#ledger' + (neumeInfo.ltone<2?'b':'a'))
      temp.setAttribute('y',use.getAttribute('y'));
      var transform = use.getAttribute('transform');
      var tx = parseFloat(use.getAttribute('x'));
      if(transform) {
        var m = /translate\((-?\d+(?:.\d+)?)(?:,[^\)+])?\)/.exec(transform);
        if(m) tx += parseFloat(m[1]);
      }
      tx -= (chantWidth=useWidth(use));
      temp.setAttribute('transform',"translate("+tx+") scale("+(chantWidth*3)+",1)");
      result.appendChild(temp);
    }
  }
//  finishStaff(result,lineOffsets[line]);
  ltone = (3 - ltone);
  ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
  eText.setAttribute("y",Math.ceil(0.1*staffheight + fontsize + ltone));
  result.appendChild(eText);
  return result;
}

function finishStaff(result,y) {
  var uses=$(result).children("use").toArray();
  var x=0;
  for(i in uses) {
    var cur=uses[i];
    var curY=cur.getAttribute("y");
    if(curY<y)continue;
    else if(curY>y)break;
    var x1=parseFloat(cur.getAttribute('x'));
    var transform = cur.getAttribute('transform');
    if(transform) {
      var m = /translate\((-?\d+(?:.\d+)?)(?:,[^\)+])?\)/.exec(transform);
      x1 += parseFloat(m[1]);
    }
    if(x1>x)addStaff(result,x,y,x1-x);
    x = x1+useWidth(cur);
  }
  return x;
}

function addCustos(result,tone,x,y) {
  var x2=svgWidth - (staffheight/15);
//  addStaff(result,x,y,null,x2-x);
  var t = make('text');
  t.setAttribute('class',defChant.getAttribute('class'));
  t.setAttribute('x',x2);
  t.setAttribute('y',y);
  t.appendChild(document.createTextNode(String.fromCharCode(indices.custos + tone)));
  result.appendChild(t);
}

function getChantFragment(gabc) {
  if(abcs[gabc] != undefined) {
    return abcs[gabc];
  }
  var mask = undefined;
  if(gabc.indexOf('r') > -1) {
    mask = gabc.replace(/r/g,'!');
    getChantFragment(mask);
  }
  var result = make('text');
  var ltone = 3;
  var htone = 0;
  var ftone = null;
  result.setAttribute('id', gabc);
  var newdata = '';
  var code;
  var span = make('tspan');
  var curChar, nextChar;
  var charsLeft = gabc.length;
  var index = 0;
  var prevIndex = 0;
  var match;
  var clef;
  var startsWithAccidental = false;
  var minDy = 0;
  regexInner.lastMatch = 0;
  while(match = regexInner.exec(gabc)) {
    var tones = [];
    var previousToneId = -1;
    newdata = '';
    chant=match[0];
    regexTones.exec('');
    while(cmatch = regexTones.exec(chant)) {
      var imatch=[];
      if(cmatch[regexTonesSpliceIndex]) {
        var test = cmatch[regexTonesSpliceIndex];
        var newmatch;
        while(newmatch=regexToneModifiers.exec(test)) {
          $.extend(imatch,newmatch);
        }
      } else {
        imatch = new Array(regexToneModifiersCount);
      }
      cmatch = cmatch.splice(0,regexTonesSpliceIndex).concat(imatch.splice(1,imatch.length-1)).concat(cmatch.splice(1,cmatch.length-1));
      if(cmatch[rtg.bracketed]) continue;
      if(cmatch[rtg.clef])clef=cmatch[rtg.clef];
      tone = cmatch[0];
      if(cmatch[rtg.whitespace]) {
        // merely some kind of text substitution.
        for(var i=0; i < transforms[0].length; ++i) {
          tone = tone.replace(transforms[2][i],transforms[1][i]);
        }
        newdata += tone;
      } else {
        var toneId = parseInt(cmatch[rtg.tone]||cmatch[rtg.clef].slice(0,1),23)-10;
        if(cmatch[rtg.tone] && cmatch[rtg.tone].length == 1) {
          ltone = Math.min(ltone,toneId);
          htone = Math.max(htone,toneId);
          ftone = ftone || (!cmatch[rtg.accidental]&&toneId);
        }
        tones.push({
          match: cmatch,
          index: toneId,
          relativeTone: previousToneId < 0? 0 : toneId - previousToneId,
          modifiers: cmatch[rtg.noteType],
          clef: cmatch[rtg.clef],
          episemaLoc:(cmatch[rtg.episema] && cmatch[rtg.episema].match(/0/))?-1:0,
          diamond: cmatch[rtg.toneUpper]? true: false,
          liq: cmatch[rtg.diminutiveLiquescentia]
        });
        previousToneId = toneId;
      }
    }
    var data=[newdata];
    var spandata=[span];
    for(var i=0; i < tones.length; ++i) {
      i=neumeTextNoLigatures(tones,i,result,spandata,minDy,data,ltone,htone);
    }
    newdata=data[0];
    span=spandata[0];
    if(newdata.length > 0) {
      span.appendChild(document.createTextNode(newdata));
      result.appendChild(span);
    }
  }
  defs.appendChild(result);
  return abcs[gabc] = { 
    ltone:ltone,
    htone:htone,
    ftone:ftone,
    startsWithAccidental:startsWithAccidental,
    mask:mask,
    clef:clef,
    mindy:minDy,
    ledger:(ltone<2 || htone > 10)
  };
}

var neumeTextNoLigatures=function(tones,i,result,span,minDy,retVal,ltone,htone) {
  var tonesInGlyph = 1;
  var toneReps = 1;
  var extraSpace='';
  var tone = tones[i];
  var nextTone = (tones.length > i+1)? tones[i+1] : null;
  var thirdTone = (tones.length > i+2)? tones[i+2] : null;
  var fourthTone = (tones.length > i+3)? tones[i+3] : null;
  var lastTone = (i > 0)? tones[i-1]: null;
  if(i>1 && tone.relativeTone==0) retVal[0] += "'";
  var base = indices.punctum;
  if(tone.diamond) {
    base = tone.liq? indices.diamond_tilde : indices.diamond;
    var di = Math.abs(tone.relativeTone);
    if(lastTone && lastTone.diamond && (di ==  1 || di == 2)) {
      if(retVal[0].length > 0) {
        span[0].appendChild(document.createTextNode(retVal[0]));
        result.appendChild(span[0]);
        span[0] = make('tspan');
        retVal[0] = '';
      }
      span[0].setAttribute('dx', Math.round(staffheight / (di == 1? -20 : 30)));
    }
    if(nextTone && !nextTone.diamond) extraSpace="''";
  } else if(tone.clef) {
      // TODO: put some of these in other functions
      var currentdy=0;
      if(retVal[0].length > 0) {
        span[0].appendChild(document.createTextNode(retVal[0]));
        result.appendChild(span[0]);
        span[0] = make('tspan');
        retVal[0] = '';
      } else {
        currentdy = parseFloat(span[0].getAttribute('dy') || 0, 10);
      }
      line = parseInt(tone.clef[1],10);
      var dy = 0;
      if(tone.index == 2) {
        curChar = "d''";
        dy = 2 - line;
      } else {
        curChar = "f''";
        dy = 3 - line;
      }
      dy *= spaceheight;
      minDy = Math.min(minDy,dy);
      span[0].setAttribute('dy', dy + currentdy);
      span[0].appendChild(document.createTextNode(curChar));
      result.appendChild(span[0]);
      span[0] = make('tspan');
      span[0].setAttribute('dy', -dy);
      return i;
  }
  else if(tone.modifiers) {
    if(tone.match[rtg.accidental]) {
      if(i==0)startsWithAccidental=true;
      var aname = (tone.match[rtg.flat])? 'flat' : 'natural';
      if(tone.index%2 == 1) {
        aname += '_line';
        tone.index -= 1;
      }
      index = tone.index / 2;
      index += indices[aname];
      if(index) {
        retVal[0] += String.fromCharCode(index) + "/";
      }
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
        if(nextTone && nextTone.relativeTone == 1 && tone.modifiers == 'w') {
          retVal[0] += String.fromCharCode(base + tone.index);
          if(tone.match[rtg.ictus]) {
            retVal[0] += String.fromCharCode(indices.ictus + tone.index);
          }
          if(tone.match[rtg.episema]) {
            retVal[0] += String.fromCharCode(indices.episema + tone.index);
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
      tone.episemaLoc=-1;
      nextTone.episemaLoc=1;
      if(thirdTone && thirdTone.relativeTone < 0 && thirdTone.relativeTone >= -4) {
        base = indices.punctum;
        if(fourthTone && fourthTone.relativeTone>=1 && fourthTone.relativeTone <=5) {
          --i;
          tone.episemaLoc=0;
          nextTone.episemaLoc=0;
        } else {
          retVal[0] += String.fromCharCode(base + tone.index);
          //if(nextTone.relativeTone > 1) retVal[0] += String.fromCharCode(indices.connecting_lines[nextTone.relativeTone-2] + tone.index);
          //retVal[0] += String.fromCharCode(base + nextTone.index);
          //if(thirdTone.relativeTone < -1) retVal[0] += String.fromCharCode(indices.connecting_lines[-thirdTone.relativeTone-2] + thirdTone.index);
          //tone = thirdTone;
          if(nextTone.relativeTone > 1) {
            base = indices.clivis[-thirdTone.relativeTone];
            tone = nextTone;
          } else {
            retVal[0] += String.fromCharCode(base + nextTone.index);
            tone = thirdTone;
          }
          tonesInGlyph = 3;
          ++i;
        }
      } else if(nextTone.relativeTone <=5) {
        base = indices.podatus[nextTone.relativeTone];
        tonesInGlyph = 2;
        if(thirdTone && thirdTone.relativeTone <= 0) extraSpace="''";
        if(nextTone.liq) {
          retVal[0] += String.fromCharCode(indices['<'] + tone.index);
          base = indices.upper_tilde;
          if(nextTone.relativeTone > 1) {
            retVal[0] += String.fromCharCode(indices.connecting_lines[nextTone.relativeTone-2] + tone.index);
          }
          tone=nextTone;
        } else if(nextTone.relativeTone==5) {
          retVal[0] += String.fromCharCode(indices.bottomPartPodatus + tone.index);
          retVal[0] += String.fromCharCode(indices.topPartPodatus + nextTone.index);
          retVal[0] += String.fromCharCode(indices.connecting_lines[3] + tone.index);
          base=null;
        }
      }
      ++i;
    } else if(nextTone.relativeTone < 0 && nextTone.relativeTone >= -5) {
      if(thirdTone && thirdTone.relativeTone >= 1 && thirdTone.relativeTone <= 4 && nextTone.relativeTone >= -4) {
        if(tone.relativeTone >= 2 && tone.relativeTone <= 5) {
          retVal[0] += String.fromCharCode(indices.connecting_lines[tone.relativeTone-2] + tone.index - tone.relativeTone);
        } else if(tone.relativeTone < 1) {
          var lineLen=Math.max(-nextTone.relativeTone,1);
          retVal[0] += String.fromCharCode(indices.decorative_lines[lineLen-1] + tone.index-lineLen);
        }
        retVal[0] += String.fromCharCode(indices.porrectus[-nextTone.relativeTone] + tone.index);
        retVal[0] += String.fromCharCode(indices.topPartPodatus + thirdTone.index);
        if(thirdTone.relativeTone > 1) {
          retVal[0] += String.fromCharCode(indices.connecting_lines[thirdTone.relativeTone-2] + nextTone.index);
        }
        base = null;
        tone = thirdTone;
        tonesInGlyph = 3;
        ++i;
      } else {
        base = indices.clivis[-nextTone.relativeTone];
        tonesInGlyph = 2;
        if(nextTone.liq) {
          var lineLen=Math.max(-nextTone.relativeTone,2);
          retVal[0] += String.fromCharCode(indices.decorative_lines[lineLen-1] + tone.index-lineLen);
          retVal[0] += String.fromCharCode(indices['>'] + tone.index);
          base = indices.lower_tilde;
          tone=nextTone;
          if(tone.relativeTone < -1) {
            retVal[0] += String.fromCharCode(indices.connecting_lines[-tone.relativeTone-2] + tone.index);
          }
        } else if(nextTone.relativeTone==-5) {
          retVal[0] += String.fromCharCode(indices.leftVirga + tone.index);
          tone=nextTone;
          retVal[0] += String.fromCharCode(indices.connecting_lines[3] + tone.index);
          base=indices.punctum;
        }
      }
      ++i;
    }
  }
  var temp = base? String.fromCharCode(base + tone.index) : "";
  if(toneReps>1) {
    temp = (temp+"'").repeat(toneReps).slice(0,-1);
  }
  retVal[0] += temp;
  if(tone.match[rtg.ictus]) {
    retVal[0] += String.fromCharCode(indices.ictus + tone.index + (tone.episemaLoc==1?3:0));
  }
  if(tone.match[rtg.episema]) {
    retVal[0] += String.fromCharCode(indices.episema + tone.index + (tone.episemaLoc==-1?0:3));
  }
  if(tonesInGlyph>1) {
    if(nextTone.match[rtg.ictus]) {
      retVal[0] += String.fromCharCode(indices.ictus + nextTone.index + (nextTone.episemaLoc==1?3:0));
    }
    if(nextTone.match[rtg.episema]) {
      retVal[0] += String.fromCharCode(indices.episema + nextTone.index + (nextTone.episemaLoc==-1?0:3));
    }
  }
  var temp = tone.match[rtg.dot];
  if(temp) temp = temp.length;
    else if(tonesInGlyph == 2) {
      temp = nextTone.match[rtg.dot];
      if(temp) temp = temp.length;
        else temp = 0;
    } else temp = 0;
  if(temp > 1 && nextTone) {
    var low = Math.min(nextTone.index, tone.index);
    var hi = Math.max(nextTone.index, tone.index);
    if(low%2 == 1)
      --low;
    retVal[0] += String.fromCharCode(indices.dot + low);
    retVal[0] += String.fromCharCode(indices.dot + hi);
  } else if(temp > 0) {
    if(tonesInGlyph == 2)
      retVal[0] += String.fromCharCode(indices.dot + nextTone.index);
    else retVal[0] += String.fromCharCode(indices.dot + tone.index);
  }
  if(temp > 0 && tones[i+1]) extraSpace += "'";
  retVal[0] += extraSpace;
  return i;
}

function addStaff(result,x,y,line,width) {
  var maskId = 'staffmask' + line;
  var T;
  if(masks[line]) {
    var tmp = masks[line].firstChild;
    while(tmp.childElementCount > 1) {
      tmp.removeChild(tmp.childNodes[1]);
    }
    T = tmp.firstChild;
  } else {
    var mask = masks[line] = make('mask');
    mask.setAttribute('maskUnits','objectBoundingBox');
    var g = make('g');
    g.setAttribute('class', 'caeciliae');
    mask.appendChild(g);
    var T = make('rect');
    g.appendChild(T);
    mask.setAttribute('id', maskId);
    defs.appendChild(mask);
  }
  T.setAttribute('y', y + 1-staffheight);
  T.setAttribute('width', '10000');
  T.setAttribute('height', staffheight);
  T.setAttribute('fill', 'white');
    
  var group = make('g');
  group.setAttribute('mask','url(#' + maskId + ')');
  var staff = make("use");
  staff.setAttributeNS(xlinkns, "href", "#staff");
  if(!width) width = svg.parentNode.clientWidth;
  staff.setAttribute("transform", "translate("+(x)+", "+(y)+") scale(" + (width) + ",1)");
  group.appendChild(staff);
  result.appendChild(group);
  return staff;
}

$(function() {
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

  svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('style','width:100%');
  var style = document.createElementNS(svgns, "style");
  style.setAttribute("type", "text/css");
  svgStyle=style;
  svgStyle.appendChild(document.createTextNode(""));
  setSvgFont=function(useSvg){
    style.firstChild.textContent = useSvg?styleFontSvg:styleFont;
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
    defs = document.createElementNS(svgns, "defs");
  defText = make('text');
  defText.setAttribute("class", "goudy");
  defText.appendChild(document.createTextNode(''));
  defs.appendChild(defText);
  _defText = make('text');
  _defText.setAttribute("class", "goudy");
  _defText.appendChild(document.createTextNode(''));
  defs.appendChild(_defText);
  defChant = make('text');
  defChant.setAttribute('class', 'caeciliae');
  defChant.appendChild(document.createTextNode('p'));
  defs.appendChild(defChant);
  defChantSvg=make('text');
  defChantSvg.setAttribute('class', 'caeciliaeSvg');
  defChantSvg.appendChild(document.createTextNode('p'));
  defs.appendChild(defChantSvg);
  
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
    defs.appendChild(ledger);
    ledger = document.createElementNS(svgns, "g");
    line = document.createElementNS(svgns, "path");
    line.setAttribute("d","M0 " + (-spaceheight*4) + stringLine);
    ledger.appendChild(line);
    ledger.setAttribute("id","ledgera");
    defs.appendChild(ledger);
  }
  gStaff.setAttribute("id", "staff");
  defs.appendChild(gStaff);
  
  
  svg.appendChild(defs);
  textElem = document.createElementNS(svgns, "g");
  svg.appendChild(textElem);
  $("#chant-preview").append(svg);
  var elements = $('.jgabc');
  elements.each(function(index, element) {
    $(svg).clone().appendTo(element);
  });
  var callUpdateChant = function(){
    updateChant($("#editor").val(), svg);
  };
  forceUpdateChant = function(){
    updateChant($("#editor").val(),svg,true);
  }
  $("#editor").keyup(callUpdateChant);
  $(window).resize(callUpdateChant);
  var tWidth=0;
  var oldTWidth=0;
  var initCount=0;
  var init = function() {
    if(svg.parentNode.clientWidth == 0) {
      setTimeout(init, 100);
    } else {
      tWidth=textWidth("abcdefghijklmnopqrstuvwxyz","goudy",true);
      if(tWidth != oldTWidth) {
        //console.info(tWidth + " " + oldTWidth);
        oldTWidth=tWidth;
        forceUpdateChant();
        elements.each(function(index, element) {
          var nodes = element.childNodes;
          var old = null;
          for(i = nodes.length - 1; i >= 0; --i) {
            if(nodes[i].tagName == 'svg') {
              old = nodes[i];
              break;
            }
          }
          if(!old) return;
          
          updateChant(element.innerText, old);
        });
      }
      if(++initCount < 40) {
        setTimeout(init,100);
      }
    }
  };
  setTimeout(init, 100);
}
);

window['updatePreview']=updatePreview;
window['updateChant']=updateChant;
