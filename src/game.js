import { player, computer } from "./player";
import { createBoard, clickHandlerCoords, submitHandler, startGame, reset } from "./dom";
import { computerTurn } from "./utilities";


export const game = () => {

    const Player1 = player()
    const Computer = computer()

    createBoard('player')
    createBoard('computer')

    const submit = submitHandler()
    submit.submitForm(Player1.board)
    Computer.placeCompShips(Computer.board)

    clickHandlerCoords('computer', Computer, Player1)

    reset()

    const gameLoop = () => {

        while (!Player1.board.allShipsSunked() && !Computer.board.allShipsSunked()) {
            console.log('hi')
            computerTurn(Computer, Player1)
        }
    }
    startGame(gameLoop)

}