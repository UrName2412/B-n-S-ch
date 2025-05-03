<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();

if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    $username = $_SESSION['username'];
} else {
    echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}

$user = getUserInfoByUsername($database, $username);

if ($user['trangThai'] == false) {
    echo "<script>alert('Tài khoản của bạn đã bị khóa!'); window.location.href='../dangky/dangxuat.php';</script>";
    exit();
}
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sản phẩm</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="../asset/css/sanpham.css">
    <link rel="stylesheet" href="../asset/css/index-user.css">
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
                            <a href="gioithieu_user.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="sanpham-user.php" class="nav-link fw-bold" style="color: yellow;">SẢN PHẨM</a>
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
                                        <li class="dropdownList"><a class="dropdown-item"
                                                href="../nguoidung/user.php">Thông tin tài khoản</a></li>
                                        <li class="dropdownList"><a href="../dangky/dangxuat.php"
                                                class="dropdown-item" onclick="removeSessionCart()">Đăng xuất</a></li>
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
    <!-- Main content -->
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
                            <!-- Danh sách nhà xuất bản  -->
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
                                <button type="button" class="btn btn-outline-dark" id="resetFilter">Xóa bộ
                                    lọc</button>
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
    <input type="hidden" id="baseUrl" value="../asset/handler/ajax_get_product_detail.php">                           
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
                        <li>Chi nhánh 2: 105 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh
                        </li>
                        <li>Chi nhánh 3: 4 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <a href="#top" id="backToTop">&#8593;</a>

    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel">
        <div class="modal-dialog modal-sm position-absolute" style="top: 10%; left: 10%;">
            <div class="modal-content bg-success text-white">
                <div class="modal-body text-center">
                    <p class="m-0">Đã thêm vào giỏ hàng!</p>
                </div>
            </div>
        </div>
    </div>

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
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/sanpham.js"></script>
    <script src="../asset/js/AJAXscript.js"></script>
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
        // Gọi hàm khi tải trang và khi thay đổi kích thước
        window.addEventListener("load", adjustSidebar);
        window.addEventListener("resize", adjustSidebar);
    </script>

    <script>

        // Tải sản phẩm ban đầu
        document.addEventListener('DOMContentLoaded', function () {
            loadProducts();  // Mặc định tải trang 1
        });

        document.getElementById('searchForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const inputValue = document.getElementById('timkiem').value.trim();

            if (inputValue) {
                window.location.href = '../nguoidung/timkiem.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });
    </script>

    <script>
        // Hàm để lấy giá trị tham số từ URL
        function getUrlParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // Điền các giá trị từ URL vào form lọc và tự động lọc
        document.addEventListener('DOMContentLoaded', function() {
            // Điền giá trị từ URL vào các trường input
            const tensach = getUrlParam('tensach');
            const tentacgia = getUrlParam('tentacgia');
            const nxb = getUrlParam('nxb');
            const theloai = getUrlParam('theloai');
            const minPrice = getUrlParam('minPrice');
            const maxPrice = getUrlParam('maxPrice');

            // Set giá trị cho các trường input
            if(tensach) document.getElementById('tensach').value = tensach;
            if(tentacgia) document.getElementById('tentacgia').value = tentacgia;
            if(nxb) document.getElementById('nxb').value = nxb;
            if(theloai) document.getElementById('theloai').value = theloai;
            if(minPrice) document.getElementById('minPrice').value = minPrice;
            if(maxPrice) document.getElementById('maxPrice').value = maxPrice;

            // Nếu có bất kỳ tham số lọc nào, tự động kích hoạt nút lọc
            if(tensach || tentacgia || nxb || theloai || minPrice || maxPrice) {
                document.getElementById('filterBtn').click();
            } else {
                // Nếu không có tham số lọc, tải tất cả sản phẩm
                loadProducts();
            }
        });
    </script>
</body>
</html>