import AppDataSource from '../database';
import {User} from '../entity/User';

const userRepo = AppDataSource.getRepository(User);

export const removeUser = (id: number) => {
  return userRepo.delete(id);
};

export const findUserByPhone = (phone: string) => {
  return userRepo.findOneBy({ phone });
};

export const updateUser = async (user: User) => {
  return userRepo.update({ id: user.id }, { ...user });
};

export const createUser = async (user: User) => {
  const old = await findUserByPhone(user.phone);

  if (old) {
    throw new Error(`The user which has the phone - ${user.phone} existed`);
  }

  await userRepo.insert(user);
};

export const findUsers = (current: number, size: number, q?: any, key = 'name') => {
  return userRepo.find({
    order: {
      id: 'ASC'
    },
    skip: (current - 1) * size,
    take: size,
    where: {
      [key]: q
    }
  });
};

export const findUser = async (q?: any, key = 'id') => {
  const result = await findUsers(1, 1, q, key);
  return result && result[0];
};
