import { includes } from '../utils/funcs.js';
import { glyphSize, dc2Consonants } from './setup.js';
import { UILanguage } from '../utils/UILanguage.js'
import { SVGRenderingContext } from '../utils/SVGRenderingContext.js';

let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let glyph; // glyph dimensions-object
let groupedInput; //global variable for input to be updated

export function render(input) {
	// convert input-string to grouped array and determine number of groups
	groupedInput = doctorsCot2Grouped.groups(input.toLowerCase());

	let glyphs = 0;
	groupedInput.forEach(word => {
		word.forEach(groups => {
			groups.forEach(group => { // determine maximum expansion due to stacking and amount of groups
				glyphs++;
			});
		});
		glyphs++;
	})

	glyph = {
		width: glyphSize * 2.5,
		height: glyphSize * 6
	};
	width = (Math.min(++glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
	height = glyph.height * (Math.ceil(++glyphs / (Math.floor(window.innerWidth / glyph.width) || 1)));
	x = 0;
	y = glyph.height * .5;
	const ctx = new SVGRenderingContext(width, height);

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedInput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			let groupnum = 0;
			groups.forEach(group => { // loop through character-groups 
				groupnum++;

				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					doctorsCot2Draw(ctx, group[l], doctorsCot2Grouped);
				}
			});
		});
		doctorsCot2Draw(ctx, " ", doctorsCot2Grouped);
	});
	return ctx;
}

//script specific replacements
function replacements(word) {
	if (!document.getElementById('coten').checked) return word;
	return word;
	let cword = "";

/*y=j
x=ks
ng=ŋ
r=ɹ
j=ʤ
ch=ʧ
sh=ʃ
th=θ end
th=ð beginning
*/

for (let i = 0; i < word.length; i++) { // iterate through word 

		if (word[i] == "c" && option.chandling) {
			if (word[i + 1] == "h") cword += "c"; // ch is still allowed
			else if (includes(["e", "i", "y"], word[i + 1])) cword += "s";
			else cword += "k"; // end of the word
		} else if (word[i] == "ß") cword += "ss";
		else cword += word[i];
	}
	return cword;
}

// set rules for grouping
let doctorsCot2Grouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> words -> groups -> single letters
		let sentence = [];
		let splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			let group = [];
			sword = replacements(sword)
			for (var i = 0; i < sword.length; i++) { // iterate through word 
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double characters to group
				if (includes(["ts", "st", "ks", "ou"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (group.length > 0 && group[group.length - 1].length < 2) {
					// add to former group if not full
					group[group.length - 1].push(current)
				} else // create current group
					group.push([current]);
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resize:1
}

// draw instructions for base + decoration
function doctorsCot2Draw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
		if (x + glyph.width * 2 >= width) {
			y += glyph.height;
			x = glyph.width * 1.5;
		} else x += glyph.width;
	}
	console.log(width, height,x,y);

	//define tilt based on stack-number to make the glyphs less monotonous
	let tilt = .25 - .0625 * (grouped.offset + 1);
	
	// draw base
	if (dc2Consonants.getBase(letter)) dc2Consonants.base[dc2Consonants.getBase(letter)].draw(ctx, x, y, glyphSize * grouped.resize, tilt);
	// draw decorators
	if (dc2Consonants.getDeco(letter)) dc2Consonants.decorators[dc2Consonants.getDeco(letter)].draw(ctx, x, y, glyphSize * grouped.resize, tilt);

	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings
	if (grouped.offset==0) ctx.drawText(grouped.currentGroupText, {
		x: x ,
		y: y - letterheight * .5
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