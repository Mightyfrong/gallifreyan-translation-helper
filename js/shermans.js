let cLetter; //is there a "c"?
let qLetter; //is there a "q"?
let shermansScale = 1.5 //scale of letters
let width;
let height;
//specify base for every letter
function shermansBase(char) {
	let scgtable = {
		"punctuation": [".", "?", "!", "\"", "'", "-", ",", ";", ":"],
		"v": ["a", "e", "i", "o", "u"],
		"b": ["b", "ch", "d", "g", "h", "f"],
		"j": ["j", "ph", "k", "l", "c", "n", "p", "m"],
		"t": ["t", "wh", "sh", "r", "v", "w", "s"],
		"th": ["th", "gh", "y", "z", "q", "qu", "x", "ng"]
	};
	let rtrn = "";
	Object.keys(scgtable).forEach(function (row) {
		if (scgtable[row].indexOf(char) > -1) rtrn = row;
	});
	return rtrn;
};

//specify decoration for every letter
function shermansDeco(char) {
	let scgtable = {
		"null": [".", "?", "!", "\"", "'", "-", ",", ",", ":", "a", "e", "i", "o", "u", "b", "j", "t", "th"],
		"1l": ["g", "n", "v", "qu"],
		"2l": ["h", "p", "w", "x"],
		"3l": ["f", "m", "s", "ng"],
		"1d": ["ph", "wh", "gh"],
		"2d": ["ch", "k", "sh", "y"],
		"3d": ["d", "l", "r", "z"],
		"4d": ["c", "q"]
	};
	let rtrn = "";
	Object.keys(scgtable).forEach(function (row) {
		if (scgtable[row].indexOf(char) > -1) rtrn = row;
	});
	return rtrn == "null" ? "" : rtrn;
};

