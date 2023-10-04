import * as cartService from "../services/cart.service.ts"
import {createOrder} from "../services/cart.service.ts";

export const postCart = (req, res) => {
    const cart = cartService.createEmptyCart(req.user.id);
    res.status(201);
    res.formattedSent(cart);
}

export const getCart = (req, res) => {
    const cart = cartService.getActiveCart(req.user.id);
    if(!cart){
        const emptyCart = cartService.createEmptyCart(req.user.id);
        res.formattedSent(emptyCart)
    }
    else {
        res.formattedSent(cart);
    }
}

export const putCart = (req, res) => {
    const activeCart = cartService.changeCart(req.user.activeCartId, req.body)
    res.formattedSent(activeCart);
}

export const deleteCart = (req, res, ) => {
    cartService.deleteCart(req.user.id);
    res.formattedSent({success: true});
}

export const postCheckout = (req, res) => {
    res.formattedSent({order: createOrder(req.user)})
}
