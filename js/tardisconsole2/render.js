import {
	UILanguage
} from '../utils/UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	consoleGlyphs
} from './consoleGlyphs.js';
import {
	character,
	lwfactor
} from './setup.js';
import {
	includes
} from '../utils/funcs.js';

let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let glyph; // global scope for glyph dimensions
let warning = ""; // used if undefined characters are part of the input

// add module-specific language chunks
UILanguage.say.processError = {
	en: "The following characters could not be processed: ",
	de: "Die folgenden Zeichen konnten nicht verarbeitet werden: ",
	lt: "Nepavyko apdoroti šių simbolių: "
};

// scroll through input and draw every letter
export function render(input) {
	// initialize widths, heights, default-values, draw-object
	warning = "";
	let displayCircular = document.getElementById('tccircular').checked,
		groupedInput = tardisCharacterGrouping(input),
		charX, charY, textX, textY, dia;

	if (displayCircular) {
		let longest = groupedInput.slice();
		dia = wordcircleRadius(longest.sort(sizesort)[0].length + 1, character) * 2.25;
		glyph = {
			width: dia,
			height: dia,
			count: groupedInput.length
		};
		x = y = glyph.width * .5;
	} else {
		glyph = {
			width: character * 2.25,
			height: character * 3,
			count: input.length
		};
		x = glyph.width * -.5;
		y = glyph.height * .6;
	}
	// set canvas scale according to number of characters
	width = Math.min(glyph.count, Math.floor(window.innerWidth / glyph.width) || 1) * glyph.width;
	height = glyph.height * Math.ceil(glyph.count / (Math.floor(window.innerWidth / glyph.width) || 1));
	const ctx = new SVGRenderingContext(width, height);

	//return ctx;
	// iterate through input
	groupedInput.forEach(word => {
		if (displayCircular) {
			// draw word circle
			dia = wordcircleRadius(word.length + 1, character);
			ctx.drawShape('circle', lwfactor * 2, {
				cx: x,
				cy: y,
				r: dia - character * .5 / ((word.length + 1) ** 1.15)
			});
		}
		for (let i = 0; i < word.length; i++) {
			// define center for character
			if (displayCircular) {
				let rad = 1.5 + 2 / (word.length) * i;
				if (rad > 2) rad -= 2;
				charX = x + Math.cos(Math.PI * rad) * dia * (1 - character / (dia - character * 1.6));
				charY = y + Math.sin(Math.PI * rad) * dia * (1 - character / (dia - character * 1.6));
				textX = x + Math.cos(Math.PI * rad) * dia * (1.1 - .4 / ((word.length + 1) ** 1.15));
				textY = y + Math.sin(Math.PI * rad) * dia * (1.1 - .4 / ((word.length + 1) ** 1.15));
			} else {
				if (x + glyph.width >= width) {
					y += glyph.height;
					x = glyph.width;
				} else x += glyph.width;
				charX = x;
				charY = y;
				textX = x;
				textY = y - character * 1.5;
			}
			// draw character chunks
			for (let j = 0; j < word[i].length; j++) {
				if (word[i][j] in consoleGlyphs) {
					tcDraw(ctx, charX, charY, includes(['a', 'e', 'i', 'o', 'u'], word[i][j]) ? consoleGlyphs[word[i][j]](word[i][j - 1]) : consoleGlyphs[word[i][j]]);
				} else warning += ", " + word[i][j];
			}
			// display character
			ctx.drawText(word[i].join(''), {
				x: textX,
				y: textY
			});
		}
		// position pointer for word circles or consider space between linear written words
		if (x + glyph.width >= width) {
			y += glyph.height;
			x = glyph.width * (displayCircular ? .5 : 1);
		} else x += glyph.width;
	});

	// complain about undefined characters
	if (warning) document.getElementById("output").innerHTML = UILanguage.write("processError") + warning.substr(2);
	else document.getElementById("output").innerHTML = "";

	return ctx;
}

function tardisCharacterGrouping(input) {
	input = input.toLowerCase().split(/\s+/);
	let output = [],
		i = 0;
	input.forEach(word => {
		word = word.trim();
		if (word.length) {
			output.push([]);
			for (i = 0; i < word.length; i++) {
				output[output.length - 1].push([]);
				let chunk = [output.length - 1, output[output.length - 1].length - 1],
					current = word[i],
					currenttwo = word[i] + word[i + 1];
				if (includes(['ch', 'ng', 'qu', 'sh', 'th', 'ph'], currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (output[chunk[0]][chunk[1] - 1] !== undefined && output[chunk[0]][chunk[1] - 1].length && !includes(['a', 'e', 'i', 'o', 'u'], output[chunk[0]][chunk[1] - 1]) && includes(['a', 'e', 'i', 'o', 'u'], current)) {
					output[chunk[0]][chunk[1] - 1].push(current);
					output[chunk[0]].pop();
				} else if (!output[chunk[0]][chunk[1]].length && includes(['a', 'e', 'i', 'o', 'u'], current)) {
					output[chunk[0]][chunk[1]].push('א', current);
				} else
					output[chunk[0]][chunk[1]].push(current);
			}
		}
	});
	return output;
}

function wordcircleRadius(num, inner) {
	num = Math.floor(num ** 1.15);
	return (Math.ceil(Math.sqrt(num * Math.pow(2 * inner, 2) / Math.PI)) + inner);
}

function sizesort(a, b) {
	if (a.length === b.length) return 0;
	else return (a.length < b.length) ? 1 : -1;
}

function tcDraw(ctx, x, y, glyph) {
	// this method assumes the provided paths have relative coordinates
	let path, fill=false;
	const add = { // put x and y into usable scope, set correction value
		x: x - character,
		y: y - character,
		scale: character / 15 // manually determined and totally dependable of inkscape canvas
	};
	glyph.forEach(p => { // loop through thick and slim paths
		// find all coordinates and rescale
		path = p.path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/g, coords => {
			let c = coords.split(",");
			return (parseFloat(c[0]) * add.scale) + "," + (parseFloat(c[1]) * add.scale);
		});
		// alter first coordinate by current position
		path = path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/, coords => {
			let c = coords.split(",");
			return (parseFloat(c[0]) + add.x) + "," + (parseFloat(c[1]) + add.y);
		});
		if (p.filled=='foreground') fill=document.getElementById('foregroundcolor').value;
		if (p.filled=='background') fill=document.getElementById('backgroundcolor').value;
		ctx.drawShape('path', p.lineweight * lwfactor, {
			d: path,
			fill: fill
		});
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