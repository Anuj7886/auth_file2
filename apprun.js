/*import express from 'express';
import mssql from 'mssql';

const app = express();

const dbConfig = {
  user: 'sports', // Replace with your SQL Server username
    password: 'sports@123', // Replace with your SQL Server password
    server: '192.168.1.18', // Use 'localhost' if running on the same machine
    database: 'SPORTS', // Replace with your database name, e.g., 'testdb'
    port: 1433,
  options: {
    encrypt: true
  }
};

async function createConnection() {
  try {
    const pool = new mssql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

createConnection();

app.use(express.json());

const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 1433;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

import express from 'express';
import mssql from 'mssql';
import authRoutes from './auth.js';
import protectedRoute from './protected.js';

const dbConfig = {
  user: 'sports',
  password: 'sports@123',
  server: '192.168.1.15',
  database: 'SPORTS',
  options: {
    encrypt: true
  }
};

const app = express();

async function createConnection() {
  try {
    const pool = new mssql.ConnectionPool(dbConfig);
    await pool.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

createConnection();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
