<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    //Prevent other scripts from running when the preflight request is made.
    exit;
}

// Establish database connection
$servername = "127.0.0.1:3306";
$username = "root";
$password = "";
$dbname = "recipedb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve recipes of a specific type
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the raw POST data
    $rawData = file_get_contents("php://input");

    // Decode the JSON data to a PHP array
    $data = json_decode($rawData, true);

    // Get the recipe type from the data array
    $recipeType = isset($data['type']) ? $data['type'] : 'All';
    $recipes = [];

    if (strtolower($recipeType) !== "all") {
        $stmt = $conn->prepare("SELECT * FROM Recipe WHERE LOWER(Type) = ?");
        if ($stmt === false) {
            die(json_encode(["error" => "Failed to prepare SQL statement: " . $conn->error]));
        }
        $lowercaseRecipeType = strtolower($recipeType);
        $stmt->bind_param("s", $lowercaseRecipeType);
    } else {
        $stmt = $conn->prepare("SELECT * FROM Recipe");
        if ($stmt === false) {
            die(json_encode(["error" => "Failed to prepare SQL statement: " . $conn->error]));
        }
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $recipes[] = $row;
        }
    } else {
        $recipes = ["message" => "No recipes found."];
    }

    echo json_encode($recipes);
}

$conn->close();
?>