import { VowelDetails } from "../VowelDetails.js";
import { TardisLetter } from "./TardisLetter.js";

const clippedLtrs = "HJT";

export class TardisConsonant extends TardisLetter {

	constructor(str, data) {
		super(str, false);
		const [conData, vowData, formatFlag] = data.split("|");

		this.conData = formatFlag? conData.split(";"):
			conData.split(";").map((d, strokeWidth) => `path_${strokeWidth}_d=${d}` );

		this.vowData = new VowelDetails(vowData);

		this.clipped = clippedLtrs.includes(str);
	}

	render(ctx) {
		this.conData.forEach(shapeStr => {
			const [tagName, strokeWidth, ...attrStrings] = shapeStr.split("_");

			let attributes = {};
			attrStrings.forEach(attrString => {
				const [name, value] = attrString.split("=");
				attributes[name] = value;
			});

			ctx.drawShape(tagName, strokeWidth, attributes);
		});
	}
}