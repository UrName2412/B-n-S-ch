document.addEventListener("DOMContentLoaded", function () {
    const productsPerPage = 9;
    const paginationContainer = document.querySelector(".pagination-container .pagination");
    let currentPage = 1;
    let products = [];
    let resetButton = document.getElementById("resetFilter");

    resetButton.addEventListener("click", function () {
        window.location.reload(); // Tải lại trang để reset tất cả các bộ lọc
    })

    function fetchProductDetails(productId,baseUrl) {
        const modalElement = document.getElementById('productDetailModal');
        const modalContent = document.getElementById('productDetailContent');
        
        if (!modalElement || !modalContent) {
            console.error('Modal elements not found');
            return;
        }
        
        modalContent.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        
        fetch(`${baseUrl}?id=${productId}`)
            .then(response => response.text())
            .then(data => {
                modalContent.innerHTML = data;
                
                // Create and show modal
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
                
                // Add event listener for Add to Cart button after content is loaded
                const addToCartBtn = modalContent.querySelector('.add-to-cart-detail');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', function() {
                        try {
                            const name = modalContent.querySelector('h5').textContent;
                            const price = modalContent.querySelector('.text-danger').textContent;
                            const img = modalContent.querySelector('img').src;
                            
                            if (typeof addToCart === 'function') {
                                addToCart(name, price, img, productId);
                                const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                                cartModal.show();
                                modal.hide();
                            }
                        } catch (err) {
                            console.error('Error handling cart operation:', err);
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                modalContent.innerHTML = '<div class="alert alert-danger">Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</div>';
            });
    }

    // Remove duplicate event listeners
    let productDetailModal = document.getElementById('productDetailModal');
    if (productDetailModal) {
        productDetailModal.addEventListener('hidden.bs.modal', function () {
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('padding-right');
            document.body.style.removeProperty('overflow');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        });
    }

    // Use event delegation for view detail links
    document.addEventListener('click', function(e) {
        const viewDetailLink = e.target.closest('.view-detail');
        if (viewDetailLink) {
            e.preventDefault();
            const productId = viewDetailLink.getAttribute('data-id');
            const baseUrl = document.getElementById('baseUrl').value;
            if (productId) {
                fetchProductDetails(productId, baseUrl);
            }
        }
    });

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

        // Add First Page button
        if (currentPage > 1) {
            const firstLi = document.createElement("li");
            firstLi.classList.add("page-item");
            const firstLink = document.createElement("a");
            firstLink.classList.add("page-link");
            firstLink.href = "#top";
            firstLink.innerHTML = "&#171;&#171;"; // Double left arrow
            firstLink.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = 1;
                showPage(currentPage);
                createPagination();
                document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            });
            firstLi.appendChild(firstLink);
            paginationContainer.appendChild(firstLi);
        }

        // Tính trang bắt đầu và kết thúc để chỉ hiển thị tối đa 3 trang
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);

        if (endPage - startPage < 2) {
            startPage = Math.max(1, endPage - 2);
        }

        // Nút « quay về
        if (currentPage > 1) {
            const prevLi = document.createElement("li");
            prevLi.classList.add("page-item");

            const prevLink = document.createElement("a");
            prevLink.classList.add("page-link");
            prevLink.href = "#top";
            prevLink.innerHTML = "&laquo;";
            prevLink.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage--;
                showPage(currentPage);
                createPagination();
                document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            });

            prevLi.appendChild(prevLink);
            paginationContainer.appendChild(prevLi);
        }

        // Các trang số
        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement("li");
            li.classList.add("page-item");
            if (i === currentPage) li.classList.add("active");

            const a = document.createElement("a");
            a.classList.add("page-link");
            a.href = "#top";
            a.textContent = i;
            a.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = i;
                showPage(currentPage);
                createPagination();
                document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            });

            li.appendChild(a);
            paginationContainer.appendChild(li);
        }

        // Nút » tiếp theo
        if (currentPage < totalPages) {
            const nextLi = document.createElement("li");
            nextLi.classList.add("page-item");

            const nextLink = document.createElement("a");
            nextLink.classList.add("page-link");
            nextLink.href = "#top";
            nextLink.innerHTML = "&raquo;";
            nextLink.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage++;
                showPage(currentPage);
                createPagination();
                document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            });

            nextLi.appendChild(nextLink);
            paginationContainer.appendChild(nextLi);
        }

        // Add Last Page button
        if (currentPage < totalPages) {
            const lastLi = document.createElement("li");
            lastLi.classList.add("page-item");
            const lastLink = document.createElement("a");
            lastLink.classList.add("page-link");
            lastLink.href = "#top";
            lastLink.innerHTML = "&#187;&#187;"; // Double right arrow
            lastLink.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = totalPages;
                showPage(currentPage);
                createPagination();
                document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            });
            lastLi.appendChild(lastLink);
            paginationContainer.appendChild(lastLi);
        }
    }

    // Gọi từ AJAX
    document.getElementById("filterBtn").addEventListener("click", function () {
        const listProduct = document.getElementById("listProduct");
        listProduct.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        document.getElementById('top').scrollIntoView({ behavior: 'smooth' });

        let category = document.getElementById("theloai").value || "";
        let minPrice = document.getElementById("minPrice").value || "0";
        let maxPrice = document.getElementById("maxPrice").value || "999999";
        let tenSach = document.getElementById("tensach").value.trim().toLowerCase();
        let tacGia = document.getElementById("tentacgia").value.trim().toLowerCase();
        let nhaXuatBan = document.getElementById("nxb").value.trim().toLowerCase();
        let theloai = document.getElementById("theloai").value.trim().toLowerCase();

        let url = `../asset/handler/fetch_product.php?category=${category}&min_price=${minPrice}&max_price=${maxPrice}`;

        fetch(url)
            .then(response => response.text()) // Đọc phản hồi dưới dạng text
            .then(data => {
                try {
                    return JSON.parse(data); // Thử parse JSON
                } catch (error) {
                    console.error("Lỗi khi parse JSON:", error);
                    throw new Error("Server không trả về JSON hợp lệ");
                }
            })
            .catch(error => console.log("Lỗi khi tải sản phẩm:", error));

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
                            <a href="#" class="view-detail" data-id="${product.maSach}">
                                <img src="../Images/${product.hinhAnh}" alt="${product.tenSach}" class="card-img-top">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">${product.tenSach}</h5>
                                <p class="card-text">Thể loại: ${product.tenTheLoai}</p>
                                <p class="card-text text-danger fw-bold">${formatVND(product.giaBan)}</p>
                                <button class="btn" style="background-color: #336799; color: #ffffff;">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    </div>`);

                // Reset lại trang hiện tại khi lọc
                currentPage = 1;
                showPage(currentPage);
                createPagination();
            })
            .catch(error => console.log("Lỗi khi tải sản phẩm:", error));
    });
});

function loadProducts(page = 1) {
    function formatVND(price) {
        return new Intl.NumberFormat('vi-VN').format(price);
    }

    fetch('../asset/handler/pagination.php?page=' + page)
        .then(response => response.json())
        .then(data => {
            let products = data.products;
            let totalPages = data.totalPages;

            let listProduct = document.getElementById('listProduct');
            listProduct.innerHTML = '';

            products.forEach(function (product) {
                let productDiv = document.createElement('div');
                productDiv.classList.add('col-md-4', 'mb-4');
                productDiv.innerHTML = `
                    <div class="card" style="width: 100%;">
                        <a href="#" class="view-detail" data-id="${product.maSach}">
                            <img src="../Images/${product.hinhAnh}" alt="${product.tenSach}" class="card-img-top">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${product.tenSach}</h5>
                            <p class="card-text">Thể loại: ${product.tenTheLoai}</p>
                            <p class="card-text text-danger fw-bold">${formatVND(product.giaBan)} đ</p>
                            <button class="btn" style="background-color: #336799; color: #ffffff;">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                `;
                listProduct.appendChild(productDiv);
            });

            // ======= PHÂN TRANG TỐI ĐA 3 TRANG + MŨI TÊN =======
            let paginationHTML = '';
            let startPage = Math.max(1, page - 1);
            let endPage = Math.min(totalPages, startPage + 2);

            if (endPage - startPage < 2) {
                startPage = Math.max(1, endPage - 2);
            }

            // First page button
            if (page > 1) {
                paginationHTML += `
                    <li class="page-item">
                        <a class="page-link" href="#top" onclick="loadProducts(1)">&#171;&#171;</a>
                    </li>
                `;
            }

            // Nút quay về
            if (page > 1) {
                paginationHTML += `
                    <li class="page-item">
                        <a class="page-link" href="#top" onclick="loadProducts(${page - 1})">&laquo;</a>
                    </li>
                `;
            }

            // Các trang số
            for (let i = startPage; i <= endPage; i++) {
                paginationHTML += `
                    <li class="page-item ${i === page ? 'active' : ''}">
                        <a class="page-link" href="#top" onclick="loadProducts(${i})">${i}</a>
                    </li>
                `;
            }

            // Nút tiến tới
            if (page < totalPages) {
                paginationHTML += `
                    <li class="page-item">
                        <a class="page-link" href="#top" onclick="loadProducts(${page + 1})">&raquo;</a>
                    </li>
                `;
            }

            // Last page button
            if (page < totalPages) {
                paginationHTML += `
                    <li class="page-item">
                        <a class="page-link" href="#top" onclick="loadProducts(${totalPages})">&#187;&#187;</a>
                    </li>
                `;
            }

            document.getElementById('pagination').innerHTML = paginationHTML;
        })
        .catch(error => console.error('Error loading products:', error));
}

function formatVND(value) {
    const cleaned = String(value).replace(/[^\d]/g, '');
    const number = Number(cleaned);
    if (isNaN(number)) return '0 đ';

    return number.toLocaleString('vi-VN') + ' đ';
}