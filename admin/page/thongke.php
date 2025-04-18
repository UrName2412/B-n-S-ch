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

                <!-- Block hiển thị top 5 khách hàng dựa trên số lượng -->
                <div class="stats-container">
                    <div class="stat-block">
                        <h3>Top 5 khách hàng (số lượng mua)</h3>
                        <div id="topCustomersByQuantity">
                            <!-- Danh sách top 5 khách hàng sẽ được hiển thị ở đây -->
                        </div>
                    </div>
                    <!-- Biểu đồ -->
                    <div class="chart-container">
                        <h3 class="thongKeHeader">Biểu đồ thống kê</h3>
                        <canvas id="myChart">
                            <!-- Biểu đồ sẽ được hiển thị ở đây -->
                        </canvas>
                    </div>
                </div>
                <div class="split-layout">
                    <!--Danh sách sản phẩm -->
                    <div class="left-panel">
                        <h3>Danh sách sản phẩm</h3>
                        <div class="product-list">
                            <div class="grid-header-product">
                                <span>Mã Sách</span>
                                <span>Tên Sách</span>
                                <span>Số lượng bán</span>
                                <span>Tổng tiền</span>
                                <span>Hành động</span>
                            </div>
                            <div class="grid-body" id="dataProducts">
                                <!-- Dữ liệu sản phẩm sẽ được hiển thị ở đây -->
                            </div>
                        </div>
                    </div>

                    <!-- Danh sách người dùng -->
                    <div class="right-panel">
                        <h3>Danh sách người dùng</h3>
                        <div class="user-list" id="userList">
                            <!-- Dữ liệu người dùng sẽ được hiển thị ở đây -->
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <script src="../asset/js/function.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>    
        <script src="../asset/js/thongke.js"></script>
        <script src="../asset/js/admin.js"></script>
</body>

</html>