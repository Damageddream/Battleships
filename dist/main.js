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
/* harmony export */   "submitHandler": () => (/* binding */ submitHandler)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");



//creating grid 10x10 with rows 1-10 and columns a-j, setting every data sett of cell to match coordinates
const createBoard = (player) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const playerBoard = document.querySelector(`.${player}` + 'board')
    console.log(playerBoard)

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

const clickHandlerCoords = (player) => {
    const allCells = document.querySelectorAll(`.${player}` + 'cell')
    allCells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log(cell)
        })
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
    const legend = document.querySelector('legend')
    legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
    const form = document.querySelector('form')
    const submitForm = (board)=>{form.addEventListener('submit', (e) => {
        e.preventDefault()
        const coordStart = e.target[0].value.trim().toLowerCase()
        const coordEnd = e.target[1].value.trim().toLowerCase()
        const coords = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.makeCoords)(coordStart, coordEnd, ships[0][1])
        try{
            board.placeShip(ships[0][0], coords)
            ships.shift()
            legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
        }
        catch(error){
            console.log(error)
        }

    })}
    return {submitForm}
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
  const getTurn = ()=>turn

  //creates player gameboard
  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)();

  //takes enemy board and coord that is shoot target and return false when miss or hitted Ship when hit
  const shoot = (enemyBoard, coord) => enemyBoard.receiveAttack(coord);
  return { turn, changeTurn, board, shoot, getTurn };
};



const computer = () => {
    //takes inharitance from player factory function
    const prototype = player()

    const avaliableCoordToTarget = [
        "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1", "j1",
        "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2",
        "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3",
        "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4",
        "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", "j5",
        "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", "j6",    
        "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7", "j7",    
        "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8", "j8",    
        "a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9", "j9",    
        "a10", "b10", "c10", "d10", "e10", "f10", "g10", "h10", "i10", "j10"
    ]

    // returning random index from avaliableCoordToTarget
    const chooseTarget = () => {
        return Math.floor(Math.random() * avaliableCoordToTarget.length)
    }

    //takes shot at enemy board with coord from chooseTarget() and removes that coord from availiable coords
    const shootComp = (enemyBoard, coord = chooseTarget()) => {
        console.log(avaliableCoordToTarget[coord])
        enemyBoard.receiveAttack(avaliableCoordToTarget[coord])
        avaliableCoordToTarget.splice(coord, 1)
    }

    const placeShips = ()=>{
        const ships = {
            "submarine1": {1:['a1'],
        2:['a4'], 3:['a6']},
            "submarine2": 1,
            "destroyer1": 2,
            "destroyer2": 2,
            "cruiser": 3,
            "battleship": 4,
            "aircraftCarrier": 5,
        }
    }


    //returns object with all methods and properites inherteted from player
    return Object.assign({}, prototype, {avaliableCoordToTarget, chooseTarget, shootComp})
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
/* harmony export */   "makeCoords": () => (/* binding */ makeCoords)
/* harmony export */ });
//given starting end ending coords, based of vertical/level making array that 

const makeCoords = (startCoord, endCoord, lengthy) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const coords = []
    if(lengthy === 1){
        coords.push(startCoord)
        return coords;
    }
    for (let i = 0; i < lengthy; i++) {
        if (startCoord[0] === endCoord[0]) {
            coords.push(`${startCoord[0]}${i+1}`)
        }
        else if(startCoord[1] === endCoord[1]){
            coords.push(`${letters[letters.findIndex(letter=>letter===startCoord[0])+i]}${endCoord[1]}`)
        }
    }
    return coords;
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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const Player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)()
const Computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computer)()

;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.createBoard)('player')
;(0,_dom__WEBPACK_IMPORTED_MODULE_1__.clickHandlerCoords)('player')

