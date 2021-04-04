import {
	includes,
	wordcircleRadius
} from '../utils/funcs.js';
import {
	glyphSize,
	cwConsonants,
	cwVowels,
	cwPunctuation
} from './setup.js';
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	unsupportedCharacters,
	renderOptions
} from '../event_callbacks.js';

let canvas = {}; // canvas properties
let glyph; // glyph dimensions-object
let groupedInput; //global variable for input to be updated
let option; // user selected render options handler
let stackedGlyph;
export function render(input) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// convert input-string to grouped array and determine number of groups
	groupedInput = clockworkGrouped.groups(input.toLowerCase());
	stackedGlyph = 1.8;
	let glyphs = 0,
		circularGroups = 0,
		biggestWordCircle = 0;
	for (let i = 1; i <= option.stack; i++) {
		stackedGlyph *= 1 + .8 / i;
	}

	groupedInput.forEach(sentence => {
		circularGroups = 0;
		for (let i = 0; i < sentence[0].length; i++) {
			if (option.circular) {
				let twc2;
				if (!includes(" .!?‽", sentence[0][i]))
					twc2 = wordcircleRadius(++circularGroups, glyphSize * stackedGlyph) * 1.5;
				if (biggestWordCircle < twc2) biggestWordCircle = twc2;

			} else {
				glyphs++;
			}
		}
	});
	// set canvas scale according to number of letters/groups
	if (option.circular) {
		glyphs = groupedInput.length;
		glyph = {
			width: biggestWordCircle,
			height: biggestWordCircle
		};
		canvas["width"] = (Math.min(glyphs, Math.floor(option.maxWidth / biggestWordCircle)) * glyph.width || glyph.width);
		canvas["height"] = biggestWordCircle * Math.ceil(glyphs / (Math.floor(option.maxWidth / glyph.width) || 1));
		canvas["currentX"] = glyph.width * .5;
		canvas["currentY"] = -glyph.height * .5;
	} else {
		glyph = {
			width: glyphSize * (stackedGlyph + 2),
			height: glyphSize * (stackedGlyph + 2)
		};
		canvas["width"] = (Math.min(++glyphs, Math.floor(option.maxWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
		canvas["height"] = glyph.height * (Math.ceil(++glyphs / (Math.floor(option.maxWidth / glyph.width) || 1)));
		canvas["currentX"] = -glyph.width * .5;
		canvas["currentY"] = glyph.height * .5;
	}

	const ctx = new SVGRenderingContext(canvas.width, canvas.height);
	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedInput.forEach(sentence => { // loop through sentence
		let l = 0;
		sentence[0].forEach(group => { // loop through groups
			clockworkGrouped.resetOffset(sentence[0].length, group.join(''), !l);
			// iterate through characters within group
			for (l = 0; l < group.length; l++) {
				if (group[l] in cwConsonants.glyphs || group[l] in cwVowels.glyphs || group[l] in cwPunctuation.glyphs)
					clockworkDraw(ctx, group[l], clockworkGrouped);
				else
				if (!includes(" .!?‽", group[l])) unsupportedCharacters.add(group[l]);
				clockworkGrouped.setOffset();
			}
		});
		clockworkGrouped.resetOffset();
	});

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

// set rules for grouping
let clockworkGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> groups -> single letters
		input = input.trim().replace(/\s+/g, ' '); // trim and strip multiple whitespaces
		let sentences = input.match(/.+?[\?!\.‽]/g); // divide into sentences by punctuation
		if (sentences === null && input.length) sentences = [input]; // take raw input if no punctuation is found

		let result = [];
		sentences.forEach(sentence => {
			result.push([]); // init new sentence
			let group = [];
			let characters = sentence.trim().match(/\/.+\/|./g); // match single characters or encapsulated by control characters 
			for (var i = 0; i < characters.length; i++) { // iterate through word 
				let character = characters[i].replace(/\//g, ''); // get rid of control characters
				if ((group.length > 0 && group[group.length - 1].length < option.stack) &&
					!(includes(",; .!?‽", character) || includes(",; .!?‽", group[group.length - 1]))) {
					// add to former group if not full or punctuation
					group[group.length - 1].push(character)
				} else // create current group
					group.push([character]);
			}
			result[result.length - 1].push(group); // append group to last sentence
		});

		return result;
	},
	resetOffset: function (stack, currentGroupText = '', newSentence = false) {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.resize = 1; // glyph-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.currentGroupText = currentGroupText;
		this.numberOfGroups = stack || 1;
		if (+newSentence) this.glyph = 0;
		else this.glyph++;
	},
	setOffset: function () {
		this.offset++;
		this.carriagereturn = true;
		this.resize *= 1 + .8 / this.offset;
	}
}

// draw instructions for base + decoration
function clockworkDraw(ctx, letter, grouped) {
	if ((!option.circular || letter == " " || !grouped.glyph) &&
		(!grouped.carriagereturn || (!grouped.carriagereturn && option.circular && !grouped.glyph))) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (canvas.currentX + glyph.width >= canvas.width) {
			canvas.currentY += glyph.height;
			canvas.currentX = glyph.width * .5;
		} else canvas.currentX += glyph.width;
	}
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyph.height,
		center = {
			x: 0,
			y: 0
		};
	if (option.circular) {
		rad = 1 + 2 / grouped.numberOfGroups * grouped.glyph;
		wordCircleRadius /= 4;
		center = { // relative center of sentence
			x: -1 * (wordCircleRadius * Math.sin(Math.PI * rad)),
			y: wordCircleRadius * Math.cos(Math.PI * rad)
		};
	}
	//define tilt based on stack-number to distinguish between stacked characters
	let tilt = .25 - (grouped.offset + 1) * .1; //.0625;
	// draw consonant
	if (letter in cwConsonants.glyphs)
		cwConsonants.glyphs[letter].draw(ctx,
			canvas.currentX + center.x,
			canvas.currentY + center.y,
			glyphSize * grouped.resize,
			tilt);
	// draw vowel, smaller and randomly slightly offcentric
	else if (letter in cwVowels.glyphs) {
		let rot = Math.PI * Math.random() * 2;
		cwVowels.glyphs[letter].draw(ctx,
			canvas.currentX + center.x + Math.cos(rot) * glyphSize * grouped.resize * .75,
			canvas.currentY + center.y + Math.sin(rot) * glyphSize * grouped.resize * .75,
			glyphSize * .7,
			tilt);
	} else if (letter in cwPunctuation.glyphs) {
		if (includes(",;", letter)) {
			let rot = Math.PI * Math.random() * 2;
			cwPunctuation.glyphs[letter].draw(ctx,
				canvas.currentX + center.x + Math.cos(rot) * glyphSize * grouped.resize * .75,
				canvas.currentY + center.y + Math.sin(rot) * glyphSize * grouped.resize * .75,
				glyphSize * .7,
				tilt);
		} else {
			cwPunctuation.glyphs[letter].draw(ctx,
				canvas.currentX,
				canvas.currentY,
				(option.circular ? wordCircleRadius * 2 : glyphSize * grouped.resize)
			);
			if (option.circular) cwPunctuation.glyphs["start"].draw(ctx,
				canvas.currentX + center.x,
				canvas.currentY + center.y,
				glyphSize * .7,
				tilt);
		}
	}
	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	let fontsize = parseFloat(getComputedStyle(document.body, null).fontSize),
		distance;
	if (option.circular) distance = wordCircleRadius + glyphSize * .5 * stackedGlyph;
	else distance = -glyphSize * .5 * stackedGlyph;
	if (grouped.offset == 0) ctx.drawText(grouped.currentGroupText, {
		x: canvas.currentX - distance * Math.sin(Math.PI * rad),
		y: canvas.currentY + distance * Math.cos(Math.PI * rad) + fontsize * .25
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