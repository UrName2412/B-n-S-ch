var productsAPI = '../data/JSON/sanpham.json';

let products = [];
var listProductsBlock = document.querySelector('#dataProducts');

function start() {
    getProducts().then(() => {
        renderProducts();
    });
}


//function
function getProducts() {
    return fetch(productsAPI)
        .then(response => response.json())
        .then(data => {
            products = data;
        });
}

function renderProducts() {
    activeProducts(listProductsBlock);
}

function fixButtons(){
    var fixButtons = document.querySelectorAll('.fix');
    fixButtons.forEach((fixButton) => {
        fixButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row-product');
            if (gridRow.classList.contains('fixed')) {
                fixButton.innerHTML = `<i class="fas fa-wrench"></i>`;
            } else {
                fixButton.innerHTML = `<i class="fas fa-check"></i>`;
            }
            gridRow.classList.toggle('fixed');
            fixButton.classList.toggle('fixed');

        })
    })
}

function deleteButtons(){
    var deleteButtons = document.querySelectorAll('.delete');
    const stringModal = 'Bạn có chắc muốn xóa sản phẩm không?';
    const stringAlert = 'Đã xóa.';
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (deleteButton) {
                        var gridRow = event.target.closest('.grid-row-product');
                        gridRow.remove();
                        let id = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập id..."]').value;
                        let index = products.findIndex(product => product.id == id);
                        products[index].isDeleted = "true";
                    }
                }
            });
        });
    })
}
function deleteButtonsAllProducts(){
    var deleteButtons = document.querySelectorAll('.delete');
    const stringModal = 'Bạn có chắc muốn xóa sản phẩm không?';
    const stringAlert = 'Đã xóa.';
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (deleteButton) {
                        var gridRow = event.target.closest('.grid-row-product');
                        let id = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập id..."]').value;
                        let index = products.findIndex(product => product.id == id);
                        products[index].isDeleted = "true";
                        allProducts(listProductsBlock);
                    }
                }
            });
        });
    })
}

function restoreButtons(){
    var restoreButtons = document.querySelectorAll('.restore');
    const stringModal = 'Bạn có chắc muốn khôi phục sản phẩm không?';
    const stringAlert = 'Đã khôi phục.';
    restoreButtons.forEach((restoreButton) => {
        restoreButton.addEventListener('click', (event) => {
            openModal(stringModal,stringAlert).then((result) => {
                if (result) {
                    if (restoreButton) {
                        var gridRow = event.target.closest('.grid-row-product');
                        gridRow.remove();
                        let id = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập id..."]').value;
                        let index = products.findIndex(product => product.id == id);
                        products[index].isDeleted = "false";
                    }
                }
            })
        })
    })
}
function restoreButtonsAllProducts(){
    var restoreButtons = document.querySelectorAll('.restore');
    const stringModal = 'Bạn có chắc muốn khôi phục sản phẩm không?';
    const stringAlert = 'Đã khôi phục.';
    restoreButtons.forEach((restoreButton) => {
        restoreButton.addEventListener('click', (event) => {
            openModal(stringModal,stringAlert).then((result) => {
                if (result) {
                    if (restoreButton) {
                        var gridRow = event.target.closest('.grid-row-product');
                        let id = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập id..."]').value;
                        let index = products.findIndex(product => product.id == id);
                        products[index].isDeleted = "false";
                        allProducts(listProductsBlock);
                    }
                }
            })
        })
    })
}

function productFilter(){
    const productFilter = document.getElementById('productFilter');
    products.forEach((product) => {
        if (productFilter.value == "activeProducts") activeProducts(listProductsBlock);
        else if (productFilter.value == "deletedProducts") deletedProducts(listProductsBlock);
        else if (productFilter.value == "allProducts") allProducts(listProductsBlock);
    });
}

function activeProducts(listProductsBlock){
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        if (product.isDeleted == "false"){
            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            newProduct.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${product.id}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.name}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.author}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.category}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.nxb}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.total}</textarea>
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
            listProductsBlock.appendChild(newProduct);
        }  
    });
    fixButtons();
    deleteButtons();
}

function allProducts(listProductsBlock){
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        var newProduct = document.createElement('div');
        newProduct.className = 'grid-row-product';
        if (product.isDeleted == "true"){
            newProduct.classList.add('banned');
            newProduct.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${product.id}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.name}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.author}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.category}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.nxb}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.total}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.picture}</textarea>
                </div>
                <div class="tool">
                    <button type="button" class="restore">
                        <i class="fas fa-trash-restore"></i>
                    </button>
                </div>
            `;
        } else if (product.isDeleted == "false"){
            newProduct.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${product.id}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.name}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.author}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.category}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.nxb}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.total}</textarea>
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
        }
        listProductsBlock.appendChild(newProduct);  
    });
    fixButtons();
    deleteButtonsAllProducts();
    restoreButtonsAllProducts();
}

function deletedProducts(listProductsBlock){
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        if (product.isDeleted == "true"){
            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            newProduct.classList.add('banned');
            newProduct.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${product.id}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.name}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.author}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.category}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.nxb}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.total}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.picture}</textarea>
                </div>
                <div class="tool">
                    <button type="button" class="restore">
                        <i class="fas fa-trash-restore"></i>
                    </button>
                </div>
            `;
            listProductsBlock.appendChild(newProduct);
        }  
    });
    restoreButtons();
}

start();