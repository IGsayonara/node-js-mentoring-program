import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.ts';
import { validateCart } from '../common/middleware/validate-cart.middleware.ts';
import { formatCartResponse } from '../common/middleware/cart-response.middleware.ts';
import { adminGuard } from '../common/middleware/role.middleware.ts';

export const cartRouter = Router();

cartRouter.use('/', formatCartResponse);

cartRouter.get('/', cartController.getCart);
cartRouter.post('/', cartController.postCart);
cartRouter.put('/', validateCart, cartController.putCart);
cartRouter.delete('/', adminGuard, cartController.deleteCart);
cartRouter.post('/checkout', adminGuard, cartController.postCheckout);
