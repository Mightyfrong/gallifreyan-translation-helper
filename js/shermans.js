let cLetter; //is there a "c"?
let qLetter; //is there a "q"?
let consonant = 30; //radius of consonants
let vowel = Math.floor(consonant / 2); // radius of vowels
let width; //canvas width
let height; //canvas height
let x; //current coordinate x
let y; //current coordinate y
let letterwidth; //you'll figure that one out for yourself
let letterheight; //you'll figure that one out for yourself

//    _                                 _ ___ _         _   _
//   | |_ ___ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | .'|_ -| -_| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|__,|___|___| |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                         |_|
//specify base for every letter, assign base to latin characters and specify geometric properties
let shermansBase = {
	scgtable: {
		punctuation: {
			contains: [".", "?", "!", "\"", "'", "-", ",", ";", ":"],
			centerYoffset: consonant * 1.25
		},
		number: {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "\\"], //last ones are control characters for number ending and negative numbers
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: consonant * Math.cos(radiant),
					y: -consonant * Math.sin(radiant)
				}
			}
		},
		ve: {
			contains: ["e", "é", "è", "i", "í", "ì", "u", "ü", "ú", "ù", "æ"],
			centerYoffset: 0,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			}
		},
		va: {
			contains: ["a", "ä", "á", "à", "å"],
			centerYoffset: vowel * 1.75,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			}
		},
		vo: {
			contains: ["o", "ö", "ó", "ò", "ø"],
			centerYoffset: -vowel * 1.75,
			radialPlacement: function (radiant = Math.PI * .25) {
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			}
		},
		b: {
			contains: ["b", "ch", "d", "g", "h", "f"],
			centerYoffset: -consonant * .9,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: -this.centerYoffset
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			}
		},
		j: {
			contains: ["j", "ph", "k", "l", "c", "n", "p", "m", "ñ"],
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: -this.centerYoffset
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			}
		},
		t: {
			contains: ["t", "wh", "sh", "r", "v", "w", "s"],
			centerYoffset: 0,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: vowel * 1.75
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			}
		},
		th: {
			contains: ["th", "gh", "y", "z", "q", "qu", "x", "ng"],
			centerYoffset: 0,
			radialPlacement: function (radiant = Math.PI * .25, item = "vo") {
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: vowel * 1.75
					},
					vo: {
						x: consonant * Math.cos(radiant),
						y: -consonant * Math.sin(radiant)
					}
				}
				if (!(item in options)) item = "vo";
				return options[item];
			}
		}
	},
	getBase: function (char) {
		let rtrn = false;
		Object.keys(this.scgtable).forEach(row => {
			if (this.scgtable[row].contains.Contains(char)) rtrn = row;
		});
		return rtrn;
	}
}

//      _                     _                             _ ___ _         _   _
//    _| |___ ___ ___ ___ ___| |_ ___ ___   ___ ___ ___ ___|_|  _|_|___ ___| |_|_|___ ___ ___
//   | . | -_|  _| . |  _| .'|  _| . |  _| |_ -| . | -_|  _| |  _| |  _| .'|  _| | . |   |_ -|
//   |___|___|___|___|_| |__,|_| |___|_|   |___|  _|___|___|_|_| |_|___|__,|_| |_|___|_|_|___|
//                                             |_|
//specify decoration for every letter
let shermansDeco = {
	scgtable: {
		"null": {
			contains: [".", "?", "!", "\"", "'", "-", ",", ",", ":", "a", "e", "o", "b", "j", "t", "th"],
		},
		"number": {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
		},
		"il": {
			contains: ["i", "í", "ì"],
			radiants: [.5],
			fromto: [1, 3]
		},
		"ul": {
			contains: ["u", "ü", "ú", "ù"],
			radiants: [1.5],
			fromto: [1, 3]
		},
		"d1l": {
			contains: ["á", "é", "í", "ó", "ú"],
			radiants: [.8],
			fromto: [.5, 1.5]
		},
		"d2l": {
			contains: ["ä", "ö", "ü"],
			radiants: [.8, .7],
			fromto: [.5, 1.5]
		},
		"d3l": {
			contains: ["à", "è", "ì", "ò", "ù"],
			radiants: [.8, .7, .6],
			fromto: [.5, 1.5]
		},
		"1l": {
			contains: ["g", "n", "v", "qu", "ñ"],
			radiants: [.6],
			fromto: [1, 2]
		},
		"2l": {
			contains: ["h", "p", "w", "x"],
			radiants: [.85, .75],
			fromto: [1, 2]
		},
		"3l": {
			contains: ["f", "m", "s", "ng"],
			radiants: [.9, .8, .7],
			fromto: [1, 2]
		},
		"1d": {
			contains: ["ph", "wh", "gh"],
			radiants: [.5],
			fromto: [1]
		},
		"2d": {
			contains: ["ch", "k", "sh", "y"],
			radiants: [.55, .45],
			fromto: [1]
		},
		"3d": {
			contains: ["d", "l", "r", "z"],
			radiants: [.6, .5, .4],
			fromto: [1]
		},
		"4d": {
			contains: ["c", "q"],
			radiants: [.65, .55, .45, .35],
			fromto: [1]
		},
		"2ndvowel": {
			contains: ["å", "ø", "æ"],
			radiants: [0],
			fromto: [1]
		},
		"divot": {
			contains: ["ñ"],
			radiants: [1.75],
			fromto: [1]
		},
		"minus": {
			contains: ["\\"],
			radiants: [1.1],
			fromto: [-1, 1]
		},
	},
	getDeco: function (char) {
		let rtrn = [];
		Object.keys(this.scgtable).forEach(row => {
			if (this.scgtable[row].contains.Contains(char)) rtrn.push(row);
		});
		return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
	}
}

