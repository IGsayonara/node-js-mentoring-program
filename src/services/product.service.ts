import { getProductRepository } from '../repositories/adapters/product.adapter.ts';

const productRepository = getProductRepository();
export const getProductById = (id: string) => {
  return productRepository.getProductById(id);
};

export const getAllProducts = () => {
  return productRepository.getAllProducts();
};
