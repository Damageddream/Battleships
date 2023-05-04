import { ship } from "./ship";
import { makeCoords } from "./utilities";

//creating grid 10x10 with rows 1-10 and columns a-j, setting every data sett of cell to match coordinates
export const createBoard = (player) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const playerBoard = document.querySelector(`.${player}` + 'board')
    console.log(playerBoard)

    letters.forEach(letter => {
        const divContainer = document.createElement('div')
        divContainer.classList.add(`column`)
        divContainer.classList.add(`${letter}`)
        for (let i = 0; i < 10; i++) {
            const div = document.createElement('div')
            div.classList.add(`${player}cell`)
            div.classList.add('cell')
            div.textContent = `${letter}${i + 1}`
            div.dataset.coordinates = `${letter}${i + 1}`
            divContainer.appendChild(div)
        }
        playerBoard.appendChild(divContainer)
    })
}

export const clickHandlerCoords = (player) => {
    const allCells = document.querySelectorAll(`.${player}` + 'cell')
    allCells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log(cell)
        })
    })
}

export const submitHandler = () => {
    const ships = [
        ["submarine1", 1,],
        ["submarine2", 1,],
        ["destroyer1", 2,],
        ["destroyer2", 2,],
        ["cruiser", 3,],
        ["battleship", 4,],
        ["aircraftCarrier", 5],
    ]
    const legend = document.querySelector('legend')
    legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
    const form = document.querySelector('form')
    const submitForm = (board)=>{form.addEventListener('submit', (e) => {
        e.preventDefault()
        const coordStart = e.target[0].value.trim().toLowerCase()
        const coordEnd = e.target[1].value.trim().toLowerCase()
        const coords = makeCoords(coordStart, coordEnd, ships[0][1])
        try{
            board.placeShip(ships[0][0], coords)
            ships.shift()
            legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
        }
        catch(error){
            console.log(error)
        }

    })}
    return {submitForm}
}

