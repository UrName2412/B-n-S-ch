<?php
require '../../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $updates = [];
    $values = [];
    $types = "";

    $maSach = $_POST['maSach'];
    $stmt = $database->prepare("SELECT * FROM b01_sanPham where maSach = ?");
    $stmt->bind_param("i", $maSach);
    $stmt->execute();
    $result = $stmt->get_result();
    $duLieuCu = $result->fetch_assoc();
    $stmt->close();


    $duLieuMoi = [
        "hinhAnh" => $_POST['hinhAnh'],
        "tenSach" => $_POST['tenSach'],
        "tacGia" => $_POST['tacGia'],
        "maTheLoai" => $_POST['theLoai'],
        "maNhaXuatBan" => $_POST['nhaXuatBan'],
        "giaBan" => $_POST['giaBan'],
        "soTrang" => $_POST['soTrang'],
        "moTa" => $_POST['moTa']
    ];
    if ($duLieuMoi['hinhAnh'] ==""){
        $duLieuMoi['hinhAnh'] = $duLieuCu['hinhAnh'];
    }

    foreach ($duLieuMoi as $truongDuLieu => $giaTriMoi) {
        if ($giaTriMoi != $duLieuCu[$truongDuLieu]) {
            $updates[] = "$truongDuLieu = ?";
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
    }
    
}

header('Location: ../../page/sanpham.php');
exit();
?>
