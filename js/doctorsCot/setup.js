import { color, polar } from '../utils.js';
import { PhoneticUnit } from './PhoneticUnit.js';

export const consonantTable = [
	" j ts ŋ v ʤ f  ʒ ɢ  ç ɬ ʎ",
	" n  h l p w ʧ st ɴ  ð ɮ ß",
	" t  s ɹ d m ʃ  θ q  ʝ ʋ x",
	"ks  k z b א g  r ɻ  ɣ ɰ  ",
	" χ  ɲ ɳ ʈ ɖ c  ɟ ħ  ɭ ɸ  ",
	" ʁ  ʙ ʀ ⱱ ɾ ɽ  ʂ ʐ fi ʟ  "
]
export const vowelTable = [
	"ɑ  i  u a y",
	"e  ɪ ou æ ʉ",
	"ɛ ai  ʌ ɜ ø",
	"ʊ  ɘ  ɐ ɤ ɵ",
	"ɯ  ɨ  ə ɔ o",
	"œ  ɞ  ɒ ɶ  "
];

const outline = [
	[1],
	[1, 1],
	[2],
	[2, 1],
	[2, 2],
	[1, 2]
];

export const glyphRadius = 50;
export const innerRad = glyphRadius * 2 / 5;

export const outlineGap = 1;

const vowelRad = (glyphRadius - innerRad) / 3;
const circPos = (glyphRadius + innerRad) / 2;
const decRad = 5;

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
	ctx[fill ? (ctx.fillStyle = color.foreground, "fill") : "stroke"]();
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
		ctx.fillStyle = color.background;
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
		ctx.translate(innerRad - vowelRad, 0);
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
export const letterMap = new Map;
/**turns letter table into a list of Runes
 * with outline and decoration info
 */
[[consonantTable, false], [vowelTable, true]].forEach(([table, isVowel]) => {
	table.forEach((row, outlines) => {
		const tableRow = row.trim().split(/\s+/);

		tableRow.forEach((ltr, deco) =>
			letterMap.set(ltr, new PhoneticUnit(ltr, outlines, deco, isVowel))
		);
	});
});

// create HTML button elements laid out same as letter table
export function genKeyboard(elem, table) {
	table.forEach(row => {
		const tableRow = row.trim().split(/\s+/); // turn string to array, removing white space
		const keyRow = document.createElement('div');

		tableRow.forEach(letter => {
			const keyInput = document.createElement('input');

			keyInput.type = "button";
			keyInput.value = letter;
			keyInput.onclick = () => {
				let input = document.getElementById('text');
				const pos0 = input.selectionStart;
				const pos1 = input.selectionEnd;
				const val = input.value;
				input.value = val.slice(0, pos0) + letter + val.slice(pos1);
				input.focus();
				input.selectionStart = input.selectionEnd = pos0 + letter.length;
			}

			keyRow.appendChild(keyInput);
		});
		elem.appendChild(keyRow);
	});
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