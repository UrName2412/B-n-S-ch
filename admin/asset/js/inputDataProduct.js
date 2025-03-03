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
    const toolMenu = document.querySelector('.tool-menu');
    const menuFix = document.createElement('div');
    menuFix.className = 'menu-fix';
    const stringModal = 'Bạn có chắc muốn sửa sản phẩm không?';
    const stringAlert = 'Đã sửa.';

    fixButtons.forEach((fixButton) => {
        fixButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row-product');
            let id = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập id..."]').value;
            let index = products.findIndex(product => product.id == id);
            menuFix.innerHTML = `
            <h2>Sửa sản phẩm</h2>
            <form class="form" id="form-fix">
                <div class="form-group">
                    <label for="name">Tên sách:</label>
                    <input type="text" name="name" id="name" placeholder="Nhập tên sách" value="${products[index].name}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="author">Tác giả:</label>
                    <input type="text" name="author" id="author" placeholder="Nhập tác giả" value="${products[index].author}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="category">Thể loại:</label>
                    <select name="category" id="category">
                        <option value="">Lựa chọn:</option>
                        <option value="thieunhi">Thiếu nhi</option>
                        <option value="kynangsong">Kỹ năng sống</option>
                        <option value="tieuthuyet">Tiểu thuyết</option>
                        <option value="phatgiao">Phật giáo</option>
                        <option value="vanhoc">Văn học</option>
                        <option value="truyencamhung">Truyền cảm hứng</option>
                        <option value="hoiky">Hồi ký</option>
                        <option value="tamly">Tâm lý</option>
                        <option value="khoahockithuat">Khoa học kĩ thuật</option>
                        <option value="tongiao">Tôn giáo</option>
                        <option value="trinhtham">Trinh thám</option>
                        <option value="tanvan">Tản văn</option>
                        <option value="kinhte">Kinh tế</option>
                        <option value="giatuong">Giả tưởng</option>
                        <option value="thieunhi">Thiếu nhi</option>
                        <option value="giaotrinh">Giáo trình</option>
                        <option value="tudien">Từ điển</option>
                    </select>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="nxb">Nhà xuất bản:</label>
                    <input type="text" name="nxb" id="nxb" placeholder="Nhập nhà xuất bản" value="${products[index].nxb}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="price">Giá tiền:</label>
                    <input type="text" name="price" id="price" placeholder="Nhập giá tiền"  value="${products[index].price}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="description">Mô tả:</label>
                    <textarea name="description"></textarea>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <button type="button" class="btn-submit">Xác nhận</button>
                </div>
            </form>
            `;
            toolMenu.appendChild(menuFix);
            openToolMenu('.menu-fix');
            behindMenu = document.querySelector('.behindMenu');
            submitButton = document.querySelector('#form-fix .btn-submit');

            submitButton.addEventListener('click', () => {
                openModal(stringModal, stringAlert).then((result) => {
                    if (result) {
                        if (submitButton) {
                            dataInputs = document.querySelectorAll('#form-fix input');
                            dataInputs.forEach(dataInput => {
                                products[index][dataInput.id] = dataInput.value;
                            })
                            textareaGridRows = gridRow.querySelectorAll('textarea');
                            const data = ['id','name','author','category','nxb','price','picture'];
                            var count=0;
                            textareaGridRows.forEach(textareaGridRow => {
                                textareaGridRow.innerHTML = products[index][data[count]];
                                count++;
                            })
                            menuFix.remove();
                            toolMenu.style.display = 'none';
                            behindMenu.style.display = 'none';
                        }
                    }
                });
            })
        })
    })
    // Mốt làm lại cái select
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

function searchButton() {
    var input = document.getElementById('searchInput');
    var valueSearch = input.value.trim().toLowerCase();
    if (valueSearch == "") {
        productFilter();
    } else {
        listProductsBlock.innerHTML = '';
        products.forEach(product => {
            for (const value in product){
                if (typeof(product[value]) !== "string"){
                    var data = String(product[value]);
                } else data = product[value]
                data = data.trim().toLowerCase();
                if (data.includes(valueSearch) && !data.includes("gmail")) {
                    console.log(data)
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
                            <textarea placeholder="Nhập giá tiền..." readonly>${product.price}</textarea>
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
                            <textarea placeholder="Nhập giá tiền..." readonly>${product.price}</textarea>
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
                    break;
                }
            }
        })     
        fixButtons();
        deleteButtons();
    }
}

function productFilter(){
    const productFilter = document.getElementById('productFilter');
    if (productFilter.value == "activeProducts") activeProducts(listProductsBlock);
    else if (productFilter.value == "deletedProducts") deletedProducts(listProductsBlock);
    else if (productFilter.value == "allProducts") allProducts(listProductsBlock);
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
                <textarea placeholder="Nhập giá tiền..." readonly>${product.price}</textarea>
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
                <textarea placeholder="Nhập giá tiền..." readonly>${product.price}</textarea>
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
                <textarea placeholder="Nhập giá tiền..." readonly>${product.price}</textarea>
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
                <textarea placeholder="Nhập giá tiền..." readonly>${product.price}</textarea>
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

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row-product');
});