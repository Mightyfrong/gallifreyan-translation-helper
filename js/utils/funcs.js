import {
	UILanguage
} from '../main.js';

export function createSVGElement(tagName, attributes = {}) {
	const elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);

	Object.entries(attributes).forEach(([key, value]) => {
		const name = key.replace(/([A-Z])/g, "-$1").toLowerCase();
		elem.setAttribute(name, value);
	});

	return elem;
}

/* these are depecated as long as tardis console v1 is discontinued
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
*/

// obj can be an Array or String
const includes = (obj, values) => {
	return Array.isArray(values) ?
		values.some(value => obj.includes(value)) :
		obj.includes(values);
}
export {
	includes
};

export const dimensionObj = {
	// standard size of word- or sentence circles with circular distribution of elements
	wordcircleRadius: (numberOfElements, elementSize) => {
		numberOfElements = Math.floor(numberOfElements ** 1.15);
		return (Math.ceil(Math.sqrt(numberOfElements * Math.pow(2 * elementSize, 2) / Math.PI)) + elementSize);
	},
	// canvas dimensions by distributed character-, glyph- or sentence-size
	canvas: (glyphs, maxWidth) => {
		return {
			width: Math.min(glyphs.num, Math.floor(maxWidth / glyphs.width) || 1) * glyphs.width || glyphs.width,
			height: glyphs.height * (Math.ceil(glyphs.num / (Math.floor(maxWidth / glyphs.width) || 1)))
		};
	},
	// handler for breaking on the canvas edge
	carriageReturn: (canvas, glyphs, x_factor) => {
		if (canvas.currentX + glyphs.width >= canvas.width) {
			canvas.currentY += glyphs.height;
			canvas.currentX = glyphs.width * x_factor;
		} else canvas.currentX += glyphs.width;
		return canvas;
	}
}

// handler for unsupported characters, setting up array, adding characters and displaying warning
export class unsupportedChars {
	constructor() {
		this.item = [];
	}
	reset() {
		this.item = [];
	}
	add(item) {
		if (!includes([" ", undefined, null, false], item) && item.length) {
			this.item.push(item);
		}
	}
	get() {
		if (this.item === undefined || this.item.length < 1)
			document.getElementById("output").innerHTML = "";
		else
			document.getElementById("output").innerHTML = UILanguage.write("processError") + this.item.join(", ");
	}
}

// handler for rendering options
export const renderOptions = {
	permavalue: ["foregroundcolor", "backgroundcolor"],
	value: ["stack"],
	option: [],
	checked: ["circular", "convertc", "stacking", "casemark"],
	radio: ["dfalphabet"], //radio name not div id
	display: (selected = []) => {
		renderOptions.value.forEach(id => {
			document.getElementById(id).parentElement.style.display = (selected.indexOf(id) > -1 ? 'initial' : 'none');
		}, {
			selected: selected
		});
		renderOptions.option.forEach(id => {
			document.getElementById(id).parentElement.style.display = (selected.indexOf(id) > -1 ? 'initial' : 'none');
		}, {
			selected: selected
		});
		renderOptions.checked.forEach(id => {
			document.getElementById(id).parentElement.style.display = (selected.indexOf(id) > -1 ? 'initial' : 'none');
		}, {
			selected: selected
		});
		renderOptions.radio.forEach(name => {
			document.getElementsByName(name)[0].parentElement.parentElement.style.display = (selected.indexOf(name) > -1 ? 'block' : 'none');
		}, {
			selected: selected
		});
	},
	get: () => {
		let output = {};
		renderOptions.permavalue.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : document.getElementById(id).value;
		});
		renderOptions.value.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : document.getElementById(id).value;
		});
		renderOptions.option.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : document.getElementById(id).options[document.getElementById(id).selectedIndex].value;
		});
		renderOptions.checked.forEach(id => {
			output[id] = document.getElementById(id).parentElement.style.display == 'none' ? false : (document.getElementById(id).checked ? true : false);
		});
		renderOptions.radio.forEach(name => {
			output[name] = document.getElementsByName(name)[0].parentElement.style.display == 'none' ? false : document.querySelector('input[name="' + name + '"]:checked').value;
		});

		output.fontsize = parseFloat(getComputedStyle(document.body, null).fontSize) || 16;
		output.maxWidth = window.innerWidth - 32;
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
				writeTo.selectionStart = writeTo.selectionEnd = pos0 + char[1].length;
			}
			keyRow.appendChild(keyInput);
		});
		appendTo.appendChild(keyRow);
	});
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