let cart = [];
let iconCartSpan = document.querySelector(".cart-icon span");
const modalElement = document.getElementById("cartModal");
const listProductHTML = document.querySelector(".listProduct");

// Khi trang tải xong, khởi tạo giỏ hàng từ sessionStorage
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

            // Hiển thị thông báo
            let notification = new bootstrap.Modal(modalElement);
            notification.show();
        }
    });

    // Xử lý sự kiện xem chi tiết sản phẩm
    listProductHTML.addEventListener("click", function (event) {
        const viewDetailLink = event.target.closest(".view-detail");
        if (viewDetailLink) {
            event.preventDefault();
            const productId = viewDetailLink.getAttribute("data-id");
            const modalContent = document.getElementById("productDetailContent");
            const modalElement = document.getElementById("productDetailModal");

            // Show loading indicator
            modalContent.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';

            fetch("../asset/handler/ajax_get_product_detail.php?id=" + productId)
                .then(response => response.text())
                .then(data => {
                    modalContent.innerHTML = data;
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();

                    // Add event listener for "Thêm vào giỏ hàng" button after content is loaded
                    const addToCartButton = modalContent.querySelector(".add-to-cart-detail");
                    if (addToCartButton) {
                        addToCartButton.addEventListener("click", function() {
                            try {
                                const productName = modalContent.querySelector("h5").textContent;
                                const productPrice = modalContent.querySelector(".text-danger").textContent;
                                const imageUrl = modalContent.querySelector("img").src;

                                addToCart(productName, productPrice, imageUrl, productId);

                                // Show success notification
                                const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
                                cartModal.show();
                                modal.hide();
                            } catch (err) {
                                console.error("Error adding to cart:", err);
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching product details:", error);
                    modalContent.innerHTML = '<div class="alert alert-danger">Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</div>';
                });
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
    let productIndex = cart.findIndex((item) => item.productId === productId);

    if (productIndex < 0) {
        cart.push({
            productId: productId,
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
    const storedCart = sessionStorage.getItem("cart");
    cart = storedCart ? JSON.parse(storedCart) : [];

    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : "99+";
};
