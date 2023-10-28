import { IProduct } from '../../interfaces/product.interface.ts';
import { IProductRepository } from '../interfaces/IProductRepository.ts';
import ProductModel from './models/product.model.ts';
import { ProductMapper } from '../../interfaces/mappers/product.mapper.ts';

export class ProductModelMapper extends ProductMapper {
  protected override setId() {
    this.id = this.base._id;
  }
}

export class ProductRepositoryODM implements IProductRepository {
  getProductById = async (productId: string): Promise<IProduct> => {
    const product = await ProductModel.findOne({ id: productId });
    return new ProductModelMapper(product).getProduct();
  };

  getAllProducts = async (): Promise<IProduct[]> => {
    const products = await ProductModel.find();
    return products.map((product) => {
      return new ProductModelMapper(product).getProduct();
    });
  };
}
