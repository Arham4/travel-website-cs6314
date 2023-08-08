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
                       id VARCHAR(20) NOT NULL PRIMARY KEY,
                       firstName VARCHAR(50) NOT NULL,
                       lastName VARCHAR(50) NOT NULL,
                       age INT NOT NULL,
                       email VARCHAR(100) NOT NULL,
                       password VARCHAR(255) NOT NULL
);

CREATE TABLE flight_bookings (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 flightId INT NOT NULL,
                                 passengerId VARCHAR(20) NOT NULL,
                                 status VARCHAR(255) NOT NULL,
                                 FOREIGN KEY (flightId) REFERENCES flights(id),
                                 FOREIGN KEY (passengerId) REFERENCES users(id)
);

CREATE TABLE hotel_bookings (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 hotelId INT NOT NULL,
                                 passengerId VARCHAR(20) NOT NULL,
                                 status VARCHAR(255) NOT NULL,
                                 FOREIGN KEY (hotelId) REFERENCES hotels(id),
                                 FOREIGN KEY (passengerId) REFERENCES users(id)
);

CREATE TABLE hotels (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        cityName VARCHAR(255) NOT NULL,
                        hotelName VARCHAR(255) NOT NULL,
                        checkInDate DATE NOT NULL,
                        checkInTime TIME NOT NULL,
                        checkOutDate DATE NOT NULL,
                        checkOutTime TIME NOT NULL,
                        price INT NOT NULL
);

CREATE TABLE cars (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        carName VARCHAR(255) NOT NULL,
                        cityName VARCHAR(255) NOT NULL,
                        checkInDate DATE NOT NULL,
                        checkInTime TIME NOT NULL,
                        checkOutDate DATE NOT NULL,
                        checkOutTime TIME NOT NULL,
                        price INT NOT NULL
);


