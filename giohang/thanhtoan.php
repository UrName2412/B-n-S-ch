<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();


if (!isset($_SESSION['user'])) {
  echo "Bạn chưa đăng nhập.";

if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
  $username = $_SESSION['username'];
} elseif (isset($_COOKIE['username']) && isset($_COOKIE['pass'])) {
  $username = $_COOKIE['username'];
  $password = $_COOKIE['pass'];

  if (checkLogin($database, $username, $password)) {
    $_SESSION['username'] = $username;
  } else {
    echo "<script>alert('Bạn cần đăng nhập để tiếp tục thanh toán!'); window.location.href='../dangky/dangnhap.php';</script>";
    exit();
  }
} else {
  echo "<script>alert('Bạn cần đăng nhập để tiếp tục thanh toán!'); window.location.href='../dangky/dangnhap.php';</script>";

  exit();
}

$user = $_SESSION['user'];

// Kiểm tra trạng thái đăng nhập 
if (!isset($_SESSION['username'])) {
  if (isset($_COOKIE['username']) && isset($_COOKIE['pass'])) {
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
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanh Toán</title>
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="../vender/css/bootstrap.min.css">
  <!-- FONT AWESOME  -->
  <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
  <!-- CSS  -->
  <link rel="stylesheet" href="../asset/css/sanpham.css">
  <link rel="stylesheet" href="../asset/css/thanhtoan.css">
  <link rel="stylesheet" href="../asset/css/index-user.css">
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
          <form id="searchForm" class="d-flex me-auto" method="GET" action="nguoidung/timkiem.php">
            <input class="form-control me-2" type="text" id="timkiem" name="tenSach" placeholder="Tìm sách">
            <button class="btn btn-outline-light" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </form>
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <div class="d-flex gap-2">
                <a href="../nguoidung/user.php" class="mt-2"><i class="fas fa-user" id="avatar" style="color: black;"></i></a>
                <span class="mt-1" id="profile-name" style="top: 20px; padding: 2px;"><?php echo $user['tenNguoiDung']; ?></span>
                <div class="dropdown">
                  <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                  <ul class="dropdown-menu">
                    <li class="dropdownList"><a class="dropdown-item" href="../nguoidung/user.php">Thông tin tài khoản</a></li>
                    <?php if (isset($_SESSION['username'])): ?>
                      <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item">Đăng xuất</a></li>
                    <?php endif; ?>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <a href="giohangnguoidung.php" class="nav-link text-white">
            <div class="cart-icon">
              <i class="fas fa-shopping-basket" style="color: yellow;"></i>
              <span class="">0</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  </header>

   <!-- PHẦN NHẬP THÔNG TIN ĐẶT HÀNG (GIAO HÀNG) -->
   <section class="payment_container my-4">
    <div class="payment__content row justify-content-center">
      <div class="payment__content__left col-12 col-md-8 col-lg-6 d-flex flex-column">
        <h3>Thông tin giao hàng</h3>
        <form class="payment--form d-flex flex-column gap-3" id="form-add" method="post"
          onsubmit="return validateForm()">
          <fieldset>
            <legend>Thông tin giao hàng</legend>
            <!-- Sử dụng thông tin mặc định -->
            <div class="d-flex flex-row">
              <input type="checkbox" id="default-info-checkbox" style="width: fit-content;" checked
                onchange="toggleDefaultInfo()">
              <label for="default-info-checkbox" style="width: fit-content;">Sử dụng thông tin mặc định</label>
            </div>
            <!-- Họ tên -->
            <div>
              <label for="name-user"><i class="fas fa-user"></i> Tên người nhận<span style="color: red;">*</span></label>
              <input type="text" id="name-user" name="name-user" class="user-info" value="<?= htmlspecialchars($user['tenNguoiDung'] ?? '') ?>" placeholder="Tên người nhận hàng"
                required>
              <span class="form-message"></span>
            </div>
            <!-- Điện thoại -->
            <div>
              <label for="phone-user"><i class="fas fa-phone-volume"></i> Điện thoại <span
                  style="color: red;">*</span></label>
              <input type="tel" id="phone-user" name="phone-user" class="user-info" value="<?= htmlspecialchars($user['soDienThoai'] ?? '') ?>"
                placeholder="Số điện thoại người nhận hàng" required>
              <span class="form-message"></span>
            </div>
            <!-- Địa chỉ -->
            <div>
              <label for="payment--adr"><i class="far fa-address-card"></i> Địa chỉ <span
                  style="color: red;">*</span></label>
              <input type="text" id="payment--adr" class="user-info" value="<?= htmlspecialchars($user['duong'] ?? '') ?>, <?= htmlspecialchars($user['xa'] ?? '') ?>, <?= htmlspecialchars($user['quanHuyen'] ?? '') ?>, <?= htmlspecialchars($user['tinhThanh'] ?? '') ?>" name="payment--adr"
                placeholder="Địa chỉ nhận hàng" required>
              <span class="form-message"></span>
            </div>
            <!-- Ghi chú -->
            <div>
              <label for="payment--note"><i class="far fa-comment"></i> Ghi chú</label>
              <textarea id="payment--note" name="payment--note" rows="3"
                placeholder="Ghi yêu cầu của bạn tại đây."></textarea>
              <span class="form-message"></span>
            </div>
          </fieldset>

          <fieldset>
            <legend>Phương thức thanh toán</legend>
            <label>Chọn phương thức:</label>
            <div class="btn-group d-flex flex-column" id="payment__method" role="group" aria-label="Basic radio toggle button group">
              <!-- Visa/Mastercard -->
              <div class="payment-option">
                <input type="radio" name="phuongThuc" id="btnradio1" value="visa" autocomplete="off">
                <label class="btn d-flex align-items-center" for="btnradio1">
                  <img src="../Images/visa.png" class="w-12" alt="Visa">
                  <span class="ms-2">Visa/Mastercard</span>
                </label>
              </div>
              <!-- Ví Momo -->
              <div class="payment-option">
                <input type="radio" name="phuongThuc" id="btnradio2" value="momo" autocomplete="off">
                <label class="btn d-flex align-items-center" for="btnradio2">
                  <img src="../Images/momo.png" class="w-12" alt="Momo">
                  <span class="ms-2">Ví Momo</span>
                </label>
              </div>
              <!-- Tiền mặt -->
              <div class="payment-option">
                <input type="radio" name="phuongThuc" id="btnradio3" value="cash" autocomplete="off" checked>
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
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="card-expiry" class="form-label">Ngày hết hạn:</label>
                  <input type="text" id="card-expiry" class="form-control" placeholder="MM/YY">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="card-cvv" class="form-label">Mã CVV:</label>
                  <input type="text" id="card-cvv" class="form-control" placeholder="Mã CVV">
                </div>
              </div>
            </div>
          </div>

          <div id="momo-form" class="payment-detail-form" style="display: none;">
            <div class="card p-3 shadow-sm">
              <h4 class="mb-3">Thông tin Ví Momo</h4>
              <div class="mb-3">
                <label for="momo-number" class="form-label">Số điện thoại:</label>
                <input type="text" id="momo-number" class="form-control" placeholder="Nhập số điện thoại liên kết">
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Tiếp tục</button>
        </form>
      </div>
    </div>
  </section>

  <script src="../vender/js/bootstrap.bundle.min.js"></script>
  <script src="../asset/js/thanhtoan.js"></script>

  <script>
    function toggleDefaultInfo() {
      const defaultCheckbox = document.getElementById('default-info-checkbox');
      if (!defaultCheckbox) return;
      const isChecked = defaultCheckbox.checked;
      const nameUser = document.getElementById('name-user');
      const phoneUser = document.getElementById('phone-user');
      const paymentAdr = document.getElementById('payment--adr');
      const paymentNote = document.getElementById('payment--note');

      nameUser.disabled = isChecked;
      phoneUser.disabled = isChecked;
      paymentAdr.disabled = isChecked;

      if (!isChecked) {
        nameUser.value = '';
        phoneUser.value = '';
        paymentAdr.value = '';
        paymentNote.value = '';
      } else {
        nameUser.value = "<?= htmlspecialchars($user['tenNguoiDung'] ?? '') ?>";
        phoneUser.value = "<?= htmlspecialchars($user['soDienThoai'] ?? '') ?>";
        paymentAdr.value = "<?= htmlspecialchars($user['duong'] ?? '') ?>, <?= htmlspecialchars($user['xa'] ?? '') ?>, <?= htmlspecialchars($user['quanHuyen'] ?? '') ?>, <?= htmlspecialchars($user['tinhThanh'] ?? '') ?>";
      }
    }
    window.toggleDefaultInfo = toggleDefaultInfo;
  </script>

  <script>
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const inputValue = document.getElementById('timkiem').value.trim();

      if (inputValue) {
        window.location.href = '/B-n-S-ch/nguoidung/timkiem.php?tenSach=' + encodeURIComponent(inputValue);
      } else {
        alert('Vui lòng nhập nội dung tìm kiếm!');
      }
    });
  </script>

