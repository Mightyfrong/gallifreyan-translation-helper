import { π } from '../utils.js';

export class TardisGlyph {
	constructor(con, vow = null) {
		this.consonant = con;
		this.vowel = vow;

		this.toString = "";
		if (con) this.toString += con.toString;
		if (vow) this.toString += vow.toString;
	}

	draw(ctx) {
		if (this.consonant) {
			this.consonant.draw(ctx)
			if (this.vowel)
				this.vowel.draw(ctx, this.consonant.vowelData);
		}
		else {
			// Draw Aleph
			ctx.save();
			ctx.rotate(-π / 4);
			ctx.beginPath();

			ctx.save();
			ctx.moveTo(-50 * Math.SQRT2, 0);
			ctx.translate(-50, 0);
			ctx.lineTo(0, 0);
			[1, 2, 3].forEach(i => {
				const r = 7.5 * i;
				ctx.translate(r, 0);
				ctx.moveTo(r, 0);
				ctx.arc(0, 0, r, 0, 2*π);
				ctx.translate(r + 5, 0);
				ctx.lineTo(0, 0);
			});
			ctx.restore();
			ctx.lineTo(50 * Math.SQRT2, 0);

			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.restore();
		}
	}
}