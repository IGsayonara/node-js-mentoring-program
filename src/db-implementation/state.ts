import {ProductEntity} from "../entities/product.entity.ts";
import {CartEntity} from "../entities/cart.entity.ts";
import {UserEntity} from "../entities/user.entity.ts";
import {OrderEntity} from "../entities/order.entity.ts";

export const productTable: ProductEntity[] = [
    {
        id: '5c293ad0-19d0-41ee-baa3-4c648f9f7697',
        title: 'Book',
        description: 'A very interesting book',
        price: 100
    },
    {
        id: '61422fcd-0366-4186-ad5b-c23059b6f64f',
        title: 'Picture',
        description: 'A very interesting picture',
        price: 200
    }
]

export const userTable: UserEntity[] = [
    {
        id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
        activeCartId: null,
    },
    {
        id: '1fe36d16-49bc-4aab-a227-f84df899a6cb',
        activeCartId: null,
    }
]

export const cartTable: CartEntity[] = []

export const orderTable: OrderEntity[] = []

