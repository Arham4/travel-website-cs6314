CREATE TABLE flights (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         origin VARCHAR(255) NOT NULL,
                         destination VARCHAR(255) NOT NULL,
                         departureDate DATE NOT NULL,
                         departureTime TIME NOT NULL,
                         arrivalDate DATE NOT NULL,
                         arrivalTime TIME NOT NULL,
                         price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       firstName VARCHAR(255) NOT NULL,
                       lastName VARCHAR(255) NOT NULL,
                       age INT NOT NULL,
                       email VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL
);

CREATE TABLE flight_bookings (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          flightId INT NOT NULL,
                          passengerId INT NOT NULL,
                          status VARCHAR(255) NOT NULL,
                          FOREIGN KEY (flightId) REFERENCES flights(id),
                          FOREIGN KEY (passengerId) REFERENCES users(id)
);
