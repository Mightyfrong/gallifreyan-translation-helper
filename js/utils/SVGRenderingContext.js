import { createSVGElement } from "./funcs.js";

export class SVGRenderingContext {
	constructor(svg = document.querySelector('svg')) {
		this.svg = svg;
		this.history = [];
	}

	prepare(width, height) {
		[...this.svg.children].forEach(child => {
			child.remove();
		});
		this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

		this.fgCol = document.getElementById('foregroundcolor').value;
		this.bgCol = document.getElementById('backgroundcolor').value;
		this.svg.setAttribute('style', `stroke:${this.fgCol};fill:${this.bgCol}`);

		this.matrix = new DOMMatrix;

		this.clearShape('rect', { width, height });
	}

	get transform() {
		const keys = "abcdef".split("");
		const values = keys.map(key => this.matrix[key]).join(" ");
		return `matrix(${values})`;
	}

	drawShape(tagName, strokeWidth, attributes) {
		attributes.strokeWidth = strokeWidth;
		attributes.transform = this.transform;

		if (strokeWidth * 1 == 0) {
			attributes.fill = this.fgCol;
		}

		const shape = createSVGElement(tagName, attributes);
		this.svg.append(shape);
	}

	clearShape(tagName, attributes) {
		attributes.strokeWidth = 0;
		attributes.transform = this.transform;
		attributes.fill = this.bgCol

		const shape = createSVGElement(tagName, attributes);
		this.svg.append(shape);
	}

	translate(dx, dy) {
		this.matrix.translateSelf(dx, dy);
	}
	scale(sx, sy) {
		this.matrix.scaleSelf(sx, sy);
	}
	rotate(angle) {
		this.matrix.rotateSelf(0, 0, angle);
	}

	save() {
		this.history.push(new DOMMatrix(this.matrix));
	}
	restore() {
		this.matrix = this.history.pop() || new DOMMatrix;
	}
}