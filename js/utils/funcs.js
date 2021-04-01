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