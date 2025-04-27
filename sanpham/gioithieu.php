<?php
include '../admin/config/config.php';

session_start();

if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    header("Location: ../nguoidung/indexuser.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giới thiệu</title>
    <meta name="description" content="Cửa hàng sách Vương Hạo cung cấp toàn quốc.">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="../asset/css/index-user.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3" id="top">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="index.php" class="d-flex align-items-center">
                        <img src="../Images/LogoSach.png" alt="logo" width="100" height="57" loading="lazy">
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
                            <a href="#" class="nav-link fw-bold" style="color: yellow;">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="sanpham.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto" method="GET" action="../nguoidung/timkiem-nologin.php">
                        <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="../dangky/dangnhap.php" class="nav-link fw-bold text-white">ĐĂNG NHẬP</a>
                        </li>
                        <li class="nav-item">
                            <a href="../dangky/dangky.php" class="nav-link fw-bold text-white">ĐĂNG KÝ</a>
                        </li>
                    </ul>
                    <a href="giohang/giohang.php" class="nav-link text-white">
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
    <div class="container my-5">
    <h1 class="text-center mb-4 text-uppercase fw-bold">Giới Thiệu Về Cửa Hàng Sách Vương Hạo</h1>
    <div class="row">
        <div class="col-12">
            <p class="fs-5">Cửa hàng sách <strong>Vương Hạo</strong> được thành lập với sứ mệnh truyền cảm hứng đọc sách, lan tỏa tri thức và kết nối cộng đồng yêu sách trên toàn quốc. Với phương châm <em>"Tri thức cho hôm nay - Hành trang cho ngày mai"</em>, chúng tôi không ngừng đổi mới để mang đến cho bạn đọc những cuốn sách chất lượng và trải nghiệm mua sắm tuyệt vời nhất.</p>
            <ul class="fs-5">
                <li>📚 Hơn 100 đầu sách đa dạng: văn học, kinh tế, kỹ năng sống, thiếu nhi, ngoại ngữ, và nhiều thể loại khác.</li>
                <li>🚚 Giao hàng toàn quốc nhanh chóng, an toàn và tiện lợi.</li>
                <li>📍 Hệ thống chi nhánh phủ khắp TP. Hồ Chí Minh, dễ dàng tiếp cận.</li>
            </ul>
        </div>
    </div>

    <hr class="my-5">

    <div class="text-center">
        <h2 class="mb-3">Tại sao nên chọn chúng tôi?</h2>
        <div class="row">
            <div class="col-md-4">
                <i class="fas fa-book fa-3x text-primary mb-2"></i>
                <h5>Sách Chính Hãng</h5>
                <p>Cam kết 100% sách thật, chất lượng cao từ các nhà xuất bản uy tín.</p>
            </div>
            <div class="col-md-4">
                <i class="fas fa-user-friends fa-3x text-success mb-2"></i>
                <h5>Hỗ Trợ Tận Tình</h5>
                <p>Đội ngũ nhân viên thân thiện, nhiệt tình luôn sẵn sàng hỗ trợ bạn.</p>
            </div>
            <div class="col-md-4">
                <i class="fas fa-star fa-3x text-warning mb-2"></i>
                <h5>Trải Nghiệm Tuyệt Vời</h5>
                <p>Giao diện website dễ sử dụng, tối ưu cho cả máy tính và điện thoại.</p>
            </div>
        </div>
    </div>

    <hr class="my-5">

    <div class="text-center">
        <h2 class="mb-3">Cùng Khám Phá Thế Giới Tri Thức</h2>
        <p class="fs-5">Dù bạn là người yêu tiểu thuyết, đam mê kinh doanh hay đang tìm sách học cho con, <strong>nhà sách Vương Hạo</strong> luôn có điều tuyệt vời dành cho bạn. Hãy cùng chúng tôi vun đắp văn hóa đọc cho cộng đồng Việt!</p>
        <a href="sanpham.php" class="btn btn-dark mt-3">Khám phá ngay</a>
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

    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>

    <script>
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const inputValue = document.getElementById('timkiem').value.trim();

            if (inputValue) {
                window.location.href = '/B-n-S-ch/nguoidung/timkiem-nologin.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });
    </script>
</body>

</html>