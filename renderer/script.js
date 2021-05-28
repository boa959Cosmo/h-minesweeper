const fs = require("fs");

document.getElementById("files").innerHTML = fs.readdirSync("./")

function test() {
	console.log("ja");
	let y = document.getElementById('map')
	let x = document.createElement('DIV')
	x.setAttribute('id','noahlost')
	x.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
	x.style.height = `${Math.random() * 20}px`
	y.appendChild(x)
	window.scrollTo(0,document.body.scrollHeight)

	setTimeout(() => {
		test()
	}, Math.random() * 50);
}

function generateMap() {
    const mapScale = 4
    const mapBluePrint = []
    for(i = 0; mapScale >= i; ++i) { //generate Map
        for (j = 0; mapScale >= j; ++j) {
            mapBluePrint.push({x : j, y : i})
        }
    }
    const map = document.getElementById('map')

    for(i = 0; mapBluePrint.length >= i; ++i) { // Apply Map
        let grid = document.createElement('div')
        grid.setAttribute('class', 'grid')
        grid.setAttribute('id', `${i}`) 
        grid.style["grid-column"] = mapBluePrint[(i+1)].x
        map.appendChild(grid)
        console.log(mapBluePrint[i])

    }
}
