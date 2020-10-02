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
		ctx.rotate(-Math.PI / 2);

		this.glyphs.forEach((glyph, i) => {
			let rad = this.glyphPos;

			if (glyph.consonant.clipped)
				rad += glyphRadius / 2 + margin;

			const angle = i * this.glyphAngle;

			const [gx, gy] = polar(rad, angle);

			ctx.save();
			ctx.translate(gx, gy);

			glyph.render(ctx);
			ctx.restore();
		});

		const r = this.radius;
		ctx.drawShape('circle', wordBorder, { r, fill: "none" });
		ctx.restore();
	}
}