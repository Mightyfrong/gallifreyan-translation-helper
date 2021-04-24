import {
	includes,
	dimensionObj
} from '../main.js';
import {
	consonant,
	decorator
} from './setup.js';
import {
	fluxBase,
	fluxDeco
} from './glyphs.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};
let dimension = new dimensionObj(); // utility to calculate word-circle- and canvas dimensions

const base = new fluxBase(consonant, decorator);
const deco = new fluxDeco(base);

let clip = false;

export function render(input, renderOptions, unsupportedCharacters, SVGRenderingContext) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// convert input-string to word array
	input = replacements(input).toLowerCase().trim().replace(/\s+/g, " ").split(" ");
	let biggestWordCircle = 0;
	glyphs.num = 0; // reset for new input

	input.forEach(word => {
		if (option.circular) {
			let twc2 = dimension.wordcircleRadius(word.length, consonant) * 4.5;
			if (biggestWordCircle < twc2) biggestWordCircle = twc2;
		} else {
			glyphs.num += word.length;
		}
		glyphs.num++;
	});
	// set canvas settings according to number of letters/groups
	if (option.circular) {
		glyphs.width = biggestWordCircle + consonant;
		glyphs.height = biggestWordCircle;
		canvas["currentX"] = glyphs.width * .5;
		canvas["currentY"] = glyphs.height * .5;
	} else {
		glyphs.width = consonant * 2.5;
		glyphs.height = consonant * 6;
		canvas["currentX"] = 0;
		canvas["currentY"] = -glyphs.height * .5;
	}
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

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
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, (option.circular ? .5 : 1));
	}
	let currentbase = base.getBase(current.char);
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyphs.height;
	if (option.circular) {
		rad = 1 + (2 / current.wordlength) * (current.index);
		wordCircleRadius = dimension.wordcircleRadius(current.wordlength, consonant) * 1.5;
	}
	if (!current.index) clip = ctx.clipPath('circle', {
		cx: canvas.currentX,
		cy: canvas.currentY,
		r: wordCircleRadius
	});
	current.clip = clip;

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
	if (current.char.length && current.char != " ") ctx.drawText(current.char, {
		x: canvas.currentX - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad),
		y: canvas.currentY + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad) + option.fontsize * .25
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