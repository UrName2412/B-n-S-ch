

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
            <textarea placeholder="Nhập nội dung..." readonly>${product.id}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.name}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.author}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.category}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.nxb}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.total}</textarea>
            <div class="input-picture">
                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.picture}</textarea>
            </div>
            <div class="tool">
                <button type="button" class="fix">
                    <i class="fas fa-wrench"></i>
                </button>
                <button type="button" class="delete">
                    <i class="fas fa-trash"></i>
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
