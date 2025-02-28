const productsAPI = '../data/JSON/sanpham.json';
const usersAPI = '../data/JSON/nguoidung.json';
// Hàm tải dữ liệu người dùng
async function loadUsers() {
    try {
        const response = await fetch(usersAPI);
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
        return [];
    }
}

// Hiển thị danh sách người dùng
function hienThiNguoiDung(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const userItem = `
            <div class="user-item" onclick="viewUserInvoices('${user.id}')">
                <span>${user.name}</span>
                <span>${user.quantity} sản phẩm</span>
            </div>
        `;
        userList.innerHTML += userItem;
    });
}

// Xem hóa đơn của người dùng
async function viewUserInvoices(userId) {
    try {
        const response = await fetch(usersAPI);
        const users = await response.json();
        const user = users.find(u => u.id == userId);

        if (!user) {
            alert('Không tìm thấy người dùng.');
            return;
        }

        const invoices = [
            {
                id: `${user.id}`,
                total: parseFloat(user.quantity) * 100000 
            }
        ];

        // Hiển thị modal với hóa đơn của người dùng
        const modal = document.createElement('div');
        modal.className = 'modal show';

        modal.innerHTML = `
            <div class="headModal">Hóa Đơn Của ${user.name}</div>
            <div class="modal-body">
                ${invoices.map(invoice => `
                    <p><strong>id: </strong>${invoice.id}</p>
                    <p><strong>Tổng Tiền: </strong>${formatCurrency(invoice.total)}</p>
                    <hr>
                `).join('')}
            </div>
            <div class="choiceModal">
                <button class="cancel" onclick="closeModal()">Đóng</button>
            </div>
        `;

        document.body.appendChild(modal);
    } catch (error) {
        console.error('Lỗi khi lấy hóa đơn:', error);
        alert('Không thể tải hóa đơn. Vui lòng thử lại sau.');
    }
}

function hienThiTop5KhachHang(users) {
    // Sắp xếp người dùng theo số lượng sản phẩm giảm dần
    const sortedUsers = users.sort((a, b) => b.quantity - a.quantity);

    const top5Users = sortedUsers.slice(0, 5);

    // Hiển thị top 5 khách hàng
    const topCustomersBlock = document.getElementById('topCustomersByQuantity');
    topCustomersBlock.innerHTML = '';

    top5Users.forEach((user, index) => {
        const customerItem = `
            <div class="top-customer-item">
                <span>${index + 1}. ${user.name}</span>
                <span>${user.quantity} sản phẩm</span>
            </div>
        `;
        topCustomersBlock.innerHTML += customerItem;
    });
}

document.getElementById('filterButton').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Vui lòng chọn khoảng thời gian hợp lệ.');
        return;
    }

    loadProducts().then(products => {
        thongKeBanHang(products, startDate, endDate);
    });

    loadUsers().then(users => {
        hienThiNguoiDung(users);
        hienThiTop5KhachHang(users); 
    });
});

// Tải dữ liệu ban đầu
loadProducts().then(products => {
    thongKeBanHang(products, "2023-01-01", "2023-12-31");
});

loadUsers().then(users => {
    hienThiNguoiDung(users);
    hienThiTop5KhachHang(users); // Hiển thị top 5 khách hàng ban đầu
});

// Hàm tải dữ liệu sp
async function loadProducts() {
    try {
        const response = await fetch(productsAPI);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        return [];
    }
}

// Hiển thị danh sách sản phẩm
function hienThiSanPham(products) {
    const productDataBlock = document.getElementById('dataProducts');
    productDataBlock.innerHTML = '';

    products.forEach(product => {
        const productRow = `
            <div class="grid-row">
                <span>${product.id}</span>
                <span>${product.name}</span>
                <span>${product.quantity}</span>
                <span>${formatCurrency(parseFloat(product.price.replace(/\./g, '')) * product.quantity)}</span>
                <button onclick="viewInvoices('${product.id}')">Xem hóa đơn</button>
            </div>
        `;
        productDataBlock.innerHTML += productRow;
    });
}

