<?php
include '../../admin/config/config.php';

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);

    $sql = "SELECT sp.*, tl.tenTheLoai FROM `b01_sanpham` sp 
            JOIN `b01_theloai` tl ON sp.maTheLoai = tl.maTheLoai 
            WHERE sp.maSach = $id";
    $result = $database->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<div>
                <img src='../Images/demenphieuluuki.jpg' width='100%' alt='{$row['tenSach']}' />
                <h5>{$row['tenSach']}</h5>
                <p><b>Thể loại:</b> {$row['tenTheLoai']}</p>
                <p><b>Giá bán:</b> " . number_format($row['giaBan'], 0, ',', '.') . " đ</p>
                <p><b>Mô tả:</b> {$row['moTa']}</p>
                <button class='btn btn-success'>Thêm vào giỏ hàng</button>
              </div>";
    } else {
        echo "<p>Không tìm thấy sản phẩm.</p>";
    }
}
?>
