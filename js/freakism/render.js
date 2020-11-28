import {
	UILanguage
} from '../utils/UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	freakismGlyphs
} from './freakismGlyphs.js';
import {
	character,
	linewidth
} from './setup.js';
import {
	includes
} from '../utils/funcs.js';

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
	x = y = 0;
	let glyph = {
		width: character.width,
		height: character.height * 2.2
	};

	// set canvas scale according to number of characters
	width = Math.min(input.length, Math.floor(window.innerWidth / glyph.width)) * glyph.width;
	height = glyph.height * Math.ceil(input.length / Math.floor(window.innerWidth / glyph.width));

	const ctx = new SVGRenderingContext(width, height);

	// iterate through input
	for (let i = 0; i <= input.length - 1; i++) {

		let current = input[i],
			currenttwo = input[i] + input[i + 1];
		// add double latin characters to group
		if (includes(["aʊ", "eɪ", "əʊ", "ɔɪ", "ɛə", "ɪə", "aɪ", "ʊə", "t͡ʃ", "d͡ʒ"], currenttwo)) {
			current = currenttwo;
			i++;
		}

		let type;
		if (current in freakismGlyphs.vowels) type = "vowels";
		if (current in freakismGlyphs.consonants) type = "consonants";

		if (type != undefined) {
			freakismDraw(ctx, x, y+glyph.height*.5, freakismGlyphs[type][current]);
			// display character
			ctx.drawText(current, {
				x: x + glyph.width * .5,
				y: y + glyph.height * .2
			});
		} else if (current !== undefined) warning += ", " + current;

		// position pointer for words
		if (x + glyph.width >= width) {
			y += glyph.height;
			x = 0;
		} else x += glyph.width;
	}

	// complain about unsupported characters
	if (warning) document.getElementById("output").innerHTML = UILanguage.write("processError") + warning.substr(2);
	else document.getElementById("output").innerHTML = "";

	return ctx;
}

function freakismDraw(ctx, x, y, glyph) {
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