const iconCartSpan = document.querySelector(".cart-icon span");
let productCart = [];

const loadFromsessionStorage = () => {
    const storedCart = sessionStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    // Update cart icon with the total quantity on page load
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    if (totalQuantity < 99) {
        iconCartSpan.innerText = totalQuantity;
    } else {
        iconCartSpan.innerText = '99+';
    }
};

loadFromsessionStorage();

let provinces = {};
let districts = {};
let wards = {};

let initialProvince = "";
let initialDistrict = "";
let initialWard = "";
let initialAddress = "";
let initialPhone = "";

async function loadData(isRestoring = false) {
    provinces = await fetch("../vender/apiAddress/province.json").then(res => res.json());
    districts = await fetch("../vender/apiAddress/district.json").then(res => res.json());
    wards = await fetch("../vender/apiAddress/ward.json").then(res => res.json());

    const provinceSelect = document.getElementById("province");
    provinceSelect.innerHTML = '<option value="" selected>Chọn tỉnh/thành phố</option>';
    provinces.forEach(province => {
        provinceSelect.add(new Option(province.name, province.code));
    });

    if (!isRestoring) {
        const selectedProvince = provinceSelect.getAttribute("value");
        if (selectedProvince) {
            provinceSelect.value = selectedProvince;
            loadDistricts(true);
        }
    }

    provinceSelect.addEventListener("change", () => loadDistricts(true));
    document.getElementById("district").addEventListener("change", () => loadWards(true));
}

function loadDistricts(setSelected = true) {
    const provinceCode = document.getElementById("province").value;
    const districtSelect = document.getElementById("district");

    districtSelect.innerHTML = '<option value="" selected>Chọn quận/huyện</option>';
    districts
        .filter(d => d.province_code == provinceCode)
        .forEach(district => {
            districtSelect.add(new Option(district.name, district.code));
        });

    if (setSelected && initialDistrict) {
        districtSelect.value = initialDistrict;
        loadWards(true);
    }
}

function loadWards(setSelected = true) {
    const districtCode = document.getElementById("district").value;
    const wardSelect = document.getElementById("ward");

    wardSelect.innerHTML = '<option value="" selected>Chọn phường/xã</option>';
    wards
        .filter(w => w.district_code == districtCode)
        .forEach(ward => {
            wardSelect.add(new Option(ward.name, ward.code));
        });

    if (setSelected && initialWard) {
        wardSelect.value = initialWard;
    }
}

const form = document.getElementById("edit-form");
const addr = document.getElementById("address");
const phone = document.getElementById("phone");
const province = document.getElementById("province");
const district = document.getElementById("district");
const ward = document.getElementById("ward");

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

document.addEventListener("DOMContentLoaded", function () {
    form.addEventListener("submit", function (event) {
        // Ngăn việc gửi form để kiểm tra thông tin
        event.preventDefault();

        let valid = true;

        // Kiểm tra địa chỉ
        if (/[^a-zA-Z0-9À-ỹ\s,-\.\/]/.test(addr.value)) {
            showError(addr, "Địa chỉ nhà không hợp lệ");
            valid = false;
        }
        else {
            hideError(addr);
        }

        // Kiểm tra số điện thoại
        if (!/(03|05|07|08|09)+(\d{8})\b/.test(phone.value)) {
            showError(phone, "Số điện thoại phải bao gồm 10 số với các đầu số từ Việt Nam");
            valid = false;
        }
        else {
            hideError(phone);
        }

        if (!province.value || province.value === "Chọn tỉnh/thành phố") {
            showError(province, "Vui lòng chọn tỉnh/thành");
            valid = false;
        } else {
            hideError(province);
        }

        if (district.value === "") {
            showError(district, "Vui lòng chọn quận/huyện");
            valid = false;
        } else {
            hideError(district);
        }

        if (ward.value === "") {
            showError(ward, "Vui lòng chọn phường/xã");
            valid = false;
        } else {
            hideError(ward);
        }

        // Kiểm tra form hợp lệ
        if (valid) {
            form.submit();
        }
    });
});

function toggleEditForm() {
    const overlay = document.querySelector(".overlay");
    const isOpening = !form.classList.contains("show");

    if (isOpening) {
        // Lưu giá trị ban đầu
        initialProvince = province.value;
        initialDistrict = district.value;
        initialWard = ward.value;
        initialAddress = addr.value;
        initialPhone = phone.value;
    } else {
        // Phục hồi lại các giá trị
        loadData(true).then(() => {
            province.value = initialProvince;
            loadDistricts(false);
            district.value = initialDistrict;
            loadWards(false);
            ward.value = initialWard;

            addr.value = initialAddress;
            phone.value = initialPhone;
        });
    }

    // Xóa thông báo lỗi
    [addr, phone, province, district, ward].forEach(hideError);

    form.classList.toggle("show");
    overlay.classList.toggle("show");
}