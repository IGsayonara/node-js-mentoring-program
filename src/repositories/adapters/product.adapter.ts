import { IProductRepository } from '../interfaces/IProductRepository.ts';
import { ProductRepositoryODM } from '../typeODM/product.repository.ts';
import { ProductRepositoryORM } from '../typeORM/product.repository.ts';

export const productRepositoryAdapterFactory = (mode: string): IProductRepository => {
  switch (mode) {
    case 'ODM':
      return new ProductRepositoryODM();
    case 'ORM':
    default:
      return new ProductRepositoryORM();
  }
};

export const getProductRepository = (): IProductRepository => {
  return productRepositoryAdapterFactory(process.env.DB_TYPE);
};
