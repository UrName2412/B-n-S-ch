<?php
include '../../admin/config/config.php';

// Xử lý phân trang
$productsPerPage = 9;
$currentPage = isset($_GET['page']) ? intval($_GET['page']) : 1;
if ($currentPage < 1) {
    $currentPage = 1;
}
$offset = ($currentPage - 1) * $productsPerPage;

// Truy vấn sản phẩm với LIMIT và OFFSET
$sql = "SELECT sp.*, tl.tenTheLoai 
        FROM `b01_sanPham` sp 
        JOIN `b01_theLoai` tl ON sp.maTheLoai = tl.maTheLoai 
        WHERE sp.trangThai = 1
        LIMIT $productsPerPage OFFSET $offset";
$result = $database->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'maSach' => $row['maSach'],
            'tenSach' => $row['tenSach'],
            'tenTheLoai' => $row['tenTheLoai'],
            'giaBan' => $row['giaBan'],
            'hinhAnh' => $row['hinhAnh']
        ];
    }
}

// Tính tổng số sản phẩm để tạo phân trang
$sqlTotal = "SELECT COUNT(*) AS total FROM `b01_sanPham`";
$resultTotal = $database->query($sqlTotal);
$rowTotal = $resultTotal->fetch_assoc();
$totalProducts = $rowTotal['total'];
$totalPages = ceil($totalProducts / $productsPerPage);

// Trả về dữ liệu dưới dạng JSON
echo json_encode([
    'products' => $products,
    'totalPages' => $totalPages
]);
?>
