import { IUser } from '../interfaces/user.interface.ts';
import { getUserRepository } from '../repositories/adapters/user.adapter.ts';
import { IAuth } from '../interfaces/auth.interface.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = getUserRepository();
export const login = async (authData: IAuth): Promise<string> => {
  const user = await userRepository.getUserByEmail(authData.email);
  if (!user) {
    throw 'Incorrect login or password';
  }

  if (!(await bcrypt.compare(authData.password, user.password))) {
    throw 'Incorrect login or password';
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
};

export const register = async (user: IUser & IAuth) => {
  user.password = await bcrypt.hash(user.password, 10);
  return await userRepository.register(user);
};
