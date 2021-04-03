import {
	cbConsonants,
	cbVowels
} from './cbettenbendersGlyphs.js';

export const glyphSize = 100; // radius of glyphs
export const cbConsonant = new cbConsonants();
export const cbVowel = new cbVowels();

function cbKeyboard(appendTo, writeTo, keys) {
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

export function createCBKeyboard() {
	keyboard(document.getElementById('cbconsonants'), document.getElementById('text'), cbConsonant.keyCollection());
	keyboard(document.getElementById('cbvowels'), document.getElementById('text'), cbVowel.keyCollection());
}