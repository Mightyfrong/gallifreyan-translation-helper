import {
	clockworkConsonants,
	clockworkPunctuation,
	clockworkVowels
} from './clockworkGlyphs.js';

export const glyphSize = 30; // radius of glyphs
export const cwConsonants = new clockworkConsonants();
export const cwVowels = new clockworkVowels();
export const cwPunctuation = new clockworkPunctuation();

function cwKeyboard(appendTo, writeTo, keys) {
	const keyWrapper = document.createElement('div');
	keys.forEach(char => {
		const keyInput = document.createElement('div');
		keyInput.innerHTML = char[0];
		keyInput.onclick = () => {
			const pos0 = writeTo.selectionStart;
			const pos1 = writeTo.selectionEnd;
			const val = writeTo.value;
			let ch = char[1];
			if (ch.length > 1) ch = "/" + ch + "/";
			writeTo.value = val.slice(0, pos0) + ch + val.slice(pos1);
			writeTo.focus();
			writeTo.selectionStart = writeTo.selectionEnd = pos0 + ch.length;
		}
		keyWrapper.appendChild(keyInput);
	});
	appendTo.appendChild(keyWrapper);
}

export function createClockworkKeyboard() {
	document.getElementById('cwconsonants').innerHTML = document.getElementById('cwvowels').innerHTML = document.getElementById('cwpunctuation').innerHTML = "";
	if (document.getElementById('cwipa').checked) {
		cwKeyboard(document.getElementById('cwconsonants'), document.getElementById('text'), cwConsonants.keyCollection());
		cwKeyboard(document.getElementById('cwvowels'), document.getElementById('text'), cwVowels.keyCollection());
		cwKeyboard(document.getElementById('cwpunctuation'), document.getElementById('text'), cwPunctuation.keyCollection());
	} else if (document.getElementById('cwen').checked) {
		cwKeyboard(document.getElementById('cwconsonants'), document.getElementById('text'), alternativeKeyboard.en.consonants);
		cwKeyboard(document.getElementById('cwvowels'), document.getElementById('text'), alternativeKeyboard.en.vowels);
		cwKeyboard(document.getElementById('cwpunctuation'), document.getElementById('text'), cwPunctuation.keyCollection());
	}
}

const alternativeKeyboard = {
	//[display and insert]
	en: {
		consonants: [
			["b", "b"],
			["d", "d"],
			["f", "f"],
			["<b>g</b>et", "g"],
			["bei<b>g</b>e", "ʒ"],
			["h", "h"],
			["j", "ʤ"],
			["k", "k"],
			["l", "l"],
			["m", "m"],
			["n", "n"],
			["p", "p"],
			["qu", "kw"],
			["r", "ɹ"],
			["<b>th</b>e", "ð"],
			["s", "s"],
			["t", "t"],
			["v", "v"],
			["w", "w"],
			["x", "ks"],
			["y", "j"],
			["z", "z"],
			["ba<b>ng</b>", "ŋ"],
			["sh", "ʃ"],
			["<b>th</b>ing", "θ"],
			["<b>th</b>is", "ð"]
		],
		vowels: [
			["fl<b>ee</b>ce", "i"],
			["pr<b>i</b>ce", "ai"],
			["m<b>ou</b>th", "aʊ"],
			["g<b>oo</b>se", "u"],
			["dr<b>e</b>ss", "ɛ"],
			["n<b>u</b>rse", "ɜ"],
			["str<b>u</b>t", "ʌ"],
			["th<b>ou</b>ght", "ɔ"],
			["k<b>i</b>t", "ɪ"],
			["f<b>a</b>ce", "eɪ"],
			["g<b>oa</b>t", "oʊ"],
			["f<b>oo</b>t", "ʊ"],
			["tr<b>a</b>p", "æ"],
			["comm<b>a</b>", "ə"],
			["st<b>a</b>rt", "ɑ"],
			["l<b>o</b>t", "ɒ"],
			["<b>e</b>ɪ", "e"],
			["<b>o</b>ʊ", "o"],
			["<b>a</b>ɪ/ <b>a</b>ʊ", "a"]
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