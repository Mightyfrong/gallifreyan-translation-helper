let cLetter; // is there a "c"?
let qLetter; // is there a "q"?
let consonant = 30; // radius of consonants
let vowel = Math.floor(consonant / 2); // radius of vowels
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
import {
	color,
	draw
} from './utils.js'

//    _                                 _ ___ _         _   _
//   | |_ ___ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | .'|_ -| -_| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|__,|___|___| |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                         |_|
//specify base for every letter, assign base to latin characters and specify geometric properties
let shermansBase = {
	scgtable: {
		/* example: { // name of group
			contains: [...], // array of characters for which the handling and properties apply
			centerYoffset: NUMBER, // relative offset to the y-position of the word line/circle
			radialPlacement: function (radiant=DEFAULTVALUE){ // position of items to be placed relative to the center of the base
				let options = {
					ve: {x: 0, y: 0}, // e.g. placing of e-vowel on the center of the base
					va: {x: 0, y: -this.centerYoffset}, // e.g. placing of the a-vowel still outside of the word-circle
					vo: { // e.g. placing of the o-vowel or everything else on the base-circle/-arc
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo"; // same rules for o, diacritics, line-decorators
				return options[item]; // returns x- and y-properties
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) { // drawing instructions based on center of character. rad might define a rotation in the future
				if (baseline) draw.line(x - r * 1.25, y - this.centerYoffset, x + r * 1.25, y - this.centerYoffset);
				draw.circle(x, y, r, lw);
			}
		}*/
		punctuation: {
			contains: [".", "?", "!", "\"", "'", "-", ",", ";", ":"],
			centerYoffset: consonant * 1.25,
			draw: function (letter, x, y, r) {
				draw.line(x - r * 1.25, y + this.centerYoffset, x + r * 1.25, y + this.centerYoffset);
				switch (letter) {
					case ".":
						draw.circle(x, y + this.centerYoffset, r);
						break;
					case "?":
						draw.dot(x - r, y + this.centerYoffset * .7, r * .5);
						draw.dot(x + r, y + this.centerYoffset * .7, r * .5);
						break;
					case "!":
						draw.dot(x - r, y + this.centerYoffset * .7, r * .5);
						draw.dot(x, y + this.centerYoffset * .7, r * .5);
						draw.dot(x + r, y + this.centerYoffset * .7, r * .5);
						break;
					case "\"":
						draw.line(x, y + this.centerYoffset, x, y + this.centerYoffset * .7);
						break;
					case "'":
						draw.line(x - r, y + this.centerYoffset, x - r, y + this.centerYoffset * .7);
						draw.line(x + r, y + this.centerYoffset, x + r, y + this.centerYoffset * .7);
						break;
					case "-":
						draw.line(x - r, y + this.centerYoffset, x - r, y + this.centerYoffset * .7);
						draw.line(x, y + this.centerYoffset, x, y + this.centerYoffset * .7);
						draw.line(x + r, y + this.centerYoffset, x + r, y + this.centerYoffset * .7);
						break;
					case ",":
						draw.dot(x, y + this.centerYoffset, r);
						break;
					case ";":
						draw.dot(x, y + this.centerYoffset * .7, r * .5);
						break;
					case ":":
						draw.circle(x, y + this.centerYoffset, r);
						draw.circle(x, y + this.centerYoffset, r * .75);
						break;
				}
			}
		},
		number: {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "\\"], // last ones are control characters for number ending and negative numbers
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: consonant * Math.cos(radiant),
					y: -consonant * Math.sin(radiant)
				}
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.circle(x, y, r, lw);
			}
		},
		ve: {
			contains: ["e", "é", "è", "i", "í", "ì", "u", "ü", "ú", "ù", "æ"],
			centerYoffset: 0,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.circle(x, y, r);
			}
		},
		va: {
			contains: ["a", "ä", "á", "à", "å"],
			centerYoffset: vowel * 1.75,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.circle(x, y, r);
			}
		},
		vo: {
			contains: ["o", "ö", "ó", "ò", "ø"],
			centerYoffset: -vowel * 1.75,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.circle(x, y, r);
			}
		},
		b: {
			contains: ["b", "ch", "d", "g", "h", "f"],
			centerYoffset: -consonant * .9,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: -this.centerYoffset
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.dot(x, y, r, color.background);
				draw.arc(x, y, r, 2 * Math.PI + Math.asin(.9 / shermansGrouped.cresize), Math.PI - Math.asin(.9 / shermansGrouped.cresize), lw);
			}
		},
		j: {
			contains: ["j", "ph", "k", "l", "c", "n", "p", "m", "ñ"],
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: -this.centerYoffset
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.circle(x, y, r, lw);
			}
		},
		t: {
			contains: ["t", "wh", "sh", "r", "v", "w", "s"],
			centerYoffset: 0,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: vowel * 1.75
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.dot(x, y, r, color.background);
				draw.arc(x, y, r, 0, Math.PI, lw);
			}
		},
		th: {
			contains: ["th", "gh", "y", "z", "q", "qu", "x", "ng"],
			centerYoffset: 0,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: vowel * 1.75
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, baseline, rad = .5, lw = false) {
				draw.circle(x, y, r, lw);
			}
		}
	},
	getBase: function (char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.scgtable).forEach(row => {
			if (this.scgtable[row].contains.Contains(char)) rtrn = row;
		});
		return rtrn;
	}
}

