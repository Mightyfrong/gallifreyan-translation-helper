import { drawArc, glyphRadius, innerRad } from "./setup.js";

export class PhoneticUnit {
	constructor(str, out, dec, vow) {
		this.toString = str;

		this.outlines = out;
		this.decoration = dec;

		this.isVowel = vow;
	}

	drawOutlines(ctx, isInner) {
		drawArc(ctx, isInner ? innerRad : glyphRadius, this.outlines);
	}
}