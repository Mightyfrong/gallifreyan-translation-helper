let tardisScale = 1;

var tardisLetters = {
  a : new Path2D(),
  b : new Path2D(),
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
  };

function tardisTranslate(input) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.scale(tardisScale, tardisScale);
    ctx.stroke(consonants[input]);
  }
}
