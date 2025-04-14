<?php
session_start();
require '../admin/config/config.php';

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

        <!-- Thông tin người nhận -->
        <div id="thongTinNguoiNhan">
            <p><strong>Người nhận:</strong> <?php echo $_SESSION['user']['tenNguoiDung']; ?></p>
            <p><strong>Địa chỉ:</strong> 
                <?php echo $_SESSION['user']['duong'] . ', ' . $_SESSION['user']['xa'] . ', ' . $_SESSION['user']['quanHuyen'] . ', ' . $_SESSION['user']['tinhThanh']; ?>
            </p>
            <p><strong>Số điện thoại:</strong> <?php echo $_SESSION['user']['soDienThoai']; ?></p>
        </div>

        <div id="hoaDon" style="margin-top: 30px;"></div>

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
