import { letters as tardisLetters } from './letters.js'

const glyphSize = 105;
const textSpace = 20;
const lineSpace = 20;

export function tardisTranslate(ctx, input) {
	input = input.toLowerCase();

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	// process input to groups of consonants and vowels
	let glyphs=[], two=false;
	for (var i = 0; i < input.length; i++) {
		two=false
		let nextTwo = input[i] + input[i + 1];
		if (["ch","ng","qu","sh","th","ph"].Contains(nextTwo)) { // add double letters
			glyphs.push([nextTwo]);
			two=true;
			i++;
		}
		else glyphs.push([input[i]]); // add single letters
		if(!two && "aeiou".Contains(input[i])) continue; // if current letter is a vowel treat it as aleph and skip next commands
		else if ("aeiou".Contains(input[i+1])) { // if following character is a vowel add to former letter group
			glyphs[glyphs.length-1].push(input[i + 1]);
			i++;
		}
	}
	// resize canvas according to number of groups
	ctx.canvas.width = Math.min(glyphs.length + 1, Math.floor(window.innerWidth / glyphSize)) * glyphSize - glyphSize;
	ctx.canvas.height = glyphSize * 1.5 * Math.ceil(--glyphs.length / Math.floor(window.innerWidth / glyphSize));
	ctx.translate(glyphSize / 2, textSpace + glyphSize / 2);
	ctx.save();

	// iterate through groups and draw
	glyphs.forEach(set=>{
		tardisDraw(ctx, set[0], (set[1]!==undefined ? set[1] : ""));
	});
}

function tardisDraw(ctx, consonant, vowel) {
	if (ctx.getTransform().e >= ctx.canvas.width - glyphSize) {
		ctx.restore();
		ctx.translate(0, glyphSize + textSpace + lineSpace);
		ctx.save();
	}

	drawGlyph(ctx, tardisLetters[consonant]);
	drawGlyph(ctx, tardisLetters[vowel]);

	ctx.fillText(consonant + vowel, 0, (glyphSize + textSpace) / 2);

	ctx.translate(glyphSize, 0);
}

function drawGlyph(ctx, pathString) {
	pathString.split(";").forEach((str, idx) => {
		const path = new Path2D(str);

		if (idx) {
			ctx.lineWidth = idx;
			ctx.stroke(path);
		} else
			ctx.fill(path);
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