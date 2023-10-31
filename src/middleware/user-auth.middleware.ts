import { getUserRepository } from '../repositories/adapters/user.adapter.ts';
import jwt from 'jsonwebtoken';

const userRepository = getUserRepository();
export const userAuth = async (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'];
    const verified = await jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = await userRepository.getUserById(verified.userId);
    next();
  } catch {
    next({
      message: 'Token is not valid or expired',
      code: 401,
    });
  }
};
