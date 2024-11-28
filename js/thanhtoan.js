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


function Validator(options) {

    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // trường hợp blur
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // khi đang nhập
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }

        })

    }
}


// Khi có lỗi => message lỗi
// hợp lệ => trả undefined
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
}
Validator.isPhone = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /(03|05|07|08|09)+([0-9]{8})\b/;
            return regex.test(value) ? undefined : 'Trường này phải là số điện thoại'
        }
    }
}