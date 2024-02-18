const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};


//search params
const queryString = window.location.search;

console.log(queryString);

// create params object:
const params = new URLSearchParams(queryString);

console.log(params);

// access params
const chosenRoll = params.get('roll');

console.log(chosenRoll);


// update detail page.

// Update the header text
const headerElement = document.querySelector('.content');
headerElement.innerText = chosenRoll + ' Cinnamon Roll';

// Update the image
const rollImage = document.querySelector('#roll-img');
rollImage.src = '../assets/products/' + rolls[chosenRoll].imageFile;

/*--------------------------------ADD TO CART----------------------------------*/
const cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


function addNewRoll(){
    let G = document.querySelector('#glazing-select');
    let glazingText = G.options[G.selectedIndex].text;
    let S = document.querySelector('#pack-select');
    let sizeText = S.options[S.selectedIndex].text;
    let basePriceAdd = document.querySelector('#price').innerText;
    const newroll = new Roll(chosenRoll, glazingText, sizeText, basePriceAdd);
    cart.push(newroll);
    console.log(cart);
}



