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
        echo "<div class='container-fluid'>
                <div class='row'>
                    <div class='col-md-6'>
                        <img src='/B-n-S-ch/Images/demenphieuluuky.jpg' class='img-fluid rounded' alt='{$row['tenSach']}' />
                    </div>
                    <div class='col-md-6'>
                        <h5 class='fw-bold'>{$row['tenSach']}</h5>
                        <p><b>Thể loại:</b> {$row['tenTheLoai']}</p>
                        <p><b>Tác giả:</b> {$row['tacGia']}</p>
                        <p><b>Nhà xuất bản:</b> {$row['tenNhaXuatBan']}</p>
                        <p><b>Giá bán:</b> <span class='text-danger fw-bold'>" . number_format($row['giaBan'], 0, ',', '.') . " đ</span></p>
                        <p><b>Mô tả:</b> {$row['moTa']}</p>
                        <button class='btn btn-success add-to-cart-detail w-100'>Thêm vào giỏ hàng</button>
                    </div>
                </div>
              </div>";
    } else {
        echo "<p>Không tìm thấy sản phẩm.</p>";
    }
}
?>