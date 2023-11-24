/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await UserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || `Something wrong.`,
      error: err,
    });
  }
};

// Get All User
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Get One User By ID
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.getUserById(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Update One User
const updateOneUser = async (req: Request, res: Response) => {
  const { userId: id } = req.params;
  try {
    const { user } = req.body;
    const result = await UserServices.updateOneUser(id, user);
    res.status(200).json({
      success: true,
      message: 'User Update successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// deleteUserFromDB
const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: `User deleted successfully!`,
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getUsers,
  getUserById,
  updateOneUser,
  deleteUserById,
};
