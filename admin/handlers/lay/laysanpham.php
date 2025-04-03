<?php
header("Content-Type: application/json");
require '../../config/config.php';

$stmt = $database->prepare("SELECT * FROM b01_sanPham
JOIN b01_theLoai ON b01_sanPham.maTheLoai = b01_theLoai.maTheLoai
JOIN b01_nhaXuatBan ON b01_sanPham.maNhaXuatBan = b01_nhaXuatBan.maNhaXuatBan
ORDER BY b01_sanPham.maSach ASC");
$stmt->execute();
$sanPham = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($sanPham);
?>