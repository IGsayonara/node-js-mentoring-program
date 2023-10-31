import { userRepository } from '../repositories/typeORM/user.repository.ts';
export const adminGuard = async (req, res, next) => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.user.id },
      relations: {
        roles: true,
      },
    });

    const index = user.roles.findIndex((role) => {
      return role.name === 'admin';
    });

    if (index < 0) {
      next({
        message: 'You are not admin',
        code: 401,
      });
    }

    next();
  } catch {
    next({
      message: 'You are not admin',
      code: 403,
    });
  }
};
