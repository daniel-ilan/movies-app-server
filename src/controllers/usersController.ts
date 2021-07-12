import User from '../models/userModel';
import { Response, Request } from 'express';
import {
  saveUserToJson,
  saveUserPermissions,
  findUserByUsername,
} from '../utils/helpers';
import { permissionsFields } from '../utils/consts';

export const getPaginationUsers = async (req: Request, res: Response) => {
  const page = req.body.page;
  const skip = (parseInt(page) - 1) * 20;
  const limit = parseInt(page) * 20;
  try {
    const usersCount = await User.countDocuments();
    const usersData = await User.find().skip(skip).limit(limit);
    if (!usersData) {
      return res.status(404).json({
        message: 'No users found',
      });
    }
    return res.status(200).json({
      users: usersData,
      usersCount: usersCount,
    });
  } catch (error) {
    throw error;
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    if (findUserByUsername(formData.username)) {
      return res.status(500).json({
        message: 'User with that username already exists',
      });
    }
    const user = new User({
      username: formData.username,
      password: 'new',
    });
    const userDbParams = await user.save();

    const usersJsonData = {
      _id: userDbParams._id,
      firstName: formData['firstName'],
      lastName: formData['lastName'],
      username: formData['username'],
    };
    saveUserToJson(usersJsonData);

    const permissions = Object.entries(formData).filter(([key, value]) => {
      if (permissionsFields.includes(key)) {
        return { [key]: value };
      }
      return null;
    });

    const permissionsJsonData = {
      permissions: permissions,
      _id: userDbParams._id,
    };
    saveUserPermissions(permissionsJsonData);

    return res.status(200).json({
      message: 'User saved successfully',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
