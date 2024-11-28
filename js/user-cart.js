let itemToDelete = null;
const iconCartSpan = document.querySelector(".cart-icon span");
let productCart = [];
const listcartsProductHTML = document.getElementById('cart-items');
const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const emptyListMessage = document.getElementById("empty-cart-message");

// Load cart from localStorage
const loadFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    productCart = storedCart ? JSON.parse(storedCart) : [];
    renderCart();
    updateTotal();
};

// Render cart items to HTML
const renderCart = () => {
    listcartsProductHTML.innerHTML = '';
    let totalQuantity = 0;

    productCart.forEach(item => {
        totalQuantity += item.quantity;
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <div class="cart-item d-flex align-items-center justify-content-between mb-3 border p-4 border-3">
                <div class="item-detail d-flex align-items-center">
                    <img src="${item.image}" alt="Ảnh sách">
                    <div class="ms-3">
                        <p class="fw-bold">${item.productName}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <input type="number" class="form-control text-center" value="${item.quantity}" min="1" style="width: 60px;">
                    <span class="ms-2 fw-bold">${item.productPrice}</span>
                </div>
                <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
        listcartsProductHTML.appendChild(newItem);
    });

    iconCartSpan.innerText = totalQuantity;
};

// Update total price and quantity
const updateTotal = () => {
    const total = productCart.reduce((acc, item) => {
        const price = parseFloat(item.productPrice.replace("đ", "").replace('.', ''));
        return acc + price * item.quantity;
    }, 0);

    const totalElement = document.querySelector(".cart-total span.text-danger");
    if (totalElement) {
        totalElement.innerText = total.toLocaleString("vi-VN") + " đ";
    }

    const totalQuantity = productCart.reduce((acc, item) => acc + item.quantity, 0);
    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : '99+';

    // Show/hide empty cart message
    listcartsProductHTML.style.display = totalQuantity > 0 ? 'block' : 'none';
    emptyListMessage.style.display = totalQuantity === 0 ? 'block' : 'none';
};

// Handle delete button click
listcartsProductHTML.addEventListener('click', (event) => {
    if (event.target.closest('.btn-danger')) {
        itemToDelete = event.target.closest('.item');
    }
});

// Confirm deletion of item
confirmDeleteButton.addEventListener("click", () => {
    if (itemToDelete) {
        const productName = itemToDelete.querySelector('.fw-bold').textContent;  // Lấy tên sản phẩm
        const productIndex = productCart.findIndex(product => product.productName === productName);  // Tìm sản phẩm theo tên

        if (productIndex !== -1) {
            productCart.splice(productIndex, 1);  // Xóa sản phẩm khỏi giỏ hàng
            localStorage.setItem('cart', JSON.stringify(productCart));  // Lưu lại giỏ hàng vào localStorage
            itemToDelete.remove();  // Xóa sản phẩm khỏi DOM
            itemToDelete = null;  // Đặt lại itemToDelete để tránh xóa nhầm
            updateTotal();  // Cập nhật lại tổng giá trị và số lượng giỏ hàng
            confirmDeleteModal.hide();  // Đóng modal xác nhận
        } else {
            console.log("Sản phẩm không tồn tại trong giỏ hàng.");
        }
    } else {
        console.log("Không có sản phẩm để xóa.");
    }
});


// Handle quantity change
listcartsProductHTML.addEventListener('change', (event) => {
    if (event.target.tagName.toLowerCase() === 'input' && event.target.type === 'number') {
        const inputField = event.target;
        const newQuantity = parseInt(inputField.value);
        if (newQuantity > 0) {
            const productName = inputField.closest('.item').querySelector('.fw-bold').textContent;  // Lấy tên sản phẩm
            changeQuantity(productName, newQuantity);
        } else {
            inputField.value = 1;  // Nếu số lượng nhỏ hơn 1, đặt lại về 1
        }
    }
});

// Change product quantity
const changeQuantity = (productName, newQuantity) => {
    const productIndex = productCart.findIndex(product => product.productName === productName);
    if (productIndex !== -1) {
        productCart[productIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(productCart));
        renderCart();
        updateTotal();
    }
};


// Initialize the cart on page load
loadFromLocalStorage();