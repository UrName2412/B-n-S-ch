

var cartsAPI = '../data/JSON/hoadon.json';

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
            <textarea placeholder="Nhập nội dung..." readonly>${cart.id}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${cart.username}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${cart.address}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${cart.phone}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${cart.quantity}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${cart.amount}</textarea>
            <div class="status">
                <textarea placeholder="Nhập nội dung..." readonly>${cart.status}</textarea>
            </div>
        `;
        var statusInputElement = newCart.querySelector('.status textarea');
        if (cart.status == 'Chưa xử lí') statusInputElement.classList.add('not-confirm');
        else if (cart.status == 'Đã xác nhận') statusInputElement.classList.add('confirm');
        else if (cart.status == 'Đã giao') statusInputElement.classList.add('delivered');
        else if (cart.status == 'Đã hủy') statusInputElement.classList.add('canceled');

        // Thêm phần tử vào DOM
        listCartsBlock.appendChild(newCart);
    });
}
