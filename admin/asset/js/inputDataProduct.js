

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
    var listProductsBlock = document.querySelector('#dataProducts');
    products.forEach(function (product) {
        // Tạo phần tử mới
        var newProduct = document.createElement('div');
        newProduct.className = 'grid-row-product';
        newProduct.innerHTML = `
            <span>${product.id}</span>
            <span>${product.name}</span>
            <span>${product.author}</span>
            <span>${product.category}</span>
            <span>${product.nxb}</span>
            <span>${product.total} VNĐ</span>
        `;

        // Thêm phần tử vào DOM
        listProductsBlock.appendChild(newProduct);
    });
}
