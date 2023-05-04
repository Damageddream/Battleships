import { player, computer } from "./player";
import { createBoard, clickHandlerCoords, submitHandler} from "./dom";

const Player1 = player()
const Computer = computer()

createBoard('player')
clickHandlerCoords('player')

const submit = submitHandler()
submit.submitForm(Player1.board)
