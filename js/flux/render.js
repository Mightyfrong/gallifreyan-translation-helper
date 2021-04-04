import {
	includes,
	wordcircleRadius
} from '../utils/funcs.js';
import {
	fluxBase,
	fluxDeco
} from './fluxGlyphs.js';
import {
	consonant,
	decorator
} from './setup.js';
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	unsupportedCharacters,
	renderOptions
} from '../event_callbacks.js';

let canvas = {}; // canvas properties
let glyph; // glyph dimensions-object
let option; // user selected render options handler

const base = new fluxBase(consonant, decorator);
const deco = new fluxDeco(base);

export function render(input) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// convert input-string to word array
	input = replacements(input).toLowerCase().trim().replace(/\s+/g, " ").split(" ");
	let glyphs = 0,
		biggestWordCircle = 0;
	input.forEach(word => {
		if (option.circular) {
			let twc2 = wordcircleRadius(word.length, consonant) * 4.5;
			if (biggestWordCircle < twc2) biggestWordCircle = twc2;
		} else {
			glyphs += word.length;
		}
		glyphs++;
	});
	// set canvas scale according to number of letters/groups
	if (option.circular) {
		glyph = {
			width: biggestWordCircle + consonant,
			height: biggestWordCircle
		};
		canvas["width"] = (Math.min(glyphs, Math.floor(option.maxWidth / biggestWordCircle)) * glyph.width || glyph.width);
		canvas["height"] = biggestWordCircle * Math.ceil(glyphs / (Math.floor(option.maxWidth / glyph.width) || 1));
		canvas["currentX"] = glyph.width / 2;
		canvas["currentY"] = glyph.height / 2;
	} else {
		glyph = {
			width: consonant * 2.5,
			height: consonant * 6
		};
		canvas["width"] = (Math.min(++glyphs, Math.floor(option.maxWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
		canvas["height"] = glyph.height * (Math.ceil(++glyphs / (Math.floor(option.maxWidth / glyph.width) || 1)));
		canvas["currentX"] = 0;
		canvas["currentY"] = -glyph.height * .5;
	}
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);
	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	input.forEach(word => { // loop through sentence
		let wordlength = word.length;
		if (word.match(/(sh|wh|ph|ch)/g) != null) wordlength -= word.match(/(sh|wh|ph|ch)/g).length;
		let j = -1; // additional "iterator" to handle double letters (ch, sh, ph, wh)
		for (let i = 0; i < word.length; i++) { // loop through words
			let current = word[i],
				currenttwo = word[i] + word[i + 1];
			// add double latin characters to group
			if (includes(["ch", "sh", "ph", "wh"], currenttwo)) {
				current = currenttwo;
				i++;
			}
			j++;
			// draw
			fluxDraw(ctx, {
				char: current,
				wordlength: wordlength,
				index: j
			});
			if (!base.getBase(current)) unsupportedCharacters.add(current);
		}
		fluxDraw(ctx, {
			char: " ",
			wordlength: 0,
			index: 0
		});
	});

	// complain about unsupported characters
	unsupportedCharacters.get();

	return ctx;
}

//script specific replacements
function replacements(word) {
	let cword = "";
	for (let i = 0; i < word.length; i++) { // iterate through word 
		if (word[i] == "c") {
			if (word[i + 1] == "h") {
				cword += "c";
			} // ch is still allowed
			else if (includes(["e", "i", "y"], word[i + 1])) cword += "s";
			else cword += "k"; // end of the word
		} else cword += word[i];
	}
	return cword;
}

// draw instructions for base + decoration
function fluxDraw(ctx, current) {
	if (!option.circular || current.char == " ") {
		if (canvas.currentX + glyph.width >= canvas.width) {
			canvas.currentY += glyph.height;
			canvas.currentX = glyph.width / (option.circular ? 2 : 1);
		} else canvas.currentX += glyph.width;
	}
	let currentbase = base.getBase(current.char);
	if (!currentbase) return false;
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyph.height;
	if (option.circular) {
		rad = 1 + (2 / current.wordlength) * (current.index);
		wordCircleRadius = wordcircleRadius(current.wordlength, consonant) * 1.5;
	}

	if (currentbase) { // works only for defined characters
		// define basic positional arguments
		let center = { // relative center of base
			x: -1 * (wordCircleRadius * Math.sin(Math.PI * rad) + base.fluxtable[currentbase].centerYoffset * Math.sin(Math.PI * rad)),
			y: wordCircleRadius * Math.cos(Math.PI * rad) + base.fluxtable[currentbase].centerYoffset * Math.cos(Math.PI * rad)
		};

		// draw base and sentence line if applicable
		let angle = .068;
		if (option.circular) {
			angle = 1 / current.wordlength;
		}
		if (current.wordlength == 1 && option.circular) ctx.drawShape('circle', 1, {
			cx: canvas.currentX,
			cy: canvas.currentY,
			r: wordCircleRadius
		});
		else ctx.drawShape('path', 1, {
			d: ctx.circularArc(canvas.currentX, canvas.currentY, wordCircleRadius, Math.PI * (2.5 + rad - angle), Math.PI * (.5 + rad + angle)),
			fill: 'transparent'
		});

		// draw base
		let r = consonant;
		base.fluxtable[currentbase].draw(ctx, canvas.currentX + center.x, canvas.currentY + center.y, r, rad, current);

		// draw decorators
		let decorators = deco.getDeco(current.char);
		if (decorators) {
			decorators.forEach(decorator => {
				if (decorators)
					deco.draw(ctx, decorator, canvas.currentX + center.x, canvas.currentY + center.y, currentbase, rad);
			});
		}
	}
	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings unless it's a (numeral) control character
	let fontsize = parseFloat(getComputedStyle(document.body, null).fontSize),
		text = current.char;

	ctx.drawText(text, {
		x: canvas.currentX - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad),
		y: canvas.currentY + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad) + fontsize * .25
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