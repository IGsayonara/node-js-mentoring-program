import {cartTable} from "../db-implementation/state.ts";
import {deepClone} from "../helpers/deepClone.ts";
import {CartEntity, CartItemEntity} from "../entities/cart.entity.ts";
import {generateId} from "../helpers/idGenerator.ts";
import * as productRepository from "./product.repository.ts";
import * as userRepository from "./user.repository.ts";

export const getCartById = (cartId: string): CartEntity => {
    const cart = cartTable.find(({id}) => id === cartId);
    if (!cart) throw {message: "Cart not found", code: 404};

    return deepClone(cart);
}

export const createCart = (
        userId: string,
        items: CartItemEntity[] = [],
        isDeleted = false
    ): CartEntity =>
    {
        const cart = {
            id: generateId(), userId, isDeleted, items
        }


        cartTable.push(deepClone(cart));
        userRepository.assignActiveCartToUser(userId, cart.id);
        return deepClone(cart);
    }

export const editCart = (cartId: string, items: [string, number][]) => {
    const index = cartTable.findIndex(({id}) => id === cartId);
    if (index < 0) throw {message: "Cart not found", code: 404};

    cartTable[index].items = items.map(([productId, count])=> {
        const product = productRepository.getProductById(productId);
        return {
            product,
            count,
        }
    })

    return deepClone(cartTable[index]);
}

export const deleteCart = (cartId: string) => {
    const cart = cartTable.find(({id}) => id === cartId);
    if (!cart || cart.isDeleted) throw {message: "Cart not found", code: 404};

    cart.isDeleted = true;

    return deepClone(cart);
}