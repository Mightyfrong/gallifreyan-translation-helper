import { π } from '../utils/funcs.js';
import { glyphRadius } from './TardisGlyph.js';

const wordBorder = 5;
export const margin = 5;

export class TardisWord {
	constructor(glyphs) {
		this.glyphs = glyphs;

		this.glyphAngle = 2 * π / glyphs.length;

		const rFactor = glyphs.length > 2 ?
			1 / Math.sin(this.glyphAngle / 2) :
			glyphs.length - 1;

		this.glyphPos = rFactor * (glyphRadius + margin);
		this.radius = this.glyphPos + glyphRadius + margin + wordBorder / 2;
	}

	render(ctx) {
		const r = this.radius;
		ctx.drawShape('circle', wordBorder, { r });

		this.glyphs.forEach((glyph, i) => {
			const angle = i * this.glyphAngle;
			const rad = this.glyphPos;
			const gx = rad * Math.sin(angle);
			const gy = -rad * Math.cos(angle);
			ctx.translate(gx, gy);
			glyph.render(ctx);
			ctx.translate(-gx, -gy);
		});
	}
}