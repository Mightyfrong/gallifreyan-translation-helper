import {
	includes
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
import {
	unsupportedCharacters
} from '../event_callbacks.js';

let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let glyph; // glyph dimensions-object
let groupedInput; //global variable for input to be updated

export function render(input) {
	// convert input-string to grouped array and determine number of groups
	groupedInput = cbettenbacherGrouped.groups(input.toLowerCase());

	let glyphs = 0;
	glyphs = groupedInput.length;
	//kæt bɛt tɛn bɛn bɜr
	glyph = {
		width: glyphSize * 2.25,
		height: glyphSize * 3
	};
	width = (Math.min(glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width || glyph.width);
	height = glyph.height * (Math.ceil(glyphs / (Math.floor(window.innerWidth / glyph.width) || 1)));
	x = glyph.width * -.5;
	y = glyph.height * .5;
	const ctx = new SVGRenderingContext(width, height);

	// iterate through sentence and pass the whole syllable to the drawing instructions
	groupedInput.forEach(syllable => { // loop through sentence
		cbDraw(ctx, syllable);
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
function cbDraw(ctx, syllable) {
	if (x + glyph.width >= width) {
		y += glyph.height;
		x = glyph.width / 2;
	} else x += glyph.width;

	//syllable circle
	ctx.drawShape('circle', 1, {
		cx: x,
		cy: y,
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
			if (c == 0) context.startCon(ctx, x, y, glyphSize, character);
			// draw current character
			cbConsonant.base[consonant].draw(
				ctx, // svg-object
				x, // current x
				y, // current y
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
			) context.connectCon(ctx, x, y, glyphSize, syllable[c - 1], character, 'outwards');
			if ( // former but one is vowel
				syllable[c - 2] !== undefined && !cbConsonant.getBase(syllable[c - 2]) &&
				syllable[c - 1] !== undefined && cbConsonant.getBase(syllable[c - 1])
			) context.connectCon(ctx, x, y, glyphSize, syllable[c - 1], character, 'inwards');

		}
		// draw vowel
		if (vowel) {
			// mark vocal as starting character if applicable
			if (c == 0) context.startVow(ctx, x, y, glyphSize, character);
			// draw current character
			cbVowel.base[vowel].draw(
				ctx, // svg-object
				x, // current x
				y, // current y
				glyphSize, // syllable radius
				character, // current character
				(c > 0 && syllable.slice(0, c).join('').indexOf(character) > -1) // is current character repetitive?
			);
		}

	}

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	ctx.drawText(syllable.join(""), {
		x: x,
		y: y - glyph.height * .4
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