import { letters as tardisLetters } from './letters.js'

const glyphSize = 105;
const textSpace = 20;
const lineSpace = 20;

export function tardisTranslate(ctx, input) {
	input = input.toLowerCase();

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	ctx.translate(glyphSize / 2, textSpace + glyphSize / 2);
	ctx.save();

	for (var i = 0; i < input.length; i++) {
		let nextTwo = input[i] + input[i + 1];
		if (nextTwo == "ch" || nextTwo == "ng" || nextTwo == "qu" || nextTwo == "sh" || nextTwo == "th" || nextTwo == "ph") {
			if (isVowel(input[i + 12])) {
				tardisDraw(ctx, nextTwo, input[i + 2]);
				i += 2;
			}
			else {
				tardisDraw(ctx, nextTwo, "");
				i++;
			}
		}
		else {
			if (isVowel(input[i])) {
				tardisDraw(ctx, "", input[i])
			}
			else {
				if (isVowel(input[i + 1])) {
					tardisDraw(ctx, input[i], input[i + 1]);
					i++;
				}
				else {
					tardisDraw(ctx, input[i], "");
				}
			}
		}
	}
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

function isVowel(input) {
	//friendly suggestion: "aeiou".indexOf(input)>-1 returns true if input is a vowel. no urgent need for a function.
	return input == "a" || input == "e" || input == "i" || input == "o" || input == "u";
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