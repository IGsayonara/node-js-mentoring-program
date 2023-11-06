import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { appRouter } from './src/routers';
import { errorHandler } from './src/middleware/error-handler.middleware.ts';
import mongoose from 'mongoose';
import { shutdown } from './src/helpers/shutdown.ts';

mongoose
  .connect('mongodb://127.0.0.1:27017', {
    auth: { username: 'root', password: 'example_password' },
  })
  .then((data) => {
    console.log('connected mongodb');
  })
  .catch((err) => {
    console.log('error connect mongodb', err);
  });

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', appRouter);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server gracefully...');
  shutdown(server);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server gracefully...');
  shutdown(server);
});
