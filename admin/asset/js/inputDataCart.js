import { addressHandler } from './apiAddress.js';
const addressHandler1 = new addressHandler('city', 'district',);

let carts = [];
var listCartsBlock = document.querySelector('#dataCarts');

function start() {
    cartFilter();
}

function setStatusButtons() {
    var statusButtons = document.querySelectorAll('.status');

    statusButtons.forEach((statusButton) => {
        setStatus(statusButton.innerHTML, statusButton);

        statusButton.onclick = (e) => {
            const gridRowCart = e.target.closest('.grid-row-cart');
            const maDon = gridRowCart.querySelector('textarea[placeholder="Nhập mã đơn..."]').value.trim();

            const toolMenu = document.querySelector('.tool-menu');
            toolMenu.style.display = 'block';

            const oldMenu = toolMenu.querySelector('.menu-fix');
            if (oldMenu) oldMenu.remove();

            let buttons = '';
            if (statusButton.innerHTML === 'Chưa xác nhận') {
                buttons = `
                    <button type="button" class="block confirm" data-status="Đã xác nhận">Đã xác nhận</button>
                    <button type="button" class="block canceled" data-status="Đã hủy">Đã hủy</button>
                `;
            } else if (statusButton.innerHTML === 'Đã xác nhận') {
                buttons = `
                    <button type="button" class="block delivered" data-status="Đã giao">Đã giao</button>
                    <button type="button" class="block canceled" data-status="Đã hủy">Đã hủy</button>
                `;
            } else {
                toolMenu.style.display = 'none';
                createAlert('Không thể chỉnh sửa.')
                return;
            }

            const menuDetail = document.createElement('div');
            menuDetail.className = 'menu-fix';
            menuDetail.innerHTML = `
                <h2>Chọn trạng thái</h2>
                <div class="menu-fix-cart">
                    ${buttons}
                </div>
            `;
            toolMenu.appendChild(menuDetail);
            openToolMenu('.menu-fix');

            const buttonBlocks = menuDetail.querySelectorAll('.block');
            buttonBlocks.forEach((buttonBlock) => {
                buttonBlock.addEventListener('click', () => {
                    const newStatus = buttonBlock.dataset.status;

                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '../handlers/sua/suatinhtrangdonhang.php';

                    const inputTinhTrang = document.createElement('input');
                    inputTinhTrang.type = 'hidden';
                    inputTinhTrang.name = 'tinhTrang';
                    inputTinhTrang.value = newStatus;

                    const inputMaDon = document.createElement('input');
                    inputMaDon.type = 'hidden';
                    inputMaDon.name = 'maDon';
                    inputMaDon.value = maDon;

                    form.appendChild(inputTinhTrang);
                    form.appendChild(inputMaDon);
                    document.body.appendChild(form);

                    form.submit();
                });
            });
        };
    });

    function setStatus(cartStatus, statusButton) {
        statusButton.className = 'status'; 
        if (cartStatus === 'Chưa xác nhận') statusButton.classList.add('not-confirm');
        else if (cartStatus === 'Đã xác nhận') statusButton.classList.add('confirm');
        else if (cartStatus === 'Đã giao') statusButton.classList.add('delivered');
        else if (cartStatus === 'Đã hủy') statusButton.classList.add('canceled');
        statusButton.innerHTML = cartStatus;
    }
}




