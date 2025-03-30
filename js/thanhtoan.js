let cartQuantity = [];
const iconCartSpan = document.querySelector('.cart-icon span')
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


// Định nghĩa hàm Validator
function Validator(options) {
    const formElement = document.querySelector(options.form);
    console.log(formElement);

    if (formElement) {
        options.rules.forEach((rule) => {
            const inputElement = formElement.querySelector(rule.selector);
            const errorElement = inputElement.parentElement.querySelector('.form-message');

            if (inputElement) {
                // Xử lý sự kiện blur (rời khỏi trường)
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

                // Xử lý sự kiện khi nhập (clear lỗi)
                inputElement.oninput = () => {
                    errorElement.innerText = '';
                    inputElement.classList.remove('is-invalid');
                };
            }
        });
    }
}

// Các quy tắc kiểm tra
Validator.isRequired = (selector) => {
    return {
        selector: selector,
        test: (value) => (value.trim() ? undefined : 'Vui lòng nhập trường này!'),
    };
};

Validator.isPhone = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
            return phoneRegex.test(value) ? undefined : 'Số điện thoại không hợp lệ!';
        },
    };
};

document.addEventListener("DOMContentLoaded", function () {
    const visaForm = document.getElementById("visa-form");
    const momoForm = document.getElementById("momo-form");

    // Xử lý hiển thị form theo phương thức thanh toán
    document.querySelectorAll('input[name="btnradio"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            visaForm.style.display = "none";
            momoForm.style.display = "none";

            if (this.value === "visa") {
                visaForm.style.display = "block";
            } else if (this.value === "momo") {
                momoForm.style.display = "block";
            }
        });
    });

    // Hàm kiểm tra định dạng số thẻ
    function validateCardNumber(cardNumber) {
        return /^\d{16}$/.test(cardNumber);
    }

    // Hàm kiểm tra ngày hết hạn
    function validateExpiryDate(expiryDate) {
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
    }

    // Hàm kiểm tra mã CVV
    function validateCVV(cvv) {
        return /^\d{3}$/.test(cvv);
    }

    // Hàm kiểm tra số điện thoại Momo
    function validatePhoneNumber(phone) {
        return /^(03|07|08|09)\d{8}$/.test(phone);
    }

    // Xử lý khi submit form
    const paymentForm = document.querySelector("#form-add");
    paymentForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn submit form mặc định

        const selectedMethod = document.querySelector('input[name="btnradio"]:checked').value;
        let isValid = true;

        // Xóa thông báo lỗi cũ
        document.querySelectorAll(".form-message").forEach((message) => {
            message.textContent = "";
        });

        // Kiểm tra các form theo phương thức thanh toán
        if (selectedMethod === "visa") {
            const cardNumber = document.getElementById("card-number").value;
            const cardExpiry = document.getElementById("card-expiry").value;
            const cardCVV = document.getElementById("card-cvv").value;

            if (!validateCardNumber(cardNumber)) {
                document.getElementById("error-card-number").textContent = "Số thẻ không hợp lệ (16 chữ số).";
                isValid = false;
            }
            if (!validateExpiryDate(cardExpiry)) {
                document.getElementById("error-card-expiry").textContent = "Ngày hết hạn không hợp lệ (MM/YY).";
                isValid = false;
            }
            if (!validateCVV(cardCVV)) {
                document.getElementById("error-card-cvv").textContent = "Mã CVV không hợp lệ (3 chữ số).";
                isValid = false;
            }
        } else if (selectedMethod === "momo") {
            const momoNumber = document.getElementById("momo-number").value;
            if (!validatePhoneNumber(momoNumber)) {
                document.getElementById("error-momo-number").textContent = "Số điện thoại không hợp lệ.";
                isValid = false;
            }
        }

        // Nếu tất cả trường hợp hợp lệ
        if (isValid) {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            sessionStorage.clear(); // Xóa giỏ hàng
            loadFromsessionStorage();
            setTimeout(() => {
                window.location.href = "hoaDon.php";
            }, 3000); // Chờ 3 giây
        }
    });

    document.getElementById('default-info-checkbox').addEventListener('change', toggleDefaultInfo);

    function toggleDefaultInfo() {
        const isChecked = document.getElementById('default-info-checkbox').checked;
        const nameUser = document.getElementById('name-user');
        const phoneUser = document.getElementById('phone-user');
        const paymentAdr = document.getElementById('payment--adr');
        const paymentNote = document.getElementById('payment--note');

        nameUser.disabled = isChecked;
        phoneUser.disabled = isChecked;
        paymentAdr.disabled = isChecked;
        // paymentNote.disabled = isChecked;

        if (!isChecked) {
            nameUser.value = '';
            phoneUser.value = '';
            paymentAdr.value = '';
            paymentNote.value = '';
        } else {
            nameUser.value = 'Nguyễn Văn A';
            phoneUser.value = '+84 912 345 678';
            paymentAdr.value = '123 lê Lợi, Quận 1, TP Hồ Chí Minh';
        }
    }

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

        return true;
    }

    // Initialize form state
    toggleDefaultInfo();

    // Kích hoạt Validator
    Validator({
        form: '#form-add',
        rules: [
            Validator.isRequired('#name-user'),
            Validator.isRequired('#phone-user'),
            Validator.isPhone('#phone-user'),
            Validator.isRequired('#payment--adr'),
        ],
    });
});

