import { ICart } from '../interfaces/cart.interface.ts';
import { countTotal } from '../helpers/count-total.ts';

export const formatCartResponse = (req, res, next) => {
  res.sendCart = (cart: ICart) => {
    try {
      delete cart.isDeleted;

      const responseData = {
        cart,
        totalPrice: countTotal(cart),
      };

      res.json({ data: responseData, error: null });
    } catch (error) {
      console.log('cart formatter error');
      next(error);
    }
  };
  next();
};
