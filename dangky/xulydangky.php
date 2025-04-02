<?php
require '../connectdb.php';

if (isset($_POST['reg-submit'])) {

    $tenNguoiDung = trim($_POST['tenNguoiDung']);
    $matKhau = $_POST['matKhau'];
    $pass_confirm = $_POST['pass_confirm'];
    $soDienThoai = trim($_POST['soDienThoai']);
    $email = trim($_POST['email']);
    $tinhThanh = trim($_POST['tinhThanh']);
    $quanHuyen = trim($_POST['quanHuyen']);
    $xa = trim($_POST['xa']);
    $duong = trim($_POST['duong']);

    $check_user = $conn->prepare("SELECT tenNguoiDung FROM b01_nguoidung WHERE tenNguoiDung = ?");
    $check_user->bind_param("s", $tenNguoiDung);
    $check_user->execute();
    $check_user->store_result();
    
    if ($check_user->num_rows > 0) {
        echo "<script>alert('Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.'); window.location.href='dangky.php';</script>";
        exit();
    }

    $check_email = $conn->prepare("SELECT email FROM b01_nguoidung WHERE email = ?");
    $check_email->bind_param("s", $email);
    $check_email->execute();
    $check_email->store_result();
    
    if ($check_email->num_rows > 0) {
        echo "<script>alert('Email đã được đăng ký! Vui lòng sử dụng email khác.'); window.location.href='dangky.php';</script>";
        exit();
    }
    
    if ($matKhau !== $pass_confirm) {
        echo "<script>alert('Mật khẩu xác nhận không khớp!'); window.location.href='dangky.php';</script>";
        exit();
    }
    
    if (strlen($matKhau) < 8) {
        echo "<script>alert('Mật khẩu phải có ít nhất 8 ký tự!'); window.location.href='dangky.php';</script>";
        exit();
    }
    // Hash mật khẩu
    $hashedPassword = password_hash($matKhau, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO `b01_nguoidung` 
            (`tenNguoiDung`, `matKhau`, `soDienThoai`, `email`, `tinhThanh`, `quanHuyen`, `xa`, `duong`, `vaiTro`, `trangThai`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1)");
    
    $stmt->bind_param("ssssssss", $tenNguoiDung, $hashedPassword, $soDienThoai, $email, 
                     $tinhThanh, $quanHuyen, $xa, $duong);

        if ($stmt->execute()) {
         echo "<script>
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            window.location.href = 'dangnhap.php';
            </script>";
         exit();
        } else {
            echo "<script>alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.'); window.location.href='dangky.php';</script>";
        exit();
    }
}

if (isset($_GET['error'])) {
    $error = $_GET['error'];
    $errorMsg = '';

    switch ($error) {
        case 'username_exists':
            $errorMsg = 'Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.';
            break;
        case 'email_exists':
            $errorMsg = 'Email đã được đăng ký! Vui lòng sử dụng email khác.';
            break;
        case 'password_mismatch':
            $errorMsg = 'Mật khẩu xác nhận không khớp!';
            break;
        case 'weak_password':
            $errorMsg = 'Mật khẩu phải có ít nhất 8 ký tự!';
            break;
        case 'database_error':
            $errorMsg = 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.';
            break;
        default:
            $errorMsg = 'Có lỗi xảy ra!';
    }
}
?>