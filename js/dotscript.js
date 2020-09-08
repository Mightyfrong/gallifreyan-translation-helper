let consonant = 30; // radius of consonants
let linewidth = 3; // thicker lines add a cute chubbyness
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
let warning = ""; // used if undefined characters are part of the input
import {
	color,
	draw
} from './utils.js'

//specify forms and positions
let characters = {
	form: {
		circle: function (x, y, size) {
			draw.dot(x, y, size, color.background);
			draw.circle(x, y, size);
		},
		doublecircle: function (x, y, size) {
			draw.dot(x, y, size, color.background);
			draw.circle(x, y, size);
			draw.circle(x, y, size * .7);
		},
		divotcircle: function (x, y, size) {
			draw.dot(x, y, size, color.background);
			draw.arc(x, y, size, Math.PI * 1.4, Math.PI * 1.74);
			draw.arc(x + Math.cos(Math.PI * 1.575) * size, y + Math.sin(Math.PI * 1.575) * size, size * .5, Math.PI * 1, Math.PI * .15);
		},
		spiral: function (x, y, size) {
			draw.dot(x, y, size, color.background);
			let flip = [0, 1, 1, .5];
			for (let r = 1; r > .2; r -= .2) {
				flip = [+!flip[0], +!flip[1], +!flip[2], flip[3] * 2];
				let offset = (size - size * r) / flip[3] + size * .1;
				draw.arc(x - offset * flip[2], y, size * r, Math.PI * flip[0], Math.PI * flip[1]);
			}
		},
		dot: function (x, y, size) {
			draw.dot(x, y, size);
		},
		z: function (x, y, size) {
			draw.dot(x, y, size, color.background);
			draw.arc(x, y, size, Math.PI * 1.65, Math.PI * .65);
			draw.line(x + Math.cos(Math.PI * 1.65) * size, y + Math.sin(Math.PI * 1.65) * size, x + Math.cos(Math.PI * .65) * size, y + Math.sin(Math.PI * .65) * size);
			draw.arc(x, y, size * .6, Math.PI * .65, Math.PI * 1.65);
		},
		space: function (x, y, size) {
			draw.dot(x , y , size*.25,color.background);
		}
	},
	characters: {
		a: {
			form: "circle",
			float: -2,
			size: .5
		},
		b: {
			form: "circle",
			float: -1.5,
			size: 1
		},
		c: {
			form: "doublecircle",
			float: -1.5,
			size: 1
		},
		d: {
			form: "divotcircle",
			float: -1.5,
			size: 1
		},
		e: {
			form: "doublecircle",
			float: -2,
			size: .5
		},
		f: {
			form: "spiral",
			float: -1.5,
			size: 1
		},
		g: {
			form: "dot",
			float: -1.5,
			size: 1
		},
		h: {
			form: "circle",
			float: -1,
			size: 1
		},
		i: {
			form: "divotcircle",
			float: -2,
			size: .5
		},
		j: {
			form: "doublecircle",
			float: -1,
			size: 1
		},
		k: {
			form: "divotcircle",
			float: -1,
			size: 1
		},
		l: {
			form: "spiral",
			float: -1,
			size: 1
		},
		m: {
			form: "dot",
			float: -1,
			size: 1
		},
		n: {
			form: "circle",
			float: 0,
			size: 1
		},
		o: {
			form: "spiral",
			float: -2,
			size: .5
		},
		p: {
			form: "doublecircle",
			float: 0,
			size: 1
		},
		q: {
			form: "divotcircle",
			float: 0,
			size: 1
		},
		r: {
			form: "spiral",
			float: 0,
			size: 1
		},
		s: {
			form: "dot",
			float: 0,
			size: 1
		},
		t: {
			form: "circle",
			float: 1,
			size: 1
		},
		u: {
			form: "dot",
			float: -2,
			size: .5
		},
		v: {
			form: "doublecircle",
			float: 1,
			size: 1
		},
		w: {
			form: "divotcircle",
			float: 1,
			size: 1
		},
		x: {
			form: "spiral",
			float: 1,
			size: 1
		},
		y: {
			form: "dot",
			float: 1,
			size: 1
		},
		z: {
			form: "z",
			float: 0,
			size: 1
		},
		" ": {
			form: "space",
			float: 0,
			size: 1
		}
	}
}


//    _                   _     _   _
//   | |_ ___ ___ ___ ___| |___| |_|_|___ ___
//   |  _|  _| .'|   |_ -| | .'|  _| | . |   |
//   |_| |_| |__,|_|_|___|_|__,|_| |_|___|_|_|
// scroll through input and draw every letter
export function dotscriptTranslate(ctx, input) {
	// initialize widths, heights, default-values, draw-object
	letterwidth = consonant * 1.5
	letterheight = consonant * 6

	x = -letterwidth * .5;
	y = letterheight * .6;
	draw.init(ctx, linewidth);

	// set canvas scale according to number of characters
	width = Math.min(input.length + 1, Math.floor(window.innerWidth / letterwidth)) * letterwidth - letterwidth;
	height = letterheight * Math.ceil((input.length - 1) / Math.floor(window.innerWidth / letterwidth));
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	// draw baseline
	draw.line(x, y, x + letterwidth * 2, y, linewidth);
	// iterate through input
	for (let i = 0; i < input.length; i++) {
		// position pointer
		if (x + letterwidth * 2 >= width) {
			y += letterheight;
			x = letterwidth * .5;
		} else if ("aeiou".Contains(input[i])) x += letterwidth * .5;
		else x += letterwidth;


		if (input[i] in characters.characters) {
			// draw baseline for the next character to not interfere with the former one
			draw.line(x + letterwidth, y, x + letterwidth * 2, y, linewidth);
			// draw character
			let directions = characters.characters[input[i]];
			let lw = directions.float > 0 ? linewidth : 0;
			characters.form[directions.form](x + consonant, y + consonant * directions.float + lw, consonant * directions.size);
		} else warning += ", " + input[i];

		ctx.beginPath();
		// print character translation above the drawings
		ctx.fillText(input[i], x + consonant, y - letterheight * .5);
	
	}

	// complain about undefined characters
	if (warning) document.getElementById("output").innerHTML = "The following characters could not be processed: " + warning.substr(2);
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