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

$hotelDetails = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"];
    
    if ($action === "find_hotels") {
      $cityName = $_POST['city'];
      $checkinDate = $_POST['checkin_date'];
      $checkoutDate = $_POST['checkout_date'];
  
      $sql = "SELECT * FROM hotels
              WHERE cityName = '$cityName' AND checkInDate = '$checkinDate' AND checkOutDate = '$checkoutDate'";
  
      $result = $conn->query($sql);
  
      $available_hotels = array();
      $suggested_hotels = array();
  
      if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
              $available_hotels[] = $row;
          }
      }

      if (empty($available_hotels)) {
        $sql = "SELECT * FROM hotels
                WHERE cityName = '$cityName'";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $suggested_hotels[] = $row;
            }
        }
      }
    } elseif ($action === "book_hotel") {
      $hotelId = $_POST["hotelId"];
      $passengerId = $_COOKIE["passengerId"];
      $status = $_POST["status"];

      $sql = "INSERT INTO hotel_bookings (hotelId, passengerId, status) VALUES ('$hotelId', '$passengerId', '$status')";
      $result = $conn->query($sql);

      if ($result === true) {
        echo "Hotel booked successfully!";
      } else {
          echo "Error: " . $sql . "<br>" . $conn->error;
      }
    }
}

$passengerId = $_COOKIE["passengerId"];

