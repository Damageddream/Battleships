import { gameboard } from "./gameboard";

const board = gameboard();
try {
    board.placeShip("submarine1", ["a1"])
    board.placeShip("submarine2", ["a2"])
} catch (error) {
  console.log(error);
}
const a = board.getplacedShips()

