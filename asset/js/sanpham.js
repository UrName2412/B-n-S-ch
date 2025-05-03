let cart = [];
let iconCartSpan = document.querySelector(".cart-icon span");
const modalElement = document.getElementById("cartModal");
const listProductHTML = document.querySelector(".listProduct");

document.addEventListener("DOMContentLoaded", () => {
    loadFromsessionStorage();

    // Xử lý sự kiện thêm vào giỏ hàng từ danh sách sản phẩm
    listProductHTML.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn")) {
            const card = event.target.closest(".card");
            const productTitle = card.querySelector(".card-title").textContent;
            const productPrice = card.querySelector(".card-text.text-danger").textContent;
            const imageUrl = card.querySelector(".card-img-top").src;
            const productId = card.querySelector(".view-detail").getAttribute("data-id");

            addToCart(productTitle, productPrice, imageUrl, productId);

            let notification = new bootstrap.Modal(modalElement);
            notification.show();
        }
    });

    const searchInput = document.getElementById("searchTheLoai");
    const select = document.getElementById("theloai");

    // Lưu toàn bộ option gốc (trừ option đầu tiên)
    const originalOptions = Array.from(select.options).slice(1);

    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();

        // Giữ lại option đầu tiên
        select.innerHTML = '<option value="">-- Chọn thể loại --</option>';

        // Lọc và thêm lại các option phù hợp
        originalOptions
            .filter(option => option.text.toLowerCase().includes(keyword))
            .forEach(option => select.appendChild(option));
    });
});

const addToCart = (productName, productPrice, imageUrl, productId) => {
    const MAX_QUANTITY = 99;
    const MAX_CART_ITEMS = 20;

    if (!productName || !productPrice || !imageUrl || !productId) {
        console.error("Missing required product information");
        return;
    }

    let productIndex = cart.findIndex((item) => item.productId === productId);

    if (productIndex < 0) {
        if (cart.length >= MAX_CART_ITEMS) {
            alert("Giỏ hàng đã đạt số lượng tối đa!");
            return;
        }
        cart.push({
            productId: productId,
            image: imageUrl,
            productName: productName,
            productPrice: cleanPrice(productPrice),
            quantity: 1
        });
    } else {
        if (cart[productIndex].quantity >= MAX_QUANTITY) {
            alert("Đã đạt số lượng tối đa cho sản phẩm này!");
            return;
        }
        cart[productIndex].quantity += 1;
    }

    addTosessionStorage();
};

function cleanPrice(price) {
    return price.replace(/[^\d]/g, '');
}

function removeSessionCart() {
    sessionStorage.removeItem("cart");
    iconCartSpan.innerText = 0;
    cart = [];
}

// Lưu giỏ hàng vào sessionStorage
const addTosessionStorage = () => {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    sessionStorage.setItem("cart", JSON.stringify(cart));

    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : "99+";
};

// Tải giỏ hàng từ sessionStorage khi trang mở lại
const loadFromsessionStorage = () => {
    try {
        const storedCart = sessionStorage.getItem("cart");
        cart = storedCart ? JSON.parse(storedCart) : [];

        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : "99+";
    } catch (error) {
        console.error("Error loading cart:", error);
        cart = [];
        iconCartSpan.innerText = "0";
    }
};
