import {
	includes
} from '../main.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class fluxBase {
	constructor(consonant, decorator) {
		this.consonant = consonant;
		this.decorator = decorator;
		this.fluxtable = {
			ab: {
				contains: ["a", "e", "i", "o", "u", "b", "j", "z", "d", "m"],
				centerYoffset: -consonant * 1.25,
				radialPlacement: function (rad = .25) {
					return {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			g: {
				contains: ["g", "k", "p", "t", "x", "ß"],
				centerYoffset: 0,
				radialPlacement: function (rad = .25) {
					return {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0, current) {
					// gaps in the word circle are made by masking within the calling draw function
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI, (2 + rad) * Math.PI, "minor"),
						clipPath: current.clip
					});
				}
			},
			h: {
				contains: ["h", "r", "n", "q", "v", "ph", "wh"],
				centerYoffset: 0,
				radialPlacement: function (rad = .25) {
					return {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0, current) {
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI, (2 + rad) * Math.PI, "minor"),
						clipPath: current.clip
					});
				}
			},
			s: {
				contains: ["s", "f", "l", "w", "y", "ch", "sh"],
				centerYoffset: -consonant * .9,
				radialPlacement: function (rad = .25, item = "vo") {
					return {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0, current) {
					// gaps in the word circle are made by masking within the calling draw function
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (.65 + rad + r * -1) * Math.PI, (.35 + rad - r * -1) * Math.PI, "major"),
						clipPath: current.clip
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
			"b": {
				contains: ["b", "j", "z", "d", "m"],
				radiants: [.4],
				fromto: [1, 1.5]
			},
			"1l": {
				contains: ["i", "p", "z", "l", "n"],
				radiants: [.4],
				fromto: [1.3, 1.3]
			},
			"2l": {
				contains: ["o", "t", "d", "w", "q"],
				radiants: [.35, .4],
				fromto: [1.3, 1.3]
			},
			"3l": {
				contains: ["sh", "wh"],
				radiants: [.3, .35, .4],
				fromto: [1.3, 1.3]
			},
			"c": {
				contains: ["a", "g", "b", "s", "h", "u", "x", "m", "y", "v"],
				radiants: [.7],
				fromto: [.7]
			},
			"d": {
				contains: ["e", "k", "j", "f", "r", "u", "x", "m", "y", "v"],
				radiants: [.5],
				fromto: [.7]
			},
			"cd": {
				contains: ["ß", "ch", "ph"],
				radiants: [.2],
				fromto: [.7]
			},
		}
	}
	draw(ctx, deco, x, y, currentbase, baserad) {
		baserad += .5;
		if (includes(["d"], deco)) {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('circle', 0, {
					cx: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator * .4
				});
			});
		} else if (includes(["c"], deco)) {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('circle', 1, {
					cx: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator
				});
			});
		} else if (includes(["cd"], deco)) {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('circle', 1, {
					cx: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator
				});
				ctx.drawShape('circle', 0, {
					cx: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator * .4
				});
			});
		} else if (includes(["b"], deco)) {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('line', 1, {
					x1: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					y1: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					x2: x + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[1],
					y2: y + this.base.fluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[1]
				});
			});
		} else {
			this.fluxtable[deco].radiants.forEach(rad => {
				let fromto = this.fluxtable[deco].fromto;
				ctx.drawShape('line', 1, {
					x1: x + this.base.fluxtable[currentbase].radialPlacement(.5 - rad - baserad).x * fromto[0],
					y1: y + this.base.fluxtable[currentbase].radialPlacement(.5 - rad - baserad).y * fromto[0],
					x2: x + this.base.fluxtable[currentbase].radialPlacement(.5 + rad - baserad).x * fromto[1],
					y2: y + this.base.fluxtable[currentbase].radialPlacement(.5 + rad - baserad).y * fromto[1]
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

/**Copyright 2020-2025 Mightyfrong, erroronline1, ModisR
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