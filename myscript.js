function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayDateTime() {
	var date = new Date();
	var dateTimeString = date.toLocaleString();
	document.getElementById("currentDateTime").innerHTML = dateTimeString;
}

function validateForm() {
	var firstName = document.forms["contactForm"]["name"].value;
	var lastName = document.forms["contactForm"]["lastname"].value;
	var phoneNumber = document.forms["contactForm"]["phone"].value;
	var gender = document.forms["contactForm"]["gender"].value;
	var email = document.forms["contactForm"]["email"].value;
	var comment = document.forms["contactForm"]["message"].value;

	if (firstName === "" || lastName === "" || phoneNumber === "" || gender === "" || email === "" || comment === "") {
		alert("Please fill in all fields.");
		return false;
	}

	if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
		alert("First name and last name should contain alphabetic characters only.");
		return false;
	}

	if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase() || lastName.charAt(0) !== lastName.charAt(0).toUpperCase()) {
		alert("First letter of first name and last name should be capitalized.");
		return false;
	}

	if (firstName === lastName) {
		alert("First name and last name cannot be the same.");
		return false;
	}

	if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
		alert("Phone number should be formatted as (ddd) ddd-dddd.");
		return false;
	}

	if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
		alert("Email address must contain '@' and '.'.");
		return false;
	}

	if (gender === "") {
		alert("Please select a gender.");
		return false;
	}

	if (comment.length < 10) {
		alert("Comment must be at least 10 characters long.");
		return false;
	}

	return true;
}

function toggleTripOptions() {
	var tripTypeSelect = document.getElementsByName("trip_type")[0];
	var returnDateContainer = document.getElementById("return_date_container");

	if (tripTypeSelect.value === "round_trip") {
		returnDateContainer.style.display = "block";
	} else {
		returnDateContainer.style.display = "none";
	}
}

function togglePassengerForm() {
	var passengerForm = document.getElementById("passenger-form");

	if (passengerForm.style.display === "none") {
		passengerForm.style.display = "block";
	} else {
		passengerForm.style.display = "none";
	}
}

function displayOrderStatus() {
	var flightTableBody = document.getElementById('flightTableBody');
	var hotelTableBody = document.getElementById('hotelTableBody');
	var carTableBody = document.getElementById('carTableBody');

	var departureFlightDepartureCity = getCookie('Flight-Departure Departure City');

	if (departureFlightDepartureCity === null) {
		showError('No flight info found!');
		return;
	}

	var departureFlightDestinationCity = getCookie('Flight-Departure Destination City');
	var departureFlightDepartureDate = getCookie('Flight-Departure Departure Date');
	var departureFlightDepartureTime = getCookie('Flight-Departure Departure Time');
	var departureFlightArrivalDate = getCookie('Flight-Departure Arrival Date');
	var departureFlightArrivalTime = getCookie('Flight-Departure Arrival Time');
	var departureFlightPrice = getCookie('Flight-Departure Price');

	var flightRow = flightTableBody.insertRow();
	flightRow.insertCell().textContent = departureFlightDepartureCity;
	flightRow.insertCell().textContent = departureFlightDestinationCity;
	flightRow.insertCell().textContent = departureFlightDepartureDate;
	flightRow.insertCell().textContent = departureFlightDepartureTime;
	flightRow.insertCell().textContent = departureFlightArrivalDate;
	flightRow.insertCell().textContent = departureFlightArrivalTime;
	flightRow.insertCell().textContent = departureFlightPrice;

	var arrivalFlightDepartureCity = getCookie('Flight-Arrival Departure City');

	if (arrivalFlightDepartureCity !== null) {
		var arrivalFlightDestinationCity = getCookie('Flight-Arrival Destination City');
		var arrivalFlightDepartureDate = getCookie('Flight-Arrival Departure Date');
		var arrivalFlightDepartureTime = getCookie('Flight-Arrival Departure Time');
		var arrivalFlightArrivalDate = getCookie('Flight-Arrival Arrival Date');
		var arrivalFlightArrivalTime = getCookie('Flight-Arrival Arrival Time');
		var arrivalFlightPrice = getCookie('Flight-Arrival Price');

		flightRow.insertCell().textContent = arrivalFlightDepartureCity;
		flightRow.insertCell().textContent = arrivalFlightDestinationCity;
		flightRow.insertCell().textContent = arrivalFlightDepartureDate;
		flightRow.insertCell().textContent = arrivalFlightDepartureTime;
		flightRow.insertCell().textContent = arrivalFlightArrivalDate;
		flightRow.insertCell().textContent = arrivalFlightArrivalTime;
		flightRow.insertCell().textContent = arrivalFlightPrice;
	}

	var hotelName = getCookie('Hotel Name');

	if (hotelName === null) {
		showError('No hotel info found!');
		return;
	}

	var hotelCity = getCookie('Hotel City');
	var hotelCheckinDate = getCookie('Hotel Check-in Date');
	var hotelCheckinTime = getCookie('Hotel Check-in Time');
	var hotelCheckoutDate = getCookie('Hotel Checkout Date');
	var hotelCheckoutTime = getCookie('Hotel Checkout Time');
	var hotelPrice = getCookie('Hotel Price');

	var hotelRow = hotelTableBody.insertRow();
	hotelRow.insertCell().textContent = hotelCity;
	hotelRow.insertCell().textContent = hotelName;
	hotelRow.insertCell().textContent = hotelCheckinDate;
	hotelRow.insertCell().textContent = hotelCheckinTime;
	hotelRow.insertCell().textContent = hotelCheckoutDate;
	hotelRow.insertCell().textContent = hotelCheckoutTime;
	hotelRow.insertCell().textContent = hotelPrice;

	var carName = getCookie('Car Name');

	if (carName === null) {
		showError('No car info found!');
		return;
	}

	var carCity = getCookie('Car City');
	var carCheckinDate = getCookie('Car Check-in Date');
	var carCheckinTime = getCookie('Car Check-in Time');
	var carCheckoutDate = getCookie('Car Checkout Date');
	var carCheckoutTime = getCookie('Car Checkout Time');
	var carPrice = getCookie('Car Price');

	var carRow = carTableBody.insertRow();
	carRow.insertCell().textContent = carName;
	carRow.insertCell().textContent = carCity;
	carRow.insertCell().textContent = carCheckinDate;
	carRow.insertCell().textContent = carCheckinTime;
	carRow.insertCell().textContent = carCheckoutDate;
	carRow.insertCell().textContent = carCheckoutTime;
	carRow.insertCell().textContent = carPrice;
}