let x; //draw coordinate x
let y; //draw coordinate y
//scroll through input and draw every letter
export function shermansTranslate(ctx, input) {
	x = -50 * shermansScale;
	y = 120 * shermansScale;
	cLetter = false;
	qLetter = false;
	draw.init(ctx, 1);

	//convert string to grouped array
	let groupedinput = shermansGrouped.groups(input.toLowerCase());

	//set canvas scale for words
	if (window.innerWidth < (50 + input.length * 50) * shermansScale) {
		width = Math.floor(window.innerWidth / (50 * shermansScale)) * 50 * shermansScale - 50 * shermansScale;
		height = (Math.ceil(((50 + input.length * 50) * shermansScale) / window.innerWidth)) * 120 * shermansScale + 50 * shermansScale;
	} else {
		width = (50 + input.length * 50) * shermansScale;
		height = 170 * shermansScale;
	}
	ctx.canvas.width = width;
	ctx.canvas.height = height;

	groupedinput.forEach(function (words) {
		words.forEach(function (groups) {
			groups.forEach(function (group) {
				shermansGrouped.resetOffset();
				for (var l = 0; l < group.length; l++) {
					//consonants always come first, vowels after first item are always grouped
					if (l > 0) shermansGrouped.setOffset(group[l - 1], group[l]);
					shermansDraw(ctx, group[l], shermansGrouped);
				}
			})
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

function shermansC(word) {
	var cword = "";
	for (var i = 0; i < word.length; i++) { //iterate through word 
		if (word[i] == "c") {
			if (word[i + 1] == "k") continue; //omit ck
			else if (["e", "i", "y"].indexOf(word[i + 1]) > -1) cword += "s";
			else cword += "k"; //end of the word
		} else cword += word[i];
	}
	return cword;
}

//set rules for grouping
var shermansGrouped = {
	groups: function (input) {
		//creates a multidimensional array for
		//sentence -> words -> groups -> single letters
		var sentence = [];
		var splitinput = input.split(" "); //split input to single words and iterate through these
		splitinput.forEach(function (sword) {
			sentence.push([]); //init new word
			var group = [];
			if (document.getElementById('scgc').checked) sword = shermansC(sword);
			for (var i = 0; i < sword.length; i++) { //iterate through word 
				var current = sword[i],
					nexttwo = sword[i] + sword[i + 1];
				//add double latin characters to group
				if (["th", "gh", "ng", "qu", "wh", "sh", "ph", "ch"].indexOf(nexttwo) > -1) {
					current = nexttwo;
					i++;
				}
				//add vowels if none or the same or consonants of same base to former group
				if (document.getElementById('scgg').checked && group.length > 0 && (
						( /*vowels */ shermansBase(current) == "v" && ("aeiou".indexOf(group[group.length - 1][group[group.length - 1].length - 1]) < 0 || current == group[group.length - 1][group[group.length - 1].length - 1])) ||
						( /*same base consonant*/ shermansBase(current) != "punctuation" && shermansBase(current) != "v" && group[group.length - 1].length > 0 && shermansBase(current) == shermansBase(group[group.length - 1][group[group.length - 1].length - 1]))
					))
					group[group.length - 1].push(current)
				else
					group.push([current]);
			}
			sentence[sentence.length - 1].push(group); //append group to last word
		});
		return sentence;
	},
	resetOffset: function () {
		this.carriagereturn = false;
		this.voweloffset = {
			"x": 0,
			"y": 0
		};
		this.vresize = 1;
		this.cresize = 1;
		this.offset = 0;
		this.linewidth = 1;
	},
	setOffset: function (former, actual) {
		this.offset++;
		this.carriagereturn = true;
		if (shermansBase(former) == "b") {
			if (actual == "a") {} else if (actual == "o") this.voweloffset = baseRelatedPosition("b");
			else if (shermansBase(actual) == "b") {
				this.cresize *= 1.2;
				if (former != actual) this.linewidth += 1;
			} else /*eiu*/ {
				this.voweloffset.y = -22;
			}
		} else if (shermansBase(former) == "j") {
			if (actual == "a") {} else if (actual == "o") this.voweloffset = baseRelatedPosition("j");
			else if (shermansBase(actual) == "j") {
				this.cresize *= 1.2;
				if (former != actual) this.linewidth += 1;
			} else /*eiu*/ {
				this.voweloffset.y = -25;
			}
		} else if (shermansBase(former) == "t") {
			if (actual == "a") {} else if (actual == "o") this.voweloffset = baseRelatedPosition("t");
			else if (shermansBase(actual) == "t") {
				this.cresize *= 1.2;
				if (former != actual) this.linewidth += 1;
			} else /*eiu*/ {}
		} else if (shermansBase(former) == "th") {
			if (actual == "a") {} else if (actual == "o") this.voweloffset = baseRelatedPosition("th");
			else if (shermansBase(actual) == "th") {
				this.cresize *= 1.2;
				if (former != actual) this.linewidth += 1;
			} else /*eiu*/ {}
		} else /*vovel*/ {
			this.vresize *= 1.2;
			if (actual == "a") {} else if (actual == "o") {} else /*eiu*/ {}
		}
	}
}

//get relative x,y positions for line decorators depending on base
function baseRelatedPosition(base, radiant) {
	if (radiant === undefined) radiant = Math.PI * .25;
	switch (base) {
		case "b":
			return {
				"x": 20 * shermansGrouped.cresize * Math.cos(radiant), "y": 20 * shermansGrouped.cresize * Math.sin(radiant)
			};
		case "j":
			return {
				"x": 20 * shermansGrouped.cresize * Math.cos(radiant), "y": 20 * shermansGrouped.cresize * Math.sin(radiant)
			};
		case "t":
			return {
				"x": 20 * shermansGrouped.cresize * Math.cos(radiant), "y": 20 * shermansGrouped.cresize * Math.sin(radiant) - 25
			};
		case "th":
			return {
				"x": 20 * shermansGrouped.cresize * Math.cos(radiant), "y": 20 * shermansGrouped.cresize * Math.sin(radiant) - 25
			};
	}
}

var draw = {
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
	dot: function (x, y, r, lw) {
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
function shermansDraw(ctx, letter, grouped) {
	if (!grouped.carriagereturn) {
		if (x + 50 * shermansScale >= width) {
			y += 120 * shermansScale;
			x = 0;
		} else x += 50 * shermansScale;
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
		switch (shermansBase(letter)) {
			case "punctuation":
				draw.line(x, y, x + 50 * shermansScale, y);
				draw.line(x, y + 25 * shermansScale, x + 50 * shermansScale, y + 25 * shermansScale);
				switch (letter) {
					case ".":
						draw.circle(x + 25 * shermansScale, y + 25 * shermansScale, 10 * shermansScale);
						break;
					case "?":
						draw.dot(x + 17.5 * shermansScale, y + 15 * shermansScale, 5 * shermansScale);
						draw.dot(x + 32.5 * shermansScale, y + 15 * shermansScale, 5 * shermansScale);
						break;
					case "!":
						draw.dot(x + 10 * shermansScale, y + 15 * shermansScale, 5 * shermansScale);
						draw.dot(x + 25 * shermansScale, y + 15 * shermansScale, 5 * shermansScale);
						draw.dot(x + 40 * shermansScale, y + 15 * shermansScale, 5 * shermansScale);
						break;
					case "\"":
						draw.line(x + 25 * shermansScale, y + 25 * shermansScale, x + 25 * shermansScale, y + 15 * shermansScale);
						break;
					case "'":
						draw.line(x + 20 * shermansScale, y + 25 * shermansScale, x + 20 * shermansScale, y + 15 * shermansScale);
						draw.line(x + 30 * shermansScale, y + 25 * shermansScale, x + 30 * shermansScale, y + 15 * shermansScale);
						break;
					case "-":
						draw.line(x + 15 * shermansScale, y + 25 * shermansScale, x + 15 * shermansScale, y + 15 * shermansScale);
						draw.line(x + 25 * shermansScale, y + 25 * shermansScale, x + 25 * shermansScale, y + 15 * shermansScale);
						draw.line(x + 35 * shermansScale, y + 25 * shermansScale, x + 35 * shermansScale, y + 15 * shermansScale);
						break;
					case ",":
						draw.dot(x + 25 * shermansScale, y + 25 * shermansScale, 10 * shermansScale);
						break;
					case ";":
						draw.dot(x + 25 * shermansScale, y + 15 * shermansScale, 5 * shermansScale);
						break;
					case ":":
						draw.circle(x + 25 * shermansScale, y + 25 * shermansScale, 10 * shermansScale);
						draw.circle(x + 25 * shermansScale, y + 25 * shermansScale, 7.5 * shermansScale);
						break;
				}
				break;
			case "v":
				if (!grouped.carriagereturn) draw.line(x, y, x + 50 * shermansScale, y);
				switch (letter) {
					case "a":
						draw.circle(x + (25 + grouped.voweloffset.x) * shermansScale, y + (25 + grouped.voweloffset.y) * shermansScale, 10 * shermansScale * grouped.vresize);
						break;
					case "e":
						draw.circle(x + (25 + grouped.voweloffset.x) * shermansScale, y + grouped.voweloffset.y * shermansScale, 10 * shermansScale * grouped.vresize);
						break;
					case "i":
						draw.circle(x + (25 + grouped.voweloffset.x) * shermansScale, y + grouped.voweloffset.y * shermansScale, 10 * shermansScale * grouped.vresize);
						draw.line(x + (25 + grouped.voweloffset.x) * shermansScale, y - (10 - grouped.voweloffset.y) * shermansScale, x + (25 + grouped.voweloffset.x) * shermansScale, y - (30 - grouped.voweloffset.y) * shermansScale);
						break;
					case "o":
						draw.circle(x + (25 + grouped.voweloffset.x) * shermansScale, y - (25 + grouped.voweloffset.y) * shermansScale, 10 * shermansScale * grouped.vresize);
						break;
					case "u":
						draw.circle(x + (25 + grouped.voweloffset.x) * shermansScale, y + grouped.voweloffset.y * shermansScale, 10 * shermansScale * grouped.vresize);
						draw.line(x + (25 + grouped.voweloffset.x) * shermansScale, y + (10 + grouped.voweloffset.y) * shermansScale, x + (25 + grouped.voweloffset.x) * shermansScale, y + (30 + grouped.voweloffset.y) * shermansScale);
						break;
				}
				break;
			case "b":
				if (!grouped.carriagereturn) {
					draw.line(x, y, x + 18 * shermansScale, y);
					draw.line(x + 32 * shermansScale, y, x + 50 * shermansScale, y);
				}
				draw.arc(x + 25 * shermansScale, y - 22 * shermansScale, 23 * shermansScale * grouped.cresize, 2 * Math.PI + Math.asin(22 / 23 / grouped.cresize), Math.PI - Math.asin(22 / 23 / grouped.cresize), grouped.linewidth);
				break;
			case "j":
				if (!grouped.carriagereturn) draw.line(x, y, x + 50 * shermansScale, y);
				draw.arc(x + 25 * shermansScale, y - 25 * shermansScale, 20 * shermansScale * grouped.cresize, 0, 2 * Math.PI, grouped.linewidth);
				break;
			case "t":
				if (!grouped.carriagereturn) {
					draw.line(x, y, x + 5 * shermansScale, y);
					draw.line(x + 45 * shermansScale, y, x + 50 * shermansScale, y);
				}
				draw.arc(x + 25 * shermansScale, y, 20 * shermansScale * grouped.cresize, 0, Math.PI, grouped.linewidth);
				break;
			case "th":
				if (!grouped.carriagereturn) draw.line(x, y, x + 50 * shermansScale, y);
				draw.circle(x + 25 * shermansScale, y, 20 * shermansScale * grouped.cresize, grouped.linewidth);
				break;
		}
		if (shermansBase(letter) != "v") {
			let radiant, xy;
			switch (shermansDeco(letter)) {
				case "1d":
					draw.dot(x + 25 * shermansScale, y - 10 * shermansScale, 2 * shermansScale);
					break;
				case "2d":
					draw.dot(x + 18 * shermansScale, y - 13 * shermansScale, 2 * shermansScale);
					draw.dot(x + 32 * shermansScale, y - 13 * shermansScale, 2 * shermansScale);
					break;
				case "3d":
					draw.dot(x + 12 * shermansScale, y - 10 * shermansScale, 2 * shermansScale);
					draw.dot(x + 25 * shermansScale, y - 15 * shermansScale, 2 * shermansScale);
					draw.dot(x + 38 * shermansScale, y - 10 * shermansScale, 2 * shermansScale);
					break;
				case "4d":
					draw.dot(x + 7 * shermansScale, y - 5 * shermansScale, 2 * shermansScale);
					draw.dot(x + 43 * shermansScale, y - 5 * shermansScale, 2 * shermansScale);
					draw.dot(x + 17 * shermansScale, y - 17 * shermansScale, 2 * shermansScale);
					draw.dot(x + 33 * shermansScale, y - 17 * shermansScale, 2 * shermansScale);
					break;
				case "1l":
					radiant = Math.PI * .35
					xy = baseRelatedPosition(shermansBase(letter), radiant);
					draw.line(x + (25 - xy.x - Math.cos(radiant)) * shermansScale, y - (25 + xy.y + Math.sin(radiant)) * shermansScale, x + (25 - xy.x - Math.cos(radiant) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radiant) * 20) * shermansScale);
					break;
				case "2l":
					radiant = Math.PI * .30
					xy = baseRelatedPosition(shermansBase(letter), radiant);
					draw.line(x + (25 - xy.x - Math.cos(radiant)) * shermansScale, y - (25 + xy.y + Math.sin(radiant)) * shermansScale, x + (25 - xy.x - Math.cos(radiant) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radiant) * 20) * shermansScale);
					radiant = Math.PI * .20
					xy = baseRelatedPosition(shermansBase(letter), radiant);
					draw.line(x + (25 - xy.x - Math.cos(radiant)) * shermansScale, y - (25 + xy.y + Math.sin(radiant)) * shermansScale, x + (25 - xy.x - Math.cos(radiant) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radiant) * 20) * shermansScale);
					break;
				case "3l":
					radiant = Math.PI * .15
					xy = baseRelatedPosition(shermansBase(letter), radiant);
					draw.line(x + (25 - xy.x - Math.cos(radiant)) * shermansScale, y - (25 + xy.y + Math.sin(radiant)) * shermansScale, x + (25 - xy.x - Math.cos(radiant) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radiant) * 20) * shermansScale);
					radiant = Math.PI * .25
					xy = baseRelatedPosition(shermansBase(letter), radiant);
					draw.line(x + (25 - xy.x - Math.cos(radiant)) * shermansScale, y - (25 + xy.y + Math.sin(radiant)) * shermansScale, x + (25 - xy.x - Math.cos(radiant) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radiant) * 20) * shermansScale);
					radiant = Math.PI * .05
					xy = baseRelatedPosition(shermansBase(letter), radiant);
					draw.line(x + (25 - xy.x - Math.cos(radiant)) * shermansScale, y - (25 + xy.y + Math.sin(radiant)) * shermansScale, x + (25 - xy.x - Math.cos(radiant) * 20) * shermansScale, y - (25 + xy.y + Math.sin(radiant) * 20) * shermansScale);
					break;
			}
		}
		ctx.beginPath();
		ctx.fillText(letter, x + (25 + grouped.offset * 5) * shermansScale, y - 60 * shermansScale);
	}
}