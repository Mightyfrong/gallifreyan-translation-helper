import {
	createSVGElement,
	renderOptions
} from "../main.js";

// prefix for clip-path IDs
const CP = "cp";
const MP = "mp";

export class SVGRenderingContext {
	constructor(width, height) {
		//retrieve options and make them compact
		let option = renderOptions.get();
		this.width = width;
		this.height = height;

		this.fgCol = option.foregroundcolor;
		this.bgCol = option.backgroundcolor;

		this.history = [];
		this.clipPaths = [];
		this.maskPaths = [];

		this.currentGroup = new SVGGroup;
		this.groups = [this.currentGroup];
	}

	// Should be static or top-level method
	circularArc(cx, cy, r, startRad, endRad, arcType) {
		if (arcType != undefined) { // optional force of minor or major arc for more natural use of start- and end-radiants
			if (arcType == "minor") startRad = (startRad / Math.PI + 2) * Math.PI;
			if (arcType == "major") endRad = (endRad / Math.PI + 2) * Math.PI;
		}
		let majorarc = (startRad - endRad > Math.PI || startRad > endRad) ? 0 : 1;
		return "M " + (cx + Math.cos(startRad) * r) + " " + (cy + Math.sin(startRad) * r) + " A " + r + " " + r + " 0 " + majorarc + " 1 " + (cx + Math.cos(endRad) * r) + " " + (cy + Math.sin(endRad) * r);
	}

	// Public Methods
	/** Drawing */
	drawShape(tagName, strokeWidth, attributes) {
		const shape = new SVGShape(tagName, attributes, strokeWidth);
		this.currentGroup.add(shape);
	}
	clearShape(tagName, attributes) {
		this.drawShape(tagName, -1, attributes);
	}
	clipShape(tagName, attributes) {
		attributes.transform = this.currentGroup.getTransform();

		const cpNum = this.currentGroup.clipPath;
		if (cpNum !== null)
			attributes.clipPath = `url(#${CP + cpNum})`;

		const shape = new SVGShape(tagName, attributes);

		this.addGroup(this.currentGroup.matrix, this.clipPaths.length);
		this.clipPaths.push(shape);
	}
	clipPath(tagName, attributes) {
		attributes.transform = this.currentGroup.getTransform();
		const shape = new SVGShape(tagName, attributes);
		this.clipPaths.push(shape);
		return 'url(#cp' + (this.clipPaths.length - 1) + ')';
	}
	maskInit() {
		const width = this.width,
			height = this.height,
			shape = new SVGShape('rect', {
				width: width,
				height: height,
				fill: 'white'
			});
		this.maskPaths.push([shape]);
		return {
			id: this.maskPaths.length - 1,
			url: 'url(#mp' + (this.maskPaths.length - 1) + ')'
		};
	}
	maskPath(to, tagName, attributes) {
		attributes.transform = this.currentGroup.getTransform();
		attributes.fill = 'black';
		const shape = new SVGShape(tagName, attributes);
		this.maskPaths[to].push(shape);
	}

	drawText(textStr, attributes) {
		const svgText = new SVGText(textStr, attributes);
		this.currentGroup.add(svgText);
	}

	/** Transformations */
	translate(dx, dy) {
		const matrix = this.currentGroup.matrix.translate(dx, dy);
		this.addGroup(matrix);
	}
	scale(sx, sy) {
		const matrix = this.currentGroup.matrix.scale(sx, sy);
		this.addGroup(matrix);
	}
	rotate(radians) {
		const matrix = this.currentGroup.matrix.rotate(0, 0, radians * 180 / Math.PI);
		this.addGroup(matrix);
	}

	/** Manage State History */
	save() {
		this.history.push(this.currentGroup);
	}
	restore() {
		const prevGroup = this.history.pop();
		if (prevGroup)
			this.currentGroup = prevGroup;
	}

	/** Finalise Drawing */
	toFile(name) {
		const xml = (new XMLSerializer).serializeToString(this.render());

		const file = new File([xml], `Gallifreyan_${name}.svg`, {
			type: "image/svg+xml"
		});

		return file;
	}

	render() {
		const width = this.width;
		const height = this.height;
		const style = `stroke:${this.fgCol};fill:transparent;`
		const svg = createSVGElement('svg', {
			width,
			height,
			style
		});

		if (this.clipPaths.length || this.maskPaths.length) {
			const defs = createSVGElement('defs');
			this.clipPaths.forEach((shape, idx) => {
				const clip = createSVGElement('clipPath', {
					id: CP + idx
				});
				clip.append(shape.render(CP + idx))
				defs.append(clip);
			});
			this.maskPaths.forEach((group, gidx) => {
				const mask = createSVGElement('mask', {
					id: MP + gidx
				});
				group.forEach((shape, idx) => {
					mask.append(shape.render(MP + idx));
				});
				defs.append(mask);
			});
			svg.append(defs);
		}

		const fill = this.bgCol;
		const bgRect = createSVGElement('rect', {
			width,
			height,
			fill,
			strokeWidth: 0
		});
		svg.append(bgRect);

		this.groups.forEach(group => {
			if (group.shapes.length) {
				svg.append(group.render(this));
			}
		});

		return svg;
	}

	// Private Methods
	addGroup(matrix, clipPath = this.currentGroup.clipPath) {
		const group = new SVGGroup(matrix, clipPath);
		this.groups.push(group);
		this.currentGroup = group;
	}
}

class SVGGroup {
	constructor(m = new DOMMatrixReadOnly, cp = null) {
		this.matrix = m;
		this.clipPath = cp;
		this.shapes = [];
	}

	add(elem) {
		this.shapes.push(elem);
	}

	getTransform() {
		const keys = "abcdef".split("");
		const values = keys.map(key => this.matrix[key]).join(" ");
		return `matrix(${values})`;
	}

	render(ctx) {
		const transform = this.getTransform();
		const g = createSVGElement('g', {
			transform
		});

		if (this.clipPath)
			g.setAttribute('clip-path', `url(#${CP + this.clipPath})`);

		this.shapes.forEach(shape => {
			g.append(shape.render(ctx));
		});

		return g;
	}
}

class SVGShape {
	constructor(tagName, attributes, strokeWidth = null) {
		this.tagName = tagName;
		this.attributes = attributes;
		this.strokeWidth = strokeWidth; // null for clipPaths and maskPaths
	}

	/** `prop` should be one of two things:
	 *  1) instance of SVGRenderingContext
	 *  2) String representing clipPath id
	 */
	render(prop) {
		const shape = createSVGElement(this.tagName, this.attributes);
		if (prop instanceof SVGRenderingContext) {
			shape.setAttribute(
				'stroke-width',
				Math.max(this.strokeWidth, 0)
			);

			if (!this.attributes.stroke)
				shape.setAttribute(
					this.strokeWidth > 0 ? 'stroke' : 'fill',
					this.strokeWidth < 0 ? prop.bgCol : prop.fgCol
				);
		}
		return shape;
	}
}

class SVGText {
	constructor(text, attributes) {
		this.text = text;
		this.attributes = attributes;
	}

	render(ctx) {
		const textAnchor = "middle";
		const fill = ctx.fgCol;
		const style = "font: 1em courier, monospace;"

		const text = createSVGElement('text', {
			textAnchor,
			fill,
			style,
			...this.attributes
		});
		text.append(document.createTextNode(this.text))

		return text;
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