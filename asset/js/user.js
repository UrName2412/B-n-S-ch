const iconCartSpan = document.querySelector(".cart-icon span");
let productCart = [];

const loadFromsessionStorage = () => {
    const storedCart = sessionStorage.getItem('cart');
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

loadFromsessionStorage();