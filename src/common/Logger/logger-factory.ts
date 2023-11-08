import { AbstractLogger } from './logger.ts';
import { LoggerWithTime } from './LoggerWithTime.ts';
import { WinstonLogger } from './WinstonLogger.ts';

export const createLogger = (): AbstractLogger => {
  if (process.env.NODE_ENV === 'prod') {
    return new LoggerWithTime();
  }
  return new WinstonLogger();
};

export const Logger = createLogger();
