<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();

if (isset($_POST['thanhtoan'])) {
    $_SESSION['thanhtoan_token'] = bin2hex(random_bytes(32));
    header('Location: thanhtoan.php');
    exit;
}

if (isset($_GET['error']) && $_GET['error'] == 'empty_cart') {
    echo "<script>alert('Giỏ hàng trống, không thể đặt hàng!');</script>";
}

// Kiểm tra nếu người dùng đã đăng nhập
if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    $username = $_SESSION['username'];
} else {
    echo "<script>alert('Bạn cần đăng nhập để tiếp tục thanh toán!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}

$user = getUserInfoByUsername($database, $username);

if ($user['trangThai'] == false) {
    echo "<script>alert('Tài khoản của bạn đã bị khóa!'); window.location.href='../dangky/dangxuat.php';</script>";
    exit();
}

if (isset($_SESSION['user'])) {
    $ten_user = $_SESSION['user']['tenNguoiDung'] ?? '';
    $email_user = $_SESSION['user']['email'] ?? '';
    $sdt = $_SESSION['user']['soDienThoai'] ?? '';
    $diachi = ($_SESSION['user']['duong'] ?? '') . ', ' . ($_SESSION['user']['xa'] ?? '') . ', ' . ($_SESSION['user']['quanHuyen'] ?? '') . ', ' . ($_SESSION['user']['tinhThanh'] ?? '');
} else {
    $ten_user = '';
    $email_user = '';
    $sdt = '';
    $diachi = '';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawData = file_get_contents("php://input");
    $cart = json_decode($rawData, true);

    if (is_array($cart)) {
        $_SESSION['cart'] = $cart;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu giỏ hàng không hợp lệ']);
    }
    exit();
}

?>


<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giỏ hàng</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <!-- FONT AWESOME  -->
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS  -->
    <link rel="stylesheet" href="../asset/css/sanpham.css">
    <link rel="stylesheet" href="../asset/css/user-cart.css">
    <link rel="stylesheet" href="../asset/css/index-user.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="../nguoidung/indexuser.php" class="d-flex align-items-center">
                        <img src="../Images/LogoSach.png" alt="logo" style="width: 100px; height: 57px;">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                            <div class="d-flex gap-2">
                                <a href="../nguoidung/user.php" class="mt-2"><i class="fas fa-user" id="avatar"
                                        style="color: black;"></i></a>
                                <span class="mt-1" id="profile-name"
                                    style="top: 20px; padding: 2px;"><?php echo $user['tenNguoiDung']; ?></span>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul class="dropdown-menu">
                                        <li class="dropdownList"><a class="dropdown-item" href="../nguoidung/user.php">Thông tin tài khoản</a></li>
                                        <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item"  onclick="removeSessionCart()">Đăng xuất</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a href="giohangnguoidung.php" class="nav-link text-white">
                        <div class="cart-icon">
                            <i class="fas fa-shopping-basket" style="color: yellow;"></i>
                            <span class="">0</span>
                        </div>
                    </a>
                </div>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <div class="product_container m-5">
        <div class="row">
            <div class="col-12" id="cart-items">
                <!--Danh sách sản phẩm-->
                <?php
                if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
                    echo '
                        <style>
                            #cart-items { display: none; }
                            #empty-cart-message { display: flex; }
                        </style>
                    ';
                } else {
                    $tongCong = 0;
                    foreach ($_SESSION['cart'] as $item) {
                        $tong = $item['giaBan'] * $item['soLuong'];
                        $tongCong += $tong;
                        echo '
                            <div class="card mb-3 shadow-sm">
                                <div class="row g-0">
                                    <div class="col-md-2">
                                        <img src="' . $item['hinhAnh'] . '" class="img-fluid rounded-start" alt="' . $item['tenSach'] . '">
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 class="card-title">' . $item['tenSach'] . '</h5>
                                                <p class="card-text mb-1">Giá: <strong>' . number_format($item['giaBan'], 0, ',', '.') . 'đ</strong></p>
                                                <p class="card-text">Số lượng: <strong>' . $item['soLuong'] . '</strong></p>
                                            </div>
                                            <div>
                                                <p class="text-end fw-bold text-danger">' . number_format($tong, 0, ',', '.') . 'đ</p>
                                                <form method="post" action="xoagiohang.php" onsubmit="return confirm(\'Xóa sản phẩm này khỏi giỏ hàng?\')">
                                                    <input type="hidden" name="maSach" value="' . $item['maSach'] . '">
                                                    <button type="submit" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>';
                    }

                    echo '<script>
                        document.addEventListener("DOMContentLoaded", function() {
                            document.querySelector(".cart-total .text-danger.h5").innerText = "' . number_format($tongCong, 0, ',', '.') . 'đ";
                        });
                    </script>';
                }
                ?>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <!-- Section for Total and Checkout -->
            <section class="cart-total mt-4">
                <div class="w-100">
                    <!-- Phần hiển thị tổng giá -->
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center fw-bold">
                        <span>Tổng cộng:</span>
                        <span class="text-danger h5 mb-0">đ</span>
                    </div>
                    <!-- Phần 2 nút hành động -->
                    <div class="d-flex flex-column flex-md-row justify-content-end mt-3">
                        <a href="../sanpham/sanpham-user.php" class="btn btn-secondary mb-2 mb-md-0 me-md-2">
                            <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
                        </a>
                        <form method="POST">
                        <button id="thanhtoan" class="btn btn-success" onclick="return checkCart(event)" name="thanhtoan">Thanh toán</button>   
                        </form>
                    </div>
                </div>
            </section>

        </div>



        <!--emptyc-cart-->
        <div id="empty-cart-message" class="cart_container align-items-center mt-4 mx-5"
            style="min-height: 100vh; display: none;">
            <div class="row">
                <div class="col-12">
                    <h1 style="width: 100%; margin-left: 10px;">Giỏ hàng</h1>
                    <div class="noproduct d-flex flex-column align-items-center mt-4">
                        <i class="fas fa-box-open"></i>
                        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                        <button class="btn"><a href="../sanpham/sanpham-user.php">Chọn sản phẩm ngay</a></button>
                    </div>
                </div>
            </div>
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
                        <a href="#" class="text-white ms-3">
                            <i class="fab fa-facebook-square"></i>
                        </a>
                        <a href="#" class="text-white ms-3">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center footer__bar">
                <div class="col-md-4">
                    <div class="logo">
                        <a href="../index.php" class="d-flex align-items-center">
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
    <!--Modal-->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Xác nhận xóa</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteButton">Xóa</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="empty" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Giỏ hàng trống</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Giỏ hàng của bạn hiện đang trống
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"
                        onclick="window.location.href = '../sanpham/sanpham-user.php'">Mua sắm ngay</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/user-cart.js"></script>

    <script>
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const inputValue = document.getElementById('timkiem').value.trim();

            if (inputValue) {
                window.location.href = '../nguoidung/timkiem.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });
    </script>

</body>

</html>