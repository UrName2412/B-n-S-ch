let cart = [];
let iconCartSpan = document.querySelector(".cart-icon span");
const modalElement = document.getElementById("cartModal");
const listProductHTML = document.querySelector(".listProduct");

// Khi trang tải xong, khởi tạo giỏ hàng từ sessionStorage
document.addEventListener("DOMContentLoaded", () => {
    loadFromsessionStorage();

    // Xử lý sự kiện thêm vào giỏ hàng
    listProductHTML.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn")) {
            const card = event.target.closest(".card");
            const productTitle = card.querySelector(".card-title").textContent;
            const productPrice = card.querySelector(".card-text.text-danger").textContent;
            const imageUrl = card.querySelector(".card-img-top").src;

            // Hiển thị modal thông báo thêm sản phẩm thành công
            let notification = new bootstrap.Modal(modalElement);
            notification.show();

            addToCart(productTitle, productPrice, imageUrl);
        }
    });

    // Xử lý sự kiện xem chi tiết sản phẩm
    let productDetail = document.querySelectorAll(".view-detail");
    productDetail.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let productId = this.getAttribute("data-id");

            fetch("../asset/handler/ajax_get_product_detail.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "id=" + productId
            })
                .then(response => response.text())
                .then(data => {
                    document.getElementById("productDetailContent").innerHTML = data;
                    let modal = new bootstrap.Modal(document.getElementById("productDetailModal"));
                    modal.show();
                });
        });
    });
});

// Thêm sản phẩm vào giỏ hàng
const addToCart = (productName, productPrice, imageUrl) => {
    let productIndex = cart.findIndex((item) => item.productName === productName);

    if (productIndex < 0) {
        cart.push({
            image: imageUrl,
            productName: productName,
            productPrice: productPrice,
            quantity: 1
        });
    } else {
        cart[productIndex].quantity += 1;
    }

    addTosessionStorage();
};

// Lưu giỏ hàng vào sessionStorage
const addTosessionStorage = () => {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    sessionStorage.setItem("cart", JSON.stringify(cart));

    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : "99+";
};

// Tải giỏ hàng từ sessionStorage khi trang mở lại
const loadFromsessionStorage = () => {
    const storedCart = sessionStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];

    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : "99+";
};
