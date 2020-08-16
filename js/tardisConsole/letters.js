import { polar } from "../utils.js";

export const letters = {
	a: circle(9.5)+`;;M${polar(60, 150)}L${polar(60, 330)}`,
	b: `;${dentedCircle(44.5, "24.5 -60 0 0")};${circle(49)}`,
	c: `;${dentedCircle(44.5, "24.5 -60 0 0", "22 30 90 0")};${circle(49)}`,
	ch: `;${dentedCircle(44.5, "19.5 -165 -120 0", "24.5 -60 0 0", "22 30 90 0")};${circle(49)}`,
	d: `;${fourDentCircle()};${circle(49)}`,
	e: ``,
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
	r: `;;`+fourDentCircle(),
	s: `;;`+dentedCircle(44.5, "9.5 -180 -150 1", "44.5 -105 -45 0", "9.5 -15 15 0", "14.5 45 85 0", "24.5 95 170 0"),
	sh: dentedCircle(44.5, "14.5 -160 -140 1", "24.5 -60 0 0", "14.5 40 85 0")+`;;`,
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
	"": "",
	" ": ""
};

function fourDentCircle() {
	return dentedCircle(44.5, "19.5 -165 -120 0", "24.5 -60 0 0", "22 30 90 0", "14.5 135 165 1");
}

function circle(r) {
	const r0 = r + ',0';
	const rr001 = r + ',' + r + ' 0 0 1';
	return `M${r0}A${rr001} -${r0} ${rr001} ${r0}`
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
	const pathEnd = dentStrings[dentStrings.length-1].split(' ')[2];

	const largeArc = pathEnd - pathStart < 180? 1: 0;
	const rr0a1 = [mainRadius,mainRadius]+` 0 ${largeArc} 1`;

	return `M${pathData}A${rr0a1} `+polar(mainRadius, pathStart);
}