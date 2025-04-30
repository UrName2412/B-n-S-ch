<?php
header("Content-Type: application/json");
require '../../config/config.php';

$sql = "SELECT * FROM b01_donHang";

$start = $_GET['start'] ?? '1900-01-01';
$end = $_GET['end'] ?? date('Y-m-d');

$sql .= " WHERE ngayTao BETWEEN ? AND ?";
$params = [$start, $end];
$types = 'ss';

if (!empty($_GET['tenNguoiDung'])) {
    $sql .= " AND tenNguoiDung = ?";
    $params[] = $_GET['tenNguoiDung'];
    $types .= 's';
}
 
if (!empty($_GET['maDon'])) {
    $sql .= " AND maDon = ?";
    $params[] = $_GET['maDon'];
    $types .= 'i';
}

if (!empty($_GET['tinhTrang'])) {
    $tinhTrangArr = explode(',', $_GET['tinhTrang']);
    $placeholders = implode(',', array_fill(0, count($tinhTrangArr), '?'));
    $sql .= " AND tinhTrang IN ($placeholders)";
    foreach ($tinhTrangArr as $tt) {
        $params[] = $tt;
        $types .= 's';
    }
}

$stmt = $database->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();

$donHang = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode(isset($_GET['maDon']) ? ($donHang[0] ?? []) : $donHang);
?>
