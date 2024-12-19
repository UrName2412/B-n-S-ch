

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
            <input type="text" name="cart-id" value="${cart.id}" readonly>
            <input type="text" name="cart-name" value="${cart.name}" readonly>
            <input type="text" name="cart-address" value="${cart.address}" readonly>
            <input type="text" name="cart-phone" value="${cart.phone}" readonly>
            <input type="text" name="cart-quantity" value="${cart.quantity}" readonly>
            <input type="text" name="cart-amount" value="${cart.amount}" readonly>
            <div class="status">
                <input type="text" name="cart-status" value="${cart.status}" readonly>
            </div>
        `;
        var statusElement = newCart.querySelector('.status');
        console.log(statusElement);
        if (cart.status == 'Chưa xử lí') statusElement.classList.add('not-confirm');
        else if (cart.status == 'Đã xác nhận') statusElement.classList.add('confirm');
        else if (cart.status == 'Đã giao') statusElement.classList.add('delivered');
        else if (cart.status == 'Đã hủy') statusElement.classList.add('canceled');

        // Thêm phần tử vào DOM
        listCartsBlock.appendChild(newCart);
    });
}

// document.querySelector('#dataCarts').addEventListener('click', function (event) {
//     var row = event.target.closest('.grid-row-cart');
//     if (row) {
//         const status = row.querySelector('.status');
//         const spans = row.querySelectorAll('span');
//         const isExpanded = row.classList.contains('expanded');
//         if (isExpanded) {
//             spans.forEach((span, index) => {
//                 if (index > 2) {
//                     span.style.display = 'none';
//                     span.style.borderBottom = 'none';
//                 }
//                 else {
//                     span.style.borderBottom = 'none';
//                 }
//             });
//             status.style.display = 'none';
//             row.classList.remove('expanded');
//         } else {
//             spans.forEach(span => {
//                 span.style.display = 'inline-block';
//                 span.style.borderBottom = '1px solid var(--color-dark)';
//             });
//             status.style.display = 'inline-block';
//             row.classList.add('expanded');
//         }
//     }
// });

// Fix button status