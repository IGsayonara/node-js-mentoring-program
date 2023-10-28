import { IUser } from '../../interfaces/user.interface.ts';
import { User } from './entities/user.entity.ts';
import { AppDataSource } from '../../database/typeORM/data-source.ts';
import { IUserRepository } from '../interfaces/IUserRepository.ts';
export const userRepository = AppDataSource.getRepository(User);

export class UserRepositoryORM implements IUserRepository {
  getUserById = async (userId: string): Promise<IUser> => {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { activeCart: true },
    });
    return { ...user, activeCartId: user.activeCart?.id || null };
  };
}
