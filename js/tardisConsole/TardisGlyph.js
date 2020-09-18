import { π, color } from '../utils.js';

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
			this.consonant.draw(ctx);
			if (this.vowel)
				this.vowel.draw(ctx, this.consonant.vowelData);
		}
		else {
			// Draw Aleph
			ctx.save();
			ctx.rotate(-π / 4);
			ctx.fillStyle = color.background;
			ctx.lineWidth = 2;

			ctx.beginPath();
			ctx.moveTo(-50 * Math.SQRT2, 0);
			ctx.lineTo(50, 0);
			ctx.stroke();

			ctx.translate(-50, 0);
			[1, 2, 3].forEach(i => {
				const r = 7.5 * i;
				ctx.translate(r, 0);

				ctx.beginPath();
				ctx.arc(0, 0, r, 0, 2 * π);
				ctx.fill();
				ctx.stroke();

				ctx.save();
				switch (this.vowel.toString) {
					case 'A':
						ctx.beginPath();
						ctx.moveTo(-r, 0);
						ctx.lineTo(r + 50 * (Math.SQRT2 - 1), 0);
						ctx.stroke();
					case 'O':
						ctx.fillStyle = color.foreground;
						ctx.beginPath();
						ctx.arc(0, 0, r / 2, 0, 2 * π);
						ctx.fill();
						break;
					case 'U':
						ctx.fillStyle = color.foreground;
					case 'I':
						ctx.translate(0, r / 2);
					case 'E':
						ctx.lineWidth = 1;
						ctx.translate(0, r / 2);
						ctx.beginPath();
						ctx.arc(0, 0, 2.5, 0, 2 * π);
						ctx.fill();
						ctx.stroke();
				}
				ctx.restore();

				ctx.translate(r + 5, 0);
			});

			ctx.restore();
		}
	}
}