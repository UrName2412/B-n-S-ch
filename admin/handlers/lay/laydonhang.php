<?php
header("Content-Type: application/json");
require '../../config/config.php';

$sql = "SELECT * FROM b01_donHang";
$params = [];
$types = '';

if (isset($_GET['tenNguoiDung'])) {
    if (!empty($params)) {
        $sql .= " AND tenNguoiDung = ? ";
    } else {
        $sql .= " WHERE tenNguoiDung = ? ";
    }
    $params[] = $_GET['tenNguoiDung'];
    $types .= 's';
}

if (isset($_GET['maDon'])) {
    if (!empty($params)) {
        $sql .= " AND maDon = ? ";
    } else {
        $sql .= " WHERE maDon = ? ";
    }
    $params[] = $_GET['maDon'];
    $types .= 'i';
}

if (isset($_GET['tinhTrang'])) {
    if (!empty($params)) {
        $sql .= " AND tinhTrang = ? ";
    } else {
        $sql .= " WHERE tinhTrang = ? ";
    }
    $params[] = $_GET['tinhTrang'];
    $types .= 's';
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
