//given starting end ending coords, based of vertical/level making array that 
import { declareWinner } from "./dom";
export const makeCoords = (startCoord, endCoord, lengthy) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const coords = []
    if (lengthy === 1) {
        coords.push(startCoord)
        return coords;
    }
    for (let i = 0; i < lengthy; i++) {
        if (startCoord[0] === endCoord[0]) {
            coords.push(`${startCoord[0]}${Number(startCoord[1]) + i}`)
        }
        else if (startCoord[1] === endCoord[1]) {
            coords.push(`${letters[letters.findIndex(letter => letter === startCoord[0]) + i]}${endCoord[1]}`)
        }
    }
    return coords;
}

export const formValidation = (value) => {
    if (value.length <= 0) {
        throw new Error('Coordinates need to be 2 or 3 characters long')
    }

}

export const computerTurn = (computer, enemy) => {
    if (computer.getTurn()) {
        const hitShip = computer.shootComp(enemy.board)
        const coord = hitShip[1]
        const divCoord = document.querySelector(`.playercell[data-coordinates='${coord}']`)
        if (hitShip[0]) {
            divCoord.classList.add('hit')
            if (hitShip[0].getSunk()) {
                if (enemy.board.allShipsSunked()) {
                    declareWinner('player')
                }
            }
            computerTurn(computer, enemy)
        }   
        else {
            divCoord.classList.add('miss')
            computer.changeTurn()
            enemy.changeTurn()
        }
      
    }
}