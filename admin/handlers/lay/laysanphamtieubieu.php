<?php
header("Content-Type: application/json");
require '../../config/config.php';

$start = $_GET['start'] ?? null;
$end = $_GET['end'] ?? null;

$sql = "SELECT sp.tenSach, COUNT(ct.soLuong) as soLuong
FROM b01_chitiethoadon ct
JOIN b01_sanpham sp ON sp.maSach = ct.maSach
JOIN b01_donhang dh ON dh.maDon = ct.maDon
WHERE dh.tinhTrang = 'Đã giao'";

$params = [];
$types = '';

if (!empty($start) && !empty($end)) {
    $sql .= " AND dh.ngayTao BETWEEN ? AND ?";
    $params[] = $start;
    $params[] = $end;
    $types = 'ss';
}

$sql .= " GROUP BY ct.maSach
ORDER BY soLuong DESC
LIMIT 1";

$stmt = $database->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$sanPham = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($sanPham[0] ?? []);
?>
