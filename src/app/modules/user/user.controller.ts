import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await UserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
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

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'User retrive successfully',
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
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(typeof userId);
  try {
    const result = await UserServices.getUserById(userId);
    res.status(200).json({
      success: true,
      message: 'User retrive successfully',
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

export const UserControllers = {
  createUser,
  getUsers,
  getUserById,
};
