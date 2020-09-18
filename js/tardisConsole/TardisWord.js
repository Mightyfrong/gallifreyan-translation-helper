import { π } from '../utils.js';

export const glyphRadius = 50
export const margin = 5;

export class TardisWord {
	constructor(glyphs) {
		this.glyphs = glyphs;

		this.angle = π / glyphs.length;

		const rFactor = glyphs.length <= 2 ?
			glyphs.length :
			1 + 1 / Math.sin(this.angle);

		this.radius = rFactor * (glyphRadius + margin);
		this.glyphPos = this.radius ;
	}

	render(ctx) {
		ctx.save();

		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(0, 0, this.radius, 0, 2 * π);
		ctx.stroke();
		ctx.clip();

		const glyphPos = this.radius - margin - glyphRadius;

		this.glyphs.forEach((glyph, i) => {
			ctx.save();
			ctx.translate(0, -glyphPos);

			ctx.rotate(-2 * i * this.angle);
			glyph.draw(ctx);

			ctx.restore();
			ctx.rotate(2 * this.angle);
		});
		ctx.restore();
	}
}