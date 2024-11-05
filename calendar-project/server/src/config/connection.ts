import { config } from 'dotenv';
config();

import { Sequelize } from 'sequelize';

// In your database config file
const sequelize = new Sequelize('database', 'username', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    });
    
    // Make sure your .env file has:

export default sequelize;
