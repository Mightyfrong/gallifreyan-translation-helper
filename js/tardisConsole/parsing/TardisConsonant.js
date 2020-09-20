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

	draw(ctx) {
		ctx.save();

		if (this.modifier == SQUASHED)
			ctx.scale(1, 0.5);

		this.pathData.split(";").forEach((str, idx) => {
			const path = new Path2D(str);

			if (idx) {
				ctx.lineWidth = idx;
				ctx.stroke(path);
			} else
				ctx.fill(path);
		});
		ctx.restore();
	}
}