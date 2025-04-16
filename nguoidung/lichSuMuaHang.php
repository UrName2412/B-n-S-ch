<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();

// Kiểm tra nếu người dùng đã đăng nhập
if (isset($_SESSION['username']) && isset($_SESSION['role']) && $_SESSION['role'] == false) {
    $username = $_SESSION['username'];
} elseif (isset($_COOKIE['username']) && isset($_COOKIE['pass'])) {
    $username = $_COOKIE['username'];
    $password = $_COOKIE['pass'];

    // Kiểm tra đăng nhập qua cookie
    if (checkLogin($database, $username, $password)) {
        $_SESSION['username'] = $username;
    } else {
        echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../dangky/dangnhap.php';</script>";
        exit();
    }
} else {
    echo "<script>alert('Bạn cần đăng nhập để xem lịch sử mua hàng!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}

// Lấy thông tin người dùng từ cơ sở dữ liệu
$user = getUserInfoByUsername($database, $username);

// Lấy lịch sử mua hàng của người dùng từ cơ sở dữ liệu
$sql = "SELECT dh.*, ctdh.*, sp.tenSach, sp.hinhAnh
        FROM b01_donhang dh
        JOIN b01_chitiethoadon ctdh ON dh.maDon = ctdh.maDon
        JOIN b01_sanpham sp ON ctdh.maSach = sp.maSach
        WHERE dh.tenNguoiDung = ?";
$stmt = $database->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

// Kiểm tra xem có đơn hàng nào không
if ($result->num_rows > 0) {
    $orderHistory = "<h2>Lịch sử mua hàng của bạn</h2>";
$orderHistory .= "<table border='1' class='table'>
                    <tr>
                        <th>Ngày nhận hàng</th>
                        <th>Hình ảnh</th>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Tổng tiền</th>
                    </tr>";
while ($row = $result->fetch_assoc()) {
    $orderHistory .= "<tr>
                        <td>" . htmlspecialchars($row['ngayTao']) . "</td>
                        <td><img src='../Images/" . htmlspecialchars($row['hinhAnh']) . "' alt='Hình ảnh sách' style='width: 80px; height: auto; border-radius: 6px;'></td>
                        <td>" . htmlspecialchars($row['tenSach']) . "</td>
                        <td>" . htmlspecialchars($row['soLuong']) . "</td>
                        <td>" . number_format($row['giaBan']*1000, 0, ',', '.') . " VND</td>
                        <td>" . number_format($row['soLuong'] * $row['giaBan']*1000, 0, ',', '.') . " VND</td>
                      </tr>";
}
$orderHistory .= "</table>";
} else {
    $orderHistory = "<p>Không có đơn hàng nào trong lịch sử mua hàng của bạn.</p>";
}

$stmt->close();
$database->close();
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lịch sử mua hàng</title>
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="../asset/css/index-user.css">
    <link rel="stylesheet" href="../asset/css/user.css">
    <link rel="stylesheet" href="../asset/css/lichSuMuaHang.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="indexuser.php" class="d-flex align-items-center">
                        <img src="../Images/LogoSach.png" alt="logo" width="100" height="57">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="indexuser.php" class="nav-link fw-bold" style="color: white ;">TRANG CHỦ</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/sanpham-user.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto" method="GET" action="nguoidung/timkiem.php">
                        <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="../index.php" class="nav-link fw-bold text-white">ĐĂNG XUẤT</a>
                        </li>
                        <li class="nav-item">
                            <div>
                                <a href="user.php"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                                <span id="profile-name" style="top: 20px; padding: 2px; display: none;">Nguyễn Văn
                                    A</span>
                            </div>
                        </li>
                    </ul>
                    <a href="../giohang/giohangnguoidung.php" class="nav-link text-white">
                        <div class="cart-icon">
                            <i class="fas fa-shopping-basket"></i>
                            <span class="">0</span>
                        </div>
                    </a>
                </div>
            </nav>
        </div>
    </header>
    <!-- Main Content -->
    <main class="container my-4">
        <div class="main-profile row padding-0">
            <!-- Main profile -->
            <div class="list col-3">
                <ul class="list-unstyled">
                    <a href="user.php">
                        <li class="list-item">Hồ sơ</li>
                    </a>
                    <a href="lichSuMuaHang.php">
                        <li class="list-item" style="background-color: #DFE1E5;">Lịch sử mua hàng</li>
                    </a>
                </ul>
            </div>
            <div class="col-9">
                <!-- Hiển thị lịch sử mua hàng -->
                <?php echo $orderHistory; ?>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="text-white py-4">
        <div class="container">
            <div class="row pb-4 footer__bar">
                <div class="col-md-12 d-flex justify-content-between fw-bold align-items-center footer__connect">
                    <p>Thời gian mở cửa: <span>07h30 - 21h30 mỗi ngày</span></p>
                    <div class="d-flex">
                        <p>Kết nối với chúng tôi:</p>
                        <a href="https://www.facebook.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-facebook-square"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center footer__bar">
                <div class="col-md-4">
                    <div class="logo">
                        <a href="indexuser.php" class="d-flex align-items-center">
                            <img src="../Images/LogoSach.png" alt="logo" width="100" height="57">
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <p class="mb-1">Hotline: 1900 0000</p>
                        <p class="mb-1">Email: nhasach@gmail.com</p>
                        <p>&copy; 2024 Công ty TNHH Nhà sách</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <ul class="list list-unstyled">
                        <li class="list-item">
                            <a href="#" class="text-white">Tuyển dụng</a>
                        </li>
                        <li class="list-item">
                            <a href="#" class="text-white">Chính sách giao hàng</a>
                        </li>
                        <li class="list-item">
                            <a href="#" class="text-white">Điều khoản và điều kiện</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row footer__bar">
                <div class="col-md-12">
                    <ul class="list-unstyled">
                        <li>Chi nhánh 1: 273 An Dương Vương, Phường 3, Quận 5, TP. Hồ Chí Minh</li>
                        <li>Chi nhánh 2: 105 Xô Viết Nghệ Tĩnh, Phường 26, Quận Bình Thạnh, TP. Hồ Chí Minh</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</body>

</html>