function showError(message) {
	var errorContainer = document.createElement('div');
	errorContainer.classList.add('error');
	errorContainer.textContent = message;

	var mainContent = document.getElementById('main-content');
	mainContent.innerHTML = '';
	mainContent.appendChild(errorContainer);
}

// source: https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name, value) {
	var expires = "";
	days = 7;
	var date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	expires = "; expires=" + date.toUTCString();
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function showNextQuestion() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		displayQuestion();
	} else {
		displayOfferDetails();
	}
}

function displayQuestion() {
	questionStartTime = Date.now();

	var question = questions[currentQuestionIndex];
	var questionText = document.getElementById('questionText');
	questionText.textContent = question.text;

	var offerDetailsContainer = document.getElementById('offerDetailsContainer');
	offerDetailsContainer.style.display = 'none';
}

function displayOfferDetails() {
	var questionsContainer = document.getElementById('questionContainer');
	questionsContainer.innerHTML = '';

	var offerDetailsContainer = document.getElementById('offerDetailsContainer');
	offerDetailsContainer.style.display = 'block';

	var offerDetailsText = document.getElementById('offerDetailsText');
	var offerAmount = calculateOfferAmount();
	var offerReasons = generateOfferReasons();

	if (offerAmount > 0) {
		offerDetailsText.textContent = 'Congratulations! You qualify for the following special offer:';
		offerDetailsText.textContent += ' $' + offerAmount + ' off your flight!';
		offerDetailsText.textContent += ' (' + offerReasons.join(', ') + ')';
	} else {
		offerDetailsText.textContent = 'Sorry, you do not qualify for any special offers at this time.';
	}

	var timeSpentText = document.getElementById('timeSpentText');
	timeSpentText.textContent = 'Time spent on questions: ' + Math.round(timeSpent / 1000) + ' seconds.';
}

function calculateOfferAmount() {
	var offerAmount = 0;
	for (var i = 0; i < userResponses.length; i++) {
		if (userResponses[i] === 'Yes') {
			offerAmount += 50;
		}
	}
	return offerAmount;
}

function generateOfferReasons() {
	var reasons = [];
	for (var i = 0; i < userResponses.length; i++) {
		if (userResponses[i] === 'Yes') {
			reasons.push(questions[i].reason);
		}
	}
	return reasons;
}

function handleYesClick() {
	timeSpent += Date.now() - questionStartTime;
	userResponses.push('Yes');
	showNextQuestion();
}

function handleNoClick() {
	timeSpent += Date.now() - questionStartTime;
	userResponses.push('No');
	showNextQuestion();
}

function handleSkipClick() {
	timeSpent += Date.now() - questionStartTime;
	userResponses.push('Skip');
	showNextQuestion();
}

var path = window.location.pathname.split('/').at(-1);

