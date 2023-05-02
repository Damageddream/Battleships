import { player, computer } from "./player";


export const game = () => {

    const Player1 = player()
    const Computer = computer()

    const placePlayerShips = ()=>{
        // Player1.board.placeShip("submarine1", ['a1'])
        // Player1.board.placeShip("submarine2", ['c1'])
        // Player1.board.placeShip("destroyer1", ['e1','e2'])
        Player1.board.placeShip("destroyer2", ['g2','h2'])
        // Player1.board.placeShip("cruiser", ['a4','b4', 'c4'])
        // Player1.board.placeShip("battleship", ['e4','e5', 'e4', 'e7'])
        // Player1.board.placeShip("aircraftCarrier", ['h4','h5', 'h4', 'h7', 'h8'])
    }

    const placeComputerShips = ()=>{
        // Computer.board.placeShip("submarine1", ['a1'])
        // Computer.board.placeShip("submarine2", ['c1'])
        // Computer.board.placeShip("destroyer1", ['e1','e2'])
        Computer.board.placeShip("destroyer2", ['g2','h2'])
        // Computer.board.placeShip("cruiser", ['a4','b4', 'c4'])
        // Computer.board.placeShip("battleship", ['e4','e5', 'e4', 'e7'])
        // Computer.board.placeShip("aircraftCarrier", ['h4','h5', 'h4', 'h7', 'h8'])
    }

    try{
        placePlayerShips()
    }
    catch(error){
        console.log(error)
    }

    try{
        placeComputerShips()
    }
    catch(error){
        console.log(error)
    }


}