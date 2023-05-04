//given starting end ending coords, based of vertical/level making array that 

export const makeCoords = (startCoord, endCoord, lengthy) => {
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const coords = []
    if(lengthy === 1){
        coords.push(startCoord)
        return coords;
    }
    for (let i = 0; i < lengthy; i++) {
        if (startCoord[0] === endCoord[0]) {
            coords.push(`${startCoord[0]}${i+1}`)
        }
        else if(startCoord[1] === endCoord[1]){
            coords.push(`${letters[letters.findIndex(letter=>letter===startCoord[0])+i]}${endCoord[1]}`)
        }
    }
    return coords;
}