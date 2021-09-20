const { log } = require("debug")

const mapScale = 20
const bombChance = 15 /*in Procent*/
const mapBluePrint = []
//######################
startGame()
//######################

function startGame() {
  generateMap() 
}

function generateMap() {
  for(i = 0, c =1; mapScale > i; ++i) {  //create4s mapBluePrint 
    for (j = 0; mapScale > j; ++j, ++c) {
      mapBluePrint.push({x : j, y : i, status: null, value: null, id: (c), checked: 0})
    }
  }
  const map = document.getElementById('map')
  for(i = 0; mapBluePrint.length > i; ++i) { // Apply Map
    let grid = document.createElement('div')
    grid.setAttribute('class', 'grid')
    grid.setAttribute('id', i +1 )
    grid.addEventListener("contextmenu", () => {markGrid()})
    grid.addEventListener("click", () => {destroyGrid()})
    grid.style["grid-column"] = `${mapBluePrint[i].x + 1}`
    map.appendChild(grid)
  }
}

function destroyGrid() {
  if(mapBluePrint[(parseInt(event.target.id)) - 1].status == null) { //wenn feld noch nicht validiert wurde soll die Map validiert werden
    validateMap(parseInt(event.target.id) - 1)            
  }
  genocider(mapBluePrint[(parseInt(event.target.id)) - 1])

  reviewer(parseInt(event.target.id) - 1)

}

function validateMap(clickedGrid) {
  for(i = 0; mapBluePrint.length > i; i++) {
    mapBluePrint[i].status = bombDecider()
  }
  
  //#######################################
  mapBluePrint[clickedGrid].status = false
  console.log(mapBluePrint[clickedGrid].status);
  //############################## überpüfen ob funktioniert -> funktioniert nicht
  
  for(i = 0; mapBluePrint.length > i; i++) {

    mapBluePrint[i].value = checkNeighborhood(mapBluePrint[i])
  }
  //counting 
}

function genocider(clickedGrid) {
  console.log(clickedGrid)
  if(clickedGrid.value == 0) {
    const cases = [[-1, -1], [-1 , 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    cases.forEach(casé => {
      checkX = clickedGrid.x + casé[0]
      checkY = clickedGrid.y + casé[1]
      check = mapBluePrint.filter(function (element) {
        return element.x == checkX && element.y == checkY  && element.checked < 1
      })
      if(check.length != 0){
        console.log(check)
        check[0].checked++
        document.getElementById(check[0].id).click()        
      }
    })
  }
}


function checkNeighborhood(oGrid) {
  const cases = [[-1, -1], [-1 , 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
  var bombCounter = 0
  cases.forEach(casé => {
    checkX = oGrid.x + casé[0]
    checkY = oGrid.y + casé[1]
    checkBomb = mapBluePrint.filter(function (element) {
      return element.x == checkX && element.y == checkY && element.status == true
    })
    if (checkBomb.length === 1) {
      bombCounter++
    }    
  })
  return bombCounter
}

function reviewer(ID) {
  event.target.style.background = "transparent"
  if (mapBluePrint[ID].status == true) {
      alert("you Lost")
  } else if (mapBluePrint[ID].status == false) {
      let address = document.getElementById(`${mapBluePrint[ID].id}`)
      let number = document.createElement('p')
      number.setAttribute('class', 'number')
      number.setAttribute('id', `${mapBluePrint[ID].id}Num`)
      address.appendChild(number)
      let getNumber = document.getElementById(`${mapBluePrint[ID].id}Num`)
      console.log(getNumber)
      let value = document.createTextNode(mapBluePrint[ID].value)
      
      getNumber.appendChild(value)
      
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




function markGrid() {
  event.target.style.background = "red"
}