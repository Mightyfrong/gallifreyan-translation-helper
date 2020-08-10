let tardisScale = 3;

var tardisLetters = {
	a: new Path2D(),
	b: new Path2D("m 0,0 a 7.8622813,7.8622813 0 0 1 -7.8622813,7.8622813 7.8622813,7.8622813 0 0 1 -7.8622812,-7.8622813 7.8622813,7.8622813 0 0 1 7.8622812,-7.8622809 7.8622813,7.8622813 0 0 1 7.8622813,7.8622809 z m 1.9118275,0 a 9.7741089,9.7741089 0 0 1 -9.7741088,9.7741089 9.7741089,9.7741089 0 0 1 -9.7741092,-9.7741089 9.7741089,9.7741089 0 0 1 9.7741092,-9.7741089 9.7741089,9.7741089 0 0 1 9.7741088,9.7741089 z"),
	c: new Path2D(),
	ch: new Path2D(),
	d: new Path2D(),
	e: new Path2D(),
	f: new Path2D(),
	g: new Path2D(),
	h: new Path2D(),
	i: new Path2D(),
	j: new Path2D(),
	k: new Path2D(),
	l: new Path2D(),
	m: new Path2D(),
	n: new Path2D(),
	o: new Path2D(),
	p: new Path2D(),
	q: new Path2D(),
	ng: new Path2D(),
	qu: new Path2D(),
	r: new Path2D(),
	s: new Path2D(),
	sh: new Path2D(),
	t: new Path2D(),
	th: new Path2D(),
	u: new Path2D(),
	v: new Path2D(),
	w: new Path2D(),
	x: new Path2D(),
	y: new Path2D(),
	z: new Path2D(),
	ß: new Path2D(),
	ph: new Path2D(),
	"": new Path2D()
};

function tardisTranslate(ctx, input) {
	x = 50 * tardisScale;
	y = 50 * tardisScale;
	input = input.toLowerCase();

	if (window.innerWidth < (50 + input.length * 50) * tardisScale) {
		width = Math.floor(window.innerWidth / (50 * tardisScale)) * 50 * tardisScale - 50 * tardisScale;
		height = (Math.ceil(((50 + input.length * 50) * tardisScale) / window.innerWidth)) * 50 * tardisScale + 100 * tardisScale;
	}
	else {
		width = (50 + input.length * 50) * tardisScale;
		height = 150 * tardisScale;
	}
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	for (var i = 0; i < input.length; i++) {
		let nextTwo = input[i] + input[i + 1];
		if (nextTwo == "ch" || nextTwo == "ng" || nextTwo == "qu" || nextTwo == "sh" || nextTwo == "th" || nextTwo == "ph") {
			if (isVowel(input[i + 2])) {
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
	let m = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
	m.a = 1.5 * tardisScale; m.b = 0;
	m.c = 0; m.d = 1.5 * tardisScale;
	m.e = x - 25; m.f = y - 25;
	
	let p = new Path2D();
	p.addPath(tardisLetters[consonant], m);
	p.addPath(tardisLetters[vowel], m);
	ctx.stroke(p);
	
	ctx.fillText(consonant + vowel, x - 22 * tardisScale, y - 30 * tardisScale);

	if (x >= width) {
		y += 50 * tardisScale;
		x = 0
	}
	x += 50 * tardisScale;
}

function isVowel(input) {
	//friendly suggestion: "aeiou".indexOf(input)>-1 returns true if input is a vowel. no urgent need for a function.
	return input == "a" || input == "e" || input == "i" || input == "o" || input == "u";
}