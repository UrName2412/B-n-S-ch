

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

    //Menu Fix
    var listProductsFix = document.querySelector('#dataProductsFix');
    products.forEach(function (product) {
        product.total = parseFloat(product.total.replace(/\./g, ''));
        var newProductFix = document.createElement('div');
        newProductFix.className = 'grid-row';
        newProductFix.innerHTML = `
            <div class="row-element">
                <span>${product.id}</span>
                <span>${product.name}</span>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="author">Tác giả:</label>
                <input type="text" name="author" value="${product.author}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="category">Thể loại:</label>
                <input type="text" name="category" value="${product.category}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="nxb">Nhà xuất bản:</label>
                <input type="text" name="nxb" value="${product.nxb}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="total">Giá tiền:</label>
                <input type="number" name="total" value="${product.total}" disabled>
            </div>
        `;
        listProductsFix.appendChild(newProductFix);
    });

    // Menu Delete
    var listProductsDelete = document.querySelector('#dataProductsDelete');
    products.forEach(function (product) {
        var newProductDelete = document.createElement('div');
        newProductDelete.className = 'grid-row';
        newProductDelete.innerHTML = `
            <div class="row-element">
                <span>${product.id}</span>
                <span>${product.name}</span>
                <button type="button" class="delete">
                    <img src="../image/delete.png" alt="delete" class="icon">
                </button>
            </div>
            <div class="row-element">
                <label for="author">Tác giả:</label>
                <input type="text" name="author" value="${product.author}" disabled>
            </div>
            <div class="row-element">
                <label for="category">Thể loại:</label>
                <input type="text" name="category" value="${product.category}" disabled>
            </div>
            <div class="row-element">
                <label for="nxb">Nhà xuất bản:</label>
                <input type="text" name="nxb" value="${product.nxb}" disabled>
            </div>
            <div class="row-element">
                <label for="total">Giá tiền:</label>
                <input type="number" name="total" value="${product.total}" disabled>
            </div>
        `;
        listProductsDelete.appendChild(newProductDelete);
    });
}

document.querySelector('#dataProducts').addEventListener('click', function (event) {
    var row = event.target.closest('.grid-row-product');
    if (row) {
        const spans = row.querySelectorAll('span');
        const isExpanded = row.classList.contains('expanded');
        if (isExpanded) {
            spans.forEach((span, index) => {
                if (index > 1) {
                    span.style.display = 'none';
                    span.style.borderBottom = 'none';
                }
                else {
                    span.style.borderBottom = 'none';
                }
            });
            row.classList.remove('expanded');
        } else {
            spans.forEach(span => {
                span.style.display = 'inline-block';
                span.style.borderBottom = '1px solid var(--color-dark)';
            });
            row.classList.add('expanded');
        }
    }
});

document.querySelector('#dataProductsFix').addEventListener('click', function (event) {
    var rowFix = event.target.closest('.grid-row');
    if (rowFix) {
        const rowElements = rowFix.querySelectorAll('.row-element');
        const isExpanded = rowFix.classList.contains('expanded');
        event.stopPropagation();
        fixButton = event.target.closest('.fix')
        if (fixButton) {
            const input = fixButton.nextElementSibling?.nextElementSibling;
            input.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            if (input && input.disabled) {
                input.disabled = false;
                input.focus();
                fixButton.innerHTML = '<img src="../image/check.png" alt="build" class="icon">';
            } else if (input) {
                input.disabled = true;
                fixButton.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
            }
            return;
        }
        if (isExpanded) {
            rowElements.forEach((element, index) => {
                if (index > 0) {
                    element.style.display = 'none';
                }
            });
            rowFix.classList.remove('expanded');
        } else {
            rowElements.forEach(element => {
                element.style.display = 'grid';
            });
            rowFix.classList.add('expanded');
        }
    }
})

document.addEventListener('click', function (event) {
    var rowFix = document.querySelector('.grid-row.expanded');
    if (rowFix && !rowFix.contains(event.target)) {
        const inputs = document.querySelectorAll('.menu-fix input');
        inputs.forEach(function (input) {
            input.disabled = true;
        });

        const fixButtons = document.querySelectorAll('.fix');
        fixButtons.forEach(function (button) {
            button.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
        });

        const rowElements = rowFix.querySelectorAll('.row-element');
        rowElements.forEach((element, index) => {
            if (index > 0) {
                element.style.display = 'none';
            }
        });
        rowFix.classList.remove('expanded');
    }
});


document.querySelector('#dataProductsDelete').addEventListener('click', function (event) {
    var rowDelete = event.target.closest('.grid-row');
    if (rowDelete) {
        const rowElements = rowDelete.querySelectorAll('.row-element');
        const isExpanded = rowDelete.classList.contains('expanded');
        event.stopPropagation();
        deleteButton = event.target.closest('.delete');
        if (deleteButton) {
            modal.classList.toggle("show", true);
            behindMenuModal.style.display = 'block';
            elementToDelete = event.target.closest('.grid-row');

            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    modal.classList.toggle("show", false);
                    behindMenuModal.style.display = 'none';
                    elementToDelete = null;
                })
            }
            if (confirmButton) {
                confirmButton.addEventListener('click', () => {
                    if (elementToDelete) {
                        elementToDelete.remove();
                        modal.classList.toggle("show", false);
                        behindMenuModal.style.display = 'none';
                        elementToDelete = null;

                        //Alert
                        behindMenuAlert.style.display = 'block';
                        let customAlert = document.getElementById('customAlert');
                        customAlert.style.display = 'block';
                        messageAlert.innerText = 'Đã xóa thành công.';
                        let closeButton = document.getElementById('alertCloseBtn');
                        closeButton.addEventListener('click', () => {
                            customAlert.style.display = 'none';
                            behindMenuAlert.style.display = 'none';
                        });
                    }
                })
            }
        }else{
            if (isExpanded) {
                rowElements.forEach((element, index) => {
                    if (index > 0) {
                        element.style.display = 'none';
                    }
                });
                rowDelete.classList.remove('expanded');
            } else {
                rowElements.forEach(element => {
                    element.style.display = 'grid';
                });
                rowDelete.classList.add('expanded');
            }
        }
    }
})
