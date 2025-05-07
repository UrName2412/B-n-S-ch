document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signinform");
    const username = document.getElementById("username");
    const passwd = document.getElementById("pass");
    const modalSuccess = document.getElementById("successModal");

    // Hiển thị thông báo lỗi
    function showError(input, message) {
        const parent = input.parentElement;
        let error = parent.querySelector(".error-message");
        if (!error) {
            error = document.createElement("small");
            error.className = "error-message text-danger";
            parent.appendChild(error);
        }
        error.textContent = message;
    }

    // Xóa thông báo lỗi
    function hideError(input) {
        const parent = input.parentElement;
        const error = parent.querySelector(".error-message");
        if (error) {
            error.remove();
        }
    }

    function isValid(pass) {
        return /[A-Z]/.test(pass) && /\d/.test(pass) && /[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~\\|]/.test(pass);
    }

    form.addEventListener("submit", function (event) {
        // Ngăn việc gửi form để kiểm tra thông tin
        event.preventDefault();

        let valid = true;

        // Kiểm tra tên đăng nhập
        if (username.value.trim() === "") {
            showError(username, "Tên đăng nhập không được để trống");
            valid = false;
        }
        else if (!/^[a-zA-Z0-9_ ]+$/.test(username.value)) {
            showError(username, "Tên đăng nhập không được chứa các kí tự đặc biệt");
            valid = false;
        }
        else if (username.value.length < 5) {
            showError(username, "Tên đăng nhập phải có ít nhất 5 kí tự");
            valid = false;
        }
        else if (username.value.length > 20) {
            showError(username, "Tên đăng nhập không được vượt quá 20 kí tự");
            valid = false;
        }
        else {
            hideError(username);
        }

        // Kiểm tra mật khẩu
        if (passwd.value.trim() === "") {
            showError(passwd, "Mật khẩu không được để trống");
            valid = false;
        }
        else if (passwd.value.length < 8) {
            showError(passwd, "Mật khẩu phải có ít nhất 8 kí tự");
            valid = false;
        }
        else if (!isValid(passwd.value)) {
            showError(passwd, "Mật khẩu phải chứa ít nhất 1 ký tự Hoa, 1 ký tự số và 1 ký tự đặc biệt");
            valid = false;
        }
        else {
            hideError(passwd);
        }

        // Kiểm tra tài khoản
        if (valid) {
            form.submit();
        }
    });
});
