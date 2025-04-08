<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();

if (isset($_SESSION['username'])) {
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
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <!-- FONT AWESOME  -->
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS  -->
    <link rel="stylesheet" href="../asset/css/index-user.css">
    <link rel="stylesheet" href="../asset/css/user.css">
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
                    <form id="searchForm" class="d-flex me-auto">
                        <input class="form-control me-2" type="text" id="timkiem" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <script>
                        document.getElementById('searchForm').addEventListener('submit', function(event) {
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
                            <div class="d-flex gap-2">
                                <a href="user.php" class="mt-2"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                                <span class="mt-1" id="profile-name" style="top: 20px; padding: 2px;"><?php echo $user['tenNguoiDung']; ?></span>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul class="dropdown-menu">
                                        <li class="dropdownList"><a class="dropdown-item" href="user.php">Thông tin tài khoản</a></li>
                                        <?php if (isset($_SESSION['username'])): ?>
                                            <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item">Đăng xuất</a></li>
                                        <?php endif; ?>
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
    <!-- Main -->
    <main class="container my-4">
        <div class="main-profile row padding-0">
            <!-- Main profile -->
            <div class="list col-3">
                <ul class="list-unstyled">
                    <a href="user.php">
                        <li class="list-item" style="background-color: #DFE1E5;">Hồ sơ</li>
                    </a>
                    <a href="lichSuMuaHang.php">
                        <li class="list-item">Lịch sử mua hàng</li>
                    </a>
                </ul>
            </div>
            <div class="Info col-9">
                <div class="blueblock"></div>
                <div class="Information">
                    <div class="navbar-brand profile-pic">
                        <img src="../Images/nguoi_dung.jpg" alt="Ảnh 1" class="avatar">
                    </div>
                    <div class="action-buttons">
                        <button class="edit-btn" id="infoUpdate" onclick="toggleEditForm()">Cập Nhật Thông Tin</button>
                    </div>
                    <div class="profile-info">
                        <p class="d-flex flex-column"><Strong>HỌ VÀ TÊN</Strong> <span id="customer-name">Nguyễn Văn A</span></p>
                        <p class="d-flex flex-column"><strong>NGÀY SINH</strong> <span id="customer-sinhnhat">11/11/2001</span></p>
                        <p class="d-flex flex-column"><strong>EMAIL</strong> <span id="customer-email">nguyenvana@example.com</span></p>
                        <p class="d-flex flex-column"><strong>SỐ ĐIỆN THOẠI</strong> <span id="customer-phone">+84 912 345 678</span></p>
                        <p class="d-flex flex-column"><strong>ĐỊA CHỈ</strong> <span id="customer-address">123 lê Lợi, Quận 1, TP Hồ Chí
                                Minh</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <script>
            function toggleEditForm() {
                const form = document.getElementById('edit-form');
                const overlay = document.querySelector('.overlay');

                // Toggle classes
                form.classList.toggle('show');
                overlay.classList.toggle('show');
            }

            function updateInfo() {
                const name = document.getElementById('name').value;
                const day = document.getElementById('ngay').value;
                const month = document.getElementById('thang').value;
                const year = document.getElementById('nam').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const address = document.getElementById('address').value;
                const notification = document.getElementById('notification');

                if (month == 2) {
                    if (day > 29) {
                        notification.innerHTML = '<div class="alert alert-danger">Ngày tháng không hợp lệ</div>';
                        return;
                    }
                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    if (day > 30) {
                        notification.innerHTML = '<div class="alert alert-danger">Ngày tháng không hợp lệ</div>';
                        return;
                    }
                }
                const sinhnhat = `${day}/${month}/${year}`;

                document.getElementById('customer-name').textContent = name;
                document.getElementById('profile-name').textContent = name;
                document.getElementById('customer-sinhnhat').textContent = sinhnhat;
                document.getElementById('customer-email').textContent = email;
                document.getElementById('customer-phone').textContent = phone;
                document.getElementById('customer-address').textContent = address;

                toggleEditForm();
            }
        </script>
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
    <div class="overlay"></div>
    <form id="edit-form">
        <h2>Cập Nhật Thông Tin</h2>
        <div class="d-flex">
            <label for="name">Họ Tên:</label>
            <input type="text" id="name" placeholder="Nhập họ tên" value="Nguyễn Văn A">
        </div>

        <div id="sinhnhat">
            <label for="sinhnhat">Ngày sinh:</label>
            <div>
                <label for="ngay">Ngày</label>
                <select name="day" id="ngay">
                    <option value="11">Chọn ngày</option>
                    <script>
                        for (let i = 1; i <= 31; i++) {
                            document.write(`<option value="${i}">${i}</option>`);
                        }
                    </script>
                </select>
            </div>
            <div>
                <label for="thang">Tháng</label>
                <select name="month" id="thang">
                    <option value="11">Chọn tháng</option>
                    <script>
                        for (let i = 1; i <= 12; i++) {
                            document.write(`<option value="${i}">Tháng ${i}</option>`);
                        }
                    </script>
                </select>
            </div>
            <div>
                <label for="nam">Năm</label>
                <select name="year" id="nam">
                    <option value="2001">Chọn năm</option>
                    <script>
                        const currentYear = new Date().getFullYear();
                        for (let i = currentYear; i >= 1900; i--) {
                            document.write(`<option value="${i}">${i}</option>`);
                        }
                    </script>
                </select>
            </div>
        </div>
        <span id="notification"></span>
        <div class="d-flex">
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Nhập email" value="nguyenvana@example.com">
        </div>
        <div class="d-flex">
            <label for="phone">Số Điện Thoại:</label>
            <input type="text" id="phone" placeholder="Nhập số điện thoại" value="+84 912 345 678">
        </div>
        <div class="d-flex">
            <label for="address">Địa Chỉ:</label>
            <input type="text" id="address" placeholder="Nhập địa chỉ" value="123 lê Lợi, Quận 1, TP Hồ Chí Minh">
        </div>

        <button type="button" class="edit-btn" onclick="updateInfo()">Lưu</button>
        <button type="button" class="cancel-btn" onclick="toggleEditForm()">Hủy</button>
    </form>

    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/user.js"></script>
</body>

</html>