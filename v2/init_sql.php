<?php
// Database connection details
$host = "localhost";   // Change if needed
$user = "root";        // Your DB username
$pass = "";            // Your DB password
$db   = "bag_stock";   // Database name (same as in .sql file)

// Path to SQL file
$sqlFile = __DIR__ . "/bag_stock.sql";

// Create connection
$conn = new mysqli($host, $user, $pass);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
if ($conn->query("CREATE DATABASE IF NOT EXISTS `$db`") === TRUE) {
    echo "Database `$db` created or already exists.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($db);

// Import SQL file
if (file_exists($sqlFile)) {
    $sql = file_get_contents($sqlFile);

    if ($conn->multi_query($sql)) {
        echo "Database imported successfully from bag_stock.sql";
    } else {
        echo "Error importing database: " . $conn->error;
    }
} else {
    die("SQL file not found: $sqlFile");
}

// Close connection
$conn->close();
?>
