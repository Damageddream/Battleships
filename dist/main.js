/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  const occupiedCells = [];
  const getplacedShips = () => placedShips;
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
            shipName = shipType
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
          letters.findIndex((letter) => letter === coords[0][0]) +
            (coords.length - 1) &&
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
      return false
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

    if(!checkCoordinates()){
        throw new Error('Coordinates out of range of the board or not exists')
    }
    if(!checkPlacement()){
        throw new Error('Position of ship is not allowed')
    }
    if(!checkIfCellOccupied()){
        throw new Error('You cannot place ship in one ofalready occupied or adjecntes cells')
    }
    if(!checkExistenceOfShip()){
        throw new Error('Ship already been placed or not exists')
    }

    //filterting occupied cells from repeting cells and cells out of bound
    filterOccupiedCells()

    //create new ship and passed correct cords
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(coords.length)  
    newShip.setCoordinates(coords)
    placedShips.push({[`${shipName}`]:newShip})
 

  };

  return { board, placeShip, getplacedShips, ships };
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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)();
try {
    board.placeShip("submarine1", ["a1"])
    board.placeShip("submarine2", ["a2"])
} catch (error) {
  console.log(error);
}
const a = board.getplacedShips()


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDOUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxZQUFZLEVBQUUsd0JBQXdCO0FBQ25ELGFBQWEsWUFBWSxFQUFFLHdCQUF3QjtBQUNuRCxhQUFhLDRCQUE0QixFQUFFLFlBQVk7QUFDdkQsYUFBYSw0QkFBNEIsRUFBRSxZQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNEJBQTRCLEVBQUUsd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQSxlQUFlLDRCQUE0QixFQUFFLHdCQUF3QjtBQUNyRTtBQUNBO0FBQ0EsZUFBZSw0QkFBNEIsRUFBRSx3QkFBd0I7QUFDckU7QUFDQTtBQUNBLGVBQWUsNEJBQTRCLEVBQUUsd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkNBQUk7QUFDeEI7QUFDQSxzQkFBc0IsSUFBSSxTQUFTLFdBQVc7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7OztBQ25LQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7VUN0Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ053QztBQUN4QztBQUNBLGNBQWMscURBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBib2FyZCA9IFtcclxuICAgIFtcImExXCIsIFwiYjFcIiwgXCJjMVwiLCBcImQxXCIsIFwiZTFcIiwgXCJmMVwiLCBcImcxXCIsIFwiaDFcIiwgXCJpMVwiLCBcImoxXCJdLFxyXG4gICAgW1wiYTJcIiwgXCJiMlwiLCBcImMyXCIsIFwiZDJcIiwgXCJlMlwiLCBcImYyXCIsIFwiZzJcIiwgXCJoMlwiLCBcImkyXCIsIFwiajJcIl0sXHJcbiAgICBbXCJhM1wiLCBcImIzXCIsIFwiYzNcIiwgXCJkM1wiLCBcImUzXCIsIFwiZjNcIiwgXCJnM1wiLCBcImgzXCIsIFwiaTNcIiwgXCJqM1wiXSxcclxuICAgIFtcImE0XCIsIFwiYjRcIiwgXCJjNFwiLCBcImQ0XCIsIFwiZTRcIiwgXCJmNFwiLCBcImc0XCIsIFwiaDRcIiwgXCJpNFwiLCBcImo0XCJdLFxyXG4gICAgW1wiYTVcIiwgXCJiNVwiLCBcImM1XCIsIFwiZDVcIiwgXCJlNVwiLCBcImY1XCIsIFwiZzVcIiwgXCJoNVwiLCBcImk1XCIsIFwiajVcIl0sXHJcbiAgICBbXCJhNlwiLCBcImI2XCIsIFwiYzZcIiwgXCJkNlwiLCBcImU2XCIsIFwiZjZcIiwgXCJnNlwiLCBcImg2XCIsIFwiaTZcIiwgXCJqNlwiXSxcclxuICAgIFtcImE3XCIsIFwiYjdcIiwgXCJjN1wiLCBcImQ3XCIsIFwiZTdcIiwgXCJmN1wiLCBcImc3XCIsIFwiaDdcIiwgXCJpN1wiLCBcImo3XCJdLFxyXG4gICAgW1wiYThcIiwgXCJiOFwiLCBcImM4XCIsIFwiZDhcIiwgXCJlOFwiLCBcImY4XCIsIFwiZzhcIiwgXCJoOFwiLCBcImk4XCIsIFwiajhcIl0sXHJcbiAgICBbXCJhOVwiLCBcImI5XCIsIFwiYzlcIiwgXCJkOVwiLCBcImU5XCIsIFwiZjlcIiwgXCJnOVwiLCBcImg5XCIsIFwiaTlcIiwgXCJqOVwiXSxcclxuICAgIFtcImExMFwiLCBcImIxMFwiLCBcImMxMFwiLCBcImQxMFwiLCBcImUxMFwiLCBcImYxMFwiLCBcImcxMFwiLCBcImgxMFwiLCBcImkxMFwiLCBcImoxMFwiXSxcclxuICBdO1xyXG4gIC8vc2hpcHMgYW5kIGNvb3JkaW5hdGVzIG9mIHNoaXBzIHRoYXQgYWxyZWFkeSBoYXZlIGJlZW4gcGxhY2VkXHJcbiAgY29uc3QgcGxhY2VkU2hpcHMgPSBbXTtcclxuICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XHJcbiAgY29uc3QgZ2V0cGxhY2VkU2hpcHMgPSAoKSA9PiBwbGFjZWRTaGlwcztcclxuICBjb25zdCBzaGlwcyA9IFtcclxuICAgIFwic3VibWFyaW5lMVwiLFxyXG4gICAgXCJzdWJtYXJpbmUyXCIsXHJcbiAgICBcImRlc3Ryb3llcjFcIixcclxuICAgIFwiZGVzdHJveWVyMlwiLFxyXG4gICAgXCJjcnVpc2VyXCIsXHJcbiAgICBcImJhdHRsZXNoaXBcIixcclxuICAgIFwiYWlyY3JhZnRDYXJyaWVyXCIsXHJcbiAgXTtcclxuXHJcbiAgLy9jaGVja2luZyBpZiBjb29yZGluYXRlcyBhcmUgYWxsb3dlZCBhbmQgcGxhY2luZyBzaGlwcyBpbiBwbGFjZWRTaGlwc1xyXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwVHlwZSwgY29vcmRzKSA9PiB7XHJcblxyXG4gICAgLy9saXN0IG9mIGNlbGxzIHRoYXQgbGFyZWFkeSBoYXYgc2hpcHMgb24gdGhlbVxyXG4gICBcclxuICAgIGxldCBzaGlwTmFtZTsgXHJcbiAgICBcclxuICAgIC8vY2hlY2tzIGlmIHBhc3NlZCBzaGlwIGV4aXN0c1xyXG4gICAgY29uc3QgY2hlY2tFeGlzdGVuY2VPZlNoaXAgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBzaGlwcykge1xyXG4gICAgICAgIGlmIChzaGlwVHlwZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICBzaGlwTmFtZSA9IHNoaXBUeXBlXHJcbiAgICAgICAgICBzaGlwcy5zcGxpY2Uoc2hpcHMuaW5kZXhPZihpdGVtKSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNrIGlmIHBhc3NlZCBjb29yZCBleGlzdHNcclxuICAgIGNvbnN0IGNoZWNrQ29vcmRpbmF0ZXMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlZ2V4ID0gL15bYS1qXSgxMHxbMS05XSkkLztcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiBjb29yZHMpIHtcclxuICAgICAgICBpZiAoIXJlZ2V4LnRlc3QoY29vcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY2hlY2sgaWYgcGFzc2VkIGNvcmRzIGFyZSBhbGxvd2VkIHBvc2l0aW9uYWxseVxyXG4gICAgY29uc3QgY2hlY2tQbGFjZW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xyXG4gICAgICBsZXQgbGV2ZWwgPSBmYWxzZTtcclxuICAgICAgbGV0IHZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzBdID09PVxyXG4gICAgICAgICAgbGV0dGVycy5maW5kSW5kZXgoKGxldHRlcikgPT4gbGV0dGVyID09PSBjb29yZHNbMF1bMF0pICtcclxuICAgICAgICAgICAgKGNvb3Jkcy5sZW5ndGggLSAxKSAmJlxyXG4gICAgICAgIGNvb3Jkc1swXVsxXSA9PT0gY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVsxXVxyXG4gICAgICApIHtcclxuICAgICAgICBsZXZlbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1swXVswXSA9PT0gY29vcmRzW2Nvb3Jkcy5sZW5ndGggLSAxXVswXSAmJlxyXG4gICAgICAgIE51bWJlcihjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdKSA9PT1cclxuICAgICAgICAgIE51bWJlcihjb29yZHNbMCArIChjb29yZHMubGVuZ3RoIC0gMSldWzFdKVxyXG4gICAgICApIHtcclxuICAgICAgICB2ZXJ0aWNhbCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZlcnRpY2FsIHx8IGxldmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNoZWNrSWZDZWxsT2NjdXBpZWQgPSAoKSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGRlZCBDZWxsIGZyb20gY29vcmQgYW5kIGFkamFjZW50IGNlbGxzIHRvIG9jY3VwaWVkIGNlbGxzXHJcbiAgICBjb25zdCBhZGRPY2N1cGllZENlbGxzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBsZXR0ZXJzID0gW1wiYVwiLCBcImJcIiwgXCJjXCIsIFwiZFwiLCBcImVcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJpXCIsIFwialwiXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjb29yZExldHRlciA9IGNvb3Jkc1tpXVswXTtcclxuICAgICAgICBjb25zdCBjb29yZE51bWJlciA9IGNvb3Jkc1tpXVsxXTtcclxuICAgICAgICBjb25zdCBJbmRleEluTGV0dGVycyA9IGxldHRlcnMuaW5kZXhPZihjb29yZHNbaV1bMF0pO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IFtcclxuICAgICAgICAgIGNvb3Jkc1tpXSxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YCxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YCxcclxuICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke2Nvb3JkTnVtYmVyfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gY29vcmRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgKyAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiByYWRpdXM7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBjb25zdCBmaWx0ZXJPY2N1cGllZENlbGxzID0gKHJhZGl1cyA9IGFkZE9jY3VwaWVkQ2VsbHMoKSkgPT4ge1xyXG4gICAgICBjb25zdCByZWdleCA9IC9eW2Etal0oMTB8WzEtOV0pJC87XHJcbiAgICAgIGZvciAoY29uc3QgY29vcmQgb2YgcmFkaXVzKSB7XHJcbiAgICAgICAgaWYgKHJlZ2V4LnRlc3QoY29vcmQpICYmICFvY2N1cGllZENlbGxzLmluY2x1ZGVzKGNvb3JkKSkge1xyXG4gICAgICAgICAgb2NjdXBpZWRDZWxscy5wdXNoKGNvb3JkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVja2luZyBzaGlwcyBhbmQgY29yZHMgYWdhaW5zIGFsbCBkZXBlbmRlY2llcyBcclxuXHJcbiAgICBpZighY2hlY2tDb29yZGluYXRlcygpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvb3JkaW5hdGVzIG91dCBvZiByYW5nZSBvZiB0aGUgYm9hcmQgb3Igbm90IGV4aXN0cycpXHJcbiAgICB9XHJcbiAgICBpZighY2hlY2tQbGFjZW1lbnQoKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3NpdGlvbiBvZiBzaGlwIGlzIG5vdCBhbGxvd2VkJylcclxuICAgIH1cclxuICAgIGlmKCFjaGVja0lmQ2VsbE9jY3VwaWVkKCkpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCBwbGFjZSBzaGlwIGluIG9uZSBvZmFscmVhZHkgb2NjdXBpZWQgb3IgYWRqZWNudGVzIGNlbGxzJylcclxuICAgIH1cclxuICAgIGlmKCFjaGVja0V4aXN0ZW5jZU9mU2hpcCgpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoaXAgYWxyZWFkeSBiZWVuIHBsYWNlZCBvciBub3QgZXhpc3RzJylcclxuICAgIH1cclxuXHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBmaWx0ZXJPY2N1cGllZENlbGxzKClcclxuXHJcbiAgICAvL2NyZWF0ZSBuZXcgc2hpcCBhbmQgcGFzc2VkIGNvcnJlY3QgY29yZHNcclxuICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwKGNvb3Jkcy5sZW5ndGgpICBcclxuICAgIG5ld1NoaXAuc2V0Q29vcmRpbmF0ZXMoY29vcmRzKVxyXG4gICAgcGxhY2VkU2hpcHMucHVzaCh7W2Ake3NoaXBOYW1lfWBdOm5ld1NoaXB9KVxyXG4gXHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXAsIGdldHBsYWNlZFNoaXBzLCBzaGlwcyB9O1xyXG59O1xyXG4iLCIvL2ZhY3RvcnkgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGFsbCB0eXBlIG9mIHNoaXBzIGFuZCBhdHRyaWJ1dCBtZXRob2QgdG8gdGhlbVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXAgPSAoc2hpcExlbmd0aCkgPT4ge1xyXG4gIGNvbnN0IGxlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XHJcblxyXG4gIC8vIHN0YXR1cyBvZiBzaGlwXHJcbiAgbGV0IHN1bmsgPSBmYWxzZTtcclxuICBjb25zdCBnZXRTdW5rID0gKCkgPT4gc3VuaztcclxuXHJcbiAgLy90cmFja2luZyBudW1iZXIgb2YgaGl0cyB0byB0aGUgc2hpcFxyXG4gIGxldCBoaXROdW1iZXIgPSAwO1xyXG4gIC8vcmV0dXJuIG51bWJlciBvZiBoaXRzXHJcbiAgY29uc3QgZ2V0SGl0cyA9ICgpID0+IGhpdE51bWJlcjtcclxuXHJcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xyXG4gICAgaGl0TnVtYmVyKys7XHJcbiAgICBpZiAoaGl0TnVtYmVyID49IGxlbmd0aCgpKSB7XHJcbiAgICAgIHN1bmsgPSB0cnVlO1xyXG4gICAgfX1cclxuXHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xyXG4gICAgY29uc3Qgc2V0Q29vcmRpbmF0ZXMgPSAoY29vcmRzKSA9PiB7XHJcbiAgICAgIGlmKGNvb3Jkcy5sZW5ndGggIT09IGxlbmd0aCgpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ251bWJlciBvZiBjb29yZGluYXRlcyBoYXZlIHRvIGJlIGVxdWFsIHRvIGxlbmd0aCBvZiB0aGUgc2hpcCcpXHJcbiAgICAgIH1cclxuICAgICAgdHJ5e1xyXG4gICAgICAgIGNvb3Jkcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIGNvbnN0IGdldENvb3JkaW5hdGVzID0gKCkgPT4gY29vcmRpbmF0ZXM7XHJcbiAgXHJcblxyXG4gIHJldHVybiB7IGxlbmd0aCwgZ2V0U3VuaywgZ2V0SGl0cywgaGl0LCBzZXRDb29yZGluYXRlcywgZ2V0Q29vcmRpbmF0ZXMsY29vcmRpbmF0ZXN9O1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxudHJ5IHtcclxuICAgIGJvYXJkLnBsYWNlU2hpcChcInN1Ym1hcmluZTFcIiwgW1wiYTFcIl0pXHJcbiAgICBib2FyZC5wbGFjZVNoaXAoXCJzdWJtYXJpbmUyXCIsIFtcImEyXCJdKVxyXG59IGNhdGNoIChlcnJvcikge1xyXG4gIGNvbnNvbGUubG9nKGVycm9yKTtcclxufVxyXG5jb25zdCBhID0gYm9hcmQuZ2V0cGxhY2VkU2hpcHMoKVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9