import { decorate, drawVowel } from "./setup.js"

export class CotGlyph {
	constructor(cons1, cons2, vowel) {
		this.outer = cons1;
		this.inner = cons2 || null;
		this.vowel = vowel || null;

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
			if (this.inner) {
				ctx.save();
				ctx.rotate(Math.PI / 2);
				ctx.lineWidth = 1;
				decorate[this.inner.decoration](ctx);
				ctx.restore();

				drawVowel[this.vowel.decoration](ctx, this.vowel.outlines, this.inner.outlines);
			} else
				drawVowel[this.vowel.decoration](ctx, this.vowel.outlines, this.outer.outlines);
		} else {
			if (this.inner) {
				ctx.save();
				ctx.rotate(Math.PI / 2);
				ctx.lineWidth = 1;
				decorate[this.inner.decoration](ctx);
				ctx.restore();

				this.inner.drawOutlines(ctx, true);
			} else
				this.outer.drawOutlines(ctx, true);
		}
		ctx.restore();
	}
}
