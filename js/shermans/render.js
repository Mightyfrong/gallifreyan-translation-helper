import {
	includes
} from '../utils/funcs.js';
import {
	shermansBase,
	shermansDeco
} from './shermansGlyphs.js';
import {
	consonant,
	vowel
} from './setup.js';
import {
	UILanguage
} from '../UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';

let cLetter; // is there a "c"?
let qLetter; // is there a "q"?
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let glyph; // glyph dimensions-object
let option; // user option-object

// add module-specific language chunks
UILanguage.say.cLetter = {
	en: "Consider replacing C (marked red) with K or S exept when it's a name.",
	de: "Das rot markierte C sollte mit K oder S ersetzt werden, es sei denn es handelt sich um einen Namen.",
	lt: "Raudonai paryškinta C turi būti pakeista į K arba S, nebent tai yra vardas."
};
UILanguage.say.qLetter = {
	en: "I am guessing this is a name but if its not, what is a lone Q doing there?",
	de: "Vermutlich ist es ein Name, aber falls nicht: was macht ein einsames Q hier?",
	lt: "Manau, tai vardas, bet jei ne, koks vienišas Q yra ten?"
};

const base = new shermansBase(consonant, vowel);
const deco = new shermansDeco(base);

export function render(input) {
	//retrieve options and make them compact
	option = {
		circular: document.getElementById('scgcirc').checked,
		chandling: document.getElementById('scgc').checked,
		grouped: document.getElementById('scgg').checked
	};

	// convert input-string to grouped array and determine number of groups
	let groupedinput = shermansGrouped.groups(input.toLowerCase()),
		glyphs = 0,
		biggestWordCircle = 0;
	groupedinput.forEach(word => {
		word.forEach(groups => {
			if (option.circular) {
				let twc2 = Math.ceil(Math.sqrt(groups.length * Math.pow(2 * consonant, 2) / Math.PI)) * 1.5 * 3.25;
				if (biggestWordCircle < twc2) biggestWordCircle = twc2;
			} else {
				glyphs += groups.length;
			}
		});
		glyphs++;
	})
	// set canvas scale according to number of letters/groups
	if (option.circular) {
		glyph = {
			width: biggestWordCircle + consonant,
			height: biggestWordCircle
		};
		width = (Math.min(glyphs, Math.floor(window.innerWidth / biggestWordCircle)) * glyph.width || glyph.width);
		height = biggestWordCircle * Math.ceil(glyphs / (Math.floor(window.innerWidth / glyph.width) || 1));
		x = glyph.width / 2;
		y = glyph.height / 2;
	} else {
		glyph = {
			width: consonant * 2.5,
			height: consonant * 6
		};
		width = (Math.min(++glyphs, Math.floor(window.innerWidth / glyph.width)) * glyph.width - glyph.width || glyph.width);
		height = glyph.height * (Math.ceil(++glyphs / (Math.floor(window.innerWidth / glyph.width) || 1)));
		x = 0;
		y = -glyph.height * .5;
	}
	const ctx = new SVGRenderingContext(width, height);

	// initialize widths, heights, default-values, draw-object
	cLetter = false;
	qLetter = false;

	// iterate through input to set grouping instructions, handle exceptions and draw glyphs
	groupedinput.forEach(words => { // loop through sentence
		words.forEach(groups => { // loop through words
			let groupnum = 0;
			groups.forEach(group => { // loop through character-groups 
				groupnum++;
				// prepare resizing for stacked characters but vowels
				let lastStackedConsonantIndex = group.length - 1,
					vowelindex;
				// correction of initial resizing factor depending on last vowel within group
				"aeiou.,".split("").forEach(vowel => {
					vowelindex = group.indexOf(vowel);
					if (vowelindex > -1 && vowelindex <= lastStackedConsonantIndex) lastStackedConsonantIndex = vowelindex - 1;
				});
				// reset offsets but hand over possible resizing factor, first base, current group related to number of groups
				shermansGrouped.resetOffset(lastStackedConsonantIndex, base.getBase(group[0]), groups.length, groupnum);
				// iterate through characters within group
				for (let l = 0; l < group.length; l++) {
					// check whether an occuring dot or comma is a decimal sign or not
					let thicknumberline = /*is number group */ includes("1234567890", group[0]) && (
						( /*is comma*/ includes(",.", group[l])) ||
						( /*is last digit without comma*/ l == group.length - 1 && !includes(group, [",", "."]))
					);
					// adjust offset properties according to former character/base
					if (l > 0) shermansGrouped.setOffset(group[l - 1], group[l]);
					// draw
					shermansDraw(ctx, group[l], shermansGrouped, thicknumberline);
				}
			});
		});
		shermansGrouped.resetOffset();
		shermansDraw(ctx, " ", shermansGrouped);
	});
	// complain about c and q
	let output = "";
	if (cLetter) {
		output = UILanguage.write("cLetter");
	}
	if (qLetter) {
		output += "<br>" + UILanguage.write("qLetter");
	}
	document.getElementById("output").innerHTML = output;
	return ctx;
}

