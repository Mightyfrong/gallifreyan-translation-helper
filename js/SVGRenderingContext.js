import { createSVGElement } from "./utils.js";

export class SVGRenderingContext {
	constructor(svg = document.querySelector('svg')) {
		this.svg = svg;
	}

	prepare(width, height) {
		[...this.svg.children].forEach(child => {
			child.remove();
		});
		this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

		this.matrix = new DOMMatrix;
		this.fgColour = document.getElementById('foregroundcolor').value;
		this.bgColour = document.getElementById('backgroundcolor').value;

		const rect = this.drawShape('rect', 1, { width, height });
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

	translate(x, y) {
		this.matrix = this.matrix.translateSelf(x, y);
	}
}