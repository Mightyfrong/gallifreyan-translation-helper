import {
	UILanguage
} from '../utils/UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	bpjmGlyphs
} from './bpjmarriottGlyphs.js';
import {
	character,
	linewidth
} from './setup.js';

let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let warning = ""; // used if undefined characters are part of the input

// add module-specific language chunks
UILanguage.say.processError = {
	en: "The following characters could not be processed: ",
	de: "Die folgenden Zeichen konnten nicht verarbeitet werden: ",
	lt: "Nepavyko apdoroti šių simbolių: "
};

// scroll through input and draw every letter
export function render(input) {
	// initialize widths, heights, default-values, draw-object
	warning = "";
	height = x = y = 0;
	let groupedInput = input.toLowerCase().split(/\s+/),
		glyph = {
			width: character.width * 2,
			height: character.height
		},
		maxWordsPerWidth = Math.floor(window.innerWidth / glyph.width),
		wordHeight = 0,
		lineHeight = 0,
		charY = 0;

	// set canvas scale according to number of characters
	width = Math.min(groupedInput.length, maxWordsPerWidth) * glyph.width;
	for (let i = 0; i <= groupedInput.length - 1; i++) {
		wordHeight = groupedInput[i].length * glyph.height; // height of current word
		if (lineHeight < wordHeight) lineHeight = wordHeight; // line height set to longest word
		if (i % maxWordsPerWidth == 0 || i == groupedInput.length - 1) { // canvas size added longest word, reset latter on "linebreak"
			if (groupedInput.length > maxWordsPerWidth) height += lineHeight + glyph.height;
			else if (height<lineHeight)height = lineHeight+glyph.height;
			lineHeight = 0;
		}
	}
	const ctx = new SVGRenderingContext(width, height);

	// iterate through input
	lineHeight = 0;
	for (let i = 0; i <= groupedInput.length - 1; i++) {
		for (let c = 0; c <= groupedInput[i].length; c++) {
			if (groupedInput[i][c] in bpjmGlyphs) {
				bpjmDraw(ctx, x, y + charY, bpjmGlyphs[groupedInput[i][c]]);
				// display character
				ctx.drawText(groupedInput[i][c], {
					x: x + character.width * 1.2,
					y: y + charY + character.height * .6
				});
			} else if (groupedInput[i][c] !== undefined) warning += ", " + groupedInput[i][c];
			charY += character.height;
		}
		charY = 0;
		// position pointer for words
		wordHeight = groupedInput[i].length * glyph.height;
		if (lineHeight < wordHeight) lineHeight = wordHeight;

		if (x + glyph.width >= width) {
			y += lineHeight + glyph.height;
			lineHeight = 0;
			x = 0;
		} else x += glyph.width;
	}

	// complain about unsupported characters
	if (warning) document.getElementById("output").innerHTML = UILanguage.write("processError") + warning.substr(2);
	else document.getElementById("output").innerHTML = "";

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
		fill: glyph.fill ? document.getElementById("foregroundcolor").value : null
	});
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