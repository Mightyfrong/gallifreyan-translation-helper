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