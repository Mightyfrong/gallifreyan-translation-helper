import { letter } from './setup.js';
import { CotGlyph } from './CotGlyph.js';

const textSpace = 20;

const glyphSpacing = 5;
const glyphRadius = 50;
const glyphWidth = 2 * (glyphRadius + glyphSpacing);

const lineHeight = textSpace + 2 * glyphRadius;

export function doctorsCotTranslate(ctx, input) {
    const result = translateWords(input);

    if (result.error)
        document.getElementById('output').innerHTML = result.error;

    const translation = result.output.map(translateGlyphs);

    const maxWordSize = Math.max(...translation.map(word => word.length))
    const numOfLines = translation.length;
    ctx.canvas.width = maxWordSize * glyphWidth;
    ctx.canvas.height = numOfLines * lineHeight;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#d7703a';

    ctx.translate(glyphSpacing + glyphRadius, textSpace + glyphRadius);
    
    translation.forEach(word => {
        ctx.save();
        word.forEach(glyph => {
            glyph.draw(ctx, glyphRadius, textSpace);
            ctx.translate(glyphWidth, 0);
        });
        ctx.restore();
        ctx.translate(0, lineHeight);
    });
}

const א = letter.find(l=>l.toString == "א");
function translateGlyphs(word) {
    let letters = word;
    let glyphs = [];
    while (letters.length) {
        const [letter1, ...letters1] = letters;
        if (letter1.isVowel) {
            glyphs.push(new CotGlyph(א, null, letter1));
            letters = letters1;
        } else {
            const [letter2, ...letters2] = letters1;
            if (letter2) {
                if (letter2.isVowel) {
                    glyphs.push(new CotGlyph(letter1, null, letter2));
                    letters = letters2;
                } else {
                    const [letter3, ...letters3] = letters2;
                    if (letter3) {
                        if (letter3.isVowel) {
                            glyphs.push(new CotGlyph(letter1, letter2, letter3));
                            letters = letters3;
                        } else {
                            glyphs.push(new CotGlyph(letter1, letter2));
                            letters = letters2;
                        }
                    } else {
                        glyphs.push(new CotGlyph(letter1, letter2));
                        letters = letters2;
                    }
                }
            } else {
                glyphs.push(new CotGlyph(letter1));
                letters = letters1;
            }
        }
    }
    return glyphs;
}

function translateWords(input) {
    let result = { input: input.split(/\s+/), output: [] };
    while (result.input.length && !result.error) {
        const res = translateWord(result.input.shift());
        if (res.error)
            result.error = res.error
        else {
            result.output.push(res.output);
        }
    }
    return result;
}

function translateWord(input) {
    let result = { input, output: [] };
    while (result.input.length && !result.error) {
        const res = translateLetter(result.input);
        if (res.error)
            result.error = res.error
        else {
            result.output.push(res.output);
            result.input = res.input;
        }
    }
    return result;
}

function translateLetter(input) {
    const first2 = translateChars(2, input);

    return first2.error ?
        translateChars(1, input) :
        first2;
}

function translateChars(n, input) {
    const chars = input.slice(0, n);
    const ltr = letter.find(l => l.toString == chars);

    return ltr ?
        { input: input.slice(n), output: ltr } :
        { input, error: `Unrecognised chars "${chars}".` };
}