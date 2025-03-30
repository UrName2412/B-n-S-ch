<?php
header("Content-Type: application/json");
require '../config/config.php';

$stmt = $database->prepare("SELECT * FROM b01_sanpham
JOIN b01_theloai ON b01_sanpham.maTheLoai = b01_theloai.maTheLoai
JOIN b01_nhaxuatban ON b01_sanpham.maNhaXuatBan = b01_nhaxuatban.maNhaXuatBan");
$stmt->execute();
$sanPham = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($sanPham);
?>