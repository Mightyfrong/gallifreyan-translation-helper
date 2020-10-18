import {
	createSVGElement
} from "./funcs.js";

// prefix for clip-path IDs
const CP = "cp";

export class SVGRenderingContext {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.fgCol = document.getElementById('foregroundcolor').value;
		this.bgCol = document.getElementById('backgroundcolor').value;

		this.history = [];
		this.clipPaths = [];

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
		this.drawShape(tagName, attributes, -1);
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
		const svg = createSVGElement('svg', { width, height, style });

		if (this.clipPaths.length) {
			const defs = createSVGElement('defs');

			this.clipPaths.forEach((shape, idx) => {
				defs.append(shape.render(CP + idx));
			});

			svg.append(defs);
		}

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
		const clipPath = `url(#${CP + this.clipPath})`;

		const g = createSVGElement('g', { transform, clipPath });

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
		this.strokeWidth = strokeWidth; // null for clipPaths
	}

	/** `prop` should be one of two things:
	 *  1) instance of SVGRenderingContext
	 *  2) String representing clipPath id
	 */
	render(prop) {
		const shape = createSVGElement(this.tagName, this.attributes);
		let elem = shape;

		if (prop instanceof SVGRenderingContext) {
			shape.setAttribute('stroke-width', this.strokeWidth);

			shape.setAttribute(
				this.strokeWidth > 0 ? 'stroke' : 'fill',
				this.strokeWidth < 0 ? prop.bgCol : prop.fgCol
			);
		} else {
			elem = createSVGElement('clipPath', { id: prop });
			elem.append(shape);
		}
		return elem;
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

		const text = createSVGElement('text', { textAnchor, fill, style, ...this.attributes });
		text.append(document.createTextNode(this.text))

		return text;
	}
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