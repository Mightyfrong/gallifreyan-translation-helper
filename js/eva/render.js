import {
	includes,
	dimensionObj as dimension
} from '../main.js';
import {
	character,
	lwfactor
} from './setup.js';
import {
	evaGlyphs
} from './glyphs.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};

// scroll through input and draw every letter
export function render(input, renderOptions, unsupportedCharacters, SVGRenderingContext) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// initialize widths, heights, default-values, draw-object
	let groupedInput = evaCharacterGrouping(input),
		charX, charY, dia = character;
	glyphs.num = 0;
	if (option.circular) {
		let longest = groupedInput.slice();
		dia = dimension.wordcircleRadius(longest.sort(sizesort)[0].length + 1, character) * 2.25;
		glyphs.width = dia + character;
		glyphs.height = dia + character;
		glyphs.num = groupedInput.length;
		canvas["currentX"] = -glyphs.width * .5;
		canvas["currentY"] = glyphs.width * .5;
	} else {
		glyphs.width = character * 2.25;
		glyphs.height = character * 4;
		groupedInput.forEach(group => {
			glyphs.num += group.length + 1;
		});
		canvas["currentX"] = -glyphs.width;
		canvas["currentY"] = glyphs.height * .4;
	}
	// set canvas scale according to number of characters
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// iterate through input
	groupedInput.forEach(word => {
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, (option.circular ? .5 : 1));

		if (option.circular) {
			// draw word circle
			dia = dimension.wordcircleRadius(word.length + 1, character);
			ctx.drawShape('circle', lwfactor * 2, {
				cx: canvas.currentX,
				cy: canvas.currentY,
				r: dia - character * .5 / ((word.length + 1) ** 1.15)
			});
		}
		let rad = .5;
		for (let i = 0; i < word.length; i++) {
			// define center for character
			if (option.circular) {
				rad = .5 - 2 / (word.length) * (i - 1);
				if (rad < 0) rad += 2;
				charX = canvas.currentX + Math.cos(Math.PI * rad) * dia * (1 - character / (dia - character * 1.6));
				charY = canvas.currentY + Math.sin(Math.PI * rad) * dia * (1 - character / (dia - character * 1.6));
			} else {
				if (canvas.currentX + glyphs.width >= canvas.width) {
					canvas.currentY += glyphs.height;
					canvas.currentX = glyphs.width;
				} else canvas.currentX += glyphs.width;
				charX = canvas.currentX;
				charY = canvas.currentY;
			}
			// draw character chunks
			if (word[i] in evaGlyphs.vowels) {
				evaDraw(ctx, charX, charY, evaGlyphs.vowels[word[i]]);
			} else if (word[i] in evaGlyphs.consonants) {
				evaDraw(ctx, charX, charY, evaGlyphs.consonants[word[i]]);
			} else unsupportedCharacters.add(word[i]);

			// display character
			ctx.drawText(word[i], {
				x: canvas.currentX - (dia + .5 * character) * Math.sin(Math.PI * (rad - .5)),
				y: canvas.currentY + (dia + .5 * character) * Math.cos(Math.PI * (rad - .5)) + option.fontsize * .25
			});

		}
	});

	// complain about undefined characters
	unsupportedCharacters.get();

	return ctx;
}

function evaCharacterGrouping(input) {
	input = input.trim().replace(/\s+/g, ' ').toLowerCase().split(/\s+/);; // trim and strip multiple whitespaces
	let output = [],
		i = 0;
	input.forEach(word => {
		word = word.trim();
		if (word.length) {
			output.push([]);
			for (i = 0; i < word.length; i++) {
				output[output.length - 1].push([]);
				let current = word[i],
					currenttwo = word[i] + word[i + 1];
				if (includes(['aɪ', 'aʊ', 'eɪ', 'oʊ', 'ɔɪ', 'ea', 'ɪa', 'ʊa', 'tʃ'], currenttwo)) {
					current = currenttwo;
					i++;
				}
				output[output.length - 1].push(current);
			}
		}
	});
	return output;
}

function sizesort(a, b) {
	if (a.length === b.length) return 0;
	else return (a.length < b.length) ? 1 : -1;
}

function evaDraw(ctx, x, y, glyph) {
	// this method assumes the provided paths have relative coordinates
	let path, fill = 'none';
	const add = { // put x and y into usable scope, set correction value
		x: x - character,
		y: y - character,
		scale: character / 15 // manually determined and totally dependable of inkscape canvas
	};
	glyph.forEach(p => { // loop through thick and slim paths
		// find all coordinates and rescale
		path = p.path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/g, coords => {
			let c = coords.split(",");
			return (parseFloat(c[0]) * add.scale) + "," + (parseFloat(c[1]) * add.scale);
		});
		// alter first coordinate by current position
		path = path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/, coords => {
			let c = coords.split(",");
			return (parseFloat(c[0]) + add.x) + "," + (parseFloat(c[1]) + add.y);
		});
		if (p.filled == 'foreground') fill = option.foregroundcolor;
		if (p.filled == 'background') fill = option.backgroundcolor;
		ctx.drawShape('path', 1 * lwfactor, {
			d: path,
			fill: fill
		});
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