/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clickHandlerCoords": () => (/* binding */ clickHandlerCoords),
/* harmony export */   "createBoard": () => (/* binding */ createBoard),
/* harmony export */   "declareWinner": () => (/* binding */ declareWinner),
/* harmony export */   "reset": () => (/* binding */ reset),
/* harmony export */   "startGame": () => (/* binding */ startGame),
/* harmony export */   "submitHandler": () => (/* binding */ submitHandler)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");



//creating grid 10x10 with rows 1-10 and columns a-j, setting every data sett of cell to match coordinates
const createBoard = (player) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const playerBoard = document.querySelector(`.${player}` + 'board')
    letters.forEach(letter => {
        const divContainer = document.createElement('div')
        divContainer.classList.add(`column`)
        divContainer.classList.add(`${letter}`)
        for (let i = 0; i < 10; i++) {
            const div = document.createElement('div')
            div.classList.add(`${player}cell`)
            div.classList.add('cell')
            div.textContent = `${letter}${i + 1}`
            div.dataset.coordinates = `${letter}${i + 1}`
            divContainer.appendChild(div)
        }
        playerBoard.appendChild(divContainer)
    })
}

const clickHandlerCoords = (name, player, selfTurn) => {
    const allCells = document.querySelectorAll(`.${name}` + 'cell')
    allCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const hitShip = player.board.receiveAttack(cell.dataset.coordinates)
            if(hitShip){
                markHit(cell)
                if(hitShip.getSunk()){
                    if(player.board.allShipsSunked()){
                        declareWinner(name)
                    }
                }
                
            }
            else{
                markMiss(cell)
            }
            player.changeTurn()
            selfTurn.changeTurn()
            ;(0,_utilities__WEBPACK_IMPORTED_MODULE_0__.computerTurn)(player, selfTurn)
        }, {once: true})
    })
}

const submitHandler = () => {
    const ships = [
        ["submarine1", 1,],
        ["submarine2", 1,],
        ["destroyer1", 2,],
        ["destroyer2", 2,],
        ["cruiser", 3,],
        ["battleship", 4,],
        ["aircraftCarrier", 5],
    ]
    const legend = document.querySelector('.shiptype')

    legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
    const form = document.querySelector('form')
    const submitForm = (board) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            resetError()
            const coordStart = e.target[0].value.trim().toLowerCase()
            const coordEnd = e.target[1].value.trim().toLowerCase()
            const coords = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.makeCoords)(coordStart, coordEnd, ships[0][1])
            try {
                ;(0,_utilities__WEBPACK_IMPORTED_MODULE_0__.formValidation)(coordStart)
                ;(0,_utilities__WEBPACK_IMPORTED_MODULE_0__.formValidation)(coordEnd)
                markPlacedShip(coords)
                board.placeShip(ships[0][0], coords)
                ships.shift()
                if (ships.length <= 0) {
                    shipsHasBennPlaced()
                }
                else{
                    legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
                }
                
            } 
            catch (error) {
                console.log(error)
                displayError(error.message)
            }

        })
    }
    return { submitForm }
}

const displayError = error => {
    const errorDiv = document.querySelector('.error')
    errorDiv.style.display = 'block'
    errorDiv.textContent = error
}

const resetError = () => {
    const errorDiv = document.querySelector('.error')
    errorDiv.style.display = 'none'
}

const markPlacedShip = (coords) => {
    for (const coord of coords) {
        const divCoord = document.querySelector(`.playercell[data-coordinates='${coord}']`)
        divCoord.classList.add('placed')

    }
}

const shipsHasBennPlaced = () => {
    const form = document.querySelector('form')
    const startBtn = document.querySelector('.start')

    form.style.display = 'none'
    startBtn.style.display = 'block'
}

const markHit = element => {
    element.classList.add('hit')
}
const markMiss = (element) => {
    element.classList.add('miss')
}

const declareWinner = (winner) => {
    const winnerDiv = document.querySelector('.winner')
    winnerDiv.style.display = 'block'
    let winnerName;
    if(winner==='computer'){
        winnerName = 'Player1'
    }
    else{
        winnerName = 'Computer'
    }
    winnerDiv.textContent = `${winnerName}`
}

const startGame = (callback)=>{
    const start = document.querySelector('.start')

    start.addEventListener('click',()=>{
        callback()
    })
}

const reset = () => {
    const reset = document.querySelector('.reset')
    const playerboard = document.querySelector('.playerboard')
    const compboard = document.querySelector('.computerboard')
    reset.addEventListener('click',()=>{
        playerboard.innerHTML = ''
        compboard.innerHTML = ''
        ;(0,_game__WEBPACK_IMPORTED_MODULE_1__.game)()
    })
}

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");





const game = () => {

    const Player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)()
    const Computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computer)()

    ;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.createBoard)('player')
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.createBoard)('computer')

    const submit = (0,_dom__WEBPACK_IMPORTED_MODULE_1__.submitHandler)()
    submit.submitForm(Player1.board)
    Computer.placeCompShips(Computer.board)

    ;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.clickHandlerCoords)('computer', Computer, Player1)

    ;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.reset)()

    const gameLoop = () => {

        while (!Player1.board.allShipsSunked() && !Computer.board.allShipsSunked()) {
            console.log('hi')
            ;(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.computerTurn)(Computer, Player1)
        }
    }
    ;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.startGame)(gameLoop)

}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


