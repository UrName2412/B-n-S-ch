

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
                <button type="button">${cart.status}</button>
            </div>
        `;
        var statusButton = newCart.querySelector('.status button');
        setStatus(cart.status,statusButton);
        // Thêm phần tử vào DOM
        listCartsBlock.appendChild(newCart);

        statusButton.addEventListener('click', () => {
            if (cart.status == 'Chưa xử lí') cart.status = 'Đã xác nhận';
            else if (cart.status == 'Đã xác nhận') cart.status = 'Đã giao';
            else if (cart.status == 'Đã giao') cart.status = 'Đã hủy';
            else if (cart.status == 'Đã hủy') cart.status = 'Chưa xử lí';
            setStatus(cart.status,statusButton);
        })

        function setStatus(cartStatus,statusButton){
            statusButton.className = '';
            if (cartStatus == 'Chưa xử lí') statusButton.classList.add('not-confirm');
            else if (cartStatus == 'Đã xác nhận') statusButton.classList.add('confirm');
            else if (cartStatus == 'Đã giao') statusButton.classList.add('delivered');
            else if (cartStatus == 'Đã hủy') statusButton.classList.add('canceled');
            statusButton.innerHTML = `${cartStatus}`;
        }
    });
}
