import { π } from '../utils.js';

export const vowels = {
    A: drawAO(-50, 50 * Math.tan(π / 12)),
    E: drawEI,
    O: drawAO(0, 0),
    I: drawEI,
    U: drawU
}

/* modifiers */
const INVERTED = 'I';
const SQUASHED = 'S';

function drawAO(x, y) {
    return (ctx, aoMod) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(50, -50 * Math.tan(π / 12));
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        switch (aoMod) {
            case INVERTED: ctx.fillStyle = '#fff'; break;
            case SQUASHED: ctx.scale(1, 0.5);
        }
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * π);
        ctx.fill();
        ctx.restore();
    };
}

const drawEI = drawEIU('stroke');
const drawU = drawEIU('fill');

function drawEIU(method) {
    return (ctx, rad, ang) => {
        ctx.save();
        ctx.rotate(ang);
        ctx.translate(rad, 0);

        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, 2*π);
        ctx[method]();
        ctx.restore();
    };
}