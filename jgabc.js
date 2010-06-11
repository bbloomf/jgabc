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
	bottomPartPodatus: 0xE153,
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
	dimaond_tilde: 0xe1d3,
	gt: 0xe1e3,
	lt: 0xe1f3,
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
	underscore: 0xe2d2,
	underscore_longer: 0xe2e2,
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
var staffheight = 60;
var spaceheight = staffheight / 4;
var spaceBetweenNeumes = spaceheight;
var fontsize = spaceheight * 1.5;
var spaceWidth = fontsize / 2;
var staffoffset = Math.ceil(staffheight * 1.4);
var svgns = "http://www.w3.org/2000/svg";
var xlinkns="http://www.w3.org/1999/xlink";
var styleCaeciliae = "font-family: 'Caeciliae Staffless'; font-size:" + staffheight;
var svg;
var textElem;
var codea = 'a'.charCodeAt(0);
var codem = codea + 12;
var codeA = 'A'.charCodeAt(0);
var codeM = codeA + 12;
var regexOuter = /((([^\(]+)($|\())|\()([^\)]*)($|\))([ \t]*)/g;
var regexInner = /[!\/ ,;:`]+|[^\)!\/ ,;:`]+/g;
var oldRegexTones = /([\/ ,;:`]+)|([A-M][^a-mA-M]*)|[a-m][^a-mA-M]*/g;

var regexTones = /([\/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(?:([A-M])|([a-m]))(?:(')|(\.{1,2})(_{1,4})|(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5])))*|(z0))/g;
var rtg = {
	whitespace: 1,
	keychange: 2,
	initioDebilis: 3,
	toneUpper: 4, // diamond
	toneLower: 5,
	ictus: 6,
	dot: 7,
	episema: 8,
	noteType: 9,			// (([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|([oO])|([xy])|(q)]|(R|r0|r(?![1-5]))|(r[1-5]))
	virga: 10,				// [Vv]{1,3}
	stropha: 11,			// s{1,3}
	liquescentia: 12,			// [<>~]
	diminutiveLiquescentia: 15,	// ~
	ascendingLiquescentia: 13,	// <
	descendingLiquescentia: 14,	// >
	quilisma: 16,			// w
	oriscus: 17,			// o
	oriscusReverse: 18,		// O
	accidental: 19,			// [xy]
	flat: 20,				// x
	natural: 21,			// y
	q: 22,				// q
	punctumCavum: 26,			// r
	lineaPunctum: 24,			// R
	lineaPunctumCavum: 25,		// r0
	rNumber: 27,			// r[1-5]
	custos: 28				// z0
};


var regexVowel = /[IYiy]?([AEIOUYaeiouy])/g;
var transforms = [['/',' ',',',';',':','`',''],
				  ["'",'_','+',';','|',',',''],
				  [/\//g,/ /g,/,/g,/;/g,/:/g,/`/g,/!/g]];
var abcs = {};
var defs = null;
var defText = null;
var defChant = null;

function updatePreview(text) {
	var old = textElem;
	textElem = getChant(text);
	textElem.setAttribute("id", "1");
	textElem.setAttribute("transform", "translate(0," + staffoffset + ")");
	textElem.setAttribute("style", styleCaeciliae);
	svg.replaceChild(textElem,old);
	svg.setAttribute('height',textElem.getBBox().height);
}

function make(tag) {
	return document.createElementNS(svgns,tag);
}

function getChant(text) {
	var match;
	var count = 0;
	var result;
	regexOuter.lastIndex = 0;
	var result = make('g');
	var xoffset = 0;
	var use;
	var span = null;
	var eText = make('text');
	eText.setAttribute("style", "font-family: Serif; font-size: " + fontsize);
	var lastSpan;
	var ltone = 3;
	var line = 0;
	var lineOffsets = [0];
	var width = svg.width.baseVal.value;
	var neumeInfo = null;
	var needCustos = false;
	addStaff(result,lineOffsets[line]);
	while(match = regexOuter.exec(text)) {
		if(match[5]) {
			neumeInfo = getChantFragment(match[5]);
		}
		var wChant = match[5]? document.getElementById(match[5]).getComputedTextLength() : 0;
		var wText;
		var txt = match[3] || match[7];
		if(match[3] && match[7]) {
			txt += match[7];
		}
		if(txt) {
			defText.firstChild.data = '.' + txt + '.';
			wText = defText.getSubStringLength(1, txt.length);
		} else {
			wText = 0;
		}
		var nextXoffset = xoffset + Math.max(wText, wChant);
		if(nextXoffset >= width) {
			needCustos = true;
			ltone = (3 - ltone);
			ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
			var y = Math.ceil(0.1*staffheight + fontsize + ltone);
			eText.setAttribute("y",y);
			result.appendChild(eText);
			eText = make('text');
			eText.setAttribute("style", "font-family: Serif; font-size: " + fontsize);
			ltone = 3;
			lineOffsets.push(staffoffset + y + lineOffsets[line++]);
			eText.setAttribute('transform', "translate(0," + lineOffsets[line] + ")");
			addStaff(result,lineOffsets[line]);
			nextXoffset -= xoffset;
			xoffset = 0;
		}
			
		if(match[5]) {
			if(needCustos) {
				addCustos(result,neumeInfo.ftone,lineOffsets[line - 1]);
				needCustos = false;
			}
			ltone = Math.min(ltone, neumeInfo.ltone);
			use = make('use');
			use.setAttributeNS(xlinkns, 'href', '#' + match[5]);
			use.setAttribute('x', xoffset);
			use.setAttribute('y', lineOffsets[line]);
			result.appendChild(use);
		} else use = null;
		if(match[3] || match[7]) {
			
			lastSpan = span;
			span = make('tspan');
			
			// Don't worry about placing the vowel correctly if there is no neume.
			if(use) {
				regexVowel.lastIndex = 0;
				vowel = regexVowel.exec(txt);
				var offset = 0;
				if(vowel) {
					var len = regexVowel.lastIndex;
					defText.firstChild.data = txt.substring(0,len);
					offset -= defText.getSubStringLength(0, len - 1);
					offset -= defText.getSubStringLength(len - 1, 1) / 2;
					
					// TODO: some noteheads may have a different width, so this will need to happen differently
					offset += staffheight / 15;//defChant.getComputedTextLength() / 2;
					//alert(defText.firstChild.data + ': ' + defText.getSubStringLength(0, len - 1) + ', ' + (defText.getSubStringLength(len - 1, 1) / 2) + '; ' + (defChant.getComputedTextLength() / 2));
				}
				if(offset > 0) {
					span.setAttribute('x',offset + xoffset);
					wText += offset;
				} else {
					use.setAttribute('transform', "translate(" + (-offset) + ")");
					span.setAttribute('x',xoffset);
					wChant -= offset;
				}
			} else {
				span.setAttribute('x', xoffset);
			}
			xoffset = nextXoffset;
			span.appendChild(document.createTextNode(match[3] || ''));
			
			eText.appendChild(span);
		} else if(use) {
			xoffset += document.getElementById(match[5]).getComputedTextLength();
		}
		count++;
	}
	
	ltone = (3 - ltone);
	ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
	eText.setAttribute("y",Math.ceil(0.1*staffheight + fontsize + ltone));
	result.appendChild(eText);
	return result;
}

function addCustos(result,tone,y) {
	var t = make('text');
	t.setAttribute('style',defChant.getAttribute('style'));
	t.setAttribute('x',svg.width.baseVal.value - (staffheight/15));
	t.setAttribute('y',y);
	t.appendChild(document.createTextNode(String.fromCharCode(indices.custos + tone)));
	result.appendChild(t);
}

function getChantFragment(gabc) {
	if(abcs[gabc] != undefined) {
		return abcs[gabc];
	}
	var result = make('text');
	var ltone = 3;
	var htone = 0;
	var ftone = null;
	result.setAttribute('id', gabc);
	var newdata = '';
	var code;
	var span = make('tspan');
	var char, nextChar;
	var charsLeft = gabc.length;
	var index = 0;
	var prevIndex = 0;
	var base = 0xE103;
	var match;
	regexInner.lastMatch = 0;
	while(match = regexInner.exec(gabc)) {
		var tones = [];
		var previousToneId = 0;
		newdata = '';
		chant=match[0];
		regexTones.lastMatch = 0;
		while(cmatch = regexTones.exec(chant)) {
			tone = cmatch[0];
			if(cmatch[rtg.whitespace]) {
				// merely some kind of text substitution.
				for(var i=0; i < transforms[0].length; ++i) {
					tone = tone.replace(transforms[2][i],transforms[1][i]);
				}
				newdata += tone;
			} else {
				var toneId = tone.charCodeAt(0) - (cmatch[rtg.toneUpper]? codeA : codea);
				if(tone.length == 1) {
					ltone = Math.min(ltone,toneId);
					htone = Math.max(htone,toneId);
					ftone = ftone || toneId;
				}
				tones.push(
				{
					match: cmatch,
					index: toneId,
					relativeTone: toneId - previousToneId,
					modifiers: tone.length == 1? null : tone.substring(1),
					diamond: cmatch[rtg.toneUpper]? true: false
				});
				previousToneId = toneId;
			}
		}
		for(var i=0; i < tones.length; ++i) {
			tone = tones[i];
			var nextTone = (tones.length > i+1)? tones[i+1] : null;
			var thirdTone = (tones.length > i+2)? tones[i+2] : null;
			var lastTone = (i > 0)? tones[i-1]: null;
			base = indices.punctum;
			if(tone.diamond) {
				base = 0xE113;
				var di = Math.abs(tone.relativeTone);
				if(lastTone && lastTone.diamond && di ==  1 || di == 2) {
					if(newdata.length > 0) {
						span.appendChild(document.createTextNode(newdata));
						result.appendChild(span);
						span = make('tspan');
						newdata = '';
					}
					span.setAttribute('dx', staffheight / (di == 1? -20 : 30));
				}	
			} else if(tone.modifiers) {
				if((tone.index == 2 || tone.index == 5) && tone.modifiers[0].match(/[1-4]/)) {
					// TODO: put some of these in other functions
					var currentdy=0;
					if(newdata.length > 0) {
						span.appendChild(document.createTextNode(newdata));
						result.appendChild(span);
						span = make('tspan');
						newdata = '';
					} else {
						currentdy = parseInt(span.getAttribute('dy') || 0);
					}
					line = parseInt(tone.modifiers[0]);
					var dy = 0;
					if(tone.index == 2) {
						char = 'd';
						dy = 2 - line;
					} else {
						char = 'f';
						dy = 3 - line;
					}
					dy *= spaceheight;
					span.setAttribute('dy', dy + currentdy);
					span.appendChild(document.createTextNode(char));
					result.appendChild(span);
					span = make('tspan');
					span.setAttribute('dy', -dy);
					continue;
				}
				ltone = Math.min(ltone,toneId);
				htone = Math.max(htone,toneId);
				ftone = ftone || toneId;
				if(tone.modifiers == 'x' || tone.modifiers == 'y') {
					var aname = (tone.modifiers == 'x')? 'flat' : 'natural';
					if(tone.index%2 == 1) {
						aname += '_line';
						tone.index -= 1;
					}
					index = tone.index / 2;
					index += indices[aname];
					if(index) {
						newdata += String.fromCharCode(index);
					}
					continue;
				} else {
					if(indices[tone.modifiers[0]]) {
						base = indices[tone.modifiers[0]];
						if(nextTone && nextTone.relativeTone == 1 && tone.modifiers == 'w') {
							newdata += String.fromCharCode(base + tone.index);
							++i;
							base = indices.topPartPodatus;
							tone = nextTone;
						}
					}
				}
			} else if(nextTone && !nextTone.diamond) {
				// no modifers, and there is at least one more tone on the stack.
				if(nextTone.relativeTone > 0 && nextTone.relativeTone <=4) {
					base = indices.podatus[nextTone.relativeTone];
					++i;
				} else if(nextTone.relativeTone < 0 && nextTone.relativeTone >= -4) {
					if(thirdTone && thirdTone.relativeTone == 1) {
						base = indices.porrectus[-nextTone.relativeTone];
						newdata += String.fromCharCode(base + tone.index);
						base = indices.topPartPodatus;
						tone = thirdTone;
						++i;
					} else {
						base = indices.clivis[-nextTone.relativeTone];
					}
					++i;
				}
			}
			newdata += String.fromCharCode(base + tone.index);
		}
		if(newdata.length > 0) {
			span.appendChild(document.createTextNode(newdata));
			result.appendChild(span);
		}
	}
	defs.appendChild(result);
	return abcs[gabc] = { 
		ltone: ltone,
		htone: htone,
		ftone: ftone
	};
}

function addStaff(result,y,width) {
	var staff = document.createElementNS(svgns, "use");
	staff.setAttributeNS(xlinkns, "href", "#staff");
	if(!width) width = svg.width.baseVal.value;
	staff.setAttribute("transform", "translate(0, " + (y) +") scale(" + width + ",1)");
	result.appendChild(staff);
}

$(function() {

var table = $("#tbl");
for(var char, code = 0xE0E0; code < 0xFFFF; code += 16) {
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


	svg = document.createElementNS(svgns, 'svg');
	svg.setAttribute('style','width:100%');
	var style = document.createElementNS(svgns, "style");
	style.setAttributeNS(null, "type", "text/css");
	style.appendChild(document.createTextNode("@font-face {font-family: 'Caeciliae Staffless'; font-weight: normal; font-style: normal;src: local(Caeciliae Staffless); src:url(http://jgabc.googlecode.com/svn/trunk/Caeciliae-Staffless.ttf) format(opentype)}" +
		"@font-face {font-family: 'Caeciliae-staffless'; font-weight: normal; font-style: normal; src: local(Caeciliae Staffless)}"));
	svg.appendChild(style);
    defs = document.createElementNS(svgns, "defs");
	defText = make('text');
	defText.setAttribute("style", "font-family: Serif; font-size: " + fontsize);
	defText.appendChild(document.createTextNode(''));
	defs.appendChild(defText);
	defChant = make('text');
	defChant.setAttribute('style', styleCaeciliae);
	defChant.appendChild(document.createTextNode('p'));
	defs.appendChild(defChant);
	
	var gStaff = document.createElementNS(svgns, "g");
	gStaff.setAttributeNS(null, "id", "staff");
	var height = staffheight * 16 / 1000;
	var line = document.createElementNS(svgns, "path");
	var stringLine = "h1v" + height + "h-1zm0 -" + spaceheight;
	line.setAttributeNS(null, "d", "M0 0" + stringLine + stringLine + stringLine + stringLine);
	gStaff.appendChild(line);
	defs.appendChild(gStaff);
	svg.appendChild(defs);
	textElem = document.createElementNS(svgns, "text");
	svg.appendChild(textElem);
	$("#chant-preview").append(svg);
	$("#editor").keyup(
		function(){
			updatePreview($("#editor")[0].value);
		});
	var init = function() {
		if(svg.width.baseVal.value == 0) {
			setTimeout(init, 100);
		} else {
			updatePreview($("#editor")[0].value);
		}
	};
	setTimeout(init, 100);
}
);


