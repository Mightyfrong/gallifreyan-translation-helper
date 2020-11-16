import {
	genKeyboard,
	consonantTable,
	vowelTable
} from './doctorsCot/setup.js';

import {
	createKeyboard
} from './doctorsCot2/setup.js';


import { UILanguage } from './utils/UILanguage.js';
import { selectLang, translate, activateControls, langSelect } from './event_callbacks.js';
import { createCBKeyboard } from './cbettenbender/setup.js';

// Init event handlers
langSelect.addEventListener('select', selectLang);
document.forms[0].addEventListener('submit', translate);

// Init UI elems
//** IPA keys for Doctor's Cot
const ipaConsons = document.getElementById('ipa-consons');
const ipaVowels = document.getElementById('ipa-vowels');

genKeyboard(ipaConsons, consonantTable);
genKeyboard(ipaVowels, vowelTable);

createKeyboard();

createCBKeyboard();

//** General
activateControls(langSelect.value);
UILanguage.init(); //rewrite user interface language, direct implementation on document rendering throws errors

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