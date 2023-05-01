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
    const occupiedCells = [];
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
      const regex = /[a-j](10|[0-9])/;
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
        const IndexInLetters = letters.find((letter) => letter === coordLetter);
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
      const regex = /[a-j](10|[0-9])/;
      for (const coord of radius) {
        if (regex.test(coord) && !occupiedCells.includes(coord)) {
          occupiedCells.push(coord);
        }
      }
    };

    //checking ships and cords agains all dependecies 
    if(!checkExistenceOfShip()){
        throw new Error('Ship already been placed or not exists')
    }
    if(!checkCoordinates()){
        throw new Error('Coordinates out of range of the board or not exists')
    }
    if(!checkPlacement()){
        throw new Error('Position of ship is not allowed')
    }
    if(!checkIfCellOccupied()){
        throw new Error('You cannot place ship in one of chosen cells')
    }

    //filterting occupied cells from repeting cells and cells out of bound
    filterOccupiedCells()
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(coords.length)
    
    newShip.setCoordinates(coords)
    console.log(shipName)
    placedShips.push({[`${shipName}`]:newShip})

  };

  return { board, placeShip, getplacedShips };
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
  

  return { length, getSunk, getHits, hit, setCoordinates, getCoordinates };
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
  board.placeShip("submarine1", ["a1"]);
} catch (error) {
  console.log(error);
}


