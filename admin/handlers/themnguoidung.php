<?php

require '../config/config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $tenNguoiDung = $_POST["tenNguoiDung"];
    $vaiTro = $_POST["vaiTro"];

    $stmt = $database->prepare("SELECT tenNguoiDung FROM nguoidung WHERE nguoidung.vaiTro = ?");
    $stmt->bind_param("i",$vaiTro);
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
        $matKhau = $_POST["matKhau"];
        $soDienThoai = $_POST["soDienThoai"];
        $email = $_POST["email"];
        $tinhThanh = $_POST["tinhThanh"];
        $quanHuyen = $_POST["quanHuyen"];
        $xa = $_POST["xa"];
        $duong = $_POST["duong"];
        $trangThai = 1;
        $stmt = $database->prepare("INSERT INTO nguoidung(tenNguoiDung, matKhau, soDienThoai, email, tinhThanh, quanHuyen, xa, duong, vaiTro, trangThai) 
        VALUES (?,?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("ssssssssii", $tenNguoiDung, $matKhau, $soDienThoai, $email, $tinhThanh, $quanHuyen, $xa, $duong, $vaiTro, $trangThai);
        $stmt->execute();
        $stmt->close();
    } else {
        echo "Bị trùng tên người dùng rồi.";
    }




    $database->close();


    if ($flag){
        $_SESSION["ketQuaThem"]=true;
    } else{
        $_SESSION["ketQuaThem"]=false;
    }
    print_r($_SESSION);
    // header('Location: ../page/nguoidung.php');
    
    // exit(); // = break


}
