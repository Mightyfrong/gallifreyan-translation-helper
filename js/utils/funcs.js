//general color settings
export let color = {
	background: "#fff",
	foreground: "#000",
	warning: "#f00"
};

export function createSVGElement(tagName, attributes = {}) {
	const elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);

	Object.entries(attributes).forEach(([key, value]) => {
		const name = key.replace(/([A-Z])/g, "-$1").toLowerCase();
		elem.setAttribute(name, value);
	});

	return elem;
}

export function canvaspreparation(ctx, width, height) {
	color.foreground = document.getElementById('foregroundcolor').value;
	color.background = document.getElementById('backgroundcolor').value;
	ctx.canvas.width = width;
	ctx.canvas.height = height;
	ctx.fillStyle = color.background;
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = color.foreground;
}

export function range(start, end, step = 1) {
	const n = Math.floor(1 + (end - start) / step);
	return [...Array(n).keys()].map(i => start + step * i);
}

export function deg2rad(degrees) {
	return degrees * Math.PI / 180;
}

// turn polar coords to Cartesian
export function polar(radius, radians) {
	return [
		radius * Math.cos(radians),
		radius * Math.sin(radians)
	];
}

// obj can be an Array or String
export function includes(obj, values) {
	return Array.isArray(values) ?
		values.some(value => obj.includes(value)) :
		obj.includes(values);
}

// general drawing instructions
export let draw = {
	init: function (ctx, linewidth) {
		this.ctx = ctx;
		this.linewidth = linewidth;
	},
	circle: function (x, y, r, lw) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		this.ctx.stroke();
		this.ctx.lineWidth = this.linewidth;
	},
	arc: function (x, y, r, a, o, lw) { // could be unified with circle with optional params but separated for readibilities sake...
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, a, o, true);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		this.ctx.stroke();
		this.ctx.lineWidth = this.linewidth;
	},
	ellipse: function (x, y, r1, r2, rot = 0, filled, lw) {
		this.ctx.beginPath();
		this.ctx.ellipse(x, y, r1, r2, rot, 0, 2 * Math.PI);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		if (filled === undefined || !filled) this.ctx.stroke();
		else {
			this.ctx.fillStyle = filled;
			this.ctx.fill();
			this.ctx.fillStyle = color.foreground;
		}
		this.ctx.lineWidth = this.linewidth;
	},
	dot: function (x, y, r, filled) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
		if (filled !== undefined && filled) this.ctx.fillStyle = filled;
		this.ctx.fill();
		this.ctx.fillStyle = color.foreground;
	},
	line: function (fx, fy, tx, ty, lw, style) {
		this.ctx.beginPath();
		this.ctx.moveTo(fx, fy);
		this.ctx.lineTo(tx, ty);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		if (style !== undefined && style) this.ctx.strokeStyle = style;
		this.ctx.stroke();
		this.ctx.strokeStyle = color.foreground
		this.ctx.lineWidth = this.linewidth;
	}
};

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