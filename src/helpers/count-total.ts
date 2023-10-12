import { ICart } from '../interfaces/cart.interface.ts';

export const countTotal = (cart: ICart): number => {
  let totalPrice = 0;

  cart.items.forEach((item) => {
    totalPrice += item.product.price * item.count;
  });

  return totalPrice;
};
