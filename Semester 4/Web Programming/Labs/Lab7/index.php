<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
session_start();

$response = [];

// Check if the login form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $username = $request->username;
    $password = $request->password;

    // Validate username and password
    if ($username === 'admin' && $password === '123') {
        // Authentication successful, set session variables
        $_SESSION['username'] = $username;
        $_SESSION['loggedin'] = true; // Set the loggedin session variable

        $response['status'] = 'success';
    } else {
        // Invalid credentials
        $response['status'] = 'error';
        $response['message'] = 'Invalid username or password.';
    }
}

// Logout logic
if (isset($_GET['logout'])) {
    session_destroy();
    $response['status'] = 'logged out';
}

echo json_encode($response);
?>