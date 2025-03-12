import {
	keyboard
} from '../main.js'
import {
	oddismGlyphs
} from './glyphs.js';

export const character = {
	width: 54,
	height: 37
}; // dimensions of characters, keep ratio on resizing
export const linewidth = 1; // line weight factor

export function createKeyboard() {
	document.getElementById('oddismconsonants').innerHTML = document.getElementById('oddismvowels').innerHTML = "";
	if (document.getElementById('ipakeys').checked) {
		keyboard(document.getElementById('oddismconsonants'), document.getElementById('text'), oddismGlyphs.getKeys("consonants"));
		keyboard(document.getElementById('oddismvowels'), document.getElementById('text'), oddismGlyphs.getKeys("vowels"));
	}
	else if (document.getElementById('enkeys').checked) {
		keyboard(document.getElementById('oddismconsonants'), document.getElementById('text'), alternativeKeyboard.en.consonants);
		keyboard(document.getElementById('oddismvowels'), document.getElementById('text'), alternativeKeyboard.en.vowels);
	}
}

const alternativeKeyboard = {
	//[display and insert]
	en: {
		consonants: [
			[
				["la<b>b</b>","b"],
				["di<b>d</b>","d"],
				["<b>f</b>ind","f"],
				["<b>g</b>ive","g"],
				["<b>h</b>ow","h"],
				["<b>c</b>at","k"],
				["<b>l</b>eg","l"],
				["<b>m</b>an","m"],
				["<b>n</b>o","n"],
				["si<b>ng</b>","ŋ"],
				["<b>p</b>et","p"],
				["<b>r</b>ed","r"],
				["<b>s</b>un","s"],
				["<b>sh</b>e","ʃ"],
				["<b>t</b>ea","t"],
				["<b>ch</b>eck","tʃ"],
				["<b>th</b>ink","θ"],
				["<b>v</b>oice","v"],
				["<b>w</b>et","w"],
				["<b>z</b>oo","z"],
				["plea<b>s</b>ure","ʒ"],
				["<b>j</b>ust","dʒ"]
			]
		],
		vowels: [
			[
				["<b>a</b>rm","ɑ"],
				["c<b>a</b>t","æ"],
				["m<b>e</b>t","ɛ"],
				["<b>a</b>way","ə"],
				["t<b>ur</b>n","ɝ"],
				["h<b>i</b>t","ɪ"],
				["s<b>ee</b>","i"],
				["h<b>o</b>t","ɒ"],
				["c<b>a</b>ll","ɔ"],
				["p<b>u</b>t","ʊ"],
				["t<b>oo</b>","u"],
				["f<b>i</b>ve","aɪ"],
				["n<b>ow</b>","aʊ"],
				["s<b>ay</b>","eɪ"],
				["<b>y</b>es","j"],
				["g<b>o</b>","oʊ"],
				["b<b>oy</b>","ɔɪ"],
				["wh<b>ere</b>","ɛə"],
				["n<b>ear</b>","ɪə"],
				["p<b>ure</b>","ʊə"]
			]
		]
	}
}

/**Copyright 2020-2025 Mightyfrong, erroronline1, ModisR
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