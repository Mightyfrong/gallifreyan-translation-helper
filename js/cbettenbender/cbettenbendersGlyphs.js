import {
	includes,
} from '../utils/funcs.js';
import {
	cbConsonant,
	cbVowel
} from './setup.js';

export class cbConsonants {
	constructor() {

		this.base = {
			soft: {
				contains: ["f", "h", "j", "l", "m", "n", "r", "s", "v", "w", "y", "z"],
				rad: function (char) {
					let rad = 1.5 + 2 / this.contains.length * this.contains.indexOf(char);
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .75,
						y: Math.sin(Math.PI * this.rad(char)) * .75,
						r: .25
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false, initial = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + r * this.property(char)[0].x + Math.sin(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								cy: y + r * this.property(char)[0].y - Math.cos(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								r: r * .03
							});
						}
					} else {
						this.property(char).forEach(set => {
							ctx.drawShape('circle', 1, {
								cx: x + r * set.x,
								cy: y + r * set.y,
								r: r * set.r,
								fill: initial ? document.getElementById('backgroundcolor').value : null
							});
						});
					}
				}
			},
			hard: {
				contains: ["b", "d", "g", "k", "p", "t"],
				rad: function (char) {
					let rad = 1.5 + 2 / this.contains.length * this.contains.indexOf(char);
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .75,
						y: Math.sin(Math.PI * this.rad(char)) * .75,
						r: .25
					}, {
						x: Math.cos(Math.PI * this.rad(char)) * .7,
						y: Math.sin(Math.PI * this.rad(char)) * .7,
						r: .15
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false, initial = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + r * this.property(char)[0].x + Math.sin(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								cy: y + r * this.property(char)[0].y - Math.cos(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								r: r * .03
							});
						}
					} else {
						this.property(char).forEach(set => {
							ctx.drawShape('circle', 1, {
								cx: x + r * set.x,
								cy: y + r * set.y,
								r: r * set.r,
								fill: initial ? document.getElementById('backgroundcolor').value : null
							});
						});
					}
				}
			},
			combi: {
				contains: ["ch", "th", "sh"],
				rad: function (char) {
					let rad = 1.5 + 2 / this.contains.length * this.contains.indexOf(char);
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .75,
						y: Math.sin(Math.PI * this.rad(char)) * .75,
						r: .25
					}, {
						x: Math.cos(Math.PI * this.rad(char)) * .7,
						y: Math.sin(Math.PI * this.rad(char)) * .7,
						r: .15
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false, initial = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + r * this.property(char)[0].x + Math.sin(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								cy: y + r * this.property(char)[0].y - Math.cos(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								r: r * .03
							});
						}
					} else {
						this.property(char).forEach(set => {
							ctx.drawShape('circle', 1, {
								cx: x + r * set.x,
								cy: y + r * set.y,
								r: r * set.r,
								fill: initial ? document.getElementById('backgroundcolor').value : null
							});
						});
						ctx.drawShape('path', 1, {
							d: ctx.circularArc(x, y, r * .7, Math.PI * (this.rad(char) - .11), Math.PI * (this.rad(char) + .11), "minor")
						});
					}
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
					let rad = (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .45,
						y: Math.sin(Math.PI * this.rad(char)) * .45,
						r: .25
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + r * this.property(char)[0].x + Math.sin(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								cy: y + r * this.property(char)[0].y - Math.cos(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								r: r * .03
							});
						}
					} else {
						this.property(char).forEach(set => {
							ctx.drawShape('circle', 1, {
								cx: x + r * set.x,
								cy: y + r * set.y,
								r: r * set.r,
							});
						});
					}
				}
			},
			e: {
				contains: ["ɛ", "ɜ", "i"],
				keyboard: ["fr<b>e</b>t", "p<b>e</b>rch", "fr<b>ee</b>"],
				rad: function (char) {
					let rad = (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .45,
						y: Math.sin(Math.PI * this.rad(char)) * .45,
						r: .075
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + r * this.property(char)[0].x + Math.sin(Math.PI * (this.rad(char) - i * .2)) * r * .15,
								cy: y + r * this.property(char)[0].y - Math.cos(Math.PI * (this.rad(char) - i * .2)) * r * .15,
								r: r * .03
							});
						}
					} else {
						this.property(char).forEach(set => {
							ctx.drawShape('circle', 0, {
								cx: x + r * set.x,
								cy: y + r * set.y,
								r: r * set.r,
							});
						});
					}
				}
			},
			i: {
				contains: ["ɪ", "aɪ"],
				keyboard: ["<b>i</b>f", "l<b>i</b>fe"],
				rad: function (char) {
					let rad = .5 + 2 / this.contains.length * (1 + this.contains.indexOf(char));
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					// i have still do decide whether this is useful in this context or not
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .2,
						y: Math.sin(Math.PI * this.rad(char)) * .2,
						r: .33
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + Math.cos(Math.PI * (this.rad(char) - (i - 1) * .2)) * r * .25,
								cy: y + Math.sin(Math.PI * (this.rad(char) - (i - 1) * .2)) * r * .25,
								r: r * .03
							});
						}
					} else {
						ctx.drawShape('path', 1, {
							d: ctx.circularArc(
									x + r * this.property(char)[0].x,
									y + r * this.property(char)[0].y,
									r * this.property(char)[0].r,
									Math.PI * (this.rad(char) - .46), Math.PI * (this.rad(char) + .46), "minor"
								) + " " +
								ctx.circularArc(
									x,
									y,
									r * .4,
									Math.PI * (this.rad(char) - .3), Math.PI * (this.rad(char) + .3), "minor"
								)
						});
					}
				}
			},
			o: {
				contains: ["ɔ", "ɒ", "əʊ"],
				keyboard: ["f<b>o</b>r", "h<b>o</b>t", "t<b>o</b>e"],
				rad: function (char) {
					let rad = (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					// i have still do decide whether this is useful in this context or not
					return;
				},
				draw: function (ctx, x, y, r, char, repeat = false) {
					let offset = {
						x: Math.sin(Math.PI * this.rad(char)) * r * -.05,
						y: Math.cos(Math.PI * this.rad(char)) * r * -.05
					};
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + Math.sin(Math.PI * (this.rad(char) - (i - 1) * .2)) * r * .25,
								cy: y - Math.cos(Math.PI * (this.rad(char) - (i - 1) * .2)) * r * .25,
								r: r * .03
							});
						}
					} else {
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
				}
			},
			u: {
				contains: ["u", "ʊ", "ʌ"],
				keyboard: ["y<b>ou</b>", "p<b>u</b>sh", "<b>u</b>p"],
				rad: function (char) {
					let rad = (.5 + 2 / this.contains.length) + 2 / this.contains.length * (1 + this.contains.indexOf(char));
					if (rad > 2) rad -= 2;
					return rad;
				},
				property: function (char) {
					return [{
						x: Math.cos(Math.PI * this.rad(char)) * .45,
						y: Math.sin(Math.PI * this.rad(char)) * .45,
						r: .25
					}, {
						x: Math.cos(Math.PI * this.rad(char)) * .45,
						y: Math.sin(Math.PI * this.rad(char)) * .45,
						r: .15
					}];
				},
				draw: function (ctx, x, y, r, char, repeat = false) {
					if (repeat) {
						for (let i = 0; i < 3; i++) {
							ctx.drawShape('circle', 0, {
								cx: x + r * this.property(char)[0].x + Math.sin(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								cy: y + r * this.property(char)[0].y - Math.cos(Math.PI * (this.rad(char) - i * .1)) * r * .35,
								r: r * .03
							});
						}
					} else {
						this.property(char).forEach(set => {
							ctx.drawShape('circle', 1, {
								cx: x + r * set.x,
								cy: y + r * set.y,
								r: r * set.r,
							});
						});
					}
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

export class cbContext {
	constructor() {
		let points = [],
			i = 0;
		for (i = 0; i < (2 - 2 / 24); i += 2 / 24) {
			points.push(parseFloat(i.toPrecision(5)));
		}
		this.connectorPoints = points;
	}

	startCon(ctx, x, y, r, char) {
		//curved pointing v-shape
		let con = this.chunkPoints()[0],
			consonant = cbConsonant.getBase(char),
			initial;
		initial = cbConsonant.base[consonant].rad(char);

		let first = Math.floor(Math.random() * con.length),
			second;
		do {
			second = Math.floor(Math.random() * con.length);
		} while (first == second)

		ctx.drawShape('path', 1, {
			d: this.drawCurve(x, y, r, initial, con[first], 0)
		});
		ctx.drawShape('path', 1, {
			d: this.drawCurve(x, y, r, initial, con[second], 0)
		});
	}

	startVow(ctx, x, y, r, char) {
		//two curved lines in empty space
		let con = this.chunkPoints()[0];
		let first = Math.floor(Math.random() * con.length / 2),
			second = first + Math.floor(con.length / 2),
			gap = .01;

		ctx.drawShape('path', 1, {
			d: this.drawCurve(x, y, r, con[first], con[second], -gap)
		});
		ctx.drawShape('path', 1, {
			d: this.drawCurve(x, y, r, con[first], con[second], gap)
		});
	}

	connectCon(ctx, x, y, r, char1, char2, bent = 'outwards') {
		//curved line connection konvex or concav
		let rad1 = cbConsonant.base[cbConsonant.getBase(char1)].rad(char1),
			rad2 = cbConsonant.base[cbConsonant.getBase(char2)].rad(char2);
		if (bent == 'outwards') {

			// decide direction of bow and occasionally switch character radiants for this task
			// cut and switch character radiants
			if ((rad1 < rad2 || Math.abs(rad1 - rad2) > 1) && (rad1 > .5)) {
				let rad3 = rad1;
				rad1 = rad2;
				rad2 = rad3;
			}
			// add a bit for a smoother curve
			rad1 += 6 / 24;
			rad2 -= 6 / 24;
			//draw outwards pointing bow
			ctx.drawShape('path', 1, {
				d: this.drawCurve(x, y, r, rad1, rad2, 0, true)
			});
		} else {
			// draw plain inward pointing bow
			ctx.drawShape('path', 1, {
				d: this.drawCurve(x, y, r, rad1, rad2, 0)
			});
		}
	}

	drawCurve(x, y, r, rad1, rad2, offset, inverse = false, ctx = false) {
		// this really was just a lot of trial an error. i have just a slight idea whats happening here...
		let rad = [
			Math.PI * (rad1 + offset),
			Math.PI * (rad2 - offset)
		];
		let sect = Math.abs(rad1 - rad2);
		let curvature = Math.abs(1 - (sect - offset * 2));
		if (curvature > 1) curvature -= Math.floor(curvature);
		let c = {
			x1: x + Math.cos(rad[0]) * r,
			y1: y + Math.sin(rad[0]) * r,
			xs1: x + Math.cos(rad[0]) * r * curvature,
			ys1: y + Math.sin(rad[0]) * r * curvature,
			xs2: x + Math.cos(rad[1]) * r * curvature,
			ys2: y + Math.sin(rad[1]) * r * curvature,
			x2: x + Math.cos(rad[1]) * r,
			y2: y + Math.sin(rad[1]) * r
		};

		if (inverse) {
			// the prepared and passed parameters have the curve always pointing counterclockwise
			/*
			fhaɪ freɪ rfeɪ fsæ sfæ lneɪ nleɪ jmʌ mjʌ
			*/
			let sect = rad1 - rad2;
			if (rad1 < rad2) sect += 2;

			curvature = sect ** 2;
			rad = [
				Math.PI * (rad1 - .5 - sect / Math.PI ** 2),
				Math.PI * (rad2 + .5 + sect / Math.PI ** 2)
			];
			c.xs1 = c.x1 + Math.cos(rad[0]) * r * curvature;
			c.ys1 = c.y1 + Math.sin(rad[0]) * r * curvature;
			c.xs2 = c.x2 + Math.cos(rad[1]) * r * curvature;
			c.ys2 = c.y2 + Math.sin(rad[1]) * r * curvature;
		}

		if (ctx) { // deprecated debugger tool - curvature lines
			ctx.drawShape('circle', 1, {
				cx: c.x1,
				cy: c.y1,
				r: 15
			});
			ctx.drawShape('line', 1, {
				x1: c.x1,
				y1: c.y1,
				x2: c.xs1,
				y2: c.ys1
			});
			ctx.drawShape('line', 1, {
				x1: c.x2,
				y1: c.y2,
				x2: c.xs2,
				y2: c.ys2
			});
		}
		return "M " + c.x1 + " " + c.y1 + " C " + c.xs1 + " " + c.ys1 + ", " + c.xs2 + " " + c.ys2 + ", " + c.x2 + " " + c.y2;
	}

	chunkPoints() {
		// returns an 2d-array of connectorPoints in a row, descending length
		let sections = [
				[]
			],
			cp = this.connectorPoints;
		for (let i = 0; i < cp.length; i++) {
			if (cp[i] !== null) {
				sections[sections.length - 1].push(cp[i]);
			} else sections.push([]);
		}
		//add last section to first if both are connected, clear last one
		if (cp[0] !== null && cp[23] !== null) {
			sections[sections.length - 1].forEach(rad => {
				sections[0].push(rad);
			});
			sections[sections.length - 1].length = 0;
		}

		function sizesort(a, b) {
			if (a.length === b.length) return 0;
			else return (a.length < b.length) ? 1 : -1;
		}
		return sections.sort(sizesort);
	}

	delPoints(character) {
		// replaces valid radiants with null
		let consonant = cbConsonant.getBase(character),
			vowel = cbVowel.getBase(character),
			position,
			index;
		if (consonant) position = cbConsonant.base[consonant].rad(character);
		if (vowel) position = cbVowel.base[vowel].rad(character);
		if (position >= 2) position -= 2;
		index = this.connectorPoints.indexOf(parseFloat(position.toPrecision(5)));
		if (index > -1) {
			if (cbVowel.getBase(character) == "o") {
				let index2 = index + 12;
				if (index2 > 23) index2 -= 24;
				this.connectorPoints.splice(index, 1, null);
				this.connectorPoints.splice(index2, 1, null);
			} else {
				if (index > 0) this.connectorPoints.splice(index - 1, 3, null, null, null);
				else if (index == 0) {
					this.connectorPoints.splice(0, 2, null, null);
					this.connectorPoints[this.connectorPoints.length - 1] = null;
				}
			}
		}
	}
	showPoints(ctx, x, y, r) {
		//in theory this is a deprecated debugger tool once the module is up and running, but if you're interested you can just call this within the rendering of the syllables
		this.connectorPoints.forEach(rad => {
			if (rad !== null)
				ctx.drawShape('circle', 0, {
					cx: x + Math.cos(Math.PI * rad) * r,
					cy: y + Math.sin(Math.PI * rad) * r,
					r: r * .025
				});
		});
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