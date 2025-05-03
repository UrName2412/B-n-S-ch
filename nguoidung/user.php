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

$provinces = json_decode(file_get_contents('../vender/apiAddress/province.json'), true);
$districts = json_decode(file_get_contents('../vender/apiAddress/district.json'), true);
$wards = json_decode(file_get_contents('../vender/apiAddress/ward.json'), true);

function getAddress($data, $code)
{
    foreach ($data as $item) {
        if ($item['code'] == $code) {
            return $item['name'];
        }
    }
    return 'Không rõ';
}

$duong = $user['duong'];
$xa = getAddress($wards, $user['xa']);
$quan = getAddress($districts, $user['quanHuyen']);
$tinh = getAddress($provinces, $user['tinhThanh']);
$diaChi = $duong . ', ' . $xa . ', ' . $quan . ', ' . $tinh;

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $username1 = test_input($_POST['name']);
    $address1 = test_input($_POST['address']);
    $phone1 = test_input($_POST['phone']);
    $province1 = test_input($_POST['province']);
    $district1 = test_input($_POST['district']);
    $ward1 = test_input($_POST['ward']);

    updateUser($database, $username1, $address1, $phone1, $province1, $district1, $ward1);

    $_SESSION['update_success'] = true;

    header("Location: user.php");
    exit();
}

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
    <?php
    if (isset($_SESSION['update_success'])) {
        echo "<script>alert('Cập nhật thông tin thành công!');</script>";
        unset($_SESSION['update_success']);
    }
    ?>
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
                                <a href="user.php" class="mt-2"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                                <span class="mt-1" id="profile-name" style="top: 20px; padding: 2px;"><?php echo $user['tenNguoiDung']; ?></span>
                                <div class="dropdown">
                                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul class="dropdown-menu">
                                        <li class="dropdownList"><a class="dropdown-item" href="user.php">Thông tin tài khoản</a></li>
                                        <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item"  onclick="removeSessionCart()">Đăng xuất</a></li>
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
                        <p class="d-flex flex-column"><Strong>TÊN ĐĂNG NHẬP</Strong> <span id="customer-name"><?php echo $user['tenNguoiDung']; ?></span></p>
                        <p class="d-flex flex-column"><strong>EMAIL</strong> <span id="customer-email"><?php echo $user['email']; ?></span></p>
                        <p class="d-flex flex-column"><strong>SỐ ĐIỆN THOẠI</strong> <span id="customer-phone"><?php echo $user['soDienThoai']; ?></span></p>
                        <p class="d-flex flex-column"><strong>ĐỊA CHỈ</strong> <span id="customer-address"><?php echo $diaChi; ?></span></p>
                    </div>
                </div>
            </div>
        </div>
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
    <form id="edit-form" name="edit-form" action="user.php" method="post">
        <h2>Cập Nhật Thông Tin</h2>
        <div class="mb-2">
            <label for="phone">Số Điện Thoại:</label>
            <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" value="<?php echo $user['soDienThoai']; ?>">
        </div>
        <div class="mb-2">
            <label class="form-label" for="province">Tỉnh/Thành:</label>
            <select class="form-select" id="province" name="province">
                <?php foreach ($provinces as $province): ?>
                    <option value="<?= $province['code'] ?>" <?= $province['code'] == $user['tinhThanh'] ? 'selected' : '' ?>>
                        <?= $province['name'] ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="mb-2">
            <label class="form-label" for="district">Quận/Huyện:</label>
            <select class="form-select" id="district" name="district">
                <?php foreach ($districts as $district): ?>
                    <option value="<?= $district['code'] ?>" <?= $district['code'] == $user['quanHuyen'] ? 'selected' : '' ?>>
                        <?= $district['name'] ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="mb-2">
            <label class="form-label" for="ward">Xã/Phường:</label>
            <select class="form-select" id="ward" name="ward">
                <?php foreach ($wards as $ward): ?>
                    <option value="<?= $ward['code'] ?>" <?= $ward['code'] == $user['xa'] ? 'selected' : '' ?>>
                        <?= $ward['name'] ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="mb-2">
            <label class="form-label" for="address">Địa chỉ nhà:</label>
            <input class="form-control" type="text" name="address" id="address" placeholder="Nhập địa chỉ nhà" value="<?php echo $user['duong']; ?>">
        </div>
        <button type="submit" class="edit-btn">Lưu</button>
        <button type="reset" class="cancel-btn" onclick="toggleEditForm()">Hủy</button>
    </form>

    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/user.js"></script>

    <script>
        document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const inputValue = document.getElementById('timkiem').value.trim();

            if (inputValue) {
                window.location.href = 'timkiem.php?tenSach=' + encodeURIComponent(inputValue);
            } else {
                alert('Vui lòng nhập nội dung tìm kiếm!');
            }
        });
    </script>

</body>

</html>