import {
	includes,
	dimensionObj as dimension
} from '../main.js'
import {
	consonant
} from './setup.js';
import {
	tkgBase,
	tkgDeco,
	tkgVowel
} from './glyphs.js'

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};

const base = new tkgBase();
const deco = new tkgDeco();
const vowel = new tkgVowel();

export function render(input, renderOptions, unsupportedCharacters, SVGRenderingContext) {
	option = renderOptions.get();
	// convert input-string to grouped array and determine number of groups
	let groupedInput = tkgGrouped.groups(input.toLowerCase());
	glyphs.num = 0; // reset for new input

	groupedInput.forEach(word => {
		word.forEach(groups => {
			groups.forEach(group => { // determine maximum expansion due to stacking and amount of groups
				let grouplength = Math.max(4, group.length);
				if (option.stack < 1 + grouplength) option.stack = 1 + grouplength;
				glyphs.num++;
			});
		});
		glyphs.num++;
	})
	// initialize widths, heights, default-values, draw-object
	glyphs.width = consonant * option.stack;
	glyphs.height = glyphs.width * 3;

	// set canvas scale according to number of groups times glyphs.width
	canvas["currentX"] = 0;
	canvas["currentY"] = glyphs.height * .4;
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	groupedInput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups
				// prepare resizing for stacked characters
				var stack = group.length;
				// reset offsets but hand over possible resizing factor
				tkgGrouped.resetOffset(stack, group.join(''));
				// iterate through characters within group
				for (var l = 0; l < group.length; l++) {
					// adjust offset properties according to former character/base
					if (l > 0) tkgGrouped.setOffset();
					// draw
					tkgDraw(ctx, group[l], tkgGrouped);
					if (!base.getBase(group[l]) && !vowel.getVowel(group[l])) unsupportedCharacters.add(group[l]);

					// text output for undefined characters as well for informational purpose
					if (tkgGrouped.offset == 0) ctx.drawText(tkgGrouped.currentGroupText, {
						x: canvas.currentX,
						y: canvas.currentY + glyphs.height * .5
					});
				}
			});
		});
		tkgGrouped.resetOffset();
		tkgDraw(ctx, " ", tkgGrouped);
	});

	// complain about undefined characters
	unsupportedCharacters.get();

	return ctx;
}

// set rules for grouping
let tkgGrouped = {
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
				// add double latin characters to group
				if (includes(["th", "ng"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (group.length > 0 && option.stacking) {
					// add to former group if not full
					if (includes("aeiou", group[group.length - 1][group[group.length - 1].length - 1]) && includes("aeoiu", current)) group[group.length - 1].push("א")
					group[group.length - 1].push(current)
				} else { // create current group
					if (includes("aeoiu", current)) group.push(["א", current]);
					else group.push([current]);
				}
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (stack, currentGroupText = '') {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.resize = 1 + stack; // consonant-resize-factor
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.currentGroupText = currentGroupText;
	},
	setOffset: function () {
		this.offset++;
		this.carriagereturn = true;
		this.resize -= 1;
	}
}

// draw instructions for base + decoration
function tkgDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, 1);
	}
	//define tilt based on stack-number to make the glyphs less monotonous
	let tilt = .25 - .0625 * (grouped.offset + 1);
	// draw base
	if (base.getBase(letter)) base.tkgtable[base.getBase(letter)].draw(ctx, canvas.currentX, canvas.currentY, consonant * grouped.resize, tilt);
	// draw decorators
	if (deco.getDeco(letter)) deco.tkgtable[deco.getDeco(letter)].draw(ctx, canvas.currentX, canvas.currentY, consonant * grouped.resize, consonant, tilt);
	// draw vowels
	if (vowel.getVowel(letter)) vowel.tkgtable[vowel.getVowel(letter)].draw(ctx, canvas.currentX, canvas.currentY, consonant * (grouped.resize + 1), consonant * (grouped.resize - 1), tilt);
}

/**Copyright 2020-2025 Mightyfrong, erroronline1, ModisR
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