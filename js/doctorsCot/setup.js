import { PhoneticUnit } from './PhoneticUnit.js'

export const consonantTable = {
	"1thin"   : " j ts ŋ v dʒ  f  ʒ ɢ  ç ɬ ʎ",
	"2thin"   : " n  h l p  w tʃ st ɴ  ð ɮ ß",
	"1thic"   : " t  s ɹ d  m  ʃ  θ q  ʝ ʋ x",
	"thicthin": "ks  k z b  א  g  r ɻ  ɣ ɰ  ",
	"2thic"   : " χ  ɲ ɳ ʈ  ɖ  c  ɟ ħ  ɭ ɸ  ",
	"thinthic": " ʁ  ʙ ʀ ⱱ  ɾ  ɽ  ʂ ʐ fi ʟ  "
}
export const vowelTable = {
	"1thin"   : "ɑ  i  u a y",
	"2thin"   : "e  ɪ ou æ ʉ",
	"1thic"   : "ɛ ai  ʌ ɜ ø",
	"thicthin": "ʊ  ɘ  ɐ ɤ ɵ",
	"2thic"   : "ɯ  ɨ  ə ɔ o",
	"thinthic": "œ  ɞ  ɒ ɶ  "
}

const outline = {
    "1thin": [1],
    "2thin": [1, 1],
    "1thic": [2],
    "thicthin": [2, 1],
    "2thic": [2, 2],
    "thinthic": [1, 2]
};


export const glyphRadius = 50;
export const outlineSpace = 1;

const innerRad = glyphRadius/5;
const circPos = glyphRadius/2;
const decRad = 10;

//turn polar coords to string of rectangular ones
function polar(radius, degrees) {
	const radians = degrees * Math.PI / 180;
	return [radius * Math.cos(radians), radius * Math.sin(radians)];
}

const pos120 = polar(glyphRadius, 120);
const pos300 = polar(glyphRadius, 300);
const pos345 = polar(glyphRadius, 345);

function bentLine(ctx) {
	ctx.beginPath();
	ctx.moveTo(...pos120);
	ctx.lineTo(0, 0);
	ctx.lineTo(...pos345);
	ctx.stroke();
}
function halfLine(ctx) {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(...pos345);
	ctx.stroke();
}
function fullLine(ctx) {
	ctx.beginPath();
	ctx.moveTo(...pos120);
	ctx.lineTo(...pos300);
	ctx.stroke();
}
function circ(ctx, r, θ, fill){
	ctx.beginPath();
	ctx.arc(...polar(r, θ), 10, 0, 2*Math.PI);
	ctx[fill? "fill": "stroke"]();
}
function arc(ctx, start, end){
	ctx.beginPath();
	ctx.arc(0, 0, glyphRadius/4, start, end);
	ctx.stroke();
}

export const decorate = [
	bentLine,
	halfLine,
	fullLine,
	ctx => {
		circ(ctx, circPos, 60);
		circ(ctx, circPos, 120);
	},
	ctx => {
		circ(ctx, circPos, 60);
		circ(ctx, circPos, 120, true);
	},
	ctx => circ(ctx, circPos, 60),
	ctx => circ(ctx, circPos, 60, true),
	ctx => {
		fullLine(ctx);
		arc(ctx, Math.PI*5/3, Math.PI*2/3);
	},
	ctx => {
		bentLine(ctx);
		arc(ctx, Math.PI*23/12, Math.PI*2/3);
	},
	ctx => {
		bentLine(ctx);
		arc(ctx, Math.PI*2/3, Math.PI*23/12);
	},
	ctx => circ(ctx, innerRad+decRad, Math.PI*5/4)
];

// to be filled up outline and deco info
export const letter = [];
/**turns letter table into a list of Runes
 * with outline and decoration info
 */
[[consonantTable, false], [vowelTable, true]].forEach(([table, isVowel]) => {
    for (let r in table) {
        const row = table[r].trim().split(/\s+/);

        row.forEach((ltr, deco) =>
            letter.push(new PhoneticUnit(ltr, outline[r], deco, isVowel))
        );
    }
});

// generate IPA keyboard from letter tables
export function initIpaKeys() {
    const ipaConsons = document.getElementById('ipa-consons');
    const ipaVowels = document.getElementById('ipa-vowels');

    // move through table, adding button to IPA keyboard
    function genKeyboard(elem, table) {
        for (let styl in table) {
            const tableRow = table[styl].trim().split(/\s+/); // turn string to array, removing white space
            const keyRow = document.createElement('div');

            tableRow.forEach(letter => {
                const keyInput = document.createElement('input');

                keyInput.type = "button";
                keyInput.value = letter;
                keyInput.onclick = () =>
                    document.getElementById('text').value += letter;

                keyRow.appendChild(keyInput);
            });
            elem.appendChild(keyRow);
        }
    }

    genKeyboard(ipaConsons, consonantTable);
    genKeyboard(ipaVowels, vowelTable);

    const ipaKeys = document.getElementById('ipa-keys');
    const langSelect = document.getElementById('language');

    // only show IPA keyboard when Doctor's Cot selected
    langSelect.addEventListener('input', event => {
        if (event.target.value == "cot")
            ipaKeys.classList.remove('hidden');
        else
            ipaKeys.classList.add('hidden');
    });
}