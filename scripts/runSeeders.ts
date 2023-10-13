import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from '../src/database/data-source.ts';

(async () => {
  await runSeeders(AppDataSource);
})();
