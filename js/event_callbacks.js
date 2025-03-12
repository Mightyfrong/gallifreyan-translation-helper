import {
	render as renderShermans
} from './shermans/render.js';
import {
	render as renderTARDISConsole
} from './tardisconsole2/render.js';
import {
	render as renderDoctorsCot
} from './doctorsCot/render.js';
import {
	render as renderFlux
} from './flux/render.js';
import {
	render as renderDiflux
} from './diflux/render.js';
import {
	render as renderClockwork
} from './clockwork/render.js';
import {
	render as renderGC
} from './gc/render.js';
import {
	render as renderCC
} from './cc/render.js';
import {
	render as renderTKG
} from './tkg/render.js';
import {
	render as renderDotscript
} from './dotscript/render.js';
import {
	render as renderABB
} from './artbyboredom/render.js';
import {
	render as renderCB
} from './cbettenbender/render.js';
import {
	render as renderDF
} from './darkifaerie/render.js';
import {
	render as renderEva
} from './eva/render.js';
import {
	render as renderBPJM
} from './bpjmarriott/render.js';
import {
	render as renderODD
} from './oddism/render.js';
import {
	createKeyboard as createCotKeyboard
} from './doctorsCot/setup.js';
import {
	createKeyboard as createoddKeyboard
} from './oddism/setup.js';
import {
	createKeyboard as createClockworkKeyboard
} from './clockwork/setup.js';
import {
	createKeyboard as createEvaKeyboard
} from './eva/setup.js';

import {
	MySelect
} from './utils/MySelect.js';
import {
	unsupportedChars,
	renderOptions,
	SVGRenderingContext
} from './main.js';

// initialize fetching unsupported characters
export const unsupportedCharacters = new unsupportedChars();

// Get hooks for main UI elements
export const langSelect = document.getElementById('language');
const langControls = document.getElementById('lang-controls');

const img = document.getElementById('output-img');

// Init language selector & constants
customElements.define('my-select', MySelect);
const langs = langSelect.querySelectorAll('input');
const [SHERMAN, COT, TARDIS, FLUX, DIFLUX, CW, GC, CB, CC, TKG, DOT, ABB, DF, EVA, BPJM, ODD] = [...langs].map(input => input.value);

// Event Callbacks
export function translate(event) {
	document.getElementById('info').style.display = 'none';
	document.getElementById('drawoutput').style.display = 'block';

	unsupportedCharacters.reset();
	let input = document.getElementById("text").value;
	let svg;

	const langsDict = {
		[SHERMAN]: renderShermans,
		[COT]: renderDoctorsCot,
		[TARDIS]: renderTARDISConsole,
		[FLUX]: renderFlux,
		[DIFLUX]: renderDiflux,
		[CW]: renderClockwork,
		[GC]: renderGC,
		[DOT]: renderDotscript,
		[ABB]: renderABB,
		[CC]: renderCC,
		[TKG]: renderTKG,
		[CB]: renderCB,
		[DF]: renderDF,
		[EVA]: renderEva,
		[BPJM]: renderBPJM,
		[ODD]: renderODD
	};
	svg = langsDict[langSelect.value](input, renderOptions, unsupportedCharacters, SVGRenderingContext);

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
	const langsDict = {
		[SHERMAN]: { rndrOpt: ["circular", "convertc", "stacking"] },
		[COT]: { active: ["keyoptions", "cot-keys"] },
		[TARDIS]: {	rndrOpt: ["circular"] },
		[FLUX]: { rndrOpt: ["circular"] },
		[DIFLUX]: { rndrOpt: ["circular"], active: ["wip-notice"] },
		[CW]: {	rndrOpt: ["circular", "stack"],	active: ["keyoptions", "clockwork-keys"] },
		[GC]: {	rndrOpt: ["stacking"], active: ["gc-hint"] },
		[CC]: {	rndrOpt: ["stack"] },
		[TKG]: { rndrOpt: ["stacking"] },
		[DOT]: {},
		[ABB]: {},
		[CB]: {	active: ["cbettenbenders-keys"] },
		[DF]: {	rndrOpt: ["circular"] },
		[EVA]: { rndrOpt: ["circular"], active: ["keyoptions", "eva-keys"] },
		[BPJM]: {},
		[ODD]: { active: ["keyoptions", "oddism-keys"] }
	};

	if (lang in langsDict) {
		if ("rndrOpt" in langsDict[lang]) renderOptions.display(langsDict[lang].rndrOpt);
		else renderOptions.display([]);

		if ("active" in langsDict[lang]) langsDict[lang].active.forEach(el => {
			document.getElementById(el).classList.toggle('active');
		});
	}
	window.localStorage.setItem("selectedLang", lang);
}

document.querySelectorAll('input[type=radio][name=keyboard]').forEach(radio => {
	radio.addEventListener('change', e => {
		createCotKeyboard();
		createClockworkKeyboard();
		createEvaKeyboard();
		createoddKeyboard();
	}, false);
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