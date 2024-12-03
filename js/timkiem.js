document.getElementById('priceFilterForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn hành vi mặc định của form

    // Lấy giá trị từ hai ô nhập
    const minPrice = parseFloat(document.getElementById('minPrice').value.trim());
    const maxPrice = parseFloat(document.getElementById('maxPrice').value.trim());

    // Lấy danh sách các sản phẩm
    const products = document.querySelectorAll('.listProduct .col-md-4');

    products.forEach(product => {
        // Lấy nội dung giá từ phần tử có lớp 'card-text text-danger fw-bold'
        const priceElement = product.querySelector('.card-text.text-danger.fw-bold');
        if (priceElement) {
            const priceText = priceElement.textContent.trim().replace(/[^\d]/g, ''); // Loại bỏ ký tự không phải số
            const productPrice = parseFloat(priceText);

            // Kiểm tra giá trị đầu vào hợp lệ
            const isMinPriceValid = !isNaN(minPrice);
            const isMaxPriceValid = !isNaN(maxPrice);

            if ((!isMinPriceValid || productPrice >= minPrice) &&
                (!isMaxPriceValid || productPrice <= maxPrice)) {
                product.style.display = 'block'; // Hiện sản phẩm nếu thỏa điều kiện
            } else {
                product.style.display = 'none'; // Ẩn sản phẩm nếu không thỏa điều kiện
            }
        }
    });
});

document.getElementById('resetFilter').addEventListener('click', () => {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';

    // Hiển thị lại tất cả sản phẩm
    const products = document.querySelectorAll('.listProduct .col-md-4');
    products.forEach(product => {
        product.style.display = 'block'; // Hiện tất cả các sản phẩm
    });
});
