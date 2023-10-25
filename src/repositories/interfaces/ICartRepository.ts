import { ICart, ICartItem } from '../../interfaces/cart.interface.ts';

export interface ICartRepository {
  getCartById: (cartId: string) => Promise<ICart>;

  createCart: (userId: string, items?: ICartItem[], isDeleted?: boolean) => Promise<ICart>;

  editCart: (cartId: string, items: [string, number][]) => Promise<ICart>;

  deleteCart: (userId: string) => Promise<void>;
}
