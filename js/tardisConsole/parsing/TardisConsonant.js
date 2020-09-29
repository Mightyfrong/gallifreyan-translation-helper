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

	render(ctx) {
		this.pathData.split(";").forEach((d, strokeWidth) => {
			ctx.drawShape('path', strokeWidth, { d });
		});
	}
}