import {
	renderOptions
} from '../main.js';

export class clockworkConsonants {
	constructor() {
		this.glyphs = {
			b: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.8 + tilt), Math.PI * (2.5 + tilt), "major")
					});
					ctx.drawShape('circle', 4, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			d: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 4, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			f: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, Math.PI * (.39 + tilt), Math.PI * (1.91 + tilt), "major")
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (.15 + tilt)) * r, y + Math.sin(Math.PI * (.15 + tilt)) * r, r * .75, Math.PI * (.775 + tilt), Math.PI * (1.525 + tilt), "minor")
					});
				}
			},
			g: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.05 + tilt), Math.PI * (1.65 + tilt), "major")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.85 + tilt)) * r * .9, r * .6, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 4, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			ʒ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('line', 4, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			h: {
				draw: function (ctx, x, y, r, tilt) {
					let points = "";
					for (let i = 0; i < 2; i += 2 / 6) {
						points +=
							(x + Math.cos(Math.PI * (i + tilt)) * r) +
							"," +
							(y + Math.sin(Math.PI * (i + tilt)) * r) +
							" ";
					}
					ctx.drawShape('polygon', 1, {
						points: points
					});
				}
			},
			ʤ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 4, {
						cx: x + Math.cos(Math.PI * (.85 + tilt)) * r * .2,
						cy: y + Math.sin(Math.PI * (.85 + tilt)) * r * .2,
						r: r * .8
					});
					ctx.drawShape('circle', 4, {
						cx: x - Math.cos(Math.PI * (.85 + tilt)) * r * .6,
						cy: y - Math.sin(Math.PI * (.85 + tilt)) * r * .6,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 4, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			k: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * 1.1, Math.PI * (.05 + tilt), Math.PI * (1.65 + tilt), "major")
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r, y + Math.sin(Math.PI * (1.85 + tilt)) * r, r * .65, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r * 1.1,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r * 1.1,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			l: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 0, {
						cx: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						cy: y - Math.sin(Math.PI * (1.1 + tilt)) * r,
						r: 8
					});
					ctx.drawShape('line', 4, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			m: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.8 + tilt), Math.PI * (2.5 + tilt), "major")
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.8 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.8 + tilt)) * r,
						r: 8
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (2.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (2.5 + tilt)) * r,
						r: 8
					});
				}
			},
			n: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.35 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.35 + tilt)) * r,
						r: 8
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.35 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.35 + tilt)) * r,
						r: 8
					});
				}
			},
			p: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, Math.PI * (.8 + tilt), Math.PI * (2.5 + tilt), "major")
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			kw: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.05 + tilt), Math.PI * (.65 + tilt), "minor")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (1.05 + tilt), Math.PI * (1.65 + tilt), "minor")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.85 + tilt)) * r * .9, r * .6, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.85 + tilt)) * r * 1.5,
						cy: y + Math.sin(Math.PI * (1.85 + tilt)) * r * 1.5,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});

					r *= .7;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r, Math.PI * (.05 + tilt), Math.PI * (1.65 + tilt), "major")
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.85 + tilt)) * r * .9, r * .6, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.85 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.85 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			ɹ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.85 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.85 + tilt)) * r,
						r: 8
					});
				}
			},
			s: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			t: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			v: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.39 + tilt), Math.PI * (1.91 + tilt), "major")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (.15 + tilt)) * r, y + Math.sin(Math.PI * (.15 + tilt)) * r, r * .75, Math.PI * (.775 + tilt), Math.PI * (1.525 + tilt), "minor")
					});
				}
			},
			w: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.05 + tilt), Math.PI * (.65 + tilt), "minor")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (1.05 + tilt), Math.PI * (1.65 + tilt), "minor")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.85 + tilt)) * r * .9, r * .6, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.85 + tilt)) * r * 1.5,
						cy: y + Math.sin(Math.PI * (1.85 + tilt)) * r * 1.5,
						r: 8
					});
				}
			},
			ks: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					r *= .6;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x, y, r * 1.1, Math.PI * (.05 + tilt), Math.PI * (1.65 + tilt), "major")
					});
					ctx.drawShape('path', 1, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r, y + Math.sin(Math.PI * (1.85 + tilt)) * r, r * .65, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r * 1.1,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r * 1.1,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
				}
			},
			j: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .7;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.05 + tilt), Math.PI * (1.65 + tilt), "major")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.85 + tilt)) * r * .9, r * .6, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8
					});
					ctx.drawShape('line', 4, {
						x1: x + Math.cos(Math.PI * (1.85 + tilt)) * r * 1.5,
						y1: y + Math.sin(Math.PI * (1.85 + tilt)) * r * 1.5,
						x2: x + Math.cos(Math.PI * (1.85 + tilt)) * r * 1.8,
						y2: y + Math.sin(Math.PI * (1.85 + tilt)) * r * 1.8
					});
				}
			},
			z: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			ʧ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.85 + tilt)) * r * .2,
						cy: y + Math.sin(Math.PI * (.85 + tilt)) * r * .2,
						r: r * .8
					});
					ctx.drawShape('circle', 1, {
						cx: x - Math.cos(Math.PI * (.85 + tilt)) * r * .6,
						cy: y - Math.sin(Math.PI * (.85 + tilt)) * r * .6,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ŋ: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					x += Math.cos(Math.PI * (.85 + tilt)) * r * .2;
					y += Math.sin(Math.PI * (.85 + tilt)) * r * .2;
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x, y, r, Math.PI * (.05 + tilt), Math.PI * (1.65 + tilt), "major")
					});
					ctx.drawShape('path', 4, {
						d: ctx.circularArc(x + Math.cos(Math.PI * (1.85 + tilt)) * r * .9, y + Math.sin(Math.PI * (1.85 + tilt)) * r * .9, r * .6, Math.PI * (1.3 + tilt), Math.PI * (2.4 + tilt), "major")
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (.35 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.35 + tilt)) * r,
						r: 8
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * (1.35 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.35 + tilt)) * r,
						r: 8
					});
				}
			},
			ʃ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			θ: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.75 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.75 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (0 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (0 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (0 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0 + tilt)) * r
					});
				}
			},
			ð: {
				draw: function (ctx, x, y, r, tilt) {
					r *= .8;
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r
					});
					ctx.drawShape('line', 4, {
						x1: x + Math.cos(Math.PI * (1.75 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.75 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.75 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.75 + tilt)) * r
					});
					ctx.drawShape('line', 4, {
						x1: x + Math.cos(Math.PI * (0 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (0 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (0 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0 + tilt)) * r
					});
				}
			}
		}
	}
	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let keys = [];
		Object.keys(this.glyphs).forEach(key => {
			keys.push([key, key.length > 1 ? '/' + key + '/' : key]);
		});
		return [keys];
	}
}

