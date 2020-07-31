import {consonantTable, vowelTable} from './setup.js'

import { CotRune } from './CotRune.js'
import { CotConsonant } from './CotConsonant.js'

export function doctorsCotTranslate(ctx, input) {
    const translation = parseWord(input);
    if(translation){
        const spacing = CotRune.width + 10;
        ctx.canvas.width = translation.length * spacing;

        ctx.strokeStyle = '#d7703a';
        translation.forEach(rune => {
            rune.draw(ctx);
            ctx.translate(spacing, 0);
        });
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText("Translation failed.", 50, 50);
    }
}

function parseWord(input) {
    let output = [];
    let str = input;
    while (str.length) {
        const first2 = str.slice(0, 2);
        let rune = parseLetter(first2);
        if (rune) {
            output.push(rune);
            str = str.slice(2, str.length);
        } else {
            rune = parseLetter(str.charAt(0));
            if (rune){
                output.push(rune);
                str = str.slice(1, str.length);
            }
            else return false;
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

function parseLetter(str) {
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