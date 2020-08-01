import {consonantTable, vowelTable} from './setup.js'

import { CotRune } from './CotRune.js'
import { CotConsonant } from './CotConsonant.js'

export function doctorsCotTranslate(ctx, input) {
    const translation = translateWord(input);
    console.log(translation);

    if(translation.error){
        ctx.canvas.width = 300;
        ctx.fillStyle = 'red';
        ctx.fillText(translation.error, 50, 50);
    } else {
        const spacing = CotRune.width + 10;
        ctx.canvas.width = translation.length * spacing;

        ctx.strokeStyle = '#d7703a';
        translation.forEach(rune => {
            rune.draw(ctx);
            ctx.translate(spacing, 0);
        });
    }
}

function translateWord(input) {
    let output = [];
    for(let i = 0; i < input.length; i++) {
        let next = input.slice(i, i+2);
        let rune = translateLetter(next);
        if (rune) {
            output.push(rune);
        } else {
            next = input.charAt(i);
            rune = translateLetter(next);
            if (rune){
                output.push(rune);
            }
            else return {error: `Look-up failed: unable to translate: ${next}`};
        }
    }
    return output;
}

const outline = {
	"1thin"   : [1],
	"2thin"   : [1,1],
	"1thic"   : [2],
	"thicthin": [2,1],
	"2thic"   : [2,2],
	"thinthic": [1,2]
};

// to be filled up outline and deco info
const consonant = {};
const vowel = {};

/**turns letter table into a list of Runes
 * with outline and decoration info
 */
function genList(obj, table) {
	for (let r in table) {
		const row = table[r].split(/\s+/);

		row.forEach((letter, deco) => obj[letter] = new CotConsonant(outline[r], deco));
	}
}

genList(consonant, consonantTable);

function translateLetter(str) {
    const con = consonant[str];

    /**Look up string in letter lists.
     * If found, return corresponding rune.
     * If not, return false.
     */
    if (con)
        return new CotRune(con);
    else {
        const vow = vowel[str];
        return vow || false;
    }
}