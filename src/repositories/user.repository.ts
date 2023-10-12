import { IUser } from '../interfaces/user.interface.ts';
import { User } from '../entities/user.entity.ts';
import { AppDataSource } from '../database/data-source.ts';
import { cartRepository } from './cart.repository.ts';
export const userRepository = AppDataSource.getRepository(User);
export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await userRepository.find();
  return users.map((user) => {
    return { ...user, activeCartId: user.activeCart.id };
  });
};

export const getUserById = async (userId: string): Promise<IUser> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: { activeCart: true },
  });
  return { ...user, activeCartId: user.activeCart?.id || null };
};
