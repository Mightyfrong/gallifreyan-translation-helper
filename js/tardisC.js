import { polar } from "./utils.js";

let tardisScale = 3;

function circle(r){
	const r0 = r+',0';
	const rr001 = r+','+r+' 0 0 1';
	return `M${r0}A${rr001} -${r0} ${rr001} ${r0}`
}

const tardisLetters = {
	a:`;M${polar(60,150)}L${polar(60,330)};${circle(10)}`,
	b:`M45,0A45,45 0 1 1 ${polar(45,300)} 25,25 0 0 0 45,0;${circle(50)};`,
	c: "",
	ch: "",
	d: "",
	e: "",
	f: "",
	g: "",
	h: "",
	i: "",
	j: "",
	k: "",
	l: "",
	m: "",
	n: "",
	o: "",
	p: "",
	q: "",
	ng: "",
	qu: "",
	r: "",
	s: "",
	sh: "",
	t: "",
	th: "",
	u: "",
	v: "",
	w: "",
	x: "",
	y: "",
	z: "",
	ß: "",
	ph: "",
	"": ""
};

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
	ctx.fillText(consonant + vowel, x - 22 * tardisScale, y - 30 * tardisScale);

	if (x >= ctx.canvas.width) {
		y += 50 * tardisScale;
		x = 0
	}
	x += 50 * tardisScale;
}

function drawGlyph(ctx, pathString){
	pathString.split(";").forEach((str, i) => {
		if(str.length){
			drawFuncs[i](ctx, new Path2D(str));
		}
	});
}
const drawFuncs = [
	(ctx, path) => {ctx.lineWidth = 1; ctx.stroke(path)},
	(ctx, path) => {ctx.lineWidth = 2; ctx.stroke(path)},
	(ctx, path) => {ctx.fill(path)},
]

function isVowel(input) {
	//friendly suggestion: "aeiou".indexOf(input)>-1 returns true if input is a vowel. no urgent need for a function.
	return input == "a" || input == "e" || input == "i" || input == "o" || input == "u";
}