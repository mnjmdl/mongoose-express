import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);

  return result;
};

const getAllUserFromDB = async () => {
  const users = await User.find().select(['-password']);
  return users;
};

const getUserById = async (id: number) => {
  const user = await User.findOne({ id }).select(['-password']);
  return user;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserById,
};
