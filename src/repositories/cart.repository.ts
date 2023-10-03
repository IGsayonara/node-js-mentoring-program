import {cartTable} from "../db-implementation/state.ts";
import {deepClone} from "../helpers/deepClone.ts";
import {CartEntity, CartItemEntity} from "../entities/cart.entity.ts";
import {generateId} from "../helpers/idGenerator.ts";

export const getCartById = (cartId: string): CartEntity => {
    const cart = cartTable.find(({id}) => id === cartId);
    if (!cart) throw "Cart not found";

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
        return deepClone(cart);
    }

export const editCart = (cartId: string, items: CartItemEntity) => {
    const cart = cartTable.find(({id}) => id === cartId);
    if (!cart) throw "Cart not found";

    cart.items = deepClone(items);

    return deepClone(cart);
}

export const deleteCart = (cartId: string) => {
    const cart = cartTable.find(({id}) => id === cartId);
    if (!cart) throw "Cart not found";
    if(cart.isDeleted) throw "Cart had already deleted"

    cart.isDeleted = true;

    return deepClone(cart);
}