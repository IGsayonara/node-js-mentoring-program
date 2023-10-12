import * as userRepository from "../repositories/user.repository.ts"
import * as cartRepository from "../repositories/cart.repository.ts"
import * as orderRepository from "../repositories/order.repository.ts"
import {CartEntity} from "../interfaces/cart.entity.ts";
import {OrderEntity} from "../interfaces/order.entity.ts";
import {generateId} from "../helpers/idGenerator.ts";
import {UserEntity} from "../interfaces/user.entity.ts";
import {countTotal} from "../helpers/count-total.ts";

export const getActiveCart = async (userId: string) => {
    const user = await userRepository.getUserById(userId);

    if (!user.activeCartId) return null;

    const cart = await cartRepository.getCartById(user.activeCartId);
    if (cart.isDeleted) return null;

    return cart;
}

export const createEmptyCart = async (userId: string) => {
    return await cartRepository.createCart(userId);
}

export const changeCart = async (activeCartId: string, newCart: Partial<CartEntity>): Promise<CartEntity> => {
    if (activeCartId !== newCart.id) throw {message: "Cart not found", code: 404};

    const newItems: [string, number][] = newCart.items.map((item) => {
        return [item.product.id, item.count];
    })

    return await cartRepository.editCart(activeCartId, newItems);
}

export const deleteCart = async (userId: string) => {
    await cartRepository.deleteCart(userId);
}

export const createOrder = async (user: UserEntity): Promise<OrderEntity> => {
    const cart = await cartRepository.getCartById(user.activeCartId)
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

    return await orderRepository.createOrder(order);
}