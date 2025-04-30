<?php
header("Content-Type: application/json");
require '../../config/config.php';


$sql = "SELECT sp.tenSach ,COUNT(ct.soLuong) as soLuong
FROM b01_chitiethoadon ct
JOIN b01_sanpham sp ON sp.maSach = ct.maSach
JOIN b01_donhang dh ON dh.maDon = ct.maDon
WHERE dh.tinhTrang = 'Đã giao'
GROUP BY ct.maSach
ORDER BY soLuong DESC
LIMIT 1";

$stmt = $database->prepare($sql);
$stmt->execute();
$sanPham = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($sanPham[0]);
?>





