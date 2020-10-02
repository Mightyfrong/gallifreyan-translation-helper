import { deg2rad } from "../utils/funcs.js";

export class VowelDetails {
    constructor(vd) {
        const [ao, ang, re, riu] = vd.split(";");

        this.styleAO = ao;
        this.angleEIU = deg2rad(ang);
        this.radiusE = re;
        this.radiusIU = riu;
    }
}