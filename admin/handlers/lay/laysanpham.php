<?php
header("Content-Type: application/json");
require '../../config/config.php';

$sql = "SELECT * FROM b01_sanPham
JOIN b01_theLoai ON b01_sanPham.maTheLoai = b01_theLoai.maTheLoai
JOIN b01_nhaXuatBan ON b01_sanPham.maNhaXuatBan = b01_nhaXuatBan.maNhaXuatBan";

$params = [];
$types = '';

if (isset($_GET['maSach'])) {
    $sql .= " WHERE b01_sanPham.maSach = ?";
    $params[] = $_GET['maSach'];
    $types = 'i';
}

$sql .= " ORDER BY b01_sanPham.maSach ASC";

$stmt = $database->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$sanPham = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$stmt->close();

echo json_encode(isset($_GET['maSach']) ? ($sanPham[0] ?? []) : $sanPham);
?>
