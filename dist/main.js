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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");





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
            const coords = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.makeCoords)(coordStart, coordEnd, ships[0][1])
            try {
                ;(0,_utilities__WEBPACK_IMPORTED_MODULE_1__.formValidation)(coordStart)
                ;(0,_utilities__WEBPACK_IMPORTED_MODULE_1__.formValidation)(coordEnd)
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
        ;(0,_game__WEBPACK_IMPORTED_MODULE_2__.game)()
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
        console.log(avaliableCoordToTarget[coord]);
        const hitShip =  enemyBoard.receiveAttack(avaliableCoordToTarget[coord]);
        avaliableCoordToTarget.splice(coord, 1);
        return [hitShip, coord]
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
        }
        computer.changeTurn()
        enemy.changeTurn()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNNd0M7QUFDeEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxREFBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7OztBQ2pMQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNzQztBQUMvQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0EsMkJBQTJCLGNBQWMsRUFBRSwwQkFBMEI7QUFDckU7QUFDQTtBQUNBLDJCQUEyQixtRUFBbUUsRUFBRSxZQUFZO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLE1BQU07QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbURBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQzlDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQzlCO0FBQ0E7QUFDQSwyQ0FBSTtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcbmltcG9ydCB7IG1ha2VDb29yZHMgfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgZm9ybVZhbGlkYXRpb24gfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgZ2FtZSwgfSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG4vL2NyZWF0aW5nIGdyaWQgMTB4MTAgd2l0aCByb3dzIDEtMTAgYW5kIGNvbHVtbnMgYS1qLCBzZXR0aW5nIGV2ZXJ5IGRhdGEgc2V0dCBvZiBjZWxsIHRvIG1hdGNoIGNvb3JkaW5hdGVzXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVCb2FyZCA9IChwbGF5ZXIpID0+IHtcclxuICAgIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xyXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwbGF5ZXJ9YCArICdib2FyZCcpXHJcbiAgICBsZXR0ZXJzLmZvckVhY2gobGV0dGVyID0+IHtcclxuICAgICAgICBjb25zdCBkaXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIGRpdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBjb2x1bW5gKVxyXG4gICAgICAgIGRpdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGAke2xldHRlcn1gKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChgJHtwbGF5ZXJ9Y2VsbGApXHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjZWxsJylcclxuICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gYCR7bGV0dGVyfSR7aSArIDF9YFxyXG4gICAgICAgICAgICBkaXYuZGF0YXNldC5jb29yZGluYXRlcyA9IGAke2xldHRlcn0ke2kgKyAxfWBcclxuICAgICAgICAgICAgZGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKGRpdilcclxuICAgICAgICB9XHJcbiAgICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoZGl2Q29udGFpbmVyKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNsaWNrSGFuZGxlckNvb3JkcyA9IChuYW1lLCBwbGF5ZXIsIHNlbGZUdXJuKSA9PiB7XHJcbiAgICBjb25zdCBhbGxDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke25hbWV9YCArICdjZWxsJylcclxuICAgIGFsbENlbGxzLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGl0U2hpcCA9IHBsYXllci5ib2FyZC5yZWNlaXZlQXR0YWNrKGNlbGwuZGF0YXNldC5jb29yZGluYXRlcylcclxuICAgICAgICAgICAgaWYoaGl0U2hpcCl7XHJcbiAgICAgICAgICAgICAgICBtYXJrSGl0KGNlbGwpXHJcbiAgICAgICAgICAgICAgICBpZihoaXRTaGlwLmdldFN1bmsoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmFsbFNoaXBzU3Vua2VkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNsYXJlV2lubmVyKG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG1hcmtNaXNzKGNlbGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWVyLmNoYW5nZVR1cm4oKVxyXG4gICAgICAgICAgICBzZWxmVHVybi5jaGFuZ2VUdXJuKClcclxuICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3VibWl0SGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgICAgIFtcInN1Ym1hcmluZTFcIiwgMSxdLFxyXG4gICAgICAgIFtcInN1Ym1hcmluZTJcIiwgMSxdLFxyXG4gICAgICAgIFtcImRlc3Ryb3llcjFcIiwgMixdLFxyXG4gICAgICAgIFtcImRlc3Ryb3llcjJcIiwgMixdLFxyXG4gICAgICAgIFtcImNydWlzZXJcIiwgMyxdLFxyXG4gICAgICAgIFtcImJhdHRsZXNoaXBcIiwgNCxdLFxyXG4gICAgICAgIFtcImFpcmNyYWZ0Q2FycmllclwiLCA1XSxcclxuICAgIF1cclxuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwdHlwZScpXHJcblxyXG4gICAgbGVnZW5kLnRleHRDb250ZW50ID0gYCR7c2hpcHNbMF1bMF19IHdpdGggbGVuZ3RoIG9mICR7c2hpcHNbMF1bMV19YFxyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxyXG4gICAgY29uc3Qgc3VibWl0Rm9ybSA9IChib2FyZCkgPT4ge1xyXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHJlc2V0RXJyb3IoKVxyXG4gICAgICAgICAgICBjb25zdCBjb29yZFN0YXJ0ID0gZS50YXJnZXRbMF0udmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgY29uc3QgY29vcmRFbmQgPSBlLnRhcmdldFsxXS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICBjb25zdCBjb29yZHMgPSBtYWtlQ29vcmRzKGNvb3JkU3RhcnQsIGNvb3JkRW5kLCBzaGlwc1swXVsxXSlcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0aW9uKGNvb3JkU3RhcnQpXHJcbiAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdGlvbihjb29yZEVuZClcclxuICAgICAgICAgICAgICAgIG1hcmtQbGFjZWRTaGlwKGNvb3JkcylcclxuICAgICAgICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChzaGlwc1swXVswXSwgY29vcmRzKVxyXG4gICAgICAgICAgICAgICAgc2hpcHMuc2hpZnQoKVxyXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNIYXNCZW5uUGxhY2VkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVnZW5kLnRleHRDb250ZW50ID0gYCR7c2hpcHNbMF1bMF19IHdpdGggbGVuZ3RoIG9mICR7c2hpcHNbMF1bMV19YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RXJyb3IoZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgc3VibWl0Rm9ybSB9XHJcbn1cclxuXHJcbmNvbnN0IGRpc3BsYXlFcnJvciA9IGVycm9yID0+IHtcclxuICAgIGNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJylcclxuICAgIGVycm9yRGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBlcnJvckRpdi50ZXh0Q29udGVudCA9IGVycm9yXHJcbn1cclxuXHJcbmNvbnN0IHJlc2V0RXJyb3IgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBlcnJvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpXHJcbiAgICBlcnJvckRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbn1cclxuXHJcbmNvbnN0IG1hcmtQbGFjZWRTaGlwID0gKGNvb3JkcykgPT4ge1xyXG4gICAgZm9yIChjb25zdCBjb29yZCBvZiBjb29yZHMpIHtcclxuICAgICAgICBjb25zdCBkaXZDb29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXJjZWxsW2RhdGEtY29vcmRpbmF0ZXM9JyR7Y29vcmR9J11gKVxyXG4gICAgICAgIGRpdkNvb3JkLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBzaGlwc0hhc0Jlbm5QbGFjZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpXHJcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydCcpXHJcblxyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG59XHJcblxyXG5jb25zdCBtYXJrSGl0ID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbn1cclxuY29uc3QgbWFya01pc3MgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlY2xhcmVXaW5uZXIgPSAod2lubmVyKSA9PiB7XHJcbiAgICBjb25zdCB3aW5uZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyJylcclxuICAgIHdpbm5lckRpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgbGV0IHdpbm5lck5hbWU7XHJcbiAgICBpZih3aW5uZXI9PT0nY29tcHV0ZXInKXtcclxuICAgICAgICB3aW5uZXJOYW1lID0gJ1BsYXllcjEnXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHdpbm5lck5hbWUgPSAnQ29tcHV0ZXInXHJcbiAgICB9XHJcbiAgICB3aW5uZXJEaXYudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJOYW1lfWBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN0YXJ0R2FtZSA9IChjYWxsYmFjayk9PntcclxuICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0JylcclxuXHJcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzZXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNldCcpXHJcbiAgICBjb25zdCBwbGF5ZXJib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJib2FyZCcpXHJcbiAgICBjb25zdCBjb21wYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXJib2FyZCcpXHJcbiAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAgICAgICBwbGF5ZXJib2FyZC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgIGNvbXBib2FyZC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgIGdhbWUoKVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIGNsaWNrSGFuZGxlckNvb3Jkcywgc3VibWl0SGFuZGxlciwgc3RhcnRHYW1lLCByZXNldCB9IGZyb20gXCIuL2RvbVwiO1xyXG5pbXBvcnQgeyBjb21wdXRlclR1cm4gfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZSA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBQbGF5ZXIxID0gcGxheWVyKClcclxuICAgIGNvbnN0IENvbXB1dGVyID0gY29tcHV0ZXIoKVxyXG5cclxuICAgIGNyZWF0ZUJvYXJkKCdwbGF5ZXInKVxyXG4gICAgY3JlYXRlQm9hcmQoJ2NvbXB1dGVyJylcclxuXHJcbiAgICBjb25zdCBzdWJtaXQgPSBzdWJtaXRIYW5kbGVyKClcclxuICAgIHN1Ym1pdC5zdWJtaXRGb3JtKFBsYXllcjEuYm9hcmQpXHJcbiAgICBDb21wdXRlci5wbGFjZUNvbXBTaGlwcyhDb21wdXRlci5ib2FyZClcclxuXHJcbiAgICBjbGlja0hhbmRsZXJDb29yZHMoJ2NvbXB1dGVyJywgQ29tcHV0ZXIsIFBsYXllcjEpXHJcblxyXG4gICAgcmVzZXQoKVxyXG5cclxuICAgIGNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB3aGlsZSAoIVBsYXllcjEuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSAmJiAhQ29tcHV0ZXIuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgICAgICAgICBjb21wdXRlclR1cm4oQ29tcHV0ZXIsIFBsYXllcjEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhcnRHYW1lKGdhbWVMb29wKVxyXG5cclxufSIsImltcG9ydCB7IHNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGJvYXJkID0gW1xyXG4gICAgW1wiYTFcIiwgXCJiMVwiLCBcImMxXCIsIFwiZDFcIiwgXCJlMVwiLCBcImYxXCIsIFwiZzFcIiwgXCJoMVwiLCBcImkxXCIsIFwiajFcIl0sXHJcbiAgICBbXCJhMlwiLCBcImIyXCIsIFwiYzJcIiwgXCJkMlwiLCBcImUyXCIsIFwiZjJcIiwgXCJnMlwiLCBcImgyXCIsIFwiaTJcIiwgXCJqMlwiXSxcclxuICAgIFtcImEzXCIsIFwiYjNcIiwgXCJjM1wiLCBcImQzXCIsIFwiZTNcIiwgXCJmM1wiLCBcImczXCIsIFwiaDNcIiwgXCJpM1wiLCBcImozXCJdLFxyXG4gICAgW1wiYTRcIiwgXCJiNFwiLCBcImM0XCIsIFwiZDRcIiwgXCJlNFwiLCBcImY0XCIsIFwiZzRcIiwgXCJoNFwiLCBcImk0XCIsIFwiajRcIl0sXHJcbiAgICBbXCJhNVwiLCBcImI1XCIsIFwiYzVcIiwgXCJkNVwiLCBcImU1XCIsIFwiZjVcIiwgXCJnNVwiLCBcImg1XCIsIFwiaTVcIiwgXCJqNVwiXSxcclxuICAgIFtcImE2XCIsIFwiYjZcIiwgXCJjNlwiLCBcImQ2XCIsIFwiZTZcIiwgXCJmNlwiLCBcImc2XCIsIFwiaDZcIiwgXCJpNlwiLCBcImo2XCJdLFxyXG4gICAgW1wiYTdcIiwgXCJiN1wiLCBcImM3XCIsIFwiZDdcIiwgXCJlN1wiLCBcImY3XCIsIFwiZzdcIiwgXCJoN1wiLCBcImk3XCIsIFwiajdcIl0sXHJcbiAgICBbXCJhOFwiLCBcImI4XCIsIFwiYzhcIiwgXCJkOFwiLCBcImU4XCIsIFwiZjhcIiwgXCJnOFwiLCBcImg4XCIsIFwiaThcIiwgXCJqOFwiXSxcclxuICAgIFtcImE5XCIsIFwiYjlcIiwgXCJjOVwiLCBcImQ5XCIsIFwiZTlcIiwgXCJmOVwiLCBcImc5XCIsIFwiaDlcIiwgXCJpOVwiLCBcImo5XCJdLFxyXG4gICAgW1wiYTEwXCIsIFwiYjEwXCIsIFwiYzEwXCIsIFwiZDEwXCIsIFwiZTEwXCIsIFwiZjEwXCIsIFwiZzEwXCIsIFwiaDEwXCIsIFwiaTEwXCIsIFwiajEwXCJdLFxyXG4gIF07XHJcbiAgLy9zaGlwcyBhbmQgY29vcmRpbmF0ZXMgb2Ygc2hpcHMgdGhhdCBhbHJlYWR5IGhhdmUgYmVlbiBwbGFjZWRcclxuICBjb25zdCBwbGFjZWRTaGlwcyA9IFtdO1xyXG4gIGNvbnN0IGdldHBsYWNlZFNoaXBzID0gKCkgPT4gcGxhY2VkU2hpcHM7XHJcbiAgLy8gY2VsbHMgdGhhdCBoYXZlIHNoaXBzIG9uIHRoZW0gb3IgYXJlIGFkamNlbnRlcyB0byBzaGlwc1xyXG4gIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcclxuICAvLyB0cmFja2luZyBjZWxscyB0aGF0IGJlZW4gc2hvdCBhbmQgd2VyZSBtaXNzXHJcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBbXTtcclxuICBjb25zdCBnZXRNaXNzZWRTaG90cyA9ICgpID0+IG1pc3NlZFNob3RzO1xyXG5cclxuICBjb25zdCBzaGlwcyA9IFtcclxuICAgIFwic3VibWFyaW5lMVwiLFxyXG4gICAgXCJzdWJtYXJpbmUyXCIsXHJcbiAgICBcImRlc3Ryb3llcjFcIixcclxuICAgIFwiZGVzdHJveWVyMlwiLFxyXG4gICAgXCJjcnVpc2VyXCIsXHJcbiAgICBcImJhdHRsZXNoaXBcIixcclxuICAgIFwiYWlyY3JhZnRDYXJyaWVyXCIsXHJcbiAgXTtcclxuXHJcbiAgLy9jaGVja2luZyBpZiBjb29yZGluYXRlcyBhcmUgYWxsb3dlZCBhbmQgcGxhY2luZyBzaGlwcyBpbiBwbGFjZWRTaGlwc1xyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwVHlwZSwgY29vcmRzKSA9PiB7XHJcbiAgICAvL2xpc3Qgb2YgY2VsbHMgdGhhdCBsYXJlYWR5IGhhdiBzaGlwcyBvbiB0aGVtXHJcblxyXG4gICAgbGV0IHNoaXBOYW1lO1xyXG5cclxuICAgIC8vY2hlY2tzIGlmIHBhc3NlZCBzaGlwIGV4aXN0c1xyXG4gICAgY29uc3QgY2hlY2tFeGlzdGVuY2VPZlNoaXAgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBzaGlwcykge1xyXG4gICAgICAgIGlmIChzaGlwVHlwZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgc2hpcE5hbWUgPSBzaGlwVHlwZTtcclxuICAgICAgICAgIHNoaXBzLnNwbGljZShzaGlwcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY2hlY2sgaWYgcGFzc2VkIGNvb3JkIGV4aXN0c1xyXG4gICAgY29uc3QgY2hlY2tDb29yZGluYXRlcyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgcmVnZXggPSAvXlthLWpdKDEwfFsxLTldKSQvO1xyXG4gICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIGNvb3Jkcykge1xyXG4gICAgICAgIGlmICghcmVnZXgudGVzdChjb29yZCkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVjayBpZiBwYXNzZWQgY29yZHMgYXJlIGFsbG93ZWQgcG9zaXRpb25hbGx5XHJcbiAgICBjb25zdCBjaGVja1BsYWNlbWVudCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICAgIGxldCBsZXZlbCA9IGZhbHNlO1xyXG4gICAgICBsZXQgdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMF0gPT09XHJcbiAgICAgICAgbGV0dGVyc1tsZXR0ZXJzLmZpbmRJbmRleCgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNvb3Jkc1swXVswXSkgK1xyXG4gICAgICAgICAgICAoY29vcmRzLmxlbmd0aCAtIDEpXSAmJlxyXG4gICAgICAgIGNvb3Jkc1swXVsxXSA9PT0gY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVsxXVxyXG4gICAgICApIHtcclxuICAgICAgICBsZXZlbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1swXVswXSA9PT0gY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVswXSAmJlxyXG4gICAgICAgIE51bWJlcihjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdKSA9PT1cclxuICAgICAgICAgIE51bWJlcihjb29yZHNbMCArIChjb29yZHMubGVuZ3RoIC0gMSldWzFdKVxyXG4gICAgICApIHtcclxuICAgICAgICB2ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZlcnRpY2FsIHx8IGxldmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjaGVja0lmQ2VsbE9jY3VwaWVkID0gKCkgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIGNvb3Jkcykge1xyXG4gICAgICAgIGlmIChvY2N1cGllZENlbGxzLmluY2x1ZGVzKGNvb3JkKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gYWRkZWQgQ2VsbCBmcm9tIGNvb3JkIGFuZCBhZGphY2VudCBjZWxscyB0byBvY2N1cGllZCBjZWxsc1xyXG4gICAgY29uc3QgYWRkT2NjdXBpZWRDZWxscyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY29vcmRMZXR0ZXIgPSBjb29yZHNbaV1bMF07XHJcbiAgICAgICAgY29uc3QgY29vcmROdW1iZXIgPSBjb29yZHNbaV1bMV07XHJcbiAgICAgICAgY29uc3QgSW5kZXhJbkxldHRlcnMgPSBsZXR0ZXJzLmluZGV4T2YoY29vcmRzW2ldWzBdKTtcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBbXHJcbiAgICAgICAgICBjb29yZHNbaV0sXHJcbiAgICAgICAgICBgJHtjb29yZExldHRlcn0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWAsXHJcbiAgICAgICAgICBgJHtjb29yZExldHRlcn0ke051bWJlcihjb29yZE51bWJlcikgLSAxfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyArIDFdfSR7Y29vcmROdW1iZXJ9YCxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IGNvb3Jkcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpICsgMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyArIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBjb25zdCBmaWx0ZXJPY2N1cGllZENlbGxzID0gKHJhZGl1cyA9IGFkZE9jY3VwaWVkQ2VsbHMoKSkgPT4ge1xyXG4gICAgICBjb25zdCByZWdleCA9IC9eW2Etal0oMTB8WzEtOV0pJC87XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgcmFkaXVzKSB7XHJcbiAgICAgICAgaWYgKHJlZ2V4LnRlc3QoY29vcmQpICYmICFvY2N1cGllZENlbGxzLmluY2x1ZGVzKGNvb3JkKSkge1xyXG4gICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGNvb3JkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVja2luZyBzaGlwcyBhbmQgY29yZHMgYWdhaW5zIGFsbCBkZXBlbmRlY2llc1xyXG5cclxuICAgIGlmICghY2hlY2tDb29yZGluYXRlcygpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkaW5hdGVzIG91dCBvZiByYW5nZSBvZiB0aGUgYm9hcmQgb3Igbm90IGV4aXN0c1wiKTtcclxuICAgIH1cclxuICAgIGlmICghY2hlY2tQbGFjZW1lbnQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBvZiBzaGlwIGlzIG5vdCBhbGxvd2VkXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja0lmQ2VsbE9jY3VwaWVkKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIFwiWW91IGNhbm5vdCBwbGFjZSBzaGlwIGluIG9uZSBvZmFscmVhZHkgb2NjdXBpZWQgb3IgYWRqZWNudGVzIGNlbGxzXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICghY2hlY2tFeGlzdGVuY2VPZlNoaXAoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGFscmVhZHkgYmVlbiBwbGFjZWQgb3Igbm90IGV4aXN0c1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBmaWx0ZXJPY2N1cGllZENlbGxzKCk7XHJcblxyXG4gICAgLy9jcmVhdGUgbmV3IHNoaXAgYW5kIHBhc3NlZCBjb3JyZWN0IGNvcmRzXHJcbiAgICBjb25zdCBuZXdTaGlwID0gc2hpcChjb29yZHMubGVuZ3RoKTtcclxuICAgIG5ld1NoaXAuc2V0Q29vcmRpbmF0ZXMoY29vcmRzKTtcclxuICAgIHBsYWNlZFNoaXBzLnB1c2goeyBbYCR7c2hpcE5hbWV9YF06IG5ld1NoaXAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gdGFrZXMgY29vcmQgdGhhdCB3YXMgc2hvdCwgY2hlY2tzIGlmIHNoaXAgd2FzIGhpdCBhbmQgdHJhY2tzIGl0LCBpZiBtaXNzIHB1c2hlcyBjb29yZCB0byBtaXNzZWQgc2hvdHMgYXJyYXlcclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFja0Nvb3JkKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlZFNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgXHJcbiAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXS5jb29yZGluYXRlcztcclxuICAgICAgZm9yIChjb25zdCBzaGlwQ29vcmQgb2Ygc2hpcENvb3Jkcykge1xyXG4gICAgICAgIGlmIChzaGlwQ29vcmQgPT09IGF0dGFja0Nvb3JkKSB7XHJcbiAgICAgICAgICBjb25zdCBoaXRTaGlwID0gT2JqZWN0LnZhbHVlcyhwbGFjZWRTaGlwc1tpXSlbMF07XHJcbiAgICAgICAgICBoaXRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgcmV0dXJuIGhpdFNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtaXNzZWRTaG90cy5wdXNoKGF0dGFja0Nvb3JkKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICAvLyBjaGVja3MgaWYgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXHJcbiAgY29uc3QgYWxsU2hpcHNTdW5rZWQgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlZFNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluc3BlY3RlZFNoaXAgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXTtcclxuICAgICAgaWYgKGluc3BlY3RlZFNoaXAuZ2V0U3VuaygpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJvYXJkLFxyXG4gICAgcGxhY2VTaGlwLFxyXG4gICAgZ2V0cGxhY2VkU2hpcHMsXHJcbiAgICBnZXRNaXNzZWRTaG90cyxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBhbGxTaGlwc1N1bmtlZCxcclxuICAgIHBsYWNlZFNoaXBzLFxyXG4gIH07XHJcbn07XHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAgIC8vdHJhY2tpbmcgdHVybiBhbmQgY2hhbmdlcyB0dXJuXHJcbiAgICBsZXQgdHVybiA9IGZhbHNlO1xyXG4gICAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+ICh0dXJuID0gIXR1cm4pO1xyXG4gICAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHR1cm47XHJcblxyXG4gICAgLy9jcmVhdGVzIHBsYXllciBnYW1lYm9hcmRcclxuICAgIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gICAgLy90YWtlcyBlbmVteSBib2FyZCBhbmQgY29vcmQgdGhhdCBpcyBzaG9vdCB0YXJnZXQgYW5kIHJldHVybiBmYWxzZSB3aGVuIG1pc3Mgb3IgaGl0dGVkIFNoaXAgd2hlbiBoaXRcclxuICAgIGNvbnN0IHNob290ID0gKGVuZW15Qm9hcmQsIGNvb3JkKSA9PiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xyXG4gICAgcmV0dXJuIHsgdHVybiwgY2hhbmdlVHVybiwgYm9hcmQsIHNob290LCBnZXRUdXJuIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgICAvL3Rha2VzIGluaGFyaXRhbmNlIGZyb20gcGxheWVyIGZhY3RvcnkgZnVuY3Rpb25cclxuICAgIGNvbnN0IHByb3RvdHlwZSA9IHBsYXllcigpO1xyXG5cclxuICAgIGNvbnN0IGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQgPSBbXHJcbiAgICAgICAgXCJhMVwiLFxyXG4gICAgICAgIFwiYjFcIixcclxuICAgICAgICBcImMxXCIsXHJcbiAgICAgICAgXCJkMVwiLFxyXG4gICAgICAgIFwiZTFcIixcclxuICAgICAgICBcImYxXCIsXHJcbiAgICAgICAgXCJnMVwiLFxyXG4gICAgICAgIFwiaDFcIixcclxuICAgICAgICBcImkxXCIsXHJcbiAgICAgICAgXCJqMVwiLFxyXG4gICAgICAgIFwiYTJcIixcclxuICAgICAgICBcImIyXCIsXHJcbiAgICAgICAgXCJjMlwiLFxyXG4gICAgICAgIFwiZDJcIixcclxuICAgICAgICBcImUyXCIsXHJcbiAgICAgICAgXCJmMlwiLFxyXG4gICAgICAgIFwiZzJcIixcclxuICAgICAgICBcImgyXCIsXHJcbiAgICAgICAgXCJpMlwiLFxyXG4gICAgICAgIFwiajJcIixcclxuICAgICAgICBcImEzXCIsXHJcbiAgICAgICAgXCJiM1wiLFxyXG4gICAgICAgIFwiYzNcIixcclxuICAgICAgICBcImQzXCIsXHJcbiAgICAgICAgXCJlM1wiLFxyXG4gICAgICAgIFwiZjNcIixcclxuICAgICAgICBcImczXCIsXHJcbiAgICAgICAgXCJoM1wiLFxyXG4gICAgICAgIFwiaTNcIixcclxuICAgICAgICBcImozXCIsXHJcbiAgICAgICAgXCJhNFwiLFxyXG4gICAgICAgIFwiYjRcIixcclxuICAgICAgICBcImM0XCIsXHJcbiAgICAgICAgXCJkNFwiLFxyXG4gICAgICAgIFwiZTRcIixcclxuICAgICAgICBcImY0XCIsXHJcbiAgICAgICAgXCJnNFwiLFxyXG4gICAgICAgIFwiaDRcIixcclxuICAgICAgICBcImk0XCIsXHJcbiAgICAgICAgXCJqNFwiLFxyXG4gICAgICAgIFwiYTVcIixcclxuICAgICAgICBcImI1XCIsXHJcbiAgICAgICAgXCJjNVwiLFxyXG4gICAgICAgIFwiZDVcIixcclxuICAgICAgICBcImU1XCIsXHJcbiAgICAgICAgXCJmNVwiLFxyXG4gICAgICAgIFwiZzVcIixcclxuICAgICAgICBcImg1XCIsXHJcbiAgICAgICAgXCJpNVwiLFxyXG4gICAgICAgIFwiajVcIixcclxuICAgICAgICBcImE2XCIsXHJcbiAgICAgICAgXCJiNlwiLFxyXG4gICAgICAgIFwiYzZcIixcclxuICAgICAgICBcImQ2XCIsXHJcbiAgICAgICAgXCJlNlwiLFxyXG4gICAgICAgIFwiZjZcIixcclxuICAgICAgICBcImc2XCIsXHJcbiAgICAgICAgXCJoNlwiLFxyXG4gICAgICAgIFwiaTZcIixcclxuICAgICAgICBcImo2XCIsXHJcbiAgICAgICAgXCJhN1wiLFxyXG4gICAgICAgIFwiYjdcIixcclxuICAgICAgICBcImM3XCIsXHJcbiAgICAgICAgXCJkN1wiLFxyXG4gICAgICAgIFwiZTdcIixcclxuICAgICAgICBcImY3XCIsXHJcbiAgICAgICAgXCJnN1wiLFxyXG4gICAgICAgIFwiaDdcIixcclxuICAgICAgICBcImk3XCIsXHJcbiAgICAgICAgXCJqN1wiLFxyXG4gICAgICAgIFwiYThcIixcclxuICAgICAgICBcImI4XCIsXHJcbiAgICAgICAgXCJjOFwiLFxyXG4gICAgICAgIFwiZDhcIixcclxuICAgICAgICBcImU4XCIsXHJcbiAgICAgICAgXCJmOFwiLFxyXG4gICAgICAgIFwiZzhcIixcclxuICAgICAgICBcImg4XCIsXHJcbiAgICAgICAgXCJpOFwiLFxyXG4gICAgICAgIFwiajhcIixcclxuICAgICAgICBcImE5XCIsXHJcbiAgICAgICAgXCJiOVwiLFxyXG4gICAgICAgIFwiYzlcIixcclxuICAgICAgICBcImQ5XCIsXHJcbiAgICAgICAgXCJlOVwiLFxyXG4gICAgICAgIFwiZjlcIixcclxuICAgICAgICBcImc5XCIsXHJcbiAgICAgICAgXCJoOVwiLFxyXG4gICAgICAgIFwiaTlcIixcclxuICAgICAgICBcImo5XCIsXHJcbiAgICAgICAgXCJhMTBcIixcclxuICAgICAgICBcImIxMFwiLFxyXG4gICAgICAgIFwiYzEwXCIsXHJcbiAgICAgICAgXCJkMTBcIixcclxuICAgICAgICBcImUxMFwiLFxyXG4gICAgICAgIFwiZjEwXCIsXHJcbiAgICAgICAgXCJnMTBcIixcclxuICAgICAgICBcImgxMFwiLFxyXG4gICAgICAgIFwiaTEwXCIsXHJcbiAgICAgICAgXCJqMTBcIixcclxuICAgIF07XHJcblxyXG4gICAgLy8gcmV0dXJuaW5nIHJhbmRvbSBpbmRleCBmcm9tIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRcclxuICAgIGNvbnN0IGNob29zZVRhcmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhbGlhYmxlQ29vcmRUb1RhcmdldC5sZW5ndGgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3Rha2VzIHNob3QgYXQgZW5lbXkgYm9hcmQgd2l0aCBjb29yZCBmcm9tIGNob29zZVRhcmdldCgpIGFuZCByZW1vdmVzIHRoYXQgY29vcmQgZnJvbSBhdmFpbGlhYmxlIGNvb3Jkc1xyXG4gICAgY29uc3Qgc2hvb3RDb21wID0gKGVuZW15Qm9hcmQsIGNvb3JkID0gY2hvb3NlVGFyZ2V0KCkpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhdmFsaWFibGVDb29yZFRvVGFyZ2V0W2Nvb3JkXSk7XHJcbiAgICAgICAgY29uc3QgaGl0U2hpcCA9ICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soYXZhbGlhYmxlQ29vcmRUb1RhcmdldFtjb29yZF0pO1xyXG4gICAgICAgIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQuc3BsaWNlKGNvb3JkLCAxKTtcclxuICAgICAgICByZXR1cm4gW2hpdFNoaXAsIGNvb3JkXVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3QgcGxhY2VDb21wU2hpcHMgPSAoYm9hcmQpID0+IHtcclxuICAgICAgICBjb25zdCBudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKVxyXG4gICAgICAgIGNvbnN0IHNoaXBzID0gW3tcclxuICAgICAgICAgICAgc3VibWFyaW5lMTogW1wiYTFcIl0sXHJcbiAgICAgICAgICAgIHN1Ym1hcmluZTI6IFtcImEzXCJdLFxyXG4gICAgICAgICAgICBkZXN0cm95ZXIxOiBbJ2QzJywgJ2Q0J10sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjI6IFsnaDknLCAnaTknXSxcclxuICAgICAgICAgICAgY3J1aXNlcjogWydiMTAnLCAnYzEwJywgJ2QxMCddLFxyXG4gICAgICAgICAgICBiYXR0bGVzaGlwOiBbJ2kxJywgJ2kyJywgJ2kzJywgJ2k0J10sXHJcbiAgICAgICAgICAgIGFpcmNyYWZ0Q2FycmllcjogWydlNycsICdmNycsICdnNycsICdoNycsICdpNyddLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3VibWFyaW5lMTogW1wiZDFcIl0sXHJcbiAgICAgICAgICAgIHN1Ym1hcmluZTI6IFtcImc5XCJdLFxyXG4gICAgICAgICAgICBkZXN0cm95ZXIxOiBbJ2o0JywgJ2o1J10sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjI6IFsnZDEwJywgJ2UxMCddLFxyXG4gICAgICAgICAgICBjcnVpc2VyOiBbJ2k4JywgJ2k5JywgJ2kxMCddLFxyXG4gICAgICAgICAgICBiYXR0bGVzaGlwOiBbJ2I0JywgJ2M0JywgJ2Q0JywgJ2U0J10sXHJcbiAgICAgICAgICAgIGFpcmNyYWZ0Q2FycmllcjogWydhNicsICdhNycsICdhOCcsICdhOScsICdhMTAnXSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHN1Ym1hcmluZTE6IFtcImc1XCJdLFxyXG4gICAgICAgICAgICBzdWJtYXJpbmUyOiBbXCJpOVwiXSxcclxuICAgICAgICAgICAgZGVzdHJveWVyMTogWydpMicsICdqMiddLFxyXG4gICAgICAgICAgICBkZXN0cm95ZXIyOiBbJ2MxJywgJ2MyJ10sXHJcbiAgICAgICAgICAgIGNydWlzZXI6IFsnYTcnLCAnYjcnLCAnYzcnXSxcclxuICAgICAgICAgICAgYmF0dGxlc2hpcDogWydlNycsICdlOCcsICdlOScsICdlMTAnXSxcclxuICAgICAgICAgICAgYWlyY3JhZnRDYXJyaWVyOiBbJ2E0JywgJ2I0JywgJ2M0JywgJ2Q0JywgJ2U0J10sXHJcbiAgICAgICAgfV07XHJcblxyXG4gICAgICAgIGZvcihjb25zdCBbc2hpcCAsY29vcmRzXSBvZiBPYmplY3QuZW50cmllcyhzaGlwc1tudW1dKSl7XHJcbiAgICAgICAgICAgYm9hcmQucGxhY2VTaGlwKHNoaXAsIGNvb3JkcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9yZXR1cm5zIG9iamVjdCB3aXRoIGFsbCBtZXRob2RzIGFuZCBwcm9wZXJpdGVzIGluaGVydGV0ZWQgZnJvbSBwbGF5ZXJcclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBwcm90b3R5cGUsIHtcclxuICAgICAgICBhdmFsaWFibGVDb29yZFRvVGFyZ2V0LFxyXG4gICAgICAgIGNob29zZVRhcmdldCxcclxuICAgICAgICBzaG9vdENvbXAsXHJcbiAgICAgICAgcGxhY2VDb21wU2hpcHMsXHJcbiAgICB9KTtcclxufTtcclxuIiwiLy9mYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhbGwgdHlwZSBvZiBzaGlwcyBhbmQgYXR0cmlidXQgbWV0aG9kIHRvIHRoZW1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGlwID0gKHNoaXBMZW5ndGgpID0+IHtcclxuICBjb25zdCBsZW5ndGggPSAoKSA9PiBzaGlwTGVuZ3RoO1xyXG5cclxuICAvLyBzdGF0dXMgb2Ygc2hpcFxyXG4gIGxldCBzdW5rID0gZmFsc2U7XHJcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XHJcblxyXG4gIC8vdHJhY2tpbmcgbnVtYmVyIG9mIGhpdHMgdG8gdGhlIHNoaXBcclxuICBsZXQgaGl0TnVtYmVyID0gMDtcclxuICAvL3JldHVybiBudW1iZXIgb2YgaGl0c1xyXG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXROdW1iZXI7XHJcblxyXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcclxuICAgIGhpdE51bWJlcisrO1xyXG4gICAgaWYgKGhpdE51bWJlciA+PSBsZW5ndGgoKSkge1xyXG4gICAgICBzdW5rID0gdHJ1ZTtcclxuICAgIH19XHJcblxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGNvbnN0IHNldENvb3JkaW5hdGVzID0gKGNvb3JkcykgPT4ge1xyXG4gICAgICBpZihjb29yZHMubGVuZ3RoICE9PSBsZW5ndGgoKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdudW1iZXIgb2YgY29vcmRpbmF0ZXMgaGF2ZSB0byBiZSBlcXVhbCB0byBsZW5ndGggb2YgdGhlIHNoaXAnKVxyXG4gICAgICB9XHJcbiAgICAgIHRyeXtcclxuICAgICAgICBjb29yZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBnZXRDb29yZGluYXRlcyA9ICgpID0+IGNvb3JkaW5hdGVzO1xyXG4gIFxyXG5cclxuICByZXR1cm4geyBsZW5ndGgsIGdldFN1bmssIGdldEhpdHMsIGhpdCwgc2V0Q29vcmRpbmF0ZXMsIGdldENvb3JkaW5hdGVzLGNvb3JkaW5hdGVzfTtcclxufTtcclxuIiwiLy9naXZlbiBzdGFydGluZyBlbmQgZW5kaW5nIGNvb3JkcywgYmFzZWQgb2YgdmVydGljYWwvbGV2ZWwgbWFraW5nIGFycmF5IHRoYXQgXHJcbmltcG9ydCB7IGRlY2xhcmVXaW5uZXIgfSBmcm9tIFwiLi9kb21cIjtcclxuZXhwb3J0IGNvbnN0IG1ha2VDb29yZHMgPSAoc3RhcnRDb29yZCwgZW5kQ29vcmQsIGxlbmd0aHkpID0+IHtcclxuICAgIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xyXG4gICAgY29uc3QgY29vcmRzID0gW11cclxuICAgIGlmIChsZW5ndGh5ID09PSAxKSB7XHJcbiAgICAgICAgY29vcmRzLnB1c2goc3RhcnRDb29yZClcclxuICAgICAgICByZXR1cm4gY29vcmRzO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGh5OyBpKyspIHtcclxuICAgICAgICBpZiAoc3RhcnRDb29yZFswXSA9PT0gZW5kQ29vcmRbMF0pIHtcclxuICAgICAgICAgICAgY29vcmRzLnB1c2goYCR7c3RhcnRDb29yZFswXX0ke051bWJlcihzdGFydENvb3JkWzFdKSArIGl9YClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RhcnRDb29yZFsxXSA9PT0gZW5kQ29vcmRbMV0pIHtcclxuICAgICAgICAgICAgY29vcmRzLnB1c2goYCR7bGV0dGVyc1tsZXR0ZXJzLmZpbmRJbmRleChsZXR0ZXIgPT4gbGV0dGVyID09PSBzdGFydENvb3JkWzBdKSArIGldfSR7ZW5kQ29vcmRbMV19YClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29vcmRzO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZm9ybVZhbGlkYXRpb24gPSAodmFsdWUpID0+IHtcclxuICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29vcmRpbmF0ZXMgbmVlZCB0byBiZSAyIG9yIDMgY2hhcmFjdGVycyBsb25nJylcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlclR1cm4gPSAoY29tcHV0ZXIsIGVuZW15KSA9PiB7XHJcbiAgICBpZiAoY29tcHV0ZXIuZ2V0VHVybigpKSB7XHJcbiAgICAgICAgY29uc3QgaGl0U2hpcCA9IGNvbXB1dGVyLnNob290Q29tcChlbmVteS5ib2FyZClcclxuICAgICAgICBjb25zdCBjb29yZCA9IGhpdFNoaXBbMV1cclxuICAgICAgICBjb25zdCBkaXZDb29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXJjZWxsW2RhdGEtY29vcmRpbmF0ZXM9JyR7Y29vcmR9J11gKVxyXG4gICAgICAgIGlmIChoaXRTaGlwWzBdKSB7XHJcbiAgICAgICAgICAgIGRpdkNvb3JkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbiAgICAgICAgICAgIGlmIChoaXRTaGlwLmdldFN1bmsoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15LmJvYXJkLmFsbFNoaXBzU3Vua2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWNsYXJlV2lubmVyKCdwbGF5ZXInKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkaXZDb29yZC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcHV0ZXIuY2hhbmdlVHVybigpXHJcbiAgICAgICAgZW5lbXkuY2hhbmdlVHVybigpXHJcbiAgICB9XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG5cclxuZ2FtZSgpXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=