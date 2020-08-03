export class IPALetter{
	constructor(str, out, dec, vow) {
		this.toString = str;

		this.outlines = out;
		this.decoration = dec;

		this.isVowel = vow;
	}

	draw(ctx, pos, rad, noDeco) {
		let currentRad = rad;
		this.outlines.forEach(thicness => {
			currentRad -= thicness/2;

			ctx.lineWidth = thicness;
			ctx.beginPath();
			ctx.arc(pos, pos, currentRad, 0, 2 * Math.PI);
			ctx.stroke();

			currentRad -= 1 + thicness/2;
		});
	}
}