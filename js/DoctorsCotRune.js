export const consonantTable = {
	"1thin": " j ts ŋ v dʒ f  ʒ ɢ  ç ɬ ʎ",
	"2thin": " n  h l p  w t st ɴ  ð ɮ ß",
	"1thic": " t  s ɹ d  m ʃ  θ q  ʝ ʋ x",
	"thicthin": "ks  k z b  א g  r ɻ  ɣ ɰ  ",
	"2thic": " χ  ɲ ɳ ʈ  ɖ c  ɟ ħ  ɭ ɸ  ",
	"thinthic": " ʁ  ʙ ʀ ⱱ  ɾ ɽ  ʂ ʐ fi ʟ  "
}

export const vowelTable = {
	"1thin": "ɑ  i  u a y",
	"2thin": "e  ɪ ou æ ʉ",
	"1thic": "ɛ ai  ʌ ɜ ø",
	"thicthin": "ʊ  ɘ  ɐ ɤ ɵ",
	"2thic": "ɯ  ɨ  ə ɔ o",
	"thinthic": "œ  ɞ  ɒ ɶ  "
}

const consonant = {};
const vowel = {};

// turns letter table into a list of details on style & decoration
function genList(obj, table) {
	for (let style in table) {
		const row = table[style].split(/\s+/);

		row.forEach((letter, deco) => obj[letter] = { style, deco });
	}
}

genList(consonant, consonantTable);
genList(vowel, vowelTable)

export class DoctorsCotRune {
	static parse(str) {
		const con = consonant[str];

		/**Look up string in letter lists.
		 * If found, return corresponding rune.
		 * If not, return false.
		 */
		if (con)
			return new DoctorsCotRune(con);
		else {
			const vow = vowel[str];
			if(vow)
				return new DoctorsCotRune(vow);
			else
				return false;
		}
	}

	constructor(str) {
		this.styl = 0;
		this.deco = 0;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(50, 50, 49.5, 0, 2 * Math.PI);
		ctx.stroke();
	}
}