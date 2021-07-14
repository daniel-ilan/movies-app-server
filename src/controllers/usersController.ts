import User from '../models/userModel';
import { Response, Request } from 'express';
import {
  saveUserToJson,
  saveUserPermissions,
  findUserJsonByUsername,
  findAllUsers,
  findAllUsersPermissions,
  deleteUserPermissionsById,
  deleteUserFromJsonById,
  updateUserJson,
  updateUserPermissions,
} from '../utils/helpers';
import { permissionsFields } from '../utils/consts';
import { IUser } from '../types';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const allUsers = findAllUsers();
    const allUsersPermissions = findAllUsersPermissions();
    const allUsersDbParams = await User.find().select(
      'createdAt updatedAt _id',
    );

    const allUsersData = allUsers.map((user) => {
      const dbParams = allUsersDbParams.find(
        (db: IUser) => db._id.toString() === user._id.toString(),
      );

      const permissions = allUsersPermissions.find(
        (permisssion) => permisssion._id === user._id,
      ).permissions;

      const { updatedAt, createdAt } = dbParams;
      const { _id, lastName, firstName, username, sessionTimeOut } = user;

      return {
        _id,
        lastName,
        firstName,
        username,
        updatedAt,
        createdAt,
        permissions,
        sessionTimeOut,
      };
    });

    if (!allUsers || allUsers.length < 1) {
      return res.status(404).json({
        message: 'No users found',
      });
    }
    return res.status(200).json({
      allUsersData,
    });
  } catch (error) {
    throw error;
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    if (findUserJsonByUsername(formData.username)) {
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
      sessionTimeOut: parseInt(formData['sessionTimeOut']),
    };
    saveUserToJson(usersJsonData);

    const permissions = Object.keys(formData).filter((key) => {
      if (permissionsFields.includes(key) && formData[key]) {
        return key;
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    const { _id, username } = formData;
    const currentUser = findUserJsonByUsername(username);
    if (currentUser) {
      if (currentUser._id.toString() !== _id) {
        return res.status(500).json({
          message: 'User with that username already exists',
        });
      }
    }

    const user = await User.findById(_id);
    user.username = username;
    await user.save();

    const usersJsonData = {
      firstName: formData['firstName'],
      lastName: formData['lastName'],
      username: formData['username'],
      sessionTimeOut: parseInt(formData['sessionTimeOut']),
    };
    updateUserJson(_id, usersJsonData);

    const permissions = Object.keys(formData).filter((key) => {
      if (permissionsFields.includes(key) && formData[key]) {
        return key;
      }
      return null;
    });
    updateUserPermissions(_id, permissions);

    return res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await User.deleteOne({ _id: userId });
    deleteUserPermissionsById(userId);
    deleteUserFromJsonById(userId);

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