//script specific replacements
function replacements(word) {
	let cword = "";
	for (let i = 0; i < word.length; i++) { // iterate through word 
		if (word[i] == "c" && option.chandling) {
			if (word[i + 1] == "h") cword += "c"; // ch is still allowed
			else if (word[i + 1] == "k") continue; // omit ck
			else if (includes(["e", "i", "y"], word[i + 1])) cword += "s";
			else cword += "k"; // end of the word
		} else if (word[i] == "ß") cword += "ss";
		else cword += word[i];
	}
	return cword;
}

// set rules for grouping
let shermansGrouped = {
	groups: function (input) {
		// creates a multidimensional array for
		// sentence -> words -> groups -> single letters
		let sentence = [];
		let splitinput = input.trim().replace(/\s+/g, " ").split(" "); // trim and strip multiple whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); // init new word
			let group = [];
			sword = replacements(sword)
			for (let i = 0; i < sword.length; i++) { // iterate through word 
				let current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				// add double latin characters to group
				if (includes(["th", "gh", "ng", "qu", "wh", "sh", "ph", "ch"], currenttwo)) {
					current = currenttwo;
					i++;
				}
				if (option.grouped && group.length > 0) {
					// add vowels if none or the same, consonants of same base, numbers to former group if selected
					let former = group[group.length - 1][group[group.length - 1].length - 1];
					if (
						( /*vowels */ includes(["ve", "va", "vo"], base.getBase(current)) && (!includes(["ve", "va", "vo", "number"], base.getBase(former)) || base.getBase(current) == base.getBase(former))) ||
						( /*same base consonant*/ !includes([false, "punctuation", "ve", "va", "vo", "number"], base.getBase(current)) && group[group.length - 1].length > 0 && base.getBase(current) == base.getBase(former)) ||
						( /*numbers, data is of string type here*/ includes("-1234567890,.", current) && group[group.length - 1].length > 0 && includes("-1234567890,.", former) && !(includes("-.,", current) && includes("-.,", former)))
					)
						group[group.length - 1].push(current)
					else // create/add to current group
						group.push([current]);
				} else // create/add to current group
					group.push([current]);
			}
			// add control characters to the number group
			if (includes("1234567890", group[group.length - 1][0])) group[group.length - 1].push("/");
			if (group[group.length - 1][0] === "-" && includes("1234567890", group[group.length - 1][1])) {
				group[group.length - 1].shift();
				group[group.length - 1][group[group.length - 1].length] = ("\\");
			}
			sentence[sentence.length - 1].push(group); // append group to last word
		});
		return sentence;
	},
	resetOffset: function (lastStackedConsonantIndex = 0, currentbase = false, numberOfGroups = 0, currentGroup = 0) {
		this.carriagereturn = false; // true overrides setting the pointer-position to the next character
		this.vresize = 1; // vowel-size-factor
		this.cresize = (1 / .8) ** lastStackedConsonantIndex; // consonant-resize-factor, something the power of null is one
		this.offset = 0; // counter of stacked objects, used for positioning the translated letters on top of the drawings
		this.linewidth = 1; // initial line width
		this.numberOfGroups = numberOfGroups; // number of groups in current word
		this.currentGroup = currentGroup; // position of current group
		this.groupBase = currentbase; // base of group
	},
	setOffset: function (former, actual) {
		this.offset++;
		this.carriagereturn = true;
		let actualbase = base.getBase(actual)
		let formerbase = base.getBase(former)
		if (includes(["b", "j", "t", "th"], formerbase)) {
			if (actualbase === formerbase) {
				this.cresize *= .8;
				if (former != actual) this.linewidth += 1;
			}
		} else if (includes(["number"], formerbase)) {
			this.cresize *= .8;
		} else {
			/*vovel*/
			this.vresize *= .8;
			if (former != actual) this.linewidth += 1;
		}
	}
}

