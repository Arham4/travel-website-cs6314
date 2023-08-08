<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
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

    $departureCity = $_POST['departure_city'];
    $destinationCity = $_POST['destination_city'];
    $departureDate = $_POST['departure_date'];
    $tripType = $_POST['trip_type'];
    $returnDate = $_POST['return_date'];

    $sql = "SELECT * FROM flights
            WHERE (origin = '$departureCity' AND destination = '$destinationCity' AND departureDate = '$departureDate')";

    $result = $conn->query($sql);

    $departure_flights = array();
    $arrival_flights = array();
    $suggested_flights = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $departure_flights[] = $row;
        }
    }
    
    if ($tripType === 'round_trip') {
        $sql = "SELECT * FROM flights
                WHERE (destination = '$departureCity' AND origin = '$destinationCity' AND departureDate = '$returnDate')";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $arrival_flights[] = $row;
            }
        }
    }

    if (empty($departure_flights) && empty($arrival_flights)) {
        $sql = "SELECT * FROM flights
                WHERE (origin = '$departureCity' AND destination = '$destinationCity')
                OR (destination = '$departureCity' AND origin = '$destinationCity')";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $suggested_flights[] = $row;
            }
        }
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Flight Booking</title>
    <link rel="stylesheet" type="text/css" href="mystyle.css">
  </head>
  <body>
    <div id="header">
      <h1>Flight Booking</h1>
      <div id="cart">
        <a href="cart.html">
          <img src="https://i.imgur.com/k0tsmU4.png" alt="My Cart"> My Cart </a>
      </div>
      <div id="cartPopup" class="popup">
        <h2>Shopping Cart</h2>
        <div id="dynamicCartContent"></div>
		<div id="cartPrice"></div>
        <button id="closeCart">Close</button>
      </div>
      <p id="currentDateTime"></p>
    </div>
    <div id="navbar">
      <ul>
        <li>
          <a href="home.html">Home</a>
        </li>
        <li>
          <a href="#">
            <strong>Flights</strong>
          </a>
        </li>
        <li>
          <a href="hotels.html">Hotels</a>
        </li>
        <li>
          <a href="rentalcarsbook.html">Book Rental Cars</a>
        </li>
        <li>
          <a href="orderstatus.html">Order Status</a>
        </li>
        <li>
          <a href="contact.html">Contact</a>
        </li>
        <li>
          <a href="specialoffer.html">Special Offer</a>
        </li>
      </ul>
    </div>
    <div id="content">
      <div id="sidebar">
        <h3>Terms and Conditions</h3>
        <ol>
          <li>
            <strong>All bookings are non-refundable.</strong>
          </li>
          <li>Passengers should arrive at the airport <em>at least 2 hours before departure</em>. </li>
          <li>Baggage allowance is limited to <strong>20kg</strong>. </li>
        </ol>
      </div>
      <div id="main-content">
        <div id="enter-details">
          <h3>Enter your details</h3>
          <form id="flight-form" method="post" action="">
            <p>
              <label>Name:</label>
              <input type="text" name="name">
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email">
            </p>
            <p>
              <label>Type of Trip:</label>
              <select name="trip_type" onchange="toggleTripOptions()">
                <option value="one_way">One Way</option>
                <option value="round_trip">Round Trip</option>
              </select>
            </p>
            <p>
              <label>Departure Date:</label>
              <input type="text" name="departure_date">
            </p>
            <p>
              <label>Departure City:</label>
              <input type="text" name="departure_city">
            </p>
            <p>
              <label>Destination City:</label>
              <input type="text" name="destination_city">
            </p>
            <div id="return_date_container" style="display: none;">
              <p>
                <label>Return Date:</label>
                <input type="text" name="return_date">
              </p>
            </div>
            <p>
              <label>Class:</label>
              <input type="radio" name="class" value="economy"> Economy <input type="radio" name="class" value="business"> Business
            </p>
            <p>
              <label>Passengers:</label>
              <button type="button" onclick="togglePassengerForm()">Select Passengers</button>
            </p>
            <div id="passenger-form" style="display: none;">
              <h4>Select Passenger Details</h4>
              <p>
                <label>Adults:</label>
                <input type="number" name="adults" min="0">
              </p>
              <p>
                <label>Children:</label>
                <input type="number" name="children" min="0">
              </p>
              <p>
                <label>Infants:</label>
                <input type="number" name="infants" min="0">
              </p>
            </div>
            <input type="submit" value="Search Flights">
          </form>
        </div>
        <?php if (!empty($departure_flights)): ?>
            <div id="flight-departure-table-container">
                <h3>Departure Results</h3>
                <table id="flight-departure-table">
                    <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Departure Time</th>
                        <th>Arrival Date</th>
                        <th>Arrival Time</th>
                        <th>Price</th>
                        <th>Choose Flight</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($departure_flights as $flight): ?>
                            <tr>
                                <td><?= $flight["origin"] ?></td>
                                <td><?= $flight["destination"] ?></td>
                                <td><?= $flight["departureDate"] ?></td>
                                <td><?= $flight["departureTime"] ?></td>
                                <td><?= $flight["arrivalDate"] ?></td>
                                <td><?= $flight["arrivalTime"] ?></td>
                                <td><?= $flight["price"] ?></td>
                                <td><input type="radio" name="flight_departure_radio"></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
        <?php if (!empty($arrival_flights)): ?>
            <div id="flight-arrival-table-container">
                <h3>Arrival Results</h3>
                <table id="flight-arrival-table">
                    <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Departure Time</th>
                        <th>Arrival Date</th>
                        <th>Arrival Time</th>
                        <th>Price</th>
                        <th>Choose Flight</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($arrival_flights as $flight): ?>
                            <tr>
                                <td><?= $flight["origin"] ?></td>
                                <td><?= $flight["destination"] ?></td>
                                <td><?= $flight["departureDate"] ?></td>
                                <td><?= $flight["departureTime"] ?></td>
                                <td><?= $flight["arrivalDate"] ?></td>
                                <td><?= $flight["arrivalTime"] ?></td>
                                <td><?= $flight["price"] ?></td>
                                <td><input type="radio" name="flight_arrival_radio"></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
        <?php if (!empty($suggested_flights)): ?>
            <div id="flight-suggestion-table-container">
                <h3>We were unable to find a flight for those dates</h3>
                <p>Consider these flights instead.</p>
                <table id="flight-suggestion-table">
                    <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Departure Time</th>
                        <th>Arrival Date</th>
                        <th>Arrival Time</th>
                        <th>Price</th>
                        <th>Choose Flight</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($suggested_flights as $flight): ?>
                            <tr>
                                <td><?= $flight["origin"] ?></td>
                                <td><?= $flight["destination"] ?></td>
                                <td><?= $flight["departureDate"] ?></td>
                                <td><?= $flight["departureTime"] ?></td>
                                <td><?= $flight["arrivalDate"] ?></td>
                                <td><?= $flight["arrivalTime"] ?></td>
                                <td><?= $flight["price"] ?></td>
                                <td><input type="radio" name="flight_suggestion_radio"></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
        <div id="flight-cart" style="display: none;">
          <button id="cart-icon" style="display: flex; align-items: center; justify-content: center;"> Add to Cart <img src="https://i.imgur.com/k0tsmU4.png" alt="Cart Icon">
          </button>
        </div>
      </div>
    </div>
    <div id="footer">
      <h3>Contact Information</h3>
      <dl>
        <dt>Email</dt>
        <dd>ajs180009@utdallas.edu</dd>
        <dt>Phone</dt>
        <dd>972-883-2460</dd>
      </dl>
      <h3>Submission Requirement</h3>
      <dl>
        <dt>Arham J. Siddiqui</dt>
        <dd>Net ID: AJS180009</dd>
      </dl>
      <h3>Preferences</h3>
      <div>
        <label for="backgroundColor">Background Color:</label>
        <select id="backgroundColor" onchange="setBackgroundColor(this.value)">
          <option value="#ffffff" selected>White</option>
          <option value="#f9f9f9">Light Gray</option>
          <option value="#ebebeb">Gray</option>
        </select>
      </div>
    </div>
  </body>
  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
  <script>
    function toggleTripOptions() {
        var tripTypeSelect = document.getElementsByName("trip_type")[0];
        var returnDateContainer = document.getElementById("return_date_container");

        if (tripTypeSelect.value === "round_trip") {
            returnDateContainer.style.display = "block";
        } else {
            returnDateContainer.style.display = "none";
        }
    }
  </script>
</html>