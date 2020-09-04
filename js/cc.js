let consonant = 20; // radius of characters
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
import {
	color,
	draw
} from './utils.js'

//    _                                 _ ___ _         _   _
//   | |_ ___ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | .'|_ -| -_| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|__,|___|___| |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                         |_|
//specify base for every letter, assign base to latin characters and specify geometric properties
let ccBase = {
	cctable: {
		/* example: { // name of group
			contains: [...], // array of characters for which the handling and properties apply
			draw: function (x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
				draw.dot(x, y, r, color.background); // to overpaint lower layers
				draw.circle(x, y, r); // main circle
				draw.line(x, y, x + Math.cos(Math.PI * (1.25 + tilt)) * r, y + Math.sin(Math.PI * (1.25 + tilt)) * r); // orientated element
				draw.line(x, y, x + Math.cos(Math.PI * (.75 + tilt)) * r, y + Math.sin(Math.PI * (.75 + tilt)) * r); // orientated element
			}
		}*/
		c: {
			contains: ["a", "e", "i", "o", "u", "b", "c"],
			draw: function (x, y, r, tilt) {
				draw.dot(x, y, r, color.background);
				draw.circle(x, y, r);
				draw.circle(x, y, r * .95);
			}
		},
		l: {
			contains: ["d", "f", "g", "h", "j", "k", "l"],
			draw: function (x, y, r, tilt) {
				draw.dot(x, y, r, color.background);
				draw.circle(x, y, r);
				draw.line(x, y, x + Math.cos(Math.PI * (1.25 + tilt)) * r, y + Math.sin(Math.PI * (1.25 + tilt)) * r);
				draw.line(x, y, x + Math.cos(Math.PI * (.75 + tilt)) * r, y + Math.sin(Math.PI * (.75 + tilt)) * r);
			}
		},
		t: {
			contains: ["m", "n", "p", "q", "r", "s", "t"],
			draw: function (x, y, r, tilt) {
				draw.dot(x, y, r, color.background);
				draw.circle(x, y, r);
				draw.line(x, y, x + Math.cos(Math.PI * (1.25 + tilt)) * r, y + Math.sin(Math.PI * (1.25 + tilt)) * r);
				draw.line(x, y, x + Math.cos(Math.PI * (.75 + tilt)) * r, y + Math.sin(Math.PI * (.75 + tilt)) * r);
				draw.arc(x, y, r * .9, Math.PI * (1.25 + tilt), Math.PI * (.75 + tilt));
			}
		},
		ng: {
			contains: ["v", "w", "x", "y", "z", "th", "ng"],
			draw: function (x, y, r, tilt) {
				draw.dot(x, y, r, color.background);
				draw.circle(x, y, r);
				draw.circle(x, y, r * .9, 3);
			}
		},

	},
	getBase: function (char) { // return name of base the given character is assigned to
		let rtrn = false;
		Object.keys(this.cctable).forEach(row => {
			if (this.cctable[row].contains.Contains(char)) rtrn = row;
		});
		return rtrn;
	}
}

//      _                     _                             _ ___ _         _   _
//    _| |___ ___ ___ ___ ___| |_ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | -_|  _| . |  _| .'|  _| . |  _| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|___|___|___|_| |__,|_| |___|_|   |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                                             |_|
// specify decoration for every letter
let ccDeco = {
	cctable: {
		/* example: { // name of group
			contains: [...], // array of characters for which the handling and properties apply
			draw: function (x,y,r,tilt){ // position of items to be placed, radius and tilt of graphics
				draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1, color.background); // to overpaint lower layers
				draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1); // orientated element
			}
		}*/
		"dot": {
			contains: ["a", "d", "m", "v"],
			draw: function (x, y, r, tilt) {
				draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1);
			}
		},
		"circle": {
			contains: ["e", "f", "n", "w"],
			draw: function (x, y, r, tilt) {
				draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1, color.background);
				draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1);
			}
		},
		"doublecircle": {
			contains: ["i", "g", "p", "x"],
			draw: function (x, y, r, tilt) {
				draw.dot(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1, color.background);
				draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .1);
				draw.circle(x + Math.cos(Math.PI * (1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1 + tilt)) * r * .9, r * .06);
			}
		},
		"dotcircle": {
			contains: ["o", "h", "q", "y"],
			draw: function (x, y, r, tilt) {
				draw.dot(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1);
				draw.dot(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1, color.background);
				draw.circle(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1);
			}
		},
		"twodots": {
			contains: ["u", "j", "r", "z"],
			draw: function (x, y, r, tilt) {
				draw.dot(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1);
				draw.dot(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1);
			}
		},
		"twocircles": {
			contains: ["b", "k", "s", "th"],
			draw: function (x, y, r, tilt) {
				draw.dot(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1, color.background);
				draw.circle(x + Math.cos(Math.PI * (1.1 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.1 + tilt)) * r * .9, r * .1);
				draw.dot(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1, color.background);
				draw.circle(x + Math.cos(Math.PI * (.9 + tilt)) * r * .9, y + Math.sin(Math.PI * (.9 + tilt)) * r * .9, r * .1);
			}
		},
		"null": {
			contains: ["c", "l", "t", "ng"],
		},
	},
	getDeco: function (char) { // return name of decorator the given character is assigned to
		let rtrn = false;
		Object.keys(this.cctable).forEach(row => {
			if (this.cctable[row].contains.Contains(char)) rtrn = row;
		});
		return rtrn != "null" ? rtrn : false;
	}
}

