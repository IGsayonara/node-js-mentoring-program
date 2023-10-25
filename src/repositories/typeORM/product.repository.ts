import { IProduct } from '../../interfaces/product.interface.ts';
import { AppDataSource } from '../../database/typeORM/data-source.ts';
import { Product } from './entities/product.entity.ts';
import { IProductRepository } from '../interfaces/IProductRepository.ts';

export const productRepository = AppDataSource.getRepository(Product);

export class ProductRepositoryORM implements IProductRepository {
  getProductById = async (productId: string): Promise<IProduct> => {
    const product = productRepository.findOneBy({ id: productId });
    if (!product) throw { message: 'Product not found', code: 404 };

    return product;
  };

  getAllProducts = async (): Promise<IProduct[]> => {
    return await productRepository.find();
  };
}