//    _                   _     _   _
//   | |_ ___ ___ ___ ___| |___| |_|_|___ ___
//   |  _|  _| .'|   |_ -| | .'|  _| | . |   |
//   |_| |_| |__,|_|_|___|_|__,|_| |_|___|_|_|
//scroll through input and draw every letter
export function shermansTranslate(ctx, input) {
	letterwidth = consonant * 2.5
	letterheight = consonant * 6

	x = -letterwidth * .5;
	y = letterheight * .6;
	cLetter = false;
	qLetter = false;
	draw.init(ctx, 1);

	//convert string to grouped array and determine number of groups
	let groupedinput = shermansGrouped.groups(input.toLowerCase()),
		lettergroups = 0;
	groupedinput.forEach(word => {
		word.forEach(group => {
			lettergroups += group.length;
		});
		lettergroups += 1;
	})

	//set canvas scale for groups
	width = Math.floor(window.innerWidth / letterwidth) * letterwidth - letterwidth;
	height = letterheight * 1.5 * Math.ceil(--lettergroups / Math.floor(window.innerWidth / letterwidth));

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	groupedinput.forEach(words => {
		words.forEach(groups => {
			groups.forEach(group => {
				//prepare resizing for stacked characters but vowels
				var lastStackedConsonantIndex = group.length - 1,
					vowelindex;
				"aeiou.,".split("").forEach(vowel => {
					vowelindex = group.indexOf(vowel);
					if (vowelindex > -1 && vowelindex <= lastStackedConsonantIndex) lastStackedConsonantIndex = vowelindex - 1;
				});
				shermansGrouped.resetOffset(lastStackedConsonantIndex);
				//iterate through characters
				for (var l = 0; l < group.length; l++) {
					var thicknumberline = /*is number group */ "1234567890".Contains(group[0]) && (
						 /*is comma*/ ",.".Contains(group[l]) ||
						( /*is last digit without comma*/ l == group.length - 1 && !group.Contains([",","."]))
					);

					if (l > 0) shermansGrouped.setOffset(group[l - 1], group[l]);
					shermansDraw(ctx, group[l], shermansGrouped, thicknumberline);
				}
			});
		});
		shermansGrouped.resetOffset();
		shermansDraw(ctx, " ", shermansGrouped);
	});
	//complain about c and q
	let output = "";
	if (cLetter) {
		output = "Consider replacing C (marked red) with K or S exept when it's a name.";
	}
	if (qLetter) {
		output += "<br>I am guessing this is a name but if its not, what is a lone Q doing there?";
	}
	document.getElementById("output").innerHTML = output;
}

//                _                           _
//    ___ ___ ___| |___ ___ ___ _____ ___ ___| |_ ___
//   |  _| -_| . | | .'|  _| -_|     | -_|   |  _|_ -|
//   |_| |___|  _|_|__,|___|___|_|_|_|___|_|_|_| |___|
//           |_|
function replacements(word) {
	var cword = "";
	for (var i = 0; i < word.length; i++) { //iterate through word 
		if (word[i] == "c" && document.getElementById('scgc').checked) {
			if (word[i + 1] == "k") continue; //omit ck
			else if (["e", "i", "y"].Contains(word[i + 1])) cword += "s";
			else cword += "k"; //end of the word
		} else if (word[i] == "ß") cword += "ss";
		else cword += word[i];
	}
	return cword;
}

