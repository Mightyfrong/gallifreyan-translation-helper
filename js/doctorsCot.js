const consonantTable = {
    "1thin"   : " j ts ŋ v dʒ f  ʒ ɢ  ç ɬ ʎ",
    "2thin"   : " n  h l p  w t st ɴ  ð ɮ ß",
    "1thic"   : " t  s ɹ d  m ʃ  θ q  ʝ ʋ x",
    "thicthin": "ks  k z b  א g  r ɻ  ɣ ɰ  ",
    "2thic"   : " χ  ɲ ɳ ʈ  ɖ c  ɟ ħ  ɭ ɸ  ",
    "thinthic": " ʁ  ʙ ʀ ⱱ  ɾ ɽ  ʂ ʐ fi ʟ  "
}

const consonants = {}; // to be filled w/ styl & deco details for each consonant
const ipaKeys = document.getElementById('ipa-keys');

// move through table, adding details to consonants obj & button to IPA keyboard
for(styl in consonantTable) {
    const tableRow = consonantTable[styl].trim().split(/\s+/); // turn string to array, removing white space
    const keyRow = document.createElement('div');

    tableRow.forEach( (con, deco) => {
        consonants[con] = {styl, deco} // add details to consonants obj

        const keyInput = document.createElement('input');

        keyInput.type = "button";
        keyInput.value = con;
        keyInput.onclick = () =>
            document.getElementById('text').value += con;

        keyRow.appendChild(keyInput);
    });
    ipaKeys.appendChild(keyRow);
}
console.log(consonants); // for checking details are correct

const langSelect = document.getElementById('language');

// only show IPA keyboard when Doctor's Cot selected
langSelect.addEventListener('input', event => {
    if(event.target.value == "cot")
        ipaKeys.classList.remove('hidden');  
    else
        ipaKeys.classList.add('hidden');
});