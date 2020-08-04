import {decoration} from './setup.js';

export class PhoneticUnit {
	static olSpace = 1;

	constructor(str, out, dec, vow) {
		this.toString = str;

		this.outlines = out;
		this.decoration = dec;

		this.isVowel = vow;
	}

	drawOutlines(ctx, radius) {
		let currentRad = radius;

		this.outlines.forEach(thicness => {
			currentRad -= thicness / 2;

			ctx.lineWidth = thicness;

			ctx.beginPath();
			ctx.arc(0, 0, currentRad, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();

			currentRad -= PhoneticUnit.olSpace + thicness / 2;
		});
	}

	drawDecoration(ctx, radius) {
		const desc = decoration[this.decoration](radius);
		const path = new Path2D(desc);
		ctx.lineWidth = 1;
		ctx.stroke(path);
	}
}