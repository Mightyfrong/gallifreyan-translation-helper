export let UILanguage = {
	//supported languages, flags taken from http://hjnilsson.github.io/country-flags/
	supported: {
		en: ["english", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><path d="M0,0 v30 h60 v-30 z" fill="#00247d"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#cf142b" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#cf142b" stroke-width="6"/></svg>'],
		de: ["deutsch", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"/><rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"/><rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"/></svg>']
		//lt: ["lietuvis", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect fill="#C1272D" width="5" height="3"/><rect fill="#006A44" width="5" height="2"/><rect fill="#FDB913" width="5" height="1"/></svg>']
	},
	//language chunks
	say: {
		helpwith: {
			en: "Help with",
			de: "Hilf bei",
			lt: "Padėti su"
		},
		circular: {
			en: "circular",
			de: "kreisförmig",
			lt: "žiediniai"
		},
		convertc: {
			en: "convert C",
			de: "C umwandeln",
			lt: "konvertuoti C"
		},
		stacking: {
			en: "stacking",
			de: "gruppiert",
			lt: "sugrupuoti"
		},
		stack: {
			en: "Maximum stacked",
			de: "Maximal gruppiert",
			lt: "Didžiausias sukrautas"
		},
		ipakeys: {
			en: "IPA keyboard",
			de: "IPA Tastatur",
			lt: "IPA klaviatūra"
		},
		enkeys: {
			en: "phonetic/english keyboard",
			de: "lautsprachliche/englische Tastatur",
			lt: "fonetinė/angliška klaviatūra"
		},
		cbhint: {
			en: "Please separate syllables manually with a space",
			de: "Silben bitte manuell mit Leerzeichen trennen",
			lt: "Skydus rankiniu būdu atskirkite tarpais"
		},
		punctuationhint: {
			en: "If a phrase does not end with supported punctuation, a period will be added by default.",
			de: "Wenn die Eingabe nicht mit einem unterstützen Satzzeichen endet, wird automatisch ein Punkt ergänzt.",
			lt: "Jei frazė nesibaigia palaikomu skyrybos ženklu, pagal numatytuosius nustatymus pridedamas taškas."
		},
		inputplaceholder: {
			en: "type your text here",
			de: "Text hier eingeben",
			lt: "įveskite savo tekstą čia"
		},
		renderbutton: {
			en: "Render",
			de: "Anzeigen",
			lt: "Rodyti"
		},
		processError: {
			en: "The following characters could not be processed: ",
			de: "Die folgenden Zeichen konnten nicht verarbeitet werden: ",
			lt: "Nepavyko apdoroti šių simbolių: "
		},
		info: {
			en: "This is a tool aimed at artists and hobbyists who produce designs in one of the supported types of Gallifreyan. " +
				"Use it online or install it as a progressive web app on your device to use it offline on the go.<br />" +
				"Please recognize this tool not as a translator: it serves the purpose of quicker impressions of writing syntax. " +
				"The artistic composition is, and should be, your challenge. Please do not use any of these outputs for an immediate tattoo template!",
			de: "Dieses Hilfsmittel richtet sich an Künster und Hobbyisten, welche Designs in einem oder mehreren der unterstützen Arten Gallifreyisch erstellen. " +
				"Nutzt es online oder installiert es als Progressive Web App auf eurem Gerät um es auch offline immer dabei zu haben.<br />" +
				"Bitte betrachtet dieses Werkzeug nicht als Übersetzer: es dient nur einem schnellen Eindruck der Schreibweise.<br />" +
				"Die ästhetische Ausarbeitung ist bewusst eure Herausforderung. Bitte benutzt keines der Ergebnisse als direkte Tattoo-Vorlage!",
			lt: "Tai internetinė priemonė menininkams ir mėgėjams, kurie kuria vieną iš palaikomų Gallifreyan tipų.<br />" +
				"Atpažinkite šį įrankį ne kaip vertėją: jis skirtas greičiau parodyti rašymo sintaksę.<br />" +
				"Meninė kompozicija yra ir turėtų būti jūsų iššūkis. Prašau nenaudoti nė vieno iš šių rezultatų, jei norite iš karto tatuiruoti šabloną!"
		},
	},
	//get setting from localstorage or return english by default
	get: function () {
		return (window.localStorage.getItem("gthlanguage") || "en");
	},
	//set language to localstorage if supported else english by default
	set: function (lang) {
		if (!(lang in this.supported)) lang = "en";
		window.localStorage.setItem("gthlanguage", lang);
	},
	//return requested chunk in selected or default language
	write: function (chunk) {
		let lang = this.get();
		if (this.say[chunk] === undefined) {
			alert(chunk + " is undefined");
			return;
		}
		if (this.say[chunk][lang] === undefined) return this.say[chunk].en;
		return this.say[chunk][lang];
	},
	init: function () {
		//overwrite initial rendered text putputs
		let dest = ["circular", "convertc", "stacking", "stack"]; //, "ipakeys", "enkeys"]; // keyboard setting can not be translated because this modifies the object that is not longer observed as changing event
		dest.forEach(id => {
			document.getElementById(id).parentElement.innerHTML =
				document.getElementById(id).parentElement.innerHTML.replaceAll(/([\w ]+?)</g, ($1, $2) => {
					if ($2) return $1.replace($2, this.write(id));
				});
		}, {
			write: this.write
		});
		document.getElementById("cbhint").innerHTML = this.write('cbhint');
		document.getElementById("cwhint").innerHTML = this.write('punctuationhint');
		document.getElementById("gchint").innerHTML = this.write('punctuationhint');

		document.getElementById("helpwith").innerHTML = this.write('helpwith');
		document.getElementById("text").placeholder = this.write('inputplaceholder');
		document.getElementById("renderbutton").value = this.write('renderbutton');
		document.getElementById("info").innerHTML = this.write('info');

		//display supported languages and add event listeners for setting language
		Object.keys(this.supported).forEach(l => {
			document.getElementById("UILanguages").innerHTML += '<input type="radio" name="UILanguages" id="UILanguage' + l + '" value="' + l + '" style="display:none" /><label for="UILanguage' + l + '" title="' + this.supported[l][0] + '">' + this.supported[l][1] + '</label> '
		});
		const UILanguagesinputs = document.getElementsByName("UILanguages");
		UILanguagesinputs.forEach(t => {
			document.getElementById(t.id).addEventListener('input', event => {
				this.set(event.target.value);
				location.reload();
			});
		});
	}
};

/**Copyright 2020-2021 Mightyfrong, erroronline1, ModisR
 *
 * This file is part of the Gallifreyan Translation Helper,
 * henceforth referred to as "the GTH".
 *
 * The GTH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The GTH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with the GTH.  If not, see <https://www.gnu.org/licenses/>.
 */