import {
	renderOptions
} from '../event_callbacks.js';
import {
	includes
} from '../utils/funcs.js';

// bases define shapes beforehand instead of drawing directly in hope of reusing these one day
// when i am able to clip the paths of vowels accordingly

export class gcGlyphs {
	constructor() {
		this.deco = {
			b: {
				contains: ["b", "j", "p", "v"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: r * .4,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			d: {
				contains: ["d", "k", "q", "w"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 2, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: r * .4,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: r * .3,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			f: {
				contains: ["f", "l", "r", "x"],
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: r * .3
					});
				}
			},
			g: {
				contains: ["g", "m", "s", "y"],
				draw: function (ctx, x, y, r, tilt) {
					let dir = Math.random() * 2;
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (dir + tilt)) * r * 1.6,
						y1: y + Math.sin(Math.PI * (dir + tilt)) * r * 1.6,
						x2: x,
						y2: y
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (dir + .75 + tilt)) * r * 1.6,
						y1: y + Math.sin(Math.PI * (dir + .75 + tilt)) * r * 1.6,
						x2: x,
						y2: y
					});
				}
			},
			h: {
				contains: ["h", "n", "t", "z"],
				draw: function (ctx, x, y, r, tilt) {
					return;
				}
			}
		};
		this.base = {
			b: {
				contains: ["b", "d", "f", "g", "h"],
				shape: function (x, y, r, tilt) {
					return [{
						shape: 'circle',
						attributes: {
							cx: x,
							cy: y,
							r: r,
							fill: renderOptions.get().backgroundcolor
						},
						linewidth: 1
					}];
				},
				draw: function (ctx, x, y, r, tilt) {
					this.shape(x, y, r, tilt).forEach(s => {
						ctx.drawShape(s.shape, s.linewidth, s.attributes);
					});
				}
			},
			j: {
				contains: ["j", "k", "l", "m", "n"],
				shape: function (x, y, r, tilt) {
					let points = "";
					for (let i = 0; i < 2; i += 2 / 6) {
						points +=
							(x + Math.cos(Math.PI * (i + tilt)) * r) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r) +
							" ";
					}
					return [{
						shape: 'polygon',
						attributes: {
							points: points,
							fill: renderOptions.get().backgroundcolor
						},
						linewidth: 1
					}];
				},
				draw: function (ctx, x, y, r, tilt) {
					this.shape(x, y, r, tilt).forEach(s => {
						ctx.drawShape(s.shape, s.linewidth, s.attributes);
					});
				}
			},
			p: {
				contains: ["p", "q", "r", "s", "t"],
				shape: function (x, y, r, tilt) {
					return [{
						shape: 'circle',
						attributes: {
							cx: x,
							cy: y,
							r: r,
							fill: renderOptions.get().backgroundcolor
						},
						linewidth: 2
					}, {
						shape: 'circle',
						attributes: {
							cx: x,
							cy: y,
							r: r * .9
						},
						linewidth: 1
					}];
				},
				draw: function (ctx, x, y, r, tilt) {
					this.shape(x, y, r, tilt).forEach(s => {
						ctx.drawShape(s.shape, s.linewidth, s.attributes);
					});
				}
			},
			v: {
				contains: ["v", "w", "x", "y", "z"],
				shape: function (x, y, r, tilt) {
					let points = ["", ""];
					for (let i = 0; i < 2; i += 2 / 6) {
						points[0] +=
							(x + Math.cos(Math.PI * (i + tilt)) * r) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r) +
							" ";
						points[1] +=
							(x + Math.cos(Math.PI * (i + tilt)) * r * .9) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r * .9) +
							" ";
					}
					return [{
						shape: 'polygon',
						attributes: {
							points: points[0],
							fill: renderOptions.get().backgroundcolor
						},
						linewidth: 2
					}, {
						shape: 'polygon',
						attributes: {
							points: points[1]
						},
						linewidth: 1
					}];
				},
				draw: function (ctx, x, y, r, tilt) {
					this.shape(x, y, r, tilt).forEach(s => {
						ctx.drawShape(s.shape, s.linewidth, s.attributes);
					});
				}
			},
		};
		this.vowel = {
			a: {
				draw: function (ctx, x, y, r, tilt, clip) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.5 + tilt)) * r,
						r: r * .75,
						clipPath: clip
					});
				}
			},
			e: {
				draw: function (ctx, x, y, r, tilt, clip) {
					x = x + Math.cos(Math.PI * (.5 + tilt)) * r;
					y = y + Math.sin(Math.PI * (.5 + tilt)) * r;
					let points = "";
					for (let i = 0; i < 2; i += 2 / 6) {
						points +=
							(x + Math.cos(Math.PI * (i + tilt)) * r * .75) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r * .75) +
							" ";
					}
					ctx.drawShape('polygon', 1, {
						points: points,
						clipPath: clip
					});
				}
			},
			i: {
				draw: function (ctx, x, y, r, tilt, clip) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.5 + tilt)) * r,
						r: r * .75,
						clipPath: clip
					});
				}
			},
			o: {
				draw: function (ctx, x, y, r, tilt, clip) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.5 + tilt)) * r,
						r: r * .75,
						clipPath: clip
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.5 + tilt)) * r,
						r: r * .65,
						clipPath: clip
					});
				}
			},
			u: {
				draw: function (ctx, x, y, r, tilt, clip) {
					x = x + Math.cos(Math.PI * (.5 + tilt)) * r;
					y = y + Math.sin(Math.PI * (.5 + tilt)) * r;
					let points = ["", ""];
					for (let i = 0; i < 2; i += 2 / 6) {
						points[0] +=
							(x + Math.cos(Math.PI * (i + tilt)) * r * .75) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r * .75) +
							" ";
						points[1] +=
							(x + Math.cos(Math.PI * (i + tilt)) * r * .65) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r * .65) +
							" ";
					}
					ctx.drawShape('polygon', 1, {
						points: points[0],
						clipPath: clip
					});
					ctx.drawShape('polygon', 1, {
						points: points[1],
						clipPath: clip
					});
				}
			}
		};
		this.punctuation = {
			".": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * .9, 1.75 * Math.PI, 1.25 * Math.PI, 'major')
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * .9, 1.75 * Math.PI, 1.25 * Math.PI, 'minor')
					});
				}
			},
			",": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI, 'major')
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, 1.75 * Math.PI, 1.25 * Math.PI, 'minor')
					});
				}
			},
			"!": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .9
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, .75 * Math.PI, .25 * Math.PI, 'major')
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, .75 * Math.PI, .25 * Math.PI, 'minor')
					});
				}
			},
			"?": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, .75 * Math.PI, .25 * Math.PI, 'major')
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, .75 * Math.PI, .25 * Math.PI, 'minor')
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * .9, 1.75 * Math.PI, 1.25 * Math.PI, 'major')
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * .9, 1.75 * Math.PI, 1.25 * Math.PI, 'minor')
					});
				}
			},
			"'": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .9
					});
				}
			},
			'"': {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
		};
	}
	getDeco(char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		Object.keys(this.deco).forEach(row => {
			if (includes(this.deco[row].contains, char)) rtrn.push(row);
		});
		return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
	}
	getBase(char) { // return array of names of bases the given character is assigned to
		let rtrn = [];
		Object.keys(this.base).forEach(row => {
			if (includes(this.base[row].contains, char)) rtrn.push(row);
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