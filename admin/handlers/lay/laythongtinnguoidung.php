<?php
header("Content-Type: application/json");
require '../../config/config.php';

$sql = "SELECT * FROM b01_nguoiDung";
$params = [];
$types = '';

if (isset($_GET['timKiem']) && isset($_GET['tenNguoiDung'])) {
    $sql .= " WHERE tenNguoiDung LIKE ?";
    $params[] = "%" . $_GET['tenNguoiDung'] . "%";
    $types = 's';
} elseif (isset($_GET['tenNguoiDung'])) {
    $sql .= " WHERE tenNguoiDung = ?";
    $params[] = $_GET['tenNguoiDung'];
    $types = 's';
}

$stmt = $database->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$nguoiDung = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($nguoiDung);
?>
