export class TardisGlyph {
	constructor(con, vow = null) {
		this.consonant = con;
		this.vowel = vow;

		this.toString = "";
		if(con) this.toString += con.toString;
		if(vow) this.toString += vow.toString;
	}

	draw(ctx) {
		if (this.consonant) {
			this.consonant.draw(ctx)
			if (this.vowel)
				this.vowel.draw(ctx, this.consonant.vowelData);
		}
	}
}