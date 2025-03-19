<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../asset/css/style.css">
    <link rel="stylesheet" href="../asset/css/function.css">
    <link rel="stylesheet" href="../vender/css/fontawesome-free/css/all.min.css">
    <title>Admin </title>
</head>



<body>
    <div class="container">

        <!--Sidebar Section-->
        <aside>
            <div class="sidebar">
                <a href="thongke.php">
                    <i class="fas fa-chart-line"></i>
                    <h3>Thống kê</h3>
                </a>
                <a href="nguoidung.php">
                    <i class="fas fa-user"></i>
                    <h3>Người dùng</h3>
                </a>
                <div class="active">
                    <i class="fas fa-archive"></i>
                    <h3>Sản phẩm</h3>
                </div>
                <a href="donhang.php">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Đơn hàng</h3>
                </a>
                <a href="../index.php" class="last-child">
                    <i class="fas fa-sign-out-alt"></i>
                    <h3>Đăng xuất</h3>
                </a>
            </div>
        </aside>
        <!--End of Sidebar Section-->

        <!--Header--><div class="header">
            <div class="toggle">
                <div class="logo">
                    <a href="nguoidung.php">
                        <img src="../image/LogoSach.png">
                        <h2>Admin</h2>
                    </a>
                </div>
            </div>
            <button type="button" class="close" id="closeHeaderButton">
                <img src="../image/close.png" alt="close" class="icon">
            </button>
            <button type="button" class="menuHeader" id="menuHeaderButton">
                <img src="../image/menu.png" alt="menu" class="icon">
            </button>
        </div>
        <!--End of Header-->

        <!-- Content Section -->
        <div class="container-content">
            <div class="content">
                <div class="grid-header-product">
                    <span>Mã Sách</span>
                    <span>Tên Sách</span>
                    <span>Tác Giả</span>
                    <span>Thể Loại</span>
                    <span>Nhà Xuất Bản</span>
                    <span>Giá Tiền</span>
                    <span>Hình ảnh</span>
                </div>
                <div class="grid-body" id="dataProducts">
                    <!-- JSON -->
                </div>
            </div>


            <div class="menuFilter" style="display: none;">
                <div class="addressFilter">
                    <label for="authorSearch">Tác giả</label>
                    <span>:</span>
                    <input type="text" name="authorSearch" id="authorSearch" placeholder="Nhập tên tác giả">
                    <label for="categorySearch">Thể loại</label>
                    <span>:</span>
                    <select name="categorySearch" id="categorySearch">
                        <option value="">Lựa chọn</option>
                        <option value="Kỹ năng sống">Kỹ năng sống</option>
                        <option value="Tiểu thuyết">Tiểu thuyết</option>
                    </select>
                    <label for="nxbSearch">Nhà xuất bản</label>
                    <span>:</span>
                    <select name="nxbSearch" id="nxbSearch">
                        <option value="">Lựa chọn</option>
                        <option value="Trẻ">Trẻ</option>
                        <option value="Nhã Nam">Nhã Nam</option>
                    </select>
                    <label for="authorSearch">Giá tiền</label>
                    <span>:</span>
                    <div>
                        <div class="timeFilter">
                            <div class="part">
                                <label for="priceStart">Từ</label>
                                <input type="text" name="priceStart" id="priceStart">
                            </div>
                            <div class="part">
                                <label for="priceEnd">Đến</label>
                                <input type="text" name="priceEnd" id="priceEnd">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="acceptFilter" onclick="handleFilter(authorSearch.value,categorySearch.value,nxbSearch.value,priceStart.value,priceEnd.value)">Lọc</button>
            </div>

            <!-- Tool Section -->
            <div class="tool">
                <button type="button" class="add" id="addBtnProduct" onclick="openToolMenu('')">
                    <i class="fas fa-plus"></i>
                </button>
                <div class="search">
                    <button type="button" id="filterBtnProduct">
                        <i class="fas fa-filter"></i>
                    </button>
                    <select name="productFilter" id="productFilter" onchange="productFilter()">
                        <option value="activeProducts">Sản phẩm hoạt động</option>
                        <option value="deletedProducts">Sản phẩm bị xóa</option>
                        <option value="allProducts">Tất cả sản phẩm</option>
                    </select>
                    <input type="text" name="search" placeholder="Tìm kiếm..." id="searchInput">
                    <button type="button" id="searchButton" onclick="searchButton()">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Tool Menu -->

        <div class="tool-menu" style="display: none;" id="tool-menu">
            <button type="button" class="menu-close" id="closeToolMenuButton">
                <i class="fas fa-times"></i>
            </button>
            <div class="menu-add">
                <h2>Thêm Sản Phẩm</h2>
                <form class="form" id="form-add">
                    <div class="form-group">
                        <label for="picture">Hình ảnh:</label>
                        <input type="file" name="picture" id="picture" placeholder="Chọn ảnh">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="id">Mã sách:</label>
                        <input type="text" name="id" id="id" placeholder="Nhập mã sách">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="name">Tên sách:</label>
                        <input type="text" name="name" id="name" placeholder="Nhập tên sách">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="author">Tác giả:</label>
                        <input type="text" name="author" id="author" placeholder="Nhập tác giả">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="category">Thể loại:</label>
                        <select name="category" id="category">
                            <option value="">Lựa chọn:</option>
                            <option value="thieunhi">Thiếu nhi</option>
                            <option value="kynangsong">Kỹ năng sống</option>
                            <option value="tieuthuyet">Tiểu thuyết</option>
                            <option value="phatgiao">Phật giáo</option>
                            <option value="vanhoc">Văn học</option>
                            <option value="truyencamhung">Truyền cảm hứng</option>
                            <option value="hoiky">Hồi ký</option>
                            <option value="tamly">Tâm lý</option>
                            <option value="khoahockithuat">Khoa học kĩ thuật</option>
                            <option value="tongiao">Tôn giáo</option>
                            <option value="trinhtham">Trinh thám</option>
                            <option value="tanvan">Tản văn</option>
                            <option value="kinhte">Kinh tế</option>
                            <option value="giatuong">Giả tưởng</option>
                            <option value="thieunhi">Thiếu nhi</option>
                            <option value="giaotrinh">Giáo trình</option>
                            <option value="tudien">Từ điển</option>
                        </select>
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="nxb">Nhà xuất bản:</label>
                        <input type="text" name="nxb" id="nxb" placeholder="Nhập nhà xuất bản">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="price">Giá tiền:</label>
                        <input type="text" name="price" id="price" placeholder="Nhập giá tiền">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="description">Mô tả:</label>
                        <textarea name="description"></textarea>
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn-submit">Thêm</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Cần sửa nhà xuất bản với thể loại theo type select (lấy từ dữ liệu) -->

        <!--End of Content-Tool-->
    </div>

    <script src="../asset/js/function.js"></script>
    <script src="../asset/js/validator.js"></script>
    <script src="../asset/js/inputDataProduct.js"></script>
    <script src="../asset/js/admin.js"></script>
    
    <script>
        messageRequired = 'Vui lòng nhập thông tin.';
        Validator({
            form: '#form-add',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#id',messageRequired),
                Validator.isRequired('#name',messageRequired),
                Validator.isRequired('#author',messageRequired),
                Validator.isRequired('#category','Vui lòng chọn thể loại'),
                Validator.isRequired('#nxb',messageRequired),
                Validator.isRequired('#price',messageRequired),
            ]
        })
    </script>
</body>

</html>