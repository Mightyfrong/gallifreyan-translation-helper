import { SVGRenderingContext } from './utils/SVGRenderingContext.js';

import { render as renderShermans } from './shermans/render.js';
import { render as renderTARDISConsole } from './tardisConsole/render.js';
import { render as renderDoctorsCot } from './doctorsCot/render.js';
import { render as renderCC } from './cc/render.js';
import { dotscriptTranslate } from './dotscript.js';

import { genKeyboard, consonantTable, vowelTable } from './doctorsCot/setup.js';
import { UILanguage } from './UILanguage.js';

// Initialise event handlers and language-specific form controls
const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const shermansOpts = document.getElementById('shermans-options');

const ipaKeys = document.getElementById('ipa-keys');
const ipaConsons = document.getElementById('ipa-consons');
const ipaVowels = document.getElementById('ipa-vowels');

genKeyboard(ipaConsons, consonantTable);
genKeyboard(ipaVowels, vowelTable);

const ccOpts = document.getElementById('cc-options');

//rewrite user interface language, direct implementation on document rendering throws errors
UILanguage.init();

const canvas = document.getElementById('canvas');
const img = document.getElementById('output-img');

function activateControls(lang) {
	img.style.display = "none";
	canvas.style.display = "block";
	switch (lang) {
		case "shermans":
			shermansOpts.classList.toggle('active');
			break;
		case "cot":
			ipaKeys.classList.toggle('active');
			break;
		case "cc":
			ccOpts.classList.toggle('active');
			break;
		case "tardis":
			img.style.display = "block";
			canvas.style.display = "none";
			break;
	}
}

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
	document.getElementById('info').style.display = 'none';
	document.getElementById('drawoutput').style.display = 'block';

	let input = document.getElementById("text").value;
	let lang = document.getElementById("language").value;
	switch (lang) {
		case "shermans":
			renderShermans(src, input);
			break;
		case "cot":
			renderDoctorsCot(ctx, input);
			break;
		case "tardis":
			const svg = renderTARDISConsole(input);
			img.src = URL.createObjectURL(svg.export(input));
			img.width = svg.width;
			img.height = svg.height;
			break;
		case "dotscript":
			dotscriptTranslate(src, input);
			break;
		case "cc":
			renderCC(src, input);
			break;
		default:
			renderShermans(src, input);
	}
}

if (canvas.getContext) {
	let ctx = canvas.getContext('2d');
	document.forms[0].onsubmit = (event) => {
		ctx.resetTransform();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		translate(ctx);
		event.preventDefault();
	};
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