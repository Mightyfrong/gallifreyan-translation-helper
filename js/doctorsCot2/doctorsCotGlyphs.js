import {
	includes,
} from '../utils/funcs.js';

export class cotConsonants {
	constructor() {
		this.base = {
				j: {
					contains: ["j", "ts", "ŋ", "v", "ʤ", "f", "ʒ", "ɢ", "ç", "ɬ", "ʎ"],
					baserad: 1,
					outerline: 1,
					innerline: 1,
					draw: function (ctx, x, y, r) {
						ctx.drawShape('circle', this.outerline, {
							cx: x,
							cy: y,
							r: r,
							fill: document.getElementById('backgroundcolor').value
						});
					}
				},
				n: {
					contains: ["n", "h", "l", "p", "w", "ʧ", "st", "ɴ", "ð", "ɮ", "ß"],
					baserad: .85,
					outerline: 1,
					innerline: 1,
					draw: function (ctx, x, y, r) {
						ctx.drawShape('circle', this.outerline, {
							cx: x,
							cy: y,
							r: r,
							fill: document.getElementById('backgroundcolor').value
						});
						ctx.drawShape('circle', this.innerline, {
							cx: x,
							cy: y,
							r: r * .85
						});
					}
				},
				t: {
					contains: ["t", "s", "ɹ", "d", "m", "ʃ", "θ", "q", "ʝ", "ʋ", "x"],
					baserad: 1,
					outerline: 2.5,
					innerline: 2.5,
					draw: function (ctx, x, y, r) {
						ctx.drawShape('circle', this.outerline, {
							cx: x,
							cy: y,
							r: r,
							fill: document.getElementById('backgroundcolor').value
						});
					}
				},
				ks: {
					contains: ["ks", "k", "z", "b", "א", "g", "r", "ɻ", "ɣ", "ɰ"],
					baserad: .85,
					outerline: 2.5,
					innerline: 1,
					draw: function (ctx, x, y, r) {
						ctx.drawShape('circle', this.outerline, {
							cx: x,
							cy: y,
							r: r,
							fill: document.getElementById('backgroundcolor').value
						});
						ctx.drawShape('circle', this.innerline, {
							cx: x,
							cy: y,
							r: r * .85
						});
					}
				},
				χ: {
					contains: ["χ", "ɲ", "ɳ", "ʈ", "ɖ", "c", "ɟ", "ħ", "ɭ", "ɸ"],
					baserad: .85,
					outerline: 2.5,
					innerline: 2.5,
					draw: function (ctx, x, y, r) {
						ctx.drawShape('circle', this.outerline, {
							cx: x,
							cy: y,
							r: r,
							fill: document.getElementById('backgroundcolor').value
						});
						ctx.drawShape('circle', this.innerline, {
							cx: x,
							cy: y,
							r: r * .85
						});
					}
				},
				ʁ: {
					contains: ["ʁ", "ʙ", "ʀ", "ⱱ", "ɾ", "ɽ", "ʂ", "ʐ", "ɦ", "ʟ"],
					baserad: .85,
					outerline: 1,
					innerline: 2.5,
					draw: function (ctx, x, y, r) {
						ctx.drawShape('circle', this.outerline, {
							cx: x,
							cy: y,
							r: r,
							fill: document.getElementById('backgroundcolor').value
						});
						ctx.drawShape('circle', this.innerline, {
							cx: x,
							cy: y,
							r: r * .85
						});
					}
				}
			},
			this.decorators = {
				j: {
					contains: ["j", "n", "t", "ks", "χ", "ʁ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r
						});
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (.5 + tilt)) * r
						});
					}
				},
				ts: {
					contains: ["ts", "h", "s", "k", "ɲ", "ʙ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (1.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (1.5 + tilt)) * r
						});
					}
				},
				ŋ: {
					contains: ["ŋ", "l", "ɹ", "z", "ɳ", "ʀ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (1.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (1.5 + tilt)) * r
						});
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (.5 + tilt)) * r
						});
					}
				},
				v: {
					contains: ["v", "p", "d", "b", "ʈ", "ⱱ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('circle', lineweight, {
							cx: x + Math.cos(Math.PI * (0 + tilt)) * r * .8,
							cy: y + Math.sin(Math.PI * (0 + tilt)) * r * .8,
							r: r * .08,
						});
						ctx.drawShape('circle', lineweight, {
							cx: x + Math.cos(Math.PI * (.2 + tilt)) * r * .8,
							cy: y + Math.sin(Math.PI * (.2 + tilt)) * r * .8,
							r: r * .08
						});
					}
				},
				ʤ: {
					contains: ["ʤ", "w", "m", "א", "ɖ", "ɾ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('circle', lineweight, {
							cx: x + Math.cos(Math.PI * (0 + tilt)) * r * .8,
							cy: y + Math.sin(Math.PI * (0 + tilt)) * r * .8,
							r: r * .08,
						});
						ctx.drawShape('circle', 0, {
							cx: x + Math.cos(Math.PI * (.2 + tilt)) * r * .8,
							cy: y + Math.sin(Math.PI * (.2 + tilt)) * r * .8,
							r: r * .08
						});
					}
				},
				f: {
					contains: ["f", "ʧ", "ʃ", "g", "c", "ɽ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('circle', lineweight, {
							cx: x + Math.cos(Math.PI * (.2 + tilt)) * r * .8,
							cy: y + Math.sin(Math.PI * (.2 + tilt)) * r * .8,
							r: r * .08
						});
					}
				},
				ʒ: {
					contains: ["ʒ", "st", "θ", "r", "ɟ", "ʂ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('circle', 0, {
							cx: x + Math.cos(Math.PI * (.2 + tilt)) * r * .8,
							cy: y + Math.sin(Math.PI * (.2 + tilt)) * r * .8,
							r: r * .08
						});
					}
				},
				ɢ: {
					contains: ["ɢ", "ɴ", "q", "ɻ", "ħ", "ʐ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (1.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (1.5 + tilt)) * r
						});
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (.5 + tilt)) * r
						});
						ctx.drawShape('path', lineweight, {
							d: ctx.circularArc(x, y, r * .6, Math.PI * (1.5 + tilt), Math.PI * (.5 + tilt), "minor")
						});
					}
				},
				ç: {
					contains: ["ç", "ð", "ʝ", "ɣ", "ɭ", "fi"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r
						});
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (.5 + tilt)) * r
						});
						ctx.drawShape('path', lineweight, {
							d: ctx.circularArc(x, y, r * .6, Math.PI * (1.75 + tilt), Math.PI * (.5 + tilt), "minor")
						});
					}
				},
				ɬ: {
					contains: ["ɬ", "ɮ", "ʋ", "ɰ", "ɸ", "ʟ"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r
						});
						ctx.drawShape('line', lineweight, {
							x1: x,
							y1: y,
							x2: x + Math.cos(Math.PI * (.5 + tilt)) * r,
							y2: y + Math.sin(Math.PI * (.5 + tilt)) * r
						});
						ctx.drawShape('path', lineweight, {
							d: ctx.circularArc(x, y, r * .6, Math.PI * (.5 + tilt), Math.PI * (1.75 + tilt), "major")
						});
					}
				},
				ʎ: {
					contains: ["ʎ", "ß", "x"],
					draw: function (ctx, x, y, r, lineweight, tilt) {
						ctx.drawShape('circle', lineweight, {
							cx: x + Math.cos(Math.PI * (.2 + tilt)) * r * .6,
							cy: y + Math.sin(Math.PI * (.2 + tilt)) * r * .6,
							r: r * .2
						});
					}
				}
			}
	}

	getBase(char) { // return name of base group the given character is assigned to
		let rtrn = false;
		Object.keys(this.base).forEach(row => {
			if (includes(this.base[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
	getDeco(char) { // return name of decorator group the given character is assigned to
		let rtrn = false;
		Object.keys(this.decorators).forEach(row => {
			if (includes(this.decorators[row].contains, char)) rtrn = row;
		});
		return rtrn;
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