const gameboard = () => {
  const board = [
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", "j5"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", "j6"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7", "j7"],
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8", "j8"],
    ["a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9", "j9"],
    ["a10", "b10", "c10", "d10", "e10", "f10", "g10", "h10", "i10", "j10"],
  ];
  //ships and coordinates of ships that already have been placed
  const placedShips = [];
  const getplacedShips = () => placedShips;
  // cells that have ships on them or are adjcentes to ships
  const occupiedCells = [];
  // tracking cells that been shot and were miss
  const missedShots = [];
  const getMissedShots = () => missedShots;

  const ships = [
    "submarine1",
    "submarine2",
    "destroyer1",
    "destroyer2",
    "cruiser",
    "battleship",
    "aircraftCarrier",
  ];

  //checking if coordinates are allowed and placing ships in placedShips
  const placeShip = (shipType, coords) => {
    //list of cells that laready hav ships on them

    let shipName;

    //checks if passed ship exists
    const checkExistenceOfShip = () => {
      for (const item of ships) {
        if (shipType === item) {
          shipName = shipType;
          ships.splice(ships.indexOf(item), 1);
          return true;
        }
      }
      return false;
    };

    //check if passed coord exists
    const checkCoordinates = () => {
      const regex = /^[a-j](10|[1-9])$/;
      for (const coord of coords) {
        if (!regex.test(coord)) {
          return false;
        }
        return true;
      }
    };

    //check if passed cords are allowed positionally
    const checkPlacement = () => {
      const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      let level = false;
      let vertical = false;
      if (
        coords[coords.length - 1][0] ===
        letters[letters.findIndex((letter) => letter === coords[0][0]) +
            (coords.length - 1)] &&
        coords[0][1] === coords[coords.length - 1][1]
      ) {
        level = true;
      }
      if (
        coords[0][0] === coords[coords.length - 1][0] &&
        Number(coords[coords.length - 1][1]) ===
          Number(coords[0 + (coords.length - 1)][1])
      ) {
        vertical = true;
      }
      if (vertical || level) {
        return true;
      }
      return false;
    };

    const checkIfCellOccupied = () => {
      for (const coord of coords) {
        if (occupiedCells.includes(coord)) {
          return false;
        }
      }
      return true;
    };

    // added Cell from coord and adjacent cells to occupied cells
    const addOccupiedCells = () => {
      const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
      for (let i = 0; i < coords.length; i++) {
        const coordLetter = coords[i][0];
        const coordNumber = coords[i][1];
        const IndexInLetters = letters.indexOf(coords[i][0]);
        const radius = [
          coords[i],
          `${coordLetter}${Number(coordNumber) + 1}`,
          `${coordLetter}${Number(coordNumber) - 1}`,
          `${letters[IndexInLetters - 1]}${coordNumber}`,
          `${letters[IndexInLetters + 1]}${coordNumber}`,
        ];
        if (i === 0 || i === coords.length - 1) {
          radius.push(
            `${letters[IndexInLetters - 1]}${Number(coordNumber) - 1}`
          );
          radius.push(
            `${letters[IndexInLetters + 1]}${Number(coordNumber) + 1}`
          );
          radius.push(
            `${letters[IndexInLetters - 1]}${Number(coordNumber) + 1}`
          );
          radius.push(
            `${letters[IndexInLetters + 1]}${Number(coordNumber) - 1}`
          );
        }

        return radius;
      }
    };
    //filterting occupied cells from repeting cells and cells out of bound
    const filterOccupiedCells = (radius = addOccupiedCells()) => {
      const regex = /^[a-j](10|[1-9])$/;
      for (const coord of radius) {
        if (regex.test(coord) && !occupiedCells.includes(coord)) {
          occupiedCells.push(coord);
        }
      }
    };

    //checking ships and cords agains all dependecies

    if (!checkCoordinates()) {
      throw new Error("Coordinates out of range of the board or not exists");
    }
    if (!checkPlacement()) {
      throw new Error("Position of ship is not allowed");
    }
    if (!checkIfCellOccupied()) {
      throw new Error(
        "You cannot place ship in one ofalready occupied or adjecntes cells"
      );
    }
    if (!checkExistenceOfShip()) {
      throw new Error("Ship already been placed or not exists");
    }

    //filterting occupied cells from repeting cells and cells out of bound
    filterOccupiedCells();

    //create new ship and passed correct cords
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(coords.length);
    newShip.setCoordinates(coords);
    placedShips.push({ [`${shipName}`]: newShip });
  };

  // takes coord that was shot, checks if ship was hit and tracks it, if miss pushes coord to missed shots array
  const receiveAttack = (attackCoord) => {
    for (let i = 0; i < placedShips.length; i++) {
     
      const shipCoords = Object.values(placedShips[i])[0].coordinates;
      for (const shipCoord of shipCoords) {
        if (shipCoord === attackCoord) {
          const hitShip = Object.values(placedShips[i])[0];
          hitShip.hit();
          return hitShip;
        }
      }
    }
    missedShots.push(attackCoord);
    return false;
  };

  // checks if all ships have been sunk
  const allShipsSunked = () => {
    for (let i = 0; i < placedShips.length; i++) {
      const inspectedShip = Object.values(placedShips[i])[0];
      if (inspectedShip.getSunk() === false) {
        return false;
      }
    }
    return true;
  };

  return {
    board,
    placeShip,
    getplacedShips,
    getMissedShots,
    receiveAttack,
    allShipsSunked,
    placedShips,
  };
};


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


const player = () => {
    //tracking turn and changes turn
    let turn = false;
    const changeTurn = () => (turn = !turn);
    const getTurn = () => turn;

    //creates player gameboard
    const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)();

    //takes enemy board and coord that is shoot target and return false when miss or hitted Ship when hit
    const shoot = (enemyBoard, coord) => enemyBoard.receiveAttack(coord);
    return { turn, changeTurn, board, shoot, getTurn };
};

const computer = () => {
    //takes inharitance from player factory function
    const prototype = player();

    const avaliableCoordToTarget = [
        "a1",
        "b1",
        "c1",
        "d1",
        "e1",
        "f1",
        "g1",
        "h1",
        "i1",
        "j1",
        "a2",
        "b2",
        "c2",
        "d2",
        "e2",
        "f2",
        "g2",
        "h2",
        "i2",
        "j2",
        "a3",
        "b3",
        "c3",
        "d3",
        "e3",
        "f3",
        "g3",
        "h3",
        "i3",
        "j3",
        "a4",
        "b4",
        "c4",
        "d4",
        "e4",
        "f4",
        "g4",
        "h4",
        "i4",
        "j4",
        "a5",
        "b5",
        "c5",
        "d5",
        "e5",
        "f5",
        "g5",
        "h5",
        "i5",
        "j5",
        "a6",
        "b6",
        "c6",
        "d6",
        "e6",
        "f6",
        "g6",
        "h6",
        "i6",
        "j6",
        "a7",
        "b7",
        "c7",
        "d7",
        "e7",
        "f7",
        "g7",
        "h7",
        "i7",
        "j7",
        "a8",
        "b8",
        "c8",
        "d8",
        "e8",
        "f8",
        "g8",
        "h8",
        "i8",
        "j8",
        "a9",
        "b9",
        "c9",
        "d9",
        "e9",
        "f9",
        "g9",
        "h9",
        "i9",
        "j9",
        "a10",
        "b10",
        "c10",
        "d10",
        "e10",
        "f10",
        "g10",
        "h10",
        "i10",
        "j10",
    ];

    // returning random index from avaliableCoordToTarget
    const chooseTarget = () => {
        return Math.floor(Math.random() * avaliableCoordToTarget.length);
    };

    //takes shot at enemy board with coord from chooseTarget() and removes that coord from availiable coords
    const shootComp = (enemyBoard, coord = chooseTarget()) => {
        const hitShip =  enemyBoard.receiveAttack(avaliableCoordToTarget[coord]);
        const hitCoord = avaliableCoordToTarget[coord]
        console.log(avaliableCoordToTarget[coord])
        avaliableCoordToTarget.splice(coord, 1);
        
        return [hitShip, hitCoord]
    };


    const placeCompShips = (board) => {
        const num = Math.floor(Math.random() * 3)
        const ships = [{
            submarine1: ["a1"],
            submarine2: ["a3"],
            destroyer1: ['d3', 'd4'],
            destroyer2: ['h9', 'i9'],
            cruiser: ['b10', 'c10', 'd10'],
            battleship: ['i1', 'i2', 'i3', 'i4'],
            aircraftCarrier: ['e7', 'f7', 'g7', 'h7', 'i7'],
        }, {
            submarine1: ["d1"],
            submarine2: ["g9"],
            destroyer1: ['j4', 'j5'],
            destroyer2: ['d10', 'e10'],
            cruiser: ['i8', 'i9', 'i10'],
            battleship: ['b4', 'c4', 'd4', 'e4'],
            aircraftCarrier: ['a6', 'a7', 'a8', 'a9', 'a10'],
        }, {
            submarine1: ["g5"],
            submarine2: ["i9"],
            destroyer1: ['i2', 'j2'],
            destroyer2: ['c1', 'c2'],
            cruiser: ['a7', 'b7', 'c7'],
            battleship: ['e7', 'e8', 'e9', 'e10'],
            aircraftCarrier: ['a4', 'b4', 'c4', 'd4', 'e4'],
        }];

        for(const [ship ,coords] of Object.entries(ships[num])){
           board.placeShip(ship, coords)
        }
    }

    //returns object with all methods and properites inherteted from player
    return Object.assign({}, prototype, {
        avaliableCoordToTarget,
        chooseTarget,
        shootComp,
        placeCompShips,
    });
};


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
//factory function that creates all type of ships and attribut method to them

