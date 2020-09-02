//turn polar coords to Cartesian
export function polar(radius, degrees) {
	const radians = degrees * Math.PI / 180;
	return [radius * Math.cos(radians), radius * Math.sin(radians)];
}

// does an array contain the value or one of the values?
Array.prototype.Contains = function (values) {
	if (Array.isArray(values)){
		for (let i = 0; i < values.length - 1; i++) {
			if (Boolean(this.indexOf(values[i]) + 1)) return true;
		}
	}
	else if (Boolean(this.indexOf(values) + 1)) return true;
	return false;
}

// does a string contain the value or one of the values?
String.prototype.Contains = function (values) {
	if (Array.isArray(values)){
		for (let i = 0; i < values.length - 1; i++) {
			if (Boolean(this.indexOf(values[i]) + 1)) return true;
		}
	}
	else if (Boolean(this.indexOf(values) + 1)) return true;
	return false;
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