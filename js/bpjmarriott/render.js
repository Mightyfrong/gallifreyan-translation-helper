import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	bpjmGlyphs
} from './glyphs.js';
import {
	character,
	linewidth
} from './setup.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};

// scroll through input and draw every letter
export function render(input, renderOptions, unsupportedCharacters) {
	option = renderOptions.get();
	// initialize widths, heights, default-values, draw-object
	glyphs.width = character.width * 2;
	glyphs.height = character.height;
	let groupedInput = input.toLowerCase().split(/\s+/),
		maxWordsPerWidth = Math.floor(option.maxWidth / glyphs.width),
		wordHeight = 0,
		lineHeight = 0,
		charY = 0;

	// set canvas scale according to number of characters
	canvas["height"] = canvas["currentX"] = canvas["currentY"] = 0;
	canvas["width"] = Math.min(groupedInput.length, maxWordsPerWidth) * glyphs.width;
	for (let i = 0; i <= groupedInput.length - 1; i++) {
		wordHeight = groupedInput[i].length * glyphs.height; // height of current word
		if (lineHeight < wordHeight) lineHeight = wordHeight; // line height set to longest word
		if (i % maxWordsPerWidth == 0 || i == groupedInput.length - 1) { // canvas size added longest word, reset latter on "linebreak"
			if (groupedInput.length > maxWordsPerWidth) canvas.height += lineHeight + glyphs.height;
			else if (canvas.height < lineHeight) canvas.height = lineHeight + glyphs.height;
			lineHeight = 0;
		}
	}
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// iterate through input
	lineHeight = 0;
	for (let i = 0; i <= groupedInput.length - 1; i++) {
		for (let c = 0; c <= groupedInput[i].length; c++) {
			if (groupedInput[i][c] in bpjmGlyphs) {
				bpjmDraw(ctx, canvas.currentX, canvas.currentY + charY, bpjmGlyphs[groupedInput[i][c]]);
			} else if (groupedInput[i][c] !== undefined) unsupportedCharacters.add(groupedInput[i][c]);
			// display character
			if (groupedInput[i][c] !== undefined) ctx.drawText(groupedInput[i][c], {
				x: canvas.currentX + character.width * 1.2,
				y: canvas.currentY + charY + character.height * .6
			});
			charY += character.height;
		}
		charY = 0;
		// position pointer for words
		wordHeight = groupedInput[i].length * glyphs.height;
		if (lineHeight < wordHeight) lineHeight = wordHeight;

		if (canvas.currentX + glyphs.width >= canvas.width) {
			canvas.currentY += lineHeight + glyphs.height;
			lineHeight = 0;
			canvas.currentX = 0;
		} else canvas.currentX += glyphs.width;
	}

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

function bpjmDraw(ctx, x, y, glyph) {
	// this method assumes the provided paths have relative coordinates
	let path;
	const add = { // put x and y into usable scope, set correction value
		x: x,
		y: y,
		scale: character.width / 50 // manually determined and totally dependable of inkscape canvas
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
		d: path,
		fill: glyph.fill ? option.foregroundcolor : null
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
