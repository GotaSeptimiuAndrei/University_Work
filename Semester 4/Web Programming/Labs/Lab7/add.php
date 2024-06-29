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

$message = '';

// Insert a new recipe into the database
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rawData = file_get_contents("php://input");

    // Decode the JSON data to a PHP array
    $data = json_decode($rawData, true);

    // Get the recipe details from the data array
    $name = isset($data['name']) ? $data['name'] : '';
    $author = isset($data['author']) ? $data['author'] : '';
    $type = isset($data['type']) ? $data['type'] : '';
    $recipe = isset($data['recipe']) ? $data['recipe'] : '';

    // Validate input fields
    $errors = [];
    if (empty($name)) {
        $errors[] = "Name is required.";
    } else if (empty($author)) {
        $errors[] = "Author is required.";
    } else if (empty($type)) {
        $errors[] = "Type is required.";
    } else if (empty($recipe)) {
        $errors[] = "Recipe is required.";
    } else if ($type !== "Dessert" && $type !== "Supe" && $type !== "Pasta") {
        $errors[] = "Please provide a valid type.";
    }

    // If there are no errors, proceed with inserting the recipe
    if (empty($errors)) {
        // Sanitize input to prevent SQL injection attacks
        $name = mysqli_real_escape_string($conn, $name);
        $author = mysqli_real_escape_string($conn, $author);
        $type = mysqli_real_escape_string($conn, $type);
        $recipe = mysqli_real_escape_string($conn, $recipe);

        $sql = "INSERT INTO Recipe (Name, Author, Type, Recipe) VALUES ('$name', '$author', '$type', '$recipe')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Recipe added successfully."]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
    } else {
        // Display validation error messages
        echo json_encode(["error" => $errors]);
    }
}

$conn->close();
?>