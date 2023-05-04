import { gameboard } from "./gameboard";

export const player = () => {
  //tracking turn and changes turn
  let turn = false;
  const changeTurn = () => (turn = !turn);
  const getTurn = ()=>turn

  //creates player gameboard
  const board = gameboard();

  //takes enemy board and coord that is shoot target and return false when miss or hitted Ship when hit
  const shoot = (enemyBoard, coord) => enemyBoard.receiveAttack(coord);
  return { turn, changeTurn, board, shoot, getTurn };
};



export const computer = () => {
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
