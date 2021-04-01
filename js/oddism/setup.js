import {
	oddismGlyphs
} from './oddismGlyphs.js';

export const character = {
	width: 54,
	height: 37
}; // dimensions of characters, keep ratio on resizing
export const linewidth = 1; // line weight factor

function oddKeyboard(appendTo, writeTo, keys) {
	const keyWrapper = document.createElement('div');
	keys.forEach(char => {
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
		keyWrapper.appendChild(keyInput);
	});
	appendTo.appendChild(keyWrapper);
}

export function createoddKeyboard() {
	document.getElementById('oddismconsonants').innerHTML = document.getElementById('oddismvowels').innerHTML = "";
	oddKeyboard(document.getElementById('oddismconsonants'), document.getElementById('text'), oddismGlyphs.getKeys("consonants", document.getElementById('oddismen').checked));
	oddKeyboard(document.getElementById('oddismvowels'), document.getElementById('text'), oddismGlyphs.getKeys("vowels", document.getElementById('oddismen').checked));
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