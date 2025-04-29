import { addressHandler } from './apiAddress.js';
const addressHandler1 = new addressHandler();

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

function fetchTop5Customers(startDate = "", endDate = "") {
    let url = '../handlers/lay/get_top5_customers.php';
    if (startDate && endDate) {
        url += `?start=${startDate}&end=${endDate}`;
    }
    var listCustomersBlock = document.getElementById('listCustomersBlock');
    listCustomersBlock.innerHTML = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6">Không có dữ liệu trong khoảng thời gian này.</td></tr>';
                return;
            }

            data.forEach((customer, index) => {
                var newCustomers = document.createElement('div');
                newCustomers.className = 'grid-row';
                newCustomers.innerHTML = `
                        <textarea placeholder="Nhập số thứ tự..." readonly>${index + 1}</textarea>
                        <textarea placeholder="Nhập tên người dùng..." readonly>${customer.tenNguoiDung}</textarea>
                        <textarea placeholder="Nhập tổng tiền..." readonly>${formatVND(customer.totalSpent)}</textarea>
                        <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                    `;
                listCustomersBlock.appendChild(newCustomers);
            });
            setDetailButtons();
        })
        .catch(error => {
            console.error('Lỗi khi tải top 5 khách hàng:', error);
        });
}


function setDetailButtons(currentOrderPage = null) {
    if (currentOrderPage === null) {
        currentOrderPage = 1;
    }
    else currentOrderPage = currentOrderPage;
    const ordersPerPage = 4;
    var detailButtons = document.querySelectorAll('.detailButton');
    detailButtons.forEach(detailButton => {
        detailButton.addEventListener('click', async function (event) {
            var gridRow = event.target.closest('.grid-row');
            var tenNguoiDung = gridRow.querySelector('textarea[placeholder="Nhập tên người dùng..."]').value.trim();
            let response = await fetch(`../handlers/lay/laydonhang.php?tenNguoiDung=${encodeURIComponent(tenNguoiDung)}&tinhTrang=Đã xác nhận,Đã giao`);
            let orders = await response.json();

            if (orders && orders.length > 0) {
                await showCustomerOrders(orders, tenNguoiDung, currentOrderPage, ordersPerPage);
            } else {
                alert("Không có đơn hàng nào.");
            }
        });
    });
}

async function showCustomerOrders(orders, tenNguoiDung, currentOrderPage, ordersPerPage) {
    const toolMenu = document.querySelector('.tool-menu');
    toolMenu.style.display = 'block';

    const oldMenuDetail = toolMenu.querySelector('.menu-detail');
    if (oldMenuDetail) oldMenuDetail.remove();

    const menuDetail = document.createElement('div');
    menuDetail.className = 'menu-detail';
    toolMenu.appendChild(menuDetail);
    openToolMenu('.menu-detail');

    function renderOrderPage() {
        const startIndex = (currentOrderPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        const pageOrders = orders.slice(startIndex, endIndex);

        menuDetail.innerHTML = `
            <h2>Danh sách đơn hàng của ${tenNguoiDung}</h2>
            <div id="ordersList">
                ${pageOrders.map(order => `
                    <div class="order-item">
                        <p><strong>Mã đơn:</strong> ${order.maDon}</p>
                        <p><strong>Ngày đặt:</strong> ${order.ngayTao}</p>
                        <p><strong>Tổng tiền:</strong> ${formatVND(order.tongTien)}</p>
                        <button class="viewOrderDetail" data-ma-don="${order.maDon}">Xem chi tiết đơn này</button>
                    </div>
                `).join('')}
            </div>
            <div id="orderPagination"></div>
        `;

        renderOrderPagination(orders.length);
        setViewOrderDetailButtons();
    }

    function renderOrderPagination(totalOrders) {
        const pagination = document.getElementById('orderPagination');
        pagination.innerHTML = '';

        const totalPages = Math.ceil(totalOrders / ordersPerPage);
        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = currentOrderPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentOrderPage > 1) {
                currentOrderPage--;
                renderOrderPage();
            }
        });
        pagination.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if (i === currentOrderPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentOrderPage = i;
                renderOrderPage();
            });
            pagination.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentOrderPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentOrderPage < totalPages) {
                currentOrderPage++;
                renderOrderPage();
            }
        });
        pagination.appendChild(nextBtn);
    }

    function setViewOrderDetailButtons() {
        const viewDetailButtons = document.querySelectorAll('.viewOrderDetail');
        viewDetailButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const maDon = this.getAttribute('data-ma-don');
                await showOrderProducts(maDon, orders, tenNguoiDung, currentOrderPage, ordersPerPage);
            });
            
        });
    }

    renderOrderPage();
}

