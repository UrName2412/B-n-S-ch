<?php
session_start();
require '../../config/config.php';
$soDienThoaiPattern = '/^0\d{9,10}$/';


if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $updates = [];
    $values = [];
    $types = "";

    $tenNguoiDung = $_POST['tenNguoiDung'];
    $vaiTro = $_POST['vaiTro'];
    $stmt = $database->prepare("SELECT * FROM b01_nguoiDung where tenNguoiDung = ? AND vaiTro = ?");
    $stmt->bind_param("si",$tenNguoiDung,$vaiTro);
    $stmt->execute();
    $result = $stmt->get_result();
    $duLieuCu = $result->fetch_assoc();
    $stmt->close();

    $duLieuMoi = [
        'soDienThoai' => $_POST['soDienThoai'],
        'email' => $_POST['email'],
        'tinhThanh' => $_POST['tinhThanh'],
        'quanHuyen' => $_POST['quanHuyen'],
        'xa' => $_POST['xa'],
        'duong' => $_POST['duong']
    ];

    foreach ($duLieuMoi as $truongDuLieu => $giaTriMoi) {
        if ($giaTriMoi != $duLieuCu[$truongDuLieu]) {
            $updates[] = "$truongDuLieu = ?";
            $values[] = $giaTriMoi;
    
            if (preg_match($soDienThoaiPattern, $giaTriMoi)){
                $types .= "s";
            } elseif (is_int($giaTriMoi)) {
                $types .= "i";
            } else {
                $types .= "s";
            }
        }
    }
    
    
    if (!empty($updates)) {
        $sql = "UPDATE b01_nguoiDung SET " . implode(", ", $updates) . " WHERE tenNguoiDung = ? AND vaiTro = ?";
        $stmt = $database->prepare($sql);
        
        $values[] = $tenNguoiDung;
        $values[] = $vaiTro;
        $types .= "si";
    
        $stmt->bind_param($types, ...$values);
        $stmt->execute();
        $stmt->close();
        if ($vaiTro){
            $_SESSION['thongBaoSua'] = "Cập nhật thành công thông tin người quản trị.";
        } else {
            $_SESSION['thongBaoSua'] = "Cập nhật thành công thông tin người dùng.";
        }
    } else {
        $_SESSION['thongBaoSua'] = "Không có thay đổi nào được thực hiện.";
    }
    
}

header('Location: ../../page/nguoidung.php');
exit();
?>
