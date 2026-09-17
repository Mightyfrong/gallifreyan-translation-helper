import {
	includes,
	renderOptions
} from '../main.js';

//specify base for every letter, assign base to cyrillic characters and specify geometric properties
export class shermansBase {
	constructor(consonant, vowel) {
		this.consonant = consonant;
		this.vowel = vowel;
		this.scgtable = {
			punctuation: {
				contains: [".", "?", "!", "\"", "'", "-", ",", ";", ":"],
				centerYoffset: 0,
				radialPlacement: function (rad = 1.75) {
					return {
						x: -Math.cos(Math.PI * (rad - .25)),
						y: Math.sin(Math.PI * (rad - .25))
					};
				},
				draw: function (ctx, letter, x, y, r, rad) {
					return;
				}
			},
			number: {
				contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "\\"],
				centerYoffset: -consonant * 1.25,
				radialPlacement: function (rad = .25) {
					return {
						x: consonant * Math.cos(Math.PI * rad),
						y: -consonant * Math.sin(Math.PI * rad)
					}
				},
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			// Гласные в центре (ve): э, ы, у + полумесяцы е, и, ю
			ve: {
				contains: ["э", "ы", "у", "е", "и", "ю", "&"],
				centerYoffset: 0,
				radialPlacement: function (rad = .25) {
					return {
						x: vowel * Math.cos(Math.PI * rad),
						y: -vowel * Math.sin(Math.PI * rad)
					}
				},
				draw: function (ctx, x, y, r, rad = 0, group, letter) {
					if (includes(["е", "и", "ю"], letter)) {
						// Полумесяц
						// Полумесяц с поворотом
						const offsetX = -r * 2;
						const rotation = rad * Math.PI + Math.PI; // поворот на 180° + зависимость от положения

						// Поворачиваем координаты
						const cos = Math.cos(rotation);
						const sin = Math.sin(rotation);

						// Функция для поворота точки вокруг центра (x, y)
						function rotatePoint(px, py) {
							return {
								x: x + (px - x) * cos - (py - y) * sin,
								y: y + (px - x) * sin + (py - y) * cos
							};
						}

						// Вычисляем повёрнутые точки
						const startPoint = rotatePoint(x + offsetX + r * Math.cos(Math.PI * 0.1), y - r * Math.sin(Math.PI * 0.1));
						const endPoint = rotatePoint(x + offsetX + r * Math.cos(Math.PI * 1.9), y - r * Math.sin(Math.PI * 1.9));

						ctx.drawShape('path', group.linewidth, {
							d: `
								M ${startPoint.x} ${startPoint.y}
								A ${r} ${r} 0 1 1 ${endPoint.x} ${endPoint.y}
								A ${r * 0.6} ${r * 0.6} 0 1 0 ${startPoint.x} ${startPoint.y}
								Z
							`,
							fill: 'transparent'
						});
					} else {
						// Круг
						ctx.drawShape('circle', group.linewidth, {
							cx: x,
							cy: y,
							r: r
						});
					}
				}
			},
			// Гласные снаружи (va): а + полумесяц я
			va: {
				contains: ["а", "я"],
				centerYoffset: vowel * 1.75,
				radialPlacement: function (rad = .25) {
					return {
						x: vowel * Math.cos(Math.PI * rad),
						y: -vowel * Math.sin(Math.PI * rad)
					}
				},
				draw: function (ctx, x, y, r, rad = 0, group, letter) {
    
					if (letter === "я") {
						// Полумесяц
						// Полумесяц с поворотом
						const offsetX = -r * 2;
						const rotation = rad * Math.PI + Math.PI; // поворот на 180° + зависимость от положения

						// Поворачиваем координаты
						const cos = Math.cos(rotation);
						const sin = Math.sin(rotation);

						// Функция для поворота точки вокруг центра (x, y)
						function rotatePoint(px, py) {
							return {
								x: x + (px - x) * cos - (py - y) * sin,
								y: y + (px - x) * sin + (py - y) * cos
							};
						}

						// Вычисляем повёрнутые точки
						const startPoint = rotatePoint(x + offsetX + r * Math.cos(Math.PI * 0.1), y - r * Math.sin(Math.PI * 0.1));
						const endPoint = rotatePoint(x + offsetX + r * Math.cos(Math.PI * 1.9), y - r * Math.sin(Math.PI * 1.9));

						ctx.drawShape('path', group.linewidth, {
							d: `
								M ${startPoint.x} ${startPoint.y}
								A ${r} ${r} 0 1 1 ${endPoint.x} ${endPoint.y}
								A ${r * 0.6} ${r * 0.6} 0 1 0 ${startPoint.x} ${startPoint.y}
								Z
							`,
							fill: 'transparent'
						});
					} else {
						// Круг
						ctx.drawShape('circle', group.linewidth, {
							cx: x,
							cy: y,
							r: r
						});
					}
				}
			},
			// Гласные на линии (vo): о + полумесяц ё + палочки ь, ъ
			vo: {
				contains: ["о", "ё", "ь", "ъ"],
				centerYoffset: -vowel * 1.75,
				radialPlacement: function (rad = .25) {
					return {
						x: vowel * Math.cos(Math.PI * rad),
						y: -vowel * Math.sin(Math.PI * rad)
					}
				},
				draw: function (ctx, x, y, r, rad = 0, group, letter) {
					if (letter === "ь") {
						const angle = rad * Math.PI - Math.PI / 6; // поворот на 30° против часовой
						const cos = Math.cos(angle);
						const sin = Math.sin(angle);
						const len = r * 0.5;
						
						ctx.drawShape('line', group.linewidth, {
							x1: x - len * cos,
							y1: y - len * sin,
							x2: x + len * cos,
							y2: y + len * sin
						});
					} else if (letter === "ъ") {
						// Две палочки
						const angle = rad * Math.PI - Math.PI / 6;
						const cos = Math.cos(angle);
						const sin = Math.sin(angle);
						const offset = r * 0.3;
						const len = r * 0.5;
						
						ctx.drawShape('line', group.linewidth, {
							x1: x - len * cos,
							y1: y - len * sin,
							x2: x + len * cos,
							y2: y + len * sin
						});
						
						ctx.drawShape('line', group.linewidth, {
							x1: x + offset * sin - len * cos,
							y1: y - offset * cos - len * sin,
							x2: x + offset * sin + len * cos,
							y2: y - offset * cos + len * sin
						});
					} else if (letter === "ё") {
						// Полумесяц
						// Полумесяц с поворотом
						const offsetX = -r * 2;
						const rotation = rad * Math.PI + Math.PI; // поворот на 180° + зависимость от положения

						// Поворачиваем координаты
						const cos = Math.cos(rotation);
						const sin = Math.sin(rotation);

						// Функция для поворота точки вокруг центра (x, y)
						function rotatePoint(px, py) {
							return {
								x: x + (px - x) * cos - (py - y) * sin,
								y: y + (px - x) * sin + (py - y) * cos
							};
						}

						// Вычисляем повёрнутые точки
						const startPoint = rotatePoint(x + offsetX + r * Math.cos(Math.PI * 0.1), y - r * Math.sin(Math.PI * 0.1));
						const endPoint = rotatePoint(x + offsetX + r * Math.cos(Math.PI * 1.9), y - r * Math.sin(Math.PI * 1.9));

						ctx.drawShape('path', group.linewidth, {
							d: `
								M ${startPoint.x} ${startPoint.y}
								A ${r} ${r} 0 1 1 ${endPoint.x} ${endPoint.y}
								A ${r * 0.6} ${r * 0.6} 0 1 0 ${startPoint.x} ${startPoint.y}
								Z
							`,
							fill: 'transparent'
						});
					} else {
						// Круг
						ctx.drawShape('circle', group.linewidth, {
							cx: x,
							cy: y,
							r: r
						});
					}
				}
			},
			// Согласные группы
			b: {
				contains: ["й", "б", "п", "ж", "ш", "н"],
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('path', group.linewidth, {
						d: ctx.circularArc(x, y, r, (.65 + rad) * Math.PI, (.35 + rad) * Math.PI, "major"),
						clipPath: group.clip
					});
				}
			},
			j: {
				contains: ["г", "к", "л", "х", "щ"],
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			t: {
				contains: ["ф", "в", "з", "с", "р", "ц", "_"],
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('path', group.linewidth, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI, (2 + rad) * Math.PI, "minor"),
						clipPath: group.clip
					});
				}
			},
			th: {
				contains: ["д", "т", "м", "ч"],
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
				draw: function (ctx, x, y, r, rad = 0, group) {
					ctx.drawShape('circle', group.linewidth, {
						cx: x,
						cy: y,
						r: r
					});
				}
			}
		}
	}

	getBase(char) {
		let rtrn = false;
		Object.keys(this.scgtable).forEach(row => {
			if (includes(this.scgtable[row].contains, char)) rtrn = row;
		});
		return rtrn;
	}
}

