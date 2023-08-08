<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$config = parse_ini_file('config.ini');

$servername = $config['servername'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$deleteQuery = "DELETE FROM flights";
if ($conn->query($deleteQuery) !== true) {
    $error_message = $conn->error;
    echo "Error deleting flights: " . $error_message;
}

$flightData = json_decode($_POST['flightData'], true);

$values = [];
foreach ($flightData as $flight) {
    $origin = $flight['origin'];
    $destination = $flight['destination'];
    $departureDate = $flight['departureDate'];
    $departureTime = $flight['departureTime'];
    $arrivalDate = $flight['arrivalDate'];
    $arrivalTime = $flight['arrivalTime'];
    $price = intval(str_replace('$', '', $flight['price']));

    $values[] = "('$origin', '$destination', '$departureDate', '$departureTime', '$arrivalDate', '$arrivalTime', '$price')";
}

$valuesString = implode(', ', $values);

$sql = "INSERT INTO flights (origin, destination, departureDate, departureTime, arrivalDate, arrivalTime, price) 
        VALUES $valuesString";

if ($conn->query($sql) !== true) {
    $error_message = $conn->error;
    echo "Error inserting flights: " . $error_message;
}

$conn->close();
?>
