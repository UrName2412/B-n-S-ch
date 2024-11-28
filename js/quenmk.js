document.addEventListener("DOMContentLoaded", function() {
    const username = document.getElementById("username");
    const mail = document.getElementById("mail");
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
        else if(username.value.length < 5) {
            showError(username, "Tên đăng nhập phải có ít nhất 5 kí tự");
            valid = false;
        }
        else {
            hideError(username);
        }

        // Kiểm tra email
        if(mail.value.trim() === "") {
            showError(mail, "Email không được để trống");
            valid = false;
        }
        else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail.value)) {
            showError(mail, "Email phải tuân theo cú pháp tối thiểu 'a@a.aa'");
            valid = false;
        }
        else {
            hideError(mail);
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
            if(username.value === "user123" && mail.value === "ngotruongvu@gmail.com") {
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