import {
	evaGlyphs
} from './evaGlyphs.js';
import {
	keyboard
} from '../utils/funcs.js'

export const character = 40; // radius of single characters
export const lwfactor = 1; // line weight factor

export function createKeyboard() {
	document.getElementById('evaconsonants').innerHTML = document.getElementById('evavowels').innerHTML = "";
	if (document.getElementById('ipakeys').checked) {
		keyboard(document.getElementById('evaconsonants'), document.getElementById('text'), evaGlyphs.keyCollection('consonants'));
		keyboard(document.getElementById('evavowels'), document.getElementById('text'), evaGlyphs.keyCollection('vowels'));
	} else if (document.getElementById('enkeys').checked) {
		keyboard(document.getElementById('evaconsonants'), document.getElementById('text'), alternativeKeyboard.en.consonants);
		keyboard(document.getElementById('evavowels'), document.getElementById('text'), alternativeKeyboard.en.vowels);
	}
}


const alternativeKeyboard = {
	//[display and insert]
	en: {
		consonants: [
			[
				["<b>b</b>ad", "b"],
				["la<b>d</b>y", "d"],
				["<b>f</b>ind", "f"],
				["<b>g</b>ive", "g"],
				["<b>h</b>ello", "h"],
				["<b>y</b>es", "j"],
				["<b>c</b>at", "k"],
				["<b>l</b>eg", "l"],
				["<b>m</b>an", "m"],
				["<b>n</b>o", "n"],
				["si<b>ng</b>", "ŋ"],
				["<b>p</b>et", "p"],
				["<b>r</b>ed", "r"],
				["<b>s</b>un", "s"],
				["<b>sh</b>e", "ʃ"],
				["<b>t</b>ea", "t"],
				["<b>ch</b>eck", "tʃ"],
				["<b>th</b>ink", "θ"],
				["<b>th</b>is", "ð"],
				["<b>v</b>oice", "v"],
				["<b>w</b>et", "w"],
				["<b>z</b>oo", "z"],
				["plea<b>s</b>ure", "ʒ"],
				["<b>j</b>ust", "ʤ"]
			]
		],
		vowels: [
			[
				["c<b>u</b>p", "ʌ"],
				["f<b>a</b>ther", "ɑ"],
				["c<b>a</b>t", "æ"],
				["m<b>e</b>t", "e"],
				["<b>a</b>way", "ə"],
				["t<b>u</b>rn", "ɜ"],
				["h<b>i</b>t", "ɪ"],
				["s<b>ee</b>", "i"],
				["h<b>a</b>t", "a"],
				["c<b>a</b>ll", "ɔ"],
				["p<b>u</b>t", "ʊ"],
				["bl<b>ue</b>", "u"],
				["f<b>i</b>ve", "ai"],
				["n<b>ow</b>", "aʊ"],
				["s<b>ay</b>", "eɪ"],
				["g<b>o</b>", "ou"],
				["b<b>oy</b>", "ɔɪ"],
				["<b>ai</b>r", "ɛa"],
				["n<b>ea</b>r", "ɪa"],
				["p<b>u</b>re", "ʊa"]
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