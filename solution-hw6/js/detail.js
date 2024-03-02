//create dropdown
const glazeDropdown = document.querySelector('#glazing-select');
for (op in glazingOptions){
    const drop = document.createElement('option');
    drop.value = op;
    drop.textContent = op;
    glazeDropdown.appendChild(drop);
}

const packDropdown = document.querySelector('#pack-select');
for (op in packOptions){
    const drop = document.createElement('option');
    drop.value = op;
    drop.textContent = op;
    packDropdown.appendChild(drop);
}



//get addon prices
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

//display price 
function displayPrice(){
    let finalPrice = document.querySelector('#price');
    finalPrice.innerText = (Math.round((basePrice + glazingChange) * packChange * 100)/100).toFixed(2);
}

let selectGlazing = document.querySelector('#glazing-select');
let selectPack = document.querySelector('#pack-select');

selectGlazing.addEventListener('change', getGlazingP);
selectPack.addEventListener('change', getPackP);



//search params
const queryString = window.location.search;

// create params object:
const params = new URLSearchParams(queryString);

// access params
const chosenRoll = params.get('roll');
const basePrice = rolls[chosenRoll].basePrice;
let glazingChange =  glazingOptions['Keep original'];
let packChange = packOptions['1'];
displayPrice();


// update detail page.

// Update the header text
const headerElement = document.querySelector('.content');
headerElement.innerText = chosenRoll + ' Cinnamon Roll';

// Update the image
const rollImage = document.querySelector('#roll-img');
rollImage.src = '../assets/products/' + rolls[chosenRoll].imageFile;

const cart = [];


function addNewRoll(){
    let G = document.querySelector('#glazing-select');
    let glazingText = G.options[G.selectedIndex].text;
    let S = document.querySelector('#pack-select');
    let sizeText = S.options[S.selectedIndex].text;
    const newroll = new Roll(chosenRoll, glazingText, sizeText, basePrice);
    cart.push(newroll);
    badge.innerText = cart.length;
    saveToLocalStorage();
    console.log(cart);
};

if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
} 

const badge = document.querySelector('.badge');
badge.innerText = cart.length;



