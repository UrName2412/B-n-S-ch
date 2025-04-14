<?php
session_start();
include('../admin/config/config.php');
require '../asset/handler/user_handle.php';
session_start();

if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
    $username = $_SESSION['username'];
} elseif (isset($_COOKIE['username']) && isset($_COOKIE['pass'])) {
    $username = $_COOKIE['username'];
    $password = $_COOKIE['pass'];

    if (checkLogin($database, $username, $password)) {
        $_SESSION['username'] = $username;
    } else {
        echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../dangky/dangnhap.php';</script>";
        exit();
    }
} else {
    echo "<script>alert('Bạn chưa đăng nhập!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
}

// Kiểm tra giỏ hàng và thông tin giao hàng
if (!isset($_SESSION['user']) || !isset($_SESSION['order_info']) || !isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    echo "Không có thông tin đơn hàng.";
    exit;
}

$orderInfo = $_SESSION['order_info'];
$user = $_SESSION['user'];
$cart = $_SESSION['cart'];

// Khi người dùng xác nhận
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tenNguoiNhan = $orderInfo['tenNguoiNhan'];
    $soDienThoai = $orderInfo['soDienThoai'];
    $ghiChu = $orderInfo['ghiChu'];
    $tenNguoiDung = $user['tenNguoiDung'];

    // Tách địa chỉ
    $fullAddress = $orderInfo['diaChi'];
    // Tạm thời tách đơn giản: bạn nên xử lý rõ hơn theo cấu trúc tỉnh, huyện, xã
    $tinhThanh = $quanHuyen = $xa = $duong = "";
    $duong = $fullAddress; // Đơn giản hóa

    $tongTien = 0;
    foreach ($cart as $item) {
        $tongTien += $item['giaBan'] * $item['soLuong'];
    }

    $ngayTao = date('Y-m-d H:i:s');
    $tinhTrang = 'Chờ xác nhận';

    // Insert vào bảng `b01_donhang`
    $sql_donhang = "INSERT INTO b01_donhang (tenNguoiNhan, soDienThoai, ngayTao, tinhThanh, quanHuyen, xa, duong, tongTien, tinhTrang, ghiChu, tenNguoiDung)
                    VALUES ('$tenNguoiNhan', '$soDienThoai', '$ngayTao', '$tinhThanh', '$quanHuyen', '$xa', '$duong', $tongTien, '$tinhTrang', '$ghiChu', '$tenNguoiDung')";

    if (mysqli_query($database, $sql_donhang)) {
        $maDon = mysqli_insert_id($database); // Lấy ID đơn hàng mới

        // Thêm vào bảng `b01_chitiethoadon`
        foreach ($cart as $item) {
            $maSach = $item['maSach'];
            $giaBan = $item['giaBan'];
            $soLuong = $item['soLuong'];

            $sql_ct = "INSERT INTO b01_chitiethoadon (maSach, maDon, giaBan, soLuong)
                       VALUES ('$maSach', '$maDon', '$giaBan', '$soLuong')";
            mysqli_query($database, $sql_ct);
        }

        // Xóa giỏ hàng và order_info
        unset($_SESSION['cart']);
        unset($_SESSION['order_info']);

        header("Location: order_success.php?maDon=$maDon");
        exit;
    } else {
        echo "Lỗi khi tạo đơn hàng: " . mysqli_error($database);
    }
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Xác nhận đơn hàng</title>
    <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
</head>

<body class="container py-4">

    <h2>Xác nhận đơn hàng</h2>
    <h4>Thông tin người nhận</h4>
    <ul>
        <li><strong>Họ tên:</strong> <?= htmlspecialchars($orderInfo['tenNguoiNhan']) ?></li>
        <li><strong>SĐT:</strong> <?= htmlspecialchars($orderInfo['soDienThoai']) ?></li>
        <li><strong>Địa chỉ:</strong> <?= htmlspecialchars($orderInfo['diaChi']) ?></li>
        <li><strong>Ghi chú:</strong> <?= htmlspecialchars($orderInfo['ghiChu']) ?></li>
    </ul>

    <h4>Danh sách sản phẩm</h4>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Sách</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $tong = 0;
            foreach ($cart as $item):
                $thanhTien = $item['giaBan'] * $item['soLuong'];
                $tong += $thanhTien;
            ?>
                <tr>
                    <td><?= htmlspecialchars($item['tenSach']) ?></td>
                    <td><?= number_format($item['giaBan'], 0, ',', '.') ?> đ</td>
                    <td><?= $item['soLuong'] ?></td>
                    <td><?= number_format($thanhTien, 0, ',', '.') ?> đ</td>
                </tr>
            <?php endforeach; ?>
            <tr>
                <td colspan="3" class="text-end"><strong>Tổng tiền:</strong></td>
                <td><strong><?= number_format($tong, 0, ',', '.') ?> đ</strong></td>
            </tr>
        </tbody>
    </table>

    <form method="POST">
        <button class="btn btn-success" type="submit">Xác nhận đặt hàng</button>
        <a href="thanhtoan.php" class="btn btn-secondary">Quay lại</a>
    </form>

</body>

</html>