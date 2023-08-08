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

$deleteQuery = "DELETE FROM cars";
if ($conn->query($deleteQuery) !== true) {
    $error_message = $conn->error;
    echo "Error deleting cars: " . $error_message;
}

$carData = json_decode($_POST['carData'], true);

$values = [];
foreach ($carData as $car) {
    $carName = $car['name'];
    $cityName = $car['city'];
    $checkInDate = $car['checkinDate'];
    $checkInTime = $car['checkinTime'];
    $checkOutDate = $car['checkoutDate'];
    $checkOutTime = $car['checkoutTime'];
    $price = intval(str_replace('$', '', $car['price']));

    $values[] = "('$carName', '$cityName', '$checkInDate', '$checkInTime', '$checkOutDate', '$checkOutTime', '$price')";
}

$valuesString = implode(', ', $values);

$sql = "INSERT INTO cars (carName, cityName, checkInDate, checkInTime, checkOutDate, checkOutTime, price) 
        VALUES $valuesString";

if ($conn->query($sql) !== true) {
    $error_message = $conn->error;
    echo "Error inserting cars: " . $error_message;
}

$conn->close();
?>
