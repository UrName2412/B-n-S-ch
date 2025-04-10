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

async function loadData() {
    provinces = await fetch("../vender/apiAddress/province.json").then(res => res.json());
    districts = await fetch("../vender/apiAddress/district.json").then(res => res.json());
    wards = await fetch("../vender/apiAddress/ward.json").then(res => res.json());

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