export class clockworkVowels {
	constructor() {
		this.glyphs = {
			i: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
				}
			},
			aɪ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
					ctx.drawShape('circle', 0, {
						cx: x,
						cy: y,
						r: r * .5
					});
				}
			},
			aʊ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
					ctx.drawShape('circle', 0, {
						cx: x,
						cy: y,
						r: r * .5
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			u: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ɛ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .8
					});
				}
			},
			ɜ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .8
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ʌ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .8
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ɔ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .8
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.5 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ɪ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
				}
			},
			eɪ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r * .75
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
				}
			},
			oʊ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r * .75
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ʊ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.25 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.25 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (0.5 + tilt)) * r,
						y1: y - Math.sin(Math.PI * (0.5 + tilt)) * r,
						x2: x + Math.cos(Math.PI * (0.5 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (0.5 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			æ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 0, {
						cx: x,
						cy: y,
						r: r * .5
					});
				}
			},
			ə: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .8
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r * .6
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ɑ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 0, {
						cx: x,
						cy: y,
						r: r * .5
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			ɒ: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 0, {
						cx: x,
						cy: y,
						r: r * .5
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.5 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			e: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r * .75
					});
				}
			},
			o: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 4, {
						cx: x,
						cy: y,
						r: r * .75
					});
					ctx.drawShape('circle', 1, {
						cx: x + Math.cos(Math.PI * (1.5 + tilt)) * r,
						cy: y + Math.sin(Math.PI * (1.5 + tilt)) * r,
						r: 8,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('line', 1, {
						x1: x + Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y + Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x + Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y + Math.sin(Math.PI * (1.1 + tilt)) * r
					});
					ctx.drawShape('line', 1, {
						x1: x - Math.cos(Math.PI * (1.1 + tilt)) * r * 1.7,
						y1: y - Math.sin(Math.PI * (1.1 + tilt)) * r * 1.7,
						x2: x - Math.cos(Math.PI * (1.1 + tilt)) * r,
						y2: y - Math.sin(Math.PI * (1.1 + tilt)) * r
					});
				}
			},
			a: {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: r,
						fill: renderOptions.get().backgroundcolor
					});
					ctx.drawShape('circle', 0, {
						cx: x,
						cy: y,
						r: r * .5
					});
				}
			}
		};
	}

	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let keys = [];
		Object.keys(this.glyphs).forEach(key => {
			keys.push([key, key.length > 1 ? '/' + key + '/' : key]);
		});
		return [keys];
	}
}

