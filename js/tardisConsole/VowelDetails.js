import { d2r } from "../utils.js";

export class VowelDetails {
    constructor(vd) {
        const [ao, ang, re, riu] = vd.split(";");

        this.styleAO = ao;
        this.angleEIU = d2r(ang);
        this.radiusE = re;
        this.radiusIU = riu;
    }
}