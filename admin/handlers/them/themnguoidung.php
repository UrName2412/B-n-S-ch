<?php
session_start();
require '../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $tenNguoiDung = $_POST["tenNguoiDung"];
    $email = $_POST['email'];
    $vaiTro = $_POST['vaiTro'];

    $stmt = $database->prepare("SELECT tenNguoiDung, email, vaiTro FROM b01_nguoiDung");
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $flag = true;



    while ($row = $result->fetch_assoc()) {
        if ($row['tenNguoiDung'] === $tenNguoiDung) {
            $_SESSION['thongBaoThem'] = 'Đã bị trùng tên người dùng';
            header('Location: ../../page/nguoidung.php');
            exit();
        } else if ($row['email'] === $email) {
            $_SESSION['thongBaoThem'] = 'Đã bị trùng email';
            header('Location: ../../page/nguoidung.php');
            exit();
        }
    }

    $matKhau = password_hash($_POST["matKhau"], PASSWORD_DEFAULT);
    $soDienThoai = $_POST["soDienThoai"];
    $email = $_POST["email"];
    $tinhThanh = $_POST["tinhThanh"];
    $quanHuyen = $_POST["quanHuyen"];
    $xa = $_POST["xa"];
    $duong = $_POST["duong"];
    $vaiTro = $_POST["vaiTro"];
    $trangThai = 1;
    $stmt = $database->prepare("INSERT INTO b01_nguoiDung(tenNguoiDung, matKhau, soDienThoai, email, tinhThanh, quanHuyen, xa, duong, vaiTro, trangThai) 
        VALUES (?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssssssssii", $tenNguoiDung, $matKhau, $soDienThoai, $email, $tinhThanh, $quanHuyen, $xa, $duong, $vaiTro, $trangThai);
    $stmt->execute();
    $stmt->close();


    if ($vaiTro == 1) {
        $_SESSION['thongBaoThem'] = "Thêm người quản trị thành công!";
    } else {
        $_SESSION['thongBaoThem'] = "Thêm người dùng thành công!";
    }

    $database->close();
}


header('Location: ../../page/nguoidung.php');
exit();