function setDetailButtons() {
    var detailButtons = document.querySelectorAll('.detailButton');
    detailButtons.forEach(detailButton => {
        detailButton.addEventListener('click', async function(event) {
            var gridRowCart = event.target.closest('.grid-row-cart');
            var maDon = gridRowCart.querySelector('textarea[placeholder="Nhập mã đơn..."]').value.trim();

            let response = await fetch(`../handlers/lay/laydonhang.php?maDon=${maDon}`);
            let cart = await response.json();

            let response1 = await fetch(`../handlers/lay/laychitiethoadon.php?maDon=${maDon}`);
            let detailCart = await response1.json();

            let fetchProductPromises = detailCart.map(item =>
                fetch(`../handlers/lay/laysanpham.php?maSach=${item.maSach}`).then(res => res.json())
            );
            let productList = await Promise.all(fetchProductPromises);

            let detail = '';
            let tongCong = 0;
            for (let i = 0; i < detailCart.length; i++) {
                let item = detailCart[i];
                let product = productList[i];
                let total = item.soLuong * item.giaBan;
                tongCong += total;

                detail += `
                    <div class="grid-row-detail">
                        <textarea readonly>${product.tenSach}</textarea>
                        <textarea readonly>${item.soLuong}</textarea>
                        <textarea readonly>${formatVND(item.giaBan)}</textarea>
                        <textarea readonly>${formatVND(total)}</textarea>
                    </div>
                `;
            }

            const toolMenu = document.querySelector('.tool-menu');
            toolMenu.style.display = 'block';

            const oldMenuDetail = toolMenu.querySelector('.menu-detail');
            if (oldMenuDetail) {
                oldMenuDetail.remove();
            }
            let diaChi = await addressHandler1.concatenateAddress(cart.tinhThanh,cart.quanHuyen,cart.xa,cart.duong);
            let menuDetail = document.createElement('div');
            menuDetail.className = 'menu-detail';
            menuDetail.innerHTML = '';
            menuDetail.innerHTML = `
                <h2>Chi tiết đơn hàng</h2>
                <div class="detailHeader">
                    <div class="header-title">
                        <span>Thông tin đơn hàng</span>
                    </div>
                    <ul class="header-info">
                        <li><strong>Tên người nhận:</strong> ${cart.tenNguoiNhan}</li>
                        <li><strong>Số điện thoại:</strong> ${cart.soDienThoai}</li>
                        <li><strong>Ngày đặt hàng:</strong> ${cart.ngayTao}</li>
                        <li><strong>Địa chỉ:</strong> ${diaChi}</li>
                    </ul>
                </div>
                <div class="grid-header-detail">
                    <textarea readonly>Sản phẩm</textarea>
                    <textarea readonly>Số lượng</textarea>
                    <textarea readonly>Đơn giá</textarea>
                    <textarea readonly>Thành tiền</textarea>
                </div>
                <div class="grid-body-detail">
                    ${detail}
                </div>
                <div class="grid-footer-detail">
                    <textarea readonly>Tổng cộng</textarea>
                    <textarea readonly>${formatVND(tongCong)}</textarea>
                </div>
            `;
            toolMenu.appendChild(menuDetail);
            openToolMenu('.menu-detail');
        });
    });
}


function searchButton() {
    var flag = true;
    var input = document.getElementById('searchInput');
    var valueSearch = input.value.trim().toLowerCase();
    const cartFilterValue = document.getElementById('cartFilter').value;
    const keyCartSearch = "username";
    if (valueSearch == "") {
        cartFilter();
    } else {
        listCartsBlock.innerHTML = '';
        carts.forEach(cart => {
            if (typeof (cart[keyCartSearch]) !== "string") {
                var data = String(cart[keyCartSearch]);
            } else data = cart[keyCartSearch]
            data = data.trim().toLowerCase();
            if (data.includes(valueSearch) && !data.includes("gmail")) {
                console.log(cart.status);
                if (cartFilterValue == "Tất cả đơn hàng" || cartFilterValue == cart.status) {
                    flag = false;
                    var newCart = document.createElement('div');
                    newCart.className = 'grid-row-cart';
                    newCart.innerHTML = `
                        <textarea placeholder="Nhập id..." readonly>${cart.id}</textarea>
                        <textarea placeholder="Nhập tên người dùng..." readonly>${cart.username}</textarea>
                        <textarea placeholder="Nhập địa chỉ..." readonly>${cart.address}</textarea>
                        <textarea placeholder="Nhập số điện thoại..." readonly>${cart.phone}</textarea>
                        <textarea placeholder="Nhập tổng giá..." readonly>${cart.amount}</textarea>
                        <div class="buttonCart">
                            <button type="button" class="status">${cart.status}</button>
                            <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                        </div>
                    `;
                    listCartsBlock.appendChild(newCart);
                }
            }
        })
        if (flag) {
            createAlert("Không tìm thấy đơn hàng.");
            cartFilter();
        } else {
            setStatusButtons();
            setDetailButtons();
        }
    }
}

async function allCarts(listCartsBlock) {
    let response = await fetch('../handlers/lay/laydonhang.php');
    let carts = await response.json();

    listCartsBlock.innerHTML = '';
    for (let cart of carts){
        let diaChi = await addressHandler1.concatenateAddress(cart.tinhThanh,cart.quanHuyen,cart.xa,cart.duong)
        var newCart = document.createElement('div');
        newCart.className = 'grid-row-cart';
        newCart.innerHTML = `
                <textarea placeholder="Nhập mã đơn..." readonly>${cart.maDon}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${cart.tenNguoiDung}</textarea>
                <textarea placeholder="Nhập địa chỉ..." readonly>${diaChi}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${cart.soDienThoai}</textarea>
                <textarea placeholder="Nhập tổng giá..." readonly>${formatVND(cart.tongTien)}</textarea>
                <div class="buttonCart">
                    <button type="button" class="status">${cart.tinhTrang}</button>
                    <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                </div>
            `;
        listCartsBlock.appendChild(newCart);
    };
    setStatusButtons();
    setDetailButtons();
}

