// ---------------------
// Định nghĩa Validator
// ---------------------
function Validator(options) {
  const formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      const inputElement = formElement.querySelector(rule.selector);
      const errorElement = inputElement.parentElement.querySelector('.form-message');

      if (inputElement) {
        // Xử lý sự kiện blur
        inputElement.onblur = () => {
          const errorMessage = rule.test(inputElement.value);
          if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.classList.add('is-invalid');
          } else {
            errorElement.innerText = '';
            inputElement.classList.remove('is-invalid');
          }
        };

        // Xử lý sự kiện nhập liệu (clear lỗi)
        inputElement.oninput = () => {
          errorElement.innerText = '';
          inputElement.classList.remove('is-invalid');
        };
      }
    });
  }
}

Validator.isRequired = (selector) => {
  return {
    selector: selector,
    test: (value) => (value.trim() ? undefined : 'Vui lòng nhập trường này!')
  };
};

Validator.isPhone = (selector) => {
  return {
    selector: selector,
    test: (value) => {
      const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
      return phoneRegex.test(value) ? undefined : 'Số điện thoại không hợp lệ!';
    }
  };
};

// ---------------------
// Các đoạn mã khác
// ---------------------
let cartQuantity = [];
const iconCartSpan = document.querySelector('.cart-icon span');

const loadFromsessionStorage = () => {
  const storedCart = sessionStorage.getItem('cart');
  cartQuantity = storedCart ? JSON.parse(storedCart) : [];
  updateTotal();
};

const updateTotal = () => {
  const totalQuantity = cartQuantity.reduce((acc, item) => acc + item.quantity, 0);
  iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : '99+';
};

loadFromsessionStorage();

document.addEventListener("DOMContentLoaded", function () {


  // Định nghĩa hàm validateForm và gán vào window
  function validateForm() {
    const nameValue = document.getElementById('name-user').value.trim();
    const phoneValue = document.getElementById('phone-user').value.trim();
    const adrValue = document.getElementById('payment--adr').value.trim();

    if (!nameValue || !phoneValue || !adrValue) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return false;
    }
    return true;
  }
  window.validateForm = validateForm; // Cho phép gọi từ HTML

  // Xử lý khi submit form: nếu thông tin hợp lệ thì chuyển hướng đến trang chọn phương thức thanh toán
  const orderForm = document.querySelector("#form-add");
  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        // Chuyển hướng đến trang chọn phương thức thanh toán
        window.location.href = "chonPhuongThucThanhToan.php";
      }
    });
  }

  // Gán sự kiện cho checkbox (chỉ gán một lần)
  const defaultCheckbox = document.getElementById('default-info-checkbox');
  if (defaultCheckbox) {
    defaultCheckbox.addEventListener('change', toggleDefaultInfo);
  }

  // Khởi tạo trạng thái form ban đầu
  toggleDefaultInfo();

  // Kích hoạt Validator với các quy tắc kiểm tra
  Validator({
    form: '#form-add',
    rules: [
      Validator.isRequired('#name-user'),
      Validator.isRequired('#phone-user'),
      Validator.isPhone('#phone-user'),
      Validator.isRequired('#payment--adr')
    ],
  });
});
