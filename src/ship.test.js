import { ship } from "./ship";

const aircraftCarrier = ship(5);
const battleship = ship(4);
const cruiser = ship(3);
const destroyer = ship(2);
const submarine = ship(1);

describe("checking length of a ship", () => {
  test("lenght of aircraftCarrier", () => {
    expect(aircraftCarrier.length()).toBe(5);
  });
  test("lenght of aircraftCarrier", () => {
    expect(battleship.length()).toBe(4);
  });
  test("lenght of cruiser", () => {
    expect(cruiser.length()).toBe(3);
  });
  test("lenght of destroyer", () => {
    expect(destroyer.length()).toBe(2);
  });
  test("lenght of submarine", () => {
    expect(submarine.length()).toBe(1);
  });
});

aircraftCarrier.hit();
aircraftCarrier.hit();

describe("checking hitNumber of a ship", () => {
  test("lenght of ship", () => {
    expect(aircraftCarrier.getHits()).toBe(2);
  });
});

describe("checking if ship sinked after hits", () => {
  beforeEach(() => {
    destroyer.hit();
  });

  test("sink status of destroyer", () => {
    expect(destroyer.getSunk()).toBeFalsy();
  });
  test("sink status of destroyer", () => {
    expect(destroyer.getSunk()).toBeTruthy();
  });
});
