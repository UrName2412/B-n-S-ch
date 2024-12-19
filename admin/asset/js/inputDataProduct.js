

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
            <input type="text" name="product-id" value="${product.id}" readonly>
            <input type="text" name="product-name" value="${product.name}" readonly>
            <input type="text" name="product-author" value="${product.author}" readonly>
            <input type="text" name="product-category" value="${product.category}" readonly>
            <input type="text" name="product-nxb" value="${product.nxb}" readonly>
            <input type="text" name="product-total" value="${product.total}" readonly>
            <div class="input-picture">
                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()">
                <span class="file-name">${product.picture}</span>
            </div>
            <div class="tool">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <button type="button" class="delete">
                    <img src="../image/delete.png" alt="delete" class="icon">
                </button>
            </div>
        `;

        // Thêm phần tử vào DOM
        listProductsBlock.appendChild(newProduct);
    });
}


// function displayFileName() {
//     const fileInput = document.querySelector('.picture');
//     console.log(fileInput);
//     const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "Chưa chọn ảnh";
//     document.que('file-name').textContent = fileName;
// }
