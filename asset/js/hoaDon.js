import { addressHandler } from '../../admin/asset/js/apiAddress.js';

document.addEventListener("DOMContentLoaded", () => {
    const address = new addressHandler('provinceSelect', 'districtSelect', 'wardSelect');

    const provinceCode = sessionAddress.province;
    const districtCode = sessionAddress.district;
    const wardCode = sessionAddress.ward;
    const street = sessionAddress.street;

    address.setSelectedValues(provinceCode, districtCode, wardCode).then(() => {
        address.concatenateAddress(provinceCode, districtCode, wardCode, street)
            .then(fullAddress => {
                console.log("Full Address:", fullAddress);

                const addressInfoElement = document.getElementById('address-info');
                if (addressInfoElement) {
                    addressInfoElement.textContent = fullAddress;
                } else {
                    console.error('Không tìm thấy phần tử #address-info trong DOM');
                }
            })
            .catch(err => {
                console.error("Lỗi tạo địa chỉ:", err);
            });
    });


});