let cLetter; //is there a "c"?
let qLetter; //is there a "q"?
let shermansScale = 1.5 //scale of letters
let consonant = 30; //radius of consonants
let vowel = 15; // radius of vowels
let width;
let height;
//specify base for every letter, assign base to latin characters and specify geometric properties
let shermansBase = {
	scgtable: {
		punctuation: {
			contains: [".", "?", "!", "\"", "'", "-", ",", ";", ":"],
			centerYoffset: consonant * 1.25
		},
		number: {
			contains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
			centerYoffset: 0
		},
		ve: {
			contains: ["e", "é", "è", "i", "í", "ì", "u", "ü", "ú", "ù"],
			centerYoffset: 0,
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			}
		},
		va: {
			contains: ["a", "ä", "á", "à"],
			centerYoffset: vowel * 1.75,
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			}
		},
		vo: {
			contains: ["o", "ö", "ó", "ò"],
			centerYoffset: -vowel * 1.75,
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
				return {
					x: vowel * Math.cos(radiant),
					y: -vowel * Math.sin(radiant)
				}
			}
		},
		b: {
			contains: ["b", "ch", "d", "g", "h", "f"],
			centerYoffset: -consonant * .9,
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
				let options = {
					ve: {
						x: 0,
						y: 0
					},
					va: {
						x: 0,
						y: consonant * .9//-this.centerYoffset
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
			contains: ["j", "ph", "k", "l", "c", "n", "p", "m"],
			centerYoffset: -consonant * 1.25,
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
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
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
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
			radialPlacement: function (item, radiant) {
				if (radiant === undefined) radiant = Math.PI * .25
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
			if (this.scgtable[row]["contains"].indexOf(char) > -1) rtrn = row;
		});
		return rtrn;
	}
}

//specify decoration for every letter
function shermansDeco(char) {
	let scgtable = {
		"null": [".", "?", "!", "\"", "'", "-", ",", ",", ":", "a", "e", "o", "b", "j", "t", "th"],
		"number": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
		"il": ["i", "í", "ì"],
		"ul": ["u", "ü", "ú", "ù"],
		"d1l": ["á", "é", "í", "ó", "ú"],
		"d2l": ["ä", "ö", "ü"],
		"d3l": ["à", "è", "ì", "ò", "ù"],
		"1l": ["g", "n", "v", "qu"],
		"2l": ["h", "p", "w", "x"],
		"3l": ["f", "m", "s", "ng"],
		"1d": ["ph", "wh", "gh"],
		"2d": ["ch", "k", "sh", "y"],
		"3d": ["d", "l", "r", "z"],
		"4d": ["c", "q"],
	};
	let rtrn = [];
	Object.keys(scgtable).forEach(row => {
		if (scgtable[row].indexOf(char) > -1) rtrn.push(row);
	});
	return (!rtrn.length || (rtrn.length == 1 && rtrn[0] == "null")) ? false : rtrn;
};

//replacements
function replacements(word) {
	var cword = "";
	for (var i = 0; i < word.length; i++) { //iterate through word 
		if (word[i] == "c" && document.getElementById('scgc').checked) {
			if (word[i + 1] == "k") continue; //omit ck
			else if (["e", "i", "y"].indexOf(word[i + 1]) > -1) cword += "s";
			else cword += "k"; //end of the word
		} else if (word[i] == "ß") cword += "ss";
		else cword += word[i];
	}
	return cword;
}

