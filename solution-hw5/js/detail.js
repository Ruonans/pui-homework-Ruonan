
const glazingOptions = {
    'Keep original': 0.00,
    'Sugar milk': 0.00,
    'Vanilla milk': 0.50,
    'Double chocolate': 1.50
};
  
  const packOptions = {
    '1': 1,
    '3': 3,
    '6': 5,
    '12': 10
};

const basePrice = rolls[chosenRoll].basePrice;
let glazingChange =  glazingOptions['Keep original'];
let packChange = packOptions['1'];
displayPrice();


function getGlazingP (){
    let glazingOption = this.options[this.selectedIndex].text;
    glazingChange = glazingOptions[glazingOption];
    displayPrice();
}

function getPackP (){
    let packOption = this.options[this.selectedIndex].text;
    packChange = packOptions[packOption];
    displayPrice();
}


function displayPrice(){
    let finalPrice = document.querySelector('#price');
    finalPrice.innerText = (Math.round((basePrice + glazingChange) * packChange * 100)/100).toFixed(2);
}

let selectGlazing = document.querySelector('#glazing-select');
let selectPack = document.querySelector('#pack-select');

selectGlazing.addEventListener('change', getGlazingP);
selectPack.addEventListener('change', getPackP);




