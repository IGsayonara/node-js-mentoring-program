import { IProduct } from './product.interface.ts';

export interface ICartItem {
  product: IProduct;
  count: number;
}

export interface ICart {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}
