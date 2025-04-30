<?php
header("Content-Type: application/json");
require '../../config/config.php';

$start = $_GET['start'] ?? null;
$end = $_GET['end'] ?? null;

$sql = "SELECT SUM(tongTien) as tongTien FROM b01_donhang WHERE tinhTrang = 'Đã giao'";
$params = [];
$types = '';

if (!empty($start) && !empty($end)) {
    $sql .= " AND ngayTao BETWEEN ? AND ?";
    $params[] = $start;
    $params[] = $end;
    $types = 'ss';
}

$stmt = $database->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$donHang = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($donHang[0]);
?>
