import {OrderEntity} from "../interfaces/order.entity.ts";
import {AppDataSource} from "../database/data-source.ts";
import {Order} from "../entity/order.entity.ts";

export const orderRepository = AppDataSource.getRepository(Order);
export const createOrder = async (order: OrderEntity): Promise<OrderEntity>  => {
    const newOrder = await orderRepository.create(order);
    return {...newOrder, userId: order.userId}
}