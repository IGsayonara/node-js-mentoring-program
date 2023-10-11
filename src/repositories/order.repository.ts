import {OrderEntity} from "../entities/order.entity.ts";
import {orderTable} from "../db-implementation/state.ts";

export const createOrder = (order: OrderEntity) => {
    orderTable.push(order);
}