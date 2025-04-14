<?php 
require '../config/config.php';
require '../handlers/admin_handle.php';
session_start();

if (isset($_SESSION['usernameadmin']) && (isset($_SESSION['roleadmin']) && $_SESSION['roleadmin'] == true)) {
    $username = $_SESSION['usernameadmin'];
} else {
    echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../index.php';</script>";
    exit();
}

$admin = getAdminInfoByUsername($database, $username);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../asset/css/style.css">
    <link rel="stylesheet" href="../asset/css/function.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <title>Admin </title>
</head>



<body>
    <div class="container">
        <!--Sidebar Section-->
        <aside>
            <div class="sidebar">
                <a href="thongke.php">
                    <i class="fas fa-chart-line"></i>
                    <h3>Thống kê</h3>
                </a>
                <a href="nguoidung.php">
                    <i class="fas fa-user"></i>
                    <h3>Người dùng</h3>
                </a>
                <a href="sanpham.php">
                    <i class="fas fa-archive"></i>
                    <h3>Sản phẩm</h3>
                </a>
                <div class="active">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Đơn hàng</h3>
                </div>
                <a href="dangxuat.php" class="last-child">
                    <i class="fas fa-sign-out-alt"></i>
                    <h3>Đăng xuất</h3>
                </a>
            </div>
        </aside>
        <!--End of Sidebar Section-->

        
        <!--Header-->
        <div class="header">
            <div class="toggle">
                <div class="logo">
                    <a href="nguoidung.php">
                        <img src="../image/LogoSach.png">
                        <h2><?php echo $admin['tenNguoiDung'];?></h2>
                    </a>
                </div>
            </div>
            <button type="button" class="close" id="closeHeaderButton">
                <i class="fas fa-times"></i>
            </button>
            <button type="button" class="menuHeader" id="menuHeaderButton">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <!--End of Header-->

        <!-- Content Section -->
        <div class="container-content">
            <div class="content">
                <div class="grid-header-cart">
                    <span>Mã đơn</span>
                    <span>Tên người dùng</span>
                    <span>Địa chỉ</span>
                    <span>Số điện thoại</span>
                    <span>Tổng tiền</span>
                    <span>Tình trạng</span>
                    <span>Chi tiết</span>
                </div>
                <div class="grid-body" id="dataCarts">
                    <!-- JSON -->
                </div>
            </div>

            
            <div class="menuFilter" style="display: none;">
                <div class="timeFilter">
                    <div class="part">
                        <label for="dateStart">Từ</label>
                        <span>:</span>
                        <input type="date" name="dateStart" id="dateStart">
                    </div>
                    <div class="part">
                        <label for="dateEnd">Đến</label>
                        <span>:</span>
                        <input type="date" name="dateEnd" id="dateEnd">
                    </div>
                </div>
                <div class="addressFilter">
                    <label for="city">Thành phố</label>
                    <span>:</span>
                    <select name="city" id="city">
                        <option value="">Lựa chọn</option>
                    </select>
                    <label for="district">Quận</label>
                    <span>:</span>
                    <select name="district" id="district">
                        <option value="">Lựa chọn</option>
                    </select>
                </div>
                <div class="buttons">
                    <button type="button" class="clearFilter" id="clearButton" onclick="clearFilter()">Bỏ lọc</button>
                    <button type="button" class="acceptFilter" onclick="handleFilter(dateStart.value,dateEnd.value,city.value,district.value)">Lọc</button>
                </div>
            </div>

            <!-- Tool Section -->
            <div class="tool">
                <div class="search">
                    <button type="button" id="filterBtnCart">
                        <i class="fas fa-filter"></i>
                    </button>
                    <select name="cartFilter" id="cartFilter" onchange="cartFilter()">
                        <option value="Tất cả đơn hàng">Tất cả đơn hàng</option>
                        <option value="Chưa xử lí">Chưa xử lí</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                    <input type="text" name="search" placeholder="Tìm kiếm..." id="searchInput">
                    <button type="button" id="searchButton" onclick="searchButton()">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Tool Menu -->
        <div class="tool-menu" style="display: none;"  id="tool-menu">
            <button type="button" class="menu-close" id="closeToolMenuButton">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <!--End of Content-Tool-->
    </div>

    <script src="../asset/js/function.js"></script>
    <script src="../asset/js/validator.js"></script>
    <script src="../asset/js/inputDataCart.js"></script>
    <script src="../asset/js/admin.js"></script>
    <script type="module" src="../asset/js/apiAddress.js"></script>

    <script type="module">
        import {
            addressHandler
        } from '../asset/js/apiAddress.js';
        document.addEventListener("DOMContentLoaded", () => {
            const addressHandler1 = new addressHandler("city", "district");

            addressHandler1.loadProvinces();
        });
    </script>
    <script>
    function handleFilter(dateStart, dateEnd, city, district) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `filterDonHang.php?dateStart=${dateStart}&dateEnd=${dateEnd}&city=${city}&district=${district}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    const dataCarts = document.getElementById('dataCarts');
                    dataCarts.innerHTML = ''; // Xóa dữ liệu cũ

                    if (data.length > 0) {
                        data.forEach(order => {
                            const row = `
                                <div class="grid-row">
                                    <span>${order.maDon}</span>
                                    <span>${order.tenNguoiDung}</span>
                                    <span>${order.diaChi}, ${order.districtName}, ${order.cityName}</span>
                                    <span>${order.soDienThoai}</span>
                                    <span>${order.tongTien}</span>
                                    <span>${order.tinhTrang}</span>
                                    <span><a href="chiTietDonHang.php?id=${order.maDon}">Chi tiết</a></span>
                                </div>
                            `;
                            dataCarts.innerHTML += row;
                        });
                    } else {
                        dataCarts.innerHTML = '<div class="no-data">Không có dữ liệu phù hợp.</div>';
                    }
                } catch (e) {
                    console.error('Lỗi JSON:', e);
                    console.error('Phản hồi:', xhr.responseText);
                }
            } else {
                console.error('Lỗi khi tải dữ liệu');
            }
        };
        xhr.send();
    }

    function clearFilter() {
        document.getElementById('dateStart').value = '';
        document.getElementById('dateEnd').value = '';
        document.getElementById('city').value = '';
        document.getElementById('district').value = '';
        handleFilter('', '', '', ''); // Reset bộ lọc
    }
</script>
</body>

</html>