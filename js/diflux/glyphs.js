import {
	includes
} from '../main.js';

//specify base for every letter, assign base to latin characters and specify geometric properties
export class difluxBase {
	constructor(consonant, decorator) {
		this.consonant = consonant;
		this.decorator = decorator;
		this.difluxtable = {
			none: {
				contains: [".", ",", "!", "?", ";", ":", "\u00b7"],
				contains_extended: [".", ",", "!", "?", ";", ":", "\u00b7"],
				contains_japanese: ["。", "、", "！", "？", "；", "："],
				centerYoffset: 0,
				radialPlacement: function (rad = .25) {
					return {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0) {

				}
			},
			disk: {
				contains: ["e", "s", "r", "b", "y", "k", "m", "z", "$", "¥", "€", ],
				contains_extended: ["e", "s", "r", "b", "y", "k", "m", "z", "$", "¥", "€"],
				contains_japanese: ["あ", "い", "う", "え", "お"],
				centerYoffset: 0,
				radialPlacement: function (rad = .25) {
					return {
						x: consonant * Math.cos(Math.PI * (.5 + rad)),
						y: -consonant * Math.sin(Math.PI * (.5 + rad))
					};
				},
				draw: function (ctx, x, y, r, rad = 0, current) {
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						mask: mask.url
					});
				}
			},
			omega: {
				contains: ["a", "n", "h", "c", "u", "w", "d", "v", "¢"],
				contains_extended: ["a", "n", "h", "c", "u", "w", "d", "v", "¢"],
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
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (.65 + rad + r * -1) * Math.PI, (.35 + rad - r * -1) * Math.PI, "major"),
						clipPath: current.clip,
						mask: mask.url
					});
				}
			},
			arc: {
				contains: ["i", "g", "t", "f", "o", "p", "l", "j", "£", "ø"],
				contains_extended: ["i", "g", "t", "f", "o", "p", "l", "j", "£", "ø"],
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
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI, (2 + rad) * Math.PI, "minor"),
						clipPath: current.clip,
						mask: mask.url
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
				draw: function (ctx, x, y, r, rad = 0, current) {
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						mask: mask.url
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
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (.65 + rad + r * -1) * Math.PI, (.35 + rad - r * -1) * Math.PI, "major"),
						clipPath: current.clip,
						mask: mask.url
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
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI, (2 + rad) * Math.PI, "minor"),
						clipPath: current.clip,
						mask: mask.url
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
				draw: function (ctx, x, y, r, rad = 0, current) {
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						mask: mask.url
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
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (.65 + rad + r * -1) * Math.PI, (.35 + rad - r * -1) * Math.PI, "major"),
						clipPath: current.clip,
						mask: mask.url
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
					let mask = false;
					if (current.decorators && current.decorators.includes("dc_base")) {
						mask = ctx.maskInit();
						ctx.maskPath(mask.id, 'circle', {
						cx: x + this.radialPlacement(-.3 - rad).x,
						cy: y + this.radialPlacement(-.3 - rad).y,
						r: decorator * 1.5
						});
					}
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, (1 + rad) * Math.PI, (2 + rad) * Math.PI, "minor"),
						clipPath: current.clip,
						mask: mask.url
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
		char = getDiacritic(char, true);
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
			"l": {
				contains: ["s", "n", "g", "b", "c", "f", "k", "w", "p", "z", "v", "j", "$", "¢", // basic
					"ß", "ŋ", "ƣ", "ss", "ch", "gh", "x", "ƿ", "ph", "#", "@", "&", // extended
					"え", "け", "せ", "て", "ね", "へ", "め", "れ", "お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を" // japanese
					
				],
				radiants: [.4],
				fromto: [1, 1.7],
				shapes: [["line"]]
			},
			"c": {
				contains: ["y", "u", "o", "k", "w", "p", "m", "d", "l", "z", "v", "j", "£", "¥", "ø", // basic
					"Ȝ", "wh", "œ", "x", "ƿ", "ph", "q", "ð", "ll", "#", "@", "&", // extended
					"い", "き", "し", "ち", "に", "ひ", "み", "り", "う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "ん", "え", "け", "せ", "て", "ね", "へ", "め", "れ", "お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を" // japanese
				],
				radiants: [.7],
				fromto: [.7],
				shapes: [["circle", 1]]
			},
			"d": {
				contains: ["r", "h", "t", "b", "c", "f", "m", "d", "l", "z", "v", "j", "£", "¢", // basic
					"ſ", "ʃ", "þ", "ss", "ch", "gh", "q", "ð", "ll", "#", "@", "&", // extended
					"あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", "ん", "お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を" // japanese
				],
				radiants: [.5],
				fromto: [.7],
				shapes: [["dot", .4]]
			},
			"u": {
				contains: [], // all uppercase letters, check in getDeco()
				radiants: [0],
				fromto: [0],
				shapes: [["circle", 1], ["dot", .4]]
			},
			"dc_base": {
				contains: ["\u0304", "\u0331", "\u0303", "\u0301", "\u0300", "\u030b", "\u030c", "\u0302", "\u0306", "\u030a", "\u0307", "\u0323", "\u0308", "\u00b7", "\u0327", "\u0328", "$", "£", "€", "¥", "¢", "ø"],
				radiants: [.2],
				fromto: [1],
				shapes: [["circle", 1.5]]
			},
			"dc_l": {
				contains: ["\u0304", "\u00b7", "$", "£", "€", "¥", "¢", "ø"],
				radiants: [.2],
				fromto: [.7, 1.3],
				shapes: [["line"]]
			},
			"dc_2l": {
				contains: ["\u0331",],
				radiants: [.22, .18],
				fromto: [.7, 1.3],
				shapes: [["line"]]
			},
			"dc_cl": {
				contains: ["\u0303",],
				radiants: [.29],
				fromto: [1],
				shapes: [["arc", 1.5, -.30, .37]]
			},
			"dc_elo": {
				contains: ["\u0301",],
				radiants: [.2],
				fromto: [.7, 1.7],
				shapes: [["line"]]
			},
			"dc_eli": {
				contains: ["\u0300",],
				radiants: [.2],
				fromto: [.3, 1.3],
				shapes: [["line"]]
			},
			"dc_2elo": {
				contains: ["\u030b",],
				radiants: [.22, .18],
				fromto: [.7, 1.7],
				shapes: [["line"]]
			},
			"dc_celu": {
				contains: ["\u0328",],
				radiants: [.42],
				fromto: [1],
				shapes: [["arc", 3.5, -.25, .25]]
			},
			"dc_celd": {
				contains: ["\u0327",],
				radiants: [-.02],
				fromto: [1],
				shapes: [["arc", 3.5, .75, 1.25]]
			},
			"dc_eeli": {
				contains: ["\u030c",],
				radiants: [.2],
				fromto: [.3, 1.5],
				shapes: [["line"]]
			},
			"dc_eelo": {
				contains: ["\u0302",],
				radiants: [.2],
				fromto: [.5, 1.7],
				shapes: [["line"]]
			},
			"dc_eelc": {
				contains: ["\u0306",],
				radiants: [.42],
				fromto: [1],
				shapes: [["arc", 3.5, -.25, .5]]
			},
			"dc_cd": {
				contains: ["\u00b7",],
				radiants: [.2],
				fromto: [1],
				shapes: [["dot", .4]]
			},
			"dc_id": {
				contains: ["\u0323", "\u0308", "£", "€", "¥", "¢", "ø"],
				radiants: [.2],
				fromto: [.7],
				shapes: [["dot", .4]]
			},
			"dc_od": {
				contains: ["\u030a", "\u0307", "\u0308", "$", "¢", "ø"],
				radiants: [.2],
				fromto: [1.3],
				shapes: [["dot", .4]]
			},
			"dc_eid": {
				contains: ["\u0300", "\u030c",],
				radiants: [.2],
				fromto: [.3],
				shapes: [["dot", .4]]
			},
			"dc_eod": {
				contains: ["\u0301", "\u0302",],
				radiants: [.2],
				fromto: [1.7],
				shapes: [["dot", .4]]
			},
			"dc_2eod": {
				contains: ["\u030b",],
				radiants: [.22, .18],
				fromto: [1.7],
				shapes: [["dot", .4]]
			},
			"dc_eeid": {
				contains: ["\u0302",],
				radiants: [.2],
				fromto: [.5],
				shapes: [["dot", .4]]
			},
			"dc_eeod": {
				contains: ["\u030c",],
				radiants: [.2],
				fromto: [1.5],
				shapes: [["dot", .4]]
			},
			"dc_eecid": {
				contains: ["\u0306",],
				radiants: [.34],
				fromto: [.3],
				shapes: [["dot", .4]]
			},
			"dc_eecod": {
				contains: ["\u0306",],
				radiants: [.32],
				fromto: [1.6],
				shapes: [["dot", .4]]
			},
			"dc_ecud": {
				contains: ["\u0328",],
				radiants: [.32],
				fromto: [1.6],
				shapes: [["dot", .4]]
			},
			"dc_ecdd": {
				contains: ["\u0327",],
				radiants: [.08],
				fromto: [1.6],
				shapes: [["dot", .4]]
			},
			"dc_oc": {
				contains: ["\u030a"],
				radiants: [.2],
				fromto: [1.6],
				shapes: [["circle", 1.5]]
			},
			
		}
	}
	draw(ctx, deco, x, y, currentbase, baserad) {
		baserad += .5;
		this.difluxtable[deco].radiants.forEach(rad => {
			let fromto = this.difluxtable[deco].fromto;
			this.difluxtable[deco].shapes.forEach(shape => {
				if (shape[0] == "circle") {
					ctx.drawShape('circle', 1, {
						cx: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
						cy: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
						r: this.base.decorator * shape[1]
					});
				} else if (shape[0] == "dot") {
					ctx.drawShape('circle', 0, {
						cx: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
						cy: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
						r: this.base.decorator * shape[1]
					});
				} else if (shape[0] == "line") {
					ctx.drawShape('line', 1, {
						x1: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0],
						y1: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0],
						x2: x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[1],
						y2: y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[1]
					});
				} else if (shape[0] == "arc") {
					let cx = x + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).x * fromto[0];
					let cy = y + this.base.difluxtable[currentbase].radialPlacement(rad - baserad).y * fromto[0];
					let r = this.base.decorator * shape[1];
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(cx, cy, r, (shape[2] - rad + baserad) * Math.PI, (shape[3] - rad + baserad) * Math.PI, "minor"),
					});
				}
			})		
		})
	}
	getDeco(char) { // return array of names of decorators the given character is assigned to
		let rtrn = [];
		if (isUpperCase(char)) rtrn.push("u");
		char = char.toLowerCase();
		let base = getDiacritic(char, true);
		let diacritic = getDiacritic(char);
		Object.keys(this.difluxtable).forEach(row => {
			if (includes(this.difluxtable[row].contains, base)) rtrn.push(row);
			if (includes(this.difluxtable[row].contains, diacritic)) rtrn.push(row);
		});
		return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
	}
}

function isUpperCase(str) {
    return str === str.toUpperCase() &&
           str !== str.toLowerCase();
}

function getDiacritic(char, base=false) {
	if (char.match(/(ss|SS|ch|CH|gh|GH|wh|WH|ph|PH|ll|LL)/g)) return base?char:"";
	let normal = char.normalize("NFD")
	if (normal.length > 1) {
		return normal[base?0:1];
	} else {
		return base?normal[0]:"";
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