<?php
header('Content-Type: application/json');
require '../../config/config.php';

$stmt = $database->prepare("
    SELECT tenSach, SUM(b01_chiTietHoaDon.soLuong * b01_chiTietHoaDon.giaBan) AS tongTien
    FROM b01_chiTietHoaDon
    JOIN b01_sanPham ON b01_chiTietHoaDon.maSach = b01_sanPham.maSach
    GROUP BY tenSach
    ORDER BY tongTien DESC
    LIMIT 5
");

$stmt->execute();
$result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($result); // Trả về dữ liệu JSON cho JavaScript
?>
