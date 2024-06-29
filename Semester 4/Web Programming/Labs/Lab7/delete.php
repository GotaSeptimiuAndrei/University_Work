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

// Delete a recipe from the database
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the raw POST data
    $rawData = file_get_contents("php://input");

    // Decode the JSON data to a PHP array
    $data = json_decode($rawData, true);

    // Get the recipe id from the data array
    $id = isset($data['id']) ? $data['id'] : '';

    // Sanitize input to prevent SQL injection attacks
    $id = mysqli_real_escape_string($conn, $id);

    $sql = "DELETE FROM Recipe WHERE Rid='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Recipe deleted successfully."]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

$conn->close();
?>