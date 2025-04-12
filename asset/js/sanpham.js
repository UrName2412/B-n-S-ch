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
            let notification = new bootstrap.Modal(modalElement, { backdrop: true, keyboard: true });
            notification.show();
            modalElement.removeAttribute("");

            addToCart(productTitle, productPrice, imageUrl);
        }
    });

    // Xử lý sự kiện xem chi tiết sản phẩm
    listProductHTML.addEventListener("click", function (event) {
        if (event.target.closest(".view-detail")) {
            event.preventDefault();
            const productId = event.target.closest(".view-detail").getAttribute("data-id");

            fetch("/Website/GIT/WebBanSach/asset/handler/ajax_get_product_detail.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "id=" + productId
            })
                .then(response => response.text())
                .then(data => {
                    document.getElementById("productDetailContent").innerHTML = data;

                    let modal = new bootstrap.Modal(document.getElementById("productDetailModal"), { backdrop: true, keyboard: true });
                    modal.show();
                    document.getElementById("productDetailModal").removeAttribute("");

                    // Add event listener for "Thêm vào giỏ hàng" button in the modal
                    const addToCartButton = document.querySelector("#productDetailContent .btn-success");
                    addToCartButton.addEventListener("click", () => {
                        const productName = document.querySelector("#productDetailContent h5").textContent;
                        const productPrice = document.querySelector("#productDetailContent p:nth-of-type(4)").textContent.split(":")[1].trim();
                        const imageUrl = document.querySelector("#productDetailContent img").src;

                        addToCart(productName, productPrice, imageUrl);

                        // Hiển thị modal thông báo thêm sản phẩm thành công
                        let notification = new bootstrap.Modal(document.getElementById("cartModal"), { backdrop: true, keyboard: true });
                        notification.show();
                        document.getElementById("cartModal").removeAttribute("");

                        modal.hide();
                        document.getElementById("productDetailModal").setAttribute("", "");
                    });

                    // Ensure modal is properly hidden after filtering
                    document.getElementById("productDetailModal").addEventListener("hidden.bs.modal", () => {
                        document.getElementById("productDetailContent").innerHTML = ""; // Reset modal content
                    });
                })
                .catch(error => console.error("Error fetching product details:", error));
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
