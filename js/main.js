import { shermansTranslate } from './shermans.js'
import { tardisTranslate } from './tardisC.js'
import { doctorsCotTranslate } from './doctorsCot/translate.js'
import { genKeyboard, consonantTable, vowelTable } from './doctorsCot/setup.js'

// Initialise event handlers and language-specific form controls
const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const shermansOpts = document.getElementById('shermans-options');

const ipaKeys = document.getElementById('ipa-keys');
const ipaConsons = document.getElementById('ipa-consons');
const ipaVowels = document.getElementById('ipa-vowels');

genKeyboard(ipaConsons, consonantTable);
genKeyboard(ipaVowels, vowelTable);

function activateControls(lang){
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
