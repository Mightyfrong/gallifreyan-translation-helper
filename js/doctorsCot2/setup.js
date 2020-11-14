import {
	cotConsonants,
	cotVowels
} from './doctorsCotGlyphs.js';

export const glyphSize = 50; // radius of glyphs
export const dc2Consonants = new cotConsonants();
export const dc2Vowels = new cotVowels();

export function ipaKeyboard(appendTo, writeTo, keys) {
	keys.forEach(row => {
		const keyRow = document.createElement('div');
		row.forEach(char => {
			const keyInput = document.createElement('input');
			keyInput.type = "button";
			keyInput.value = char;
			keyInput.onclick = () => {
				const pos0 = writeTo.selectionStart;
				const pos1 = writeTo.selectionEnd;
				const val = writeTo.value;
				writeTo.value = val.slice(0, pos0) + char + val.slice(pos1);
				writeTo.focus();
				writeTo.selectionStart = writeTo.selectionEnd = pos0 + char.length;
			}
			keyRow.appendChild(keyInput);
		});
		appendTo.appendChild(keyRow);
	});
}