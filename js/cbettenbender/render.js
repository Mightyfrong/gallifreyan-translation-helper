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

let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let glyph; // glyph dimensions-object
let groupedInput; //global variable for input to be updated

export function render(input) {
	// convert input-string to grouped array and determine number of groups
	groupedInput = cbettenbacherGrouped.groups(input.toLowerCase());

	console.log(groupedInput);

	let glyphs = 0;
	glyphs=groupedInput.length+1;

	glyph = {
		width: glyphSize * 2.25,
		height: glyphSize * 3
	};
	width = (Math.min(++glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
	height = glyph.height * (Math.ceil(++glyphs / (Math.floor(window.innerWidth / glyph.width) || 1)));
	x = glyph.width * -.5;
	y = glyph.height * .5;
	const ctx = new SVGRenderingContext(width, height);

	// iterate through sentence and pass the whole syllable to the drawing instructions
	groupedInput.forEach(syllable => { // loop through sentence
		cbDraw(ctx, syllable);
	});

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
				if (includes(["ch", "th", "sh","eɪ","aɪ","əʊ"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				sentence[sentence.length - 1].push(current); // append char to sentence
			}
		});
		return sentence;
	},
	resetOffset: function (currentGroup = []) {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.resize = 1
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.currentGroupText = currentGroup.join('');
		this.baserad = 1;
		this.group = currentGroup;
	},
	setOffset: function (baserad = 1) {
		this.offset++;
		this.resize = .4;
		this.carriagereturn = true;
		this.baserad = baserad;
	}

}

// draw instructions for base + decoration
function cbDraw(ctx, syllable) {
	if (x + glyph.width * 2 >= width) {
		y += glyph.height;
		x = glyph.width/2;
	} else x += glyph.width;

	//syllable circle
	ctx.drawShape('circle', 1, {
		cx: x,
		cy: y,
		r: glyphSize
	});
	//characters
	syllable.forEach(character=>{
		let consonant = cbConsonant.getBase(character),
			vowel = cbVowel.getBase(character);
		// draw consonant
		if (consonant) cbConsonant.base[consonant].draw(ctx, x, y, glyphSize, character);
		// draw vowel
//		if (vowel) cbVowel.base[vowel].draw(ctx, x, y, glyphSize, character);
	});

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	ctx.drawText(syllable.join(""), {
		x: x,
		y: y - glyph.height * .4
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