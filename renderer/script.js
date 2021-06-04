const mapScale = 10
const bombChance = 20/*%*/;
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
            mapBluePrint.push({x : j, y : i, status: bombDecider(), id: (c), checked: false})
        }
    }
    const map = document.getElementById('map')
    for(i = 0; mapBluePrint.length > i; ++i) { // Apply Map
        let grid = document.createElement('div')
        grid.setAttribute('class', 'grid')
        grid.setAttribute('id', i +1 )
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
    console.log(event.target.id)
    console.log(mapBluePrint[(parseInt(event.target.id)) - 1])
    reviewer(parseInt(event.target.id) - 1)
}

function markGrid() {
    event.target.style.background = "red"
}

function reviewer(ID) {
    event.target.style.background = "transparent"
    console.log(mapBluePrint[ID])
    if (mapBluePrint[ID].status == true) {
        alert("you Lost")
    } else if (mapBluePrint[ID].status == false) {
        const x = mapBluePrint[ID].x
        const y = mapBluePrint[ID].y
        let address = document.getElementById(`${mapBluePrint[ID].id}`)
        let value = document.createTextNode(checkNeghbours(x, y))
        address.appendChild(value)


    }
}

function checkNeghbours(x, y) {
    const cases = [[-1, -1], [-1 , 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    var bombCounter = 0
    cases.forEach(casé => {
        checkX = x + casé[0]
        checkY = y + casé[1]
        console.log(checkX, checkY);
        mapBluePrint.forEach(async grid => {
            if (grid.x == checkX && grid.y == checkY && grid.status == true) {
                ++bombCounter
            } else if (grid.x == checkX && grid.y == checkY && grid.status == false && grid.checked == false) {
                grid.checked = true
                document.getElementById(grid.id).click()
            }
        })
    })
    return bombCounter
}

function timer(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, ms);
    })
}

generateMap()