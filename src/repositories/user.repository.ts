import {userTable, cartTable} from "../db-implementation/state.ts";
import {deepClone} from "../helpers/deepClone.ts";
import {UserEntity} from "../entities/user.entity.ts";

export const getAllUsers = (): UserEntity[] => {
    return userTable.map((user) => {
        return deepClone(user);
    })
}

export const getUserById = (userId: string): UserEntity => {
    const user = userTable.find(({id}) => id === userId);
    if(!user) throw "User not found";

    return deepClone(user);
}

export const assignActiveCartToUser = (userId: string, cartId: string) => {
    const index = userTable.findIndex(({id}) => id === userId);
    if(index < 0) throw "User not found";

    const cart = cartTable.find(({id}) => id === cartId);

    if (!cart) throw "Cart not found";
    if(cart.isDeleted) throw "Cart is not active";

    userTable[index].activeCartId = cartId;
    cartTable
        .filter((cart, cartIndex) => cart.userId === cartId && !cart.isDeleted && cartIndex !== index)
        .forEach((cart) => cart.isDeleted = true)
}