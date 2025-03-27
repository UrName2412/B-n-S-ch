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

function fixButtons() {
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
                    <label for="hinhAnh">Hình ảnh:</label>
                    <input type="file" name="hinhAnh" id="hinhAnh" placeholder="Chọn ảnh">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="tenSach">Tên sách:</label>
                    <input type="text" name="tenSach" id="tenSach" placeholder="Nhập tên sách">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="tacGia">Tác giả:</label>
                    <input type="text" name="tacGia" id="tacGia" placeholder="Nhập tác giả">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="theLoai">Thể loại:</label>
                    <select name="theLoai" id="theLoai">
                        <option value="">Lựa chọn:</option>
                        <?php
                            require '../config/config.php';
                            $stmt = $database->prepare("SELECT * FROM theloai");
                            $stmt->execute();
                            $result = $stmt->get_result();
                            while ($row = $result->fetch_assoc()) {
                                echo "<option value='".$row['maTheLoai']."'>".$row['tenTheLoai']."</option>";
                            }
                        ?>
                    </select>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="nhaXuatBan">Nhà xuất bản:</label>
                    <select name="nhaXuatBan" id="nhaXuatBan">
                        <option value="">Lựa chọn:</option>
                        <?php
                            require '../config/config.php';
                            $stmt = $database->prepare("SELECT * FROM nhaxuatban");
                            $stmt->execute();
                            $result = $stmt->get_result();
                            while ($row = $result->fetch_assoc()) {
                                echo "<option value='".$row['maNhaXuatBan']."'>".$row['tenNhaXuatBan']."</option>";
                            }
                        ?>
                    </select>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="giaBan">Giá bán:</label>
                    <input type="text" name="giaBan" id="giaBan" placeholder="Nhập giá tiền">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="soTrang">Số trang:</label>
                    <input type="text" name="soTrang" id="soTrang" placeholder="Nhập số trang">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="moTa">Mô tả:</label>
                    <textarea name="moTa"></textarea>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn-submit">Thêm</button>
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
                            const data = ['id', 'name', 'author', 'category', 'nxb', 'price', 'picture'];
                            var count = 0;
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

function deleteButtons() {
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
function deleteButtonsAllProducts() {
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

function restoreButtons() {
    var restoreButtons = document.querySelectorAll('.restore');
    const stringModal = 'Bạn có chắc muốn khôi phục sản phẩm không?';
    const stringAlert = 'Đã khôi phục.';
    restoreButtons.forEach((restoreButton) => {
        restoreButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
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
function restoreButtonsAllProducts() {
    var restoreButtons = document.querySelectorAll('.restore');
    const stringModal = 'Bạn có chắc muốn khôi phục sản phẩm không?';
    const stringAlert = 'Đã khôi phục.';
    restoreButtons.forEach((restoreButton) => {
        restoreButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
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
    var flag = true;
    var input = document.getElementById('searchInput');
    var valueSearch = input.value.trim().toLowerCase();
    const productFilterValue = document.getElementById('productFilter').value;
    const keyProductSearch = "name";
    if (valueSearch == "") {
        productFilter();
    } else {
        listProductsBlock.innerHTML = '';
        products.forEach(product => {
            if (typeof (product[keyProductSearch]) !== "string") {
                var data = String(product[keyProductSearch]);
            } else data = product[keyProductSearch]
            data = data.trim().toLowerCase();
            if (data.includes(valueSearch) && !data.includes("gmail")) {
                flag = false;
                var newProduct = document.createElement('div');
                newProduct.className = 'grid-row-product';
                if (product.isDeleted == "true" && productFilterValue != "activeProducts") {
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
                if (product.isDeleted == "false" && productFilterValue != "deletedProducts") {
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
            }
        })
        if (flag) {
            createAlert("Không tìm thấy sản phẩm.");
            productFilter();
        } else {
            fixButtons();
            deleteButtons();
        }
    }
}

function productFilter() {
    const productFilter = document.getElementById('productFilter');
    if (productFilter.value == "activeProducts") activeProducts(listProductsBlock);
    else if (productFilter.value == "deletedProducts") deletedProducts(listProductsBlock);
    else if (productFilter.value == "allProducts") allProducts(listProductsBlock);
}

function activeProducts(listProductsBlock) {
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        if (product.isDeleted == "false") {
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

function allProducts(listProductsBlock) {
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        var newProduct = document.createElement('div');
        newProduct.className = 'grid-row-product';
        if (product.isDeleted == "true") {
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
        } else if (product.isDeleted == "false") {
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

function deletedProducts(listProductsBlock) {
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        if (product.isDeleted == "true") {
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

let filterBtn = document.getElementById('filterBtnProduct');
let menuFilter = document.querySelector('.menuFilter');
filterBtn.onclick = (e) => {
    e.stopPropagation();
    if (menuFilter.classList.contains('appear')) {
        menuFilter.style.display = 'none';
        menuFilter.classList.remove('appear');
    } else {
        menuFilter.style.display = 'flex';
        menuFilter.classList.add('appear');
    }
}
document.onclick = (e) => {
    if (!menuFilter.contains(e.target) && e.target !== filterBtn) {
        menuFilter.style.display = "none";
        menuFilter.classList.remove('appear');
    }
}


function handleFilter(author, category, nxb, priceStart, priceEnd) {
    var flag = true;

    if (priceStart && (isNaN(priceStart) || priceStart <= 0 || !/^[1-9][0-9]{3,}$/.test(priceStart.toString()))) {
        createAlert("Phải nhập số và số tiền phải lớn hơn 1.000");
        return;
    }
    if (priceEnd && (isNaN(priceEnd) || priceEnd <= 0 || !/^[1-9][0-9]{3,}$/.test(priceEnd.toString()))) {
        createAlert("Phải nhập số và số tiền phải lớn hơn 1.000");
        return;
    }
    if (priceStart && priceEnd && priceStart > priceEnd) {
        createAlert("Giá tiền tối đa không được lớn hơn tối thiểu");
        return;
    }
    const stringBannedTrue = "deletedProducts";
    const stringBannedFalse = "activeProducts";
    author = (author == "") ? null : author.trim().toLowerCase();
    category = (category == "") ? null : category.trim().toLowerCase();
    nxb = (nxb == "") ? null : nxb.trim().toLowerCase();
    priceStart = parseInt(priceStart);
    priceEnd = parseInt(priceEnd);


    var productFilterValue = document.getElementById('productFilter').value;

    if (!author && !category && !nxb && !priceStart && !priceEnd) {
        listProductsBlock.innerHTML = '';
        productFilter();
        return;
    }
    listProductsBlock.innerHTML = '';


    for (let i = 0; i < products.length; i++) {
        if (((products[i].isDeleted == "true") ? stringBannedTrue : stringBannedFalse) == productFilterValue || productFilterValue == "Tất cả sản phẩm") {

            var authorTemp = products[i].author.trim().toLowerCase();
            var categoryTemp = products[i].category.trim().toLowerCase();
            var nxbTemp = products[i].nxb.trim().toLowerCase();
            var priceTemp = parseInt(products[i].price.replace(/\./g, ''));



            if (author && !authorTemp.includes(author)) continue;
            if (category && category !== categoryTemp) continue;
            if (nxb && nxb !== nxbTemp) continue;
            if (priceStart && priceStart > priceTemp) continue
            if (priceEnd && priceEnd < priceTemp) continue
            console.log("Tìm:", author);
            console.log("Trong:", authorTemp);
            console.log("Kết quả:", authorTemp.includes(author));

            flag = false;

            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            if (products[i].isDeleted == "true") {
                newProduct.classList.add('banned');
                newProduct.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${products[i].id}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${products[i].name}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${products[i].author}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${products[i].category}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${products[i].nxb}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${products[i].price}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${products[i].picture}</textarea>
                </div>
                <div class="tool">
                    <button type="button" class="restore">
                        <i class="fas fa-trash-restore"></i>
                    </button>
                </div>
            `;
            } else if (products[i].isDeleted == "false") {
                newProduct.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${products[i].id}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${products[i].name}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${products[i].author}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${products[i].category}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${products[i].nxb}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${products[i].price}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${products[i].picture}</textarea>
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
        }
    }
    if (flag) {
        createAlert("Không tìm thấy sản phẩm.");
        productFilter();
    } else {
        fixButtons();
        deleteButtonsAllProducts();
        restoreButtonsAllProducts();
    }
}


start();

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row-product');
});