import {CartEntity} from "../entities/cart.entity.ts";


export const countTotal = (cart: CartEntity): number => {
    let totalPrice = 0;

    cart.items.forEach((item) => {
        totalPrice += (item.product.price * item.count)
    })

    return totalPrice;
}