<?php
$host = "localhost";
$user = "root";      // your phpMyAdmin username
$pass = "";          // your phpMyAdmin password
$db   = "bag_stock";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
