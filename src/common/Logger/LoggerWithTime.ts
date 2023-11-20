import { AbstractLogger } from './logger.ts';

export class LoggerWithTime extends AbstractLogger {
  override debug(...args) {
    const date = new Date();
    console.log(date.getDate().toString(), ...args);
  }
}
