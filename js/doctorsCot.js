import { consonantTable, vowelTable, DoctorsCotRune } from './DoctorsCotRune.js'

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

function translate(input) {
    let output = [];
    let str = input;
    while (str.length) {
        const first2 = str.slice(0, 2);
        let rune = DoctorsCotRune.parse(first2);
        if (rune) {
            output.push(rune);
            str = str.slice(2, str.length);
        } else {
            rune = DoctorsCotRune.parse(str.charAt(0));
            if (rune){
                output.push(rune);
                str = str.slice(1, str.length);
            }
            else return false;
        }
    }
    return output;
}

export function doctorsCotDraw(ctx, input) {
    const translation = translate(input);
    ctx.clearRect(0, 0, 999, 999);
    if(translation){
        ctx.strokeStyle = '#d7703a';
        translation.forEach(rune => rune.draw(ctx));
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText("Translation failed.", 50, 50);
    }
}