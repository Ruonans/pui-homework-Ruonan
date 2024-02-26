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

const glazingOptions = {
    'Original': 0.00,
    'Sugar Milk': 0.00,
    'Vanilla Milk': 0.50,
    'Double Chocolate': 1.50
};
  
  const packOptions = {
    '1': 1,
    '3': 3,
    '6': 5,
    '12': 10
};


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element =null;
    }
}

//create an empty cart list
const cart = [];

//calculate final price at the bottom
let finalP = 0;
const totalPrice = document.querySelector(".totalP");

function finalPrice(cart){
    finalP = 0;
    for (const roll of cart) {
        const price = getCalculatedPrice(roll);
        finalP = finalP + parseFloat(price);
    }
}

//add new roll to the cart array
function addNewRoll(rollType, rollGlazing, packSize) {
    let basePrice = rolls[rollType].basePrice;
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(roll);
    return roll;
}

//get the calculated price for each roll
function getCalculatedPrice(roll){
    let glazingChange =  glazingOptions[roll.glazing];
    let packChange = packOptions[roll.size];
    const rollPrice = (Math.round((roll.basePrice + glazingChange) * packChange * 100)/100).toFixed(2);
    return rollPrice;
}

//add four roll objects
const roll4 = addNewRoll("Apple", "Original", 3);
const roll3 = addNewRoll("Raisin", "Sugar Milk", 3);
const roll2 = addNewRoll("Walnut", "Vanilla Milk", 12);
const roll1 = addNewRoll("Original", "Sugar Milk", 1);


//add all objects in the cart to the cart page
for (const roll of cart) {
    addToCart(roll);
}

//add roll to the cart page
function addToCart(roll) {
    // Clone the template
    const template = document.querySelector('#my-roll');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector('.p1');
    //remove the roll
    const btnDelete = roll.element.querySelector('.remove-button');
    console.log(btnDelete);
    btnDelete.addEventListener('click', () => {
        deleteRoll(roll);
    });
    //append each clones to the cart page
    const rollListElement = document.querySelector('.products');
    rollListElement.prepend(roll.element);
    //update the elements in the template for the roll
    updateElement(roll);
    //calculate and update the total price at the bottom 
    finalPrice(cart);
    totalPrice.innerText = "$ " + (finalP).toFixed(2);
}

//update elements in the template for each roll
function updateElement(roll){
    roll.element.querySelector('.roll-image').src = '../assets/products/' + rolls[roll.type].imageFile;  
    roll.element.querySelector('.roll-type').textContent = roll.type + " Cinnamon Roll";
    roll.element.querySelector('.roll-glazing').textContent = "Gazing: " + roll.glazing;
    roll.element.querySelector('.roll-pack').textContent = "Pack Size: " + roll.size;
    roll.element.querySelector('.calculated-price').textContent ="$ "+ getCalculatedPrice(roll);
}
       
//remove the roll
function deleteRoll(roll) {
    //remove the roll from cart page
    roll.element.remove();
    //remove the roll from cart list
    let index = cart.indexOf(roll);
    cart.splice(index, 1);
    //update the total price at the bottom
    finalPrice(cart);
    totalPrice.innerText = "$ " + (finalP).toFixed(2);
}



