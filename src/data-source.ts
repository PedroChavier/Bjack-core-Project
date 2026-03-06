import "reflect-metadata" 
import { DataSource } from "typeorm"
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3006,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
    subscribers: [],
    migrations: ['src/migrations/**/*.ts'],
})
