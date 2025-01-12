document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".listProduct .col-md-4");
    const productsPerPage = 6;
    const paginationContainer = document.querySelector(".pagination-container .pagination");
    let currentPage = 1;

    // Hiển thị sản phẩm theo trang
    function showPage(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        products.forEach((product, index) => {
            product.style.display = (index >= start && index < end) ? "block" : "none";
        });
    }

    // Tạo phân trang
    function createPagination() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        paginationContainer.innerHTML = ""; // Xóa nút cũ

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === currentPage) li.classList.add("active");

            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#";
            a.textContent = i;
            a.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
                createPagination();
            });

            li.appendChild(a);
            paginationContainer.appendChild(li);
        }
    }

    // Khởi tạo
    showPage(currentPage);
    createPagination();
});

// document.getElementById('priceFilterForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Ngăn hành vi mặc định của form

//     // Lấy giá trị từ hai ô nhập
//     const minPrice = parseFloat(document.getElementById('minPrice').value.trim());
//     const maxPrice = parseFloat(document.getElementById('maxPrice').value.trim());

//     // Lấy danh sách các sản phẩm
//     const products = document.querySelectorAll('.listProduct .col-md-4');

//     products.forEach(product => {
//         // Lấy nội dung giá từ phần tử có lớp 'card-text text-danger fw-bold'
//         const priceElement = product.querySelector('.card-text.text-danger.fw-bold');
//         if (priceElement) {
//             const priceText = priceElement.textContent.trim().replace(/[^\d]/g, ''); // Loại bỏ ký tự không phải số
//             const productPrice = parseFloat(priceText);

//             // Kiểm tra giá trị đầu vào hợp lệ
//             const isMinPriceValid = !isNaN(minPrice);
//             const isMaxPriceValid = !isNaN(maxPrice);

//             if ((!isMinPriceValid || productPrice >= minPrice) &&
//                 (!isMaxPriceValid || productPrice <= maxPrice)) {
//                 product.style.display = 'block'; // Hiện sản phẩm nếu thỏa điều kiện
//             } else {
//                 product.style.display = 'none'; // Ẩn sản phẩm nếu không thỏa điều kiện
//             }
//         }
//     });
// });

// document.getElementById('resetFilter').addEventListener('click', () => {
//     document.getElementById('minPrice').value = '';
//     document.getElementById('maxPrice').value = '';

//     // Hiển thị lại tất cả sản phẩm
//     const products = document.querySelectorAll('.listProduct .col-md-4');
//     products.forEach(product => {
//         product.style.display = 'block'; // Hiện tất cả các sản phẩm
//     });
// });
