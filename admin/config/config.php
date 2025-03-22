<?php
DEFINE('DB_SERVER','localhost');
DEFINE('DB_USERNAME','root');
DEFINE('DB_PASSWORD','');
DEFINE('DB_NAME','webbansach');

// Create connection
$database = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($database->connect_error){
    die("Lỗi: không kết nối được database. " . $database->connect_error);
}
?>