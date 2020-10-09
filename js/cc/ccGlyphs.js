import {
	includes,
} from '../utils/funcs.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class ccBase {
	constructor() {
		this.cctable = {
			/* example: { // name of group
				contains: [...], // array of characters for which the handling and properties apply
				draw: function (ctx,x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
					SVGRenderingContext-draw instructions...
				}
			}*/
			c: {
				contains: ["a", "e", "i", "o", "u", "b", "c"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .95
					});
				}
			},
			l: {
				contains: ["d", "f", "g", "h", "j", "k", "l"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('line', 1, {
						x1: x,
						y1: y,
						x2: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.25 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x,
						y1: y,
						x2: x + Math.cos(Math.PI * (.75 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (.75 + tilt)) * r
					});
				}
			},
			t: {
				contains: ["m", "n", "p", "q", "r", "s", "t"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * .9, Math.PI * (.75 + tilt), Math.PI * (1.25 + tilt),"minor")
					});
					ctx.drawShape('line', 1, {
						x1: x,
						y1: y,
						x2: x + Math.cos(Math.PI * (.75 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (.75 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x,
						y1: y,
						x2: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.25 + tilt)) * r
					});
				}
			},
			ng: {
				contains: ["v", "w", "x", "y", "z", "th", "ng"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 3, {
						cx: x,
						cy: y,
						r: r * .9
					});
				}
			},

		}
	}
	getBase(char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.cctable).forEach(row => {
			if (includes(this.cctable[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
}

// specify decoration for every letter
export class ccDeco {
	constructor() {
		this.cctable = {
			/* example: { // name of group
				contains: [...], // array of characters for which the handling and properties apply
				draw: function (ctx, x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
					SVGRenderingContext-draw instructions...
				}
			}*/
			"dot": {
				contains: ["a", "d", "m", "v"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1 + tilt)) * r * .9,
						r: r * .1
					});
				}
			},
			"circle": {
				contains: ["e", "f", "n", "w"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x + Math.cos(Math.PI * (1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1 + tilt)) * r * .9,
						r: r * .1
					});
				}
			},
			"doublecircle": {
				contains: ["i", "g", "p", "x"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x + Math.cos(Math.PI * (1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1 + tilt)) * r * .9,
						r: r * .06
					});
				}
			},
			"dotcircle": {
				contains: ["o", "h", "q", "y"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.clearShape('circle', {
						cx: x + Math.cos(Math.PI * (.9 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (.9 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.9 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (.9 + tilt)) * r * .9,
						r: r * .1
					});
				}
			},
			"twodots": {
				contains: ["u", "j", "r", "z"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.9 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (.9 + tilt)) * r * .9,
						r: r * .1
					});
				}
			},
			"twocircles": {
				contains: ["b", "k", "s", "th"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.clearShape('circle', {
						cx: x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.clearShape('circle', {
						cx: x + Math.cos(Math.PI * (.9 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (.9 + tilt)) * r * .9,
						r: r * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.9 + tilt)) * r * .9,
						cy: y + Math.sin(Math.PI * (.9 + tilt)) * r * .9,
						r: r * .1
					});
				}
			},
			"null": {
				contains: ["c", "l", "t", "ng"],
			},
		}
	}
	getDeco(char) { // return name of decorator the given character is assigned to
		let rtrn = false;
		Object.keys(this.cctable).forEach(row => {
			if (includes(this.cctable[row].contains, char)) rtrn = row;
		});
		return rtrn != "null" ? rtrn : false;
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