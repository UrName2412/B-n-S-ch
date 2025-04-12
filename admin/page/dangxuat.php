<?php 
session_start();

// Xóa session
session_unset();
session_destroy();

header("Location: ../index.php");
exit();
?>