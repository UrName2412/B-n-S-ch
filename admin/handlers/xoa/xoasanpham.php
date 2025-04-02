<?php
require '../../config/config.php';

header("Content-Type: application/json"); // Bắt buộc để báo cho JS đây là JSON

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $maSach = $_GET['maSach'] ?? null;

    if (!$maSach || !is_numeric($maSach)) {
        echo json_encode(["status" => "error", "message" => "Mã sách không hợp lệ"]);
        exit();
    }

    $stmt = $database->prepare("SELECT trangThai, daBan FROM b01_sanpham WHERE maSach = ?");
    $stmt->bind_param("i", $maSach);
    $stmt->execute();
    $result = $stmt->get_result();
    $sanPham = $result->fetch_assoc();
    $stmt->close();

    if ($sanPham['daBan']) {
        $newTrangThai = ($sanPham['trangThai']) ? 0 : 1;
        $stmt = $database->prepare("UPDATE b01_sanpham SET trangThai = ? WHERE maSach = ?");
        $stmt->bind_param("ii", $newTrangThai, $maSach);
        $stmt->execute();
        $stmt->close();
        echo json_encode(["status" => "success", "message" => ($newTrangThai) ? "Đã khôi phục sản phẩm." : "Đã ẩn sản phẩm.", "trangThai" => $newTrangThai]);
    } else {
        $stmt = $database->prepare("DELETE FROM b01_sanpham WHERE maSach = ?");
        $stmt->bind_param("i", $maSach);
        $stmt->execute();
        $stmt->close();
        echo json_encode(["status" => "success", "message" => "Đã xóa sản phẩm"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Phương thức không hợp lệ"]);
}

exit();
