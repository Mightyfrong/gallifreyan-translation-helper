import { letterMap, glyphRadius } from './setup.js';
import { GallifreyanParser } from '../GallifreyanParser.js';
import { CotGlyph } from './CotGlyph.js';
import { canvaspreparation, color } from '../utils.js';

const glyphSpacing = 5;
const glyphWidth = 2 * (glyphRadius + glyphSpacing);

const textSpace = 20;
const lineHeight = textSpace + 2 * glyphRadius;

const parser = new GallifreyanParser(letterMap, document.getElementById('output'));

export function render(ctx, input) {
	const result = parser.parseWords(input.toLowerCase());

	const translation = result.output.map(translateWord);

    const maxWordSize = Math.max(...translation.map(word => word.length))
    const numOfLines = translation.length;
    canvaspreparation(ctx, maxWordSize * glyphWidth, numOfLines * lineHeight);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = color.foreground;

	ctx.translate(glyphSpacing + glyphRadius, textSpace + glyphRadius);

    translation.forEach(word => {
        ctx.save();
        word.forEach(glyph => {
            ctx.fillStyle = color.foreground;
            ctx.fillText(glyph.toString, 0, - glyphRadius - textSpace / 2);

			glyph.draw(ctx);
			ctx.translate(glyphWidth, 0);
		});
		ctx.restore();
		ctx.translate(0, lineHeight);
	});
}

function translateWord(word) {
	let glyphs = [];
	while (word.length) {
		const [letter1, ...letters1] = word;
		if (letter1.isVowel) {
			const [letter2, ...letters2] = letters1;
			if(letter2 && !letter2.isVowel) {
				glyphs.push(new CotGlyph(letterMap.get("א"), letter2, letter1));
				word = letters2;
			} else {
				glyphs.push(new CotGlyph(letterMap.get("א"), null, letter1));
				word = letters2;
			}
		} else {
			const [letter2, ...letters2] = letters1;
			if (letter2) {
				if (letter2.isVowel) {
					glyphs.push(new CotGlyph(letter1, null, letter2));
					word = letters2;
				} else {
					const [letter3, ...letters3] = letters2;
					if (letter3 && letter3.isVowel) {
						glyphs.push(new CotGlyph(letter1, letter2, letter3));
						word = letters3;
					} else {
						glyphs.push(new CotGlyph(letter1, letter2));
						word = letters2;
					}
				}
			} else {
				glyphs.push(new CotGlyph(letter1));
				word = letters1;
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