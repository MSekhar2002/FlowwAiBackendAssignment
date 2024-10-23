# FlowwAiBackendAssignment

## Financial Management API

A RESTful API for managing personal finances, tracking income and expenses, and generating financial reports.

Live API: [https://flowwaibackendassignment.onrender.com](https://flowwaibackendassignment.onrender.com)

## Features

- User registration and authentication
- Transaction management (income and expenses)
- Transaction categorization
- Financial summaries and reports
- Monthly spending analysis by category
- Pagination support for transactions

## Tech Stack

- Node.js
- Express.js
- SQLite3
- UUID for unique identifiers
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MSekhar2002/FlowwAiBackendAssignment
```

2. Install dependencies:
```bash
cd FlowwAiBackendAssignment
npm install
```

3. Start the server:
```bash
npm start
```

The server will start running on `http://localhost:3001` by default. or user can use live API

## API Endpoints

### User Management

#### Register a New User
- **POST** `/register`
```json
// Request Body
{
    "name": "Sekhar",
    "password": "Sekhar@123"
}

// Response
{
    "message": "User created successfully",
    "userId": "3cf4de95-befd-4a93-b08b-6e5d5b5bcdfb"
}
```

#### Screenshot of user registration in Postman
![image](https://github.com/user-attachments/assets/3b64fde0-f97a-40ef-b753-993bb633d4d4)


### Transactions

#### Create Transaction
- **POST** `/transactions`
```json
// Request Body
{
    "userId": "3cf4de95-befd-4a93-b08b-6e5d5b5bcdfb",
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-10-23",
    "description": "Monthly salary"
}

// Response
{
    "message": "Transaction created successfully",
    "transactionId": "616670e5-c4c3-4a72-9e40-da4b37b2ee54"
}
```
#### Screenshot of adding transaction in Postman
![image](https://github.com/user-attachments/assets/f7efab44-a855-414e-bb30-6a9eecc4c05f)


#### Get All Transactions
- **GET** `/transactions?page=1&limit=10`
```json
// Response
[
    {
        "id": "616670e5-c4c3-4a72-9e40-da4b37b2ee54",
        "type": "income",
        "category": "Salary",
        "amount": 5000,
        "date": "2024-10-23",
        "description": "Monthly salary",
        "user_id": "3cf4de95-befd-4a93-b08b-6e5d5b5bcdfb"
    }
]
```
#### Screenshot of getting transactions including pagination in Postman

![image](https://github.com/user-attachments/assets/bf42c940-7019-4bcc-98e3-7ed783a6370b)


#### Get Transaction by ID
- **GET** `/transactions/:id`
```json
// Response
{
    "id": "616670e5-c4c3-4a72-9e40-da4b37b2ee54",
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-10-23",
    "description": "Monthly salary",
    "user_id": "3cf4de95-befd-4a93-b08b-6e5d5b5bcdfb"
}
```

#### Screenshot of getting a transaction by ID in Postman

![image](https://github.com/user-attachments/assets/d38509b9-e31d-4cf0-9d0d-5650258121e8)

#### Update Transaction
- **PUT** `/transactions/:id`
```json
// Request Body
{
    "id": "616670e5-c4c3-4a72-9e40-da4b37b2ee54",
    "type": "income",
    "category": "Bonus",
    "amount": 6000,
    "date": "2024-10-23",
    "description": "Monthly salary + Bonus",
    "userId": "3cf4de95-befd-4a93-b08b-6e5d5b5bcdfb"
}

// Response
{
    "message": "Transaction updated successfully"
}
```
#### Screenshot of updating a transaction in Postman

![image](https://github.com/user-attachments/assets/35f39e56-4907-4ce8-a67b-c8a9eb607312)

### Financial Reports

#### Get Financial Summary
- **GET** `/summary?startDate=2024-01-01&endDate=2024-12-31`
```json
// Response
{
    "income": 6000,
    "expense": 0,
    "balance": 6000
}
```
#### Screenshot of getting financial summary in Postman

![image](https://github.com/user-attachments/assets/065b8d0b-9233-4dbb-bced-745f8d536cb6)

#### Get Monthly Category Report
- **GET** `/report?month=10&year=2024`
```json
// Response
[
    {
        "category": "Bonus",
        "total": 6000
    }
]
```
#### Screenshot of getting monthly report in Postman

![image](https://github.com/user-attachments/assets/19140e72-02b5-41aa-a65f-f56acc6544a8)

#### Delete Transaction
- **DELETE** `/transactions/:id`
```json
// Response
{
    "message": "Transaction deleted successfully"
}
```
#### Screenshot of deleting a transaction by id in Postman

![image](https://github.com/user-attachments/assets/6d2cc042-dee1-4b80-849b-ad4369b22dcc)



## Authentication

All endpoints except `/register` require user authentication. Include the `userId` in the request body or as a query parameter.

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Data Validation

- Transaction type must be either 'income' or 'expense'
- Amount must be a positive number
- Date must be in YYYY-MM-DD format
- Required fields must not be empty

## Development

The project uses SQLite for data storage. The database file (`financialApp.db`) is created automatically when the server starts.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
#####    Muni Sekhar
#####    munisekhar@gmail.com
#####    +91 63040 22592

