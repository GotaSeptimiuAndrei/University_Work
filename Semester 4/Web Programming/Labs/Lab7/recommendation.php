<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    //Prevent other scripts from running when the preflight request is made.
    exit;
}

$servername = "127.0.0.1:3306";
$username = "root";
$password = "";
$dbname = "recipedb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve a random recipe from the database
$sql = "SELECT * FROM Recipe ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    // No recipe found in the database
    echo json_encode(["message" => "No Recipe Found"]);
}

$conn->close();
?>