import {
	includes,
	dimensionObj
} from '../utils/funcs.js';
import {
	glyphSize
} from './setup.js';
import {
	gcGlyphs
} from './gcGlyphs.js';
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	unsupportedCharacters,
	renderOptions
} from '../event_callbacks.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};
let dimension = new dimensionObj(); // utility to calculate word-circle- and canvas dimensions

const glyph = new gcGlyphs();

export function render(input) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// convert input-string to grouped array and determine number of groups
	let groupedInput = gcGrouped.groups(input.toLowerCase());
	glyphs.num = 0; // reset for new input

	if (!option.circular) {
		groupedInput.forEach(sentence => {
			sentence.forEach(word => {
				if (!option.stacking) {
					word.forEach(group => {
						glyphs.num += group.length;
					});
				}
				if (option.stacking) glyphs.num += word.length;
				glyphs.num += 1; //space after every word
			});
		});
		glyphs.width = glyphSize * 2.2;
		glyphs.height = glyphSize * 4;
	}
	/*			groupedInput.forEach(sentence => {
					circularGroups = 0;
					for (let i = 0; i < sentence[0].length; i++) {
						if (option.circular) {
							let twc2;
							if (!includes(" .!?‽", sentence[0][i]))
								twc2 = dimension.wordcircleRadius(++circularGroups, glyphSize * stackedGlyph) * 1.5;
							if (biggestWordCircle < twc2) biggestWordCircle = twc2;

						} else {
							glyphs.num++;
						}
					}
				});
	*/
	let biggestWordCircle;
	// set canvas scale according to number of letters/groups
	if (false && option.circular) {
		glyphs.num = groupedInput.length;
		glyphs.width = biggestWordCircle;
		glyphs.height = biggestWordCircle;
		canvas["currentX"] = glyphs.width * .5;
		canvas["currentY"] = -glyphs.height * .5;
	} else {
		canvas["currentX"] = -glyphs.width * .5;
		canvas["currentY"] = glyphs.height * .5;
	}
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;

	const ctx = new SVGRenderingContext(canvas.width, canvas.height);
	let text;

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedInput.forEach(sentence => { // loop through sentence
		sentence.forEach(word => { // loop through words
			if (option.circular) {
				text = "";
				word.forEach(gr => {
					text += gr.join('');
				});
			}
			word.forEach(group => { // loop through groups
				if (option.stacking) gcGrouped.resetOffset(group.length, group.join(''));

				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					if (!option.stacking) gcGrouped.resetOffset(1, group[l]);

					gcDraw(ctx, group[l], gcGrouped);
					if (!glyph.getDeco(group[l]) && !glyph.getBase(group[l]) &&
						!(group[l] in glyph.vowel) && !(group[l] in glyph.punctuation))
						unsupportedCharacters.add(group[l]);

					gcGrouped.setOffset();
				}
			});
			if (!option.circular) canvas = dimension.carriageReturn(canvas, glyphs, .5);
		});
		// gcGrouped.resetOffset();
	});

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

// set rules for grouping
let gcGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> words -> groups -> single letters
		input = input.trim().replace(/\s+/g, ' '); // trim and strip multiple whitespaces
		if (!includes(".,!?'\"", input.substring(input.length - 1))) input += "."; // add punctuation by default if not provided
		let sentences = input.match(/.+?[\?!,\.'"]/g); // divide into sentences by supported punctuation

		let result = [];
		sentences.forEach(sentence => {
			let words = sentence.trim().split(/\s/g), // determine words by whitespace
				sntnc = [];
			words.forEach(word => {
				word = replacements(word);
				let groups = [];
				for (var i = 0; i < word.length; i++) { // iterate through word 
					if ((groups.length > 0) &&
						!(includes(".,!?'\"", word[i]) // not adding punctuation 
							||
							(includes("aeiou", groups[groups.length - 1]) && !includes("aeiou", word[i])) // not adding consonant after vowel
						)) {
						// add to former group if allowed
						groups[groups.length - 1].push(word[i])
					} else // create current group
						groups.push([word[i]]);
				}
				sntnc.push(groups); // append group to last sentence
			});
			result.push(sntnc);
		});
		return result;
	},
	resetOffset: function (stack, currentGroupText = '') {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.currentGroupText = currentGroupText;
		this.numberOfGroups = stack || 1;
		this.resize = includes("aeiou",currentGroupText[0]) ? .7 : 1; // glyph-resize-factor, vowels start smaller
	},
	setOffset: function () {
		this.carriagereturn = true;
		this.resize *= .7;
		this.offset++;
	}
}

//script specific replacements
function replacements(word) {
	let cword = "";
	for (let i = 0; i < word.length; i++) { // iterate through word 
		if (word[i] == "c") {
			if (includes(["e", "i", "y"], word[i + 1])) cword += "s";
			else cword += "k"; // end of the word
		} else if (word[i] == "ß") cword += "ss";
		else cword += word[i];
	}
	return cword;
}

// draw instructions for base + decoration
function gcDraw(ctx, letter, grouped) {
	//	if ((!option.circular || !grouped.glyph) &&
	//		(!grouped.carriagereturn || (!grouped.carriagereturn && option.circular && !grouped.glyph))) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
	// position pointer
	if (!grouped.carriagereturn) {
		canvas = dimension.carriageReturn(canvas, glyphs, .5);
	}
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyphs.height,
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
	let tilt = .25 - (grouped.offset) * .1; //.0625;

	let decoration = glyph.getDeco(letter),
		base = glyph.getBase(letter);

	if (decoration) glyph.deco[decoration].draw(ctx,
		canvas.currentX + center.x,
		canvas.currentY + center.y,
		glyphSize * grouped.resize,
		tilt);
	if (base) glyph.base[base].draw(ctx,
		canvas.currentX + center.x,
		canvas.currentY + center.y,
		glyphSize * grouped.resize,
		tilt);
	if (letter in glyph.vowel) {
		glyph.vowel[letter].draw(ctx,
			canvas.currentX + center.x,
			canvas.currentY + center.y,
			glyphSize * grouped.resize,
			tilt);
	}
	if (letter in glyph.punctuation) {
		glyph.punctuation[letter].draw(ctx,
			canvas.currentX + center.x,
			canvas.currentY + center.y,
			glyphSize,
			tilt);
	}

	/*	
		
		// draw consonant
		if (letter in glyph.glyphs)
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
					(option.circular ? wordCircleRadius * 1.7 : glyphSize * grouped.resize)
				);
				if (option.circular) cwPunctuation.glyphs["start"].draw(ctx,
					canvas.currentX + center.x,
					canvas.currentY + center.y,
					glyphSize * .7,
					tilt);
			}
		}
		*/

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	let distance;
	if (option.circular) distance = wordCircleRadius * 1.9;
	else distance = glyphSize * 1.6; // * stackedGlyph;
	if (grouped.offset == 0) ctx.drawText(grouped.currentGroupText, {
		x: canvas.currentX - distance * Math.sin(Math.PI * rad),
		y: canvas.currentY + distance * Math.cos(Math.PI * rad) + option.fontsize * .25
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