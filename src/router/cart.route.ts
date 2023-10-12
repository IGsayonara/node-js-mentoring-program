import {Router} from "express";
import * as cartController from '../controllers/cart.controller.ts'
import {validateCart} from "../middleware/validate-cart.middleware.ts";
import {formatCartResponse} from "../middleware/cart-response.middleware.ts";

export const cartRouter = new Router();

cartRouter.use('/', formatCartResponse)

cartRouter.get('/', cartController.getCart)
cartRouter.post('/', cartController.postCart)
cartRouter.put('/',  validateCart, cartController.putCart)
cartRouter.delete('/', cartController.deleteCart)
cartRouter.post('/checkout', cartController.postCheckout)


