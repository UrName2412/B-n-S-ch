<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'admin/config/config.php';

if (!isset($database)) {
    die(json_encode(["error" => "Lỗi kết nối cơ sở dữ liệu."]));
}

$category = isset($_GET['category']) ? $_GET['category'] : "";
$max_price = isset($_GET['max_price']) ? $_GET['max_price'] : "";
$min_price = isset($_GET['min_price']) ? $_GET['min_price'] : "";

// Xây dựng truy vấn SQL
$sql = "SELECT * FROM b01_sanPham WHERE 1=1";

if (!empty($category)) {
    $sql .= " AND maTheLoai = '" . $database->real_escape_string($category) . "'";
}

if (!empty($min_price)) {
    $sql .= " AND giaBan >= " . intval($min_price);
}

if (!empty($max_price)) {
    $sql .= " AND giaBan <= " . intval($max_price);
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
