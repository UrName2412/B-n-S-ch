
function submitButton(){
    const submitButton = document.querySelector('.menu-add .btn-submit');
    const menuAdd = submitButton.closest('.menu-add');
    const toolMenu_Modal = document.querySelector('.tool-menu');
    const addMenu_Modal = document.querySelector('.menu-add');
    const behindMenu_Modal = document.querySelector('.behindMenu');
    const closeBtn_Modal = document.querySelector('.tool-menu .menu-close');
    const behindMenuAlert = document.querySelector('.behindMenuAlert');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        behindMenuAlert.style.display = 'block';
        let customAlert = document.getElementById('customAlert');
        customAlert.style.display = 'block';
        messageAlert.innerText = 'Đã thêm thành công.';
        let closeButton = document.getElementById('alertCloseBtn');
        closeButton.addEventListener('click', () => {
            customAlert.style.display = 'none';
            behindMenuAlert.style.display = 'none';
            if (menuAdd){
                menuAdd.style.display = 'none';
                addMenu_Modal.style.display = 'none';
                behindMenu_Modal.style.display = 'none';
                closeBtn_Modal.style.display = 'none';
            }
        });
        behindMenuAlert.addEventListener('click', () => {
            modal.classList.toggle("show", false);
            behindMenuAlert.style.display = 'none';
            customAlert.style.display = 'none';
            if (menuAdd){
                menuAdd.style.display = 'none';
                addMenu_Modal.style.display = 'none';
                behindMenu_Modal.style.display = 'none';
                closeBtn_Modal.style.display = 'none';
            }
        })
    })
}



function Validator(options){

    var selectorRules = {};

    function validate(inputElement, rule){
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; i++){
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }

        if (errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement){
        // submit form
        formElement.onsubmit = (e) => {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid){
                    isFormValid = false;
                }
            });
            if (isFormValid){
                submitButton();
            }
        }


        // Lặp các rule và xử lí
        options.rules.forEach(function (rule){


            if (Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement){
                // trường hợp blur
                inputElement.onblur = function (){
                    validate(inputElement, rule);
                }
                // khi đang nhập
                inputElement.oninput = function (){
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
Validator.isRequired = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            return value.trim() ? undefined : message;
        }
    };
}

Validator.isEmail = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message;
        }
    };
}

Validator.isPhone = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            var regex = /(03|05|07|08|09)+([0-9]{8})\b/;
            return regex.test(value) ? undefined : message;
        }
    }
}

Validator.minLength = function (selector,min){
    return {
        selector: selector,
        test: function (value){
            return value.length >=min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự.`
        }
    }
}

Validator.isPassword = function (selector, message){
    return {
        selector: selector,
        test: function (value){
            var regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
            return  regex.test(value) ? undefined : message;
        }
    }
    
}

Validator.comparePassword = function (selector,password,message){
    var pass = password.value;
    return {
        selector: selector,
        test: function (value){
            return value===pass ? undefined : message;
        }
    }
}