$sql = "SELECT
            h.hotelName AS hotel_name,
            h.cityName AS city_name,
            h.price AS hotel_price
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

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
      $hotelDetails[] = [
          "hotel_name" => $row["hotel_name"],
          "city_name" => $row["city_name"],
          "hotel_price" => $row["hotel_price"],
      ];
  }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Hotel Booking</title>
    <link rel="stylesheet" type="text/css" href="mystyle.css">
  </head>
  <body>
    <div id="header">
      <h1>Hotel Booking</h1>
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
          <a href="#">
            <strong>Hotels</strong>
          </a>
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
          <li><strong>All bookings are non-refundable.</strong></li>
          <li>Passengers should arrive at the airport <em>at least 2 hours before departure</em>.</li>
          <li>Baggage allowance is limited to <strong>20kg</strong>.</li>
        </ol>
      </div>
      <div id="main-content">
        <div id="commodity-search">
          <h3>Hotel Search</h3>
          <form id="hotel-form" method="post" action="">
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
            <input type="hidden" name="action" value="find_hotels">
            <input type="submit" value="Search">
          </form>
        </div>
        <?php if (!empty($available_hotels)): ?>
          <div id="hotel-table-container">
            <h3>Regular Results</h3>
            <table id="hotel-table">
              <thead>
              <tr>
                <th>ID</th>
                <th>City Name</th>
                <th>Hotel Name</th>
                <th>Check-in Date</th>
                <th>Check-in Time</th>
                <th>Check-out Date</th>
                <th>Check-out Time</th>
                <th>Price</th>
                <th>Choose Hotel</th>
              </tr>
              </thead>
              <tbody>
                <?php foreach ($available_hotels as $hotel): ?>
                    <tr>
                      <td><?= $hotel["id"] ?></td>
                      <td><?= $hotel["cityName"] ?></td>
                      <td><?= $hotel["hotelName"] ?></td>
                      <td><?= $hotel["checkInDate"] ?></td>
                      <td><?= $hotel["checkInTime"] ?></td>
                      <td><?= $hotel["checkOutDate"] ?></td>
                      <td><?= $hotel["checkOutTime"] ?></td>
                      <td><?= $hotel["price"] ?></td>
                      <td><input type="radio" name="hotel_radio"></td>
                    </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>
        <?php if (!empty($suggested_hotels)): ?>
          <div id="hotel-suggestion-table-container">
            <h3>We were unable to find a hotel for those dates</h3>
            <p>Consider these hotels instead.</p>
            <table id="hotel-suggestion-table">
              <thead>
              <tr>
                <th>ID</th>
                <th>City Name</th>
                <th>Hotel Name</th>
                <th>Check-in Date</th>
                <th>Check-in Time</th>
                <th>Check-out Date</th>
                <th>Check-out Time</th>
                <th>Price</th>
                <th>Choose Hotel</th>
              </tr>
              </thead>
              <tbody>
                <?php foreach ($suggestion_hotels as $hotel): ?>
                    <tr>
                      <td><?= $hotel["id"] ?></td>
                      <td><?= $hotel["cityName"] ?></td>
                      <td><?= $hotel["hotelName"] ?></td>
                      <td><?= $hotel["checkInDate"] ?></td>
                      <td><?= $hotel["checkInTime"] ?></td>
                      <td><?= $hotel["checkOutDate"] ?></td>
                      <td><?= $hotel["checkOutTime"] ?></td>
                      <td><?= $hotel["price"] ?></td>
                      <td><input type="radio" name="hotel_radio"></td>
                    </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>
        <?php if (!empty($suggested_hotels) || !empty($available_hotels)): ?>
          <div id="hotel-cart">
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
    function selectHotel(id, status) {
      $.ajax({
        url: 'http://localhost:3000/BookingHotel.php',
        type: 'POST',
        data: {
          hotelId: id,
          status: status,
          action: 'book_hotel',
        },
        success: function(response) {
          alert('Hotel booked!');
        },
        error: function(xhr, status, error) {
          alert('Error booking hotel.');
        }
      });
		}

		function handleHotelSelection(table) {
			const $hotels = $("#" + table + " tbody tr");
			$hotels.removeClass("selected-hotel");

			$("input[type='radio']:checked").each(function() {
				const $selectedHotel = $(this).closest("tr");
				$selectedHotel.addClass("selected-hotel");
			});

			$hotels.css("opacity", 1);
			$hotels.filter(".selected-hotel").css("opacity", 0.5);
		}

    $(document).ready(function() {
      $(document).on("change", "#hotel-table input[type='radio']", function() {
        handleHotelSelection("hotel-table");
      });

      $(document).on("change", "#hotel-suggestion-table input[type='radio']", function() {
        handleHotelSelection("hotel-suggestion-table");
      });

      $("#cart-icon").click(function(e) {
        const $selectedHotel = $("#hotel-table tbody tr").filter(".selected-hotel");
        const $selectedSuggestionHotel = $("#hotel-suggestion-table tbody tr").filter(".selected-hotel");
        var tripType = $("select[name='trip_type']").val();

        if ($selectedHotel.length === 0 && $selectedSuggestionHotel.length === 0) {
          alert("No hotel was selected!");
          return;
        }

        if ($selectedHotel.length !== 0) {
          const $selectedTds = $selectedHotel.find("td");
          const id = $selectedTds.eq(0).text();

          selectHotel(id, "On Time");
        } else {
          const $selectedSuggestedTds = $selectedSuggestionHotel.find("td");
          const idSuggestion = $selectedSuggestedTds.eq(0).text();

          selectHotel(idSuggestion, "On Time");
        }
      });

      $("#cart a").click(function(e) {
        e.preventDefault();

        var cartContents = ''
        var totalPrice = 0

        var hotelDetails = <?php echo json_encode($hotelDetails); ?>;

        for (var i = 0; i < hotelDetails.length; i++) {
            var hotel = hotelDetails[i];
            var hotelName = hotel.hotel_name;
            var cityName = hotel.city_name;
            var hotelPrice = hotel.hotel_price;

            cartContents += "<p>" + hotelName + " @ " + cityName + " - " + hotelPrice;
            totalPrice += parseInt(hotelPrice.replace("$", ""));
        }

        /*var hotelName = getCookie('Hotel Name');

        if (hotelName !== null) {
          var hotelCity = getCookie('Hotel City');
          var hotelPrice = getCookie('Hotel Price');

          totalPrice += parseInt(hotelPrice.replace("$", ""));

          cartContents += "<p>" + hotelName + " @ " + hotelCity + " - " + hotelPrice;
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