//      _                     _                             _ ___ _         _   _
//    _| |___ ___ ___ ___ ___| |_ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | -_|  _| . |  _| .'|  _| . |  _| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|___|___|___|_| |__,|_| |___|_|   |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                                             |_|
// specify decoration for every letter
let shermansDeco = {
	scgtable: {
		/* example: { // name of group
			contains: [...], // array of characters for which the handling and properties apply
			radiants: [.8, .7], // array of one or multiple radiant-proportions to place the deocrator on
			fromto: [.5, 1.5] // array of one or two radius factors to place all decorators, first for circles, both for line-starts and -endings
		}*/
		"null": {
			contains: [".", "?", "!", "\"", "'", "-", ",", ",", ":", "a", "e", "o", "b", "j", "t", "th"],
		},
		"number": {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
		},
		"il": {
			contains: ["i", "í", "ì"],
			radiants: [.5],
			fromto: [1, 3]
		},
		"ul": {
			contains: ["u", "ü", "ú", "ù"],
			radiants: [1.5],
			fromto: [1, 3]
		},
		"d1l": {
			contains: ["á", "é", "í", "ó", "ú"],
			radiants: [.8],
			fromto: [.5, 1.5]
		},
		"d2l": {
			contains: ["ä", "ö", "ü"],
			radiants: [.8, .7],
			fromto: [.5, 1.5]
		},
		"d3l": {
			contains: ["à", "è", "ì", "ò", "ù"],
			radiants: [.8, .7, .6],
			fromto: [.5, 1.5]
		},
		"1l": {
			contains: ["g", "n", "v", "qu", "ñ"],
			radiants: [.6],
			fromto: [1, 2]
		},
		"2l": {
			contains: ["h", "p", "w", "x"],
			radiants: [.85, .75],
			fromto: [1, 2]
		},
		"3l": {
			contains: ["f", "m", "s", "ng"],
			radiants: [.9, .8, .7],
			fromto: [1, 2]
		},
		"1d": {
			contains: ["ph", "wh", "gh"],
			radiants: [.5],
			fromto: [1]
		},
		"2d": {
			contains: ["ch", "k", "sh", "y"],
			radiants: [.55, .45],
			fromto: [1]
		},
		"3d": {
			contains: ["d", "l", "r", "z"],
			radiants: [.6, .5, .4],
			fromto: [1]
		},
		"4d": {
			contains: ["c", "q"],
			radiants: [.65, .55, .45, .35],
			fromto: [1]
		},
		"2ndvowel": {
			contains: ["å", "ø", "æ"],
			radiants: [0],
			fromto: [1]
		},
		"divot": {
			contains: ["ñ"],
			radiants: [1.75],
			fromto: [1]
		},
		"minus": {
			contains: ["\\"],
			radiants: [1.1],
			fromto: [-1, 1]
		},
	},
	draw: function (deco, x, y, currentbase, cresize, letter) {
		if (["number"].Contains(deco)) {
			shermansGrouped.linewidth = 1;
			var number = parseInt(letter),
				rad = .95;
			for (var n = number; n > 0; n--) {
				if (n > 4) { // circle for 5
					draw.circle(
						x + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).x * cresize * .9,
						y + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).y * cresize * .9,
						shermansBase.scgtable.number.radialPlacement(Math.PI * 1.75).y * cresize * .15);
					n -= 4;
				} else draw.line( // lines for every other digit
					x + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).x * cresize,
					y + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).y * cresize,
					x + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).x * cresize * .8,
					y + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).y * cresize * .8);
				rad -= .15;
			}
		} else if (["1d", "2d", "3d", "4d"].Contains(deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.dot(
					x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * cresize,
					vowel * .25);
			});
		} else if (["2ndvowel"].Contains(deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.circle(
					x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * cresize,
					vowel);
			});
		} else if (["divot"].Contains(deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.arc(
					x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * cresize,
					vowel, Math.PI * 1.7, Math.PI * .8, linewidth
				);
				// overpaint base body
				ctx.strokeStyle = color.background;
				draw.arc(
					x,
					y,
					consonant * cresize, Math.PI * .4, Math.PI * .1, linewidth + 1
				);
			});
		} else {
			/* lines, diacritics, minus for numbers*/
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.line(
					x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * cresize,
					x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[1] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[1] * cresize);
			});
		}
	},
	getDeco: function (char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		Object.keys(this.scgtable).forEach(row => {
			if (this.scgtable[row].contains.Contains(char)) rtrn.push(row);
		});
		return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
	}
}

