import { IUser } from '../../interfaces/user.interface.ts';
import { IUserRepository } from '../interfaces/IUserRepository.ts';
import UserModel from './models/user.model.ts';
import { UserMapper } from '../../interfaces/mappers/user.mapper.ts';
import { User } from '../typeORM/entities/user.entity.ts';

class UserModelMapper extends UserMapper {
  protected override setId() {
    this.id = this.base._id;
  }

  protected override setActiveCartId() {
    this.activeCartId = this.base.activeCart;
  }
}
export class UserRepositoryODM implements IUserRepository {
  getUserById = async (userId: string): Promise<IUser> => {
    const user = await UserModel.findById(userId);
    return new UserModelMapper(user).getUser();
  };

  getUserByEmail = async (email: string): Promise<IUser & { password: string }> => {
    throw 'Not implemented';
  };

  register = async (user: User) => {
    throw 'Not implemented';
  };
}
