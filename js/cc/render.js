import {
	includes
} from '../utils/funcs.js'
import {
	ccBase,
	ccDeco
} from './ccGlyphs.js'
import {
	consonant
} from './setup.js';
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	unsupportedCharacters,
	renderOptions
} from '../event_callbacks.js';

let canvas = {}; // canvas properties
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
let groupedInput; //global variable for input to be updated
let option; // user selected render options handler

const base = new ccBase();
const deco = new ccDeco();

export function render(input) {
	option = renderOptions.get();
	// convert input-string to grouped array and determine number of groups
	groupedInput = ccGrouped.groups(input.toLowerCase());
	let lettergroups = 0;

	groupedInput.forEach(word => {
		word.forEach(groups => {
			groups.forEach(group => { // determine maximum expansion due to stacking and amount of groups
				if (option.stack < 1 + .6 * group.length) option.stack = 1 + .6 * group.length;
				lettergroups++;
			});
		});
		lettergroups++;
	})
	// initialize widths, heights, default-values, draw-object
	letterwidth = consonant * option.stack;
	letterheight = letterwidth * 3;
	// set canvas scale according to number of groups times letterwidth
	canvas["width"] = Math.min(lettergroups + 2, Math.floor(option.maxWidth / letterwidth)) * letterwidth - letterwidth;
	canvas["height"] = letterheight * Math.ceil(lettergroups / Math.floor(canvas.width / letterwidth));
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	canvas["currentX"] = letterwidth * .5;
	canvas["currentY"] = letterheight * .6;

	groupedInput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups 
				// prepare resizing for stacked characters
				var stack = group.length;
				// reset offsets but hand over possible resizing factor
				ccGrouped.resetOffset(stack, group.join(''));
				// iterate through characters within group
				for (var l = 0; l < group.length; l++) {
					// adjust offset properties according to former character/base
					if (l > 0) ccGrouped.setOffset();
					// draw
					if (base.getBase(group[l])) ccDraw(ctx, group[l], ccGrouped);
					else unsupportedCharacters.add(group[l]);
				}
			});
		});
		ccGrouped.resetOffset();
		ccDraw(ctx, " ", ccGrouped);
	});

	// complain about undefined characters
	unsupportedCharacters.get();

	return ctx;
}

// set rules for grouping
let ccGrouped = {
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
				if (group.length > 0 && group[group.length - 1].length < option.stack) {
					// add to former group if not full
					group[group.length - 1].push(current)
				} else // create current group
					group.push([current]);
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (stack, currentGroupText = '') {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.resize = 1 + .6 * stack; // consonant-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.currentGroupText = currentGroupText;
	},
	setOffset: function () {
		this.offset++;
		this.carriagereturn = true;
		this.resize -= .6;
	}
}

// draw instructions for base + decoration
function ccDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (canvas.currentX + letterwidth * 2 >= canvas.width) {
			canvas.currentY += letterheight;
			canvas.currentX = letterwidth * 1.5;
		} else canvas.currentX += letterwidth;
	}
	//define tilt based on stack-number to make the glyphs less monotonous
	let tilt = .25 - .0625 * (grouped.offset + 1);
	// draw base
	if (base.getBase(letter)) base.cctable[base.getBase(letter)].draw(ctx, canvas.currentX, canvas.currentY, consonant * grouped.resize, tilt);
	// draw decorators
	if (deco.getDeco(letter)) deco.cctable[deco.getDeco(letter)].draw(ctx, canvas.currentX, canvas.currentY, consonant * grouped.resize, tilt);

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	if (grouped.offset == 0) ctx.drawText(grouped.currentGroupText, {
		x: canvas.currentX,
		y: canvas.currentY - letterheight * .5
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