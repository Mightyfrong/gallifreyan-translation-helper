const clippedLtrs = "hjt";
const squashedLtrs = "yz";

const CLIPPED = "C";
const SQUASHED = "S";

export class ConsoleConsonant {

	constructor(str, path, ao, e, i, u, mod) {
		this.toString = str;
		this.pathData = Array.isArray(path) ? path : path.split(';');

		this.aoData = ao;
		this.eData = e;
		this.iData = i;
		this.uData = u;

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

		this.pathData.forEach((str, idx) => {
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