//                        _
//    ___ ___ ___ _ _ ___|_|___ ___
//   | . |  _| . | | | . | |   | . |
//   |_  |_| |___|___|  _|_|_|_|_  |
//   |___|           |_|       |___|
//set rules for grouping
let shermansGrouped = {
	groups: function (input) {
		//creates a multidimensional array for
		//sentence -> words -> groups -> single letters
		var sentence = [];
		var splitinput = input.replace(/\s+/g," ").split(" "); //strip multiplex whitespaces, split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); //init new word
			var group = [];
			sword = replacements(sword)
			for (var i = 0; i < sword.length; i++) { //iterate through word 
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				//add double latin characters to group
				if (["th", "gh", "ng", "qu", "wh", "sh", "ph", "ch"].Contains(currenttwo)) {
					current = currenttwo;
					i++;
				}
				//add vowels if none or the same, consonants of same base, numbers to former group if selected
				if (document.getElementById('scgg').checked && group.length > 0) {
					var former = group[group.length - 1][group[group.length - 1].length - 1];
					if (
						( /*vowels */ ["ve", "va", "vo"].Contains(shermansBase.getBase(current)) && (!["ve", "va", "vo", "number"].Contains(shermansBase.getBase(former)) || shermansBase.getBase(current) == shermansBase.getBase(former))) ||
						( /*same base consonant*/ ![false, "punctuation", "ve", "va", "vo", "number"].Contains(shermansBase.getBase(current)) && group[group.length - 1].length > 0 && shermansBase.getBase(current) == shermansBase.getBase(former)) ||
						( /*numbers, data is of string type here*/ "-1234567890,.".Contains(current) && group[group.length - 1].length > 0 && "-1234567890,.".Contains(former))
					)
						group[group.length - 1].push(current)
					else
						group.push([current]);
				} else
					group.push([current]);
			}
			//add control characters to the number group
			if ("1234567890".Contains(group[group.length - 1][0])) group[group.length - 1].push("/");
			if (group[group.length - 1][0]==="-" && "1234567890".Contains(group[group.length - 1][1])) {
				group[group.length - 1].shift();
				group[group.length - 1][group[group.length - 1].length]=("\\");}

			sentence[sentence.length - 1].push(group); //append group to last word
		});
		return sentence;
	},
	resetOffset: function (lastStackedConsonantIndex) {
		this.carriagereturn = false;
		this.voweloffset = {
			x: 0,
			y: 0
		};
		this.consonantcenter = {
			x: 0,
			y: 0
		};
		this.vresize = 1;
		if (lastStackedConsonantIndex === undefined) lastStackedConsonantIndex = 0;
		this.cresize = (1 / .8) ** lastStackedConsonantIndex;
		this.offset = 0;
		this.linewidth = 1;
	},
	setOffset: function (former, actual) {
		this.offset++;
		this.carriagereturn = true;
		let actualbase = shermansBase.getBase(actual)
		let formerbase = shermansBase.getBase(former)
		if (["b", "j", "t", "th"].Contains(formerbase)) {
			this.consonantcenter.x = 0;
			this.consonantcenter.y = shermansBase.scgtable[formerbase].centerYoffset;
			if (["ve", "va", "vo"].Contains(actualbase)) this.voweloffset = shermansBase.scgtable[formerbase].radialPlacement(Math.PI * .25, actualbase);
			else if (actualbase === formerbase) {
				this.cresize *= .8;
				if (former != actual) this.linewidth += 1;
			}
		} else if (["number"].Contains(formerbase)) {
			this.cresize *= .8;
		} else
		/*vovel*/
		{
			this.vresize *= .8;
		}
	}
}

//              _ _   _                                 _               _
//    _____ _ _| | |_|_|___ _ _ ___ ___ ___ ___ ___   _| |___ ___ _ _ _|_|___ ___
//   |     | | | |  _| | . | | |  _| . | . |_ -| -_| | . |  _| .'| | | | |   | . |
//   |_|_|_|___|_|_| |_|  _|___|_| |  _|___|___|___| |___|_| |__,|_____|_|_|_|_  |
//                     |_|         |_|                                       |___|
let draw = {
	init: function (ctx, linewidth) {
		this.ctx = ctx;
		this.linewidth = linewidth;
	},
	circle: function (x, y, r, lw) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		this.ctx.stroke();
		this.ctx.lineWidth = this.linewidth;
	},
	arc: function (x, y, r, a, o, lw) { //could be unified with circle with optional params but separated for readibilities sake...
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, a, o, true);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		this.ctx.stroke();
		this.ctx.lineWidth = this.linewidth;
	},
	dot: function (x, y, r) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
		this.ctx.fill();
	},
	line: function (fx, fy, tx, ty, lw) {
		this.ctx.beginPath();
		this.ctx.moveTo(fx, fy);
		this.ctx.lineTo(tx, ty);
		if (lw !== undefined) this.ctx.lineWidth = lw;
		this.ctx.stroke();
		this.ctx.lineWidth = this.linewidth;
	}
};

