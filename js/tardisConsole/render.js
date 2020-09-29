import { consonants } from './parsing/consonants.js';
import { vowels } from './parsing/vowels.js';

import { GallifreyanParser } from '../GallifreyanParser.js';
import { TardisLetter } from './parsing/TardisLetter.js';
import { TardisConsonant } from './parsing/TardisConsonant.js';

import { TardisGlyph } from './TardisGlyph.js';
import { TardisWord, margin } from './TardisWord.js';

/* Initialise Parser */
class TardisVowel extends TardisLetter {
	constructor(str, render) {
		super(str, true);
		this.render = render;
	}
}

const letterMap = new Map;

for (let str in consonants)
	letterMap.set(str, new TardisConsonant(str, consonants[str]));
for (let str in vowels)
	letterMap.set(str, new TardisVowel(str, vowels[str]));

const parser = new GallifreyanParser(letterMap, document.getElementById("output"));

export function render(ctx, input) {
	const result = parser.parseWords(input.toUpperCase());

	const translation = result.output.map(translateWord);

	// resize canvas by number & size of words
	const wordRadii = translation.map(word => word.radius);
	const width = 2 * (wordRadii.reduce((a, b) => a + b) + margin);
	const height = 2 * (Math.max(...wordRadii) + margin);

	ctx.prepare(width, height);
	ctx.translate(margin, height / 2);

	translation.forEach(word => {
		ctx.translate(word.radius, 0);
		word.render(ctx);
		ctx.translate(word.radius, 0);
	});
}

function translateWord(letters) {
	let glyphs = [];
	while (letters.length) {
		const [l0, ...ls0] = letters;
		if (l0.isVowel) {
			glyphs.push(new TardisGlyph(null, l0));
			letters = ls0;
		} else {
			const [l1, ...ls1] = ls0;
			if (l1 && l1.isVowel) {
				glyphs.push(new TardisGlyph(l0, l1));
				letters = ls1;
			} else {
				glyphs.push(new TardisGlyph(l0));
				letters = ls0;
			}
		}
	}
	return new TardisWord(glyphs);
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