// Fetch data from JSON
Promise.all([
    fetch('../data/JSON/donhang.json').then(res => res.json()),
    fetch('../data/JSON/districtData.json').then(res => res.json())
]).then(([donhang, districtData]) => {
    console.log("Dữ liệu đơn hàng:", donhang);
    console.log("Dữ liệu quận/huyện:", districtData);

    function displayResults(filtered) {
        const dataCartsDiv = document.getElementById('dataCarts');
        dataCartsDiv.innerHTML = '';  // Xóa hết dữ liệu cũ
        
        if (filtered.length === 0) {
            // Nếu không có dữ liệu, hiển thị thông báo
            const noDataMessage = document.createElement('p');
            noDataMessage.classList.add('no-data-message'); // Thêm class để CSS
            noDataMessage.textContent = "Không có dữ liệu phù hợp.";
            dataCartsDiv.appendChild(noDataMessage);
            return; // Dừng hàm
        }

        filtered.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('grid-row-cart'); // Thêm class để áp dụng CSS
    
            orderDiv.innerHTML = `
                <textarea placeholder="Nhập id..." readonly="">${order.id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly="">${order.username}</textarea>
                <textarea placeholder="Nhập địa chỉ..." readonly="">${order.address}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly="">${order.phone}</textarea>
                <textarea placeholder="Nhập tổng giá..." readonly="">${order.amount}</textarea>
                <div class="buttonCart">
                    <button type="button" class="status ${order.status === 'Chưa xử lí' ? 'not-confirm' :
                        order.status === 'Đã xác nhận' ? 'confirm' :
                        order.status === 'Đã giao' ? 'delivered' :
                        'canceled'}">${order.status}</button>
                    <button type="button" class="detailButton">Chi tiết đơn hàng</button>
                </div>
            `;
    
            // Thêm đơn hàng vào DOM
            dataCartsDiv.appendChild(orderDiv);
        });
    }

    function handleFilter() {
        const startDate = document.getElementById("dateStart").value;
        const endDate = document.getElementById("dateEnd").value;
        const province = document.getElementById("city").value.trim();
        const district = document.getElementById("district").value.trim();
        const statusFilter = document.getElementById("cartFilter").value;

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            alert("Ngày đến phải lớn hơn hoặc bằng ngày bắt đầu.");
            return;
        }
        
        let filtered = donhang.filter(order => {
            const addressParts = order.address.split(",").map(part => part.trim());
            const orderDistrict = addressParts.length > 1 ? addressParts[addressParts.length - 2] : "";
            const orderProvince = addressParts.length > 0 ? addressParts[addressParts.length - 1] : "";
            const orderDate = new Date(order.timestamp);

            return (
                (!province || orderProvince.normalize("NFC").toLowerCase().includes(province.normalize("NFC").toLowerCase())) &&
                (!district || orderDistrict.normalize("NFC").toLowerCase().includes(district.normalize("NFC").toLowerCase())) &&
                (!startDate || orderDate >= new Date(startDate)) &&
                (!endDate || orderDate <= new Date(endDate))
            );
        });
        
        if (statusFilter !== "allCarts") {
            filtered = filtered.filter(order => {
                if (statusFilter === "cartsNotConfirm") return order.status === "Chưa xử lí";
                if (statusFilter === "cartsConfirm") return order.status === "Đã xác nhận";
                if (statusFilter === "cartsDelivered") return order.status === "Đã giao";
                if (statusFilter === "cartsCanceled") return order.status === "Đã hủy";
                return true;
            });
        }

        displayResults(filtered);
    }

    function resetFilter() {
        document.getElementById("dateStart").value = "";
        document.getElementById("dateEnd").value = "";
        document.getElementById("city").value = "";
        document.getElementById("district").value = "";
        document.getElementById("cartFilter").value = "allCarts";
        displayResults(donhang);
    }

    document.getElementById("acceptFilter").addEventListener("click", handleFilter);
    document.getElementById("cartFilter").addEventListener("change", handleFilter);
    document.getElementById("resetFilter").addEventListener("click", resetFilter);

    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("district");
    
    citySelect.innerHTML = '<option value="">Chọn thành phố</option>' +
        Object.keys(districtData).map(city => `<option value="${city}">${city}</option>`).join('');
    
    citySelect.addEventListener("change", function () {
        const selectedCity = this.value;
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
        
        if (selectedCity && districtData[selectedCity]) {
            districtData[selectedCity].forEach(district => {
                const option = document.createElement("option");
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });
    function resetFilter() {
        document.getElementById("dateStart").value = "";
        document.getElementById("dateEnd").value = "";
        document.getElementById("city").value = "";
        document.getElementById("district").value = "";
        document.getElementById("cartFilter").value = "allCarts";
        displayResults(donhang);
    
        // An bo loc
        document.getElementById("menuFilter").style.display = "none";
    }
    document.getElementById("resetFilter").addEventListener("click", resetFilter);    
    displayResults(donhang);
}).catch(error => console.error("Lỗi khi tải dữ liệu JSON:", error));
