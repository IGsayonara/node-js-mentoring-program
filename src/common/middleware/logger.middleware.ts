import { Logger } from '../Logger/logger-factory.ts';

export const loggerMiddleware = (req, res, next) => {
  Logger.debug(req.path);
  const startTime = Date.now();
  res.on('finish', () => {
    const requestTime = `${req.path}: took ${(Date.now() - startTime) / 1000}s`;
    Logger.debug(requestTime);
  });
  next();
};
