<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();


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

if (isset($_SESSION['user'])) {
  $user = $_SESSION['user'];
  $tinhThanhUser = $user['tinhThanh'];
  $quanHuyenUser = $user['quanHuyen'];
  $xaUser = $user['xa'];
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
              <a href="../sanpham/gioithieu_user.php" class="nav-link fw-bold text-white">GIỚI THIỆU</a>
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
                    <li class="dropdownList"><a href="../dangky/dangxuat.php" class="dropdown-item">Đăng xuất</a></li>
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
      <form class="payment--form d-flex flex-column gap-3" id="payment-form" method="post" onsubmit="return validateForm()">
        <fieldset>
          <legend>Thông tin giao hàng</legend>

          <!-- Sử dụng thông tin mặc định -->
          <div class="d-flex flex-row">
  <input type="checkbox"
    id="default-info-checkbox"
    style="width: fit-content;"
    onchange="toggleDefaultInfo()"
    data-ten="<?= htmlspecialchars($user['tenNguoiDung'] ?? '') ?>"
    data-sdt="<?= htmlspecialchars($user['soDienThoai'] ?? '') ?>"
    data-duong="<?= htmlspecialchars($user['duong'] ?? '') ?>"
    data-xa="<?= htmlspecialchars($user['xa'] ?? '') ?>"
    data-huyen="<?= htmlspecialchars($user['quanHuyen'] ?? '') ?>"
    data-tinh="<?= htmlspecialchars($user['tinhThanh'] ?? '') ?>"
  >
  <label for="default-info-checkbox" style="width: fit-content;">Sử dụng thông tin mặc định</label>
</div>

          <!-- Họ tên -->
          <div>
            <label for="name-user"><i class="fas fa-user"></i> Tên người nhận<span style="color: red;">*</span></label>
            <input type="text" id="name-user" name="name-user" class="user-info" value="<?= htmlspecialchars($user['tenNguoiDung'] ?? '') ?>" placeholder="Tên người nhận hàng" required>
            <span class="form-message"></span>
          </div>

          <!-- Điện thoại -->
          <div>
            <label for="phone-user"><i class="fas fa-phone-volume"></i> Điện thoại <span style="color: red;">*</span></label>
            <input type="tel" id="phone-user" name="phone-user" class="user-info" value="<?= htmlspecialchars($user['soDienThoai'] ?? '') ?>" placeholder="Số điện thoại người nhận hàng" required>
            <span class="form-message"></span>
          </div>

          <!-- Địa chỉ -->
<div class="mb-3 d-flex gap-3">
  <!-- Tỉnh/Thành phố -->
  <div class="w-33">
    <label class="form-label" for="province">Tỉnh/Thành phố <span style="color: red;">*</span></label>
    <select class="form-select" id="province" name="province" onchange="loadDistricts()">
      <option value="">Chọn tỉnh/thành phố</option>
      <?php
      $jsonProvinces = file_get_contents("../vender/apiAddress/province.json");
      $provinces = json_decode($jsonProvinces, true);
      foreach ($provinces as $prov) {
        $selected = (isset($province) && $province == $prov['code']) ? "selected" : "";
        echo "<option value='{$prov['code']}' $selected>{$prov['name']}</option>";
      }
      ?>
    </select>
  </div>

  <!-- Quận/Huyện -->
  <div class="w-33">
    <label class="form-label" for="district">Quận/Huyện <span style="color: red;">*</span></label>
    <select class="form-select" id="district" name="district" onchange="loadWards()">
      <option value="">Chọn quận/huyện</option>
      <?php
      if (!empty($province)) {
        $jsonDistricts = file_get_contents("../vender/apiAddress/district.json");
        $districts = json_decode($jsonDistricts, true);
        foreach ($districts as $dist) {
          if ($dist['province_code'] == $province) {
            $selected = ($district == $dist['code']) ? "selected" : "";
            echo "<option value='{$dist['code']}' $selected>{$dist['name']}</option>";
          }
        }
      }
      ?>
    </select>
  </div>

  <!-- Xã/Phường -->
  <div class="w-33">
    <label class="form-label" for="ward">Xã/Phường <span style="color: red;">*</span></label>
    <select class="form-select" id="ward" name="ward">
      <option value="">Chọn xã/phường</option>
      <?php
      if (!empty($district)) {
        $jsonWards = file_get_contents("../vender/apiAddress/ward.json");
        $wards = json_decode($jsonWards, true);
        foreach ($wards as $wardItem) {
          if ($wardItem['district_code'] == $district) {
            $selected = ($ward == $wardItem['code']) ? "selected" : "";
            echo "<option value='{$wardItem['code']}' $selected>{$wardItem['name']}</option>";
          }
        }
      }
      ?>
    </select>
  </div>
</div>

          <!-- Địa chỉ cụ thể (số nhà, tên đường) -->
          <div>
            <label for="payment--adr"><i class="fas fa-map-marker-alt"></i> Số nhà, tên đường <span style="color: red;">*</span></label>
            <input type="text" id="payment--adr" name="payment--adr" class="user-info"
              value="<?= htmlspecialchars($user['duong'] ?? '') ?>"
              placeholder="nhập địa chỉ cụ thể" required>
            <span class="form-message"></span>
          </div>

          <!-- Ghi chú -->
          <div>
            <label for="payment--note"><i class="far fa-comment"></i> Ghi chú</label>
            <textarea id="payment--note" name="payment--note" rows="3" placeholder="Ghi yêu cầu của bạn tại đây."></textarea>
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
  document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("payment-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 


      if (validateForm()) {  
        const nameUser = document.getElementById('name-user').value.trim();
        const phoneUser = document.getElementById('phone-user').value.trim();
        const paymentAdr = document.getElementById('payment--adr').value.trim();
        const paymentNote = document.getElementById('payment--note').value.trim();
        const paymentMethod = document.querySelector('input[name="phuongThuc"]:checked').value;

        const redirectUrl = `confirm_order.php?name=${encodeURIComponent(nameUser)}&phone=${encodeURIComponent(phoneUser)}&address=${encodeURIComponent(paymentAdr)}&note=${encodeURIComponent(paymentNote)}&method=${encodeURIComponent(paymentMethod)}`;
        console.log("Redirecting to:", redirectUrl);

        // Chuyển hướng sau khi form hợp lệ
        window.location.href = redirectUrl;
      } 
    });
  }

  // Xử lý ẩn/hiện form theo phương thức thanh toán
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
});

