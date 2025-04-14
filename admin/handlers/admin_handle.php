<?php
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
        $admin = $result->fetch_assoc();
        if (password_verify($password, $admin['matKhau'])) {
            return $admin;
        } else {
            return false;
        }
    } else {
        return false;
    }

    $stmt->close();
}

function getAdminInfoByUsername($database, $username)
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
