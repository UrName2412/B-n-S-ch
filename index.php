<?php
include 'admin/config/config.php';
session_start();

if ((isset($_SESSION['username']) || isset($_COOKIE['username'])) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    header("Location: nguoidung/indexuser.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cửa hàng sách Vương Hạo</title>
    <meta name="description" content="Cửa hàng sách Vương Hạo cung cấp toàn quốc.">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="vender/css/bootstrap.min.css">
    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="asset/css/index-user.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3" id="top">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="index.php" class="d-flex align-items-center">
                        <img src="Images/LogoSach.png" alt="logo" width="100" height="57" loading="lazy">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="index.php" class="nav-link fw-bold" style="color: yellow;">TRANG CHỦ</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="sanpham/sanpham.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto" method="GET" action="nguoidung/timkiem-nologin.php">
                        <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <script>
                        document.getElementById('searchForm').addEventListener('submit', function (event) {
                            event.preventDefault();
                            const inputValue = document.getElementById('timkiem').value.trim();

                            if (inputValue) {
                                window.location.href = 'nguoidung/timkiem-nologin.php';
                            } else {
                                alert('Vui lòng nhập nội dung tìm kiếm!');
                            }
                        });
                    </script>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="dangky/dangnhap.php" class="nav-link fw-bold text-white">ĐĂNG NHẬP</a>
                        </li>
                        <li class="nav-item">
                            <a href="dangky/dangky.php" class="nav-link fw-bold text-white">ĐĂNG KÝ</a>
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

    <!-- Banner Section -->
    <div class="container my-4">
        <div class="slider">
            <div class="slide">
                <h3 class="pt-2" style="text-align: center;"><strong>Sách Mới</strong></h3>
                <div class="f-grid">
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/tuduynguoc.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/stopoverthinking.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/tuduymo.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                </div>
            </div>
            <div class="slide">
                <h3 class="pt-2" style="text-align: center;"><strong>Sách Nên Đọc</strong></h3>
                <div class="f-grid">
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/conduongchangmayaidi.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/saochungtalaingu.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/muonkiepnhansinh.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                </div>
            </div>
            <div class="slide">
                <h3 class="pt-2" style="text-align: center;"><strong>Sách Hot</strong></h3>
                <div class="f-grid">
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/cuoccachmangglucose.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/100kinangsinhton.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                    <div class="f-grid-col">
                        <a href="sanpham/chitietsanpham.php">
                            <img src="Images/ghichepphapy.jpg" alt="Ảnh 1" class=".f-grid-col">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <script>
            let slideIndex = 1;
            showSlides();

            function showSlides() {
                let slides = document.getElementsByClassName("slide");
                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                if (slideIndex > slides.length) {
                    slideIndex = 1
                }
                slides[slideIndex - 1].style.display = "block";
                slideIndex++;
                setTimeout(showSlides, 3000);
            }
        </script>
    </div>

    <!-- Product Section with Pagination -->
    <div class="container my-4">
        <div class="row mt-4">
            <!-- Sidebar -->
            <aside class="col-lg-3">
                <div class="rounded text-dark p-4" style="border: 1px solid black;">
                    <h5 class="fw-bold text-center">TÌM KIẾM</h5>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <input type="text" class="form-control" id="tensach" placeholder="Tên sách">
                        </li>
                        <li class="list-group-item">
                            <input type="text" class="form-control" id="tentacgia" placeholder="Tên tác giả">
                        </li>
                        <li class="list-group-item">
                            <!-- Danh sách nhà xuất bản -->
                            <select class="form-select" id="nxb">
                                <option value="">-- Chọn nhà xuất bản --</option>
                                <?php
                                $sql = "SELECT * FROM b01_nhaXuatBan";
                                $result = $database->query($sql);
                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo '<option value="' . $row["maNhaXuatBan"] . '">' . $row["tenNhaXuatBan"] . '</option>';
                                    }
                                }
                                ?>
                            </select>
                        </li>
                        <li class="list-group-item">
                            <!-- Thêm ô tìm kiếm thể loại -->
                            <input type="text" class="form-control mb-2" id="searchTheLoai"
                                placeholder="Tìm thể loại...">

                            <!-- Danh sách thể loại -->
                            <select class="form-select" id="theloai">
                                <option value="">-- Chọn thể loại --</option>
                                <?php
                                $sql = "SELECT * FROM b01_theLoai";
                                $result = $database->query($sql);
                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo '<option value="' . $row["maTheLoai"] . '">' . $row["tenTheLoai"] . '</option>';
                                    }
                                }
                                ?>
                            </select>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <input class="form-control" type="number" id="minPrice" placeholder="Từ (VNĐ)" min="0">
                                <input class="form-control" type="number" id="maxPrice" placeholder="Đến (VNĐ)" min="0">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="d-grid justify-content-md-end d-md-flex gap-2">
                                <button type="button" class="btn btn-outline-dark" id="resetFilter">Xóa bộ lọc</button>
                                <button type="button" class="btn btn-outline-dark" id="filterBtn">Tìm</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Main content -->
            <div class="col-lg-9">
                <div class="border p-5">
                    <div class="container my-4">
                        <div id="listProduct" class="listProduct row">

                        </div>
                    </div>
                    <nav class="pagination-container mt-4" aria-label="Page navigation">
                        <ul id="pagination" class="pagination justify-content-center">

                        </ul>
                    </nav>
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
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center footer__bar">
                <div class="col-md-4">
                    <div class="logo">
                        <a href="index.php" class="d-flex align-items-center">
                            <img src="Images/LogoSach.png" alt="logo" width="100" height="57">
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

    <a href="#top" id="backToTop">&#8593;</a>

    <!-- Modal thông báo thêm vào giỏ hàng -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" >
        <div class="modal-dialog modal-sm position-absolute" style="top: 10%; left: 10%;">
            <div class="modal-content bg-success text-white">
                <div class="modal-body text-center">
                    <p class="m-0">Đã thêm vào giỏ hàng!</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal chi tiết sản phẩm -->
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

    <!-- Bootstrap JS -->
    <script src="vender/js/bootstrap.bundle.min.js"></script>
    <script src="asset/js/sanpham.js"></script>
    <script src="asset/js/AJAXscript.js"></script>
    <script>
        function adjustSidebar() { // Hàm điều khiển sidebar khi cuộn
            const sidebar = document.querySelector("aside");
            if (window.innerWidth > 991) {
                sidebar.style.position = "sticky";
                sidebar.style.top = "20px";
            } else {
                sidebar.style.position = "static";
            }
        }
        // Gọi hàm khi tải trang và khi thay đổi kích thước màn hình
        window.addEventListener("load", adjustSidebar);
        window.addEventListener("resize", adjustSidebar);
    </script>
    
    <script>
        document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputValue = document.getElementById('timkiem').value.trim();

    if (inputValue) {
        window.location.href = '../B-n-S-ch/nguoidung/timkiem-nologin.php?tenSach=' + encodeURIComponent(inputValue);
    } else {
        alert('Vui lòng nhập nội dung tìm kiếm!');
    }
});

    </script>
</body>

</html>