import {
    freakismGlyphs
} from './freakismGlyphs.js';

export const character = {
    width: 54,
    height: 37
}; // dimensions of characters, keep ratio on resizing
export const linewidth = 1; // line weight factor

function freakKeyboard(appendTo, writeTo, keys) {
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

export function createFreakKeyboard() {
    document.getElementById('freakismconsonants').innerHTML = document.getElementById('freakismvowels').innerHTML = "";
    freakKeyboard(document.getElementById('freakismconsonants'), document.getElementById('text'), freakismGlyphs.getKeys("consonants", document.getElementById('freakismen').checked));
    freakKeyboard(document.getElementById('freakismvowels'), document.getElementById('text'), freakismGlyphs.getKeys("vowels", document.getElementById('freakismen').checked));
}