
import express from 'express';
import mssql from 'mssql';
import authRoutes from './routes/auth';
import protectedRoute from './routes/protectedRoute'

const dbConfig = {
  user: 'sports',
  password: 'sports@123',
  server: '192.168.1.18',
  database: 'SPORTS',
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
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
