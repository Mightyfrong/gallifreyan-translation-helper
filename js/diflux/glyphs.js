import {
	includes
} from '../main.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class difluxBase {
	constructor(consonant, decorator) {
		this.consonant = consonant;
		this.decorator = decorator;
		this.difluxtable = {
			e: {
				contains: ["e", "s", "r", "b", "y", "k", "m", "z"],
				centerYoffset: 0,
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
						r: r,
					});
				}
			},
			a: {
				contains: ["a", "n", "h", "c", "u", "w", "d", "v"],
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
			i: {
				contains: ["i", "g", "t", "f", "o", "p", "l", "j"],
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
		}
	}

	getBase(char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.difluxtable).forEach(row => {
			if (includes(this.difluxtable[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
}

// specify decoration for every letter
export class difluxDeco {
	constructor(base) {
		this.base = base;
		this.difluxtable = {
			"b": {
				contains: ["s", "n", "g", "b", "c", "f", "k", "w", "p", "z", "v", "j"],
				radiants: [.4],
				fromto: [1, 1.7]
			},
			"c": {
				contains: ["y", "u", "o", "k", "w", "p", "m", "d", "l", "z", "v", "j"],
				radiants: [.7],
				fromto: [.7]
			},
			"d": {
				contains: ["r", "h", "t", "b", "c", "f", "m", "d", "l", "z", "v", "j"],
				radiants: [.5],
				fromto: [.7]
			},
		}
	}
	draw(ctx, deco, x, y, currentbase, baserad) {
		baserad += .5;
		if (includes(["d"], deco)) {
			this.difluxtable[deco].radiants.forEach(rad => {
				let fromto = this.difluxtable[deco].fromto;
				ctx.drawShape('circle', 0, {
					cx: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator * .4
				});
			});
		} else if (includes(["c"], deco)) {
			this.difluxtable[deco].radiants.forEach(rad => {
				let fromto = this.difluxtable[deco].fromto;
				ctx.drawShape('circle', 1, {
					cx: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator
				});
			});
		} else if (includes(["b"], deco)) {
			this.difluxtable[deco].radiants.forEach(rad => {
				let fromto = this.difluxtable[deco].fromto;
				ctx.drawShape('line', 1, {
					x1: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					y1: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					x2: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[1],
					y2: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[1]
				});
			});
		}
	}
	getDeco(char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		Object.keys(this.difluxtable).forEach(row => {
			if (includes(this.difluxtable[row].contains, char)) rtrn.push(row);
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