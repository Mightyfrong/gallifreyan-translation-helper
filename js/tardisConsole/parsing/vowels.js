import { π } from '../../utils.js';

/* Vowels A, O */
/**  styles   **/
const INVERTED = 'I';
const SQUASHED = 'S';

function drawAO(x, y) {
    return (ctx, { styleAO }) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(50, -50 * Math.tan(π / 12));
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        switch (styleAO) {
            case INVERTED: ctx.fillStyle = '#fff'; break;
            case SQUASHED: ctx.scale(1, 0.5);
        }
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * π);
        ctx.fill();
        ctx.restore();
    };
}

/* Vowels E, I, U */
function drawEIU(ctx, rad, ang, fill) {
    ctx.save();
    ctx.rotate(ang);
    ctx.translate(rad, 0);

    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * π);

    ctx.fillStyle = fill;
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.restore();
}

function drawE(ctx, {angleEIU, radiusE}) {
    drawEIU(ctx, radiusE, angleEIU, '#fff');
}

function drawI(ctx, {angleEIU, radiusIU}) {
    drawEIU(ctx, radiusIU, angleEIU, '#fff');
}

function drawU(ctx, {angleEIU, radiusIU}) {
    drawEIU(ctx, radiusIU, angleEIU, '#000');
}

export const vowels = {
    A: drawAO(-50, 50 * Math.tan(π / 12)),
    E: drawE,
    I: drawI,
    O: drawAO(0, 0),
    U: drawU
}