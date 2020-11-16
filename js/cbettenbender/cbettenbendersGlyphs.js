import {
	includes,
} from '../utils/funcs.js';

export class cbConsonants {
	constructor() {
		this.base = {
			soft: {
				contains: ["f", "h", "j", "l", "m", "n", "r", "s", "v", "w", "y", "z"],
				rad: function (char) {
					return 1.5 + 2 / this.contains.length * (this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .75,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .75,
						r: r * .25,
					});
				}
			},
			hard: {
				contains: ["b", "d", "g", "k", "p", "t"],
				rad: function (char) {
					return 1.5 + 2 / this.contains.length * (this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .75,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .75,
						r: r * .25
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .7,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .7,
						r: r * .15
					});
				}
			},
			combi: {
				contains: ["ch", "th", "sh"],
				rad: function (char) {
					return 1.5 + 2 / this.contains.length * (this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .75,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .75,
						r: r * .25
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .7,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .7,
						r: r * .15
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * .7, Math.PI * (this.rad(char) - .11), Math.PI * (this.rad(char) + .11), "minor")
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

export class cbVowels {
	constructor() {
		this.base = {
			a: {
				contains: ["ɑ", "æ", "eɪ"],
				keyboard: ["c<b>a</b>r", "h<b>a</b>t", "h<b>a</b>y"],
				rad: function (char) {
					return (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .55,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .55,
						r: r * .25,
					});
				}
			},
			e: {
				contains: ["ɛ", "ɜ", "i"],
				keyboard: ["fr<b>e</b>t", "p<b>e</b>rch", "fr<b>ee</b>"],
				rad: function (char) {
					return (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .55,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .55,
						r: r * .075,
					});
				}
			},
			i: {
				contains: ["ɪ", "aɪ"],
				keyboard: ["<b>i</b>f", "l<b>i</b>fe"],
				rad: function (char) {
					return .5 + 2 / this.contains.length * (1 + this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(
							x + Math.cos(Math.PI * this.rad(char)) * r * .2,
							y + Math.sin(Math.PI * this.rad(char)) * r * .2,
							r * .33,
							Math.PI * (this.rad(char) - .46), Math.PI * (this.rad(char) + .46), "minor"
						)
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(
							x,
							y,
							r * .4,
							Math.PI * (this.rad(char) - .3), Math.PI * (this.rad(char) + .3), "minor"
						)
					});
				}
			},
			o: {
				contains: ["ɔ", "ɒ", "əʊ"],
				keyboard: ["f<b>o</b>r", "h<b>o</b>t", "t<b>o</b>e"],
				rad: function (char) {
					return (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					let offset = {
						x: Math.sin(Math.PI * this.rad(char)) * r * -.05,
						y: Math.cos(Math.PI * this.rad(char)) * r * -.05
					};
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * this.rad(char)) * r - offset.x,
						y1: y + Math.sin(Math.PI * this.rad(char)) * r + offset.y,
						x2: x - Math.cos(Math.PI * this.rad(char)) * r - offset.x,
						y2: y - Math.sin(Math.PI * this.rad(char)) * r + offset.y
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * this.rad(char)) * r + offset.x,
						y1: y + Math.sin(Math.PI * this.rad(char)) * r - offset.y,
						x2: x - Math.cos(Math.PI * this.rad(char)) * r + offset.x,
						y2: y - Math.sin(Math.PI * this.rad(char)) * r - offset.y
					});
				}
			},
			u: {
				contains: ["u", "ʊ", "ʌ"],
				keyboard: ["y<b>ou</b>", "p<b>u</b>sh", "<b>u</b>p"],
				rad: function (char) {
					return (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
				},
				draw: function (ctx, x, y, r, char) {
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .55,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .55,
						r: r * .25
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * this.rad(char)) * r * .55,
						cy: y + Math.sin(Math.PI * this.rad(char)) * r * .55,
						r: r * .15
					});
				}
			},
		}
	}

	getBase(char) { // return name of base group the given character is assigned to
		let rtrn = false;
		Object.keys(this.base).forEach(row => {
			if (includes(this.base[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}

	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let rows = [];
		Object.keys(this.base).forEach(row => {
			let columns = [];
			Object.keys(this.base[row].contains).forEach(key => {
				columns.push([this.base[row].keyboard[key], this.base[row].contains[key]]);
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