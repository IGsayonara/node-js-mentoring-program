import { IUser } from '../../interfaces/user.interface.ts';

export interface IUserRepository {
  getUserById: (userId: string) => Promise<IUser>;
  getUserByEmail: (email: string) => Promise<IUser & { password: string }>;
  register: (user: Partial<IUser>) => Promise<void>;
}
