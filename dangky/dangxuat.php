<?php
session_start();

// Xóa session
unset($_SESSION['username']);
unset($_SESSION['pass']);
unset($_SESSION['role']);
unset($_SESSION['cart']);
// Xóa cookie đăng nhập
setcookie('username', '', time() - 3600, "/");
setcookie('pass', '', time() - 3600, "/");
setcookie('role', '', time() - 3600, "/");

header("Location: ../index.php");
exit();
?>