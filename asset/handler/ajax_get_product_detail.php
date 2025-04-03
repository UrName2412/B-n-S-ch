<?php
include '../../admin/config/config.php';

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);

    $sql = "SELECT sp.*, tl.tenTheLoai, nxb.tenNhaXuatBan FROM `b01_sanPham` sp 
            JOIN `b01_theLoai` tl ON sp.maTheLoai = tl.maTheLoai 
            JOIN `b01_nhaXuatBan` nxb ON nxb.`maNhaXuatBan` = sp.`maNhaXuatBan`
            WHERE sp.maSach = $id";
    $result = $database->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<div class=\"col-md-4 mb-4\">
            <div class=\"card\" style=\"width: 100%;\">
            <a href=\"#\" class=\"view-detail\" data-id=\"{$row['maSach']}\">
            <img src=\"Images/demenphieuluuki.jpg\" alt=\"{$row['tenSach']}\" class=\"card-img-top\">
            </a>
            <div class=\"card-body\">
                <h5 class=\"card-title\">{$row['tenSach']}</h5>
                <p class=\"card-text\">Thể loại: {$row['tenTheLoai']}</p>
                <p class=\"card-text text-danger fw-bold\">" . number_format($row['giaBan'], 0, ',', '.') . " đ</p>
                <button class=\"btn\" style=\"background-color: #336799; color: #ffffff;\">Thêm vào giỏ hàng</button>
            </div>
            </div>
        </div>";
    } else {
        echo "<p>Không tìm thấy sản phẩm.</p>";
    }
}
?>