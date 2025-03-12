import {
	includes,
	dimensionObj as dimension
} from '../main.js'

let consonant = 30; // radius of consonants
let linewidth = 1; // thicker lines add a cute chubbyness

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};

//specify forms and positions
let characters = {
	form: {
		circle: function (ctx, x, y, size) {
			ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: size,
				fill: option.backgroundcolor
			});
		},
		doublecircle: function (ctx, x, y, size) {
			ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: size,
				fill: option.backgroundcolor
			});
			ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: size * .7
			});
		},
		divotcircle: function (ctx, x, y, size) {
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, size, Math.PI * 1.74, Math.PI * 1.4, "major"),
				fill: option.backgroundcolor
			});
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x + Math.cos(Math.PI * 1.575) * size, y + Math.sin(Math.PI * 1.575) * size, size * .5, Math.PI * .15, Math.PI * 1, "major")
			});
		},
		spiral: function (ctx, x, y, size) {
			ctx.clearShape('circle', {
				cx: x,
				cy: y,
				r: size
			});
			let flip = [0, .5];
			for (let r = 1; r > .2; r -= .2) {
				flip = [+!flip[0], flip[1] * 2];
				let offset = (size - size * r) / flip[1] + size * .1;
				ctx.drawShape('path', 1, {
					d: ctx.circularArc(x - offset * +!flip[0] - +!Math.round(r)*.5*+!flip[0], y, size * r, Math.PI * +!flip[0], Math.PI * flip[0])
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
				fill: option.backgroundcolor
			});
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, size * .6, Math.PI * 1.65, Math.PI * 2.65),
				fill: option.backgroundcolor
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
export function render(input, renderOptions, unsupportedCharacters, SVGRenderingContext) {
	option = renderOptions.get();
	// initialize widths, heights, default-values, draw-object
	input = input.toLowerCase();
	glyphs.width = consonant * 1.5;
	glyphs.height = consonant * 6;
	glyphs.num = input.length + 1;

	// set canvas scale according to number of characters
	canvas["currentX"] = -glyphs.width * .5;
	canvas["currentY"] = glyphs.height * .5;
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// draw baseline
	ctx.drawShape('line', linewidth, {
		x1: canvas.currentX,
		y1: canvas.currentY,
		x2: canvas.currentX + glyphs.width * 2,
		y2: canvas.currentY
	});
	// iterate through input
	for (let i = 0; i < input.length; i++) {
		// position pointer
		if (canvas.currentX + glyphs.width * 2 >= canvas.width) {
			canvas.currentY += glyphs.height;
			canvas.currentX = glyphs.width * .5;
		} else if (includes("aeiou", input[i])) canvas.currentX += glyphs.width * .5;
		else canvas.currentX += glyphs.width;

		if (input[i] in characters.characters) {
			// draw baseline for the next character to not interfere with the former one
			ctx.drawShape('line', linewidth, {
				x1: canvas.currentX + glyphs.width,
				y1: canvas.currentY,
				x2: canvas.currentX + glyphs.width * 2,
				y2: canvas.currentY
			});
			// draw character
			let directions = characters.characters[input[i]];
			let lw = directions.float > 0 ? linewidth : 0;
			characters.form[directions.form](ctx, canvas.currentX + consonant, canvas.currentY + consonant * directions.float + lw, consonant * directions.size);
		} else unsupportedCharacters.add(input[i]);

		// print character translation above the drawings
		ctx.drawText(input[i], {
			x: canvas.currentX + consonant,
			y: canvas.currentY + glyphs.height * .45
		});
	}

	// complain about undefined characters
	unsupportedCharacters.get();

	return ctx;
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
