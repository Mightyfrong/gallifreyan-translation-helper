import { polar } from '../../utils.js';
import { glyphRadius } from '../TardisGlyph.js';

export const consonants = {
	B: `;${dentedCircle(44.5, "24.5 -60 0 0")};${circle(49)}|N;-30;20;35`,
	C: `;${dentedCircle(44.5, "24.5 -60 0 0", "22 30 90 0")};${circle(49)}|N;-30;20;35`,
	CH: `;${dentedCircle(44.5, "19.5 -165 -120 0", "24.5 -60 0 0", "22 30 90 0")};${circle(49)}|N;-30;20;35`,
	D: `;${letterR()};${circle(49)}|N;-30;20;35`,
	F: `;${circles(22.5, 49.5, 3)};${circle(20)}|N;-30;20;35`,
	G: `;${ellipses(24.5, 49.5)};${ellipse(20)}|S;-30;3;35`,
	H: `;${circles(15, 35)};${circle(10)}|N;-30;5;35`,
	J: `;${circles(25, 45)};${circle(20)}|N;-30;12;35`,
	K: `;${hexagon(39.5)};${hexagon(49)}|N;-30;20;35`,
	L: `;${hexagon(35) + hexLegs(35)};${hexagon(45)}|N;-30;20;35`,
	M: `;${hexagon(30) + hexLegs(40)};${hexagon(40)}|N;-30;20;30`,
	N: `;${circles(42.5, 45)};${circle(49)}|N;-30;20;45`,
	P: `;;${circles(40, 49, 9)}|N;-30;20;45`,
	Q: `;;${circle(49) + deltoid(49)}|N;-30;3;35`,
	NG: `;${circles(42.5, 45) + ellipses(15, 42.5, 12)};${circle(49) + ellipse(10, 12)}|N;-30;20;35`,
	QU: `;${circle(45)};${circle(49) + deltoid(45)}|N;-30;3;35`,
	R: `;;${letterR()}|N;-30;20;35`,
	S: `;;${dentedCircle(44.5, "14.5 -160 -140 1", "44.5 -105 -45 0", "9.5 -15 15 0", "14.5 45 85 0", "29.5 95 170 0")}|N;0;20;40`,
	SH: `${dentedCircle(44.5, "14.5 -160 -140 1", "24.5 -60 0 0", "14.5 40 85 0")}|I;-30;20;35`,
	T: `;;${circle(30)};${circle(20)}|N;-30;20;35`,
	TH: `${circle(25)};;${circle(45)}|I;-30;20;35`,
	V: `;;${circles(44, 49, 5)}M${polar(49, -75)}L${polar(49, 105)}M${polar(39, -75)}A39,39 0 0 1 ${polar(39, 105)}|N;-30;20;45`,
	W: `;;${circle(49)}M${polar(49, -75)}L${polar(44, -75)}A44,44 0 0 0 ${polar(44, 105)}L${polar(49, 105)}|N;-30;20;35`,
	X: `;${circle(45)};${circles(36, 49, 13)}|N;-30;20;42`,
	Y: `;${hexagon(30) + hexagon(32.5) + hexagon(35)};${hexagon(39) + circle(44)}|S;-22;10;32`,
	Z: `;${hexagon(30) + hexagon(32.5) + hexagon(35) + hexLegs(35, 49.5)};${hexagon(39) + circle(44)}|S;-22;10;32`,
	PH: `;${circles(12.5, 30)};${circles(39, 49, 10)}|N;-30;20;45`,
};

function letterR() {
	return dentedCircle(44.5, "19.5 -165 -120 0", "24.5 -60 0 0", "22 30 90 0", "14.5 135 165 1");
}

function circle(r) {
	const r0 = [r, 0];
	const rr001 = [r, r] + ' 0 0 1';
	return `M${r0}A${rr001} -${r0} ${rr001} ${r0}`
}
function circles(start, end, step) {
	end = end || start;
	step = step || 2.5;

	let pathString = "";
	for (let r = start; r <= end; r += step)
		pathString += circle(r);

	return pathString;
}
function dentedCircle(mainRadius, ...dentStrings) {
	const dentPaths = dentStrings.map(str => {
		const [r, s, e, largeArc] = str.split(' ');

		const start = polar(mainRadius, s);
		const end = polar(mainRadius, e);

		const rr0a0 = [r, r] + ` 0 ${largeArc} 0`;

		return start + `A${rr0a0} ` + end;
	})

	const rr001 = [mainRadius, mainRadius] + ' 0 0 1';
	const pathData = dentPaths.reduce(
		(acc, dent) => acc + `A${rr001} ` + dent
	);

	const pathStart = dentStrings[0].split(' ')[1];
	const pathEnd = dentStrings[dentStrings.length - 1].split(' ')[2];

	const largeArc = pathEnd - pathStart < 180 ? 1 : 0;
	const rr0a1 = [mainRadius, mainRadius] + ` 0 ${largeArc} 1`;

	return `M${pathData}A${rr0a1} ` + polar(mainRadius, pathStart);
}
function ellipse(rx, y) {
	y = y || 0;
	const ry = rx / 2;
	const rxry = [rx, ry];
	const rxy = [rx, y];
	const rr001 = rxry + " 0 0 1";
	return `M${rxy}A${rr001} -${rxy} ${rr001} ` + rxy
}
function ellipses(s0, s1, y) {
	y = y || 0;
	let str = "";
	for (let s = s0; s <= s1; s += 2.5) {
		str += ellipse(s, y);
		y--;
	}
	return str;
}
function hexagon(s) {
	let str = "M" + [s, 0];
	for (let i = 1; i < 6; i++)
		str += "L" + polar(s, 60 * i);
	return str + "Z";
}
function hexLegs(start) {
	let str = "";
	for (let i = 0; i < 6; i++) {
		const a = polar(start, 60 * i);
		const b = polar(50, 60 * i);
		str += "M" + a + "L" + b;
	}
	return str;
}

function deltoid(r) {
	const p0 = polar(r, 15);

	const R = r * Math.sqrt(3);
	const RR001 = [R, R] + " 0 0 1 ";

	const arcs = [1, 2, 3].map(i => {
		const p = polar(r, 15 - 120 * i);
		return RR001 + p;
	}).reduce(
		(a, b) => a + " " + b
	);

	return "M" + p0 + "A" + arcs;
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
