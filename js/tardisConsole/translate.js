import { letters } from './letters.js';

// gap between lines and also twice the outer margin
const gutter = 10;

const glyphSize = 100;
const textSpace = 20;

const startPos = (glyphSize + gutter) / 2;
const lineHeight = glyphSize + textSpace + gutter;

export function tardisTranslate(ctx, input) {
	input = input.toLowerCase();

	// process input to groups of consonants and vowels
	let glyphs = [], two = false;
	for (var i = 0; i < input.length; i++) {
		two = false
		let nextTwo = input.slice(0, 2);
		if (["ch", "ng", "qu", "sh", "th", "ph"].includes(nextTwo)) { // add double letters
			glyphs.push([letters.get(nextTwo)]);
			two = true;
			i++;
		}
		else glyphs.push([letters.get(input[i])]); // add single letters
		if (!two && isVowel(input[i])) continue; // if current letter is a vowel treat it as aleph and skip next commands
		else if (isVowel(input[i + 1])) { // if following character is a vowel add to former letter group
			glyphs[glyphs.length - 1].push(letters.get(input[i + 1]));
			i++;
		}
	}

	// how many full glyphs fit horizontally
	const availCols = Math.floor((window.innerWidth - gutter) / glyphSize);
	const actualCols = Math.min(glyphs.length, availCols)

	// resize canvas according to number of groups
	ctx.canvas.width = actualCols * glyphSize + gutter;
	ctx.canvas.height = lineHeight * Math.ceil(glyphs.length / actualCols);

	// text pos must be set after canvas resize
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.translate(startPos, startPos);
	ctx.save();

	// iterate through groups and draw
	glyphs.forEach(letters => {
		tardisDraw(ctx, ...letters);
	});
}

function tardisDraw(ctx, consonant, vowel) {
	vowel = vowel || letters.get("");

	if (ctx.getTransform().e > ctx.canvas.width - startPos) {
		ctx.restore();
		ctx.translate(0, lineHeight);
		ctx.save();
	}

	consonant.draw(ctx);
	vowel.draw(ctx);

	ctx.fillText(consonant.toString + vowel.toString, 0, (glyphSize + textSpace) / 2);

	ctx.translate(glyphSize, 0);
}

function isVowel(ltr) {
	return "aeiou".includes(ltr);
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