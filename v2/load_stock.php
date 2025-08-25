<?php
header("Content-Type: application/json");
include "db.php";

$date  = $_GET["date"] ?? date("Y-m-d");
$shift = $_GET["shift"] ?? "A";

$result = $conn->query("SELECT * FROM stock_entries WHERE entry_date='$date' AND shift='$shift'");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
