<?php
require '../../config/config.php';

header("Content-Type: application/json"); // Bắt buộc để báo cho JS đây là JSON

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $tenNguoiDung = $_GET['tenNguoiDung'] ?? null;
    $vaiTro = $_GET['vaiTro'] ?? null;

    if (!$tenNguoiDung) {
        echo json_encode(["status" => "error", "message" => "Tên người dùng không hợp lệ"]);
        exit();
    }

    $stmt = $database->prepare("SELECT trangThai FROM b01_nguoiDung WHERE tenNguoiDung = ? AND vaiTro = ?");
    $stmt->bind_param("si", $tenNguoiDung,$vaiTro);
    $stmt->execute();
    $result = $stmt->get_result();
    $nguoiDung = $result->fetch_assoc();
    $stmt->close();

    $newTrangThai = ($nguoiDung['trangThai']) ? 0 : 1;
    $stmt = $database->prepare("UPDATE b01_nguoiDung SET trangThai = ? WHERE tenNguoiDung = ? AND vaiTro = ?");
    $stmt->bind_param("isi", $newTrangThai, $tenNguoiDung, $vaiTro);
    $stmt->execute();
    $stmt->close();
    echo json_encode(["status" => "success", "message" => ($newTrangThai) ? "Đã mở khóa người dùng." : "Đã khóa người dùng.", "trangThai" => $newTrangThai]);
} else {
    echo json_encode(["status" => "error", "message" => "Phương thức không hợp lệ"]);
}

exit();
