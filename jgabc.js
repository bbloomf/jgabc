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
	ictus: 0xe2c2,
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
var notewidth = staffheight / 6;
var spaceBetweenNeumes = notewidth;
var fontsize = spaceheight * 1.5;
var spaceWidth = fontsize / 2;
var staffoffset = Math.ceil(staffheight * 1.4);
var svgns = "http://www.w3.org/2000/svg";
var xlinkns="http://www.w3.org/1999/xlink";
var styleCaeciliae = "font-family: 'Caeciliae Staffless'; font-size:" + staffheight;
var styleGoudy = "font-family: 'OFL Sorts Mill Goudy TT';";
var svg;
var textElem;
var codea = 'a'.charCodeAt(0);
var codem = codea + 12;
var codeA = 'A'.charCodeAt(0);
var codeM = codeA + 12;
var regexOuter = /((([^\(\r\n]+)($|\())|\()([^\)]*)($|\))([ \t]*)/g;
var regexInner = /[!\/ ,;:`]+|[^\)!\/ ,;:`]+/g;
var oldRegexTones = /([\/ ,;:`]+)|([A-M][^a-mA-M]*)|[a-m][^a-mA-M]*/g;

var regexTones = /([\/ ,;:`]+)|([cfCF][1-4])|(?:(-)?(?:([A-M])|([a-m]))(?:(')|(\.{1,2})|(_{1,4})|(([Vv]{1,3})|(s{1,3})|((<)|(>)|(~))|(w)|(o)|(O)|((x)|(y))|(q)|((R)|(r0)|(r(?![1-5])))|(r[1-5])))*|(z0))/g;
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


var regexVowel = /(?:[cgq]u(?=[aeiouyáéëíóúýæœ])|[iy])?([aá]u|[ao][eé]?|[aeiouyáéëíóúýæœ])/gi;
var transforms = [['/',' ',',',';',':','`',''],
			["'",'_','+',';','|',',',''],
			[/\//g,/ /g,/,/g,/;/g,/:/g,/`/g,/!/g]];
var abcs = {};
var defs = null;
var defText = null;
var defChant = null;
var masks = [];

function updatePreview(text) {
	var old = textElem;
	textElem = getChant(text);
	svg.replaceChild(textElem,old);
	svg.setAttribute('height',textElem.getBBox().height);
}

function updateChant(text, svg) {
	var nodes = svg.childNodes;
	var old = null;
	for(i = nodes.length - 1; i >= 0; --i) {
		if(nodes[i].tagName == 'g') {
			old = nodes[i];
			break;
		}
	}
	if(!old) return;
	var newElem = getChant(text);
	svg.replaceChild(newElem,old);
	svg.setAttribute('height',newElem.getBBox().height);
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
	//result.setAttribute("id", "1");
	result.setAttribute("transform", "translate(0," + staffoffset + ")");
	result.setAttribute("style", styleCaeciliae);

	var xoffset = 0;
	var xoffsetChantMin = 0;
	var use;
	var use2;
	var span = null;
	var eText = make('text');
	eText.setAttribute("style", styleGoudy + " font-size: " + fontsize);
	var lastSpan;
	var ltone = 3;
	var line = 0;
	var lineOffsets = [0];
	var width = svg.width.baseVal.value;
	var neumeInfo = null;
	var needCustos = false;
	var previousMatch;
	addStaff(result,lineOffsets[line], line);
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
		var offset = 0;
		if(txt) {
			txt = txt.trimLeft().replace('\r\n',' ').replace('\n',' ');
			defText.firstChild.data = '.' + txt + '.';
			wText = defText.getSubStringLength(1, txt.length);
			regexVowel.lastIndex = 0;
			vowel = regexVowel.exec(txt);
			if(!vowel) {
				vowel = {index: 0, "0":txt, "1":txt};
			}
			var len = vowel.index + vowel[0].length;
			defText.firstChild.data = txt.substring(0,len);
			try {
				var index = vowel.index + vowel[0].length - vowel[1].length;
				offset -= defText.getSubStringLength(0, index);
				offset -= defText.getSubStringLength(index, vowel[1].length) / 2;
			} catch(e) {
			}
			// TODO: some noteheads may have a different width, so this will need to happen differently
			offset += notewidth / 2;//defChant.getComputedTextLength() / 2;
			//alert(defText.firstChild.data + ': ' + defText.getSubStringLength(0, len - 1) + ', ' + (defText.getSubStringLength(len - 1, 1) / 2) + '; ' + (defChant.getComputedTextLength() / 2));
		} else {
			wText = 0;
		}
		// if there aren't enough characters before the vowel so that the neume begins far enough to the right of the previous neume,
		// add extra space in the text:
		xoffsetChantMin += offset;
		if(wChant > 0 && xoffset < xoffsetChantMin) {
			xoffset = xoffsetChantMin;
		}
		var nextXoffsetTextMin = xoffset + wText;
		var nextXoffsetChantMin = xoffset + wChant + spaceBetweenNeumes - offset;
		var nextXoffset = Math.max(nextXoffsetTextMin, nextXoffsetChantMin);
		if(wText == 0)
			nextXoffsetTextMin = nextXoffsetChantMin;
		if(nextXoffset >= width - spaceBetweenNeumes) {
			needCustos = true;
			ltone = (3 - ltone);
			ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
			var y = Math.ceil(0.1*staffheight + fontsize + ltone);
			eText.setAttribute("y",y);
			result.appendChild(eText);
			eText = make('text');
			eText.setAttribute("style", styleGoudy + " font-size: " + fontsize);
			ltone = 3;
			lineOffsets.push(staffoffset + y + lineOffsets[line++]);
			eText.setAttribute('transform', "translate(0," + lineOffsets[line] + ")");
			curStaff = addStaff(result,lineOffsets[line], line);
			nextXoffset -= xoffset;
			nextXoffsetTextMin -= xoffset;
			nextXoffsetChantMin -= xoffset;
			xoffset = 0;
		}
			
		if(match[5]) {
			if(needCustos) {
				addCustos(result,neumeInfo.ftone,lineOffsets[line - 1]);
				needCustos = false;
			}
			if(neumeInfo.mask) {
				use2 = make('use');
				use2.setAttributeNS(xlinkns, 'href', '#' + neumeInfo.mask);
				use2.setAttribute('x', xoffset);
				use2.setAttribute('y', lineOffsets[line]);
				
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
			result.appendChild(use);
		} else use = use2 = null;
		if(match[3] || match[7]) {
			
			lastSpan = span;
			span = make('tspan');
			var spanXoffset = xoffset;
			// Don't worry about placing the vowel correctly if there is no neume.
			if(use) {
				if(offset > 0) {
					spanXoffset += offset;
					wText += offset;
				} else {
					use.setAttribute('transform', "translate(" + (-offset) + ")");
					if(use2)
						use2.setAttribute('transform', "translate(" + (-offset) + ")");
					wChant -= offset;
				}
			}
			if(previousMatch && previousMatch[3] && !previousMatch[7]) {
				defText.firstChild.data = lastSpan.firstChild.data;
				var lastXoffset = parseInt(lastSpan.getAttribute('x'));
				var lastSpanX2 = lastXoffset + defText.getComputedTextLength();
				if(lastSpanX2 < spanXoffset) {
					lastSpan.firstChild.data += '-';
					defText.firstChild.data += '-';
					lastSpanX2 = lastXoffset + defText.getComputedTextLength();
					if(lastSpanX2 > spanXoffset) {
						var additionalOffset = lastSpanX2 - spanXoffset;
						spanXoffset = lastSpanX2;
						if(use) {
							use.setAttribute('x', xoffset + additionalOffset);
						}
						nextXoffsetTextMin += additionalOffset;
						nextXoffsetChantMin += additionalOffset;
					}
				}
			}
			span.setAttribute('x', spanXoffset);
			
			xoffset = nextXoffsetTextMin;
			xoffsetChantMin = nextXoffsetChantMin;
			span.appendChild(document.createTextNode(txt || ''));
			
			eText.appendChild(span);
		} else if(use) {
			xoffset += document.getElementById(match[5]).getComputedTextLength() + 5;
		}
		count++;
		previousMatch = match;
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
	var mask = undefined;
	if(gabc.indexOf('r') > -1) {
		var mask = gabc.replace(/r/g,'!');
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
			var tonesInGlyph = 1;
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
						char = "d''";
						dy = 2 - line;
					} else {
						char = "f''";
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
					tonesInGlyph = 2;
					++i;
				} else if(nextTone.relativeTone < 0 && nextTone.relativeTone >= -4) {
					if(thirdTone && thirdTone.relativeTone == 1) {
						base = indices.porrectus[-nextTone.relativeTone];
						newdata += String.fromCharCode(base + tone.index);
						base = indices.topPartPodatus;
						tone = thirdTone;
						tonesInGlyph = 3;
						++i;
					} else {
						base = indices.clivis[-nextTone.relativeTone];
						tonesInGlyph = 2;
					}
					++i;
				}
			}
			newdata += String.fromCharCode(base + tone.index);
			//TEST CODE
			if(tone.match[rtg.ictus]) {
				newdata += String.fromCharCode(indices.ictus + tone.index);
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
				newdata += String.fromCharCode(indices.dot + low);
				newdata += String.fromCharCode(indices.dot + hi);
			} else if(temp > 0) {
				if(tonesInGlyph == 2)
					newdata += String.fromCharCode(indices.dot + nextTone.index);
				else newdata += String.fromCharCode(indices.dot + tone.index);
			}
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
		ftone: ftone,
		mask: mask
	};
}

function addStaff(result,y,line,width) {
	var maskId = 'staffmask' + line;
	if(masks[line]) {
		var tmp = masks[line].firstChild;
		while(tmp.childElementCount > 1) {
			tmp.removeChild(tmp.childNodes[1]);
		}
	} else {
		var mask = masks[line] = make('mask');
		var g = make('g');
		g.setAttribute('style', styleCaeciliae);
		mask.appendChild(g);
var T = make('rect');
T.setAttribute('y', y + 1-staffheight);
T.setAttribute('width', '10000');
T.setAttribute('height', staffheight);
T.setAttribute('fill', 'white');
g.appendChild(T);
		mask.setAttribute('id', maskId);
		
		defs.appendChild(mask);
	}
	var group = make('g');
	group.setAttribute('mask','url(#' + maskId + ')');
	var staff = make("use");
	staff.setAttributeNS(xlinkns, "href", "#staff");
	if(!width) width = svg.width.baseVal.value;
	staff.setAttribute("transform", "translate(0, " + (y) +") scale(" + width + ",1)");
	group.appendChild(staff);
	result.appendChild(group);
	return staff;
}

$(function() {

	var table = $("#tbl");
	if(table) {
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
	}

	svg = document.createElementNS(svgns, 'svg');
	svg.setAttribute('style','width:100%');
	var style = document.createElementNS(svgns, "style");
	style.setAttributeNS(null, "type", "text/css");
	style.appendChild(document.createTextNode("@font-face {font-family: 'Caeciliae Staffless'; font-weight: normal; font-style: normal;src: local(Caeciliae Staffless); src:url(http://jgabc.googlecode.com/svn/trunk/Caeciliae-Staffless.ttf) format(opentype)}" +
		"@font-face {font-family: 'Caeciliae-staffless'; font-weight: normal; font-style: normal; src: local(Caeciliae Staffless)}" +
		"@font-face {font-family: 'OFL Sorts Mill Goudy TT'; font-style: italic; font-weight: normal; src: local('OFL Sorts Mill Goudy Italic TT'), local('OFLGoudyStMTT-Italic'), url('http://themes.googleusercontent.com/font?kit=4zlbkWdiblhTyAxV3yYOK1Map0k-03pf3IKr-TpLv1-glnMp3_3A8V8Ai8YosRtX') format('truetype');}" +
		"@font-face {font-family: 'OFL Sorts Mill Goudy TT'; font-style: normal; font-weight: normal; src: local('OFL Sorts Mill Goudy TT'), local('OFLGoudyStMTT'), url('http://themes.googleusercontent.com/font?kit=9ZZVVBRCceNnPBXqWLH8IBaCi8XR2Wndwbau3-eaE1g') format('truetype');}"));
	svg.appendChild(style);
    defs = document.createElementNS(svgns, "defs");
	defText = make('text');
	defText.setAttribute("style", styleGoudy + " font-size: " + fontsize);
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
	textElem = document.createElementNS(svgns, "g");
	svg.appendChild(textElem);
	$("#chant-preview").append(svg);
	var elements = $('.jgabc');
	elements.each(function(index, element) {
		$(svg).clone().appendTo(element);
	});
	
	$("#editor").keyup(
		function(){
			updateChant($("#editor")[0].value, svg);
		});
	var init = function() {
		if(svg.width.baseVal.value == 0) {
			setTimeout(init, 100);
		} else {
			updateChant($("#editor")[0].value, svg);
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
	};
	setTimeout(init, 100);
}
);


