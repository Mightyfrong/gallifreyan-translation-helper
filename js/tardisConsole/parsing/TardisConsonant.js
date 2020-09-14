import { VowelDetails } from "../VowelDetails";
import { TardisLetter } from "./TardisLetter";

const clippedLtrs = "HJT";
const squashedLtrs = "YZ";

const CLIPPED = "C";
const SQUASHED = "S";

export class TardisConsonant extends TardisLetter{

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

		switch (this.modifier) {
			case CLIPPED:
				ctx.beginPath();
				ctx.arc(50, -50, 95, 0, 2 * Math.PI);
				ctx.clip();
				break;
			case SQUASHED:
				ctx.scale(1, 0.5);
		}

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