import {
	keyboard
} from '../main.js'
import {
	cotConsonants,
	cotVowels
} from './glyphs.js';

export const glyphSize = 50; // radius of glyphs
export const dc2Consonants = new cotConsonants();
export const dc2Vowels = new cotVowels();

export function createKeyboard() {
	document.getElementById('dcconsonants').innerHTML = document.getElementById('dcvowels').innerHTML = "";
	if (document.getElementById('ipakeys').checked) {
		keyboard(document.getElementById('dcconsonants'), document.getElementById('text'), dc2Consonants.keyCollection());
		keyboard(document.getElementById('dcvowels'), document.getElementById('text'), dc2Vowels.keyCollection());
	} else if (document.getElementById('enkeys').checked) {
		keyboard(document.getElementById('dcconsonants'), document.getElementById('text'), alternativeKeyboard.en.consonants);
		keyboard(document.getElementById('dcvowels'), document.getElementById('text'), alternativeKeyboard.en.vowels);
	}
}

const alternativeKeyboard = {
	//[display and insert]
	en: {
		consonants: [
			[
				["y", "j"],
				["ng", "ŋ"],
				["v", "v"],
				["j", "ʤ"],
				["f", "f"],
				["bei<b>g</b>e", "ʒ"],
				["'","'"]
			],
			[
				["n", "n"],
				["h", "h"],
				["l", "l"],
				["p", "p"],
				["w", "w"],
				["ch", "ʧ"],
				["st", "st"],
				["<b>th</b>e", "ð"],
				[",",","]
			],
			[
				["t", "t"],
				["s", "s"],
				["r", "ɹ"],
				["d", "d"],
				["m", "m"],
				["sh", "ʃ"],
				["ma<b>th</b>", "θ"],
				["?","?"]
			],
			[
				["x", "ks"],
				["k", "k"],
				["z", "z"],
				["b", "b"],
				["א", "א"],
				["g", "g"]
			],
			[
				["!","!"]
			],
			[
				[".","."]
			]
		],
		vowels: [
			[
				["f<b>a</b>ther", "ɑ"],
				["s<b>ee</b>n", "i"],
				["s<b>oo</b>n", "u"],
				["h<b>a</b>t", "a"]
			],
			[
				["m<b>ay</b>", "e"],
				["b<b>i</b>t", "ɪ"],
				["g<b>o</b>", "ou"],
				["b<b>a</b>n", "æ"]
			],
			[
				["s<b>e</b>t", "ɛ"],
				["<b>eye</b>", "ai"],
				["m<b>u</b>st", "ʌ"],
				["f<b>u</b>r", "ɜ"]
			],
			[
				["p<b>u</b>t", "ʊ"]
			],
			[
				["wint<b>uh</b>", "ə"],
				["l<b>aw</b>", "əɔ"]
			],
			[
				["l<b>o</b>t", "ɒ"]
			]
		]
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