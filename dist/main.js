/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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



const game = () => {

    const Player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)()
    const Computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.computer)()

    const placePlayerShips = ()=>{
        // Player1.board.placeShip("submarine1", ['a1'])
        // Player1.board.placeShip("submarine2", ['c1'])
        // Player1.board.placeShip("destroyer1", ['e1','e2'])
        Player1.board.placeShip("destroyer2", ['g2','h2'])
        // Player1.board.placeShip("cruiser", ['a4','b4', 'c4'])
        // Player1.board.placeShip("battleship", ['e4','e5', 'e4', 'e7'])
        // Player1.board.placeShip("aircraftCarrier", ['h4','h5', 'h4', 'h7', 'h8'])
    }

    const placeComputerShips = ()=>{
        // Computer.board.placeShip("submarine1", ['a1'])
        // Computer.board.placeShip("submarine2", ['c1'])
        // Computer.board.placeShip("destroyer1", ['e1','e2'])
        Computer.board.placeShip("destroyer2", ['g2','h2'])
        // Computer.board.placeShip("cruiser", ['a4','b4', 'c4'])
        // Computer.board.placeShip("battleship", ['e4','e5', 'e4', 'e7'])
        // Computer.board.placeShip("aircraftCarrier", ['h4','h5', 'h4', 'h7', 'h8'])
    }

    try{
        placePlayerShips()
    }
    catch(error){
        console.log(error)
    }

    try{
        placeComputerShips()
    }
    catch(error){
        console.log(error)
    }


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
      console.log(coords[0][0], coords[coords.length - 1][0])
      if (
        coords[coords.length - 1][0] ===
          letters.findIndex((letter) => letter === coords[0][0]) +
            (coords.length - 1) &&
        coords[0][1] === coords[coords.length - 1][1]
      ) {
        console.log('level')
        level = true;
      }
      if (
        coords[0][0] === coords[coords.length - 1][0] &&
        Number(coords[coords.length - 1][1]) ===
          Number(coords[0 + (coords.length - 1)][1])
      ) {
       console.log('vertical')
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
        enemyBoard.receiveAttack(avaliableCoordToTarget[coord])
        avaliableCoordToTarget.splice(coord, 1)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjLGdEQUFnRDtBQUN6Rjs7Ozs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7OztVQ3RDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQzlCO0FBQ0EsMkNBQUk7QUFDSjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgUGxheWVyMSA9IHBsYXllcigpXHJcbiAgICBjb25zdCBDb21wdXRlciA9IGNvbXB1dGVyKClcclxuXHJcbiAgICBjb25zdCBwbGFjZVBsYXllclNoaXBzID0gKCk9PntcclxuICAgICAgICAvLyBQbGF5ZXIxLmJvYXJkLnBsYWNlU2hpcChcInN1Ym1hcmluZTFcIiwgWydhMSddKVxyXG4gICAgICAgIC8vIFBsYXllcjEuYm9hcmQucGxhY2VTaGlwKFwic3VibWFyaW5lMlwiLCBbJ2MxJ10pXHJcbiAgICAgICAgLy8gUGxheWVyMS5ib2FyZC5wbGFjZVNoaXAoXCJkZXN0cm95ZXIxXCIsIFsnZTEnLCdlMiddKVxyXG4gICAgICAgIFBsYXllcjEuYm9hcmQucGxhY2VTaGlwKFwiZGVzdHJveWVyMlwiLCBbJ2cyJywnaDInXSlcclxuICAgICAgICAvLyBQbGF5ZXIxLmJvYXJkLnBsYWNlU2hpcChcImNydWlzZXJcIiwgWydhNCcsJ2I0JywgJ2M0J10pXHJcbiAgICAgICAgLy8gUGxheWVyMS5ib2FyZC5wbGFjZVNoaXAoXCJiYXR0bGVzaGlwXCIsIFsnZTQnLCdlNScsICdlNCcsICdlNyddKVxyXG4gICAgICAgIC8vIFBsYXllcjEuYm9hcmQucGxhY2VTaGlwKFwiYWlyY3JhZnRDYXJyaWVyXCIsIFsnaDQnLCdoNScsICdoNCcsICdoNycsICdoOCddKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBsYWNlQ29tcHV0ZXJTaGlwcyA9ICgpPT57XHJcbiAgICAgICAgLy8gQ29tcHV0ZXIuYm9hcmQucGxhY2VTaGlwKFwic3VibWFyaW5lMVwiLCBbJ2ExJ10pXHJcbiAgICAgICAgLy8gQ29tcHV0ZXIuYm9hcmQucGxhY2VTaGlwKFwic3VibWFyaW5lMlwiLCBbJ2MxJ10pXHJcbiAgICAgICAgLy8gQ29tcHV0ZXIuYm9hcmQucGxhY2VTaGlwKFwiZGVzdHJveWVyMVwiLCBbJ2UxJywnZTInXSlcclxuICAgICAgICBDb21wdXRlci5ib2FyZC5wbGFjZVNoaXAoXCJkZXN0cm95ZXIyXCIsIFsnZzInLCdoMiddKVxyXG4gICAgICAgIC8vIENvbXB1dGVyLmJvYXJkLnBsYWNlU2hpcChcImNydWlzZXJcIiwgWydhNCcsJ2I0JywgJ2M0J10pXHJcbiAgICAgICAgLy8gQ29tcHV0ZXIuYm9hcmQucGxhY2VTaGlwKFwiYmF0dGxlc2hpcFwiLCBbJ2U0JywnZTUnLCAnZTQnLCAnZTcnXSlcclxuICAgICAgICAvLyBDb21wdXRlci5ib2FyZC5wbGFjZVNoaXAoXCJhaXJjcmFmdENhcnJpZXJcIiwgWydoNCcsJ2g1JywgJ2g0JywgJ2g3JywgJ2g4J10pXHJcbiAgICB9XHJcblxyXG4gICAgdHJ5e1xyXG4gICAgICAgIHBsYWNlUGxheWVyU2hpcHMoKVxyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG5cclxuICAgIHRyeXtcclxuICAgICAgICBwbGFjZUNvbXB1dGVyU2hpcHMoKVxyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBzaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBib2FyZCA9IFtcclxuICAgIFtcImExXCIsIFwiYjFcIiwgXCJjMVwiLCBcImQxXCIsIFwiZTFcIiwgXCJmMVwiLCBcImcxXCIsIFwiaDFcIiwgXCJpMVwiLCBcImoxXCJdLFxyXG4gICAgW1wiYTJcIiwgXCJiMlwiLCBcImMyXCIsIFwiZDJcIiwgXCJlMlwiLCBcImYyXCIsIFwiZzJcIiwgXCJoMlwiLCBcImkyXCIsIFwiajJcIl0sXHJcbiAgICBbXCJhM1wiLCBcImIzXCIsIFwiYzNcIiwgXCJkM1wiLCBcImUzXCIsIFwiZjNcIiwgXCJnM1wiLCBcImgzXCIsIFwiaTNcIiwgXCJqM1wiXSxcclxuICAgIFtcImE0XCIsIFwiYjRcIiwgXCJjNFwiLCBcImQ0XCIsIFwiZTRcIiwgXCJmNFwiLCBcImc0XCIsIFwiaDRcIiwgXCJpNFwiLCBcImo0XCJdLFxyXG4gICAgW1wiYTVcIiwgXCJiNVwiLCBcImM1XCIsIFwiZDVcIiwgXCJlNVwiLCBcImY1XCIsIFwiZzVcIiwgXCJoNVwiLCBcImk1XCIsIFwiajVcIl0sXHJcbiAgICBbXCJhNlwiLCBcImI2XCIsIFwiYzZcIiwgXCJkNlwiLCBcImU2XCIsIFwiZjZcIiwgXCJnNlwiLCBcImg2XCIsIFwiaTZcIiwgXCJqNlwiXSxcclxuICAgIFtcImE3XCIsIFwiYjdcIiwgXCJjN1wiLCBcImQ3XCIsIFwiZTdcIiwgXCJmN1wiLCBcImc3XCIsIFwiaDdcIiwgXCJpN1wiLCBcImo3XCJdLFxyXG4gICAgW1wiYThcIiwgXCJiOFwiLCBcImM4XCIsIFwiZDhcIiwgXCJlOFwiLCBcImY4XCIsIFwiZzhcIiwgXCJoOFwiLCBcImk4XCIsIFwiajhcIl0sXHJcbiAgICBbXCJhOVwiLCBcImI5XCIsIFwiYzlcIiwgXCJkOVwiLCBcImU5XCIsIFwiZjlcIiwgXCJnOVwiLCBcImg5XCIsIFwiaTlcIiwgXCJqOVwiXSxcclxuICAgIFtcImExMFwiLCBcImIxMFwiLCBcImMxMFwiLCBcImQxMFwiLCBcImUxMFwiLCBcImYxMFwiLCBcImcxMFwiLCBcImgxMFwiLCBcImkxMFwiLCBcImoxMFwiXSxcclxuICBdO1xyXG4gIC8vc2hpcHMgYW5kIGNvb3JkaW5hdGVzIG9mIHNoaXBzIHRoYXQgYWxyZWFkeSBoYXZlIGJlZW4gcGxhY2VkXHJcbiAgY29uc3QgcGxhY2VkU2hpcHMgPSBbXTtcclxuICBjb25zdCBnZXRwbGFjZWRTaGlwcyA9ICgpID0+IHBsYWNlZFNoaXBzO1xyXG4gIC8vIGNlbGxzIHRoYXQgaGF2ZSBzaGlwcyBvbiB0aGVtIG9yIGFyZSBhZGpjZW50ZXMgdG8gc2hpcHNcclxuICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XHJcbiAgLy8gdHJhY2tpbmcgY2VsbHMgdGhhdCBiZWVuIHNob3QgYW5kIHdlcmUgbWlzc1xyXG4gIGNvbnN0IG1pc3NlZFNob3RzID0gW107XHJcbiAgY29uc3QgZ2V0TWlzc2VkU2hvdHMgPSAoKSA9PiBtaXNzZWRTaG90cztcclxuXHJcbiAgY29uc3Qgc2hpcHMgPSBbXHJcbiAgICBcInN1Ym1hcmluZTFcIixcclxuICAgIFwic3VibWFyaW5lMlwiLFxyXG4gICAgXCJkZXN0cm95ZXIxXCIsXHJcbiAgICBcImRlc3Ryb3llcjJcIixcclxuICAgIFwiY3J1aXNlclwiLFxyXG4gICAgXCJiYXR0bGVzaGlwXCIsXHJcbiAgICBcImFpcmNyYWZ0Q2FycmllclwiLFxyXG4gIF07XHJcblxyXG4gIC8vY2hlY2tpbmcgaWYgY29vcmRpbmF0ZXMgYXJlIGFsbG93ZWQgYW5kIHBsYWNpbmcgc2hpcHMgaW4gcGxhY2VkU2hpcHNcclxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcFR5cGUsIGNvb3JkcykgPT4ge1xyXG4gICAgLy9saXN0IG9mIGNlbGxzIHRoYXQgbGFyZWFkeSBoYXYgc2hpcHMgb24gdGhlbVxyXG5cclxuICAgIGxldCBzaGlwTmFtZTtcclxuXHJcbiAgICAvL2NoZWNrcyBpZiBwYXNzZWQgc2hpcCBleGlzdHNcclxuICAgIGNvbnN0IGNoZWNrRXhpc3RlbmNlT2ZTaGlwID0gKCkgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc2hpcHMpIHtcclxuICAgICAgICBpZiAoc2hpcFR5cGUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgIHNoaXBOYW1lID0gc2hpcFR5cGU7XHJcbiAgICAgICAgICBzaGlwcy5zcGxpY2Uoc2hpcHMuaW5kZXhPZihpdGVtKSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIHBhc3NlZCBjb29yZCBleGlzdHNcclxuICAgIGNvbnN0IGNoZWNrQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL15bYS1qXSgxMHxbMS05XSkkLztcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiBjb29yZHMpIHtcclxuICAgICAgICBpZiAoIXJlZ2V4LnRlc3QoY29vcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY2hlY2sgaWYgcGFzc2VkIGNvcmRzIGFyZSBhbGxvd2VkIHBvc2l0aW9uYWxseVxyXG4gICAgY29uc3QgY2hlY2tQbGFjZW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xyXG4gICAgICBsZXQgbGV2ZWwgPSBmYWxzZTtcclxuICAgICAgbGV0IHZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgIGNvbnNvbGUubG9nKGNvb3Jkc1swXVswXSwgY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVswXSlcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMF0gPT09XHJcbiAgICAgICAgICBsZXR0ZXJzLmZpbmRJbmRleCgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNvb3Jkc1swXVswXSkgK1xyXG4gICAgICAgICAgICAoY29vcmRzLmxlbmd0aCAtIDEpICYmXHJcbiAgICAgICAgY29vcmRzWzBdWzFdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdsZXZlbCcpXHJcbiAgICAgICAgbGV2ZWwgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICBjb29yZHNbMF1bMF0gPT09IGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMF0gJiZcclxuICAgICAgICBOdW1iZXIoY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVsxXSkgPT09XHJcbiAgICAgICAgICBOdW1iZXIoY29vcmRzWzAgKyAoY29vcmRzLmxlbmd0aCAtIDEpXVsxXSlcclxuICAgICAgKSB7XHJcbiAgICAgICBjb25zb2xlLmxvZygndmVydGljYWwnKVxyXG4gICAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmVydGljYWwgfHwgbGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNoZWNrSWZDZWxsT2NjdXBpZWQgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGRlZCBDZWxsIGZyb20gY29vcmQgYW5kIGFkamFjZW50IGNlbGxzIHRvIG9jY3VwaWVkIGNlbGxzXHJcbiAgICBjb25zdCBhZGRPY2N1cGllZENlbGxzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjb29yZExldHRlciA9IGNvb3Jkc1tpXVswXTtcclxuICAgICAgICBjb25zdCBjb29yZE51bWJlciA9IGNvb3Jkc1tpXVsxXTtcclxuICAgICAgICBjb25zdCBJbmRleEluTGV0dGVycyA9IGxldHRlcnMuaW5kZXhPZihjb29yZHNbaV1bMF0pO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IFtcclxuICAgICAgICAgIGNvb3Jkc1tpXSxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YCxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YCxcclxuICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke2Nvb3JkTnVtYmVyfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gY29vcmRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgKyAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJhZGl1cztcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vZmlsdGVydGluZyBvY2N1cGllZCBjZWxscyBmcm9tIHJlcGV0aW5nIGNlbGxzIGFuZCBjZWxscyBvdXQgb2YgYm91bmRcclxuICAgIGNvbnN0IGZpbHRlck9jY3VwaWVkQ2VsbHMgPSAocmFkaXVzID0gYWRkT2NjdXBpZWRDZWxscygpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL15bYS1qXSgxMHxbMS05XSkkLztcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiByYWRpdXMpIHtcclxuICAgICAgICBpZiAocmVnZXgudGVzdChjb29yZCkgJiYgIW9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goY29vcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNraW5nIHNoaXBzIGFuZCBjb3JkcyBhZ2FpbnMgYWxsIGRlcGVuZGVjaWVzXHJcblxyXG4gICAgaWYgKCFjaGVja0Nvb3JkaW5hdGVzKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29vcmRpbmF0ZXMgb3V0IG9mIHJhbmdlIG9mIHRoZSBib2FyZCBvciBub3QgZXhpc3RzXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja1BsYWNlbWVudCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG9mIHNoaXAgaXMgbm90IGFsbG93ZWRcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoIWNoZWNrSWZDZWxsT2NjdXBpZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgXCJZb3UgY2Fubm90IHBsYWNlIHNoaXAgaW4gb25lIG9mYWxyZWFkeSBvY2N1cGllZCBvciBhZGplY250ZXMgY2VsbHNcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjaGVja0V4aXN0ZW5jZU9mU2hpcCgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgYWxyZWFkeSBiZWVuIHBsYWNlZCBvciBub3QgZXhpc3RzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZmlsdGVydGluZyBvY2N1cGllZCBjZWxscyBmcm9tIHJlcGV0aW5nIGNlbGxzIGFuZCBjZWxscyBvdXQgb2YgYm91bmRcclxuICAgIGZpbHRlck9jY3VwaWVkQ2VsbHMoKTtcclxuXHJcbiAgICAvL2NyZWF0ZSBuZXcgc2hpcCBhbmQgcGFzc2VkIGNvcnJlY3QgY29yZHNcclxuICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwKGNvb3Jkcy5sZW5ndGgpO1xyXG4gICAgbmV3U2hpcC5zZXRDb29yZGluYXRlcyhjb29yZHMpO1xyXG4gICAgcGxhY2VkU2hpcHMucHVzaCh7IFtgJHtzaGlwTmFtZX1gXTogbmV3U2hpcCB9KTtcclxuICB9O1xyXG5cclxuICAvLyB0YWtlcyBjb29yZCB0aGF0IHdhcyBzaG90LCBjaGVja3MgaWYgc2hpcCB3YXMgaGl0IGFuZCB0cmFja3MgaXQsIGlmIG1pc3MgcHVzaGVzIGNvb3JkIHRvIG1pc3NlZCBzaG90cyBhcnJheVxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoYXR0YWNrQ29vcmQpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VkU2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IE9iamVjdC52YWx1ZXMocGxhY2VkU2hpcHNbaV0pWzBdLmNvb3JkaW5hdGVzO1xyXG4gICAgICBmb3IgKGNvbnN0IHNoaXBDb29yZCBvZiBzaGlwQ29vcmRzKSB7XHJcbiAgICAgICAgaWYgKHNoaXBDb29yZCA9PT0gYXR0YWNrQ29vcmQpIHtcclxuICAgICAgICAgIGNvbnN0IGhpdFNoaXAgPSBPYmplY3QudmFsdWVzKHBsYWNlZFNoaXBzW2ldKVswXTtcclxuICAgICAgICAgIGhpdFNoaXAuaGl0KCk7XHJcbiAgICAgICAgICByZXR1cm4gaGl0U2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG1pc3NlZFNob3RzLnB1c2goYXR0YWNrQ29vcmQpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIC8vIGNoZWNrcyBpZiBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICBjb25zdCBhbGxTaGlwc1N1bmtlZCA9ICgpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VkU2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5zcGVjdGVkU2hpcCA9IE9iamVjdC52YWx1ZXMocGxhY2VkU2hpcHNbaV0pWzBdO1xyXG4gICAgICBpZiAoaW5zcGVjdGVkU2hpcC5nZXRTdW5rKCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYm9hcmQsXHJcbiAgICBwbGFjZVNoaXAsXHJcbiAgICBnZXRwbGFjZWRTaGlwcyxcclxuICAgIGdldE1pc3NlZFNob3RzLFxyXG4gICAgcmVjZWl2ZUF0dGFjayxcclxuICAgIGFsbFNoaXBzU3Vua2VkLFxyXG4gIH07XHJcbn07XHJcbiIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBsYXllciA9ICgpID0+IHtcclxuICAvL3RyYWNraW5nIHR1cm4gYW5kIGNoYW5nZXMgdHVyblxyXG4gIGxldCB0dXJuID0gZmFsc2U7XHJcbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+ICh0dXJuID0gIXR1cm4pO1xyXG4gIGNvbnN0IGdldFR1cm4gPSAoKT0+dHVyblxyXG5cclxuICAvL2NyZWF0ZXMgcGxheWVyIGdhbWVib2FyZFxyXG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkKCk7XHJcblxyXG4gIC8vdGFrZXMgZW5lbXkgYm9hcmQgYW5kIGNvb3JkIHRoYXQgaXMgc2hvb3QgdGFyZ2V0IGFuZCByZXR1cm4gZmFsc2Ugd2hlbiBtaXNzIG9yIGhpdHRlZCBTaGlwIHdoZW4gaGl0XHJcbiAgY29uc3Qgc2hvb3QgPSAoZW5lbXlCb2FyZCwgY29vcmQpID0+IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZCk7XHJcbiAgcmV0dXJuIHsgdHVybiwgY2hhbmdlVHVybiwgYm9hcmQsIHNob290LCBnZXRUdXJuIH07XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjb21wdXRlciA9ICgpID0+IHtcclxuICAgIC8vdGFrZXMgaW5oYXJpdGFuY2UgZnJvbSBwbGF5ZXIgZmFjdG9yeSBmdW5jdGlvblxyXG4gICAgY29uc3QgcHJvdG90eXBlID0gcGxheWVyKClcclxuXHJcbiAgICBjb25zdCBhdmFsaWFibGVDb29yZFRvVGFyZ2V0ID0gW1xyXG4gICAgICAgIFwiYTFcIiwgXCJiMVwiLCBcImMxXCIsIFwiZDFcIiwgXCJlMVwiLCBcImYxXCIsIFwiZzFcIiwgXCJoMVwiLCBcImkxXCIsIFwiajFcIixcclxuICAgICAgICBcImEyXCIsIFwiYjJcIiwgXCJjMlwiLCBcImQyXCIsIFwiZTJcIiwgXCJmMlwiLCBcImcyXCIsIFwiaDJcIiwgXCJpMlwiLCBcImoyXCIsXHJcbiAgICAgICAgXCJhM1wiLCBcImIzXCIsIFwiYzNcIiwgXCJkM1wiLCBcImUzXCIsIFwiZjNcIiwgXCJnM1wiLCBcImgzXCIsIFwiaTNcIiwgXCJqM1wiLFxyXG4gICAgICAgIFwiYTRcIiwgXCJiNFwiLCBcImM0XCIsIFwiZDRcIiwgXCJlNFwiLCBcImY0XCIsIFwiZzRcIiwgXCJoNFwiLCBcImk0XCIsIFwiajRcIixcclxuICAgICAgICBcImE1XCIsIFwiYjVcIiwgXCJjNVwiLCBcImQ1XCIsIFwiZTVcIiwgXCJmNVwiLCBcImc1XCIsIFwiaDVcIiwgXCJpNVwiLCBcImo1XCIsXHJcbiAgICAgICAgXCJhNlwiLCBcImI2XCIsIFwiYzZcIiwgXCJkNlwiLCBcImU2XCIsIFwiZjZcIiwgXCJnNlwiLCBcImg2XCIsIFwiaTZcIiwgXCJqNlwiLCAgICBcclxuICAgICAgICBcImE3XCIsIFwiYjdcIiwgXCJjN1wiLCBcImQ3XCIsIFwiZTdcIiwgXCJmN1wiLCBcImc3XCIsIFwiaDdcIiwgXCJpN1wiLCBcImo3XCIsICAgIFxyXG4gICAgICAgIFwiYThcIiwgXCJiOFwiLCBcImM4XCIsIFwiZDhcIiwgXCJlOFwiLCBcImY4XCIsIFwiZzhcIiwgXCJoOFwiLCBcImk4XCIsIFwiajhcIiwgICAgXHJcbiAgICAgICAgXCJhOVwiLCBcImI5XCIsIFwiYzlcIiwgXCJkOVwiLCBcImU5XCIsIFwiZjlcIiwgXCJnOVwiLCBcImg5XCIsIFwiaTlcIiwgXCJqOVwiLCAgICBcclxuICAgICAgICBcImExMFwiLCBcImIxMFwiLCBcImMxMFwiLCBcImQxMFwiLCBcImUxMFwiLCBcImYxMFwiLCBcImcxMFwiLCBcImgxMFwiLCBcImkxMFwiLCBcImoxMFwiXHJcbiAgICBdXHJcblxyXG4gICAgLy8gcmV0dXJuaW5nIHJhbmRvbSBpbmRleCBmcm9tIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRcclxuICAgIGNvbnN0IGNob29zZVRhcmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhbGlhYmxlQ29vcmRUb1RhcmdldC5sZW5ndGgpXHJcbiAgICB9XHJcblxyXG4gICAgLy90YWtlcyBzaG90IGF0IGVuZW15IGJvYXJkIHdpdGggY29vcmQgZnJvbSBjaG9vc2VUYXJnZXQoKSBhbmQgcmVtb3ZlcyB0aGF0IGNvb3JkIGZyb20gYXZhaWxpYWJsZSBjb29yZHNcclxuICAgIGNvbnN0IHNob290Q29tcCA9IChlbmVteUJvYXJkLCBjb29yZCA9IGNob29zZVRhcmdldCgpKSA9PiB7XHJcbiAgICAgICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGF2YWxpYWJsZUNvb3JkVG9UYXJnZXRbY29vcmRdKVxyXG4gICAgICAgIGF2YWxpYWJsZUNvb3JkVG9UYXJnZXQuc3BsaWNlKGNvb3JkLCAxKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3JldHVybnMgb2JqZWN0IHdpdGggYWxsIG1ldGhvZHMgYW5kIHByb3Blcml0ZXMgaW5oZXJ0ZXRlZCBmcm9tIHBsYXllclxyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHByb3RvdHlwZSwge2F2YWxpYWJsZUNvb3JkVG9UYXJnZXQsIGNob29zZVRhcmdldCwgc2hvb3RDb21wfSlcclxufTtcclxuIiwiLy9mYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhbGwgdHlwZSBvZiBzaGlwcyBhbmQgYXR0cmlidXQgbWV0aG9kIHRvIHRoZW1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGlwID0gKHNoaXBMZW5ndGgpID0+IHtcclxuICBjb25zdCBsZW5ndGggPSAoKSA9PiBzaGlwTGVuZ3RoO1xyXG5cclxuICAvLyBzdGF0dXMgb2Ygc2hpcFxyXG4gIGxldCBzdW5rID0gZmFsc2U7XHJcbiAgY29uc3QgZ2V0U3VuayA9ICgpID0+IHN1bms7XHJcblxyXG4gIC8vdHJhY2tpbmcgbnVtYmVyIG9mIGhpdHMgdG8gdGhlIHNoaXBcclxuICBsZXQgaGl0TnVtYmVyID0gMDtcclxuICAvL3JldHVybiBudW1iZXIgb2YgaGl0c1xyXG4gIGNvbnN0IGdldEhpdHMgPSAoKSA9PiBoaXROdW1iZXI7XHJcblxyXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcclxuICAgIGhpdE51bWJlcisrO1xyXG4gICAgaWYgKGhpdE51bWJlciA+PSBsZW5ndGgoKSkge1xyXG4gICAgICBzdW5rID0gdHJ1ZTtcclxuICAgIH19XHJcblxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcclxuICAgIGNvbnN0IHNldENvb3JkaW5hdGVzID0gKGNvb3JkcykgPT4ge1xyXG4gICAgICBpZihjb29yZHMubGVuZ3RoICE9PSBsZW5ndGgoKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdudW1iZXIgb2YgY29vcmRpbmF0ZXMgaGF2ZSB0byBiZSBlcXVhbCB0byBsZW5ndGggb2YgdGhlIHNoaXAnKVxyXG4gICAgICB9XHJcbiAgICAgIHRyeXtcclxuICAgICAgICBjb29yZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBjb25zdCBnZXRDb29yZGluYXRlcyA9ICgpID0+IGNvb3JkaW5hdGVzO1xyXG4gIFxyXG5cclxuICByZXR1cm4geyBsZW5ndGgsIGdldFN1bmssIGdldEhpdHMsIGhpdCwgc2V0Q29vcmRpbmF0ZXMsIGdldENvb3JkaW5hdGVzLGNvb3JkaW5hdGVzfTtcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxuZ2FtZSgpXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9