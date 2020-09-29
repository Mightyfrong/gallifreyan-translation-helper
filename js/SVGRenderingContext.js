import { createSVGElement } from "./utils.js";

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

		this.matrix = new DOMMatrix;
		this.fgColour = document.getElementById('foregroundcolor').value;
		this.bgColour = document.getElementById('backgroundcolor').value;

		const fill = this.bgColour;
		const rect = createSVGElement('rect', { width, height, fill });
		this.svg.append(rect);
	}

	get transform(){
		const keys = "abcdef".split("");
		const values = keys.map(key => this.matrix[key]).join(" ");
		return `matrix(${values})`;
	}

	drawShape(tagName, strokeWidth, attributes, bgFill = false) {
		attributes.strokeWidth = strokeWidth;
		attributes.transform = this.transform;

		if (strokeWidth) {
			attributes.stroke = this.fgColour;
			attributes.fill = bgFill? this.bgColour: "none";
		} else
			attributes.fill = this.fgColour;

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