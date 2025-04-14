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
  window.validateForm = validateForm;

  const orderForm = document.querySelector("#form-add");
  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm()) {
        const nameUser = document.getElementById('name-user').value.trim();
        const phoneUser = document.getElementById('phone-user').value.trim();
        const adrValue = document.getElementById('payment--adr').value.trim();

        // Chuyển hướng tới confirm_order.php với tham số URL
        const redirectUrl = `confirm_order.php?name=${encodeURIComponent(nameUser)}&phone=${encodeURIComponent(phoneUser)}&address=${encodeURIComponent(adrValue)}`;
        window.location.href = redirectUrl;
      }
    });
  }

  const defaultCheckbox = document.getElementById('default-info-checkbox');
  if (defaultCheckbox) {
    defaultCheckbox.addEventListener('change', toggleDefaultInfo);
  }

  toggleDefaultInfo();

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
