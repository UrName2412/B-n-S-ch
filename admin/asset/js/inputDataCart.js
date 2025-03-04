var cartsAPI = '../data/JSON/donhang.json';

let carts = [];
var listCartsBlock = document.querySelector('#dataCarts');

function start() {
    getCarts().then(() => {
        renderCarts();
    });
}

//function
function getCarts() {
    return fetch(cartsAPI)
        .then(response => response.json())
        .then(data => {
            carts = data;
        });
}

function renderCarts() {
    allCarts(listCartsBlock);
}


function setStatusButtons(statusButtons,isAllCarts){
    statusButtons.forEach((statusButton) => {
        setStatus(statusButton.innerHTML,statusButton);
        statusButton.addEventListener('click', (event) => {
            if (statusButton.innerHTML == 'Chưa xử lí') statusButton.innerHTML = "Đã xác nhận";
            else if (statusButton.innerHTML == 'Đã xác nhận') statusButton.innerHTML = "Đã giao";
            else if (statusButton.innerHTML == 'Đã giao') statusButton.innerHTML = "Đã hủy";
            else if (statusButton.innerHTML == 'Đã hủy') statusButton.innerHTML = "Chưa xử lí";

            var gridRowCart = event.target.closest('.grid-row-cart');
            let id = gridRowCart.querySelector('.grid-row-cart textarea[placeholder="Nhập id..."]').value;
            let index = carts.findIndex(cart => cart.id == id);
            carts[index].status = statusButton.innerHTML;
            if (isAllCarts === false){
                gridRowCart.remove();
            }
            setStatus(statusButton.innerHTML,statusButton);
        })
    })

    function setStatus(cartStatus,statusButton){
        statusButton.className = 'status';
        if (cartStatus == 'Chưa xử lí') statusButton.classList.add('not-confirm');
        else if (cartStatus == 'Đã xác nhận') statusButton.classList.add('confirm');
        else if (cartStatus == 'Đã giao') statusButton.classList.add('delivered');
        else if (cartStatus == 'Đã hủy') statusButton.classList.add('canceled');
        statusButton.innerHTML = `${cartStatus}`;
    }
}

function setDetailButtons(detailButtons){
    detailButtons.forEach(detailButton => {
        detailButton.addEventListener('click', (event) => {
            var gridRowCart = event.target.closest('.grid-row-cart');
            var id = gridRowCart.querySelector('textarea[placeholder="Nhập id..."]').value;
            var index = carts.findIndex(cart => cart.id == id);

            const toolMenu = document.querySelector('.tool-menu');
            toolMenu.style.display = 'block';
            menuDetail = document.createElement('div');
            menuDetail.className = 'menu-detail';
            menuDetail.innerHTML = `
                <h2>Chi tiết đơn hàng</h2>
                <div class="detailHeader">
                    <ul>
                        <span>HÓA ĐƠN CHO</span>
                        <li>Vũ</li>
                        <li>Asd</li>
                    </ul>
                </div>
                <div class="grid-header-detail">
                    <textarea readonly>Sản phẩm</textarea>
                    <textarea readonly>Số lượng</textarea>
                    <textarea readonly>Đơn giá</textarea>
                    <textarea readonly>Thành tiền</textarea>
                </div>
                <div class="grid-body-detail">
                    <div class="grid-row-detail">
                        <textarea readonly>Sach Cu~</textarea>
                        <textarea readonly>5</textarea>
                        <textarea readonly>30.000</textarea>
                        <textarea readonly>150.000</textarea>
                    </div>
                    <div class="grid-row-detail">
                        <textarea readonly>Sach Cu~</textarea>
                        <textarea readonly>5</textarea>
                        <textarea readonly>30.000</textarea>
                        <textarea readonly>150.000</textarea>
                    </div>
                </div>
                <div class="grid-footer-detail">
                    <textarea readonly>Tổng cộng</textarea>
                    <textarea readonly>300.000</textarea>
                </div>
            `;
            toolMenu.appendChild(menuDetail)
            openToolMenu('.menu-detail');
        })
    })
}

function searchButton() {
    var input = document.getElementById('searchInput');
    var valueSearch = input.value.trim().toLowerCase();
    if (valueSearch == "") {
        cartFilter();
    } else {
        listCartsBlock.innerHTML = '';
        carts.forEach(cart => {
            for (const value in cart){
                if (typeof(cart[value]) !== "string"){
                    var data = String(cart[value]);
                } else data = cart[value]
                data = data.trim().toLowerCase();
                if (data.includes(valueSearch) && !data.includes("gmail")) {
                    var newCart = document.createElement('div');
                    newCart.className = 'grid-row-cart';
                    newCart.innerHTML = `
                        <textarea placeholder="Nhập id..." readonly>${cart.id}</textarea>
                        <textarea placeholder="Nhập tên người dùng..." readonly>${cart.username}</textarea>
                        <textarea placeholder="Nhập địa chỉ..." readonly>${cart.address}</textarea>
                        <textarea placeholder="Nhập số điện thoại..." readonly>${cart.phone}</textarea>
                        <textarea placeholder="Nhập tổng giá..." readonly>${cart.amount}</textarea>
                        <button type="button" class="status">${cart.status}</button>
                        <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                    `;
                    listCartsBlock.appendChild(newCart);
                    break;
                }
            }
        })
        var statusButtons = document.querySelectorAll('.status');
        const detailButtons = document.querySelectorAll('.detailButton');
        setStatusButtons(statusButtons,true);
        setDetailButtons(detailButtons);
    }
}

function allCarts(listCartsBlock){
    listCartsBlock.innerHTML = '';
    carts.forEach(function (cart) {
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
    });
    var statusButtons = document.querySelectorAll('.status');
    const detailButtons = document.querySelectorAll('.detailButton');
    setStatusButtons(statusButtons,true);
    setDetailButtons(detailButtons);
}

function statusCarts(listCartsBlock,status){
    listCartsBlock.innerHTML = '';
    carts.forEach(function (cart) {
        if (cart.status == status){
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
    });
    var statusButtons = document.querySelectorAll('.status');
    var detailButtons = document.querySelectorAll('.detailButton');
    setStatusButtons(statusButtons,false);
    setDetailButtons(detailButtons);
}

function cartFilter(){
    const cartFilter = document.getElementById('cartFilter');
    if (cartFilter.value == "allCarts") allCarts(listCartsBlock);
    else if (cartFilter.value == "cartsNotConfirm") statusCarts(listCartsBlock,"Chưa xử lí");
    else if (cartFilter.value == "cartsConfirm") statusCarts(listCartsBlock,"Đã xác nhận");
    else if (cartFilter.value == "cartsDelivered") statusCarts(listCartsBlock,"Đã giao");
    else if (cartFilter.value == "cartsCanceled") statusCarts(listCartsBlock,"Đã hủy");
}

let filterBtn = document.getElementById('filterBtn');
let menuFilter = document.querySelector('.menuFilter');
filterBtn.onclick = () => {
    if (menuFilter.classList.contains('appear')){
        menuFilter.style.display = 'none';
        menuFilter.classList.remove('appear');
    }else{
        menuFilter.style.display = 'flex';
        menuFilter.classList.add('appear');
    }
}


start();

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row-cart');
});