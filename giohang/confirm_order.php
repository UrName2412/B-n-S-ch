<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();

if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    $username = $_SESSION['username'];
} elseif (isset($_COOKIE['username']) && isset($_COOKIE['pass'])) {
    $username = $_COOKIE['username'];
    $password = $_COOKIE['pass'];

    if (checkLogin($database, $username, $password)) {
        $_SESSION['username'] = $username;
    } else {
        echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../dangky/dangnhap.php';</script>";
        exit();
    }
} else {
    echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}
$user = getUserInfoByUsername($database, $username);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lấy thông tin người dùng từ session
    $tenNguoiNhan = 
    $user['tenNguoiDung'];
    $soDienThoai = 
    $user['soDienThoai'];
    $tinhThanh = 
    $user['tinhThanh'];
    $quanHuyen = 
    $user['quanHuyen'];
    $xa = 
    $user['xa'];
    $duong = 
    $user['duong'];
    $tenNguoiDung = 
    $user['tenNguoiDung'];
    $ngayTao = date('Y-m-d H:i:s');
    $ghiChu = '';
    $tinhTrang = 'Chưa xác nhận';


    $cart = json_decode($_POST['cart'], true);


    $tongTien = 0;
    foreach ($cart as $item) {
        $giaBan = (int) preg_replace('/[^\d]/', '', $item['productPrice']);
        $tongTien += $giaBan * $item['quantity'];  
    }

    $sql = "INSERT INTO b01_donhang (tenNguoiNhan, soDienThoai, ngayTao, tinhThanh, quanHuyen, xa, duong, tongTien, tinhTrang, ghiChu, tenNguoiDung)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $database->prepare($sql);
    $stmt->bind_param("sssssssssss", $tenNguoiNhan, $soDienThoai, $ngayTao, $tinhThanh, $quanHuyen, $xa, $duong, $tongTien, $tinhTrang, $ghiChu, $tenNguoiDung);

    if ($stmt->execute()) {
        $maDon = $stmt->insert_id; 

        $sql_ct = "INSERT INTO b01_chitiethoadon (maSach, maDon, giaBan, soLuong) VALUES (?, ?, ?, ?)";
        $stmt_ct = $database->prepare($sql_ct);

        foreach ($cart as $item) {
            $maSach = $item['productId'];  
            $giaBan = (int) preg_replace('/[^\d]/', '', $item['productPrice']); 
            $soLuong = $item['quantity']; 
            
            $stmt_ct->bind_param("iidi", $maSach, $maDon, $giaBan, $soLuong);
            
            if (!$stmt_ct->execute()) {
                echo "Lỗi khi thêm chi tiết hóa đơn: " . $stmt_ct->error;
            }
        }

        // Lưu mã đơn vào session
        $_SESSION['maDon'] = $maDon;

        // Chuyển hướng đến trang hoaDon.php
        header("Location: hoaDon.php?maDon=$maDon");
        exit; // Đảm bảo không có mã PHP nào được thực thi sau khi chuyển hướng

    } else {
        // Nếu có lỗi khi thêm vào bảng b01_donhang
        echo "Lỗi khi thêm đơn hàng: " . $stmt->error;
    }
}

// Lấy dữ liệu từ URL (nếu có)
$name = isset($_GET['name']) ? $_GET['name'] : '';
$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
$address = isset($_GET['address']) ? $_GET['address'] : '';
$note = isset($_GET['note']) ? $_GET['note'] : '';
$paymentMethod = isset($_GET['method']) ? $_GET['method'] : '';
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận đơn hàng</title>
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="../asset/css/sanpham.css">
    <link rel="stylesheet" href="../asset/css/confirm_order.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3" id="top">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="../nguoidung/indexuser.php" class="d-flex align-items-center">
                        <img src="../Images/LogoSach.png" alt="logo" width="100" height="57">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="../nguoidung/indexuser.php" class="nav-link fw-bold text-white">TRANG CHỦ</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/gioithieu_user.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../nguoidung/sanpham-user.php" class="nav-link fw-bold" style="color: yellow;">SẢN PHẨM</a>
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
                            <div class="d-flex gap-2">
                                <a href="../nguoidung/user.php" class="mt-2">
                                    <i class="fas fa-user" id="avatar" style="color: black;"></i>
                                </a>
                                <span class="mt-1" id="profile-name" style="top: 20px; padding: 2px;">
                                <?php echo $user['tenNguoiDung']; ?>
                                </span>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="../nguoidung/user.php">Thông tin tài khoản</a></li>
                                        <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item">Đăng xuất</a></li>
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


    <div class="confirm-order-page">
        <div class="container">
            <h2 class="confirm-title">Xác nhận đơn hàng</h2>

            <!-- Thông tin người nhận -->
            <div id="thongTinNguoiNhan">
                <p><strong>Người nhận:</strong> <?php echo 
                $user['tenNguoiDung']; ?></p>
                <p><strong>Địa chỉ:</strong> 
                    <?php echo 
                    $user['duong'] . ', ' . 
                    $user['xa'] . ', ' . 
                    $user['quanHuyen'] . ', ' . 
                    $user['tinhThanh']; ?>
                </p>
                <p><strong>Số điện thoại:</strong> <?php echo 
                $user['soDienThoai']; ?></p>
            </div>

            <!-- Hóa đơn được JS in ra -->
            <div id="hoaDon" style="margin-top: 30px;"></div>

            <!-- Nút gửi đơn hàng -->
            <form action="confirm_order.php" method="post">
        <input type="hidden" name="note" value="<?php echo htmlspecialchars($note); ?>">
        <input type="hidden" name="method" value="<?php echo htmlspecialchars($paymentMethod); ?>">
        <input type="hidden" name="cart" id="cartInput">
            <input type="submit" value="Xác nhận đặt hàng" class="btn btn-success" onclick="removeSessionCart()">
        </form>
        </div>
    </div>

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
                        <a href="index.php" class="d-flex align-items-center">
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
                        <li>Chi nhánh 2: 105 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh
                        </li>
                        <li>Chi nhánh 3: 4 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <a href="#top" id="backToTop">&#8593;</a>

    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" >
        <div class="modal-dialog modal-sm position-absolute" style="top: 10%; left: 10%;">
            <div class="modal-content bg-success text-white">
                <div class="modal-body text-center">
                    <p class="m-0">Đã thêm vào giỏ hàng!</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailLabel" >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productDetailLabel">Chi tiết sản phẩm</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="productDetailContent">
                        <!-- Nội dung sản phẩm sẽ được AJAX cập nhật tại đây -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../asset/js/confirm_order.js"></script>
    <script src="../asset/js/sanpham.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        document.getElementById('cartInput').value = JSON.stringify(cart);
    });
</script>
</body>
</html>