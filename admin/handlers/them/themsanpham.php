<?php
session_start();
require '../../config/config.php';

$_SESSION["ketQuaThem"]=false;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $hinhAnh = $_POST["hinhAnh"];
    $tenSach = $_POST["tenSach"];
    $tacGia = $_POST["tacGia"];
    $maTheLoai = $_POST["theLoai"];
    $maNhaXuatBan = $_POST["nhaXuatBan"];
    $giaBan = $_POST["giaBan"];
    $soTrang = $_POST["soTrang"];
    $moTa = $_POST["moTa"];
    $trangThai = 1;
    $daBan = 0;

    $stmt = $database->prepare("INSERT INTO b01_sanPham(hinhAnh, tenSach, tacGia, maTheLoai, maNhaXuatBan, giaBan, soTrang, moTa, trangThai, daBan) 
    VALUES (?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sssiiiisii", $hinhAnh, $tenSach, $tacGia, $maTheLoai, $maNhaXuatBan, $giaBan, $soTrang, $moTa, $trangThai, $daBan);
    $stmt->execute();
    $stmt->close();

    $database->close();
    $_SESSION["ketQuaThem"]=true;
}



header('Location: ../../page/sanpham.php');
exit();
?>
