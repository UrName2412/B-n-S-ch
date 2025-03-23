document.addEventListener("DOMContentLoaded", function () {
    const provinceSelect = document.getElementById("tinhThanh");
    const districtSelect = document.getElementById("quanHuyen");
    const wardSelect = document.getElementById("xa");

    // Load danh sách tỉnh/thành phố
    async function loadProvinces() {
        let response = await fetch("https://provinces.open-api.vn/api/?depth=1");
        let data = await response.json();
        data.forEach(province => {
            let option = new Option(province.name, province.code);
            provinceSelect.add(option);
        });
    }

    // Khi chọn tỉnh, load quận/huyện
    provinceSelect.addEventListener("change", async function () {
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        let provinceCode = this.value;
        if (!provinceCode) return;

        let response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        let data = await response.json();
        data.districts.forEach(district => {
            let option = new Option(district.name, district.code);
            districtSelect.add(option);
        });
    });

    // Khi chọn quận, load xã/phường
    districtSelect.addEventListener("change", async function () {
        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        let districtCode = this.value;
        if (!districtCode) return;

        let response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        let data = await response.json();
        data.wards.forEach(ward => {
            let option = new Option(ward.name, ward.code);
            wardSelect.add(option);
        });
    });

    // Gọi hàm load tỉnh ngay khi trang tải
    loadProvinces();
});
