<?php
session_start();
require '../admin/config/config.php';

// Lấy mã đơn từ URL
$maDon = isset($_GET['maDon']) ? $_GET['maDon'] : ($_SESSION['maDon'] ?? '');

if ($maDon) {
    $sql = "SELECT * FROM b01_donhang WHERE maDon = ?";
    $stmt = $database->prepare($sql);
    $stmt->bind_param("i", $maDon);
    $stmt->execute();
    $result = $stmt->get_result();
    $order = $result->fetch_assoc();

    $sql_ct = "
    SELECT ct.*, sp.tenSach, sp.hinhAnh 
    FROM b01_chitiethoadon ct
    JOIN b01_sanpham sp ON ct.maSach = sp.maSach
    WHERE ct.maDon = ?";
    $stmt_ct = $database->prepare($sql_ct);
    $stmt_ct->bind_param("i", $maDon);
    $stmt_ct->execute();
    $result_ct = $stmt_ct->get_result();
    $items = [];
    while ($row = $result_ct->fetch_assoc()) {
        $items[] = $row;
    }
} else {
    echo "Không tìm thấy đơn hàng!";
    exit;
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Hóa đơn</title>
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="../asset/css/sanpham.css">
    <link rel="stylesheet" href="../asset/css/hoaDon.css">
    <link rel="stylesheet" href="../asset/css/index-user.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table,
        th,
        td {
            border: 1px solid #ccc;
        }

        th,
        td {
            padding: 10px;
            text-align: center;
        }

        img {
            max-width: 60px;
            height: auto;
        }
    </style>
</head>

<body>
    <header class="text-white py-3">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="../nguoidung/indexuser.php">
                        <img src="../Images/LogoSach.png" alt="logo" style="width: 100px; height: 57px;">
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item"><a href="../nguoidung/indexuser.php" class="nav-link fw-bold text-white">TRANG CHỦ</a></li>
                        <li class="nav-item"><a href="../sanpham/gioithieu_user.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a></li>
                        <li class="nav-item"><a href="../sanpham/sanpham-user.php" class="nav-link fw-bold text-white">SẢN PHẨM</a></li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto" method="GET" action="nguoidung/timkiem.php">
                        <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit"><i class="fas fa-search"></i></button>
                    </form>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <div class="d-flex gap-2">
                                <a href="../nguoidung/user.php" class="mt-2"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                                <span class="mt-1" style="padding: 2px;"><?php echo $order['tenNguoiDung']; ?></span>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown"></button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="../nguoidung/user.php">Thông tin tài khoản</a></li>
                                        <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item">Đăng xuất</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a href="giohangnguoidung.php" class="nav-link text-white">
                        <div class="cart-icon"><i class="fas fa-shopping-basket"></i><span class="">0</span></div>
                    </a>
                </div>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container mt-5">
        <div class="invoice-info text-center">
            <h2>Thông tin hóa đơn</h2>
            <p><strong>Người nhận:</strong> <?php echo htmlspecialchars($order['tenNguoiNhan']); ?></p>
            <p><strong>Số điện thoại:</strong> <?php echo htmlspecialchars($order['soDienThoai']); ?></p>
            <p><strong>Địa chỉ:</strong> <?php echo htmlspecialchars($order['duong']) . ', ' . htmlspecialchars($order['xa']) . ', ' . htmlspecialchars($order['quanHuyen']) . ', ' . htmlspecialchars($order['tinhThanh']); ?></p>
            <p><strong>Ngày tạo:</strong> <?php echo htmlspecialchars($order['ngayTao']); ?></p>
            <p><strong>Ghi chú:</strong> <?php echo htmlspecialchars($order['ghiChu']); ?></p>
        </div>

        <div class="product_container">
            <h3 class="text-center mb-4">Chi tiết sản phẩm</h3>
            <table class="table table-bordered table-hover text-center align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($items as $item): ?>
                        <tr>
                            <td><img src="../Images/<?php echo htmlspecialchars($item['hinhAnh']); ?>" alt="Product Image" style="width: 80px; height: auto; border-radius: 6px;"></td>
                            <td><?php echo htmlspecialchars($item['tenSach']); ?></td>
                            <td><?php echo $item['soLuong']; ?></td>
                            <td><?php echo number_format($item['giaBan'] * 1000, 0, ',', '.'); ?>đ</td>
                            <td><?php echo number_format($item['giaBan'] * $item['soLuong'] * 1000, 0, ',', '.'); ?>đ</td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <div class="total">
                <p><strong>Tổng tiền:</strong> <?php echo number_format($order['tongTien'] * 1000, 0, ',', '.') . 'đ'; ?></p>
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
    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>

    <script>
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const inputValue = document.getElementById('timkiem').value.trim();

            if (inputValue) {
                window.location.href = '/B-n-S-ch/nguoidung/timkiem.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });
    </script>


</body>

</html>