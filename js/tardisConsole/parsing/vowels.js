import { π, color } from '../../utils.js';
import { glyphRadius } from '../TardisGlyph.js';

/* Vowels A, O */
/**  styles   **/
const INVERTED = 'I';
const SQUASHED = 'S';

function drawAO(x1, y1) {
    return (ctx, { styleAO }) => {
        x2 = glyphRadius;
        y2 = -x2 * Math.tan(π / 12);
        ctx.drawShape('line', 2, { x1, y1, x2, y2 });
        ctx.save();
        let strokeWidth = 0;
        switch (styleAO) {
            case INVERTED: strokeWidth = 1; break;
            case SQUASHED: ctx.scale(1, 0.5);
        }
        const r = glyphRadius / 5;
        ctx.drawShape('circle', strokeWidth, { r }, true);
        ctx.restore();
    };
}

/* Vowels E, I, U */
function drawEIU(ctx, rad, ang, strokeWidth) {
    ctx.save();
    ctx.rotate(ang);
    ctx.translate(rad, 0);
    ctx.drawShape('circle', strokeWidth, {r: 5}, true);
    ctx.restore();
}

function drawE(ctx, { angleEIU, radiusE }) {
    drawEIU(ctx, radiusE, angleEIU, 1);
}

function drawI(ctx, { angleEIU, radiusIU }) {
    drawEIU(ctx, radiusIU, angleEIU, 1);
}

function drawU(ctx, { angleEIU, radiusIU }) {
    drawEIU(ctx, radiusIU, angleEIU, 0);
}

export const vowels = {
    A: drawAO(-glyphRadius, glyphRadius * Math.tan(π / 12)),
    E: drawE,
    I: drawI,
    O: drawAO(0, 0),
    U: drawU
}