import { AbstractLogger } from './logger.ts';
import { LoggerWithTime } from './LoggerWithTime.ts';
import { SimpleLogger } from './SimpleLogger.ts';

export const createLogger = (): AbstractLogger => {
  if (process.env.NODE_ENV === 'prod') {
    return new LoggerWithTime();
  }
  return new SimpleLogger();
};

export const Logger = createLogger();
