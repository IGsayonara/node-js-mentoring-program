import * as cartService from "../services/cart.service.ts"
import {createOrder} from "../services/cart.service.ts";

export const postCart = async (req, res) => {
    const cart = await cartService.createEmptyCart(req.user.id);
    res.status(201);
    res.sendCart(cart);
}

export const getCart = async (req, res) => {
    const cart = await cartService.getActiveCart(req.user.id);
    if(!cart){
        const emptyCart = await cartService.createEmptyCart(req.user.id);
        res.sendCart(emptyCart)
    }
    else {
        res.sendCart(cart);
    }
}

export const putCart = async (req, res) => {
    const activeCart = await cartService.changeCart(req.user.activeCartId, req.body)
    res.sendCart(activeCart);
}

export const deleteCart = async (req, res) => {
    await cartService.deleteCart(req.user.id);
    res.formattedSent({success: true});
}

export const postCheckout = async (req, res) => {
    res.formattedSent({order: await createOrder(req.user)})
}
