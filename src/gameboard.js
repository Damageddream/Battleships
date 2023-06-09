import { ship } from "./ship";

export const gameboard = () => {
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
    const newShip = ship(coords.length);
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
