document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupform");
    const username = document.getElementById("username");
    const addr = document.getElementById("address");
    const phone = document.getElementById("phone");
    const passwd = document.getElementById("pass");
    const passwdconf = document.getElementById("pass-confirm");
    const terms = document.getElementById("terms");
    const modal = document.getElementById("successModal");

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
        else {
            hideError(username);
        }

        // Kiểm tra địa chỉ
        if (addr.value.trim() === "") {
            showError(addr, "Địa chỉ không được để trống");
            valid = false;
        }
        else if (/[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰ\s,-\.\/]/.test(addr.value)) {
            showError(addr, "Địa chỉ không hợp lệ");
            valid = false;
        }
        else {
            hideError(addr);
        }

        // Kiểm tra số điện thoại
        if (phone.value.trim() === "") {
            showError(phone, "Số điện thoại không được để trống");
            valid = false;
        }
        else if (!/(03|05|07|08|09)+(\d{8})\b/.test(phone.value)) {
            showError(phone, "Số điện thoại phải bao gồm 10 số với các đầu số từ Việt Nam");
            valid = false;
        }
        else {
            hideError(phone);
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
        else {
            hideError(passwd);
        }

        // Kiểm tra xác nhận mật khẩu
        if (passwdconf.value.trim() === "") {
            showError(passwdconf, "Xác nhận mật khẩu không được để trống");
            valid = false;
        }
        else if (passwdconf.value != passwd.value) {
            showError(passwdconf, "Mật khẩu xác nhận phải khớp với mật khẩu vừa nhập");
            valid = false;
        }
        else {
            hideError(passwdconf);
        }

        // Kiểm tra điều khoản
        if (!terms.checked) {
            showError(terms, "Bạn phải đồng ý với điều khoản và chính sách của nhà sách");
            valid = false;
        }
        else {
            hideError(terms);
        }

        // Kiểm tra form hợp lệ
        if (valid) {
            modal.classList.add("active");
        }
    });

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", function () {
        // Sau khi đóng thông báo thì gửi form
        modal.classList.remove("active");
        form.submit();
    });
});

let provinces = {};
let districts = {};
let wards = {};

async function loadData() {
    provinces = await fetch("province.json").then(res => res.json());
    districts = await fetch("district.json").then(res => res.json());
    wards = await fetch("ward.json").then(res => res.json());

    let provinceSelect = document.getElementById("province");
    provinces.forEach(province => {
        let option = new Option(province.name, province.code);
        provinceSelect.add(option);
    });
}

function loadDistricts() {
    let provinceCode = document.getElementById("province").value;
    let districtSelect = document.getElementById("district");
    districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';

    districts.filter(d => d.province_code == provinceCode).forEach(district => {
        let option = new Option(district.name, district.code);
        districtSelect.add(option);
    });
}

function loadWards() {
    let districtCode = document.getElementById("district").value;
    let wardSelect = document.getElementById("ward");
    wardSelect.innerHTML = '<option value="">Chọn phường/xã</option>';

    wards.filter(w => w.district_code == districtCode).forEach(ward => {
        let option = new Option(ward.name, ward.code);
        wardSelect.add(option);
    });
}

window.onload = loadData;