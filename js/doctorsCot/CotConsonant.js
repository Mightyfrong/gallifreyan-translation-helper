export class CotConsonant{
	constructor(ol, d) {
		this.outlines = ol;
		this.deco = d;
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