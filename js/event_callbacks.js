import { render as renderShermans } from './shermans/render.js';
import { render as renderTARDISConsole } from './tardisconsole2/render.js';
import { render as renderDoctorsCot } from './doctorsCot/render.js';
import { render as renderFlux } from './flux/render.js';
import { render as renderClockwork } from './clockwork/render.js';
import { render as renderCC } from './cc/render.js';
import { render as renderDotscript } from './dotscript/render.js';
import { render as renderABB } from './artbyboredom/render.js';
import { render as renderCB } from './cbettenbender/render.js';
import { render as renderDF } from './darkifaerie/render.js';
import { render as renderBPJM } from './bpjmarriott/render.js';
import { render as renderF } from './oddism/render.js';
import { createKeyboard } from './doctorsCot/setup.js';
import { createoddKeyboard } from './oddism/setup.js';
import { createClockworkKeyboard } from './clockwork/setup.js';

import { MySelect } from './utils/MySelect.js';
import { unsupportedChars, renderOpts } from './utils/funcs.js';

// initialize fetching unsupported characters
export const unsupportedCharacters = new unsupportedChars();

// Get hooks for main UI elements
export const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const cotOpts = document.getElementById('cot-options');
const cwOpts = document.getElementById('clockwork-options');
const cbettenbenders = document.getElementById('cbettenbenders');
const oddism = document.getElementById('oddism');

export const renderOptions = new renderOpts();

const img = document.getElementById('output-img');

// Init language selector & constants
customElements.define('my-select', MySelect);
const langs = langSelect.querySelectorAll('input');
const [SHERMAN, COT, TARDIS, FLUX, CW, CB, CC, DOT, ABB, DF, BPJM, F] = [...langs].map(input => input.value);

// Event Callbacks
export function translate(event) {
	document.getElementById('info').style.display = 'none';
	document.getElementById('drawoutput').style.display = 'block';

	unsupportedCharacters.reset();
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
		case FLUX:
			svg = renderFlux(input);
			break;
		case CW:
			svg = renderClockwork(input);
			break;
		case DOT:
			svg = renderDotscript(input);
			break;
		case ABB:
			svg = renderABB(input);
			break;
		case CC:
			svg = renderCC(input);
			break;
		case CB:
			svg = renderCB(input);
			break;
		case DF:
			svg = renderDF(input);
			break;
		case BPJM:
			svg = renderBPJM(input);
			break;
		case F:
			svg = renderF(input);
			break;
		default:
			svg = renderShermans(input);
	}

	const a = img.parentElement;
	const file = svg.toFile(input);

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
			renderOptions.display(["circular", "convertc", "stacking"]);
			break;
		case FLUX:
			renderOptions.display(["circular"]);
			break;
		case COT:
			renderOptions.display([]);
			cotOpts.classList.toggle('active');
			break;
		case CW:
			renderOptions.display(["circular","stack"]);
			cwOpts.classList.toggle('active');
			break;
		case CC:
			renderOptions.display(["stack"]);
			break;
		case CB:
			renderOptions.display([]);
			cbettenbenders.classList.toggle('active');
			break;
		case DF:
			renderOptions.display(["circular"]);
			break;
		case TARDIS:
			renderOptions.display(["circular"]);
			break;
		case F:
			oddism.classList.toggle('active');
			break;
		default:
			renderOptions.display([]);
	}
	window.localStorage.setItem("selectedLang", lang);
}

Array.prototype.forEach.call(document.querySelectorAll('input[type=radio][name="cotsystem"]'), function (radio) {
	radio.addEventListener('change', createKeyboard);
});
Array.prototype.forEach.call(document.querySelectorAll('input[type=radio][name="oddismsystem"]'), function (radio) {
	radio.addEventListener('change', createoddKeyboard);
});
Array.prototype.forEach.call(document.querySelectorAll('input[type=radio][name="cwsystem"]'), function (radio) {
	radio.addEventListener('change', createClockworkKeyboard);
});

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