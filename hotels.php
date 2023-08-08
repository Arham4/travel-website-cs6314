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

// Delete existing hotel entries
$deleteQuery = "DELETE FROM hotels";
if ($conn->query($deleteQuery) !== true) {
    $error_message = $conn->error;
    echo "Error deleting hotels: " . $error_message;
}

$hotelData = json_decode($_POST['hotelData'], true);

$values = [];
foreach ($hotelData as $hotel) {
    $cityName = $hotel['city'];
    $hotelName = $hotel['name'];
    $checkInDate = $hotel['checkinDate'];
    $checkInTime = $hotel['checkinTime'];
    $checkOutDate = $hotel['checkoutDate'];
    $checkOutTime = $hotel['checkoutTime'];
    $price = intval(str_replace('$', '', $hotel['price'])); // Remove dollar sign and convert to integer

    $values[] = "('$cityName', '$hotelName', '$checkInDate', '$checkInTime', '$checkOutDate', '$checkOutTime', '$price')";
}

$valuesString = implode(', ', $values);

$sql = "INSERT INTO hotels (cityName, hotelName, checkInDate, checkInTime, checkOutDate, checkOutTime, price) 
        VALUES $valuesString";

if ($conn->query($sql) !== true) {
    $error_message = $conn->error;
    echo "Error inserting hotels: " . $error_message;
}

$conn->close();
?>
