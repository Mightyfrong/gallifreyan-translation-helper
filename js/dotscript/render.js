import {
	includes
} from '../utils/funcs.js'
import {
	UILanguage
} from '../utils/UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';

let consonant = 30; // radius of consonants
let linewidth = 1; // thicker lines add a cute chubbyness
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
let warning = ""; // used if undefined characters are part of the input

// add module-specific language chunks
UILanguage.say.processError = {
	en: "The following characters could not be processed: ",
	de: "Die folgenden Zeichen konnten nicht verarbeitet werden: ",
	lt: "Nepavyko apdoroti šių simbolių: "
};

//specify forms and positions
let characters = {
	form: {
		circle: function (ctx, x, y, size) {
			ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: size,
				fill: document.getElementById('backgroundcolor').value
			});
		},
		doublecircle: function (ctx, x, y, size) {
			ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: size,
				fill: document.getElementById('backgroundcolor').value
			});
			ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: size * .7
			});
		},
		divotcircle: function (ctx, x, y, size) {
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, size, Math.PI * 1.74, Math.PI * 1.4,"major"),
				fill: document.getElementById('backgroundcolor').value
			});
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x + Math.cos(Math.PI * 1.575) * size, y + Math.sin(Math.PI * 1.575) * size, size * .5, Math.PI * .15, Math.PI * 1,"major")
			});
		},
		spiral: function (ctx, x, y, size) {
			ctx.clearShape('circle', {
				cx: x,
				cy: y,
				r: size
			});
			let flip = [0, 1, 1, .5];
			for (let r = 1; r > .2; r -= .2) {
				flip = [+!flip[0], +!flip[1], +!flip[2], flip[3] * 2];
				let offset = (size - size * r) / flip[3] + size * .1;
				ctx.drawShape('path', 1, {
					d: ctx.circularArc(x - offset * flip[2], y, size * r, Math.PI * flip[1], Math.PI * flip[0])
				});
			}
		},
		dot: function (ctx, x, y, size) {
			ctx.drawShape('circle', 0, {
				cx: x,
				cy: y,
				r: size
			});
		},
		z: function (ctx, x, y, size) {
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, size, Math.PI * .65, Math.PI * 1.65),
				fill: document.getElementById('backgroundcolor').value
			});
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, size * .6, Math.PI * 1.65, Math.PI * 2.65),
				fill: document.getElementById('backgroundcolor').value
			});
			ctx.drawShape('line', 1, {
				x1: x + Math.cos(Math.PI * 1.65) * size,
				y1: y + Math.sin(Math.PI * 1.65) * size,
				x2: x + Math.cos(Math.PI * .65) * size,
				y2: y + Math.sin(Math.PI * .65) * size
			});
		},
		space: function (ctx, x, y, size) {
			ctx.clearShape('circle', {
				cx: x,
				cy: y,
				r: size * .25
			});
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

// scroll through input and draw every letter
export function render(input) {
	// initialize widths, heights, default-values, draw-object
	warning = "";
	input = input.toLowerCase();
	letterwidth = consonant * 1.5;
	letterheight = consonant * 6;

	x = -letterwidth * .5;
	y = letterheight * .6;

	// set canvas scale according to number of characters
	width = Math.min(input.length + 1, Math.floor(window.innerWidth / letterwidth)) * letterwidth;
	height = letterheight * Math.ceil(input.length / Math.floor(window.innerWidth / letterwidth));
	const ctx = new SVGRenderingContext(width, height);

	// draw baseline
	ctx.drawShape('line', linewidth, {
		x1: x,
		y1: y,
		x2: x + letterwidth * 2,
		y2: y
	});
	// iterate through input
	for (let i = 0; i < input.length; i++) {
		// position pointer
		if (x + letterwidth * 2 >= width) {
			y += letterheight;
			x = letterwidth * .5;
		} else if (includes("aeiou", input[i])) x += letterwidth * .5;
		else x += letterwidth;

		if (input[i] in characters.characters) {
			// draw baseline for the next character to not interfere with the former one
			ctx.drawShape('line', linewidth, {
				x1: x + letterwidth,
				y1: y,
				x2: x + letterwidth * 2,
				y2: y
			});
			// draw character
			let directions = characters.characters[input[i]];
			let lw = directions.float > 0 ? linewidth : 0;
			characters.form[directions.form](ctx, x + consonant, y + consonant * directions.float + lw, consonant * directions.size);
		} else warning += ", " + input[i];

		// print character translation above the drawings
		ctx.drawText(input[i], {
			x: x + consonant,
			y: y - letterheight * .5
		});

	}

	// complain about undefined characters
	if (warning) document.getElementById("output").innerHTML = UILanguage.write("processError") + warning.substr(2);
	else document.getElementById("output").innerHTML = "";

	return ctx;
}


/**Copyright 2020-2021 Mightyfrong, erroronline1, ModisR
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