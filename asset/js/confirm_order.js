document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const form = document.querySelector('form');

    // Gửi dữ liệu giỏ hàng bằng input hidden
    const cartInput = document.createElement('input');
    cartInput.type = 'hidden';
    cartInput.name = 'cart';
    cartInput.value = JSON.stringify(cart);

    form.appendChild(cartInput);

    let total = 0;
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sách</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(item => {
        const price = parseInt(item.productPrice.replace(/[^\d]/g, ''));
        let thanhTien = price * item.quantity;
        thanhTien.replace
        total += thanhTien;

        html += `
            <tr>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.productName}</td>
                <td>${item.productPrice}</td>
                <td>${item.quantity}</td>
                <td>${formatVND(thanhTien)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <h4>Tổng cộng: ${formatVND(total)}</h4>
    `;

    document.getElementById("hoaDon").innerHTML = html;
});

function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + ' đ';
}


