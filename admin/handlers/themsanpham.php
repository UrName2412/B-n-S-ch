<?php

require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $tenSach = $_POST["tenSach"];
    $tacGia = $_POST["tacGia"];
    $giaBan = $_POST["giaBan"];
    $hinhAnh = $_POST["hinhAnh"];
    $moTa = $_POST["moTa"];
    $trangThai = 1;
    $soTrang = $_POST["soTrang"];
    $daBan = 0;
    $maNhaXuatBan = $_POST["nhaXuatBan"];
    $maTheLoai = $_POST["theLoai"];
    $trangThai = 1;

    $stmt = $database->prepare("INSERT INTO sanpham(tenSach, tacGia, giaBan, hinhAnh, moTa, trangThai, soTrang, daBan, maNhaXuatBan, maTheLoai) 
    VALUES (?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssissiiiii", $tenSach, $tacGia, $giaBan, $hinhAnh, $moTa, $trangThai, $soTrang, $daBan, $maNhaXuatBan, $maTheLoai);
    $stmt->execute();
    $stmt->close();

    $database->close();
    
    // header('Location: ../page/sanpham.php');

    // exit(); // = break
}
