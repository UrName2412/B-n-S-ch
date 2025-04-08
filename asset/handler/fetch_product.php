<?php
include '../../admin/config/config.php';

if (!isset($database)) {
    die(json_encode(["error" => "Lỗi kết nối cơ sở dữ liệu."]));
}

$category = isset($_GET['category']) ? $_GET['category'] : "";
$max_price = isset($_GET['max_price']) ? $_GET['max_price'] : "";
$min_price = isset($_GET['min_price']) ? $_GET['min_price'] : "";

// Xây dựng truy vấn SQL với JOIN
$sql = "SELECT sp.*, tl.tenTheLoai 
        FROM b01_sanPham sp 
        LEFT JOIN b01_theLoai tl ON sp.maTheLoai = tl.maTheLoai 
        WHERE 1=1";

if (!empty($category)) {
    $sql .= " AND sp.maTheLoai = '" . $database->real_escape_string($category) . "'";
}

if (!empty($min_price)) {
    $sql .= " AND sp.giaBan >= " . intval($min_price);
}

if (!empty($max_price)) {
    $sql .= " AND sp.giaBan <= " . intval($max_price);
}

$result = $database->query($sql);

if (!$result) {
    die(json_encode(["error" => "Lỗi SQL: " . $database->error]));
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Trả về JSON
header('Content-Type: application/json');
echo json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
