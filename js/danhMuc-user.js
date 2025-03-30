const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const Genre = document.querySelector(".active").innerHTML;  // Biến lưu trữ danh mục đang chọn
let allData = {};  // Biến lưu trữ dữ liệu của tất cả các danh mục

// Hàm tải dữ liệu và hiển thị sản phẩm
function loadProducts(category, minPrice = null, maxPrice = null, tenSach = null, tacGia = null, nhaXuatBan = null, theloai = null) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    if (!allData[category] || allData[category].length === 0) {
        productList.innerHTML = '<p style="text-align:center; font-size:1.25rem; color:red;">Không có sản phẩm nào trong danh mục này.</p>';
        return;
    }

    const filteredProducts = allData[category].filter(product => {
        const productPrice = product.price;
        // Lọc sản phẩm theo giá
        if ((minPrice && productPrice < minPrice) || (maxPrice && productPrice > maxPrice)) {
            return false;
        }
        // Lọc theo tên sách
        if (tenSach != null) {
            if (!product.name.toLowerCase().normalize('NFC').includes(tenSach.toLowerCase())) {
                return false;
            }
        }
        // Lọc theo tác giả
        if (tacGia != null) {
            if (!product.author.toLowerCase().normalize('NFC').includes(tacGia.toLowerCase())) {
                return false;
            }
        }

        // Lọc sản phẩm theo nhà xuất bản
        if(nhaXuatBan != null){
            if (!product.publisher.toLowerCase().normalize('NFC').includes(nhaXuatBan.toLowerCase())) {
                return false;
            }
        }

        // Lọc sản phẩm theo thể loại
        if(theloai != null){
            if (!product.category.toLowerCase().normalize('NFC').includes(theloai.toLowerCase())) {
                return false;
            }
        }
        return true;
    });
    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p style="text-align:center; font-size:1.25rem; color:red;">Không có sản phẩm nào phù hợp với giá lọc.</p>';
    } else {
        filteredProducts.forEach(product => {
            const productHTML = `
                    <div class="col-md-4 mb-4">
                    <div class="card" style="width: 100%;">
                        <a href="../sanpham/chitietsanpham-user.php">
                            <img src="${product.img}" alt="${product.name}" class="card-img-top">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.category}</p>
                            <p class="card-text text-danger fw-bold">${formatPrice(product.price)} đ</p>
                            <button href="${product.link}" class="btn" style="background-color: #336799; color: #ffffff;">Thêm vào giỏ hàng</button>
                       </div>
                    </div>
                </div>`;
            productList.innerHTML += productHTML;
        });
    }
}

// Hàm lấy dữ liệu từ file JSON và hiển thị theo danh mục
function fetchAndDisplayProducts(category) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allData = data;  // Lưu trữ dữ liệu toàn bộ vào allData
            loadProducts(category);  // Hiển thị sản phẩm theo danh mục
        })
        .catch(error => console.error('Có lỗi khi tải dữ liệu:', error));
}

// Sự kiện khi lọc giá
document.getElementById('priceFilterForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const errorDiv = document.getElementById('priceFilterError');
    errorDiv.textContent = '';

    const minPrice = parseFloat(document.getElementById('minPrice').value.trim()) || null;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value.trim()) || null;

    // Kiểm tra điều kiện lọc
    if (minPrice === null && maxPrice === null) {
        errorDiv.textContent = 'Vui lòng nhập ít nhất một ô giá!';
        return;
    }
    const category = Genre;
    loadProducts(category, minPrice, maxPrice);  // Lọc sản phẩm theo giá
});

// Sự kiện reset lọc
document.getElementById('resetFilter').addEventListener('click', () => {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('priceFilterError').textContent = '';
    loadProducts(category);  // Hiển thị lại tất cả sản phẩm trong danh mục
});

// Khi trang tải, hiển thị sản phẩm của danh mục "Sách thiếu nhi"
fetchAndDisplayProducts(Genre);//(đổi danh mục ở đây)