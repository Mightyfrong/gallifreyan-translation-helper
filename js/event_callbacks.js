import { render as renderShermans } from './shermans/render.js';
import { render as renderTARDISConsole } from './tardisConsole/render.js';
import { render as renderDoctorsCot } from './doctorsCot/render.js';
import { render as renderCC } from './cc/render.js';
import { render as renderDotscript } from './dotscript/render.js';

import { MySelect } from './utils/MySelect.js';

// Get hooks for main UI elements
export const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const shermansOpts = document.getElementById('shermans-options');
const ipaKeys = document.getElementById('ipa-keys');
const ccOpts = document.getElementById('cc-options');

const img = document.getElementById('output-img');

// Init language selector & constants
customElements.define('my-select', MySelect);
const langs = langSelect.querySelectorAll('input');
const [SHERMAN, COT, TARDIS, CC, DOT] = [...langs].map(input => input.value);

// Event Callbacks
export function translate(event) {
	document.getElementById('info').style.display = 'none';
	document.getElementById('drawoutput').style.display = 'block';

	let input = document.getElementById("text").value;
	let svg;
	switch (langSelect.value) {
		case SHERMAN:
			svg = renderShermans(input);
			break;
		case COT:
			svg = renderDoctorsCot(input);
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

	const a = img.parentElement;
	const file = svg.export(input);

	a.href = img.src = URL.createObjectURL(file);
	a.download = file.name;

	event.preventDefault();
}

export function selectLang(event) {
	// First hide all controls
	langControls.querySelectorAll('.active').forEach(elem => {
		elem.classList.remove('active')
	});
	// Then display selected ones
	activateControls(event.detail);
}

export function activateControls(lang) {
	switch (lang) {
		case SHERMAN:
			shermansOpts.classList.toggle('active');
			break;
		case COT:
			ipaKeys.classList.toggle('active');
			break;
		case CC:
			ccOpts.classList.toggle('active');
			break;
	}
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