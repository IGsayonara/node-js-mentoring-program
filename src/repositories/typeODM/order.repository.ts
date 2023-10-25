import { IOrder } from '../../interfaces/order.interface.ts';

import { IOrderRepository } from '../interfaces/IOrderRepository.ts';
import OrderModel from './models/order.model.ts';

export class OrderRepositoryODM implements IOrderRepository {
  createOrder = async (order: IOrder): Promise<IOrder> => {
    const newOrder = new OrderModel(order);
    await newOrder.save();
    console.log(newOrder);

    throw 'types';

    // return { ...newOrder, userId: newOrder.user };
  };
}
