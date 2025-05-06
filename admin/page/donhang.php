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
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <title>Đơn hàng</title>
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
                    <a href="thongke.php">
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
                    <button type="button" class="clearFilter" id="clearButton">Bỏ lọc</button>
                    <button type="button" class="acceptFilter" id="acceptFilter">Lọc</button>
                </div>
            </div>

            <!-- Tool Section -->
            <div class="tool">
                <button type="button" class="filterBtnTool" id="filterBtnCart">
                    <i class="fas fa-filter"></i>
                </button>
                <div class="search">
                    <select name="cartFilter" id="cartFilter">
                        <option value="Tất cả đơn hàng" selected>Tất cả đơn hàng</option>
                        <option value="Chưa xác nhận">Chưa xác nhận</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                    <input type="text" name="search" placeholder="Tìm kiếm mã đơn..." id="searchInput">
                    <button type="button" id="searchButton">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Tool Menu -->
        <div class="tool-menu" style="display: none;" id="tool-menu">
            <button type="button" class="menu-close" id="closeToolMenuButton">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <!--End of Content-Tool-->
    </div>

    <script src="../asset/js/function.js"></script>
    <script src="../asset/js/validator.js"></script>
    <script type="module" src="../asset/js/inputDataCart.js"></script>
    <script src="../asset/js/admin.js"></script>
    <script type="module" src="../asset/js/apiAddress.js"></script>
    <?php
    if (isset($_SESSION["thongBaoSua"])) {
        echo "<script>createAlert('" . $_SESSION["thongBaoSua"] . "');</script>";
        unset($_SESSION["thongBaoSua"]);
    }
    ?>
</body>

</html>