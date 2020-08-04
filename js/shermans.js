let cLetter; //is there a "c"?
let qLetter; //is there a "q"?
let shermansScale = 1.5 //scale of letters
let width;
let height;
//specify base for every letter
var shermansBase = {
  a : "v",
  b : "b",
  c : "j",
  d : "b",
  e : "v",
  f : "b",
  g : "b",
  h : "b",
  i : "v",
  j : "j",
  k : "j",
  l : "j",
  m : "j",
  n : "j",
  o : "v",
  p : "j",
  q : "th",
  r : "t",
  s : "t",
  t : "t",
  u : "v",
  v : "t",
  w : "t",
  x : "th",
  y : "th",
  z : "th",
  th : "th",
  gh : "th",
  ng : "th",
  qu : "th",
  wh : "t",
  sh : "t",
  ph : "j",
  ch : "b"
  };

//specify decoration for every letter
var shermansDeco = {
  a : "",
  b : "",
  c : "4d",
  d : "3d",
  e : "",
  f : "3l",
  g : "1l",
  h : "2l",
  i : "1l",
  j : "",
  k : "2d",
  l : "3d",
  m : "3l",
  n : "1l",
  o : "",
  p : "2l",
  q : "4d",
  r : "3d",
  s : "3l",
  t : "",
  u : "1l",
  v : "1l",
  w : "2l",
  x : "2l",
  y : "2d",
  z : "3d",
  th : "",
  gh : "1d",
  ng : "3l",
  qu : "1l",
  wh : "1d",
  sh : "2d",
  ph : "1d",
  ch : "2d"
};
function shermansGroup(input){
  //creates a multidimensional array for
  //sentence -> words -> groups -> single letters
  var sentence = [];
  var splitinput = input.split(" "); //split input to single words and iterate through these
  splitinput.forEach(function(sword){
    sentence.push([]); //init new word
    var group = [];
    for (var i = 0; i < sword.length; i++){ //iterate through word 
      var nexttwo = sword[i] + sword[i+1];
      //add double latin characters to group
      if (nexttwo == "th" || nexttwo == "gh" || nexttwo == "ng" || nexttwo == "qu" || nexttwo == "wh" || nexttwo == "sh" || nexttwo == "ph" || nexttwo == "ch") {
        group.push([nexttwo]);
        i++;
      }
      else {
        //add vowels to former group if none or one of the same kind
        if ("aeiou".indexOf(sword[i]) > -1 && group.length > 0 && ("aeiou".indexOf(group[group.length - 1][group[group.length - 1].length - 1]) < 0 || sword[i] == group[group.length - 1][group[group.length - 1].length - 1]))
          group[group.length - 1].push(sword[i])
        //add consonants to group
        else
          group.push([sword[i]]);
      }
    }
    sentence[sentence.length - 1].push(group); //append group to last word
  });
  return sentence;
}

//scroll trough input and draw every letter
function shermansTranslate(input) {
  x = 50 * shermansScale;
  y = 100 * shermansScale;
  cLetter = false;
  qLetter = false;
  input = input.toLowerCase();
  //set canvas scale for words
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    if (window.innerWidth < (50 + input.length * 50) * shermansScale) {
      width = Math.floor(window.innerWidth / (50 * shermansScale)) * 50 * shermansScale - 50 * shermansScale;
      height = (Math.ceil(((50 + input.length * 50) * shermansScale) / window.innerWidth)) * 100 * shermansScale + 50 * shermansScale;
    }
    else {
      width = (50 + input.length * 50) * shermansScale;
      height = 150 * shermansScale;
    }
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  }
  for (var i = 0; i < input.length; i++) {
    var nexttwo = input[i] + input[i+1];
    if (nexttwo == "th" || nexttwo == "gh" || nexttwo == "ng" || nexttwo == "qu" || nexttwo == "wh" || nexttwo == "sh" || nexttwo == "ph" || nexttwo == "ch") {
      shermansDraw(nexttwo);
      i++;
    }
    else {
      shermansDraw(input[i]);
    }
  }
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

