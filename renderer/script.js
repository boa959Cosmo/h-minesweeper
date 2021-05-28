const fs = require("fs");
const { Math } = require("globalthis/implementation");

document.getElementById("files").innerHTML = fs.readdirSync("./")

function test() {
  console.log("ja");
    var y = document.getElementById('map')
    var x = document.createElement('DIV')
    var textnode = document.createTextNode("Water"); 
    x.appendChild(textnode)
    x.setAttribute('id','noahlost')
    x.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    x.style.height = `${Math.random() * 20}px`
    y.appendChild(x)
    window.scrollTo(0,document.body.scrollHeight);

    setTimeout(() => {
      test()
    }, Math.random() * 50);
}
