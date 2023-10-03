import * as userRepository from "../repositories/user.repository.ts"
import * as cartRepository from "../repositories/cart.repository.ts"
import {getCartById} from "../repositories/cart.repository.ts";
export const getActiveCart = (userId: string) => {
    const user = userRepository.getUserById(userId);

    if(!user.activeCartId) return null;

    const cart = getCartById(user.activeCartId);
    if(cart.isDeleted) return null;

    return cart;
}

export const createEmptyCart = (userId: string) => {
    return cartRepository.createCart(userId);
}