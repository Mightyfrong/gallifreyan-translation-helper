//Clear canvas and pass word to specific language
let x; //draw coordinate x
let y; //draw coordinate y
function translate() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  let input = document.getElementById("text").value;
  let lang = document.getElementById("language").value;
  switch (lang) {
    case "shermans":
      shermansTranslate(input);
      break;
    case "cot":

      break;
    case "tardis":
      tardisTranslate(input);
      break;
    default:
      shermansTranslate(input);
  }
}

function isVowel(input) {
  if (input == "a" || input == "e" || input == "i" || input == "o" || input == "u") {
    return true;
  }
  return false;
}

document.querySelector('#translate').onclick = translate;
