function Validator(options) {

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        // submit form
        formElement.onsubmit = (e) => {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                formElement.submit();
            }
        }


        // Lặp các rule và xử lí
        options.rules.forEach(function (rule) {


            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

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
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message;
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/
                ;
            return regex.test(value) ? undefined : message;
        }
    };
}

Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /(03|05|07|08|09)+([0-9]{8})\b/;
            return regex.test(value) ? undefined : message;
        }
    }
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự.`
        }
    }
}

function isValidPasswd(pass) {
    return /[A-Z]/.test(pass) && /\d/.test(pass) && /[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~\\|]/.test(pass);
}

    

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return isValidPasswd(value) ? undefined : message;
        }
    }

}

Validator.comparePassword = function (selector, passwordId, message) {
    return {
        selector: selector,
        test: function (value) {
            const pass = document.getElementById(passwordId).value;
            return value === pass ? undefined : message;
        }
    };
};

Validator.min = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value >= min ? undefined : message;
        }
    }
}

Validator.isNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[0-9]+$/;
            return regex.test(value) ? undefined : message;
        }
    }
}



