let itemToDelete = null;
const iconCartSpan = document.querySelector(".cart-icon span");
let productCart = [];
const listcartsProductHTML = document.getElementById('cart-items');
const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const emptyListMessage = document.getElementById("empty-cart-message");

// Utility function to escape HTML special characters
const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// Load cart from sessionStorage
const loadFromsessionStorage = () => {
    const storedCart = sessionStorage.getItem('cart');
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
            <div class="cart-item">
                <!-- Chi tiết sản phẩm -->
                <div class="item-detail">
                    <img src="${escapeHTML(item.image)}" alt="Ảnh sách">
                    <div>
                        <p class="fw-bold">${escapeHTML(item.productName)}</p>
                    </div>
                </div>
                <!-- Số lượng và giá -->
                <div class="d-flex align-items-center">
                    <input type="number" class="form-control text-center" value="${escapeHTML(item.quantity)}" min="1" style="width: 60px;">
                    <span class="ms-2 fw-bold">${escapeHTML(formatVND(item.productPrice))}</span>
                </div>
                <!-- Nút xóa -->
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
        const productName = itemToDelete.querySelector('.fw-bold').textContent;
        const productIndex = productCart.findIndex(product => product.productName === productName);

        if (productIndex !== -1) {
            productCart.splice(productIndex, 1);
            sessionStorage.setItem('cart', JSON.stringify(productCart));
            itemToDelete.remove();
            itemToDelete = null;
            updateTotal();
            confirmDeleteModal.hide();
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
            const productName = inputField.closest('.item').querySelector('.fw-bold').textContent;
            changeQuantity(productName, newQuantity);
        } else {
            inputField.value = 1;
        }
    }
});

// Change product quantity
const changeQuantity = (productName, newQuantity) => {
    const productIndex = productCart.findIndex(product => product.productName === productName);
    if (productIndex !== -1) {
        productCart[productIndex].quantity = newQuantity;
        sessionStorage.setItem('cart', JSON.stringify(productCart));
        renderCart();
        updateTotal();
    }
};

const checkCart = () => {
    if (productCart.length === 0) {
        const emptyCart = new bootstrap.Modal(document.getElementById('empty'));
        emptyCart.show();
        return;
    }

    const totalQuantity = productCart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity > 100) {
        alert("Bạn chỉ được mua tối đa 100 sản phẩm trong một lần đặt hàng!");
        return;
    }

    window.location.href = "thanhtoan.php";
}

function removeSessionCart() {
    sessionStorage.removeItem("cart");
    iconCartSpan.innerText = 0;
    cart = [];
}

function formatVND(value) {
    const cleaned = String(value).replace(/[^\d]/g, '');
    const number = Number(cleaned);
    if (isNaN(number)) return '0 đ';

    return number.toLocaleString('vi-VN') + ' đ';
}

loadFromsessionStorage();