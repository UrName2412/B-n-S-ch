import { addressHandler } from '../../admin/asset/js/apiAddress.js';
const handler = new addressHandler("province", "district", "ward");
window.toggleDefaultInfo = toggleDefaultInfo;
function toggleDefaultInfo() {
  const defaultCheckbox = document.getElementById('default-info-checkbox');
  if (!defaultCheckbox) return;

  const isChecked = defaultCheckbox.checked;
  const nameUser = document.getElementById('name-user');
  const phoneUser = document.getElementById('phone-user');
  const paymentAdr = document.getElementById('payment--adr');
  const paymentNote = document.getElementById('payment--note');

  const province = defaultCheckbox.getAttribute("data-tinh");
  const district = defaultCheckbox.getAttribute("data-huyen");
  const ward = defaultCheckbox.getAttribute("data-xa");
  const street = defaultCheckbox.getAttribute("data-duong");
  const name = defaultCheckbox.getAttribute("data-ten");
  const phone = defaultCheckbox.getAttribute("data-sdt");

  if (isChecked) {
    nameUser.value = name || "";
    phoneUser.value = phone || "";
    paymentAdr.value = street || "";
    paymentNote.value = "";

    nameUser.disabled = true;
    phoneUser.disabled = true;
    paymentAdr.disabled = true;

    if (handler.provinceSelect) handler.provinceSelect.disabled = true;
    if (handler.districtSelect) handler.districtSelect.disabled = true;
    if (handler.wardSelect) handler.wardSelect.disabled = true;

    if (province && handler.provinceSelect) {
      handler.provinceSelect.value = province;

      const changeEvent = new Event('change');
      handler.provinceSelect.dispatchEvent(changeEvent);

      setTimeout(() => {
        if (district && handler.districtSelect) {
          handler.districtSelect.value = district;

          const districtEvent = new Event('change');
          handler.districtSelect.dispatchEvent(districtEvent);

          setTimeout(() => {
            if (ward && handler.wardSelect) {
              handler.wardSelect.value = ward;

              const wardEvent = new Event('change');
              handler.wardSelect.dispatchEvent(wardEvent);
            }
          }, 100);
        }
      }, 100);
    }
  } else {
    nameUser.value = "";
    phoneUser.value = "";
    paymentAdr.value = "";
    paymentNote.value = "";

    nameUser.disabled = false;
    phoneUser.disabled = false;
    paymentAdr.disabled = false;

    if (handler.provinceSelect) {
      handler.provinceSelect.value = "";
      handler.provinceSelect.disabled = false;
    }

    if (handler.districtSelect) {
      handler.districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
      handler.districtSelect.disabled = false;
    }

    if (handler.wardSelect) {
      handler.wardSelect.innerHTML = '<option value="">Chọn xã/phường</option>';
      handler.wardSelect.disabled = false;
    }
  }
}


document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    toggleDefaultInfo();
  }, 100);
});



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

        inputElement.oninput = () => {
          errorElement.innerText = '';
          inputElement.classList.remove('is-invalid');
        };
      }
    });

    formElement.onsubmit = (event) => {
      event.preventDefault();

      let isValid = true;
      options.rules.forEach((rule) => {
        const inputElement = formElement.querySelector(rule.selector);
        const errorMessage = rule.test(inputElement.value);
        const errorElement = inputElement.parentElement.querySelector('.form-message');

        if (errorMessage) {
          isValid = false;
          errorElement.innerText = errorMessage;
          inputElement.classList.add('is-invalid');
        }
      });

      const selectedPayment = document.querySelector('input[name="phuongThuc"]:checked');
      if (!selectedPayment) {
        alert("Vui lòng chọn phương thức thanh toán.");
        isValid = false;
      } else {
        const method = selectedPayment.value;
        if (method === "visa") {
          const cardNumber = document.getElementById("card-number").value.trim();
          const cardExpiry = document.getElementById("card-expiry").value.trim();
          const cardCVV = document.getElementById("card-cvv").value.trim();
          if (!cardNumber || !cardExpiry || !cardCVV) {
            alert("Vui lòng nhập đầy đủ thông tin thẻ Visa/Mastercard.");
            isValid = false;
          } else if (!/^\d{16}$/.test(cardNumber)) {
            alert("Số thẻ Visa không hợp lệ.");
            isValid = false;
          } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
            alert("Ngày hết hạn thẻ không hợp lệ.");
            isValid = false;
          } else if (!/^\d{3}$/.test(cardCVV)) {
            alert("CVV không hợp lệ.");
            isValid = false;
          }
        } else if (method === "momo") {
          const momoNumber = document.getElementById("momo-number").value.trim();
          if (!momoNumber) {
            alert("Vui lòng nhập số điện thoại liên kết với ví Momo.");
            isValid = false;
          } else if (!/^0\d{9}$/.test(momoNumber)) {
            alert("Số điện thoại Momo không hợp lệ!");
            isValid = false;
          }
        }
      }

      const defaultCheckbox = document.getElementById('default-info-checkbox');
      const nameUserEl = document.getElementById('name-user');
      const phoneUserEl = document.getElementById('phone-user');
      const adrValueEl = document.getElementById('payment--adr');

      if (!defaultCheckbox.checked) {
        if (!nameUserEl.value.trim()) {
          const errorEl = nameUserEl.parentElement.querySelector('.form-message');
          errorEl.innerText = 'Vui lòng nhập tên người nhận!';
          nameUserEl.classList.add('is-invalid');
          isValid = false;
        }

        if (!phoneUserEl.value.trim()) {
          const errorEl = phoneUserEl.parentElement.querySelector('.form-message');
          errorEl.innerText = 'Vui lòng nhập số điện thoại!';
          phoneUserEl.classList.add('is-invalid');
          isValid = false;
        } else if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(phoneUserEl.value.trim())) {
          const errorEl = phoneUserEl.parentElement.querySelector('.form-message');
          errorEl.innerText = 'Số điện thoại không hợp lệ!';
          phoneUserEl.classList.add('is-invalid');
          isValid = false;
        }

        if (!adrValueEl.value.trim()) {
          const errorEl = adrValueEl.parentElement.querySelector('.form-message');
          errorEl.innerText = 'Vui lòng nhập địa chỉ!';
          adrValueEl.classList.add('is-invalid');
          isValid = false;
        }
      }


      if (isValid) {
        const redirectUrl = `confirm_order.php?name=${encodeURIComponent(nameUser)}&phone=${encodeURIComponent(phoneUser)}&address=${encodeURIComponent(adrValue)}`;
        window.location.href = redirectUrl;
      }
    };
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



// Thực hiện gọi toggleDefaultInfo trong DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
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


