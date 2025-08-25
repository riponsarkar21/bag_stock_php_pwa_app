<?php
header("Content-Type: application/json");
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
    exit;
}

$date  = $conn->real_escape_string($data["date"]);
$shift = $conn->real_escape_string($data["shift"]);

$conn->query("DELETE FROM stock_entries WHERE entry_date='$date' AND shift='$shift'");

$stmt = $conn->prepare("
    INSERT INTO stock_entries (entry_date, shift, brand_key, row_label, bundle, loose) 
    VALUES (?, ?, ?, ?, ?, ?)
");

foreach ($data["brands"] as $brandKey => $rows) {
    foreach ($rows as $row) {
        $stmt->bind_param("ssssii", $date, $shift, $brandKey, $row["row"], $row["bundle"], $row["loose"]);
        $stmt->execute();
    }
}

echo json_encode(["status" => "success", "message" => "Data saved successfully"]);
?>