const ship = (shipLength) => {
  const length = () => shipLength;

  // status of ship
  let sunk = false;
  const getSunk = () => sunk;

  //tracking number of hits to the ship
  let hitNumber = 0;
  //return number of hits
  const getHits = () => hitNumber;

  const hit = () => {
    hitNumber++;
    if (hitNumber >= length()) {
      sunk = true;
    }}

    const coordinates = [];
    const setCoordinates = (coords) => {
      if(coords.length !== length()){
        throw new Error('number of coordinates have to be equal to length of the ship')
      }
      try{
        coords.forEach((item) => {
          coordinates.push(item);
        });
      }catch(error){
        console.log(error)
      }

    };
    const getCoordinates = () => coordinates;
  

  return { length, getSunk, getHits, hit, setCoordinates, getCoordinates,coordinates};
};


/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computerTurn": () => (/* binding */ computerTurn),
/* harmony export */   "formValidation": () => (/* binding */ formValidation),
/* harmony export */   "makeCoords": () => (/* binding */ makeCoords)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
//given starting end ending coords, based of vertical/level making array that 

const makeCoords = (startCoord, endCoord, lengthy) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const coords = []
    if (lengthy === 1) {
        coords.push(startCoord)
        return coords;
    }
    for (let i = 0; i < lengthy; i++) {
        if (startCoord[0] === endCoord[0]) {
            coords.push(`${startCoord[0]}${Number(startCoord[1]) + i}`)
        }
        else if (startCoord[1] === endCoord[1]) {
            coords.push(`${letters[letters.findIndex(letter => letter === startCoord[0]) + i]}${endCoord[1]}`)
        }
    }
    return coords;
}

const formValidation = (value) => {
    if (value.length <= 0) {
        throw new Error('Coordinates need to be 2 or 3 characters long')
    }

}

