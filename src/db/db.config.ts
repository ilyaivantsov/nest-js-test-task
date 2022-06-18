import * as dotenv from 'dotenv';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

dotenv.config();

export const databaseConfig: SequelizeOptions = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    dialect: process.env.DB_DIALECT as Dialect,
};