async function statusCarts(listCartsBlock, status) {
    let response = await fetch('../handlers/lay/laydonhang.php');
    let carts = await response.json();

    listCartsBlock.innerHTML = '';
    for (let cart of carts) {
        let cartStatus = cart.tinhTrang.trim().toLowerCase().normalize('NFC');
        let filterStatus = status.trim().toLowerCase().normalize('NFC');

        console.log('Cart status:', cartStatus, 'Status filter:', filterStatus, cartStatus == filterStatus);

        if (cartStatus == filterStatus) {
            let diaChi = await addressHandler1.concatenateAddress(cart.tinhThanh, cart.quanHuyen, cart.xa, cart.duong);
            var newCart = document.createElement('div');
            newCart.className = 'grid-row-cart';
            newCart.innerHTML = `
                <textarea placeholder="Nhập mã đơn..." readonly>${cart.maDon}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${cart.tenNguoiDung}</textarea>
                <textarea placeholder="Nhập địa chỉ..." readonly>${diaChi}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${cart.soDienThoai}</textarea>
                <textarea placeholder="Nhập tổng giá..." readonly>${formatVND(cart.tongTien)}</textarea>
                <div class="buttonCart">
                    <button type="button" class="status">${cart.tinhTrang}</button>
                    <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                </div>
            `;
            listCartsBlock.appendChild(newCart);
        }
    }

    setStatusButtons();
    setDetailButtons();
}



function cartFilter() {
    const cartFilter = document.getElementById('cartFilter');
    const status = cartFilter.value;

    if (status === "Tất cả đơn hàng") {
        allCarts(listCartsBlock);
    } else {
        statusCarts(listCartsBlock, status);
    }
}


let filterBtn = document.getElementById('filterBtnCart');
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



async function handleFilter(dateStart, dateEnd, city, district) {
    var flag = true;
    let response = await fetch('../handlers/lay/laydonhang.php');
    let carts = await response.json();

    dateStart = (dateStart == "") ? null : new Date(dateStart);
    dateEnd = (dateEnd == "") ? null : new Date(dateEnd);
    city = (city == "") ? null : city.trim().toLowerCase();
    district = (district == "") ? null : district.trim().toLowerCase();

    if (dateStart && isNaN(dateStart.getTime())) dateStart = null;
    if (dateEnd && isNaN(dateEnd.getTime())) dateEnd = null;

    if (dateStart && dateEnd && dateStart > dateEnd) {
        createAlert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
        return;
    }
    var cartFilterValue = document.getElementById('cartFilter').value;

    if (!dateStart && !dateEnd && !city && !district) {
        listCartsBlock.innerHTML = '';
        cartFilter();
        return;
    }
    listCartsBlock.innerHTML = '';

    for (let i = 0; i < carts.length; i++) {
        let cartTime = new Date(carts[i].ngayTao + "T07:00:00");
        if (carts[i].status == cartFilterValue || cartFilterValue == "Tất cả đơn hàng") {

            if (city && city !== carts[i].tinhThanh) continue;
            if (district && district !== carts[i].quanHuyen) continue;

            if (dateStart && cartTime < dateStart) continue;
            if (dateEnd && cartTime > dateEnd) continue;

            flag = false;

            let diaChi = await addressHandler1.concatenateAddress(carts[i].tinhThanh,carts[i].quanHuyen,carts[i].xa,carts[i].duong);
            var newCart = document.createElement('div');
            newCart.className = 'grid-row-cart';
            newCart.innerHTML = `
                <textarea placeholder="Nhập maDon..." readonly>${carts[i].maDon}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${carts[i].tenNguoiDung}</textarea>
                <textarea placeholder="Nhập địa chỉ..." readonly>${diaChi}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${carts[i].soDienThoai}</textarea>
                <textarea placeholder="Nhập tổng giá..." readonly>${formatVND(carts[i].tongTien)}</textarea>
                <div class="buttonCart">
                    <button type="button" class="status">${carts[i].tinhTrang}</button>
                    <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                </div>
            `;
            listCartsBlock.appendChild(newCart);
        }
    }

    if (flag) {
        clearFilter();
        createAlert("Không tìm thấy đơn hàng.");
    } else {
        if (cartFilterValue == "Tất cả đơn hàng")
            setStatusButtons();
        else setStatusButtons();
        setDetailButtons();
    }
}

function clearFilter() {
    cartFilter();
    const ids = ['dateStart', 'dateEnd'];
    ids.forEach(id => {
        const Element = document.getElementById(id);
        if (Element) Element.value = "";
    })
    let tinhThanh = document.getElementById('city');
    if (tinhThanh) tinhThanh.value = "";
    tinhThanh.dispatchEvent(new Event('change'));
}


start();

document.getElementById('cartFilter').addEventListener('change', ()=>{
    cartFilter();
})

document.getElementById('clearButton').addEventListener('click', () =>{
    clearFilter();
})

document.getElementById('acceptFilter').addEventListener('click', () =>{
    let dateStart = document.getElementById('dateStart')?.value || '';
    let dateEnd = document.getElementById('dateEnd')?.value || '';
    let city = document.getElementById('city')?.value || '';
    let district = document.getElementById('district')?.value || '';
    handleFilter(dateStart,dateEnd,city,district);
})

document.getElementById('searchButton').addEventListener('click', ()=>{
    searchButton();
})

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row-cart');
});

