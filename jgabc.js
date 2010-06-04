// lower-staff ext: 0xe1, upper: 0xe2
var indices = {
	flat: 0xE0F1, // these only exist for spaces (acegikm)
	natural: 0xE0F9, // ditto
	flat_line: 0xe340,  // these only exist for lines (bdfhjl)
	natural_line: 0xe346,
	punctum: 0xE103,
	diamond: 0xE113,
	v: 0xE123,
	stemOnLeft: 0xE133,
	w: 0xE143, //quilisma
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
	unerscore_longer: 0xe2e2,
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
var fontsize = spaceheight * 1.5;
var svgns = "http://www.w3.org/2000/svg";
var xlinkns="http://www.w3.org/1999/xlink";
var svg;
var textElem;
var codea = 'a'.charCodeAt(0);
var codem = codea + 12;
var codeA = 'A'.charCodeAt(0);
var codeM = codeA + 12;
var regexOuter = /((([^\(]+)($|\())|\()([^\)]*)($|\))([ \t]*)/g;
var regexInner = /[!\/ ,;:`]+|[^\)!\/ ,;:`]+/g;
var regexTones = /([\/ ,;:`]+)|([A-M][^a-mA-M]*)|[a-m][^a-mA-M]*/g;
var regexVowel = /[AEIOUYaeiouy]/g;
var transforms = [['/',' ',',',';',':','`',''],
				  ["'",'_','+',';','|',',',''],
				  [/\//g,/ /g,/,/g,/;/g,/:/g,/`/g,/!/g]];
var abcs = {};
var defs = null;
var vowelDefs = {A:null,E:null,I:null,O:null,U:null,Y:null,a:null,e:null,i:null,o:null,u:null,y:null};

function updatePreview(text) {
	var old = textElem;
	textElem = getChant(text);
	textElem.setAttribute("id", "1");
	textElem.setAttribute("transform", "translate(0,85)");
	textElem.setAttribute("style", "font-family: 'Caeciliae Staffless'; font-size:" + staffheight);
	svg.replaceChild(textElem,old);
}

function make(tag) {
	return document.createElementNS(svgns,tag);
}

function getChant(text) {
	var match;
	var count = 0;
	var result;
	regexOuter.lastIndex = 0;
	while(match = regexOuter.exec(text)) {
		if(match[5]) {
			getChantFragment(match[5]);
			var result = make('g');
			var use = make('use');
			use.setAttributeNS(xlinkns, 'href', '#' + match[5]);
			result.appendChild(use);
		} else {
			result = make('g');
		}
		if(match[3]) {
			var span = make('text');
			span.setAttribute("style", "font-family: Serif; font-size: " + fontsize);
			// TODO: calculate this based on the lowest note in this line, if the lowest note is lower than d (3);
			// (Just add ((3 - ltone) * spaceheight)/2 to the y attribute below, if 3 - ltone is positive.
			ltone = 3;
			ltone = (3 - ltone);
			ltone = (ltone <= 0)? 0 : ((ltone * spaceheight)/2);
			span.setAttribute("y",1.5*staffheight + fontsize + ltone);
			
			regexVowel.lastIndex = 0;
			vowel = match[3].match(regexVowel);
			var offset = 0;
			if(vowel) {
				var vWidth = vowelDefs[vowel[0]].getBBox().width;
				var prevowel = match[3].substring(regexVowel.lastIndex);
				offset = vWidth / 2;
				if(prevowel.length > 0) {
					span.appendChild(document.createTextNode(prevowel));
					defs.appendChild(span);
					offset += span.getBBox().width;
					defs.removeChild(span);
					span.removeChild(span.firstChild);
				}
			}
			span.setAttribute("x",-offset);
			span.appendChild(document.createTextNode(match[3]));
			
			result.appendChild(span);
		}
		if(match[7]) {
			// TODO: do something with this whitespace from after the chant notation.
		}
		count++;
	}
	if(!result)
		result = make('g');
	return result;
	return count;
}

function getChantFragment(gabc) {
	if(abcs[gabc]) {
		return;
	}
	var result = abcs[gabc] = make('text');
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
			if(cmatch[1]) {
				// merely some kind of text substitution.
				for(var i=0; i < transforms[0].length; ++i) {
					tone = tone.replace(transforms[2][i],transforms[1][i]);
				}
				newdata += tone;
			} else {
				var toneId = tone.charCodeAt(0) - (cmatch[2]? codeA : codea);
				tones.push(
				{
					index: toneId,
					relativeTone: toneId - previousToneId,
					modifiers: tone.length == 1? null : tone.substring(1),
					diamond: cmatch[2]? true: false
				});
				previousToneId = toneId;
			}
		}
		for(var i=0; i < tones.length; ++i) {
			tone = tones[i];
			var nextTone = (tones.length > i+1)? tones[i+1] : null;
			var thirdTone = (tones.length > i+2)? tones[i+2] : null;
			base = indices.punctum;
			if(tone.modifiers) {
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
			} else if(nextTone) {
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
			if(tone.diamond) {
				base = 0xE113;
				var di = Math.abs(prevIndex - index);
				if(di ==  1 || di == 2) {
					if(newdata.length > 0) {
						span.appendChild(document.createTextNode(newdata));
						result.appendChild(span);
						span = make('tspan');
						newdata = '';
					}
					span.setAttribute('dx', staffheight / (di == 1? -20 : 30));
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
	return;
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
  
  var data = "d";
    var style = document.createElementNS(svgns, "style");
	style.setAttributeNS(null, "type", "text/css");
	style.appendChild(document.createTextNode("@font-face {font-family: 'Caeciliae Staffless'; font-weight: normal; font-style: normal;src: local(Caeciliae Staffless); src:url(http://jgabc.googlecode.com/svn/tags/web/Caeciliae-Staffless.ttf) format(opentype)}" +
		"@font-face {font-family: 'Caeciliae-staffless'; font-weight: normal; font-style: normal; src: local(Caeciliae Staffless)}"));
	svg.appendChild(style);
    defs = document.createElementNS(svgns, "defs");
	for(var v in vowelDefs) {
		var text = vowelDefs[v] = make('text');
		text.setAttribute("style", "font-family: Serif; font-size: " + fontsize);
		text.appendChild(document.createTextNode(v));
		defs.appendChild(text);
	}
//	var fontface = document.createElementNS(svgns, "font-face");
//	fontface.setAttributeNS(svgns, "font-family", "Caeciliae-web");
//	var fontfacesrc = document.createElementNS(svgns, "font-face-src");
//	var fontfaceuri = document.createElementNS(svgns, "font-face-uri");
//	var fontfaceformat = document.createElementNS(svgns, "font-face-format");
//	fontfaceformat.setAttributeNS(null, "string", "opentype");
//	fontfaceuri.setAttributeNS(xlinkns, "href", "caeciliae-Regular.ttf");
//	fontfaceuri.appendChild(fontfaceformat);
//	fontfacesrc.appendChild(fontfaceuri);
//	fontface.appendChild(fontfacesrc);
//	defs.appendChild(fontface);
	var gStaff = document.createElementNS(svgns, "g");
	gStaff.setAttributeNS(null, "id", "staff");
	//gStaff.setAttributeNS(null, "transform", "translate(0," + (-increment * 3));
	var line;
	var increment = staffheight / 4;
	var height = staffheight * 16 / 1000;
	line = document.createElementNS(svgns, "path");
	var stringLine = "h1v" + height + "h-1zm0 -" + increment;
	line.setAttributeNS(null, "d", "M0 0" + stringLine + stringLine + stringLine + stringLine);
	gStaff.appendChild(line);
	defs.appendChild(gStaff);
	svg.appendChild(defs);
	var staff = document.createElementNS(svgns, "use");
	staff.setAttributeNS(xlinkns, "href", "#staff");
	staff.setAttribute("transform", "translate(0, 85) scale(1000,1)");
	svg.appendChild(staff);
	textElem = document.createElementNS(svgns, "text");
	textElem.setAttributeNS(null, "id", "test");
	textElem.setAttributeNS(null, "x", 0);
	textElem.setAttributeNS(null, "y", 85);
	textElem.setAttributeNS(null, "style", "font-family: 'Caeciliae Staffless'; font-size:" + staffheight);
	textElem.appendChild(document.createTextNode(data));
	svg.appendChild(textElem);
  
	$("#chant-preview").append(svg);
	$("#editor").keyup(
		function(){
			updatePreview($("#editor")[0].value);
		});
	}
);


