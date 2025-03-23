<?php

require '../config/config.php';

if ($_SERVER['REQUEST_METHOD'] == "POST"){
    $username = $_POST["username"];
    $password = $_POST["password"];
    $phone = $_POST["phone"];
    $address = $_POST["address"];
    $role = (bool)$_POST["role"];
    $status = true;

    $stmt = $database->prepare("INSERT INTO nguoidung(tenNguoiDung, matKhau, vaiTro, trangThai) VALUES (?,?,?,?)");
    $stmt->bind_param("ssii",$username,$password,$role,$status);
    $stmt->execute();
    $lastId = $stmt->insert_id;
    $stmt->close();

    $stmt = $database->prepare("INSERT INTO nguoidung_diachi(diaChi, idNguoiDung) VALUES (?,?)");
    $stmt->bind_param("si",$address,$lastId);
    $stmt->execute();
    $stmt->close();
    $database->close();
}

?>