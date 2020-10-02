export class TardisGlyph {
	constructor(con, vow = null) {
		this.consonant = con; // placeholder "Aleph" if none
		this.vowel = vow;

		this.toString = con.toString;
		if (vow) this.toString += vow.toString;
	}

	render(ctx) {
		this.consonant.render(ctx);
		if (this.vowel) {
			this.vowel.render(ctx, this.consonant.vowData);
		}
	}
}