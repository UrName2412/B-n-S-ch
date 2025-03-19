<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <!-- FONT AWESOME  -->
    <link rel="stylesheet" href="../css/fontawesome-free/css/all.min.css">
    <!-- CSS  -->
    <link rel="stylesheet" href="../css/index-user.css">
    <link rel="stylesheet" href="../css/user.css">
    <link rel="stylesheet" href="../css/lichSuMuaHang.css">
</head>

<body>
    <!-- Header -->
    <header class="text-white py-3">
        <div class="container">
            <nav class="navbar navbar-expand-md">
                <div class="navbar-brand logo">
                    <a href="indexuser.php" class="d-flex align-items-center">
                        <img src="../Images/LogoSach.png" alt="logo" width="100" height="57">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="indexuser.php" class="nav-link fw-bold" style="color: white ;">TRANG CHỦ</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
                        </li>
                        <li class="nav-item">
                            <a href="../sanpham/sanpham-user.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
                        </li>
                    </ul>
                    <form id="searchForm" class="d-flex me-auto">
                        <input class="form-control me-2" type="text" id="timkiem" placeholder="Tìm sách">
                        <button class="btn btn-outline-light" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <script>
                        document.getElementById('searchForm').addEventListener('submit', function (event) {
                            event.preventDefault();
                            const inputValue = document.getElementById('timkiem').value.trim();

                            if (inputValue) {
                                window.location.href = '../nguoidung/timkiem.php';
                            } else {
                                alert('Vui lòng nhập nội dung tìm kiếm!');
                            }
                        });
                    </script>
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a href="../index.php" class="nav-link fw-bold text-white">ĐĂNG XUẤT</a>
                        </li>
                        <li class="nav-item">
                            <div>
                                <a href="user.php"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                                <span id="profile-name" style="top: 20px; padding: 2px; display: none;">Nguyễn Văn
                                    A</span>
                            </div>
                        </li>
                    </ul>
                    <a href="../giohang/giohangnguoidung.php" class="nav-link text-white">
                        <div class="cart-icon">
                            <i class="fas fa-shopping-basket"></i>
                            <span class="">0</span>
                        </div>
                    </a>
                </div>
            </nav>
        </div>
    </header>
    <!-- Main -->
    <main class="container my-4">
        <div class="main-profile row padding-0">
            <!-- Main profile -->
            <div class="list col-3">
                <ul class="list-unstyled">
                    <a href="user.php">
                        <li class="list-item">Hồ sơ</li>
                    </a>
                    <a href="lichSuMuaHang.php">
                        <li class="list-item" style="background-color: #DFE1E5;">Lịch sử mua hàng</li>
                    </a>
                </ul>
            </div>
            <div class="col-9">
                <div class="product_container">
                    <div class="order-title">
                        <p>Đơn Hàng 1</p>
                        <p>Ngày nhận hàng: 24/12/2023</p>
                    </div>
                    <div>
                        <div class="product_info">
                            <img src="../Images/tuduynguoc.jpg" alt="Tư duy ngược">
                            <div class="product_detail1">
                                <h5>Tư duy ngược</h5>
                                <p>x1</p>
                            </div>
                            <div class="product_detail2">
                                <p>80.000đ</p>
                            </div>
                        </div>
                        <div class="product_info">
                            <img src="../Images/stopoverthinking.jpg" alt="Stop Overthinking">
                            <div class="product_detail1">
                                <h5>Stop Overthinking</h5>
                                <p>x2</p>
                            </div>
                            <div class="product_detail2">
                                <p>85.000đ</p>
                            </div>
                        </div>
                    </div>
                    <div class="total">
                        <p>Tổng tiền: <span>250.000đ</span></p>
                    </div>
                </div>

                <div class="product_container">
                    <div class="order-title">
                        <p>Đơn Hàng 2</p>
                        <p>Ngày nhận hàng: 15/11/2023</p>
                    </div>
                    <div>
                        <div class="product_info">
                            <img src="../Images/tuduymo.jpg" alt="Tư duy mở">
                            <div class="product_detail1">
                                <h5>Tư duy mở</h5>
                                <p>x1</p>
                            </div>
                            <div class="product_detail2">
                                <p>80.000đ</p>
                            </div>
                        </div>
                        <div class="product_info">
                            <img src="../Images/conduongchangmayaidi.jpg" alt="Con đường chẳng mấy ai đi">
                            <div class="product_detail1">
                                <h5>Con đường chẳng mấy ai đi</h5>
                                <p>x3</p>
                            </div>
                            <div class="product_detail2">
                                <p>90.000đ</p>
                            </div>
                        </div>
                    </div>
                    <div class="total">
                        <p>Tổng tiền: <span>350.000đ</span></p>
                    </div>
                </div>

                <div class="product_container">
                    <div class="order-title">
                        <p>Đơn Hàng 3</p>
                        <p>Ngày nhận hàng: 05/10/2023</p>
                    </div>
                    <div>
                        <div class="product_info">
                            <img src="../Images/saochungtalaingu.jpg" alt="Sao chúng ta lại ngủ">
                            <div class="product_detail1">
                                <h5>Sao chúng ta lại ngủ</h5>
                                <p>x2</p>
                            </div>
                            <div class="product_detail2">
                                <p>195.000đ</p>
                            </div>
                        </div>
                        <div class="product_info">
                            <img src="../Images/muonkiepnhansinh.jpg" alt="Muôn kiếp nhân sinh">
                            <div class="product_detail1">
                                <h5>Muôn kiếp nhân sinh</h5>
                                <p>x1</p>
                            </div>
                            <div class="product_detail2">
                                <p>125.000đ</p>
                            </div>
                        </div>
                    </div>
                    <div class="total">
                        <p>Tổng tiền: <span>515.000đ</span></p>
                    </div>
                </div>

                <div class="product_container">
                    <div class="order-title">
                        <p>Đơn Hàng 4</p>
                        <p>Ngày nhận hàng: 20/09/2023</p>
                    </div>
                    <div>
                        <div class="product_info">
                            <img src="../Images/muonkiepnhansinh.jpg" alt="Muôn kiếp nhân sinh">
                            <div class="product_detail1">
                                <h5>Muôn kiếp nhân sinh</h5>
                                <p>x1</p>
                            </div>
                            <div class="product_detail2">
                                <p>125.000đ</p>
                            </div>
                        </div>
                        <div class="product_info">
                            <img src="../Images/cuoccachmangglucose.jpg" alt="Cuộc cách mạng Glucose">
                            <div class="product_detail1">
                                <h5>Cuộc cách mạng Glucose</h5>
                                <p>x2</p>
                            </div>
                            <div class="product_detail2">
                                <p>120.000đ</p>
                            </div>
                        </div>
                    </div>
                    <div class="total">
                        <p>Tổng tiền: <span>365.000đ</span></p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- Footer -->
    <footer class="text-white py-4">
        <div class="container">
            <div class="row pb-4 footer__bar">
                <div class="col-md-12 d-flex justify-content-between fw-bold align-items-center footer__connect">
                    <p>Thời gian mở cửa: <span>07h30 - 21h30 mỗi ngày</span></p>
                    <div class="d-flex">
                        <p>Kết nối với chúng tôi:</p>
                        <a href="https://www.facebook.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-facebook-square"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" class="text-white ms-3">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center footer__bar">
                <div class="col-md-4">
                    <div class="logo">
                        <a href="indexuser.php" class="d-flex align-items-center">
                            <img src="../Images/LogoSach.png" alt="logo" width="100" height="57">
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div>
                        <p class="mb-1">Hotline: 1900 0000</p>
                        <p class="mb-1">Email: nhasach@gmail.com</p>
                        <p>&copy; 2024 Công ty TNHH Nhà sách</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <ul class="list list-unstyled">
                        <li class="list-item">
                            <a href="#" class="text-white">Tuyển dụng</a>
                        </li>
                        <li class="list-item">
                            <a href="#" class="text-white">Chính sách giao hàng</a>
                        </li>
                        <li class="list-item">
                            <a href="#" class="text-white">Điều khoản và điều kiện</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row footer__bar">
                <div class="col-md-12">
                    <ul class="list-unstyled">
                        <li>Chi nhánh 1: 273 An Dương Vương, Phường 3, Quận 5, TP. Hồ Chí Minh</li>
                        <li>Chi nhánh 2: 105 Bà Huyện Thanh Quan, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</li>
                        <li>Chi nhánh 3: 4 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    <!-- Bootstrap JS -->
    <script src="../js/bootstrap.bundle.min.js"></script>
</body>

</html>