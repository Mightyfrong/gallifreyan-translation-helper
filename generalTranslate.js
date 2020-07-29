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

      break;
    default:
      shermansTranslate(input);
  }
}
