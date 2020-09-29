import { CLIPPED } from './parsing/TardisConsonant.js';

export const glyphRadius = 50

export class TardisGlyph {
	constructor(con, vow = null) {
		this.consonant = con;
		this.vowel = vow;

		this.clipped = con && con.modifier == CLIPPED;

		this.toString = "";
		if (con) this.toString += con.toString;
		if (vow) this.toString += vow.toString;
	}

	render(ctx) {
		if (this.consonant) {
			this.consonant.render(ctx);
			if (this.vowel) {
				//this.vowel.render(ctx);
			}
		} else {
			const x1 = -glyphRadius;
			const y1 = -x1;
			const x2 = glyphRadius * Math.SQRT1_2;
			const y2 = -x2;
			ctx.drawShape('line', 2, { x1, y1, x2, y2 });

			let pos = -glyphRadius;
			[1, 2, 3].forEach(i => {
				const r = 7.5 * i;
				pos += r;
				const cx = pos * Math.SQRT1_2;
				const cy = -cx;
				ctx.drawShape('circle', 2, { cx, cy, r }, true);
				pos += r + 5;
			});
		}
		/*if (this.vowel)
				this.vowel.draw(ctx, this.consonant.vowelData);
		}
		else {
			ctx.translate(-50, 0);
			[1, 2, 3].forEach(i => {

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
		 */
	}
}