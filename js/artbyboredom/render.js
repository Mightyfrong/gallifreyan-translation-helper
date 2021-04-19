import {
	SVGRenderingContext
} from '../utils/SVGRenderingContext.js';
import {
	dimensionObj
} from '../utils/funcs.js';

let glyphSize = 30; // radius of glyphs
let lineweight = 1; // thicker lines add a cute chubbyness
const FILLED = true;

let canvas = {}; // canvas properties
let option; // user selected render options handler
let glyphs = { // glyph dimensions object
	num: 0,
	width: 0,
	height: 0
};
let dimension = new dimensionObj(); // utility to calculate word-circle- and canvas dimensions

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
		let col = this.inverse ? option.backgroundcolor : null;
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
			(this.inverse ? option.foregroundcolor : option.backgroundcolor) :
			(this.inverse ? option.backgroundcolor : null);

		this.ctx.drawShape('circle', cutout ? 5 : this.lineweight, {
			cx: this.x + Math.cos(Math.PI * rad) * this.r * .5,
			cy: this.y + Math.sin(Math.PI * rad) * this.r * .5,
			r: this.r * .35,
			stroke: col,
			fill: cutout ? col : null
		});
	}
	bullseye(filled = false) {
		let col = this.inverse ? option.backgroundcolor : null;
		let fill = this.inverse ? option.foregroundcolor : option.backgroundcolor;
		this.ctx.drawShape('circle', filled ? 0 : this.lineweight, {
			cx: this.x,
			cy: this.y,
			r: this.r * .2,
			stroke: col,
			fill: fill
		});
	}
	upperChar(rad, pos, filled = false) {
		let col = this.inverse ? option.backgroundcolor : null;
		let fill = this.inverse ?
			(filled ? option.backgroundcolor : option.foregroundcolor) :
			(filled ? option.foregroundcolor : option.backgroundcolor);
		this.ctx.drawShape('circle', filled ? 0 : this.lineweight, {
			cx: this.x + Math.cos(Math.PI * rad) * this.r * pos,
			cy: this.y + Math.sin(Math.PI * rad) * this.r * pos,
			r: this.r * .2,
			stroke: col,
			fill: fill
		});
	}
	path(path, filled = false) {
		// this method assumes the provided paths have relative coordinates
		// the used paths within this module were created with inkscape on a 30x30mm canvas for being a bit too complex to create them reasonably programmatically
		// in the end i wanted to get things done.

		const add = { // put x and y into usable scope, set correction value
			x: this.x - glyphSize * .66,
			y: this.y - glyphSize * 1.5,
			scale: glyphSize / 15
		};
		path = path.replace(/-{0,1}\d+\.{0,1}\d*/g, coords => { // find all numbers and rescale
			return coords * add.scale;
		});
		path = path.replace(/-{0,1}\d+\.{0,1}\d*,-{0,1}\d+\.{0,1}\d*/, coords => { // find first coordinate to add current position
			let c = coords.split(",");
			return (parseFloat(c[0]) + add.x) + "," + (parseFloat(c[1]) + add.y);
		});

		this.ctx.drawShape('path', filled ? 0 : this.lineweight, {
			d: path
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
	" ": function (...args) {},
	",": function (draw, ...args) {
		draw.path("m 13.595633,32.191991 -7.3418024,0 -3.670901,-6.358188 3.6709016,-6.358188 7.3418028,10e-7 3.670901,6.358188 z");
	},
	".": function (draw, ...args) {
		draw.upperChar(.5, .5, FILLED);
	},
	";": function (draw, ...args) {
		draw.path("m 15.00093,10.625191 v 12.716536 h 3.733622 l 3.671094,-6.358268 -3.671094,-6.358268 z");
	},
	":": function (draw, ...args) {
		draw.path("m 11.392365,10.625191 -3.670578,6.358268 3.670578,6.358268 h 3.733622 v -12.716536 z", FILLED);
	},
	"-": function (draw, ...args) {
		draw.path("m 11.431389,10.838314 -3.632085,6.203892 14.530107,0.08882 -3.556487,-6.247831 z m 10.898022,6.292708 0.07567,0.132757 -0.07781,0.132853 3.493778,0.02136 0.0017,-0.265612 z m -0.0022,0.26561 -14.5290749,-0.08881 3.5554609,6.246795 7.341535,0.04488 z m -14.5290749,-0.08881 -0.076181,-0.133792 0.077287,-0.131821 -3.2245485,-0.01972 -0.00162,0.265612 z M 24.340993,13.530036 c -0.113786,-7.5e-4 -0.203751,0.107593 -0.20454,0.236982 -7.48e-4,0.129387 0.08785,0.236703 0.20164,0.237399 0.113783,7.5e-4 0.203737,-0.105534 0.204529,-0.234917 7.47e-4,-0.129385 -0.08784,-0.238771 -0.201629,-0.239464 z m -1.94e-4,0.03307 c 0.0934,4.84e-4 0.171011,0.0915 0.170309,0.2062 -7.44e-4,0.114705 -0.07941,0.204674 -0.172817,0.204102 -0.0934,-4.85e-4 -0.171526,-0.0915 -0.170826,-0.206204 7.44e-4,-0.114706 0.07992,-0.20467 0.173334,-0.204098 z");
	},
	"/": function (draw, ...args) {
		draw.path("m 20.502037,7.3786422 -2.112871,3.5484508 0.16845,0.0023 0.06662,0.119245 2.104409,-3.5340934 z m -1.877804,3.6699598 -7.4416,12.499313 7.204078,0.09683 3.756215,-6.308355 z m -7.4416,12.499313 -0.13693,-0.0018 -0.08226,-0.147363 -2.2820687,3.83249 0.2286991,0.133827 z m -0.219189,-0.149203 7.425722,-12.471619 -7.172557,-0.09641 -3.7556985,6.308363 z");
	},
	'"': function (draw, ...args) {
		draw.path("m 15.00093,7.4235055 -0.04633,3.4216995 0.263525,0.0036 0.04633,-3.4216995 z m 0.217198,3.4252675 -0.172157,12.715371 3.601001,0.04875 3.756319,-6.307993 -3.584162,-6.407378 z m -0.172157,12.715371 -0.263525,-0.0036 -0.0444,3.279085 0.263525,0.0036 z m -0.263525,-0.0036 0.172157,-12.715371 -3.476472,-0.04707 -3.7568357,6.307986 3.5846787,6.407385 z m 9.623392,-9.874664 a 0.20862549,0.20862549 0 0 0 -0.21158,0.205928 0.20862549,0.20862549 0 0 0 0.205934,0.211063 0.20862549,0.20862549 0 0 0 0.211573,-0.205411 0.20862549,0.20862549 0 0 0 -0.205927,-0.21158 z");
	},
	"'": function (draw, ...args) {
		draw.path("m 15.00093,7.437605 -0.04636,3.421699 0.263525,0.0036 0.04636,-3.4216994 z m 0.217164,3.42527 -0.172281,12.715369 3.601,0.04879 3.756381,-6.307956 -3.584099,-6.407413 z m -0.172281,12.715369 -0.263526,-0.0036 -0.04443,3.279085 0.263525,0.0036 z m -0.263526,-0.0036 0.172282,-12.715369 -3.476471,-0.0471 -3.7568979,6.307949 3.5846159,6.40742 z");
	}
}

// scroll through input and draw every letter
export function render(input, renderOptions, unsupportedCharacters) {
	//retrieve options and make them compact
	option = renderOptions.get();

	// initialize widths, heights, default-values, draw-object
	glyphs.width = glyphSize * 2.2;
	glyphs.height = glyphSize * 4;
	glyphs.num = input.length+1;

	// set canvas scale according to number of characters
	canvas["currentX"] = 0;
	canvas["currentY"] = glyphs.height * .4;
	canvas["width"] = dimension.canvas(glyphs, option.maxWidth).width;
	canvas["height"] = dimension.canvas(glyphs, option.maxWidth).height;
	const ctx = new SVGRenderingContext(canvas.width, canvas.height);

	// iterate through input
	for (let i = 0; i < input.length; i++) {
		// position pointer
		canvas = dimension.carriageReturn(canvas, glyphs, 1);

		if (input[i].toLowerCase() in characters) {
			// draw character
			let draw = new character(ctx, canvas.currentX, canvas.currentY, glyphSize, lineweight);
			characters[input[i].toLowerCase()](draw, input[i] == input[i].toUpperCase());

		} else unsupportedCharacters.add(input[i]);

		// text output for undefined characters as well for informational purpose
		ctx.drawText(input[i], {
			x: canvas.currentX,
			y: canvas.currentY + glyphSize * 1.5
		});
	}

	// complain about undefined characters
	unsupportedCharacters.get();

	return ctx;
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
