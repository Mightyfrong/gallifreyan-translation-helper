import {
	includes
} from '../main.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class difluxBase {
	constructor(consonant, decorator) {
		this.consonant = consonant;
		this.decorator = decorator;
		this.difluxtable = {
			disk: {
				contains: ["e", "s", "r", "b", "y", "k", "m", "z"],
				contains_extended: ["e", "s", "r", "b", "y", "k", "m", "z"],
				contains_japanese: ["あ", "い", "う", "え", "お"],
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
			omega: {
				contains: ["a", "n", "h", "c", "u", "w", "d", "v"],
				contains_extended: ["a", "n", "h", "c", "u", "w", "d", "v"],
				contains_japanese: ["か", "き", "く", "け", "こ"],
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
			arc: {
				contains: ["i", "g", "t", "f", "o", "p", "l", "j"],
				contains_extended: ["i", "g", "t", "f", "o", "p", "l", "j"],
				contains_japanese: ["さ", "し", "す", "せ", "そ"],
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
			andisk: {
				contains: [],
				contains_extended: ["ə", "ß", "ſ", "ss", "Ȝ", "x", "q", "#"],  
				contains_japanese: ["ま", "み", "む", "め", "も"],
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
			anomega: {
				contains: [],
				contains_extended: ["æ", "ŋ", "ʃ", "ch", "wh", "ƿ", "ð", "@"],
				contains_japanese: ["や", "ゆ", "よ"],
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
			anarc: {
				contains: [],
				contains_extended: ["ı", "ƣ", "þ", "gh", "œ", "ph", "ll", "&"],
				contains_japanese: ["ら", "り", "る", "れ", "ろ"],
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
			apodisk: {
				contains: [],
				contains_extended: [],  
				contains_japanese: ["た", "ち", "つ", "て", "と"],
				centerYoffset: -consonant * 1.4,
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
			apoomega: {
				contains: [],
				contains_extended: [],
				contains_japanese: ["な", "に", "ぬ", "ね", "の"],
				centerYoffset: -consonant * 1.4,
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
					ctx.drawShape('circle', 0, {
						cx: x + this.radialPlacement(.85 - rad).x,
						cy: y + this.radialPlacement(.85 - rad).y,
						r: decorator * .4
					});
					ctx.drawShape('circle', 0, {
						cx: x + this.radialPlacement(-.85 - rad).x,
						cy: y + this.radialPlacement(-.85 - rad).y,
						r: decorator * .4
					});
				}
			},
			apoarc: {
				contains: [],
				contains_extended: [],
				contains_japanese: ["は", "ひ", "ふ", "へ", "ほ"],
				centerYoffset: -consonant * .7,
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
					ctx.drawShape('circle', 0, {
						cx: x + this.radialPlacement(.5 - rad).x,
						cy: y + this.radialPlacement(.5 - rad).y,
						r: decorator * .4
					});
					ctx.drawShape('circle', 0, {
						cx: x + this.radialPlacement(-.5 - rad).x,
						cy: y + this.radialPlacement(-.5 - rad).y,
						r: decorator * .4
					});
				}
			},
			antiomega: {
				contains: [],
				contains_extended: [],
				contains_japanese: ["わ", "を"],
				centerYoffset: consonant * .7,
				radialPlacement: function (rad = .25, item = "vo") {
					return {
						x: -consonant * Math.cos(Math.PI * (.5 + rad)),
						y: consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0, current) {
					// gaps in the word circle are made by masking within the calling draw function
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (-.3 + rad) * Math.PI, (1.3 + rad) * Math.PI, "major"),
						mask: current.invClip.url
					});
				}
			},
			antiarc: {
				contains: [],
				contains_extended: [],
				contains_japanese: ["ん"],
				centerYoffset: 0,
				radialPlacement: function (rad = .25) {
					return {
						x: -consonant * Math.cos(Math.PI * (.5 + rad)),
						y: consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0, current) {
					// gaps in the word circle are made by masking within the calling draw function
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (-.1 + rad) * Math.PI, (1.1 + rad) * Math.PI, "major"),
						mask: current.invClip.url
					});
				}
			}
		}
	}

	getBase(char, alphabet) { // return name of base the given character is assigned to
		let rtrn = false;
		char = char.toLowerCase();
		Object.keys(this.difluxtable).forEach(row => {
			if (alphabet == "basic" && includes(this.difluxtable[row].contains, char)) rtrn = row;
			if (alphabet == "extended" && includes(this.difluxtable[row].contains_extended, char)) rtrn = row;
			if (alphabet == "japanese" && includes(this.difluxtable[row].contains_japanese, char)) rtrn = row;
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
				contains: ["s", "n", "g", "b", "c", "f", "k", "w", "p", "z", "v", "j", // basic
					"ß", "ŋ", "ƣ", "ss", "ch", "gh", "x", "ƿ", "ph", "#", "@", "&", // extended
					"え", "け", "せ", "て", "ね", "へ", "め", "れ", "お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を" // japanese
					
				],
				radiants: [.4],
				fromto: [1, 1.7]
			},
			"c": {
				contains: ["y", "u", "o", "k", "w", "p", "m", "d", "l", "z", "v", "j", // basic
					"Ȝ", "wh", "œ", "x", "ƿ", "ph", "q", "ð", "ll", "#", "@", "&", // extended
					"い", "き", "し", "ち", "に", "ひ", "み", "り", "う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "ん", "え", "け", "せ", "て", "ね", "へ", "め", "れ", "お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を" // japanese
				],
				radiants: [.7],
				fromto: [.7]
			},
			"d": {
				contains: ["r", "h", "t", "b", "c", "f", "m", "d", "l", "z", "v", "j", // basic
					"ſ", "ʃ", "þ", "ss", "ch", "gh", "q", "ð", "ll", "#", "@", "&", // extended
					"あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "ん", "お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を" // japanese
				],
				radiants: [.5],
				fromto: [.7]
			},
			"u": {
				contains: [], // all uppercase letters, check in getDeco()
				radiants: [0],
				fromto: [0]
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
		} else if (includes(["u"], deco)) {
			this.difluxtable[deco].radiants.forEach(rad => {
				let fromto = this.difluxtable[deco].fromto;
				ctx.drawShape('circle', 1, {
					cx: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator
				});
				ctx.drawShape('circle', 0, {
					cx: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
					cy: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
					r: this.base.decorator * .4
				});
			});
		}
	}
	getDeco(char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		if (isUpperCase(char)) rtrn.push("u");
		char = char.toLowerCase();
		Object.keys(this.difluxtable).forEach(row => {
			if (includes(this.difluxtable[row].contains, char)) rtrn.push(row);
		});
		return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
	}
}

function isUpperCase(str) {
    return str === str.toUpperCase() &&
           str !== str.toLowerCase();
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