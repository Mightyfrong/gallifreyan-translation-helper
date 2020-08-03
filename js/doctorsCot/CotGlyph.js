export class CotGlyph {constructor(out, inn, vow) {
		this.outer = out;
		this.inner = inn || null;
		this.vowel = vow || null;

		this.toString = this.outer.toString;
		if(this.inner) this.toString += this.inner.toString;
		if(this.vowel) this.toString += this.vowel.toString;
	}

	draw(ctx, radius, textSpace) {
		this.outer.draw(ctx, CotGlyph.radius, CotGlyph.radius);

		/**draw second consonant if exists
		 * else draw outer one without decoration
		 */
		if(this.inner)
			this.inner.draw(ctx, CotGlyph.radius, CotGlyph.radius/2);
		else
			this.outer.draw(ctx, CotGlyph.radius, CotGlyph.radius/2, true);
	}
}
