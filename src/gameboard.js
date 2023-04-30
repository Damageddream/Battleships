export const gameboard = () => {
  const board = [
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
  ];
  //ships and coordinates of ships that already have been placed
  const placedShips = [];
  const getplacedShips = () => placedShips;

  //checking if coordinates are allowed and placing ships in placedShips
  const placeShip = (ship, coords) => {

    const ships = ['submarine1', 'submarine2', 'destroyer1', 'destroyer2', 'cruiser', 'battleship', 'aircraftCarrier']

    //list of cells that laready hav ships on them
    const occupiedCells = []

    //checks if passed ship exists
    const checkExistenceOfShip = () => {
        for(const item of ships){
            if(ship === item){
                ships.splice(ships.indexOf(item),1)
                return true
            }
        }
        return false
    }
    
    //check if passed coord exists
    const checkCoordinates = () =>{
        const regex = /[a-j](10|[0-9])/
        for(const coord of coords){
            if(!regex.test(coord)){
                return false
            }
            return true
        }
    }

    //check if passed cords are allowed positionally
    const checkPlacement = () => {
        const letters = []
        if(coords[-1][0])
    }


  };

  return { board, placeShip, getplacedShips };
};
