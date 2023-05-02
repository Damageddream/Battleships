import { player, computer } from "./player";
import { gameboard } from "./gameboard";

const testBoard = gameboard()
const testBoard2 = gameboard()
const Player1 = player()
const Computer = computer()


test('checking if turns is falst at begginig', ()=>{
    expect(Player1.getTurn()).toBeFalsy()
})
test('checking if turns changes', ()=>{
    Player1.changeTurn()
    expect(Player1.getTurn()).toBeTruthy()
})

test('checking if creating board for a player', ()=>{
    expect(Player1.board.board).toEqual([
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
      ])
})


test('checking if computers avaliable target is one array of all cords', ()=>{
    expect(Computer.avaliableCoordToTarget).toEqual([
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
    )
})

test('check if shoot method triggers receive attack with passed coord',()=>{
    jest.spyOn(testBoard, 'receiveAttack').mockReturnValue('a1')
    expect(Player1.shoot(testBoard, 'a1')).toBe('a1')
})

test('check if computer chooses random index from avaliable', ()=>{
    Computer.shootComp(testBoard2, 2)
    expect(Computer.avaliableCoordToTarget).not.toContain('c1')
})