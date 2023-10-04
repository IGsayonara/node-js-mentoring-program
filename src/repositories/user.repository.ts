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

    return deepClone(user);
}

export const assignActiveCartToUser = (userId: string, cartId: string | null) => {
    const userIndex = userTable.findIndex(({id}) => id === userId);
    const cartIndex = cartTable.findIndex(({id}) => id === cartId);

    if(cartId !== null){
        if (cartIndex < 0 || cartTable[cartIndex].isDeleted) throw {message: "Cart not found", code: 404};
    }

    userTable[userIndex].activeCartId = cartId;
    cartTable
        .filter((cart, index) => cart.userId === cartId && !cart.isDeleted && cartIndex !== index)
        .forEach((cart) => cart.isDeleted = true)
}