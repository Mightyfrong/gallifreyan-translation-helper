import {
	shermansTranslate
} from './shermans.js'
import {
	tardisTranslate
} from './tardisConsole/translate.js'
import {
	doctorsCotTranslate
} from './doctorsCot/translate.js'
import {
	genKeyboard,
	consonantTable,
	vowelTable
} from './doctorsCot/setup.js'

// Initialise event handlers and language-specific form controls
const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const shermansOpts = document.getElementById('shermans-options');

const ipaKeys = document.getElementById('ipa-keys');
const ipaConsons = document.getElementById('ipa-consons');
const ipaVowels = document.getElementById('ipa-vowels');

genKeyboard(ipaConsons, consonantTable);
genKeyboard(ipaVowels, vowelTable);

function activateControls(lang) {
	switch (lang) {
		case "shermans":
			shermansOpts.classList.add('active');
			break;
		case "cot":
			ipaKeys.classList.add('active');
			break;
	}
}
// only show IPA keyboard when Doctor's Cot selected
langSelect.addEventListener('input', event => {
	// First hide all controls
	[...langControls.getElementsByClassName('active')]
	.forEach(elem => elem.classList.remove('active'));

	// Then display selected ones
	activateControls(event.target.value)
});
activateControls(langSelect.value);

//Clear canvas and pass word to specific language
function translate(ctx) {
	let input = document.getElementById("text").value;
	let lang = document.getElementById("language").value;
	switch (lang) {
		case "shermans":
			shermansTranslate(ctx, input);
			break;
		case "cot":
			doctorsCotTranslate(ctx, input);
			break;
		case "tardis":
			tardisTranslate(ctx, input);
			break;
		default:
			shermansTranslate(ctx, input);
	}
}

let canvas = document.getElementById('canvas');
if (canvas.getContext) {
	let ctx = canvas.getContext('2d');
	document.forms[0].onsubmit = (event) => {
		ctx.resetTransform();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		translate(ctx);
		event.preventDefault();
	};
}

//useful multipurpose functions
Array.prototype.Contains = function (values) {
	if (Array.isArray(values)){
		for (let i = 0; i < values.length - 1; i++) {
			if (Boolean(this.indexOf(values[i]) + 1)) return true;
		}
	}
	else if (Boolean(this.indexOf(values) + 1)) return true;
	return false;
}

String.prototype.Contains = function (values) {
	if (Array.isArray(values)){
		for (let i = 0; i < values.length - 1; i++) {
			if (Boolean(this.indexOf(values[i]) + 1)) return true;
		}
	}
	else if (Boolean(this.indexOf(values) + 1)) return true;
	return false;
}

/**Copyright 2020 Mightyfrong, erroronline1, ModisR
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