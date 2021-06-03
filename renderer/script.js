const mapScale = 4
const bombChance = 30/*%*/;
const mapBluePrint = []

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
    for(i = 0, c =1; mapScale >= i; ++i) { //generate Map
        for (j = 0; mapScale >= j; ++j, ++c) {
            mapBluePrint.push({x : j, y : i, status: bombDecider(), id: (c)})
        }
    }
    const map = document.getElementById('map')
    for(i = 0; mapBluePrint.length > i; ++i) { // Apply Map
        let grid = document.createElement('div')
        grid.setAttribute('class', 'grid')
        grid.setAttribute('id', `${mapBluePrint[i].x}` + `${mapBluePrint[i].y}`)
        /*grid.addEventListener("mouseenter", () => {
            tt()
        })*/
        grid.addEventListener("contextmenu", () => {
            markGrid()
        })
        grid.addEventListener("click", () => {
            destroyGrid()
        })

        grid.style["grid-column"] = `${mapBluePrint[i].x + 1}`
        map.appendChild(grid)
        console.log(mapBluePrint[i])

    }
}

function bombDecider() {
    let i = Math.random()
    if (i < (bombChance/100)) {
        return true
    } else {
        return false
    }
}

function tt(){
    console.log(event.target);
    event.target.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
}

function destroyGrid() {
    event.target.style.background = "transparent"
    console.log(event.target.id)
    console.log(mapBluePrint[event.target.id].status)
    reviewer(event.target.id)
}

function markGrid(event) {
    event.target.style.background = "red"
}

function reviewer(ID) {
    if (mapBluePrint[ID].status == true) {
        alert("you Lost")
    } else if (mapBluePrint[ID].status == false) {
        const x = mapBluePrint[ID].x
        const y = mapBluePrint[ID].y

        checkNeghbours(x, y)
    }
}

function checkNeghbours(x, y) {
    const cases = [[-1, -1], [-1 , 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    let bombCounter = 0
    cases.forEach(casé => {
        checkX = x + casé[0]
        checkY = y + casé[1]
        const test = mapBluePrint.fin
        (element == {x : `${checkX}`, y : `${checkY}`})
        if (mapBluePrint[checkX].status == true) {
            ++bombCounter
        }

        console.log(checkX, checkY);
    })
}