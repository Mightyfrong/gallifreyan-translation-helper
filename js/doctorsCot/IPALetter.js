export class IPALetter {
	constructor(str, out, dec, vow) {
		this.toString = str;

		this.outlines = out;
		this.decoration = decoration[dec];

		this.isVowel = vow;
	}
}

const decoration = [
	r => {
		const pos0 = polar(r, 120);
		const pos1 = polar(r, -15);
		return `M${pos0} L0 0 L${pos1}`;
	},
	r => {
		const pos0 = polar(r, -60);
		return `M0 0 L${pos0}`;
	},
	r => {
		const pos0 = polar(r, -60);
		const pos1 = polar(r, 120);
		return `M${pos0} L${pos1}`;
	},
	r => "",
	r => "",
	r => "",
	r => "",
	r => {
		const pos0 = polar(r, -60);
		const pos1 = polar(r, 120);
		return `M${pos0} L${pos1}`;
	},
	r => {
		const pos0 = polar(r, 120);
		const pos1 = polar(r, -15);
		return `M${pos0} L0 0 L${pos1}`;
	},
	r => {
		const pos0 = polar(r, 120);
		const pos1 = polar(r, -15);
		return `M${pos0} L0 0 L${pos1}`;
	},
	r => ""
];

//turn polar coords to string of rectangular ones
function polar(radius, degrees) {
	const radians = degrees * Math.PI / 180;
	return radius * Math.cos(radians) + " " + radius * Math.sin(radians);
}