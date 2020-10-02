import { deg2rad, polar, range } from '../../utils/funcs.js';
import { glyphRadius } from './constants.js';

const outerRad = glyphRadius - 1;
const innerRad = outerRad - 3.5;
const outerCirc = `circle;2;r=${outerRad}|`;

const N = outerCirc + circles(innerRad, 11.5);
const K = hexagon(outerRad, 2) + "|" + hexagon(innerRad, 1);

export const consonants = {
	B: outerCirc + `${dentedCircle(1, 13.5, "7 -30 1")}_N;-30;6;12`,
	C: outerCirc + `${dentedCircle(1, 13.5, "7 -30 1,8 60 0")}_N;-30;20;35`,
	CH: outerCirc + `${dentedCircle(1, 13.5, "7 -30 1,8 60 0,4 220 1")}_N;-30;20;35`,
	D: outerCirc + `${fourDents(1)}_N;-30;20;35`,
	F: `${circles(17.5, 9.5)}|circle;2;r=7_N;-30;20;35`,
	G: ellipses(17.5, 11.5, 5) + `|ellipse;2;rx=7;ry=3;cy=3_S;-30;3;35`,
	H: `${circles(11.5, 7.5)}|circle;2;r=5_N;-30;5;35`,
	J: `${circles(14.5, 8.5)}|circle;2;r=6_N;-30;12;35`,
	K: K + "_N;-30;20;35",
	L: K + hexLegs(13.5) + "_N;-30;20;35",
	M: hexagon(13, 2) + "|" + hexagon(9.5, 1) + hexLegs(13) + "_N;-30;20;30",
	N: N + "_N;-30;20;45",
	P: outerCirc + `circle;2;r=12_N;-30;20;45`,
	Q: outerCirc + deltoid(17) + "_N;-30;3;35",
	NG: N + `|ellipse;2_N;-30;20;35`,
	QU: outerCirc + `circle;1;r=13.5|${deltoid(13)}_N;-30;3;35`,
	R: `${fourDents(2)}_N;-30;20;35`,
	S: `${dentedCircle(2, 15, "6.5 -225 0,3.5 -165 -2,9 -75 -2,2 0 0,5 60 0")}_N;0;20;40`,
	SH: `${dentedCircle(0, 14, "4 -150 -3,6.5 -30 0,5 60 0")}_I;-30;20;35`,
	T: `circle;2;r=11.5|circle;3;r=7_N;-30;20;35`,
	TH: outerCirc + `circle;0;r=11_I;-30;20;35`,
	/*
	V: `${circles(44, 49, 5)}M${polar(49, -75)}L${polar(49, 105)}M${polar(39, -75)}A39,39 0 0 1 ${polar(39, 105)}|N;-30;20;45`,
	W: `;;${circle(49)}M${polar(49, -75)}L${polar(44, -75)}A44,44 0 0 0 ${polar(44, 105)}L${polar(49, 105)}|N;-30;20;35`,
	*/
	X: outerCirc + `circle;1;r=${innerRad}|circle;2;r=${innerRad - 5.5}_N;-30;20;42`,
	/*
	Y: `;${hexagon(30) + hexagon(32.5) + hexagon(35)};${hexagon(39) + circle(44)}|S;-22;10;32`,
	Z: `;${hexagon(30) + hexagon(32.5) + hexagon(35) + hexLegs(35, 49.5)};${hexagon(39) + circle(44)}|S;-22;10;32`,*/
	PH: outerCirc + `circle;2;r=12.5|${circles(8.5, 2.5)}_N;-30;20;45`
	/*,
	Aleph: `line_2_x1=${-50 * Math.SQRT1_2}_y1=${50 * Math.SQRT1_2}_x2=-50_y2=50|Aleph`
	*/
};

function fourDents(strokeWidth) {
	return dentedCircle(strokeWidth, 13.5, "4 -140 1,7 -30 1,8 60 0,4 150 -3");
}
function circles(r0, r1) {
	const n = 1 + (r0 - r1) / 2;
	return range(n).map(
		i => `circle;1;r=${r0 - 2 * i}`
	).join("|");
}
function dentedCircle(strokeWidth, R, dentString) {
	const dentStrings = dentString.split(",")
	let pathStart, pathEnd;

	const dentPaths = dentStrings.map((str, idx) => {
		const [r, ang, p] = str.split(' ').map(str => str * 1);
		const A = deg2rad(ang);
		const dA = Math.acos(1 + (p * p - r * r) / (2 * R * (R + p)));
		
		const start = polar(R, A - dA);
		const end = polar(R, A + dA);

		if (idx == 0) pathStart = A - dA;
		if (idx == dentStrings.length - 1) pathEnd = A + dA;

		const largeArc = R * (Math.cos(dA) - 1) > p ? 1 : 0;

		return start + `A${[r, r]} 0 ${largeArc} 0 ` + end;
	})

	const rr001 = [R, R] + ' 0 0 1';
	const pathData = dentPaths.reduce(
		(acc, arcInstruc) => acc + `A${rr001} ` + arcInstruc
	);

	const largeArc = pathEnd - pathStart < Math.PI ? 1 : 0;
	const rr0a1 = [R, R] + ` 0 ${largeArc} 1`;

	return `path;${strokeWidth};d=M${pathData}A${rr0a1} ${polar(R, pathStart)}Z`;
}

function ellipses(rx0, ry0, n) {
	return range(n).map(i => {
		const rx = rx0 - 2 * i;
		const ry = ry0 - 1.5 * i;
		const cy = 0.75 * i;
		return `ellipse;1;rx=${rx};ry=${ry};cy=${cy}`;
	}).join("|");
}

function hexagon(size, strokeWidth) {
	const points = range(6).map(
		i => polar(size, 2 * Math.PI * i / 6)
	).join(" ");
	return `polygon;${strokeWidth};points=${points}`;
}
function hexLegs(startPos) {
	return range(6).map(i => {
		const angle = 2 * Math.PI * i / 6;
		const [x1, y1] = polar(startPos, angle);
		const [x2, y2] = polar(outerRad, angle);
		return `|line;1;x1=${x1};y1=${y1};x2=${x2};y2=${y2}`
	}).join("");
}

function deltoid(r) {
	const p0 = polar(r, deg2rad(15));

	const R = r * Math.sqrt(3);
	const RR001 = [R, R] + " 0 0 1 ";

	const arcs = [1, 2, 3].map(i =>
		RR001 + polar(r, deg2rad(15 - 120 * i))
	).join(" ");

	return `path;2;d=M${p0}A${arcs}Z`;
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