export class clockworkPunctuation {
	constructor() {
		this.glyphs = {
			";": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 8, {
						cx: x + Math.cos(Math.PI * (1.1 + tilt)) * r * .35,
						cy: y + Math.sin(Math.PI * (1.1 + tilt)) * r * .35,
						r: r * .7
					});
					ctx.drawShape('circle', 1, {
						cx: x - Math.cos(Math.PI * (1.1 + tilt)) * r * .35,
						cy: y - Math.sin(Math.PI * (1.1 + tilt)) * r * .35,
						r: r * .7
					});
				}
			},
			",": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: r
					});
				}
			},
			".": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: r * .9
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: (r * .95 - r * .9 > 8 ? r * .95 : r * 1.2) // make it distinguishable for linear display
					});
				}
			},
			"!": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: r * .9
					});
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: (r * .95 - r * .9 > 8 ? r * .95 : r * 1.2) // make it distinguishable for linear display
					});
				}
			},
			"?": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: r * .9
					});
					ctx.drawShape('circle', 1, {
						cx: x,
						cy: y,
						r: (r * .95 - r * .9 > 8 ? r * .95 : r * 1.2) // make it distinguishable for linear display
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * .25) * r * .925,
						cy: y + Math.sin(Math.PI * .25) * r * .925,
						r: 20
					});
				}
			},
			"‽": {
				draw: function (ctx, x, y, r, tilt) {
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: r * .9
					});
					ctx.drawShape('circle', 8, {
						cx: x,
						cy: y,
						r: (r * .95 - r * .9 > 8 ? r * .95 : r * 1.2) // make it distinguishable for linear display
					});
					ctx.drawShape('circle', 0, {
						cx: x + Math.cos(Math.PI * .25) * r * .925,
						cy: y + Math.sin(Math.PI * .25) * r * .925,
						r: 20
					});
				}
			},
			"start": {
				draw: function (ctx, x, y, r, tilt) {
					for (let i = 0; i < 3; i++) {
						ctx.drawShape('circle', 0, {
							cx: x + Math.cos(Math.PI * (1.1 + tilt + i / 3)) * r * 2,
							cy: y + Math.sin(Math.PI * (1.1 + tilt + i / 3)) * r * 2,
							r: 12 / (i + 1)
						});
					}
				}
			}
		};
	}

	keyCollection() { // return an array with rowwise structures vowels like in the official tables
		let keys = [];
		Object.keys(this.glyphs).forEach(key => {
			if (key != "start") keys.push([key, key]);
		});
		return [keys];
	}
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