let x; //draw coordinate x
let y; //draw coordinate y
let letterwidth;
let letterheight;
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
		lettergroups += word.length + 1;
	})

	//set canvas scale for groups
	width = Math.floor(window.innerWidth / letterwidth) * letterwidth - letterwidth;
	height = letterheight * 1.5 * Math.ceil(Math.floor(window.innerWidth / letterwidth) / --lettergroups);

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
					var thicknumberline = /*is number group */ Boolean("1234567890".indexOf(group[0]) + 1) && (
						( /*is comma*/ ",.".indexOf(group[l]) > -1) ||
						( /*is last digit without comma*/ l == group.length - 1 && (group.indexOf(",") < 0 && group.indexOf(".") < 0))
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

//set rules for grouping
let shermansGrouped = {
	groups: function (input) {
		//creates a multidimensional array for
		//sentence -> words -> groups -> single letters
		var sentence = [];
		var splitinput = input.split(" "); //split input to single words and iterate through these
		splitinput.forEach(sword => {
			sentence.push([]); //init new word
			var group = [];
			sword = replacements(sword)
			for (var i = 0; i < sword.length; i++) { //iterate through word 
				var current = sword[i],
					currenttwo = sword[i] + sword[i + 1];
				//add double latin characters to group
				if (["th", "gh", "ng", "qu", "wh", "sh", "ph", "ch"].indexOf(currenttwo) > -1) {
					current = currenttwo;
					i++;
				}
				//add vowels if none or the same, consonants of same base, numbers to former group if selected
				if (document.getElementById('scgg').checked && group.length > 0) {
					var former = group[group.length - 1][group[group.length - 1].length - 1];
					if (
						( /*vowels */ ["ve", "va", "vo"].indexOf(shermansBase.getBase(current)) > -1 && (["ve", "va", "vo", "number"].indexOf(shermansBase.getBase(former)) < 0 || shermansBase.getBase(current) == shermansBase.getBase(former))) ||
						( /*same base consonant*/ [false, "punctuation", "ve", "va", "vo", "number"].indexOf(shermansBase.getBase(current)) < 0 && group[group.length - 1].length > 0 && shermansBase.getBase(current) == shermansBase.getBase(former)) ||
						( /*numbers, data is of string type here*/ "1234567890,.".indexOf(current) > -1 && group[group.length - 1].length > 0 && "1234567890,.".indexOf(former) > -1)
					)
						group[group.length - 1].push(current)
					else
						group.push([current]);
				} else
					group.push([current]);
			}
			//instead of the strain to draw the numeral closing circle just add a zero to the number group
			if (Boolean("1234567890".indexOf(group[group.length - 1][0]) + 1)) group[group.length - 1].push("0");
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
		if (["b", "j", "t", "th"].indexOf(formerbase) > -1) {
			this.consonantcenter.x = 0;
			this.consonantcenter.y = shermansBase.scgtable[formerbase].centerYoffset;
		}
		if (["b", "j", "t", "th"].indexOf(formerbase) > -1) {
			if (["ve", "va", "vo"].indexOf(actualbase) > -1) this.voweloffset = shermansBase.scgtable[formerbase].radialPlacement(actualbase);
			else if (actualbase === formerbase) {
				this.cresize *= .8;
				if (former != actual) this.linewidth += 1;
			}
		} else /*number and vovel*/ {
			this.vresize *= .8;
		}
	}
}

//get relative x,y positions for line decorators depending on base
function baseRelatedPosition(base, radian) {
	if (radian === undefined) radian = Math.PI * .25;
	switch (base) {
		case "b":
			return {
				"x": consonant * shermansGrouped.cresize * Math.cos(radian), "y": consonant * shermansGrouped.cresize * Math.sin(radian) - consonant * 1.45
			};
		case "j":
			return {
				"x": consonant * shermansGrouped.cresize * Math.cos(radian), "y": consonant * shermansGrouped.cresize * Math.sin(radian) - consonant * 1.75
			};
		case "t":
			return {
				"x": consonant * shermansGrouped.cresize * Math.cos(radian), "y": consonant * shermansGrouped.cresize * Math.sin(radian) - consonant * .7
			};
		case "th":
			return {
				"x": consonant * shermansGrouped.cresize * Math.cos(radian), "y": consonant * shermansGrouped.cresize * Math.sin(radian) - consonant * .7
			};
		case "number":
			return {
				"x": consonant * shermansGrouped.cresize * Math.cos(radian), "y": consonant * shermansGrouped.cresize * Math.sin(radian)
			};
	}
}

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
		let centerYoffset = shermansBase.scgtable[currentbase].centerYoffset;
		//draw base
		if (["punctuation"].indexOf(currentbase) > -1) {
			if (!thicknumberline) {
				draw.line(x, y, x + letterwidth, y);
				draw.line(x, y + centerYoffset, x + letterwidth, y + centerYoffset);
				switch (letter) {
					case ".":
						draw.circle(x + lettercenter, y + centerYoffset, vowel);
						break;
					case "?":
						draw.dot(x + lettercenter * .7, y + centerYoffset * .8, vowel * .5);
						draw.dot(x + lettercenter * 1.3, y + centerYoffset * .8, vowel * .5);
						break;
					case "!":
						draw.dot(x + lettercenter * .4, y + centerYoffset * .8, vowel * .5);
						draw.dot(x + lettercenter, y + centerYoffset * .8, vowel * .5);
						draw.dot(x + lettercenter * 1.6, y + centerYoffset * .8, vowel * .5);
						break;
					case "\"":
						draw.line(x + lettercenter, y + centerYoffset, x + lettercenter, y + centerYoffset * .8);
						break;
					case "'":
						draw.line(x + lettercenter * .8, y + centerYoffset, x + lettercenter * .8, y + centerYoffset * .8);
						draw.line(x + lettercenter * 1.2, y + centerYoffset, x + lettercenter * 1.2, y + centerYoffset * .8);
						break;
					case "-":
						draw.line(x + lettercenter * .6, y + centerYoffset, x + lettercenter * .6, y + centerYoffset * .8);
						draw.line(x + lettercenter, y + centerYoffset, x + lettercenter, y + centerYoffset * .8);
						draw.line(x + lettercenter * 1.4, y + centerYoffset, x + lettercenter * 1.4, y + centerYoffset * .8);
						break;
					case ",":
						draw.dot(x + lettercenter, y + centerYoffset, vowel);
						break;
					case ";":
						draw.dot(x + lettercenter, y + centerYoffset * .8, vowel * .5);
						break;
					case ":":
						draw.circle(x + lettercenter, y + centerYoffset, vowel);
						draw.circle(x + lettercenter, y + centerYoffset, vowel * .75);
						break;
				}
			} else {
				shermansGrouped.linewidth = 2;
			}
		}
		if (["ve", "va", "vo"].indexOf(currentbase) > -1) {
			if (!grouped.carriagereturn) draw.line(x, y, x + letterwidth, y);
			draw.circle(x + lettercenter + grouped.consonantcenter.x + grouped.voweloffset.x, y + ((grouped.consonantcenter.y + grouped.voweloffset.y) || centerYoffset), vowel * grouped.vresize);
		}
		if (["b"].indexOf(currentbase) > -1) {
			if (!grouped.carriagereturn) {
				draw.line(x, y, x + letterwidth * .5 - Math.sin(.5) * consonant, y);
				draw.line(x + letterwidth * .5 + Math.sin(.5) * consonant, y, x + letterwidth, y);
			}
			draw.arc(x + lettercenter, y + centerYoffset, consonant * grouped.cresize, 2 * Math.PI + Math.asin(.9 / grouped.cresize), Math.PI - Math.asin(.9 / grouped.cresize), grouped.linewidth);
		}
		if (["t"].indexOf(currentbase) > -1) {
			if (!grouped.carriagereturn) {
				draw.line(x, y, x + lettercenter - consonant, y);
				draw.line(x + lettercenter + consonant, y, x + letterwidth, y);
			}
			draw.arc(x + lettercenter, y + centerYoffset, consonant * grouped.cresize, 0, Math.PI, grouped.linewidth);
		}
		if (["j", "th"].indexOf(currentbase) > -1) {
			if (!grouped.carriagereturn) draw.line(x, y, x + letterwidth, y);
			draw.circle(x + lettercenter, y + centerYoffset, consonant * grouped.cresize, grouped.linewidth);
		}
		if (["number"].indexOf(currentbase) > -1) {
			if (!grouped.carriagereturn) draw.line(x, y, x + letterwidth, y);
			if (thicknumberline) shermansGrouped.linewidth = 2;
			draw.circle(x + lettercenter, y + centerYoffset, consonant * grouped.cresize, grouped.linewidth);
		}

		//draw decorators
		let radian, xy, decorators = shermansDeco(letter);
		if (decorators) {
			if (decorators.indexOf("1d") > -1) {
				draw.dot(x + lettercenter, y - vowel * 1.5, vowel * .25);
			}
			if (decorators.indexOf("2d") > -1) {
				draw.dot(x + lettercenter * .7, y - vowel * 1.25, vowel * .25);
				draw.dot(x + lettercenter * 1.3, y - vowel * 1.25, vowel * .25);
			}
			if (decorators.indexOf("3d") > -1) {
				draw.dot(x + lettercenter * .5, y - vowel, vowel * .25);
				draw.dot(x + lettercenter, y - vowel * 1.5, vowel * .25);
				draw.dot(x + lettercenter * 1.5, y - vowel, vowel * .25);
			}
			if (decorators.indexOf("4d") > -1) {
				draw.dot(x + lettercenter * .2, y - vowel, vowel * .25);
				draw.dot(x + lettercenter * .7, y - vowel * 1.5, vowel * .25);
				draw.dot(x + lettercenter * 1.3, y - vowel * 1.5, vowel * .25);
				draw.dot(x + lettercenter * 1.8, y - vowel, vowel * .25);
			}
			if (decorators.indexOf("1l") > -1) {
				radian = Math.PI * .45
				xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
				draw.dot(x + lettercenter - xy.x * 1.25, y - consonant + xy.y * 1.25, 4);
				draw.dot(x + lettercenter - xy.x * 1.25 - Math.cos(radian) * consonant, y - consonant + xy.y * 1.25 - Math.sin(radian) * consonant, 4);
				draw.line(x + lettercenter + xy.x, y - consonant + xy.y, x + lettercenter + xy.x - Math.cos(radian) * consonant, y - consonant + xy.y + Math.sin(radian) * consonant);
			}
			if (decorators.indexOf("2l") > -1) {
				radian = Math.PI * .30
				xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
				draw.line(x + (25 - xy.x) * shermansScale, y - (25 + xy.y) * shermansScale, x + (25 - xy.x - Math.cos(radian) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radian) * 20) * shermansScale);
				radian = Math.PI * .20
				xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
				draw.line(x + (25 - xy.x) * shermansScale, y - (25 + xy.y) * shermansScale, x + (25 - xy.x - Math.cos(radian) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radian) * 20) * shermansScale);
			}
			if (decorators.indexOf("3l") > -1) {
				radian = Math.PI * .15
				xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
				draw.line(x + (25 - xy.x) * shermansScale, y - (25 + xy.y) * shermansScale, x + (25 - xy.x - Math.cos(radian) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radian) * 20) * shermansScale);
				radian = Math.PI * .25
				xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
				draw.line(x + (25 - xy.x) * shermansScale, y - (25 + xy.y) * shermansScale, x + (25 - xy.x - Math.cos(radian) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radian) * 20) * shermansScale);
				radian = Math.PI * .05
				xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
				draw.line(x + (25 - xy.x) * shermansScale, y - (25 + xy.y) * shermansScale, x + (25 - xy.x - Math.cos(radian) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radian) * 20) * shermansScale);
			}
			if (decorators.indexOf("il") > -1) {
				draw.line(x + lettercenter, y - vowel + grouped.voweloffset.y, x + lettercenter, y - vowel * 3 + grouped.voweloffset.y);
			}
			if (decorators.indexOf("ul") > -1) {
				draw.line(x + lettercenter, y + vowel + grouped.voweloffset.y, x + lettercenter, y + vowel * 3 + grouped.voweloffset.y);
			}
			if (decorators.indexOf("d1l") > -1) {
				radian = Math.PI * .35
				//draw.line(x + (25 + grouped.voweloffset.x - Math.cos(radian) * 7) * shermansScale, y - (10 - grouped.voweloffset.y - Math.cos(radian) * 5) * shermansScale, x + (25 + grouped.voweloffset.x - Math.cos(radian) * 15) * shermansScale, y - (30 - grouped.voweloffset.y - Math.cos(radian) * 15) * shermansScale);
			}
			if (decorators.indexOf("d2l") > -1) {
				radian = Math.PI * .30
				//draw.line(x + (25 + grouped.voweloffset.x - xy.x - Math.cos(radian) * 5) * shermansScale, y - (10 - grouped.voweloffset.y - Math.cos(radian) * 5) * shermansScale, x + (25 + grouped.voweloffset.x - Math.cos(radian) * 15) * shermansScale, y - (30 - grouped.voweloffset.y - Math.cos(radian) * 15) * shermansScale);
				radian = Math.PI * .20
				//draw.line(x + (25 + grouped.voweloffset.x - Math.cos(radian) * 5) * shermansScale, y - (10 - grouped.voweloffset.y - Math.cos(radian) * 5) * shermansScale, x + (25 + grouped.voweloffset.x - Math.cos(radian) * 15) * shermansScale, y - (30 - grouped.voweloffset.y - Math.cos(radian) * 15) * shermansScale);
			}
			if (decorators.indexOf("d3l") > -1) {
				radian = Math.PI * .15
				//draw.line(x + (25 + grouped.voweloffset.x - Math.cos(radian) * 5) * shermansScale, y - (10 - grouped.voweloffset.y - Math.cos(radian) * 5) * shermansScale, x + (25 + grouped.voweloffset.x - Math.cos(radian) * 15) * shermansScale, y - (30 - grouped.voweloffset.y - Math.cos(radian) * 15) * shermansScale);
				radian = Math.PI * .25
				//draw.line(x + (25 + grouped.voweloffset.x - Math.cos(radian) * 5) * shermansScale, y - (10 - grouped.voweloffset.y - Math.cos(radian) * 5) * shermansScale, x + (25 + grouped.voweloffset.x - Math.cos(radian) * 15) * shermansScale, y - (30 - grouped.voweloffset.y - Math.cos(radian) * 15) * shermansScale);
				radian = Math.PI * .05
				//draw.line(x + (25 + grouped.voweloffset.x - Math.cos(radian) * 5) * shermansScale, y - (10 - grouped.voweloffset.y - Math.cos(radian) * 5) * shermansScale, x + (25 + grouped.voweloffset.x - Math.cos(radian) * 15) * shermansScale, y - (30 - grouped.voweloffset.y - Math.cos(radian) * 15) * shermansScale);
			}
			if (decorators.indexOf("number") > -1) {
				shermansGrouped.linewidth = 1;
				var number = parseInt(letter),
					rad = .95;
				for (var n = number; n > 0; n--) {
					radian = Math.PI * rad
					xy = baseRelatedPosition(shermansBase.getBase(letter), radian);
					if (n > 4) {
						draw.circle(x + (25 + xy.x * .9) * shermansScale, y - (25 + xy.y * .9) * shermansScale, (xy.y - xy.y * .4) * shermansScale);
						n -= 4;
					} else draw.line(x + (25 + xy.x) * shermansScale, y - (25 + xy.y) * shermansScale, x + (25 + xy.x * .8) * shermansScale, y - (25 + xy.y * .8) * shermansScale);
					rad -= .15;
				}
			}
		}
		ctx.beginPath();
		ctx.fillText(letter, x + lettercenter + grouped.offset * 8, y - letterheight * .5);
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