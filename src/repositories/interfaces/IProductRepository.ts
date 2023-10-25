import { IProduct } from '../../interfaces/product.interface.ts';

export interface IProductRepository {
  getProductById: (productId: string) => Promise<IProduct>;

  getAllProducts: () => Promise<IProduct[]>;
}
