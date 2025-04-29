<?php
header("Content-Type: application/json");
require '../../config/config.php';


$stmt = $database->prepare("SELECT SUM(tongTien) as tongTien
FROM b01_donhang dh
WHERE dh.tinhTrang = 'Đã giao'");
$stmt->execute();
$donHang = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($donHang[0]);
?>
