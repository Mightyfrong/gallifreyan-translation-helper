import {
    oddismGlyphs
} from './oddismGlyphs.js';

export const character = {
    width: 54,
    height: 37
}; // dimensions of characters, keep ratio on resizing
export const linewidth = 1; // line weight factor

function oddKeyboard(appendTo, writeTo, keys) {
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
        appendTo.appendChild(keyInput);
    });
}

export function createoddKeyboard() {
    document.getElementById('oddismconsonants').innerHTML = document.getElementById('oddismvowels').innerHTML = "";
    oddKeyboard(document.getElementById('oddismconsonants'), document.getElementById('text'), oddismGlyphs.getKeys("consonants", document.getElementById('oddismen').checked));
    oddKeyboard(document.getElementById('oddismvowels'), document.getElementById('text'), oddismGlyphs.getKeys("vowels", document.getElementById('oddismen').checked));
}