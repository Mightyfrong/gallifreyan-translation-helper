import { createSVGElement } from "../../utils.js";
import { VowelDetails } from "../VowelDetails.js";
import { TardisLetter } from "./TardisLetter.js";

const clippedLtrs = "HJT";
const squashedLtrs = "YZ";

export const CLIPPED = "C";
const SQUASHED = "S";

export class TardisConsonant extends TardisLetter {

	constructor(str, data) {
		super(str, false);

		const [path, vd] = data.split("|");
		this.pathData = path;
		this.vowelData = new VowelDetails(vd);

		this.modifier =
			clippedLtrs.includes(str) ?
				CLIPPED :
				squashedLtrs.includes(str) ?
					SQUASHED :
					null;
	}

	render(svg, x, y) {
		let transform = `translate(${[x, y]})`;
		transform += this.modifier == SQUASHED ? " scale(1, 0.5) " : "";

		this.pathData.split(";").forEach((d, strokeWidth) => {
			if (d.length) {
				let fill = 'none';
				let stroke = 'none';
				if (strokeWidth) {
					stroke = 'orange';
				} else {
					fill = 'orange';
				}

				const path = createSVGElement('path', { d, fill, stroke, strokeWidth, transform });
				svg.append(path);
			}
		});
	}
}