// draw instructions for base + decoration
function shermansDraw(ctx, letter, grouped, thicknumberline) {
	if (!option.circular || letter == " ") {
		if (!grouped.carriagereturn) { // if not grouped set pointer to next letter position or initiate next line if canvas boundary is reached
			if (x + glyph.width >= width) {
				y += glyph.height;
				x = glyph.width / (option.circular ? 2 : 1);
			} else x += glyph.width;
		}
	}
	let currentbase = base.getBase(letter);
	// rotation of charactergroups in regards of circular display
	let rad = 0,
		wordCircleRadius = glyph.height;
	if (option.circular) {
		rad = -(2 / grouped.numberOfGroups) * (grouped.currentGroup - 1);
		wordCircleRadius = Math.ceil(Math.sqrt(grouped.numberOfGroups * Math.pow(2 * consonant, 2) / Math.PI)) * 1.5;
	}

	if (currentbase) { // works only for defined characters
		cLetter = letter == "c";
		qLetter = letter == "q";

		// define basic positional arguments
		let voweloffset;
		if (includes(["ve", "va", "vo"], currentbase) && !includes(["ve", "va", "vo"], grouped.groupBase))
			voweloffset = base.scgtable[grouped.groupBase].radialPlacement(.25 + rad, currentbase);
		else voweloffset = {
			x: 0,
			y: 0
		};
		let center = { // relative center of base plus relative position of grouped vowels
			x: -1 * (wordCircleRadius * Math.sin(Math.PI * rad) + base.scgtable[grouped.groupBase].centerYoffset * Math.sin(Math.PI * rad) + voweloffset.x),
			y: wordCircleRadius * Math.cos(Math.PI * rad) + base.scgtable[grouped.groupBase].centerYoffset * Math.cos(Math.PI * rad) + voweloffset.y
		};

		// draw base and sentence line if applicable
		let angle = .068;
		if (option.circular) {
			angle = 1 / grouped.numberOfGroups;
		}
		if (!grouped.carriagereturn || includes(["b", "t"], currentbase)) {
			if (grouped.numberOfGroups == 1 && option.circular) ctx.drawShape('circle', 1, {
				cx: x,
				cy: y,
				r: wordCircleRadius
			});
			else ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, wordCircleRadius, Math.PI * (2.5 + rad - angle), Math.PI * (.5 + rad + angle)),
				fill: 'transparent'
			});
		}
		if (includes(["punctuation"], currentbase) && !thicknumberline) {
			ctx.drawShape('path', 1, {
				d: ctx.circularArc(x, y, wordCircleRadius + 2 * consonant, Math.PI * (2.5 + rad - angle), Math.PI * (.5 + rad + angle)),
				fill: 'transparent'
			});
		}

		// draw base
		let r = consonant * grouped.cresize;
		if (thicknumberline) grouped.linewidth = 2;

		const hasPunc = includes(["punctuation"], currentbase);
		if (!hasPunc || (hasPunc && !thicknumberline)) {
			if (includes(["ve", "va", "vo"], currentbase)) r = vowel * grouped.vresize;
			base.scgtable[currentbase].draw(ctx, x + center.x, y + center.y, r, rad, grouped);
		}

		// draw decorators
		let decorators = deco.getDeco(letter);
		if (decorators) {
			decorators.forEach(decorator => {
				if (decorators && !thicknumberline)
					deco.draw(ctx, decorator, x + center.x, y + center.y, currentbase, rad, grouped, letter);
			});
		}
	}
	// text output for undefined characters as well for informational purpose
	// print character translation above the drawings unless it's a (numeral) control character
	if (!includes([" ", "/", "\\"], letter)) ctx.drawText(letter, {
		x: x - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad) + grouped.offset * 8,
		y: y + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad)
	});
	// add a minus sign in from of the translation above the drawings if applicable
	if (includes(["\\"], letter)) ctx.drawText("-", {
		x: x - (wordCircleRadius + consonant * 2) * Math.sin(Math.PI * rad) - 1 * 8,
		y: y + (wordCircleRadius + consonant * 2) * Math.cos(Math.PI * rad)
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