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
if ($admin['trangThai'] == false) {
    echo "<script>alert('Tài khoản của bạn đã bị khóa!'); window.location.href='dangxuat.php';</script>";
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../asset/css/style.css">
    <link rel="stylesheet" href="../asset/css/function.css">
    <link rel="stylesheet" href="../asset/css/thongke.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <title>Thống kê</title>
</head>

<body>
    <div class="container">
        <!--Sidebar Section-->
        <aside>
            <div class="sidebar">
                <div class="active">
                    <i class="fas fa-chart-line"></i>
                    <h3>Thống kê</h3>
                </div>
                <a href="nguoidung.php">
                    <i class="fas fa-user"></i>
                    <h3>Người dùng</h3>
                </a>
                <a href="sanpham.php">
                    <i class="fas fa-archive"></i>
                    <h3>Sản phẩm</h3>
                </a>
                <a href="donhang.php">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Đơn hàng</h3>
                </a>
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
                    <a href="#">
                        <img src="../image/LogoSach.png">
                        <h2><?php echo $admin['tenNguoiDung']; ?></h2>
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
                <!-- Date Range Picker -->
                <div class="date-range-picker">
                    <label for="startDate">Từ:</label>
                    <input type="date" id="startDate">
                    <label for="endDate">Đến:</label>
                    <input type="date" id="endDate">
                    <button type="button" id="filterButton">Lọc</button>
                </div>

                <!-- Thống kê tổng thu, mặt hàng bán chạy nhất và ế nhất -->
                <div class="stats-container">
                    <div class="stat-block">
                        <h3>Tổng thu</h3>
                        <p id="totalRevenue">0 VNĐ</p>
                    </div>
                    <div class="stat-block">
                        <h3>Mặt hàng bán chạy nhất</h3>
                        <p id="bestSellingProduct">Không có dữ liệu</p>
                    </div>
                    <div class="stat-block">
                        <h3>Mặt hàng ế nhất</h3>
                        <p id="worstSellingProduct">Không có dữ liệu</p>
                    </div>
                </div>
                <!-- Bảng Top 5 khách hàng -->
                <div class="stats-container">
                    <div class="stat-block full-width">
                        <h2>5 khách hàng có mức mua hàng cao nhất</h2>
                        <div>
                            <div class="grid-header">
                                <span>Số thứ tự</span>
                                <span>Tên người dùng</span>
                                <span>Tổng tiền</span>
                                <span>Chi tiết đơn hàng</span>
                            </div>
                            <div class="grid-body" id="listCustomersBlock">

                            </div>
                            <div id="pagination" class="pagination"></div>
                        </div>
                    </div>
                </div>

                <!-- Block hiển thị top 5 khách hàng dựa trên số lượng -->
                <div class="stats-container">
                    <div class="chart-container">
                        <h3 class="thongKeHeader">Biểu đồ thống kê</h3>
                        <canvas id="myChart">
                            <!-- Biểu đồ sẽ được hiển thị ở đây -->
                        </canvas>
                    </div>
                </div>
            </div>
        </div>
        <!-- Tool Menu -->
        <div class="tool-menu" style="display: none;" id="tool-menu">
            <button type="button" class="menu-close" id="closeToolMenuButton">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
    


        <script src="../asset/js/function.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
        <script type="module" src="../asset/js/thongke.js"></script>
        <script src="../asset/js/admin.js"></script>
        <script type="module" src="../asset/js/apiAddress.js"></script>
</body>

</html>