document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signinform");
    const username = document.getElementById("username");
    const passwd = document.getElementById("pass");

    function showError(input, message) {
        const parent = input.parentElement;
        let error = parent.querySelector(".error-message");
        if (!error) {
            error = document.createElement("small");
            error.className = "error-message text-danger";
            error.setAttribute("aria-live", "polite");
            parent.appendChild(error);
        }
        error.textContent = message;
    }

    function hideError(input) {
        const parent = input.parentElement;
        const error = parent.querySelector(".error-message");
        if (error) {
            error.remove();
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let valid = true;

        if (username.value.trim() === "") {
            showError(username, "Tên đăng nhập không được để trống");
            valid = false;
        } else if (username.value.length < 5) {
            showError(username, "Tên đăng nhập phải có ít nhất 5 kí tự");
            valid = false;
        } else {
            hideError(username);
        }

        if (passwd.value.trim() === "") {
            showError(passwd, "Mật khẩu không được để trống");
            valid = false;
        } else if (passwd.value.length < 8) {
            showError(passwd, "Mật khẩu phải có ít nhất 8 kí tự");
            valid = false;
        } else {
            hideError(passwd);
        }

        if (valid) {
            if (username.value === "admin" && passwd.value === "12345678") {
                window.location.replace("page/nguoidung.html");
            } else {
                alert("Tên đăng nhập hoặc mật khẩu không đúng");
            }
        }
    });
});