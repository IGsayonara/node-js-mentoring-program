import * as cartService from "../services/cart.service.ts"
export const getCart = (req, res) => {
    const cart = cartService.getActiveCart(req.headers['x-user-id']);
    res.json(cart);
}

export const postCart = (req, res) => {
    const userId = req.headers['x-user-id'];
    const cart = cartService.getActiveCart(userId);
    if(!cart){
        const emptyCart = cartService.createEmptyCart(userId);

        res.json(emptyCart)
    }
    else {
        res.json(cart);
    }
}

export const putCart = (req, res) => {
    res.send("Change cart");
}

export const deleteCart = (req, res) => {
    res.send("Delete cart");
}

export const postCheckout = (req, res) => {
    res.send("Checkout cart");
}
