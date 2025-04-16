<?php
require "../admin/config/config.php";
require "../asset/handler/user_handle.php";

session_start();

if ((isset($_SESSION['username']) || isset($_COOKIE['username'])) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    header("Location: ../nguoidung/indexuser.php");
    exit();
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$usrerror = $mailerror = "";
$valid = true;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $username = test_input($_POST['username']);
    $email = test_input($_POST['email']);
    $password = test_input($_POST['pass']);
    $address = test_input($_POST['address']);
    $phone = test_input($_POST['phone']);
    $province = test_input($_POST['province']);
    $district = test_input($_POST['district']);
    $ward = test_input($_POST['ward']);

    $checkUser = getUsername($database, $username);
    $checkEmail = getEmail($database, $email);

    if (!empty($checkUser)) {
        // $usrerror = "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.";
        echo "<script>alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');</script>";
        $valid = false;
    } else {
        $usrerror = "";
    }
    if (!empty($checkEmail)) {
        // $mailerror = "Email đã được sử dụng. Vui lòng nhập email khác.";
        echo "<script>alert('Email đã được sử dụng. Vui lòng nhập email khác.');</script>";
        $valid = false;
    } else {
        $mailerror = "";
    }
    if ($valid) {
        $result = addUser($database, $username, $email, $password, $address, $phone, $province, $district, $ward);

        if ($result) {
            $success = true;
        } else {
            $success = false;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký</title>
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
                            <a href="../sanpham/gioithieu.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
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
                        <form action="dangky.php" method="post" name="signupform" id="signupform">
                            <div class="mb-3">
                                <label class="form-label" for="username">Tên đăng nhập <span style="color: red;">*</span></label>
                                <input class="form-control" type="text" name="username" id="username" placeholder="Nhập tên đăng nhập" autocomplete="off" value="<?php echo isset($username) ? $username : ''; ?>">
                                <span class="text-danger"> <?php echo $usrerror; ?> </span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="phone">Số điện thoại <span style="color: red;">*</span></label>
                                <input class="form-control" type="text" name="phone" id="phone" placeholder="Nhập số điện thoại" autocomplete="off" value="<?php echo isset($phone) ? $phone : ''; ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="email">Email <span style="color: red;">*</span></label>
                                <input class="form-control" type="text" name="email" id="email" placeholder="Nhập email" autocomplete="off" value="<?php echo isset($email) ? $email : ''; ?>">
                                <span class="text-danger"> <?php echo $mailerror; ?> </span>
                            </div>
                            <div class="mb-3 d-flex gap-3">
                                <div class="w-33">
                                    <label class="form-label" for="province">Tỉnh/Thành phố <span style="color: red;">*</span></label>
                                    <select class="form-select" id="province" name="province" onchange="loadDistricts()">
                                        <option value="">Chọn tỉnh/thành phố</option>
                                        <?php
                                        $jsonProvinces = file_get_contents("../vender/apiAddress/province.json");
                                        $provinces = json_decode($jsonProvinces, true);
                                        foreach ($provinces as $prov) {
                                            $selected = (isset($province) && $province == $prov['code']) ? "selected" : "";
                                            echo "<option value='{$prov['code']}' $selected>{$prov['name']}</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="w-33">
                                    <label class="form-label" for="district">Quận/Huyện <span style="color: red;">*</span></label>
                                    <select class="form-select" id="district" name="district" onchange="loadWards()">
                                        <option value="">Chọn quận/huyện</option>
                                        <?php
                                        if (!empty($province)) {
                                            $jsonDistricts = file_get_contents("../vender/apiAddress/district.json");
                                            $districts = json_decode($jsonDistricts, true);
                                            foreach ($districts as $dist) {
                                                if ($dist['province_code'] == $province) {
                                                    $selected = ($district == $dist['code']) ? "selected" : "";
                                                    echo "<option value='{$dist['code']}' $selected>{$dist['name']}</option>";
                                                }
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div class="w-33">
                                    <label class="form-label" for="ward">Xã/Phường <span style="color: red;">*</span></label>
                                    <select class="form-select" id="ward" name="ward">
                                        <option value="">Chọn xã/phường</option>
                                        <?php
                                        if (!empty($district)) {
                                            $jsonWards = file_get_contents("../vender/apiAddress/ward.json");
                                            $wards = json_decode($jsonWards, true);
                                            foreach ($wards as $wardItem) {
                                                if ($wardItem['district_code'] == $district) {
                                                    $selected = ($ward == $wardItem['code']) ? "selected" : "";
                                                    echo "<option value='{$wardItem['code']}' $selected>{$wardItem['name']}</option>";
                                                }
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="address">Địa chỉ nhà <span style="color: red;">*</span></label>
                                <input class="form-control" type="text" name="address" id="address" placeholder="Nhập số nhà và tên đường" autocomplete="off" value="<?php echo isset($address) ? $address : ''; ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="pass">Mật khẩu <span style="color: red;">*</span></label>
                                <input class="form-control" type="password" name="pass" id="pass" placeholder="Nhập mật khẩu" autocomplete="off" value="<?php echo isset($password) ? $password : ''; ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="pass-confirm">Xác nhận mật khẩu <span style="color: red;">*</span></label>
                                <input class="form-control" type="password" name="pass-confirm" id="pass-confirm" placeholder="Xác nhận mật khẩu" autocomplete="off" value="<?php echo isset($password) ? $password : ''; ?>">
                            </div>
                            <div class="mb-3">
                                <input type="checkbox" class="form-check-input" id="terms" name="terms" <?php echo isset($_POST['terms']) ? 'checked' : ''; ?>>
                                <label class="form-check-label" for="terms">Tôi đồng ý với <a href="#"> điều khoản và chính sách</a> của nhà sách.</label>
                            </div>
                            <button type="submit" class="btn text-white w-100" style="background-color: #336799;">Đăng Ký</button>
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
    <div class="modal fade" id="successModal" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white d-flex justify-content-center">
                    <div class="icon__success">
                        <p>&#10003</p>
                    </div>
                </div>
                <div class="modal-body text-center">
                    <h4 class="modal-title">Tuyệt vời!</h4>
                    <p style="font-size: 20px;">Bạn đã đăng ký tài khoản thành công</p>
                </div>
                <div class="modal-footer">
                    <a href="dangnhap.php" class="btn btn-success" id="closeModal">Đi đến trang đăng nhập</a>
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

    <!-- Bootstrap JS -->
    <script src="../vender/js/bootstrap.bundle.min.js"></script>
    <script src="../asset/js/dangky.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            <?php if ($success): ?>
                var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
            <?php endif; ?>
        });
    </script>
</body>

</html>