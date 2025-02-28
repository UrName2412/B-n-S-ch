// Fetch data from the JSON file
Promise.all([
  fetch('../data/JSON/donhang.json').then(res => res.json()),
  fetch('../data/JSON/districtData.json').then(res => res.json())
])
.then(([donhang, districtData]) => {
  console.log("Dữ liệu đơn hàng:", donhang);
  console.log("Dữ liệu quận/huyện:", districtData);

      // Hàm hiển thị kết quả lọc
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
  
          // Tạo phần tử cho status button và thêm class tương ứng
          const statusButton = document.createElement('span');
          statusButton.classList.add('status');  // Thêm class chung cho status
  
          // Gán class trạng thái cho status button
          if (order.status == 'Chưa xử lí') {
            statusButton.classList.add('not-confirm');
          } else if (order.status == 'Đã xác nhận') {
            statusButton.classList.add('confirm');
          } else if (order.status == 'Đã giao') {
            statusButton.classList.add('delivered');
          } else if (order.status == 'Đã hủy') {
            statusButton.classList.add('canceled');
          }
  
          statusButton.innerHTML = order.status;  // Hiển thị trạng thái
  
          orderDiv.innerHTML = `
            <textarea>${order.id}</textarea>
            <textarea>${order.username}</textarea>
            <textarea>${order.address}</textarea>
            <textarea>${order.phone}</textarea>
            <textarea>${order.amount}</textarea>
          `;

          
          // Thêm status vào cuối cùng
          orderDiv.appendChild(statusButton);
          
          // Thêm button chi tiết đơn hàng
          const detailsButton = document.createElement('button');
          detailsButton.type = 'button';
          detailsButton.classList.add('detailButton');
          detailsButton.innerHTML = 'Chi tiết đơn hàng';
          orderDiv.appendChild(detailsButton);
  
          // Thêm đơn hàng vào DOM
          dataCartsDiv.appendChild(orderDiv);
        });
      }

      // Hàm lọc đơn hàng
      function handleFilter(options) {
          const filtered = donhang.filter(order => {
            const addressParts = order.address.split(",").map(part => part.trim()); // ['Quận 6', 'TPHCM']
            const district = addressParts[0] || ""; // Quận/Huyện
            const province = addressParts[1] || ""; // Tỉnh/Thành phố
            return (
                  (!options.id || order.id.includes(options.id)) &&
                  (!options.username || order.username.normalize("NFC").toLowerCase().startsWith(options.username.normalize("NFC").toLowerCase())) &&
                  (!options.province || province.normalize("NFC").toLowerCase().includes(options.province.normalize("NFC").toLowerCase())) &&
                  (!options.district || district.normalize("NFC").toLowerCase().includes(options.district.normalize("NFC").toLowerCase())) &&
                  (!options.phone || order.phone.replace(/\D/g, "").includes(options.phone.replace(/\D/g, ""))) &&
                  (!options.status || order.status.normalize("NFC").toLowerCase().includes(options.status.normalize("NFC").toLowerCase()))
              );
          });

          console.log(filtered);
          displayResults(filtered);  // Hiển thị kết quả lọc
      }

      // Xử lý sự kiện submit form lọc
      const filterForm = document.getElementById('filterForm');
      filterForm.addEventListener("submit", function(event) {
          event.preventDefault();
          const options = {
              id: document.getElementById("filterId").value.trim(),
              username: document.getElementById("filterName").value.trim(),
              province: document.getElementById("filterProvince").value.trim(),
              district: document.getElementById("filterDistrict").value.trim(),
              phone: document.getElementById("filterPhone").value.trim(),
              status: document.getElementById("filterStatus").value
          };

          handleFilter(options);
      });

      // Khi bấm "Xóa bộ lọc", cập nhật danh sách
      filterForm.addEventListener("reset", function() {
          displayResults(donhang); // Hiển thị toàn bộ đơn hàng
      });

      // Xử lý sự kiện hiển thị/ẩn phần lọc
      const showFilterButton = document.getElementById('showFilterButton');
      const filterSection = document.getElementById('filterSection');
      showFilterButton.addEventListener('click', function() {
          const currentDisplay = filterSection.style.display;
          filterSection.style.display = currentDisplay === 'none' ? 'block' : 'none';
      });

      // Hiển thị toàn bộ đơn hàng khi trang load
      displayResults(donhang);
  })
  // Lưu danh sách tỉnh/thành phố và quận/huyện
let districtData = {};

// Tải dữ liệu từ districtData.json
fetch('../data/JSON/districtData.json')
  .then(response => response.json())
  .then(data => {
      districtData = data; // Lưu dữ liệu vào biến
      const provinceSelect = document.getElementById("filterProvince");

      // Xóa tỉnh/thành phố cũ
      provinceSelect.innerHTML = '<option value="">Tất cả</option>';

      // Thêm tỉnh/thành phố từ file JSON
      Object.keys(districtData).forEach(province => {
          const option = document.createElement("option");
          option.value = province;
          option.textContent = province;
          provinceSelect.appendChild(option);
      });
  })
  .catch(error => console.error("Lỗi khi tải dữ liệu tỉnh/thành phố:", error));

// Xử lý khi chọn tỉnh/thành phố
document.getElementById("filterProvince").addEventListener("change", function () {
    const province = this.value; // Lấy giá trị tỉnh/thành phố
    const districtSelect = document.getElementById("filterDistrict");

    // Xóa tất cả quận/huyện cũ
    districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';

    if (province && districtData[province]) {
        // Kích hoạt ô chọn quận/huyện
        districtSelect.disabled = false;

        // Lấy danh sách quận/huyện theo tỉnh/thành phố
        districtData[province].forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    } else {
        // Nếu chưa chọn tỉnh/thành phố, vô hiệu hóa ô chọn quận/huyện
        districtSelect.disabled = true;
    }
})
  .catch(error => console.error("Lỗi khi tải dữ liệu JSON:", error));
