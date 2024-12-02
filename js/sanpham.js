let cart = [];
let iconCartSpan = document.querySelector(".cart-icon span");

const listProductHTML = document.querySelectorAll('.btn');
const notification = document.getElementById("notification");
console.log(notification)
// Add event listeners for all add-to-cart buttons
listProductHTML.forEach(addButton => {
    addButton.addEventListener('click', event => {
        const card = event.target.closest('.card');
        const productTitle = card.querySelector('.card-title').textContent;
        const productPrice = card.querySelector('.card-text.text-danger').textContent;
        const imageUrl = card.querySelector('.card-img-top').src;
        addButton.addEventListener("click", showNotification);
        addToCart(productTitle, productPrice, imageUrl);
    });
});

// Function to add product to cart
const addToCart = (productName, productPrice, imageUrl) => {
    let productThisPositionInCart = cart.findIndex((value) => value.productName == productName);

    if (cart.length <= 0) {
        cart = [{
            image: imageUrl,
            productName: productName,
            productPrice: productPrice,
            quantity: 1
        }];
    } else if (productThisPositionInCart < 0) {
        cart.push({
            image: imageUrl,
            productName: productName,
            productPrice: productPrice,
            quantity: 1
        });
    } else {
        cart[productThisPositionInCart].quantity += 1;
    }

    // Save cart to localStorage and update cart icon
    addToLocalStorage();
};

// Function to save cart to localStorage and update the cart icon
const addToLocalStorage = () => {
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart icon with the total quantity
    if (totalQuantity < 99) {
        iconCartSpan.innerText = totalQuantity;
    } else {
        iconCartSpan.innerText = '99+';
    }
};

// Function to load cart from localStorage
const loadFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
    
    // Update cart icon with the total quantity on page load
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    if (totalQuantity < 99) {
        iconCartSpan.innerText = totalQuantity;
    } else {
        iconCartSpan.innerText = '99+';
    }
};

// Initialize the cart on page load
loadFromLocalStorage();