//    _                   _     _   _
//   | |_ ___ ___ ___ ___| |___| |_|_|___ ___
//   |  _|  _| .'|   |_ -| | .'|  _| | . |   |
//   |_| |_| |__,|_|_|___|_|__,|_| |_|___|_|_|
// scroll through input and draw every letter
export function shermansTranslate(ctx, input) {
	// initialize widths, heights, default-values, draw-object
	letterwidth = consonant * 2.5
	letterheight = consonant * 6

	x = -letterwidth * .5;
	y = letterheight * .6;
	cLetter = false;
	qLetter = false;
	draw.init(ctx, 1);

	// convert input-string to grouped array and determine number of groups
	let groupedinput = shermansGrouped.groups(input.toLowerCase()),
		lettergroups = 0;
	groupedinput.forEach(word => {
		word.forEach(group => {
			lettergroups += group.length;
		});
		lettergroups += 1;
	})
	// set canvas scale according to number of letters/groups
	width = Math.min(lettergroups + 1, Math.floor(window.innerWidth / letterwidth)) * letterwidth - letterwidth;
	height = letterheight * 1.5 * Math.ceil(--lettergroups / Math.floor(window.innerWidth / letterwidth));
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	groupedinput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups 
				// prepare resizing for stacked characters but vowels
				var lastStackedConsonantIndex = group.length - 1,
					vowelindex;
				// correction of initial resizing factor depending on last vowel within group
				"aeiou.,".split("").forEach(vowel => {
					vowelindex = group.indexOf(vowel);
					if (vowelindex > -1 && vowelindex <= lastStackedConsonantIndex) lastStackedConsonantIndex = vowelindex - 1;
				});
				// reset offsets but hand over possible resizing factor
				shermansGrouped.resetOffset(lastStackedConsonantIndex);
				// iterate through characters within group
				for (var l = 0; l < group.length; l++) {
					// check whether an occuring dot or comma is a decimal sign or not
					var thicknumberline = /*is number group */ "1234567890".Contains(group[0]) && (
						( /*is comma*/ ",.".Contains(group[l])) ||
						( /*is last digit without comma*/ l == group.length - 1 && !group.Contains([",", "."]))
					);
					// adjust offset properties according to former character/base
					if (l > 0) shermansGrouped.setOffset(group[l - 1], group[l]);
					// draw
					shermansDraw(ctx, group[l], shermansGrouped, thicknumberline);
				}
			});
		});
		shermansGrouped.resetOffset();
		shermansDraw(ctx, " ", shermansGrouped);
	});
	// complain about c and q
	let output = "";
	if (cLetter) {
		output = "Consider replacing C (marked red) with K or S exept when it's a name.";
	}
	if (qLetter) {
		output += "<br>I am guessing this is a name but if its not, what is a lone Q doing there?";
	}
	document.getElementById("output").innerHTML = output;
}

