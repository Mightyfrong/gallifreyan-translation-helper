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

	let glyphs = 0,
		maxstack = document.getElementById("cw-stack").options[document.getElementById("cw-stack").selectedIndex].value;
	groupedInput.forEach(word => {
		glyphs += word[0].length;
	});
	glyph = {
		width: glyphSize * 3 + glyphSize * 1.8 ** maxstack,
		height: glyphSize * 3 + glyphSize * 1.8 ** maxstack
	};
	width = (Math.min(++glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
	height = glyph.height * (Math.ceil(++glyphs / (Math.floor(window.innerWidth / glyph.width) || 1)));
	x = -glyph.width * .5;
	y = glyph.height * .5;
	const ctx = new SVGRenderingContext(width, height);

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedInput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			groups.forEach(group => { // loop through character-groups 
				clockworkGrouped.resetOffset(group.length, group.join(''));
				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					clockworkDraw(ctx, group[l], clockworkGrouped);
					clockworkGrouped.setOffset();
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
			let word = sword.replace(/^\/|\/$/, '').split(/\/{1,}/); // split by control character /, strip first and last beforehand
			let maxstack = document.getElementById("cw-stack").options[document.getElementById("cw-stack").selectedIndex].value;
			let group = [];
			for (var i = 0; i < word.length; i++) { // iterate through word 
				if (group.length > 0 && group[group.length - 1].length < maxstack) {
					// add to former group if not full
					group[group.length - 1].push(word[i])
				} else // create current group
					group.push([word[i]]);
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (stack, currentGroupText = '') {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.resize = 1; // glyph-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.currentGroupText = currentGroupText;
	},
	setOffset: function () {
		this.offset++;
		this.carriagereturn = true;
		this.resize *= 1.8;
	}
}

// draw instructions for base + decoration
function clockworkDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (x + glyph.width >= width) {
			y += glyph.height;
			x = glyph.width * .5;
		} else x += glyph.width;
	}

	//define tilt based on stack-number to distinguish between stacked characters
	let tilt = .25 - (grouped.offset + 1) * .1; //.0625;
	// draw consonant
	if (letter in cwConsonants.glyphs)
		cwConsonants.glyphs[letter].draw(ctx,
			x,
			y,
			glyphSize * grouped.resize,
			tilt);
	// draw vowel, smaller and randomly slightly offcentric
	else if (letter in cwVowels.glyphs) {
		let rot = Math.PI * Math.random() * 2;
		cwVowels.glyphs[letter].draw(ctx,
			x + Math.cos(rot) * glyphSize * grouped.resize * .75,
			y + Math.sin(rot) * glyphSize * grouped.resize * .75,
			glyphSize * .7,
			tilt);
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