import { IOrder } from '../interfaces/order.interface.ts';
import { AppDataSource } from '../database/data-source.ts';
import { Order } from '../entities/order.entity.ts';

export const orderRepository = AppDataSource.getRepository(Order);
export const createOrder = async (order: IOrder): Promise<IOrder> => {
  const newOrder = await orderRepository.create(order);
  return { ...newOrder, userId: order.userId };
};
