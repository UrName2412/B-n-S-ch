document.addEventListener("DOMContentLoaded", function() {
    const username = document.getElementById("username");
    const phone = document.getElementById("phone");
    const confcode = document.getElementById("confcode");
    const passwd = document.getElementById("pass");
    const passconf = document.getElementById("pass-confirm");
    const form = document.getElementById("forgotpwdform");
    const modal = document.getElementById("successModal");
    const modalFail = document.getElementById("failModal");

    // Hiển thị thông báo lỗi
    function showError(input, message) {
        const parent = input.parentElement;
        let error = parent.querySelector(".error-message");
        if(!error) {
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
        if(error) {
            error.remove();
        }
    }

    form.addEventListener("submit", function(event) {
        // Ngăn việc gửi form để kiểm tra thông tin
        event.preventDefault();

        let valid = true;

        // Kiểm tra username
        if(username.value.trim() === "") {
            showError(username, "Tên đăng nhập không được để trống");
            valid = false;
        }
        else if(!/^[a-zA-Z0-9_ ]+$/.test(username.value)) {
            showError(username, "Tên đăng nhập không được chứa các kí tự đặc biệt");
            valid = false;
        }
        else if(username.value.length < 5) {
            showError(username, "Tên đăng nhập phải có ít nhất 5 kí tự");
            valid = false;
        }
        else {
            hideError(username);
        }

        // Kiểm tra số điện thoại
        if(phone.value.trim() === "") {
            showError(phone, "Số điện thoại không được để trống");
            valid = false;
        }
        else if(!/(03|05|07|08|09)+(\d{8})\b/.test(phone.value)) {
            showError(phone, "Số điện thoại phải bao gồm 10 số với các đầu số từ Việt Nam");
            valid = false;
        }
        else {
            hideError(phone);
        }

        // Kiểm tra mã xác nhận
        if(confcode.value.trim() === "") {
            showError(confcode, "Mã xác nhận không được để trống");
            valid = false;
        }
        else if(!/^\d{6}$/.test(confcode.value)) {
            showError(confcode, "Mã đăng nhập phải bao gồm 6 số");
            valid = false;
        }
        else {
            hideError(confcode);
        }

        // Kiểm tra mật khẩu
        if(passwd.value.trim() === "") {
            showError(passwd, "Mật khẩu không được để trống");
            valid = false;
        }
        else if(passwd.value.length < 8) {
            showError(passwd, "Mật khẩu phải có ít nhất 8 kí tự");
            valid = false;
        }
        else {
            hideError(passwd);
        }

        // Kiểm tra xác nhận mật khẩu
        if(passconf.value.trim() === "") {
            showError(passconf, "Xác nhận mật khẩu không được để trống");
            valid = false;
        }
        else if(passconf.value != passwd.value) {
            showError(passconf, "Mật khẩu xác nhận phải khớp với mật khẩu vừa nhập");
            valid = false;
        }
        else {
            hideError(passconf);
        }

        // Kiểm tra tài khoản
        if(valid) {
            if(username.value === "user123" && phone.value === "0967147923") {
                modal.classList.add("active");
            }
            else {
                modalFail.classList.add("active");
            }
        }
    });

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", function() {
        // Sau khi đóng thông báo thì gửi form
        modal.classList.remove("active");
        modalFail.classList.remove("active");
        form.submit();
    });
});
