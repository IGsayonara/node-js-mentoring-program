import 'dotenv/config'; // migration needs
import { DataSource } from 'typeorm';
import postgresOptions from '../../../ormconfig.ts';

export const AppDataSource = new DataSource(postgresOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
