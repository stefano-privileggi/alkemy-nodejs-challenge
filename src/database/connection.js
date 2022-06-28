import { Sequelize } from "sequelize";

import dotenv from 'dotenv';
dotenv.config();

const database = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: '-03:00' 
  }
);


export default database;