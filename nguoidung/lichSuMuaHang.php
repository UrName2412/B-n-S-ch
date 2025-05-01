<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();

// Kiểm tra nếu người dùng đã đăng nhập
if (isset($_SESSION['username']) && isset($_SESSION['role']) && $_SESSION['role'] == false) {
    $username = $_SESSION['username'];
} else {
    echo "<script>alert('Bạn cần đăng nhập để xem lịch sử mua hàng!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}

$user = getUserInfoByUsername($database, $username);

if ($user['trangThai'] == false) {
    echo "<script>alert('Tài khoản của bạn đã bị khóa!'); window.location.href='../dangky/dangxuat.php';</script>";
    exit();
}

$sql = "SELECT dh.maDon, dh.ngayTao, dh.tongTien, dh.tinhTrang, sp.tenSach, sp.hinhAnh, ctdh.soLuong, ctdh.giaBan
        FROM b01_donhang dh
        JOIN b01_chitiethoadon ctdh ON dh.maDon = ctdh.maDon
        JOIN b01_sanpham sp ON ctdh.maSach = sp.maSach
        WHERE dh.tenNguoiDung = ?
        ORDER BY dh.maDon DESC";
$stmt = $database->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $orderHistory = "<h2>Lịch sử mua hàng của bạn</h2>";

    $orders = [];

    while ($row = $result->fetch_assoc()) {
        $maDon = $row['maDon'];

        if (!isset($orders[$maDon])) {
            $orders[$maDon] = [
                'maDon' => $maDon,
                'ngayTao' => $row['ngayTao'],
                'tongTien' => $row['tongTien'],
                'tinhTrang' => $row['tinhTrang'],
                'products' => []
            ];
        }

        $orders[$maDon]['products'][] = [
            'tenSach' => $row['tenSach'],
            'hinhAnh' => $row['hinhAnh'],
            'soLuong' => $row['soLuong'],
            'giaBan' => $row['giaBan']
        ];
    }

    foreach ($orders as $order) {
        $orderHistory .= "<h3>Mã đơn hàng: " . htmlspecialchars($order['maDon']) . "</h3>";
        $orderHistory .= "<p>Ngày tạo đơn: " . htmlspecialchars($order['ngayTao']) . "</p>";
        $orderHistory .= "<p>Tình trạng đơn hàng: " . htmlspecialchars($order['tinhTrang']) . "</p>";
        $orderHistory .= "<table border='1' class='table'>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên sách</th>
                                <th>Số lượng</th>
                                <th>Giá bán</th>
                                <th>Tổng tiền</th>
                            </tr>";

        foreach ($order['products'] as $product) {
            $orderHistory .= "<tr>
                                <td><img src='../Images/" . htmlspecialchars($product['hinhAnh']) . "' alt='Hình ảnh sách' style='width: 80px; height: auto; border-radius: 6px;'></td>
                                <td>" . htmlspecialchars($product['tenSach']) . "</td>
                                <td>" . htmlspecialchars($product['soLuong']) . "</td>
                                <td>" . number_format($product['giaBan'] , 0, ',', '.') . " VND</td>
                                <td>" . number_format($product['soLuong'] * $product['giaBan'] , 0, ',', '.') . " VND</td>
                              </tr>";
        }

        $orderHistory .= "</table>";
        $orderHistory .= "<p>Tổng tiền: " . number_format($order['tongTien'] , 0, ',', '.') . " VND</p>";
    }
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
    <style>
        .order-history-wrapper {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    font-size: 16px;
}

.order-history-wrapper h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
}

.order-history-wrapper h3 {
    margin-top: 30px;
    color: #1a73e8;
}

.order-history-wrapper table.table {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
    font-size: 15px;
}

.order-history-wrapper table.table th,
.order-history-wrapper table.table td {
    text-align: center;
    padding: 12px 8px;
    border: 1px solid #ccc;
}

.order-history-wrapper table.table th {
    background-color: #f1f1f1;
    color: #333;
}

.order-history-wrapper img {
    max-width: 80px;
    height: auto;
    border-radius: 6px;
}

.order-history-wrapper p {
    margin-top: 10px;
    font-weight: 500;
    color: #333;
}
    </style>

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
                            <a href="../sanpham/gioithieu_user.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/sanpham-user.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto" method="GET" action="timkiem.php">
                        <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <div class="d-flex gap-2">
                                <a href="../nguoidung/user.php" class="mt-2"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                                <span class="mt-1" id="profile-name" style="top: 20px; padding: 2px;"><?php echo $user['tenNguoiDung']; ?></span>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul class="dropdown-menu">
                                        <li class="dropdownList"><a class="dropdown-item" href="../nguoidung/user.php">Thông tin tài khoản</a></li>
                                        <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item"  onclick="removeSessionCart()">Đăng xuất</a></li>
                                    </ul>
                                </div>
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
            <div class="order-history-wrapper">
                <!-- Hiển thị lịch sử mua hàng -->
                <?php echo $orderHistory; ?>
                </div>
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
                        <li>Chi nhánh 2: 105 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</li>
                        <li>Chi nhánh 3: 4 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <script src="../vender/js/bootstrap.bundle.min.js"></script>
</body>

</html>