const submit = (0,_dom__WEBPACK_IMPORTED_MODULE_1__.submitHandler)()
submit.submitForm(Player1.board)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztVQ2xCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QztBQUMwQjtBQUN0RTtBQUNBLGdCQUFnQiwrQ0FBTTtBQUN0QixpQkFBaUIsaURBQVE7QUFDekI7QUFDQSxrREFBVztBQUNYLHlEQUFrQjtBQUNsQjtBQUNBLGVBQWUsbURBQWE7QUFDNUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcbmltcG9ydCB7IG1ha2VDb29yZHMgfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcclxuXHJcbi8vY3JlYXRpbmcgZ3JpZCAxMHgxMCB3aXRoIHJvd3MgMS0xMCBhbmQgY29sdW1ucyBhLWosIHNldHRpbmcgZXZlcnkgZGF0YSBzZXR0IG9mIGNlbGwgdG8gbWF0Y2ggY29vcmRpbmF0ZXNcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BsYXllcn1gICsgJ2JvYXJkJylcclxuICAgIGNvbnNvbGUubG9nKHBsYXllckJvYXJkKVxyXG5cclxuICAgIGxldHRlcnMuZm9yRWFjaChsZXR0ZXIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRpdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgZGl2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGNvbHVtbmApXHJcbiAgICAgICAgZGl2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYCR7bGV0dGVyfWApXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKGAke3BsYXllcn1jZWxsYClcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxyXG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBgJHtsZXR0ZXJ9JHtpICsgMX1gXHJcbiAgICAgICAgICAgIGRpdi5kYXRhc2V0LmNvb3JkaW5hdGVzID0gYCR7bGV0dGVyfSR7aSArIDF9YFxyXG4gICAgICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KVxyXG4gICAgICAgIH1cclxuICAgICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChkaXZDb250YWluZXIpXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xpY2tIYW5kbGVyQ29vcmRzID0gKHBsYXllcikgPT4ge1xyXG4gICAgY29uc3QgYWxsQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwbGF5ZXJ9YCArICdjZWxsJylcclxuICAgIGFsbENlbGxzLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2VsbClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN1Ym1pdEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzaGlwcyA9IFtcclxuICAgICAgICBbXCJzdWJtYXJpbmUxXCIsIDEsXSxcclxuICAgICAgICBbXCJzdWJtYXJpbmUyXCIsIDEsXSxcclxuICAgICAgICBbXCJkZXN0cm95ZXIxXCIsIDIsXSxcclxuICAgICAgICBbXCJkZXN0cm95ZXIyXCIsIDIsXSxcclxuICAgICAgICBbXCJjcnVpc2VyXCIsIDMsXSxcclxuICAgICAgICBbXCJiYXR0bGVzaGlwXCIsIDQsXSxcclxuICAgICAgICBbXCJhaXJjcmFmdENhcnJpZXJcIiwgNV0sXHJcbiAgICBdXHJcbiAgICBjb25zdCBsZWdlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsZWdlbmQnKVxyXG4gICAgbGVnZW5kLnRleHRDb250ZW50ID0gYCR7c2hpcHNbMF1bMF19IHdpdGggbGVuZ3RoIG9mICR7c2hpcHNbMF1bMV19YFxyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxyXG4gICAgY29uc3Qgc3VibWl0Rm9ybSA9IChib2FyZCk9Pntmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgY29uc3QgY29vcmRTdGFydCA9IGUudGFyZ2V0WzBdLnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgY29uc3QgY29vcmRFbmQgPSBlLnRhcmdldFsxXS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IG1ha2VDb29yZHMoY29vcmRTdGFydCwgY29vcmRFbmQsIHNoaXBzWzBdWzFdKVxyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgYm9hcmQucGxhY2VTaGlwKHNoaXBzWzBdWzBdLCBjb29yZHMpXHJcbiAgICAgICAgICAgIHNoaXBzLnNoaWZ0KClcclxuICAgICAgICAgICAgbGVnZW5kLnRleHRDb250ZW50ID0gYCR7c2hpcHNbMF1bMF19IHdpdGggbGVuZ3RoIG9mICR7c2hpcHNbMF1bMV19YFxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KX1cclxuICAgIHJldHVybiB7c3VibWl0Rm9ybX1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgc2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgYm9hcmQgPSBbXHJcbiAgICBbXCJhMVwiLCBcImIxXCIsIFwiYzFcIiwgXCJkMVwiLCBcImUxXCIsIFwiZjFcIiwgXCJnMVwiLCBcImgxXCIsIFwiaTFcIiwgXCJqMVwiXSxcclxuICAgIFtcImEyXCIsIFwiYjJcIiwgXCJjMlwiLCBcImQyXCIsIFwiZTJcIiwgXCJmMlwiLCBcImcyXCIsIFwiaDJcIiwgXCJpMlwiLCBcImoyXCJdLFxyXG4gICAgW1wiYTNcIiwgXCJiM1wiLCBcImMzXCIsIFwiZDNcIiwgXCJlM1wiLCBcImYzXCIsIFwiZzNcIiwgXCJoM1wiLCBcImkzXCIsIFwiajNcIl0sXHJcbiAgICBbXCJhNFwiLCBcImI0XCIsIFwiYzRcIiwgXCJkNFwiLCBcImU0XCIsIFwiZjRcIiwgXCJnNFwiLCBcImg0XCIsIFwiaTRcIiwgXCJqNFwiXSxcclxuICAgIFtcImE1XCIsIFwiYjVcIiwgXCJjNVwiLCBcImQ1XCIsIFwiZTVcIiwgXCJmNVwiLCBcImc1XCIsIFwiaDVcIiwgXCJpNVwiLCBcImo1XCJdLFxyXG4gICAgW1wiYTZcIiwgXCJiNlwiLCBcImM2XCIsIFwiZDZcIiwgXCJlNlwiLCBcImY2XCIsIFwiZzZcIiwgXCJoNlwiLCBcImk2XCIsIFwiajZcIl0sXHJcbiAgICBbXCJhN1wiLCBcImI3XCIsIFwiYzdcIiwgXCJkN1wiLCBcImU3XCIsIFwiZjdcIiwgXCJnN1wiLCBcImg3XCIsIFwiaTdcIiwgXCJqN1wiXSxcclxuICAgIFtcImE4XCIsIFwiYjhcIiwgXCJjOFwiLCBcImQ4XCIsIFwiZThcIiwgXCJmOFwiLCBcImc4XCIsIFwiaDhcIiwgXCJpOFwiLCBcImo4XCJdLFxyXG4gICAgW1wiYTlcIiwgXCJiOVwiLCBcImM5XCIsIFwiZDlcIiwgXCJlOVwiLCBcImY5XCIsIFwiZzlcIiwgXCJoOVwiLCBcImk5XCIsIFwiajlcIl0sXHJcbiAgICBbXCJhMTBcIiwgXCJiMTBcIiwgXCJjMTBcIiwgXCJkMTBcIiwgXCJlMTBcIiwgXCJmMTBcIiwgXCJnMTBcIiwgXCJoMTBcIiwgXCJpMTBcIiwgXCJqMTBcIl0sXHJcbiAgXTtcclxuICAvL3NoaXBzIGFuZCBjb29yZGluYXRlcyBvZiBzaGlwcyB0aGF0IGFscmVhZHkgaGF2ZSBiZWVuIHBsYWNlZFxyXG4gIGNvbnN0IHBsYWNlZFNoaXBzID0gW107XHJcbiAgY29uc3QgZ2V0cGxhY2VkU2hpcHMgPSAoKSA9PiBwbGFjZWRTaGlwcztcclxuICAvLyBjZWxscyB0aGF0IGhhdmUgc2hpcHMgb24gdGhlbSBvciBhcmUgYWRqY2VudGVzIHRvIHNoaXBzXHJcbiAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xyXG4gIC8vIHRyYWNraW5nIGNlbGxzIHRoYXQgYmVlbiBzaG90IGFuZCB3ZXJlIG1pc3NcclxuICBjb25zdCBtaXNzZWRTaG90cyA9IFtdO1xyXG4gIGNvbnN0IGdldE1pc3NlZFNob3RzID0gKCkgPT4gbWlzc2VkU2hvdHM7XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgXCJzdWJtYXJpbmUxXCIsXHJcbiAgICBcInN1Ym1hcmluZTJcIixcclxuICAgIFwiZGVzdHJveWVyMVwiLFxyXG4gICAgXCJkZXN0cm95ZXIyXCIsXHJcbiAgICBcImNydWlzZXJcIixcclxuICAgIFwiYmF0dGxlc2hpcFwiLFxyXG4gICAgXCJhaXJjcmFmdENhcnJpZXJcIixcclxuICBdO1xyXG5cclxuICAvL2NoZWNraW5nIGlmIGNvb3JkaW5hdGVzIGFyZSBhbGxvd2VkIGFuZCBwbGFjaW5nIHNoaXBzIGluIHBsYWNlZFNoaXBzXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBUeXBlLCBjb29yZHMpID0+IHtcclxuICAgIC8vbGlzdCBvZiBjZWxscyB0aGF0IGxhcmVhZHkgaGF2IHNoaXBzIG9uIHRoZW1cclxuXHJcbiAgICBsZXQgc2hpcE5hbWU7XHJcblxyXG4gICAgLy9jaGVja3MgaWYgcGFzc2VkIHNoaXAgZXhpc3RzXHJcbiAgICBjb25zdCBjaGVja0V4aXN0ZW5jZU9mU2hpcCA9ICgpID0+IHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHNoaXBzKSB7XHJcbiAgICAgICAgaWYgKHNoaXBUeXBlID09PSBpdGVtKSB7XHJcbiAgICAgICAgICBzaGlwTmFtZSA9IHNoaXBUeXBlO1xyXG4gICAgICAgICAgc2hpcHMuc3BsaWNlKHNoaXBzLmluZGV4T2YoaXRlbSksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVjayBpZiBwYXNzZWQgY29vcmQgZXhpc3RzXHJcbiAgICBjb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByZWdleCA9IC9eW2Etal0oMTB8WzEtOV0pJC87XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKCFyZWdleC50ZXN0KGNvb3JkKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIHBhc3NlZCBjb3JkcyBhcmUgYWxsb3dlZCBwb3NpdGlvbmFsbHlcclxuICAgIGNvbnN0IGNoZWNrUGxhY2VtZW50ID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgICAgbGV0IGxldmVsID0gZmFsc2U7XHJcbiAgICAgIGxldCB2ZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVswXSA9PT1cclxuICAgICAgICBsZXR0ZXJzW2xldHRlcnMuZmluZEluZGV4KChsZXR0ZXIpID0+IGxldHRlciA9PT0gY29vcmRzWzBdWzBdKSArXHJcbiAgICAgICAgICAgIChjb29yZHMubGVuZ3RoIC0gMSldICYmXHJcbiAgICAgICAgY29vcmRzWzBdWzFdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxldmVsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29vcmRzWzBdWzBdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzBdICYmXHJcbiAgICAgICAgTnVtYmVyKGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMV0pID09PVxyXG4gICAgICAgICAgTnVtYmVyKGNvb3Jkc1swICsgKGNvb3Jkcy5sZW5ndGggLSAxKV1bMV0pXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmVydGljYWwgfHwgbGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNoZWNrSWZDZWxsT2NjdXBpZWQgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGRlZCBDZWxsIGZyb20gY29vcmQgYW5kIGFkamFjZW50IGNlbGxzIHRvIG9jY3VwaWVkIGNlbGxzXHJcbiAgICBjb25zdCBhZGRPY2N1cGllZENlbGxzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjb29yZExldHRlciA9IGNvb3Jkc1tpXVswXTtcclxuICAgICAgICBjb25zdCBjb29yZE51bWJlciA9IGNvb3Jkc1tpXVsxXTtcclxuICAgICAgICBjb25zdCBJbmRleEluTGV0dGVycyA9IGxldHRlcnMuaW5kZXhPZihjb29yZHNbaV1bMF0pO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IFtcclxuICAgICAgICAgIGNvb3Jkc1tpXSxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YCxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YCxcclxuICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke2Nvb3JkTnVtYmVyfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gY29vcmRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgKyAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vZmlsdGVydGluZyBvY2N1cGllZCBjZWxscyBmcm9tIHJlcGV0aW5nIGNlbGxzIGFuZCBjZWxscyBvdXQgb2YgYm91bmRcclxuICAgIGNvbnN0IGZpbHRlck9jY3VwaWVkQ2VsbHMgPSAocmFkaXVzID0gYWRkT2NjdXBpZWRDZWxscygpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL15bYS1qXSgxMHxbMS05XSkkLztcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiByYWRpdXMpIHtcclxuICAgICAgICBpZiAocmVnZXgudGVzdChjb29yZCkgJiYgIW9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goY29vcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNraW5nIHNoaXBzIGFuZCBjb3JkcyBhZ2FpbnMgYWxsIGRlcGVuZGVjaWVzXHJcblxyXG4gICAgaWYgKCFjaGVja0Nvb3JkaW5hdGVzKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgb3V0IG9mIHJhbmdlIG9mIHRoZSBib2FyZCBvciBub3QgZXhpc3RzXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja1BsYWNlbWVudCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG9mIHNoaXAgaXMgbm90IGFsbG93ZWRcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNoZWNrSWZDZWxsT2NjdXBpZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgXCJZb3UgY2Fubm90IHBsYWNlIHNoaXAgaW4gb25lIG9mYWxyZWFkeSBvY2N1cGllZCBvciBhZGplY250ZXMgY2VsbHNcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja0V4aXN0ZW5jZU9mU2hpcCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgYWxyZWFkeSBiZWVuIHBsYWNlZCBvciBub3QgZXhpc3RzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZmlsdGVydGluZyBvY2N1cGllZCBjZWxscyBmcm9tIHJlcGV0aW5nIGNlbGxzIGFuZCBjZWxscyBvdXQgb2YgYm91bmRcclxuICAgIGZpbHRlck9jY3VwaWVkQ2VsbHMoKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBuZXcgc2hpcCBhbmQgcGFzc2VkIGNvcnJlY3QgY29yZHNcclxuICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwKGNvb3Jkcy5sZW5ndGgpO1xyXG4gICAgbmV3U2hpcC5zZXRDb29yZGluYXRlcyhjb29yZHMpO1xyXG4gICAgcGxhY2VkU2hpcHMucHVzaCh7IFtgJHtzaGlwTmFtZX1gXTogbmV3U2hpcCB9KTtcclxuICB9O1xyXG5cclxuICAvLyB0YWtlcyBjb29yZCB0aGF0IHdhcyBzaG90LCBjaGVja3MgaWYgc2hpcCB3YXMgaGl0IGFuZCB0cmFja3MgaXQsIGlmIG1pc3MgcHVzaGVzIGNvb3JkIHRvIG1pc3NlZCBzaG90cyBhcnJheVxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrQ29vcmQpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VkU2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXS5jb29yZGluYXRlcztcclxuICAgICAgZm9yIChjb25zdCBzaGlwQ29vcmQgb2Ygc2hpcENvb3Jkcykge1xyXG4gICAgICAgIGlmIChzaGlwQ29vcmQgPT09IGF0dGFja0Nvb3JkKSB7XHJcbiAgICAgICAgICBjb25zdCBoaXRTaGlwID0gT2JqZWN0LnZhbHVlcyhwbGFjZWRTaGlwc1tpXSlbMF07XHJcbiAgICAgICAgICBoaXRTaGlwLmhpdCgpO1xyXG4gICAgICAgICAgcmV0dXJuIGhpdFNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtaXNzZWRTaG90cy5wdXNoKGF0dGFja0Nvb3JkKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICAvLyBjaGVja3MgaWYgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXHJcbiAgY29uc3QgYWxsU2hpcHNTdW5rZWQgPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlZFNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluc3BlY3RlZFNoaXAgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXTtcclxuICAgICAgaWYgKGluc3BlY3RlZFNoaXAuZ2V0U3VuaygpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJvYXJkLFxyXG4gICAgcGxhY2VTaGlwLFxyXG4gICAgZ2V0cGxhY2VkU2hpcHMsXHJcbiAgICBnZXRNaXNzZWRTaG90cyxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBhbGxTaGlwc1N1bmtlZCxcclxuICAgIHBsYWNlZFNoaXBzLFxyXG4gIH07XHJcbn07XHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAvL3RyYWNraW5nIHR1cm4gYW5kIGNoYW5nZXMgdHVyblxyXG4gIGxldCB0dXJuID0gZmFsc2U7XHJcbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+ICh0dXJuID0gIXR1cm4pO1xyXG4gIGNvbnN0IGdldFR1cm4gPSAoKT0+dHVyblxyXG5cclxuICAvL2NyZWF0ZXMgcGxheWVyIGdhbWVib2FyZFxyXG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIC8vdGFrZXMgZW5lbXkgYm9hcmQgYW5kIGNvb3JkIHRoYXQgaXMgc2hvb3QgdGFyZ2V0IGFuZCByZXR1cm4gZmFsc2Ugd2hlbiBtaXNzIG9yIGhpdHRlZCBTaGlwIHdoZW4gaGl0XHJcbiAgY29uc3Qgc2hvb3QgPSAoZW5lbXlCb2FyZCwgY29vcmQpID0+IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZCk7XHJcbiAgcmV0dXJuIHsgdHVybiwgY2hhbmdlVHVybiwgYm9hcmQsIHNob290LCBnZXRUdXJuIH07XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlciA9ICgpID0+IHtcclxuICAgIC8vdGFrZXMgaW5oYXJpdGFuY2UgZnJvbSBwbGF5ZXIgZmFjdG9yeSBmdW5jdGlvblxyXG4gICAgY29uc3QgcHJvdG90eXBlID0gcGxheWVyKClcclxuXHJcbiAgICBjb25zdCBhdmFsaWFibGVDb29yZFRvVGFyZ2V0ID0gW1xyXG4gICAgICAgIFwiYTFcIiwgXCJiMVwiLCBcImMxXCIsIFwiZDFcIiwgXCJlMVwiLCBcImYxXCIsIFwiZzFcIiwgXCJoMVwiLCBcImkxXCIsIFwiajFcIixcclxuICAgICAgICBcImEyXCIsIFwiYjJcIiwgXCJjMlwiLCBcImQyXCIsIFwiZTJcIiwgXCJmMlwiLCBcImcyXCIsIFwiaDJcIiwgXCJpMlwiLCBcImoyXCIsXHJcbiAgICAgICAgXCJhM1wiLCBcImIzXCIsIFwiYzNcIiwgXCJkM1wiLCBcImUzXCIsIFwiZjNcIiwgXCJnM1wiLCBcImgzXCIsIFwiaTNcIiwgXCJqM1wiLFxyXG4gICAgICAgIFwiYTRcIiwgXCJiNFwiLCBcImM0XCIsIFwiZDRcIiwgXCJlNFwiLCBcImY0XCIsIFwiZzRcIiwgXCJoNFwiLCBcImk0XCIsIFwiajRcIixcclxuICAgICAgICBcImE1XCIsIFwiYjVcIiwgXCJjNVwiLCBcImQ1XCIsIFwiZTVcIiwgXCJmNVwiLCBcImc1XCIsIFwiaDVcIiwgXCJpNVwiLCBcImo1XCIsXHJcbiAgICAgICAgXCJhNlwiLCBcImI2XCIsIFwiYzZcIiwgXCJkNlwiLCBcImU2XCIsIFwiZjZcIiwgXCJnNlwiLCBcImg2XCIsIFwiaTZcIiwgXCJqNlwiLCAgICBcclxuICAgICAgICBcImE3XCIsIFwiYjdcIiwgXCJjN1wiLCBcImQ3XCIsIFwiZTdcIiwgXCJmN1wiLCBcImc3XCIsIFwiaDdcIiwgXCJpN1wiLCBcImo3XCIsICAgIFxyXG4gICAgICAgIFwiYThcIiwgXCJiOFwiLCBcImM4XCIsIFwiZDhcIiwgXCJlOFwiLCBcImY4XCIsIFwiZzhcIiwgXCJoOFwiLCBcImk4XCIsIFwiajhcIiwgICAgXHJcbiAgICAgICAgXCJhOVwiLCBcImI5XCIsIFwiYzlcIiwgXCJkOVwiLCBcImU5XCIsIFwiZjlcIiwgXCJnOVwiLCBcImg5XCIsIFwiaTlcIiwgXCJqOVwiLCAgICBcclxuICAgICAgICBcImExMFwiLCBcImIxMFwiLCBcImMxMFwiLCBcImQxMFwiLCBcImUxMFwiLCBcImYxMFwiLCBcImcxMFwiLCBcImgxMFwiLCBcImkxMFwiLCBcImoxMFwiXHJcbiAgICBdXHJcblxyXG4gICAgLy8gcmV0dXJuaW5nIHJhbmRvbSBpbmRleCBmcm9tIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRcclxuICAgIGNvbnN0IGNob29zZVRhcmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhbGlhYmxlQ29vcmRUb1RhcmdldC5sZW5ndGgpXHJcbiAgICB9XHJcblxyXG4gICAgLy90YWtlcyBzaG90IGF0IGVuZW15IGJvYXJkIHdpdGggY29vcmQgZnJvbSBjaG9vc2VUYXJnZXQoKSBhbmQgcmVtb3ZlcyB0aGF0IGNvb3JkIGZyb20gYXZhaWxpYWJsZSBjb29yZHNcclxuICAgIGNvbnN0IHNob290Q29tcCA9IChlbmVteUJvYXJkLCBjb29yZCA9IGNob29zZVRhcmdldCgpKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXZhbGlhYmxlQ29vcmRUb1RhcmdldFtjb29yZF0pXHJcbiAgICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRbY29vcmRdKVxyXG4gICAgICAgIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQuc3BsaWNlKGNvb3JkLCAxKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBsYWNlU2hpcHMgPSAoKT0+e1xyXG4gICAgICAgIGNvbnN0IHNoaXBzID0ge1xyXG4gICAgICAgICAgICBcInN1Ym1hcmluZTFcIjogezE6WydhMSddLFxyXG4gICAgICAgIDI6WydhNCddLCAzOlsnYTYnXX0sXHJcbiAgICAgICAgICAgIFwic3VibWFyaW5lMlwiOiAxLFxyXG4gICAgICAgICAgICBcImRlc3Ryb3llcjFcIjogMixcclxuICAgICAgICAgICAgXCJkZXN0cm95ZXIyXCI6IDIsXHJcbiAgICAgICAgICAgIFwiY3J1aXNlclwiOiAzLFxyXG4gICAgICAgICAgICBcImJhdHRsZXNoaXBcIjogNCxcclxuICAgICAgICAgICAgXCJhaXJjcmFmdENhcnJpZXJcIjogNSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vcmV0dXJucyBvYmplY3Qgd2l0aCBhbGwgbWV0aG9kcyBhbmQgcHJvcGVyaXRlcyBpbmhlcnRldGVkIGZyb20gcGxheWVyXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcHJvdG90eXBlLCB7YXZhbGlhYmxlQ29vcmRUb1RhcmdldCwgY2hvb3NlVGFyZ2V0LCBzaG9vdENvbXB9KVxyXG59O1xyXG4iLCIvL2ZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGFsbCB0eXBlIG9mIHNoaXBzIGFuZCBhdHRyaWJ1dCBtZXRob2QgdG8gdGhlbVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXAgPSAoc2hpcExlbmd0aCkgPT4ge1xyXG4gIGNvbnN0IGxlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XHJcblxyXG4gIC8vIHN0YXR1cyBvZiBzaGlwXHJcbiAgbGV0IHN1bmsgPSBmYWxzZTtcclxuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcclxuXHJcbiAgLy90cmFja2luZyBudW1iZXIgb2YgaGl0cyB0byB0aGUgc2hpcFxyXG4gIGxldCBoaXROdW1iZXIgPSAwO1xyXG4gIC8vcmV0dXJuIG51bWJlciBvZiBoaXRzXHJcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdE51bWJlcjtcclxuXHJcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xyXG4gICAgaGl0TnVtYmVyKys7XHJcbiAgICBpZiAoaGl0TnVtYmVyID49IGxlbmd0aCgpKSB7XHJcbiAgICAgIHN1bmsgPSB0cnVlO1xyXG4gICAgfX1cclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgY29uc3Qgc2V0Q29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XHJcbiAgICAgIGlmKGNvb3Jkcy5sZW5ndGggIT09IGxlbmd0aCgpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBvZiBjb29yZGluYXRlcyBoYXZlIHRvIGJlIGVxdWFsIHRvIGxlbmd0aCBvZiB0aGUgc2hpcCcpXHJcbiAgICAgIH1cclxuICAgICAgdHJ5e1xyXG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzID0gKCkgPT4gY29vcmRpbmF0ZXM7XHJcbiAgXHJcblxyXG4gIHJldHVybiB7IGxlbmd0aCwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0LCBzZXRDb29yZGluYXRlcywgZ2V0Q29vcmRpbmF0ZXMsY29vcmRpbmF0ZXN9O1xyXG59O1xyXG4iLCIvL2dpdmVuIHN0YXJ0aW5nIGVuZCBlbmRpbmcgY29vcmRzLCBiYXNlZCBvZiB2ZXJ0aWNhbC9sZXZlbCBtYWtpbmcgYXJyYXkgdGhhdCBcclxuXHJcbmV4cG9ydCBjb25zdCBtYWtlQ29vcmRzID0gKHN0YXJ0Q29vcmQsIGVuZENvb3JkLCBsZW5ndGh5KSA9PiB7XHJcbiAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgIGNvbnN0IGNvb3JkcyA9IFtdXHJcbiAgICBpZihsZW5ndGh5ID09PSAxKXtcclxuICAgICAgICBjb29yZHMucHVzaChzdGFydENvb3JkKVxyXG4gICAgICAgIHJldHVybiBjb29yZHM7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aHk7IGkrKykge1xyXG4gICAgICAgIGlmIChzdGFydENvb3JkWzBdID09PSBlbmRDb29yZFswXSkge1xyXG4gICAgICAgICAgICBjb29yZHMucHVzaChgJHtzdGFydENvb3JkWzBdfSR7aSsxfWApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoc3RhcnRDb29yZFsxXSA9PT0gZW5kQ29vcmRbMV0pe1xyXG4gICAgICAgICAgICBjb29yZHMucHVzaChgJHtsZXR0ZXJzW2xldHRlcnMuZmluZEluZGV4KGxldHRlcj0+bGV0dGVyPT09c3RhcnRDb29yZFswXSkraV19JHtlbmRDb29yZFsxXX1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb29yZHM7XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIGNsaWNrSGFuZGxlckNvb3Jkcywgc3VibWl0SGFuZGxlcn0gZnJvbSBcIi4vZG9tXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIxID0gcGxheWVyKClcclxuY29uc3QgQ29tcHV0ZXIgPSBjb21wdXRlcigpXHJcblxyXG5jcmVhdGVCb2FyZCgncGxheWVyJylcclxuY2xpY2tIYW5kbGVyQ29vcmRzKCdwbGF5ZXInKVxyXG5cclxuY29uc3Qgc3VibWl0ID0gc3VibWl0SGFuZGxlcigpXHJcbnN1Ym1pdC5zdWJtaXRGb3JtKFBsYXllcjEuYm9hcmQpXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==