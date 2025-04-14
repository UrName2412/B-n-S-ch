<?php
require 'config/config.php';
require 'handlers/admin_handle.php';

session_start();
if (isset($_SESSION['usernameadmin']) && (isset($_SESSION['roleadmin']) && $_SESSION['roleadmin'] == true)) {
    header("Location: page/thongke.php");
    exit();
}

function test_input($data)
{
    return htmlspecialchars(stripslashes(trim($data)));
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $username = test_input($_POST['usernameadmin']);
    $password = test_input($_POST['passadmin']);

    $admin = checkLogin($database, $username, $password);

    if (!$admin) {
        echo "<script>alert('Tên đăng nhập hoặc mật khẩu không đúng');</script>";
    } else if ($admin['vaiTro'] == false) {
        echo "<script>alert('Tài khoản của bạn không tồn tại hoặc không có quyền quản trị');</script>";
    } else if ($admin['trangThai'] == false) {
        echo "<script>alert('Tài khoản của bạn không tồn tại hoặc đã bị khóa');</script>";
    } else {
        $_SESSION['usernameadmin'] = $admin['tenNguoiDung'];
        $_SESSION['adminadmin'] = $admin;
        $_SESSION['roleadmin'] = true;

        echo "<script>alert('Đăng nhập thành công');</script>";
        header("Location: page/thongke.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="vender/css/bootstrap.min.css">
    <!-- FONT AWESOME  -->
    <link rel="stylesheet" href="vender/css/fontawesome-free/css/all.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="asset/css/admin.css">
</head>

<body>
    <div class="blur-overlay"></div>
    <div class="container-fluid text-dark">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="d-flex justify-content-center p-3 text-white">
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="card-header d-flex justify-content-center text-white">
                        <h4 class="fw-bold my-1">ĐĂNG NHẬP</h4>
                    </div>
                    <div class="card-body">
                        <form action="index.php" name="signinform" id="signinform" method="post">
                            <div class="mb-3">
                                <label class="form-label text-white" for="usernameadmin">Tên đăng nhập</label>
                                <input class="form-control" type="text" name="usernameadmin" id="usernameadmin" placeholder="Nhập tên đăng nhập" value="<?php echo isset($username) ? $username : ''; ?>">
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white" for="passadmin">Mật khẩu</label>
                                <input class="form-control" type="password" name="passadmin" id="passadmin" placeholder="Nhập mật khẩu" value="<?php echo isset($password) ? $password : ''; ?>">
                            </div>
                            <button type="submit" class="btn text-white w-100">Đăng Nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="vender/js/bootstrap.bundle.min.js"></script>
    <script src="asset/js/login.js"></script>
</body>

</html>