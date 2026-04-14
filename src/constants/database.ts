import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource({
    type:       "mysql",
    host:        process.env.DB_HOST ?? "localhost",
    port:        parseInt(process.env.DB_PORT ?? "3306"),
    username:    process.env.DB_USER ?? "",
    password:    process.env.DB_PASSWORD ?? "",
    database:    process.env.DB_NAME ?? "",
    synchronize: process.env.NODE_ENV === "development",
    logging:     true,
    entities:    ['src/entities/**/*.ts'],
    subscribers: [],
    migrations:  ['src/migrations/**/*.ts'],
    migrationsRun: !(process.env.NODE_ENV === "development"),

    dropSchema: process.env.NODE_ENV === "development"
})

export const querryRunner = AppDataSource.createQueryRunner()
// await querryRunner.connect()
// await querryRunner.startTransaction()


