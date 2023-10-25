import { IUser } from '../../interfaces/user.interface.ts';

export interface IUserRepository {
  getUserById: (userId: string) => Promise<IUser>;
}
