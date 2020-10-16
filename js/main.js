import {
	render as renderShermans
} from './shermans/render.js';
import {
	render as renderTARDISConsole
} from './tardisConsole/render.js';
import {
	render as renderDoctorsCot
} from './doctorsCot/render.js';
import {
	render as renderCC
} from './cc/render.js';
import {
	render as renderDotscript
} from './dotscript/render.js';

import {
	genKeyboard,
	consonantTable,
	vowelTable
} from './doctorsCot/setup.js';
import { UILanguage } from './utils/UILanguage.js';
import { MySelect } from './utils/MySelect.js';

customElements.define('my-select', MySelect);

// Initialise event handlers and language-specific form controls
const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const shermansOpts = document.getElementById('shermans-options');

const ipaKeys = document.getElementById('ipa-keys');
const ipaConsons = document.getElementById('ipa-consons');
const ipaVowels = document.getElementById('ipa-vowels');

const langs = langSelect.querySelectorAll('input');
const [SHERMAN, COT, TARDIS, CC, DOT] = [...langs].map(input => input.value);

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
		case SHERMAN:
			shermansOpts.classList.toggle('active');
			img.style.display = "block";
			canvas.style.display = "none";
			break;
		case COT:
			ipaKeys.classList.toggle('active');
			img.style.display = "none";
			canvas.style.display = "block";
			break;
		case CC:
			ccOpts.classList.toggle('active');
			img.style.display = "block";
			canvas.style.display = "none";
			break;
		case TARDIS:
			img.style.display = "block";
			canvas.style.display = "none";
			break;
		case DOT:
			img.style.display = "block";
			canvas.style.display = "none";
			break;
		case "dotscript":
			img.style.display = "block";
			canvas.style.display = "none";
			break;
	}
}

langSelect.addEventListener('select', event => {
	// First hide all controls
	[...langControls.getElementsByClassName('active')]
	.forEach(elem => elem.classList.remove('active'));

	// Then display selected ones
	activateControls(event.detail);
});
activateControls(langSelect.value);

//Clear canvas and pass word to specific language
function translate(ctx) {
	document.getElementById('info').style.display = 'none';
	document.getElementById('drawoutput').style.display = 'block';

	let input = document.getElementById("text").value;
	let svg;

	switch (langSelect.value) {
		case SHERMAN:
			svg = renderShermans(input);
			break;
		case COT:
			renderDoctorsCot(ctx, input);
			break;
		case TARDIS:
			svg = renderTARDISConsole(input);
			break;
		case DOT:
			svg = renderDotscript(input);
			break;
		case CC:
			svg = renderCC(input);
			break;
		default:
			svg = renderShermans(input);
	}
	if (svg !== undefined) {
		img.src = URL.createObjectURL(svg.export(input));
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
/**
 * Copyright 2020 Mightyfrong, erroronline1, ModisR
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