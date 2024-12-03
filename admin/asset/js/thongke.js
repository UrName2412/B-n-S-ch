var productsAPI = '../data/JSON/sanpham.json';
const person = document.querySelector('.person');
const product = document.querySelector('.inventory');
const listBlock = document.querySelector('#dataBlock');
const headerContent = document.querySelector('.grid-header-product');
let personInfo = [];
let products = []; // Biến lưu dữ liệu sản phẩm

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
            products.sort((a, b) => (b.quantity*b.total )- (a.quantity*a.total));
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
    } else {
        alert('Dữ liệu sản phẩm chưa được tải.');
    }
});

function formatCurrency(amount) {
    return amount.toLocaleString('en-US').replace(/,/g, '.').concat(' VNĐ');
}

// Chạy hàm start khi trang load
start();
