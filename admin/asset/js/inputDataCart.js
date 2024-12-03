

var cartsAPI = '../data/JSON/giohang.json';

function start() {
    getCarts(function (carts) {
        renderCarts(carts);
    });
}

start();

//function
function getCarts(callback) {
    fetch(cartsAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderCarts(carts) {
    // Nội dung trong bảng
    var listCartsBlock = document.querySelector('#dataCarts');
    carts.forEach(function (cart) {
        // Tạo phần tử mới
        var newCart = document.createElement('div');
        newCart.className = 'grid-row-cart';
        newCart.innerHTML = `
            <span>${cart.id}</span>
            <span>${cart.name}</span>
            <span>${cart.address}</span>
            <span>${cart.phone}</span>
            <span>${cart.quantity}</span>
            <span>${cart.amount}</span>
            <span>${cart.status}</span>
        `;

        // Thêm phần tử vào DOM
        listCartsBlock.appendChild(newCart);
    });

    //Menu Fix
    var listCartsFix = document.querySelector('#dataCartsFix');
    carts.forEach(function (cart) {
        cart.amount = parseFloat(cart.amount.replace(/\./g, ''));
        var newCartFix = document.createElement('div');
        newCartFix.className = 'grid-row';
        newCartFix.innerHTML = `
            <div class="row-element">
                <span>${cart.id}</span>
                <span>${cart.name}</span>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="address">Địa chỉ:</label>
                <input type="text" name="address" value="${cart.address}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="phone">Số điện thoại:</label>
                <input type="text" name="phone" value="${cart.phone}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="quantity">Số lượng:</label>
                <input type="text" name="quantity" value="${cart.quantity}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="total">Tổng tiền:</label>
                <input type="number" name="total" value="${cart.amount}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix-select">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="status">Tình trạng:</label>
                <select name="status" disabled>
                    <option value="Đang xử lí" ${cart.status === "Đang xử lí" ? "selected" : ""}>Đang xử lí</option>
                    <option value="Hoàn thành" ${cart.status === "Hoàn thành" ? "selected" : ""}>Hoàn thành</option>
                    <option value="Lỗi" ${cart.status === "Lỗi" ? "selected" : ""}>Lỗi</option>
                </select>
            </div>
        `;
        listCartsFix.appendChild(newCartFix);
    });

    // Menu Delete
    var listCartsDelete = document.querySelector('#dataCartsDelete');
    carts.forEach(function (cart) {
        var newCartDelete = document.createElement('div');
        newCartDelete.className = 'grid-row';
        newCartDelete.innerHTML = `
            <div class="row-element">
                <span>${cart.id}</span>
                <span>${cart.name}</span>
                <button type="button" class="delete">
                    <img src="../image/delete.png" alt="delete" class="icon">
                </button>
            </div>
            <div class="row-element">
                <label for="address">Địa chỉ:</label>
                <input type="text" name="address" value="${cart.address}" disabled>
            </div>
            <div class="row-element">
                <label for="phone">Số điện thoại:</label>
                <input type="text" name="phone" value="${cart.phone}" disabled>
            </div>
            <div class="row-element">
                <label for="quantity">Số lượng:</label>
                <input type="text" name="quantity" value="${cart.quantity}" disabled>
            </div>
            <div class="row-element">
                <label for="total">Tổng tiền:</label>
                <input type="number" name="total" value="${cart.amount}" disabled>
            </div>
            <div class="row-element">
                <label for="status">Tình trạng:</label>
                <select name="status" disabled>
                    <option value="Đang xử lí" ${cart.status === "Đang xử lí" ? "selected" : ""}>Đang xử lí</option>
                    <option value="Hoàn thành" ${cart.status === "Hoàn thành" ? "selected" : ""}>Hoàn thành</option>
                    <option value="Lỗi" ${cart.status === "Lỗi" ? "selected" : ""}>Lỗi</option>
                </select>
            </div>
        `;
        listCartsDelete.appendChild(newCartDelete);
    });
}

document.querySelector('#dataCarts').addEventListener('click', function (event) {
    var row = event.target.closest('.grid-row-cart');
    if (row) {
        const spans = row.querySelectorAll('span');
        const isExpanded = row.classList.contains('expanded');
        if (isExpanded) {
            spans.forEach((span, index) => {
                if (index > 2) {
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

document.querySelector('#dataCartsFix').addEventListener('click', function (event) {
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
        fixButtonSelect = event.target.closest('.fix-select')
        if (fixButtonSelect) {
            const select = fixButtonSelect.nextElementSibling?.nextElementSibling;
            select.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            if (select && select.disabled) {
                select.disabled = false;
                fixButtonSelect.innerHTML = '<img src="../image/check.png" alt="build" class="icon">';
                select.focus();
            } else if (select) {
                select.disabled = true;
                fixButtonSelect.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
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
        const selects = document.querySelectorAll('.menu-fix select');
        selects.forEach(function (input) {
            input.disabled = true;
        });

        const fixButtons = document.querySelectorAll('.fix');
        fixButtons.forEach(function (button) {
            button.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
        });
        const fixButtonsSelect = document.querySelectorAll('.fix-select');
        fixButtonsSelect.forEach(function (button) {
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


document.querySelector('#dataCartsDelete').addEventListener('click', function (event) {
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
