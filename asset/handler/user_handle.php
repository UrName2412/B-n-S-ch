<?php
function getUsername($database, $username) {
    $stmt = $database->prepare("SELECT * FROM b01_nguoidung WHERE tenNguoiDung = ?");
    if ($stmt === false) {
        die('MySQL prepare error: ' . $database->error);
    }
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }

    return array();
}

function getEmail($database, $email) {
    $stmt = $database->prepare("SELECT * FROM b01_nguoidung WHERE email = ?");
    if ($stmt === false) {
        die('MySQL prepare error: ' . $database->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }

    return array();
}

function addUser($database, $username, $email, $password, $address, $phone, $province, $district, $ward) {
    $role = false;
    $status = true;

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $database->prepare("INSERT INTO b01_nguoidung (tenNguoiDung, matKhau, soDienThoai, email, tinhThanh, quanHuyen, xa, duong, vaiTro, trangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ssssssssii", $username, $hashedPassword, $phone, $email, $province, $district, $ward, $address, $role, $status);

    $success = $stmt->execute();

    $stmt->close();

    return $success;
}
