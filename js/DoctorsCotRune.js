export const consonantTable = {
	"1thin"   : " j ts ŋ v dʒ f  ʒ ɢ  ç ɬ ʎ",
	"2thin"   : " n  h l p  w t st ɴ  ð ɮ ß",
	"1thic"   : " t  s ɹ d  m ʃ  θ q  ʝ ʋ x",
	"thicthin": "ks  k z b  א g  r ɻ  ɣ ɰ  ",
	"2thic"   : " χ  ɲ ɳ ʈ  ɖ c  ɟ ħ  ɭ ɸ  ",
	"thinthic": " ʁ  ʙ ʀ ⱱ  ɾ ɽ  ʂ ʐ fi ʟ  "
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
	"1thin"   : [1],
	"2thin"   : [1,1],
	"1thic"   : [2],
	"thicthin": [2,1],
	"2thic"   : [2,2],
	"thinthic": [1,2]
};

export class Rune {
	static width = 100;
	static rad = Rune.width/2;

	static parse(str) {
		const con = consonant[str];

		/**Look up string in letter lists.
		 * If found, return corresponding rune.
		 * If not, return false.
		 */
		if (con)
			return con;
		else {
			const vow = vowel[str];
			return vow || false;
		}
	}

	constructor(ol, d) {
		this.outlines = ol;
		this.deco = d;
	}

	draw(ctx) {
		let rad = Rune.rad;
		this.outlines.forEach(thicness => {
			rad -= thicness/2;

			ctx.lineWidth = thicness;
			ctx.beginPath();
			ctx.arc(Rune.rad, Rune.rad, rad, 0, 2 * Math.PI);
			ctx.stroke();

			rad -= 1 + thicness/2;
		});
	}
}

// to be filled up outline and deco info
const consonant = {};
const vowel = {};

/**turns letter table into a list of Runes
 * with outline and decoration info
 */
function genList(obj, table) {
	for (let r in table) {
		const row = table[r].split(/\s+/);

		row.forEach((letter, deco) => obj[letter] = new Rune(outline[r], deco));
	}
}

genList(consonant, consonantTable);
genList(vowel, vowelTable)