<?php
require "../admin/config/config.php";
require "../asset/handler/user_handle.php";
session_start();

if (isset($_SESSION['username']) || isset($_COOKIE['username'])) {
    header("Location: ../nguoidung/indexuser.php");
    exit();
}

function test_input($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

$usererror = $passerror = "";
$success = $stasflag = false;
$username = "";
$password = "";

if (isset($_COOKIE['username']) && isset($_COOKIE['pass'])) {
    $username = $_COOKIE['username'];
    $password = $_COOKIE['pass'];

    $user = checkLogin($database, $username, $password);
    if ($user) {
        $_SESSION['username'] = $user['tenNguoiDung'];
        $_SESSION['user'] = $user;
        $success = true;
    }
}

if (isset($_POST['action']) && $_POST['action'] == 'do-login') {
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        $username = test_input($_POST['username']);
        $password = test_input($_POST['pass']);

        $user = checkLogin($database, $username, $password);

        if (!$user || $user['vaiTro'] == true) {
            // $usererror = "Tên đăng nhập hoặc mật khẩu không đúng";
            // $passerror = "Tên đăng nhập hoặc mật khẩu không đúng";
            echo "<script>alert('Tên đăng nhập hoặc mật khẩu không đúng');</script>";
        } else if ($user['trangThai'] == false) {
            $stasflag = true;
        } else {
            $_SESSION['username'] = $user['tenNguoiDung'];
            $_SESSION['user'] = $user;
            $success = true;

            if (isset($_POST['remember'])) {
                setcookie('username', $username, time() + 30 * 24 * 60 * 60, "/");
                setcookie('pass', $password, time() + 30 * 24 * 60 * 60, "/");
            } else {
                setcookie('username', '', time() - 3600, "/");
                setcookie('pass', '', time() - 3600, "/");
            }
        }
    }
}
?>


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
                            <a href="dangnhap.php" class="nav-link fw-bold" style="color: yellow;">ĐĂNG NHẬP</a>
                        </li>
                        <li class="nav-item">
                            <a href="dangky.php" class="nav-link fw-bold text-white">ĐĂNG KÝ</a>
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
                            <h4 class="fw-bold">ĐĂNG NHẬP</h4>
                        </div>
                        <form action="dangnhap.php" method="post" name="signinform" id="signinform">
                            <div class="mb-3">
                                <label class="form-label" for="username">Tên đăng nhập <span style="color: red;">*</span></label>
                                <input class="form-control" type="text" name="username" id="username" placeholder="Nhập tên đăng nhập" value="<?php echo isset($username) ? $username : ''; ?>">
                                <span class="text-danger"> <?php echo $usererror; ?> </span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="pass">Mật khẩu <span style="color: red;">*</span></label>
                                <input class="form-control" type="password" name="pass" id="pass" placeholder="Nhập mật khẩu" value="<?php echo isset($password) ? $password : ''; ?>">
                                <span class="text-danger"> <?php echo $passerror; ?> </span>
                            </div>
                            <input type="hidden" name="action" value="do-login">
                            <button type="submit" class="btn text-white w-100" style="background-color: #336799;">Đăng Nhập</button>
                            <div class="mt-3 d-flex justify-content-between">
                                <div>
                                    <input type="checkbox" class="form-check-input" id="remember" name="remember">
                                    <label class="form-check-label" for="remember">Ghi nhớ mật khẩu</label>
                                </div>
                            </div>
                        </form>
                        <div class="mt-3 d-flex justify-content-center">
                            <p>Bạn chưa có tài khoản? <a href="dangky.php">Đăng ký ngay</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Modal Success -->
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
                    <p style="font-size: 20px;">Bạn đã đăng nhập thành công</p>
                </div>
                <div class="modal-footer">
                    <a href="../nguoidung/indexuser.php" class="btn btn-success" id="closeModal">Bắt đầu mua sắm</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Failed Status -->
    <div class="modal fade" id="stasModal" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-warning d-flex justify-content-center p-3">
                    <h4 class="modal-title">Thông báo!</h4>
                </div>
                <div class="modal-body text-center">
                    <p style="font-size: 20px;">Tài khoản của bạn không tồn tại hoặc đã bị khóa, vui lòng liên hệ bộ phận chăm sóc khác hàng để được hỗ trợ!</p>
                </div>
                <div class="modal-footer">
                    <a href="../index.php" class="btn btn-warning" id="closeModal">Quay về trang chủ</a>
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
    <script src="../asset/js/dangnhap.js"></script>
    <?php if ($success): ?>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();

                setTimeout(function() {
                    window.location.href = "../nguoidung/indexuser.php";
                }, 2000);
            });
        </script>
    <?php endif; ?>

    <?php if ($stasflag): ?>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                var stasModal = new bootstrap.Modal(document.getElementById('stasModal'));
                stasModal.show();
            });
        </script>
    <?php endif; ?>

</body>

</html>