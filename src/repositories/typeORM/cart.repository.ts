import { ICart, ICartItem } from '../../interfaces/cart.interface.ts';
import { AppDataSource } from '../../database/typeORM/data-source.ts';
import { Cart } from './entities/cart.entity.ts';
import { userRepository } from './user.repository.ts';
import { productRepository } from './product.repository.ts';
import { In } from 'typeorm';
import { ICartRepository } from '../interfaces/ICartRepository.ts';

export const cartRepository = AppDataSource.getRepository(Cart);

export class CartRepositoryORM implements ICartRepository {
  getCartById = async (cartId: string): Promise<ICart> => {
    const cart = await cartRepository.findOne({
      where: { id: cartId },
      relations: { user: true },
    });
    if (!cart) throw { message: 'Cart not found', code: 404 };
    const userId = cart.user.id;
    delete cart.user;
    return { ...cart, userId };
  };

  createCart = async (
    userId: string,
    items: ICartItem[] = [],
    isDeleted = false,
  ): Promise<ICart> => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const cart = cartRepository.create({ user, items, isDeleted });
    const insertResult = await cartRepository.insert(cart);
    const newCart = insertResult.raw[0];
    user.activeCart = newCart;

    await userRepository.save(user);

    return { ...newCart, userId };
  };

  editCart = async (cartId: string, items: [string, number][]): Promise<ICart> => {
    const cart = await cartRepository.findOneBy({ id: cartId });

    const productIds = items.map(([id]) => id);
    const products = await productRepository.findBy({
      id: In(productIds),
    });

    if (products.length !== items.length) {
      throw 'Product not found';
    }

    cart.items = products.map((product, index) => {
      return {
        product: product,
        count: items[index][1],
      };
    });

    const updatedCart = await cartRepository.save(cart);
    const user = await userRepository.findOneBy({ activeCart: { id: cartId } });

    return { ...updatedCart, userId: user.id };
  };

  deleteCart = async (userId: string) => {
    const user = await userRepository.findOneBy({ id: userId });
    const cart = await cartRepository.findOneBy({ user: { id: userId } });
    user.activeCart = null;
    cart.isDeleted = true;

    await userRepository.save(user);
    await cartRepository.save(cart);
  };
}
