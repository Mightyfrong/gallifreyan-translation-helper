import { CLIPPED_LTRS } from './constants.js';

import { VowelDetails } from "../VowelDetails.js";
import { TardisLetter } from "./TardisLetter.js";

export class TardisConsonant extends TardisLetter {

	constructor(str, data) {
		super(str, false);
		const [conData, vowData] = data.split("_");

		this.conData = conData.split("|");
		this.vowData = new VowelDetails(vowData);

		this.clipped = CLIPPED_LTRS.includes(str);
	}

	render(ctx) {
		this.conData.forEach(shapeStr => {
			const [tagName, strokeWidth, ...attrStrings] = shapeStr.split(";");

			let attributes = {};
			attrStrings.forEach(attrString => {
				const [name, value] = attrString.split("=");
				attributes[name] = value;
			});

			ctx.drawShape(tagName, strokeWidth, attributes);
		});
	}
}