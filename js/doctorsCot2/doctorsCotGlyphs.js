import {
	includes,
} from '../utils/funcs.js';


export class cotConsonants {
	constructor() {
		this.base = {
			j:{
				contains:["j", "ts", "ŋ", "v", "ʤ", "f", "ʒ", "ɢ", "ç", "ɬ", "ʎ"],
				draw: function (ctx, x, y, r){
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: document.getElementById('backgroundcolor').value
					});
				}
			},
			n:{
				contains:["n", "h", "l", "p", "w", "ʧ", "st", "ɴ", "ð", "ɮ", "ß"],
				draw: function (ctx, x, y, r){
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: document.getElementById('backgroundcolor').value
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r*.85
					});
				}
			},
			t:{
				contains:["t", "s", "ɹ", "d", "m", "ʃ", "θ", "q", "ʝ", "ʋ", "x"],
				draw: function (ctx, x, y, r){
					ctx.drawShape('circle', 2.5, {
						cx: x,
						cy: y,
						r: r,
						fill: document.getElementById('backgroundcolor').value
					});
				}
			},
			ks:{
				contains:["ks", "k", "z", "b", "א", "g", "r", "ɻ", "ɣ", "ɰ"],
				draw: function (ctx, x, y, r){
					ctx.drawShape('circle', 2.5, {
						cx: x,
						cy: y,
						r: r,
						fill: document.getElementById('backgroundcolor').value
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r*.85
					});
				}
			},
			χ:{
				contains:["χ", "ɲ", "ɳ", "ʈ", "ɖ", "c", "ɟ", "ħ", "ɭ", "ɸ"],
				draw: function (ctx, x, y, r){
					ctx.drawShape('circle', 2.5, {
						cx: x,
						cy: y,
						r: r,
						fill: document.getElementById('backgroundcolor').value
					});
					ctx.drawShape('circle', 2.5, {
						cx: x,
						cy: y,
						r: r*.85
					});
				}
			},
			ʁ:{
				contains:["ʁ", "ʙ", "ʀ", "ⱱ", "ɾ", "ɽ", "ʂ", "ʐ", "ɦ", "ʟ"],
				draw: function (ctx, x, y, r){
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: document.getElementById('backgroundcolor').value
					});
					ctx.drawShape('circle', 2.5, {
						cx: x,
						cy: y,
						r: r*.85
					});
				}
			}
		},
		this.decorators = {
			j:{
				contains:["j", "n", "t", "ks", "χ", "ʁ"],
				draw: function (ctx, x, y, r){

				}
			},
			ts:{
				contains:["ts", "h", "s", "k", "ɲ", "ʙ"],
				draw: function (ctx, x, y, r){

				}
			},
			ŋ:{
				contains:["ŋ", "l", "ɹ", "z", "ɳ", "ʀ" ],
				draw: function (ctx, x, y, r){

				}
			},
			v:{
				contains:["v", "p", "d", "b", "ʈ", "ⱱ" ],
				draw: function (ctx, x, y, r){

				}
			},
			ʤ:{
				contains:["ʤ", "w", "m", "א", "ɖ", "ɾ" ],
				draw: function (ctx, x, y, r){

				}
			},
			f:{
				contains:["f", "ʧ", "ʃ", "g", "c", "ɽ" ],
				draw: function (ctx, x, y, r){

				}
			},
			ʒ:{
				contains:["ʒ", "st", "θ", "r", "ɟ", "ʂ" ],
				draw: function (ctx, x, y, r){

				}
			},
			ɢ:{
				contains:["ɢ", "ɴ", "q", "ɻ", "ħ", "ʐ" ],
				draw: function (ctx, x, y, r){

				}
			},
			ç:{
				contains:["ç", "ð", "ʝ", "ɣ", "ɭ", "fi" ],
				draw: function (ctx, x, y, r){

				}
			},
			ɬ:{
				contains:["ɬ", "ɮ", "ʋ", "ɰ", "ɸ", "ʟ" ],
				draw: function (ctx, x, y, r){

				}
			},
			ʎ:{
				contains:["ʎ", "ß", "x" ],
				draw: function (ctx, x, y, r){

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