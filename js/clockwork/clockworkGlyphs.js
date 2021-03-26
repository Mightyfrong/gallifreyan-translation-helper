import {
	includes,
} from '../utils/funcs.js';
import {
	cwConsonants
} from './setup.js';

export class clockworkConsonants {
	constructor() {
		this.glyphs= {
			b: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			d: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			f: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			g: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ʒ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			h: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ʤ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			k: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			l: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			m: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			n: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			p: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			kw: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ɹ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			s: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			t: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			v: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			w: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ks: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			j: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			z: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ʧ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ŋ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ʃ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			θ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			},
			ð: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}
		}
	}
	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let keys = [];
		Object.keys(this.glyphs).forEach(key => {
			keys.push([key,key]);
		});
		return keys;
	}
}

export class clockworkVowels {
	constructor() {
		this.glyphs = {
			i: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ai: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, aʊ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, u: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ɛ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ɜ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ʌ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ɔ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ɪ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, eɪ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, oʊ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ʊ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, æ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ə: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ɑ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, ɒ: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, e: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, o: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}, a: {
				draw: function (ctx, x, y, r) {
					return;
				}
			}
		};
	}

	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let keys = [];
		Object.keys(this.glyphs).forEach(key => {
			keys.push([key,key]);
		});
		return keys;
	}
}


/**Copyright 2020-2021 Mightyfrong, erroronline1, ModisR
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