<?php
function getUsername($database, $username)
{
    $stmt = $database->prepare("SELECT * FROM b01_nguoiDung WHERE tenNguoiDung = ?");
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

function getUserInfoByUsername($database, $username)
{
    $stmt = $database->prepare("SELECT * FROM b01_nguoiDung WHERE tenNguoiDung = ?");
    if ($stmt === false) {
        die('MySQL prepare error: ' . $database->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }

    return null;
}


function getEmail($database, $email)
{
    $stmt = $database->prepare("SELECT * FROM b01_nguoiDung WHERE email = ?");
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

function addUser($database, $username, $email, $password, $address, $phone, $province, $district, $ward)
{
    $role = false;
    $status = true;

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $database->prepare("INSERT INTO b01_nguoiDung (tenNguoiDung, matKhau, soDienThoai, email, tinhThanh, quanHuyen, xa, duong, vaiTro, trangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ssssssssii", $username, $hashedPassword, $phone, $email, $province, $district, $ward, $address, $role, $status);

    $success = $stmt->execute();

    $stmt->close();

    return $success;
}

function checkLogin($database, $username, $password)
{
    $stmt = $database->prepare("SELECT * FROM b01_nguoiDung WHERE tenNguoiDung = ?");
    if ($stmt === false) {
        die('MySQL prepare error: ' . $database->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['matKhau'])) {
            return $user;
        } else {
            return false;
        }
    } else {
        return false;
    }

    $stmt->close();
}

function updateUser($database, $username, $address, $phone, $province, $district, $ward)
{
    $stmt = $database->prepare("UPDATE b01_nguoiDung
    SET soDienThoai = ?, tinhThanh = ?, quanHuyen = ?, xa = ?, duong = ?
    WHERE tenNguoiDung = ?");

    if ($stmt === false) {
        die('MySQL prepare error: ' . $database->error);
    }

    $stmt->bind_param("ssssss", $phone, $province, $district, $ward, $address, $username);

    $stmt->execute();

    $stmt->close();
}
