import { IOrder } from '../../interfaces/order.interface.ts';

import { IOrderRepository } from '../interfaces/IOrderRepository.ts';
import OrderModel from './models/order.model.ts';
import { OrderMapper } from '../../interfaces/mappers/order.mapper.ts';
import { deepClone } from '../../helpers/deepClone.ts';
import { ICartItem } from '../../interfaces/cart.interface.ts';
import UserModel from './models/user.model.ts';

export class OrderModelMapper extends OrderMapper {
  protected override setId() {
    this.id = this.base._id;
  }
  protected override setItems() {
    const items = deepClone(this.base.items) as ICartItem[];
    this.items = items.map((item) => ({
      product: item.product,
      count: item.count,
    }));
  }
}

export class OrderRepositoryODM implements IOrderRepository {
  createOrder = async (order: IOrder): Promise<IOrder> => {
    const newOrder = new OrderModel(order);
    const user = await UserModel.findById(order.userId);
    user.orders.push(order.id);

    console.log(newOrder);

    await Promise.all([user.save(), newOrder.save()]);

    return new OrderModelMapper(newOrder).getOrder();
  };
}
