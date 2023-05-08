import { player, computer } from "./player";
import { createBoard, clickHandlerCoords, submitHandler, startGame, reset } from "./dom";



export const game = () => {

    const Player1 = player()
    const Computer = computer()

    createBoard('player')
    createBoard('computer')

    const submit = submitHandler()
    submit.submitForm(Player1.board)
    Computer.placeCompShips(Computer.board)
    reset()
    startGame(clickHandlerCoords,'computer', Computer, Player1)

}