let cart = [];
let iconCartSpan = document.querySelector(".cart-icon span");
const modalElement = document.getElementById('cartModal');

// Lấy danh sách sản phẩm
const productContainer = document.querySelector('.product-detail');

// Kiểm tra khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // Gán sự kiện click cho các nút "Thêm vào giỏ hàng"
    productContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.btn-warning'); // Kiểm tra nút "Thêm vào giỏ hàng"
        if (button) {
            const productTitle = document.querySelector('.product-name').textContent.trim();
            const productPrice = document.querySelector('.product-price strong').textContent.trim();
            const imageUrl = document.querySelector('.img-fluid.rounded').src;
            const quantity = parseInt(document.getElementById('quantity').value, 10); // Lấy giá trị số lượng

            if (!quantity || quantity < 1) {
                alert('Vui lòng nhập số lượng hợp lệ!');
                return;
            }

            // Hiển thị thông báo modal
            const notification = new bootstrap.Modal(modalElement);
            notification.show();

            // Thêm sản phẩm vào giỏ hàng
            addToCart(productTitle, productPrice, imageUrl, quantity);
        }
    });

    // Tải lại giỏ hàng từ sessionStorage khi trang tải
    loadFromsessionStorage();
});

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (productName, productPrice, imageUrl, quantity) => {
    const productIndex = cart.findIndex((item) => item.productName === productName);

    if (productIndex >= 0) {
        cart[productIndex].quantity += quantity; // Cộng dồn số lượng nếu sản phẩm đã có
    } else {
        cart.push({
            image: imageUrl,
            productName,
            productPrice,
            quantity,
        });
    }

    // Cập nhật sessionStorage và biểu tượng giỏ hàng
    updatesessionStorage();
};


// Hàm cập nhật sessionStorage và biểu tượng giỏ hàng
const updatesessionStorage = () => {
    let totalQuantity = 0;

    cart.forEach((item) => {
        totalQuantity += item.quantity;
    });

    // Lưu vào sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật biểu tượng giỏ hàng
    iconCartSpan.textContent = totalQuantity <= 99 ? totalQuantity : '99+';
};

// Hàm tải giỏ hàng từ sessionStorage
const loadFromsessionStorage = () => {
    const savedCart = sessionStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];

    // Cập nhật biểu tượng giỏ hàng
    let totalQuantity = 0;
    cart.forEach((item) => {
        totalQuantity += item.quantity;
    });

    iconCartSpan.textContent = totalQuantity <= 99 ? totalQuantity : '99+';
};


