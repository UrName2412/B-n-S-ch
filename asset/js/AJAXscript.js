document.addEventListener("DOMContentLoaded", function () {
    const productsPerPage = 6;
    const paginationContainer = document.querySelector(".pagination-container .pagination");
    let currentPage = 1;
    let products = [];

    // Hàm hiển thị sản phẩm theo trang
    function showPage(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        document.getElementById("listProduct").innerHTML = ""; // Xóa danh sách cũ

        products.slice(start, end).forEach(productHTML => {
            document.getElementById("listProduct").innerHTML += productHTML;
        });
    }

    // Hàm tạo phân trang
    function createPagination() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        paginationContainer.innerHTML = ""; // Xóa phân trang cũ

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === currentPage) li.classList.add("active");

            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#";
            a.textContent = i;
            a.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
                createPagination();
            });

            li.appendChild(a);
            paginationContainer.appendChild(li);
        }
    }
    document.getElementById("resetFilter").addEventListener("click", function () {
        window.location.reload();
    });
    // Gọi từ AJAX
    document.getElementById("filterBtn").addEventListener("click", function () {
        let category = document.getElementById("theloai").value || "";
        let minPrice = document.getElementById("minPrice").value || "0";
        let maxPrice = document.getElementById("maxPrice").value || "999999";
        let tenSach = document.getElementById("tensach").value.trim().toLowerCase();
        let tacGia = document.getElementById("tentacgia").value.trim().toLowerCase();
        let nhaXuatBan = document.getElementById("nxb").value.trim().toLowerCase();
        let theloai = document.getElementById("theloai").value.trim().toLowerCase();

        let url = `../fetch_product.php?category=${category}&min_price=${minPrice}&max_price=${maxPrice}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let filteredProducts = data.filter(product => {
                    let productName = (product.tenSach || "").toLowerCase();
                    if (tenSach && !productName.includes(tenSach)) return false;

                    let productAuthor = (product.tacGia || "").toLowerCase();
                    if (tacGia && !productAuthor.includes(tacGia)) return false;

                    let productPublisher = (product.maNhaXuatBan || "").toLowerCase();
                    if (nhaXuatBan && !productPublisher.includes(nhaXuatBan)) return false;

                    let productCategory = (product.maTheLoai || "").toLowerCase();
                    if (theloai && !productCategory.includes(theloai)) return false;

                    let productPrice = parseInt(product.giaBan, 10);
                    let minPriceNum = parseInt(minPrice, 10);
                    let maxPriceNum = parseInt(maxPrice, 10);
                    if ((minPrice && productPrice < minPriceNum) || (maxPrice && productPrice > maxPriceNum)) return false;

                    return true;
                });

                if (filteredProducts.length === 0) {
                    document.getElementById("listProduct").innerHTML = '<p style="text-align:center; font-size:1.25rem; color:red;">Không có sản phẩm nào phù hợp.</p>';
                    paginationContainer.innerHTML = ""; // Xóa phân trang nếu không có sản phẩm
                    return;
                }

                // Lưu sản phẩm vào mảng products dưới dạng HTML
                products = filteredProducts.map(product => `
                    <div class="col-md-4 mb-4">
                        <div class="card" style="width: 100%;">
                            <a href="chitietsanpham.php?id=${product.maSach}">
                                <img src="../Images/${product.hinhAnh}" alt="${product.tenSach}" class="card-img-top">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">${product.tenSach}</h5>
                                <p class="card-text">Tác giả: ${product.tacGia}</p>
                                <p class="card-text">Nhà xuất bản: ${product.maNhaXuatBan}</p>
                                <p class="card-text">Thể loại: ${product.maTheLoai}</p>
                                <p class="card-text text-danger fw-bold">${formatPrice(product.giaBan)} đ</p>
                                <button class="btn" style="background-color: #336799; color: #ffffff;">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                `);

                // Reset lại trang hiện tại khi lọc
                currentPage = 1;
                showPage(currentPage);
                createPagination();
            })
            .catch(error => console.log("Lỗi khi tải sản phẩm:", error));
    });

    // Hàm định dạng giá tiền
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price);
    }
});
