import {
	includes,
} from '../utils/funcs.js';
import {
	renderOptions
} from '../event_callbacks.js';

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
					SVGRenderingContext-draw instructions...
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
				draw: function (ctx, letter, x, y, r, rad) {
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					let thisglyph = Math.ceil(Math.sqrt(group.numberOfGroups * Math.pow(2 * consonant, 2) / Math.PI)) * 1.5 * 3.25;
					ctx.drawShape('path', group.linewidth, {
						d: ctx.circularArc(x, y, r, (.65 + rad + +Boolean(group.lastStackedConsonantIndex - group.offset) * r * group.cresize / thisglyph) * Math.PI, (.35 + rad - +Boolean(group.lastStackedConsonantIndex - group.offset) * r * group.cresize / thisglyph) * Math.PI, "major")
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					let thisglyph = Math.ceil(Math.sqrt(group.numberOfGroups * Math.pow(2 * consonant, 2) / Math.PI)) * 1.5 * 3.25;
					ctx.drawShape('path', group.linewidth, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI + Math.asin(r * group.cresize / thisglyph), (2 + rad) * Math.PI - Math.asin(r * group.cresize / thisglyph), "minor")
					});
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
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
	draw(ctx, deco, x, y, currentbase, baserad, group, letter) {
		baserad += .5;
		if (includes(["number"], deco)) {
			group.linewidth = 1;
			let number = parseInt(letter),
				rad = .95;
			for (let n = number; n > 0; n--) {
				if (n > 4) { // circle for 5
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize * .9,
						cy: y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize * .9,
						r: this.base.scgtable.number.radialPlacement(1.75).y * group.cresize * .15
					});
					n -= 4;
				} else ctx.drawShape('line', 1, { // lines for every other digit
					x1: x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize,
					y1: y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize,
					x2: x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize * .8,
					y2: y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize * .8
				});
				rad -= .15;
			}
		} else if (includes(["1d", "2d", "3d", "4d"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				ctx.drawShape('circle', 0, {
					cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					r: this.base.vowel * .25
				});
			});
		} else if (includes(["2ndvowel"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				ctx.drawShape('circle', group.linewidth, {
					cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					r: this.base.vowel
				});
			});
		} else if (includes(["divot"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				ctx.drawShape('path', group.linewidth, {
					d: ctx.circularArc(
						x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
						y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
						this.base.vowel, Math.PI * (.075 - rad + baserad), Math.PI * (.925 - rad + baserad),
					)
				});
				// overpaint base body
				ctx.drawShape('path', group.linewidth + 2, {
					d: ctx.circularArc(
						x,
						y,
						this.base.consonant * group.cresize, Math.PI * (baserad - .4), Math.PI * (baserad - .1), "minor"),
					stroke: renderOptions.get().backgroundcolor
				});
			});
		} else if (includes(this.base.scgtable.punctuation.contains, deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				if (includes(["?", "!", ";"], deco)) {
					ctx.drawShape('circle', 0, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel * .5
					});
				} else if (includes(["\"", "'", "-"], deco)) {
					ctx.drawShape('line', 1, {
						x1: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y1: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						x2: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * this.base.consonant * 2,
						y2: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * this.base.consonant * 2
					});
				} else if (includes(["."], deco)) {
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel
					});
				} else if (includes([","], deco)) {
					ctx.drawShape('circle', 0, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel
					});
				} else if (includes([":"], deco)) {
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel
					});
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel * .75
					});
				}
			});
		} else {
			/* lines, diacritics, minus for numbers*/
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				let resize = includes(["il", "ul"], deco) ? group.vresize : group.cresize;
				ctx.drawShape('line', group.linewidth, {
					x1: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * resize,
					y1: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * resize,
					x2: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * resize,
					y2: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * resize
				});
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

/**Copyright 2020-2021 Mightyfrong, erroronline1, ModisR
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