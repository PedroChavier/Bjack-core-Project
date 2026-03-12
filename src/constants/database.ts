import "reflect-metadata" 
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ['src/entities/**/*.ts'],
    subscribers: [],
    migrations: ['src/migrations/**/*.ts'],
})