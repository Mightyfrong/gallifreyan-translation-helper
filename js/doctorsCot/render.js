import {
	includes,
	dimensionObj as dimension
} from '../main.js';
import {
	glyphSize,
	dc2Consonants,
	dc2Vowels
} from './setup.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};

export function render(input, renderOptions, unsupportedCharacters, SVGRenderingContext) {
	option = renderOptions.get();
	// convert input-string to grouped array and determine number of groups
	let groupedInput = doctorsCotGrouped.groups(input.toLowerCase());

	glyphs.num = 0; // reset for new input
	groupedInput.forEach(word => {
		word.forEach(groups => {
			glyphs.num += groups.length;
		});
		glyphs.num++;
	})

	glyphs.width = glyphSize * 2.25;
	glyphs.height = glyphSize * 4;
	canvas["currentX"] = 0;
	canvas["currentY"] = glyphs.height * .4;
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedInput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups
				doctorsCotGrouped.resetOffset(group);
				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					if (!(dc2Consonants.getBase(group[l]) || dc2Vowels.getShape(group[l])))
						unsupportedCharacters.add(group[l]);

					doctorsCotDraw(ctx, group[l], doctorsCotGrouped);
					if (dc2Consonants.getBase(group[l]))
						doctorsCotGrouped.setOffset(dc2Consonants.base[dc2Consonants.getBase(group[l])].baserad);
				}
			});
		});
		doctorsCotGrouped.resetOffset();
		doctorsCotDraw(ctx, " ", doctorsCotGrouped);
	});

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

// set rules for grouping
let doctorsCotGrouped = {
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
				if (group.length > 0 &&
					(( /* C-C, C-V */ group[group.length - 1].length < 2 && dc2Consonants.getBase(group[group.length - 1][group[group.length - 1].length - 1])) ||
						( /* C-C-V */ group[group.length - 1].length < 3 && dc2Vowels.getLines(current) && dc2Consonants.getBase(group[group.length - 1][group[group.length - 1].length - 1]))) &&
					/* no punctuation */
					!includes(["'", ",", "?", "!", "."], [current, group[group.length - 1][group[group.length - 1].length - 1]])) {
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
function doctorsCotDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, 1);
	}

	//define tilt based on stack-number todistinguish between stacked characters
	let tilt = .25 - (grouped.offset + 1) * .1; //.0625;

	let currentbase = dc2Consonants.getBase(letter),
		currentdeco = dc2Consonants.getDeco(letter),
		currentlines = dc2Vowels.getLines(letter),
		currentshape = dc2Vowels.getShape(letter);
	if (!grouped.offset) {
		// draw outer circle
		if (currentbase) dc2Consonants.base[currentbase].draw(ctx, canvas.currentX, canvas.currentY, glyphSize * grouped.resize, tilt);
		// draw decorators
		if (currentdeco) dc2Consonants.decorators[currentdeco].draw(ctx, canvas.currentX, canvas.currentY, glyphSize * dc2Consonants.base[currentbase].baserad, dc2Consonants.base[currentbase].innerline, tilt);

		//draw inner circle if next character in group is not a consonant (or it's a single letter)
		if (currentbase && !dc2Consonants.getBase(grouped.group[grouped.offset + 1]))
			dc2Consonants.base[currentbase].draw(ctx, canvas.currentX, canvas.currentY, glyphSize * .4, tilt);

	} else {
		// draw decorators
		if (currentdeco) dc2Consonants.decorators[currentdeco].draw(ctx, canvas.currentX, canvas.currentY, glyphSize * grouped.baserad, dc2Consonants.base[currentbase].outerline, tilt);
		// draw filled inner circle to simply overpaint decorators
		if (currentbase) dc2Consonants.base[currentbase].draw(ctx, canvas.currentX, canvas.currentY, glyphSize * grouped.resize, tilt);

		//might as well be a vowel
		if (currentlines) dc2Vowels.shape[currentshape].draw(ctx, canvas.currentX, canvas.currentY, glyphSize, dc2Vowels.lines[currentlines], grouped.group[0]);

	}

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	if (grouped.offset == 0) ctx.drawText(grouped.currentGroupText, {
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
