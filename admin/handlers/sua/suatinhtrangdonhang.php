<?php
session_start();
require '../../config/config.php';


if ($_SERVER['REQUEST_METHOD'] == "POST") {
   if (isset($_POST['tinhTrang']) && isset($_POST['maDon'])){
        $stmt = $database->prepare("UPDATE b01_donHang SET tinhTrang = ? WHERE maDon = ?");
        $stmt->bind_param('si',$_POST['tinhTrang'] ,$_POST['maDon']);
        $stmt->execute();
        $stmt->close();
        $_SESSION["thongBaoSua"] = "Đã cập nhật tình trạng đơn hàng.";
   }
}

header('Location: ../../page/donhang.php');
exit();
?>
