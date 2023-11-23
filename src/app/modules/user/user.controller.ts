import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  const { user } = req.body;

  const result = await UserServices.createUserIntoDB(user);
  res.status(200).json({
    success: true,
    message: 'User is created successfully',
    data: result,
  });
};

export const UserControllers = {
  createUser,
};
