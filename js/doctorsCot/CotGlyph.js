import { PhoneticUnit } from "./PhoneticUnit.js";

export class CotGlyph {
	constructor(out, inn, vow) {
		this.outer = out;
		this.inner = inn || null;
		this.vowel = vow || null;

		const [a, b] = out.outlines;
		this.thicness = b? a + PhoneticUnit.olSpace + b/2: a/2;

		this.toString = this.outer.toString;
		if (this.inner) this.toString += this.inner.toString;
		if (this.vowel) this.toString += this.vowel.toString;
	}

	draw(ctx, radius, textSpace) {
		ctx.fillStyle = '#444';
		ctx.fillText(this.toString, 0, - radius - textSpace / 2);

		ctx.fillStyle = '#fff';
		this.outer.drawOutlines(ctx, radius);

		const decoRadius = radius - this.thicness;
		this.outer.drawDecoration(ctx, decoRadius);

		const innerRad = radius/5;
		if (this.inner) {
			ctx.save();
			ctx.rotate(Math.PI / 2);

			this.inner.drawDecoration(ctx, decoRadius);
			ctx.restore();

			this.inner.drawOutlines(ctx, innerRad);
		} else
			this.outer.drawOutlines(ctx, innerRad);
	}
}