const a = board.getplacedShips()
console.log(a[0].submarine1.getCoordinates())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDOUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsWUFBWSxFQUFFLHdCQUF3QjtBQUNuRCxhQUFhLFlBQVksRUFBRSx3QkFBd0I7QUFDbkQsYUFBYSw0QkFBNEIsRUFBRSxZQUFZO0FBQ3ZELGFBQWEsNEJBQTRCLEVBQUUsWUFBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxlQUFlLDRCQUE0QixFQUFFLHdCQUF3QjtBQUNyRTtBQUNBO0FBQ0EsZUFBZSw0QkFBNEIsRUFBRSx3QkFBd0I7QUFDckU7QUFDQTtBQUNBLGVBQWUsNEJBQTRCLEVBQUUsd0JBQXdCO0FBQ3JFO0FBQ0E7QUFDQSxlQUFlLDRCQUE0QixFQUFFLHdCQUF3QjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyQ0FBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsSUFBSSxTQUFTLFdBQVc7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUMvSkE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOzs7Ozs7O1VDdENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOd0M7QUFDeEM7QUFDQSxjQUFjLHFEQUFTO0FBQ3ZCO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBib2FyZCA9IFtcclxuICAgIFtcImExXCIsIFwiYjFcIiwgXCJjMVwiLCBcImQxXCIsIFwiZTFcIiwgXCJmMVwiLCBcImcxXCIsIFwiaDFcIiwgXCJpMVwiLCBcImoxXCJdLFxyXG4gICAgW1wiYTJcIiwgXCJiMlwiLCBcImMyXCIsIFwiZDJcIiwgXCJlMlwiLCBcImYyXCIsIFwiZzJcIiwgXCJoMlwiLCBcImkyXCIsIFwiajJcIl0sXHJcbiAgICBbXCJhM1wiLCBcImIzXCIsIFwiYzNcIiwgXCJkM1wiLCBcImUzXCIsIFwiZjNcIiwgXCJnM1wiLCBcImgzXCIsIFwiaTNcIiwgXCJqM1wiXSxcclxuICAgIFtcImE0XCIsIFwiYjRcIiwgXCJjNFwiLCBcImQ0XCIsIFwiZTRcIiwgXCJmNFwiLCBcImc0XCIsIFwiaDRcIiwgXCJpNFwiLCBcImo0XCJdLFxyXG4gICAgW1wiYTVcIiwgXCJiNVwiLCBcImM1XCIsIFwiZDVcIiwgXCJlNVwiLCBcImY1XCIsIFwiZzVcIiwgXCJoNVwiLCBcImk1XCIsIFwiajVcIl0sXHJcbiAgICBbXCJhNlwiLCBcImI2XCIsIFwiYzZcIiwgXCJkNlwiLCBcImU2XCIsIFwiZjZcIiwgXCJnNlwiLCBcImg2XCIsIFwiaTZcIiwgXCJqNlwiXSxcclxuICAgIFtcImE3XCIsIFwiYjdcIiwgXCJjN1wiLCBcImQ3XCIsIFwiZTdcIiwgXCJmN1wiLCBcImc3XCIsIFwiaDdcIiwgXCJpN1wiLCBcImo3XCJdLFxyXG4gICAgW1wiYThcIiwgXCJiOFwiLCBcImM4XCIsIFwiZDhcIiwgXCJlOFwiLCBcImY4XCIsIFwiZzhcIiwgXCJoOFwiLCBcImk4XCIsIFwiajhcIl0sXHJcbiAgICBbXCJhOVwiLCBcImI5XCIsIFwiYzlcIiwgXCJkOVwiLCBcImU5XCIsIFwiZjlcIiwgXCJnOVwiLCBcImg5XCIsIFwiaTlcIiwgXCJqOVwiXSxcclxuICAgIFtcImExMFwiLCBcImIxMFwiLCBcImMxMFwiLCBcImQxMFwiLCBcImUxMFwiLCBcImYxMFwiLCBcImcxMFwiLCBcImgxMFwiLCBcImkxMFwiLCBcImoxMFwiXSxcclxuICBdO1xyXG4gIC8vc2hpcHMgYW5kIGNvb3JkaW5hdGVzIG9mIHNoaXBzIHRoYXQgYWxyZWFkeSBoYXZlIGJlZW4gcGxhY2VkXHJcbiAgY29uc3QgcGxhY2VkU2hpcHMgPSBbXTtcclxuICBjb25zdCBnZXRwbGFjZWRTaGlwcyA9ICgpID0+IHBsYWNlZFNoaXBzO1xyXG4gIGNvbnN0IHNoaXBzID0gW1xyXG4gICAgXCJzdWJtYXJpbmUxXCIsXHJcbiAgICBcInN1Ym1hcmluZTJcIixcclxuICAgIFwiZGVzdHJveWVyMVwiLFxyXG4gICAgXCJkZXN0cm95ZXIyXCIsXHJcbiAgICBcImNydWlzZXJcIixcclxuICAgIFwiYmF0dGxlc2hpcFwiLFxyXG4gICAgXCJhaXJjcmFmdENhcnJpZXJcIixcclxuICBdO1xyXG5cclxuICAvL2NoZWNraW5nIGlmIGNvb3JkaW5hdGVzIGFyZSBhbGxvd2VkIGFuZCBwbGFjaW5nIHNoaXBzIGluIHBsYWNlZFNoaXBzXHJcbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBUeXBlLCBjb29yZHMpID0+IHtcclxuXHJcbiAgICAvL2xpc3Qgb2YgY2VsbHMgdGhhdCBsYXJlYWR5IGhhdiBzaGlwcyBvbiB0aGVtXHJcbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XHJcbiAgICBsZXQgc2hpcE5hbWU7IFxyXG4gICAgXHJcbiAgICAvL2NoZWNrcyBpZiBwYXNzZWQgc2hpcCBleGlzdHNcclxuICAgIGNvbnN0IGNoZWNrRXhpc3RlbmNlT2ZTaGlwID0gKCkgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc2hpcHMpIHtcclxuICAgICAgICBpZiAoc2hpcFR5cGUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgc2hpcE5hbWUgPSBzaGlwVHlwZVxyXG4gICAgICAgICAgc2hpcHMuc3BsaWNlKHNoaXBzLmluZGV4T2YoaXRlbSksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVjayBpZiBwYXNzZWQgY29vcmQgZXhpc3RzXHJcbiAgICBjb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByZWdleCA9IC9bYS1qXSgxMHxbMC05XSkvO1xyXG4gICAgICBmb3IgKGNvbnN0IGNvb3JkIG9mIGNvb3Jkcykge1xyXG4gICAgICAgIGlmICghcmVnZXgudGVzdChjb29yZCkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9jaGVjayBpZiBwYXNzZWQgY29yZHMgYXJlIGFsbG93ZWQgcG9zaXRpb25hbGx5XHJcbiAgICBjb25zdCBjaGVja1BsYWNlbWVudCA9ICgpID0+IHtcclxuICAgICAgY29uc3QgbGV0dGVycyA9IFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIl07XHJcbiAgICAgIGxldCBsZXZlbCA9IGZhbHNlO1xyXG4gICAgICBsZXQgdmVydGljYWwgPSBmYWxzZTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMF0gPT09XHJcbiAgICAgICAgICBsZXR0ZXJzLmZpbmRJbmRleCgobGV0dGVyKSA9PiBsZXR0ZXIgPT09IGNvb3Jkc1swXVswXSkgK1xyXG4gICAgICAgICAgICAoY29vcmRzLmxlbmd0aCAtIDEpICYmXHJcbiAgICAgICAgY29vcmRzWzBdWzFdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzFdXHJcbiAgICAgICkge1xyXG4gICAgICAgIGxldmVsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29vcmRzWzBdWzBdID09PSBjb29yZHNbY29vcmRzLmxlbmd0aCAtIDFdWzBdICYmXHJcbiAgICAgICAgTnVtYmVyKGNvb3Jkc1tjb29yZHMubGVuZ3RoIC0gMV1bMV0pID09PVxyXG4gICAgICAgICAgTnVtYmVyKGNvb3Jkc1swICsgKGNvb3Jkcy5sZW5ndGggLSAxKV1bMV0pXHJcbiAgICAgICkge1xyXG4gICAgICAgIHZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmVydGljYWwgfHwgbGV2ZWwpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2hlY2tJZkNlbGxPY2N1cGllZCA9ICgpID0+IHtcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiBjb29yZHMpIHtcclxuICAgICAgICBpZiAob2NjdXBpZWRDZWxscy5pbmNsdWRlcyhjb29yZCkpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGFkZGVkIENlbGwgZnJvbSBjb29yZCBhbmQgYWRqYWNlbnQgY2VsbHMgdG8gb2NjdXBpZWQgY2VsbHNcclxuICAgIGNvbnN0IGFkZE9jY3VwaWVkQ2VsbHMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxldHRlcnMgPSBbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImlcIiwgXCJqXCJdO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkTGV0dGVyID0gY29vcmRzW2ldWzBdO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkTnVtYmVyID0gY29vcmRzW2ldWzFdO1xyXG4gICAgICAgIGNvbnN0IEluZGV4SW5MZXR0ZXJzID0gbGV0dGVycy5maW5kKChsZXR0ZXIpID0+IGxldHRlciA9PT0gY29vcmRMZXR0ZXIpO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IFtcclxuICAgICAgICAgIGNvb3Jkc1tpXSxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YCxcclxuICAgICAgICAgIGAke2Nvb3JkTGV0dGVyfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSAtIDF9YCxcclxuICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgLSAxXX0ke2Nvb3JkTnVtYmVyfWAsXHJcbiAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtjb29yZE51bWJlcn1gLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgaSA9PT0gY29vcmRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzIC0gMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmFkaXVzLnB1c2goXHJcbiAgICAgICAgICAgIGAke2xldHRlcnNbSW5kZXhJbkxldHRlcnMgKyAxXX0ke051bWJlcihjb29yZE51bWJlcikgKyAxfWBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByYWRpdXMucHVzaChcclxuICAgICAgICAgICAgYCR7bGV0dGVyc1tJbmRleEluTGV0dGVycyAtIDFdfSR7TnVtYmVyKGNvb3JkTnVtYmVyKSArIDF9YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHJhZGl1cy5wdXNoKFxyXG4gICAgICAgICAgICBgJHtsZXR0ZXJzW0luZGV4SW5MZXR0ZXJzICsgMV19JHtOdW1iZXIoY29vcmROdW1iZXIpIC0gMX1gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmFkaXVzO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9maWx0ZXJ0aW5nIG9jY3VwaWVkIGNlbGxzIGZyb20gcmVwZXRpbmcgY2VsbHMgYW5kIGNlbGxzIG91dCBvZiBib3VuZFxyXG4gICAgY29uc3QgZmlsdGVyT2NjdXBpZWRDZWxscyA9IChyYWRpdXMgPSBhZGRPY2N1cGllZENlbGxzKCkpID0+IHtcclxuICAgICAgY29uc3QgcmVnZXggPSAvW2Etal0oMTB8WzAtOV0pLztcclxuICAgICAgZm9yIChjb25zdCBjb29yZCBvZiByYWRpdXMpIHtcclxuICAgICAgICBpZiAocmVnZXgudGVzdChjb29yZCkgJiYgIW9jY3VwaWVkQ2VsbHMuaW5jbHVkZXMoY29vcmQpKSB7XHJcbiAgICAgICAgICBvY2N1cGllZENlbGxzLnB1c2goY29vcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL2NoZWNraW5nIHNoaXBzIGFuZCBjb3JkcyBhZ2FpbnMgYWxsIGRlcGVuZGVjaWVzIFxyXG4gICAgaWYoIWNoZWNrRXhpc3RlbmNlT2ZTaGlwKCkpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2hpcCBhbHJlYWR5IGJlZW4gcGxhY2VkIG9yIG5vdCBleGlzdHMnKVxyXG4gICAgfVxyXG4gICAgaWYoIWNoZWNrQ29vcmRpbmF0ZXMoKSl7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb29yZGluYXRlcyBvdXQgb2YgcmFuZ2Ugb2YgdGhlIGJvYXJkIG9yIG5vdCBleGlzdHMnKVxyXG4gICAgfVxyXG4gICAgaWYoIWNoZWNrUGxhY2VtZW50KCkpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUG9zaXRpb24gb2Ygc2hpcCBpcyBub3QgYWxsb3dlZCcpXHJcbiAgICB9XHJcbiAgICBpZighY2hlY2tJZkNlbGxPY2N1cGllZCgpKXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3QgcGxhY2Ugc2hpcCBpbiBvbmUgb2YgY2hvc2VuIGNlbGxzJylcclxuICAgIH1cclxuXHJcbiAgICAvL2ZpbHRlcnRpbmcgb2NjdXBpZWQgY2VsbHMgZnJvbSByZXBldGluZyBjZWxscyBhbmQgY2VsbHMgb3V0IG9mIGJvdW5kXHJcbiAgICBmaWx0ZXJPY2N1cGllZENlbGxzKClcclxuICAgIGNvbnN0IG5ld1NoaXAgPSBzaGlwKGNvb3Jkcy5sZW5ndGgpXHJcbiAgICBcclxuICAgIG5ld1NoaXAuc2V0Q29vcmRpbmF0ZXMoY29vcmRzKVxyXG4gICAgY29uc29sZS5sb2coc2hpcE5hbWUpXHJcbiAgICBwbGFjZWRTaGlwcy5wdXNoKHtbYCR7c2hpcE5hbWV9YF06bmV3U2hpcH0pXHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXAsIGdldHBsYWNlZFNoaXBzIH07XHJcbn07XHJcbiIsIi8vZmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYWxsIHR5cGUgb2Ygc2hpcHMgYW5kIGF0dHJpYnV0IG1ldGhvZCB0byB0aGVtXHJcblxyXG5leHBvcnQgY29uc3Qgc2hpcCA9IChzaGlwTGVuZ3RoKSA9PiB7XHJcbiAgY29uc3QgbGVuZ3RoID0gKCkgPT4gc2hpcExlbmd0aDtcclxuXHJcbiAgLy8gc3RhdHVzIG9mIHNoaXBcclxuICBsZXQgc3VuayA9IGZhbHNlO1xyXG4gIGNvbnN0IGdldFN1bmsgPSAoKSA9PiBzdW5rO1xyXG5cclxuICAvL3RyYWNraW5nIG51bWJlciBvZiBoaXRzIHRvIHRoZSBzaGlwXHJcbiAgbGV0IGhpdE51bWJlciA9IDA7XHJcbiAgLy9yZXR1cm4gbnVtYmVyIG9mIGhpdHNcclxuICBjb25zdCBnZXRIaXRzID0gKCkgPT4gaGl0TnVtYmVyO1xyXG5cclxuICBjb25zdCBoaXQgPSAoKSA9PiB7XHJcbiAgICBoaXROdW1iZXIrKztcclxuICAgIGlmIChoaXROdW1iZXIgPj0gbGVuZ3RoKCkpIHtcclxuICAgICAgc3VuayA9IHRydWU7XHJcbiAgICB9fVxyXG5cclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XHJcbiAgICBjb25zdCBzZXRDb29yZGluYXRlcyA9IChjb29yZHMpID0+IHtcclxuICAgICAgaWYoY29vcmRzLmxlbmd0aCAhPT0gbGVuZ3RoKCkpe1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIG9mIGNvb3JkaW5hdGVzIGhhdmUgdG8gYmUgZXF1YWwgdG8gbGVuZ3RoIG9mIHRoZSBzaGlwJylcclxuICAgICAgfVxyXG4gICAgICB0cnl7XHJcbiAgICAgICAgY29vcmRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAoKSA9PiBjb29yZGluYXRlcztcclxuICBcclxuXHJcbiAgcmV0dXJuIHsgbGVuZ3RoLCBnZXRTdW5rLCBnZXRIaXRzLCBoaXQsIHNldENvb3JkaW5hdGVzLCBnZXRDb29yZGluYXRlcyB9O1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQoKTtcclxudHJ5IHtcclxuICBib2FyZC5wbGFjZVNoaXAoXCJzdWJtYXJpbmUxXCIsIFtcImExXCJdKTtcclxufSBjYXRjaCAoZXJyb3IpIHtcclxuICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbn1cclxuXHJcblxyXG5jb25zdCBhID0gYm9hcmQuZ2V0cGxhY2VkU2hpcHMoKVxyXG5jb25zb2xlLmxvZyhhWzBdLnN1Ym1hcmluZTEuZ2V0Q29vcmRpbmF0ZXMoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=