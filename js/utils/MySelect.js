export class MySelect extends HTMLElement {
	constructor() {
		super();

		[...this.children]
			.filter(child => child.tagName == 'LABEL')
			.forEach((label, idx) => {
				// generate HTML-friendly attribute
				const value = label.textContent.toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(" ", "-");

				const radioBtn = document.createElement('input');
				radioBtn.type = "radio";
				radioBtn.name = this.dataset.name;
				radioBtn.id = radioBtn.value = value;

				// set checked = true for 1st input, ie idx = 0
				let lastUsed = window.localStorage.getItem("selectedLang");
				if (lastUsed == null) radioBtn.checked = !idx;
				else radioBtn.checked = lastUsed == value;

				// dispatch custom event 'select' for main.js to hook into
				// when new option is chosen
				radioBtn.addEventListener('input', event => {
					this.dispatchEvent(new CustomEvent('select', {
						detail: event.target.value
					}));
				});

				label.setAttribute('for', value);

				this.insertBefore(radioBtn, label);
			});
	}

	get value(){
		return this.querySelector('input:checked').value;
	}
}
/**Copyright 2020-2025 Mightyfrong, erroronline1, ModisR
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