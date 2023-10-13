import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../../entities/product.entity.ts';
export default class ProductSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userFactory = await factoryManager.get(Product);
    // save 5 factory generated entities, to the database
    await userFactory.saveMany(5);
  }
}
