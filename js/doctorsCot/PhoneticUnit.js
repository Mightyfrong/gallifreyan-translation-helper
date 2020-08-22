import { drawArc, glyphRadius, innerRad } from "./setup.js";

export class PhoneticUnit {
	constructor(str, out, dec, vow) {
		this.toString = str;

		this.outlines = out;
		this.decoration = dec;

		this.isVowel = vow;
	}

	drawOutlines(ctx, isInner) {
		drawArc(ctx, isInner ? innerRad : glyphRadius, this.outlines);
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