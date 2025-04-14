<?php 
session_start();

// Xóa session
unset($_SESSION['usernameadmin']);
unset($_SESSION['passadmin']);
unset($_SESSION['roleadmin']);

header("Location: ../index.php");
exit();
?>