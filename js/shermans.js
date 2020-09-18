import { includes, color,	draw } from './utils.js';

let cLetter; // is there a "c"?
let qLetter; // is there a "q"?
const consonant = 30; // radius of consonants
const vowel = Math.floor(consonant / 2); // radius of vowels
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let glyph; // glyph dimensions-object
let option; // user option-object

//    _                                 _ ___ _         _   _
//   | |_ ___ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | .'|_ -| -_| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|__,|___|___| |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                         |_|
//specify base for every letter, assign base to latin characters and specify geometric properties
const shermansBase = {
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
			draw: function (x, y, r, rad=0, lw = false) { // drawing instructions based on center of character. rad might define a rotation in the future
				if (baseline) draw.line(x - r * 1.25, y - this.centerYoffset, x + r * 1.25, y - this.centerYoffset);
				draw.circle(x, y, r, lw);
			}
		}*/
		punctuation: {
			contains: [".", "?", "!", "\"", "'", "-", ",", ";", ":"],
			centerYoffset: 0,
			radialPlacement: function (rad = 1.75) {
				return {
					x: -Math.cos(Math.PI * (rad - .25)),
					y: Math.sin(Math.PI * (rad - .25))
				};
			},
			draw: function (letter, x, y, r, rad) {
				return;
			}
		},
		number: {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "\\"], // last ones are control characters for number ending and negative numbers
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (rad = .25) {
				return {
					x: consonant * Math.cos(Math.PI * rad),
					y: -consonant * Math.sin(Math.PI * rad)
				}
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.circle(x, y, r, lw);
			}
		},
		ve: {
			contains: ["e", "é", "è", "i", "í", "ì", "u", "ü", "ú", "ù", "æ"],
			centerYoffset: 0,
			radialPlacement: function (rad = .25) {
				return {
					x: vowel * Math.cos(Math.PI * rad),
					y: -vowel * Math.sin(Math.PI * rad)
				}
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.circle(x, y, r);
			}
		},
		va: {
			contains: ["a", "ä", "á", "à", "å"],
			centerYoffset: vowel * 1.75,
			radialPlacement: function (rad = .25) {
				return {
					x: vowel * Math.cos(Math.PI * rad),
					y: -vowel * Math.sin(Math.PI * rad)
				}
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.circle(x, y, r);
			}
		},
		vo: {
			contains: ["o", "ö", "ó", "ò", "ø"],
			centerYoffset: -vowel * 1.75,
			radialPlacement: function (rad = .25) {
				return {
					x: vowel * Math.cos(Math.PI * rad),
					y: -vowel * Math.sin(Math.PI * rad)
				}
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.circle(x, y, r);
			}
		},
		b: {
			contains: ["b", "ch", "d", "g", "h", "f"],
			centerYoffset: -consonant * .9,
			radialPlacement: function (rad = .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: -this.centerYoffset * Math.sin(Math.PI * (rad - .25)) + vowel * 1.75 * Math.sin(Math.PI * (rad - .25)),
						y: -this.centerYoffset * Math.cos(Math.PI * (rad - .25)) + vowel * 1.75 * Math.cos(Math.PI * (rad - .25))
					},
					vo: {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.dot(x, y, r, color.background);
				draw.arc(x, y, r, (2 + rad) * Math.PI + Math.asin(.9 / shermansGrouped.cresize), (1 + rad) * Math.PI - Math.asin(.9 / shermansGrouped.cresize), lw);
			}
		},
		j: {
			contains: ["j", "ph", "k", "l", "c", "n", "p", "m", "ñ"],
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (rad = .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: -this.centerYoffset * Math.sin(Math.PI * (rad - .25)) + vowel * 1.75 * Math.sin(Math.PI * (rad - .25)),
						y: -this.centerYoffset * Math.cos(Math.PI * (rad - .25)) + vowel * 1.75 * Math.cos(Math.PI * (rad - .25))
					},
					vo: {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.circle(x, y, r, lw);
			}
		},
		t: {
			contains: ["t", "wh", "sh", "r", "v", "w", "s"],
			centerYoffset: 0,
			radialPlacement: function (rad = .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: vowel * 1.75 * Math.sin(Math.PI * (rad - .25)),
						y: -this.centerYoffset + vowel * 1.75 * Math.cos(Math.PI * (rad - .25))
					},
					vo: {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.dot(x, y, r, color.background);
				draw.arc(x, y, r, (0 + rad) * Math.PI, (1 + rad) * Math.PI, lw);
			}
		},
		th: {
			contains: ["th", "gh", "y", "z", "q", "qu", "x", "ng"],
			centerYoffset: 0,
			radialPlacement: function (rad = .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: vowel * 1.75 * Math.sin(Math.PI * (rad - .25)),
						y: -this.centerYoffset + vowel * 1.75 * Math.cos(Math.PI * (rad - .25))
					},
					vo: {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			},
			draw: function (x, y, r, rad = 0, lw = false) {
				draw.circle(x, y, r, lw);
			}
		}
	},
	getBase: function (char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.scgtable).forEach(row => {
			if (includes(this.scgtable[row].contains, char)) rtrn = row;
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
const shermansDeco = {
	scgtable: {
		/* example: { // name of group
			contains: [...], // array of characters for which the handling and properties apply
			radiants: [.8, .7], // array of one or multiple radiant-proportions to place the deocrator on
			fromto: [.5, 1.5] // array of one or two radius factors to place all decorators, first for circles, both for line-starts and -endings
		}*/
		"null": {
			contains: ["a", "e", "o", "b", "j", "t", "th"],
		},
		".": {
			contains: ["."],
			radiants: [1.25],
			fromto: [1]
		},
		"?": {
			contains: ["?"],
			radiants: [1.175, 1.325],
			fromto: [.8]
		},
		"!": {
			contains: ["!"],
			radiants: [1.1, 1.25, 1.4],
			fromto: [.8]
		},
		"\"": {
			contains: ["\""],
			radiants: [1.25],
			fromto: [1, .5]
		},
		"'": {
			contains: ["'"],
			radiants: [1.175, 1.325],
			fromto: [1, .5]
		},
		"-": {
			contains: ["-"],
			radiants: [1.175, 1.25, 1.325],
			fromto: [1, .5]
		},
		",": {
			contains: [","],
			radiants: [1.25],
			fromto: [1]
		},
		";": {
			contains: [";"],
			radiants: [1.25],
			fromto: [.8]
		},
		":": {
			contains: [":"],
			radiants: [1.25],
			fromto: [1]
		},
		"number": {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
		},
		"il": {
			contains: ["i", "í", "ì"],
			radiants: [1],
			fromto: [1, 3]
		},
		"ul": {
			contains: ["u", "ü", "ú", "ù"],
			radiants: [2],
			fromto: [1, 3]
		},
		"d1l": {
			contains: ["á", "é", "í", "ó", "ú"],
			radiants: [1.3],
			fromto: [.5, 1.5]
		},
		"d2l": {
			contains: ["ä", "ö", "ü"],
			radiants: [1.3, 1.2],
			fromto: [.5, 1.5]
		},
		"d3l": {
			contains: ["à", "è", "ì", "ò", "ù"],
			radiants: [1.3, 1.2, 1.1],
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
			radiants: [.5],
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
	draw: function (deco, x, y, currentbase, baserad, cresize, letter) {
		baserad += .5;
		if (includes(["number"], deco)) {
			shermansGrouped.linewidth = 1;
			let number = parseInt(letter),
				rad = .95;
			for (let n = number; n > 0; n--) {
				if (n > 4) { // circle for 5
					draw.circle(
						x + shermansBase.scgtable.number.radialPlacement(rad).x * cresize * .9,
						y + shermansBase.scgtable.number.radialPlacement(rad).y * cresize * .9,
						shermansBase.scgtable.number.radialPlacement(1.75).y * cresize * .15);
					n -= 4;
				} else draw.line( // lines for every other digit
					x + shermansBase.scgtable.number.radialPlacement(rad).x * cresize,
					y + shermansBase.scgtable.number.radialPlacement(rad).y * cresize,
					x + shermansBase.scgtable.number.radialPlacement(rad).x * cresize * .8,
					y + shermansBase.scgtable.number.radialPlacement(rad).y * cresize * .8);
				rad -= .15;
			}
		} else if (includes(["1d", "2d", "3d", "4d"], deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.dot(
					x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * cresize,
					vowel * .25);
			});
		} else if (includes(["2ndvowel"], deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.circle(
					x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * cresize,
					vowel);
			});
		} else if (includes(["divot"], deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.arc(
					x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * cresize,
					vowel, Math.PI * (.9 - rad + baserad), Math.PI * (.1 - rad + baserad), shermansGrouped.linewidth
				);
				// overpaint base body
				draw.ctx.strokeStyle = color.background;
				draw.arc(
					x,
					y,
					consonant * cresize, Math.PI * (baserad - .1), Math.PI * (baserad - .4), shermansGrouped.linewidth + 1
				);
			});
		} else if (includes(shermansBase.scgtable.punctuation.contains, deco)) {
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				if (includes(["?", "!", ";"], deco)) {
					draw.dot(
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * consonant * 2,
						vowel * .5);
				} else if (includes(["\"", "'", "-"], deco)) {
					draw.line(
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * consonant * 2,
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * consonant * 2);
				} else if (includes(["."], deco)) {
					draw.circle(
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * consonant * 2,
						vowel);
				} else if (includes([","], deco)) {
					draw.dot(
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * consonant * 2,
						vowel);
				} else if (includes([":"], deco)) {
					draw.circle(
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * consonant * 2,
						vowel);
					draw.circle(
						x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * consonant * 2,
						y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * consonant * 2,
						vowel * .75);
				}
			});
		} else {
			/* lines, diacritics, minus for numbers*/
			shermansDeco.scgtable[deco].radiants.forEach(rad => {
				let fromto = shermansDeco.scgtable[deco].fromto;
				draw.line(
					x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * cresize,
					x + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * cresize,
					y + shermansBase.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * cresize);
			});
		}
	},
	getDeco: function (char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		Object.keys(this.scgtable).forEach(row => {
			if (includes(this.scgtable[row].contains, char)) rtrn.push(row);
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
	//retrieve options and make them compact
	option = {
		circular: document.getElementById('scgcirc').checked,
		chandling: document.getElementById('scgc').checked,
		grouped: document.getElementById('scgg').checked
	};

	// convert input-string to grouped array and determine number of groups
	let groupedinput = shermansGrouped.groups(input.toLowerCase()),
		glyphs = 0,
		biggestWordCircle = 0;
	groupedinput.forEach(word => {
		word.forEach(groups => {
			if (option.circular) {
				let twc2 = Math.ceil(Math.sqrt(groups.length * Math.pow(2 * consonant, 2) / Math.PI)) * 1.5 * 3.25;
				if (biggestWordCircle < twc2) biggestWordCircle = twc2;
			} else {
				glyphs += groups.length;
			}
		});
		glyphs++;
	})
	// set canvas scale according to number of letters/groups
	if (option.circular) {
		glyph = {
			width: biggestWordCircle + consonant,
			height: biggestWordCircle
		};
		width = Math.min(glyphs, Math.floor(window.innerWidth / biggestWordCircle)) * glyph.width;
		height = biggestWordCircle * Math.ceil(glyphs / Math.floor(window.innerWidth / glyph.width));
		x = glyph.width / 2;
		y = glyph.height / 2;
	} else {
		glyph = {
			width: consonant * 2.5,
			height: consonant * 6
		};
		width = Math.min(++glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width - glyph.width;
		height = glyph.height * (Math.ceil(++glyphs / Math.floor(window.innerWidth / glyph.width)));
		x = 0;
		y = -glyph.height * .5;
	}
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	// initialize widths, heights, default-values, draw-object
	cLetter = false;
	qLetter = false;
	draw.init(ctx, 1);

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedinput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			let groupnum = 0;
			groups.forEach(group => { // loop through character-groups 
				groupnum++;
				// prepare resizing for stacked characters but vowels
				let lastStackedConsonantIndex = group.length - 1,
					vowelindex;
				// correction of initial resizing factor depending on last vowel within group
				"aeiou.,".split("").forEach(vowel => {
					vowelindex = group.indexOf(vowel);
					if (vowelindex > -1 && vowelindex <= lastStackedConsonantIndex) lastStackedConsonantIndex = vowelindex - 1;
				});
				// reset offsets but hand over possible resizing factor, first base, current group related to number of groups
				shermansGrouped.resetOffset(lastStackedConsonantIndex, shermansBase.getBase(group[0]), groups.length, groupnum);
				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					// check whether an occuring dot or comma is a decimal sign or not
					let thicknumberline = /*is number group */ includes("1234567890", group[0]) && (
						( /*is comma*/ includes(",.", group[l])) ||
						( /*is last digit without comma*/ l == group.length - 1 && !includes(group, [",", "."]))
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
	let cword = "";
	for (let i = 0; i < word.length; i++) { // iterate through word 
		if (word[i] == "c" && option.chandling) {
			if (word[i + 1] == "h") cword += "c"; // ch is still allowed
			else if (word[i + 1] == "k") continue; // omit ck
			else if (includes(["e", "i", "y"], word[i + 1])) cword += "s";
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
		let sentence = [];
		let splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			let group = [];
			sword = replacements(sword)
			for (let i = 0; i < sword.length; i++) { // iterate through word 
				let current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double latin characters to group
				if (includes(["th", "gh", "ng", "qu", "wh", "sh", "ph", "ch"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (option.grouped && group.length > 0) {
					// add vowels if none or the same, consonants of same base, numbers to former group if selected
					let former = group[group.length - 1][group[group.length - 1].length - 1];
					if (
						( /*vowels */ includes(["ve", "va", "vo"], shermansBase.getBase(current)) && (!includes(["ve", "va", "vo", "number"], shermansBase.getBase(former)) || shermansBase.getBase(current) == shermansBase.getBase(former))) ||
						( /*same base consonant*/ !includes([false, "punctuation", "ve", "va", "vo", "number"], shermansBase.getBase(current)) && group[group.length - 1].length > 0 && shermansBase.getBase(current) == shermansBase.getBase(former)) ||
						( /*numbers, data is of string type here*/ includes("-1234567890,.", current) && group[group.length - 1].length > 0 && includes("-1234567890,.", former) && !(includes("-.,", current) && includes("-.,", former)))
					)
						group[group.length - 1].push(current)
					else // create/add to current group
						group.push([current]);
				} else // create/add to current group
					group.push([current]);
			}
			// add control characters to the number group
			if (includes("1234567890", group[group.length - 1][0])) group[group.length - 1].push("/");
			if (group[group.length - 1][0] === "-" && includes("1234567890", group[group.length - 1][1])) {
				group[group.length - 1].shift();
				group[group.length - 1][group[group.length - 1].length] = ("\\");
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (lastStackedConsonantIndex = 0, currentbase = false, numberOfGroups = 0, currentGroup = 0) {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.vresize = 1; // vowel-size-factor
		this.cresize = (1 / .8) ** lastStackedConsonantIndex; // consonant-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.linewidth = 1; // initial line width
		this.numberOfGroups = numberOfGroups; // number of groups in current word
		this.currentGroup = currentGroup; // position of current group
		this.groupBase = currentbase; // base of group
	},
	setOffset: function (former, actual) {
		this.offset++;
		this.carriagereturn = true;
		let actualbase = shermansBase.getBase(actual)
		let formerbase = shermansBase.getBase(former)
		if (includes(["b", "j", "t", "th"], formerbase)) {
			if (actualbase === formerbase) {
				this.cresize *= .8;
				if (former != actual) this.linewidth += 1;
			}
		} else if (includes(["number"], formerbase)) {
			this.cresize *= .8;
		} else /*vovel*/ this.vresize *= .8;
	}
}

//                    _ ___ _         _               _
//    ___ ___ ___ ___|_|  _|_|___   _| |___ ___ _ _ _|_|___ ___
//   |_ -| . | -_|  _| |  _| |  _| | . |  _| .'| | | | |   | . |
//   |___|  _|___|___|_|_| |_|___| |___|_| |__,|_____|_|_|_|_  |
//       |_|                                               |___|
// draw instructions for base + decoration
function shermansDraw(ctx, letter, grouped, thicknumberline) {
	if (!option.circular || letter == " ") {
		if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
			if (x + glyph.width >= width) {
				y += glyph.height;
				x = glyph.width / (option.circular ? 2 : 1);
			} else x += glyph.width;
		}
	}
	let currentbase = shermansBase.getBase(letter);
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyph.height;
	if (option.circular) {
		rad = -(2 / grouped.numberOfGroups) * (grouped.currentGroup - 1);
		wordCircleRadius = Math.ceil(Math.sqrt(grouped.numberOfGroups * Math.pow(2 * consonant, 2) / Math.PI)) * 1.5;
	}

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
		let voweloffset;
		if (includes(["ve", "va", "vo"], currentbase) && !includes(["ve", "va", "vo"], grouped.groupBase))
			voweloffset = shermansBase.scgtable[grouped.groupBase].radialPlacement(.25 + rad, currentbase);
		else voweloffset = {
			x: 0,
			y: 0
		};
		let center = { // relative center of base plus relative position of grouped vowels
			x: -1 * (wordCircleRadius * Math.sin(Math.PI * rad) + shermansBase.scgtable[grouped.groupBase].centerYoffset * Math.sin(Math.PI * rad) + voweloffset.x),
			y: wordCircleRadius * Math.cos(Math.PI * rad) + shermansBase.scgtable[grouped.groupBase].centerYoffset * Math.cos(Math.PI * rad) + voweloffset.y
		};

		// draw base and sentence line if applicable
		let angle = .068;
		if (option.circular) {
			angle = 1 / grouped.numberOfGroups;
		}
		if (!grouped.carriagereturn || includes(["b", "t"], currentbase)) {
			draw.arc(x, y, wordCircleRadius, Math.PI * (.5 + rad + angle), Math.PI * (.5 + rad - angle));
		}
		if (includes(["punctuation"], currentbase) && !thicknumberline) {
			draw.arc(x, y, wordCircleRadius + 2 * consonant, Math.PI * (.5 + rad + angle), Math.PI * (.5 + rad - angle));
		}

		// draw base
		let r = consonant * grouped.cresize;
		if (thicknumberline) grouped.linewidth = 2;

		const hasPunc = includes(["punctuation"], currentbase);
		if (!hasPunc || (hasPunc && !thicknumberline)) {
			if (includes(["ve", "va", "vo"], currentbase)) r = vowel * grouped.vresize;
			shermansBase.scgtable[currentbase].draw(x + center.x, y + center.y, r, rad, grouped.linewidth);
		}

		// draw decorators
		let decorators = shermansDeco.getDeco(letter);
		if (decorators) {
			decorators.forEach(deco => {
				if (decorators && !thicknumberline)
					shermansDeco.draw(deco, x + center.x, y + center.y, currentbase, rad, grouped.cresize, letter);
			});
		}
	}
	// text output for undefined characters as well for informational purpose
	ctx.beginPath();
	// print character translation above the drawings unless it's a (numeral) control character
	if (!includes(["/", "\\"], letter)) ctx.fillText(letter, x - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad) + grouped.offset * 8, y + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad));
	// add a minus sign in from of the translation above the drawings if applicable
	if (includes(["\\"], letter)) ctx.fillText("-", x - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad) - 1 * 8, y + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad));
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