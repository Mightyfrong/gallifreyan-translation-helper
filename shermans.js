let x = 50;
let y = 100;
let cLetter = false;
let qLetter = false;

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


function translate() {
  x = 50;
  y = 100;
  cLetter = false;
  qLetter = false;
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  let input = document.getElementById("text").value;
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
  let output = "";
  if (cLetter) {
    output = "Consider replacing C (marked red) with K or S exept when your word is a Name.";
  }
  if (qLetter) {
    output += "<br>I am guessing this is a Name but if its not, what is a lone Q doing there?";
  }
  document.getElementById("output").innerHTML = output;
}

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
        if(letter == "c"){
          cLetter = true;
        }
        else {
          qLetter = true;
        }
      }
      ctx.beginPath();
      ctx.moveTo(x,y);
      switch(base[letter]) {
        case "v":
          ctx.lineTo(x + 50, y);
          ctx.stroke();
          switch (letter) {
            case "a":
              ctx.beginPath();
              ctx.arc(x + 25, y + 25, 10, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "e":
              ctx.beginPath();
              ctx.arc(x + 25, y, 10, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "i":
              ctx.beginPath();
              ctx.arc(x + 25, y, 10, 0, 2 * Math.PI, true)
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + 25, y - 10);
              ctx.lineTo(x + 25, y - 30);
              ctx.stroke();
              break;
            case "o":
              ctx.beginPath();
              ctx.arc(x + 25, y - 25, 10, 0, 2 * Math.PI, true)
              ctx.stroke();
              break;
            case "u":
              ctx.beginPath();
              ctx.arc(x + 25, y, 10, 0, 2 * Math.PI, true)
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(x + 25, y + 10);
              ctx.lineTo(x + 25, y + 30);
              ctx.stroke();
              break;
          }
          break;
        case "b":
          ctx.lineTo(x + 18, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25, y-22, 23, -1.27 + Math.PI, 4.42 + Math.PI, false)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 32, y);
          ctx.lineTo(x + 50, y);
          ctx.stroke();
          break;
        case "j":
          ctx.lineTo(x + 50, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25, y-25, 20, 0, 2 * Math.PI, true)
          ctx.stroke();
          break;
        case "t":
          ctx.lineTo(x + 5, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25, y, 20, 0, Math.PI, true)
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 45, y);
          ctx.lineTo(x + 50, y);
          ctx.stroke();
          break;
        case "th":
          ctx.lineTo(x + 50, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x + 25, y, 20, 0, 2 * Math.PI, true)
          ctx.stroke();
          break;
      }
      if (base[letter] != "v") {
        switch(deco[letter]) {
          case "1d":
            ctx.beginPath();
            ctx.arc(x + 25, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "2d":
            ctx.beginPath();
            ctx.arc(x + 15, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 35, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "3d":
            ctx.beginPath();
            ctx.arc(x + 12, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 25, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 38, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "4d":
            ctx.beginPath();
            ctx.arc(x + 12, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 38, y - 10, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 18, y - 25, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x + 32, y - 25, 5, 0, 2 * Math.PI, true)
            ctx.fill();
            break;
          case "1l":
            ctx.beginPath();
            ctx.moveTo(x + 25, y - 20);
            ctx.lineTo(x + 25, y - 45);
            ctx.stroke();
            break;
          case "2l":
          ctx.beginPath();
          ctx.moveTo(x + 20, y - 19);
          ctx.lineTo(x + 20, y - 44);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 30, y - 19);
          ctx.lineTo(x + 30, y - 44);
          ctx.stroke();
            break;
          case "3l":
          ctx.beginPath();
          ctx.moveTo(x + 25, y - 20);
          ctx.lineTo(x + 25, y - 45);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 18, y - 18);
          ctx.lineTo(x + 18, y - 43);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x + 32, y - 18);
          ctx.lineTo(x + 32, y - 43);
          ctx.stroke();
            break;
        }
      }
      ctx.beginPath();
      ctx.fillText(letter, x + 25, y - 50);
    }
  }
  if (x == 950) {
    y += 100;
    x = 0
  }
  x += 50;
}
