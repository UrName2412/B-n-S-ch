var productsAPI = '../data/JSON/sanpham.json';
const person = document.querySelector('.person');
const product = document.querySelector('.inventory');
const listBlock = document.querySelector('#dataBlock');
const headerContent = document.querySelector('.grid-header-product');
let personInfo = [];
let products = []; // Biến lưu dữ liệu sản phẩm
// const headMenuMoblie = document.querySelector('.menuHeader-mobile');
// const headAside = document.querySelector('aside')
// const headMenu = document.querySelector('.menuHeader');
// const headLogo = document.querySelector('.logo a');
// const headSidebar = document.querySelector('.sidebar');
// const headClosebtn = document.querySelector('.header .close');


// headMenu.addEventListener('click', () => {
//     headLogo.style.display = 'inline-flex';
//     headSidebar.style.display = 'block';
//     headMenu.style.display = 'none';
//     headClosebtn.style.display = 'block';
//     containerCss.style.gridTemplateColumns = '12rem 1fr';
// })

// headClosebtn.addEventListener('click', () => {
//     headLogo.style.display = 'none';
//     headSidebar.style.display = 'none';
//     headMenu.style.display = 'block';
//     headClosebtn.style.display = 'none';
//     containerCss.style.gridTemplateColumns = '3.5rem 1fr';
// })

function start() {
    // Tải dữ liệu sản phẩm và người dùng khi trang load
    getProducts().then(() => {
        renderProducts(products); // Render sản phẩm sau khi tải xong
    });
    getPersonList();
}

// Hàm lấy dữ liệu sản phẩm
function getProducts() {
    return fetch(productsAPI)
        .then(response => response.json())
        .then(data => {
            products = data;
            products.sort((a, b) => (b.quantity * b.total) - (a.quantity * a.total));
        });
}

// Hàm render sản phẩm
function renderProducts(products) {
    listBlock.innerHTML = '';
    products.forEach(function (product) {
        if (typeof product.total !== 'string') {
            product.total = product.total.toString();
        }
        product.total = parseFloat(product.total.replace(/\./g, ''));
        var newProduct = document.createElement('div');
        newProduct.className = 'grid-row-product';
        newProduct.innerHTML = `
            <span>${product.id}</span>
            <span>${product.name}</span>
            <span>${product.quantity}</span>
            <span>${formatCurrency(product.total * product.quantity)}</span>
        `;
        listBlock.appendChild(newProduct);
    });
}

// Hàm lấy dữ liệu người dùng
function getPersonList() {
    fetch('../data/JSON/nguoidung.json')
        .then(response => response.json())
        .then(data => {
            personInfo = data;
            personInfo.sort((a, b) => b.quantity - a.quantity);
        });
}

// Hàm render thông tin người dùng
function renderPerson(personInfo) {
    listBlock.innerHTML = '';
    personInfo.forEach(function (personDetail) {
        var personItem = document.createElement('div');
        personItem.className = 'grid-row-product';
        personItem.innerHTML = `
            <span>${personDetail.id}</span>
            <span>${personDetail.name}</span>
            <span>${personDetail.quantity}</span>
            <span>${personDetail.email}</span>
            <span>${personDetail.phone}</span>
        `;
        listBlock.appendChild(personItem);
    });
}

// Thêm sự kiện click cho phần tử .person để hiển thị thông tin người dùng
person.addEventListener('click', () => {
    headerContent.innerHTML = `
        <span>Mã người dùng</span>
        <span>Tên người dùng</span>
        <span>Số lượng mua</span>
        <span>Email</span>
        <span>Số điện thoại</span>`;
    renderPerson(personInfo);
});

// Thêm sự kiện click cho phần tử .inventory để hiển thị sản phẩm
product.addEventListener('click', () => {
    headerContent.innerHTML = `
        <span>Mã Sách</span>
        <span>Tên Sách</span>
        <span>Số lượng</span>
        <span>Tổng tiền</span>`;
    if (products.length > 0) {
        renderProducts(products);
        showInventory(products); // Hiển thị thống kê khi nhấn Inventory
    } else {
        alert('Dữ liệu sản phẩm chưa được tải.');
    }
});

function showInventory(products) {
    var totalRevenue = 0;
    var bestSelling = { name: '', quantity: 0 };
    var worstSelling = { name: '', quantity: Infinity };

    products.forEach(function (product) {
        var revenue = product.total * product.quantity;
        totalRevenue += revenue;

        if (product.quantity > bestSelling.quantity) {
            bestSelling = { name: product.name, quantity: product.quantity };
        }

        if (product.quantity < worstSelling.quantity) {
            worstSelling = { name: product.name, quantity: product.quantity };
        }
    });

    displayModal(totalRevenue, bestSelling, worstSelling);
}

function displayModal(totalRevenue, bestSelling, worstSelling) {
    var modal = document.createElement('div');
    modal.className = 'modal show';

    modal.innerHTML = `
        <div class="headModal">Thống Kê Sản Phẩm</div>
        <div class="modal-body">
            <p><strong>Tổng thu: </strong>${totalRevenue.toLocaleString()} VNĐ</p>
            <p><strong>Sản phẩm bán chạy nhất: </strong>${bestSelling.name} (Số lượng: ${bestSelling.quantity})</p>
            <p><strong>Sản phẩm ít được quan tâm nhất: </strong>${worstSelling.name} (Số lượng: ${worstSelling.quantity})</p>
        </div>
        <div class="choiceModal">
            <button class="cancel" onclick="closeModal()">Đóng</button>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeModal() {
    var modal = document.querySelector('.modal');
    modal.remove();
}

function formatCurrency(amount) {
    return amount.toLocaleString('en-US').replace(/,/g, '.').concat(' VNĐ');
}

// Chạy hàm start khi trang load
start();
