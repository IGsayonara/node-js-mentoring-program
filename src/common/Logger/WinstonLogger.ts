import winston from 'winston';
import { AbstractLogger } from './logger.ts';
import * as util from 'util';

export class WinstonLogger implements AbstractLogger {
  private static winstonLogger;
  private logger;
  constructor() {
    if (!WinstonLogger.winstonLogger) {
      WinstonLogger.winstonLogger = winston.createLogger({
        transports: new winston.transports.Console(),
      });
    }
    this.logger = WinstonLogger.winstonLogger;
  }
  debug(...args) {
    this.logger.info(util.format(...args));
  }
}
