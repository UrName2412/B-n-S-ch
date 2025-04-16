<?php
header("Content-Type: application/json");
require '../../config/config.php';

$sql = "SELECT * FROM b01_donHang";
$params = [];
$types = '';

if (isset($_GET['maDon'])) {
    $sql .= " WHERE maDon = ?";
    $params[] = $_GET['maDon'];
    $types = 'i';
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
