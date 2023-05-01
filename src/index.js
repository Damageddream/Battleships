import { gameboard } from "./gameboard";

const board = gameboard();
try {
  board.placeShip("submarine1", ["a1"]);
} catch (error) {
  console.log(error);
}


const a = board.getplacedShips()
console.log(a[0].submarine1.getCoordinates())