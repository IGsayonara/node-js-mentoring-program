import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../entities/product.entity.ts';

export default setSeederFactory(Product, (faker) => {
  const product = new Product();

  product.title = faker.commerce.productName();
  product.description = faker.commerce.productDescription();
  product.price = +faker.commerce.price({ min: 100, max: 1000, dec: 0 });

  return product;
});
