<?php
session_start();

// Xóa session
session_unset();
session_destroy();

// Xóa cookie đăng nhập
setcookie('username', '', time() - 3600, "/");
setcookie('pass', '', time() - 3600, "/");

header("Location: ../index.php");
exit();
?>