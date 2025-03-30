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
    return fetch('../handlers/laysanpham.php')
        .then(response => response.json())
        .then(data => {
            products = data;
        })
        .catch(error => console.error("Lỗi khi fetch dữ liệu:", error));
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
            let maSach = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập mã sách..."]').value;
            let index = products.findIndex(product => product.maSach == maSach);
            menuFix.innerHTML = `
            <h2>Sửa sản phẩm</h2>
            <form class="form" id="form-fix">
                <input type="hidden" name="maSach" value="${maSach}">
                <div class="form-group">
                    <label for="hinhAnh">Hình ảnh:</label>
                    <input type="file" name="hinhAnh" placeholder="Chọn ảnh">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="tenSach">Tên sách:</label>
                    <input type="text" name="tenSach" placeholder="Nhập tên sách" value="${products[index].tenSach}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="tacGia">Tác giả:</label>
                    <input type="text" name="tacGia" placeholder="Nhập tác giả" value="${products[index].tacGia}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="theLoai">Thể loại:</label>
                    <select name="theLoai" id="suaTheLoai">
                        <option value="">Lựa chọn:</option>
                    </select>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="nhaXuatBan">Nhà xuất bản:</label>
                    <select name="nhaXuatBan" id="suaNhaXuatBan">
                        <option value="">Lựa chọn:</option>
                    </select>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="giaBan">Giá bán:</label>
                    <input type="text" name="giaBan" placeholder="Nhập giá tiền" value="${products[index].giaBan}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="soTrang">Số trang:</label>
                    <input type="text" name="soTrang" placeholder="Nhập số trang" value="${products[index].soTrang}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="moTa">Mô tả:</label>
                    <textarea name="moTa">${products[index].moTa}</textarea>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn-submit">Xác nhận</button>
                </div>
            </form>
            `;
            toolMenu.appendChild(menuFix);
            openToolMenu('.menu-fix');
            behindMenu = document.querySelector('.behindMenu');
            submitButton = document.querySelector('#form-fix .btn-submit');
            behindMenu.style.display = 'block';
            fetch("../handlers/laytheloai.php")
                .then(response => response.json())
                .then(data => {
                    let selectTheLoai = document.querySelector('#suaTheLoai');
                    data.forEach(theLoai => {
                        let option = document.createElement("option");
                        option.value = theLoai.maTheLoai;
                        option.textContent = theLoai.tenTheLoai;
                        if (theLoai.maTheLoai == products[index].maTheLoai) {
                            option.selected = true;
                        }
                        selectTheLoai.appendChild(option);
                    });
                })
            fetch("../handlers/laynhaxuatban.php")
                .then(response => response.json())
                .then(data => {
                    let selectNhaXuatBan = document.querySelector('#suaNhaXuatBan');
                    data.forEach(nhaXuatBan => {
                        let option = document.createElement("option");
                        option.value = nhaXuatBan.maNhaXuatBan;
                        option.textContent = nhaXuatBan.tenNhaXuatBan;
                        if (nhaXuatBan.maNhaXuatBan == products[index].maNhaXuatBan) {
                            option.selected = true;
                        }
                        selectNhaXuatBan.appendChild(option);
                    });
                })

            // submitButton.addEventListener('click', () => {
            //     openModal(stringModal, stringAlert).then((result) => {
            //         if (result) {
            //             if (submitButton) {
            //                 dataInputs = document.querySelectorAll('#form-fix input');
            //                 dataInputs.forEach(dataInput => {
            //                     products[index][dataInput.id] = dataInput.value;
            //                 })
            //                 textareaGridRows = gridRow.querySelectorAll('textarea');
            //                 const data = ['id', 'name', 'tacGia', 'maTheLoai', 'maNhaXuatBan', 'price', 'picture']; //đợi fix
            //                 var count = 0;
            //                 textareaGridRows.forEach(textareaGridRow => {
            //                     textareaGridRow.innerHTML = products[index][data[count]];
            //                     count++;
            //                 })
            //                 menuFix.remove();
            //                 toolMenu.style.display = 'none';
            //                 behindMenu.style.display = 'none';
            //             }
            //         }
            //     });
            // })
        })
    })
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
                        products[index].trangThai = 0;
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
                        products[index].trangThai = 0;
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
                        products[index].trangThai = 1;
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
                        products[index].trangThai = 1;
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
    const keyProductSearch = "tenSach";
    if (valueSearch == "") {
        productFilter();
    } else {
        listProductsBlock.innerHTML = '';
        products.forEach(product => {
            if (typeof (product[keyProductSearch]) !== "string") {
                var data = String(product[keyProductSearch]);
            } else data = product[keyProductSearch];
            data = data.trim().toLowerCase();
            if (data.includes(valueSearch)){
                flag = false;
                var newProduct = document.createElement('div');
                newProduct.className = 'grid-row-product';
                if (!product.trangThai&& productFilterValue != "activeProducts") {
                    newProduct.classList.add('banned');
                    newProduct.innerHTML = `
                            <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                            <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                            <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                            <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                            <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                            <textarea placeholder="Nhập giá tiền..." readonly>${product.giaBan}</textarea>
                            <div class="input-picture">
                                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                                <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.hinhAnh}</textarea>
                            </div>
                            <div class="tool">
                                <button type="button" class="restore">
                                    <i class="fas fa-trash-restore"></i>
                                </button>
                            </div>
                        `;
                    listProductsBlock.appendChild(newProduct);
                }
                if (product.trangThai && productFilterValue != "hiddenProducts") {
                    newProduct.innerHTML = `
                            <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                            <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                            <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                            <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                            <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                            <textarea placeholder="Nhập giá tiền..." readonly>${product.giaBan}</textarea>
                            <div class="input-picture">
                                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                                <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.hinhAnh}</textarea>
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
    else if (productFilter.value == "hiddenProducts") hiddenProducts(listProductsBlock);
    else if (productFilter.value == "allProducts") allProducts(listProductsBlock);
}

function activeProducts(listProductsBlock) {
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        if (product.trangThai){
            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.giaBan}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.hinhAnh}</textarea>
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
        if (!product.trangThai) {
            newProduct.classList.add('banned');
            newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.giaBan}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.hinhAnh}</textarea>
                </div>
                <div class="tool">
                    <button type="button" class="restore">
                        <i class="fas fa-trash-restore"></i>
                    </button>
                </div>
            `;
        } else if (product.trangThai) {
            newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.giaBan}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.hinhAnh}</textarea>
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

function hiddenProducts(listProductsBlock) {
    listProductsBlock.innerHTML = '';
    products.forEach(function (product) {
        if (!product.trangThai) {
            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            newProduct.classList.add('banned');
            newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${product.giaBan}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.hinhAnh}</textarea>
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


function handleFilter(tacGia, maTheLoai, maNhaXuatBan, priceStart, priceEnd) {
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
    const stringHiddenTrue = "hiddenProducts";
    const stringHiddenFalse = "activeProducts";
    tacGia = (tacGia == "") ? null : tacGia.trim().toLowerCase();
    maTheLoai = (maTheLoai == "") ? null : maTheLoai;
    maNhaXuatBan = (maNhaXuatBan == "") ? null : maNhaXuatBan;
    priceStart = parseInt(priceStart);
    priceEnd = parseInt(priceEnd);


    var productFilterValue = document.getElementById('productFilter').value;

    if (!tacGia && !maTheLoai && !maNhaXuatBan && !priceStart && !priceEnd) {
        listProductsBlock.innerHTML = '';
        productFilter();
        return;
    }
    listProductsBlock.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        if ((products[i].trangThai ? stringHiddenFalse : stringHiddenTrue) == productFilterValue || productFilterValue == "allProducts") {
            var tacGiaTemp = products[i].tacGia.trim().toLowerCase();
            var maTheLoaiTemp = products[i].maTheLoai;
            var maNhaXuatBanTemp = products[i].maNhaXuatBan;
            var priceTemp = products[i].giaBan;


            if (tacGia && !tacGiaTemp.includes(tacGia)) continue;
            if (maTheLoai && maTheLoai != maTheLoaiTemp) continue;
            if (maNhaXuatBan && maNhaXuatBan != maNhaXuatBanTemp) continue;
            if (priceStart && priceStart > priceTemp) continue
            if (priceEnd && priceEnd < priceTemp) continue

            flag = false;

            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            if (!products[i].trangThai) {
                newProduct.classList.add('banned');
                newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${products[i].maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${products[i].tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${products[i].tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${products[i].tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${products[i].tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${products[i].giaBan}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${products[i].hinhAnh}</textarea>
                </div>
                <div class="tool">
                    <button type="button" class="restore">
                        <i class="fas fa-trash-restore"></i>
                    </button>
                </div>
            `;
            } else if (products[i].trangThai) {
                newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${products[i].maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${products[i].tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${products[i].tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${products[i].tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${products[i].tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${products[i].giaBan}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${products[i].hinhAnh}</textarea>
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

document.addEventListener("DOMContentLoaded", () => {
    start();
    response768('.grid-row-product');
});

