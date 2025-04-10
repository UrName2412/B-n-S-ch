<?php
session_start();
require '../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $tenNguoiDung = $_POST["tenNguoiDung"];

    $stmt = $database->prepare("SELECT tenNguoiDung FROM b01_nguoiDung");
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $flag = true;



    while ($row = $result->fetch_assoc()) {
        if ($row['tenNguoiDung'] === $tenNguoiDung){
            $flag = false;
            break;
        }
    }

    if ($flag){
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
    } else {
        echo "Bị trùng tên người dùng rồi.";
    }

    if ($flag){
        $_SESSION["ketQuaThem"]=true;
    } else {
        $_SESSION["ketQuaThem"]=false;
    }

    $database->close();
}


header('Location: ../../page/nguoidung.php');
exit();
?>
