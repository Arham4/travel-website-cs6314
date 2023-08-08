<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
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

$passengerId = $_COOKIE["passengerId"];

$sql = "SELECT
            *
          FROM
            flights AS f
          WHERE
            f.id IN (
              SELECT
                fb.flightId
              FROM
                flight_bookings AS fb
              WHERE
                fb.passengerId = '$passengerId'
            );";

$result = $conn->query($sql);

$flightDetails = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $flightDetails[] = $row;
    }
}

$sql = "SELECT
            *
          FROM
            hotels AS h
          WHERE
            h.id IN (
              SELECT
                hb.hotelId
              FROM
                hotel_bookings AS hb
              WHERE
                hb.passengerId = '$passengerId'
            );";

$result = $conn->query($sql);

$hotelDetails = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
      $hotelDetails[] = $row;
  }
}

$sql = "SELECT
            *
          FROM
            cars AS c
          WHERE
            c.id IN (
              SELECT
                cb.carId
              FROM
                car_bookings AS cb
              WHERE
                cb.passengerId = '$passengerId'
            );";

$result = $conn->query($sql);

$carDetails = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
      $carDetails[] = $row;
  }
}

$conn->close();

$output = [
    "flightDetails" => $flightDetails,
    "hotelDetails" => $hotelDetails,
    "carDetails" => $carDetails,
];

echo json_encode($output);

?>