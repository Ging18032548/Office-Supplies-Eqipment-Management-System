<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// เชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root"; // ปรับตามการตั้งค่า
$password = ""; // ถ้ามีรหัสผ่านให้ใส่
$dbname = "webdb"; // ชื่อฐานข้อมูล

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// รับค่าตารางที่ต้องการจาก URL
$table = isset($_GET['table']) ? $_GET['table'] : 'equipment';

// ป้องกัน SQL Injection
$allowed_tables = ["equipment", "maintenance", "borrow_records", "user"];
if (!in_array($table, $allowed_tables)) {
    die(json_encode(["error" => "Invalid table"]));
}

// ดึงข้อมูลจากตารางที่เลือก
$sql = "SELECT * FROM $table";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
