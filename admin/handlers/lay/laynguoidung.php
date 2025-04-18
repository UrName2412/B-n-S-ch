<?php
header("Content-Type: application/json");
require '../../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);
$trangThai = isset($data['trangThai']) ? $data['trangThai'] : null;

$sql = "SELECT * FROM b01_nguoiDung";
$params = [];
$types = "";

if (!is_null($trangThai)) {
    $sql .= " WHERE trangThai = ?";
    $params[] = $trangThai;
    $types .= "i";
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