// Hàm kiểm tra form
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

  const paymentMethod = document.querySelector('input[name="phuongThuc"]:checked').value;

  if (paymentMethod === "visa") {
    const cardNumber = document.getElementById("card-number").value.trim();
    const cardExpiry = document.getElementById("card-expiry").value.trim();
    const cardCVV = document.getElementById("card-cvv").value.trim();

    if (!cardNumber || !cardExpiry || !cardCVV) {
      alert("Vui lòng nhập đầy đủ thông tin thẻ Visa!");
      return false; 
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Số thẻ Visa không hợp lệ.");
      return false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
      alert("Ngày hết hạn thẻ không hợp lệ.");
      return false;
    }

    if (!/^\d{3}$/.test(cardCVV)) {
      alert("CVV không hợp lệ.");
      return false;
    }
  }

  if (paymentMethod === "momo") {
    const momoNumber = document.getElementById("momo-number").value.trim();
    if (!momoNumber || !/^0\d{9}$/.test(momoNumber)) {
      alert("Số điện thoại Momo không hợp lệ!");
      return false;
    }
  }

  const nameUser = document.getElementById('name-user').value.trim();
  const phoneUser = document.getElementById('phone-user').value.trim();
  const paymentAdr = document.getElementById('payment--adr').value.trim();

  if (!nameUser || !phoneUser || !paymentAdr) {
    alert("Vui lòng điền đầy đủ thông tin giao hàng.");
    return false; 
  }

  return true; 
}

</script>
<script type="module" src="../asset/js/thanhtoan.js"></script>


</body>

</html>