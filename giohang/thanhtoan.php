<?php
require '../admin/config/config.php';
require '../asset/handler/user_handle.php';
session_start();


if (isset($_SESSION['username']) && (isset($_SESSION['role']) && $_SESSION['role'] == false)) {
  $username = $_SESSION['username'];
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

$user1 = getUserInfoByUsername($database, $username);

if ($user1['trangThai'] == false) {
    echo "<script>alert('Tài khoản của bạn đã bị khóa!'); window.location.href='../dangky/dangxuat.php';</script>";
    exit();
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
              <input type="checkbox" checked
                id="default-info-checkbox"
                style="width: fit-content;"
                onchange="toggleDefaultInfo()"
                data-ten="<?= htmlspecialchars($user['tenNguoiDung'] ?? '') ?>"
                data-sdt="<?= htmlspecialchars($user['soDienThoai'] ?? '') ?>"
                data-duong="<?= htmlspecialchars($user['duong'] ?? '') ?>"
                data-xa="<?= htmlspecialchars($user['xa'] ?? '') ?>"
                data-huyen="<?= htmlspecialchars($user['quanHuyen'] ?? '') ?>"
                data-tinh="<?= htmlspecialchars($user['tinhThanh'] ?? '') ?>">
              <label for="default-info-checkbox" style="width: fit-content;">Sử dụng thông tin mặc định</label>
            </div>

            <!-- Họ tên -->
            <div>
              <label for="name-user"><i class="fas fa-user"></i> Tên người nhận<span style="color: red;">*</span></label>
              <input type="text" id="name-user" name="name-user" class="user-info" value="<?= htmlspecialchars($user['tenNguoiDung'] ?? '') ?>" placeholder="Tên người nhận hàng">
              <span class="form-message name-user-message"></span>
            </div>

            <!-- Điện thoại -->
            <div>
              <label for="phone-user"><i class="fas fa-phone-volume"></i> Điện thoại <span style="color: red;">*</span></label>
              <input type="tel" id="phone-user" name="phone-user" class="user-info" value="<?= htmlspecialchars($user['soDienThoai'] ?? '') ?>" placeholder="Số điện thoại người nhận hàng">
              <span class="form-message phone-user-message"></span>
            </div>

            <!-- Địa chỉ -->
            <div class="mb-3 d-flex gap-3">
              <!-- Tỉnh/Thành phố -->
              <div class="w-33">
                <label class="form-label" for="province">Tỉnh/Thành phố <span style="color: red;">*</span></label>
                <select class="form-select" id="province" name="province">
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
                <span class="form-message province-message"></span>
              </div>

              <!-- Quận/Huyện -->
              <div class="w-33">
                <label class="form-label" for="district">Quận/Huyện <span style="color: red;">*</span></label>
                <select class="form-select" id="district" name="district">
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
                <span class="form-message district-message"></span>
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
                <span class="form-message ward-message"></span>
              </div>
            </div>

            <!-- Địa chỉ cụ thể (số nhà, tên đường) -->
            <div>
              <label for="payment--adr"><i class="fas fa-map-marker-alt"></i> Số nhà, tên đường <span style="color: red;">*</span></label>
              <input type="text" id="payment--adr" name="payment--adr" class="user-info"
                value="<?= htmlspecialchars($user['duong'] ?? '') ?>"
                placeholder="nhập địa chỉ cụ thể">
              <span class="form-message payment-adr-message"></span>
            </div>

            <!-- Ghi chú -->
            <div>
              <label for="payment--note"><i class="far fa-comment"></i> Ghi chú</label>
              <textarea id="payment--note" name="payment--note" rows="3" placeholder="Ghi yêu cầu của bạn tại đây."></textarea>
              <span class="form-message payment-note-message"></span>
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
                <span class="card-number-message" style="display: none;"></span>
                <span class="card-expiry-message" style="display: none;"></span>
                <span class="card-cvv-message" style="display: none;"></span>
              </div>

              <!-- Ví Momo -->
              <div class="payment-option">
                <input type="radio" name="phuongThuc" id="btnradio2" value="momo" autocomplete="off">
                <label class="btn d-flex align-items-center" for="btnradio2">
                  <img src="../Images/momo.png" class="w-12" alt="Momo">
                  <span class="ms-2">Ví Momo</span>
                </label>
                <span class="momo-number-message" style="display: none;"></span>
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
                <span class="card-number-message text-danger" style="display: none;"></span>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="card-expiry" class="form-label">Ngày hết hạn:</label>
                  <input type="text" id="card-expiry" class="form-control" placeholder="MM/YY">
                  <span class="card-expiry-message text-danger" style="display: none;"></span>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="card-cvv" class="form-label">Mã CVV:</label>
                  <input type="text" id="card-cvv" class="form-control" placeholder="Mã CVV">
                  <span class="card-cvv-message text-danger" style="display: none;"></span>
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
                <span class="momo-number-message text-danger" style="display: none;"></span>
              </div>
            </div>
          </div>



          <button type="submit" class="btn btn-primary">Tiếp tục</button>
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
    document.addEventListener("DOMContentLoaded", function() {
      const form = document.getElementById("payment-form");

      if (form) {
        form.addEventListener("submit", function(e) {
          e.preventDefault();

          if (validateForm()) {
            const nameUser = document.getElementById('name-user').value.trim();
            const phoneUser = document.getElementById('phone-user').value.trim();
            const paymentAdr = document.getElementById('payment--adr').value.trim();
            const paymentNote = document.getElementById('payment--note').value.trim();
            const paymentMethod = document.querySelector('input[name="phuongThuc"]:checked').value;
            const province = document.getElementById('province').value.trim();
            const district = document.getElementById('district').value.trim();
            const ward = document.getElementById('ward').value.trim();

            const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");

            const formData = new FormData();
            formData.append('name', nameUser);
            formData.append('phone', phoneUser);
            formData.append('address', paymentAdr);
            formData.append('note', paymentNote);
            formData.append('method', paymentMethod);
            formData.append('province', province);
            formData.append('district', district);
            formData.append('ward', ward);
            formData.append('cart', JSON.stringify(cart));

            fetch('confirm_order.php', {
              method: 'POST',
              body: formData
            }).then(response => {
              if (response.redirected) {
                window.location.href = response.url;
              } else {
                return response.text();
              }
            }).then(data => {
              if (data) alert(data);
            }).catch(error => {
              alert("Lỗi kết nối: " + error);
            });
          }
        });
      }

      // Xử lý ẩn/hiện form theo phương thức thanh toán
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
    });
  </script>

  <script>
    function validateForm() {
      let isValid = true;

      const paymentMethods = document.getElementsByName('phuongThuc');
      let isPaymentMethodSelected = false;

      for (const method of paymentMethods) {
        if (method.checked) {
          isPaymentMethodSelected = true;
          break;
        }
      }

      const paymentMethodMessage = document.querySelector('.payment-method-message');
      if (!isPaymentMethodSelected) {
        if (paymentMethodMessage) {
          paymentMethodMessage.textContent = 'Vui lòng chọn phương thức thanh toán.';
          paymentMethodMessage.style.display = 'block';
        }
        isValid = false;
      } else {
        if (paymentMethodMessage) {
          paymentMethodMessage.textContent = '';
          paymentMethodMessage.style.display = 'none';
        }
      }

      const selectedMethod = document.querySelector('input[name="phuongThuc"]:checked').value;

      document.querySelectorAll('.card-number-message, .card-expiry-message, .card-cvv-message, .momo-number-message')
        .forEach(span => {
          span.style.display = 'none';
          span.textContent = '';
        });

      if (selectedMethod === 'visa') {
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('card-expiry').value.trim();
        const cvv = document.getElementById('card-cvv').value.trim();

        let valid = true;

        const cardNumberMessage = document.querySelector('#visa-form .card-number-message');
        const cardExpiryMessage = document.querySelector('#visa-form .card-expiry-message');
        const cardCvvMessage = document.querySelector('#visa-form .card-cvv-message');

        if (!/^\d{16}$/.test(cardNumber)) {
          cardNumberMessage.textContent = 'Số thẻ Visa không hợp lệ phải đủ 16 số.';
          cardNumberMessage.style.display = 'block';
          valid = false;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
          cardExpiryMessage.textContent = 'Ngày hết hạn thẻ không hợp lệ.';
          cardExpiryMessage.style.display = 'block';
          valid = false;
        }

        if (!/^\d{3}$/.test(cvv)) {
          cardCvvMessage.textContent = 'CVV không hợp lệ.';
          cardCvvMessage.style.display = 'block';
          valid = false;
        }

        if (!valid) {
          isValid = false;
        }
      } else if (selectedMethod === 'momo') {
        const momoNumber = document.getElementById('momo-number').value.trim();
        const momoMessage = document.querySelector('#momo-form .momo-number-message');

        if (!/^0\d{9}$/.test(momoNumber)) {
          momoMessage.textContent = 'Số điện thoại Momo không hợp lệ.';
          momoMessage.style.display = 'block';
          isValid = false;
        }
      }

      const nameUser = document.getElementById('name-user');
      const nameUserMessage = document.querySelector('.name-user-message');
      if (nameUser.value.trim() === '') {
        nameUserMessage.textContent = 'Vui lòng nhập tên người nhận!';
        nameUserMessage.style.display = 'block';
        isValid = false;
      } else {
        nameUserMessage.textContent = '';
        nameUserMessage.style.display = 'none';
      }

      const phoneUser = document.getElementById('phone-user');
      const phoneUserMessage = document.querySelector('.phone-user-message');
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(phoneUser.value.trim())) {
        phoneUserMessage.textContent = 'Số điện thoại không hợp lệ!';
        phoneUserMessage.style.display = 'block';
        isValid = false;
      } else {
        phoneUserMessage.textContent = '';
        phoneUserMessage.style.display = 'none';
      }

      const province = document.getElementById('province');
      const provinceMessage = document.querySelector('.province-message');
      if (province.value === '') {
        provinceMessage.textContent = 'Vui lòng chọn tỉnh/thành phố!';
        provinceMessage.style.display = 'block';
        isValid = false;
      } else {
        provinceMessage.textContent = '';
        provinceMessage.style.display = 'none';
      }

      const district = document.getElementById('district');
      const districtMessage = document.querySelector('.district-message');
      if (district.value === '') {
        districtMessage.textContent = 'Vui lòng chọn quận/huyện!';
        districtMessage.style.display = 'block';
        isValid = false;
      } else {
        districtMessage.textContent = '';
        districtMessage.style.display = 'none';
      }

      const ward = document.getElementById('ward');
      const wardMessage = document.querySelector('.ward-message');
      if (ward.value === '') {
        wardMessage.textContent = 'Vui lòng chọn xã/phường!';
        wardMessage.style.display = 'block';
        isValid = false;
      } else {
        wardMessage.textContent = '';
        wardMessage.style.display = 'none';
      }

      const paymentAdr = document.getElementById('payment--adr');
      const paymentAdrMessage = document.querySelector('.payment-adr-message');
      if (paymentAdr.value.trim() === '') {
        paymentAdrMessage.textContent = 'Vui lòng nhập địa chỉ cụ thể!';
        paymentAdrMessage.style.display = 'block';
        isValid = false;
      } else {
        paymentAdrMessage.textContent = '';
        paymentAdrMessage.style.display = 'none';
      }

      const paymentNote = document.getElementById('payment--note');
      const paymentNoteMessage = document.querySelector('.payment-note-message');
      if (paymentNote.value.length > 200) {
        paymentNoteMessage.textContent = 'Ghi chú không được vượt quá 200 ký tự!';
        paymentNoteMessage.style.display = 'block';
        isValid = false;
      } else {
        paymentNoteMessage.textContent = '';
        paymentNoteMessage.style.display = 'none';
      }

      return isValid;
    }
  </script>



  <script type="module" src="../asset/js/thanhtoan.js"></script>


</body>

</html>