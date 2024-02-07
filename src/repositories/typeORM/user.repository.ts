import { IUser } from '../../interfaces/user.interface.ts';
import { AppDataSource } from '../../database/typeORM/data-source.ts';
import { IUserRepository } from '../interfaces/IUserRepository.ts';
import { User } from './entities/user.entity.ts';
import { IAuth } from '../../interfaces/auth.interface.ts';
export const userRepository = AppDataSource.getRepository(User);

export class UserRepositoryORM implements IUserRepository {
  getUserById = async (userId: string): Promise<IUser> => {
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    return { ...user };
  };

  getUserByEmail = async (email: string): Promise<IUser & { password: string }> => {
    const user = await userRepository.findOne({
      where: { email },
      select: ['password', 'name', 'email', 'id'],
    });
    return { ...user };
  };

  register = async (user: IUser & IAuth) => {
    await userRepository.insert(user);
  };
}
