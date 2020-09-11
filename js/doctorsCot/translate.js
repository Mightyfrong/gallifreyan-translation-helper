import { letterMap, glyphRadius, glyphCol } from './setup.js';
import { GallifreyanParser } from '../GallifreyanParser.js';
import { CotGlyph } from './CotGlyph.js';

const glyphSpacing = 5;
const glyphWidth = 2 * (glyphRadius + glyphSpacing);

const textSpace = 20;
const lineHeight = textSpace + 2 * glyphRadius;

const parser = new GallifreyanParser(letterMap);

export function doctorsCotTranslate(ctx, input) {
    const result = parser.parseWords(input.toLowerCase().replace(/[-ːˈ]/g, ""));

    document.getElementById('output').innerHTML = result.error || "";

    const translation = result.output.map(translateWord);

    const maxWordSize = Math.max(...translation.map(word => word.length))
    const numOfLines = translation.length;
    ctx.canvas.width = maxWordSize * glyphWidth;
    ctx.canvas.height = numOfLines * lineHeight;

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
    ctx.strokeStyle = glyphCol;

    ctx.translate(glyphSpacing + glyphRadius, textSpace + glyphRadius);
    
    translation.forEach(word => {
        ctx.save();
        word.forEach(glyph => {
            ctx.fillStyle = '#444';
            ctx.fillText(glyph.toString, 0, - glyphRadius - textSpace / 2);

            glyph.draw(ctx);
            ctx.translate(glyphWidth, 0);
        });
        ctx.restore();
        ctx.translate(0, lineHeight);
    });
}

function translateWord(word) {
    let letters = word;
    let glyphs = [];
    while (letters.length) {
        const [letter1, ...letters1] = letters;
        if (letter1.isVowel) {
            glyphs.push(new CotGlyph(letterMap.get("א"), null, letter1));
            letters = letters1;
        } else {
            const [letter2, ...letters2] = letters1;
            if (letter2) {
                if (letter2.isVowel) {
                    glyphs.push(new CotGlyph(letter1, null, letter2));
                    letters = letters2;
                } else {
                    const [letter3, ...letters3] = letters2;
                    if (letter3) {
                        if (letter3.isVowel) {
                            glyphs.push(new CotGlyph(letter1, letter2, letter3));
                            letters = letters3;
                        } else {
                            glyphs.push(new CotGlyph(letter1, letter2));
                            letters = letters2;
                        }
                    } else {
                        glyphs.push(new CotGlyph(letter1, letter2));
                        letters = letters2;
                    }
                }
            } else {
                glyphs.push(new CotGlyph(letter1));
                letters = letters1;
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