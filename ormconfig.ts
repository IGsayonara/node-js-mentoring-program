import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const postgresOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/typeORM/migrations/*.ts'],
  seeds: ['src/database/typeORM/seeds/**/*{.ts,.js}'],
  factories: ['src/database/typeORM/factories/**/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'prod',
};

export default postgresOptions;
