let x; //draw coordinate x
let y; //draw coordinate y
let cLetter; //is there a "c"?
let qLetter; //is there a "q"?
let size = 1.5 //size of letters
let width;
let height;
//specify base for every letter
var base = {
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
var deco = {
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

//scroll trough input and draw every letter
function shermansTranslate(input) {
  x = 50 * size;
  y = 100 * size;
  cLetter = false;
  qLetter = false;
  input = input.toLowerCase();
  //set canvas size for word
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    if (window.innerWidth < (50 + input.length * 50) * size) {
      width = Math.floor(window.innerWidth / (50 * size)) * 50 * size - 50 * size;
      height = (Math.ceil(((50 + input.length * 50) * size) / window.innerWidth)) * 100 * size + 50 * size;
    }
    else {
      width = (50 + input.length * 50) * size;
      height = 150 * size;
    }
    console.log(width + "  " + height);
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  }
  for (var i = 0; i < input.length; i++) {
    var nexttwo = input[i] + input[i+1];
    if (nexttwo == "th" || nexttwo == "gh" || nexttwo == "ng" || nexttwo == "qu" || nexttwo == "wh" || nexttwo == "sh" || nexttwo == "ph" || nexttwo == "ch") {
      draw(nexttwo);
      i++;
    }
    else {
      draw(input[i]);
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
function draw(letter) {
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
      switch(base[letter]) {
        case "v":
          ctx.lineTo(x + 50 * size, y);
          ctx.stroke();
          switch (letter) {
            case "a":
              ctx.beginPath();
              ctx.arc(x + 25 * size, y + 25 * size, 10 * size, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "e":
              ctx.beginPath();
              ctx.arc(x + 25 * size, y, 10 * size, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "i":
              ctx.beginPath();
              ctx.arc(x + 25 * size, y, 10 * size, 0, 2 * Math.PI, true)
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + 25 * size, y - 10 * size);
              ctx.lineTo(x + 25 * size, y - 30 * size);
              ctx.stroke();
              break;
            case "o":
              ctx.beginPath();
              ctx.arc(x + 25 * size, y - 25 * size, 10 * size, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "u":
              ctx.beginPath();
              ctx.arc(x + 25 * size, y, 10 * size, 0, 2 * Math.PI, true)
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + 25 * size, y + 10 * size);
              ctx.lineTo(x + 25 * size, y + 30 * size);
              ctx.stroke();
              break;
          }
          break;
        case "b":
          ctx.lineTo(x + 18 * size, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * size, y-22 * size, 23 * size, -1.27 + Math.PI, 4.42 + Math.PI, false)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 32 * size, y);
          ctx.lineTo(x + 50 * size, y);
          ctx.stroke();
          break;
        case "j":
          ctx.lineTo(x + 50 * size, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * size, y-25 * size, 20 * size, 0, 2 * Math.PI, true)
          ctx.stroke();
          break;
        case "t":
          ctx.lineTo(x + 5 * size, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * size, y, 20 * size, 0, Math.PI, true)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 45 * size, y);
          ctx.lineTo(x + 50 * size, y);
          ctx.stroke();
          break;
        case "th":
          ctx.lineTo(x + 50 * size, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25 * size, y, 20 * size, 0, 2 * Math.PI, true)
          ctx.stroke();
          break;
      }
      if (base[letter] != "v") {
        switch(deco[letter]) {
          case "1d":
            ctx.beginPath();
            ctx.arc(x + 25 * size, y - 10 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "2d":
            ctx.beginPath();
            ctx.arc(x + 15 * size, y - 10 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 35 * size, y - 10 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "3d":
            ctx.beginPath();
            ctx.arc(x + 12 * size, y - 10 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 25 * size, y - 15 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 38 * size, y - 10 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "4d":
            ctx.beginPath();
            ctx.arc(x + 7 * size, y - 5 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 43 * size, y - 5 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 17 * size, y - 17 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 33 * size, y - 17 * size, 5 * size, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "1l":
            ctx.beginPath();
            ctx.moveTo(x + 25 * size, y - 20 * size);
            ctx.lineTo(x + 25 * size, y - 45 * size);
            ctx.stroke();
            break;
          case "2l":
          ctx.beginPath();
          ctx.moveTo(x + 20 * size, y - 19 * size);
          ctx.lineTo(x + 20 * size, y - 44 * size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 30 * size, y - 19 * size);
          ctx.lineTo(x + 30 * size, y - 44 * size);
          ctx.stroke();
            break;
          case "3l":
          ctx.beginPath();
          ctx.moveTo(x + 25 * size, y - 20 * size);
          ctx.lineTo(x + 25 * size, y - 45 * size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 18 * size, y - 18 * size);
          ctx.lineTo(x + 18 * size, y - 43 * size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 32 * size, y - 18 * size);
          ctx.lineTo(x + 32 * size, y - 43 * size);
          ctx.stroke();
            break;
        }
      }
      ctx.beginPath();
      ctx.fillText(letter, x + 25 * size, y - 50 * size);
    }
  }
  if (x >= width) {
    y += 100 * size;
    x = 0
  }
  x += 50 * size;
}
