<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$database = "webbansach";

// Kết nối MySQL
$conn = new mysqli($servername, $username, $password, $database, 3300);
$conn->set_charset("utf8mb4");
if ($conn->connect_error) {
    die("Lỗi kết nối: " . $conn->connect_error);
}

// Nhận tham số lọc từ URL
$dateStart = $_GET['dateStart'] ?? '';
$dateEnd = $_GET['dateEnd'] ?? '';
$city = $_GET['city'] ?? '';
$district = $_GET['district'] ?? '';
$status = $_GET['status'] ?? '';

// Xây dựng câu truy vấn SQL
$sql = "SELECT dh.*, nd.* FROM b01_donhang dh
        JOIN b01_nguoidung nd ON dh.tenNguoiDung = nd.tenNguoiDung
        WHERE 1=1";

$params = [];
if (!empty($dateStart)) {
    $sql .= " AND dh.ngayTao >= ?";
    $params[] = $dateStart;
}
if (!empty($dateEnd)) {
    $sql .= " AND dh.ngayTao <= ?";
    $params[] = $dateEnd;
}
if (!empty($city)) {
    $sql .= " AND dh.tinhThanh = ?";
    $params[] = $city;
}
if (!empty($district)) {
    $sql .= " AND dh.quanHuyen = ?";
    $params[] = $district;
}
if (!empty($status) && $status !== "Tất cả đơn hàng") {
    $sql .= " AND dh.trangThai = ?";
    $params[] = $status;
}

// Chuẩn bị và thực thi truy vấn
$stmt = $conn->prepare($sql);
if ($params) {
    $stmt->bind_param(str_repeat('s', count($params)), ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

// Trả dữ liệu JSON
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
