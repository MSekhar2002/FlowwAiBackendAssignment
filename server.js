const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./financialApp.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to SQLite database.');
});

// Create tables: transactions and categories
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
  )
`);

// Route to register a new user
app.post('/register', (req, res) => {
  const { name, password } = req.body;
  
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required' });
  }

  const userId = uuidv4();

  // Insert the user into the database
  db.run('INSERT INTO users (id, name, password) VALUES (?, ?, ?)', [userId, name, password], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    res.json({ message: 'User created successfully', userId });
  });
});


// Middleware for user authentication (basic)
const authenticateUser = (req, res, next) => {
  const { userId } = req.body;
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }
    req.user = user;
    next();
  });
};

// Create a new transaction (income or expense)
app.post('/transactions', authenticateUser, (req, res) => {
  const { type, category, amount, date, description, userId } = req.body;
  if (!type || !category || !amount || !date || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transactionId = uuidv4();
  db.run(
    'INSERT INTO transactions (id, type, category, amount, date, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [transactionId, type, category, amount, date, description, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create transaction' });
      }
      res.json({ message: 'Transaction created successfully', transactionId });
    }
  );
});

// Get all transactions with pagination
app.get('/transactions', authenticateUser, (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  db.all(
    `SELECT * FROM transactions WHERE user_id = ? LIMIT ? OFFSET ?`,
    [req.user.id, limit, offset],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch transactions' });
      }
      res.json(rows);
    }
  );
});

// Get a transaction by ID
app.get('/transactions/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  db.get(
    'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
    [id, req.user.id],
    (err, transaction) => {
      if (err || !transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
    }
  );
});

// Update a transaction by ID
app.put('/transactions/:id', authenticateUser, (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? 
     WHERE id = ? AND user_id = ?`,
    [type, category, amount, date, description, id, req.user.id],
    function (err) {
      if (err || this.changes === 0) {
        return res.status(404).json({ error: 'Failed to update transaction' });
      }
      res.json({ message: 'Transaction updated successfully' });
    }
  );
});

// Delete a transaction by ID
app.delete('/transactions/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  db.run(
    'DELETE FROM transactions WHERE id = ? AND user_id = ?',
    [id, req.user.id],
    function (err) {
      if (err || this.changes === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json({ message: 'Transaction deleted successfully' });
    }
  );
});

// Get a summary of transactions (income, expenses, balance)
app.get('/summary', authenticateUser, (req, res) => {
  const { startDate, endDate } = req.query;
  let query = 'SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ?';
  const params = [req.user.id];

  if (startDate && endDate) {
    query += ' AND date BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  query += ' GROUP BY type';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch summary' });
    }

    const summary = {
      income: 0,
      expense: 0,
      balance: 0,
    };

    rows.forEach(row => {
      if (row.type === 'income') {
        summary.income += row.total;
      } else if (row.type === 'expense') {
        summary.expense += row.total;
      }
    });

    summary.balance = summary.income - summary.expense;
    res.json(summary);
  });
});

// Generate report for monthly spending by category
app.get('/report', authenticateUser, (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) {
    return res.status(400).json({ error: 'Month and year are required' });
  }

  db.all(
    `SELECT category, SUM(amount) as total FROM transactions 
     WHERE strftime('%m', date) = ? AND strftime('%Y', date) = ? AND user_id = ? 
     GROUP BY category`,
    [month, year, req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to generate report' });
      }
      res.json(rows);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