<script>
function validateForm() {
    const paymentMethods = document.getElementsByName('phuongThuc');
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

    // Lấy thông tin người dùng và đơn hàng
    const nameUser = document.getElementById('name-user').value;
    const phoneUser = document.getElementById('phone-user').value;
    const paymentAdr = document.getElementById('payment--adr').value;
    const paymentNote = document.getElementById('payment--note').value;
    const paymentMethod = document.querySelector('input[name="phuongThuc"]:checked').value;

    // Thêm các tham số vào URL chuyển hướng 
    window.location.href = `confirm_order.php?name=${encodeURIComponent(nameUser)}&phone=${encodeURIComponent(phoneUser)}&address=${encodeURIComponent(paymentAdr)}&note=${encodeURIComponent(paymentNote)}&method=${encodeURIComponent(paymentMethod)}`;

    return false;  
}


    // Xử lý hiển thị form chi tiết theo lựa chọn
    document.getElementById('btnradio1').addEventListener('change', function() {
      document.getElementById('visa-form').style.display = 'block';
      document.getElementById('momo-form').style.display = 'none';
    });
    document.getElementById('btnradio2').addEventListener('change', function() {
      document.getElementById('visa-form').style.display = 'none';
      document.getElementById('momo-form').style.display = 'block';
    });
    document.getElementById('btnradio3').addEventListener('change', function() {
      document.getElementById('visa-form').style.display = 'none';
      document.getElementById('momo-form').style.display = 'none';
    });
  </script>

</body>

</html>
