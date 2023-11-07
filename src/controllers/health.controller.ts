import { AppDataSource } from '../database/typeORM/data-source.ts';
import { Logger } from '../common/Logger/logger-factory.ts';
export const healthCheck = async (req, res) => {
  try {
    await AppDataSource.query('SELECT COUNT(*) FROM pg_stat_activity');
    res.formattedSent({ success: true });
  } catch (error) {
    Logger.debug(error);
    throw error;
  }
};
