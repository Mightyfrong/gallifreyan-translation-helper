import { polar } from '../utils/funcs.js';
import { glyphRadius, margin, wordBorder } from './parsing/constants.js';

export class TardisWord {
	constructor(glyphs) {
		this.glyphs = glyphs;

		this.glyphAngle = 2 * Math.PI / glyphs.length;

		const rFactor = glyphs.length > 2 ?
			1 / Math.sin(this.glyphAngle / 2) :
			glyphs.length - 1;

		this.glyphPos = rFactor * (glyphRadius + margin);
		this.radius = this.glyphPos + glyphRadius + margin + wordBorder / 2;
	}

	render(ctx) {
		ctx.save();

		this.glyphs.forEach((glyph, i) => {
			let glyphPos = this.glyphPos;

			if (glyph.consonant.clipped)
				glyphPos += glyphRadius / 2 + margin;

			ctx.save();
			ctx.translate(0, -glyphPos);
			ctx.rotate(-i * this.glyphAngle);

			glyph.render(ctx);
			ctx.restore();
			ctx.rotate(this.glyphAngle);
		});

		const r = this.radius;
		ctx.drawShape('circle', wordBorder, { r, fill: "none" });
		ctx.restore();
	}
}