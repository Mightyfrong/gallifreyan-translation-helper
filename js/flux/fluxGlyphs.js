import { includes } from '../utils/funcs.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class fluxBase {
	constructor(consonant, vowel) {
		this.consonant = consonant;
		this.vowel = vowel;
		this.fluxtable = {
			ab: {
				contains: ["a", "e", "i", "o", "u", "b", "j", "z", "d", "m"],
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
				draw: function (ctx, x, y, r, rad = 0) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			gh: {
				contains: ["g", "k", "p", "t", "x", "h", "r","n","q","v"],
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
				draw: function (ctx, x, y, r, rad = 0, current) {
					if (includes(["g", "k", "p", "t", "x"],current.word[current.index])) ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI + Math.asin(r*.01/current.word.length), (2 + rad) * Math.PI - Math.asin(r*.01/current.word.length), "minor")
					});
				}
			},
			s: {
				contains: ["s", "f", "l", "w", "y"],
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
				draw: function (ctx, x, y, r, rad = 0) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (.65 + rad + r * -1) * Math.PI, (.35 + rad - r * -1) * Math.PI, "major")
					});
				}
			},
		}
	}

	getBase(char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.fluxtable).forEach(row => {
			if (includes(this.fluxtable[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
}

// specify decoration for every letter
export class fluxDeco {
	constructor(base) {
		this.base = base;
		this.fluxtable = {
			"1l": {
				contains: ["b", "j", "m","i","p","l","n"],
				radiants: [.6],
				fromto: [1, 1.5]
			},
			"2l": {
				contains: ["z", "o", "t", "w","q"],
				radiants: [.85, .75],
				fromto: [1, 1.5]
			},
			"3l": {
				contains: ["d"],
				radiants: [.9, .8, .7],
				fromto: [1, 1.5]
			},
			"c": {
				contains: ["a", "g", "b", "s","h","u","x","m","y","v"],
				radiants: [.7],
				fromto: [1]
			},
			"d": {
				contains: ["e", "k", "j","f","r","u","x","m","y","v"],
				radiants: [.4],
				fromto: [1]
			}
		}
	}
	draw(ctx, deco, x, y, currentbase, baserad) {
		baserad += .5;
		 if (includes(["d"], deco)) {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('circle', 0, {
					cx: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] ,
					cy: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] ,
					r: this.base.vowel * .25
				});
			});
		} else if (includes(["c"], deco)) {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('circle', 1, {
					cx: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] ,
					cy: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] ,
					r: this.base.vowel
				});
			});
		} else {
			/* lines */
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('line', 1, {
					x1: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					y1: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					x2: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[1],
					y2: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[1]
				});
			});
		}
	}
	getDeco(char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		Object.keys(this.fluxtable).forEach(row => {
			if (includes(this.fluxtable[row].contains, char)) rtrn.push(row);
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