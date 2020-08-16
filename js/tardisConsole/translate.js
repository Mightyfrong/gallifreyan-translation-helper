import {letters as tardisLetters} from './letters.js'

let x, y; //current drawing coords
export function tardisTranslate(ctx, input) {
	x = y = 0;
	input = input.toLowerCase();

	ctx.translate(100, 100);
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
	ctx.save();
	ctx.translate(x, y);

	drawGlyph(ctx, tardisLetters[consonant]);
	drawGlyph(ctx, tardisLetters[vowel]);

	ctx.restore();
	ctx.fillText(consonant + vowel, x - 66, y - 90);

	if (x >= ctx.canvas.width) {
		y += 150;
		x = 0
	}
	x += 150;
}

function drawGlyph(ctx, pathString){
	pathString.split(";").forEach((str, idx) => {
		const path = new Path2D(str);
		
		if(idx){
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