//                _                           _
//    ___ ___ ___| |___ ___ ___ _____ ___ ___| |_ ___
//   |  _| -_| . | | .'|  _| -_|     | -_|   |  _|_ -|
//   |_| |___|  _|_|__,|___|___|_|_|_|___|_|_|_| |___|
//           |_|
function replacements(word) {
	var cword = "";
	for (var i = 0; i < word.length; i++) { // iterate through word 
		if (word[i] == "c" && document.getElementById('scgc').checked) {
			if (word[i + 1] == "h") cword += "c"; // ch is still allowed
			else if (word[i + 1] == "k") continue; // omit ck
			else if (["e", "i", "y"].Contains(word[i + 1])) cword += "s";
			else cword += "k"; // end of the word
		} else if (word[i] == "ß") cword += "ss";
		else cword += word[i];
	}
	return cword;
}

//                        _
//    ___ ___ ___ _ _ ___|_|___ ___
//   | . |  _| . | | | . | |   | . |
//   |_  |_| |___|___|  _|_|_|_|_  |
//   |___|           |_|       |___|
// set rules for grouping
let shermansGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> words -> groups -> single letters
		var sentence = [];
		var splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			var group = [];
			sword = replacements(sword)
			for (var i = 0; i < sword.length; i++) { // iterate through word 
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double latin characters to group
				if (["th", "gh", "ng", "qu", "wh", "sh", "ph", "ch"].Contains(currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (document.getElementById('scgg').checked && group.length > 0) {
					// add vowels if none or the same, consonants of same base, numbers to former group if selected
					var former = group[group.length - 1][group[group.length - 1].length - 1];
					if (
						( /*vowels */ ["ve", "va", "vo"].Contains(shermansBase.getBase(current)) && (!["ve", "va", "vo", "number"].Contains(shermansBase.getBase(former)) || shermansBase.getBase(current) == shermansBase.getBase(former))) ||
						( /*same base consonant*/ ![false, "punctuation", "ve", "va", "vo", "number"].Contains(shermansBase.getBase(current)) && group[group.length - 1].length > 0 && shermansBase.getBase(current) == shermansBase.getBase(former)) ||
						( /*numbers, data is of string type here*/ "-1234567890,.".Contains(current) && group[group.length - 1].length > 0 && "-1234567890,.".Contains(former))
					)
						group[group.length - 1].push(current)
					else // create/add to current group
						group.push([current]);
				} else // create/add to current group
					group.push([current]);
			}
			// add control characters to the number group
			if ("1234567890".Contains(group[group.length - 1][0])) group[group.length - 1].push("/");
			if (group[group.length - 1][0] === "-" && "1234567890".Contains(group[group.length - 1][1])) {
				group[group.length - 1].shift();
				group[group.length - 1][group[group.length - 1].length] = ("\\");
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (lastStackedConsonantIndex) {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.voweloffset = { // no offset for vowels places them to the default position
			x: 0,
			y: 0
		};
		this.consonantcenter = { // default is baseline
			x: 0,
			y: 0
		};
		this.vresize = 1; // vowel-size-factor
		if (lastStackedConsonantIndex === undefined) lastStackedConsonantIndex = 0;
		this.cresize = (1 / .8) ** lastStackedConsonantIndex; // consonant-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.linewidth = 1; // initial line width
	},
	setOffset: function (former, actual) {
		this.offset++;
		this.carriagereturn = true;
		let actualbase = shermansBase.getBase(actual)
		let formerbase = shermansBase.getBase(former)
		if (["b", "j", "t", "th"].Contains(formerbase)) {
			this.consonantcenter.x = 0;
			this.consonantcenter.y = shermansBase.scgtable[formerbase].centerYoffset;
			if (["ve", "va", "vo"].Contains(actualbase)) this.voweloffset = shermansBase.scgtable[formerbase].radialPlacement(Math.PI * .25, actualbase);
			else if (actualbase === formerbase) {
				this.cresize *= .8;
				if (former != actual) this.linewidth += 1;
			}
		} else if (["number"].Contains(formerbase)) {
			this.cresize *= .8;
		} else {
			/*vovel*/
			this.vresize *= .8;
		}
	}
}

//                    _ ___ _         _               _
//    ___ ___ ___ ___|_|  _|_|___   _| |___ ___ _ _ _|_|___ ___
//   |_ -| . | -_|  _| |  _| |  _| | . |  _| .'| | | | |   | . |
//   |___|  _|___|___|_|_| |_|___| |___|_| |__,|_____|_|_|_|_  |
//       |_|                                               |___|
// draw instructions for base + decoration
function shermansDraw(ctx, letter, grouped, thicknumberline) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (x + letterwidth * 2 >= width) {
			y += letterheight;
			x = letterwidth * .5;
		} else x += letterwidth;
	}
	let currentbase = shermansBase.getBase(letter);
	let lettercenter = letterwidth * .5;
	if (currentbase) { // works only for defined characters
		ctx.strokeStyle = color.foreground;
		ctx.fillStyle = color.foreground;
		if (letter == "c" || letter == "q") {
			ctx.strokeStyle = color.warning;
			ctx.fillStyle = color.warning;
			if (letter == "c") {
				cLetter = true;
			} else {
				qLetter = true;
			}
		}
		// define basic positional arguments
		let center = { // relative center of base of vowel
			x: lettercenter + grouped.consonantcenter.x + grouped.voweloffset.x,
			y: ((grouped.consonantcenter.y + grouped.voweloffset.y) || shermansBase.scgtable[currentbase].centerYoffset)
		};

		// draw base line
		if (!grouped.carriagereturn || ["b","t"].Contains(currentbase)) draw.line(x , y, x + letterwidth, y);

		// draw base
		if (["punctuation"].Contains(currentbase)) {
			if (!thicknumberline) {
				shermansBase.scgtable[currentbase].draw(letter, x + center.x, y + center.y, vowel);
			} else { // should be a number. handles the display of decimal signs
				shermansGrouped.linewidth = 2;
			}
		}
		if (!["punctuation"].Contains(currentbase)) {
			let r = consonant * grouped.cresize;
			if (["ve", "va", "vo"].Contains(currentbase)) r = vowel * grouped.vresize;
			if (thicknumberline) grouped.linewidth = 2;
			shermansBase.scgtable[currentbase].draw(x + center.x, y + center.y, r, !grouped.carriagereturn, null, grouped.linewidth);
		}

		// draw decorators
		let decorators = shermansDeco.getDeco(letter);
		if (decorators) {
			decorators.forEach(deco => {
				shermansDeco.draw(deco, x + center.x, y + center.y, currentbase, grouped.cresize, letter);
			});
		}
	}
	// text output for undefined characters as well for informational purpose
	ctx.beginPath();
	// print character translation above the drawings unless it's a (numeral) control character
	if (!["/", "\\"].Contains(letter)) ctx.fillText(letter, x + lettercenter + grouped.offset * 8, y - letterheight * .5);
	// add a minus sign in from of the translation above the drawings if applicable
	if (["\\"].Contains(letter)) ctx.fillText("-", x + lettercenter - 1 * 8, y - letterheight * .5);
}

/**Copyright 2020 Mightyfrong, erroronline1, ModisR
 * 
 * This file is part of the Gallifreyan Translation Helper,
 * henceforth referred to as "the GTH".
 * 
 * The GTH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The GTH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with the GTH.  If not, see <https://www.gnu.org/licenses/>.
 */