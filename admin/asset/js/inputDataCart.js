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


function setStatusButtons(isAllCarts) {
    var statusButtons = document.querySelectorAll('.status');
    statusButtons.forEach((statusButton) => {
        setStatus(statusButton.innerHTML, statusButton);
        statusButton.addEventListener('click', (event) => {
            if (statusButton.innerHTML == 'Chưa xử lí') statusButton.innerHTML = "Đã xác nhận";
            else if (statusButton.innerHTML == 'Đã xác nhận') statusButton.innerHTML = "Đã giao";
            else if (statusButton.innerHTML == 'Đã giao') statusButton.innerHTML = "Đã hủy";
            else if (statusButton.innerHTML == 'Đã hủy') statusButton.innerHTML = "Chưa xử lí";

            var gridRowCart = event.target.closest('.grid-row-cart');
            let id = gridRowCart.querySelector('.grid-row-cart textarea[placeholder="Nhập id..."]').value;
            let index = carts.findIndex(cart => cart.id == id);
            carts[index].status = statusButton.innerHTML;
            if (isAllCarts === false) {
                gridRowCart.remove();
            }
            setStatus(statusButton.innerHTML, statusButton);
        })
    })

    function setStatus(cartStatus, statusButton) {
        statusButton.className = 'status';
        if (cartStatus == 'Chưa xử lí') statusButton.classList.add('not-confirm');
        else if (cartStatus == 'Đã xác nhận') statusButton.classList.add('confirm');
        else if (cartStatus == 'Đã giao') statusButton.classList.add('delivered');
        else if (cartStatus == 'Đã hủy') statusButton.classList.add('canceled');
        statusButton.innerHTML = `${cartStatus}`;
    }
}

function setDetailButtons() {
    var detailButtons = document.querySelectorAll('.detailButton');
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
        if (flag){
            createAlert("Không tìm thấy đơn hàng.");
            cartFilter();
        } else{
            setStatusButtons(true);
            setDetailButtons();
        }
    }
}

function allCarts(listCartsBlock) {
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
    setStatusButtons(true);
    setDetailButtons();
}

function statusCarts(listCartsBlock, status) {
    listCartsBlock.innerHTML = '';
    carts.forEach(function (cart) {
        if (cart.status == status) {
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
    setStatusButtons(false);
    setDetailButtons();
}

function cartFilter() {
    const cartFilter = document.getElementById('cartFilter');
    if (cartFilter.value == "Tất cả đơn hàng") allCarts(listCartsBlock);
    else if (cartFilter.value == "Chưa xử lí") statusCarts(listCartsBlock, "Chưa xử lí");
    else if (cartFilter.value == "Đã xác nhận") statusCarts(listCartsBlock, "Đã xác nhận");
    else if (cartFilter.value == "Đã giao") statusCarts(listCartsBlock, "Đã giao");
    else if (cartFilter.value == "Đã hủy") statusCarts(listCartsBlock, "Đã hủy");
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



function handleFilter(dateStart, dateEnd, city, district) {
    var flag = true;

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
        cartTime = new Date(carts[i].date + "T07:00:00");
        if (carts[i].status == cartFilterValue || cartFilterValue == "Tất cả đơn hàng") {

            var cityTemp = carts[i].address.split(",")[1].trim().toLowerCase();
            var districtTemp = carts[i].address.split(",")[0].trim().toLowerCase();



            if (city && city !== cityTemp) continue;
            if (district && district !== districtTemp) continue;

            if (dateStart && cartTime < dateStart) continue;
            if (dateEnd && cartTime > dateEnd) continue;

            flag = false;

            var newCart = document.createElement('div');
            newCart.className = 'grid-row-cart';
            newCart.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${carts[i].id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${carts[i].username}</textarea>
                <textarea placeholder="Nhập địa chỉ..." readonly>${carts[i].address}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${carts[i].phone}</textarea>
                <textarea placeholder="Nhập tổng giá..." readonly>${carts[i].amount}</textarea>
                <div class="buttonCart">
                    <button type="button" class="status">${carts[i].status}</button>
                    <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                </div>
            `;
            listCartsBlock.appendChild(newCart);
        }
    }
    
    if (flag){
        clearFilter();
        createAlert("Không tìm thấy đơn hàng.");
    } else {
        if (cartFilterValue == "Tất cả đơn hàng")
            setStatusButtons(true);
        else setStatusButtons(false);
        setDetailButtons();
    }
}

function clearFilter(){
    userFilter();
    const ids = ['dateStart','dateEbd','city','district'];
    ids.forEach(id =>{
        const Element = document.getElementById(id);
        if (Element) Element.value = "";
    })
}

start();

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row-cart');
});

