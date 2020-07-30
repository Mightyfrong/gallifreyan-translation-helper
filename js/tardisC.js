let tardisScale = 2;

var tardisLetters = {
  a : new Path2D(),
  b : new Path2D("m 0,0 a 7.8622813,7.8622813 0 0 1 -7.8622813,7.8622813 7.8622813,7.8622813 0 0 1 -7.8622812,-7.8622813 7.8622813,7.8622813 0 0 1 7.8622812,-7.8622809 7.8622813,7.8622813 0 0 1 7.8622813,7.8622809 z m 1.9118275,0 a 9.7741089,9.7741089 0 0 1 -9.7741088,9.7741089 9.7741089,9.7741089 0 0 1 -9.7741092,-9.7741089 9.7741089,9.7741089 0 0 1 9.7741092,-9.7741089 9.7741089,9.7741089 0 0 1 9.7741088,9.7741089 z"),
  c : new Path2D(),
  ch : new Path2D(),
  d : new Path2D(),
  e : new Path2D(),
  f : new Path2D(),
  g : new Path2D(),
  h : new Path2D(),
  i : new Path2D(),
  j : new Path2D(),
  k : new Path2D(),
  l : new Path2D(),
  m : new Path2D(),
  n : new Path2D(),
  o : new Path2D(),
  p : new Path2D(),
  q : new Path2D(),
  ng : new Path2D(),
  qu : new Path2D(),
  r : new Path2D(),
  s : new Path2D(),
  sh : new Path2D(),
  t : new Path2D(),
  th : new Path2D(),
  u : new Path2D(),
  v : new Path2D(),
  w : new Path2D(),
  x : new Path2D(),
  y : new Path2D(),
  z : new Path2D(),
  ß : new Path2D(),
  ph : new Path2D(),
  "" : new Path2D()
  };

function tardisTranslate(input) {
  x = 50;
  y = 100;
  input = input.toLowerCase();
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    if (window.innerWidth < (50 + input.length * 50) * tardisScale) {
      width = Math.floor(window.innerWidth / (50 * tardisScale)) * 50 * tardisScale - 50 * tardisScale;
      height = (Math.ceil(((50 + input.length * 50) * tardisScale) / window.innerWidth)) * 100 * tardisScale + 50 * tardisScale;
    }
    else {
      width = (50 + input.length * 50) * tardisScale;
      height = 150 * tardisScale;
    }
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  }
  for (var i = 0; i < input.length; i++) {
    let nextTwo = input[i] + input[i+1];
    if (nextTwo == "ch" || nextTwo == "ng" || nextTwo == "qu" || nextTwo == "sh" || nextTwo == "th" || nextTwo == "ph") {
      if (isVowel(input[i+2])) {
        tardisDraw(nextTwo, input[i+2]);
        i += 2;
      }
      else {
        tardisDraw(nextTwo, "");
        i++;
      }
    }
    else {
      if (isVowel(input[i])) {
        tardisDraw("", input[i])
      }
      else {
        if (isVowel(input[i+1])) {
          tardisDraw(input[i], input[i+1]);
          i++;
        }
        else {
          tardisDraw(input[i],"");
        }
      }
    }
  }
}

function tardisDraw(consonant, vowel) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    let m = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
    m.a = tardisScale; m.b = 0;
    m.c = 0; m.d = tardisScale;
    m.e = x * tardisScale; m.f = y * tardisScale;
    ctx.beginPath();
    p = new Path2D()
    p.addPath(tardisLetters[consonant], m);
    p.addPath(tardisLetters[vowel], m);
    ctx.stroke(p);
  }
}
