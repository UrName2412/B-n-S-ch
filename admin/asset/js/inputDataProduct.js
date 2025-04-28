let products = [];
var listProductsBlock = document.querySelector('#dataProducts');

const diaChiAnh = '../../Images/';

function start() {
    getProducts().then(() => {
        renderProducts();
    });
}


//function
function getProducts() {
    return fetch('../handlers/lay/laysanpham.php')
        .then(response => response.json())
        .then(data => {
            products = data;
        })
        .catch(error => console.error("Lỗi khi fetch dữ liệu:", error));
}

function renderProducts() {
    let productFilterBlock = document.getElementById('productFilter');
    productFilterBlock.value = "allProducts";
    productFilter();
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
            <form class="form" id="form-fix" method="POST" action="../handlers/sua/suasanpham.php" enctype="multipart/form-data">
                <input type="hidden" name="maSach" value="${maSach}">
                <div class="form-group">
                    <label for="hinhAnh">Hình ảnh:</label>
                    <input type="file" name="hinhAnh" id="suaHinhAnh" placeholder="Chọn ảnh">
                    <span class="form-message"></span>
                    <img id="suaPreviewImg" style="display:none;"/>
                </div>
                <div class="form-group">
                    <label for="tenSach">Tên sách:</label>
                    <input type="text" name="tenSach" id="suaTenSach" placeholder="Nhập tên sách" value="${products[index].tenSach}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="tacGia">Tác giả:</label>
                    <input type="text" name="tacGia" id="suaTacGia" placeholder="Nhập tác giả" value="${products[index].tacGia}">
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
                    <input type="text" name="giaBan" id="suaGiaBan" placeholder="Nhập giá tiền" value="${products[index].giaBan}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="soTrang">Số trang:</label>
                    <input type="text" name="soTrang" id="suaSoTrang" placeholder="Nhập số trang" value="${products[index].soTrang}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="moTa">Mô tả:</label>
                    <textarea name="moTa" id="suaMoTa">${products[index].moTa}</textarea>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <input type="submit" value="Sửa" class="btn-submit">
                </div>
            </form>
            `;
            toolMenu.appendChild(menuFix);
            openToolMenu('.menu-fix');
            behindMenu = document.querySelector('.behindMenu');
            fetch("../handlers/lay/laytheloai.php")
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
            fetch("../handlers/lay/laynhaxuatban.php")
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
                document.getElementById('suaHinhAnh').addEventListener('change', function () {
                    previewImage(this, 'suaPreviewImg', '.form-message');
                });
            messageRequired = 'Vui lòng nhập thông tin.';
            Validator({
                form: '#form-fix',
                errorSelector: '.form-message',
                rules: [
                    Validator.isRequired('#suaTenSach', messageRequired),
                    Validator.isRequired('#suaTacGia', messageRequired),
                    Validator.isRequired('#suaTheLoai', 'Vui lòng chọn thể loại'),
                    Validator.isRequired('#suaNhaXuatBan', messageRequired),
                    Validator.isRequired('#suaGiaBan', messageRequired),
                    Validator.isRequired('#suaSoTrang', messageRequired),
                    Validator.isRequired('#suaMoTa', messageRequired),
                    Validator.isNumber('#suaGiaBan', 'Giá tiền không hợp lệ'),
                    Validator.isNumber('#suaSoTrang', 'Số trang không hợp lệ'),
                    Validator.min('#suaGiaBan', 1000, 'Giá tiền tối thiểu là 1000 VNĐ'),
                    Validator.min('#suaSoTrang', 1, 'Số trang tối thiểu là 1 trang'),
                ]
            });

            function previewImage(input, previewImgId, errorSelector = '.form-message') {
                const previewImg = document.getElementById(previewImgId);
                const formGroup = input.closest('.form-group') || input.parentElement;
                const errorMessage = formGroup.querySelector(errorSelector);
                const file = input.files[0];
            
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                const maxSize = 5 * 1024 * 1024;
            
                if (file) {
                    const fileExtension = file.name.split('.').pop().toLowerCase();
            
                    if (!validTypes.includes(file.type) && !['jpg', 'jpeg', 'png'].includes(fileExtension)) {
                        errorMessage.innerText = 'Vui lòng chọn ảnh có định dạng JPG, PNG, jpec.';
                        previewImg.style.display = 'none';
                        input.value = '';
                        formGroup.classList.add('invalid');
                        return;
                    }
            
                    if (file.size > maxSize) {
                        errorMessage.innerText = 'Vui lòng chọn ảnh có dung lượng nhỏ hơn 5MB.';
                        previewImg.style.display = 'none';
                        input.value = '';
                        formGroup.classList.add('invalid');
                        return;
                    }
            
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
            
                    errorMessage.innerText = '';
                    formGroup.classList.remove('invalid');
                } else {
                    previewImg.style.display = 'none';
                    errorMessage.innerText = '';
                    formGroup.classList.remove('invalid');
                }
            }
        })
    })
}

function deleteButtons() {
    var deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row-product');
            let maSach = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập mã sách..."]').value;
            let index = products.findIndex(product => product.maSach == maSach);     
            const stringModal = (products[index].daBan) ? 'Sản phẩm đã được bán, bạn muốn ẩn sản phẩm không?' : 'Bạn có chắc muốn xóa sản phẩm không?';
            const stringAlert = (products[index].daBan) ? 'Đã ẩn.' : 'Đã xóa.';
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (deleteButton) {
                        xuLiSanPham(maSach).then((response) => {
                            if (response.status === "success") {
                                getProducts().then(() => {
                                    productFilter();
                                });
                            }
                            createAlert(response.message);
                        });
                    }
                }
            });
        });
    })
}

function restoreButtons() {
    var restoreButtons = document.querySelectorAll('.restore');
    restoreButtons.forEach((restoreButton) => {
        restoreButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row-product');
            let maSach = gridRow.querySelector('.grid-row-product textarea[placeholder="Nhập mã sách..."]').value;
            const stringModal = 'Bạn có chắc muốn khôi phục sản phẩm không?';
            const stringAlert = 'Đã khôi phục.';
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (restoreButton) {
                        xuLiSanPham(maSach).then((response) => {
                            if (response.status === "success") {
                                getProducts().then(() => {
                                    productFilter();
                                });
                            }
                            createAlert(response.message);
                        });
                    }
                }
            })
        })
    })
}

function xuLiSanPham(maSach) {
    return new Promise((resolve, reject) => {
        fetch(`../handlers/xoa/xoasanpham.php?maSach=${maSach}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                resolve(data);
            } else {
                console.error("Lỗi:", data.message);
                reject(new Error(data.message));
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            reject(error);
        });
    });
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
            if (data.includes(valueSearch)) {
                flag = false;
                var newProduct = document.createElement('div');
                newProduct.className = 'grid-row-product';
                if (!product.trangThai && productFilterValue != "activeProducts") {
                    newProduct.classList.add('banned');
                    newProduct.innerHTML = `
                            <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                            <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                            <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                            <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                            <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                            <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(product.giaBan)}</textarea>
                            <div class="input-picture">
                                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                                <img class="pictureProduct" src="${diaChiAnh}${product.hinhAnh}" alt="" srcset="">
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
                            <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(product.giaBan)}</textarea>
                            <div class="input-picture">
                                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                                <img class="pictureProduct" src="${diaChiAnh}${product.hinhAnh}" alt="" srcset="">
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
        if (product.trangThai) {
            var newProduct = document.createElement('div');
            newProduct.className = 'grid-row-product';
            newProduct.innerHTML = `
                <textarea placeholder="Nhập mã sách..." readonly>${product.maSach}</textarea>
                <textarea placeholder="Nhập tên sản phẩm..." readonly>${product.tenSach}</textarea>
                <textarea placeholder="Nhập tên tác giả..." readonly>${product.tacGia}</textarea>
                <textarea placeholder="chọn thể loại..." readonly>${product.tenTheLoai}</textarea>
                <textarea placeholder="Nhập nhà xuất bản..." readonly>${product.tenNhaXuatBan}</textarea>
                <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(product.giaBan)}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <img class="pictureProduct" src="${diaChiAnh}${product.hinhAnh}" alt="" srcset="">
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
                <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(product.giaBan)}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <img class="pictureProduct" src="${diaChiAnh}${product.hinhAnh}" alt="" srcset="">
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
                <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(product.giaBan)}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <img class="pictureProduct" src="${diaChiAnh}${product.hinhAnh}" alt="" srcset="">
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
    deleteButtons();
    restoreButtons();
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
                <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(product.giaBan)}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <img class="pictureProduct" src="${diaChiAnh}${product.hinhAnh}" alt="" srcset="">
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
                <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(products[i].giaBan)}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <img class="pictureProduct" src="${diaChiAnh}${products[i].hinhAnh}" alt="" srcset="">
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
                <textarea placeholder="Nhập giá tiền..." readonly>${formatVND(products[i].giaBan)}</textarea>
                <div class="input-picture">
                    <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                    <img class="pictureProduct" src="${diaChiAnh}${products[i].hinhAnh}" alt="" srcset="">
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
        clearFilter();
        createAlert("Không tìm thấy sản phẩm.");
    } else {
        fixButtons();
        deleteButtons();
        restoreButtons();
    }
}

function clearFilter() {
    productFilter();
    const ids = ['authorSearch', 'categorySearch', 'nxbSearch', 'priceStart','priceEnd'];

    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });
}


document.addEventListener("DOMContentLoaded", () => {
    start();
    response768('.grid-row-product');
});

