import { consonants } from './parsing/consonants.js';
import { vowels } from './parsing/vowels.js';

import { GallifreyanParser } from '../GallifreyanParser.js';
import { TardisLetter } from './parsing/TardisLetter.js';
import { TardisConsonant } from './parsing/TardisConsonant.js';

import { TardisGlyph } from './TardisGlyph.js';

/* Initialise Parser */
class TardisVowel extends TardisLetter{
    constructor(str, draw){
        super(str, true);
        this.draw = draw;
    }
}

const letterMap = new Map;

for (let str in consonants)
	letterMap.set(str, new TardisConsonant(str, consonants[str]));
for (let str in vowels)
	letterMap.set(str, new TardisVowel(str, vowels[str]));

const parser = new GallifreyanParser(letterMap);

/* Rendering Constants */
const gutter = 10; // gap between lines; also twice outer margin

const glyphSize = 100;
const textSpace = 20;

const startPos = (glyphSize + gutter) / 2;
const lineHeight = glyphSize + textSpace + gutter;

export function render(ctx, input) {
	const result = parser.parseWords(input.toUpperCase());

	const translation = result.output.map(translateWord);
	const outputLength = translation.map(word => word.length).reduce((a, b) => a + b + 1);

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
	translation.forEach(words => {
		words.forEach(glyph => {
			// start new line if overflowing
			if (ctx.getTransform().e > ctx.canvas.width - startPos) {
				ctx.restore();
				ctx.translate(0, lineHeight);
				ctx.save();
			}
			glyph.draw(ctx);
			ctx.fillText(glyph.toString, 0, (glyphSize + textSpace) / 2);
			ctx.translate(glyphSize, 0);
		});
		ctx.translate(glyphSize, 0);
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
	return glyphs;
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