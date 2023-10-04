import * as userRepository from "../repositories/user.repository.ts"
import * as cartRepository from "../repositories/cart.repository.ts"
import * as orderRepository from "../repositories/order.repository.ts"
import {CartEntity} from "../entities/cart.entity.ts";
import {OrderEntity} from "../entities/order.entity.ts";
import {generateId} from "../helpers/idGenerator.ts";
import {UserEntity} from "../entities/user.entity.ts";
import {countTotal} from "../helpers/count-total.ts";
import {deepClone} from "../helpers/deepClone.ts";

export const getActiveCart = (userId: string) => {
    const user = userRepository.getUserById(userId);

    if (!user.activeCartId) return null;

    const cart = cartRepository.getCartById(user.activeCartId);
    if (cart.isDeleted) return null;

    return cart;
}

export const createEmptyCart = (userId: string) => {
    const cart = cartRepository.createCart(userId);
    userRepository.assignActiveCartToUser(userId, cart.id)

    return cart;
}

export const changeCart = (activeCartId: string, newCart: Partial<CartEntity>): CartEntity => {
    if (activeCartId !== newCart.id) throw {message: "Cart not found", code: 404};

    const newItems: [string, number][] = newCart.items.map((item) => {
        return [item.product.id, item.count];
    })

    return cartRepository.editCart(activeCartId, newItems);
}

export const deleteCart = (userId: string) => {
    userRepository.assignActiveCartToUser(userId, null);
}

export const createOrder = (user: UserEntity): OrderEntity => {
    const cart = cartRepository.getCartById(user.activeCartId)
    const order: OrderEntity = {
        id: generateId(),
        userId: user.id,
        cartId: user.activeCartId,
        items: cart.items,
        "payment": {
            "type": "paypal",
            "address": "London",
            "creditCard": "1234-1234-1234-1234"
        },
        "delivery": {
            "type": "post",
            "address": "London"
        },
        "comments": "",
        "status": "created",
        total: countTotal(cart),
    }

    if(!order.items.length) throw {message: "Cart is empty", code: 500}

    orderRepository.createOrder(order);

    return deepClone(order);
}