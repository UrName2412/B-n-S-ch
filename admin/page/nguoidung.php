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
                <div class="active">
                    <i class="fas fa-user"></i>
                    <h3>Người dùng</h3>
                </div>
                <a href="sanpham.php">
                    <i class="fas fa-archive"></i>
                    <h3>Sản phẩm</h3>
                </a>
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

        <!--Header-->
        <div class="header">
            <div class="toggle">
                <div class="logo">
                    <a href="#">
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
            </button>
        </div>
        <!--End of Header-->

        <!-- Content Section -->
        <div class="container-content">
            <div class="content">
                <div class="grid-header">
                    <span>Vai trò</span>
                    <span>Tên người dùng</span>
                    <span>Số Điện Thoại</span>
                    <span>Email</span>
                    <span>Địa chỉ</span>
                </div>
                <div class="grid-body" id="dataUsers">
                    <!-- JSON -->
                </div>
            </div>

            <div class="menuFilter" style="display: none;">
                <div class="addressFilter">
                    <label for="city">Thành phố</label>
                    <span>:</span>
                    <select name="city" id="city">
                        <option value="">Lựa chọn</option>
                        <option value="TPHCM">Thành phố Hồ Chí Minh</option>
                    </select>
                    <label for="district">Quận</label>
                    <span>:</span>
                    <select name="district" id="district">
                        <option value="">Lựa chọn</option>
                        <option value="Quận 1">Quận 1</option>
                        <option value="Quận 3">Quận 3</option>
                    </select>
                    <label for="phoneSearch">Số điện thoại</label>
                    <span>:</span>
                    <input type="tel" name="phoneSearch" id="phoneSearch" placeholder="Nhập số điện thoại">
                </div>
                <button type="button" class="acceptFilter" onclick="handleFilter(city.value,district.value,phoneSearch.value)">Lọc</button>
            </div>


            <!-- Tool Section -->
            <div class="tool">
                <button type="button" class="add" id="addBtnUser" onclick="openToolMenu('')">
                    <i class="fas fa-plus"></i>
                </button>

                <div class="search">
                    <button type="button" id="filterBtnUser">
                        <i class="fas fa-filter"></i>
                    </button>
                    <select name="userFilter" id="userFilter" onchange="userFilter()">
                        <option value="activeUsers">Người dùng hoạt động</option>
                        <option value="bannedUsers">Người dùng bị khóa</option>
                        <option value="allUsers">Tất cả người dùng</option>
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
                <h2>Thêm Người Dùng</h2>
                <form class="form" id="form-add" method="POST" action="../handlers/them/themnguoidung.php">
                    <div class="form-group">
                        <label for="tenNguoiDung">Tên người dùng:</label>
                        <input type="text" name="tenNguoiDung" id="tenNguoiDung" placeholder="Nhập tên người dùng">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="matKhau">Mật khẩu:</label>
                        <input type="password" name="matKhau" id="matKhau" placeholder="Nhập mật khẩu">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="kiemTraMatKhau">Nhập lại mật khẩu:</label>
                        <input type="password" name="kiemTraMatKhau" id="kiemTraMatKhau" placeholder="Nhập mật khẩu">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="soDienThoai">Số điện thoại:</label>
                        <input type="tel" name="soDienThoai" id="soDienThoai" placeholder="Nhập số điện thoại">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="tel" name="email" id="email" placeholder="Nhập số điện thoại">
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="diaChi">Địa chỉ:</label>
                        <div class="address">
                            <select name="tinhThanh" id="tinhThanh">
                                <option value="">Chọn Tỉnh/Thành phố</option>
                            </select>
                            <select name="quanHuyen" id="quanHuyen">
                                <option value="">Chọn Quận/Huyện</option>
                            </select>
                            <select name="xa" id="xa">
                                <option value="">Chọn Xã/Phường</option>
                            </select>
                        </div>
                        <div>
                            <label for="duong">Đường/Số nhà:</label>
                            <input type="text" id="duong" name="duong" placeholder="Số nhà, tên đường">
                        </div>
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="vaiTro">Vai trò:</label>
                        <select name="vaiTro" id="vaiTro">
                            <option value="">Lựa chọn</option>
                            <option value="0">Người dùng</option>
                            <option value="1">Người quản trị</option>
                        </select>
                        <span class="form-message"></span>
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Thêm" class="btn-submit">
                    </div>
                </form>
            </div>
        </div>
        <!-- Thiếu địa chỉ select, vai trò -->

        <!--End of Content-Tool-->
    </div>


    <script src="../asset/js/function.js"></script>
    <script src="../asset/js/validator.js"></script>
    <script src="../asset/js/inputDataUser.js"></script>
    <script src="../asset/js/admin.js"></script>+
    <script src="../asset/js/apiAddress.js"></script>

    <script>
        messageRequired = 'Vui lòng nhập thông tin.';
        messageRequiredRole = 'Vui lòng chọn vai trò.';
        messageEmail = 'Vui lòng nhập đúng email.';
        messagePhone = 'Vui lòng nhập đúng số điện thoại.';
        messagePassword = 'Yêu cầu kí tự hoa, kí tự thường, số và ít nhất 7 kí tự.';
        messageConfirmPassword = 'Nhập sai mật khẩu, vui lòng nhập lại.';
        Validator({
            form: '#form-add',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#tenNguoiDung', messageRequired),
                Validator.isRequired('#matKhau', messageRequired),
                Validator.isRequired('#kiemTraMatKhau', messageRequired),
                Validator.isRequired('#vaiTro', messageRequiredRole),
                Validator.isPhone('#soDienThoai', messagePhone),
                Validator.minLength('#tenNguoiDung', 6),
                Validator.isPassword('#matKhau', messagePassword),
                Validator.comparePassword('#kiemTraMatKhau', 'matKhau', messageConfirmPassword),
            ]
        })
    </script>
</body>

</html>
