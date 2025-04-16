<?php
require "../admin/config/config.php";
require "../asset/handler/user_handle.php";
session_start();

if ((isset($_SESSION['username']) || isset($_COOKIE['username'])) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    header("Location: ../nguoidung/indexuser.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tìm Kiếm</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <!-- FONT AWESOME  -->
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS  -->
    <link rel="stylesheet" href="../asset/css/sanpham.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3" id="top">
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
                            <a href="../sanpham/gioithieu.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/sanpham.php" class="nav-link fw-bold text-white">SẢN
                                PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto" method="GET" action="nguoidung/timkiem-nologin.php">
                        <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
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
                            <a href="../dangky/dangnhap.php" class="nav-link fw-bold text-white">ĐĂNG NHẬP</a>
                        </li>
                        <li class="nav-item">
                            <a href="../dangky/dangky.php" class="nav-link fw-bold text-white">ĐĂNG KÝ</a>
                        </li>
                    </ul>
                    <a href="../giohang/giohang.php" class="nav-link text-white">
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
    <div class="container my-4">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-lg-3">
                <div class="rounded text-dark p-4"
                    style="border: 1px solid black; box-shadow: 5px 5px 5px rgba(50, 50, 50, 0.75);">
                    <h5 class="fw-bold text-center">DANH MỤC</h5>
                    <ul class="list-group" style="border: 1px solid;">
                        <li class="list-group-item" style="border: none;">
                            <a href="../danhmuc/sachthieunhi-nologin.php" class="fw-bold text-dark">Sách thiếu nhi</a>
                        </li>
                        <li class="list-group-item" style="border: none;">
                            <a href="../danhmuc/sachgiaokhoa-nologin.php" class="fw-bold text-dark">Sách giáo khoa</a>
                        </li>
                        <li class="list-group-item" style="border: none;">
                            <a href="../danhmuc/sachkinhte-nologin.php" class="fw-bold text-dark">Sách kinh tế</a>
                        </li>
                        <li class="list-group-item" style="border: none;">
                            <a href="../danhmuc/sachlichsu-nologin.php" class="fw-bold text-dark">Sách lịch sử</a>
                        </li>
                        <li class="list-group-item" style="border: none;">
                            <a href="../danhmuc/sachngoaingu-nologin.php" class="fw-bold text-dark">Sách ngoại ngữ</a>
                        </li>
                        <li class="list-group-item" style="border: none;">
                            <a href="../danhmuc/sachkhoahoc-nologin.php" class="fw-bold text-dark">Sách khoa học</a>
                        </li>
                    </ul>
                </div>
            </aside>
            <!-- Main content -->
            <div class="col-lg-9">
                <div class="border p-5">
                    <div class="container my-4">
                        <div class="listProduct row">
                        <?php
                        require '../admin/config/config.php';
                        if (isset($_GET['tenSach']) && !empty($_GET['tenSach'])) {
                            $keyword = '%' . $_GET['tenSach'] . '%';
                            $stmt = $database->prepare("
                                SELECT * FROM b01_sanpham 
                                WHERE (tenSach LIKE ? OR moTa LIKE ?) 
                                AND trangThai = 1
                            ");
                            $stmt->bind_param("ss", $keyword, $keyword);
                            $stmt->execute();
                            $result = $stmt->get_result();
                        
                            if ($result->num_rows > 0) {
                                echo '<h3>Kết quả tìm kiếm cho: <strong>' . htmlspecialchars($_GET['tenSach']) . '</strong></h3>';
                                while ($row = $result->fetch_assoc()) {
                                    ?>
                                    <div class="col-md-4 mb-4">
                                        <div class="card" style="width: 100%;">
                                                <img src="../images/<?php echo $row['hinhAnh']; ?>" class="card-img-top" alt="...">
                                            </a>
                                            <div class="card-body">
                                                <h5 class="card-title"><?php echo $row['tenSach']; ?></h5>
                                                <p class="card-text text-danger fw-bold"><?php echo number_format($row['giaBan']); ?> đ</p>
                                                <button class="btn" style="background-color: #336799; color: #ffffff;">Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                            } else {
                                echo "<p>Không tìm thấy sách nào phù hợp.</p>";
                            }
                        } else {
                            echo "<p>Vui lòng nhập từ khóa để tìm kiếm.</p>";
                        }
                        ?>
                        </div>
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

    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" inert>
        <div class="modal-dialog modal-sm position-absolute" style="top: 10%; left: 10%;">
            <div class="modal-content bg-success text-white">
                <div class="modal-body text-center">
                    <p class="m-0">Đã thêm vào giỏ hàng!</p>
                </div>
            </div>
        </div>
    </div>

    <a href="#top" id="backToTop">&#8593;</a>

    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/sanpham.js"></script>
    <script src="../asset/js/timkiem.js"></script>

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
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const inputValue = document.getElementById('timkiem').value.trim();

            if (inputValue) {
                // Chuyển sang trang tìm kiếm và truyền từ khóa vào URL
                window.location.href = '../nguoidung/timkiem-nologin.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });
    </script>
</body>

</html>