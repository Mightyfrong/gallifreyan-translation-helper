import { PhoneticUnit } from './PhoneticUnit.js'

export const consonantTable = {
	"1thin": " j ts ŋ v dʒ  f  ʒ ɢ  ç ɬ ʎ",
	"2thin": " n  h l p  w tʃ st ɴ  ð ɮ ß",
	"1thic": " t  s ɹ d  m  ʃ  θ q  ʝ ʋ x",
	"thicthin": "ks  k z b  א  g  r ɻ  ɣ ɰ  ",
	"2thic": " χ  ɲ ɳ ʈ  ɖ  c  ɟ ħ  ɭ ɸ  ",
	"thinthic": " ʁ  ʙ ʀ ⱱ  ɾ  ɽ  ʂ ʐ fi ʟ  "
}
export const vowelTable = {
	"1thin": "ɑ  i  u a y",
	"2thin": "e  ɪ ou æ ʉ",
	"1thic": "ɛ ai  ʌ ɜ ø",
	"thicthin": "ʊ  ɘ  ɐ ɤ ɵ",
	"2thic": "ɯ  ɨ  ə ɔ o",
	"thinthic": "œ  ɞ  ɒ ɶ  "
}

const outline = {
	"1thin": [1],
	"2thin": [1, 1],
	"1thic": [2],
	"thicthin": [2, 1],
	"2thic": [2, 2],
	"thinthic": [1, 2]
};

export const glyphCol = "#d7703a";
export const glyphRadius = 50;
export const innerRad = glyphRadius * 2 / 5;

export const outlineGap = 1;

const vowelRad = (glyphRadius - innerRad) / 4;
const circPos = (glyphRadius + innerRad) / 2;
const decRad = 5;

//turn polar coords to string of rectangular ones
function polar(radius, degrees) {
	const radians = degrees * Math.PI / 180;
	return [radius * Math.cos(radians), radius * Math.sin(radians)];
}

const pos120 = polar(glyphRadius, 120);
const pos300 = polar(glyphRadius, 300);
const pos345 = polar(glyphRadius, 345);

function bentLine(ctx) {
	ctx.beginPath();
	ctx.moveTo(...pos120);
	ctx.lineTo(0, 0);
	ctx.lineTo(...pos345);
	ctx.stroke();
}
function halfLine(ctx) {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(...pos345);
	ctx.stroke();
}
function fullLine(ctx) {
	ctx.beginPath();
	ctx.moveTo(...pos120);
	ctx.lineTo(...pos300);
	ctx.stroke();
}
function circ(ctx, r, θ, fill) {
	ctx.beginPath();
	ctx.arc(...polar(r, θ), decRad, 0, 2 * Math.PI);
	ctx[fill ? (ctx.fillStyle = glyphCol, "fill") : "stroke"]();
}
function arc(ctx, start, end) {
	ctx.beginPath();
	ctx.arc(0, 0, innerRad + 2, start, end);
	ctx.stroke();
}

export const decorate = [
	bentLine,
	halfLine,
	fullLine,
	ctx => {
		circ(ctx, circPos, 75);
		circ(ctx, circPos, 105);
	},
	ctx => {
		circ(ctx, circPos, 75);
		circ(ctx, circPos, 105, true);
	},
	ctx => circ(ctx, circPos, 75),
	ctx => circ(ctx, circPos, 75, true),
	ctx => {
		fullLine(ctx);
		arc(ctx, Math.PI * 5 / 3, Math.PI * 2 / 3);
	},
	ctx => {
		bentLine(ctx);
		arc(ctx, Math.PI * 23 / 12, Math.PI * 2 / 3);
	},
	ctx => {
		bentLine(ctx);
		arc(ctx, Math.PI * 2 / 3, Math.PI * 23 / 12);
	},
	ctx => circ(ctx, innerRad + decRad, Math.PI * 5 / 4)
];

export function drawArc(ctx, radius, ol, start, end) {
	start = start ? start : 0;
	end = end ? end : 2 * Math.PI;

	let currentRad = radius;
	outline[ol].forEach(thicness => {
		currentRad -= thicness / 2;

		ctx.lineWidth = thicness;

		ctx.beginPath();
		ctx.arc(0, 0, currentRad, start, end);
		ctx.fillStyle = "#fff";
		ctx.fill();
		ctx.stroke();

		currentRad -= outlineGap + thicness / 2;
	});
}

export const drawVowel = [
	(ctx, vow, con) => {
		drawArc(ctx, innerRad, con);
		ctx.save();
		ctx.rotate(Math.PI * 3 / 4);
		ctx.translate(glyphRadius, 0);
		drawArc(ctx, glyphRadius - innerRad / 2, vow);
		ctx.restore();
	},
	(ctx, vow, con) => {
		drawArc(ctx, innerRad, con);
		ctx.save();
		ctx.rotate(-Math.PI / 4);
		ctx.translate(circPos, 0);
		drawArc(ctx, vowelRad, vow);
		ctx.restore();
	},
	(ctx, vow, con) => {
		drawArc(ctx, innerRad, con);
		ctx.save();
		ctx.rotate(Math.PI / 4);
		ctx.translate(innerRad, 0);
		drawArc(ctx, vowelRad, vow);
		ctx.restore();
	},
	(ctx, vow, con) => {
		drawArc(ctx, innerRad, con);
		ctx.save();
		ctx.rotate(-Math.PI * 3 / 4);
		ctx.translate(vowelRad, 0);
		drawArc(ctx, vowelRad, vow);
		ctx.restore();
	},
	(ctx, vow, con) => {
		ctx.save();
		ctx.rotate(Math.PI / 4);
		ctx.translate(innerRad, 0);
		drawArc(ctx, vowelRad, vow);
		ctx.restore();
		drawArc(ctx, innerRad, con);
	}
]

// to be filled up outline and deco info
export const letter = [];
/**turns letter table into a list of Runes
 * with outline and decoration info
 */
[[consonantTable, false], [vowelTable, true]].forEach(([table, isVowel]) => {
	for (let outlines in table) {
		const row = table[outlines].trim().split(/\s+/);

		row.forEach((ltr, deco) =>
			letter.push(new PhoneticUnit(ltr, outlines, deco, isVowel))
		);
	}
});

// create HTML button elements laid out same as letter table
export function genKeyboard(elem, table) {
	for (let styl in table) {
		const tableRow = table[styl].trim().split(/\s+/); // turn string to array, removing white space
		const keyRow = document.createElement('div');

		tableRow.forEach(letter => {
			const keyInput = document.createElement('input');

			keyInput.type = "button";
			keyInput.value = letter;
			keyInput.onclick = () =>
				document.getElementById('text').value += letter;

			keyRow.appendChild(keyInput);
		});
		elem.appendChild(keyRow);
	}
}