<?php
include '../../admin/config/config.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    $sql = "SELECT sp.*, tl.tenTheLoai, nxb.tenNhaXuatBan 
            FROM b01_sanPham sp 
            JOIN b01_theLoai tl ON sp.maTheLoai = tl.maTheLoai 
            JOIN b01_nhaXuatBan nxb ON nxb.maNhaXuatBan = sp.maNhaXuatBan 
            WHERE sp.maSach = ?";
            
    $stmt = $database->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo "<div class='container-fluid product-detail'>
                <div class='row h-100'>
                    <div class='col-md-6 product-detail-image'>
                        <img src='/Images/{$row['hinhAnh']}' class='img-fluid' alt='{$row['tenSach']}'>
                    </div>
                    <div class='col-md-6 product-detail-info'>
                        <h5 class='product-title fw-bold mb-3'>{$row['tenSach']}</h5>
                        <div class='product-info'>
                            <p class='mb-2'><strong>Thể loại:</strong> {$row['tenTheLoai']}</p>
                            <p class='mb-2'><strong>Tác giả:</strong> {$row['tacGia']}</p>
                            <p class='mb-2'><strong>Nhà xuất bản:</strong> {$row['tenNhaXuatBan']}</p>
                            <p class='mb-3'><strong>Giá:</strong> <span class='text-danger fw-bold'>" . number_format($row['giaBan'], 0, ',', '.') . " đ</span></p>
                            <div class='product-description'>
                                <p><strong>Mô tả:</strong></p>
                                <div class='description-content'>{$row['moTa']}</div>
                            </div>
                            <button class='btn btn-success add-to-cart-detail w-100'>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
            </div>";
    } else {
        echo "<div class='alert alert-warning'>Không tìm thấy sản phẩm.</div>";
    }
    
    $stmt->close();
} else {
    echo "<div class='alert alert-danger'>Yêu cầu không hợp lệ.</div>";
}

$database->close();
?>