import { IOrder } from '../../interfaces/order.interface.ts';
import { orderRepository } from '../typeORM/order.repository.ts';

export interface IOrderRepository {
  createOrder: (order: IOrder) => Promise<IOrder>;
}
