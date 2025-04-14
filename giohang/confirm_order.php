<?php
session_start();

require '../admin/config/config.php';

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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tenNguoiNhan = $_SESSION['user']['tenNguoiDung'];
    $soDienThoai = $_SESSION['user']['soDienThoai'];
    $tinhThanh = $_SESSION['user']['tinhThanh'];
    $quanHuyen = $_SESSION['user']['quanHuyen'];
    $xa = $_SESSION['user']['xa'];
    $duong = $_SESSION['user']['duong'];
    $tenNguoiDung = $_SESSION['user']['tenNguoiDung'];
    $ngayTao = date('Y-m-d H:i:s');
    $ghiChu = ''; 
    $tinhTrang = 'Chờ xử lý';

    // Giỏ hàng
    $cart = json_decode($_POST['cart'], true);


    // Tính tổng tiền
    $tongTien = 0;
    foreach ($cart as $item) {
        $giaBan = preg_replace('/[^\d.]/', '', $item['productPrice']);
        $tongTien += $giaBan * $item['quantity'];  
    }

    // 1. Thêm vào bảng `b01_donhang`
    $sql = "INSERT INTO b01_donhang (tenNguoiNhan, soDienThoai, ngayTao, tinhThanh, quanHuyen, xa, duong, tongTien, tinhTrang, ghiChu, tenNguoiDung)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $database->prepare($sql);
    $stmt->bind_param("sssssssssss", $tenNguoiNhan, $soDienThoai, $ngayTao, $tinhThanh, $quanHuyen, $xa, $duong, $tongTien, $tinhTrang, $ghiChu, $tenNguoiDung);


    if ($stmt->execute()) {
        $maDon = $stmt->insert_id; // Lấy mã đơn mới tạo

        // 2. Thêm từng sản phẩm vào `b01_chitiethoadon`
        $sql_ct = "INSERT INTO b01_chitiethoadon (maSach, maDon, giaBan, soLuong) VALUES (?, ?, ?, ?)";
        $stmt_ct = $database->prepare($sql_ct);

    // Insert vào bảng `b01_donhang`
    $sql_donhang = "INSERT INTO b01_donhang (tenNguoiNhan, soDienThoai, ngayTao, tinhThanh, quanHuyen, xa, duong, tongTien, tinhTrang, ghiChu, tenNguoiDung)
                    VALUES ('$tenNguoiNhan', '$soDienThoai', '$ngayTao', '$tinhThanh', '$quanHuyen', '$xa', '$duong', $tongTien, '$tinhTrang', '$ghiChu', '$tenNguoiDung')";

    if (mysqli_query($database, $sql_donhang)) {
        $maDon = mysqli_insert_id($database); // Lấy ID đơn hàng mới


        foreach ($cart as $item) {
            $maSach = $item['productId'];  
            $giaBan = preg_replace('/[^\d.]/', '', $item['productPrice']); 
            $soLuong = $item['quantity']; 
            
            // Binding tham số với kiểu dữ liệu chính xác
            $stmt_ct->bind_param("iidi", $maSach, $maDon, $giaBan, $soLuong);
            
            if (!$stmt_ct->execute()) {
                echo "Lỗi khi thêm chi tiết hóa đơn: " . $stmt_ct->error;
            }
        }

        // Lưu mã đơn vào session
        $_SESSION['maDon'] = $maDon;

        // Chuyển hướng đến trang hoaDon.php
        header("Location: hoaDon.php?maDon=$maDon");
        exit; // Đảm bảo không có mã PHP nào được thực thi sau khi chuyển hướng

    } else {
        echo "Lỗi khi thêm đơn hàng: " . $stmt->error;
    }
}

$name = isset($_GET['name']) ? $_GET['name'] : '';
$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
$address = isset($_GET['address']) ? $_GET['address'] : '';
$note = isset($_GET['note']) ? $_GET['note'] : '';
$paymentMethod = isset($_GET['method']) ? $_GET['method'] : '';
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Xác nhận đơn hàng</title>
    <link rel="stylesheet" href="../asset/css/confirm_order.css">
</head>

<body>
    <div class="container">
        <h2>Xác nhận đơn hàng</h2>


<body class="container py-4">


        <!-- Thông tin người nhận -->
        <div id="thongTinNguoiNhan">
            <p><strong>Người nhận:</strong> <?php echo $_SESSION['user']['tenNguoiDung']; ?></p>
            <p><strong>Địa chỉ:</strong> 
                <?php echo $_SESSION['user']['duong'] . ', ' . $_SESSION['user']['xa'] . ', ' . $_SESSION['user']['quanHuyen'] . ', ' . $_SESSION['user']['tinhThanh']; ?>
            </p>
            <p><strong>Số điện thoại:</strong> <?php echo $_SESSION['user']['soDienThoai']; ?></p>
        </div>


        <div id="hoaDon" style="margin-top: 30px;"></div>

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


        <form action="confirm_order.php" method="post">
        <input type="hidden" name="note" value="<?php echo htmlspecialchars($note); ?>">
        <input type="hidden" name="method" value="<?php echo htmlspecialchars($paymentMethod); ?>">
        <input type="hidden" name="cart" id="cartInput">
            <input type="submit" value="Xác nhận đặt hàng" class="btn btn-success">
        </form>
    </div>

    <script src="../asset/js/confirm_order.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        document.getElementById('cartInput').value = JSON.stringify(cart);
    });
</script>
</body>

</html>