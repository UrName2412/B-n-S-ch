let cartQuantity = [];
console.log(localStorage);
const iconCartSpan = document.querySelector('.cart-icon span')
const loadFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    cartQuantity = storedCart ? JSON.parse(storedCart) : [];
    updateTotal();
};

const updateTotal = () => {
    const totalQuantity = cartQuantity.reduce((acc, item) => acc + item.quantity, 0);
    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : '99+';
};
loadFromLocalStorage();


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

function thanks() {
    const formElement = document.querySelector('#form-add');
    const nameUser = formElement.querySelector("#name-user");
    const phoneUser = formElement.querySelector("#phone-user");
    const paymentAdr = formElement.querySelector("#payment--adr");

    let isValid = true;

    // Kiểm tra họ tên
    if (!nameUser.value.trim()) {
        const errorElement = nameUser.parentElement.querySelector('.form-message');
        errorElement.innerText = "Vui lòng nhập họ tên!";
        nameUser.classList.add('is-invalid');
        isValid = false;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneUser.value.trim() || !phoneRegex.test(phoneUser.value)) {
        const errorElement = phoneUser.parentElement.querySelector('.form-message');
        errorElement.innerText = "Số điện thoại không hợp lệ!";
        phoneUser.classList.add('is-invalid');
        isValid = false;
    }

    // Kiểm tra địa chỉ
    if (!paymentAdr.value.trim()) {
        const errorElement = paymentAdr.parentElement.querySelector('.form-message');
        errorElement.innerText = "Vui lòng nhập địa chỉ!";
        paymentAdr.classList.add('is-invalid');
        isValid = false;
    }

    // Nếu tất cả trường hợp hợp lệ
    if (isValid) {
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        localStorage.clear(); // Xóa giỏ hàng
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000); // Chờ 3 giây
    }

    return false; // Ngăn submit form mặc định
}

