import {
	includes
} from '../utils/funcs.js';
import {
	glyphSize,
	cwConsonants,
	cwVowels
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
	groupedInput = clockworkGrouped.groups(input.toLowerCase());

	let glyphs = 0;
	groupedInput.forEach(word => {
		word.forEach(groups => {
			glyphs += groups.length;
		});
		glyphs++;
	})

	glyph = {
		width: glyphSize * 2.25,
		height: glyphSize * 4
	};
	width = (Math.min(++glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
	height = glyph.height * (Math.ceil(++glyphs / (Math.floor(window.innerWidth / glyph.width) || 1)));
	x = -glyph.width*.5;
	y = glyph.height * .5;
	const ctx = new SVGRenderingContext(width, height);

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedInput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups 
				clockworkGrouped.resetOffset(group);
				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					clockworkDraw(ctx, group[l], clockworkGrouped);
					if (cwConsonants.getBase(group[l]))
						clockworkGrouped.setOffset(cwConsonants.base[cwConsonants.getBase(group[l])].baserad);
				}
			});
		});
		clockworkGrouped.resetOffset();
		clockworkDraw(ctx, " ", clockworkGrouped);
	});
	return ctx;
}

// set rules for grouping
let clockworkGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> words -> groups -> single letters
		let sentence = [];
		let splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			let group = [];
			for (var i = 0; i < sword.length; i++) { // iterate through word 
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double characters to group
				if (includes(["ts", "st", "ks", "ou", "ai"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				// C, V, C-C, C-V, C-C-V, not C-V-C
				if (group.length > 0 
					&& ((/* C-C, C-V */ group[group.length - 1].length < 2 && cwConsonants.getBase(group[group.length - 1][group[group.length - 1].length-1]))
					|| (/* C-C-V */ group[group.length - 1].length < 3 &&  cwVowels.getLines(current) && cwConsonants.getBase(group[group.length - 1][group[group.length - 1].length-1])))
					&& /* no punctuation */ !includes(["'", ",", "?", "!", "."], [current, group[group.length - 1][group[group.length - 1].length-1]])) {
					// add to former group if not full
					group[group.length - 1].push(current)
				} else // create current group
					group.push([current]);
			}
			sentence[sentence.length - 1].push(group); // append group to last word
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
function clockworkDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (x + glyph.width >= width) {
			y += glyph.height;
			x = glyph.width*.5;
		} else x += glyph.width;
	}

	//define tilt based on stack-number todistinguish between stacked characters
	let tilt = .25 - (grouped.offset + 1) * .1; //.0625;

	let currentbase = cwConsonants.getBase(letter),
		currentdeco = cwConsonants.getDeco(letter),
		currentlines = cwVowels.getLines(letter),
		currentshape = cwVowels.getShape(letter);
	if (!grouped.offset) {
		// draw outer circle
		if (currentbase) cwConsonants.base[currentbase].draw(ctx, x, y, glyphSize * grouped.resize, tilt);
		// draw decorators
		if (currentdeco) cwConsonants.decorators[currentdeco].draw(ctx, x, y, glyphSize * cwConsonants.base[currentbase].baserad, cwConsonants.base[currentbase].innerline, tilt);

		//draw inner circle if next character in group is not a consonant (or it's a single letter)
		if (currentbase && !cwConsonants.getBase(grouped.group[grouped.offset + 1]))
			cwConsonants.base[currentbase].draw(ctx, x, y, glyphSize * .4, tilt);

	} else {
		// draw decorators
		if (currentdeco) cwConsonants.decorators[currentdeco].draw(ctx, x, y, glyphSize * grouped.baserad, cwConsonants.base[currentbase].outerline, tilt);
		// draw filled inner circle to simply overpaint decorators
		if (currentbase) cwConsonants.base[currentbase].draw(ctx, x, y, glyphSize * grouped.resize, tilt);

		//might as well be a vowel
		if (currentlines) cwVowels.shape[currentshape].draw(ctx, x, y, glyphSize, cwVowels.lines[currentlines], grouped.group[0]);

	}

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	if (grouped.offset == 0) ctx.drawText(grouped.currentGroupText, {
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