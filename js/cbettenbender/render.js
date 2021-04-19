import {
	includes,
	dimensionObj
} from '../utils/funcs.js';
import {
	glyphSize,
	cbConsonant,
	cbVowel
} from './setup.js';
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	cbContext
} from './cbettenbendersGlyphs.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};
let dimension = new dimensionObj(); // utility to calculate word-circle- and canvas dimensions

export function render(input, renderOptions, unsupportedCharacters) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// convert input-string to grouped array and determine number of groups
	let groupedInput = cbettenbacherGrouped.groups(input.toLowerCase());

	glyphs.width = glyphSize * 2.25;
	glyphs.height = glyphSize * 3;
	glyphs.num = groupedInput.length;

	canvas["currentX"] = glyphs.width * -.5;
	canvas["currentY"] = glyphs.height * .4;
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// iterate through sentence and pass the whole syllable to the drawing instructions
	groupedInput.forEach(syllable => { // loop through sentence
		cbDraw(ctx, syllable, unsupportedCharacters);
	});

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

// set rules for grouping
let cbettenbacherGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> syllables -> single letters
		let sentence = [];
		let splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			for (var i = 0; i < sword.length; i++) { // iterate through word
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double characters to group
				if (includes(["ch", "th", "sh", "eɪ", "aɪ", "əʊ"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				sentence[sentence.length - 1].push(current); // append char to sentence
			}
		});
		return sentence;
	}
}

// draw instructions for base + decoration
function cbDraw(ctx, syllable, unsupportedCharacters) {

	// position pointer
	canvas = dimension.carriageReturn(canvas, glyphs, .5);

	//syllable circle
	ctx.drawShape('circle', 1, {
		cx: canvas.currentX,
		cy: canvas.currentY,
		r: glyphSize
	});

	let context = new cbContext();
	syllable.forEach(character => {
		if (cbConsonant.getBase(character) || cbVowel.getBase(character))
			context.delPoints(character);
		else
			unsupportedCharacters.add(character);
	});

	//characters
	for (let c = 0; c < syllable.length; c++) {
		let character = syllable[c];
		let consonant = cbConsonant.getBase(character),
			vowel = cbVowel.getBase(character);
		// draw consonant
		if (consonant) {
			// mark consonant as starting character if applicable
			if (c == 0) context.startCon(ctx, canvas.currentX, canvas.currentY, glyphSize, character);
			// draw current character
			cbConsonant.base[consonant].draw(
				ctx, // svg-object
				canvas.currentX, // current x
				canvas.currentY, // current y
				glyphSize, // syllable radius
				character, // current character
				(c > 0 && syllable.slice(0, c).join('').indexOf(character) > -1), // is current character repetitive?
				c == 0 // initial consonants are filled
			);
			// draw consontant connector
			// currently i am not sure if this works out regarding possible numbers of connected consonants within one syllable...
			if ( // last consonant before a vowel
				syllable[c - 1] !== undefined && cbConsonant.getBase(syllable[c - 1]) &&
				syllable[c + 1] !== undefined && !cbConsonant.getBase(syllable[c + 1])
			) context.connectCon(ctx, canvas.currentX, canvas.currentY, glyphSize, syllable[c - 1], character, 'outwards');
			if ( // former but one is vowel
				syllable[c - 2] !== undefined && !cbConsonant.getBase(syllable[c - 2]) &&
				syllable[c - 1] !== undefined && cbConsonant.getBase(syllable[c - 1])
			) context.connectCon(ctx, canvas.currentX, canvas.currentY, glyphSize, syllable[c - 1], character, 'inwards');

		}
		// draw vowel
		if (vowel) {
			// mark vocal as starting character if applicable
			if (c == 0) context.startVow(ctx, canvas.currentX, canvas.currentY, glyphSize, character);
			// draw current character
			cbVowel.base[vowel].draw(
				ctx, // svg-object
				canvas.currentX, // current x
				canvas.currentY, // current y
				glyphSize, // syllable radius
				character, // current character
				(c > 0 && syllable.slice(0, c).join('').indexOf(character) > -1) // is current character repetitive?
			);
		}

	}

	// text output for undefined characters as well for informational purpose
	ctx.drawText(syllable.join(""), {
		x: canvas.currentX,
		y: canvas.currentY + glyphs.height * .4
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
