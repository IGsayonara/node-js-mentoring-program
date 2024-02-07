import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { appRouter } from './src/routers';
import { errorHandler } from './src/common/middleware/error-handler.middleware.ts';
import { shutdown } from './src/helpers/shutdown.ts';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', appRouter);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server gracefully...');
  shutdown(server);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server gracefully...');
  shutdown(server);
});