//    _                   _     _   _
//   | |_ ___ ___ ___ ___| |___| |_|_|___ ___
//   |  _|  _| .'|   |_ -| | .'|  _| | . |   |
//   |_| |_| |__,|_|_|___|_|__,|_| |_|___|_|_|
// scroll through input and draw every letter
export function ccTranslate(ctx, input) {
	// convert input-string to grouped array and determine number of groups
	let groupedinput = ccGrouped.groups(input.toLowerCase()),
		maxstack = 1,
		lettergroups = 0;

	console.log(groupedinput);
	groupedinput.forEach(word => {
		word.forEach(groups => {
			groups.forEach(group => { // determine maximum expansion due to stacking and amount of groups
				if (maxstack < 1 + .6 * group.length) maxstack = 1 + .6 * group.length;
				lettergroups++;
			});
		});
		lettergroups++;
	})
	// initialize widths, heights, default-values, draw-object
	letterwidth = consonant * maxstack;
	letterheight = letterwidth * 3;
	// set canvas scale according to number of groups times letterwidth
	width = Math.min(lettergroups + 2, Math.floor(window.innerWidth / letterwidth)) * letterwidth - letterwidth;
	height = letterheight * Math.ceil(lettergroups / Math.floor(width / letterwidth));
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	x = 0;
	y = letterheight * .6;
	draw.init(ctx, 1);

	groupedinput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups 
				// prepare resizing for stacked characters
				var stack = group.length;
				// reset offsets but hand over possible resizing factor
				ccGrouped.resetOffset(stack);
				// iterate through characters within group
				for (var l = 0; l < group.length; l++) {
					// adjust offset properties according to former character/base
					if (l > 0) ccGrouped.setOffset();
					// draw
					ccDraw(ctx, group[l], ccGrouped);
				}
			});
		});
		ccGrouped.resetOffset();
		ccDraw(ctx, " ", ccGrouped);
	});
	let output = "";
	document.getElementById("output").innerHTML = output;
}

//                        _
//    ___ ___ ___ _ _ ___|_|___ ___
//   | . |  _| . | | | . | |   | . |
//   |_  |_| |___|___|  _|_|_|_|_  |
//   |___|           |_|       |___|
// set rules for grouping
let ccGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> words -> groups -> single letters
		let sentence = [];
		let splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			let group = [];
			let maxstack = document.getElementById("cc-stack").options[document.getElementById("cc-stack").selectedIndex].value;
			for (var i = 0; i < sword.length; i++) { // iterate through word 
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double latin characters to group
				if (["th", "ng"].Contains(currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (group.length > 0 && group[group.length - 1].length < maxstack) {
					// add to former group if not full
					group[group.length - 1].push(current)
				} else // create current group
					group.push([current]);
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (stack) {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.resize = 1 + .6 * stack; // consonant-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
	},
	setOffset: function () {
		this.offset++;
		this.carriagereturn = true;
		this.resize -= .6;
	}
}

//                    _ ___ _         _               _
//    ___ ___ ___ ___|_|  _|_|___   _| |___ ___ _ _ _|_|___ ___
//   |_ -| . | -_|  _| |  _| |  _| | . |  _| .'| | | | |   | . |
//   |___|  _|___|___|_|_| |_|___| |___|_| |__,|_____|_|_|_|_  |
//       |_|                                               |___|
// draw instructions for base + decoration
function ccDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (x + letterwidth >= width) {
			y += letterheight;
			x = letterwidth;
		} else x += letterwidth;
	}
	//define tilt based on stack-number to make the glyphs less monotonous
	let tilt = .25 - .0625 * (grouped.offset + 1);
	// draw base
	if (ccBase.getBase(letter)) ccBase.cctable[ccBase.getBase(letter)].draw(x, y, consonant * grouped.resize, tilt);
	// draw decorators
	if (ccDeco.getDeco(letter)) ccDeco.cctable[ccDeco.getDeco(letter)].draw(x, y, consonant * grouped.resize, tilt);

	// text output for undefined characters as well for informational purpose
	ctx.beginPath();
	// print character translation above the drawings
	ctx.fillText(letter, x + grouped.offset * 8, y - letterheight * .5);
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