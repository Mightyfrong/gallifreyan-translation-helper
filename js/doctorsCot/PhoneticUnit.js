import { outlineSpace } from "./setup.js";

export class PhoneticUnit {
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

			currentRad -= outlineSpace + thicness / 2;
		});
	}
}