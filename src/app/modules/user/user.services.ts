import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const newUser = await User.create(user);
  if (newUser) {
    const result = await User.findOne({
      userId: { $eq: Number(user.userId) },
    }).select(['-password']);
    return result;
  }
};

const getAllUserFromDB = async () => {
  const users = await User.find().select(['-password']);
  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findOne({ userId: { $eq: Number(id) } }).select([
    '-password',
  ]);

  return user;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserById,
};
