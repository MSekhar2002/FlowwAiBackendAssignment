# FlowwAiBackendAssignment

# Financial Management API

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
![image](https://github.com/user-attachments/assets/3b64fde0-f97a-40ef-b753-993bb633d4d4)
```

### Transactions

#### Create Transaction
- **POST** `/transactions`
```json
// Request Body
{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-03-15",
    "description": "Monthly salary"
}

// Response
{
    "message": "Transaction created successfully",
    "transactionId": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Get All Transactions
- **GET** `/transactions?page=1&limit=10`
```json
// Response
[
    {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "type": "income",
        "category": "Salary",
        "amount": 5000,
        "date": "2024-03-15",
        "description": "Monthly salary",
        "user_id": "550e8400-e29b-41d4-a716-446655440000"
    }
    // ... more transactions
]
```

#### Get Transaction by ID
- **GET** `/transactions/:id`
```json
// Response
{
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2024-03-15",
    "description": "Monthly salary",
    "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Update Transaction
- **PUT** `/transactions/:id`
```json
// Request Body
{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "type": "income",
    "category": "Bonus",
    "amount": 6000,
    "date": "2024-03-15",
    "description": "Monthly salary + bonus"
}

// Response
{
    "message": "Transaction updated successfully"
}
```

#### Delete Transaction
- **DELETE** `/transactions/:id`
```json
// Response
{
    "message": "Transaction deleted successfully"
}
```

### Financial Reports

#### Get Financial Summary
- **GET** `/summary?startDate=2024-01-01&endDate=2024-03-31`
```json
// Response
{
    "income": 15000,
    "expense": 8000,
    "balance": 7000
}
```

#### Get Monthly Category Report
- **GET** `/report?month=03&year=2024`
```json
// Response
[
    {
        "category": "Salary",
        "total": 5000
    },
    {
        "category": "Groceries",
        "total": 800
    }
    // ... more categories
]
```

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
