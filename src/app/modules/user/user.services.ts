/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrder, IUser } from './user.interface';
import { User } from './user.model';

// Create User
const createUserIntoDB = async (user: IUser) => {
  if (await User.isExists(Number(user.userId))) {
    const newUser = await User.create(user);
    if (newUser) {
      const result = await User.findOne({
        userId: { $eq: Number(user.userId) },
      }).select({ _id: 0, password: 0, __v: 0 });
      return result;
    }
  } else {
    throw new Error(`User ID: ${user.userId} not exists`);
  }
};

// Get All User
const getAllUserFromDB = async () => {
  const users = await User.find().select({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  if (users.length > 0) {
    return users;
  } else return 'No User Found';
};

// Get User By ID
const getUserById = async (id: string) => {
  if (await User.isExists(Number(id))) {
    const user = await User.findOne({ userId: { $eq: Number(id) } }).select({
      _id: 0,
      password: 0,
      __v: 0,
    });
    return user;
  } else {
    throw new Error(`User ID: ${id} not exists`);
  }
};

// Update User
const updateOneUser = async (id: string, user: IUser) => {
  if (await User.isExists(Number(Number(id)))) {
    try {
      const doc = await User.findOne({ userId: Number(user.userId) });
      if (doc !== null) {
        doc.fullName.firstName = user.fullName.firstName
          ? user.fullName.firstName
          : doc.fullName.firstName;
        doc.fullName.lastName = user.fullName.lastName
          ? user.fullName.lastName
          : doc.fullName.lastName;
        doc.age = user.age ? user.age : doc.age;
        doc.email = user.email ? user.email : doc.email;
        doc.isActive = user.isActive ? user.isActive : doc.isActive;
        doc.hobbies = user.hobbies ? user.hobbies : doc.hobbies;
        doc.address.street = user.address.street
          ? user.address.street
          : doc.address.street;
        doc.address.city = user.address.city
          ? user.address.city
          : doc.address.city;
        doc.address.country = user.address.country
          ? user.address.country
          : doc.address.country;
        await doc?.save();
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  } else {
    throw new Error(`User ID: ${user.userId} not exists`);
  }
};

// Delete User
const deleteUserFromDB = async (id: string) => {
  if (await User.isExists(Number(id))) {
    const result = User.findOneAndDelete({ userId: Number(id) });
    return result;
  } else {
    throw new Error(`User ID: ${id} not exists`);
  }
};

const updateOrder = async (id: string, order: IOrder) => {
  if (await User.isExists(Number(id))) {
    await User.updateOne(
      { userId: Number(id) },
      { $addToSet: { orders: order } },
    )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  } else {
    throw new Error(`User ID: ${id} not exists`);
  }
};

// get all order by user id
const getAllOrderByUserId = async (id: string) => {
  if (await User.isExists(Number(id))) {
    const orders = await User.findOne({
      userId: { $eq: Number(id) },
    }).select({ orders: 1, _id: 0 });
    return orders;
  } else {
    throw new Error(`User ID: ${id} not exists`);
  }
};
// Total Price by user id
const getTotalPriceByUserId = async (id: string) => {
  if (await User.isExists(Number(id))) {
    const user = await User.findOne({
      userId: { $eq: Number(id) },
    }).select({ orders: 1, _id: 0 });
    return user?.orders.reduce((price, order: any) => price + order.price, 0);
  } else {
    throw new Error(`User ID: ${id} not exists`);
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserById,
  updateOneUser,
  deleteUserFromDB,
  updateOrder,
  getAllOrderByUserId,
  getTotalPriceByUserId,
};
