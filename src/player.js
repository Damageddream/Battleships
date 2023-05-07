import { gameboard } from "./gameboard";

export const player = () => {
    //tracking turn and changes turn
    let turn = false;
    const changeTurn = () => (turn = !turn);
    const getTurn = () => turn;

    //creates player gameboard
    const board = gameboard();

    //takes enemy board and coord that is shoot target and return false when miss or hitted Ship when hit
    const shoot = (enemyBoard, coord) => enemyBoard.receiveAttack(coord);
    return { turn, changeTurn, board, shoot, getTurn };
};

export const computer = () => {
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
        const hitCoord = avaliableCoordToTarget[coord]
        console.log(avaliableCoordToTarget[coord])
        avaliableCoordToTarget.splice(coord, 1);
        
        return [hitShip, hitCoord]
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
