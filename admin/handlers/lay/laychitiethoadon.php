<?php
header("Content-Type: application/json");
require '../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$_GET['maDonHang'] = isset($_GET['maDonHang']) ? $_GET['maDonHang'] : null;
if ($_GET['maDonHang'] === null) {
    echo json_encode(['error' => 'Missing maDonHang parameter']);
    exit;
}

$stmt = $database->prepare("SELECT * FROM b01_chiTietHoaDon WHERE maDonHang = ?");
$stmt->bind_param("i", $_GET['maDonHang']);
$stmt->execute();
$chiTietHoaDon = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($donHang);
?>