const computerTurn = (computer, enemy) => {
    if (computer.getTurn()) {
        const hitShip = computer.shootComp(enemy.board)
        const coord = hitShip[1]
        const divCoord = document.querySelector(`.playercell[data-coordinates='${coord}']`)
        if (hitShip[0]) {
            divCoord.classList.add('hit')
            if (hitShip.getSunk()) {
                if (enemy.board.allShipsSunked()) {
                    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.declareWinner)('player')
                }
            }
        }
        else {
            divCoord.classList.add('miss')
            computer.changeTurn()
            enemy.changeTurn()
        }
      
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");



(0,_game__WEBPACK_IMPORTED_MODULE_0__.game)()


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTXdDO0FBQ3hDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscURBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDbkxBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ3NDO0FBQy9CO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQSwyQkFBMkIsY0FBYyxFQUFFLDBCQUEwQjtBQUNyRTtBQUNBO0FBQ0EsMkJBQTJCLG1FQUFtRSxFQUFFLFlBQVk7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYsTUFBTTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUMvQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QjtBQUM5QjtBQUNBO0FBQ0EsMkNBQUk7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYWtlQ29vcmRzLCBmb3JtVmFsaWRhdGlvbiwgY29tcHV0ZXJUdXJuIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XHJcbmltcG9ydCB7IGdhbWUsIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxuLy9jcmVhdGluZyBncmlkIDEweDEwIHdpdGggcm93cyAxLTEwIGFuZCBjb2x1bW5zIGEtaiwgc2V0dGluZyBldmVyeSBkYXRhIHNldHQgb2YgY2VsbCB0byBtYXRjaCBjb29yZGluYXRlc1xyXG5leHBvcnQgY29uc3QgY3JlYXRlQm9hcmQgPSAocGxheWVyKSA9PiB7XHJcbiAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7cGxheWVyfWAgKyAnYm9hcmQnKVxyXG4gICAgbGV0dGVycy5mb3JFYWNoKGxldHRlciA9PiB7XHJcbiAgICAgICAgY29uc3QgZGl2Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBkaXZDb250YWluZXIuY2xhc3NMaXN0LmFkZChgY29sdW1uYClcclxuICAgICAgICBkaXZDb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtsZXR0ZXJ9YClcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoYCR7cGxheWVyfWNlbGxgKVxyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2VsbCcpXHJcbiAgICAgICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGAke2xldHRlcn0ke2kgKyAxfWBcclxuICAgICAgICAgICAgZGl2LmRhdGFzZXQuY29vcmRpbmF0ZXMgPSBgJHtsZXR0ZXJ9JHtpICsgMX1gXHJcbiAgICAgICAgICAgIGRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKGRpdkNvbnRhaW5lcilcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbGlja0hhbmRsZXJDb29yZHMgPSAobmFtZSwgcGxheWVyLCBzZWxmVHVybikgPT4ge1xyXG4gICAgY29uc3QgYWxsQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtuYW1lfWAgKyAnY2VsbCcpXHJcbiAgICBhbGxDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xyXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpdFNoaXAgPSBwbGF5ZXIuYm9hcmQucmVjZWl2ZUF0dGFjayhjZWxsLmRhdGFzZXQuY29vcmRpbmF0ZXMpXHJcbiAgICAgICAgICAgIGlmKGhpdFNoaXApe1xyXG4gICAgICAgICAgICAgICAgbWFya0hpdChjZWxsKVxyXG4gICAgICAgICAgICAgICAgaWYoaGl0U2hpcC5nZXRTdW5rKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5hbGxTaGlwc1N1bmtlZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjbGFyZVdpbm5lcihuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBtYXJrTWlzcyhjZWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYXllci5jaGFuZ2VUdXJuKClcclxuICAgICAgICAgICAgc2VsZlR1cm4uY2hhbmdlVHVybigpXHJcbiAgICAgICAgICAgIGNvbXB1dGVyVHVybihwbGF5ZXIsIHNlbGZUdXJuKVxyXG4gICAgICAgIH0sIHtvbmNlOiB0cnVlfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdWJtaXRIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc2hpcHMgPSBbXHJcbiAgICAgICAgW1wic3VibWFyaW5lMVwiLCAxLF0sXHJcbiAgICAgICAgW1wic3VibWFyaW5lMlwiLCAxLF0sXHJcbiAgICAgICAgW1wiZGVzdHJveWVyMVwiLCAyLF0sXHJcbiAgICAgICAgW1wiZGVzdHJveWVyMlwiLCAyLF0sXHJcbiAgICAgICAgW1wiY3J1aXNlclwiLCAzLF0sXHJcbiAgICAgICAgW1wiYmF0dGxlc2hpcFwiLCA0LF0sXHJcbiAgICAgICAgW1wiYWlyY3JhZnRDYXJyaWVyXCIsIDVdLFxyXG4gICAgXVxyXG4gICAgY29uc3QgbGVnZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoaXB0eXBlJylcclxuXHJcbiAgICBsZWdlbmQudGV4dENvbnRlbnQgPSBgJHtzaGlwc1swXVswXX0gd2l0aCBsZW5ndGggb2YgJHtzaGlwc1swXVsxXX1gXHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpXHJcbiAgICBjb25zdCBzdWJtaXRGb3JtID0gKGJvYXJkKSA9PiB7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgcmVzZXRFcnJvcigpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkU3RhcnQgPSBlLnRhcmdldFswXS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICBjb25zdCBjb29yZEVuZCA9IGUudGFyZ2V0WzFdLnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkcyA9IG1ha2VDb29yZHMoY29vcmRTdGFydCwgY29vcmRFbmQsIHNoaXBzWzBdWzFdKVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVZhbGlkYXRpb24oY29vcmRTdGFydClcclxuICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0aW9uKGNvb3JkRW5kKVxyXG4gICAgICAgICAgICAgICAgbWFya1BsYWNlZFNoaXAoY29vcmRzKVxyXG4gICAgICAgICAgICAgICAgYm9hcmQucGxhY2VTaGlwKHNoaXBzWzBdWzBdLCBjb29yZHMpXHJcbiAgICAgICAgICAgICAgICBzaGlwcy5zaGlmdCgpXHJcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGlwc0hhc0Jlbm5QbGFjZWQoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZWdlbmQudGV4dENvbnRlbnQgPSBgJHtzaGlwc1swXVswXX0gd2l0aCBsZW5ndGggb2YgJHtzaGlwc1swXVsxXX1gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlFcnJvcihlcnJvci5tZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBzdWJtaXRGb3JtIH1cclxufVxyXG5cclxuY29uc3QgZGlzcGxheUVycm9yID0gZXJyb3IgPT4ge1xyXG4gICAgY29uc3QgZXJyb3JEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3InKVxyXG4gICAgZXJyb3JEaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgIGVycm9yRGl2LnRleHRDb250ZW50ID0gZXJyb3JcclxufVxyXG5cclxuY29uc3QgcmVzZXRFcnJvciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJylcclxuICAgIGVycm9yRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxufVxyXG5cclxuY29uc3QgbWFya1BsYWNlZFNoaXAgPSAoY29vcmRzKSA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIGNvb3Jkcykge1xyXG4gICAgICAgIGNvbnN0IGRpdkNvb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcmNlbGxbZGF0YS1jb29yZGluYXRlcz0nJHtjb29yZH0nXWApXHJcbiAgICAgICAgZGl2Q29vcmQuY2xhc3NMaXN0LmFkZCgncGxhY2VkJylcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNoaXBzSGFzQmVublBsYWNlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJylcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0JylcclxuXHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgIHN0YXJ0QnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbn1cclxuXHJcbmNvbnN0IG1hcmtIaXQgPSBlbGVtZW50ID0+IHtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGl0JylcclxufVxyXG5jb25zdCBtYXJrTWlzcyA9IChlbGVtZW50KSA9PiB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVjbGFyZVdpbm5lciA9ICh3aW5uZXIpID0+IHtcclxuICAgIGNvbnN0IHdpbm5lckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXInKVxyXG4gICAgd2lubmVyRGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBsZXQgd2lubmVyTmFtZTtcclxuICAgIGlmKHdpbm5lcj09PSdjb21wdXRlcicpe1xyXG4gICAgICAgIHdpbm5lck5hbWUgPSAnUGxheWVyMSdcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgd2lubmVyTmFtZSA9ICdDb21wdXRlcidcclxuICAgIH1cclxuICAgIHdpbm5lckRpdi50ZXh0Q29udGVudCA9IGAke3dpbm5lck5hbWV9YFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3RhcnRHYW1lID0gKGNhbGxiYWNrKT0+e1xyXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKVxyXG5cclxuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xyXG4gICAgICAgIGNhbGxiYWNrKClcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNldCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc2V0JylcclxuICAgIGNvbnN0IHBsYXllcmJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcmJvYXJkJylcclxuICAgIGNvbnN0IGNvbXBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlcmJvYXJkJylcclxuICAgIHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xyXG4gICAgICAgIHBsYXllcmJvYXJkLmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgY29tcGJvYXJkLmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgZ2FtZSgpXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVCb2FyZCwgY2xpY2tIYW5kbGVyQ29vcmRzLCBzdWJtaXRIYW5kbGVyLCBzdGFydEdhbWUsIHJlc2V0IH0gZnJvbSBcIi4vZG9tXCI7XHJcbmltcG9ydCB7IGNvbXB1dGVyVHVybiB9IGZyb20gXCIuL3V0aWxpdGllc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IFBsYXllcjEgPSBwbGF5ZXIoKVxyXG4gICAgY29uc3QgQ29tcHV0ZXIgPSBjb21wdXRlcigpXHJcblxyXG4gICAgY3JlYXRlQm9hcmQoJ3BsYXllcicpXHJcbiAgICBjcmVhdGVCb2FyZCgnY29tcHV0ZXInKVxyXG5cclxuICAgIGNvbnN0IHN1Ym1pdCA9IHN1Ym1pdEhhbmRsZXIoKVxyXG4gICAgc3VibWl0LnN1Ym1pdEZvcm0oUGxheWVyMS5ib2FyZClcclxuICAgIENvbXB1dGVyLnBsYWNlQ29tcFNoaXBzKENvbXB1dGVyLmJvYXJkKVxyXG5cclxuICAgIGNsaWNrSGFuZGxlckNvb3JkcygnY29tcHV0ZXInLCBDb21wdXRlciwgUGxheWVyMSlcclxuXHJcbiAgICByZXNldCgpXHJcblxyXG4gICAgY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHdoaWxlICghUGxheWVyMS5ib2FyZC5hbGxTaGlwc1N1bmtlZCgpICYmICFDb21wdXRlci5ib2FyZC5hbGxTaGlwc1N1bmtlZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaScpXHJcbiAgICAgICAgICAgIGNvbXB1dGVyVHVybihDb21wdXRlciwgUGxheWVyMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydEdhbWUoZ2FtZUxvb3ApXHJcblxyXG59IiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgYm9hcmQgPSBbXHJcbiAgICBbXCJhMVwiLCBcImIxXCIsIFwiYzFcIiwgXCJkMVwiLCBcImUxXCIsIFwiZjFcIiwgXCJnMVwiLCBcImgxXCIsIFwiaTFcIiwgXCJqMVwiXSxcclxuICAgIFtcImEyXCIsIFwiYjJcIiwgXCJjMlwiLCBcImQyXCIsIFwiZTJcIiwgXCJmMlwiLCBcImcyXCIsIFwiaDJcIiwgXCJpMlwiLCBcImoyXCJdLFxyXG4gICAgW1wiYTNcIiwgXCJiM1wiLCBcImMzXCIsIFwiZDNcIiwgXCJlM1wiLCBcImYzXCIsIFwiZzNcIiwgXCJoM1wiLCBcImkzXCIsIFwiajNcIl0sXHJcbiAgICBbXCJhNFwiLCBcImI0XCIsIFwiYzRcIiwgXCJkNFwiLCBcImU0XCIsIFwiZjRcIiwgXCJnNFwiLCBcImg0XCIsIFwiaTRcIiwgXCJqNFwiXSxcclxuICAgIFtcImE1XCIsIFwiYjVcIiwgXCJjNVwiLCBcImQ1XCIsIFwiZTVcIiwgXCJmNVwiLCBcImc1XCIsIFwiaDVcIiwgXCJpNVwiLCBcImo1XCJdLFxyXG4gICAgW1wiYTZcIiwgXCJiNlwiLCBcImM2XCIsIFwiZDZcIiwgXCJlNlwiLCBcImY2XCIsIFwiZzZcIiwgXCJoNlwiLCBcImk2XCIsIFwiajZcIl0sXHJcbiAgICBbXCJhN1wiLCBcImI3XCIsIFwiYzdcIiwgXCJkN1wiLCBcImU3XCIsIFwiZjdcIiwgXCJnN1wiLCBcImg3XCIsIFwiaTdcIiwgXCJqN1wiXSxcclxuICAgIFtcImE4XCIsIFwiYjhcIiwgXCJjOFwiLCBcImQ4XCIsIFwiZThcIiwgXCJmOFwiLCBcImc4XCIsIFwiaDhcIiwgXCJpOFwiLCBcImo4XCJdLFxyXG4gICAgW1wiYTlcIiwgXCJiOVwiLCBcImM5XCIsIFwiZDlcIiwgXCJlOVwiLCBcImY5XCIsIFwiZzlcIiwgXCJoOVwiLCBcImk5XCIsIFwiajlcIl0sXHJcbiAgICBbXCJhMTBcIiwgXCJiMTBcIiwgXCJjMTBcIiwgXCJkMTBcIiwgXCJlMTBcIiwgXCJmMTBcIiwgXCJnMTBcIiwgXCJoMTBcIiwgXCJpMTBcIiwgXCJqMTBcIl0sXHJcbiAgXTtcclxuICAvL3NoaXBzIGFuZCBjb29yZGluYXRlcyBvZiBzaGlwcyB0aGF0IGFscmVhZHkgaGF2ZSBiZWVuIHBsYWNlZFxyXG4gIGNvbnN0IHBsYWNlZFNoaXBzID0gW107XHJcbiAgY29uc3QgZ2V0cGxhY2VkU2hpcHMgPSAoKSA9PiBwbGFjZWRTaGlwcztcclxuICAvLyBjZWxscyB0aGF0IGhhdmUgc2hpcHMgb24gdGhlbSBvciBhcmUgYWRqY2VudGVzIHRvIHNoaXBzXHJcbiAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xyXG4gIC8vIHRyYWNraW5nIGNlbGxzIHRoYXQgYmVlbiBzaG90IGFuZCB3ZXJlIG1pc3NcclxuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xyXG4gIGNvbnN0IGdldE1pc3NlZFNob3RzID0gKCkgPT4gbWlzc2VkU2hvdHM7XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgXCJzdWJtYXJpbmUxXCIsXHJcbiAgICBcInN1Ym1hcmluZTJcIixcclxuICAgIFwiZGVzdHJveWVyMVwiLFxyXG4gICAgXCJkZXN0cm95ZXIyXCIsXHJcbiAgICBcImNydWlzZXJcIixcclxuICAgIFwiYmF0dGxlc2hpcFwiLFxyXG4gICAgXCJhaXJjcmFmdENhcnJpZXJcIixcclxuICBdO1xyXG5cclxuICAvL2NoZWNraW5nIGlmIGNvb3JkaW5hdGVzIGFyZSBhbGxvd2VkIGFuZCBwbGFjaW5nIHNoaXBzIGluIHBsYWNlZFNoaXBzXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBUeXBlLCBjb29yZHMpID0+IHtcclxuICAgIC8vbGlzdCBvZiBjZWxscyB0aGF0IGxhcmVhZHkgaGF2IHNoaXBzIG9uIHRoZW1cclxuXHJcbiAgICBsZXQgc2hpcE5hbWU7XHJcblxyXG4gICAgLy9jaGVja3MgaWYgcGFzc2VkIHNoaXAgZXhpc3RzXHJcbiAgICBjb25zdCBjaGVja0V4aXN0ZW5jZU9mU2hpcCA9ICgpID0+IHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHNoaXBzKSB7XHJcbiAgICAgICAgaWYgKHNoaXBUeXBlID09PSBpdGVtKSB7XHJcbiAgICAgICAgICBzaGlwTmFtZSA9IHNoaXBUeXBlO1xyXG4gICAgICAgICAgc2hpcHMuc3BsaWNlKHNoaXBzLmluZGV4T2YoaXRlbSksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVjayBpZiBwYXNzZWQgY29vcmQgZXhpc3RzXHJcbiAgICBjb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByZWdleCA9IC9eW2Etal0oMTB8WzEtOV0pJC87XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKCFyZWdleC50ZXN0KGNvb3JkKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIHBhc3NlZCBjb3JkcyBhcmUgYWxsb3dlZCBwb3NpdGlvbmFsbHlcclxuICAgIGNvbnN0IGNoZWNrUGxhY2VtZW50ID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgICAgbGV0IGxldmVsID0gZmFsc2U7XHJcbiAgICAgIGxldCB2ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVswXSA9PT1cclxuICAgICAgICBsZXR0ZXJzW2xldHRlcnMuZmluZEluZGV4KChsZXR0ZXIpID0+IGxldHRlciA9PT0gY29vcmRzWzBdWzBdKSArXHJcbiAgICAgICAgICAgIChjb29yZHMubGVuZ3RoIC0gMSldICYmXHJcbiAgICAgICAgY29vcmRzWzBdWzFdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxldmVsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29vcmRzWzBdWzBdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzBdICYmXHJcbiAgICAgICAgTnVtYmVyKGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMV0pID09PVxyXG4gICAgICAgICAgTnVtYmVyKGNvb3Jkc1swICsgKGNvb3Jkcy5sZW5ndGggLSAxKV1bMV0pXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmVydGljYWwgfHwgbGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNoZWNrSWZDZWxsT2NjdXBpZWQgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGRlZCBDZWxsIGZyb20gY29vcmQgYW5kIGFkamFjZW50IGNlbGxzIHRvIG9jY3VwaWVkIGNlbGxzXHJcbiAgICBjb25zdCBhZGRPY2N1cGllZENlbGxzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjb29yZExldHRlciA9IGNvb3Jkc1tpXVswXTtcclxuICAgICAgICBjb25zdCBjb29yZE51bWJlciA9IGNvb3Jkc1tpXVsxXTtcclxuICAgICAgICBjb25zdCBJbmRleEluTGV0dGVycyA9IGxldHRlcnMuaW5kZXhPZihjb29yZHNbaV1bMF0pO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IFtcclxuICAgICAgICAgIGNvb3Jkc1tpXSxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YCxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YCxcclxuICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke2Nvb3JkTnVtYmVyfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gY29vcmRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgKyAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vZmlsdGVydGluZyBvY2N1cGllZCBjZWxscyBmcm9tIHJlcGV0aW5nIGNlbGxzIGFuZCBjZWxscyBvdXQgb2YgYm91bmRcclxuICAgIGNvbnN0IGZpbHRlck9jY3VwaWVkQ2VsbHMgPSAocmFkaXVzID0gYWRkT2NjdXBpZWRDZWxscygpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL15bYS1qXSgxMHxbMS05XSkkLztcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiByYWRpdXMpIHtcclxuICAgICAgICBpZiAocmVnZXgudGVzdChjb29yZCkgJiYgIW9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goY29vcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNraW5nIHNoaXBzIGFuZCBjb3JkcyBhZ2FpbnMgYWxsIGRlcGVuZGVjaWVzXHJcblxyXG4gICAgaWYgKCFjaGVja0Nvb3JkaW5hdGVzKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgb3V0IG9mIHJhbmdlIG9mIHRoZSBib2FyZCBvciBub3QgZXhpc3RzXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja1BsYWNlbWVudCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG9mIHNoaXAgaXMgbm90IGFsbG93ZWRcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNoZWNrSWZDZWxsT2NjdXBpZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgXCJZb3UgY2Fubm90IHBsYWNlIHNoaXAgaW4gb25lIG9mYWxyZWFkeSBvY2N1cGllZCBvciBhZGplY250ZXMgY2VsbHNcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja0V4aXN0ZW5jZU9mU2hpcCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgYWxyZWFkeSBiZWVuIHBsYWNlZCBvciBub3QgZXhpc3RzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZmlsdGVydGluZyBvY2N1cGllZCBjZWxscyBmcm9tIHJlcGV0aW5nIGNlbGxzIGFuZCBjZWxscyBvdXQgb2YgYm91bmRcclxuICAgIGZpbHRlck9jY3VwaWVkQ2VsbHMoKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBuZXcgc2hpcCBhbmQgcGFzc2VkIGNvcnJlY3QgY29yZHNcclxuICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwKGNvb3Jkcy5sZW5ndGgpO1xyXG4gICAgbmV3U2hpcC5zZXRDb29yZGluYXRlcyhjb29yZHMpO1xyXG4gICAgcGxhY2VkU2hpcHMucHVzaCh7IFtgJHtzaGlwTmFtZX1gXTogbmV3U2hpcCB9KTtcclxuICB9O1xyXG5cclxuICAvLyB0YWtlcyBjb29yZCB0aGF0IHdhcyBzaG90LCBjaGVja3MgaWYgc2hpcCB3YXMgaGl0IGFuZCB0cmFja3MgaXQsIGlmIG1pc3MgcHVzaGVzIGNvb3JkIHRvIG1pc3NlZCBzaG90cyBhcnJheVxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrQ29vcmQpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VkU2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICBcclxuICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IE9iamVjdC52YWx1ZXMocGxhY2VkU2hpcHNbaV0pWzBdLmNvb3JkaW5hdGVzO1xyXG4gICAgICBmb3IgKGNvbnN0IHNoaXBDb29yZCBvZiBzaGlwQ29vcmRzKSB7XHJcbiAgICAgICAgaWYgKHNoaXBDb29yZCA9PT0gYXR0YWNrQ29vcmQpIHtcclxuICAgICAgICAgIGNvbnN0IGhpdFNoaXAgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXTtcclxuICAgICAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgICAgICByZXR1cm4gaGl0U2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG1pc3NlZFNob3RzLnB1c2goYXR0YWNrQ29vcmQpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIC8vIGNoZWNrcyBpZiBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICBjb25zdCBhbGxTaGlwc1N1bmtlZCA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VkU2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5zcGVjdGVkU2hpcCA9IE9iamVjdC52YWx1ZXMocGxhY2VkU2hpcHNbaV0pWzBdO1xyXG4gICAgICBpZiAoaW5zcGVjdGVkU2hpcC5nZXRTdW5rKCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYm9hcmQsXHJcbiAgICBwbGFjZVNoaXAsXHJcbiAgICBnZXRwbGFjZWRTaGlwcyxcclxuICAgIGdldE1pc3NlZFNob3RzLFxyXG4gICAgcmVjZWl2ZUF0dGFjayxcclxuICAgIGFsbFNoaXBzU3Vua2VkLFxyXG4gICAgcGxhY2VkU2hpcHMsXHJcbiAgfTtcclxufTtcclxuIiwiaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5leHBvcnQgY29uc3QgcGxheWVyID0gKCkgPT4ge1xyXG4gICAgLy90cmFja2luZyB0dXJuIGFuZCBjaGFuZ2VzIHR1cm5cclxuICAgIGxldCB0dXJuID0gZmFsc2U7XHJcbiAgICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4gKHR1cm4gPSAhdHVybik7XHJcbiAgICBjb25zdCBnZXRUdXJuID0gKCkgPT4gdHVybjtcclxuXHJcbiAgICAvL2NyZWF0ZXMgcGxheWVyIGdhbWVib2FyZFxyXG4gICAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxuXHJcbiAgICAvL3Rha2VzIGVuZW15IGJvYXJkIGFuZCBjb29yZCB0aGF0IGlzIHNob290IHRhcmdldCBhbmQgcmV0dXJuIGZhbHNlIHdoZW4gbWlzcyBvciBoaXR0ZWQgU2hpcCB3aGVuIGhpdFxyXG4gICAgY29uc3Qgc2hvb3QgPSAoZW5lbXlCb2FyZCwgY29vcmQpID0+IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZCk7XHJcbiAgICByZXR1cm4geyB0dXJuLCBjaGFuZ2VUdXJuLCBib2FyZCwgc2hvb3QsIGdldFR1cm4gfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlciA9ICgpID0+IHtcclxuICAgIC8vdGFrZXMgaW5oYXJpdGFuY2UgZnJvbSBwbGF5ZXIgZmFjdG9yeSBmdW5jdGlvblxyXG4gICAgY29uc3QgcHJvdG90eXBlID0gcGxheWVyKCk7XHJcblxyXG4gICAgY29uc3QgYXZhbGlhYmxlQ29vcmRUb1RhcmdldCA9IFtcclxuICAgICAgICBcImExXCIsXHJcbiAgICAgICAgXCJiMVwiLFxyXG4gICAgICAgIFwiYzFcIixcclxuICAgICAgICBcImQxXCIsXHJcbiAgICAgICAgXCJlMVwiLFxyXG4gICAgICAgIFwiZjFcIixcclxuICAgICAgICBcImcxXCIsXHJcbiAgICAgICAgXCJoMVwiLFxyXG4gICAgICAgIFwiaTFcIixcclxuICAgICAgICBcImoxXCIsXHJcbiAgICAgICAgXCJhMlwiLFxyXG4gICAgICAgIFwiYjJcIixcclxuICAgICAgICBcImMyXCIsXHJcbiAgICAgICAgXCJkMlwiLFxyXG4gICAgICAgIFwiZTJcIixcclxuICAgICAgICBcImYyXCIsXHJcbiAgICAgICAgXCJnMlwiLFxyXG4gICAgICAgIFwiaDJcIixcclxuICAgICAgICBcImkyXCIsXHJcbiAgICAgICAgXCJqMlwiLFxyXG4gICAgICAgIFwiYTNcIixcclxuICAgICAgICBcImIzXCIsXHJcbiAgICAgICAgXCJjM1wiLFxyXG4gICAgICAgIFwiZDNcIixcclxuICAgICAgICBcImUzXCIsXHJcbiAgICAgICAgXCJmM1wiLFxyXG4gICAgICAgIFwiZzNcIixcclxuICAgICAgICBcImgzXCIsXHJcbiAgICAgICAgXCJpM1wiLFxyXG4gICAgICAgIFwiajNcIixcclxuICAgICAgICBcImE0XCIsXHJcbiAgICAgICAgXCJiNFwiLFxyXG4gICAgICAgIFwiYzRcIixcclxuICAgICAgICBcImQ0XCIsXHJcbiAgICAgICAgXCJlNFwiLFxyXG4gICAgICAgIFwiZjRcIixcclxuICAgICAgICBcImc0XCIsXHJcbiAgICAgICAgXCJoNFwiLFxyXG4gICAgICAgIFwiaTRcIixcclxuICAgICAgICBcImo0XCIsXHJcbiAgICAgICAgXCJhNVwiLFxyXG4gICAgICAgIFwiYjVcIixcclxuICAgICAgICBcImM1XCIsXHJcbiAgICAgICAgXCJkNVwiLFxyXG4gICAgICAgIFwiZTVcIixcclxuICAgICAgICBcImY1XCIsXHJcbiAgICAgICAgXCJnNVwiLFxyXG4gICAgICAgIFwiaDVcIixcclxuICAgICAgICBcImk1XCIsXHJcbiAgICAgICAgXCJqNVwiLFxyXG4gICAgICAgIFwiYTZcIixcclxuICAgICAgICBcImI2XCIsXHJcbiAgICAgICAgXCJjNlwiLFxyXG4gICAgICAgIFwiZDZcIixcclxuICAgICAgICBcImU2XCIsXHJcbiAgICAgICAgXCJmNlwiLFxyXG4gICAgICAgIFwiZzZcIixcclxuICAgICAgICBcImg2XCIsXHJcbiAgICAgICAgXCJpNlwiLFxyXG4gICAgICAgIFwiajZcIixcclxuICAgICAgICBcImE3XCIsXHJcbiAgICAgICAgXCJiN1wiLFxyXG4gICAgICAgIFwiYzdcIixcclxuICAgICAgICBcImQ3XCIsXHJcbiAgICAgICAgXCJlN1wiLFxyXG4gICAgICAgIFwiZjdcIixcclxuICAgICAgICBcImc3XCIsXHJcbiAgICAgICAgXCJoN1wiLFxyXG4gICAgICAgIFwiaTdcIixcclxuICAgICAgICBcImo3XCIsXHJcbiAgICAgICAgXCJhOFwiLFxyXG4gICAgICAgIFwiYjhcIixcclxuICAgICAgICBcImM4XCIsXHJcbiAgICAgICAgXCJkOFwiLFxyXG4gICAgICAgIFwiZThcIixcclxuICAgICAgICBcImY4XCIsXHJcbiAgICAgICAgXCJnOFwiLFxyXG4gICAgICAgIFwiaDhcIixcclxuICAgICAgICBcImk4XCIsXHJcbiAgICAgICAgXCJqOFwiLFxyXG4gICAgICAgIFwiYTlcIixcclxuICAgICAgICBcImI5XCIsXHJcbiAgICAgICAgXCJjOVwiLFxyXG4gICAgICAgIFwiZDlcIixcclxuICAgICAgICBcImU5XCIsXHJcbiAgICAgICAgXCJmOVwiLFxyXG4gICAgICAgIFwiZzlcIixcclxuICAgICAgICBcImg5XCIsXHJcbiAgICAgICAgXCJpOVwiLFxyXG4gICAgICAgIFwiajlcIixcclxuICAgICAgICBcImExMFwiLFxyXG4gICAgICAgIFwiYjEwXCIsXHJcbiAgICAgICAgXCJjMTBcIixcclxuICAgICAgICBcImQxMFwiLFxyXG4gICAgICAgIFwiZTEwXCIsXHJcbiAgICAgICAgXCJmMTBcIixcclxuICAgICAgICBcImcxMFwiLFxyXG4gICAgICAgIFwiaDEwXCIsXHJcbiAgICAgICAgXCJpMTBcIixcclxuICAgICAgICBcImoxMFwiLFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyByZXR1cm5pbmcgcmFuZG9tIGluZGV4IGZyb20gYXZhbGlhYmxlQ29vcmRUb1RhcmdldFxyXG4gICAgY29uc3QgY2hvb3NlVGFyZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFsaWFibGVDb29yZFRvVGFyZ2V0Lmxlbmd0aCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vdGFrZXMgc2hvdCBhdCBlbmVteSBib2FyZCB3aXRoIGNvb3JkIGZyb20gY2hvb3NlVGFyZ2V0KCkgYW5kIHJlbW92ZXMgdGhhdCBjb29yZCBmcm9tIGF2YWlsaWFibGUgY29vcmRzXHJcbiAgICBjb25zdCBzaG9vdENvbXAgPSAoZW5lbXlCb2FyZCwgY29vcmQgPSBjaG9vc2VUYXJnZXQoKSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhpdFNoaXAgPSAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRbY29vcmRdKTtcclxuICAgICAgICBjb25zdCBoaXRDb29yZCA9IGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRbY29vcmRdXHJcbiAgICAgICAgY29uc29sZS5sb2coYXZhbGlhYmxlQ29vcmRUb1RhcmdldFtjb29yZF0pXHJcbiAgICAgICAgYXZhbGlhYmxlQ29vcmRUb1RhcmdldC5zcGxpY2UoY29vcmQsIDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBbaGl0U2hpcCwgaGl0Q29vcmRdXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zdCBwbGFjZUNvbXBTaGlwcyA9IChib2FyZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpXHJcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbe1xyXG4gICAgICAgICAgICBzdWJtYXJpbmUxOiBbXCJhMVwiXSxcclxuICAgICAgICAgICAgc3VibWFyaW5lMjogW1wiYTNcIl0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjE6IFsnZDMnLCAnZDQnXSxcclxuICAgICAgICAgICAgZGVzdHJveWVyMjogWydoOScsICdpOSddLFxyXG4gICAgICAgICAgICBjcnVpc2VyOiBbJ2IxMCcsICdjMTAnLCAnZDEwJ10sXHJcbiAgICAgICAgICAgIGJhdHRsZXNoaXA6IFsnaTEnLCAnaTInLCAnaTMnLCAnaTQnXSxcclxuICAgICAgICAgICAgYWlyY3JhZnRDYXJyaWVyOiBbJ2U3JywgJ2Y3JywgJ2c3JywgJ2g3JywgJ2k3J10sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdWJtYXJpbmUxOiBbXCJkMVwiXSxcclxuICAgICAgICAgICAgc3VibWFyaW5lMjogW1wiZzlcIl0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjE6IFsnajQnLCAnajUnXSxcclxuICAgICAgICAgICAgZGVzdHJveWVyMjogWydkMTAnLCAnZTEwJ10sXHJcbiAgICAgICAgICAgIGNydWlzZXI6IFsnaTgnLCAnaTknLCAnaTEwJ10sXHJcbiAgICAgICAgICAgIGJhdHRsZXNoaXA6IFsnYjQnLCAnYzQnLCAnZDQnLCAnZTQnXSxcclxuICAgICAgICAgICAgYWlyY3JhZnRDYXJyaWVyOiBbJ2E2JywgJ2E3JywgJ2E4JywgJ2E5JywgJ2ExMCddLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3VibWFyaW5lMTogW1wiZzVcIl0sXHJcbiAgICAgICAgICAgIHN1Ym1hcmluZTI6IFtcImk5XCJdLFxyXG4gICAgICAgICAgICBkZXN0cm95ZXIxOiBbJ2kyJywgJ2oyJ10sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjI6IFsnYzEnLCAnYzInXSxcclxuICAgICAgICAgICAgY3J1aXNlcjogWydhNycsICdiNycsICdjNyddLFxyXG4gICAgICAgICAgICBiYXR0bGVzaGlwOiBbJ2U3JywgJ2U4JywgJ2U5JywgJ2UxMCddLFxyXG4gICAgICAgICAgICBhaXJjcmFmdENhcnJpZXI6IFsnYTQnLCAnYjQnLCAnYzQnLCAnZDQnLCAnZTQnXSxcclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IFtzaGlwICxjb29yZHNdIG9mIE9iamVjdC5lbnRyaWVzKHNoaXBzW251bV0pKXtcclxuICAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoc2hpcCwgY29vcmRzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3JldHVybnMgb2JqZWN0IHdpdGggYWxsIG1ldGhvZHMgYW5kIHByb3Blcml0ZXMgaW5oZXJ0ZXRlZCBmcm9tIHBsYXllclxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHByb3RvdHlwZSwge1xyXG4gICAgICAgIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQsXHJcbiAgICAgICAgY2hvb3NlVGFyZ2V0LFxyXG4gICAgICAgIHNob290Q29tcCxcclxuICAgICAgICBwbGFjZUNvbXBTaGlwcyxcclxuICAgIH0pO1xyXG59O1xyXG4iLCIvL2ZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGFsbCB0eXBlIG9mIHNoaXBzIGFuZCBhdHRyaWJ1dCBtZXRob2QgdG8gdGhlbVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXAgPSAoc2hpcExlbmd0aCkgPT4ge1xyXG4gIGNvbnN0IGxlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XHJcblxyXG4gIC8vIHN0YXR1cyBvZiBzaGlwXHJcbiAgbGV0IHN1bmsgPSBmYWxzZTtcclxuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcclxuXHJcbiAgLy90cmFja2luZyBudW1iZXIgb2YgaGl0cyB0byB0aGUgc2hpcFxyXG4gIGxldCBoaXROdW1iZXIgPSAwO1xyXG4gIC8vcmV0dXJuIG51bWJlciBvZiBoaXRzXHJcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdE51bWJlcjtcclxuXHJcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xyXG4gICAgaGl0TnVtYmVyKys7XHJcbiAgICBpZiAoaGl0TnVtYmVyID49IGxlbmd0aCgpKSB7XHJcbiAgICAgIHN1bmsgPSB0cnVlO1xyXG4gICAgfX1cclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgY29uc3Qgc2V0Q29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XHJcbiAgICAgIGlmKGNvb3Jkcy5sZW5ndGggIT09IGxlbmd0aCgpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBvZiBjb29yZGluYXRlcyBoYXZlIHRvIGJlIGVxdWFsIHRvIGxlbmd0aCBvZiB0aGUgc2hpcCcpXHJcbiAgICAgIH1cclxuICAgICAgdHJ5e1xyXG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzID0gKCkgPT4gY29vcmRpbmF0ZXM7XHJcbiAgXHJcblxyXG4gIHJldHVybiB7IGxlbmd0aCwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0LCBzZXRDb29yZGluYXRlcywgZ2V0Q29vcmRpbmF0ZXMsY29vcmRpbmF0ZXN9O1xyXG59O1xyXG4iLCIvL2dpdmVuIHN0YXJ0aW5nIGVuZCBlbmRpbmcgY29vcmRzLCBiYXNlZCBvZiB2ZXJ0aWNhbC9sZXZlbCBtYWtpbmcgYXJyYXkgdGhhdCBcclxuaW1wb3J0IHsgZGVjbGFyZVdpbm5lciB9IGZyb20gXCIuL2RvbVwiO1xyXG5leHBvcnQgY29uc3QgbWFrZUNvb3JkcyA9IChzdGFydENvb3JkLCBlbmRDb29yZCwgbGVuZ3RoeSkgPT4ge1xyXG4gICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICBjb25zdCBjb29yZHMgPSBbXVxyXG4gICAgaWYgKGxlbmd0aHkgPT09IDEpIHtcclxuICAgICAgICBjb29yZHMucHVzaChzdGFydENvb3JkKVxyXG4gICAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aHk7IGkrKykge1xyXG4gICAgICAgIGlmIChzdGFydENvb3JkWzBdID09PSBlbmRDb29yZFswXSkge1xyXG4gICAgICAgICAgICBjb29yZHMucHVzaChgJHtzdGFydENvb3JkWzBdfSR7TnVtYmVyKHN0YXJ0Q29vcmRbMV0pICsgaX1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzdGFydENvb3JkWzFdID09PSBlbmRDb29yZFsxXSkge1xyXG4gICAgICAgICAgICBjb29yZHMucHVzaChgJHtsZXR0ZXJzW2xldHRlcnMuZmluZEluZGV4KGxldHRlciA9PiBsZXR0ZXIgPT09IHN0YXJ0Q29vcmRbMF0pICsgaV19JHtlbmRDb29yZFsxXX1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZHM7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtVmFsaWRhdGlvbiA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlcyBuZWVkIHRvIGJlIDIgb3IgMyBjaGFyYWN0ZXJzIGxvbmcnKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyVHVybiA9IChjb21wdXRlciwgZW5lbXkpID0+IHtcclxuICAgIGlmIChjb21wdXRlci5nZXRUdXJuKCkpIHtcclxuICAgICAgICBjb25zdCBoaXRTaGlwID0gY29tcHV0ZXIuc2hvb3RDb21wKGVuZW15LmJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGNvb3JkID0gaGl0U2hpcFsxXVxyXG4gICAgICAgIGNvbnN0IGRpdkNvb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcmNlbGxbZGF0YS1jb29yZGluYXRlcz0nJHtjb29yZH0nXWApXHJcbiAgICAgICAgaWYgKGhpdFNoaXBbMF0pIHtcclxuICAgICAgICAgICAgZGl2Q29vcmQuY2xhc3NMaXN0LmFkZCgnaGl0JylcclxuICAgICAgICAgICAgaWYgKGhpdFNoaXAuZ2V0U3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5lbXkuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY2xhcmVXaW5uZXIoJ3BsYXllcicpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRpdkNvb3JkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG4gICAgICAgICAgICBjb21wdXRlci5jaGFuZ2VUdXJuKClcclxuICAgICAgICAgICAgZW5lbXkuY2hhbmdlVHVybigpXHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcclxuXHJcblxyXG5nYW1lKClcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==