async function showOrderProducts(maDon, orders, tenNguoiDung, currentOrderPage, ordersPerPage) {
    const pagination = document.getElementById('orderPagination');
    pagination.innerHTML = '';
    let response = await fetch(`../handlers/lay/laychitiethoadon.php?maDon=${maDon}`);
    let detailCustomers = await response.json();

    let response1 = await fetch(`../handlers/lay/laydonhang.php?maDon=${maDon}`);
    let cart = await response1.json();
    let diaChi = await addressHandler1.concatenateAddress(cart.tinhThanh, cart.quanHuyen, cart.xa, cart.duong);

    let fetchProductPromises = detailCustomers.map(item =>
        fetch(`../handlers/lay/laysanpham.php?maSach=${item.maSach}`).then(res => res.json())
    );
    let productList = await Promise.all(fetchProductPromises);

    let detail = '';
    let tongCong = 0;
    for (let i = 0; i < detailCustomers.length; i++) {
        let item = detailCustomers[i];
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

    let ordersList = document.getElementById('ordersList');
    ordersList.classList.add('detail');
    ordersList.innerHTML = `
        <button id="backToOrders"><i class="fas fa-home"></i> <strong>Trở về</strong></button>
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
        ${detail}
        <div class="grid-footer-detail">
            <textarea readonly>Tổng cộng</textarea>
            <textarea readonly>${formatVND(tongCong)}</textarea>
        </div>
    `;

    document.getElementById('backToOrders').addEventListener('click', () => {
        showCustomerOrders(orders, tenNguoiDung, currentOrderPage, ordersPerPage);
    });
    
}



document.getElementById('filterButton').addEventListener('click', function () {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Vui lòng chọn khoảng thời gian hợp lệ.');
        return;
    }

    loadProducts().then(products => {
        thongKeBanHang(products, startDate, endDate);
    });

    fetchTop5Customers(startDate, endDate);
});

// Tải dữ liệu ban đầu
loadProducts().then(products => {
    thongKeBanHang(products, "2023-01-01", "2023-12-31");
});

fetchTop5Customers();

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

// Tính toán tổng thu, mặt hàng bán chạy nhất và ít nhất
async function calculateStats(products) {
    let totalRevenue = 0;
    let bestSellingProduct = null;
    let worstSellingProduct = null;

    const response = await fetch('../handlers/lay/laytongtiendonhang.php');
    let obj = await response.json();
    totalRevenue = obj.tongTien;

    document.getElementById('totalRevenue').textContent = formatVND(totalRevenue);

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

    calculateStats(sachBan);
}

document.getElementById('filterButton').addEventListener('click', function () {
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

function formatVND(value) {
    const number = Number(value);
    if (isNaN(number)) return '0 ₫';
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}



fetch('../../admin/handlers/lay/laychitietsachdcbanchaynhat.php')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.tenSach);
        const dataValues = data.map(item => item.tongTien);

        // Cắt bớt phần label nếu dài quá
        const truncatedLabels = labels.map(label => {
            return label.length > 15 ? label.slice(0, 15) + "..." : label;
        });

        const formattedDataValues = dataValues.map(value => {
            const numericValue = Number(value);  // Chuyển giá trị thành số
            return numericValue.toLocaleString("vi-VN");
        });

        const chartData = {
            labels: truncatedLabels,  // Dùng labels đã cắt bớt
            datasets: [{
                label: "VNĐ",
                data: formattedDataValues,
                borderColor: "#059bff",
                backgroundColor: "#82cdff",
                borderWidth: 2,
                borderRadius: 10,
                borderSkipped: false,
            }]
        };

        new Chart("myChart", {
            type: "bar",
            data: chartData,
            options: {
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Top 5 Sách có doanh thu cao nhất",
                    },
                    datalabels: {
                        anchor: "end",
                        align: "top",
                        formatter: (value) => value.toLocaleString("vi-VN") + " VNĐ",
                        font: {
                            weight: "bold",
                            size: 10
                        },
                        color: "#000"
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString("vi-VN") + " VNĐ";
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,  // Xoay các label nếu cần thiết
                            autoSkip: true,   // Tự động bỏ qua một số label nếu quá dài
                            maxTicksLimit: 10, // Giới hạn số lượng label hiển thị trên trục X
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
