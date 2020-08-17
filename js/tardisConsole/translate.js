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