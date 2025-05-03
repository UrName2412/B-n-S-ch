import { addressHandler } from '../../admin/asset/js/apiAddress.js';

document.addEventListener("DOMContentLoaded", () => {
    const addressElement = document.getElementById('thongTinNguoiNhan');

    // Lấy dữ liệu giỏ hàng từ sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống! Không thể đặt hàng.");
        window.location.href = "../nguoidung/indexuser.php";
        return;
    }

    const form = document.querySelector('form');

    // Tạo input ẩn chứa dữ liệu giỏ hàng
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
        const price = parseFloat(item.productPrice.replace(/[^\d]/g, ''));
        const thanhTien = price * item.quantity;
        total += thanhTien;

        html += `
            <tr>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.productName}</td>
                <td>${item.productPrice}</td>
                <td>${item.quantity}</td>
                <td>${thanhTien.toLocaleString()}₫</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <h4>Tổng cộng: ${total.toLocaleString()}₫</h4>
    `;

    document.getElementById("hoaDon").innerHTML = html;

    const address = new addressHandler('provinceSelect', 'districtSelect', 'wardSelect');
    const provinceCode = sessionAddress.province;
    const districtCode = sessionAddress.district;
    const wardCode = sessionAddress.ward;
    const street = sessionAddress.street;

    address.setSelectedValues(provinceCode, districtCode, wardCode).then(() => {
        address.concatenateAddress(provinceCode, districtCode, wardCode, street)
            .then(fullAddress => {
                console.log("Full Address:", fullAddress);
                const addressInfoElement = document.getElementById('address-info');
                if (addressInfoElement) {
                    addressInfoElement.textContent = fullAddress;
                } else {
                    console.error('Không tìm thấy phần tử #address-info trong DOM');
                }
            })
            .catch(err => {
                console.error("Lỗi tạo địa chỉ:", err);
            });
    });
});

