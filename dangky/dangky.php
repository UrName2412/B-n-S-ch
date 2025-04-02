
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cửa hàng sách</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <!-- FONT AWESOME  -->
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS  -->
    <link rel="stylesheet" href="../asset/css/dangky.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="../index.php" class="d-flex align-items-center">
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
                            <a href="../index.php" class="nav-link fw-bold text-white">TRANG CHỦ</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/sanpham.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
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
                                window.location.href = '../nguoidung/timkiem-nologin.php';
                            } else {
                                alert('Vui lòng nhập nội dung tìm kiếm!');
                            }
                        });
                    </script>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="dangnhap.php" class="nav-link fw-bold text-white">ĐĂNG NHẬP</a>
                        </li>
                        <li class="nav-item">
                            <a href="dangky.php" class="nav-link fw-bold" style="color: yellow;">ĐĂNG KÝ</a>
                        </li>
                    </ul>
                    <a href="../giohang/giohang.php" class="nav-link text-white">
                        <div class="cart-icon">
                            <i class="fas fa-shopping-basket"></i>
                        </div>
                    </a>
                </div>
            </nav>
        </div>
    </header>

    <!-- Main -->
    <main class="text-dark">
        <div class="container my-4">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="container p-4 border rounded" style="background-color: #f8f9fa;">
                        <div class="text-center mb-4">
                            <h4 class="fw-bold">ĐĂNG KÝ</h4>
                        </div>
                        <form action="xulydangky.php" method="POST" name="signupform" id="signupform">
    <div class="mb-3">
        <label class="form-label" for="username">Tên đăng nhập <span style="color: red;">*</span></label>
        <input class="form-control" type="text" name="tenNguoiDung" id="username" placeholder="Nhập tên đăng nhập" autocomplete="off" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="phone">Số điện thoại <span style="color: red;">*</span></label>
        <input class="form-control" type="text" name="soDienThoai" id="phone" placeholder="Nhập số điện thoại" autocomplete="off" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="email">Email <span style="color: red;">*</span></label>
        <input class="form-control" type="email" name="email" id="email" placeholder="Nhập email" autocomplete="off" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="province">Tỉnh/Thành phố <span style="color: red;">*</span></label>
        <input class="form-control" type="text" name="tinhThanh" id="province" placeholder="Nhập tỉnh/thành phố" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="district">Quận/Huyện <span style="color: red;">*</span></label>
        <input class="form-control" type="text" name="quanHuyen" id="district" placeholder="Nhập quận/huyện" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="ward">Xã/Phường <span style="color: red;">*</span></label>
        <input class="form-control" type="text" name="xa" id="ward" placeholder="Nhập xã/phường" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="address">Địa chỉ nhà <span style="color: red;">*</span></label>
        <input class="form-control" type="text" name="duong" id="address" placeholder="Nhập số nhà và tên đường" autocomplete="off" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="pass">Mật khẩu <span style="color: red;">*</span></label>
        <input class="form-control" type="password" name="matKhau" id="pass" placeholder="Nhập mật khẩu" autocomplete="off" required>
    </div>
    <div class="mb-3">
        <label class="form-label" for="pass_confirm">Xác nhận mật khẩu <span style="color: red;">*</span></label>
        <input class="form-control" type="password" name="pass_confirm" id="pass_confirm" placeholder="Xác nhận mật khẩu" autocomplete="off" required>
    </div>
    <div class="mb-3">
        <input type="checkbox" class="form-check-input" id="terms" name="terms" required>
        <label class="form-check-label" for="terms">Tôi đồng ý với <a href="#"> điều khoản và chính sách</a> của nhà sách.</label>
    </div>
    <input type="submit" class="btn btn-primary btn-block mt-4" name="reg-submit" value="Đăng ký"></input>
</form>

                        <div class="mt-3 text-center">
                            <p>Bạn đã có tài khoản? <a href="dangnhap.php">Đăng nhập ngay</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">Thành công</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Bạn đã đăng ký tài khoản thành công!</p>
                </div>
                <div class="modal-footer">
                    <a href="dangnhap.php" class="btn btn-success">Đến trang đăng nhập</a>
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
                        <a href="https://www.facebook.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-facebook-square"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/dangky.js"></script>
    
</body>

</html>
