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

$carDetails = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"];
    
    if ($action === "find_cars") {
      $cityName = $_POST['city'];
      $checkinDate = $_POST['checkin_date'];
      $checkoutDate = $_POST['checkout_date'];
  
      $sql = "SELECT * FROM cars
              WHERE cityName = '$cityName' AND checkInDate = '$checkinDate' AND checkOutDate = '$checkoutDate'";
  
      $result = $conn->query($sql);
  
      $available_cars = array();
      $suggested_cars = array();
  
      if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
              $available_cars[] = $row;
          }
      }

      if (empty($available_cars)) {
        $sql = "SELECT * FROM cars
                WHERE cityName = '$cityName'";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $suggested_cars[] = $row;
            }
        }
      }
    } elseif ($action === "book_car") {
      $carId = $_POST["carId"];
      $passengerId = $_COOKIE["passengerId"];
      $status = $_POST["status"];

      $sql = "INSERT INTO car_bookings (carId, passengerId, status) VALUES ('$carId', '$passengerId', '$status')";
      $result = $conn->query($sql);

      if ($result === true) {
        echo "Car booked successfully!";
      } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
      }
    }
}

$passengerId = $_COOKIE["passengerId"];

$sql = "SELECT
            c.carName AS car_name,
            c.cityName AS city_name,
            c.price AS car_price
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

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
      $carDetails[] = [
          "car_name" => $row["car_name"],
          "city_name" => $row["city_name"],
          "car_price" => $row["car_price"],
      ];
  }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Car Booking</title>
    <link rel="stylesheet" type="text/css" href="mystyle.css">
  </head>
  <body>
    <div id="header">
      <h1>Car Booking</h1>
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
          <a href="BookingFlight.php">Flights</a>
        </li>
        <li>
          <a href="BookingHotel.php">Hotels</a>
        </li>
        <li>
          <a href="#">
            <strong>Book Rental Cars</strong>
          </a>
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
          <li><strong>All bookings are non-refundable.</strong></li>
          <li>Passengers should arrive at the airport <em>at least 2 hours before departure</em>.</li>
          <li>Baggage allowance is limited to <strong>20kg</strong>.</li>
        </ol>
      </div>
      <div id="main-content">
        <div id="commodity-search">
          <h3>Car Search</h3>
          <form id="car-form" method="post" action="">
            <p>
              <label>City:</label>
              <input type="text" name="city" required>
            </p>
            <p>
              <label>Check-in Date:</label>
              <input type="date" name="checkin_date" required>
            </p>
            <p>
              <label>Check-out Date:</label>
              <input type="date" name="checkout_date" required>
            </p>
            <input type="hidden" name="action" value="find_cars">
            <input type="submit" value="Search">
          </form>
        </div>
        <?php if (!empty($available_cars)): ?>
          <div id="car-table-container">
            <h3>Regular Results</h3>
            <table id="car-table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Car Name</th>
                <th>City Name</th>
                <th>Check-in Date</th>
                <th>Check-in Time</th>
                <th>Check-out Date</th>
                <th>Check-out Time</th>
                <th>Price</th>
                <th>Choose Car</th>
              </tr>
              </thead>
              <tbody>
                <?php foreach ($available_cars as $car): ?>
                    <tr>
                      <td><?= $car["id"] ?></td>
                      <td><?= $car["carName"] ?></td>
                      <td><?= $car["cityName"] ?></td>
                      <td><?= $car["checkInDate"] ?></td>
                      <td><?= $car["checkInTime"] ?></td>
                      <td><?= $car["checkOutDate"] ?></td>
                      <td><?= $car["checkOutTime"] ?></td>
                      <td><?= $car["price"] ?></td>
                      <td><input type="radio" name="car_radio"></td>
                    </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>
        <?php if (!empty($suggested_cars)): ?>
          <div id="car-suggestion-table-container">
            <h3>We were unable to find a car for those dates</h3>
            <p>Consider these cars instead.</p>
            <table id="car-suggestion-table">
              <thead>
              <tr>
                <th>ID</th>
                <th>Car Name</th>
                <th>City Name</th>
                <th>Check-in Date</th>
                <th>Check-in Time</th>
                <th>Check-out Date</th>
                <th>Check-out Time</th>
                <th>Price</th>
                <th>Choose Car</th>
              </tr>
              </thead>
              <tbody>
                <?php foreach ($suggestion_cars as $car): ?>
                    <tr>
                      <td><?= $car["id"] ?></td>
                      <td><?= $car["carName"] ?></td>
                      <td><?= $car["cityName"] ?></td>
                      <td><?= $car["checkInDate"] ?></td>
                      <td><?= $car["checkInTime"] ?></td>
                      <td><?= $car["checkOutDate"] ?></td>
                      <td><?= $car["checkOutTime"] ?></td>
                      <td><?= $car["price"] ?></td>
                      <td><input type="radio" name="car_radio"></td>
                    </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>
        <?php if (!empty($suggested_cars) || !empty($available_cars)): ?>
          <div id="car-cart">
            <button id="cart-icon" style="display: flex; align-items: center; justify-content: center;">
              Add to Cart
              <img src="https://i.imgur.com/k0tsmU4.png" alt="Cart Icon">
            </button>
          </div>
        <?php endif; ?>
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
    function selectCar(id, status) {
      $.ajax({
        url: 'http://localhost:3000/BookingCar.php',
        type: 'POST',
        data: {
          carId: id,
          status: status,
          action: 'book_car',
        },
        success: function(response) {
          alert('Car booked!');
        },
        error: function(xhr, status, error) {
          alert('Error booking car.');
        }
      });
		}

		function handleCarSelection(table) {
			const $cars = $("#" + table + " tbody tr");
			$cars.removeClass("selected-car");

			$("input[type='radio']:checked").each(function() {
				const $selectedCar = $(this).closest("tr");
				$selectedCar.addClass("selected-car");
			});

			$cars.css("opacity", 1);
			$cars.filter(".selected-car").css("opacity", 0.5);
		}

    $(document).ready(function() {
      $(document).on("change", "#car-table input[type='radio']", function() {
        handleCarSelection("car-table");
      });

      $(document).on("change", "#car-suggestion-table input[type='radio']", function() {
        handleCarSelection("car-suggestion-table");
      });

      $("#cart-icon").click(function(e) {
        const $selectedCar = $("#car-table tbody tr").filter(".selected-car");
        const $selectedSuggestionCar = $("#car-suggestion-table tbody tr").filter(".selected-car");
        var tripType = $("select[name='trip_type']").val();

        if ($selectedCar.length === 0 && $selectedSuggestionCar.length === 0) {
          alert("No car was selected!");
          return;
        }

        if ($selectedCar.length !== 0) {
          const $selectedTds = $selectedCar.find("td");
          const id = $selectedTds.eq(0).text();

          selectCar(id, "On Time");
        } else {
          const $selectedSuggestedTds = $selectedSuggestionCar.find("td");
          const idSuggestion = $selectedSuggestedTds.eq(0).text();

          selectCar(idSuggestion, "On Time");
        }
      });

      $("#cart a").click(function(e) {
        e.preventDefault();

        var cartContents = ''
        var totalPrice = 0

        var carDetails = <?php echo json_encode($carDetails); ?>;

        for (var i = 0; i < carDetails.length; i++) {
            var car = carDetails[i];
            var carName = car.car_name;
            var cityName = car.city_name;
            var carPrice = car.car_price;

            cartContents += "<p>" + carName + " @ " + cityName + " - " + carPrice;
            totalPrice += parseInt(carPrice.replace("$", ""));
        }

        /*var carName = getCookie('Hotel Name');

        if (carName !== null) {
          var hotelCity = getCookie('Hotel City');
          var hotelPrice = getCookie('Hotel Price');

          totalPrice += parseInt(hotelPrice.replace("$", ""));

          cartContents += "<p>" + carName + " @ " + hotelCity + " - " + hotelPrice;
        }

        var carName = getCookie('Car Name');

        if (carName !== null) {
          var carCity = getCookie('Car City');
          var carPrice = getCookie('Car Price');

          totalPrice += parseInt(carPrice.replace("$", ""));

          cartContents += "<p>" + carName + " @ " + carCity + " - " + carPrice;
        }*/

        if (cartContents === '') {
          cartContents = "<p>Your cart is empty.</p>";
          $("#cartPrice").html("");
        } else {
          $("#cartPrice").html("<p>Total Price: $" + totalPrice + "</p>");
        }

        $("#dynamicCartContent").html(cartContents);

        $("#cartPopup").fadeIn();
      });

      $("#closeCart").click(function() {
        $("#cartPopup").fadeOut();
      });
    });
  </script>
</html>
