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
});
*/

import express from "express";
import mssql from "mssql";
import { Sequelize, DataTypes } from "sequelize";
const dbConfig = {
  user: "sports",
  password: "sports@123",
  server: "192.168.1.18",
  database: "SPORTS",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const app = express();

export let query;

async function createConnection() {
  try {
    const pool = await mssql.connect(dbConfig);
    query = pool.request();
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
}

app.use(express.json());

const PORT = process.env.PORT || 8080;

export let sequelize;
export let admin_master;
createConnection()
  .then(() => {
    sequelize = new Sequelize("SPORTS", "sports", "sports@123", {
      host: "192.168.1.18",
      dialect: "mssql",
    });

    sequelize
      .sync()
      .then(() => {
        console.log("Database & tables created!");
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });

        admin_master = sequelize.define(
          "admin_master",
          {
            admin_id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
            admin_username: {
              type: DataTypes.STRING,
            },
            admin_password: {
              type: DataTypes.STRING,
            },
            admin_name: {
              type: DataTypes.STRING,
            },
            admin_mobile: {
              type: DataTypes.STRING,
            },
          },
          {
            tableName: "admin_master",
          }
        );
      })
      .catch((err) => console.error(err));
  })
  .catch(() => {
    console.log("failed");
  });

import router from "./router.js";
app.use(router);
