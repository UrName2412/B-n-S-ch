<?php
if (!defined('DB_SERVER')) {
    define('DB_SERVER', 'localhost');
}

if (!defined('DB_USERNAME')) {
    define('DB_USERNAME', 'b01u');
}

if (!defined('DB_PASSWORD')) {
    define('DB_PASSWORD', 'kDnLjxq86tbddLHt');
}

if (!defined('DB_NAME')) {
    define('DB_NAME', 'b01db');
}

// Create connection
$database = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($database->connect_error){
    die("Lỗi: không kết nối được database. " . $database->connect_error);
}
$database->set_charset("utf8mb4");
?>