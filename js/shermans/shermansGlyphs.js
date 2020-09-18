import {
	includes,
	color,
	draw
} from '../utils.js';


//specify base for every letter, assign base to latin characters and specify geometric properties
export class shermansBase {
	constructor(consonant, vowel) {
		this.consonant = consonant;
		this.vowel = vowel;
		this.scgtable = {
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
				draw: function (x, y, r, rad=0, group) { // drawing instructions based on center of character
					if (baseline) draw.line(x - r * 1.25, y - this.centerYoffset, x + r * 1.25, y - this.centerYoffset);
					draw.circle(x, y, r, group.linewidth);
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
				draw: function (x, y, r, rad = 0, group) {
					draw.circle(x, y, r, group.linewidth);
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
				draw: function (x, y, r, rad = 0, group) {
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
				draw: function (x, y, r, rad = 0, group) {
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
				draw: function (x, y, r, rad = 0, group) {
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
				draw: function (x, y, r, rad = 0, group) {
					draw.dot(x, y, r, color.background);
					draw.arc(x, y, r, (2 + rad) * Math.PI + Math.asin(.9 / group.cresize), (1 + rad) * Math.PI - Math.asin(.9 / group.cresize), group.linewidth);
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
				draw: function (x, y, r, rad = 0, group) {
					draw.circle(x, y, r, group.linewidth);
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
				draw: function (x, y, r, rad = 0, group) {
					draw.dot(x, y, r, color.background);
					draw.arc(x, y, r, (0 + rad) * Math.PI, (1 + rad) * Math.PI, group.linewidth);
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
				draw: function (x, y, r, rad = 0, group) {
					draw.circle(x, y, r, group.linewidth);
				}
			}
		}
	}

	getBase(char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.scgtable).forEach(row => {
			if (includes(this.scgtable[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
}

// specify decoration for every letter
export class shermansDeco {
	constructor(base) {
		this.base = base;
		this.scgtable = {
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
		}
	}
	draw(deco, x, y, currentbase, baserad, group, letter) {
		baserad += .5;
		if (includes(["number"], deco)) {
			shermansGrouped.linewidth = 1;
			let number = parseInt(letter),
				rad = .95;
			for (let n = number; n > 0; n--) {
				if (n > 4) { // circle for 5
					draw.circle(
						x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize * .9,
						y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize * .9,
						this.base.scgtable.number.radialPlacement(1.75).y * group.cresize * .15);
					n -= 4;
				} else draw.line( // lines for every other digit
					x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize,
					y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize,
					x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize * .8,
					y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize * .8);
				rad -= .15;
			}
		} else if (includes(["1d", "2d", "3d", "4d"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				draw.dot(
					x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					this.base.vowel * .25);
			});
		} else if (includes(["2ndvowel"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				draw.circle(
					x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					this.base.vowel);
			});
		} else if (includes(["divot"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				draw.arc(
					x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					this.base.vowel, Math.PI * (.9 - rad + baserad), Math.PI * (.1 - rad + baserad), shermansGrouped.linewidth
				);
				// overpaint base body
				draw.ctx.strokeStyle = color.background;
				draw.arc(
					x,
					y,
					consonant * group.cresize, Math.PI * (baserad - .1), Math.PI * (baserad - .4), shermansGrouped.linewidth + 1
				);
			});
		} else if (includes(this.base.scgtable.punctuation.contains, deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				if (includes(["?", "!", ";"], deco)) {
					draw.dot(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						this.base.vowel * .5);
				} else if (includes(["\"", "'", "-"], deco)) {
					draw.line(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * this.base.consonant * 2);
				} else if (includes(["."], deco)) {
					draw.circle(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						this.base.vowel);
				} else if (includes([","], deco)) {
					draw.dot(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						this.base.vowel);
				} else if (includes([":"], deco)) {
					draw.circle(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						this.base.vowel);
					draw.circle(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						this.base.vowel * .75);
				}
			});
		} else {
			/* lines, diacritics, minus for numbers*/
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				draw.line(
					x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * group.cresize,
					y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * group.cresize);
			});
		}
	}
	getDeco(char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		Object.keys(this.scgtable).forEach(row => {
			if (includes(this.scgtable[row].contains, char)) rtrn.push(row);
		});
		return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
	}
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