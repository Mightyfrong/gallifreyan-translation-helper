import {
	includes
} from '../utils/funcs.js'
import {
	UILanguage
} from '../utils/UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';

import {
	dfGlyphs
} from './darklfaeriesGlyphs.js';


let consonant = 40; // radius of consonants
let linewidth = 1; // thicker lines add a cute chubbyness
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
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
	input = input.toLowerCase();
	letterwidth = consonant * 2.25;
	letterheight = consonant * 3;

	x = letterwidth*-.5;
	y = letterheight * .6;

	// set canvas scale according to number of characters
	width = Math.min(input.length, Math.floor(window.innerWidth / letterwidth)) * letterwidth;
	height = letterheight * Math.ceil(input.length / Math.floor(window.innerWidth / letterwidth));
	const ctx = new SVGRenderingContext(width, height);

	// iterate through input
	for (let i = 0; i < input.length; i++) {
		// position pointer
		if (x + letterwidth >= width) {
			y += letterheight;
			x = letterwidth;
		}
		else x += letterwidth;

		if (input[i] in dfGlyphs) {

			// draw character
			ctx.drawShape('circle',linewidth*2,{cx:x,cy:y,r:consonant});
			dfDraw(ctx,x,y,input[i], dfGlyphs[input[i]]);

		} else warning += ", " + input[i];

	}

	// complain about undefined characters
	if (warning) document.getElementById("output").innerHTML = UILanguage.write("processError") + warning.substr(2);
	else document.getElementById("output").innerHTML = "";

	return ctx;
}

function dfDraw(ctx, x,y, character, glyph) {
	// this method assumes the provided paths have relative coordinates

	let path;
	const add = { // put x and y into usable scope, set correction value
		x: x - consonant,
		y: y - consonant,
		scale: consonant / 23.5 // manually determined and totally dependable of inkscape canvas
	};
	glyph.forEach(p=>{

	path = p.path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/g, coords => { // find all numbers and rescale
		let c = coords.split(",");
		return (parseFloat(c[0]) * add.scale) + "," + (parseFloat(c[1]) * add.scale);
	});

	path = path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/, coords => { // find first coordinate to add current position
		let c = coords.split(",");
		return (parseFloat(c[0]) + add.x) + "," + (parseFloat(c[1]) + add.y);
	});

console.log (p.path,path);
	ctx.drawShape('path', p.lineweight*linewidth, {
		d: path
	});
});
ctx.drawText(character, {
	x: x,
	y: y - consonant * 1.5
});

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