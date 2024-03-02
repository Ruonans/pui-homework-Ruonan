const cart = [];
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
} 

const badge = document.querySelector('.badge');
badge.innerText = cart.length;