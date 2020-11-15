import {
	UILanguage
} from '../utils/UILanguage.js'
import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';

let glyphSize = 30; // radius of glyphs
let lineweight = 1; // thicker lines add a cute chubbyness
let width; // canvas width
let height; // canvas height
let x; // current coordinate x
let y; // current coordinate y
let letterwidth; // you'll figure that one out for yourself
let letterheight; // you'll figure that one out for yourself
let warning = ""; // used if undefined characters are part of the input
const FILLED = true;

// add module-specific language chunks
UILanguage.say.processError = {
	en: "The following characters could not be processed: ",
	de: "Die folgenden Zeichen konnten nicht verarbeitet werden: ",
	lt: "Nepavyko apdoroti šių simbolių: "
};

class character {
	constructor(ctx, x, y, r, lineweight) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.r = r;
		this.lineweight = lineweight;
		this.inverse = false;
	}
	outer(filled = false) {
		this.ctx.drawShape('circle', filled ? 0 : this.lineweight, {
			cx: this.x,
			cy: this.y,
			r: this.r
		});
		this.inverse = Boolean(filled);
	}
	inner(filled = false) {
		let col = this.inverse ? document.getElementById('backgroundcolor').value : null;
		this.ctx.drawShape('circle', filled ? 0 : this.lineweight, {
			cx: this.x,
			cy: this.y,
			r: this.r * .5,
			stroke: col,
			fill: filled ? col : null
		});
	}
	middle(rad, cutout = false) {
		let col = cutout ?
			(this.inverse ? document.getElementById('foregroundcolor').value : document.getElementById('backgroundcolor').value) :
			(this.inverse ? document.getElementById('backgroundcolor').value : null);

		this.ctx.drawShape('circle', cutout ? 5 : this.lineweight, {
			cx: this.x + Math.cos(Math.PI * rad) * this.r * .5,
			cy: this.y + Math.sin(Math.PI * rad) * this.r * .5,
			r: this.r * .35,
			stroke: col,
			fill: cutout ? col : null
		});
	}
	bullseye(filled = false) {
		let col = this.inverse ? document.getElementById('backgroundcolor').value : null;
		let fill = this.inverse ? document.getElementById('foregroundcolor').value : document.getElementById('backgroundcolor').value;
		this.ctx.drawShape('circle', filled ? 0 : this.lineweight, {
			cx: this.x,
			cy: this.y,
			r: this.r * .2,
			stroke: col,
			fill: fill
		});
	}
	upperChar(rad, pos, filled = false) {
		let col = this.inverse ? document.getElementById('backgroundcolor').value : null;
		let fill = this.inverse ?
			(filled ? document.getElementById('backgroundcolor').value : document.getElementById('foregroundcolor').value) :
			(filled ? document.getElementById('foregroundcolor').value : document.getElementById('backgroundcolor').value);
		this.ctx.drawShape('circle', filled ? 0 : this.lineweight, {
			cx: this.x + Math.cos(Math.PI * rad) * this.r * pos,
			cy: this.y + Math.sin(Math.PI * rad) * this.r * pos,
			r: this.r * .2,
			stroke: col,
			fill: fill
		});
	}
}

