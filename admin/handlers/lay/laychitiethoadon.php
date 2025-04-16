<?php
header("Content-Type: application/json");
require '../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$_GET['maDon'] = isset($_GET['maDon']) ? $_GET['maDon'] : null;
if ($_GET['maDon'] === null) {
    echo json_encode(['error' => 'Missing maDon parameter']);
    exit;
}

$stmt = $database->prepare("SELECT * FROM b01_chiTietHoaDon WHERE maDon = ?");
$stmt->bind_param("i", $_GET['maDon']);
$stmt->execute();
$chiTietHoaDon = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($chiTietHoaDon);
?>


