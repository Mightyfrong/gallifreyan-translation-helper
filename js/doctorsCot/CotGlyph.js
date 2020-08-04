import { decorate, outlineSpace } from "./setup.js"

export class CotGlyph {
	constructor(out, inn, vow) {
		this.outer = out;
		this.inner = inn || null;
		this.vowel = vow || null;

		const [a, b] = out.outlines;
		this.thicness = b? a + outlineSpace + b/2: a/2;

		this.toString = this.outer.toString;
		if (this.inner) this.toString += this.inner.toString;
		if (this.vowel) this.toString += this.vowel.toString;
	}

	draw(ctx, radius) {
		ctx.fillStyle = '#fff';
		this.outer.drawOutlines(ctx, radius);

		ctx.lineWidth = 1;
		decorate[this.outer.decoration](ctx);

		const innerRad = radius/5;
		if (this.inner) {
			ctx.save();
			ctx.rotate(Math.PI / 2);

			decorate[this.inner.decoration](ctx);
			ctx.restore();

			this.inner.drawOutlines(ctx, innerRad);
		} else
			this.outer.drawOutlines(ctx, innerRad);
	}
}
