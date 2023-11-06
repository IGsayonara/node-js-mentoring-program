import { AbstractLogger } from './logger.ts';

export class SimpleLogger extends AbstractLogger {
  override debug(...args) {
    console.log('Simple Debug: ', ...args);
  }
}
