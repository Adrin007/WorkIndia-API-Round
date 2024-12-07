# WorkIndia-API-Round (IRCTC - API)
## Project Overview
This project is a RESTful API developed based on problem statements and requirements. This API allows users to check train availability between stations, view seat availability, and book tickets. It also includes role-based access control, enabling Admin users to manage trains and seats while allowing Logged-in Users to perform ticket-related operations.

## Approach
* **Concurrency and Race Conditions**
  
  To prevent overbooking during concurrent requests, I used database transactions and row-level locking mechanisms. This ensures data integrity when multiple users try to book the same seat.
* **Security**
  
  Admin endpoints are secured using a private API key. Additionally, user authentication is handled via JWT tokens, and passwords are encrypted with bcrypt.js.
* **Scalable Design**

  I’ve designed the system to support modular enhancements like caching, reporting, and future integrations.

## Tech Stack
* **Backend**: Node.js with Express.js
* **Database**: MySQL
* **Authentication**: JWT
* **Password Hashing**: bcrypt.js
* **Environment Variables**: dotenv

## Installation and Setup
1. Clone the Repository:
   
   ```bash
   git clone https://github.com/Adrin007/WorkIndia-API-Round.git
   cd WorkIndia-API-Round
   ```
2. Install Dependencies:
   
   ```bash
   npm install
   ```
3. Environment Configuration:
   
   ```plaintext
    DB_HOST=<your-database-host>
    DB_USER=<your-database-username>
    DB_PASSWORD=<your-database-password>
    DB_NAME=<your-database-name>
    JWT_SECRET=<your-jwt-secret>
    ADMIN_API_KEY=<your-admin-api-key>
   ```
4. Database Setup
   * Open MySQL Workbench or any MySQL client.
   * Execute the schema.sql file to create necessary tables.

5. Run the Application:
   ```bash
   npm start
   ```
## SQL Queries for Table Creation
1. **Users Table**

   ```sql
   CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   ```
2. **Trains Table**

   ```sql
   CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    totalSeats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
   ```
1. **Bookings Table**

   ```sql
    CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    trainId INT NOT NULL,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (trainId) REFERENCES trains(id) ON DELETE CASCADE
    )
   ```
## API Endpoints
**User Management**

* **POST/register**
  
  Register a new user. Returns the username of the registered user.

  Request:

  ```json
  {
      "username":"user-name",
      "password":"user-password",
      "role":"user/admin"
  }
  ```

* **POST/login**
  
  Logs in the user and returns a JWT token for authenticated access.

  Request:

  ```json
  {
      "username":"user-name",
      "password":"user-password",
  }
  ```

**Admin Operations**
(Admin API Key required in headers)
* **POST/admin/insertTrain**
  
  Add a new train to the database.

  Request:

  ```json
  {
      "source":"train-source",
      "destination":"train-destination",
      "totalSeat":"number of seats"
  }
  ```

**User Operations**
(JWT required in headers)
* **GET/getTrains**
  
  Fetch all trains between two stations, including seat availability.

  Request:

  ```json
  {
      "source":"train-source",
      "destination":"train-destination",
  }
  ```


* **POST/bookSeat**
  
  Book a seat on a specific train. Handles race conditions and ensures real-time availability.

  Request:

  ```json
  {
      "userId":"user - id",
      "train":"train-id",
  }
  ```

* **GET/bookings/getTickets**
  
  Retrieve booking details for a specific user.

  Request:

  ```json
  {
      "userId":"user - id",
  }
  ```


## Testing Instructions
I’ve included a postman_collection.json file in the repository. You can import it into Postman to test all the endpoints easily.

1. Start the server.
2. Import the Postman collection.
3. Set headers (token for JWT, adminKey for Admin operations) and body parameters where required.

## Conclusion
This project showcases my ability to design and implement a real-world API under time constraints while adhering to scalability, security, and performance principles. It reflects my approach to solving complex problems with clean code and modular design.

I look forward to discussing this project and any suggestions you might have for improvement!
