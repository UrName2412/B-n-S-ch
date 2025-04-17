export class addressHandler {
    provinces = [];
    districts = [];
    wards = [];
    constructor(provinceId = null, districtId = null, wardId = null) {
        this.provinces = [];
        this.districts = [];
        this.wards = [];
        
        this.provinceSelect = provinceId ? document.getElementById(provinceId) : null;
        this.districtSelect = districtId ? document.getElementById(districtId) : null;
        this.wardSelect = wardId ? document.getElementById(wardId) : null;
        
        this.loadProvinces();
        this.addEventListeners();
    }

    async loadProvinces() {
        try {
            this.provinces = await fetch("../vender/apiAddress/province.json").then(res => res.json());
            this.districts = await fetch("../vender/apiAddress/district.json").then(res => res.json());
            this.wards = await fetch("../vender/apiAddress/ward.json").then(res => res.json());
            
            if (this.provinceSelect) {
                this.provinceSelect.innerHTML = '<option value="">Chọn tỉnh/thành</option>';
                this.provinces.forEach(province => {
                    let option = new Option(province.name, province.code);
                    this.provinceSelect.add(option);
                });
            }
        } catch (error) {
            console.error("Lỗi tải dữ liệu địa chỉ:", error);
        }
    }

    addEventListeners() {
        if (this.provinceSelect && this.districtSelect) {
            this.provinceSelect.addEventListener("change", () => this.updateDistricts());
        }
        if (this.districtSelect && this.wardSelect) {
            this.districtSelect.addEventListener("change", () => this.updateWards());
        }
    }

    updateDistricts() {
        let provinceCode = this.provinceSelect.value;
        this.districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
        if (this.wardSelect) {
            this.wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';
        }

        this.districts
            .filter(d => d.province_code == provinceCode)
            .forEach(district => {
                let option = new Option(district.name, district.code);
                this.districtSelect.add(option);
            });
    }

    updateWards() {
        let districtCode = this.districtSelect.value;
        this.wardSelect.innerHTML = '<option value="">Chọn Xã/Phường</option>';

        this.wards
            .filter(w => w.district_code == districtCode)
            .forEach(ward => {
                let option = new Option(ward.name, ward.code);
                this.wardSelect.add(option);
            });
    }

    getProvinceName(provinceCode) {
        let province = this.provinces.find(p => p.code == provinceCode);
        return province ? province.name : "Không tìm thấy";
    }

    getDistrictName(districtCode) {
        let district = this.districts.find(d => d.code == districtCode);
        return district ? district.name : "Không tìm thấy";
    }

    getWardName(wardCode) {
        let ward = this.wards.find(w => w.code == wardCode);
        return ward ? ward.name : "Không tìm thấy";
    }

    async concatenateAddress(provinceCode = null, districtCode = null, wardCode = null, street = null) {
        if (this.provinces.length == 0 || this.districts.length == 0 || this.wards.length == 0) {
            await this.loadProvinces();
        }
        let address = "";
        if (street) address += street + ", ";
        if (wardCode) address += this.getWardName(wardCode) + ", ";
        if (districtCode) address += this.getDistrictName(districtCode) + ", ";
        if (provinceCode) address += this.getProvinceName(provinceCode) + ", ";
        return address.slice(0, -2);
    }

    async setSelectedValues(provinceCode = null, districtCode = null, wardCode = null) {
        if (this.provinces.length === 0 || this.districts.length === 0 || this.wards.length === 0) {
            await this.loadProvinces();
        }

        if (provinceCode && this.provinceSelect) {
            this.provinceSelect.value = provinceCode;
            this.updateDistricts();
        }

        setTimeout(() => {
            if (districtCode && this.districtSelect) {
                this.districtSelect.value = districtCode;
                this.updateWards(); 
            }
            setTimeout(() => {
                if (wardCode && this.wardSelect) {
                    this.wardSelect.value = wardCode;
                }
            }, 100);
        }, 100);
    }

}
