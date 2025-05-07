const iconCartSpan = document.querySelector(".cart-icon span");
let productCart = [];

const loadFromsessionStorage = () => {
    const storedCart = sessionStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    iconCartSpan.innerText = totalQuantity < 99 ? totalQuantity : '99+';
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
    // Lấy dữ liệu từ file JSON
    provinces = await fetch("../vender/apiAddress/province.json").then(res => res.json());
    districts = await fetch("../vender/apiAddress/district.json").then(res => res.json());
    wards = await fetch("../vender/apiAddress/ward.json").then(res => res.json());

    // Lấy giá trị ban đầu từ các input
    initialProvince = province.value;
    initialDistrict = district.value;
    initialWard = ward.value;
    initialAddress = addr.value;
    initialPhone = phone.value;
    
    // Nếu là khôi phục từ session (khi mở trang)
    if (isRestoring) {
        loadDistricts(false);
        loadWards(false);
    }
}

function loadDistricts(setSelected = true) {
    const provinceCode = province.value;
    // Lọc quận/huyện theo mã tỉnh/thành
    const filteredDistricts = districts.filter(d => d.province_code == provinceCode);
    
    district.innerHTML = '';
    district.innerHTML = '<option value="">Chọn quận/huyện</option>';
    
    filteredDistricts.forEach(d => {
        const option = document.createElement('option');
        option.value = d.code;
        option.textContent = d.name;
        // Nếu đang set selected và mã quận bằng giá trị ban đầu từ DB
        if (setSelected && d.code == initialDistrict) {
            option.selected = true;
        }
        district.appendChild(option);
    });
    
    // Nếu đang set selected, load tiếp phường/xã
    if (setSelected && district.value) {
        loadWards(true);
    } else {
        ward.innerHTML = '<option value="">Chọn phường/xã</option>';
    }
}

function loadWards(setSelected = true) {
    const districtCode = district.value;
    // Lọc phường/xã theo mã quận/huyện
    const filteredWards = wards.filter(w => w.district_code == districtCode);
    
    ward.innerHTML = '';
    ward.innerHTML = '<option value="">Chọn phường/xã</option>';
    
    filteredWards.forEach(w => {
        const option = document.createElement('option');
        option.value = w.code;
        option.textContent = w.name;
        // Nếu đang set selected và mã phường bằng giá trị ban đầu từ DB
        if (setSelected && w.code == initialWard) {
            option.selected = true;
        }
        ward.appendChild(option);
    });
}

// Hàm xử lý khi nhấn nút chỉnh sửa
function toggleEditForm() {
    const overlay = document.querySelector(".overlay");
    
    [addr, phone, province, district, ward].forEach(hideError);
    
    if (form.classList.contains("show")) {
        // Khi đóng form, reset về giá trị ban đầu
        province.value = initialProvince;
        loadDistricts(false);
        ward.value = initialWard;
        addr.value = initialAddress;
        phone.value = initialPhone;
    } else {
        // Khi mở form, load giá trị hiện tại từ DB
        loadDistricts(true);
    }
    
    form.classList.toggle("show");
    overlay.classList.toggle("show");
}

const form = document.getElementById("edit-form");
const addr = document.getElementById("address");
const phone = document.getElementById("phone");
const province = document.getElementById("province");
const district = document.getElementById("district");
const ward = document.getElementById("ward");

// Thêm event listeners cho các dropdown
province.addEventListener("change", () => {
    loadDistricts(true);
});

district.addEventListener("change", () => {
    loadWards(true);
});

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

function hideError(input) {
    const parent = input.parentElement;
    const error = parent.querySelector(".error-message");
    if (error) {
        error.remove();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Load dữ liệu ban đầu khi trang được tải
    loadData(true); 

    // Thêm event listener khi tỉnh/thành thay đổi
    province.addEventListener("change", () => {
        loadDistricts(true);
    });

    // Thêm event listener khi quận/huyện thay đổi
    district.addEventListener("change", () => {
        loadWards(true);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;

        if (/[^a-zA-Z0-9À-ỹ\s,-\.\/]/.test(addr.value)) {
            showError(addr, "Địa chỉ nhà không hợp lệ");
            valid = false;
        } else {
            hideError(addr);
        }

        const phoneValue = phone.value.trim();

        if (phoneValue === "") {
            showError(phone, "Số điện thoại không được để trống");
            valid = false;
        } else if (!/^(03|05|07|08|09)\d{8}$/.test(phoneValue)) {
            showError(phone, "Số điện thoại phải đúng 10 chữ số và bắt đầu bằng đầu số hợp lệ của Việt Nam");
            valid = false;
        } else {
            hideError(phone);
        }

        if (!province.value) {
            showError(province, "Vui lòng chọn tỉnh/thành");
            valid = false;
        } else {
            hideError(province);
        }

        if (!district.value) {
            showError(district, "Vui lòng chọn quận/huyện");
            valid = false;
        } else {
            hideError(district);
        }

        if (!ward.value) {
            showError(ward, "Vui lòng chọn phường/xã");
            valid = false;
        } else {
            hideError(ward);
        }

        if (valid) {
            // Cập nhật giá trị ban đầu nếu submit thành công
            initialProvince = province.value;
            initialDistrict = district.value;
            initialWard = ward.value;
            initialAddress = addr.value;
            initialPhone = phone.value;
            
            form.submit();
        }
    });
});