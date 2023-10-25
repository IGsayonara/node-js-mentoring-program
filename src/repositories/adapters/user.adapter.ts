import { IUserRepository } from '../interfaces/IUserRepository.ts';
import { UserRepositoryODM } from '../typeODM/user.repository.ts';
import { UserRepositoryORM } from '../typeORM/user.repository.ts';

export const userRepositoryAdapterFactory = (mode: string): IUserRepository => {
  switch (mode) {
    case 'ODM':
      return new UserRepositoryODM();
    case 'ORM':
    default:
      return new UserRepositoryORM();
  }
};

export const getUserRepository = (): IUserRepository => {
  return userRepositoryAdapterFactory(process.env.DB_TYPE);
};
