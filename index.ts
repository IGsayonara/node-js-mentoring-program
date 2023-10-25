import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { appRouter } from './src/routers';
import { errorHandler } from './src/middleware/error-handler.middleware.ts';
import mongoose from 'mongoose';

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
app.use('/api', appRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