//draw instructions for base + decoration
function shermansDraw(letter) {
  if (letter != " ") {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = "black";
      ctx.fillStyle = "black"
      if (letter == "c" || letter == "q") {
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        if(letter == "c") {cLetter = true}
        else {qLetter = true}
      }
      ctx.beginPath();
      ctx.moveTo(x,y);
      switch(shermansBase[letter]) {
        case "v":
          ctx.lineTo(x + 50 * shermansScale, y);
          ctx.stroke();
          switch (letter) {
            case "a":
              ctx.beginPath();
              ctx.arc(x + 25 * shermansScale, y + 25 * shermansScale, 10 * shermansScale, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "e":
              ctx.beginPath();
              ctx.arc(x + 25 * shermansScale, y, 10 * shermansScale, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "i":
              ctx.beginPath();
              ctx.arc(x + 25 * shermansScale, y, 10 * shermansScale, 0, 2 * Math.PI, true)
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + 25 * shermansScale, y - 10 * shermansScale);
              ctx.lineTo(x + 25 * shermansScale, y - 30 * shermansScale);
              ctx.stroke();
              break;
            case "o":
              ctx.beginPath();
              ctx.arc(x + 25 * shermansScale, y - 25 * shermansScale, 10 * shermansScale, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "u":
              ctx.beginPath();
              ctx.arc(x + 25 * shermansScale, y, 10 * shermansScale, 0, 2 * Math.PI, true)
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + 25 * shermansScale, y + 10 * shermansScale);
              ctx.lineTo(x + 25 * shermansScale, y + 30 * shermansScale);
              ctx.stroke();
              break;
          }
          break;
        case "b":
          ctx.lineTo(x + 18 * shermansScale, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * shermansScale, y-22 * shermansScale, 23 * shermansScale, -1.27 + Math.PI, 4.42 + Math.PI, false)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 32 * shermansScale, y);
          ctx.lineTo(x + 50 * shermansScale, y);
          ctx.stroke();
          break;
        case "j":
          ctx.lineTo(x + 50 * shermansScale, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * shermansScale, y-25 * shermansScale, 20 * shermansScale, 0, 2 * Math.PI, true)
          ctx.stroke();
          break;
        case "t":
          ctx.lineTo(x + 5 * shermansScale, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * shermansScale, y, 20 * shermansScale, 0, Math.PI, true)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 45 * shermansScale, y);
          ctx.lineTo(x + 50 * shermansScale, y);
          ctx.stroke();
          break;
        case "th":
          ctx.lineTo(x + 50 * shermansScale, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * shermansScale, y, 20 * shermansScale, 0, 2 * Math.PI, true)
          ctx.stroke();
          break;
      }
      if (shermansBase[letter] != "v") {
        switch(shermansDeco[letter]) {
          case "1d":
            ctx.beginPath();
            ctx.arc(x + 25 * shermansScale, y - 10 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "2d":
            ctx.beginPath();
            ctx.arc(x + 15 * shermansScale, y - 10 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 35 * shermansScale, y - 10 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "3d":
            ctx.beginPath();
            ctx.arc(x + 12 * shermansScale, y - 10 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 25 * shermansScale, y - 15 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 38 * shermansScale, y - 10 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "4d":
            ctx.beginPath();
            ctx.arc(x + 7 * shermansScale, y - 5 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 43 * shermansScale, y - 5 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 17 * shermansScale, y - 17 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 33 * shermansScale, y - 17 * shermansScale, 5 * shermansScale, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "1l":
            ctx.beginPath();
            ctx.moveTo(x + 25 * shermansScale, y - 20 * shermansScale);
            ctx.lineTo(x + 25 * shermansScale, y - 45 * shermansScale);
            ctx.stroke();
            break;
          case "2l":
          ctx.beginPath();
          ctx.moveTo(x + 20 * shermansScale, y - 19 * shermansScale);
          ctx.lineTo(x + 20 * shermansScale, y - 44 * shermansScale);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 30 * shermansScale, y - 19 * shermansScale);
          ctx.lineTo(x + 30 * shermansScale, y - 44 * shermansScale);
          ctx.stroke();
            break;
          case "3l":
          ctx.beginPath();
          ctx.moveTo(x + 25 * shermansScale, y - 20 * shermansScale);
          ctx.lineTo(x + 25 * shermansScale, y - 45 * shermansScale);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 18 * shermansScale, y - 18 * shermansScale);
          ctx.lineTo(x + 18 * shermansScale, y - 43 * shermansScale);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 32 * shermansScale, y - 18 * shermansScale);
          ctx.lineTo(x + 32 * shermansScale, y - 43 * shermansScale);
          ctx.stroke();
            break;
        }
      }
      ctx.beginPath();
      ctx.fillText(letter, x + 25 * shermansScale, y - 50 * shermansScale);
    }
  }
  if (x >= width) {
    y += 100 * shermansScale;
    x = 0
  }
  x += 50 * shermansScale;
}
