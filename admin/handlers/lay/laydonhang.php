<?php
header("Content-Type: application/json");
require '../../config/config.php';

$sql = "SELECT * FROM b01_donHang";
$params = [];
$types = '';

if (isset($_GET['tenNguoiDung'])) {
    $sql .= empty($params) ? " WHERE tenNguoiDung = ?" : " AND tenNguoiDung = ?";
    $params[] = $_GET['tenNguoiDung'];
    $types .= 's';
}

if (isset($_GET['maDon'])) {
    $sql .= empty($params) ? " WHERE maDon = ?" : " AND maDon = ?";
    $params[] = $_GET['maDon'];
    $types .= 'i';
}

if (isset($_GET['tinhTrang'])) {
    $tinhTrangArr = explode(',', $_GET['tinhTrang']);
    $placeholders = implode(',', array_fill(0, count($tinhTrangArr), '?'));
    $sql .= empty($params) ? " WHERE tinhTrang IN ($placeholders)" : " AND tinhTrang IN ($placeholders)";
    foreach ($tinhTrangArr as $tinhTrang) {
        $params[] = $tinhTrang;
        $types .= 's';
    }
}

$stmt = $database->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$donHang = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode(isset($_GET['maDon']) ? ($donHang[0] ?? []) : $donHang);
?>
