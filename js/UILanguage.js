export let UILanguage = {
	//supported languages, flags taken from http://hjnilsson.github.io/country-flags/
	supported: {
		en: ["english", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><path d="M0,0 v30 h60 v-30 z" fill="#00247d"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#cf142b" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#cf142b" stroke-width="6"/></svg>'],
		de: ["deutsch", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"/><rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"/><rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"/></svg>'],
		lt: ["lietuvis", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect fill="#C1272D" width="5" height="3"/><rect fill="#006A44" width="5" height="2"/><rect fill="#FDB913" width="5" height="1"/></svg>']
	},
	//language chunks
	say: {
		helpwith: {
			en: "Help with",
			de: "Hilf bei",
			lt: "Padėti su"
		},
		scgcirc: {
			en: "circular words",
			de: "kreisförmige Wörter",
			lt: "žiediniai žodžiai"
		},
		scgc: {
			en: "convert C",
			de: "C umwandeln",
			lt: "konvertuoti C"
		},
		scgg: {
			en: "character stacking",
			de: "gruppierte Buchstaben",
			lt: "simbolių kaupimas"
		},
		ccstack: {
			en: "Maximum stacked characters",
			de: "Maximal gruppierte Buchstaben",
			lt: "Didžiausias sukauptų simbolių skaičius"
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
		info: {
			en: "Still very early and WIP. Please don't spell check your tattoo with this!<br />" +
				"This is an online tool aimed at artists and hobbyists who produce designs in one of the supported types of Gallifreyan.<br />" +
				"Please recognize this tool not as a translator: it serves the purpose of quicker impressions of writing syntax.<br />" +
				"The artistic composition is, and should be, your challenge. Please do not use any of these outputs for an immediate tattoo template!",
			de: "Frühe Version und noch in Arbeit. Bitte prüft nicht die Schreibweise eures Tattoos damit!<br />" +
				"Dieses Hilfsmittel richtet sich an Künster und Hobbyisten, welche Designs in einem oder mehreren der unterstützen Arten Gallifreyisch erstellen<br />" +
				"Bitte betrachtet dieses Werkzeug nicht als Übersetzer: es dient nur einem schnellen Eindruck der Schreibweise.<br />" +
				"Die ästhetische Ausarbeitung ist bewusst eure Herausforderung. Bitte benutzt keines der Ergebnisse als direkte Tattoo-Vorlage!",
			lt: "WIP dar labai anksti. Prašau tuo netikrinti savo rašybos!<br />" +
				"Tai internetinė priemonė menininkams ir mėgėjams, kurie kuria vieną iš palaikomų Gallifreyan tipų.<br />" +
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
		if (this.say[chunk]===undefined) {alert(chunk + " is undefined"); return;}
		if (this.say[chunk][lang]===undefined) return this.say[chunk].en;
		return this.say[chunk][lang];
	},
	init:function(){
		//overwrite initial rendered text putputs
		document.getElementById("helpwith").innerHTML=this.write('helpwith');
		document.getElementById("scgcirc").nextSibling.innerHTML= this.write('scgcirc');
		document.getElementById("scgc").nextSibling.innerHTML= this.write('scgc');
		document.getElementById("scgg").nextSibling.innerHTML= this.write('scgg');
		document.getElementById("ccstack").innerHTML=this.write('ccstack');
		document.getElementById("text").placeholder=this.write('inputplaceholder');
		document.getElementById("renderbutton").value=this.write('renderbutton');
		document.getElementById("info").innerHTML=this.write('info');

		//display supported languages and add event listeners for setting language
		Object.keys(this.supported).forEach(l => {
			document.getElementById("UILanguages").innerHTML += '<input type="radio" name="UILanguages" id="UILanguage' + l + '" value="'+l+'" style="display:none" /><label for="UILanguage' + l + '" title="' + this.supported[l][0] + '">' + this.supported[l][1] + '</label> '
		});
		const UILanguagesinputs=document.getElementsByName("UILanguages");
		UILanguagesinputs.forEach(t=>{
			document.getElementById(t.id).addEventListener('input', event=>{
				this.set(event.target.value);
				location.reload();
			});
		});
	}
};