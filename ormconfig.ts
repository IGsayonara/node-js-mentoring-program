import {DataSourceOptions} from "typeorm";

const postgresOptions: DataSourceOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": ["src/entity/*.ts"],
    "synchronize": true,
}

export default postgresOptions;