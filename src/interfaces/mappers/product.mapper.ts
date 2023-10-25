import { deepClone } from '../../helpers/deepClone.ts';
import { IProduct } from '../product.interface.ts';

export class ProductMapper implements IProduct {
  id;
  title;
  description;
  price;
  protected base: any;

  constructor(obj: any) {
    this.base = deepClone(obj);
    this.setId();
    this.setTitle();
    this.setPrice();
    this.setDescription();
  }

  protected setId() {
    this.id = this.base.id;
  }

  protected setTitle() {
    this.title = this.base.title;
  }

  protected setPrice() {
    this.price = this.base.price;
  }

  protected setDescription() {
    this.description = this.base.description;
  }

  public getProduct(): IProduct {
    return {
      id: this.id,
      description: this.description,
      price: this.price,
      title: this.title,
    };
  }
}
