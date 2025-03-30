<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chọn Phương Thức Thanh Toán</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <!-- FONT AWESOME  -->
  <link rel="stylesheet" href="../css/fontawesome-free/css/all.min.css">
  <!-- CSS  -->
  <link rel="stylesheet" href="../css/sanpham.css">
  <link rel="stylesheet" href="../css/thanhtoan.css">
</head>

<body>
  <!-- Header -->
  <header class="text-white py-3">
    <div class="container">
      <nav class="navbar navbar-expand-md">
        <div class="navbar-brand logo">
          <a href="../nguoidung/indexuser.php" class="d-flex align-items-center">
            <img src="../Images/LogoSach.png" alt="logo" style="width: 100px; height: 57px;">
          </a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a href="../nguoidung/indexuser.php" class="nav-link fw-bold text-white">TRANG CHỦ</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
            </li>
            <li class="nav-item">
              <a href="../sanpham/sanpham-user.php" class="nav-link fw-bold text-white">SẢN PHẨM</a>
            </li>
          </ul>
          <form class="d-flex me-auto">
            <input class="form-control me-2" type="text" id="timkiem" placeholder="Tìm sách">
            <button class="btn btn-outline-light" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a href="../index.php" class="nav-link fw-bold text-white">ĐĂNG XUẤT</a>
            </li>
            <li class="nav-item">
              <div>
                <a href="../nguoidung/user.php"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                <span id="profile-name" style="top: 20px; padding: 2px; display: none;">Nguyễn Văn A</span>
              </div>
            </li>
          </ul>
          <a href="/giohang/giohangnguoidung.php" class="nav-link text-white">
            <div class="cart-icon">
              <i class="fas fa-shopping-basket" style="color: yellow;"></i>
              <span class="">0</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  </header>

  <!-- PHẦN CHỌN PHƯƠNG THỨC THANH TOÁN -->
  <section class="payment_container my-4">
    <div class="payment__content row justify-content-center">
      <div class="payment__content__left col-12 col-md-8 col-lg-6 d-flex flex-column">
        <h3>Chọn Phương Thức Thanh Toán</h3>
        <form class="payment--form d-flex flex-column gap-3" id="form-payment" method="post" onsubmit="return validateForm()">
          <fieldset>
            <legend>Phương thức thanh toán</legend>
            <label>Chọn phương thức:</label>
            <div class="btn-group d-flex flex-column" id="payment__method" role="group" aria-label="Basic radio toggle button group">
              <!-- Visa/Mastercard -->
              <div class="payment-option">
                <input type="radio" name="btnradio" id="btnradio1" value="visa" autocomplete="off">
                <label class="btn d-flex align-items-center" for="btnradio1">
                  <img src="../Images/visa.png" class="w-12" alt="Visa">
                  <span class="ms-2">Visa/Mastercard</span>
                </label>
              </div>
              <!-- Ví Momo -->
              <div class="payment-option">
                <input type="radio" name="btnradio" id="btnradio2" value="momo" autocomplete="off">
                <label class="btn d-flex align-items-center" for="btnradio2">
                  <img src="../Images/momo.png" class="w-12" alt="Momo">
                  <span class="ms-2">Ví Momo</span>
                </label>
              </div>
              <!-- Tiền mặt -->
              <div class="payment-option">
                <input type="radio" name="btnradio" id="btnradio3" value="cash" autocomplete="off" checked>
                <label class="btn d-flex align-items-center" for="btnradio3">
                  <div class="cash-icon"><i class="fas fa-money-bill"></i></div>
                  <span class="ms-2">Tiền mặt</span>
                </label>
              </div>
            </div>
          </fieldset>

          <!-- Thông tin chi tiết theo phương thức được chọn -->
          <div id="visa-form" class="payment-detail-form" style="display: none;">
            <div class="card p-3 shadow-sm">
              <h4 class="mb-3">Thông tin thẻ Visa/Mastercard</h4>
              <div class="mb-3">
                <label for="card-number" class="form-label">Số thẻ:</label>
                <input type="text" id="card-number" class="form-control" placeholder="Nhập số thẻ">
                <span class="form-message" id="error-card-number"></span>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="card-expiry" class="form-label">Ngày hết hạn:</label>
                  <input type="text" id="card-expiry" class="form-control" placeholder="MM/YY">
                  <span class="form-message" id="error-card-expiry"></span>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="card-cvv" class="form-label">Mã CVV:</label>
                  <input type="text" id="card-cvv" class="form-control" placeholder="Mã CVV">
                  <span class="form-message" id="error-card-cvv"></span>
                </div>
              </div>
              <div class="mb-3">
                <label for="card-name" class="form-label">Tên trên thẻ:</label>
                <input type="text" id="card-name" class="form-control" placeholder="Tên trên thẻ">
                <span class="form-message" id="error-card-name"></span>
              </div>
              <div class="mb-3">
                <label for="billing-address" class="form-label">Địa chỉ thanh toán:</label>
                <input type="text" id="billing-address" class="form-control" placeholder="Địa chỉ thanh toán">
                <span class="form-message" id="error-billing-address"></span>
              </div>
            </div>
          </div>

          <div id="momo-form" class="payment-detail-form" style="display: none;">
            <div class="card p-3 shadow-sm">
              <h4 class="mb-3">Thông tin Ví Momo</h4>
              <div class="mb-3">
                <label for="momo-number" class="form-label">Số điện thoại:</label>
                <input type="text" id="momo-number" class="form-control" placeholder="Nhập số điện thoại liên kết">
                <span class="form-message" id="error-momo-number"></span>
              </div>
              <div class="mb-3">
                <label for="momo-name" class="form-label">Tên tài khoản Momo:</label>
                <input type="text" id="momo-name" class="form-control" placeholder="Tên tài khoản Momo">
                <span class="form-message" id="error-momo-name"></span>
              </div>
            </div>
          </div>

          <!-- Nút Thanh toán -->
          <button class="payment--button btn btn-primary" type="submit">Thanh toán</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="text-white py-4">
    <div class="container">
      <div class="row pb-4 footer__bar">
        <div class="col-md-12 d-flex justify-content-between fw-bold align-items-center footer__connect">
          <p>Thời gian mở cửa: <span>07h30 - 21h30 mỗi ngày</span></p>
          <div class="d-flex">
            <p>Kết nối với chúng tôi:</p>
            <a href="#" class="text-white ms-3">
              <i class="fab fa-facebook-square"></i>
            </a>
            <a href="#" class="text-white ms-3">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center align-items-center footer__bar">
        <div class="col-md-4">
          <div class="logo">
            <a href="../index.php" class="d-flex align-items-center">
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

  <!-- Payment Success Modal (nếu cần) -->
  <div class="modal fade" id="successModal" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-success text-white d-flex justify-content-center">
          <div class="icon__success">
            <p>&#10003;</p>
          </div>
        </div>
        <div class="modal-body text-center">
          <h4 class="modal-title">Tuyệt vời!</h4>
          <p style="font-size: 20px;">Bạn đã chọn phương thức thanh toán thành công</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="../js/bootstrap.bundle.min.js"></script>
  <script>
    // Hàm validateForm: kiểm tra nếu đã chọn phương thức thanh toán.
    function validateForm() {
      const paymentMethods = document.getElementsByName('btnradio');
      let isPaymentMethodSelected = false;

      for (const method of paymentMethods) {
        if (method.checked) {
          isPaymentMethodSelected = true;
          break;
        }
      }

      if (!isPaymentMethodSelected) {
        alert('Vui lòng chọn phương thức thanh toán.');
        return false;
      }

      // Chuyển hướng sang trang hoaDon.php
      window.location.href = "hoaDon.php";
      return false; // Ngăn submit form mặc định
    }

    // Xử lý hiển thị form chi tiết theo lựa chọn
    document.getElementById('btnradio1').addEventListener('change', function () {
      document.getElementById('visa-form').style.display = 'block';
      document.getElementById('momo-form').style.display = 'none';
    });
    document.getElementById('btnradio2').addEventListener('change', function () {
      document.getElementById('visa-form').style.display = 'none';
      document.getElementById('momo-form').style.display = 'block';
    });
    document.getElementById('btnradio3').addEventListener('change', function () {
      document.getElementById('visa-form').style.display = 'none';
      document.getElementById('momo-form').style.display = 'none';
    });
  </script>
</body>

</html>