// Tính toán tổng thu, mặt hàng bán chạy nhất và ít nhất
function calculateStats(products) {
    let totalRevenue = 0;
    let bestSellingProduct = null;
    let worstSellingProduct = null;

    products.forEach(product => {
        const revenue = parseFloat(product.price.replace(/\./g, '')) * product.quantity;
        totalRevenue += revenue;

        if (!bestSellingProduct || product.quantity > bestSellingProduct.quantity) {
            bestSellingProduct = product;
        }
        if (!worstSellingProduct || product.quantity < worstSellingProduct.quantity) {
            worstSellingProduct = product;
        }
    });

    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);

    document.getElementById('bestSellingProduct').textContent = bestSellingProduct ? `${bestSellingProduct.name} (${bestSellingProduct.quantity} sản phẩm)` : 'Không có dữ liệu';
    document.getElementById('worstSellingProduct').textContent = worstSellingProduct ? `${worstSellingProduct.name} (${worstSellingProduct.quantity} sản phẩm)` : 'Không có dữ liệu';
}

// Lọc và thống kê sản phẩm đã bán theo khoảng thời gian
function thongKeBanHang(products, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sachBan = products.filter(product => {
        const soldDate = new Date(product.soldDate);
        return soldDate >= start && soldDate <= end;
    });

    hienThiSanPham(sachBan);
    calculateStats(sachBan);
}

// Định dạng giá tiền
function formatCurrency(amount) {
    return amount.toLocaleString('en-US').replace(/,/g, '.').concat(' VNĐ');
}

document.getElementById('filterButton').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Vui lòng chọn khoảng thời gian hợp lệ.');
        return;
    }

    loadProducts().then(products => {
        thongKeBanHang(products, startDate, endDate);
    });
});

// Tải dữ liệu ban đầu
loadProducts().then(products => {
    thongKeBanHang(products, "2023-01-01", "2025-12-31");
});

// Xem hóa đơn của sản phẩm
async function viewInvoices(productId) {
    console.log(`Đang tải hóa đơn cho sản phẩm: ${productId}`);
    try {
        const response = await fetch(productsAPI);
        console.log('Phản hồi từ API:', response);
        const products = await response.json();
        console.log('Dữ liệu sản phẩm:', products);

        const product = products.find(p => p.id == productId);
        if (!product) {
            alert('Không tìm thấy sản phẩm.');
            return;
        }

        const invoices = [
            {
                id: `HD${product.id}`,
                date: product.soldDate,
                quantity: product.quantity,
                total: parseFloat(product.price.replace(/\./g, '')) * product.quantity
            }
        ];

        console.log('Dữ liệu hóa đơn giả lập:', invoices);

        const modal = document.createElement('div');
        modal.className = 'modal show';

        modal.innerHTML = `
            <div class="headModal">Hóa Đơn Mặt Hàng ${product.name}</div>
            <div class="modal-body">
                ${invoices.map(invoice => `
                    <p><strong>Mã Hóa Đơn: </strong>${invoice.id}</p>
                    <p><strong>Ngày: </strong>${invoice.date}</p>
                    <p><strong>Số Lượng: </strong>${invoice.quantity}</p>
                    <p><strong>Tổng Tiền: </strong>${formatCurrency(invoice.total)}</p>
                    <hr>
                `).join('')}
            </div>
            <div class="choiceModal">
                <button class="cancel" onclick="closeModal()">Đóng</button>
            </div>
        `;

        document.body.appendChild(modal);
        console.log('Modal đã được thêm vào DOM');
    } catch (error) {
        console.error('Lỗi khi lấy hóa đơn:', error);
        alert('Không thể tải hóa đơn. Vui lòng thử lại sau.');
    }
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}