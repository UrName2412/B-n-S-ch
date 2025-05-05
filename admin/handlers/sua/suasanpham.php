<?php
session_start();
require '../../config/config.php';

function xuLyTenFileKhongTrung($originalName, $uploads_dir) {
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

if ($_SERVER['REQUEST_METHOD'] !== "POST" || empty($_POST)) {
    header('Location: ../../page/sanpham.php');
    exit();
}

$maSach = $_POST['maSach'];

$stmt = $database->prepare("SELECT * FROM b01_sanPham WHERE maSach = ?");
$stmt->bind_param("i", $maSach);
$stmt->execute();
$result = $stmt->get_result();
$duLieuCu = $result->fetch_assoc();
$stmt->close();

// Dữ liệu mới
$duLieuMoi = [
    "tenSach" => $_POST['tenSach'],
    "tacGia" => $_POST['tacGia'],
    "maTheLoai" => $_POST['theLoai'],
    "maNhaXuatBan" => $_POST['nhaXuatBan'],
    "giaBan" => $_POST['giaBan'],
    "soTrang" => $_POST['soTrang'],
    "moTa" => $_POST['moTa']
];

// Kiểm tra ảnh upload
if (isset($_FILES['hinhAnh']) && $_FILES['hinhAnh']['error'] === UPLOAD_ERR_OK) {
    $uploads_dir = '../../../Images/';
    $tname = $_FILES["hinhAnh"]["tmp_name"];
    $pname = xuLyTenFileKhongTrung($_FILES["hinhAnh"]["name"], $uploads_dir);
    $upload_path = $uploads_dir . $pname;

    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true);
    }
    if (!is_writable($uploads_dir)) {
        chmod($uploads_dir, 0777);
    }

    if (move_uploaded_file($tname, $upload_path)) {
        if (!empty($duLieuCu['hinhAnh'])) {
            $anhCuPath = $uploads_dir . $duLieuCu['hinhAnh'];
            if (file_exists($anhCuPath)) {
                unlink($anhCuPath);
            }
        }
        $duLieuMoi['hinhAnh'] = $pname;
    } else {
        $_SESSION["liDo"] = "Lỗi khi tải lên file ảnh.";
        header('Location: ../../page/sanpham.php');
        exit();
    }
    
}

$updates = [];
$values = [];
$types = "";
foreach ($duLieuMoi as $truong => $giaTriMoi) {
    if (!isset($duLieuCu[$truong]) || (string)$giaTriMoi !== (string)$duLieuCu[$truong]) {
        $updates[] = "$truong = ?";
        $values[] = $giaTriMoi;
        $types .= is_numeric($giaTriMoi) ? "i" : "s";
    }
}

if (!empty($updates)) {
    $sql = "UPDATE b01_sanPham SET " . implode(", ", $updates) . " WHERE maSach = ?";
    $stmt = $database->prepare($sql);
    $values[] = $maSach;
    $types .= "i";
    $stmt->bind_param($types, ...$values);
    $stmt->execute();
    $stmt->close();
    $_SESSION["thongBaoSua"] = "Đã sửa thành công sản phẩm.";
} else {
    $_SESSION["thongBaoSua"] = "Không có thay đổi nào được thực hiện.";
}

$database->close();
header('Location: ../../page/sanpham.php');
exit();
?>
