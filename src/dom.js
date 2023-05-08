import { makeCoords, formValidation, computerTurn } from "./utilities";
import { game, } from "./game";

//creating grid 10x10 with rows 1-10 and columns a-j, setting every data sett of cell to match coordinates
export const createBoard = (player) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const playerBoard = document.querySelector(`.${player}` + 'board')
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

export const clickHandlerCoords = (name, player, selfTurn) => {
    const allCells = document.querySelectorAll(`.${name}` + 'cell')
    allCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const hitShip = player.board.receiveAttack(cell.dataset.coordinates)
            if(hitShip){
                markHit(cell)
                if(hitShip.getSunk()){
                    if(player.board.allShipsSunked()){
                        declareWinner(name)
                    }
                }
                
            }
            else{
                markMiss(cell)
                player.changeTurn()
                selfTurn.changeTurn()
                computerTurn(player, selfTurn)
            }

        }, {once: true})
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
    const legend = document.querySelector('.shiptype')

    legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
    const form = document.querySelector('form')
    const submitForm = (board) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            resetError()
            const coordStart = e.target[0].value.trim().toLowerCase()
            const coordEnd = e.target[1].value.trim().toLowerCase()
            const coords = makeCoords(coordStart, coordEnd, ships[0][1])
            try {
                formValidation(coordStart)
                formValidation(coordEnd)
                markPlacedShip(coords)
                board.placeShip(ships[0][0], coords)
                ships.shift()
                if (ships.length <= 0) {
                    shipsHasBennPlaced()
                }
                else{
                    legend.textContent = `${ships[0][0]} with length of ${ships[0][1]}`
                }
                
            } 
            catch (error) {
                console.log(error)
                displayError(error.message)
            }

        })
    }
    return { submitForm }
}

const displayError = error => {
    const errorDiv = document.querySelector('.error')
    errorDiv.style.display = 'block'
    errorDiv.textContent = error
}

const resetError = () => {
    const errorDiv = document.querySelector('.error')
    errorDiv.style.display = 'none'
}

const markPlacedShip = (coords) => {
    for (const coord of coords) {
        const divCoord = document.querySelector(`.playercell[data-coordinates='${coord}']`)
        divCoord.classList.add('placed')

    }
}

const shipsHasBennPlaced = () => {
    const form = document.querySelector('form')
    const startBtn = document.querySelector('.start')

    form.style.display = 'none'
    startBtn.style.display = 'block'
}

const markHit = element => {
    element.classList.add('hit')
}
const markMiss = (element) => {
    element.classList.add('miss')
}

export const declareWinner = (winner) => {
    const winnerDiv = document.querySelector('.winner')
    winnerDiv.style.display = 'block'
    // const main = document.querySelector('.main')
    let winnerName;
    if(winner==='computer'){
        winnerName = 'Winner is Player1'
    }
    else{
        winnerName = 'Winner is Computer'
    }
    winnerDiv.textContent = `${winnerName}`
    // main.replaceWith(main.cloneNode(true))
}

export const startGame = (callback, name, computer, player)=>{
    const start = document.querySelector('.start')

    start.addEventListener('click',()=>{
        callback(name, computer, player)
    })
}

export const reset = () => {
    const reset = document.querySelector('.reset')
    const playerboard = document.querySelector('.playerboard')
    const compboard = document.querySelector('.computerboard')
    const form = document.querySelector('form')
    const startBtn = document.querySelector('.start')
    const winnerDiv = document.querySelector('.winner')
    reset.addEventListener('click',()=>{
        winnerDiv.style.display = 'none'
        playerboard.innerHTML = ''
        compboard.innerHTML = ''
        form.style.display = 'block'
        startBtn.style.display = 'none'
        game()
    })
}