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
            <textarea placeholder="Nhập số lượng..." readonly>${cart.quantity}</textarea>
            <textarea placeholder="Nhập tổng giá..." readonly>${cart.amount}</textarea>
            <button type="button" class="status">${cart.status}</button>
        `;
        listCartsBlock.appendChild(newCart);
    });
    var statusButtons = document.querySelectorAll('.status')
    setStatusButtons(statusButtons,true);
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
                <textarea placeholder="Nhập số lượng..." readonly>${cart.quantity}</textarea>
                <textarea placeholder="Nhập tổng giá..." readonly>${cart.amount}</textarea>
                <button type="button" class="status">${cart.status}</button>
            `;
            listCartsBlock.appendChild(newCart);
        }
    });
    const statusButtons = document.querySelectorAll('.status');
    console.log(statusButtons);
    setStatusButtons(statusButtons,false);
}

function cartFilter(){
    const cartFilter = document.getElementById('cartFilter');
    if (cartFilter.value == "allCarts") allCarts(listCartsBlock);
    else if (cartFilter.value == "cartsNotConfirm") statusCarts(listCartsBlock,"Chưa xử lí");
    else if (cartFilter.value == "cartsConfirm") statusCarts(listCartsBlock,"Đã xác nhận");
    else if (cartFilter.value == "cartsDelivered") statusCarts(listCartsBlock,"Đã giao");
    else if (cartFilter.value == "cartsCanceled") statusCarts(listCartsBlock,"Đã hủy");
}



start();