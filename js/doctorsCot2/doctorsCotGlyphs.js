import {
	includes,
} from '../utils/funcs.js';
import {
	dc2Consonants
} from './setup.js';

export class cotConsonants {
	constructor() {
		this.base = {
				j: {
					contains: ["j", "ts", "ŋ", "v", "ʤ", "f", "ʒ", "ɢ", "ç", "ɬ", "ʎ", "'"],
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
					contains: ["n", "h", "l", "p", "w", "ʧ", "st", "ɴ", "ð", "ɮ", "ß", ","],
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
					contains: ["t", "s", "ɹ", "d", "m", "ʃ", "θ", "q", "ʝ", "ʋ", "x", "?"],
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
					contains: ["χ", "ɲ", "ɳ", "ʈ", "ɖ", "c", "ɟ", "ħ", "ɭ", "ɸ", "!"],
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
					contains: ["ʁ", "ʙ", "ʀ", "ⱱ", "ɾ", "ɽ", "ʂ", "ʐ", "ɦ", "ʟ", "."],
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
	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let rows = [];
		Object.keys(this.base).forEach(row => {
			let columns = [];
			Object.keys(this.base[row].contains).forEach(key => {
				columns.push([this.base[row].contains[key], this.base[row].contains[key]]);
			});
			rows.push(columns);
		});
		return rows;
	}
}

export class cotVowels {
	constructor() {
		this.lines = {
			ɑ: {
				contains: ["ɑ", "i", "u", "a", "y"],
				outerline: 1,
				innerline: 0
			},
			e: {
				contains: ["e", "ɪ", "ou", "æ", "ʉ"],
				outerline: 1,
				innerline: 1
			},
			ɛ: {
				contains: ["ɛ", "ai", "ʌ", "ɜ", "ø"],
				outerline: 2.5,
				innerline: 0
			},
			ʊ: {
				contains: ["ʊ", "ɘ", "ɐ", "ɤ", "ɵ"],
				outerline: 2.5,
				innerline: 1
			},
			ɯ: {
				contains: ["ɯ", "ɨ", "ə", "ɔ", "o"],
				outerline: 2.5,
				innerline: 2.5
			},
			œ: {
				contains: ["œ", "ɞ", "ɒ", "ɶ"],
				outerline: 1,
				innerline: 2.5
			},
		};
		this.shape = {
			ɑ: {
				contains: ["ɑ", "e", "ɛ", "ʊ", "ɯ", "œ"],
				draw: function (ctx, x, y, r, lines, former) {
					let formerbaserad = dc2Consonants.base[dc2Consonants.getBase(former)].baserad;

					ctx.drawShape('path', lines.outerline, {
						d: ctx.circularArc(
							x + Math.cos(Math.PI * (1.2)) * r * (formerbaserad - .1),
							y + Math.sin(Math.PI * (1.2)) * r * (formerbaserad - .1),
							r * .7, Math.PI * (1.8), Math.PI * (.6), "minor"),
						fill: document.getElementById('backgroundcolor').value
					});
					if (lines.innerline)
						ctx.drawShape('path', lines.innerline, {
							d: ctx.circularArc(
								x + Math.cos(Math.PI * (1.2)) * r * (formerbaserad - .1),
								y + Math.sin(Math.PI * (1.2)) * r * (formerbaserad - .1),
								r * .55, Math.PI * (1.8), Math.PI * (.6), "minor")
						});
				}
			},
			i: {
				contains: ["i", "ɪ", "ai", "ɘ", "ɨ", "ɞ"],
				draw: function (ctx, x, y, r, lines, former) {
					ctx.drawShape('circle', lines.outerline, {
						cx: x + Math.cos(Math.PI * (1.2)) * r * .7,
						cy: y + Math.sin(Math.PI * (1.2)) * r * .7,
						r: r * .25,
						fill: document.getElementById('backgroundcolor').value
					});
					if (lines.innerline)
						ctx.drawShape('circle', lines.innerline, {
							cx: x + Math.cos(Math.PI * (1.2)) * r * .7,
							cy: y + Math.sin(Math.PI * (1.2)) * r * .7,
							r: r * .15
						});
				}
			},
			u: {
				contains: ["u", "ou", "ʌ", "ɐ", "ə", "ɒ"],
				draw: function (ctx, x, y, r, lines, former) {
					ctx.drawShape('circle', lines.outerline, {
						cx: x + Math.cos(Math.PI * (1.2)) * r * .4,
						cy: y + Math.sin(Math.PI * (1.2)) * r * .4,
						r: r * .25,
						fill: document.getElementById('backgroundcolor').value
					});
					if (lines.innerline)
						ctx.drawShape('circle', lines.innerline, {
							cx: x + Math.cos(Math.PI * (1.2)) * r * .4,
							cy: y + Math.sin(Math.PI * (1.2)) * r * .4,
							r: r * .15
						});
				}
			},
			a: {
				contains: ["a", "æ", "ɜ", "ɤ", "ɔ", "ɶ"],
				draw: function (ctx, x, y, r, lines, former) {
					ctx.drawShape('circle', lines.outerline, {
						cx: x + Math.cos(Math.PI * (1.2)) * r * .1,
						cy: y + Math.sin(Math.PI * (1.2)) * r * .1,
						r: r * .25,
						fill: document.getElementById('backgroundcolor').value
					});
					if (lines.innerline)
						ctx.drawShape('circle', lines.innerline, {
							cx: x + Math.cos(Math.PI * (1.2)) * r * .1,
							cy: y + Math.sin(Math.PI * (1.2)) * r * .1,
							r: r * .15
						});
				}
			},
			y: {
				contains: ["y", "ʉ", "ø", "ɵ", "o"],
				draw: function (ctx, x, y, r, lines, former) {
					ctx.drawShape('path', lines.outerline, {
						d: ctx.circularArc(
							x + Math.cos(Math.PI * (1.2)) * r * .4,
							y + Math.sin(Math.PI * (1.2)) * r * .4,
							r * .25, Math.PI * (.6), Math.PI * (1.8), "major")
					});
					if (lines.innerline)
						ctx.drawShape('path', lines.innerline, {
							d: ctx.circularArc(
								x + Math.cos(Math.PI * (1.2)) * r * .4,
								y + Math.sin(Math.PI * (1.2)) * r * .4,
								r * .15, Math.PI * (.6), Math.PI * (1.8), "major")
						});
				}
			}
		};
	}

	getLines(char) { // return name of line group the given character is assigned to
		let rtrn = false;
		Object.keys(this.lines).forEach(row => {
			if (includes(this.lines[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
	getShape(char) { // return name of shape group the given character is assigned to
		let rtrn = false;
		Object.keys(this.shape).forEach(row => {
			if (includes(this.shape[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let rows = [];
		Object.keys(this.lines).forEach(row => {
			let columns = [];
			Object.keys(this.lines[row].contains).forEach(key => {
				columns.push([this.lines[row].contains[key], this.lines[row].contains[key]]);
			});
			rows.push(columns);
		});
		return rows;
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