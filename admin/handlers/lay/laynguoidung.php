<?php
header("Content-Type: application/json");
require '../../config/config.php';

$stmt = $database->prepare("SELECT * FROM b01_nguoidung");
$stmt->execute();
$nguoiDung = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($nguoiDung);
?>