if (path === 'specialoffer.html') {
	var questions = [{
			text: 'Have you flown on at least 10 flights in the past year?',
			reason: 'You have flown on at least 10 flights in the past year'
		},
		{
			text: 'Are you a senior flyer?',
			reason: 'You are a senior flyer'
		},
		{
			text: 'Do you have a frequent flyer membership?',
			reason: 'You have a frequent flyer membership'
		}
	];

	var currentQuestionIndex = 0;

	var timeSpent = 0;

	var questionStartTime = 0;

	var userResponses = [];

	document.getElementById('yesButton').addEventListener('click', handleYesClick);
	document.getElementById('noButton').addEventListener('click', handleNoClick);
	document.getElementById('skipButton').addEventListener('click', handleSkipClick);

	document.addEventListener('DOMContentLoaded', displayQuestion);
} else if (path === 'orderstatus.html') {
	document.addEventListener('DOMContentLoaded', displayOrderStatus);
} else if (path === 'flights.html') {
	function createRandomFlight(departureDate, origin, destination) {
		const departureTimes = ["08:00 AM", "10:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"];
		const arrivalTimes = ["10:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "08:00 PM"];
		const price = "$" + getRandomInt(100, 500);

		const departureTimeIndex = getRandomInt(0, departureTimes.length - 1);
		const arrivalTimeIndex = getRandomInt(departureTimeIndex, arrivalTimes.length - 1);

		const departureTime = departureTimes[departureTimeIndex];
		const arrivalTime = arrivalTimes[arrivalTimeIndex];

		return {
			origin,
			destination,
			departureDate,
			departureTime,
			arrivalDate: departureDate,
			arrivalTime,
			price,
		};
	}

	function createDummyFlights() {
		const departureDates = ["2023-07-22", "2023-07-23", "2023-07-24", "2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29", "2023-07-30", "2023-07-31"];
		const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Atlanta", "Dallas", "Denver", "Boston", "Houston", "Las Vegas"];

		const numFlightsPerDay = 10;
		const flights = [];

		for (const departureDate of departureDates) {
			for (const origin of cities) {
				for (const destination of cities) {
					if (origin === destination) {
						continue
					}
					for (let i = 0; i < numFlightsPerDay; i++) {
						flights.push(createRandomFlight(departureDate, origin, destination));
					}
				}
			}
		}
		return flights;
	}

	function createRandomFlightXML(departureDate, origin, destination) {
		const departureTimes = ["08:00 AM", "10:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"];
		const arrivalTimes = ["10:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "08:00 PM"];
		const price = "$" + getRandomInt(100, 500);

		const departureTimeIndex = getRandomInt(0, departureTimes.length - 1);
		const arrivalTimeIndex = getRandomInt(departureTimeIndex, arrivalTimes.length - 1);

		const departureTime = departureTimes[departureTimeIndex];
		const arrivalTime = arrivalTimes[arrivalTimeIndex];

		const xml = `
		<flight>
		  <origin>${origin}</origin>
		  <destination>${destination}</destination>
		  <departureDate>${departureDate}</departureDate>
		  <departureTime>${departureTime}</departureTime>
		  <arrivalDate>${departureDate}</arrivalDate>
		  <arrivalTime>${arrivalTime}</arrivalTime>
		  <price>${price}</price>
		</flight>
	  `;

		return xml;
	}

	function createDummyFlightsXML() {
		const departureDates = ["2023-07-22", "2023-07-23", "2023-07-24", "2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29", "2023-07-30", "2023-07-31"];
		const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Atlanta", "Dallas", "Denver", "Boston", "Houston", "Las Vegas"];

		const numFlightsPerDay = 10;
		let xmlFlights = "<flights>";

		for (const departureDate of departureDates) {
			for (const origin of cities) {
				for (const destination of cities) {
					if (origin === destination) {
						continue;
					}
					for (let i = 0; i < numFlightsPerDay; i++) {
						xmlFlights += createRandomFlightXML(departureDate, origin, destination);
					}
				}
			}
		}

		xmlFlights += "</flights>";
		return xmlFlights;
	}

	function parseXMLToFlights(xmlString) {
		const flights = [];
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlString, "text/xml");
		const flightElements = xmlDoc.getElementsByTagName("flight");

		for (let i = 0; i < flightElements.length; i++) {
			const flightElement = flightElements[i];
			const origin = flightElement.getElementsByTagName("origin")[0].textContent;
			const destination = flightElement.getElementsByTagName("destination")[0].textContent;
			const departureDate = flightElement.getElementsByTagName("departureDate")[0].textContent;
			const departureTime = flightElement.getElementsByTagName("departureTime")[0].textContent;
			const arrivalDate = flightElement.getElementsByTagName("arrivalDate")[0].textContent;
			const arrivalTime = flightElement.getElementsByTagName("arrivalTime")[0].textContent;
			const price = flightElement.getElementsByTagName("price")[0].textContent;

			flights.push({
				origin,
				destination,
				departureDate,
				departureTime,
				arrivalDate,
				arrivalTime,
				price,
			});
		}

		return flights;
	}

	function addFlightsToDatabase(flights) {
		const jsonData = JSON.stringify(flights);

		$.ajax({
			url: 'http://localhost:3000/flights.php',
			type: 'POST',
			data: {
				flightData: jsonData
			},
			success: function(response) {
				console.log('Flights added to the database successfully!');
			},
			error: function(xhr, status, error) {
				console.error('Error adding flights to the database:', error);
			}
		});
	}

	$(document).ready(function() {
		var regularFlights = createDummyFlights();
		var xmlFlights = parseXMLToFlights(createDummyFlightsXML());

		function selectDepartureFlight(origin, destination, departureDate, departureTime, arrivalDate, arrivalTime, price) {
			setCookie("Flight-Departure Departure City", origin);
			setCookie("Flight-Departure Destination City", destination);
			setCookie("Flight-Departure Departure Date", departureDate);
			setCookie("Flight-Departure Departure Time", departureTime);
			setCookie("Flight-Departure Arrival Date", arrivalDate);
			setCookie("Flight-Departure Arrival Time", arrivalTime);
			setCookie("Flight-Departure Price", price);
		}

		function selectArrivalFlight(origin, destination, departureDate, departureTime, arrivalDate, arrivalTime, price) {
			setCookie("Flight-Arrival Departure City", origin);
			setCookie("Flight-Arrival Destination City", destination);
			setCookie("Flight-Arrival Departure Date", departureDate);
			setCookie("Flight-Arrival Departure Time", departureTime);
			setCookie("Flight-Arrival Arrival Date", arrivalDate);
			setCookie("Flight-Arrival Arrival Time", arrivalTime);
			setCookie("Flight-Arrival Price", price);
		}

		function filterFlights(allFlightsArray, departure) {
			var tripType = $("select[name='trip_type']").val();
			var departureDate = $("input[name='departure_date']").val();
			var departureCity = $("input[name='departure_city']").val().trim();
			var destinationCity = $("input[name='destination_city']").val().trim();
			var returnDate = $("input[name='return_date']").val();

			var filteredFlights = allFlightsArray.filter(function(flight) {
				return (
					(departure ? flight.origin.toLowerCase() === departureCity.toLowerCase() : flight.origin.toLowerCase() === destinationCity.toLowerCase()) &&
					(departure ? flight.destination.toLowerCase() === destinationCity.toLowerCase() : flight.destination.toLowerCase() === departureCity.toLowerCase()) &&
					(departure ? flight.departureDate === departureDate : flight.arrivalDate === returnDate)
				);
			});

			return filteredFlights;
		}

		function displayFlights(tableName, flightsArray, departure) {
			var $flightTableBody = $("#" + tableName + " tbody");
			$flightTableBody.empty();

			flightsArray.forEach(function(flight) {
				$flightTableBody.append(
					"<tr>" +
					"<td>" + flight.origin + "</td>" +
					"<td>" + flight.destination + "</td>" +
					"<td>" + flight.departureDate + "</td>" +
					"<td>" + flight.departureTime + "</td>" +
					"<td>" + flight.arrivalDate + "</td>" +
					"<td>" + flight.arrivalTime + "</td>" +
					"<td>" + flight.price + "</td>" +
					'<td><input type="radio" name="flight_' + (departure ? 'departure' : 'arrival') + '_radio"></td>' +
					"</tr>"
				);
			});
		}

		function handleSubmit() {
			addFlightsToDatabase(xmlFlights);

			var tripType = $("select[name='trip_type']").val();

			var filteredDepartureFlights = filterFlights(regularFlights, true);
			displayFlights("flight-departure-table", filteredDepartureFlights, true);

			var filteredDepartureFlightsXML = filterFlights(xmlFlights, true);
			displayFlights("flight-departure-table-xml", filteredDepartureFlightsXML, true);

			var container = document.getElementById("flight-departure-table-container")
			container.style.display = 'block';

			var containerXML = document.getElementById("flight-departure-table-container-xml")
			containerXML.style.display = 'block';

			if (tripType === "round_trip") {
				var filteredArrivalFlights = filterFlights(regularFlights, false);
				displayFlights("flight-arrival-table", filteredArrivalFlights, false);

				var filteredArrivalFlightsXML = filterFlights(xmlFlights, false);
				displayFlights("flight-arrival-table-xml", filteredArrivalFlightsXML, false);

				var container = document.getElementById("flight-arrival-table-container")
				container.style.display = 'block';

				var containerXML = document.getElementById("flight-arrival-table-container-xml")
				containerXML.style.display = 'block';
			}

			var cart = document.getElementById("flight-cart")
			cart.style.display = 'inline-block';
		}

		$("#flight-form").submit(function(event) {
			event.preventDefault();
			handleSubmit();
		});

		function handleDepartureFlightSelection() {
			const $flights = $("#flight-departure-table tbody tr, #flight-departure-table-xml tbody tr");
			$flights.removeClass("selected-flight");

			$("input[type='radio']:checked").each(function() {
				const $selectedFlight = $(this).closest("tr");
				$selectedFlight.addClass("selected-flight");
			});

			$flights.css("opacity", 1);
			$flights.filter(".selected-flight").css("opacity", 0.5);
		}

		function handleArrivalFlightSelection() {
			const $flights = $("#flight-arrival-table tbody tr, #flight-arrival-table-xml tbody tr");
			$flights.removeClass("selected-flight");

			$("input[type='radio']:checked").each(function() {
				const $selectedFlight = $(this).closest("tr");
				$selectedFlight.addClass("selected-flight");
			});

			$flights.css("opacity", 1);
			$flights.filter(".selected-flight").css("opacity", 0.5);
		}

		function addToCart() {
			const $selectedDepartureFlight = $("#flight-departure-table tbody tr, #flight-departure-table-xml tbody tr").filter(".selected-flight");
			const $selectedArrivalFlight = $("#flight-arrival-table tbody tr, #flight-arrival-table-xml tbody tr").filter(".selected-flight");
			var tripType = $("select[name='trip_type']").val();

			if ($selectedDepartureFlight.length === 0) {
				alert("No departure flight was selected!");
				return;
			}

			if (tripType === "round_trip" && $selectedArrivalFlight.length === 0) {
				alert("No departure flight was selected!");
				return;
			}

			const $selectedDepartureTds = $selectedDepartureFlight.find("td");
			const originDeparture = $selectedDepartureTds.eq(0).text();
			const destinationDeparture = $selectedDepartureTds.eq(1).text();
			const departureDateDeparture = $selectedDepartureTds.eq(2).text();
			const departureTimeDeparture = $selectedDepartureTds.eq(3).text();
			const arrivalDateDeparture = $selectedDepartureTds.eq(4).text();
			const arrivalTimeDeparture = $selectedDepartureTds.eq(5).text();
			const priceDeparture = $selectedDepartureTds.eq(6).text();

			selectDepartureFlight(originDeparture, destinationDeparture, departureDateDeparture, departureTimeDeparture, arrivalDateDeparture, arrivalTimeDeparture, priceDeparture);

			if (tripType === "round_trip") {
				const $selectedArrivalTds = $selectedArrivalFlight.find("td");
				const originArrival = $selectedArrivalTds.eq(0).text();
				const destinationArrival = $selectedArrivalTds.eq(1).text();
				const departureDateArrival = $selectedArrivalTds.eq(2).text();
				const departureTimeArrival = $selectedArrivalTds.eq(3).text();
				const arrivalDateArrival = $selectedArrivalTds.eq(4).text();
				const arrivalTimeArrival = $selectedArrivalTds.eq(5).text();
				const priceArrival = $selectedArrivalTds.eq(6).text();

				selectArrivalFlight(originArrival, destinationArrival, departureDateArrival, departureTimeArrival, arrivalDateArrival, arrivalTimeArrival, priceArrival);
			}
		}

		$(document).on("change", "#flight-departure-table input[type='radio']", handleDepartureFlightSelection);
		$(document).on("change", "#flight-departure-table-xml input[type='radio']", handleDepartureFlightSelection);

		$(document).on("change", "#flight-arrival-table input[type='radio']", handleArrivalFlightSelection);
		$(document).on("change", "#flight-arrival-table-xml input[type='radio']", handleArrivalFlightSelection);

		$(document).on("click", "#cart-icon", addToCart);
	});
} else if (path === 'hotels.html') {
	function createRandomHotel(checkinDate, checkoutDate, city) {
		const names = ["Marriott", "Holiday Inn", "Hampton Inn", "Hilton", "Holiday Inn Express", "Courtyard by Marriott", "Hyatt", "Embassy Suites", "Best Western"];
		const checkinTimes = ["03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];
		const checkoutTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
		const price = "$" + getRandomInt(50, 300);

		const name = names[getRandomInt(0, names.length - 1)];
		const checkinTimeIndex = getRandomInt(0, checkinTimes.length - 1);
		const checkoutTimeIndex = getRandomInt(0, checkoutTimes.length - 1);

		const checkinTime = checkinTimes[checkinTimeIndex];
		const checkoutTime = checkoutTimes[checkoutTimeIndex];

		return {
			city,
			name,
			checkinDate,
			checkinTime,
			checkoutDate,
			checkoutTime,
			price,
		};
	}

	function createDummyHotels() {
		const checkinDates = ["2023-07-22", "2023-07-23", "2023-07-24", "2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29", "2023-07-30", "2023-07-31"];
		const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Atlanta", "Dallas", "Denver", "Boston", "Houston", "Las Vegas"];

		const numHotelsPerDay = 10;
		const hotels = [];

		for (let i = 0; i < checkinDates.length; i++) {
			const startDate = checkinDates[i];
			for (let j = i + 1; j < checkinDates.length; j++) {
				const endDate = checkinDates[j];
				for (const city of cities) {
					for (let i = 0; i < numHotelsPerDay; i++) {
						hotels.push(createRandomHotel(startDate, endDate, city));
					}
				}
			}
		}
		return hotels;
	}

	function createRandomHotelXML(checkinDate, checkoutDate, city) {
		const names = ["Marriott", "Holiday Inn", "Hampton Inn", "Hilton", "Holiday Inn Express", "Courtyard by Marriott", "Hyatt", "Embassy Suites", "Best Western"];
		const checkinTimes = ["03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];
		const checkoutTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
		const price = "$" + getRandomInt(50, 300);

		const name = names[getRandomInt(0, names.length - 1)];
		const checkinTimeIndex = getRandomInt(0, checkinTimes.length - 1);
		const checkoutTimeIndex = getRandomInt(0, checkoutTimes.length - 1);

		const checkinTime = checkinTimes[checkinTimeIndex];
		const checkoutTime = checkoutTimes[checkoutTimeIndex];

		const xml = `
		<hotel>
		  <city>${city}</city>
		  <name>${name}</name>
		  <checkinDate>${checkinDate}</checkinDate>
		  <checkinTime>${checkinTime}</checkinTime>
		  <checkoutDate>${checkoutDate}</checkoutDate>
		  <checkoutTime>${checkoutTime}</checkoutTime>
		  <price>${price}</price>
		</hotel>
	  `;

		return xml;
	}

	function createDummyHotelsXML() {
		const checkinDates = ["2023-07-22", "2023-07-23", "2023-07-24", "2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29", "2023-07-30", "2023-07-31"];
		const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Atlanta", "Dallas", "Denver", "Boston", "Houston", "Las Vegas"];

		const numHotelsPerDay = 10;
		const hotels = [];

		let xmlHotels = "<hotels>";

		for (let i = 0; i < checkinDates.length; i++) {
			const startDate = checkinDates[i];
			for (let j = i + 1; j < checkinDates.length; j++) {
				const endDate = checkinDates[j];
				for (const city of cities) {
					for (let i = 0; i < numHotelsPerDay; i++) {
						xmlHotels += createRandomHotelXML(startDate, endDate, city);
					}
				}
			}
		}

		xmlHotels += "</hotels>"
		return xmlHotels;
	}

	function parseXMLToHotels(xmlString) {
		const hotels = [];
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlString, "text/xml");
		const hotelElements = xmlDoc.getElementsByTagName("hotel");

		for (let i = 0; i < hotelElements.length; i++) {
			const hotelElement = hotelElements[i];
			const city = hotelElement.getElementsByTagName("city")[0].textContent;
			const name = hotelElement.getElementsByTagName("name")[0].textContent;
			const checkinDate = hotelElement.getElementsByTagName("checkinDate")[0].textContent;
			const checkinTime = hotelElement.getElementsByTagName("checkinTime")[0].textContent;
			const checkoutDate = hotelElement.getElementsByTagName("checkoutDate")[0].textContent;
			const checkoutTime = hotelElement.getElementsByTagName("checkoutTime")[0].textContent;
			const price = hotelElement.getElementsByTagName("price")[0].textContent;

			hotels.push({
				city,
				name,
				checkinDate,
				checkinTime,
				checkoutDate,
				checkoutTime,
				price,
			});
		}

		return hotels;
	}

	function addHotelsToDatabase(hotels) {
		const jsonData = JSON.stringify(hotels);

		$.ajax({
			url: 'http://localhost:3000/hotels.php',
			type: 'POST',
			data: {
				hotelData: jsonData
			},
			success: function(response) {
				console.log('Hotels added to the database successfully!');
			},
			error: function(xhr, status, error) {
				console.error('Error adding hotels to the database:', error);
			}
		});
	}

	$(document).ready(function() {
		var regularHotels = createDummyHotels();
		var xmlHotels = parseXMLToHotels(createDummyHotelsXML());

		function selectHotel(city, name, checkinDate, checkinTime, checkoutDate, checkoutTime, price) {
			setCookie("Hotel City", city);
			setCookie("Hotel Name", name);
			setCookie("Hotel Check-in Date", checkinDate);
			setCookie("Hotel Check-in Time", checkinTime);
			setCookie("Hotel Checkout Date", checkoutDate);
			setCookie("Hotel Checkout Time", checkoutTime);
			setCookie("Hotel Price", price);
		}

		function filterHotels(allHotelsArray) {
			var city = $("input[name='city']").val();
			var checkinDate = $("input[name='checkin_date']").val();
			var checkoutDate = $("input[name='checkout_date']").val();

			var filteredHotels = allHotelsArray.filter(function(hotel) {
				return (
					hotel.city.toLowerCase() === city.toLowerCase() &&
					hotel.checkinDate === checkinDate &&
					hotel.checkoutDate === checkoutDate
				);
			});

			return filteredHotels;
		}

		function displayHotels(tableName, hotelsArray) {
			var $hotelTableBody = $("#" + tableName + " tbody");
			$hotelTableBody.empty();

			hotelsArray.forEach(function(hotel) {
				$hotelTableBody.append(
					"<tr>" +
					"<td>" + hotel.city + "</td>" +
					"<td>" + hotel.name + "</td>" +
					"<td>" + hotel.checkinDate + "</td>" +
					"<td>" + hotel.checkinTime + "</td>" +
					"<td>" + hotel.checkoutDate + "</td>" +
					"<td>" + hotel.checkoutTime + "</td>" +
					"<td>" + hotel.price + "</td>" +
					'<td><input type="radio" name="hotel_radio"></td>' +
					"</tr>"
				);
			});
		}

		function handleSubmit() {

			addHotelsToDatabase(xmlHotels);

			var filteredHotels = filterHotels(regularHotels);
			displayHotels("hotel-table", filteredHotels);

			var filteredHotelsXML = filterHotels(xmlHotels);
			displayHotels("hotel-table-xml", filteredHotelsXML);

			var container = document.getElementById("hotel-table-container")
			container.style.display = 'block';

			var containerXML = document.getElementById("hotel-table-container-xml")
			containerXML.style.display = 'block';

			var cart = document.getElementById("hotel-cart")
			cart.style.display = 'inline-block';
		}

		$("#hotel-form").submit(function(event) {
			event.preventDefault();
			handleSubmit();
		});

		function handleHotelSelection() {
			const $flights = $("#hotel-table tbody tr, #hotel-table-xml tbody tr");
			$flights.removeClass("selected-hotel");

			$("input[type='radio']:checked").each(function() {
				const $selectedFlight = $(this).closest("tr");
				$selectedFlight.addClass("selected-hotel");
			});

			$flights.css("opacity", 1);
			$flights.filter(".selected-hotel").css("opacity", 0.5);
		}

		function addToCart() {
			const $selectedHotel = $("#hotel-table tbody tr, #hotel-table-xml tbody tr").filter(".selected-hotel");

			if ($selectedHotel.length === 0) {
				alert("No hotel was selected!");
				return;
			}

			const $selectedTds = $selectedHotel.find("td");
			const city = $selectedTds.eq(0).text();
			const name = $selectedTds.eq(1).text();
			const checkinDate = $selectedTds.eq(2).text();
			const checkinTime = $selectedTds.eq(3).text();
			const checkoutDate = $selectedTds.eq(4).text();
			const checkoutTime = $selectedTds.eq(5).text();
			const price = $selectedTds.eq(6).text();

			selectHotel(city, name, checkinDate, checkinTime, checkoutDate, checkoutTime, price);
		}

		$(document).on("change", "#hotel-table input[type='radio']", handleHotelSelection);
		$(document).on("change", "#hotel-table-xml input[type='radio']", handleHotelSelection);

		$(document).on("click", "#cart-icon", addToCart);
	});
} else if (path === 'rentalcarsbook.html') {
	function createRandomCar(checkinDate, checkoutDate, city) {
		const carNames = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes", "Audi", "Lexus", "Hyundai"];
		const checkinTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];
		const checkoutTimes = ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];
		const price = "$" + getRandomInt(30, 150);

		const name = carNames[getRandomInt(0, carNames.length - 1)];
		const checkinTimeIndex = getRandomInt(0, checkinTimes.length - 1);
		const checkoutTimeIndex = getRandomInt(0, checkoutTimes.length - 1);

		const checkinTime = checkinTimes[checkinTimeIndex];
		const checkoutTime = checkoutTimes[checkoutTimeIndex];

		return {
			name,
			city,
			checkinDate,
			checkinTime,
			checkoutDate,
			checkoutTime,
			price,
		};
	}

	function createDummyCars() {
		const checkinDates = ["2023-07-22", "2023-07-23", "2023-07-24", "2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29", "2023-07-30", "2023-07-31"];
		const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Atlanta", "Dallas", "Denver", "Boston", "Houston", "Las Vegas"];
		const numCarsPerDay = 10;
		const cars = [];

		for (const city of cities) {
			for (let i = 0; i < checkinDates.length; i++) {
				const startDate = checkinDates[i];
				for (let j = i + 1; j < checkinDates.length; j++) {
					const endDate = checkinDates[j];
					for (let i = 0; i < numCarsPerDay; i++) {
						cars.push(createRandomCar(startDate, endDate, city));
					}
				}
			}
		}
		return cars;
	}

	function createRandomCarXML(checkinDate, checkoutDate, city) {
		const carNames = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes", "Audi", "Lexus", "Hyundai"];
		const checkinTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];
		const checkoutTimes = ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"];
		const price = "$" + getRandomInt(30, 150);

		const name = carNames[getRandomInt(0, carNames.length - 1)];
		const checkinTimeIndex = getRandomInt(0, checkinTimes.length - 1);
		const checkoutTimeIndex = getRandomInt(0, checkoutTimes.length - 1);

		const checkinTime = checkinTimes[checkinTimeIndex];
		const checkoutTime = checkoutTimes[checkoutTimeIndex];

		const xml = `
    <car>
      <name>${name}</name>
	  <city>${city}</city>
      <checkinDate>${checkinDate}</checkinDate>
      <checkinTime>${checkinTime}</checkinTime>
      <checkoutDate>${checkoutDate}</checkoutDate>
      <checkoutTime>${checkoutTime}</checkoutTime>
      <price>${price}</price>
    </car>
  `;

		return xml;
	}

	function createDummyCarsXML() {
		const checkinDates = ["2023-07-22", "2023-07-23", "2023-07-24", "2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29", "2023-07-30", "2023-07-31"];
		const cities = ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Atlanta", "Dallas", "Denver", "Boston", "Houston", "Las Vegas"];
		const numCarsPerDay = 10;
		const cars = [];

		let xmlCars = "<cars>";

		for (const city of cities) {
			for (let i = 0; i < checkinDates.length; i++) {
				const startDate = checkinDates[i];
				for (let j = i + 1; j < checkinDates.length; j++) {
					const endDate = checkinDates[j];
					for (let i = 0; i < numCarsPerDay; i++) {
						xmlCars += createRandomCarXML(startDate, endDate, city);
					}
				}
			}
		}

		xmlCars += "</cars>";
		return xmlCars;
	}

	function parseXMLToCars(xmlString) {
		const cars = [];
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlString, "text/xml");
		const carElements = xmlDoc.getElementsByTagName("car");

		for (let i = 0; i < carElements.length; i++) {
			const carElement = carElements[i];
			const name = carElement.getElementsByTagName("name")[0].textContent;
			const city = carElement.getElementsByTagName("city")[0].textContent;
			const checkinDate = carElement.getElementsByTagName("checkinDate")[0].textContent;
			const checkinTime = carElement.getElementsByTagName("checkinTime")[0].textContent;
			const checkoutDate = carElement.getElementsByTagName("checkoutDate")[0].textContent;
			const checkoutTime = carElement.getElementsByTagName("checkoutTime")[0].textContent;
			const price = carElement.getElementsByTagName("price")[0].textContent;

			cars.push({
				name,
				city,
				checkinDate,
				checkinTime,
				checkoutDate,
				checkoutTime,
				price,
			});
		}

		return cars;
	}

	$(document).ready(function() {
		var regularCars = createDummyCars();
		var xmlCars = parseXMLToCars(createDummyCarsXML());

		function selectCar(name, city, checkinDate, checkinTime, checkoutDate, checkoutTime, price) {
			setCookie("Car Name", name);
			setCookie("Car City", city);
			setCookie("Car Check-in Date", checkinDate);
			setCookie("Car Check-in Time", checkinTime);
			setCookie("Car Checkout Date", checkoutDate);
			setCookie("Car Checkout Time", checkoutTime);
			setCookie("Car Price", price);
		}

		function filterCars(allCarsArray) {
			var city = $("input[name='city']").val();
			var checkinDate = $("input[name='checkin_date']").val();
			var checkoutDate = $("input[name='checkout_date']").val();

			var filteredCars = allCarsArray.filter(function(car) {
				return (
					car.checkinDate === checkinDate &&
					car.checkoutDate === checkoutDate &&
					car.city.toLowerCase() === city.toLowerCase()
				);
			});

			return filteredCars;
		}

		function displayCars(tableName, carsArray) {
			var $carTableBody = $("#" + tableName + " tbody");
			$carTableBody.empty();

			carsArray.forEach(function(car) {
				$carTableBody.append(
					"<tr>" +
					"<td>" + car.name + "</td>" +
					"<td>" + car.city + "</td>" +
					"<td>" + car.checkinDate + "</td>" +
					"<td>" + car.checkinTime + "</td>" +
					"<td>" + car.checkoutDate + "</td>" +
					"<td>" + car.checkoutTime + "</td>" +
					"<td>" + car.price + "</td>" +
					'<td><input type="radio" name="car_radio"></td>' +
					"</tr>"
				);
			});
		}

		function handleSubmit() {
			var filteredCars = filterCars(regularCars);
			displayCars("car-table", filteredCars);

			var filteredCarsXML = filterCars(xmlCars);
			displayCars("car-table-xml", filteredCarsXML);

			var container = document.getElementById("car-table-container")
			container.style.display = 'block';

			var containerXML = document.getElementById("car-table-container-xml")
			containerXML.style.display = 'block';

			var cart = document.getElementById("car-cart")
			cart.style.display = 'inline-block';
		}

		$("#car-form").submit(function(event) {
			event.preventDefault();
			handleSubmit();
		});

		function handleCarSelection() {
			const $flights = $("#car-table tbody tr, #car-table-xml tbody tr");
			$flights.removeClass("selected-car");

			$("input[type='radio']:checked").each(function() {
				const $selectedFlight = $(this).closest("tr");
				$selectedFlight.addClass("selected-car");
			});

			$flights.css("opacity", 1);
			$flights.filter(".selected-car").css("opacity", 0.5);
		}

		function addToCart() {
			const $selectedCar = $("#car-table tbody tr, #car-table-xml tbody tr").filter(".selected-car");

			if ($selectedCar.length === 0) {
				alert("No car was selected!");
				return;
			}

			const $selectedTds = $selectedCar.find("td");
			const name = $selectedTds.eq(0).text();
			const city = $selectedTds.eq(1).text();
			const checkinDate = $selectedTds.eq(2).text();
			const checkinTime = $selectedTds.eq(3).text();
			const checkoutDate = $selectedTds.eq(4).text();
			const checkoutTime = $selectedTds.eq(5).text();
			const price = $selectedTds.eq(6).text();

			selectCar(name, city, checkinDate, checkinTime, checkoutDate, checkoutTime, price);
		}

		$(document).on("change", "#car-table input[type='radio']", handleCarSelection);
		$(document).on("change", "#car-table-xml input[type='radio']", handleCarSelection);

		$(document).on("click", "#cart-icon", addToCart);
	});
} else if (path === "contact.html") {
	$(document).ready(function() {
		$("#json-button").click(function() {
			if (validateForm()) {
				var firstName = document.forms["contactForm"]["name"].value;
				var lastName = document.forms["contactForm"]["lastname"].value;
				var phoneNumber = document.forms["contactForm"]["phone"].value;
				var gender = document.forms["contactForm"]["gender"].value;
				var email = document.forms["contactForm"]["email"].value;
				var comment = document.forms["contactForm"]["message"].value;

				var json = {
					firstName,
					lastName,
					phoneNumber,
					gender,
					email,
					comment
				};

				$("#json-output").html("<p>" + JSON.stringify(json, null, 2) + "</p>")
			}
		});
	});
}

