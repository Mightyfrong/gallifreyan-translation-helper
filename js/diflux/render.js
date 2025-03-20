import {
	includes,
	dimensionObj as dimension
} from '../main.js';
import {
	consonant,
	decorator,
	yoonScale
} from './setup.js';
import {
	difluxBase,
	difluxDeco,
	isYoon
} from './glyphs.js';

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};

const base = new difluxBase(consonant, decorator, yoonScale);
const deco = new difluxDeco(base);

let clip = false;
let invClip = false;

export function render(input, renderOptions, unsupportedCharacters, SVGRenderingContext) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// convert input-string to word array
	if(!option.casemark) input = input.toLowerCase();
	input = replacements(input).normalize("NFC").trim().replace(/\s+/g, " ").split(" ");

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
		let diacriticsCount =  word.match(/(\u0304|\u0331|\u030b|\u030a)/g); //diacritics that are not recognized as a single character
		if (diacriticsCount != null) wordlength -= diacriticsCount.length;
		if (option.dfalphabet == "extended") {
			let doubleLetters = word.match(/(ss|SS|ch|CH|gh|GH|wh|WH|ph|PH|ll|LL)/g); //lower and upper but not mixed cases arw considered as double letters
			if (doubleLetters != null) wordlength -= doubleLetters.length;
		}
		let j = 0;
		for (let i = 0; i < word.length; i++) { // loop through words
			let current = word[i],
				currenttwo = word[i] + word[i + 1];
			if ((option.dfalphabet == "extended" && currenttwo.match(/(ss|SS|ch|CH|gh|GH|wh|WH|ph|PH|ll|LL)/g))
				|| currenttwo.match(/[\u0304|\u0331|\u030b|\u030a]/g)) { //diacritics that are not recognized as a single character
				current = currenttwo;
				i++;
			}
			// draw
			difluxDraw(ctx, {
				char: current,
				wordlength: wordlength,
				index: j
			});
			j++;
			if (!base.getBase(current, option.dfalphabet)) unsupportedCharacters.add(current);
		}
		difluxDraw(ctx, {
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
	// No replacements for basic; q, x rules are too complex
	if (option.dfalphabet == "extended") {
		word = word.replace(/ng/g, "ŋ");
		word = word.replace(/sh/g, "ʃ");
		word = word.replace(/th/g, "þ");
	}
	return word;
}

// draw instructions for base + decoration
function difluxDraw(ctx, current) {
	if (!option.circular || current.char == " ") {
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, (option.circular ? .5 : 1));
	}
	let currentbase = base.getBase(current.char, option.dfalphabet);
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyphs.height;
	if (option.circular) {
		rad = 1 + (2 / current.wordlength) * (current.index);
		wordCircleRadius = dimension.wordcircleRadius(current.wordlength, consonant) * 1.5;
	}
	if (!current.index || !option.circular) clip = ctx.clipPath('circle', {
		cx: canvas.currentX,
		cy: canvas.currentY,
		r: wordCircleRadius
	});
	current.clip = clip;
	if (!current.index || !option.circular) {
		invClip = ctx.maskInit();
		ctx.maskPath(invClip.id, 'circle', {
			cx: canvas.currentX,
			cy: canvas.currentY,
			r: wordCircleRadius
		});
	}
	current.invClip = invClip;

	if (currentbase) { // works only for defined characters
		let yoon = isYoon(current.char);
		current.yoon = yoon;
		// define basic positional arguments
		let center = { // relative center of base
			x: -1 * (wordCircleRadius * Math.sin(Math.PI * rad) + base.difluxtable[currentbase].centerYoffset * Math.sin(Math.PI * rad) * (yoon ? yoonScale : 1)) ,
			y: wordCircleRadius * Math.cos(Math.PI * rad) + base.difluxtable[currentbase].centerYoffset * Math.cos(Math.PI * rad) * (yoon ? yoonScale : 1)
		};

		// draw base and sentence line if applicable
		let angle = .068,
			mask = false,
			r = yoon ? consonant * yoonScale : consonant;
		if (option.circular) {
			angle = 1 / current.wordlength;
		}
		if (includes([ "disk", "omega", "arc", "antiomega", "antiarc"], currentbase)) {
			mask = ctx.maskInit();
			ctx.maskPath(mask.id, 'circle', {
				cx: canvas.currentX + center.x,
				cy: canvas.currentY + center.y,
				r: r
			});
		}
		if (current.wordlength == 1 && option.circular) ctx.drawShape('circle', 1, {
			cx: canvas.currentX,
			cy: canvas.currentY,
			r: wordCircleRadius,
			mask: mask.url
		});
		else ctx.drawShape('path', 1, {
			d: ctx.circularArc(canvas.currentX, canvas.currentY, wordCircleRadius, Math.PI * (2.5 + rad - angle), Math.PI * (.5 + rad + angle)),
			fill: 'transparent',
			mask: mask.url
		});

		let decorators = deco.getDeco(current.char);
		current.decorators = decorators; // base needs mask if dicritic base is set
		// draw base
		base.difluxtable[currentbase].draw(ctx, canvas.currentX + center.x, canvas.currentY + center.y, r, rad, current);
		if (yoon) base.difluxtable[currentbase].draw(ctx, canvas.currentX + center.x, canvas.currentY + center.y, r*1.15, rad, current);

		// draw decorators
		if (decorators) {
			decorators.forEach(decorator => {
				if (decorators)
					deco.draw(ctx, decorator, canvas.currentX + center.x, canvas.currentY + center.y, currentbase, rad, current);
			});
		}
	}
	// text output for undefined characters as well for informational purpose
	if (current.char.length && current.char != " ") ctx.drawText(current.char, {
		x: canvas.currentX - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad),
		y: canvas.currentY + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad) + option.fontsize * .25
	});
}

function isMixedCase(word) {
	return word !== word.toLowerCase() && word !== word.toUpperCase();
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