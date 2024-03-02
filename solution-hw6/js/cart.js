const cart = []
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
}


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


//get the calculated price for each roll
function getCalculatedPrice(roll){
    let glazingChange =  glazingOptions[roll.glazing];
    let packChange = packOptions[roll.size];
    const rollPrice = (Math.round((roll.basePrice + glazingChange) * packChange * 100)/100).toFixed(2);
    return rollPrice;
}


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
};
       
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
    badge.innerText = cart.length;
    saveToLocalStorage();
    console.log(cart);
};

const badge = document.querySelector('.badge');
badge.innerText = cart.length;



