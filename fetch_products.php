<?php
include 'admin/config/config.php';

$conditions = [];
if (!empty($_POST['tensach'])) {
    $conditions[] = "sp.tenSach LIKE '%" . $database->real_escape_string($_POST['tensach']) . "%'";
}
if (!empty($_POST['tentacgia'])) {
    $conditions[] = "sp.tacGia LIKE '%" . $database->real_escape_string($_POST['tentacgia']) . "%'";
}
if (!empty($_POST['nxb'])) {
    $conditions[] = "sp.nhaXuatBan LIKE '%" . $database->real_escape_string($_POST['nxb']) . "%'";
}
if (!empty($_POST['theloai'])) {
    $conditions[] = "tl.tenTheLoai LIKE '%" . $database->real_escape_string($_POST['theloai']) . "%'";
}
if (!empty($_POST['minPrice'])) {
    $conditions[] = "sp.giaBan >= " . intval($_POST['minPrice']);
}
if (!empty($_POST['maxPrice'])) {
    $conditions[] = "sp.giaBan <= " . intval($_POST['maxPrice']);
}

$whereClause = !empty($conditions) ? "WHERE " . implode(" AND ", $conditions) : "";

$sql = "SELECT sp.*, tl.tenTheLoai 
        FROM `b01_sanpham` sp 
        JOIN `b01_theloai` tl ON sp.maTheLoai = tl.maTheLoai 
        $whereClause 
        LIMIT 6";
$result = $database->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
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
    }
} else {
    echo "<p>Không có sản phẩm nào.</p>";
}
?>
