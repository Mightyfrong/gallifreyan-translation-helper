import {
	includes,
	renderOptions
} from '../main.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class tkgBase {
	constructor() {
		this.tkgtable = {
			/* example: { // name of group
				contains: [...], // array of characters for which the handling and properties apply
				draw: function (ctx,x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
					SVGRenderingContext-draw instructions...
				}
			}*/
			b: {
				contains: ["b", "c", "d", "f", "g"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			h: {
				contains: ["h", "j", "k", "l", "m"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r - 3
					});
				}
			},
			n: {
				contains: ["n", "p", "q", "r", "s", ],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 3, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r - 4
					});
				}
			},
			t: {
				contains: ["t", "v", "w", "x", "y"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 3, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			z: {
				contains: ["z", "א", "th", "ng"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r - 3
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r - 6
					});
				}
			}

		}
	}
	getBase(char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.tkgtable).forEach(row => {
			if (includes(this.tkgtable[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
}

// specify decoration for every letter
export class tkgDeco {
	constructor() {
		this.tkgtable = {
			/* example: { // name of group
				contains: [...], // array of characters for which the handling and properties apply
				draw: function (ctx, x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
					SVGRenderingContext-draw instructions...
				}
			}*/
			"circle": {
				contains: ["b", "h", "n", "t", "z"],
				draw: function (ctx, x, y, r, element, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.5 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (1.5 + tilt)) * (r - element * .6),
						r: element * .6,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			"twocircles": {
				contains: ["c", "j", "p", "v", "א"],
				draw: function (ctx, x, y, r, element, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.6 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (1.6 + tilt)) * (r - element * .6),
						r: element * .6,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.6 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (.6 + tilt)) * (r - element * .6),
						r: element * .6,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			"dotcircle": {
				contains: ["d", "k", "q", "w", "th"],
				draw: function (ctx, x, y, r, element, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.6 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (.6 + tilt)) * (r - element * .6),
						r: element * .1
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.6 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (1.6 + tilt)) * (r - element * .6),
						r: element * .6,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			"twodots": {
				contains: ["f", "l", "r", "x", "ng"],
				draw: function (ctx, x, y, r, element, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.6 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (1.6 + tilt)) * (r - element * .6),
						r: element * .1
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.6 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (.6 + tilt)) * (r - element * .6),
						r: element * .1
					});
				}
			},
			"dot": {
				contains: ["g", "m", "s", "y"],
				draw: function (ctx, x, y, r, element, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.5 + tilt)) * (r - element * .6),
						cy: y + Math.sin(Math.PI * (1.5 + tilt)) * (r - element * .6),
						r: element * .1
					});
				}
			}
		}
	}
	getDeco(char) { // return name of decorator the given character is assigned to
		let rtrn = false;
		Object.keys(this.tkgtable).forEach(row => {
			if (includes(this.tkgtable[row].contains, char)) rtrn = row;
		});
		return rtrn != "null" ? rtrn : false;
	}
}

export class tkgVowel {
	constructor() {
		this.tkgtable = {
			/* example: { // name of group
				contains: [...], // array of characters for which the handling and properties apply
				draw: function (ctx, x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
					SVGRenderingContext-draw instructions...
				}
			}*/
			a: {
				draw: function (ctx, x, y, r1, r2, tilt) {
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (.75 + tilt)) * r1,
						y1: y + Math.sin(Math.PI * (.75 + tilt)) * r1,
						x2: x,
						y2: y
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r2,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			e: {
				draw: function (ctx, x, y, r1, r2, tilt) {
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (.75 + tilt)) * r1,
						y1: y + Math.sin(Math.PI * (.75 + tilt)) * r1,
						x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r1,
						y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r1
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r2,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			i: {
				draw: function (ctx, x, y, r1, r2, tilt) {
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (.75 + tilt)) * r1,
						y1: y + Math.sin(Math.PI * (.75 + tilt)) * r1,
						x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r1,
						y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r1
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r1 - (r1 - r2) * .5, Math.PI * (1.75 + tilt), Math.PI * (2.75 + tilt), "minor")
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r2,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			o: {
				draw: function (ctx, x, y, r1, r2, tilt) {
					for (let i = 1; i <= 3; i++) {
						ctx.drawShape('line', 1, {
							x1: x + Math.cos(Math.PI * (1.5 + 2 / 3 * i + tilt)) * r1,
							y1: y + Math.sin(Math.PI * (1.5 + 2 / 3 * i + tilt)) * r1,
							x2: x,
							y2: y
						});
					}
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r2,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			u: {
				draw: function (ctx, x, y, r1, r2, tilt) {
					for (let i = 1; i <= 3; i++) {
						ctx.drawShape('line', 1, {
							x1: x + Math.cos(Math.PI * (1.5 + 2 / 3 * i + tilt)) * r1,
							y1: y + Math.sin(Math.PI * (1.5 + 2 / 3 * i + tilt)) * r1,
							x2: x,
							y2: y
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r1 - (r1 - r2) * .5, Math.PI * (1.5 + 2 / 3 + tilt), Math.PI * (1.5 + 2 / 3 * 2 + tilt), "minor")
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r2,
						fill: renderOptions.get().backgroundcolor
					});
				}
			}
		}
	}
	getVowel(char) { // return name of decorator the given character is assigned to
		let rtrn = false;
		if (char in this.tkgtable) rtrn = char;
		return rtrn != "null" ? rtrn : false;
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