//specify forms and positions
let characters = {
	a: function (draw, uc = false) {
		draw.outer();
		draw.inner(FILLED);
		if (uc) draw.upperChar(1, .3);
	},
	b: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner();
		draw.middle(1.5);
		if (uc) draw.upperChar(.5, .5);
	},
	c: function (draw, uc = false) {
		draw.outer();
		draw.inner(FILLED);
		draw.middle(0, 'cutout');
		if (uc) draw.upperChar(0, .5);
	},
	d: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner(FILLED);
		draw.middle(.5, 'cutout');
		if (uc) draw.upperChar(.5, .5);
	},
	e: function (draw, uc = false) {
		draw.outer();
		if (uc) draw.upperChar(0, 1);
	},
	f: function (draw, uc = false) {
		draw.outer();
		draw.inner();
		draw.middle(1);
		if (uc) draw.upperChar(0, 1);
	},
	g: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner();
		draw.middle(.5);
		if (uc) draw.upperChar(1.5, .5);
	},
	h: function (draw, uc = false) {
		draw.outer();
		draw.inner(FILLED);
		draw.middle(.5, 'cutout');
		if (uc) draw.upperChar(.5, .5);
	},
	i: function (draw, uc = false) {
		draw.outer();
		draw.inner();
		if (uc) draw.upperChar(0, 1);
	},
	j: function (draw, uc = false) {
		draw.outer();
		draw.inner();
		draw.bullseye();
		if (uc) draw.upperChar(0, 1);
	},
	k: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner();
		draw.middle(0);
		if (uc) draw.upperChar(1, .5);
	},
	l: function (draw, uc = false) {
		draw.outer();
		draw.inner(FILLED);
		draw.middle(1.5, 'cutout');
		if (uc) draw.upperChar(1.5, .5);
	},
	m: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner(FILLED);
		draw.middle(0, 'cutout');
		if (uc) draw.upperChar(0, .5);
	},
	n: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner();
		if (uc) draw.upperChar(0, .8);
	},
	o: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner(FILLED);
		if (uc) draw.upperChar(1, .3);
	},
	p: function (draw, uc = false) {
		draw.outer();
		draw.inner();
		draw.middle(1.5);
		if (uc) draw.upperChar(0, 1);
	},
	q: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner(FILLED);
		draw.bullseye(FILLED);
		if (uc) draw.upperChar(0, .7);
	},
	r: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner(FILLED);
		draw.middle(1, 'cutout');
		if (uc) draw.upperChar(1, .5);
	},
	s: function (draw, uc = false) {
		draw.outer();
		draw.inner(FILLED);
		draw.middle(1, 'cutout');
		if (uc) draw.upperChar(1, .5);
	},
	t: function (draw, uc = false) {
		draw.outer(FILLED);
		if (uc) draw.upperChar(0, .7);
	},
	u: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner(FILLED);
		draw.middle(1.5, 'cutout');
		if (uc) draw.upperChar(1.5, .5);
	},
	v: function (draw, uc = false) {
		draw.outer();
		draw.inner();
		draw.middle(0);
		if (uc) draw.upperChar(0, 1);
	},
	w: function (draw, uc = false) {
		draw.outer();
		draw.inner();
		draw.middle(.5);
		if (uc) draw.upperChar(0, 1);
	},
	x: function (draw, uc = false) {
		draw.outer();
		draw.inner(FILLED);
		draw.bullseye();
		if (uc) draw.upperChar(0, 1);
	},
	y: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner();
		draw.middle(1);
		if (uc) draw.upperChar(0, .5);
	},
	z: function (draw, uc = false) {
		draw.outer(FILLED);
		draw.inner();
		draw.bullseye();
		if (uc) draw.upperChar(0, .5);
	},
	" ": function (draw, uc = false) {}
}

// scroll through input and draw every letter
export function render(input) {
	// initialize widths, heights, default-values, draw-object
	warning = "";
	letterwidth = glyphSize * 2.2;
	letterheight = glyphSize * 4;

	x = 0;
	y = letterheight * .6;

	// set canvas scale according to number of characters
	width = Math.min(input.length + 1, Math.floor(window.innerWidth / letterwidth)) * letterwidth;
	height = letterheight * Math.ceil(input.length / Math.floor(window.innerWidth / letterwidth));
	const ctx = new SVGRenderingContext(width, height);

	// iterate through input
	for (let i = 0; i < input.length; i++) {
		// position pointer
		if (x + letterwidth * 1.5 >= width) {
			y += letterheight;
			x = letterwidth;
		} else x += letterwidth;

		if (input[i].toLowerCase() in characters) {
			// draw character
			let draw = new character(ctx, x, y, glyphSize, lineweight);
			characters[input[i].toLowerCase()](draw, input[i] == input[i].toUpperCase());

		} else warning += ", " + input[i];

		// print character translation above the drawings
		ctx.drawText(input[i], {
			x: x,
			y: y - glyphSize * 1.5
		});

	}

	// complain about undefined characters
	if (warning) document.getElementById("output").innerHTML = UILanguage.write("processError") + warning.substr(2);
	else document.getElementById("output").innerHTML = "";

	return ctx;
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