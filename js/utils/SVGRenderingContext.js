import {
	createSVGElement
} from "./funcs.js";

export class SVGRenderingContext {
	constructor(width, height) {
		this.svg = createSVGElement('svg', { width, height });

		this.fgCol = document.getElementById('foregroundcolor').value;
		this.bgCol = document.getElementById('backgroundcolor').value;
		this.svg.setAttribute('style', `stroke:${this.fgCol};fill:transparent;font-family:"Arial", sans-serif;`);

		this.matrix = new DOMMatrix;
		this.history = [];

		this.clearShape('rect', {
			width,
			height
		});
	}

	export (name) {
		const serialiser = new XMLSerializer;
		const xml = serialiser.serializeToString(this.svg);
		const file = new File([xml], name + ".svg", {
			type: "image/svg+xml"
		});
		return file;
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

	clipShape(tagName, attributes) {
		attributes.strokeWidth = 0;
		attributes.transform = this.transform;
		attributes.fill = this.bgCol

		const shape = createSVGElement(tagName, attributes);
		this.svg.append(shape);
	}

	drawText(text, attributes = {}) {
		attributes.textAnchor = "middle";
		attributes.transform = this.transform;
		attributes.fill = this.fgCol;
		const shape = createSVGElement('text', attributes);
		shape.appendChild(document.createTextNode(text));
		this.svg.append(shape);
	}

	translate(dx, dy) {
		this.matrix.translateSelf(dx, dy);
	}
	scale(sx, sy) {
		this.matrix.scaleSelf(sx, sy);
	}
	rotate(radians) {
		this.matrix.rotateSelf(0, 0, radians * 180 / Math.PI);
	}

	save() {
		this.history.push(new DOMMatrix(this.matrix));
	}
	restore() {
		this.matrix = this.history.pop() || new DOMMatrix;
	}
	circularArc(cx, cy, r, startRad, endRad, arcType) {
		if (arcType!=undefined){ // optional force of minor or major arc for more natural use of start- and end-radiants
			if (arcType=="minor")startRad=(startRad/Math.PI+2)*Math.PI;
			if (arcType=="major")endRad=(endRad/Math.PI+2)*Math.PI;
		}
		let majorarc = (startRad - endRad > Math.PI || startRad > endRad) ? 0 : 1;
		return "M " + (cx + Math.cos(startRad) * r) + " " + (cy + Math.sin(startRad) * r) + " A " + r + " " + r + " 0 " + majorarc + " 1 " + (cx + Math.cos(endRad) * r) + " " + (cy + Math.sin(endRad) * r);
	}
}