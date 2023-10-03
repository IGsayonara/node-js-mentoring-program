import {Router} from "express";
import * as cartController from '../controllers/cart.controller.ts'

export const cartRouter = new Router();

cartRouter.get('/', cartController.getCart)
cartRouter.post('/', cartController.postCart)
cartRouter.put('/', cartController.putCart)
cartRouter.delete('/', cartController.deleteCart)

cartRouter.post('/checkout', cartController.postCheckout)
