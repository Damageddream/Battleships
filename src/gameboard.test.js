import { gameboard } from "./gameboard";

const testGameboard = gameboard();
testGameboard.placeShip("submarine1", ["a1"]);
const placedShips = testGameboard.getplacedShips();

test("check if board elements are unchanged", () => {
  expect(testGameboard.board).toEqual([
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
  ]);
});

test("checki if can play ship that does not exists", () => {
  expect(() => {
    testGameboard.placeShip("motorboat", ["a5"]);
  }).toThrow('Ship already been placed or not exists');
});

test("checking if can place submarine", () => {

  expect(placedShips[0]["submarine1"].getCoordinates()).toEqual(["a1"]);
});

test("checking if placing on the same cell throws error", () => {
  expect(() => {
    testGameboard.placeShip("submarine2", ["a1"]);
  }).toThrow('You cannot place ship in one ofalready occupied or adjecntes cells');
});

test("checking if placing in connected cell with other ship throws error", () => {
  expect(() => {
    testGameboard.placeShip("submarine2", ["a2"]);
  }).toThrow('You cannot place ship in one ofalready occupied or adjecntes cells');
});

test("checking if placing ship in disconnected cells throws error ", () => {
  expect(() => {
    testGameboard.placeShip("destroyer", ["a4", "i2"]);
  }).toThrow('Position of ship is not allowed');
});

test("checking if placing ship in not existing cell throws error", () => {
  expect(() => {
    testGameboard.placeShip("submarine2", ["z2"]);
  }).toThrow('Coordinates out of range of the board or not exists');
});

test("checking if placing ship that already been placed throws error", () => {
  expect(() => {
    testGameboard.placeShip("submarine1", ["g8"]);
  }).toThrow('Ship already been placed or not exists');
});

test('checking if ship has been placed',()=>{
    expect(placedShips[0]['submarine1'].getCoordinates()).toEqual(['a1'])
})
