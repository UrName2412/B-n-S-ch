<?php
include 'admin/config/config.php';
session_start();

if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
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
    <link rel="stylesheet" href="asset/css/sanpham.css">
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
                            <a href="sanpham/gioithieu.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
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
    <div id="carouselBanner" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselBanner" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselBanner" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselBanner" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="Images/banner1.jpg" class="d-block w-100" alt="Banner 1"
                    style="height: 500px; object-fit: fit-content;">
            </div>
            <div class="carousel-item">
                <img src="Images/banner2.jpg" class="d-block w-100" alt="Banner 2"
                    style="height: 500px; object-fit: fit-content;">
            </div>
            <div class="carousel-item">
                <img src="Images/banner3.jpg" class="d-block w-100" alt="Banner 3"
                    style="height: 500px; object-fit: fit-content;">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselBanner" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselBanner" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
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
                    <h3 class="text-center mb-4">SẢN PHẨM BÁN CHẠY NHẤT</h3>
                    <div class="container">
                        <div id="listProduct" class="listProduct row">
                            <?php
                           $sql = "SELECT 
                           b01_sanPham.maSach, 
                           b01_sanPham.tenSach, 
                           b01_sanPham.hinhAnh, 
                           b01_sanPham.giaBan,
                           b01_theLoai.tenTheLoai, 
                           COALESCE(SUM(b01_chiTietHoaDon.soLuong * b01_chiTietHoaDon.giaBan), 0) AS tongTien
                           FROM b01_sanPham
                           LEFT JOIN b01_chiTietHoaDon ON b01_chiTietHoaDon.maSach = b01_sanPham.maSach
                           LEFT JOIN b01_donHang ON b01_chiTietHoaDon.maDon = b01_donHang.maDon
                           AND b01_donHang.tinhTrang = 'Đã giao'
                           JOIN b01_theLoai ON b01_sanPham.maTheLoai = b01_theLoai.maTheLoai
                           GROUP BY b01_sanPham.maSach, b01_sanPham.tenSach, b01_sanPham.hinhAnh, b01_sanPham.giaBan, b01_theLoai.tenTheLoai
                           ORDER BY tongTien DESC
                           LIMIT 9;";
                            $result = $database->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    echo '<div class="col-md-4 mb-4">';
                                    echo '<div class="card" style="width: 100%;">';
                                    echo '<a href="#" class="view-detail" data-id="' . $row["maSach"] . '">';
                                    echo '<img src="Images/' . $row["hinhAnh"] . '" alt="' . $row["tenSach"] . '" class="card-img-top">';
                                    echo '</a>';
                                    echo '<div class="card-body">';
                                    echo '<h5 class="card-title">' . $row["tenSach"] . '</h5>';
                                    echo '<p class="card-text">Thể loại: ' . $row["tenTheLoai"] . '</p>';
                                    echo '<p class="card-text text-danger fw-bold">' . number_format($row["giaBan"], 0, ',', '.') . ' đ</p>';
                                    echo '<button class="btn" style="background-color: #336799; color: #ffffff;">Thêm vào giỏ hàng</button>';
                                    echo '</div></div></div>';
                                }
                            } else {
                                echo '<p class="text-center">Không có sản phẩm nào.</p>';
                            }
                            ?>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <a href="sanpham/sanpham.php" class="btn btn-outline-primary">Xem thêm <i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" id="baseUrl" value="asset/handler/ajax_get_product_detail.php">
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
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel">
        <div class="modal-dialog modal-sm position-absolute" style="top: 10%; left: 10%;">
            <div class="modal-content bg-success text-white">
                <div class="modal-body text-center">
                    <p class="m-0">Đã thêm vào giỏ hàng!</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal chi tiết sản phẩm -->
    <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailLabel">
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
                window.location.href = 'nguoidung/timkiem-nologin.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });

        // Xử lý chuyển trang khi bấm nút lọc
        document.getElementById('filterBtn').addEventListener('click', function () {
            // Lấy giá trị các trường lọc
            const tenSach = document.getElementById('tensach').value.trim();
            const tacGia = document.getElementById('tentacgia').value.trim();
            const nxb = document.getElementById('nxb').value;
            const theloai = document.getElementById('theloai').value;
            const minPrice = document.getElementById('minPrice').value;
            const maxPrice = document.getElementById('maxPrice').value;

            // Tạo query string
            const params = new URLSearchParams();
            if (tenSach) params.append('tensach', tenSach);
            if (tacGia) params.append('tentacgia', tacGia);
            if (nxb) params.append('nxb', nxb);
            if (theloai) params.append('theloai', theloai);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);

            // Chuyển hướng sang trang sản phẩm với các tham số lọc
            window.location.href = 'sanpham/sanpham.php?' + params.toString();
        });

        document.addEventListener('DOMContentLoaded', function () {
            handleViewDetailClick('Images/');
        });

    </script>
</body>
</html>