import {
	UILanguage
} from './UILanguage.js';

export function createSVGElement(tagName, attributes = {}) {
	const elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);

	Object.entries(attributes).forEach(([key, value]) => {
		const name = key.replace(/([A-Z])/g, "-$1").toLowerCase();
		elem.setAttribute(name, value);
	});

	return elem;
}

export function range(n) {
	return [...Array(n).keys()];
}

export function deg2rad(degrees) {
	return degrees * Math.PI / 180;
}

// turn polar coords to Cartesian
export function polar(radius, radians) {
	return [
		radius * Math.cos(radians),
		radius * Math.sin(radians)
	];
}

// obj can be an Array or String
export function includes(obj, values) {
	return Array.isArray(values) ?
		values.some(value => obj.includes(value)) :
		obj.includes(values);
}

//standard size of word- or sentence circles with circular distribution of elements
export function wordcircleRadius(numberOfElements, elementSize) {
	numberOfElements = Math.floor(numberOfElements ** 1.15);
	return (Math.ceil(Math.sqrt(numberOfElements * Math.pow(2 * elementSize, 2) / Math.PI)) + elementSize);
}

export class unsupportedChars {
	constructor() {
		this.item = [];
	}
	reset() {
		this.item = [];
	}
	add(item) {
		this.item.push(item);
	}
	get() {
		if (this.item === undefined || this.item.length < 1)
			document.getElementById("output").innerHTML = "";
		else
			document.getElementById("output").innerHTML = UILanguage.write("processError") + this.item.join(", ");
	}
}

export class renderOpts {
	constructor() {
		this.value = ["foregroundcolor", "backgroundcolor"];
		this.option = ["stack"];
		this.checked = ["circular", "convertc", "stacking"];

		//todo default values, more meaningful data structure
		//default + font size, window width/height
	}
	display(selected = []) {
		//		this.value.forEach(id => {document.getElementById(id).parentElement.style.display = (selected.indexOf(id)>-1 ? 'initial' : 'none');}, { selected: selected });
		this.option.forEach(id => {
			document.getElementById(id).parentElement.style.display = (selected.indexOf(id) > -1 ? 'initial' : 'none');
		}, {
			selected: selected
		});
		this.checked.forEach(id => {
			document.getElementById(id).parentElement.style.display = (selected.indexOf(id) > -1 ? 'initial' : 'none');
		}, {
			selected: selected
		});
	}
	get() {
		let output = {};
		this.value.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : document.getElementById(id).value;
		});
		this.option.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : document.getElementById(id).options[document.getElementById(id).selectedIndex].value;
		});
		this.checked.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : (document.getElementById(id).checked ? true : false);
		});

		output.fontsize = parseFloat(getComputedStyle(document.body, null).fontSize);
		output.maxWidth = window.innerWidth;
		return output;
	}
}

export function keyboard(appendTo, writeTo, keys) {
	// keys is expected to be a twodimensional array of rows and keys
	keys.forEach(row => {
		const keyRow = document.createElement('div');
		row.forEach(char => {
			const keyInput = document.createElement('div');
			keyInput.innerHTML = char[0];
			keyInput.onclick = () => {
				const pos0 = writeTo.selectionStart;
				const pos1 = writeTo.selectionEnd;
				const val = writeTo.value;
				writeTo.value = val.slice(0, pos0) + char[1] + val.slice(pos1);
				writeTo.focus();
				writeTo.selectionStart = writeTo.selectionEnd = pos0 + char.length;
			}
			keyRow.appendChild(keyInput);
		});
		appendTo.appendChild(keyRow);
	});
}

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