
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

const sequelize = new Sequelize('SPORTS', 'anujUID', 'anujPWD', {
  host: '192.168.1.18',
  dialect: 'mssql',
});


const User = sequelize.define('User ', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
});


const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});
