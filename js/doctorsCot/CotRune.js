import {CotConsonant} from './CotConsonant.js'

export class CotRune {
	static width = 100;
	static radius = CotRune.width/2;

	constructor(out, inn, vow) {
		this.outer = out;
		this.inner = inn || null;
		this.vowel = vow || null;
	}

	draw(ctx) {
		this.outer.draw(ctx, CotRune.radius, CotRune.radius);

		/**draw second consonant if exists
		 * else draw outer one without decoration
		 */
		if(this.inner)
			this.inner.draw(ctx, CotRune.radius, CotRune.radius/2);
		else
			this.outer.draw(ctx, CotRune.radius, CotRune.radius/2, true);
	}
}
