import { CartRepositoryORM } from '../typeORM/cart.repository.ts';
import { CartRepositoryODM } from '../typeODM/cart.repository.ts';
import { ICartRepository } from '../interfaces/ICartRepository.ts';

export const cartRepositoryAdapterFactory = (mode: string): ICartRepository => {
  switch (mode) {
    case 'ODM':
      return new CartRepositoryODM();
    case 'ORM':
    default:
      return new CartRepositoryORM();
  }
};

export const getCartRepository = (): ICartRepository => {
  return cartRepositoryAdapterFactory(process.env.DB_TYPE);
};