// specify decoration for every letter
export class shermansDeco {
	constructor(base) {
		this.base = base;
		this.scgtable = {
			"null": {
				contains: ["й","_"],
			},
			".": {
				contains: ["."],
				radiants: [1.25],
				fromto: [1]
			},
			"?": {
				contains: ["?"],
				radiants: [1.175, 1.325],
				fromto: [.8]
			},
			"!": {
				contains: ["!"],
				radiants: [1.1, 1.25, 1.4],
				fromto: [.8]
			},
			"\"": {
				contains: ["\""],
				radiants: [1.25],
				fromto: [1, .5]
			},
			"'": {
				contains: ["'"],
				radiants: [1.175, 1.325],
				fromto: [1, .5]
			},
			"-": {
				contains: ["-"],
				radiants: [1.175, 1.25, 1.325],
				fromto: [1, .5]
			},
			",": {
				contains: [","],
				radiants: [1.25],
				fromto: [1]
			},
			";": {
				contains: [";"],
				radiants: [1.25],
				fromto: [.8]
			},
			":": {
				contains: [":"],
				radiants: [1.25],
				fromto: [1]
			},
			"&": {
				contains: ["&"],
				radiants: [1],
				fromto: [1.5,-1.5]
			},
			"number": {
				contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
			},
			// Декораторы для гласных с линией
			"il": {
				contains: ["ы", "и"],
				radiants: [1],
				fromto: [1, 3]
			},
			"ul": {
				contains: ["у", "ю"],
				radiants: [2],
				fromto: [1, 3]
			},
			// Декораторы для согласных
			"1l": {
				contains: ["п", "к", "т", "ф"],
				radiants: [.6],
				fromto: [1, 2]
			},
			"2l": {
				contains: ["ш", "х", "с", "ч"],
				radiants: [.85, .75],
				fromto: [1, 2]
			},
			"3l": {
				contains: ["щ", "ц"],
				radiants: [.9, .8, .7],
				fromto: [1, 2]
			},
			"1d": {
				contains: ["б", "г", "д", "в"],
				radiants: [.5],
				fromto: [1]
			},
			"2d": {
				contains: ["ж", "л", "з", "м"],
				radiants: [.55, .45],
				fromto: [1]
			},
			"3d": {
				contains: ["н", "р"],
				radiants: [.6, .5, .4],
				fromto: [1]
			},
		}
	}
	draw(ctx, deco, x, y, currentbase, baserad, group, letter) {
		baserad += .5;
		if (includes(["number"], deco)) {
			group.linewidth = 1;
			let number = parseInt(letter),
				rad = .95;
			for (let n = number; n > 0; n--) {
				if (n > 4) {
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize * .9,
						cy: y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize * .9,
						r: this.base.scgtable.number.radialPlacement(1.75).y * group.cresize * .15
					});
					n -= 4;
				} else ctx.drawShape('line', 1, {
					x1: x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize,
					y1: y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize,
					x2: x + this.base.scgtable.number.radialPlacement(rad).x * group.cresize * .8,
					y2: y + this.base.scgtable.number.radialPlacement(rad).y * group.cresize * .8
				});
				rad -= .15;
			}
		} else if (includes(["1d", "2d", "3d"], deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				ctx.drawShape('circle', 0, {
					cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * group.cresize,
					cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * group.cresize,
					r: this.base.vowel * .25
				});
			});
		} else if (includes(this.base.scgtable.punctuation.contains, deco)) {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				if (includes(["?", "!", ";"], deco)) {
					ctx.drawShape('circle', 0, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel * .5
					});
				} else if (includes(["\"", "'", "-"], deco)) {
					ctx.drawShape('line', 1, {
						x1: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						y1: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						x2: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * this.base.consonant * 2,
						y2: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * this.base.consonant * 2
					});
				} else if (includes(["."], deco)) {
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel
					});
				} else if (includes([","], deco)) {
					ctx.drawShape('circle', 0, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel
					});
				} else if (includes([":"], deco)) {
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel
					});
					ctx.drawShape('circle', 1, {
						cx: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * this.base.consonant * 2,
						cy: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * this.base.consonant * 2,
						r: this.base.vowel * .75
					});
				}
			});
		} else {
			this.scgtable[deco].radiants.forEach(rad => {
				let fromto = this.scgtable[deco].fromto;
				let resize = includes(["il", "ul"], deco) ? group.vresize : group.cresize;
				ctx.drawShape('line', group.linewidth, {
					x1: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[0] * resize,
					y1: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[0] * resize,
					x2: x + this.base.scgtable[currentbase].radialPlacement(rad - baserad).x * fromto[1] * resize,
					y2: y + this.base.scgtable[currentbase].radialPlacement(rad - baserad).y * fromto[1] * resize
				});
			});
		}
	}
	getDeco(char) {
		let rtrn = [];
		Object.keys(this.scgtable).forEach(row => {
			if (includes(this.scgtable[row].contains, char)) rtrn.push(row);
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
