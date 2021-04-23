import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	oddismGlyphs
} from './glyphs.js';
import {
	character,
	linewidth
} from './setup.js';
import {
	includes,
	dimensionObj
} from '../utils/funcs.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};
let dimension = new dimensionObj(); // utility to calculate word-circle- and canvas dimensions

// scroll through input and draw every letter
export function render(input, renderOptions, unsupportedCharacters) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// initialize widths, heights, default-values, draw-object
	glyphs.width = character.width;
	glyphs.height = character.height * 2.2;
	glyphs.num = input.length;

	// set canvas settings according to number of characters
	canvas["currentX"] = -glyphs.width;
	canvas["currentY"] = 0;
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;

	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// iterate through input
	for (let i = 0; i <= input.length - 1; i++) {
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, 0);

		let current = input[i],
			currenttwo = input[i] + input[i + 1];
		// add double latin characters to group
		if (includes(["aʊ", "eɪ", "əʊ", "ɔɪ", "ɛə", "ɪə", "aɪ", "ʊə", "oʊ", "ju", "tʃ", "dʒ"], currenttwo)) {
			current = currenttwo;
			i++;
		}

		let type;
		if (current in oddismGlyphs.vowels) type = "vowels";
		if (current in oddismGlyphs.consonants) type = "consonants";

		if (type != undefined) {
			oddismDraw(ctx, canvas.currentX, canvas.currentY + glyphs.height * .1, oddismGlyphs[type][current]);
		} else if (current !== undefined) unsupportedCharacters.add(current);
		// display character
		ctx.drawText(current, {
			x: canvas.currentX + glyphs.width * .5,
			y: canvas.currentY + glyphs.height * .8
		});
	}

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

function oddismDraw(ctx, x, y, glyph) {
	// this method assumes the provided paths have relative coordinates
	let path;
	const add = { // put x and y into usable scope, set correction value
		x: x,
		y: y,
		scale: character.width / 10 // manually determined and totally dependable of inkscape canvas
	};
	// find all coordinates and rescale
	path = glyph.path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/g, coords => {
		let c = coords.split(",");
		return (parseFloat(c[0]) * add.scale) + "," + (parseFloat(c[1]) * add.scale);
	});
	// alter first coordinate by current position
	path = path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/, coords => {
		let c = coords.split(",");
		return (parseFloat(c[0]) + add.x) + "," + (parseFloat(c[1]) + add.y);
	});
	ctx.drawShape('path', linewidth, {
		d: path
	});
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
