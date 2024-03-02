function saveToLocalStorage() {
  const rollArray = Array.from(cart);
  const rollArrayString = JSON.stringify(rollArray);
  localStorage.setItem('storedRolls', rollArrayString);
}


function retrieveFromLocalStorage() {
    const rollArrayString = localStorage.getItem('storedRolls');
    const rollArray = JSON.parse(rollArrayString);
    for (const rollData of rollArray) {
      cart.push(rollData);
    }
}



