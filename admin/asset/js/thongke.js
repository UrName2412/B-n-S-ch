
var productsAPI = '../data/JSON/sanpham.json';

function start() {
    getProducts(function (products) {
        renderProducts(products);
    });
}

start();

//function
function getProducts(callback) {
    fetch(productsAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderProducts(products) {
    // Nội dung trong bảng
    var listBlock = document.querySelector('#dataBlock');
    products.forEach(function (product) {
        // Tạo phần tử mới
        product.total = parseFloat(product.total.replace(/\./g, ''));
        var newProduct = document.createElement('div');
        newProduct.className = 'grid-row-product';
        newProduct.innerHTML = `
            <span>${product.id}</span>
            <span>${product.name}</span>
            <span>${product.quantity}</span>
            <span>${product.total*product.quantity} VNĐ</span>
        `;

        // Thêm phần tử vào DOM
        listBlock.appendChild(newProduct);
    });
}