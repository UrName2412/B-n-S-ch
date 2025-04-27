<?php
session_start();

// Xóa session
unset($_SESSION['username']);
unset($_SESSION['pass']);
unset($_SESSION['role']);
unset($_SESSION['cart']);
unset($_SESSION['maDon']);

header("Location: ../index.php");
exit();
?>