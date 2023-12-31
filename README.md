# Flight Booking - CS 6314

This allows users to book flights, hotels, and cars with a dummy dataset using MySQLi to store data and HTML, JS, and PHP to display and query data to the user.

This was made for CS 6314 (Web Programming Languages) at the University of Texas at Dallas, taught by Dr. Gity Karami.

Some important notes for this submission:
1. Firefox has be used since cookies are not stored on Google Chrome if using file://. If Google Chrome is to be used, a localhost has to be established, which can be done via 
[VS.Code's LiveServer](https://youtu.be/Wd7cVmtiFUU).
2. The dates that have data that will populate 10 results are from 2023-07-22 to 2023-07-31.
3. The cities that have data are New York, Los Angeles, Chicago, San Francisco, Miami, Seattle, Atlanta, Dallas, Denver, Boston, Houston, and Las Vegas.
4. Dates have to be typed in the format yyyy-mm-dd.

## Setup

1. Install PHP on your computer.
2. Using VS.Code, install both Live Server and PHP Server.
3. Configure PHP Server to point to your PHP installation.
4. In VS.Code, click "Go Live" on the bottom right. This will start a web instance.
5. In VS.Code, right click while inside a PHP file and click "Reload server." This will start a PHP server to be able to use.
6. A `config.ini` file must be made like so:
```ini
; Database Configuration
servername = "SERVER.COM"
username = "USERNAME"
password = "PASSWORD"
dbname = "DBNAME"
```
7. The database environment needs to be setup with the queries found in [`queries.sql`](./queries.sql).