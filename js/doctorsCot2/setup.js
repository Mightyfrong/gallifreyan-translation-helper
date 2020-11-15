import {
	cotConsonants,
	cotVowels
} from './doctorsCotGlyphs.js';

export const glyphSize = 50; // radius of glyphs
export const dc2Consonants = new cotConsonants();
export const dc2Vowels = new cotVowels();

function cotKeyboard(appendTo, writeTo, keys) {
	keys.forEach(row => {
		const keyRow = document.createElement('div');
		row.forEach(char => {
			const keyInput = document.createElement('div');
			keyInput.innerHTML = char[0];
			keyInput.onclick = () => {
				const pos0 = writeTo.selectionStart;
				const pos1 = writeTo.selectionEnd;
				const val = writeTo.value;
				writeTo.value = val.slice(0, pos0) + char[1] + val.slice(pos1);
				writeTo.focus();
				writeTo.selectionStart = writeTo.selectionEnd = pos0 + char.length;
			}
			keyRow.appendChild(keyInput);
		});
		appendTo.appendChild(keyRow);
	});
}

export function createKeyboard() {
	document.getElementById('dc2consonants').innerHTML = document.getElementById('dc2vowels').innerHTML = "";
	if (document.getElementById('cotipa').checked) {
		cotKeyboard(document.getElementById('dc2consonants'), document.getElementById('text'), dc2Consonants.keyCollection());
		cotKeyboard(document.getElementById('dc2vowels'), document.getElementById('text'), dc2Vowels.keyCollection());
	} else if (document.getElementById('coten').checked) {
		cotKeyboard(document.getElementById('dc2consonants'), document.getElementById('text'), alternativeKeyboard.en.consonants);
		cotKeyboard(document.getElementById('dc2vowels'), document.getElementById('text'), alternativeKeyboard.en.vowels);
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
				["bei<b>g</b>e", "ʒ"]
			],
			[
				["n", "n"],
				["h", "h"],
				["l", "l"],
				["p", "p"],
				["w", "w"],
				["ch", "ʧ"],
				["st", "st"],
				["<b>th</b>e", "ð"]
			],
			[
				["t", "t"],
				["s", "s"],
				["r", "ɹ"],
				["d", "d"],
				["m", "m"],
				["sh", "ʃ"],
				["ma<b>th</b>", "θ"]
			],
			[
				["x", "ks"],
				["k", "k"],
				["z", "z"],
				["b", "b"],
				["א", "א"],
				["g", "g"]
			]
		],
		vowels: [
			[
				["f<b>a</b>ther", "ɑ"],
				["s<b>ee</b>n", "i"],
				["s<b>oo</b>n", "u"],
				["h<b>a</b>", "a"]
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