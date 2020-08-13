import { decorate, outlineGap, drawArc, drawVowel } from "./setup.js"

export class CotGlyph {
	constructor(out, inn, vow) {
		this.outer = out;
		this.inner = inn || null;
		this.vowel = vow || null;

		const [a, b] = out.outlines;
		this.thicness = b ? a + outlineGap + b / 2 : a / 2;

		this.toString = this.outer.toString;
		if (this.inner) this.toString += this.inner.toString;
		if (this.vowel) this.toString += this.vowel.toString;
	}

	draw(ctx) {
		ctx.save();
		this.outer.drawOutlines(ctx);
		ctx.clip();

		ctx.save();
		ctx.lineWidth = 1;
		decorate[this.outer.decoration](ctx);
		ctx.restore();

		if (this.vowel) {
			const innerCons = this.inner || this.outer;
			drawVowel[this.vowel.decoration](ctx, this.vowel.outlines, innerCons.outlines);
		} else {
			if (this.inner) {
				ctx.save();
				ctx.rotate(Math.PI * 2 / 3);

				decorate[this.inner.decoration](ctx);
				ctx.restore();

				this.inner.drawOutlines(ctx, true);
			} else
				this.outer.drawOutlines(ctx, true);
		}
		ctx.restore();
	}
}
