import { letters } from './letters.js';
import { GallifreyanParser } from '../GallifreyanParser.js';

// gap between lines and also twice the outer margin
const gutter = 10;

const glyphSize = 100;
const textSpace = 20;

const startPos = (glyphSize + gutter) / 2;
const lineHeight = glyphSize + textSpace + gutter;

const parser = new GallifreyanParser(letters);

export function tardisTranslate(ctx, input) {
	input = input.toLowerCase();
	const result = parser.parseWords(input);

	const glyphs = result.output.map(translateWord);
	const outputLength = glyphs.map(word => word.length).reduce((a, b) => a + b + 1);

	// how many full glyphs fit horizontally
	const availCols = Math.floor((window.innerWidth - gutter) / glyphSize);
	const actualCols = Math.min(outputLength, availCols)

	// resize canvas according to number of groups
	ctx.canvas.width = actualCols * glyphSize + gutter;
	ctx.canvas.height = lineHeight * Math.ceil(outputLength / actualCols);

	// text pos must be set after canvas resize
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.translate(startPos, startPos);
	ctx.save();

	// iterate through groups and draw
	glyphs.forEach(words => {
		words.forEach(letters =>
			tardisDraw(ctx, ...letters)
		);
		ctx.translate(glyphSize, 0);
	});
}

function translateWord(letters) {
	let glyphs = [];
	while (letters.length) {
		const [letter1, ...letters1] = letters;
		if (isVowel(letter1)) {
			glyphs.push([letter1]);
			letters = letters1;
		} else {
			const [letter2, ...letters2] = letters1;
			if (letter2) {
				if (isVowel(letter2)) {
					glyphs.push([letter1, letter2]);
					letters = letters2;
				} else {
					glyphs.push([letter1]);
				}
			} else {
				glyphs.push([letter1]);
				letters = letters1;
			}
		}
	}
	return glyphs;
}

function tardisDraw(ctx, consonant, vowel) {
	if (ctx.getTransform().e > ctx.canvas.width - startPos) {
		ctx.restore();
		ctx.translate(0, lineHeight);
		ctx.save();
	}

	let str = consonant.toString;
	consonant.draw(ctx);

	if (vowel) {
		str += vowel.toString;
		vowel.draw(ctx);
	}

	ctx.fillText(str, 0, (glyphSize + textSpace) / 2);

	ctx.translate(glyphSize, 0);
}

function isVowel(ltr) {
	return "aeiou".includes(ltr.toString);
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