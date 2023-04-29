//factory function that creates all type of ships and attribut method to them

export const ship = (shipLength) => {
  const length = () => shipLength;

  // status of ship
  let sunk = false;
  const getSunk = () => sunk;

  //tracking number of hits to the ship
  let hitNumber = 0;
//return number of hits
  const getHits = () => hitNumber;

  const hit = () => {  
    hitNumber++;
    if (hitNumber >= length()) {
      sunk = true;
    }
  };

 

  return { length, getSunk, getHits, hit, };
};
