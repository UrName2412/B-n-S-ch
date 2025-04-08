<?php
session_start();

if (!isset($_SESSION['username'])) {
    echo "<script>alert('Bạn cần đăng nhập để xem giỏ hàng!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}


// Lấy thông tin người dùng từ session
$ten_user = $_SESSION['user']['tenNguoiDung']; 
$email_user = $_SESSION['user']['email'];
$sdt = $_SESSION['user']['soDienThoai'];

// Gộp địa chỉ 
$diachi = $_SESSION['user']['duong'] . ', ' . 
          $_SESSION['user']['xa'] . ', ' . 
          $_SESSION['user']['quanHuyen'] . ', ' . 
          $_SESSION['user']['tinhThanh'];

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
                            <a href="#" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/sanpham-user.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto">
                        <input class="form-control me-2" type="text" id="timkiem" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <script>
                        document.getElementById('searchForm').addEventListener('submit', function (event) {
                            event.preventDefault();
                            const inputValue = document.getElementById('timkiem').value.trim();

                            if (inputValue) {
                                window.location.href = '../nguoidung/timkiem.php';
                            } else {
                                alert('Vui lòng nhập nội dung tìm kiếm!');
                            }
                        });
                    </script>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="../index.php" class="nav-link fw-bold text-white">ĐĂNG XUẤT</a>
                        </li>
                        <li class="nav-item">
                            <div>
                                <a href="../nguoidung/user.php"><i class="fas fa-user" id="avatar"
                                        style="color: black;"></i></a>
                                <span id="profile-name" style="top: 20px; padding: 2px;">
                                    <?php echo $ten_user; ?>
                                </span>
                            </div>
                        </li>
                    </ul>
                    <a href="/giohang/giohangnguoidung.php" class="nav-link text-white">
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
    echo "<script>document.getElementById('cart-items').style.display = 'none'; document.getElementById('empty-cart-message').style.display = 'flex';</script>";
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
        document.querySelector(".cart-total .text-danger.h5").innerText = "' . number_format($tongCong, 0, ',', '.') . 'đ";
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
                        <button id="thanhtoan" class="btn btn-success" onclick="checkCart()">Thanh toán</button>
                    </div>
                </div>
            </section>

        </div>

        <!-- Section for Address -->
        <section class="cart-address mt-4">
    <h4 class="fw-bold">Chọn địa chỉ giao hàng</h4>
    <!-- Chọn địa chỉ đã lưu -->
    <div>
        <label for="address_select">Chọn địa chỉ có sẵn:</label>
        <select name="address_select" id="address_select" class="form-control">
            <option value="">-- Chọn địa chỉ --</option>
            <?php
            if (isset($_SESSION['user'])) {
                $user = $_SESSION['user'];
                // Gộp địa chỉ từ các trường
                $full_address = $user['duong'] . ', ' . $user['xa'] . ', ' . $user['quanHuyen'] . ', ' . $user['tinhThanh'];
                echo "<option value='" . htmlspecialchars($full_address) . "' selected>" . htmlspecialchars($full_address) . "</option>";
            } else {
                echo "<option disabled>Không tìm thấy địa chỉ người dùng</option>";
            }
            ?>
        </select>
    </div>

    <!-- Nhập địa chỉ mới -->
    <div class="mt-3">
        <label for="new_address">Hoặc nhập địa chỉ mới:</label>
        <textarea name="new_address" id="new_address" class="form-control" placeholder="Nhập địa chỉ mới" rows="3"></textarea>
    </div>
</section>

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
</body>

</html>