//                    _ ___ _         _               _
//    ___ ___ ___ ___|_|  _|_|___   _| |___ ___ _ _ _|_|___ ___
//   |_ -| . | -_|  _| |  _| |  _| | . |  _| .'| | | | |   | . |
//   |___|  _|___|___|_|_| |_|___| |___|_| |__,|_____|_|_|_|_  |
//       |_|                                               |___|
//draw instructions for base + decoration
function shermansDraw(ctx, letter, grouped, thicknumberline) {
	if (!grouped.carriagereturn) {
		if (x + letterwidth * 2 >= width) {
			y += letterheight;
			x = letterwidth * .5;
		} else x += letterwidth;
	}
	if (letter != " ") {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black"
		if (letter == "c" || letter == "q") {
			ctx.strokeStyle = 'red';
			ctx.fillStyle = 'red';
			if (letter == "c") {
				cLetter = true;
			} else {
				qLetter = true;
			}
		}
		let lettercenter = letterwidth * .5;
		let currentbase = shermansBase.getBase(letter);
		let center = {
			x: lettercenter + grouped.consonantcenter.x + grouped.voweloffset.x,
			y: ((grouped.consonantcenter.y + grouped.voweloffset.y) || shermansBase.scgtable[currentbase].centerYoffset)
		};

		//draw base
		if (["punctuation"].Contains(currentbase)) {
			if (!thicknumberline) {
				let sentenceline = shermansBase.scgtable.punctuation.centerYoffset;
				draw.line(x, y, x + letterwidth, y);
				draw.line(x, y + sentenceline, x + letterwidth, y + sentenceline);
				switch (letter) {
					case ".":
						draw.circle(x + lettercenter, y + sentenceline, vowel);
						break;
					case "?":
						draw.dot(x + lettercenter * .7, y + sentenceline * .7, vowel * .5);
						draw.dot(x + lettercenter * 1.3, y + sentenceline * .7, vowel * .5);
						break;
					case "!":
						draw.dot(x + lettercenter * .4, y + sentenceline * .7, vowel * .5);
						draw.dot(x + lettercenter, y + sentenceline * .7, vowel * .5);
						draw.dot(x + lettercenter * 1.6, y + sentenceline * .7, vowel * .5);
						break;
					case "\"":
						draw.line(x + lettercenter, y + sentenceline, x + lettercenter, y + sentenceline * .7);
						break;
					case "'":
						draw.line(x + lettercenter * .8, y + sentenceline, x + lettercenter * .8, y + sentenceline * .7);
						draw.line(x + lettercenter * 1.2, y + sentenceline, x + lettercenter * 1.2, y + sentenceline * .7);
						break;
					case "-":
						draw.line(x + lettercenter * .6, y + sentenceline, x + lettercenter * .6, y + sentenceline * .7);
						draw.line(x + lettercenter, y + sentenceline, x + lettercenter, y + sentenceline * .7);
						draw.line(x + lettercenter * 1.4, y + sentenceline, x + lettercenter * 1.4, y + sentenceline * .7);
						break;
					case ",":
						draw.dot(x + lettercenter, y + sentenceline, vowel);
						break;
					case ";":
						draw.dot(x + lettercenter, y + sentenceline * .7, vowel * .5);
						break;
					case ":":
						draw.circle(x + lettercenter, y + sentenceline, vowel);
						draw.circle(x + lettercenter, y + sentenceline, vowel * .75);
						break;
				}
			} else {
				shermansGrouped.linewidth = 2;
			}
		}
		if (["ve", "va", "vo"].Contains(currentbase)) {
			if (!grouped.carriagereturn) draw.line(x, y, x + letterwidth, y);
			draw.circle(x + center.x, y + center.y, vowel * grouped.vresize);
		}
		if (["b"].Contains(currentbase)) {
			if (!grouped.carriagereturn) {
				draw.line(x, y, x + letterwidth * .5 - Math.sin(.5) * consonant, y);
				draw.line(x + letterwidth * .5 + Math.sin(.5) * consonant, y, x + letterwidth, y);
			}
			draw.arc(x + center.x, y + center.y, consonant * grouped.cresize, 2 * Math.PI + Math.asin(.9 / grouped.cresize), Math.PI - Math.asin(.9 / grouped.cresize), grouped.linewidth);
		}
		if (["t"].Contains(currentbase)) {
			if (!grouped.carriagereturn) {
				draw.line(x, y, x + lettercenter - consonant, y);
				draw.line(x + lettercenter + consonant, y, x + letterwidth, y);
			}
			draw.arc(x + center.x, y + center.y, consonant * grouped.cresize, 0, Math.PI, grouped.linewidth);
		}
		if (["j", "th"].Contains(currentbase)) {
			if (!grouped.carriagereturn) draw.line(x, y, x + letterwidth, y);
			draw.circle(x + center.x, y + center.y, consonant * grouped.cresize, grouped.linewidth);
		}
		if (["number"].Contains(currentbase)) {
			if (!grouped.carriagereturn) draw.line(x, y, x + letterwidth, y);
			if (thicknumberline) shermansGrouped.linewidth = 2;
			draw.circle(x + center.x, y + center.y, consonant * grouped.cresize, grouped.linewidth);
		}

		//draw decorators
		let decorators = shermansDeco.getDeco(letter);
		if (decorators) {
			decorators.forEach(deco => {
				if (["number"].Contains(deco)) {
					shermansGrouped.linewidth = 1;
					var number = parseInt(letter),
						rad = .95;
					for (var n = number; n > 0; n--) {
						if (n > 4) {
							draw.circle(
								x + center.x + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).x * grouped.cresize * .9,
								y + center.y + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).y * grouped.cresize * .9,
								shermansBase.scgtable.number.radialPlacement(Math.PI * 1.75).y * grouped.cresize * .15);
							n -= 4;
						} else draw.line(
							x + center.x + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).x * grouped.cresize,
							y + center.y + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).y * grouped.cresize,
							x + center.x + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).x * grouped.cresize * .8,
							y + center.y + shermansBase.scgtable.number.radialPlacement(Math.PI * rad).y * grouped.cresize * .8);
						rad -= .15;
					}
				} else if (["1d", "2d", "3d", "4d"].Contains(deco)) {
					shermansDeco.scgtable[deco].radiants.forEach(rad => {
						let fromto = shermansDeco.scgtable[deco].fromto;
						draw.dot(
							x + center.x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * grouped.cresize,
							y + center.y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * grouped.cresize,
							vowel * .25);
					});
				} else if (["2ndvowel"].Contains(deco)) {
					shermansDeco.scgtable[deco].radiants.forEach(rad => {
						let fromto = shermansDeco.scgtable[deco].fromto;
						draw.circle(
							x + center.x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * grouped.cresize,
							y + center.y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * grouped.cresize,
							vowel);
					});
				} else if (["divot"].Contains(deco)) {
					shermansDeco.scgtable[deco].radiants.forEach(rad => {
						let fromto = shermansDeco.scgtable[deco].fromto;
						draw.arc(
							x + center.x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * grouped.cresize,
							y + center.y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * grouped.cresize,
							vowel, Math.PI * 1.7, Math.PI * .8, grouped.linewidth
						);
						//overpaint base body
						ctx.strokeStyle = 'white';
						draw.arc(
							x + center.x,
							y + center.y,
							consonant * grouped.cresize, Math.PI * .4, Math.PI * .1, grouped.linewidth + 1
						);
					});
				} else {
					/* lines, diacritics, minus for numbers*/
					shermansDeco.scgtable[deco].radiants.forEach(rad => {
						let fromto = shermansDeco.scgtable[deco].fromto;
						draw.line(
							x + center.x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[0] * grouped.cresize,
							y + center.y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[0] * grouped.cresize,
							x + center.x + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).x * fromto[1] * grouped.cresize,
							y + center.y + shermansBase.scgtable[currentbase].radialPlacement(Math.PI * rad).y * fromto[1] * grouped.cresize);
					});
				}
			});
		}
		ctx.beginPath();
		//print character unless it's a (numeral) control character
		if (!["/", "\\"].Contains(letter)) ctx.fillText(letter, x + lettercenter + grouped.offset * 8, y - letterheight * .5);
	}
}

/**Copyright 2020 Mightyfrong, erroronline1, ModisR
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