import { createSVGElement, polar, π } from '../utils.js';
import { glyphRadius } from './TardisGlyph.js';

const wordBorder = 5;
export const margin = 5;

export class TardisWord {
	constructor(glyphs) {
		this.glyphs = glyphs;

		this.glyphAngle = 2 * π / glyphs.length;

		const rFactor = glyphs.length > 2 ?
			1 / Math.sin(this.glyphAngle / 2) :
			glyphs.length - 1;

		this.glyphPos = rFactor * (glyphRadius + margin);
		this.radius = this.glyphPos + glyphRadius + margin + wordBorder / 2;
	}

	render(svg, cx, cy) {
		let defs = svg.querySelector('defs');
		if (!defs) {
			defs = createSVGElement('defs');
			svg.append(defs);
		}
		const r = this.radius;
		const fill = '#000c24';
		const stroke = 'orange';
		const strokeWidth = wordBorder;
		const circle = createSVGElement('circle', { cx, cy, r, fill, stroke, strokeWidth});
		svg.append(circle);

		this.glyphs.forEach((glyph, i) => {
			const angle = i * this.glyphAngle;
			const rad = this.glyphPos;
			const gx = rad * Math.sin(angle);
			const gy = rad * Math.cos(angle);
			glyph.render(svg, cx - gx, cy + gy);
		});
	}
}