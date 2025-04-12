<?php
session_start();
require '../../config/config.php';

function xuLyTenFileKhongTrung($originalName, $uploads_dir){
    $filename = preg_replace('/[^a-zA-Z0-9-_\.]/', '', basename($originalName));
    $filename = preg_replace('/\s+/', '', $filename);
    $file_parts = pathinfo($filename);
    $base_name = $file_parts['filename'];
    $extension = isset($file_parts['extension']) ? '.' . $file_parts['extension'] : '';

    $newName = $base_name . $extension;
    $dem = 1;

    while (file_exists($uploads_dir . $newName)) {
        $newName = $base_name . "($dem)" . $extension;
        $dem++;
    }

    return $newName;
}
$flag = false;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $tname = $_FILES["hinhAnh"]["tmp_name"];
    $uploads_dir = '../../../Images/';
    $pname = xuLyTenFileKhongTrung($_FILES["hinhAnh"]["name"], $uploads_dir);
    $upload_path = $uploads_dir . $pname;

    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true);
    }
    if (!is_writable($uploads_dir)) {
        chmod($uploads_dir, 0777);
    }

    if (move_uploaded_file($tname, $upload_path)) {
        $hinhAnh = $pname;
        $tenSach = $_POST["tenSach"];
        $tacGia = $_POST["tacGia"];
        $maTheLoai = $_POST["theLoai"];
        $maNhaXuatBan = $_POST["nhaXuatBan"];
        $giaBan = $_POST["giaBan"];
        $soTrang = $_POST["soTrang"];
        $moTa = $_POST["moTa"];
        $trangThai = 1;
        $daBan = 0;


        $stmt = $database->prepare("INSERT INTO b01_sanPham(hinhAnh, tenSach, tacGia, maTheLoai, maNhaXuatBan, giaBan, soTrang, moTa, trangThai, daBan) 
            VALUES (?,?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("sssiiiisii", $hinhAnh, $tenSach, $tacGia, $maTheLoai, $maNhaXuatBan, $giaBan, $soTrang, $moTa, $trangThai, $daBan);
        $stmt->execute();
        $stmt->close();

        $database->close();
        $flag = true;
    } else {
        $_SESSION["liDo"] = "Lỗi khi tải lên file ảnh.";
        header('Location: ../../page/sanpham.php');
        exit();
    }
    if ($flag){
        $_SESSION["thongBaoThem"] = "Đã thêm thành công sản phẩm.";
    }
}




header('Location: ../../page/sanpham.php');
exit();
