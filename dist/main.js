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
        avaliableCoordToTarget.splice(coord, 1);
        return [hitShip, avaliableCoordToTarget[coord]]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzTXdDO0FBQ3hDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscURBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDaExBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ3NDO0FBQy9CO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQSwyQkFBMkIsY0FBYyxFQUFFLDBCQUEwQjtBQUNyRTtBQUNBO0FBQ0EsMkJBQTJCLG1FQUFtRSxFQUFFLFlBQVk7QUFDNUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYsTUFBTTtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDOUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEI7QUFDOUI7QUFDQTtBQUNBLDJDQUFJO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWFrZUNvb3JkcywgZm9ybVZhbGlkYXRpb24sIGNvbXB1dGVyVHVybiB9IGZyb20gXCIuL3V0aWxpdGllc1wiO1xyXG5pbXBvcnQgeyBnYW1lLCB9IGZyb20gXCIuL2dhbWVcIjtcclxuXHJcbi8vY3JlYXRpbmcgZ3JpZCAxMHgxMCB3aXRoIHJvd3MgMS0xMCBhbmQgY29sdW1ucyBhLWosIHNldHRpbmcgZXZlcnkgZGF0YSBzZXR0IG9mIGNlbGwgdG8gbWF0Y2ggY29vcmRpbmF0ZXNcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BsYXllcn1gICsgJ2JvYXJkJylcclxuICAgIGxldHRlcnMuZm9yRWFjaChsZXR0ZXIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRpdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgZGl2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGNvbHVtbmApXHJcbiAgICAgICAgZGl2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYCR7bGV0dGVyfWApXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKGAke3BsYXllcn1jZWxsYClcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxyXG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBgJHtsZXR0ZXJ9JHtpICsgMX1gXHJcbiAgICAgICAgICAgIGRpdi5kYXRhc2V0LmNvb3JkaW5hdGVzID0gYCR7bGV0dGVyfSR7aSArIDF9YFxyXG4gICAgICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxyXG4gICAgICAgIH1cclxuICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChkaXZDb250YWluZXIpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xpY2tIYW5kbGVyQ29vcmRzID0gKG5hbWUsIHBsYXllciwgc2VsZlR1cm4pID0+IHtcclxuICAgIGNvbnN0IGFsbENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7bmFtZX1gICsgJ2NlbGwnKVxyXG4gICAgYWxsQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcclxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoaXRTaGlwID0gcGxheWVyLmJvYXJkLnJlY2VpdmVBdHRhY2soY2VsbC5kYXRhc2V0LmNvb3JkaW5hdGVzKVxyXG4gICAgICAgICAgICBpZihoaXRTaGlwKXtcclxuICAgICAgICAgICAgICAgIG1hcmtIaXQoY2VsbClcclxuICAgICAgICAgICAgICAgIGlmKGhpdFNoaXAuZ2V0U3VuaygpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXIuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2xhcmVXaW5uZXIobmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWFya01pc3MoY2VsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwbGF5ZXIuY2hhbmdlVHVybigpXHJcbiAgICAgICAgICAgIHNlbGZUdXJuLmNoYW5nZVR1cm4oKVxyXG4gICAgICAgICAgICBjb21wdXRlclR1cm4ocGxheWVyLCBzZWxmVHVybilcclxuICAgICAgICB9LCB7b25jZTogdHJ1ZX0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3VibWl0SGFuZGxlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgICAgIFtcInN1Ym1hcmluZTFcIiwgMSxdLFxyXG4gICAgICAgIFtcInN1Ym1hcmluZTJcIiwgMSxdLFxyXG4gICAgICAgIFtcImRlc3Ryb3llcjFcIiwgMixdLFxyXG4gICAgICAgIFtcImRlc3Ryb3llcjJcIiwgMixdLFxyXG4gICAgICAgIFtcImNydWlzZXJcIiwgMyxdLFxyXG4gICAgICAgIFtcImJhdHRsZXNoaXBcIiwgNCxdLFxyXG4gICAgICAgIFtcImFpcmNyYWZ0Q2FycmllclwiLCA1XSxcclxuICAgIF1cclxuICAgIGNvbnN0IGxlZ2VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGlwdHlwZScpXHJcblxyXG4gICAgbGVnZW5kLnRleHRDb250ZW50ID0gYCR7c2hpcHNbMF1bMF19IHdpdGggbGVuZ3RoIG9mICR7c2hpcHNbMF1bMV19YFxyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxyXG4gICAgY29uc3Qgc3VibWl0Rm9ybSA9IChib2FyZCkgPT4ge1xyXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHJlc2V0RXJyb3IoKVxyXG4gICAgICAgICAgICBjb25zdCBjb29yZFN0YXJ0ID0gZS50YXJnZXRbMF0udmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgY29uc3QgY29vcmRFbmQgPSBlLnRhcmdldFsxXS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICBjb25zdCBjb29yZHMgPSBtYWtlQ29vcmRzKGNvb3JkU3RhcnQsIGNvb3JkRW5kLCBzaGlwc1swXVsxXSlcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGZvcm1WYWxpZGF0aW9uKGNvb3JkU3RhcnQpXHJcbiAgICAgICAgICAgICAgICBmb3JtVmFsaWRhdGlvbihjb29yZEVuZClcclxuICAgICAgICAgICAgICAgIG1hcmtQbGFjZWRTaGlwKGNvb3JkcylcclxuICAgICAgICAgICAgICAgIGJvYXJkLnBsYWNlU2hpcChzaGlwc1swXVswXSwgY29vcmRzKVxyXG4gICAgICAgICAgICAgICAgc2hpcHMuc2hpZnQoKVxyXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNIYXNCZW5uUGxhY2VkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVnZW5kLnRleHRDb250ZW50ID0gYCR7c2hpcHNbMF1bMF19IHdpdGggbGVuZ3RoIG9mICR7c2hpcHNbMF1bMV19YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RXJyb3IoZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgc3VibWl0Rm9ybSB9XHJcbn1cclxuXHJcbmNvbnN0IGRpc3BsYXlFcnJvciA9IGVycm9yID0+IHtcclxuICAgIGNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yJylcclxuICAgIGVycm9yRGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBlcnJvckRpdi50ZXh0Q29udGVudCA9IGVycm9yXHJcbn1cclxuXHJcbmNvbnN0IHJlc2V0RXJyb3IgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBlcnJvckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvcicpXHJcbiAgICBlcnJvckRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbn1cclxuXHJcbmNvbnN0IG1hcmtQbGFjZWRTaGlwID0gKGNvb3JkcykgPT4ge1xyXG4gICAgZm9yIChjb25zdCBjb29yZCBvZiBjb29yZHMpIHtcclxuICAgICAgICBjb25zdCBkaXZDb29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXJjZWxsW2RhdGEtY29vcmRpbmF0ZXM9JyR7Y29vcmR9J11gKVxyXG4gICAgICAgIGRpdkNvb3JkLmNsYXNzTGlzdC5hZGQoJ3BsYWNlZCcpXHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBzaGlwc0hhc0Jlbm5QbGFjZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpXHJcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydCcpXHJcblxyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG59XHJcblxyXG5jb25zdCBtYXJrSGl0ID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbn1cclxuY29uc3QgbWFya01pc3MgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlY2xhcmVXaW5uZXIgPSAod2lubmVyKSA9PiB7XHJcbiAgICBjb25zdCB3aW5uZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyJylcclxuICAgIHdpbm5lckRpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgbGV0IHdpbm5lck5hbWU7XHJcbiAgICBpZih3aW5uZXI9PT0nY29tcHV0ZXInKXtcclxuICAgICAgICB3aW5uZXJOYW1lID0gJ1BsYXllcjEnXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHdpbm5lck5hbWUgPSAnQ29tcHV0ZXInXHJcbiAgICB9XHJcbiAgICB3aW5uZXJEaXYudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJOYW1lfWBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN0YXJ0R2FtZSA9IChjYWxsYmFjayk9PntcclxuICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0JylcclxuXHJcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzZXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNldCcpXHJcbiAgICBjb25zdCBwbGF5ZXJib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJib2FyZCcpXHJcbiAgICBjb25zdCBjb21wYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcHV0ZXJib2FyZCcpXHJcbiAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcclxuICAgICAgICBwbGF5ZXJib2FyZC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgIGNvbXBib2FyZC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgIGdhbWUoKVxyXG4gICAgfSlcclxufSIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIGNsaWNrSGFuZGxlckNvb3Jkcywgc3VibWl0SGFuZGxlciwgc3RhcnRHYW1lLCByZXNldCB9IGZyb20gXCIuL2RvbVwiO1xyXG5pbXBvcnQgeyBjb21wdXRlclR1cm4gfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZSA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBQbGF5ZXIxID0gcGxheWVyKClcclxuICAgIGNvbnN0IENvbXB1dGVyID0gY29tcHV0ZXIoKVxyXG5cclxuICAgIGNyZWF0ZUJvYXJkKCdwbGF5ZXInKVxyXG4gICAgY3JlYXRlQm9hcmQoJ2NvbXB1dGVyJylcclxuXHJcbiAgICBjb25zdCBzdWJtaXQgPSBzdWJtaXRIYW5kbGVyKClcclxuICAgIHN1Ym1pdC5zdWJtaXRGb3JtKFBsYXllcjEuYm9hcmQpXHJcbiAgICBDb21wdXRlci5wbGFjZUNvbXBTaGlwcyhDb21wdXRlci5ib2FyZClcclxuXHJcbiAgICBjbGlja0hhbmRsZXJDb29yZHMoJ2NvbXB1dGVyJywgQ29tcHV0ZXIsIFBsYXllcjEpXHJcblxyXG4gICAgcmVzZXQoKVxyXG5cclxuICAgIGNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB3aGlsZSAoIVBsYXllcjEuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSAmJiAhQ29tcHV0ZXIuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGknKVxyXG4gICAgICAgICAgICBjb21wdXRlclR1cm4oQ29tcHV0ZXIsIFBsYXllcjEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhcnRHYW1lKGdhbWVMb29wKVxyXG5cclxufSIsImltcG9ydCB7IHNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGJvYXJkID0gW1xyXG4gICAgW1wiYTFcIiwgXCJiMVwiLCBcImMxXCIsIFwiZDFcIiwgXCJlMVwiLCBcImYxXCIsIFwiZzFcIiwgXCJoMVwiLCBcImkxXCIsIFwiajFcIl0sXHJcbiAgICBbXCJhMlwiLCBcImIyXCIsIFwiYzJcIiwgXCJkMlwiLCBcImUyXCIsIFwiZjJcIiwgXCJnMlwiLCBcImgyXCIsIFwiaTJcIiwgXCJqMlwiXSxcclxuICAgIFtcImEzXCIsIFwiYjNcIiwgXCJjM1wiLCBcImQzXCIsIFwiZTNcIiwgXCJmM1wiLCBcImczXCIsIFwiaDNcIiwgXCJpM1wiLCBcImozXCJdLFxyXG4gICAgW1wiYTRcIiwgXCJiNFwiLCBcImM0XCIsIFwiZDRcIiwgXCJlNFwiLCBcImY0XCIsIFwiZzRcIiwgXCJoNFwiLCBcImk0XCIsIFwiajRcIl0sXHJcbiAgICBbXCJhNVwiLCBcImI1XCIsIFwiYzVcIiwgXCJkNVwiLCBcImU1XCIsIFwiZjVcIiwgXCJnNVwiLCBcImg1XCIsIFwiaTVcIiwgXCJqNVwiXSxcclxuICAgIFtcImE2XCIsIFwiYjZcIiwgXCJjNlwiLCBcImQ2XCIsIFwiZTZcIiwgXCJmNlwiLCBcImc2XCIsIFwiaDZcIiwgXCJpNlwiLCBcImo2XCJdLFxyXG4gICAgW1wiYTdcIiwgXCJiN1wiLCBcImM3XCIsIFwiZDdcIiwgXCJlN1wiLCBcImY3XCIsIFwiZzdcIiwgXCJoN1wiLCBcImk3XCIsIFwiajdcIl0sXHJcbiAgICBbXCJhOFwiLCBcImI4XCIsIFwiYzhcIiwgXCJkOFwiLCBcImU4XCIsIFwiZjhcIiwgXCJnOFwiLCBcImg4XCIsIFwiaThcIiwgXCJqOFwiXSxcclxuICAgIFtcImE5XCIsIFwiYjlcIiwgXCJjOVwiLCBcImQ5XCIsIFwiZTlcIiwgXCJmOVwiLCBcImc5XCIsIFwiaDlcIiwgXCJpOVwiLCBcImo5XCJdLFxyXG4gICAgW1wiYTEwXCIsIFwiYjEwXCIsIFwiYzEwXCIsIFwiZDEwXCIsIFwiZTEwXCIsIFwiZjEwXCIsIFwiZzEwXCIsIFwiaDEwXCIsIFwiaTEwXCIsIFwiajEwXCJdLFxyXG4gIF07XHJcbiAgLy9zaGlwcyBhbmQgY29vcmRpbmF0ZXMgb2Ygc2hpcHMgdGhhdCBhbHJlYWR5IGhhdmUgYmVlbiBwbGFjZWRcclxuICBjb25zdCBwbGFjZWRTaGlwcyA9IFtdO1xyXG4gIGNvbnN0IGdldHBsYWNlZFNoaXBzID0gKCkgPT4gcGxhY2VkU2hpcHM7XHJcbiAgLy8gY2VsbHMgdGhhdCBoYXZlIHNoaXBzIG9uIHRoZW0gb3IgYXJlIGFkamNlbnRlcyB0byBzaGlwc1xyXG4gIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcclxuICAvLyB0cmFja2luZyBjZWxscyB0aGF0IGJlZW4gc2hvdCBhbmQgd2VyZSBtaXNzXHJcbiAgY29uc3QgbWlzc2VkU2hvdHMgPSBbXTtcclxuICBjb25zdCBnZXRNaXNzZWRTaG90cyA9ICgpID0+IG1pc3NlZFNob3RzO1xyXG5cclxuICBjb25zdCBzaGlwcyA9IFtcclxuICAgIFwic3VibWFyaW5lMVwiLFxyXG4gICAgXCJzdWJtYXJpbmUyXCIsXHJcbiAgICBcImRlc3Ryb3llcjFcIixcclxuICAgIFwiZGVzdHJveWVyMlwiLFxyXG4gICAgXCJjcnVpc2VyXCIsXHJcbiAgICBcImJhdHRsZXNoaXBcIixcclxuICAgIFwiYWlyY3JhZnRDYXJyaWVyXCIsXHJcbiAgXTtcclxuXHJcbiAgLy9jaGVja2luZyBpZiBjb29yZGluYXRlcyBhcmUgYWxsb3dlZCBhbmQgcGxhY2luZyBzaGlwcyBpbiBwbGFjZWRTaGlwc1xyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwVHlwZSwgY29vcmRzKSA9PiB7XHJcbiAgICAvL2xpc3Qgb2YgY2VsbHMgdGhhdCBsYXJlYWR5IGhhdiBzaGlwcyBvbiB0aGVtXHJcblxyXG4gICAgbGV0IHNoaXBOYW1lO1xyXG5cclxuICAgIC8vY2hlY2tzIGlmIHBhc3NlZCBzaGlwIGV4aXN0c1xyXG4gICAgY29uc3QgY2hlY2tFeGlzdGVuY2VPZlNoaXAgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBzaGlwcykge1xyXG4gICAgICAgIGlmIChzaGlwVHlwZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgc2hpcE5hbWUgPSBzaGlwVHlwZTtcclxuICAgICAgICAgIHNoaXBzLnNwbGljZShzaGlwcy5pbmRleE9mKGl0ZW0pLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY2hlY2sgaWYgcGFzc2VkIGNvb3JkIGV4aXN0c1xyXG4gICAgY29uc3QgY2hlY2tDb29yZGluYXRlcyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgcmVnZXggPSAvXlthLWpdKDEwfFsxLTldKSQvO1xyXG4gICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIGNvb3Jkcykge1xyXG4gICAgICAgIGlmICghcmVnZXgudGVzdChjb29yZCkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVjayBpZiBwYXNzZWQgY29yZHMgYXJlIGFsbG93ZWQgcG9zaXRpb25hbGx5XHJcbiAgICBjb25zdCBjaGVja1BsYWNlbWVudCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICAgIGxldCBsZXZlbCA9IGZhbHNlO1xyXG4gICAgICBsZXQgdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMF0gPT09XHJcbiAgICAgICAgbGV0dGVyc1tsZXR0ZXJzLmZpbmRJbmRleCgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNvb3Jkc1swXVswXSkgK1xyXG4gICAgICAgICAgICAoY29vcmRzLmxlbmd0aCAtIDEpXSAmJlxyXG4gICAgICAgIGNvb3Jkc1swXVsxXSA9PT0gY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVsxXVxyXG4gICAgICApIHtcclxuICAgICAgICBsZXZlbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1swXVswXSA9PT0gY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVswXSAmJlxyXG4gICAgICAgIE51bWJlcihjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdKSA9PT1cclxuICAgICAgICAgIE51bWJlcihjb29yZHNbMCArIChjb29yZHMubGVuZ3RoIC0gMSldWzFdKVxyXG4gICAgICApIHtcclxuICAgICAgICB2ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZlcnRpY2FsIHx8IGxldmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjaGVja0lmQ2VsbE9jY3VwaWVkID0gKCkgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIGNvb3Jkcykge1xyXG4gICAgICAgIGlmIChvY2N1cGllZENlbGxzLmluY2x1ZGVzKGNvb3JkKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gYWRkZWQgQ2VsbCBmcm9tIGNvb3JkIGFuZCBhZGphY2VudCBjZWxscyB0byBvY2N1cGllZCBjZWxsc1xyXG4gICAgY29uc3QgYWRkT2NjdXBpZWRDZWxscyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY29vcmRMZXR0ZXIgPSBjb29yZHNbaV1bMF07XHJcbiAgICAgICAgY29uc3QgY29vcmROdW1iZXIgPSBjb29yZHNbaV1bMV07XHJcbiAgICAgICAgY29uc3QgSW5kZXhJbkxldHRlcnMgPSBsZXR0ZXJzLmluZGV4T2YoY29vcmRzW2ldWzBdKTtcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBbXHJcbiAgICAgICAgICBjb29yZHNbaV0sXHJcbiAgICAgICAgICBgJHtjb29yZExldHRlcn0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWAsXHJcbiAgICAgICAgICBgJHtjb29yZExldHRlcn0ke051bWJlcihjb29yZE51bWJlcikgLSAxfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyArIDFdfSR7Y29vcmROdW1iZXJ9YCxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IGNvb3Jkcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpICsgMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyArIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBjb25zdCBmaWx0ZXJPY2N1cGllZENlbGxzID0gKHJhZGl1cyA9IGFkZE9jY3VwaWVkQ2VsbHMoKSkgPT4ge1xyXG4gICAgICBjb25zdCByZWdleCA9IC9eW2Etal0oMTB8WzEtOV0pJC87XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgcmFkaXVzKSB7XHJcbiAgICAgICAgaWYgKHJlZ2V4LnRlc3QoY29vcmQpICYmICFvY2N1cGllZENlbGxzLmluY2x1ZGVzKGNvb3JkKSkge1xyXG4gICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGNvb3JkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVja2luZyBzaGlwcyBhbmQgY29yZHMgYWdhaW5zIGFsbCBkZXBlbmRlY2llc1xyXG5cclxuICAgIGlmICghY2hlY2tDb29yZGluYXRlcygpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvb3JkaW5hdGVzIG91dCBvZiByYW5nZSBvZiB0aGUgYm9hcmQgb3Igbm90IGV4aXN0c1wiKTtcclxuICAgIH1cclxuICAgIGlmICghY2hlY2tQbGFjZW1lbnQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBvZiBzaGlwIGlzIG5vdCBhbGxvd2VkXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja0lmQ2VsbE9jY3VwaWVkKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIFwiWW91IGNhbm5vdCBwbGFjZSBzaGlwIGluIG9uZSBvZmFscmVhZHkgb2NjdXBpZWQgb3IgYWRqZWNudGVzIGNlbGxzXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICghY2hlY2tFeGlzdGVuY2VPZlNoaXAoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIGFscmVhZHkgYmVlbiBwbGFjZWQgb3Igbm90IGV4aXN0c1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBmaWx0ZXJPY2N1cGllZENlbGxzKCk7XHJcblxyXG4gICAgLy9jcmVhdGUgbmV3IHNoaXAgYW5kIHBhc3NlZCBjb3JyZWN0IGNvcmRzXHJcbiAgICBjb25zdCBuZXdTaGlwID0gc2hpcChjb29yZHMubGVuZ3RoKTtcclxuICAgIG5ld1NoaXAuc2V0Q29vcmRpbmF0ZXMoY29vcmRzKTtcclxuICAgIHBsYWNlZFNoaXBzLnB1c2goeyBbYCR7c2hpcE5hbWV9YF06IG5ld1NoaXAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gdGFrZXMgY29vcmQgdGhhdCB3YXMgc2hvdCwgY2hlY2tzIGlmIHNoaXAgd2FzIGhpdCBhbmQgdHJhY2tzIGl0LCBpZiBtaXNzIHB1c2hlcyBjb29yZCB0byBtaXNzZWQgc2hvdHMgYXJyYXlcclxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGF0dGFja0Nvb3JkKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlZFNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgXHJcbiAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXS5jb29yZGluYXRlcztcclxuICAgICAgZm9yIChjb25zdCBzaGlwQ29vcmQgb2Ygc2hpcENvb3Jkcykge1xyXG4gICAgICAgIGlmIChzaGlwQ29vcmQgPT09IGF0dGFja0Nvb3JkKSB7XHJcbiAgICAgICAgICBjb25zdCBoaXRTaGlwID0gT2JqZWN0LnZhbHVlcyhwbGFjZWRTaGlwc1tpXSlbMF07XHJcbiAgICAgICAgICBoaXRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgcmV0dXJuIGhpdFNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtaXNzZWRTaG90cy5wdXNoKGF0dGFja0Nvb3JkKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICAvLyBjaGVja3MgaWYgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXHJcbiAgY29uc3QgYWxsU2hpcHNTdW5rZWQgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlZFNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluc3BlY3RlZFNoaXAgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXTtcclxuICAgICAgaWYgKGluc3BlY3RlZFNoaXAuZ2V0U3VuaygpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJvYXJkLFxyXG4gICAgcGxhY2VTaGlwLFxyXG4gICAgZ2V0cGxhY2VkU2hpcHMsXHJcbiAgICBnZXRNaXNzZWRTaG90cyxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBhbGxTaGlwc1N1bmtlZCxcclxuICAgIHBsYWNlZFNoaXBzLFxyXG4gIH07XHJcbn07XHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAgIC8vdHJhY2tpbmcgdHVybiBhbmQgY2hhbmdlcyB0dXJuXHJcbiAgICBsZXQgdHVybiA9IGZhbHNlO1xyXG4gICAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+ICh0dXJuID0gIXR1cm4pO1xyXG4gICAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHR1cm47XHJcblxyXG4gICAgLy9jcmVhdGVzIHBsYXllciBnYW1lYm9hcmRcclxuICAgIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gICAgLy90YWtlcyBlbmVteSBib2FyZCBhbmQgY29vcmQgdGhhdCBpcyBzaG9vdCB0YXJnZXQgYW5kIHJldHVybiBmYWxzZSB3aGVuIG1pc3Mgb3IgaGl0dGVkIFNoaXAgd2hlbiBoaXRcclxuICAgIGNvbnN0IHNob290ID0gKGVuZW15Qm9hcmQsIGNvb3JkKSA9PiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xyXG4gICAgcmV0dXJuIHsgdHVybiwgY2hhbmdlVHVybiwgYm9hcmQsIHNob290LCBnZXRUdXJuIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgICAvL3Rha2VzIGluaGFyaXRhbmNlIGZyb20gcGxheWVyIGZhY3RvcnkgZnVuY3Rpb25cclxuICAgIGNvbnN0IHByb3RvdHlwZSA9IHBsYXllcigpO1xyXG5cclxuICAgIGNvbnN0IGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQgPSBbXHJcbiAgICAgICAgXCJhMVwiLFxyXG4gICAgICAgIFwiYjFcIixcclxuICAgICAgICBcImMxXCIsXHJcbiAgICAgICAgXCJkMVwiLFxyXG4gICAgICAgIFwiZTFcIixcclxuICAgICAgICBcImYxXCIsXHJcbiAgICAgICAgXCJnMVwiLFxyXG4gICAgICAgIFwiaDFcIixcclxuICAgICAgICBcImkxXCIsXHJcbiAgICAgICAgXCJqMVwiLFxyXG4gICAgICAgIFwiYTJcIixcclxuICAgICAgICBcImIyXCIsXHJcbiAgICAgICAgXCJjMlwiLFxyXG4gICAgICAgIFwiZDJcIixcclxuICAgICAgICBcImUyXCIsXHJcbiAgICAgICAgXCJmMlwiLFxyXG4gICAgICAgIFwiZzJcIixcclxuICAgICAgICBcImgyXCIsXHJcbiAgICAgICAgXCJpMlwiLFxyXG4gICAgICAgIFwiajJcIixcclxuICAgICAgICBcImEzXCIsXHJcbiAgICAgICAgXCJiM1wiLFxyXG4gICAgICAgIFwiYzNcIixcclxuICAgICAgICBcImQzXCIsXHJcbiAgICAgICAgXCJlM1wiLFxyXG4gICAgICAgIFwiZjNcIixcclxuICAgICAgICBcImczXCIsXHJcbiAgICAgICAgXCJoM1wiLFxyXG4gICAgICAgIFwiaTNcIixcclxuICAgICAgICBcImozXCIsXHJcbiAgICAgICAgXCJhNFwiLFxyXG4gICAgICAgIFwiYjRcIixcclxuICAgICAgICBcImM0XCIsXHJcbiAgICAgICAgXCJkNFwiLFxyXG4gICAgICAgIFwiZTRcIixcclxuICAgICAgICBcImY0XCIsXHJcbiAgICAgICAgXCJnNFwiLFxyXG4gICAgICAgIFwiaDRcIixcclxuICAgICAgICBcImk0XCIsXHJcbiAgICAgICAgXCJqNFwiLFxyXG4gICAgICAgIFwiYTVcIixcclxuICAgICAgICBcImI1XCIsXHJcbiAgICAgICAgXCJjNVwiLFxyXG4gICAgICAgIFwiZDVcIixcclxuICAgICAgICBcImU1XCIsXHJcbiAgICAgICAgXCJmNVwiLFxyXG4gICAgICAgIFwiZzVcIixcclxuICAgICAgICBcImg1XCIsXHJcbiAgICAgICAgXCJpNVwiLFxyXG4gICAgICAgIFwiajVcIixcclxuICAgICAgICBcImE2XCIsXHJcbiAgICAgICAgXCJiNlwiLFxyXG4gICAgICAgIFwiYzZcIixcclxuICAgICAgICBcImQ2XCIsXHJcbiAgICAgICAgXCJlNlwiLFxyXG4gICAgICAgIFwiZjZcIixcclxuICAgICAgICBcImc2XCIsXHJcbiAgICAgICAgXCJoNlwiLFxyXG4gICAgICAgIFwiaTZcIixcclxuICAgICAgICBcImo2XCIsXHJcbiAgICAgICAgXCJhN1wiLFxyXG4gICAgICAgIFwiYjdcIixcclxuICAgICAgICBcImM3XCIsXHJcbiAgICAgICAgXCJkN1wiLFxyXG4gICAgICAgIFwiZTdcIixcclxuICAgICAgICBcImY3XCIsXHJcbiAgICAgICAgXCJnN1wiLFxyXG4gICAgICAgIFwiaDdcIixcclxuICAgICAgICBcImk3XCIsXHJcbiAgICAgICAgXCJqN1wiLFxyXG4gICAgICAgIFwiYThcIixcclxuICAgICAgICBcImI4XCIsXHJcbiAgICAgICAgXCJjOFwiLFxyXG4gICAgICAgIFwiZDhcIixcclxuICAgICAgICBcImU4XCIsXHJcbiAgICAgICAgXCJmOFwiLFxyXG4gICAgICAgIFwiZzhcIixcclxuICAgICAgICBcImg4XCIsXHJcbiAgICAgICAgXCJpOFwiLFxyXG4gICAgICAgIFwiajhcIixcclxuICAgICAgICBcImE5XCIsXHJcbiAgICAgICAgXCJiOVwiLFxyXG4gICAgICAgIFwiYzlcIixcclxuICAgICAgICBcImQ5XCIsXHJcbiAgICAgICAgXCJlOVwiLFxyXG4gICAgICAgIFwiZjlcIixcclxuICAgICAgICBcImc5XCIsXHJcbiAgICAgICAgXCJoOVwiLFxyXG4gICAgICAgIFwiaTlcIixcclxuICAgICAgICBcImo5XCIsXHJcbiAgICAgICAgXCJhMTBcIixcclxuICAgICAgICBcImIxMFwiLFxyXG4gICAgICAgIFwiYzEwXCIsXHJcbiAgICAgICAgXCJkMTBcIixcclxuICAgICAgICBcImUxMFwiLFxyXG4gICAgICAgIFwiZjEwXCIsXHJcbiAgICAgICAgXCJnMTBcIixcclxuICAgICAgICBcImgxMFwiLFxyXG4gICAgICAgIFwiaTEwXCIsXHJcbiAgICAgICAgXCJqMTBcIixcclxuICAgIF07XHJcblxyXG4gICAgLy8gcmV0dXJuaW5nIHJhbmRvbSBpbmRleCBmcm9tIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRcclxuICAgIGNvbnN0IGNob29zZVRhcmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhbGlhYmxlQ29vcmRUb1RhcmdldC5sZW5ndGgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3Rha2VzIHNob3QgYXQgZW5lbXkgYm9hcmQgd2l0aCBjb29yZCBmcm9tIGNob29zZVRhcmdldCgpIGFuZCByZW1vdmVzIHRoYXQgY29vcmQgZnJvbSBhdmFpbGlhYmxlIGNvb3Jkc1xyXG4gICAgY29uc3Qgc2hvb3RDb21wID0gKGVuZW15Qm9hcmQsIGNvb3JkID0gY2hvb3NlVGFyZ2V0KCkpID0+IHtcclxuICAgICAgICBjb25zdCBoaXRTaGlwID0gIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhhdmFsaWFibGVDb29yZFRvVGFyZ2V0W2Nvb3JkXSk7XHJcbiAgICAgICAgYXZhbGlhYmxlQ29vcmRUb1RhcmdldC5zcGxpY2UoY29vcmQsIDEpO1xyXG4gICAgICAgIHJldHVybiBbaGl0U2hpcCwgYXZhbGlhYmxlQ29vcmRUb1RhcmdldFtjb29yZF1dXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zdCBwbGFjZUNvbXBTaGlwcyA9IChib2FyZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpXHJcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbe1xyXG4gICAgICAgICAgICBzdWJtYXJpbmUxOiBbXCJhMVwiXSxcclxuICAgICAgICAgICAgc3VibWFyaW5lMjogW1wiYTNcIl0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjE6IFsnZDMnLCAnZDQnXSxcclxuICAgICAgICAgICAgZGVzdHJveWVyMjogWydoOScsICdpOSddLFxyXG4gICAgICAgICAgICBjcnVpc2VyOiBbJ2IxMCcsICdjMTAnLCAnZDEwJ10sXHJcbiAgICAgICAgICAgIGJhdHRsZXNoaXA6IFsnaTEnLCAnaTInLCAnaTMnLCAnaTQnXSxcclxuICAgICAgICAgICAgYWlyY3JhZnRDYXJyaWVyOiBbJ2U3JywgJ2Y3JywgJ2c3JywgJ2g3JywgJ2k3J10sXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzdWJtYXJpbmUxOiBbXCJkMVwiXSxcclxuICAgICAgICAgICAgc3VibWFyaW5lMjogW1wiZzlcIl0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjE6IFsnajQnLCAnajUnXSxcclxuICAgICAgICAgICAgZGVzdHJveWVyMjogWydkMTAnLCAnZTEwJ10sXHJcbiAgICAgICAgICAgIGNydWlzZXI6IFsnaTgnLCAnaTknLCAnaTEwJ10sXHJcbiAgICAgICAgICAgIGJhdHRsZXNoaXA6IFsnYjQnLCAnYzQnLCAnZDQnLCAnZTQnXSxcclxuICAgICAgICAgICAgYWlyY3JhZnRDYXJyaWVyOiBbJ2E2JywgJ2E3JywgJ2E4JywgJ2E5JywgJ2ExMCddLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc3VibWFyaW5lMTogW1wiZzVcIl0sXHJcbiAgICAgICAgICAgIHN1Ym1hcmluZTI6IFtcImk5XCJdLFxyXG4gICAgICAgICAgICBkZXN0cm95ZXIxOiBbJ2kyJywgJ2oyJ10sXHJcbiAgICAgICAgICAgIGRlc3Ryb3llcjI6IFsnYzEnLCAnYzInXSxcclxuICAgICAgICAgICAgY3J1aXNlcjogWydhNycsICdiNycsICdjNyddLFxyXG4gICAgICAgICAgICBiYXR0bGVzaGlwOiBbJ2U3JywgJ2U4JywgJ2U5JywgJ2UxMCddLFxyXG4gICAgICAgICAgICBhaXJjcmFmdENhcnJpZXI6IFsnYTQnLCAnYjQnLCAnYzQnLCAnZDQnLCAnZTQnXSxcclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IFtzaGlwICxjb29yZHNdIG9mIE9iamVjdC5lbnRyaWVzKHNoaXBzW251bV0pKXtcclxuICAgICAgICAgICBib2FyZC5wbGFjZVNoaXAoc2hpcCwgY29vcmRzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3JldHVybnMgb2JqZWN0IHdpdGggYWxsIG1ldGhvZHMgYW5kIHByb3Blcml0ZXMgaW5oZXJ0ZXRlZCBmcm9tIHBsYXllclxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHByb3RvdHlwZSwge1xyXG4gICAgICAgIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQsXHJcbiAgICAgICAgY2hvb3NlVGFyZ2V0LFxyXG4gICAgICAgIHNob290Q29tcCxcclxuICAgICAgICBwbGFjZUNvbXBTaGlwcyxcclxuICAgIH0pO1xyXG59O1xyXG4iLCIvL2ZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGFsbCB0eXBlIG9mIHNoaXBzIGFuZCBhdHRyaWJ1dCBtZXRob2QgdG8gdGhlbVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXAgPSAoc2hpcExlbmd0aCkgPT4ge1xyXG4gIGNvbnN0IGxlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XHJcblxyXG4gIC8vIHN0YXR1cyBvZiBzaGlwXHJcbiAgbGV0IHN1bmsgPSBmYWxzZTtcclxuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcclxuXHJcbiAgLy90cmFja2luZyBudW1iZXIgb2YgaGl0cyB0byB0aGUgc2hpcFxyXG4gIGxldCBoaXROdW1iZXIgPSAwO1xyXG4gIC8vcmV0dXJuIG51bWJlciBvZiBoaXRzXHJcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdE51bWJlcjtcclxuXHJcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xyXG4gICAgaGl0TnVtYmVyKys7XHJcbiAgICBpZiAoaGl0TnVtYmVyID49IGxlbmd0aCgpKSB7XHJcbiAgICAgIHN1bmsgPSB0cnVlO1xyXG4gICAgfX1cclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgY29uc3Qgc2V0Q29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XHJcbiAgICAgIGlmKGNvb3Jkcy5sZW5ndGggIT09IGxlbmd0aCgpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBvZiBjb29yZGluYXRlcyBoYXZlIHRvIGJlIGVxdWFsIHRvIGxlbmd0aCBvZiB0aGUgc2hpcCcpXHJcbiAgICAgIH1cclxuICAgICAgdHJ5e1xyXG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzID0gKCkgPT4gY29vcmRpbmF0ZXM7XHJcbiAgXHJcblxyXG4gIHJldHVybiB7IGxlbmd0aCwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0LCBzZXRDb29yZGluYXRlcywgZ2V0Q29vcmRpbmF0ZXMsY29vcmRpbmF0ZXN9O1xyXG59O1xyXG4iLCIvL2dpdmVuIHN0YXJ0aW5nIGVuZCBlbmRpbmcgY29vcmRzLCBiYXNlZCBvZiB2ZXJ0aWNhbC9sZXZlbCBtYWtpbmcgYXJyYXkgdGhhdCBcclxuaW1wb3J0IHsgZGVjbGFyZVdpbm5lciB9IGZyb20gXCIuL2RvbVwiO1xyXG5leHBvcnQgY29uc3QgbWFrZUNvb3JkcyA9IChzdGFydENvb3JkLCBlbmRDb29yZCwgbGVuZ3RoeSkgPT4ge1xyXG4gICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICBjb25zdCBjb29yZHMgPSBbXVxyXG4gICAgaWYgKGxlbmd0aHkgPT09IDEpIHtcclxuICAgICAgICBjb29yZHMucHVzaChzdGFydENvb3JkKVxyXG4gICAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aHk7IGkrKykge1xyXG4gICAgICAgIGlmIChzdGFydENvb3JkWzBdID09PSBlbmRDb29yZFswXSkge1xyXG4gICAgICAgICAgICBjb29yZHMucHVzaChgJHtzdGFydENvb3JkWzBdfSR7TnVtYmVyKHN0YXJ0Q29vcmRbMV0pICsgaX1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzdGFydENvb3JkWzFdID09PSBlbmRDb29yZFsxXSkge1xyXG4gICAgICAgICAgICBjb29yZHMucHVzaChgJHtsZXR0ZXJzW2xldHRlcnMuZmluZEluZGV4KGxldHRlciA9PiBsZXR0ZXIgPT09IHN0YXJ0Q29vcmRbMF0pICsgaV19JHtlbmRDb29yZFsxXX1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZHM7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtVmFsaWRhdGlvbiA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlcyBuZWVkIHRvIGJlIDIgb3IgMyBjaGFyYWN0ZXJzIGxvbmcnKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyVHVybiA9IChjb21wdXRlciwgZW5lbXkpID0+IHtcclxuICAgIGlmIChjb21wdXRlci5nZXRUdXJuKCkpIHtcclxuICAgICAgICBjb25zdCBoaXRTaGlwID0gY29tcHV0ZXIuc2hvb3RDb21wKGVuZW15LmJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGNvb3JkID0gaGl0U2hpcFsxXVxyXG4gICAgICAgIGNvbnN0IGRpdkNvb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcmNlbGxbZGF0YS1jb29yZGluYXRlcz0nJHtjb29yZH0nXWApXHJcbiAgICAgICAgaWYgKGhpdFNoaXBbMF0pIHtcclxuICAgICAgICAgICAgZGl2Q29vcmQuY2xhc3NMaXN0LmFkZCgnaGl0JylcclxuICAgICAgICAgICAgaWYgKGhpdFNoaXAuZ2V0U3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5lbXkuYm9hcmQuYWxsU2hpcHNTdW5rZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY2xhcmVXaW5uZXIoJ3BsYXllcicpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRpdkNvb3JkLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb21wdXRlci5jaGFuZ2VUdXJuKClcclxuICAgICAgICBlbmVteS5jaGFuZ2VUdXJuKClcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcclxuXHJcblxyXG5nYW1lKClcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==