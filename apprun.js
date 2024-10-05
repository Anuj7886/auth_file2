
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

const sequelize = new Sequelize('SPORTS', 'anujUID', 'anujPWD', {
  host: '192.168.1.15',
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
    const { aman , aman1234 } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ aman1234, password: hashedPassword });
    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { aman, aman1234} = req.body;
    const user = await User.findOne({ where: { anujUID } });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, aman1234);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user.id }, '123456', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
