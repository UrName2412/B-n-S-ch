<?php
require '../../config/config.php';

header('Content-Type: application/json; charset=utf-8');
$tinhTrang = 'Đã xác nhận';

if (!isset($_GET['start']) || !isset($_GET['end'])) {
    // Nếu không có start và end, lấy tất cả dữ liệu từ trước đến nay
    $start = '1900-01-01';  // Đặt giá trị mặc định nếu không có tham số ngày
    $end = date('Y-m-d');    // Ngày hiện tại
} else {
    $start = $_GET['start'];
    $end = $_GET['end'];
}


try {
    // Lấy top 5 khách hàng
    $query = "
        SELECT nd.tenNguoiDung, SUM(dh.tongTien) AS totalSpent
        FROM b01_donHang dh
        INNER JOIN b01_nguoiDung nd ON dh.tenNguoiDung = nd.tenNguoiDung
        WHERE dh.ngayTao BETWEEN ? AND ?
        AND dh.tinhTrang = ?
        GROUP BY nd.tenNguoiDung
        ORDER BY totalSpent DESC
        LIMIT 5
    ";
    $stmt = $database->prepare($query);
    $stmt->bind_param('sss', $start, $end, $tinhTrang);
    $stmt->execute();
    $result = $stmt->get_result();
    $topCustomers = [];

    while ($row = $result->fetch_assoc()) {
        // Lấy danh sách đơn hàng cho từng khách
        $orderQuery = "
            SELECT maDon, tongTien, ngayTao
            FROM b01_donHang
            WHERE tenNguoiDung = ?
            AND tinhTrang = ?
            AND ngayTao BETWEEN ? AND ?
            ORDER BY tongTien DESC
        ";
        $orderStmt = $database->prepare($orderQuery);
        $orderStmt->bind_param('ssss', $row['tenNguoiDung'],$tinhTrang, $start, $end);
        $orderStmt->execute();
        $orderResult = $orderStmt->get_result();

        $orders = [];
        while ($order = $orderResult->fetch_assoc()) {
            $orders[] = $order;
        }

        $row['orders'] = $orders;
        $topCustomers[] = $row;
    }

    echo json_encode($topCustomers);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>