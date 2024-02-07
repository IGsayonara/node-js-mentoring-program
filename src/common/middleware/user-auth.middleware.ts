import jwt from 'jsonwebtoken';

import { UserRepositoryORM } from '../../repositories/typeORM/user.repository.ts';
const userRepository = new UserRepositoryORM();

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] as string;
    const token = authHeader.startsWith('Bearer') ? authHeader.replace('Bearer ', '') : null;
    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userRepository.getUserById(verified.userId);
    next();
  } catch {
    next({
      message: 'Token is not valid or expired',
      code: 401,
    });
  }
};
