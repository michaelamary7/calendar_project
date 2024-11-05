"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelize_1 = require("sequelize");
// In your database config file
const sequelize = new sequelize_1.Sequelize('database', 'username', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});
// Make sure your .env file has:
exports.default = sequelize;
