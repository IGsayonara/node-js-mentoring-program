import * as productService from '../services/product.service.ts';
export const getProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.formattedSent(products);
};

export const getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.formattedSent(product);
};
