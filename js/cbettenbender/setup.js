import {
	cbConsonants,
	cbVowels
} from './glyphs.js';
import {
	keyboard
} from '../utils/funcs.js'

export const glyphSize = 100; // radius of glyphs
export const cbConsonant = new cbConsonants();
export const cbVowel = new cbVowels();

export function createKeyboard() {
	keyboard(document.getElementById('cbconsonants'), document.getElementById('text'), cbConsonant.keyCollection());
	keyboard(document.getElementById('cbvowels'), document.getElementById('text'), cbVowel.keyCollection());
}