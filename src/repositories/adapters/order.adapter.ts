import { IOrderRepository } from '../interfaces/IOrderRepository.ts';
import { OrderRepositoryODM } from '../typeODM/order.repository.ts';
import { OrderRepositoryORM } from '../typeORM/order.repository.ts';

export const cartRepositoryAdapterFactory = (mode: string): IOrderRepository => {
  switch (mode) {
    case 'ODM':
      return new OrderRepositoryODM();
    case 'ORM':
    default:
      return new OrderRepositoryORM();
  }
};

export const getOrderRepository = (): IOrderRepository => {
  return cartRepositoryAdapterFactory(process.env.DB_TYPE);
};
