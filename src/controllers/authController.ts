import { Response, Request } from 'express';
import { IUser } from '../types';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { getUserPermissionsById } from '../utils/usersHelpers';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = <IUser>await User.findOne({ username });

    if (!user) {
      res.status(403).json({
        message: 'User with that username does not exist',
      });
    } else {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      user.password = hashedPassword.toString();
      await user.save();

      const { permissions, isAdmin } = getUserPermissionsById(
        user._id.toString(),
      );
      const token = jwt.sign(
        { username: username, id: user._id.toString() },
        'secret',
        { expiresIn: '1h' },
      );
      res.status(200).json({
        isAdmin,
        permissions,
        token,
        userId: user._id.toString(),
        username,
        success: true,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = <IUser>await User.findOne({ username: username });
    if (!user) {
      // There is no such user
      res.status(403).json({
        message: 'User with that username does not exist',
      });
    } else {
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        // password is wrong
        res.status(403).json({
          message: 'Username or password does not exist',
        });
      }
      const { permissions, isAdmin } = getUserPermissionsById(
        user._id.toString(),
      );
      const token = jwt.sign(
        { username: username, id: user._id.toString() },
        'secret',
        { expiresIn: '1h' },
      );
      res.status(200).json({
        isAdmin,
        permissions,
        token,
        id: user._id.toString(),
        username,
        success: true,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, password } = req.body;
    await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: password,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, username: username, userId: user._id });
  } catch (error) {
    throw error;
  }
};