function setFontSize(size) {
	document.body.style.fontSize = size;
	setCookie('fontSize', size);
}

function setBackgroundColor(color) {
	document.body.style.backgroundColor = color;
	setCookie('backgroundColor', color);
}

function loadUserPreferences(path) {
	if (path === 'specialoffer.html') {
		var fontSize = getCookie('fontSize');
		if (fontSize) {
			document.body.style.fontSize = fontSize;
		}
	}

	var backgroundColor = getCookie('backgroundColor');
	if (backgroundColor) {
		document.body.style.backgroundColor = backgroundColor;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	loadUserPreferences(path)
});
document.addEventListener('DOMContentLoaded', displayDateTime);

$(document).ready(function() {
	$("#cart a").click(function(e) {
		e.preventDefault();

		var cartContents = ''
		var totalPrice = 0

		var departureFlightDepartureCity = getCookie('Flight-Departure Departure City');

		if (departureFlightDepartureCity !== null) {
			var departureFlightDestinationCity = getCookie('Flight-Departure Destination City');
			var departureFlightPrice = getCookie('Flight-Departure Price');

			totalPrice += parseInt(departureFlightPrice.replace("$", ""));

			cartContents += "<p>" + departureFlightDepartureCity + " -> " + departureFlightDestinationCity + " - " + departureFlightPrice;
		}

		var arrivalFlightDepartureCity = getCookie('Flight-Arrival Departure City');

		if (arrivalFlightDepartureCity !== null) {
			var arrivalFlightDestinationCity = getCookie('Flight-Arrival Destination City');
			var arrivalFlightPrice = getCookie('Flight-Arrival Price');

			totalPrice += parseInt(arrivalFlightPrice.replace("$", ""));

			cartContents += "<p>" + arrivalFlightDepartureCity + " -> " + arrivalFlightDestinationCity + " - " + arrivalFlightPrice;
		}

		var hotelName = getCookie('Hotel Name');

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
		}

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