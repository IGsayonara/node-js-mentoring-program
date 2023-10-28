import { IOrder } from '../../interfaces/order.interface.ts';
import { AppDataSource } from '../../database/typeORM/data-source.ts';
import { Order } from './entities/order.entity.ts';
import { IOrderRepository } from '../interfaces/IOrderRepository.ts';

export const orderRepository = AppDataSource.getRepository(Order);

export class OrderRepositoryORM implements IOrderRepository {
  createOrder = async (order: IOrder): Promise<IOrder> => {
    const newOrder = await orderRepository.create(order);
    return { ...newOrder, userId: order.userId };
  };
}
