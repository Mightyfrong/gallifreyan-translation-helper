import { decorate, drawVowel } from "./setup.js"

export class CotGlyph {
	constructor(cons1, cons2 = null, vowel = null) {
		this.outer = cons1;
		this.inner = cons2;
		this.vowel = vowel;

		if (this.outer.toString != "א") {
			this.toString = this.outer.toString;
			if (this.inner) this.toString += this.inner.toString;
			if (this.vowel) this.toString += this.vowel.toString;
		} else {
			this.toString = this.vowel.toString;
			if (this.inner) this.toString += this.inner.toString;
		}
	}

	draw(ctx) {
		ctx.save();

		this.outer.drawOutlines(ctx);
		/*
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
		*/
		ctx.restore();
	}
}

/**Copyright 2020 Mightyfrong, erroronline1, ModisR
 *
 * This file is part of the Gallifreyan Translation Helper,
 * henceforth referred to as "the GTH".
 *
 * The GTH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The GTH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with the GTH.  If not, see <https://www.gnu.org/licenses/>.
 */