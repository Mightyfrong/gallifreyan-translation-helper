import { doctorsCotTranslate } from './doctorsCot/main.js'
import { initIpaKeys } from './doctorsCot/setup.js'

initIpaKeys();

//Clear canvas and pass word to specific language
let x; //draw coordinate x
let y; //draw coordinate y
function translate() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  let input = document.getElementById("text").value;
  let lang = document.getElementById("language").value;
  switch (lang) {
    case "shermans":
      shermansTranslate(input);
      break;
    case "cot":
      doctorsCotTranslate(ctx, input);
      break;
    case "tardis":
      tardisTranslate(ctx, input);
      break;
    default:
      shermansTranslate(input);
  }
}

document.forms[0].onsubmit = (event) => {
  translate();
  event.preventDefault();
};