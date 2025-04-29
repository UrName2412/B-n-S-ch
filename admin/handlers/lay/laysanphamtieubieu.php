<?php
header("Content-Type: application/json");
require '../../config/config.php';

$tieuBieu = '';

if (isset($_GET['tieuBieu'])){
    if ($_GET['tieuBieu'] == 1){
        $tieuBieu = 'DESC';
    } else {
        $tieuBieu = 'ASC';
    }
}

$sql = "SELECT sp.tenSach ,COUNT(ct.soLuong) as soLuong
FROM b01_chitiethoadon ct
JOIN b01_sanpham sp ON sp.maSach = ct.maSach
GROUP BY ct.maSach
ORDER BY soLuong $tieuBieu
LIMIT 1";

$stmt = $database->prepare($sql);
$stmt->execute();
$sanPham = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode($sanPham[0]);
?>





