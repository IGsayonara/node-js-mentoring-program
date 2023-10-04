import {Router} from "express";
import * as cartController from '../controllers/cart.controller.ts'
import {validateCart} from "../middleware/validate-cart.middleware.ts";
import {formatCartResponse} from "../middleware/cart-response.middleware.ts";
import {formatResponse} from "../middleware/response.middleware.ts";

export const cartRouter = new Router();

cartRouter.get('/', cartController.getCart, formatCartResponse)
cartRouter.post('/', cartController.postCart, formatCartResponse)
cartRouter.put('/',  validateCart, cartController.putCart, formatCartResponse)
cartRouter.delete('/', cartController.deleteCart)
cartRouter.post('/checkout', cartController.postCheckout)


