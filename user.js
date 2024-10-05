/*import sql from "mssql";
const mssql = require('mssql');
const userSchema = new mssql.Schema({
 username: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 });
module.exports = mssql.model('User', userSchema);*/

import { Sequelize, DataTypes } from 'sequelize';

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

export default User;
